
const checklistModules = [
  {
    id: 'school',
    title: 'School Insights',
    description: 'Explore universities and schools across France with detailed information and city insights.',
    icon: '🎓',
    color: 'bg-blue-500',
    type: 'navigation'
  },
  {
    id: 'pre-arrival-1',
    title: 'Pre-Arrival Setup 1',
    description: 'Essential documents, visa applications, and initial preparations for your journey.',
    icon: '📋',
    color: 'bg-green-500',
    type: 'module'
  },
  {
    id: 'pre-arrival-2',
    title: 'Packing Assistant',
    description: 'Accommodation, banking, and final preparations before departure.',
    icon: '🏠',
    color: 'bg-purple-500',
    type: 'module'
  },
  {
    id: 'post-arrival',
    title: 'Post-Arrival Tasks',
    description: 'Essential tasks to complete after arriving in France.',
    icon: '✅',
    color: 'bg-orange-500',
    type: 'module',
    keysRequired: 2
  },
  {
    id: 'integration',
    title: 'French Integration',
    description: 'Learn French culture, language basics, and integration tips.',
    icon: '🇫🇷',
    color: 'bg-red-500',
    type: 'navigation',
    keysRequired: 1
  },
  {
    id: 'finance',
    title: 'Finance Tracking',
    description: 'Manage your expenses and budget while studying in France.',
    icon: '💰',
    color: 'bg-yellow-500',
    type: 'module',
    keysRequired: 3
  }
];

export default checklistModules;
