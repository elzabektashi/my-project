"use client";

import { Building2, Package, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function AdminOverviewStats() {
  const stats = [
    {
      title: "Total Companies",
      value: "1,284",
      change: "+12% from last month",
      icon: <Building2 className="h-5 w-5 text-primary" />,
      href: "/admin/companies",
    },
    {
      title: "Active Users",
      value: "24,589",
      change: "+18% from last month",
      icon: <Users className="h-5 w-5 text-primary" />,
      href: "/admin/users",
    },
    {
      title: "Total Orders",
      value: "1.2M",
      change: "+6% from last month",
      icon: <Package className="h-5 w-5 text-primary" />,
      href: "/admin/orders",
    },
    {
      title: "Platform Revenue",
      value: "$2.4M",
      change: "+14% from last month",
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      href: "/admin/revenue",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-xs text-green-500">
                  {stat.change}
                </span>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={stat.href}
                className="flex items-center text-sm text-primary hover:underline"
              >
                View details
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}