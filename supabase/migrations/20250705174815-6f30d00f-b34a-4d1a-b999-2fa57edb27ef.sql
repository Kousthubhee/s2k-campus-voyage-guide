
-- Add missing columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN prev_education TEXT,
ADD COLUMN work_experience TEXT;
