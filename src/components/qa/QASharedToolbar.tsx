
import { Bookmark } from "lucide-react";

type QASharedToolbarProps = {
  onShowBookmarks?: () => void;
  showBookmarks?: boolean;
};

export function QASharedToolbar({
  onShowBookmarks,
  showBookmarks,
}: QASharedToolbarProps) {
  return (
    <div className="flex items-center gap-3 mb-3 justify-end">
      {onShowBookmarks && (
        <button
          onClick={onShowBookmarks}
          className={`p-2 rounded border ${showBookmarks ? "bg-yellow-200 border-yellow-600" : "bg-white border-gray-300"}`}
          title="View Bookmarked Answers"
          type="button"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
