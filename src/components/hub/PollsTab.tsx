import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Heart } from 'lucide-react';
import { Poll, QAComment, QAReply } from './hubTypes';

interface PollsTabProps {
  polls: Poll[];
  pollQuestion: string;
  pollOptions: string[];
  onChangeQuestion: (val: string) => void;
  onUpdateOption: (idx: number, val: string) => void;
  onAddOption: () => void;
  onPublish: () => void;
  onVote: (pollId: number, optionIndex: number) => void;
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

export const PollsTab = ({
  polls,
  pollQuestion,
  pollOptions,
  onChangeQuestion,
  onUpdateOption,
  onAddOption,
  onPublish,
  onVote,
  onLike,
  newComment,
  setNewComment,
  onComment,
  onReply
}: PollsTabProps) => (
  <Card>
    <CardContent className="p-6">
      <h2 className="text-lg font-semibold mb-4">Create a Poll</h2>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Ask a question"
          value={pollQuestion}
          onChange={(e) => onChangeQuestion(e.target.value)}
        />
      </div>
      {pollOptions.map((option, index) => (
        <div key={index} className="mb-2 flex space-x-2">
          <Input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => onUpdateOption(index, e.target.value)}
          />
        </div>
      ))}
      <Button variant="secondary" onClick={onAddOption} className="mb-4">
        Add Option
      </Button>
      <Button onClick={onPublish} className="w-full">
        Publish Poll
      </Button>

      <h2 className="text-lg font-semibold mt-6 mb-4">Community Polls</h2>
      {polls.map((poll) => (
        <div key={poll.id} className="mb-6 p-4 border rounded-md">
          <div className="flex items-center mb-2">
            <span className="text-gray-700 mr-2">{poll.avatar}</span>
            <span className="font-semibold">{poll.author}</span>
            <span className="text-gray-500 ml-2">{poll.time}</span>
          </div>
          <p className="mb-3">{poll.question}</p>
          {poll.options.map((option, index) => (
            <div key={index} className="mb-2">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => onVote(poll.id, index)}
              >
                {option.text}
                <span className="text-gray-500">{option.votes} votes</span>
              </Button>
            </div>
          ))}
          <div className="flex items-center justify-between mt-4">
            <Button variant="ghost" size="sm" onClick={() => onLike(poll.id, 'poll')}>
              <Heart className="h-4 w-4 mr-2" />
              Like ({poll.likes})
            </Button>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>{poll.comments.length}</span>
            </div>
          </div>
          {poll.comments.map((comment) => (
            <div key={comment.id} className="mt-3 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center mb-1">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-gray-500 ml-2">{comment.time}</span>
              </div>
              <p>{comment.content}</p>
              {comment.replies.map((reply) => (
                <div key={reply.id} className="mt-2 ml-5 p-2 bg-gray-100 rounded-md">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold">{reply.author}</span>
                    <span className="text-gray-500 ml-2">{reply.time}</span>
                  </div>
                  <p>{reply.content}</p>
                  <Button variant="ghost" size="sm" onClick={() => onLike(reply.id, 'poll')}>
                    <Heart className="h-4 w-4 mr-2" />
                    Like ({reply.likes})
                  </Button>
                </div>
              ))}
              <div className="mt-2 ml-5">
                <Textarea
                  placeholder="Reply to comment"
                  value={newComment[`reply-poll-${poll.id}-${comment.id}`] || ''}
                  onChange={(e) => setNewComment({ ...newComment, [`reply-poll-${poll.id}-${comment.id}`]: e.target.value })}
                  className="mb-2"
                />
                <Button size="sm" onClick={() => onReply(poll.id, comment.id, 'poll')}>
                  Reply
                </Button>
              </div>
            </div>
          ))}
          <Textarea
            placeholder="Add a comment"
            value={newComment[`poll-${poll.id}`] || ''}
            onChange={(e) => setNewComment({ ...newComment, [`poll-${poll.id}`]: e.target.value })}
            className="mb-2 mt-3"
          />
          <Button size="sm" onClick={() => onComment(poll.id, 'poll')}>
            Comment
          </Button>
        </div>
      ))}
    </CardContent>
  </Card>
);
