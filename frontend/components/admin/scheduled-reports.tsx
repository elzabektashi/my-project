"use client";

import type React from "react";

import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock scheduled reports data
const scheduledReports = [
  {
    id: "sr1",
    name: "Weekly Order Summary",
    description: "Summary of orders across all companies",
    frequency: "Weekly",
    nextRun: "2023-05-21T08:00:00Z",
    recipients: ["admin@example.com", "reports@example.com"],
    status: "active",
  },
  {
    id: "sr2",
    name: "Monthly Revenue Report",
    description: "Detailed revenue breakdown by company",
    frequency: "Monthly",
    nextRun: "2023-06-01T08:00:00Z",
    recipients: ["finance@example.com"],
    status: "active",
  },
  {
    id: "sr3",
    name: "Daily User Activity",
    description: "User login and activity metrics",
    frequency: "Daily",
    nextRun: "2023-05-15T08:00:00Z",
    recipients: ["security@example.com"],
    status: "paused",
  },
  {
    id: "sr4",
    name: "Quarterly Performance Review",
    description: "Comprehensive platform performance metrics",
    frequency: "Quarterly",
    nextRun: "2023-07-01T08:00:00Z",
    recipients: ["executives@example.com", "board@example.com"],
    status: "active",
  },
];

export function ScheduledReports() {
  const { toast } = useToast();
  const [reports, setReports] = useState(scheduledReports);

  const handleStatusChange = (reportId: string, newStatus: string) => {
    setReports((current) =>
      current.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );

    toast({
      title: "Report Status Updated",
      description: `The report status has been updated to ${newStatus}.`,
    });
  };

  const handleDeleteReport = (reportId: string) => {
    setReports((current) => current.filter((report) => report.id !== reportId));

    toast({
      title: "Report Deleted",
      description: "The scheduled report has been deleted.",
    });
  };

  const handleRunNow = (reportId: string) => {
    // In a real app, you would call an API to run the report immediately
    toast({
      title: "Report Running",
      description:
        "The report is being generated and will be sent to recipients shortly.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Scheduled Reports</h2>
        <NewScheduledReportDialog />
      </div>

      <div className="rounded-md border border-white/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{report.frequency}</TableCell>
                <TableCell>
                  {new Date(report.nextRun).toLocaleDateString()}{" "}
                  {new Date(report.nextRun).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {report.recipients.map((email, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {email}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.status === "active" ? "default" : "secondary"
                    }
                  >
                    {report.status === "active" ? "Active" : "Paused"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="border border-white/10 bg-[#0d1526]"
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleRunNow(report.id)}
                        className="hover:bg-[#1e293b]"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Run Now
                      </DropdownMenuItem>
                      <EditScheduledReportDialog report={report}>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="hover:bg-[#1e293b]"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </EditScheduledReportDialog>
                      <DropdownMenuSeparator />
                      {report.status === "active" ? (
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(report.id, "paused")
                          }
                          className="hover:bg-[#1e293b]"
                        >
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(report.id, "active")
                          }
                          className="hover:bg-[#1e293b]"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Activate
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-destructive hover:bg-[#1e293b]"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function NewScheduledReportDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API to create the scheduled report
    toast({
      title: "Scheduled Report Created",
      description: "Your report has been scheduled successfully.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule New Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule New Report</DialogTitle>
          <DialogDescription>
            Set up a report to be automatically generated and sent on a
            schedule.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Report Name
              </Label>
              <Input
                id="name"
                className="col-span-3 border border-white/10"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3 border border-white/10"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="report-type" className="text-right">
                Report Type
              </Label>
              <Select required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order-volume">Order Volume</SelectItem>
                  <SelectItem value="revenue-analysis">
                    Revenue Analysis
                  </SelectItem>
                  <SelectItem value="user-activity">User Activity</SelectItem>
                  <SelectItem value="fleet-utilization">
                    Fleet Utilization
                  </SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <Select required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipients" className="text-right">
                Recipients
              </Label>
              <Input
                id="recipients"
                placeholder="Enter email addresses (comma separated)"
                className="col-span-3 border border-white/10"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Schedule Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditScheduledReportDialog({
  report,
  children,
}: {
  report: (typeof scheduledReports)[0];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API to update the scheduled report
    toast({
      title: "Scheduled Report Updated",
      description: "Your report schedule has been updated successfully.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Scheduled Report</DialogTitle>
          <DialogDescription>
            Update the settings for your scheduled report.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Report Name
              </Label>
              <Input
                id="name"
                defaultValue={report.name}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                defaultValue={report.description}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <Select defaultValue={report.frequency.toLowerCase()}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipients" className="text-right">
                Recipients
              </Label>
              <Input
                id="recipients"
                defaultValue={report.recipients.join(", ")}
                placeholder="Enter email addresses (comma separated)"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
