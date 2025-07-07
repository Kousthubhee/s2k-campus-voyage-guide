
-- Create the FAQs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read FAQs (public data)
CREATE POLICY "Anyone can view FAQs" 
  ON public.faqs 
  FOR SELECT 
  USING (true);

-- Insert sample FAQ data across different categories
INSERT INTO public.faqs (category, question, answer) VALUES
  ('Visa', 'Do I need IELTS?', 'Yes, IELTS is typically required for student visas in France. You need a minimum score of 6.0 overall for most universities. Some universities may accept DELF/DALF or TCF as alternatives.'),
  ('Visa', 'How long does visa processing take?', 'French student visa processing typically takes 2-4 weeks. During peak seasons (May-July), it may take up to 6 weeks. Apply as early as possible after receiving your admission letter.'),
  ('Housing', 'How to get student housing?', 'You can apply for CROUS housing (subsidized student accommodation) through your university. Private options include student residences, shared apartments, or homestays. Start looking 3-4 months before arrival.'),
  ('Housing', 'What is CROUS housing?', 'CROUS is subsidized student housing provided by the French government. It''s affordable (€150-400/month) but limited. Apply early through your university''s international office.'),
  ('Finance', 'Which banks offer loans?', 'Major French banks like BNP Paribas, Crédit Agricole, and Société Générale offer student loans. You''ll need a French guarantor or consider international student loan providers like Prodigy Finance.'),
  ('Finance', 'Can I get financial aid?', 'Yes! You can apply for CAF housing allowance (APL), merit-based scholarships from your university, and government grants like Eiffel Excellence Scholarship for international students.'),
  ('Food', 'Where can I find Indian groceries?', 'Look for stores like "Exotic Bazar," "Asia Market," or "Bombay Bazaar" in major cities. Paris has many in Belleville and République areas. Online options include "Episol" and "Mon Panier Asiatique."'),
  ('Food', 'Are there halal restaurants?', 'Yes, France has many halal restaurants, especially in major cities. Look for "Restaurant Halal" signs or use apps like HalalBooking and Zabihah to find nearby options.'),
  ('Jobs', 'Can I get part-time jobs?', 'Yes, international students can work up to 964 hours per year (about 20 hours/week). Popular jobs include tutoring, campus jobs, retail, and restaurant work. You''ll need a work permit from your prefecture.'),
  ('Jobs', 'What''s the minimum wage in France?', 'The minimum wage (SMIC) in France is €11.27 per hour as of 2024. Student jobs typically pay minimum wage, and you can work up to 964 hours annually on a student visa.'),
  ('Integration', 'How to learn French quickly?', 'Take advantage of free French classes offered by universities, join conversation groups, use apps like Duolingo, watch French TV with subtitles, and practice with local students through language exchange programs.'),
  ('Integration', 'How to make French friends?', 'Join university clubs, attend orientation events, participate in sports activities, volunteer for local organizations, and don''t be shy to start conversations in cafes or study groups!');
