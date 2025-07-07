
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

export const findBestFAQMatch = (query: string, faqs: FAQ[]): MatchResult => {
  // Use match-sorter for fuzzy matching
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
    const queryWords = query.toLowerCase().split(' ');
    const questionWords = bestMatch.question.toLowerCase().split(' ');
    
    let matchedWords = 0;
    queryWords.forEach(word => {
      if (questionWords.some(qWord => qWord.includes(word) || word.includes(qWord))) {
        matchedWords++;
      }
    });
    
    confidence = matchedWords / Math.max(queryWords.length, 1);
    
    // If confidence is low, provide suggestions
    if (confidence < 0.6) {
      suggestions = matches.slice(0, 3);
      bestMatch = null;
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
