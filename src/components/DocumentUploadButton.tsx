
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadButtonProps {
  documentType: string;
  onUploadComplete?: (fileName: string) => void;
  isUploaded?: boolean;
}

export const DocumentUploadButton: React.FC<DocumentUploadButtonProps> = ({
  documentType,
  onUploadComplete,
  isUploaded = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(isUploaded);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, JPEG, or PNG files only.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUploaded(true);
      onUploadComplete?.(file.name);
      
      toast({
        title: "Upload successful",
        description: `${documentType} has been uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast({
      title: "Document removed",
      description: `${documentType} has been removed.`,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {uploaded ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <Check className="h-4 w-4" />
            <span>Uploaded</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUpload}
          disabled={uploading}
          className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700"
          title={`Upload ${documentType}`}
        >
          <Upload className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
