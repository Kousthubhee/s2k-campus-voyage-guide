
-- Create the chatbotfaq table
CREATE TABLE public.chatbotfaq (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (Row Level Security) - making it publicly readable for FAQ purposes
ALTER TABLE public.chatbotfaq ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read FAQ data
CREATE POLICY "Anyone can view chatbot FAQs" 
  ON public.chatbotfaq 
  FOR SELECT 
  USING (true);

-- Insert sample FAQ data
INSERT INTO public.chatbotfaq (category, question, answer) VALUES
('Education', 'Do I need IELTS?', 'IELTS requirements depend on your chosen university and program. Most French universities require IELTS 6.0-6.5 for English-taught programs. However, some universities may accept other English proficiency tests or have their own assessment methods.'),
('Housing', 'How to get student housing?', 'Student housing in France can be obtained through: 1) University dormitories (CROUS) - apply early as they fill up quickly, 2) Private student residences, 3) Shared apartments with other students, 4) Homestay with French families. Start your search 3-4 months before arrival.'),
('Finance', 'Which banks offer loans?', 'Several banks in France offer student loans including BNP Paribas, Crédit Agricole, and Société Générale. International students may also consider education loans from their home country. Requirements typically include proof of enrollment and a French guarantor.'),
('Living', 'Where can I find Indian groceries?', 'Indian groceries can be found at: 1) Specialized Indian/Asian stores in major cities, 2) Online retailers like Indianepicerie.fr, 3) Some Monoprix and Carrefour stores have international sections, 4) Local markets in areas with Indian communities.'),
('Work', 'Can I get part-time jobs?', 'Yes! EU students can work unlimited hours. Non-EU students can work up to 20 hours per week (964 hours per year) with a valid student visa. Popular student jobs include tutoring, restaurant work, campus jobs, and internships in your field of study.'),
('Visa', 'What documents do I need for a student visa?', 'Required documents typically include: valid passport, acceptance letter from French institution, proof of financial resources (€615/month), health insurance, accommodation proof, academic transcripts, and language proficiency certificates.'),
('Transportation', 'How does public transport work?', 'French cities have excellent public transport. Students get discounts on monthly passes. In Paris, get a Navigo student card. Most cities have buses, trams, and metro systems. Download city-specific transport apps for schedules and tickets.'),
('Health', 'Do I need health insurance?', 'Yes, health insurance is mandatory. EU students can use their European Health Insurance Card. Non-EU students must either get French social security (if studying long-term) or private health insurance that covers medical expenses in France.'),
('Culture', 'How to integrate into French culture?', 'Join student organizations, participate in university events, learn basic French phrases, try local cuisine, visit museums and cultural sites, make French friends, and be open to new experiences. Language exchange programs are very helpful.');
