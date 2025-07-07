
import { MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: string;
  created_at: string;
}

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  isLoadingResponse: boolean;
  categoryQuestions: Array<{id: string, question: string}>;
}

export function MessageList({ messages, loading, isLoadingResponse, categoryQuestions }: MessageListProps) {
  if (messages.length === 0 && categoryQuestions.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Start a conversation with the AI assistant</p>
        <p className="text-sm mt-2">Select a category above or type your question below</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
  );
}
