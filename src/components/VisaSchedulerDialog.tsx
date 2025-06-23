
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface VisaSchedulerDialogProps {
  appointment: { date: string; location: string } | null;
  onSet: (info: { date: string; location: string }) => void;
}

export const VisaSchedulerDialog = ({ appointment, onSet }: VisaSchedulerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(appointment?.date || "");
  const [location, setLocation] = useState(appointment?.location || "");
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => setOpen(true)}
      >
        <Calendar className="h-4 w-4" /> {appointment ? "View/Edit Appointment" : "Schedule Visa Appointment"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visa Appointment Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="VFS Center location" />
            </div>
          </div>
          <DialogFooter>
            <Button
              size="sm"
              onClick={() => { if (date && location) onSet({ date, location }); setOpen(false); }}
              disabled={!date || !location}
            >
              Save Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
