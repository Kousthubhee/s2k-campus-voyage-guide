
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ExternalLink, BookOpen } from 'lucide-react';

interface School {
  id: number;
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
  selectedCity: string | null;
  searchTerm: string;
}

export const SchoolsGrid = ({ displayedSchools, onSelectSchool, selectedCity, searchTerm }: SchoolsGridProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {searchTerm ? (
            <>Search Results for "{searchTerm}" ({displayedSchools.length} found)</>
          ) : selectedCity ? (
            <>Schools in {selectedCity} ({displayedSchools.length} schools)</>
          ) : (
            <>All Schools ({displayedSchools.length} total)</>
          )}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedSchools.map((school) => (
          <Card key={school.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {school.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{school.city}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {school.description || "Learn more about this educational institution."}
                </p>
              </div>
              
              {/* Subjects/Programs */}
              {school.subjects && school.subjects.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Programs:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {school.subjects.slice(0, 3).map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {school.subjects.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{school.subjects.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => onSelectSchool(school)}
                  className="flex-1"
                  size="sm"
                >
                  View Details
                </Button>
                {school.website && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={school.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
