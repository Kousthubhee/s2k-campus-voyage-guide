
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';

interface MiniChatbotProps {
  pageContext: string;
}

export function MiniChatbot({ pageContext }: MiniChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: `Hello! I'm here to help with your ${pageContext} questions. What would you like to know?`, isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
      
      // Simple responses based on page context
      setTimeout(() => {
        let response = "I'm a demo chatbot. For detailed help, please use the main Q&A section.";
        
        if (pageContext.includes('Pre-Arrival')) {
          response = "For pre-arrival help: Make sure to start your Campus France process early, gather all required documents, and check visa processing times in your region.";
        } else if (pageContext.includes('Post-Arrival')) {
          response = "For post-arrival help: Priority should be opening a bank account first, then applying for social security, followed by health insurance and CAF applications.";
        }
        
        setMessages(prev => [...prev, { text: response, isUser: false }]);
      }, 1000);
      
      setInputValue('');
    }
  };

  return (
    <div className="fixed bottom-8 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-80 h-96 shadow-lg translate-y-[-30px]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Ask Me Anything</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-2 mb-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-xs ${
                    message.isUser
                      ? 'bg-blue-600 text-white ml-auto max-w-[80%]'
                      : 'bg-gray-100 text-gray-800 mr-auto max-w-[80%]'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="text-xs"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="h-8 w-8"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
