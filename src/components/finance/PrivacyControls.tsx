
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
