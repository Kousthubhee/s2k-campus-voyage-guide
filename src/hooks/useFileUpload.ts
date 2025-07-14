
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const uploadFile = async (file: File, bucketName: string = 'documents') => {
    if (!user) {
      toast.error('Please sign in to upload files');
      return null;
    }

    setUploading(true);
    try {
      // Create unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      console.log('Uploading file:', fileName, 'to bucket:', bucketName);
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      console.log('File uploaded successfully:', urlData.publicUrl);

      // Determine category based on file type
      let category = 'Document';
      if (file.type.startsWith('video/')) {
        category = 'Video';
      } else if (file.type.startsWith('image/')) {
        category = 'Image';
      }

      // Save file record to database
      const { data: dbData, error: dbError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          name: file.name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
          type: 'upload',
          category: category
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      toast.success('File uploaded successfully!');
      return {
        url: urlData.publicUrl,
        path: fileName,
        record: dbData
      };
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast.error(`Upload failed: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading };
};
