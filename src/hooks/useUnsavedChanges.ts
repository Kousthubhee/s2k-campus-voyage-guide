
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface UnsavedChangesOptions {
  onSave: () => Promise<void>;
  onDiscard: () => void;
}

export const useUnsavedChanges = ({ onSave, onDiscard }: UnsavedChangesOptions) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const markAsChanged = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  const markAsSaved = useCallback(() => {
    setHasUnsavedChanges(false);
  }, []);

  const saveChanges = useCallback(async () => {
    if (!hasUnsavedChanges) return;
    
    setIsSaving(true);
    try {
      await onSave();
      setHasUnsavedChanges(false);
      toast.success('Changes saved successfully!');
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  }, [hasUnsavedChanges, onSave]);

  const promptBeforeLeaving = useCallback(() => {
    if (hasUnsavedChanges) {
      const shouldSave = window.confirm('You have unsaved changes. Do you want to save them before leaving?');
      if (shouldSave) {
        return saveChanges();
      } else {
        onDiscard();
        setHasUnsavedChanges(false);
      }
    }
    return Promise.resolve();
  }, [hasUnsavedChanges, saveChanges, onDiscard]);

  return {
    hasUnsavedChanges,
    isSaving,
    markAsChanged,
    markAsSaved,
    saveChanges,
    promptBeforeLeaving
  };
};
