"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Users,
  TruckIcon,
  DollarSign,
} from "lucide-react";

// Mock report templates
const reportTemplates = [
  {
    id: "order-volume",
    title: "Order Volume",
    description:
      "Track order volume across all companies or filter by specific company",
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    type: "bar",
  },
  {
    id: "revenue-analysis",
    title: "Revenue Analysis",
    description: "Analyze revenue trends and patterns over time",
    icon: <LineChart className="h-10 w-10 text-primary" />,
    type: "line",
  },
  {
    id: "user-activity",
    title: "User Activity",
    description: "Monitor user logins, actions, and engagement metrics",
    icon: <Users className="h-10 w-10 text-primary" />,
    type: "line",
  },
  {
    id: "fleet-utilization",
    title: "Fleet Utilization",
    description: "Track vehicle usage, idle time, and maintenance metrics",
    icon: <TruckIcon className="h-10 w-10 text-primary" />,
    type: "bar",
  },
  {
    id: "subscription-distribution",
    title: "Subscription Distribution",
    description: "View distribution of companies across subscription plans",
    icon: <PieChart className="h-10 w-10 text-primary" />,
    type: "pie",
  },
  {
    id: "financial-summary",
    title: "Financial Summary",
    description:
      "Comprehensive financial overview with revenue, costs, and margins",
    icon: <DollarSign className="h-10 w-10 text-primary" />,
    type: "mixed",
  },
];

export function ReportTemplates() {
  const { toast } = useToast();

  const handleGenerateReport = (reportId: string) => {
    // In a real app, you would call an API to generate the report
    toast({
      title: "Report Generated",
      description: "Your report has been generated and is ready to download.",
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reportTemplates.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{template.title}</CardTitle>
              {template.icon}
            </div>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
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
                <label className="text-sm font-medium">Time Period</label>
                <Select defaultValue="30d">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => handleGenerateReport(template.id)}
            >
              Generate
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
