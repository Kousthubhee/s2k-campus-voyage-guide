
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
    
    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setConversations(data);
    }
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data);
    }
  };

  const createConversation = async (title: string = 'New Conversation') => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({ user_id: user.id, title })
      .select()
      .single();

    if (!error && data) {
      setConversations([data, ...conversations]);
      setCurrentConversation(data.id);
      return data.id;
    }
    return null;
  };

  const sendMessage = async (content: string) => {
    if (!user || !currentConversation) return;

    setLoading(true);

    // Add user message
    const { data: userMessage, error: userError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: currentConversation,
        user_id: user.id,
        content,
        role: 'user'
      })
      .select()
      .single();

    if (userError || !userMessage) {
      setLoading(false);
      return;
    }

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
    setTimeout(async () => {
      const { data: assistantMessage } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: currentConversation,
          user_id: user.id,
          content: aiResponse,
          role: 'assistant'
        })
        .select()
        .single();

      if (assistantMessage) {
        setMessages(prev => [...prev, assistantMessage]);
      }
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
