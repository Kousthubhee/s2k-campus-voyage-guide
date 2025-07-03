
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, MapPin } from 'lucide-react';

interface VisaSchedulerDialogProps {
  appointment: { date: string; location: string } | null;
  onSet: (appointment: { date: string; location: string }) => void;
}

export const VisaSchedulerDialog = ({ appointment, onSet }: VisaSchedulerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(appointment?.date || '');
  const [location, setLocation] = useState(appointment?.location || '');

  const handleSave = () => {
    if (date && location) {
      onSet({ date, location });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {appointment ? 'Visa Appointment Set' : 'Schedule Visa Appointment'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule VFS Visa Appointment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Appointment Date</label>
            <Input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">VFS Center Location</label>
            <Input
              placeholder="e.g., VFS Global Delhi, Mumbai, etc."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button onClick={handleSave} disabled={!date || !location}>
            Save Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
