
import { Sidebar } from '@/components/Sidebar';
import { ContentRenderer } from '@/components/ContentRenderer';
import { TopNav } from '@/components/TopNav';
import { useAppState } from '@/hooks/useAppState';

const Index = () => {
  const {
    state,
    handlePageChange,
    handleModuleUnlock,
    handleModuleClick,
    handleCitySelect,
    handleSchoolSelect,
    handleBack,
    handleItemToggle
  } = useAppState();

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        currentPage={state.currentPage} 
        onPageChange={handlePageChange}
        userKeys={state.userKeys}
      />
      <div className="flex-1 flex flex-col">
        <TopNav onPageChange={handlePageChange} />
        <main className="flex-1 overflow-y-auto">
          <ContentRenderer
            state={state}
            onBack={handleBack}
            onCitySelect={handleCitySelect}
            onSchoolSelect={handleSchoolSelect}
            onModuleUnlock={handleModuleUnlock}
            onModuleClick={handleModuleClick}
            onItemToggle={handleItemToggle}
          />
          
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
    </div>
  );
};

export default Index;
