
import React from "react";
import { Button } from "@/components/ui/button";

interface DocumentSuggestion {
  name: string;
  type: string;
}
interface DocumentSuggestionsProps {
  suggestions: DocumentSuggestion[];
  onClick: (s: DocumentSuggestion) => void;
}

export const DocumentSuggestions: React.FC<DocumentSuggestionsProps> = ({ suggestions, onClick }) => (
  <div className="mb-6 flex flex-wrap gap-2 items-center">
    <span className="font-medium text-gray-700 mr-2">Quick Add:</span>
    {suggestions.map((s, idx) => (
      <Button
        key={idx}
        size="sm"
        variant="secondary"
        className="rounded-full px-4"
        onClick={() => onClick(s)}
        type="button"
      >
        {s.name}
      </Button>
    ))}
  </div>
);
