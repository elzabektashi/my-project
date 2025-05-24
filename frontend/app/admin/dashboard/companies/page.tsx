"use client";

import { AdminCompaniesTable } from "@/components/admin/admin-companies-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function AdminCompaniesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
      </div>

      {/* Card */}
      <Card className="border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Company Management
          </CardTitle>
          <CardDescription>
            View, filter, and manage all companies on the platform
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search companies..."
                  className="w-full pl-8 border-white/10"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[150px] border border-white/10 bg-[#0f172a] text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f172a] text-white border border-white/10">
                  <SelectItem value="all" className="hover:bg-[#1e293b]">
                    All Statuses
                  </SelectItem>
                  <SelectItem value="active" className="hover:bg-[#1e293b]">
                    Active
                  </SelectItem>
                  <SelectItem value="pending" className="hover:bg-[#1e293b]">
                    Pending
                  </SelectItem>
                  <SelectItem value="blocked" className="hover:bg-[#1e293b]">
                    Blocked
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-auto rounded-md border border-white/10">
            <div className="min-w-[900px]">
              <AdminCompaniesTable />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
