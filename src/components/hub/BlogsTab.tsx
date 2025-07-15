
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageSquare, FileText, Edit, Trash2 } from 'lucide-react';
import { HubPost } from '@/hooks/useHubPosts';
import { useHubComments } from '@/hooks/useHubComments';
import { HubCommentItem } from './HubCommentItem';
import { useAuth } from '@/hooks/useAuth';

interface BlogsTabProps {
  blogs: HubPost[];
  blogTitle: string;
  blogContent: string;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
  onPublish: () => void;
  onLike: (postId: string) => void;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export const BlogsTab: React.FC<BlogsTabProps> = ({
  blogs,
  blogTitle,
  blogContent,
  onChangeTitle,
  onChangeContent,
  onPublish,
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
      {/* Create New Blog */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Write a Blog Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Blog title..."
            value={blogTitle}
            onChange={(e) => onChangeTitle(e.target.value)}
            className="mb-4"
          />
          <Textarea
            placeholder="Share your thoughts, experiences, or insights..."
            value={blogContent}
            onChange={(e) => onChangeContent(e.target.value)}
            className="mb-4 min-h-[150px]"
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
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg font-medium text-purple-600">
                  {blog.user_profile?.display_name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <div className="font-semibold">{blog.user_profile?.display_name || 'Anonymous'}</div>
                  <div className="text-sm text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              {user?.id === blog.user_id && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(blog.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(blog.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-bold mb-3">{blog.title}</h2>
            <div className="prose max-w-none mb-4">
              <p className="whitespace-pre-wrap">{blog.content}</p>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(blog.id)}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                {blog.likes_count}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {blog.comments_count}
              </Button>
            </div>

            {/* Comments Section */}
            <PostComments postId={blog.id} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
