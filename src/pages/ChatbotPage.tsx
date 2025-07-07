
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Bot, User } from 'lucide-react';
import { useFAQs } from '@/hooks/useFAQs';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const ChatbotPage = () => {
  const { faqs, loading, searchFAQ, getFAQsByCategory, getCategories, getSuggestedQuestions } = useFAQs();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const categories = getCategories();
  const suggestedQuestions = getSuggestedQuestions();
  const categoryQuestions = selectedCategory ? getFAQsByCategory(selectedCategory) : [];

  useEffect(() => {
    // Add welcome message when component mounts
    if (messages.length === 0) {
      addBotMessage("Hello, I am your student support assistant. How can I help you today?");
    }
  }, []);

  useEffect(() => {
    // Auto scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addUserMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addBotMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString() + '_bot',
      type: 'bot',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userQuestion = inputValue.trim();
    addUserMessage(userQuestion);
    setInputValue('');

    // Search for FAQ answer
    const matchedFAQ = searchFAQ(userQuestion);
    
    if (matchedFAQ) {
      setTimeout(() => addBotMessage(matchedFAQ.answer), 500);
    } else {
      setTimeout(() => addBotMessage("Hmm, I couldn't find that — try these instead! You can browse the suggested questions above or select a category to see more specific questions."), 500);
    }
  };

  const handleQuestionClick = (question: string) => {
    addUserMessage(question);
    
    const matchedFAQ = searchFAQ(question);
    if (matchedFAQ) {
      setTimeout(() => addBotMessage(matchedFAQ.answer), 500);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <Bot className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <p>Loading chatbot...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 h-[calc(100vh-200px)]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FAQ Chatbot</h1>
        <p className="text-lg text-gray-600">
          Get instant answers to common student questions
        </p>
      </div>

      <Card className="h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="space-y-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Bot className="h-6 w-6 text-blue-600" />
              Student Support Assistant
            </CardTitle>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter by category:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Suggested Questions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                {selectedCategory ? `Questions about ${selectedCategory}:` : 'Suggested questions:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {(selectedCategory ? categoryQuestions : suggestedQuestions).map((faq) => (
                  <Button
                    key={faq.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuestionClick(faq.question)}
                    className="text-xs hover:bg-blue-50 hover:border-blue-300"
                  >
                    {faq.question}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t shrink-0">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about studying in France..."
                className="flex-1"
              />
              <Button type="submit" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
