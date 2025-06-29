// This file is now replaced by useSupabaseProgress.ts
// Keeping minimal export for backward compatibility
export function useLocalStorageProgress() {
  console.warn('useLocalStorageProgress is deprecated. Use useSupabaseProgress instead.');
  return [{}, () => {}, () => {}] as const;
}
