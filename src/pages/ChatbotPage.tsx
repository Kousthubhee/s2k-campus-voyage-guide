
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, MessageCircle, HelpCircle } from 'lucide-react';
import { useFAQs } from '@/hooks/useFAQs';
import { findBestFAQMatch, logFAQQuery, getPopularQuestions, getCategoryQuestions } from '@/utils/faqMatcher';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: Array<{id: string, question: string}>;
}

export const ChatbotPage = () => {
  const { faqs, loading } = useFAQs();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your FAQ assistant for studying in France. Ask me anything or try the suggested questions below.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Get unique categories from FAQ data
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)))];

  // Get suggested questions based on selected category
  const getSuggestedQuestions = () => {
    if (selectedCategory === 'all') {
      return getPopularQuestions(faqs, 4);
    } else {
      return getCategoryQuestions(faqs, selectedCategory, 4);
    }
  };

  const suggestedQuestions = getSuggestedQuestions();

  const handleSendMessage = async (messageText: string, fromSuggestion = false) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Find best match using fuzzy matching
    const matchResult = findBestFAQMatch(messageText, faqs);
    
    let botMessage: Message;

    if (matchResult.faq) {
      // High confidence match - provide direct answer
      botMessage = {
        id: (Date.now() + 1).toString(),
        text: matchResult.faq.answer,
        isUser: false,
        timestamp: new Date()
      };

      // Log successful match
      await logFAQQuery(
        messageText, 
        matchResult.faq.question, 
        matchResult.confidence, 
        matchResult.faq.category,
        fromSuggestion
      );
    } else if (matchResult.suggestions.length > 0) {
      // Low confidence - provide suggestions
      botMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm not quite sure what you're asking about. Did you mean one of these?",
        isUser: false,
        timestamp: new Date(),
        suggestions: matchResult.suggestions.map(faq => ({
          id: faq.id,
          question: faq.question
        }))
      };

      // Log query with suggestions
      await logFAQQuery(messageText, undefined, matchResult.confidence);
    } else {
      // No match found
      botMessage = {
        id: (Date.now() + 1).toString(),
        text: "I couldn't find information about that. Try asking about visa requirements, housing, finances, or student life in France. You can also browse questions by category above.",
        isUser: false,
        timestamp: new Date()
      };

      // Log failed query
      await logFAQQuery(messageText, undefined, 0);
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputMessage('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question, true);
  };

  const handleSuggestionClick = async (suggestion: {id: string, question: string}) => {
    const faq = faqs.find(f => f.id === suggestion.id);
    if (faq) {
      // Add the suggestion as user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: suggestion.question,
        isUser: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);

      // Add the answer
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: faq.answer,
        isUser: false,
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
      }, 300);

      // Log the suggestion click
      await logFAQQuery(suggestion.question, suggestion.question, 1, faq.category, true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-gray-600">Loading FAQ database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FAQ Chatbot</h1>
        <p className="text-gray-600">Get instant answers to common questions about studying in France</p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Chat Interface */}
      <Card className="h-[600px]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-[520px]">
          {/* Suggested Questions */}
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {selectedCategory === 'all' ? 'Popular Questions:' : `${selectedCategory} Questions:`}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((faq) => (
                <Button
                  key={faq.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(faq.question)}
                  className="text-xs h-auto py-1 px-2 whitespace-normal text-left"
                >
                  {faq.question}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  <div
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion) => (
                        <Button
                          key={suggestion.id}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full justify-start text-left h-auto p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <HelpCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span className="text-sm">{suggestion.question}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Input Form */}
          <form onSubmit={handleFormSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about studying in France..."
                className="flex-1"
              />
              <Button type="submit" disabled={!inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
