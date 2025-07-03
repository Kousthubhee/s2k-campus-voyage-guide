
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare, Plus, BarChart3, Edit, Trash2 } from 'lucide-react';
import { Poll, QAComment } from './hubTypes';

interface PollsTabProps {
  polls: Poll[];
  pollQuestion: string;
  pollOptions: string[];
  onChangeQuestion: (value: string) => void;
  onUpdateOption: (index: number, value: string) => void;
  onAddOption: () => void;
  onPublish: () => void;
  onVote: (pollId: number, optionIndex: number) => void;
  onLike: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onEdit: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onDelete: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  newComment: any;
  setNewComment: (comments: any) => void;
  onComment: (itemId: number, type: "post" | "reel" | "poll" | "blog") => void;
  onReply: (itemId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => void;
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
  onDelete,
  newComment,
  setNewComment,
  onComment,
  onReply
}) => {
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
                <div className="text-2xl">{poll.avatar}</div>
                <div>
                  <div className="font-semibold">{poll.author}</div>
                  <div className="text-sm text-gray-500">{poll.time}</div>
                </div>
              </div>
              {poll.author === 'You' && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(poll.id, 'poll')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(poll.id, 'poll')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold mb-4">{poll.question}</h3>
            
            <div className="space-y-2 mb-4">
              {poll.options.map((option, index) => {
                const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                
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
                        <span>{option.votes} votes ({percentage.toFixed(1)}%)</span>
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
                onClick={() => onLike(poll.id, 'poll')}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                {poll.likes}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {poll.comments.length}
              </Button>
            </div>

            {/* Comments Section */}
            <div className="space-y-3">
              {poll.comments.map((comment: QAComment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-semibold text-sm mb-1">{comment.author}</div>
                  <p className="text-sm mb-2">{comment.content}</p>
                  
                  {/* Reply Input */}
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Reply..."
                      value={newComment[`reply-poll-${poll.id}-${comment.id}`] || ''}
                      onChange={(e) => setNewComment({
                        ...newComment,
                        [`reply-poll-${poll.id}-${comment.id}`]: e.target.value
                      })}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => onReply(poll.id, comment.id, 'poll')}
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
                  value={newComment[`poll-${poll.id}`] || ''}
                  onChange={(e) => setNewComment({
                    ...newComment,
                    [`poll-${poll.id}`]: e.target.value
                  })}
                />
                <Button onClick={() => onComment(poll.id, 'poll')}>
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
