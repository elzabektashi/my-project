import { AdminCompaniesTable } from "components/admin/admin-companies-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdminCompaniesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Companies</h1>
          <p className="text-muted-foreground">
            Manage all companies on the platform
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/companies/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Search companies..."
          className="md:w-[300px] border border-white/10"
          type="search"
        />
        <div className="grid grid-cols-2 gap-2 md:flex md:gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[150px] border border-white/10">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#0d1526] border border-white/10">
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
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[150px] border border-white/10">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent className="bg-[#0d1526] border border-white/10">
              <SelectItem value="all" className="hover:bg-[#1e293b]">
                All Plans
              </SelectItem>
              <SelectItem value="free" className="hover:bg-[#1e293b]">
                Free
              </SelectItem>
              <SelectItem value="basic" className="hover:bg-[#1e293b]">
                Basic
              </SelectItem>
              <SelectItem value="professional" className="hover:bg-[#1e293b]">
                Professional
              </SelectItem>
              <SelectItem value="enterprise" className="hover:bg-[#1e293b]">
                Enterprise
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AdminCompaniesTable />
    </div>
  );
}
