
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useHubComments } from '@/hooks/useHubComments';
import { HubCommentItem } from './HubCommentItem';

interface CommentSectionProps {
  postId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const { comments, loading, addComment, updateComment, deleteComment } = useHubComments(postId);

  const handleAddComment = useCallback(async () => {
    if (newComment.trim()) {
      await addComment(newComment);
      setNewComment('');
    }
  }, [newComment, addComment]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddComment();
    }
  }, [handleAddComment]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading comments...</div>;
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <HubCommentItem
          key={comment.id}
          comment={comment}
          onEdit={updateComment}
          onDelete={deleteComment}
          onReply={addComment}
        />
      ))}
      
      {/* Add Comment */}
      <div className="flex gap-2">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleAddComment} disabled={!newComment.trim()}>
          Comment
        </Button>
      </div>
    </div>
  );
};
