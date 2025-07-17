
-- Add is_automatic field to subscriptions table
ALTER TABLE public.subscriptions 
ADD COLUMN is_automatic boolean NOT NULL DEFAULT true;
