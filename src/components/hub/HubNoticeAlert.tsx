
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function HubNoticeAlert() {
  return (
    <Alert variant="destructive" className="rounded-lg border p-6">
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 mt-1 mr-3 text-destructive" />
        <div>
          <AlertTitle className="text-lg font-semibold mb-1">
            Notice: Sharing Contact Details Is Not Allowed
          </AlertTitle>
          <AlertDescription>
            For your safety, sharing phone numbers or other personal contact information is not allowed in posts, comments, or replies.
            Please keep discussions public.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
