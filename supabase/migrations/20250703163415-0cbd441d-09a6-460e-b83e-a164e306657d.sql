
-- Create tables for community hub posts and comments
CREATE TABLE public.hub_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.hub_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.hub_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.hub_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.hub_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.hub_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_likes ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "Anyone can view hub posts" ON public.hub_posts FOR SELECT USING (true);
CREATE POLICY "Users can create hub posts" ON public.hub_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own hub posts" ON public.hub_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own hub posts" ON public.hub_posts FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Anyone can view hub comments" ON public.hub_comments FOR SELECT USING (true);
CREATE POLICY "Users can create hub comments" ON public.hub_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own hub comments" ON public.hub_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own hub comments" ON public.hub_comments FOR DELETE USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Anyone can view hub likes" ON public.hub_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own hub likes" ON public.hub_likes FOR ALL USING (auth.uid() = user_id);

-- Create triggers for updated_at timestamps
CREATE TRIGGER handle_updated_at_hub_posts
  BEFORE UPDATE ON public.hub_posts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_hub_comments
  BEFORE UPDATE ON public.hub_comments
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
