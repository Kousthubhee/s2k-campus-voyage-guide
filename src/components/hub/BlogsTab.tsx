
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { Blog, QAComment } from './hubTypes';

interface BlogsTabProps {
  blogTitle: string;
  blogContent: string;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
  onPublish: () => void;
  blogs: Blog[];
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

export const BlogsTab: React.FC<BlogsTabProps> = ({
  blogTitle,
  blogContent,
  onChangeTitle,
  onChangeContent,
  onPublish,
  blogs,
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
  return (
    <>
      {/* Create New Blog */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Blog title..."
            value={blogTitle}
            onChange={(e) => onChangeTitle(e.target.value)}
            className="mb-4"
          />
          <Textarea
            placeholder="Share your detailed experience, tips, or story..."
            value={blogContent}
            onChange={(e) => onChangeContent(e.target.value)}
            className="mb-4 min-h-32"
          />
          <Button onClick={onPublish} disabled={!blogTitle.trim() || !blogContent.trim()}>
            Publish Blog
          </Button>
        </CardContent>
      </Card>

      {/* Blogs Feed */}
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📝</div>
                <div>
                  <div className="font-semibold">{blog.author}</div>
                  <div className="text-sm text-gray-500">{blog.time}</div>
                </div>
              </div>
              {blog.author === 'You' && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(blog.id, 'blog')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(blog.id, 'blog')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
            <p className="mb-4">{blog.content}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(blog.id, 'blog')}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                {blog.likes}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {blog.comments.length}
              </Button>
            </div>

            {/* Comments Section */}
            <div className="space-y-3">
              {blog.comments.map((comment: QAComment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-sm">{comment.author}</div>
                    {comment.author === 'You' && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditComment(blog.id, comment.id, 'blog')}
                          className="h-6 w-6 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteComment(blog.id, comment.id, 'blog')}
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
                      value={newComment[`reply-blog-${blog.id}-${comment.id}`] || ''}
                      onChange={(e) => setNewComment({
                        ...newComment,
                        [`reply-blog-${blog.id}-${comment.id}`]: e.target.value
                      })}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => onReply(blog.id, comment.id, 'blog')}
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
                  value={newComment[`blog-${blog.id}`] || ''}
                  onChange={(e) => setNewComment({
                    ...newComment,
                    [`blog-${blog.id}`]: e.target.value
                  })}
                />
                <Button onClick={() => onComment(blog.id, 'blog')}>
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
