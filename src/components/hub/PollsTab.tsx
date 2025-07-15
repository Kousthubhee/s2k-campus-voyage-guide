
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare, Plus, BarChart3, Edit, Trash2 } from 'lucide-react';
import { HubPost } from '@/hooks/useHubPosts';
import { useHubComments } from '@/hooks/useHubComments';
import { HubCommentItem } from './HubCommentItem';
import { useAuth } from '@/hooks/useAuth';

interface PollsTabProps {
  polls: HubPost[];
  pollQuestion: string;
  pollOptions: string[];
  onChangeQuestion: (value: string) => void;
  onUpdateOption: (index: number, value: string) => void;
  onAddOption: () => void;
  onPublish: () => void;
  onVote: (pollId: string, optionIndex: number) => void;
  onLike: (postId: string) => void;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export const PollsTab: React.FC<PollsTabProps> = ({
  polls,
  pollQuestion,
  pollOptions,
  onChangeQuestion,
  onUpdateOption,
  onAddOption,
  onPublish,
  onVote,
  onLike,
  onEdit,
  onDelete
}) => {
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const { user } = useAuth();

  const PostComments: React.FC<{ postId: string }> = ({ postId }) => {
    const { comments, loading, addComment, updateComment, deleteComment } = useHubComments(postId);

    const handleAddComment = () => {
      const content = newComments[postId];
      if (content?.trim()) {
        addComment(content);
        setNewComments(prev => ({ ...prev, [postId]: '' }));
      }
    };

    return (
      <div className="space-y-3">
        {comments.map((comment) => (
          <HubCommentItem
            key={comment.id}
            comment={comment}
            onEdit={updateComment}
            onDelete={deleteComment}
            onReply={(content, parentId) => addComment(content, parentId)}
          />
        ))}
        
        {/* Add Comment */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={newComments[postId] || ''}
            onChange={(e) => setNewComments(prev => ({
              ...prev,
              [postId]: e.target.value
            }))}
          />
          <Button onClick={handleAddComment}>
            Comment
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Create New Poll */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Create a Poll
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="What's your question?"
            value={pollQuestion}
            onChange={(e) => onChangeQuestion(e.target.value)}
            className="mb-4"
          />
          
          {pollOptions.map((option, index) => (
            <Input
              key={index}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => onUpdateOption(index, e.target.value)}
              className="mb-2"
            />
          ))}
          
          <div className="flex gap-2 mb-4">
            <Button variant="outline" onClick={onAddOption}>
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
          
          <Button 
            onClick={onPublish} 
            disabled={!pollQuestion.trim() || pollOptions.some(opt => !opt.trim())}
          >
            Create Poll
          </Button>
        </CardContent>
      </Card>

      {/* Polls Feed */}
      {polls.map((poll) => (
        <Card key={poll.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg font-medium text-purple-600">
                  {poll.user_profile?.display_name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <div className="font-semibold">{poll.user_profile?.display_name || 'Anonymous'}</div>
                  <div className="text-sm text-gray-500">{new Date(poll.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              {user?.id === poll.user_id && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(poll.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(poll.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold mb-4">{poll.title}</h3>
            
            <div className="space-y-2 mb-4">
              {(poll.poll_options || []).map((option: any, index: number) => {
                const totalVotes = (poll.poll_options || []).reduce((sum: number, opt: any) => sum + (opt.votes || 0), 0);
                const percentage = totalVotes > 0 ? ((option.votes || 0) / totalVotes) * 100 : 0;
                
                return (
                  <div key={index} className="relative">
                    <Button
                      variant="outline"
                      className="w-full justify-start relative overflow-hidden"
                      onClick={() => onVote(poll.id, index)}
                    >
                      <div
                        className="absolute left-0 top-0 h-full bg-blue-100 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                      <span className="relative z-10 flex justify-between w-full">
                        <span>{option.text}</span>
                        <span>{option.votes || 0} votes ({percentage.toFixed(1)}%)</span>
                      </span>
                    </Button>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(poll.id)}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                {poll.likes_count}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {poll.comments_count}
              </Button>
            </div>

            {/* Comments Section */}
            <PostComments postId={poll.id} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
