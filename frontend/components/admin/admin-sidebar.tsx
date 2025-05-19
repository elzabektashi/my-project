"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building2, FileBarChart, FileText, Home, Settings, Users, HelpCircle, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarLink {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
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
    title: "Audit Logs",
    href: "/admin/dashboard/audit-logs",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/admin/dashboard/analytics",
    icon: BarChart3,
  },
]

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
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden border-r bg-background lg:block lg:w-64">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">LogiAdmin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-2 px-2">
            <TooltipProvider>
              {mainLinks.map((link) => (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === link.href && "bg-accent text-accent-foreground",
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.title}</TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <nav className="grid gap-2">
            <TooltipProvider>
              {bottomLinks.map((link) => (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === link.href && "bg-accent text-accent-foreground",
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.title}</TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </div>
      </div>
    </aside>
  )
}
