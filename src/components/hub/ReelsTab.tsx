
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare, Video, Edit, Trash2 } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useHubComments } from '@/hooks/useHubComments';
import { Reel, QAComment } from './hubTypes';
import { toast } from 'sonner';

interface ReelsTabProps {
  reels: Reel[];
  newReel: string | null;
  newReelCaption: string;
  onReelUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCaption: (value: string) => void;
  onPublish: () => void;
  onLike: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onEdit: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onDelete: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  newComment: any;
  setNewComment: (comments: any) => void;
  onComment: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onReply: (itemId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onEditComment: (postId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onDeleteComment: (postId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => void;
}

export const ReelsTab: React.FC<ReelsTabProps> = ({
  reels,
  newReel,
  newReelCaption,
  onReelUpload,
  onChangeCaption,
  onPublish,
  onLike,
  onEdit,
  onDelete,
  newComment,
  setNewComment,
  onComment,
  onReply,
  onEditComment,
  onDeleteComment
}) => {
  const { uploadFile, uploading } = useFileUpload();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }

    try {
      const result = await uploadFile(file, 'documents');
      if (result) {
        // Pass the original event to maintain compatibility
        onReelUpload(e);
      }
    } catch (error) {
      console.error('File upload error:', error);
      toast.error('Failed to upload video');
    }
  };

  return (
    <>
      {/* Create New Reel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Share a Video Reel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="mb-4"
            disabled={uploading}
          />
          {uploading && (
            <p className="text-sm text-gray-500 mb-4">Uploading video...</p>
          )}
          {newReel && (
            <VideoPlayer
              src={newReel}
              className="w-full max-w-md mb-4 rounded-lg"
            />
          )}
          <Input
            placeholder="Add a caption..."
            value={newReelCaption}
            onChange={(e) => onChangeCaption(e.target.value)}
            className="mb-4"
          />
          <Button 
            onClick={onPublish} 
            disabled={!newReel || !newReelCaption.trim() || uploading}
          >
            Share Reel
          </Button>
        </CardContent>
      </Card>

      {/* Reels Feed */}
      {reels.map((reel) => (
        <ReelCard
          key={reel.id}
          reel={reel}
          onLike={onLike}
          onEdit={onEdit}
          onDelete={onDelete}
          newComment={newComment}
          setNewComment={setNewComment}
          onComment={onComment}
          onReply={onReply}
          onEditComment={onEditComment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </>
  );
};

// Separate component for individual reel cards
const ReelCard: React.FC<{
  reel: Reel;
  onLike: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onEdit: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onDelete: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  newComment: any;
  setNewComment: (comments: any) => void;
  onComment: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onReply: (itemId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onEditComment: (postId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onDeleteComment: (postId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => void;
}> = ({ 
  reel, 
  onLike, 
  onEdit, 
  onDelete, 
  newComment, 
  setNewComment, 
  onComment, 
  onReply, 
  onEditComment, 
  onDeleteComment 
}) => {
  const { comments, addComment, loading } = useHubComments(reel.id.toString());
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    
    console.log('Adding comment to reel:', reel.id, 'with text:', commentText);
    await addComment(commentText);
    setCommentText('');
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{reel.avatar}</div>
            <div>
              <div className="font-semibold">{reel.author}</div>
              <div className="text-sm text-gray-500">{reel.time}</div>
            </div>
          </div>
          {reel.author === 'You' && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(reel.id, 'reel')}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(reel.id, 'reel')}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <VideoPlayer
            src={reel.videoUrl}
            className="w-full max-w-md rounded-lg"
          />
        </div>
        
        <p className="mb-4">{reel.caption}</p>
        
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(reel.id, 'reel')}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            {reel.likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {comments.length}
          </Button>
        </div>

        {/* Comments Section */}
        <div className="space-y-3">
          {loading && <p className="text-sm text-gray-500">Loading comments...</p>}
          
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold text-sm">
                  {comment.user_profile?.display_name || 'Anonymous User'}
                </div>
                {comment.user_profile?.display_name === 'You' && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditComment(reel.id, parseInt(comment.id), 'reel')}
                      className="h-6 w-6 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteComment(reel.id, parseInt(comment.id), 'reel')}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-sm mb-2">{comment.content}</p>
              
              {/* Replies */}
              {comment.replies?.map((reply) => (
                <div key={reply.id} className="ml-4 mt-2 p-2 bg-white rounded">
                  <div className="font-semibold text-xs">
                    {reply.user_profile?.display_name || 'Anonymous User'}
                  </div>
                  <p className="text-xs">{reply.content}</p>
                </div>
              ))}
            </div>
          ))}
          
          {/* Add Comment */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddComment();
                }
              }}
            />
            <Button onClick={handleAddComment} disabled={!commentText.trim()}>
              Comment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
