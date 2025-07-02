
import { CitiesList } from '@/components/CitiesList';
import { CityDetails } from '@/components/CityDetails';
import { SchoolInfo } from '@/components/SchoolInfo';
import { ChecklistDetail } from '@/components/ChecklistDetail';
import { ChecklistMainView } from '@/components/ChecklistMainView';
import { QAPage } from '@/pages/QAPage';
import { HubPage } from '@/pages/HubPage';
import { NewsPage } from '@/pages/NewsPage';
import { AffiliationPage } from '@/pages/AffiliationPage';
import { LanguagePage } from '@/pages/LanguagePage';
import { TranslatePage } from '@/pages/TranslatePage';
import { ContactPage } from '@/pages/ContactPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AppState } from '@/types/AppState';

interface ContentRendererProps {
  state: AppState;
  onBack: () => void;
  onCitySelect: (cityId: string) => void;
  onSchoolSelect: (schoolId: string) => void;
  onModuleUnlock: (moduleId: string) => void;
  onModuleClick: (moduleId: string) => void;
  onItemToggle: (itemId: string) => void;
}

export function ContentRenderer({
  state,
  onBack,
  onCitySelect,
  onSchoolSelect,
  onModuleUnlock,
  onModuleClick,
  onItemToggle
}: ContentRendererProps) {
  if (state.currentPage === 'checklist') {
    switch (state.currentView) {
      case 'cities':
        return <CitiesList onBack={onBack} onCitySelect={onCitySelect} />;
      case 'city-details':
        return <CityDetails cityId={state.selectedCity} onBack={onBack} onSchoolSelect={onSchoolSelect} />;
      case 'school-info':
        return <SchoolInfo schoolId={state.selectedSchool} onBack={onBack} />;
      case 'checklist-detail':
        return (
          <ChecklistDetail
            moduleId={state.selectedModule}
            onBack={onBack}
            onItemToggle={onItemToggle}
            completedItems={state.completedItems}
          />
        );
      default:
        return (
          <ChecklistMainView
            unlockedModules={state.unlockedModules}
            onModuleUnlock={onModuleUnlock}
            onModuleClick={onModuleClick}
          />
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
    case 'notifications':
      return <NotificationsPage />;
    case 'profile':
      return <ProfilePage />;
    case 'contact':
      return <ContactPage />;
    case 'affiliation':
      return <AffiliationPage />;
    case 'language':
      return <LanguagePage />;
    case 'translate':
      return <TranslatePage />;
    default:
      return <div>Page not found</div>;
  }
}
