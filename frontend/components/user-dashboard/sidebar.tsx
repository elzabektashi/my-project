"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  Building2,
  LogOut,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Order",
    href: "/dashboard/orders/new",
    icon: PlusCircle,
  },
  {
    title: "My Orders",
    href: "/dashboard/orders",
    icon: Package,
  },
  {
    title: "Vehicles",
    href: "/dashboard/vehicles",
    icon: Truck,
  },
  {
    title: "Drivers",
    href: "/dashboard/drivers",
    icon: Users,
  },
  {
    title: "Company Info",
    href: "/dashboard/company",
    icon: Building2,
  },
];

interface SidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: SidebarProps) {
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
            className="absolute left-4 top-3 z-40 lg:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[240px] p-0 bg-[#0d1526] border-r border-[#1b2638]"
        >
          <MobileSidebar pathname={pathname} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex h-screen w-64 flex-col border-r border-[#1b2638] bg-[#0d1526]",
          className
        )}
      >
        <div className="flex h-14 items-center border-b border-[#1b2638] px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Truck className="h-6 w-6 text-primary" />
            <span className="text-lg">LogiFlow</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-[#0d1526] text-zinc-50"
                    : "text-zinc-400 hover:bg-[#1b2638] hover:text-zinc-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-[#1b2638] p-4">
          <Link
            href="/logout"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-red-900/20 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
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
      <div className="flex h-14 items-center border-b border-[#1b2638] px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setIsOpen(false)}
        >
          <Truck className="h-6 w-6 text-primary" />
          <span className="text-lg">LogiFlow</span>
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
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-[#0d1526] text-zinc-50"
                  : "text-zinc-400 hover:bg-[#1b2638] hover:text-zinc-50"
              )}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-[#1b2638] p-4">
        <Link
          href="/logout"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-red-900/20 hover:text-red-400"
          onClick={() => setIsOpen(false)}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  );
}
