
import { useState } from "react";

export function useQAUserPrefs() {
  const [showBookmarks, setShowBookmarks] = useState(false);
  return { showBookmarks, setShowBookmarks };
}
