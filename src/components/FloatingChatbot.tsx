
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, X, Send } from 'lucide-react';
import { useFAQ } from '@/hooks/useFAQ';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FloatingChatbotProps {
  currentModule?: string;
}

export function FloatingChatbot({ currentModule = 'general' }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedFAQCategory, setSelectedFAQCategory] = useState<string>('');
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [hasShownGreeting, setHasShownGreeting] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const { 
    categories, 
    faqs, 
    loading: faqLoading, 
    loadFAQsByCategory, 
    searchFAQ, 
    logChatMessage 
  } = useFAQ();

  // Show initial greeting when chatbot opens
  useEffect(() => {
    if (isOpen && user && !hasShownGreeting) {
      const greetingMessage: Message = {
        id: '1',
        text: 'Hello! I\'m your pasS2Kampus AI assistant. You can browse FAQs by category or ask me anything about studying in France!',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([greetingMessage]);
      setHasShownGreeting(true);
    }
  }, [isOpen, user, hasShownGreeting]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Load FAQs when category is selected
  useEffect(() => {
    if (selectedFAQCategory) {
      loadFAQsByCategory(selectedFAQCategory);
    }
  }, [selectedFAQCategory, loadFAQsByCategory]);

  const handleSendMessage = async () => {
    if (inputValue.trim() && user) {
      setIsLoadingResponse(true);
      
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Log user message
      await logChatMessage(inputValue, 'user');
      
      // Search FAQ first, then fallback to default response
      const faqAnswer = await searchFAQ(inputValue);
      const botResponse = faqAnswer !== "Sorry, I couldn't find an answer to your question." 
        ? faqAnswer 
        : "I'm here to help you with questions about studying in France. You can browse FAQs by category above or ask me specific questions!";
      
      setTimeout(async () => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Log bot response
        await logChatMessage(botResponse, 'bot');
        setIsLoadingResponse(false);
      }, 1000);
      
      setInputValue('');
    }
  };

  const handleFAQQuestionClick = async (question: string, answer: string) => {
    if (!user) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage, botMessage]);
    
    // Log both messages
    await logChatMessage(question, 'user');
    await logChatMessage(answer, 'bot');
  };

  const resetChat = () => {
    const greetingMessage: Message = {
      id: '1',
      text: 'Hello! I\'m your pasS2Kampus AI assistant. You can browse FAQs by category or ask me anything about studying in France!',
      isUser: false,
      timestamp: new Date()
    };
    setMessages([greetingMessage]);
    setSelectedFAQCategory('');
  };

  if (!user) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 animate-pulse"
          size="icon"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
        {isOpen && (
          <Card className="w-96 h-[500px] shadow-xl border-2 border-blue-200 absolute bottom-16 right-0">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  pasS2Kampus AI Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full">
              <p className="text-center text-gray-600">Please sign in to use the chat feature</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 animate-pulse"
          size="icon"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      ) : (
        <Card className="w-96 h-[500px] shadow-xl border-2 border-blue-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                pasS2Kampus AI Assistant
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetChat}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  ↻
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
            {/* FAQ Category Selector */}
            <div className="p-3 border-b bg-gray-50">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Select a Category
              </label>
              <Select value={selectedFAQCategory} onValueChange={setSelectedFAQCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Browse FAQs by category" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-[60]">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-3">
                {/* FAQ Questions for Selected Category */}
                {selectedFAQCategory && faqs.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      {selectedFAQCategory} Questions:
                    </h4>
                    <div className="space-y-1">
                      {faqs.map((faq) => (
                        <Button
                          key={faq.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleFAQQuestionClick(faq.question, faq.answer)}
                          className="w-full justify-start text-left h-auto p-2 text-xs hover:bg-blue-50"
                        >
                          {faq.question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                        message.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isLoadingResponse && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-3 py-2 rounded-lg">
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
            
            <div className="p-3 border-t bg-gray-50 space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about studying in France..."
                  className="text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoadingResponse}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="h-9 w-9 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoadingResponse || !inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={() => window.open('https://wa.me/33745736466', '_blank')}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2"
                size="sm"
              >
                📱 Chat with an expert on WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
