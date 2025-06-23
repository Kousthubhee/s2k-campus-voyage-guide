
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

export function HubTripPlanCard() {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-3xl mb-2">🧳✈️</div>
        <h3 className="text-lg font-semibold mb-1">Plan a Trip Together!</h3>
        <p className="text-gray-600 mb-3">
          Looking to explore France or Europe with friends?
          Start a conversation in the Q&amp;A or Reels tab and connect with fellow travelers!
        </p>
        <Button
          className="mt-2"
          onClick={() =>
            toast("This would start a chat group for trip planning. (Requires Supabase integration for real chat.)")
          }
        >
          Start Trip Chat Group
        </Button>
      </CardContent>
    </Card>
  );
}
