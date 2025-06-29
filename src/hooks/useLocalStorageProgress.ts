
import { useEffect, useState } from "react";

const STORAGE_KEY = "userChecklistProgress";

const defaultProgress = {
  keys: 4,
  completedModules: [],
  unlockedModules: ['school', 'pre-arrival-1', 'pre-arrival-2'],
  currentPage: 'checklist'
};

export function useLocalStorageProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  // Save on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const resetProgress = () => setProgress(defaultProgress);

  return [progress, setProgress, resetProgress] as const;
}
