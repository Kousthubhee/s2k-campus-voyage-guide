
import { useState, useEffect } from 'react';
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
    
    // For now, load from localStorage until database schema is updated
    const stored = localStorage.getItem(`conversations_${user.id}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConversations(parsed);
      } catch (error) {
        console.log('Error loading conversations:', error);
      }
    }
  };

  const loadMessages = async (conversationId: string) => {
    if (!user) return;
    
    // For now, load from localStorage until database schema is updated
    const stored = localStorage.getItem(`messages_${conversationId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
      } catch (error) {
        console.log('Error loading messages:', error);
      }
    }
  };

  const saveConversations = (convs: ChatConversation[]) => {
    if (user) {
      localStorage.setItem(`conversations_${user.id}`, JSON.stringify(convs));
    }
  };

  const saveMessages = (conversationId: string, msgs: ChatMessage[]) => {
    localStorage.setItem(`messages_${conversationId}`, JSON.stringify(msgs));
  };

  const createConversation = async (title: string = 'New Conversation') => {
    if (!user) return null;

    const newConversation: ChatConversation = {
      id: Date.now().toString(),
      title,
      created_at: new Date().toISOString()
    };

    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    saveConversations(updatedConversations);
    setCurrentConversation(newConversation.id);
    setMessages([]); // Clear messages for new conversation
    return newConversation.id;
  };

  const deleteConversation = async (conversationId: string) => {
    if (!user) return;

    const updatedConversations = conversations.filter(conv => conv.id !== conversationId);
    setConversations(updatedConversations);
    saveConversations(updatedConversations);
    
    // Remove messages for this conversation
    localStorage.removeItem(`messages_${conversationId}`);
    
    // If we're deleting the current conversation, clear it
    if (currentConversation === conversationId) {
      setCurrentConversation(null);
      setMessages([]);
    }
  };

  const sendMessage = async (content: string) => {
    if (!user || !currentConversation) return;

    setLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      created_at: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(currentConversation, updatedMessages);

    // Update conversation title if it's the first message
    if (messages.length === 0) {
      const updatedConversations = conversations.map(conv => 
        conv.id === currentConversation 
          ? { ...conv, title: content.slice(0, 50) + (content.length > 50 ? '...' : '') }
          : conv
      );
      setConversations(updatedConversations);
      saveConversations(updatedConversations);
    }

    // Generate AI response with French education focus
    const aiResponses = [
      "I can help you with information about studying in France. What specific aspect would you like to know about?",
      "For French university applications, you'll typically need to go through Campus France. Would you like me to explain the process?",
      "The cost of living in France varies by city. Paris is the most expensive, while cities like Lyon and Toulouse are more affordable.",
      "French student visas require proof of financial resources, usually around €615 per month. Do you need help calculating your budget?",
      "Many French universities offer programs in English, especially at the master's level. What field are you interested in?",
      "To open a French bank account as a student, you'll need: residence proof, student card, passport, and initial deposit. Popular banks include BNP Paribas and Société Générale.",
      "CAF (housing aid) can provide €100-200/month for students. You can apply online after arriving with your lease agreement and bank details.",
      "Student transport passes offer great discounts. In Paris, get the Navigo student pass. Other cities have similar student rates.",
      "EU students can work freely in France. Non-EU students can work 20 hours/week with a student residence permit.",
      "Basic French helps with daily life, but many programs are taught in English. Consider taking French classes for better integration."
    ];

    const aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

    // Add AI response after a delay
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        created_at: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      saveMessages(currentConversation, finalMessages);
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
    sendMessage,
    deleteConversation
  };
}
