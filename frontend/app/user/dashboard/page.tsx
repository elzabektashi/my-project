import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { RecentOrders } from "@/components/user-dashboard/recent-orders";
import { AvailableVehicles } from "@/components/user-dashboard/available-vehicles";

export const metadata: Metadata = {
  title: "Dashboard | LogiFlow",
  description: "Logistics management dashboard",
};

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Orders",
      value: "42",
      icon: <Package className="h-5 w-5 text-primary" />,
      description: "All time orders",
    },
    {
      title: "In Transit",
      value: "7",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      description: "Currently in transit",
    },
    {
      title: "Delivered",
      value: "35",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      description: "Successfully delivered",
    },
  ];

  const alerts = [
    {
      title: "Delivery Delay",
      description: "Order #ORD-1002 is running 2 hours behind schedule",
      type: "warning",
    },
    {
      title: "Vehicle Maintenance",
      description: "Vehicle #VEH-003 is due for maintenance in 2 days",
      type: "info",
    },
  ];

  return (
    <div className="space-y-6 p-6 text-white" style={{ backgroundColor: "#0a0e1a" }}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dispatcher Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/orders/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Order
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-[#0d1526] border-[#1b2638]">
            <CardContent className="p-6 min-h-[120px]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-[#8e9cb1]">
                    {stat.title}
                  </span>
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-[#8e9cb1]">{stat.description}</span>
                </div>
                <div className="rounded-full bg-[#1b2638] p-3">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-[#1b2638] bg-[#0d1526]">
        <CardHeader>
          <CardTitle className="text-white">Alerts</CardTitle>
          <CardDescription className="text-[#8e9cb1]">
            Important notifications requiring your attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 rounded-lg border p-4 ${
                  alert.type === "warning"
                    ? "border-amber-500/20 bg-amber-500/10"
                    : "border-blue-500/20 bg-blue-500/10"
                }`}
              >
                <div
                  className={`rounded-full p-2 ${
                    alert.type === "warning"
                      ? "bg-amber-500/20 text-amber-500"
                      : "bg-blue-500/20 text-blue-500"
                  }`}
                >
                  {alert.type === "warning" ? (
                    <AlertTriangle className="h-5 w-5" />
                  ) : (
                    <Truck className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{alert.title}</h4>
                  <p className="text-sm text-[#8e9cb1]">{alert.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-white border border-white/20 hover:bg-white/10">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <AvailableVehicles />
        </div>
      </div>
    </div>
  );
}
