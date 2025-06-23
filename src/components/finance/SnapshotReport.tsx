
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function SnapshotReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Snapshot Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Download your monthly or yearly financial summaries.</div>
      </CardContent>
    </Card>
  );
}
