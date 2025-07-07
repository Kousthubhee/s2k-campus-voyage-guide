
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const useFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        console.log('Fetching FAQs from Supabase...');
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('category', { ascending: true });

        console.log('FAQ fetch result:', { data, error });

        if (error) {
          console.error('Error fetching FAQs:', error);
        } else {
          console.log('FAQs fetched successfully:', data);
          setFaqs(data || []);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return { faqs, loading };
};
