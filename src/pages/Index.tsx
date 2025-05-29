
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChecklistModule } from '@/components/ChecklistModule';
import { CitiesList } from '@/components/CitiesList';
import { CityDetails } from '@/components/CityDetails';
import { SchoolInfo } from '@/components/SchoolInfo';
import { ChecklistDetail } from '@/components/ChecklistDetail';
import { QAPage } from '@/pages/QAPage';
import { HubPage } from '@/pages/HubPage';
import { NewsPage } from '@/pages/NewsPage';
import { AffiliationPage } from '@/pages/AffiliationPage';
import { LanguagePage } from '@/pages/LanguagePage';
import { TranslatePage } from '@/pages/TranslatePage';
import { useToast } from '@/hooks/use-toast';

interface AppState {
  currentPage: string;
  currentView: string;
  selectedCity: string;
  selectedSchool: string;
  selectedModule: string;
  userKeys: number;
  unlockedModules: string[];
  completedItems: string[];
}

const checklistModules = [
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

const Index = () => {
  const [state, setState] = useState<AppState>({
    currentPage: 'checklist',
    currentView: 'main',
    selectedCity: '',
    selectedSchool: '',
    selectedModule: '',
    userKeys: 7,
    unlockedModules: ['school'],
    completedItems: []
  });

  const { toast } = useToast();

  const handlePageChange = (page: string) => {
    setState(prev => ({ ...prev, currentPage: page, currentView: 'main' }));
  };

  const handleModuleUnlock = (moduleId: string) => {
    const module = checklistModules.find(m => m.id === moduleId);
    if (!module) return;

    if (state.userKeys >= module.keysRequired) {
      setState(prev => ({
        ...prev,
        userKeys: prev.userKeys - module.keysRequired,
        unlockedModules: [...prev.unlockedModules, moduleId]
      }));
      
      toast({
        title: "Module Unlocked!",
        description: `${module.title} is now available`,
      });
    } else {
      toast({
        title: "Not enough keys",
        description: `You need ${module.keysRequired} key(s) to unlock this module`,
        variant: "destructive"
      });
    }
  };

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === 'school') {
      setState(prev => ({ ...prev, currentView: 'cities' }));
    } else {
      setState(prev => ({ ...prev, currentView: 'checklist-detail', selectedModule: moduleId }));
    }
  };

  const handleCitySelect = (cityId: string) => {
    setState(prev => ({ ...prev, currentView: 'city-details', selectedCity: cityId }));
  };

  const handleSchoolSelect = (schoolId: string) => {
    setState(prev => ({ ...prev, currentView: 'school-info', selectedSchool: schoolId }));
  };

  const handleBack = () => {
    if (state.currentView === 'school-info') {
      setState(prev => ({ ...prev, currentView: 'city-details', selectedSchool: '' }));
    } else if (state.currentView === 'city-details') {
      setState(prev => ({ ...prev, currentView: 'cities', selectedCity: '' }));
    } else {
      setState(prev => ({ ...prev, currentView: 'main', selectedCity: '', selectedSchool: '', selectedModule: '' }));
    }
  };

  const handleItemToggle = (itemId: string) => {
    setState(prev => ({
      ...prev,
      completedItems: prev.completedItems.includes(itemId)
        ? prev.completedItems.filter(id => id !== itemId)
        : [...prev.completedItems, itemId]
    }));
  };

  const renderContent = () => {
    if (state.currentPage === 'checklist') {
      switch (state.currentView) {
        case 'cities':
          return <CitiesList onBack={handleBack} onCitySelect={handleCitySelect} />;
        case 'city-details':
          return <CityDetails cityId={state.selectedCity} onBack={handleBack} onSchoolSelect={handleSchoolSelect} />;
        case 'school-info':
          return <SchoolInfo schoolId={state.selectedSchool} onBack={handleBack} />;
        case 'checklist-detail':
          return (
            <ChecklistDetail
              moduleId={state.selectedModule}
              onBack={handleBack}
              onItemToggle={handleItemToggle}
              completedItems={state.completedItems}
            />
          );
        default:
          return (
            <div className="p-6 max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Checklist - Begin Your Journey
                </h1>
                <p className="text-gray-600">
                  Complete these modules to ensure a smooth transition to studying in France
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {checklistModules.map((module) => (
                  <ChecklistModule
                    key={module.id}
                    id={module.id}
                    title={module.title}
                    description={module.description}
                    icon={module.icon}
                    isLocked={!state.unlockedModules.includes(module.id)}
                    onUnlock={handleModuleUnlock}
                    onClick={() => handleModuleClick(module.id)}
                    keysRequired={module.keysRequired}
                  />
                ))}
              </div>
            </div>
          );
      }
    }

    switch (state.currentPage) {
      case 'qa':
        return <QAPage />;
      case 'hub':
        return <HubPage />;
      case 'news':
        return <NewsPage />;
      case 'affiliation':
        return <AffiliationPage />;
      case 'language':
        return <LanguagePage />;
      case 'translate':
        return <TranslatePage />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        currentPage={state.currentPage} 
        onPageChange={handlePageChange}
        userKeys={state.userKeys}
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
        
        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-gray-600">
              © <span className="font-medium">Kousthubhee & Srivatsava</span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
