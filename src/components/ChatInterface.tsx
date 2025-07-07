
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageCircle, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { useFAQ } from '@/hooks/useFAQ';

export function ChatInterface() {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryQuestions, setCategoryQuestions] = useState<Array<{id: string, question: string}>>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const {
    conversations,
    currentConversation,
    setCurrentConversation,
    messages,
    loading,
    createConversation,
    sendMessage
  } = useChat();

  const { categories, faqs, loadFAQsByCategory, searchFAQ, logChatMessage } = useFAQ();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Add welcome message when component loads and no messages exist
  useEffect(() => {
    const addWelcomeMessage = async () => {
      if (messages.length === 0 && currentConversation && user) {
        const welcomeMessage = "Hello, I am your student support assistant. How can I help you today?";
        await sendMessage(welcomeMessage, 'assistant');
        await logChatMessage(welcomeMessage, 'bot');
      }
    };

    addWelcomeMessage();
  }, [messages.length, currentConversation, user]);

  // Handle category selection
  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    await loadFAQsByCategory(category);
    
    // Extract questions from loaded FAQs
    const questions = faqs.map(faq => ({
      id: faq.id,
      question: faq.question || ''
    })).filter(q => q.question);
    
    setCategoryQuestions(questions);
  };

  // Handle question bubble click
  const handleQuestionClick = async (questionText: string) => {
    if (!user) return;

    setIsLoadingResponse(true);

    let conversationId = currentConversation;
    if (!conversationId) {
      conversationId = await createConversation();
      if (!conversationId) return;
    }

    // Add user message
    await sendMessage(questionText, 'user');
    await logChatMessage(questionText, 'user');

    // Search for answer
    const answer = await searchFAQ(questionText);
    const botResponse = answer !== "Sorry, I couldn't find an answer to your question." 
      ? answer 
      : "Sorry, I don't have the answer right now. Please contact support.";

    // Add bot response
    await sendMessage(botResponse, 'assistant');
    await logChatMessage(botResponse, 'bot');

    setIsLoadingResponse(false);
    setCategoryQuestions([]); // Clear questions after selecting one
    setSelectedCategory(''); // Reset category
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setIsLoadingResponse(true);

    let conversationId = currentConversation;
    if (!conversationId) {
      conversationId = await createConversation();
      if (!conversationId) return;
    }

    // Log user message
    await logChatMessage(inputMessage, 'user');

    // Search FAQ first, then use regular chat if no match
    const faqAnswer = await searchFAQ(inputMessage);
    
    if (faqAnswer !== "Sorry, I couldn't find an answer to your question.") {
      // If FAQ answer found, add it directly to chat
      await sendMessage(inputMessage, 'user');
      await sendMessage(faqAnswer, 'assistant');
      // Log bot response
      await logChatMessage(faqAnswer, 'bot');
    } else {
      // Use regular chat flow with fallback message
      await sendMessage(inputMessage, 'user');
      await sendMessage("Sorry, I don't have the answer right now. Please contact support.", 'assistant');
      await logChatMessage("Sorry, I don't have the answer right now. Please contact support.", 'bot');
    }

    setInputMessage('');
    setIsLoadingResponse(false);
  };

  const startNewConversation = async () => {
    await createConversation();
    setCategoryQuestions([]);
    setSelectedCategory('');
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
      {/* Conversations Sidebar */}
      <Card className="w-1/3">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <Button size="sm" onClick={startNewConversation}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-80">
            <div className="p-3 space-y-2">
              {conversations.map((conversation) => (
                <Button
                  key={conversation.id}
                  variant={currentConversation === conversation.id ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setCurrentConversation(conversation.id)}
                >
                  <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{conversation.title}</span>
                </Button>
              ))}
              {conversations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No conversations yet
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">AI Assistant</CardTitle>
          
          {/* Category Dropdown */}
          <div className="mt-2">
            <Select value={selectedCategory} onValueChange={handleCategorySelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-80">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {/* Category Questions as Bubbles */}
              {categoryQuestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Choose a question:</p>
                  <div className="flex flex-wrap gap-2">
                    {categoryQuestions.map((q) => (
                      <Button
                        key={q.id}
                        variant="outline"
                        size="sm"
                        className="text-left h-auto p-2 text-xs"
                        onClick={() => handleQuestionClick(q.question)}
                      >
                        {q.question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 0 && categoryQuestions.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation with the AI assistant</p>
                  <p className="text-sm mt-2">Select a category above or type your question below</p>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {(loading || isLoadingResponse) && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <p className="text-sm text-gray-600">AI is typing...</p>
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
                placeholder="Type your question here..."
                disabled={loading || isLoadingResponse}
              />
              <Button 
                type="submit" 
                disabled={loading || isLoadingResponse || !inputMessage.trim()}
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
