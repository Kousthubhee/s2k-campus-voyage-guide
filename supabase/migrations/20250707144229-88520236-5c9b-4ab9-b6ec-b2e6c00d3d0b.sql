
-- Create table to track FAQ analytics
CREATE TABLE public.faq_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_query TEXT NOT NULL,
  matched_question TEXT,
  confidence_score DECIMAL(3,2),
  category TEXT,
  clicked_suggestion BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for privacy
ALTER TABLE public.faq_logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert logs (for analytics)
CREATE POLICY "Anyone can insert FAQ logs" 
  ON public.faq_logs 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading logs for admin purposes
CREATE POLICY "Anyone can view FAQ logs" 
  ON public.faq_logs 
  FOR SELECT 
  USING (true);
