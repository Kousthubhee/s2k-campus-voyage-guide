
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { faqCategories } from "@/data/faqCategories";
import { QAMessageItem } from "./QAMessageItem";
import styles from "./QAPage.module.css";
import { useAuth } from '@/hooks/useAuth';

interface MessageItem {
  id: number;
  type: "user" | "bot";
  message: string;
}

export const QAPage = () => {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm here to help you with any questions about studying in France. What would you like to know?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState(faqCategories[0].label);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth();

  const sendBotReply = (userMsg: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          message: `Thanks for your question about "${userMsg}". I can help you with information about studying in France, visa requirements, accommodation, banking, and student life. What specific aspect would you like to know more about?`,
        } as MessageItem,
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const messageText = newMessage.trim();
    const userMessage: MessageItem = {
      id: messages.length + 1,
      type: "user",
      message: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    sendBotReply(messageText);
  };

  const handleQuickQuestion = (q: string) => {
    setNewMessage(q);
  };

  const getMessageTags = (msg: MessageItem) => {
    if (msg.type === "bot") {
      return ["Bot"];
    }
    return [];
  };

  const toggleBookmarkMessage = (id: number) => {
    // Placeholder for bookmark functionality
  };

  const handleRateMessage = (id: number, val: number) => {
    // Placeholder for rating functionality
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center">
            <MessageSquare className="h-8 w-8 mr-3 text-blue-600" />
            Ask Me Anything
          </h1>
          <p className="text-lg text-gray-600">
            Please sign in to use the AI assistant
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center">
            <MessageSquare className="h-8 w-8 mr-3 text-blue-600" />
            Ask Me Anything
          </h1>
          <p className="text-lg text-gray-600">
            Get instant answers to your questions about studying in France
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <Card className="h-96 mb-6">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <QAMessageItem
                      key={msg.id}
                      id={msg.id}
                      type={msg.type}
                      message={msg.message}
                      isBookmarked={false}
                      toggleBookmark={() => toggleBookmarkMessage(msg.id)}
                      tags={getMessageTags(msg)}
                      showRating={msg.type === "bot"}
                      onRate={(val) => handleRateMessage(msg.id, val)}
                    />
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2 animate-fade-in">
                      <div className="p-2 rounded-full bg-gray-200 text-gray-600 mr-2">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100 text-gray-900 flex items-center gap-2">
                        <span className={styles["dot-flash"]} />
                        <span className={styles["dot-flash"]} />
                        <span className={styles["dot-flash"]} />
                        <span className="ml-2">typing...</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <form
                  className="p-4 border-t border-gray-200"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your question here..."
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && !isTyping && newMessage.trim()) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      className="flex-shrink-0"
                      disabled={!newMessage.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Questions</h3>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList>
              {faqCategories.map((cat) => (
                <TabsTrigger
                  key={cat.label}
                  value={cat.label}
                  className="capitalize"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {faqCategories.map((cat) => (
              <TabsContent value={cat.label} key={cat.label}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {cat.questions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto p-3 text-left"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
