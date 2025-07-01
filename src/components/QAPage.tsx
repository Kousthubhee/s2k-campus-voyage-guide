
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
  Music
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

const QAPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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

  const trendingQuestions = [
    "How do I apply for a student visa in France?",
    "What documents do I need for university admission?",
    "How much does it cost to study in France?",
    "Can I work while studying in France?",
    "What are the best cities for international students?"
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

    // Simulate AI response
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

  const generateBotResponse = (input: string) => {
    const responses = [
      "Based on current French education policies, I'd recommend checking the official Campus France website for the most up-to-date requirements.",
      "For student visas, you'll typically need proof of admission, financial resources, and health insurance. The exact requirements may vary based on your nationality.",
      "French universities offer excellent programs for international students. Would you like specific information about any particular field of study?",
      "The cost of living varies significantly between cities. Paris is generally more expensive than cities like Lyon or Toulouse.",
      "I'd be happy to help you with that! Could you provide more specific details about your situation?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
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

  const handleTrendingQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>

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

          {/* Trending Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Trending Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {trendingQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => handleTrendingQuestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
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
                              {getFileIcon(message.fileName)}
                              <span className="text-xs truncate">{message.fileName}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            <div className="flex items-center gap-1">
                              {message.type === 'bot' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => speakText(message.message)}
                                  className="h-6 w-6 p-0 hover:bg-white/20"
                                >
                                  <Volume2 className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleBookmark(message.id)}
                                className="h-6 w-6 p-0 hover:bg-white/20"
                              >
                                {message.isBookmarked ? (
                                  <BookmarkCheck className="h-3 w-3" />
                                ) : (
                                  <Bookmark className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
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
            <CardContent className="pt-6">
              {uploadedFile && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getFileIcon(uploadedFile.name)}
                    <span className="text-sm">{uploadedFile.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {(uploadedFile.size / 1024 / 1024).toFixed(1)}MB
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUploadedFile(null)}
                  >
                    ×
                  </Button>
                </div>
              )}

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
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="*/*"
                />
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleVoiceInput}
                  className={isRecording ? "bg-red-50 border-red-200" : ""}
                >
                  {isRecording ? (
                    <MicOff className="h-4 w-4 text-red-600" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() && !uploadedFile}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
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
