
import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useHubComments } from '@/hooks/useHubComments';
import { HubCommentItem } from './HubCommentItem';
import { Skeleton } from '@/components/ui/skeleton';

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

  // Memoize the comments list to prevent unnecessary re-renders
  const commentsList = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      );
    }

    if (comments.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">
          No comments yet. Be the first to comment!
        </div>
      );
    }

    return comments.map((comment) => (
      <HubCommentItem
        key={comment.id}
        comment={comment}
        onEdit={updateComment}
        onDelete={deleteComment}
        onReply={addComment}
      />
    ));
  }, [comments, loading, updateComment, deleteComment, addComment]);

  return (
    <div className="space-y-4">
      {/* Comments List */}
      <div className="space-y-3">
        {commentsList}
      </div>
      
      {/* Add Comment */}
      <div className="flex gap-2">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button 
          onClick={handleAddComment} 
          disabled={!newComment.trim() || loading}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};
