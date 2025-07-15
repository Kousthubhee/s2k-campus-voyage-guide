
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageSquare, HelpCircle, Edit, Trash2 } from 'lucide-react';
import { HubPost } from '@/hooks/useHubPosts';
import { CommentSection } from './CommentSection';
import { useAuth } from '@/hooks/useAuth';

interface QATabProps {
  qaPosts: HubPost[];
  newPost: string;
  onNewPostChange: (value: string) => void;
  onPublishPost: () => void;
  onLike: (postId: string) => void;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export const QATab: React.FC<QATabProps> = ({
  qaPosts,
  newPost,
  onNewPostChange,
  onPublishPost,
  onLike,
  onEdit,
  onDelete
}) => {
  const { user } = useAuth();

  return (
    <>
      {/* Create New Q&A Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Ask a Question
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What would you like to know? Share your question with the community..."
            value={newPost}
            onChange={(e) => onNewPostChange(e.target.value)}
            className="mb-4 min-h-[120px]"
          />
          <Button onClick={onPublishPost} disabled={!newPost.trim()}>
            Post Question
          </Button>
        </CardContent>
      </Card>

      {/* Q&A Feed */}
      {qaPosts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg font-medium text-purple-600">
                  {post.user_profile?.display_name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <div className="font-semibold">{post.user_profile?.display_name || 'Anonymous'}</div>
                  <div className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              {user?.id === post.user_id && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(post.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(post.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(post.id)}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                {post.likes_count}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {post.comments_count}
              </Button>
            </div>

            {/* Comments Section */}
            <CommentSection postId={post.id} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
