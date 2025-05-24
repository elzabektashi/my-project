"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, UserCheck } from "lucide-react";
import { Eye, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

interface Company {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  status: "active" | "pending" | "blocked";
  usersCount: number;
  registeredAt: string;
}

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Acme Logistics",
    contactName: "John Doe",
    contactEmail: "john@acmelogistics.com",
    status: "active",

    usersCount: 45,
    registeredAt: "2023-01-15",
  },
  {
    id: "2",
    name: "FastTrack Shipping",
    contactName: "Jane Smith",
    contactEmail: "jane@fasttrack.com",
    status: "pending",

    usersCount: 12,
    registeredAt: "2023-03-22",
  },
  {
    id: "3",
    name: "Global Transport Co.",
    contactName: "Mike Johnson",
    contactEmail: "mike@globaltransport.com",
    status: "active",

    usersCount: 28,
    registeredAt: "2022-11-05",
  },
  {
    id: "4",
    name: "City Movers Inc.",
    contactName: "Sarah Williams",
    contactEmail: "sarah@citymovers.com",
    status: "pending",

    usersCount: 8,
    registeredAt: "2023-04-18",
  },
  {
    id: "5",
    name: "Express Delivery Ltd.",
    contactName: "Robert Brown",
    contactEmail: "robert@expressdelivery.com",
    status: "blocked",

    usersCount: 5,
    registeredAt: "2023-02-10",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "blocked":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function AdminCompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: "active" | "blocked") => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );

    toast({
      title: "Company status updated",
      description: `Company has been ${newStatus}`,
    });
  };

  const handleImpersonateUser = (companyName: string) => {
    toast({
      title: "Impersonation started",
      description: `You are now impersonating an admin at ${companyName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="min-w-[1100px]">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="px-3 py-3">Company</TableHead>
              <TableHead className="px-3 py-3">Contact</TableHead>
              <TableHead className="px-3 py-3">Status</TableHead>
              <TableHead className="px-3 py-3">Users</TableHead>
              <TableHead className="px-3 py-3">Registered</TableHead>
              <TableHead className="px-3 py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow
                key={company.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell className="px-3 py-4 font-medium">
                  <Link
                    href={`/admin/companies/${company.id}`}
                    className="hover:underline"
                  >
                    {company.name}
                  </Link>
                </TableCell>
                <TableCell className="px-3 py-4">
                  <div>{company.contactName}</div>
                  <div className="text-sm text-muted-foreground">
                    {company.contactEmail}
                  </div>
                </TableCell>
                <TableCell className="px-3 py-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                      company.status
                    )}`}
                  >
                    {company.status}
                  </span>
                </TableCell>
                <TableCell className="px-3 py-4">
                  {company.usersCount}
                </TableCell>
                <TableCell className="px-3 py-4">
                  {company.registeredAt}
                </TableCell>
                <TableCell className="py-4 px-3 text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/dashboard/companies/${company.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View order {company.id}</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
