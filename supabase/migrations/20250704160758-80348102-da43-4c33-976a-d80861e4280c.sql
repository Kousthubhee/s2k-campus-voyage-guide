
-- Add user plans table for subscription management
CREATE TABLE IF NOT EXISTS public.user_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'free', -- 'free' or 'paid'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id)
);

-- Add document reviews table for admin verification
CREATE TABLE IF NOT EXISTS public.document_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES public.user_documents(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'needs_revision'
  review_notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add admin settings table
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  is_document_reviewer BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Add text alternatives to schools table for CSV compatibility
ALTER TABLE public.schools 
ADD COLUMN IF NOT EXISTS tuition_fees_text TEXT,
ADD COLUMN IF NOT EXISTS contact_info_text TEXT,
ADD COLUMN IF NOT EXISTS detailed_programs_text TEXT,
ADD COLUMN IF NOT EXISTS specializations_text TEXT,
ADD COLUMN IF NOT EXISTS rankings_text TEXT,
ADD COLUMN IF NOT EXISTS accreditations_text TEXT,
ADD COLUMN IF NOT EXISTS recognition_text TEXT;

-- Add verification status to user_documents
ALTER TABLE public.user_documents 
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'not_submitted',
ADD COLUMN IF NOT EXISTS requires_verification BOOLEAN DEFAULT false;

-- Enable RLS on new tables
ALTER TABLE public.user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_plans
CREATE POLICY "Users can view own plan" ON public.user_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plan" ON public.user_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own plan" ON public.user_plans FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for document_reviews
CREATE POLICY "Users can view reviews of own documents" ON public.document_reviews FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_documents 
    WHERE user_documents.id = document_reviews.document_id 
    AND user_documents.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage all document reviews" ON public.document_reviews FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_settings 
    WHERE admin_settings.user_id = auth.uid() 
    AND (admin_settings.is_admin = true OR admin_settings.is_document_reviewer = true)
  )
);

-- RLS policies for admin_settings
CREATE POLICY "Users can view own admin settings" ON public.admin_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all admin settings" ON public.admin_settings FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_settings admin_check
    WHERE admin_check.user_id = auth.uid() AND admin_check.is_admin = true
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_schools_city ON public.schools(city);
CREATE INDEX IF NOT EXISTS idx_schools_subjects ON public.schools USING GIN(subjects);
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON public.user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_status ON public.user_documents(verification_status);
CREATE INDEX IF NOT EXISTS idx_document_reviews_document_id ON public.document_reviews(document_id);
CREATE INDEX IF NOT EXISTS idx_document_reviews_status ON public.document_reviews(status);

-- Update trigger for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_plans_updated_at BEFORE UPDATE ON public.user_plans 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_document_reviews_updated_at BEFORE UPDATE ON public.document_reviews 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user plan on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_plan()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_plans (user_id, plan_type)
  VALUES (NEW.id, 'free');
  RETURN NEW;
END;
$$;

-- Create trigger for new user plan creation (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created_plan') THEN
    CREATE TRIGGER on_auth_user_created_plan
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_plan();
  END IF;
END
$$;
