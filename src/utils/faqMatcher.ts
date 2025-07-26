
import { matchSorter } from 'match-sorter';
import { supabase } from '@/integrations/supabase/client';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface MatchResult {
  faq: FAQ | null;
  confidence: number;
  suggestions: FAQ[];
}

// Handle greetings and basic interactions
const handleGreetings = (query: string): string | null => {
  const normalizedQuery = query.toLowerCase().trim();
  
  const greetings = ['hi', 'hello', 'hey', 'bonjour', 'salut', 'good morning', 'good afternoon', 'good evening'];
  
  if (greetings.some(greeting => normalizedQuery === greeting || normalizedQuery.startsWith(greeting + ' ') || normalizedQuery.endsWith(' ' + greeting))) {
    return "Hello! I'm your FAQ assistant for studying in France. I can help you with information about visa requirements, housing, finances, student life, and much more. What would you like to know?";
  }
  
  return null;
};

// Normalize text for better matching
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[?!.,;]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

// Extract key terms and synonyms
const getKeyTerms = (query: string): string[] => {
  const normalized = normalizeText(query);
  const terms = [];
  
  // Add original words
  terms.push(...normalized.split(' '));
  
  // Add synonyms and variations
  const synonymMap: Record<string, string[]> = {
    'job': ['work', 'employment', 'position', 'jobs'],
    'work': ['job', 'employment', 'position', 'working'],
    'jobs': ['job', 'work', 'employment'],
    'can': ['am able', 'possible', 'allowed'],
    'get': ['find', 'obtain', 'have'],
    'find': ['get', 'obtain', 'locate'],
    'available': ['exist', 'possible', 'there'],
    'part-time': ['parttime', 'part time'],
    'parttime': ['part-time', 'part time'],
    'guarantor': ['guarantee', 'sponsor'],
    'rental': ['rent', 'housing', 'apartment'],
  };
  
  for (const word of normalized.split(' ')) {
    if (synonymMap[word]) {
      terms.push(...synonymMap[word]);
    }
  }
  
  return [...new Set(terms)]; // Remove duplicates
};

export const findBestFAQMatch = (query: string, faqs: FAQ[]): MatchResult => {
  console.log('Finding match for query:', query);
  
  // First check if it's a greeting
  const greetingResponse = handleGreetings(query);
  if (greetingResponse) {
    console.log('Detected greeting, returning greeting response');
    return {
      faq: {
        id: 'greeting',
        category: 'General',
        question: query,
        answer: greetingResponse
      },
      confidence: 1.0,
      suggestions: []
    };
  }
  
  // Use fuzzy matching with match-sorter as the primary method
  const matches = matchSorter(faqs, query, {
    keys: [
      { key: 'question', threshold: matchSorter.rankings.CONTAINS },
      { key: 'answer', threshold: matchSorter.rankings.CONTAINS }
    ],
    threshold: matchSorter.rankings.CONTAINS,
  });

  console.log('Fuzzy matches found:', matches.length);
  console.log('Top matches:', matches.slice(0, 3).map(m => ({ question: m.question, answer: m.answer.substring(0, 100) + '...' })));

  let confidence = 0;
  let bestMatch: FAQ | null = null;
  let suggestions: FAQ[] = [];

  if (matches.length > 0) {
    bestMatch = matches[0];
    
    // Calculate confidence based on match quality
    const queryWords = normalizeText(query).split(' ');
    const questionWords = normalizeText(bestMatch.question).split(' ');
    const answerWords = normalizeText(bestMatch.answer).split(' ');
    
    let matchedWords = 0;
    queryWords.forEach(word => {
      if (questionWords.some(qWord => qWord.includes(word) || word.includes(qWord)) ||
          answerWords.some(aWord => aWord.includes(word) || word.includes(aWord))) {
        matchedWords++;
      }
    });
    
    confidence = matchedWords / Math.max(queryWords.length, 1);
    
    console.log('Best match result:', {
      question: bestMatch.question,
      confidence,
      matchedWords,
      totalWords: queryWords.length
    });
    
    // If confidence is too low, provide suggestions instead
    if (confidence < 0.3) {
      suggestions = matches.slice(0, 3);
      bestMatch = null;
      console.log('Low confidence, providing suggestions');
    }
  } else {
    console.log('No fuzzy matches found, trying keyword matching...');
    
    // Fallback to keyword matching if fuzzy matching fails
    const queryTerms = getKeyTerms(query);
    console.log('Query terms:', queryTerms);
    
    // Score each FAQ based on keyword matches
    const scoredFAQs = faqs.map(faq => {
      const questionTerms = getKeyTerms(faq.question);
      const answerTerms = getKeyTerms(faq.answer);
      
      let score = 0;
      let matchedTerms = 0;
      
      // Count matches in question (higher weight)
      for (const term of queryTerms) {
        if (questionTerms.some(qTerm => qTerm.includes(term) || term.includes(qTerm))) {
          score += 2;
          matchedTerms++;
        }
      }
      
      // Count matches in answer (lower weight)
      for (const term of queryTerms) {
        if (answerTerms.some(aTerm => aTerm.includes(term) || term.includes(aTerm))) {
          score += 1;
          matchedTerms++;
        }
      }
      
      // Calculate confidence based on term coverage
      const confidence = queryTerms.length > 0 ? matchedTerms / queryTerms.length : 0;
      
      return { faq, score, confidence };
    });
    
    // Sort by score
    scoredFAQs.sort((a, b) => b.score - a.score);
    
    console.log('Top scored FAQs:', scoredFAQs.slice(0, 3).map(s => ({ 
      question: s.faq.question, 
      score: s.score, 
      confidence: s.confidence 
    })));
    
    // Use the highest scoring FAQ if it has a decent score
    const topMatch = scoredFAQs[0];
    if (topMatch && topMatch.score >= 2) {
      console.log('Using keyword match:', topMatch.faq.question);
      bestMatch = topMatch.faq;
      confidence = Math.min(topMatch.confidence, 0.8);
    }
  }

  return {
    faq: bestMatch,
    confidence,
    suggestions
  };
};

export const logFAQQuery = async (
  userQuery: string,
  matchedQuestion?: string,
  confidence?: number,
  category?: string,
  clickedSuggestion = false
) => {
  try {
    await supabase.from('faq_logs').insert({
      user_query: userQuery,
      matched_question: matchedQuestion,
      confidence_score: confidence,
      category,
      clicked_suggestion: clickedSuggestion
    });
  } catch (error) {
    console.error('Error logging FAQ query:', error);
  }
};

export const getPopularQuestions = (faqs: FAQ[], limit = 5): FAQ[] => {
  // For now, return first few questions. In future, this could be based on analytics
  return faqs.slice(0, limit);
};

export const getCategoryQuestions = (faqs: FAQ[], category: string, limit = 5): FAQ[] => {
  return faqs.filter(faq => faq.category === category).slice(0, limit);
};
