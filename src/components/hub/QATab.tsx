
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MessageSquare, Heart, Edit, Trash2 } from 'lucide-react';
import { QAPost, QAComment } from './hubTypes';

interface QATabProps {
  qaPosts: QAPost[];
  newPost: string;
  onNewPostChange: (value: string) => void;
  onPublishPost: () => void;
  onLike: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onEdit: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onDelete: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  newComment: any;
  setNewComment: (comments: any) => void;
  onComment: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onReply: (itemId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => void;
}

export const QATab: React.FC<QATabProps> = ({
  qaPosts,
  newPost,
  onNewPostChange,
  onPublishPost,
  onLike,
  onEdit,
  onDelete,
  newComment,
  setNewComment,
  onComment,
  onReply
}) => {
  return (
    <>
      {/* Create New Post */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind? Share your experience, ask questions..."
            value={newPost}
            onChange={(e) => onNewPostChange(e.target.value)}
            className="mb-4"
          />
          <Button onClick={onPublishPost} disabled={!newPost.trim()}>
            Post
          </Button>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      {qaPosts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{post.avatar}</div>
                <div>
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-sm text-gray-500">{post.time}</div>
                </div>
              </div>
              {post.author === 'You' && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(post.id, 'post')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(post.id, 'post')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <p className="mb-4">{post.content}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(post.id, 'post')}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {post.comments.length}
              </Button>
            </div>

            {/* Comments Section */}
            <div className="space-y-3">
              {post.comments.map((comment: QAComment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-sm">{comment.author}</div>
                    {comment.author === 'You' && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newContent = prompt('Edit your comment:', comment.content);
                            if (newContent && newContent.trim()) {
                              // Handle comment edit - you'd need to implement this
                              console.log('Edit comment:', comment.id, newContent);
                            }
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm('Delete this comment?')) {
                              // Handle comment delete - you'd need to implement this
                              console.log('Delete comment:', comment.id);
                            }
                          }}
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm mb-2">{comment.content}</p>
                  
                  {/* Reply Input */}
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Reply..."
                      value={newComment[`reply-post-${post.id}-${comment.id}`] || ''}
                      onChange={(e) => setNewComment({
                        ...newComment,
                        [`reply-post-${post.id}-${comment.id}`]: e.target.value
                      })}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => onReply(post.id, comment.id, 'post')}
                    >
                      Reply
                    </Button>
                  </div>

                  {/* Replies */}
                  {comment.replies?.map((reply) => (
                    <div key={reply.id} className="ml-4 mt-2 p-2 bg-white rounded">
                      <div className="font-semibold text-xs">{reply.author}</div>
                      <p className="text-xs">{reply.content}</p>
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Add Comment */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment[`post-${post.id}`] || ''}
                  onChange={(e) => setNewComment({
                    ...newComment,
                    [`post-${post.id}`]: e.target.value
                  })}
                />
                <Button onClick={() => onComment(post.id, 'post')}>
                  Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
