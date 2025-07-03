/**
 * Checklist modules array for main checklist navigation.
 * Each object represents a module to display.
 */
const checklistModules = [
  {
    id: 'school',
    title: 'School & Local Insights',
    description: 'Explore French schools and get local insights for each city',
    icon: '🏫',
    color: 'from-blue-500 to-cyan-500',
    type: 'school'
  },
  {
    id: 'pre-arrival-1',
    title: 'Pre-Arrival Checklist (Part 1)',
    description: 'Campus France, VFS, and essential preparations',
    icon: '✈️',
    color: 'from-green-500 to-emerald-500',
    type: 'checklist'
  },
  {
    id: 'pre-arrival-2',
    title: 'Packing Assistant',
    description: 'Food, clothes, and cultural preparation',
    icon: '🎒',
    color: 'from-orange-500 to-red-500',
    type: 'checklist'
  },
  {
    id: 'post-arrival',
    title: 'Post-Arrival Checklist',
    description: 'Bank account, SSN, insurance, CAF, and more',
    icon: '🏠',
    color: 'from-indigo-500 to-purple-500',
    type: 'checklist',
    keysRequired: 2
  },
  {
    id: 'integration',
    title: 'French Integration',
    description: 'Cultural adaptation and social integration',
    icon: '🤝',
    color: 'from-rose-500 to-pink-500',
    type: 'integration',
    keysRequired: 3
  },
  {
    id: 'finance',
    title: 'Tracking your Finances',
    description: 'Important paperwork and renewal processes',
    icon: '📄',
    color: 'from-teal-500 to-blue-500',
    type: 'documents',
    keysRequired: 1
  },
  {
    id: 'suggestions',
    title: 'Suggestions for You',
    description: 'Explore new features and ideas to enhance your journey',
    icon: '💡',
    color: 'from-yellow-400 to-amber-500',
    type: 'suggestions',
    keysRequired: 1
  }
];

export default checklistModules;
