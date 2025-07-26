
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Target, TrendingUp } from 'lucide-react';

interface ProgressItem {
  id: string;
  title: string;
  progress: number;
  deadline?: Date;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface AdvancedProgressTrackerProps {
  items: ProgressItem[];
  overallProgress: number;
}

export const AdvancedProgressTracker = ({ items, overallProgress }: AdvancedProgressTrackerProps) => {
  const upcomingDeadlines = items
    .filter(item => item.deadline && item.deadline > new Date())
    .sort((a, b) => a.deadline!.getTime() - b.deadline!.getTime())
    .slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const formatTimeUntil = (date: Date) => {
    const days = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days === 1) return '1 day left';
    if (days < 7) return `${days} days left`;
    if (days < 30) return `${Math.ceil(days / 7)} weeks left`;
    return `${Math.ceil(days / 30)} months left`;
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={overallProgress} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress: {overallProgress}%</span>
              <span>{Math.round(overallProgress / 100 * items.length)} of {items.length} completed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatTimeUntil(item.deadline!)}
                    </span>
                    <Badge variant={getPriorityColor(item.priority)} size="sm">
                      {item.priority}
                    </Badge>
                  </div>
                </div>
                <Progress value={item.progress} className="w-20" />
              </div>
            ))}
            {upcomingDeadlines.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No upcoming deadlines
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress by Category */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Progress by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(
              items.reduce((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
              }, {} as Record<string, ProgressItem[]>)
            ).map(([category, categoryItems]) => {
              const avgProgress = categoryItems.reduce((sum, item) => sum + item.progress, 0) / categoryItems.length;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category}</span>
                    <span className="text-sm text-muted-foreground">{Math.round(avgProgress)}%</span>
                  </div>
                  <Progress value={avgProgress} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
