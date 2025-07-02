
-- Create table for QA chat messages
CREATE TABLE public.qa_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('user', 'bot')),
  message TEXT NOT NULL,
  file_url TEXT,
  file_name TEXT,
  is_bookmarked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user documents with renewal tracking
CREATE TABLE public.user_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  submission_date DATE,
  expiry_date DATE,
  status TEXT CHECK (status IN ('valid', 'expiring', 'expired')) DEFAULT 'valid',
  renewal_process TEXT[],
  notification_enabled BOOLEAN DEFAULT true,
  notes TEXT,
  file_url TEXT,
  file_name TEXT,
  is_important BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.qa_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for qa_messages
CREATE POLICY "Users can view their own messages" 
  ON public.qa_messages 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own messages" 
  ON public.qa_messages 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" 
  ON public.qa_messages 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policies for user_documents
CREATE POLICY "Users can view their own documents" 
  ON public.user_documents 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own documents" 
  ON public.user_documents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
  ON public.user_documents 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" 
  ON public.user_documents 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_qa_messages
  BEFORE UPDATE ON public.qa_messages
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_user_documents
  BEFORE UPDATE ON public.user_documents
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
