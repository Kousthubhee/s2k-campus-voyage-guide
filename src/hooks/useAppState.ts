
import { useState } from 'react';
import { AppState, checklistModules } from '@/types/AppState';
import { useToast } from '@/hooks/use-toast';

export const useAppState = () => {
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

  return {
    state,
    handlePageChange,
    handleModuleUnlock,
    handleModuleClick,
    handleCitySelect,
    handleSchoolSelect,
    handleBack,
    handleItemToggle
  };
};
