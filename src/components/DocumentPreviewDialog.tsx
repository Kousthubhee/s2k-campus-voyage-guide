
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface DocumentPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    name: string;
    url: string;
    type: string;
  } | null;
}

export const DocumentPreviewDialog: React.FC<DocumentPreviewDialogProps> = ({
  isOpen,
  onClose,
  document: doc
}) => {
  if (!doc) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    link.click();
  };

  const isPdf = doc.type === 'application/pdf';
  const isImage = doc.type.startsWith('image/');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{doc.name}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          {isPdf && (
            <iframe
              src={doc.url}
              className="w-full h-[70vh] border rounded"
              title={doc.name}
            />
          )}
          
          {isImage && (
            <img
              src={doc.url}
              alt={doc.name}
              className="max-w-full h-auto mx-auto"
            />
          )}
          
          {!isPdf && !isImage && (
            <div className="flex items-center justify-center h-40 text-gray-500">
              <div className="text-center">
                <p>Preview not available for this file type</p>
                <Button
                  onClick={handleDownload}
                  className="mt-2"
                >
                  Download to view
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
