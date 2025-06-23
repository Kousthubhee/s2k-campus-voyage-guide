
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  activeMembers: number;
  postsThisWeek: number;
  questionsAnswered: number;
}

export const StatsCard = ({ activeMembers, postsThisWeek, questionsAnswered }: StatsCardProps) => (
  <Card>
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Active Members</span>
          <span className="font-semibold">{activeMembers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Posts This Week</span>
          <span className="font-semibold">{postsThisWeek}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Questions Answered</span>
          <span className="font-semibold">{questionsAnswered}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);
