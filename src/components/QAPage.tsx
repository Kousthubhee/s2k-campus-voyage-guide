import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Send, 
  Upload, 
  Mic, 
  MicOff, 
  Bookmark, 
  BookmarkCheck,
  Volume2,
  Languages,
  MessageSquare,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  fileUrl?: string;
  fileName?: string;
  isBookmarked?: boolean;
}

interface PredefinedCategory {
  category: string;
  emoji: string;
  questions: string[];
}

const predefinedCategories: PredefinedCategory[] = [
  {
    category: "Checklist",
    emoji: "📋",
    questions: [
      "What should I prepare before coming to France?",
      "What documents do I need for university admission?",
      "How do I apply for a student visa?",
      "What are the pre-arrival requirements?",
      "How do I find accommodation in France?",
      "What financial preparations should I make?"
    ]
  },
  {
    category: "Documents & Renewals",
    emoji: "📑",
    questions: [
      "What documents are needed for visa renewal?",
      "How do I renew my residence permit?",
      "What paperwork is required for CAF applications?",
      "How do I get my documents translated?",
      "What documents do I need to open a bank account?",
      "How do I obtain a student card?"
    ]
  },
  {
    category: "Ask Me Anything",
    emoji: "💬",
    questions: [
      "What can I ask the AI Assistant?",
      "How does the AI help with French education?",
      "Can you help with visa questions?",
      "What topics can you assist with?",
      "How accurate is the AI information?",
      "Can you provide personalized advice?"
    ]
  },
  {
    category: "Community Hub",
    emoji: "🏡",
    questions: [
      "How can I connect with other students?",
      "Where can I find study groups?",
      "How do I join student events?",
      "Can I find roommates through the platform?",
      "How do I participate in community discussions?",
      "Are there networking opportunities?"
    ]
  },
  {
    category: "Learn French",
    emoji: "📚",
    questions: [
      "Where can I find French language resources?",
      "How can I improve my French skills?",
      "Are there online French courses available?",
      "What level of French do I need for university?",
      "Can you recommend French learning apps?",
      "How do I practice French conversation?"
    ]
  }
];

const QAPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  // Load messages from database
  useEffect(() => {
    if (user) {
      loadMessages();
    } else {
      // Load from localStorage for guests
      const savedMessages = localStorage.getItem('qa_messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, [user]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMessages = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('qa_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          type: msg.type as 'user' | 'bot',
          message: msg.message,
          timestamp: new Date(msg.created_at),
          fileUrl: msg.file_url,
          fileName: msg.file_name,
          isBookmarked: msg.is_bookmarked
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessage = async (message: Omit<Message, 'id'>) => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from('qa_messages')
          .insert({
            user_id: user.id,
            type: message.type,
            message: message.message,
            file_url: message.fileUrl,
            file_name: message.fileName,
            is_bookmarked: message.isBookmarked || false
          })
          .select()
          .single();

        if (error) throw error;
        return data.id;
      } catch (error) {
        console.error('Error saving message:', error);
        toast({
          title: "Error",
          description: "Failed to save message",
          variant: "destructive"
        });
      }
    } else {
      // Save to localStorage for guests
      const newMessage = { ...message, id: Date.now().toString() };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem('qa_messages', JSON.stringify(updatedMessages));
      return newMessage.id;
    }
  };

  const generateBotResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('prepare before coming') || lowerInput.includes('pre-arrival')) {
      return "Before coming to France, you should: 1) Secure your student visa through Campus France, 2) Find accommodation (CROUS or private), 3) Arrange health insurance, 4) Open a French bank account, 5) Learn basic French, and 6) prepare financial proof (€615/month). Our checklist module guides you through each step!";
    }
    
    if (lowerInput.includes('documents') && lowerInput.includes('admission')) {
      return "For university admission, you typically need: Academic transcripts, diploma certificates, language proficiency tests (DELF/DALF or IELTS/TOEFL), motivation letter, CV, passport copy, and financial proof. Requirements vary by program and university.";
    }
    
    if (lowerInput.includes('student visa')) {
      return "To apply for a student visa: 1) Get accepted by a French institution, 2) Register on Campus France, 3) Gather required documents (passport, photos, financial proof, health insurance, acceptance letter), 4) Schedule visa appointment, 5) Pay fees. Processing takes 2-4 weeks.";
    }
    
    if (lowerInput.includes('accommodation')) {
      return "Accommodation options include: CROUS university housing (cheapest, €150-400/month), private apartments (€400-800/month), homestays, and student residences. Apply early as demand is high, especially in Paris!";
    }
    
    if (lowerInput.includes('financial preparations')) {
      return "Financial preparations: Prove €615/month for visa, open French bank account (BNP Paribas, Société Générale recommended), get international student insurance, budget for deposits, and consider part-time work options (20h/week allowed for non-EU students).";
    }
    
    // Documents & Renewals answers
    if (lowerInput.includes('visa renewal') || lowerInput.includes('residence permit')) {
      return "For visa/residence permit renewal: Apply 2-3 months before expiry, provide updated enrollment certificate, financial proof, housing proof, health insurance, passport photos, and current residence permit. Visit your local prefecture.";
    }
    
    if (lowerInput.includes('caf')) {
      return "For CAF housing aid: Apply online at caf.fr after arrival, provide lease agreement, bank RIB, residence permit copy, and enrollment certificate. Aid ranges €100-200/month and takes 2-3 months to process.";
    }
    
    if (lowerInput.includes('documents translated')) {
      return "Document translation: Use certified translators (traducteur assermenté) for official documents. Costs €20-50 per page. Some universities accept official English documents. Check with your institution first.";
    }
    
    if (lowerInput.includes('bank account')) {
      return "To open a bank account: Bring passport, residence proof, student card, and initial deposit (€10-300). Popular banks: BNP Paribas, Société Générale, LCL. Many offer student packages with reduced fees.";
    }
    
    return "I do not have information on this. Please talk with an expert.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !uploadedFile) return;

    setIsLoading(true);

    // Create user message
    const userMessage: Omit<Message, 'id'> = {
      type: 'user',
      message: inputMessage,
      timestamp: new Date(),
      fileUrl: uploadedFile ? URL.createObjectURL(uploadedFile) : undefined,
      fileName: uploadedFile?.name
    };

    const userMessageId = await saveMessage(userMessage);
    if (userMessageId) {
      setMessages(prev => [...prev, { ...userMessage, id: userMessageId }]);
    }

    // Generate AI response
    setTimeout(async () => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Omit<Message, 'id'> = {
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      };

      const botMessageId = await saveMessage(botMessage);
      if (botMessageId) {
        setMessages(prev => [...prev, { ...botMessage, id: botMessageId }]);
      }

      setIsLoading(false);
    }, 1000);

    setInputMessage('');
    setUploadedFile(null);
  };

  const handlePredefinedQuestion = async (question: string) => {
    setInputMessage(question);
    // Auto-send the predefined question
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      setUploadedFile(file);
    }
  };

  const toggleBookmark = async (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    const updatedBookmark = !message.isBookmarked;

    if (user) {
      try {
        const { error } = await supabase
          .from('qa_messages')
          .update({ is_bookmarked: updatedBookmark })
          .eq('id', messageId);

        if (error) throw error;
      } catch (error) {
        console.error('Error updating bookmark:', error);
        return;
      }
    }

    setMessages(prev => 
      prev.map(m => 
        m.id === messageId 
          ? { ...m, isBookmarked: updatedBookmark }
          : m
      )
    );

    if (!user) {
      localStorage.setItem('qa_messages', JSON.stringify(messages));
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Not supported",
        description: "Voice input is not supported in this browser",
        variant: "destructive"
      });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="h-4 w-4" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <ImageIcon className="h-4 w-4" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <Video className="h-4 w-4" />;
      case 'mp3':
      case 'wav':
        return <Music className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          Ask Me Anything
        </h1>
        <p className="text-gray-600">
          Get instant answers about studying in France, visa requirements, and more!
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Quick Help Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {predefinedCategories.map((category) => (
                <div key={category.category} className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => setExpandedCategory(
                      expandedCategory === category.category ? null : category.category
                    )}
                    className="w-full justify-between text-left h-auto p-4"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{category.emoji}</span>
                      <span className="font-medium text-lg">{category.category}</span>
                    </span>
                    {expandedCategory === category.category ? 
                      <ChevronUp className="h-5 w-5" /> : 
                      <ChevronDown className="h-5 w-5" />
                    }
                  </Button>
                  
                  {expandedCategory === category.category && (
                    <div className="space-y-2 ml-6">
                      {category.questions.map((question, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          onClick={() => handlePredefinedQuestion(question)}
                          className="w-full justify-start text-left h-auto p-3 hover:bg-blue-50 border border-gray-200"
                        >
                          <span className="text-sm">{question}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold text-green-800 mb-2">Need Personal Help?</h3>
              <p className="text-green-700 text-sm mb-4">
                Get personalized assistance from our education experts
              </p>
              <Button
                onClick={() => window.open('https://wa.me/919441724256', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📱 Chat with an expert on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          {/* Language Selector */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Languages className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Language:</span>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={selectedLanguage === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang.code)}
                      className="text-sm"
                    >
                      {lang.flag} {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="h-96">
            <CardContent className="p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No messages yet. Start a conversation!</p>
                      <p className="text-sm mt-2">Try the Categories tab for quick questions</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          
                          {message.fileName && (
                            <div className="mt-2 p-2 bg-white/10 rounded flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="text-xs truncate">{message.fileName}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Input Area */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about studying in France..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-12"
                  />
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() && !uploadedFile}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={() => window.open('https://wa.me/33745736466', '_blank')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                📱 Chat with an expert on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarks">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                {messages.filter(m => m.isBookmarked).length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Bookmark className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No bookmarked messages yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.filter(m => m.isBookmarked).map((message) => (
                      <div key={message.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm">{message.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant={message.type === 'user' ? 'default' : 'secondary'}>
                            {message.type === 'user' ? 'You' : 'AI'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {message.timestamp.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QAPage;
