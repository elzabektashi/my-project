"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminSidebar } from "./admin-sidebar";
import { AdminNotifications } from "./admin-notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function AdminHeader() {
  const [showSearch, setShowSearch] = useState(false);
  const [unreadCount] = useState(3); // Kept static as in AdminHeader; can be made dynamic if needed

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
        {showSearch ? (
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search across platform..."
              className="rounded-lg bg-[#0d1526] text-white border-white/10 pl-8 w-[200px] md:w-[250px] lg:w-[300px]"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 text-muted-foreground hover:bg-[#1e293b]"
              onClick={() => setShowSearch(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="border border-white/10 hover:bg-[#1e293b] hover:border-transparent transition-colors duration-200"
            onClick={() => setShowSearch(true)}
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Search</span>
          </Button>
        )}

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
              <span className="sr-only">Open notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 p-0 border border-white/10 bg-[#091121]/80 backdrop-blur-md"
          >
            <AdminNotifications />
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
              <Avatar className="h-8 w-8">
                <AvatarImage src="/admin-interface.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border border-white/20 bg-[#091121]/80 backdrop-blur-md text-white"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              asChild
              className="hover:bg-[#1e293b] hover:border-transparent"
            >
              <Link href="/admin/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="hover:bg-[#1e293b] hover:border-transparent"
            >
              <Link href="/admin/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              asChild
              className="hover:bg-[#1e293b] hover:border-transparent"
            >
              <Link href="/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
