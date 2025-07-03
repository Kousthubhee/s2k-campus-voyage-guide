
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SubjectFilterProps {
  availableSubjects: string[];
  subjectFilter: string;
  setSubjectFilter: (subject: string) => void;
}

export const SubjectFilter = ({ availableSubjects, subjectFilter, setSubjectFilter }: SubjectFilterProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Subject:</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={subjectFilter === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => setSubjectFilter("All")}
        >
          All Subjects
        </Button>
        {availableSubjects.map((subject) => (
          <Button
            key={subject}
            variant={subjectFilter === subject ? "default" : "outline"}
            size="sm"
            onClick={() => setSubjectFilter(subject)}
          >
            {subject}
          </Button>
        ))}
      </div>
      {subjectFilter !== "All" && (
        <div className="mt-2">
          <Badge variant="secondary" className="text-xs">
            Showing schools with: {subjectFilter}
          </Badge>
        </div>
      )}
    </div>
  );
};
