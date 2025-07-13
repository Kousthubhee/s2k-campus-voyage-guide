
-- Add missing columns to hub_posts table
ALTER TABLE public.hub_posts 
ADD COLUMN IF NOT EXISTS type text DEFAULT 'qa',
ADD COLUMN IF NOT EXISTS media_url text,
ADD COLUMN IF NOT EXISTS poll_options jsonb;

-- Update existing posts to have a default type if null
UPDATE public.hub_posts 
SET type = 'qa' 
WHERE type IS NULL;
