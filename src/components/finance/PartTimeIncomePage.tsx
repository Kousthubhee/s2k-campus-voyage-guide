
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PartTimeIncomePageProps {
  selectedMonth: string;
  selectedYear: string;
  onDataChange: () => void;
}

export const PartTimeIncomePage = ({ selectedMonth, selectedYear, onDataChange }: PartTimeIncomePageProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Part-time Income</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Income
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">Coming Soon</p>
            <p>Track your part-time job earnings, internship payments, and other income sources.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
