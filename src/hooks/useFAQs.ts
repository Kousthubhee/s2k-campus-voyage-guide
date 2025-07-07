
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  created_at: string;
}

export function useFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('category, question');

      if (error) {
        console.error('Error loading FAQs:', error);
        return;
      }

      setFaqs(data || []);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchFAQ = (userInput: string): FAQ | null => {
    const searchTerm = userInput.toLowerCase().trim();
    
    // First try exact question match
    const exactMatch = faqs.find(faq => 
      faq.question.toLowerCase() === searchTerm
    );
    
    if (exactMatch) return exactMatch;
    
    // Then try partial match in question
    const partialMatch = faqs.find(faq =>
      faq.question.toLowerCase().includes(searchTerm) ||
      searchTerm.includes(faq.question.toLowerCase())
    );
    
    if (partialMatch) return partialMatch;
    
    // Finally try keyword match
    const keywords = searchTerm.split(' ');
    const keywordMatch = faqs.find(faq => {
      const questionWords = faq.question.toLowerCase().split(' ');
      return keywords.some(keyword => 
        questionWords.some(word => word.includes(keyword) || keyword.includes(word))
      );
    });
    
    return keywordMatch || null;
  };

  const getFAQsByCategory = (category: string): FAQ[] => {
    return faqs.filter(faq => faq.category === category);
  };

  const getCategories = (): string[] => {
    const categories = [...new Set(faqs.map(faq => faq.category))];
    return categories.sort();
  };

  const getSuggestedQuestions = (limit: number = 5): FAQ[] => {
    const suggested = [
      'Do I need IELTS?',
      'How to get student housing?',
      'Which banks offer loans?',
      'Where can I find Indian groceries?',
      'Can I get part-time jobs?'
    ];
    
    return faqs.filter(faq => suggested.includes(faq.question)).slice(0, limit);
  };

  return {
    faqs,
    loading,
    searchFAQ,
    getFAQsByCategory,
    getCategories,
    getSuggestedQuestions,
    loadFAQs
  };
}
