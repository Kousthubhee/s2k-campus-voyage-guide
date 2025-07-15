
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Save, X } from 'lucide-react';

interface SaveChangesPromptProps {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
  onDiscard: () => void;
}

export const SaveChangesPrompt: React.FC<SaveChangesPromptProps> = ({
  hasUnsavedChanges,
  isSaving,
  onSave,
  onDiscard
}) => {
  if (!hasUnsavedChanges) return null;

  return (
    <Card className="fixed bottom-4 right-4 z-50 bg-yellow-50 border-yellow-200 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-800">
              You have unsaved changes
            </p>
            <p className="text-xs text-yellow-600">
              Save your progress before leaving this page
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-3 w-3 mr-1" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDiscard}
              disabled={isSaving}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <X className="h-3 w-3 mr-1" />
              Discard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
