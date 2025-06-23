
interface Achievement {
  title: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}
export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Achievements</h3>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className={`flex items-center p-3 rounded-lg ${
            achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
          }`}>
            <div className="text-2xl mr-3">{achievement.icon}</div>
            <div>
              <div className={`font-medium ${
                achievement.earned ? 'text-green-900' : 'text-gray-700'
              }`}>
                {achievement.title}
              </div>
              <div className={`text-sm ${
                achievement.earned ? 'text-green-700' : 'text-gray-500'
              }`}>
                {achievement.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
