
-- Create tables for Hub functionality
CREATE TABLE IF NOT EXISTS public.hub_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('qa', 'blog', 'reel', 'poll')),
  media_url TEXT,
  poll_options JSONB DEFAULT '[]'::jsonb,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for Hub comments
CREATE TABLE IF NOT EXISTS public.hub_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.hub_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.hub_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for Hub likes
CREATE TABLE IF NOT EXISTS public.hub_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.hub_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create table for poll votes
CREATE TABLE IF NOT EXISTS public.poll_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.hub_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  option_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create table for contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for module progress tracking
CREATE TABLE IF NOT EXISTS public.module_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  module_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE(user_id, module_id)
);

-- Enable RLS on all tables
ALTER TABLE public.hub_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_completions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for hub_posts
CREATE POLICY "Anyone can view hub posts" ON public.hub_posts FOR SELECT USING (true);
CREATE POLICY "Users can create hub posts" ON public.hub_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own hub posts" ON public.hub_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own hub posts" ON public.hub_posts FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for hub_comments
CREATE POLICY "Anyone can view hub comments" ON public.hub_comments FOR SELECT USING (true);
CREATE POLICY "Users can create hub comments" ON public.hub_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own hub comments" ON public.hub_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own hub comments" ON public.hub_comments FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for hub_likes
CREATE POLICY "Anyone can view hub likes" ON public.hub_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own hub likes" ON public.hub_likes FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for poll_votes
CREATE POLICY "Anyone can view poll votes" ON public.poll_votes FOR SELECT USING (true);
CREATE POLICY "Users can manage own poll votes" ON public.poll_votes FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for contact_submissions
CREATE POLICY "Anyone can create contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all contact submissions" ON public.contact_submissions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.admin_settings 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Create RLS policies for module_completions
CREATE POLICY "Users can view own module completions" ON public.module_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own module completions" ON public.module_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own module completions" ON public.module_completions FOR UPDATE USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hub_posts_updated_at BEFORE UPDATE ON public.hub_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hub_comments_updated_at BEFORE UPDATE ON public.hub_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON public.contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for hub media if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('hub-media', 'hub-media', true) ON CONFLICT DO NOTHING;

-- Create storage policies for hub-media bucket
CREATE POLICY "Anyone can view hub media" ON storage.objects FOR SELECT USING (bucket_id = 'hub-media');
CREATE POLICY "Authenticated users can upload hub media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hub-media' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own hub media" ON storage.objects FOR UPDATE USING (bucket_id = 'hub-media' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own hub media" ON storage.objects FOR DELETE USING (bucket_id = 'hub-media' AND auth.uid()::text = (storage.foldername(name))[1]);
