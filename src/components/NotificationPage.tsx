
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { PageTitle } from './PageTitle';
import { useNotifications, getTimeAgo } from "@/hooks/useNotifications";
import { ReminderNotificationActions } from "./notifications/ReminderNotificationActions";
import { toast } from "@/components/ui/sonner";
import { useEffect } from "react";
import { NotificationErrorBoundary } from "./NotificationErrorBoundary";

export const NotificationPage = ({ reminders }: { reminders?: { [id: string]: string } }) => {
  // Debug log for troubleshooting blank screen
  console.log("[NotificationPage] Rendering with reminders:", reminders);

  // Attempt to get notifications via hook, handle context error
  let notificationsData:
    | ReturnType<typeof useNotifications>
    | undefined = undefined;
  let hookError: Error | null = null;

  try {
    notificationsData = useNotifications();
  } catch (err: any) {
    hookError = err;
  }

  // If error during hook, render error state
  if (hookError) {
    console.error("[NotificationPage] useNotifications error: ", hookError);
    return (
      <div className="p-8 bg-red-100 text-red-800 rounded-lg">
        <b>Error loading notifications:</b>
        <br />
        {hookError?.message || String(hookError)}
      </div>
    );
  }

  // If notificationsData couldn't be retrieved, also render fallback
  if (!notificationsData) {
    return (
      <div className="p-8 bg-red-50 text-red-600">Notifications not available.</div>
    );
  }

  const {
    notifications,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    syncReminders,
  } = notificationsData;

  // Defensive: check if notifications is array
  if (!Array.isArray(notifications)) {
    console.error("[NotificationPage] notifications is not an array:", notifications);
    return (
      <div className="text-red-600 p-4">
        <b>NotificationPage error:</b> notifications is not an array.
      </div>
    );
  }

  // Sync reminders—done on mount and whenever reminders prop changes
  useEffect(() => {
    if (reminders) syncReminders(reminders);
  }, [reminders, syncReminders]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "reminder":
        return <Bell className="h-5 w-5 text-indigo-600 animate-pulse" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };
  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      case "reminder":
        return "border-l-indigo-400 bg-indigo-50";
      case "info":
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  // Handle notification actions
  const handleMarkRead = (id: string) => {
    markAsRead(id);
    toast("Marked as read");
  };
  const handleRemove = (id: string) => {
    removeNotification(id);
    toast("Notification removed");
  };
  const handleMarkAllRead = () => {
    markAllAsRead();
    toast.success("All notifications marked as read");
  };
  const handleClearAll = () => {
    clearAll();
    toast("All notifications cleared");
  };

  const handleReminderAction = (notifId: string, action: string) => {
    switch (action) {
      case "done":
        removeNotification(notifId);
        toast.success("Reminder completed!");
        break;
      case "snooze":
        // Snooze just marks as read and updates the time
        markAsRead(notifId);
        toast("Snoozed for later");
        break;
      case "dismiss":
        removeNotification(notifId);
        toast("Reminder dismissed");
        break;
      default:
        break;
    }
  };

  // All notification logic inside error boundary
  return (
    <NotificationErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* debugging log */}
        <div style={{ display: "none" }} id="notif-debug">{JSON.stringify(notifications)}</div>
        <div className="text-center mb-8">
          <PageTitle>
            <span className="align-middle">
              <Bell className="h-6 w-6 mr-2 inline-block text-blue-600 animate-pulse" />
              Notifications
            </span>
          </PageTitle>
          <p className="text-base text-gray-600 font-calibri">
            Stay updated with your progress and important information
          </p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              Clear All
            </Button>
          </div>
        </div>
        {/* Notification list */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card className="bg-gray-50">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Bell className="h-10 w-10 text-gray-300 mb-2" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">You're all caught up!</h3>
                <p className="text-gray-500">No notifications at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.read ? "ring-2 ring-blue-200" : ""
                }`}
                aria-live={notification.read ? "polite" : "assertive"}
              >
                <CardContent className="p-0">
                  <div className={`border-l-4 p-4 ${getNotificationColor(notification.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-1">{notification.message}</p>
                          <div className="text-sm text-gray-500" aria-label="Time of notification">
                            {getTimeAgo(notification.time)}
                          </div>
                          {/* Reminder actions */}
                          {notification.type === "reminder" && (
                            <ReminderNotificationActions
                              onDone={() => handleReminderAction(notification.id, "done")}
                              onSnooze={() => handleReminderAction(notification.id, "snooze")}
                              onDismiss={() => handleReminderAction(notification.id, "dismiss")}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            aria-label="Mark notification as read"
                            onClick={() => handleMarkRead(notification.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          aria-label="Remove notification"
                          onClick={() => handleRemove(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {/* Settings block - link */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Customize your notification preferences to get the most relevant updates.
            </p>
            <Button variant="outline">Notification Settings</Button>
          </CardContent>
        </Card>
      </div>
    </NotificationErrorBoundary>
  );
};
