import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowRight } from "lucide-react";

interface CityCardProps {
  name: string;
  emoji?: string;
  description: string;
  schoolsCount: number;
  onClick: () => void;
}

export function CityCard({
  name,
  emoji,
  description,
  schoolsCount,
  onClick,
  localInsights,
}: CityCardProps & { localInsights?: { title: string; description: string; tips: string[] }[] }) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {name} {emoji}
          </CardTitle>
          <Button
            size="icon"
            variant="ghost"
            aria-label={`Explore ${name}`}
            tabIndex={-1}
            onClick={onClick}
            className="ml-2"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {schoolsCount} Schools
          </span>
          {/* Show tip badge only if local insights */}
          {(localInsights && localInsights.length > 0) && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
              Local Tips
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
