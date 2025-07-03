
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Bus, Sparkles, Trophy, Users } from 'lucide-react';

interface CityInsightsCardProps {
  cityName: string;
  transport: string;
  famousPlaces: string;
  sportsFacilities: string;
  studentLife: string;
  onShowAll: () => void;
}

export const CityInsightsCard = ({
  cityName,
  transport,
  famousPlaces,
  sportsFacilities,
  studentLife,
  onShowAll
}: CityInsightsCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Sparkles className="h-5 w-5" />
          Local Insights for {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {transport && (
            <div className="flex items-start gap-3">
              <Bus className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Transport</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{transport}</p>
              </div>
            </div>
          )}
          {famousPlaces && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Famous Places</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{famousPlaces}</p>
              </div>
            </div>
          )}
          {sportsFacilities && (
            <div className="flex items-start gap-3">
              <Trophy className="h-5 w-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Sports Facilities</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{sportsFacilities}</p>
              </div>
            </div>
          )}
          {studentLife && (
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Student Life</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{studentLife}</p>
              </div>
            </div>
          )}
        </div>
        <Button onClick={onShowAll} variant="outline" className="w-full">
          View All Local Insights
        </Button>
      </CardContent>
    </Card>
  );
};
