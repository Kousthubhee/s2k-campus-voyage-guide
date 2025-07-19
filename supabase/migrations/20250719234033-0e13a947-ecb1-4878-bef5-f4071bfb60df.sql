
-- Fix storage policies for documents bucket to allow video uploads
DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own documents" ON storage.objects;

-- Create more permissive storage policies
CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create a separate bucket for hub media (videos/images)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('hub-media', 'hub-media', true) 
ON CONFLICT (id) DO NOTHING;

-- Create policies for hub-media bucket
CREATE POLICY "Anyone can view hub media" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hub-media');

CREATE POLICY "Authenticated users can upload hub media" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hub-media' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own hub media" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'hub-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own hub media" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'hub-media' AND auth.uid()::text = (storage.foldername(name))[1]);
