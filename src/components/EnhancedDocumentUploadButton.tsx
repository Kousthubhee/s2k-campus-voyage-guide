
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleUploadClick = () => {
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

    await uploadFiles(files);
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
          console.error('Storage upload error:', uploadError);
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
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
          console.error('Database insert error:', dbError);
          await supabase.storage.from('documents').remove([fileName]);
          throw new Error(`Failed to save ${file.name} information`);
        }

        uploadedDocs.push({
          name: file.name,
          url: publicUrl,
          type: file.type
        });
      }

      // Combine with existing documents instead of replacing
      const allDocuments = [...uploadedDocuments, ...uploadedDocs];
      onUploadComplete?.(allDocuments);
      
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
      // Clear the file input to allow uploading the same file again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUploadClick}
          disabled={uploading}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload Files'}
        </Button>

        {uploadedDocuments.length > 0 && (
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <Check className="h-4 w-4" />
            <span>{uploadedDocuments.length} file(s) uploaded</span>
          </div>
        )}
      </div>

      {/* Show uploaded files directly below */}
      {uploadedDocuments.length > 0 && (
        <div className="space-y-1 ml-6">
          {uploadedDocuments.map((doc, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPreview?.(doc)}
                className="p-0 h-auto text-blue-600 hover:text-blue-800 hover:underline font-normal"
              >
                <Eye className="h-3 w-3 mr-1" />
                {doc.name}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(doc)}
                className="h-4 w-4 p-0 text-red-500 hover:text-red-700"
                title={`Remove ${doc.name}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
