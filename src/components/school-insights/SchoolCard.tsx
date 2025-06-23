
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, BookOpen } from "lucide-react";
import React from "react";

interface SchoolCardProps {
  school: any;
  onClick: () => void;
}

export function SchoolCard({ school, onClick }: SchoolCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{school.name}</CardTitle>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {school.location}
            </div>
          </div>
          <div>
            {school.website && (
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-500 hover:text-blue-700"
                onClick={e => e.stopPropagation()}
              >
                <svg className="inline w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h8m0 0v8m0-8l-8 8" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{school.description}</p>
        <div className="space-y-3">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            <span className="text-sm">{school.tuition || 'Contact for details'}</span>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <BookOpen className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-medium">Programs:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {school.programs.map((program: string, idx: number) => (
                <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {program}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Button className="w-full mt-4">View Details</Button>
      </CardContent>
    </Card>
  );
}
