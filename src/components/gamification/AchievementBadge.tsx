
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AchievementBadgeProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
    points: number;
    unlocked: boolean;
  };
}

export const AchievementBadge = ({ achievement }: AchievementBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
            achievement.unlocked 
              ? 'bg-green-50 border-green-200 shadow-sm' 
              : 'bg-gray-50 border-gray-200 opacity-60'
          }`}>
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <h4 className="font-semibold text-sm text-center">{achievement.title}</h4>
            <Badge variant={achievement.unlocked ? "default" : "secondary"} className="mt-2">
              {achievement.points} pts
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{achievement.description}</p>
          {achievement.unlocked && (
            <p className="text-xs text-green-600 mt-1">✓ Unlocked!</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
