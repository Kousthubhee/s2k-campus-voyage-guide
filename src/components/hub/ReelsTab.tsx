
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Video, Heart, MessageSquare } from 'lucide-react'; // Removed Share2
import { Reel, QAComment, QAReply } from './hubTypes';

interface ReelsTabProps {
  reels: Reel[];
  newReel: string | null;
  newReelCaption: string;
  onReelUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCaption: (val: string) => void;
  onPublish: () => void;
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

export function ReelsTab({
  reels,
  newReel,
  newReelCaption,
  onReelUpload,
  onChangeCaption,
  onPublish,
  onLike,
  newComment,
  setNewComment,
  onComment,
  onReply,
}: ReelsTabProps) {
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Video className="h-5 w-5 mr-2 text-red-600" />
            Upload a Reel
          </h3>
          <Input type="file" accept="video/*" onChange={onReelUpload} className="mb-4" />
          {newReel && <video src={newReel} controls className="w-full rounded-lg mb-4" />}
          <Textarea
            placeholder="Add a caption..."
            className="mb-4"
            value={newReelCaption}
            onChange={(e) => onChangeCaption(e.target.value)}
          />
          <Button size="sm" onClick={onPublish}>
            Post
          </Button>
        </CardContent>
      </Card>
      {reels.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{item.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900">{item.author}</div>
                  <div className="text-sm text-gray-500">{item.time}</div>
                </div>
              </div>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">{item.category}</span>
            </div>
            <video src={item.videoUrl} controls className="w-full rounded-lg mb-4" />
            <p className="text-gray-700 mt-2">{item.caption}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <button
                className="flex items-center hover:text-red-500"
                onClick={() => onLike(item.id, item.type)}
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
                value={newComment[`${item.type}-${item.id}`] || ''}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    [`${item.type}-${item.id}`]: e.target.value
                  })
                }
              />
              <Button
                size="sm"
                onClick={() => onComment(item.id, item.type)}
                disabled={!newComment[`${item.type}-${item.id}`]}
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
                        value={newComment[`reply-${item.type}-${item.id}-${comment.id}`] || ''}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            [`reply-${item.type}-${item.id}-${comment.id}`]: e.target.value
                          })
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() => onReply(item.id, comment.id, item.type)}
                        disabled={!newComment[`reply-${item.type}-${item.id}-${comment.id}`]}
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
  )
}
