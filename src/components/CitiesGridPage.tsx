
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { InsightsDialog } from './school-insights/InsightsDialog';
import { useCities } from '@/hooks/useCities';

interface LocalInsight {
  id: string;
  type: string;
  title: string;
  description: string;
}

interface CitiesGridPageProps {
  onCitySelect: (cityName: string) => void;
}

export const CitiesGridPage: React.FC<CitiesGridPageProps> = ({ onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [showInsightsDialog, setShowInsightsDialog] = useState(false);
  const { data: cities, isLoading, error } = useCities();

  const handleCitySelect = (cityName: string) => {
    onCitySelect(cityName);
  };

  const handleShowInsights = (city: any, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Showing insights for city:', city.name);
    console.log('City local_insights raw:', city.local_insights);
    console.log('City local_insights type:', typeof city.local_insights);
    setSelectedCity(city);
    setShowInsightsDialog(true);
  };

  // Helper function to safely get local insights as array
  const getLocalInsights = (city: any): LocalInsight[] => {
    console.log(`Processing insights for ${city.name}:`, city.local_insights);
    
    if (!city.local_insights) {
      console.log(`No local_insights for ${city.name}`);
      return [];
    }
    
    // If it's already an array, return it
    if (Array.isArray(city.local_insights)) {
      console.log(`${city.name} has array insights:`, city.local_insights);
      return city.local_insights as LocalInsight[];
    }
    
    // If it's a string, try to parse it
    if (typeof city.local_insights === 'string') {
      try {
        const parsed = JSON.parse(city.local_insights);
        console.log(`${city.name} parsed insights:`, parsed);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error(`Error parsing local_insights for ${city.name}:`, e);
        return [];
      }
    }
    
    console.log(`${city.name} insights type not recognized:`, typeof city.local_insights);
    return [];
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Study Destination</h1>
          <p className="text-lg text-gray-600">Loading cities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Study Destination</h1>
          <p className="text-lg text-red-600">Error loading cities. Please try again.</p>
        </div>
      </div>
    );
  }

  console.log('All cities data:', cities);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Study Destination</h1>
        <p className="text-lg text-gray-600">
          Explore French cities and discover schools that match your academic goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cities?.map((city) => {
          const localInsights = getLocalInsights(city);
          console.log(`Rendering ${city.name} with ${localInsights.length} insights`);
          
          return (
            <Card 
              key={city.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              onClick={() => handleCitySelect(city.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{city.emoji}</span>
                    <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {city.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {city.schools_count || 0} Schools
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    onClick={(e) => handleShowInsights(city, e)}
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    Local Tips ({localInsights.length})
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedCity && (
        <InsightsDialog
          open={showInsightsDialog}
          onOpenChange={setShowInsightsDialog}
          cityName={selectedCity.name}
          localInsights={getLocalInsights(selectedCity)}
          transport={selectedCity.transport || ''}
          famousPlaces={selectedCity.famous_places || ''}
          sportsFacilities={selectedCity.sports_facilities || ''}
          studentLife={selectedCity.student_life || ''}
        />
      )}
    </div>
  );
};
