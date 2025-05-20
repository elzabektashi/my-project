"use client";

import { Building2, Package, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminOverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-[#0d1526] text-white border border-white/10 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-sm font-medium text-white">
              Total Companies
            </CardTitle>
            <div className="text-2xl font-bold mt-2">1,284</div>
            <p className="text-xs mt-1 text-green-500">+12% from last month</p>
          </div>
          <div className="rounded-full bg-[#1f2a40] p-3">
            <Building2 className="h-5 w-5 text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <a href="#" className="text-sm text-blue-400 hover:underline">
            View details ↗
          </a>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1526] text-white border border-white/10 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-sm font-medium text-white">
              Active Users
            </CardTitle>
            <div className="text-2xl font-bold mt-2">24,589</div>
            <p className="text-xs mt-1 text-green-500">+18% from last month</p>
          </div>
          <div className="rounded-full bg-[#1f2a40] p-3">
            <Users className="h-5 w-5 text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <a href="#" className="text-sm text-blue-400 hover:underline">
            View details ↗
          </a>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1526] text-white border border-white/10 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-sm font-medium text-white">
              Total Orders
            </CardTitle>
            <div className="text-2xl font-bold mt-2">1.2M</div>
            <p className="text-xs mt-1 text-green-500">+6% from last month</p>
          </div>
          <div className="rounded-full bg-[#1f2a40] p-3">
            <Package className="h-5 w-5 text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <a href="#" className="text-sm text-blue-400 hover:underline">
            View details ↗
          </a>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1526] text-white border border-white/10 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-sm font-medium text-white">
              Platform Revenue
            </CardTitle>
            <div className="text-2xl font-bold mt-2">$2.4M</div>
            <p className="text-xs mt-1 text-green-500">+14% from last month</p>
          </div>
          <div className="rounded-full bg-[#1f2a40] p-3">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <a href="#" className="text-sm text-blue-400 hover:underline">
            View details ↗
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
