
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function GamificationBadges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements & Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Earn badges by reaching milestones and good habits.</div>
      </CardContent>
    </Card>
  );
}
