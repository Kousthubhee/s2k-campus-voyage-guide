
import { Card, CardContent } from "@/components/ui/card";
import { Info, Bus, Landmark, Trophy, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface CityInsightsCardProps {
  cityName: string;
  transport: string;
  famousPlaces: string;
  sportsFacilities: string;
  studentLife: string;
  onShowAll: () => void;
}

export function CityInsightsCard({
  cityName,
  transport,
  famousPlaces,
  sportsFacilities,
  studentLife,
  onShowAll,
}: CityInsightsCardProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Local Insights for {cityName}</h2>
          </div>
          <Button onClick={onShowAll} variant="outline">
            View All Tips
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Bus className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Transport</h3>
            </div>
            <p className="text-sm text-gray-600">{transport}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Landmark className="h-5 w-5 mr-2 text-purple-700" />
              <h3 className="font-semibold text-gray-900">Nearby Landmarks</h3>
            </div>
            <p className="text-sm text-gray-600">{famousPlaces}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Trophy className="h-5 w-5 mr-2 text-green-700" />
              <h3 className="font-semibold text-gray-900">Sports Facilities</h3>
            </div>
            <p className="text-sm text-gray-600">{sportsFacilities}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <GraduationCap className="h-5 w-5 mr-2 text-teal-600" />
              <h3 className="font-semibold text-gray-900">Student Life</h3>
            </div>
            <p className="text-sm text-gray-600">{studentLife}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

