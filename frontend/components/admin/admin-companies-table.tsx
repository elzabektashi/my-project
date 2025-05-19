"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Company {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  status: "active" | "pending" | "blocked";
  plan: string;
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
    plan: "Enterprise",
    usersCount: 45,
    registeredAt: "2023-01-15",
  },
  {
    id: "2",
    name: "FastTrack Shipping",
    contactName: "Jane Smith",
    contactEmail: "jane@fasttrack.com",
    status: "pending",
    plan: "Professional",
    usersCount: 12,
    registeredAt: "2023-03-22",
  },
  {
    id: "3",
    name: "Global Transport Co.",
    contactName: "Mike Johnson",
    contactEmail: "mike@globaltransport.com",
    status: "active",
    plan: "Professional",
    usersCount: 28,
    registeredAt: "2022-11-05",
  },
  {
    id: "4",
    name: "City Movers Inc.",
    contactName: "Sarah Williams",
    contactEmail: "sarah@citymovers.com",
    status: "pending",
    plan: "Basic",
    usersCount: 8,
    registeredAt: "2023-04-18",
  },
  {
    id: "5",
    name: "Express Delivery Ltd.",
    contactName: "Robert Brown",
    contactEmail: "robert@expressdelivery.com",
    status: "blocked",
    plan: "Basic",
    usersCount: 5,
    registeredAt: "2023-02-10",
  },
];

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default"; // Mapped from "success"
    case "pending":
      return "outline"; // Mapped from "warning"
    case "blocked":
      return "destructive";
    default:
      return "default";
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Users</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/admin/companies/${company.id}`}
                  className="hover:underline"
                >
                  {company.name}
                </Link>
              </TableCell>
              <TableCell>
                <div>{company.contactName}</div>
                <div className="text-sm text-muted-foreground">
                  {company.contactEmail}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(company.status)}>
                  {company.status}
                </Badge>
              </TableCell>
              <TableCell>{company.plan}</TableCell>
              <TableCell>{company.usersCount}</TableCell>
              <TableCell>{company.registeredAt}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/companies/${company.id}`}>
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/companies/${company.id}/edit`}>
                        Edit company
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleImpersonateUser(company.name)}
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Impersonate admin
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {company.status === "pending" && (
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(company.id, "active")}
                      >
                        Approve company
                      </DropdownMenuItem>
                    )}
                    {company.status !== "blocked" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-red-600 dark:text-red-400"
                          >
                            Block company
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Block {company.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will prevent all users from accessing the
                              platform. This action can be reversed later.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleStatusChange(company.id, "blocked")
                              }
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Block
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    {company.status === "blocked" && (
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(company.id, "active")}
                      >
                        Unblock company
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
