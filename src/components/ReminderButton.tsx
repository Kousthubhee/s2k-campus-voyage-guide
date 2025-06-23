import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationErrorBoundary } from "./NotificationErrorBoundary";

interface ReminderButtonProps {
  onSet: (date: string) => void;
  date?: string;
}

export const ReminderButton = ({ onSet, date }: ReminderButtonProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(date || "");
  const { addNotification } = useNotifications();

  const handleSetReminder = () => {
    if (value) {
      onSet(value);
      // Create notification(s) for Reminder, now immediate. ReminderPage will autogenerate ones that show at the correct date.
      addNotification({
        id: `reminder-set-${Date.now()}`,
        type: "reminder",
        title: "Reminder Set",
        message: `A reminder for ${value} was set.`,
        time: Date.now(),
        read: false,
        reminderDate: value,
        actions: ["done", "snooze", "dismiss"],
      });
    }
    setOpen(false);
  };

  return (
    <NotificationErrorBoundary>
      <Button variant="outline" size="sm" className="flex items-center gap-1"
        onClick={() => setOpen(true)} aria-label="Set or edit reminder"
      >
        <Bell className="h-4 w-4" />
        {date ? "View/Edit Reminder" : "Set Reminder"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set a Reminder</DialogTitle>
          </DialogHeader>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="reminder-date">Remind me by</label>
            <Input
              id="reminder-date"
              type="date"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              size="sm"
              onClick={handleSetReminder}
              disabled={!value}
            >
              Save Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </NotificationErrorBoundary>
  );
}
