
const checklistModules = [
  {
    id: 'school',
    title: 'School Insights',
    description: 'Research and select your ideal French university',
    icon: '🎓',
    color: 'from-blue-400 to-blue-600',
    type: 'insights'
  },
  {
    id: 'pre-arrival-1',
    title: 'Pre-Arrival Checklist (Part 1)',
    description: 'Essential documents and preparations',
    icon: '📋',
    color: 'from-green-400 to-green-600',
    type: 'checklist'
  },
  {
    id: 'pre-arrival-2',
    title: 'Pre-Arrival Checklist (Part 2)',
    description: 'Final preparations before departure',
    icon: '✈️',
    color: 'from-purple-400 to-purple-600',
    type: 'checklist'
  },
  {
    id: 'housing',
    title: 'Housing Assistant',
    description: 'Find and secure accommodation in France',
    icon: '🏠',
    color: 'from-orange-400 to-orange-600',
    type: 'housing',
    keysRequired: 1
  },
  {
    id: 'post-arrival',
    title: 'Post-Arrival Tasks',
    description: 'Complete essential tasks after arriving in France',
    icon: '🎯',
    color: 'from-red-400 to-red-600',
    type: 'tasks',
    keysRequired: 2
  },
  {
    id: 'integration',
    title: 'Integration Guide',
    description: 'Integrate into French academic and social life',
    icon: '🤝',
    color: 'from-teal-400 to-teal-600',
    type: 'guide',
    keysRequired: 1
  },
  {
    id: 'finance',
    title: 'Finance Tracking',
    description: 'Manage your finances as an international student',
    icon: '💰',
    color: 'from-yellow-400 to-yellow-600',
    type: 'finance'
  }
];

export default checklistModules;
