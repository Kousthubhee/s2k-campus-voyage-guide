
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PersonalizedDashboard } from '@/components/insights/PersonalizedDashboard';

interface InsightsPageProps {
  onBack: () => void;
}

export const InsightsPage = ({ onBack }: InsightsPageProps) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            📊 Personal Insights
          </h1>
          <p className="text-lg text-muted-foreground">
            Your personalized dashboard with smart recommendations and analytics
          </p>
        </div>
      </div>

      <PersonalizedDashboard />
    </div>
  );
};
