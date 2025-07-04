
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import checklistModules from '@/constants/checklistModules';

export const ChecklistPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Journey Checklist</h1>
        <p className="text-gray-600">Complete these modules to unlock your French education journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {checklistModules.map((module) => (
          <Card key={module.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{module.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {module.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{module.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
