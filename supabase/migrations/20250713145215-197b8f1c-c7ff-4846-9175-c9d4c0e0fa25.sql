
-- Add missing columns and tables for proper comment functionality
ALTER TABLE public.hub_comments 
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES public.hub_comments(id) ON DELETE CASCADE;

-- Create a table to store user display information for the hub
CREATE TABLE IF NOT EXISTS public.hub_user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  display_name text NOT NULL,
  avatar_url text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on hub_user_profiles
ALTER TABLE public.hub_user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for hub_user_profiles
CREATE POLICY "Anyone can view hub user profiles" ON public.hub_user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can create own hub profile" ON public.hub_user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own hub profile" ON public.hub_user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create a function to automatically create hub user profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_hub_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.hub_user_profiles (user_id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email, 'Anonymous User')
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create hub profile for new users
DROP TRIGGER IF EXISTS on_auth_user_created_hub_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_hub_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_hub_user();

-- Insert some sample data for testing
INSERT INTO public.hub_posts (user_id, title, content, category, type) VALUES
  (
    (SELECT id FROM auth.users LIMIT 1),
    'Best places to visit in Paris',
    'I recently visited Paris and wanted to share some amazing spots! The Eiffel Tower at sunset is absolutely breathtaking. Also, don''t miss the Louvre early in the morning to avoid crowds.',
    'Travel',
    'blog'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'Which French city is best for students?',
    'I''m trying to decide between Lyon, Toulouse, and Marseille for my studies. What are your experiences with student life in these cities?',
    'General',
    'qa'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'What''s your favorite French dish?',
    'Trying to explore French cuisine - what should I try first?',
    'Poll',
    'poll',
    '[{"text": "Coq au Vin", "votes": 5}, {"text": "Ratatouille", "votes": 3}, {"text": "Croissants", "votes": 8}, {"text": "Bouillabaisse", "votes": 2}]'::jsonb
  )
ON CONFLICT DO NOTHING;

-- Add some sample comments
INSERT INTO public.hub_comments (post_id, user_id, content) VALUES
  (
    (SELECT id FROM public.hub_posts WHERE type = 'blog' LIMIT 1),
    (SELECT id FROM auth.users LIMIT 1),
    'Great recommendations! I would also add Montmartre to the list - the view from Sacré-Cœur is incredible.'
  ),
  (
    (SELECT id FROM public.hub_posts WHERE type = 'qa' LIMIT 1),
    (SELECT id FROM auth.users LIMIT 1),
    'I studied in Lyon and loved it! Great student community and amazing food scene.'
  )
ON CONFLICT DO NOTHING;
