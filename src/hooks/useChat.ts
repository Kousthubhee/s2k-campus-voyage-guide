
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

interface ChatConversation {
  id: string;
  title: string;
  created_at: string;
}

export function useChat() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation);
    }
  }, [currentConversation]);

  const loadConversations = async () => {
    if (!user) return;
    
    // Using raw SQL query since the tables might not be in the generated types yet
    const { data, error } = await supabase.rpc('get_user_conversations', {
      user_id_param: user.id
    });

    if (!error && data) {
      setConversations(data);
    } else {
      // Fallback to empty array if function doesn't exist
      console.log('Conversations function not available yet');
    }
  };

  const loadMessages = async (conversationId: string) => {
    // Using raw SQL query since the tables might not be in the generated types yet
    const { data, error } = await supabase.rpc('get_conversation_messages', {
      conversation_id_param: conversationId
    });

    if (!error && data) {
      setMessages(data);
    } else {
      console.log('Messages function not available yet');
    }
  };

  const createConversation = async (title: string = 'New Conversation') => {
    if (!user) return null;

    // For now, create a local conversation until the database is ready
    const newConversation = {
      id: Date.now().toString(),
      title,
      created_at: new Date().toISOString()
    };

    setConversations([newConversation, ...conversations]);
    setCurrentConversation(newConversation.id);
    return newConversation.id;
  };

  const sendMessage = async (content: string) => {
    if (!user || !currentConversation) return;

    setLoading(true);

    // Add user message locally
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate AI response (mock responses for now)
    const aiResponses = [
      "I can help you with information about studying in France. What specific aspect would you like to know about?",
      "For French university applications, you'll typically need to go through Campus France. Would you like me to explain the process?",
      "The cost of living in France varies by city. Paris is the most expensive, while cities like Lyon and Toulouse are more affordable.",
      "French student visas require proof of financial resources, usually around €615 per month. Do you need help calculating your budget?",
      "Many French universities offer programs in English, especially at the master's level. What field are you interested in?"
    ];

    const aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

    // Add AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  return {
    conversations,
    currentConversation,
    setCurrentConversation,
    messages,
    loading,
    createConversation,
    sendMessage
  };
}
