
export interface AppState {
  currentPage: string;
  currentView: string;
  selectedCity: string;
  selectedSchool: string;
  selectedModule: string;
  userKeys: number;
  unlockedModules: string[];
  completedItems: string[];
}

export const checklistModules = [
  {
    id: 'school',
    title: 'School',
    description: 'Explore French cities and their educational offerings',
    icon: '🏫',
    keysRequired: 0
  },
  {
    id: 'pre-arrival-1',
    title: 'Pre-Arrival Checklist (Part 1)',
    description: 'Essential steps before departure',
    icon: '✈️',
    keysRequired: 1
  },
  {
    id: 'pre-arrival-2',
    title: 'Pre-Arrival Checklist (Part 2)',
    description: 'Preparing for your journey',
    icon: '🧳',
    keysRequired: 1
  },
  {
    id: 'post-arrival',
    title: 'Post-Arrival Checklist',
    description: 'First steps in France',
    icon: '🏠',
    keysRequired: 1
  },
  {
    id: 'local-insights',
    title: 'Local Insights',
    description: 'Navigating your new home',
    icon: '🗺️',
    keysRequired: 1
  }
];
