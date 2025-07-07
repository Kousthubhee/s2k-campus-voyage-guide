
-- Create chat_history table for storing user chat interactions
CREATE TABLE public.chat_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  timestamp timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own chat history
CREATE POLICY "Users can view their own chat history" 
  ON public.chat_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own chat history
CREATE POLICY "Users can insert their own chat history" 
  ON public.chat_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create index for better performance when fetching recent chat history
CREATE INDEX idx_chat_history_user_timestamp ON public.chat_history(user_id, timestamp DESC);
