
export interface TrendingQuestionsProps {
  questions: string[];
  onSelect: (q: string) => void;
}

export function TrendingQuestions({ questions, onSelect }: TrendingQuestionsProps) {
  if (!questions.length) return null;
  return (
    <aside className="bg-gray-50 border-l px-4 py-3 min-w-[220px] max-w-xs">
      <h4 className="font-semibold mb-2 text-gray-900 text-sm">Trending Q's</h4>
      <ul className="space-y-1">
        {questions.map((q, i) => (
          <li key={i}>
            <button
              onClick={() => onSelect(q)}
              className="text-left w-full text-xs text-blue-700 underline hover:text-blue-900 focus:outline-none"
              type="button"
              tabIndex={0}
            >
              {q}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
