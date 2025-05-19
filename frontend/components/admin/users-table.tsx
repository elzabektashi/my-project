"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import {
  ArrowUpDown,
  MoreHorizontal,
  Shield,
  UserCog,
  UserX,
  KeyRound,
  Eye,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditUserDialog } from "./edit-user-dialog";
import { ResetPasswordDialog } from "./reset-password-dialog";
import { ManageRolesDialog } from "./manage-roles-dialog";
import { useToast } from "@/components/ui/use-toast";

// Mock data for users
const users = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@acmelogistics.com",
    company: "Acme Logistics",
    companyId: "c1",
    role: "Admin",
    status: "active",
    lastActive: "2023-05-14T10:30:00Z",
    avatar: "/javascript-code.png",
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah.j@fasttransport.com",
    company: "Fast Transport Inc.",
    companyId: "c2",
    role: "Manager",
    status: "active",
    lastActive: "2023-05-14T09:15:00Z",
    avatar: "/stylized-letters-sj.png",
  },
  {
    id: "u3",
    name: "Michael Chen",
    email: "m.chen@globalshipping.com",
    company: "Global Shipping Co.",
    companyId: "c3",
    role: "Dispatcher",
    status: "inactive",
    lastActive: "2023-05-10T14:45:00Z",
    avatar: "/microphone-concert-stage.png",
  },
  {
    id: "u4",
    name: "Emily Rodriguez",
    email: "e.rodriguez@fasttransport.com",
    company: "Fast Transport Inc.",
    companyId: "c2",
    role: "Driver",
    status: "active",
    lastActive: "2023-05-14T11:20:00Z",
    avatar: "/emergency-room-scene.png",
  },
  {
    id: "u5",
    name: "David Kim",
    email: "d.kim@acmelogistics.com",
    company: "Acme Logistics",
    companyId: "c1",
    role: "Customer",
    status: "blocked",
    lastActive: "2023-05-01T08:30:00Z",
    avatar: "/abstract-geometric-dk.png",
  },
  {
    id: "u6",
    name: "Lisa Wang",
    email: "l.wang@globalshipping.com",
    company: "Global Shipping Co.",
    companyId: "c3",
    role: "Manager",
    status: "active",
    lastActive: "2023-05-14T13:10:00Z",
    avatar: "/abstract-lw.png",
  },
  {
    id: "u7",
    name: "Robert Taylor",
    email: "r.taylor@acmelogistics.com",
    company: "Acme Logistics",
    companyId: "c1",
    role: "Dispatcher",
    status: "active",
    lastActive: "2023-05-14T10:45:00Z",
    avatar: "/road-trip-scenic-route.png",
  },
  {
    id: "u8",
    name: "Jennifer Lee",
    email: "j.lee@fasttransport.com",
    company: "Fast Transport Inc.",
    companyId: "c2",
    role: "Admin",
    status: "active",
    lastActive: "2023-05-14T09:30:00Z",
    avatar: "/stylized-jl-logo.png",
  },
];

export function UsersTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { toast } = useToast();

  const columns: ColumnDef<(typeof users)[0]>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={row.original.avatar || "/placeholder.svg"}
              alt={row.original.name}
            />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{row.original.name}</span>
            <span className="text-xs text-muted-foreground">
              {row.original.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "company",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Company
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={
              status === "active"
                ? "default"
                : status === "inactive"
                  ? "outline"
                  : "destructive"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "lastActive",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Active
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.original.lastActive);
        return (
          <span>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        const handleStatusChange = (status: string) => {
          toast({
            title: "User Status Updated",
            description: `${user.name}'s status has been changed to ${status}.`,
          });
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  (window.location.href = `/admin/users/${user.id}`)
                }
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <EditUserDialog user={user}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <UserCog className="mr-2 h-4 w-4" />
                  Edit User
                </DropdownMenuItem>
              </EditUserDialog>
              <ManageRolesDialog user={user}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Shield className="mr-2 h-4 w-4" />
                  Manage Roles
                </DropdownMenuItem>
              </ManageRolesDialog>
              <ResetPasswordDialog user={user}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Reset Password
                </DropdownMenuItem>
              </ResetPasswordDialog>
              <DropdownMenuSeparator />
              {user.status !== "active" && (
                <DropdownMenuItem onClick={() => handleStatusChange("active")}>
                  Activate User
                </DropdownMenuItem>
              )}
              {user.status !== "inactive" && (
                <DropdownMenuItem
                  onClick={() => handleStatusChange("inactive")}
                >
                  Deactivate User
                </DropdownMenuItem>
              )}
              {user.status !== "blocked" && (
                <DropdownMenuItem
                  onClick={() => handleStatusChange("blocked")}
                  className="text-destructive"
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Block User
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {users.length} users
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
