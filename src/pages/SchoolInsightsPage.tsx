
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Search, MapPin, Globe, Phone, Mail, Star, Users, DollarSign, Award, ExternalLink, Instagram, Linkedin, Facebook, Twitter, GraduationCap, BookOpen } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSchools, useSchoolsByCity, useSchoolSearch } from "@/hooks/useSchools";
import { useCities, useCityByName } from "@/hooks/useCities";
import { DatabaseCity, DatabaseSchool, LocalInsight } from "@/types/database";
import { useEffect } from "react";
import { CitiesGridPage } from "@/components/CitiesGridPage";

interface SchoolInsightsPageProps {
  onBack: () => void;
}

export function SchoolInsightsPage({ onBack }: SchoolInsightsPageProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCityInsights, setShowCityInsights] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<DatabaseSchool | null>(null);
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

  // Handle city selection from the grid
  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
  };

  if (selectedSchool) {
    return (
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => setSelectedSchool(null)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="space-y-6">
          {/* School Header */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{selectedSchool.name}</h1>
                    <div className="flex items-center gap-4 text-blue-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedSchool.city}, France</span>
                      </div>
                      {selectedSchool.ranking && (
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <span>Ranking: #{selectedSchool.ranking}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {selectedSchool.website && (
                  <Button variant="secondary" size="sm" asChild>
                    <a href={selectedSchool.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {selectedSchool.long_description || selectedSchool.description}
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{(selectedSchool.programs || []).length}</div>
                <div className="text-sm text-gray-600">Programs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{(selectedSchool.subjects || []).length}</div>
                <div className="text-sm text-gray-600">Subjects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{selectedSchool.ranking || 'N/A'}</div>
                <div className="text-sm text-gray-600">Ranking</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{(selectedSchool.accreditations || []).length}</div>
                <div className="text-sm text-gray-600">Accreditations</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Programs & Subjects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Programs & Subjects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Available Programs</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {(selectedSchool.programs || []).map((program: string, index: number) => (
                      <div key={index} className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="font-medium text-blue-900">{program}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Study Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedSchool.subjects || []).map((subject: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tuition Fees */}
            {selectedSchool.tuition_fees && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Tuition Fees (Annual)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {typeof selectedSchool.tuition_fees === 'object' ? (
                      Object.entries(selectedSchool.tuition_fees).map(([level, fee]) => (
                        <div key={level} className="flex justify-between items-center p-4 bg-green-50 border border-green-100 rounded-lg">
                          <span className="font-semibold text-green-800 capitalize">
                            {level.replace(/([A-Z])/g, ' $1').replace('_', ' ').trim()}
                          </span>
                          <span className="text-xl font-bold text-green-700">
                            {String(fee).includes('€') ? String(fee) : `€${String(fee)}`}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-green-800">Annual Tuition</span>
                          <span className="text-xl font-bold text-green-700">
                            {String(selectedSchool.tuition_fees).includes('€') ? 
                              String(selectedSchool.tuition_fees) : 
                              `€${String(selectedSchool.tuition_fees)}`}
                          </span>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-3 p-3 bg-gray-50 rounded-lg">
                      <strong>Note:</strong> Fees may vary based on program and nationality. Additional costs may include registration fees, accommodation, and living expenses. Contact the school for the most current information.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Contact Details</h4>
                  {selectedSchool.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <a 
                        href={selectedSchool.website}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {selectedSchool.website.replace('https://', '').replace('http://', '')}
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  )}
                  {selectedSchool.contact_info?.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <a 
                        href={`mailto:${selectedSchool.contact_info.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedSchool.contact_info.email}
                      </a>
                    </div>
                  )}
                  {selectedSchool.contact_info?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <a 
                        href={`tel:${selectedSchool.contact_info.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedSchool.contact_info.phone}
                      </a>
                    </div>
                  )}
                  {selectedSchool.contact_info?.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="text-gray-700">{selectedSchool.contact_info.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
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
        <CitiesGridPage onCitySelect={handleCitySelect} />
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
            <Card key={school.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{school.name}</CardTitle>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{school.city}</span>
                      </div>
                      {school.ranking && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">#{school.ranking}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {school.description}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Programs Available</h4>
                    <div className="flex flex-wrap gap-1">
                      {(school.programs || []).slice(0, 2).map((program: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {(school.programs || []).length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{(school.programs || []).length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Study Areas</h4>
                    <div className="flex flex-wrap gap-1">
                      {(school.subjects || []).slice(0, 3).map((subject: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {(school.subjects || []).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{(school.subjects || []).length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {school.tuition_fees && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">Tuition Fees</span>
                    </div>
                    <div className="text-sm text-green-700">
                      {typeof school.tuition_fees === 'object' ? 
                        `From €${Math.min(...Object.values(school.tuition_fees).map(v => parseInt(String(v).replace(/[^\d]/g, '')) || 0))}` :
                        String(school.tuition_fees).includes('€') ? String(school.tuition_fees) : `€${String(school.tuition_fees)}`
                      }
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  onClick={() => setSelectedSchool(school)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
