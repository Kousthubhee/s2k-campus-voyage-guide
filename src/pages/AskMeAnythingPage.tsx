
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageCircle, Plus, X, Menu, LogIn } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';

export const AskMeAnythingPage = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [showConversations, setShowConversations] = useState(false);
  const { user, signInWithGoogle } = useAuth();
  const {
    conversations,
    currentConversation,
    setCurrentConversation,
    messages,
    loading,
    createConversation,
    sendMessage,
    deleteConversation
  } = useChat();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !user) return;

    let conversationId = currentConversation;
    if (!conversationId) {
      conversationId = await createConversation();
      if (!conversationId) return;
    }

    await sendMessage(inputMessage);
    setInputMessage('');
  };

  const startNewConversation = async () => {
    await createConversation();
    setShowConversations(false);
  };

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteConversation(conversationId);
  };

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto h-[calc(100vh-200px)]">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask Me Anything</h1>
          <p className="text-lg text-gray-600">
            Your AI-powered assistant for studying in France
          </p>
        </div>

        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3 shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Online</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
            <MessageCircle className="h-16 w-16 mx-auto mb-6 opacity-50 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Sign in to start chatting</h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Please sign in to use the AI chat feature and get personalized assistance for studying in France.
            </p>
            <Button onClick={handleLogin} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-200px)]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask Me Anything</h1>
        <p className="text-lg text-gray-600">
          Your AI-powered assistant for studying in France
        </p>
      </div>

      <div className="flex h-full gap-4">
        {/* Conversations Sidebar - Compact and hidden by default */}
        <div className={`${showConversations ? 'block' : 'hidden'} w-64 shrink-0`}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Conversations</CardTitle>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={startNewConversation} className="h-6 w-6 p-0">
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowConversations(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100%-60px)]">
                <div className="p-2 space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`group flex items-center justify-between p-2 rounded cursor-pointer transition-colors text-xs ${
                        currentConversation === conversation.id 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setCurrentConversation(conversation.id);
                        setShowConversations(false);
                      }}
                    >
                      <div className="flex items-center gap-1 flex-1 min-w-0">
                        <MessageCircle className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{conversation.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDeleteConversation(conversation.id, e)}
                        className="h-4 w-4 p-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100"
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </div>
                  ))}
                  {conversations.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      No conversations yet
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area - Takes full width when sidebar is hidden */}
        <div className="flex-1 min-w-0">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConversations(!showConversations)}
                    className="h-8 w-8 p-0"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Online</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-12">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Start a conversation</p>
                      <p className="text-sm">Ask about studying in France, visa requirements, or living costs</p>
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
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <form onSubmit={handleSendMessage} className="p-4 border-t shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about studying in France..."
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={loading || !inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
