import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useFAQ } from '@/hooks/useFAQ';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface PredefinedQuestion {
  category: string;
  emoji: string;
  questions: string[];
}

const moduleQuestions: Record<string, PredefinedQuestion[]> = {
  'pre-arrival-1': [
    {
      category: "Pre-Arrival Part 1",
      emoji: "✈️",
      questions: [
        "What documents do I need for university admission?",
        "How do I apply for a student visa?",
        "What is Campus France process?",
        "How do I book VFS appointment?",
        "What financial proof do I need?",
        "How long does visa processing take?"
      ]
    }
  ],
  'pre-arrival-2': [
    {
      category: "Packing Assistant",
      emoji: "🎒",
      questions: [
        "What clothes should I pack for France?",
        "What food items can I bring?",
        "What electronics should I pack?",
        "How to prepare culturally for France?",
        "What medicines can I bring?",
        "What books and study materials to pack?"
      ]
    }
  ],
  'post-arrival': [
    {
      category: "Post-Arrival",
      emoji: "🏠",
      questions: [
        "How do I open a French bank account?",
        "What is SSN and how to apply?",
        "How do I get health insurance?",
        "What is CAF and how to apply?",
        "How do I get a French phone number?",
        "How do I register for university?"
      ]
    }
  ],
  'documents': [
    {
      category: "Documents & Renewals",
      emoji: "📑",
      questions: [
        "What documents are needed for visa renewal?",
        "How do I renew my residence permit?",
        "What paperwork is required for CAF applications?",
        "How do I get my documents translated?",
        "When should I start renewal process?",
        "How to track document expiry dates?"
      ]
    }
  ],
  'general': [
    {
      category: "General Help",
      emoji: "💬",
      questions: [
        "What should I prepare before coming to France?",
        "How can I connect with other students?",
        "Where can I find French language resources?",
        "How do I find accommodation in France?",
        "What are the visa requirements?",
        "How do I adapt to French culture?"
      ]
    }
  ]
};

const generateAnswer = (question: string, currentModule?: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('prepare before coming') || lowerQuestion.includes('pre-arrival')) {
    return "Before coming to France, you should: 1) Secure your student visa through Campus France, 2) Find accommodation (CROUS or private), 3) Arrange health insurance, 4) Open a French bank account, 5) Learn basic French, and 6) prepare financial proof (€615/month). Our checklist module guides you through each step!";
  }
  
  if (lowerQuestion.includes('documents') && lowerQuestion.includes('admission')) {
    return "For university admission, you typically need: Academic transcripts, diploma certificates, language proficiency tests (DELF/DALF or IELTS/TOEFL), motivation letter, CV, passport copy, and financial proof. Requirements vary by program and university.";
  }
  
  if (lowerQuestion.includes('student visa')) {
    return "To apply for a student visa: 1) Get accepted by a French institution, 2) Register on Campus France, 3) Gather required documents (passport, photos, financial proof, health insurance, acceptance letter), 4) Schedule visa appointment, 5) Pay fees. Processing takes 2-4 weeks.";
  }
  
  if (lowerQuestion.includes('accommodation')) {
    return "Accommodation options include: CROUS university housing (cheapest, €150-400/month), private apartments (€400-800/month), homestays, and student residences. Apply early as demand is high, especially in Paris!";
  }
  
  if (lowerQuestion.includes('bank account')) {
    return "To open a bank account: Bring passport, residence proof, student card, and initial deposit (€10-300). Popular banks: BNP Paribas, Société Générale, LCL. Many offer student packages with reduced fees.";
  }

  return "I don't have that information currently. Please check with our expert on WhatsApp for personalized assistance!";
};

interface FloatingChatbotProps {
  currentModule?: string;
}

export function FloatingChatbot({ currentModule = 'general' }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your pasS2Kampus AI assistant. You can browse FAQs by category or ask me anything about studying in France!',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showCategories, setShowCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFAQCategory, setSelectedFAQCategory] = useState<string>('');
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
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

  const currentQuestions = moduleQuestions[currentModule] || moduleQuestions['general'];

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
      
      // Search FAQ first, then fallback to predefined answers
      const faqAnswer = await searchFAQ(inputValue);
      const botResponse = faqAnswer !== "Sorry, I couldn't find an answer to your question." 
        ? faqAnswer 
        : generateAnswer(inputValue, currentModule);
      
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
      setShowCategories(false);
    }
  };

  const handlePredefinedQuestion = async (question: string) => {
    if (!user) return;
    
    setIsLoadingResponse(true);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Log user message
    await logChatMessage(question, 'user');
    
    // Search FAQ first, then fallback to predefined answers
    const faqAnswer = await searchFAQ(question);
    const botResponse = faqAnswer !== "Sorry, I couldn't find an answer to your question." 
      ? faqAnswer 
      : generateAnswer(question, currentModule);
    
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
    
    setShowCategories(false);
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
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m your pasS2Kampus AI assistant. You can browse FAQs by category or ask me anything about studying in France!',
        isUser: false,
        timestamp: new Date()
      }
    ]);
    setShowCategories(true);
    setSelectedCategory(null);
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
                
                {showCategories && (
                  <div className="space-y-2 mt-4">
                    <div className="text-sm font-medium text-gray-600 mb-3">
                      {currentModule !== 'general' ? `${currentModule.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Questions:` : 'Choose a category:'}
                    </div>
                    {currentQuestions.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.category ? null : category.category
                          )}
                          className="w-full justify-between text-left h-auto p-2"
                        >
                          <span className="flex items-center gap-2">
                            <span>{category.emoji}</span>
                            <span className="font-medium">{category.category}</span>
                          </span>
                          {selectedCategory === category.category ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </Button>
                        
                        {selectedCategory === category.category && (
                          <div className="space-y-1 ml-4">
                            {category.questions.map((question, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePredefinedQuestion(question)}
                                className="w-full justify-start text-left h-auto p-2 text-xs hover:bg-blue-50"
                              >
                                {question}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
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
