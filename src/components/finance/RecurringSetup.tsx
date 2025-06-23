
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function RecurringSetup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recurring Expenses & Incomes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Automate monthly entries for rent, salary, or memberships.</div>
      </CardContent>
    </Card>
  );
}
