//"use client";

import type { Metadata } from "next";
import { UsersTable } from "@/components/admin/users-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Search } from "lucide-react";
import { CreateUserDialog } from "@/components/admin/create-user-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Admin | Users Management",
  description: "Manage users across all companies in the platform",
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
        <CreateUserDialog>
          <Button variant="primaryAction">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CreateUserDialog>
      </div>

      <Card className="border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">User Management</CardTitle>
          <CardDescription>
            View, filter, and manage user accounts across all companies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="w-full pl-8 border-white/10"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px] border border-white/10 bg-[#0f172a] text-white">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f172a] text-white border border-white/10">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="dispatcher">Dispatcher</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px] border border-white/10 bg-[#0f172a] text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f172a] text-white border border-white/10">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 overflow-auto rounded-md border border-white/10">
            <div className="min-w-[1000px]">
              <UsersTable />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
