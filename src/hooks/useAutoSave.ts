
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface AutoSaveOptions {
  onSave: () => Promise<void>;
  delay?: number; // milliseconds
  enabled?: boolean;
}

export const useAutoSave = ({ onSave, delay = 2000, enabled = true }: AutoSaveOptions) => {
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const saveRef = useRef(onSave);
  
  // Update ref when onSave changes
  useEffect(() => {
    saveRef.current = onSave;
  }, [onSave]);

  const triggerAutoSave = () => {
    if (!enabled) return;
    
    setHasUnsavedChanges(true);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      try {
        await saveRef.current();
        setHasUnsavedChanges(false);
        console.log('Auto-saved successfully');
      } catch (error) {
        console.error('Auto-save failed:', error);
        toast.error('Auto-save failed');
      } finally {
        setIsSaving(false);
      }
    }, delay);
  };

  const saveNow = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setIsSaving(true);
    try {
      await saveRef.current();
      setHasUnsavedChanges(false);
      toast.success('Saved successfully');
    } catch (error) {
      console.error('Manual save failed:', error);
      toast.error('Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    triggerAutoSave,
    saveNow,
    isSaving,
    hasUnsavedChanges
  };
};
