"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  FileBarChart,
  FileText,
  Home,
  Settings,
  Users,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarLink {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainLinks: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Companies",
    href: "/admin/dashboard/companies",
    icon: Building2,
  },
  {
    title: "Users",
    href: "/admin/dashboard/users",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/admin/dashboard/reports",
    icon: FileBarChart,
  },

  {
    title: "Analytics",
    href: "/admin/dashboard/analytics",
    icon: BarChart3,
  },
  { title: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

const bottomLinks: SidebarLink[] = [
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/admin/dashboard/help",
    icon: HelpCircle,
  },
  {
    title: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];

interface SidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-3 z-40 lg:hidden border-white/10"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[240px] p-0 bg-[#091121]/80 backdrop-blur-md border-r border-white/10"
        >
          <MobileSidebar pathname={pathname} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex h-screen w-64 flex-col bg-[#091121]/80 backdrop-blur-md border-r border-white/10 shadow-lg",
          className
        )}
      >
        <div className="flex h-14 items-center border-b border-white/10 px-4">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-semibold text-white"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <Home className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg">LogiAdmin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-2 px-4">
            {mainLinks.map((link, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-[#1e293b] text-white font-bold"
                          : "text-muted-foreground hover:text-foreground hover:font-bold"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.title}</span>
                    </Link>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t border-white/10 p-4">
          <Button
            variant="outline"
            className="w-full justify-start border border-white/10 hover:bg-[#1e293b] hover:border-transparent"
            asChild
          >
            <Link href="/logout" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function MobileSidebar({
  pathname,
  setIsOpen,
}: {
  pathname: string;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b border-white/10 px-4">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-semibold text-white"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <Home className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg">LogiAdmin</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {mainLinks.concat(bottomLinks).map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === link.href
                  ? "bg-[#1e293b] font-bold text-white"
                  : "text-muted-foreground hover:text-foreground hover:font-bold"
              )}
              onClick={() => setIsOpen(false)}
            >
              <link.icon className="h-4 w-4" />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
        <Button
          variant="outline"
          className="w-full justify-start border border-white/10 hover:bg-[#1e293b] hover:border-transparent"
          asChild
        >
          <Link
            href="/logout"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
