
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, MessageCircle, Plus, History } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFAQ } from '@/hooks/useFAQ';
import { supabase } from '@/integrations/supabase/client';

interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

export function ChatInterface() {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryQuestions, setCategoryQuestions] = useState<any[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { categories, faqs, searchFAQ, loadFAQsByCategory } = useFAQ();

  // Load chat history on component mount
  useEffect(() => {
    if (user) {
      loadChatHistory();
    }
  }, [user]);

  // Load questions when category is selected
  useEffect(() => {
    if (selectedCategory) {
      loadFAQsByCategory(selectedCategory);
    }
  }, [selectedCategory, loadFAQsByCategory]);

  // Update local questions state when faqs change
  useEffect(() => {
    setCategoryQuestions(faqs);
  }, [faqs]);

  // Auto-scroll to bottom when chat history changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const loadChatHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: true })
        .limit(50);

      if (error) throw error;

      setChatHistory(data || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const saveChatToHistory = async (question: string, answer: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          question,
          answer,
          timestamp: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setChatHistory(prev => [...prev, data]);
      }
    } catch (error) {
      console.error('Error saving chat to history:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !user) return;

    setIsLoadingResponse(true);

    try {
      // Search FAQ for the question
      const faqAnswer = await searchFAQ(inputMessage);
      
      const finalAnswer = faqAnswer !== "Sorry, I couldn't find an answer to your question." 
        ? faqAnswer 
        : "I don't have specific information about that topic. Please check with our expert on WhatsApp for personalized assistance!";

      // Save to chat history
      await saveChatToHistory(inputMessage, finalAnswer);

      setInputMessage('');
    } catch (error) {
      console.error('Error handling message:', error);
      await saveChatToHistory(inputMessage, "Sorry, there was an error processing your question. Please try again.");
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const handleQuestionClick = async (question: string) => {
    if (!user) return;

    setIsLoadingResponse(true);

    try {
      // Find the answer for the selected question
      const selectedFAQ = categoryQuestions.find(faq => faq.question === question);
      const answer = selectedFAQ ? selectedFAQ.answer : "Sorry, I couldn't find an answer to your question.";

      // Save to chat history
      await saveChatToHistory(question, answer);
    } catch (error) {
      console.error('Error handling question click:', error);
      await saveChatToHistory(question, "Sorry, there was an error processing your question. Please try again.");
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const clearChatHistory = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('chat_history')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setChatHistory([]);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  if (!user) {
    return (
      <Card className="h-96">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Please sign in to use the chat feature</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex h-96 gap-4">
      {/* FAQ Categories Sidebar */}
      <Card className="w-1/3">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">FAQ Categories</CardTitle>
            <Button size="sm" variant="outline" onClick={clearChatHistory}>
              <History className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCategory && categoryQuestions.length > 0 && (
            <ScrollArea className="h-64">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  Questions in {selectedCategory}:
                </h4>
                {categoryQuestions.map((faq, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3 text-xs hover:bg-blue-50"
                    onClick={() => handleQuestionClick(faq.question)}
                  >
                    {faq.question}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-80">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {chatHistory.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation with the AI assistant</p>
                  <p className="text-sm mt-2">Ask about studying in France, visa requirements, or browse FAQ categories</p>
                </div>
              )}
              
              {chatHistory.map((chat) => (
                <div key={chat.id} className="space-y-2">
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-blue-600 text-white">
                      <p className="text-sm">{chat.question}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(chat.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* AI Answer */}
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
                      <p className="text-sm whitespace-pre-wrap">{chat.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoadingResponse && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about studying in France..."
                disabled={isLoadingResponse}
              />
              <Button 
                type="submit" 
                disabled={isLoadingResponse || !inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
