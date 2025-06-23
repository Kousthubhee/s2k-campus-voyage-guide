import { useState, useEffect, createContext, useContext } from "react";

// Notification type definition
export type NotificationType = "success" | "info" | "warning" | "reminder";
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: number; // timestamp ms
  read: boolean;
  reminderDate?: string; // if from reminder
  actions?: string[]; // e.g. ["done","snooze","dismiss"]
}

// Utilities
function getTimeAgo(ts: number): string {
  const now = Date.now();
  const diff = Math.floor((now - ts) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return new Date(ts).toLocaleDateString();
}

const NotificationContext = createContext<null | {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  syncReminders: (reminders: { [id: string]: string }) => void;
}>(null);

// Persistent local storage key
const STORAGE_KEY = "pasS2Kampus.notifications";
const REMINDER_WINDOWS_DAYS = [0, 3];

console.log("NotificationProvider is loaded");

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  console.log("NotificationProvider is rendering");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setNotifications(JSON.parse(stored));
  }, []);

  // Save any changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  // Add a notification
  const addNotification = (n: Notification) => {
    setNotifications(prev => [n, ...prev]);
  };
  // Remove
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  // Mark as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  const clearAll = () => {
    setNotifications([]);
  };

  // Sync reminders: Check if new reminders fall "within window", add as needed
  const syncReminders = (reminders: { [id: string]: string }) => {
    setNotifications(prev => [
      // keep all non-reminder notifications
      ...prev.filter(n => n.type !== "reminder"),
      // Add new scheduled notifications for each reminder, if window
      ...Object.entries(reminders)
        .flatMap(([id, date]) => {
          // 3 days prior and on the day
          const now = new Date();
          const reminderDay = new Date(date + "T00:00:00");
          const result: Notification[] = [];
          for (let offsetDays of REMINDER_WINDOWS_DAYS) {
            const showDate = new Date(reminderDay);
            showDate.setDate(reminderDay.getDate() - offsetDays);
            // Should we show this notification today?
            const showToday = showDate.toDateString() === now.toDateString();
            if (showToday) {
              result.push({
                id: `reminder-${id}-${offsetDays}`,
                type: "reminder",
                title: offsetDays === 0 ? "Today's Reminder" : "Upcoming Reminder",
                message:
                  offsetDays === 0
                    ? "You set a reminder for today."
                    : `Reminder in ${offsetDays} day${offsetDays === 1 ? "" : "s"}.`,
                time: Date.now(),
                read: false,
                reminderDate: date,
                actions: ["done", "snooze", "dismiss"],
              });
            }
          }
          return result;
        }),
    ]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        markAsRead,
        markAllAsRead,
        clearAll,
        syncReminders,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("Wrap your app in <NotificationProvider>");
  return ctx;
}

export { getTimeAgo };
