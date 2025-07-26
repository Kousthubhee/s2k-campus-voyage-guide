
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGamification } from '@/hooks/useGamification';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';

export function GamificationBadges() {
  const { achievements, userStats } = useGamification();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏆 Achievements & Badges
          <div className="ml-auto text-sm text-muted-foreground">
            Level {userStats.level} • {userStats.totalPoints} points
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {achievements.map(achievement => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
          <div>
            <div className="text-2xl font-bold text-blue-600">{userStats.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{userStats.completedModules}</div>
            <div className="text-sm text-muted-foreground">Modules</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{userStats.totalExpenses}</div>
            <div className="text-sm text-muted-foreground">Expenses</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
