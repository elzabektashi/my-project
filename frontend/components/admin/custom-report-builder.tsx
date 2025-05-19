"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Download, LineChart, BarChart3, PieChart } from "lucide-react";

// Mock metrics data
const availableMetrics = [
  { id: "orders", label: "Orders" },
  { id: "revenue", label: "Revenue" },
  { id: "users", label: "Active Users" },
  { id: "api_calls", label: "API Calls" },
  { id: "storage", label: "Storage Usage" },
  { id: "deliveries", label: "Deliveries" },
  { id: "vehicles", label: "Active Vehicles" },
  { id: "drivers", label: "Active Drivers" },
];

export function CustomReportBuilder() {
  const { toast } = useToast();
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const handleMetricChange = (metricId: string) => {
    setSelectedMetrics((current) =>
      current.includes(metricId)
        ? current.filter((id) => id !== metricId)
        : [...current, metricId]
    );
  };

  const handleGenerateReport = () => {
    if (selectedMetrics.length === 0) {
      toast({
        title: "No Metrics Selected",
        description:
          "Please select at least one metric to include in your report.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would call an API to generate the custom report
    toast({
      title: "Custom Report Generated",
      description:
        "Your custom report has been generated and is ready to download.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Report Builder</CardTitle>
        <CardDescription>
          Create a custom report by selecting the metrics, time period, and
          companies you want to include.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Report Name</Label>
            <Input placeholder="Enter report name" />
          </div>

          <div className="space-y-2">
            <Label>Select Companies</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                <SelectItem value="c1">Acme Logistics</SelectItem>
                <SelectItem value="c2">Fast Transport Inc.</SelectItem>
                <SelectItem value="c3">Global Shipping Co.</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Time Period</Label>
            <DateRangePicker />
          </div>

          <div className="space-y-2">
            <Label>Chart Type</Label>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                Line Chart
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Bar Chart
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Pie Chart
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Select Metrics</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {availableMetrics.map((metric) => (
                <div key={metric.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric.id}
                    checked={selectedMetrics.includes(metric.id)}
                    onCheckedChange={() => handleMetricChange(metric.id)}
                  />
                  <Label htmlFor={metric.id}>{metric.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Group By</Label>
            <Select defaultValue="day">
              <SelectTrigger>
                <SelectValue placeholder="Select grouping" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hour">Hour</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
