
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function BillReminders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Never miss a payment—set up due date alerts.</div>
      </CardContent>
    </Card>
  );
}
