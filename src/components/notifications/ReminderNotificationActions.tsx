
import { Button } from "@/components/ui/button";

export const ReminderNotificationActions = ({
  onDone,
  onSnooze,
  onDismiss,
}: {
  onDone: () => void;
  onSnooze: () => void;
  onDismiss: () => void;
}) => (
  <div className="flex gap-2">
    <Button size="sm" variant="outline" onClick={onDone}>Mark as Done</Button>
    <Button size="sm" variant="secondary" onClick={onSnooze}>Snooze</Button>
    <Button size="sm" variant="ghost" onClick={onDismiss}>Dismiss</Button>
  </div>
);
