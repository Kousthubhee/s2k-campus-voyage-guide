import { SchoolDetail } from './SchoolDetail';
import { useSchoolDetail } from '@/hooks/useSchools';

interface SchoolDetailRouterProps {
  school: any;
  onBack: () => void;
}

export function SchoolDetailRouter({ school, onBack }: SchoolDetailRouterProps) {
  const { data: schoolData, isLoading } = useSchoolDetail(school.id);
  
  if (isLoading) {
    return <div className="text-center py-8">Loading school details...</div>;
  }
  
  if (!schoolData) {
    return <div className="text-center py-8">School not found</div>;
  }
  
  return <SchoolDetail school={schoolData} onBack={onBack} />;
}