
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export function useFAQ() {
  const [categories, setCategories] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('category')
        .not('category', 'is', null);
      
      if (error) throw error;
      
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const loadFAQsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('category', category);
      
      if (error) throw error;
      
      setFaqs(data || []);
    } catch (err) {
      console.error('Error loading FAQs:', err);
      setError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const searchFAQ = async (query: string): Promise<string> => {
    try {
      // First try exact text search
      const { data: exactMatch, error: exactError } = await supabase
        .from('faqs')
        .select('answer')
        .ilike('question', `%${query}%`)
        .limit(1);

      if (exactError) throw exactError;

      if (exactMatch && exactMatch.length > 0) {
        return exactMatch[0].answer;
      }

      // If no exact match, try broader search
      const words = query.toLowerCase().split(' ').filter(word => word.length > 2);
      if (words.length > 0) {
        const { data: broadMatch, error: broadError } = await supabase
          .from('faqs')
          .select('answer, question')
          .or(words.map(word => `question.ilike.%${word}%`).join(','))
          .limit(1);

        if (broadError) throw broadError;

        if (broadMatch && broadMatch.length > 0) {
          return broadMatch[0].answer;
        }
      }

      return "Sorry, I couldn't find an answer to your question.";
    } catch (err) {
      console.error('Error searching FAQ:', err);
      return "Sorry, I couldn't find an answer to your question.";
    }
  };

  const logChatMessage = async (message: string, role: 'user' | 'bot') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          message,
          role,
          timestamp: new Date().toISOString()
        });

      if (error) {
        console.error('Error logging chat message:', error);
      }
    } catch (err) {
      console.error('Error logging chat message:', err);
    }
  };

  return {
    categories,
    faqs,
    loading,
    error,
    loadFAQsByCategory,
    searchFAQ,
    logChatMessage
  };
}
