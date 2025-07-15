
import { FileText, CreditCard, Home, Phone, Building, GraduationCap, Heart, Briefcase } from 'lucide-react';

export const postArrivalTasks = [
  {
    id: 'bank-account',
    title: 'Open a French Bank Account',
    description: 'Essential for receiving payments, paying rent, and daily transactions',
    icon: CreditCard,
    timeline: 'Within first 2 weeks',
    priority: 'urgent' as const,
    steps: [
      { id: 'bank-1', description: 'Research banks that accept international students' },
      { id: 'bank-2', description: 'Gather required documents (passport, student card, address proof)' },
      { id: 'bank-3', description: 'Schedule appointment at chosen bank' },
      { id: 'bank-4', description: 'Complete account opening process' },
      { id: 'bank-5', description: 'Receive debit card and banking details' }
    ],
    documents: ['Passport', 'Student card/enrollment certificate', 'Proof of address', 'Birth certificate'],
    faqs: [
      { q: 'Which banks are best for students?', a: 'BNP Paribas, Crédit Agricole, and LCL offer good student accounts' },
      { q: 'How long does it take?', a: 'Usually 1-2 weeks to get your card and full access' }
    ],
    links: [
      { label: 'BNP Paribas Student Accounts', url: 'https://group.bnpparibas/en/news/bnp-paribas-students' },
      { label: 'French Banking Guide', url: 'https://www.service-public.fr/particuliers/vosdroits/F2417' }
    ]
  },
  {
    id: 'accommodation',
    title: 'Secure Permanent Housing',
    description: 'Find and finalize your long-term accommodation',
    icon: Home,
    timeline: 'Within first month',
    priority: 'urgent' as const,
    steps: [
      { id: 'housing-1', description: 'Register for student housing (CROUS)' },
      { id: 'housing-2', description: 'Search private rentals if needed' },
      { id: 'housing-3', description: 'Apply for CAF housing assistance' },
      { id: 'housing-4', description: 'Sign lease agreement' },
      { id: 'housing-5', description: 'Set up utilities (electricity, water, internet)' }
    ],
    documents: ['Passport', 'Student card', 'Bank account details', 'Guarantor information'],
    faqs: [
      { q: 'What is CAF?', a: 'Housing assistance fund that can cover 30-40% of your rent' },
      { q: 'Do I need a guarantor?', a: 'Yes, usually required for private rentals' }
    ],
    links: [
      { label: 'CROUS Housing', url: 'https://www.crous-paris.fr/logements/' },
      { label: 'CAF Housing Aid', url: 'https://www.caf.fr/allocataires/aides-et-demarches/logement' }
    ]
  },
  {
    id: 'health-insurance',
    title: 'Register for Health Insurance',
    description: 'Essential for medical care and required by law',
    icon: Heart,
    timeline: 'Within first 3 months',
    priority: 'high' as const,
    steps: [
      { id: 'health-1', description: 'Register with French Social Security (CPAM)' },
      { id: 'health-2', description: 'Choose a doctor (médecin traitant)' },
      { id: 'health-3', description: 'Get your Carte Vitale' },
      { id: 'health-4', description: 'Consider complementary insurance (mutuelle)' }
    ],
    documents: ['Passport', 'Student card', 'Birth certificate', 'Address proof'],
    faqs: [
      { q: 'Is health insurance mandatory?', a: 'Yes, all residents must have health insurance' },
      { q: 'How much does it cost?', a: 'Students under 28 get free basic coverage' }
    ],
    links: [
      { label: 'CPAM Registration', url: 'https://www.ameli.fr/assure/adresses-et-contacts' },
      { label: 'Student Health Guide', url: 'https://www.etudiant.gouv.fr/fr/sante-et-bien-etre-484' }
    ]
  }
];
