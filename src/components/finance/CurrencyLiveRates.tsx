
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function CurrencyLiveRates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Currency Exchange</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Convert currencies using real-time rates.</div>
      </CardContent>
    </Card>
  );
}
