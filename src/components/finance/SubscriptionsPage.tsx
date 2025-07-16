
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface SubscriptionsPageProps {
  onDataChange: () => void;
}

export const SubscriptionsPage = ({ onDataChange }: SubscriptionsPageProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Subscriptions & Bills</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Subscription
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">Coming Soon</p>
            <p>Track your recurring expenses like Netflix, Spotify, phone bills, etc.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
