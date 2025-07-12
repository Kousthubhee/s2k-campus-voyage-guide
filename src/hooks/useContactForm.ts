
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);

  const submitContactForm = async (formData: ContactFormData) => {
    setLoading(true);
    try {
      // Call the edge function to send email
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast.success('Message sent successfully! We will get back to you soon.');
      return true;
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitContactForm,
    loading,
  };
};
