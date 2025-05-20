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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock audit log data
const auditLogs = [
  {
    id: "log1",
    timestamp: "2023-05-14T10:30:00Z",
    user: {
      id: "u1",
      name: "John Smith",
      email: "john.smith@acmelogistics.com",
      avatar: "/javascript-code.png",
    },
    action: "login",
    resource: "system",
    resourceId: null,
    details: "User logged in successfully",
    ipAddress: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  {
    id: "log2",
    timestamp: "2023-05-14T10:35:00Z",
    user: {
      id: "u1",
      name: "John Smith",
      email: "john.smith@acmelogistics.com",
      avatar: "/javascript-code.png",
    },
    action: "create",
    resource: "order",
    resourceId: "o123",
    details: "Created new order #ORD-123",
    ipAddress: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  {
    id: "log3",
    timestamp: "2023-05-14T11:15:00Z",
    user: {
      id: "u2",
      name: "Sarah Johnson",
      email: "sarah.j@fasttransport.com",
      avatar: "/stylized-letters-sj.png",
    },
    action: "update",
    resource: "vehicle",
    resourceId: "v456",
    details: "Updated vehicle status to 'maintenance'",
    ipAddress: "192.168.1.2",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  {
    id: "log4",
    timestamp: "2023-05-14T12:00:00Z",
    user: {
      id: "u3",
      name: "Michael Chen",
      email: "m.chen@globalshipping.com",
      avatar: "microphone-concert-stage.png",
    },
    action: "delete",
    resource: "shipment",
    resourceId: "s789",
    details: "Deleted shipment #SHP-789",
    ipAddress: "192.168.1.3",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  },
  {
    id: "log5",
    timestamp: "2023-05-14T13:30:00Z",
    user: {
      id: "admin1",
      name: "Admin User",
      email: "admin@logisticsplatform.com",
      avatar: "/australian-outback-landscape.png",
    },
    action: "impersonate",
    resource: "user",
    resourceId: "u2",
    details: "Started impersonating user Sarah Johnson",
    ipAddress: "192.168.1.4",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  {
    id: "log6",
    timestamp: "2023-05-14T14:45:00Z",
    user: {
      id: "admin1",
      name: "Admin User",
      email: "admin@logisticsplatform.com",
      avatar: "/australian-outback-landscape.png",
    },
    action: "update",
    resource: "company",
    resourceId: "c2",
    details: "Updated company subscription plan to 'Enterprise'",
    ipAddress: "192.168.1.4",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  {
    id: "log7",
    timestamp: "2023-05-14T15:20:00Z",
    user: {
      id: "u4",
      name: "Emily Rodriguez",
      email: "e.rodriguez@fasttransport.com",
      avatar: "/emergency-room-scene.png",
    },
    action: "login",
    resource: "system",
    resourceId: null,
    details: "Failed login attempt (incorrect password)",
    ipAddress: "192.168.1.5",
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  },
  {
    id: "log8",
    timestamp: "2023-05-14T16:10:00Z",
    user: {
      id: "u4",
      name: "Emily Rodriguez",
      email: "e.rodriguez@fasttransport.com",
      avatar: "/emergency-room-scene.png",
    },
    action: "login",
    resource: "system",
    resourceId: null,
    details: "User logged in successfully",
    ipAddress: "192.168.1.5",
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  },
];

export function AuditLogsList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedLog, setSelectedLog] = useState<(typeof auditLogs)[0] | null>(
    null
  );
  const [detailsOpen, setDetailsOpen] = useState(false);

  const columns: ColumnDef<(typeof auditLogs)[0]>[] = [
    {
      accessorKey: "timestamp",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Timestamp
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.original.timestamp);
        return (
          <span>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      accessorKey: "user.name",
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
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={row.original.user.avatar || "/placeholder.svg"}
              alt={row.original.user.name}
            />
            <AvatarFallback>{row.original.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{row.original.user.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Action
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const action = row.original.action;
        return (
          <Badge
            variant={
              action === "create"
                ? "default"
                : action === "update"
                  ? "default"
                  : action === "delete"
                    ? "destructive"
                    : action === "impersonate"
                      ? "secondary"
                      : "outline"
            }
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "resource",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Resource
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span className="capitalize">{row.original.resource}</span>;
      },
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ row }) => {
        return (
          <span className="line-clamp-1 max-w-md">{row.original.details}</span>
        );
      },
    },
    {
      accessorKey: "ipAddress",
      header: "IP Address",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedLog(row.original);
              setDetailsOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: auditLogs,
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
    <>
      <div className="rounded-md border border-white/10">
        <Table>
          <TableHeader className="border border-white/10">
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
                  className="border border-white/10"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  No audit logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 p-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {table.getRowModel().rows.length} of {auditLogs.length} logs
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

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected audit log entry.
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Timestamp
                  </h3>
                  <p>{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Action
                  </h3>
                  <Badge
                    variant={
                      selectedLog.action === "create"
                        ? "default"
                        : selectedLog.action === "update"
                          ? "default"
                          : selectedLog.action === "delete"
                            ? "destructive"
                            : selectedLog.action === "impersonate"
                              ? "secondary"
                              : "outline"
                    }
                  >
                    {selectedLog.action.charAt(0).toUpperCase() +
                      selectedLog.action.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    User
                  </h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={selectedLog.user.avatar || "/placeholder.svg"}
                        alt={selectedLog.user.name}
                      />
                      <AvatarFallback>
                        {selectedLog.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{selectedLog.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedLog.user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Resource
                  </h3>
                  <p className="capitalize">
                    {selectedLog.resource}{" "}
                    {selectedLog.resourceId
                      ? `(${selectedLog.resourceId})`
                      : ""}
                  </p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground b">
                    Details
                  </h3>
                  <p>{selectedLog.details}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    IP Address
                  </h3>
                  <p>{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    User Agent
                  </h3>
                  <p className="truncate">{selectedLog.userAgent}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
