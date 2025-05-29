
import { Bell, Check, Clock, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Module Unlocked!',
    message: 'Pre-Arrival Checklist (Part 1) is now available',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'New School Added',
    message: 'NEOMA Business School has been added to Lyon schools list',
    time: '1 day ago',
    read: false
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Visa Application Reminder',
    message: 'Don\'t forget to submit your visa application at least 3 months before your planned arrival',
    time: '3 days ago',
    read: true
  },
  {
    id: '4',
    type: 'warning',
    title: 'Document Deadline',
    message: 'Housing application deadline is approaching - 2 weeks remaining',
    time: '5 days ago',
    read: true
  }
];

export function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check size={20} className="text-green-600" />;
      case 'warning': return <AlertCircle size={20} className="text-yellow-600" />;
      case 'reminder': return <Clock size={20} className="text-blue-600" />;
      default: return <Info size={20} className="text-blue-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'reminder': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with important information</p>
        </div>
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-xl p-4 transition-all duration-200 ${getBgColor(notification.type)} ${
              !notification.read ? 'shadow-md' : 'opacity-75'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                  <span className="text-sm text-gray-500">{notification.time}</span>
                </div>
                <p className="text-gray-700 text-sm">{notification.message}</p>
                {!notification.read && (
                  <div className="mt-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      Mark as read
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No notifications</h3>
          <p className="text-gray-600">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
