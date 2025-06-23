
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const sampleCities = [
  {
    name: "Paris",
    highlights: [
      "📚 Paris has the largest student population in France",
      "🏛️ Visit the Latin Quarter for student-friendly cafes and libraries",
      "🗺️ Metro Line 4 connects most university areas",
    ],
  },
  {
    name: "Lyon",
    highlights: [
      "🍲 Famous for cuisine and vibrant student nightlife",
      "🎨 Explore the old town (Vieux Lyon)",
      "🚊 Tram lines facilitate campus transport",
    ],
  },
  {
    name: "Montpellier",
    highlights: [
      "🌴 Mediterranean climate and beautiful beaches",
      "👩‍🎓 Strong international student community",
      "🎵 Great music and street festivals",
    ],
  },
];

export function CityGuidesTab() {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold flex items-center mb-2"><MapPin className="h-5 w-5 mr-2" />City Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleCities.map(city => (
          <Card key={city.name}>
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold mb-2">{city.name}</h3>
              <ul className="list-disc ml-5 space-y-1 text-gray-700">
                {city.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
