import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, File, X, Calendar, AlertCircle } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface FileItem {
  id: string;
  name: string;
  file_size: number;
  created_at: string;
  file_path: string;
  category?: string;
  is_important?: boolean;
  notes?: string;
}

export function FileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const { uploadFile, uploading } = useFileUpload();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadFiles();
    }
  }, [user]);

  const loadFiles = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('documents')
      .select('id, name, file_size, created_at, file_path, category, is_important, notes')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setFiles(data);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !user) return;

    const file = event.target.files[0];
    
    try {
      const result = await uploadFile(file, 'documents');
      if (result) {
        // Refresh the file list
        await loadFiles();
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been uploaded and stored securely.`
        });
      }
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      event.target.value = '';
    }
  };

  const handleDeleteFile = async (fileId: string, filePath: string) => {
    try {
      // Delete from storage
      await supabase.storage.from('documents').remove([filePath]);
      
      // Delete from database
      await supabase.from('documents').delete().eq('id', fileId);
      
      setFiles(files.filter(f => f.id !== fileId));
      toast({
        title: "File deleted",
        description: "File has been removed successfully."
      });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleMarkImportant = async (fileId: string, isImportant: boolean) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ is_important: !isImportant })
        .eq('id', fileId);

      if (error) throw error;

      setFiles(files.map(f => 
        f.id === fileId ? { ...f, is_important: !isImportant } : f
      ));

      toast({
        title: !isImportant ? "Marked as important" : "Removed from important",
        description: "File importance updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Please sign in to upload and manage files</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Document Storage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">
              {uploading ? 'Uploading...' : 'Click to upload document'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports PDF, DOC, DOCX, JPG, PNG, TXT files
            </p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Your Documents ({files.length})</h3>
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <File className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{file.name}</p>
                      {file.is_important && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Important
                        </Badge>
                      )}
                      {file.category && file.category !== 'General' && (
                        <Badge variant="outline" className="text-xs">
                          {file.category}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString()}
                    </p>
                    {file.notes && (
                      <p className="text-xs text-gray-400 italic">{file.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkImportant(file.id, file.is_important || false)}
                    className="text-xs"
                  >
                    {file.is_important ? 'Unmark' : 'Mark Important'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteFile(file.id, file.file_path)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
