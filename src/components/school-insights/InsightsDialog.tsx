
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface InsightsDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  cityName: string;
  localInsights: { title: string; description: string; tips: string[] }[];
  transport: string;
  famousPlaces: string;
  sportsFacilities: string;
  studentLife: string;
}

export function InsightsDialog({
  open,
  onOpenChange,
  cityName,
  localInsights,
  transport,
  famousPlaces,
  sportsFacilities,
  studentLife,
}: InsightsDialogProps) {
  // Debug: log the tips received
  console.log("[InsightsDialog] localInsights for", cityName, localInsights);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Local Insights for {cityName}</DialogTitle>
          <DialogDescription>
            Student-sourced tips and suggestions to thrive in {cityName}!
          </DialogDescription>
        </DialogHeader>
        {/* --- Only show Local Insights tips section in Dialog --- */}
        <div className="space-y-6">
          {localInsights && localInsights.length > 0 ? (
            localInsights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-gray-600 mb-4">{insight.description}</p>
                  <ul className="space-y-2">
                    {insight.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No local tips available for this city yet.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

