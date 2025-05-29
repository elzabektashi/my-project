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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data
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

 const columns: ColumnDef<(typeof users)[0]>[] = [
  {
    accessorKey: "name",
    header: "User",
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
    header: "Company",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === "active"
          ? "bg-green-100 text-green-800"
          : status === "inactive"
          ? "bg-amber-100 text-amber-800"
          : "bg-red-100 text-red-800";
      return (
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${color}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
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
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button variant="ghost" size="icon" asChild>
          <a href={`/admin/dashboard/users/${user.id}`}>
            <Eye className="h-4 w-4" />
            <span className="sr-only">View user</span>
          </a>
        </Button>
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
    <div className="space-y-6">
      <div className="min-w-[1000px]">
        <Table className="w-full text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-white/10"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-3 py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
