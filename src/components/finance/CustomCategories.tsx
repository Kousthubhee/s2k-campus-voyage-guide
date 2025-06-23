
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function CustomCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Budget Categories</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Feature UI goes here (add/edit/remove categories) */}
        <div className="text-gray-600">Personalize your categories for tailored budgeting.</div>
      </CardContent>
    </Card>
  );
}
