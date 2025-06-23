
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const QuickHelpCard = () => (
  <Card>
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Help</h3>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          📋 Post a Question
        </Button>
        <Button variant="outline" className="w-full justify-start">
          🤝 Find Study Partner
        </Button>
        <Button variant="outline" className="w-full justify-start">
          🏠 Housing Exchange
        </Button>
        <Button variant="outline" className="w-full justify-start">
          📚 Share Resources
        </Button>
      </div>
    </CardContent>
  </Card>
);
