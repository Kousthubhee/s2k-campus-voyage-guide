
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function SavingsGoals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Track progress toward what matters most to you.</div>
      </CardContent>
    </Card>
  );
}

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

export function PrivacyControls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Decide what financial info stays private.</div>
      </CardContent>
    </Card>
  );
}
