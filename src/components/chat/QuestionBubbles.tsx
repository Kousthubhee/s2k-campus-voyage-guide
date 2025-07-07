
import { Button } from '@/components/ui/button';

interface Question {
  id: string;
  question: string;
}

interface QuestionBubblesProps {
  questions: Question[];
  onQuestionClick: (questionText: string) => void;
}

export function QuestionBubbles({ questions, onQuestionClick }: QuestionBubblesProps) {
  if (questions.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Choose a question:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q) => (
          <Button
            key={q.id}
            variant="outline"
            size="sm"
            className="text-left h-auto p-2 text-xs"
            onClick={() => onQuestionClick(q.question)}
          >
            {q.question}
          </Button>
        ))}
      </div>
    </div>
  );
}
