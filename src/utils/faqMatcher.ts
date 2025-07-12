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
    'job': ['work', 'employment', 'position'],
    'work': ['job', 'employment', 'position'],
    'part-time': ['parttime', 'part time'],
    'parttime': ['part-time', 'part time'],
    'can': ['am able', 'possible', 'allowed'],
    'get': ['find', 'obtain', 'have'],
    'find': ['get', 'obtain', 'locate'],
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
  
  // First, try exact keyword matching for better consistency
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
    return {
      faq: topMatch.faq,
      confidence: Math.min(topMatch.confidence, 0.9), // Cap confidence
      suggestions: []
    };
  }
  
  // Fallback to fuzzy matching with match-sorter
  console.log('Using fuzzy matching...');
  const matches = matchSorter(faqs, query, {
    keys: ['question', 'answer'],
    threshold: matchSorter.rankings.CONTAINS,
  });

  let confidence = 0;
  let bestMatch: FAQ | null = null;
  let suggestions: FAQ[] = [];

  if (matches.length > 0) {
    bestMatch = matches[0];
    
    // Calculate confidence based on match quality
    const queryWords = normalizeText(query).split(' ');
    const questionWords = normalizeText(bestMatch.question).split(' ');
    
    let matchedWords = 0;
    queryWords.forEach(word => {
      if (questionWords.some(qWord => qWord.includes(word) || word.includes(qWord))) {
        matchedWords++;
      }
    });
    
    confidence = matchedWords / Math.max(queryWords.length, 1);
    
    console.log('Fuzzy match result:', {
      question: bestMatch.question,
      confidence,
      matchedWords,
      totalWords: queryWords.length
    });
    
    // If confidence is low, provide suggestions instead
    if (confidence < 0.5) {
      suggestions = matches.slice(0, 3);
      bestMatch = null;
      console.log('Low confidence, providing suggestions');
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
