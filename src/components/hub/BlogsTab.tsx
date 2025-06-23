import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Edit, Heart, MessageSquare } from 'lucide-react';
import { Blog, QAComment, QAReply } from './hubTypes';

interface BlogsTabProps {
  blogTitle: string;
  blogContent: string;
  onChangeTitle: (val: string) => void;
  onChangeContent: (val: string) => void;
  onPublish: () => void;
  blogs: Blog[];
  onLike: (id: number, type: "post" | "reel" | "poll" | "blog") => void;
  newComment: any;
  setNewComment: (a: any) => void;
  onComment: (id: number, type: "post" | "reel" | "poll" | "blog") => void;
  onReply: (
    itemId: number,
    commentId: number,
    type: "post" | "reel" | "poll" | "blog"
  ) => void;
}

export function BlogsTab({
  blogTitle,
  blogContent,
  onChangeTitle,
  onChangeContent,
  onPublish,
  blogs,
  onLike,
  newComment,
  setNewComment,
  onComment,
  onReply,
}: BlogsTabProps) {
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Edit className="h-5 w-5 mr-2 text-blue-600" />
            Write a Blog
          </h3>
          <Input
            placeholder="Blog title"
            className="mb-4"
            value={blogTitle}
            onChange={(e) => onChangeTitle(e.target.value)}
          />
          <Textarea
            value={blogContent}
            onChange={(e) => onChangeContent(e.target.value)}
            placeholder="Write your blog post here..."
            className="mb-4 h-40"
          />
          <Button size="sm" onClick={onPublish}>
            Publish
          </Button>
        </CardContent>
      </Card>
      {blogs.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">📝</div>
                <div>
                  <div className="font-semibold text-gray-900">{item.author}</div>
                  <div className="text-sm text-gray-500">{item.time}</div>
                </div>
              </div>
            </div>
            <h4 className="text-lg font-semibold">{item.title}</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <button
                className="flex items-center hover:text-red-500"
                onClick={() => onLike(item.id, 'blog')}
              >
                <Heart className="h-4 w-4 mr-1" />
                {item.likes}
              </button>
              <span className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                {item.comments.length}
              </span>
            </div>
            <div className="mt-4">
              <Textarea
                placeholder="Write a comment..."
                className="mb-2 h-16"
                value={newComment[`blog-${item.id}`] || ''}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    [`blog-${item.id}`]: e.target.value
                  })
                }
              />
              <Button
                size="sm"
                onClick={() => onComment(item.id, 'blog')}
                disabled={!newComment[`blog-${item.id}`]}
              >
                Comment
              </Button>
            </div>
            {item.comments.length > 0 && (
              <div className="mt-4 space-y-4">
                {item.comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-gray-900 mr-2">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.time || 'Just now'}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <div className="mt-2">
                      <Input
                        placeholder="Write a reply..."
                        className="mb-2"
                        value={newComment[`reply-blog-${item.id}-${comment.id}`] || ''}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            [`reply-blog-${item.id}-${comment.id}`]: e.target.value
                          })
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() => onReply(item.id, comment.id, 'blog')}
                        disabled={!newComment[`reply-blog-${item.id}-${comment.id}`]}
                      >
                        Reply
                      </Button>
                    </div>
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-2 space-y-2 pl-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="border-l-2 border-gray-300 pl-4">
                            <div className="flex items-center mb-1">
                              <span className="font-semibold text-gray-900 mr-2">{reply.author}</span>
                              <span className="text-sm text-gray-500">{reply.time || 'Just now'}</span>
                            </div>
                            <p className="text-gray-700">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
