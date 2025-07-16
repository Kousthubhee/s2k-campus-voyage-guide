
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PiggyBank, Target } from 'lucide-react';

interface EmergencyFundPageProps {
  onDataChange: () => void;
}

export const EmergencyFundPage = ({ onDataChange }: EmergencyFundPageProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PiggyBank className="h-5 w-5 mr-2" />
            Emergency Fund
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">€0.00</div>
            <Progress value={0} className="mb-2" />
            <p className="text-sm text-muted-foreground">0% of €1,000 goal</p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Target className="h-4 w-4 mr-2 text-blue-600" />
              <span className="font-medium text-blue-900 dark:text-blue-100">Goal Recommendation</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Aim to save 2-3 months' worth of expenses for financial security as an international student.
            </p>
          </div>

          <div className="text-center py-8 text-muted-foreground">
            <p className="text-lg font-medium">Coming Soon</p>
            <p>Set your emergency fund goal and track your progress towards financial security.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
