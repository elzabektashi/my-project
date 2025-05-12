import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Download, BarChart3, FileText } from "lucide-react";
import {
  LineChart as LineChartComponent,
  BarChart as BarChartComponent,
} from "@/components/ui/charts";

export default function ReportsPage() {
  // Mock data for charts
  const orderVolumeData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Orders",
        data: [65, 78, 90, 81, 86, 95, 91, 85, 90, 95, 100, 110],
        borderColor: "rgb(59, 130, 246)",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const deliveryPerformanceData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "On-Time Delivery Rate (%)",
        data: [92, 90, 94, 89, 96, 95, 93, 97, 94, 95, 98, 96],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const resourceUtilizationData = {
    labels: ["Trucks", "Vans", "Drivers", "Warehouse Space"],
    datasets: [
      {
        label: "Utilization Rate (%)",
        data: [85, 72, 90, 65],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(99, 102, 241, 0.7)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(99, 102, 241)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Mock data for available reports
  const availableReports = [
    {
      id: 1,
      name: "Monthly Order Summary",
      description: "Summary of all orders processed in the selected month",
      lastGenerated: "2023-11-01",
      format: "PDF",
    },
    {
      id: 2,
      name: "Driver Performance Report",
      description: "Performance metrics for all drivers in the selected period",
      lastGenerated: "2023-11-05",
      format: "Excel",
    },
    {
      id: 3,
      name: "Vehicle Utilization Report",
      description: "Utilization rates and metrics for all vehicles",
      lastGenerated: "2023-11-10",
      format: "PDF",
    },
    {
      id: 4,
      name: "Delivery Time Analysis",
      description: "Analysis of delivery times and on-time performance",
      lastGenerated: "2023-11-12",
      format: "Excel",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Reports & Analytics
        </h1>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <DateRangePicker className="md:w-auto" />
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Volume</CardTitle>
                <CardDescription>
                  Monthly order volume over the past year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <LineChartComponent data={orderVolumeData} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
                <CardDescription>
                  On-time delivery rate over the past year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <LineChartComponent data={deliveryPerformanceData} />
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>
                Current utilization rates for company resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChartComponent data={resourceUtilizationData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>
                View and download reports for your company
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between rounded-md border p-4 border-white/10"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {report.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last generated: {report.lastGenerated} • Format:{" "}
                        {report.format}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
