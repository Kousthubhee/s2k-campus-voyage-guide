
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AlertsSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Get notified when you’re near your budget limits.</div>
      </CardContent>
    </Card>
  );
}
