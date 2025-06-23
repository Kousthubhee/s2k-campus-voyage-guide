
import { Card, CardContent } from "@/components/ui/card";

interface School {
  id: string;
  name: string;
  city: string;
  description: string;
  levels: string[];
  subjects: string[];
  website: string;
}

interface SchoolsGridProps {
  displayedSchools: School[];
  onSelectSchool: (school: School) => void;
  selectedCity: string;
}

export function SchoolsGrid({ displayedSchools, onSelectSchool, selectedCity }: SchoolsGridProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Schools in {selectedCity}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedSchools.length > 0 ? (
          displayedSchools.map((school) => (
            <Card
              key={school.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onSelectSchool(school)}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {school.name}
                </h3>
                <p className="text-sm text-gray-600">{school.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {(school.subjects || []).map((subj) => (
                    <span
                      key={subj}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-gray-500 text-center">
            No schools found for this subject in {selectedCity}.
          </div>
        )}
      </div>
    </div>
  );
}
