
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
  selectedCity?: string;
  searchTerm?: string;
}

export function SchoolsGrid({ displayedSchools, onSelectSchool, selectedCity, searchTerm }: SchoolsGridProps) {
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {selectedCity ? `Schools in ${selectedCity}` : 'Search Results'}
        {displayedSchools.length > 0 && (
          <span className="text-sm font-normal text-gray-600 ml-2">
            ({displayedSchools.length} found)
          </span>
        )}
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
                  {searchTerm ? getHighlightedText(school.name, searchTerm) : school.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {searchTerm ? getHighlightedText(school.description, searchTerm) : school.description}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  📍 {searchTerm ? getHighlightedText(school.city, searchTerm) : school.city}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {(school.subjects || []).map((subj) => (
                    <span
                      key={subj}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {searchTerm ? getHighlightedText(subj, searchTerm) : subj}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-gray-500 text-center">
            {searchTerm 
              ? `No schools found matching "${searchTerm}"`
              : selectedCity 
                ? `No schools found for this subject in ${selectedCity}.`
                : 'No schools found.'
            }
          </div>
        )}
      </div>
    </div>
  );
}
