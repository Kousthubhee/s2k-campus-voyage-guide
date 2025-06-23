
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

export const AchievementsCard = () => (
  <Card>
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Award className="h-5 w-5 mr-2 text-yellow-600" />
        Achievements
      </h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="text-yellow-600 mr-2">🏆</span>
          <span>Top Contributor</span>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-600 mr-2">🌟</span>
          <span>Helpful Mentor</span>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-600 mr-2">🎉</span>
          <span>Community Star</span>
        </div>
      </div>
    </CardContent>
  </Card>
);
