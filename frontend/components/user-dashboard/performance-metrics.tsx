import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart } from "@/components/ui/charts";

export function PerformanceMetrics() {
  // Mock data for delivery performance
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
        label: "On-Time Delivery Rate",
        data: [92, 90, 94, 89, 96, 95, 93, 97, 94, 95, 98, 96],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
    ],
  };

  // Mock data for resource utilization
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

  return (
    <Card className="bg-[#0d1526] border border-white/10 rounded-lg">
      <CardHeader className="px-6 pt-6 pb-3">
        <CardTitle className="text-xl font-semibold">
          Performance Metrics
        </CardTitle>
        <CardDescription className="text-sm">
          Key performance indicators for your logistics operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="delivery" className="space-y-4">
          <TabsList className="bg-[#1d283a] grid w-full grid-cols-2">
            <TabsTrigger value="delivery">Delivery Performance</TabsTrigger>
            <TabsTrigger value="utilization">Resource Utilization</TabsTrigger>
          </TabsList>
          <TabsContent value="delivery">
            <div className="h-[300px]">
              <LineChart data={deliveryPerformanceData} />
            </div>
          </TabsContent>
          <TabsContent value="utilization">
            <div className="h-[300px]">
              <BarChart data={resourceUtilizationData} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
