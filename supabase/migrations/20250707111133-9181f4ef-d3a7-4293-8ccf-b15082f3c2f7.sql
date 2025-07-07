
-- Update chat_history table to match ChatMessage type structure
ALTER TABLE public.chat_history 
DROP COLUMN message,
ADD COLUMN question text NOT NULL DEFAULT '',
ADD COLUMN answer text NOT NULL DEFAULT '';

-- Remove the role check constraint if it exists and recreate it with correct values
DROP CONSTRAINT IF EXISTS chat_history_role_check;
ALTER TABLE public.chat_history 
ADD CONSTRAINT chat_history_role_check CHECK (role IN ('user', 'bot'));
