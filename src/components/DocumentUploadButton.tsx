
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

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
  const { user } = useAuth();

  const handleUpload = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload documents.",
        variant: "destructive",
      });
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

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
      // Upload to Supabase Storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error('Failed to upload file to storage');
      }

      // Save file info to user_documents table
      const { data, error: dbError } = await supabase
        .from('user_documents')
        .insert({
          user_id: user.id,
          name: file.name,
          type: documentType,
          file_name: file.name,
          file_url: fileName,
          status: 'valid',
          is_important: false
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        // Try to clean up the uploaded file if database insert fails
        await supabase.storage.from('documents').remove([fileName]);
        throw new Error('Failed to save document information');
      }

      setUploaded(true);
      onUploadComplete?.(file.name);
      
      toast({
        title: "Upload successful",
        description: `${documentType} has been uploaded and stored securely.`,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!user) return;

    try {
      // Find and remove the document from database
      const { data: documents } = await supabase
        .from('user_documents')
        .select('id, file_url')
        .eq('user_id', user.id)
        .eq('type', documentType)
        .order('created_at', { ascending: false })
        .limit(1);

      if (documents && documents.length > 0) {
        const document = documents[0];
        
        // Remove from storage
        if (document.file_url) {
          await supabase.storage.from('documents').remove([document.file_url]);
        }
        
        // Remove from database
        await supabase
          .from('user_documents')
          .delete()
          .eq('id', document.id);
      }

      setUploaded(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast({
        title: "Document removed",
        description: `${documentType} has been removed.`,
      });
    } catch (error: any) {
      console.error('Remove error:', error);
      toast({
        title: "Remove failed",
        description: "Failed to remove document. Please try again.",
        variant: "destructive",
      });
    }
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
