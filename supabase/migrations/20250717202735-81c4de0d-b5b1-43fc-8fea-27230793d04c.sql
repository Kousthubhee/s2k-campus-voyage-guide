-- Add is_active column to income_sources table for pause functionality
ALTER TABLE public.income_sources 
ADD COLUMN is_active boolean DEFAULT true NOT NULL;

-- Add is_paused column to subscriptions table for pause functionality  
ALTER TABLE public.subscriptions 
ADD COLUMN is_paused boolean DEFAULT false NOT NULL;