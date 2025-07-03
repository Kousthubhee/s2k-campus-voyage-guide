
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Search, MapPin, Globe, Phone, Mail, Star, Users, DollarSign, Award, ExternalLink, Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSchools, useSchoolsByCity, useSchoolSearch } from "@/hooks/useSchools";
import { useCities, useCityByName } from "@/hooks/useCities";
import { DatabaseCity, DatabaseSchool, LocalInsight } from "@/types/database";
import { useEffect } from "react";

interface SchoolInsightsPageProps {
  onBack: () => void;
}

export function SchoolInsightsPage({ onBack }: SchoolInsightsPageProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCityInsights, setShowCityInsights] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data from database
  const { data: cities = [], isLoading: citiesLoading, refetch: refetchCities } = useCities();
  const { data: allSchools = [], isLoading: schoolsLoading, refetch: refetchAllSchools } = useSchools();
  const { data: citySchools = [], refetch: refetchCitySchools } = useSchoolsByCity(selectedCity);
  const { data: searchResults = [], refetch: refetchSearchResults } = useSchoolSearch(searchTerm);
  const { data: cityDetails, refetch: refetchCityDetails } = useCityByName(selectedCity);

  const cityList = cities.map(city => city.name);
  const queryClient = useQueryClient();

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries({ queryKey: ['schools'] });
      await queryClient.invalidateQueries({ queryKey: ['cities'] });
      
      await Promise.all([
        refetchCities(),
        refetchAllSchools(),
        selectedCity && refetchCitySchools(),
        selectedCity && refetchCityDetails(),
        searchTerm && refetchSearchResults()
      ].filter(Boolean));
      
      console.log('Data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Use appropriate data source based on search/selection
  const displaySchools = searchTerm.trim() ? searchResults : (selectedCity ? citySchools : allSchools);
    
  const availableSubjects = selectedCity && citySchools
    ? Array.from(new Set(citySchools.flatMap((s) => s.subjects || []))).sort()
    : [];
    
  let filteredSchools = displaySchools;
  if (subjectFilter !== "All" && selectedCity) {
    filteredSchools = displaySchools.filter((school) =>
      (school.subjects || []).includes(subjectFilter)
    );
  }

  if (selectedSchool) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => setSelectedSchool(null)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="space-y-6">
          {/* School Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{selectedSchool.name}</CardTitle>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedSchool.city}</span>
                  </div>
                  {selectedSchool.ranking && (
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Ranking: #{selectedSchool.ranking}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {selectedSchool.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedSchool.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {selectedSchool.long_description || selectedSchool.description}
              </p>
            </CardContent>
          </Card>

          {/* Programs and Subjects */}
          <Card>
            <CardHeader>
              <CardTitle>Programs Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Available Programs</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedSchool.programs || []).map((program: string, index: number) => (
                      <Badge key={index} variant="secondary">{program}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedSchool.subjects || []).map((subject: string, index: number) => (
                      <Badge key={index} variant="outline">{subject}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tuition Fees */}
          {selectedSchool.tuition_fees && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Tuition Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedSchool.tuition_fees).map(([level, fee]) => (
                    <div key={level} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold capitalize">{level.replace('_', ' ')}</div>
                      <div className="text-lg text-blue-600 font-bold">{fee}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rankings and Recognition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedSchool.rankings && selectedSchool.rankings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedSchool.rankings.map((ranking: any, index: number) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="font-semibold">{ranking.organization}</div>
                        <div className="text-sm text-gray-600">{ranking.rank}</div>
                        {ranking.year && <div className="text-xs text-gray-500">{ranking.year}</div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedSchool.accreditations && selectedSchool.accreditations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    Accreditations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedSchool.accreditations.map((accreditation: string, index: number) => (
                      <div key={index} className="p-2 bg-green-50 border border-green-200 rounded">
                        <span className="text-green-800 font-medium">{accreditation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Information */}
          {selectedSchool.contact_info && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSchool.contact_info.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${selectedSchool.contact_info.email}`} className="text-blue-600 hover:underline">
                        {selectedSchool.contact_info.email}
                      </a>
                    </div>
                  )}
                  {selectedSchool.contact_info.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a href={`tel:${selectedSchool.contact_info.phone}`} className="text-blue-600 hover:underline">
                        {selectedSchool.contact_info.phone}
                      </a>
                    </div>
                  )}
                  {selectedSchool.contact_info.address && (
                    <div className="flex items-start gap-2 md:col-span-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <span>{selectedSchool.contact_info.address}</span>
                    </div>
                  )}
                </div>
                
                {/* Social Media Links */}
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-3">Follow Us</h4>
                  <div className="flex gap-3">
                    {selectedSchool.contact_info.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedSchool.contact_info.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {selectedSchool.contact_info.instagram && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedSchool.contact_info.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {selectedSchool.contact_info.facebook && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedSchool.contact_info.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {selectedSchool.contact_info.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedSchool.contact_info.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {!selectedCity ? (
            <>
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Checklist
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">School Insights</h1>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setSelectedCity(null)} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">{selectedCity} – Schools & Info</h1>
            </>
          )}
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search schools by name, city, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {!selectedCity && !searchTerm && !citiesLoading && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select a City</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cityList.map((city) => (
              <Button
                key={city}
                variant="outline"
                onClick={() => setSelectedCity(city)}
                className="h-auto p-4 flex flex-col items-center justify-center text-center"
              >
                <MapPin className="h-5 w-5 mb-2 text-blue-600" />
                <span className="font-medium">{city}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {selectedCity && cityDetails && (
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                About {cityDetails.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cityDetails.transport && (
                  <div>
                    <h4 className="font-semibold mb-2">Transportation</h4>
                    <p className="text-sm text-gray-600">{cityDetails.transport}</p>
                  </div>
                )}
                {cityDetails.student_life && (
                  <div>
                    <h4 className="font-semibold mb-2">Student Life</h4>
                    <p className="text-sm text-gray-600">{cityDetails.student_life}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {selectedCity && availableSubjects.length > 1 && (
        <div className="mb-6">
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
        </div>
      )}
      
      {citiesLoading || schoolsLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (selectedCity || searchTerm) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{school.name}</CardTitle>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{school.city}</span>
                    </div>
                    {school.ranking && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">#{school.ranking}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {school.description}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Programs</h4>
                    <div className="flex flex-wrap gap-1">
                      {(school.programs || []).slice(0, 3).map((program: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {(school.programs || []).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{(school.programs || []).length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Subjects</h4>
                    <div className="flex flex-wrap gap-1">
                      {(school.subjects || []).slice(0, 2).map((subject: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {(school.subjects || []).length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{(school.subjects || []).length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setSelectedSchool(school)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center">
          Select a city to explore school insights or search for specific schools.
        </div>
      )}
    </div>
  );
}
