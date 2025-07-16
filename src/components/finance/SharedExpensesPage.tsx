
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

interface SharedExpensesPageProps {
  onDataChange: () => void;
}

export const SharedExpensesPage = ({ onDataChange }: SharedExpensesPageProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Shared Expenses
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Shared Expense
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">Coming Soon</p>
            <p>Split bills with roommates and friends. Track who owes what and settle up easily.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
