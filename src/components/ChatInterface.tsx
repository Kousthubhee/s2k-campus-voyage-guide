
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, MessageCircle, Plus } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { useFAQ } from '@/hooks/useFAQ';

export function ChatInterface() {
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFAQCategory, setSelectedFAQCategory] = useState<string>('');
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [hasShownGreeting, setHasShownGreeting] = useState(false);
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

  const { 
    categories, 
    faqs, 
    loading: faqLoading, 
    loadFAQsByCategory, 
    searchFAQ, 
    logChatMessage 
  } = useFAQ();

  // Show initial greeting when component mounts and user is authenticated
  useEffect(() => {
    if (user && messages.length === 0 && !hasShownGreeting) {
      setHasShownGreeting(true);
    }
  }, [user, messages.length, hasShownGreeting]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Load FAQs when category is selected
  useEffect(() => {
    if (selectedFAQCategory) {
      loadFAQsByCategory(selectedFAQCategory);
    }
  }, [selectedFAQCategory, loadFAQsByCategory]);

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
      await sendMessage(inputMessage);
      // Log bot response
      await logChatMessage(faqAnswer, 'bot');
    } else {
      // Use regular chat flow
      await sendMessage(inputMessage);
    }

    setInputMessage('');
    setIsLoadingResponse(false);
  };

  const handleFAQQuestionClick = async (question: string, answer: string) => {
    if (!user) return;

    let conversationId = currentConversation;
    if (!conversationId) {
      conversationId = await createConversation();
      if (!conversationId) return;
    }

    // Add question as user message and answer as bot message
    await sendMessage(question);
    
    // Log both messages
    await logChatMessage(question, 'user');
    await logChatMessage(answer, 'bot');
  };

  const startNewConversation = async () => {
    await createConversation();
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
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-80">
          {/* FAQ Category Selector */}
          <div className="px-4 pb-3 border-b bg-gray-50/50">
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
            <div className="space-y-4">
              {/* FAQ Questions for Selected Category */}
              {selectedFAQCategory && faqs.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-3">
                    📋 {selectedFAQCategory} - Frequently Asked Questions
                  </h4>
                  <div className="space-y-2">
                    {faqs.map((faq) => (
                      <Button
                        key={faq.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleFAQQuestionClick(faq.question, faq.answer)}
                        className="w-full justify-start text-left h-auto p-2 text-xs bg-white hover:bg-blue-100 border-blue-200"
                      >
                        ❓ {faq.question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Hello! I'm your pasS2Kampus AI assistant.</p>
                  <p className="text-sm">You can browse FAQs by category above or ask me anything about studying in France!</p>
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
                placeholder="Ask me anything about studying in France..."
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
