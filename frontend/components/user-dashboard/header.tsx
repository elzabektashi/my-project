"use client";

import { useState } from "react";
import { Bell, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NotificationCenter } from "@/components/user-dashboard/notification-center";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  const [unreadCount, setUnreadCount] = useState(3);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 backdrop-blur-md bg-[#091121]/80 border-b border-white/10 px-4 sm:px-8">
      <div className="relative ml-auto flex items-center gap-2">
        {/* Bell Notification Dropdown */}
        <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative border border-white/10 hover:bg-[#1e293b] hover:border-transparent transition-colors duration-200"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white p-0 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="p-0 border border-white/10"
          >
            <NotificationCenter
              onClose={handleCloseNotification}
              onMarkAllAsRead={markAllAsRead}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-white/10 hover:bg-[#1e293b] hover:border-transparent transition-colors duration-200"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border border-white/20 bg-[#091121]/80 backdrop-blur-md text-white"
          >
            <DropdownMenuLabel className="text-sm font-semibold text-white px-4 py-2">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem asChild>
              <Link
                href="/admin/profile"
                className="w-full px-4 py-2 text-sm text-white hover:bg-[#1e293b] block"
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/admin/settings"
                className="w-full px-4 py-2 text-sm text-white hover:bg-[#1e293b] block"
              >
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem asChild>
              <Link
                href="/logout"
                className="w-full px-4 py-2 text-sm text-white hover:bg-[#1e293b] block"
              >
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}