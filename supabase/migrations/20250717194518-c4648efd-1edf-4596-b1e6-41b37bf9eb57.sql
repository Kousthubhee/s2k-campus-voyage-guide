
-- Add start_date column to subscriptions table
ALTER TABLE public.subscriptions 
ADD COLUMN start_date date DEFAULT CURRENT_DATE;

-- Update existing subscriptions to have a start_date (set to created_at date)
UPDATE public.subscriptions 
SET start_date = created_at::date 
WHERE start_date IS NULL;

-- Make start_date NOT NULL after setting default values
ALTER TABLE public.subscriptions 
ALTER COLUMN start_date SET NOT NULL;
