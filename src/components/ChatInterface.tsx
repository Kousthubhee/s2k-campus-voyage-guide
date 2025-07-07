
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { useFAQ } from '@/hooks/useFAQ';
import { CategorySelector } from './chat/CategorySelector';
import { QuestionBubbles } from './chat/QuestionBubbles';
import { MessageList } from './chat/MessageList';
import { ChatInput } from './chat/ChatInput';
import { ConversationsSidebar } from './chat/ConversationsSidebar';

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
        await sendMessage(welcomeMessage);
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
    await sendMessage(questionText);
    await logChatMessage(questionText, 'user');

    // Search for answer
    const answer = await searchFAQ(questionText);
    const botResponse = answer !== "Sorry, I couldn't find an answer to your question." 
      ? answer 
      : "Sorry, I don't have the answer right now. Please contact support.";

    // Add bot response
    await sendMessage(botResponse);
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
      await sendMessage(inputMessage);
      await sendMessage(faqAnswer);
      // Log bot response
      await logChatMessage(faqAnswer, 'bot');
    } else {
      // Use regular chat flow with fallback message
      await sendMessage(inputMessage);
      await sendMessage("Sorry, I don't have the answer right now. Please contact support.");
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
      <ConversationsSidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onConversationSelect={setCurrentConversation}
        onNewConversation={startNewConversation}
      />

      {/* Chat Area */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">AI Assistant</CardTitle>
          
          {/* Category Dropdown */}
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-80">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {/* Category Questions as Bubbles */}
              <QuestionBubbles
                questions={categoryQuestions}
                onQuestionClick={handleQuestionClick}
              />

              <MessageList
                messages={messages}
                loading={loading}
                isLoadingResponse={isLoadingResponse}
                categoryQuestions={categoryQuestions}
              />
            </div>
          </ScrollArea>
          
          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSendMessage={handleSendMessage}
            loading={loading}
            isLoadingResponse={isLoadingResponse}
          />
        </CardContent>
      </Card>
    </div>
  );
}
