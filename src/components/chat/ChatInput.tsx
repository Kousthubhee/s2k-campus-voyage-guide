
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  loading: boolean;
  isLoadingResponse: boolean;
}

export function ChatInput({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  loading, 
  isLoadingResponse 
}: ChatInputProps) {
  return (
    <form onSubmit={onSendMessage} className="p-4 border-t">
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
  );
}
