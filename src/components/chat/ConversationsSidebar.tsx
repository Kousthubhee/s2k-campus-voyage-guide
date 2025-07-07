
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Plus } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
}

interface ConversationsSidebarProps {
  conversations: Conversation[];
  currentConversation: string | null;
  onConversationSelect: (id: string) => void;
  onNewConversation: () => void;
}

export function ConversationsSidebar({ 
  conversations, 
  currentConversation, 
  onConversationSelect, 
  onNewConversation 
}: ConversationsSidebarProps) {
  return (
    <Card className="w-1/3">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Conversations</CardTitle>
          <Button size="sm" onClick={onNewConversation}>
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
                onClick={() => onConversationSelect(conversation.id)}
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
  );
}
