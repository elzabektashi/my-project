"use client";

import { useState } from "react";
import { Bell, User } from "lucide-react";
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

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background border-white/20 px-4 sm:px-6">
      <div className="relative ml-auto flex items-center gap-2">
        {/* Bell Notification Dropdown */}
        <DropdownMenu>
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
              onClose={() => {}}
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
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border border-white/20 bg-background"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-[#1e293b] hover:border-transparent">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#1e293b] hover:border-transparent">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-[#1e293b] hover:border-transparent">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
