
-- Add parent_id column to hub_comments for threaded comments
ALTER TABLE public.hub_comments 
ADD COLUMN parent_id uuid REFERENCES public.hub_comments(id) ON DELETE CASCADE;

-- Create hub_user_profiles table
CREATE TABLE public.hub_user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  avatar_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on hub_user_profiles
ALTER TABLE public.hub_user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for hub_user_profiles
CREATE POLICY "Anyone can view hub user profiles" 
  ON public.hub_user_profiles 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create their own hub profile" 
  ON public.hub_user_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own hub profile" 
  ON public.hub_user_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_hub_user_profiles_updated_at
  BEFORE UPDATE ON public.hub_user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
