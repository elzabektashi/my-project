"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminSidebar } from "./admin-sidebar";
import { AdminNotifications } from "./admin-notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount] = useState(3);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 backdrop-blur-md bg-[#091121]/80 border-b border-white/10 px-4 sm:px-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 lg:hidden border-white/10 hover:bg-[#1e293b] hover:border-transparent transition-colors duration-200"
          >
            <Menu className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 p-0 bg-[#091121]/80 backdrop-blur-md border-r border-white/10"
        >
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      <div className="relative ml-auto flex items-center gap-2">
        {/* Bell Icon */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative border border-white/10 hover:bg-[#1e293b] hover:border-transparent transition-colors duration-200"
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white p-0 text-[10px]">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Open notifications</span>
        </Button>

        {/* Notification Panel */}
        {showNotifications && (
          <div className="absolute top-12 right-0 z-50">
            <AdminNotifications
              onClose={() => setShowNotifications(false)}
              onMarkAllAsRead={() => {
                console.log("Marked all as read");
              }}
            />
          </div>
        )}

        {/* User Dropdown */}
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
