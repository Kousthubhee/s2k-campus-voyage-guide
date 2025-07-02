
import React, { useState } from "react";
import { User, Bot, FileUp, Bookmark, Clipboard, Tag, ThumbsUp, ThumbsDown } from "lucide-react";

interface QAMessageItemProps {
  id: number;
  type: "user" | "bot";
  message: string;
  file?: string;
  fileName?: string;
  isBookmarked?: boolean;
  toggleBookmark?: () => void;
  tags?: string[];
  showRating?: boolean;
  onRate?: (val: "up" | "down") => void;
  onShare?: () => void;
}

export const QAMessageItem: React.FC<QAMessageItemProps> = ({
  type,
  message,
  file,
  fileName,
  isBookmarked,
  toggleBookmark,
  tags,
  showRating,
  onRate,
  onShare,
}) => {
  const [clipboardCopied, setClipboardCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(message);
    setClipboardCopied(true);
    setTimeout(() => setClipboardCopied(false), 1500);
    if (onShare) onShare();
  }

  return (
    <div className={`flex ${type === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-start max-w-xs lg:max-w-md ${type === "user" ? "flex-row-reverse" : ""}`}>
        <div className={`p-2 rounded-full ${type === "user" ? "bg-blue-600 text-white ml-2" : "bg-gray-200 text-gray-600 mr-2"}`}>
          {type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        <div className={`p-3 rounded-lg ${type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
          <div className="flex items-center justify-between">
            {tags && tags.length > 0 && (
              <div className="flex gap-1 mb-1">
                {tags.map((tag) => (
                  <span className="text-xxs bg-purple-100 text-purple-700 px-2 py-0.5 rounded" key={tag}>
                    <Tag className="inline h-3 w-3 mr-1 align-text-top" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {toggleBookmark && (
              <button
                onClick={toggleBookmark}
                className="ml-2 text-yellow-500 hover:text-yellow-600"
                title={isBookmarked ? "Bookmarked" : "Save this Answer"}
                type="button"
              >
                <Bookmark fill={isBookmarked ? "#FFD700" : "none"} className="h-5 w-5" />
              </button>
            )}
          </div>
          {message}
          {/* Show preview if message has file */}
          {file && (
            <div className="mt-2">
              {file.startsWith("data:image") ? (
                <img src={file} alt={fileName || ""} className="h-24 max-w-full rounded border" />
              ) : (
                <div className="flex items-center gap-1 text-sm text-blue-800">
                  <FileUp className="h-4 w-4" />
                  {fileName}
                </div>
              )}
            </div>
          )}
          <div className="flex gap-2 mt-2 items-center">
            <button
              onClick={handleCopy}
              className="flex items-center text-gray-500 hover:text-blue-700 text-xs"
              title={clipboardCopied ? "Copied!" : "Copy Answer"}
              type="button"
            >
              <Clipboard className="h-4 w-4 mr-1" />
              {clipboardCopied ? "Copied!" : "Share"}
            </button>
            {showRating && (
              <>
                <button onClick={() => onRate?.("up")} className="text-green-600 text-xs ml-2" type="button">
                  <ThumbsUp className="inline h-4 w-4" /> Helpful
                </button>
                <button onClick={() => onRate?.("down")} className="text-red-500 text-xs ml-1" type="button">
                  <ThumbsDown className="inline h-4 w-4" /> Not Helpful
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
