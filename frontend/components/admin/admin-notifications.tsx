"use client";

import { useRef, useEffect } from "react";
import { X, Bell, AlertCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminNotificationsProps {
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export function AdminNotifications({
  onClose,
  onMarkAllAsRead,
}: AdminNotificationsProps) {
  const ref = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 1,
      title: "New Company Registered",
      message: "Acme Logistics has registered and is awaiting approval.",
      time: "2 minutes ago",
      read: false,
      type: "user",
    },
    {
      id: 2,
      title: "System Alert: High API Usage",
      message: "FastTrack Shipping has exceeded 90% of their API quota.",
      time: "1 hour ago",
      read: false,
      type: "alert",
    },
    {
      id: 3,
      title: "Daily Backup Completed",
      message: "The system backup completed successfully.",
      time: "6 hours ago",
      read: true,
      type: "system",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const getIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />;
      case "alert":
      case "system":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div
      ref={ref}
      className="right-0 top-12 z-50 w-80 rounded-md bg-background shadow-md md:right-4 md:top-16 border border-white/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="font-semibold">Notifications</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            Mark all as read
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notification List */}
      <ScrollArea className="h-[400px]">
        <div className="flex flex-col">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`flex gap-3 p-4 ${
                notification.read ? "opacity-70" : "bg-[#0d1526]"
              } border-b border-white/10 hover:bg-[#1e293b] hover:border-transparent transition-all ${
                index === 0 ? "border-t border-white/10" : ""
              }`}
            >
              <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-white/10 p-2">
        <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-white transition-colors">
          View all notifications
        </Button>
      </div>
    </div>
  );
}
