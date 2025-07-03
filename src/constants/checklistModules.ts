
export const checklistModules = [
  {
    id: 'school',
    title: 'School Research & Selection',
    description: 'Research and select your ideal French institution',
    icon: '🎓',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    tasks: [
      {
        id: 'research-schools',
        title: 'Research French Universities',
        description: 'Explore different universities and their programs',
        estimatedTime: '2-3 hours',
        priority: 'high',
        category: 'research'
      },
      {
        id: 'compare-programs',
        title: 'Compare Academic Programs',
        description: 'Compare curricula, faculty, and specializations',
        estimatedTime: '3-4 hours',
        priority: 'high',
        category: 'research'
      },
      {
        id: 'check-requirements',
        title: 'Check Admission Requirements',
        description: 'Verify language requirements, GPA, and prerequisites',
        estimatedTime: '1-2 hours',
        priority: 'high',
        category: 'requirements'
      },
      {
        id: 'shortlist-schools',
        title: 'Create School Shortlist',
        description: 'Narrow down to 3-5 preferred institutions',
        estimatedTime: '1 hour',
        priority: 'medium',
        category: 'planning'
      }
    ]
  },
  {
    id: 'pre-arrival-1',
    title: 'Pre-Arrival Phase 1',
    description: 'Essential preparations before departure',
    icon: '✈️',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    tasks: [
      {
        id: 'passport-visa',
        title: 'Passport & Visa Application',
        description: 'Ensure passport validity and apply for student visa',
        estimatedTime: '2-4 weeks',
        priority: 'high',
        category: 'documents'
      },
      {
        id: 'university-application',
        title: 'University Application',
        description: 'Submit applications through Campus France or directly',
        estimatedTime: '1-2 weeks',
        priority: 'high',
        category: 'application'
      },
      {
        id: 'language-certification',
        title: 'Language Certification',
        description: 'Obtain required French/English language certificates',
        estimatedTime: '1-3 months',
        priority: 'high',
        category: 'language'
      },
      {
        id: 'health-insurance',
        title: 'Health Insurance',
        description: 'Arrange international health insurance coverage',
        estimatedTime: '1-2 weeks',
        priority: 'medium',
        category: 'insurance'
      }
    ]
  },
  {
    id: 'pre-arrival-2',
    title: 'Pre-Arrival Phase 2',
    description: 'Final preparations and arrangements',
    icon: '🏠',
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    tasks: [
      {
        id: 'accommodation',
        title: 'Secure Accommodation',
        description: 'Find and book student housing or apartments',
        estimatedTime: '2-4 weeks',
        priority: 'high',
        category: 'housing'
      },
      {
        id: 'flight-booking',
        title: 'Book Flight Tickets',
        description: 'Reserve flights and plan travel itinerary',
        estimatedTime: '1-2 days',
        priority: 'high',
        category: 'travel'
      },
      {
        id: 'financial-planning',
        title: 'Financial Planning',
        description: 'Set up international banking and budget planning',
        estimatedTime: '1-2 weeks',
        priority: 'medium',
        category: 'finance'
      },
      {
        id: 'packing-essentials',
        title: 'Pack Essentials',
        description: 'Prepare luggage with necessary items and documents',
        estimatedTime: '2-3 days',
        priority: 'medium',
        category: 'preparation'
      }
    ]
  },
  {
    id: 'post-arrival',
    title: 'Post-Arrival Tasks',
    description: 'Essential tasks after arriving in France',
    icon: '🇫🇷',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    tasks: [
      {
        id: 'residence-permit',
        title: 'Apply for Residence Permit',
        description: 'Complete residence permit application at prefecture',
        estimatedTime: '1-2 weeks',
        priority: 'high',
        category: 'legal'
      },
      {
        id: 'bank-account',
        title: 'Open Bank Account',
        description: 'Set up French bank account for daily transactions',
        estimatedTime: '1-2 weeks',
        priority: 'high',
        category: 'banking'
      },
      {
        id: 'university-enrollment',
        title: 'Complete University Enrollment',
        description: 'Finalize registration and orientation programs',
        estimatedTime: '1 week',
        priority: 'high',
        category: 'academic'
      },
      {
        id: 'local-integration',
        title: 'Local Integration',
        description: 'Explore the city, meet people, and settle in',
        estimatedTime: 'Ongoing',
        priority: 'medium',
        category: 'social'
      }
    ]
  }
];
