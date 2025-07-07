
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, MessageCircle } from 'lucide-react';
import { useFAQs } from '@/hooks/useFAQs';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatbotPage = () => {
  const { faqs, loading } = useFAQs();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your FAQ assistant. Ask me anything about studying in France, or click on the suggested questions below.',
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
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Get unique categories from FAQ data
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Get suggested questions
  const suggestedQuestions = [
    "Do I need IELTS?",
    "How to get student housing?",
    "Which banks offer loans?",
    "Where can I find Indian groceries?",
    "Can I get part-time jobs?"
  ];

  // Get questions for selected category
  const categoryQuestions = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const findAnswer = (question: string) => {
    const matchedFaq = faqs.find(faq => 
      faq.question.toLowerCase().includes(question.toLowerCase()) ||
      question.toLowerCase().includes(faq.question.toLowerCase())
    );
    
    return matchedFaq ? matchedFaq.answer : null;
  };

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Find and add bot response
    const answer = findAnswer(messageText);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer || "Hmm, I couldn't find that — try these suggested questions or browse by category!",
      isUser: false,
      timestamp: new Date()
    };

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
    handleSendMessage(question);
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

      {/* Category Filter at the top */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Browse by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
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

            {categoryQuestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Questions in {selectedCategory === 'all' ? 'All Categories' : selectedCategory}:
                </p>
                <div className="grid gap-2">
                  {categoryQuestions.slice(0, 10).map((faq) => (
                    <Button
                      key={faq.id}
                      variant="ghost"
                      onClick={() => handleSuggestedQuestion(faq.question)}
                      className="justify-start text-left h-auto p-3 whitespace-normal"
                    >
                      <span className="text-sm">{faq.question}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-96">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-80">
          {/* Suggested Questions */}
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-2">Suggested Questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
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
