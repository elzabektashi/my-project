"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { X, Bell, Package, Truck, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationCenterProps {
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export function NotificationCenter({
  onClose,
  onMarkAllAsRead,
}: NotificationCenterProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "Order #ORD-1234 has been placed by ABC Corp.",
      time: "5 minutes ago",
      read: false,
      type: "order",
    },
    {
      id: 2,
      title: "Order Status Updated",
      message: "Order #ORD-1230 has been delivered successfully.",
      time: "1 hour ago",
      read: false,
      type: "status",
    },
    {
      id: 3,
      title: "Driver Assignment",
      message: "John Doe has been assigned to order #ORD-1228.",
      time: "3 hours ago",
      read: false,
      type: "driver",
    },
    {
      id: 4,
      title: "Vehicle Maintenance Alert",
      message: "Vehicle XYZ-123 is due for maintenance tomorrow.",
      time: "Yesterday",
      read: true,
      type: "vehicle",
    },
    {
      id: 5,
      title: "New User Joined",
      message: "Sarah Johnson has joined your company as a dispatcher.",
      time: "2 days ago",
      read: true,
      type: "user",
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
      case "order":
        return <Package className="h-4 w-4" />;
      case "status":
        return <CheckCircle className="h-4 w-4" />;
      case "driver":
        return <User className="h-4 w-4" />;
      case "vehicle":
        return <Truck className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 top-14 z-50 w-80 rounded-md bg-background shadow-md md:right-4 md:top-16 border border-white/20"
    >
      {/* Notification Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="font-semibold">Notifications</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
            Mark all as read
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Notifications */}
      <ScrollArea className="h-[400px]">
        <div className="flex flex-col">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`flex gap-3 p-4 ${
                notification.read ? "opacity-70" : "bg-[#111827]"
              } border-b border-white/20 hover:bg-[#1e293b] hover:border-transparent transition-all ${
                index === 0 ? "border-t border-white/20" : ""
              }`}
            >
              {/* Notification Icon */}
              <div
                className={`mt-1 rounded-full bg-primary/10 p-2 text-primary`}
              >
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

      {/* Footer Button */}
      <div className="border-t border-white/20 p-2">
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href="/dashboard/notifications">View all notifications</Link>
        </Button>
      </div>
    </div>
  );
}

// Add Link component to avoid TypeScript errors
function Link({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
