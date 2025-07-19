
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Upload, Check, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UploadedDocument {
  name: string;
  url: string;
  type: string;
}

interface EnhancedDocumentUploadButtonProps {
  documentType: string;
  onUploadComplete?: (documents: UploadedDocument[]) => void;
  uploadedDocuments?: UploadedDocument[];
  onPreview?: (document: UploadedDocument) => void;
}

export const EnhancedDocumentUploadButton: React.FC<EnhancedDocumentUploadButtonProps> = ({
  documentType,
  onUploadComplete,
  uploadedDocuments = [],
  onPreview
}) => {
  const [uploading, setUploading] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadMode, setUploadMode] = useState<'single' | 'multiple' | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const hasUploads = uploadedDocuments.length > 0;

  const handleUploadClick = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload documents.",
        variant: "destructive",
      });
      return;
    }
    setShowUploadDialog(true);
  };

  const handleUploadModeSelect = (mode: 'single' | 'multiple') => {
    setUploadMode(mode);
    setShowUploadDialog(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length || !user) return;

    // Validate files
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, JPEG, or PNG files only.",
        variant: "destructive",
      });
      return;
    }

    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    if (uploadMode === 'single' && files.length === 1) {
      await uploadFiles(files);
    } else if (uploadMode === 'multiple') {
      setPendingFiles(files);
    }
  };

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    const uploadedDocs: UploadedDocument[] = [];

    try {
      for (const file of files) {
        const fileName = `${user!.id}/${Date.now()}-${file.name}`;
        
        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(fileName, file);

        if (uploadError) {
          throw new Error('Failed to upload file to storage');
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(fileName);

        // Save to database
        const { error: dbError } = await supabase
          .from('user_documents')
          .insert({
            user_id: user!.id,
            name: file.name,
            type: documentType,
            file_name: file.name,
            file_url: fileName,
            status: 'valid',
            is_important: false
          });

        if (dbError) {
          await supabase.storage.from('documents').remove([fileName]);
          throw new Error('Failed to save document information');
        }

        uploadedDocs.push({
          name: file.name,
          url: publicUrl,
          type: file.type
        });
      }

      onUploadComplete?.(uploadedDocs);
      setPendingFiles([]);
      
      toast({
        title: "Upload successful",
        description: `${files.length} document(s) uploaded successfully.`,
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
      setUploadMode(null);
    }
  };

  const confirmMultipleUpload = () => {
    uploadFiles(pendingFiles);
  };

  const cancelMultipleUpload = () => {
    setPendingFiles([]);
    setUploadMode(null);
  };

  const handleRemove = async (docToRemove: UploadedDocument) => {
    if (!user) return;

    try {
      // Find and remove the document from database
      const { data: documents } = await supabase
        .from('user_documents')
        .select('id, file_url')
        .eq('user_id', user.id)
        .eq('type', documentType)
        .eq('file_name', docToRemove.name);

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

      // Update local state
      const updatedDocs = uploadedDocuments.filter(doc => doc.name !== docToRemove.name);
      onUploadComplete?.(updatedDocs);
      
      toast({
        title: "Document removed",
        description: `${docToRemove.name} has been removed.`,
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
        multiple={uploadMode === 'multiple'}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {hasUploads ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <Check className="h-4 w-4" />
            <span>{uploadedDocuments.length} file(s)</span>
          </div>
          <div className="flex items-center gap-1">
            {uploadedDocuments.map((doc, index) => (
              <div key={index} className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPreview?.(doc)}
                  className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700"
                  title={`Preview ${doc.name}`}
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(doc)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  title={`Remove ${doc.name}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUploadClick}
            disabled={uploading}
            className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700"
            title="Add more documents"
          >
            <Upload className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUploadClick}
          disabled={uploading}
          className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700"
          title={`Upload ${documentType}`}
        >
          <Upload className="h-3 w-3" />
        </Button>
      )}

      {/* Upload Mode Selection Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Upload Mode</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Do you want to upload single or multiple files?</p>
            <div className="flex gap-4">
              <Button
                onClick={() => handleUploadModeSelect('single')}
                className="flex-1"
              >
                Single File
              </Button>
              <Button
                onClick={() => handleUploadModeSelect('multiple')}
                variant="outline"
                className="flex-1"
              >
                Multiple Files
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Multiple Upload Confirmation Dialog */}
      <Dialog open={pendingFiles.length > 0} onOpenChange={() => setPendingFiles([])}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Multiple Upload</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>You selected {pendingFiles.length} file(s):</p>
            <ul className="list-disc ml-4 space-y-1">
              {pendingFiles.map((file, index) => (
                <li key={index} className="text-sm">{file.name}</li>
              ))}
            </ul>
            <p>Do you want to upload all these files?</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={cancelMultipleUpload}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmMultipleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload All'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
