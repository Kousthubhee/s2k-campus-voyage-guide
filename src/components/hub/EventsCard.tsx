
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  attendees: number;
}

interface EventsCardProps {
  events: Event[];
}

export const EventsCard = ({ events }: EventsCardProps) => (
  <Card>
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-blue-600" />
        Upcoming Events
      </h3>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-blue-50 p-4 rounded-lg">
            <div className="font-semibold text-blue-900">{event.title}</div>
            <div className="text-sm text-blue-700">{event.date} at {event.time}</div>
            <div className="text-xs text-blue-600 mt-1">{event.attendees} attending</div>
            <Button size="sm" className="mt-2 w-full">Join Event</Button>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
