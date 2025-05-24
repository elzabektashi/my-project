import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Truck,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { OrdersOverview } from "@/components/user-dashboard/orders-overview";
import { FleetStatus } from "@/components/user-dashboard/fleet-status";
import { RecentOrders } from "@/components/user-dashboard/recent-orders";
import { PerformanceMetrics } from "@/components/user-dashboard/performance-metrics";

export default function DashboardPage() {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Orders",
      value: "124",
      icon: <Package className="h-5 w-5 text-primary" />,
      description: "This month",
      change: "+12%",
      href: "/user/dashboard/orders",
    },
    {
      title: "Active Vehicles",
      value: "18",
      icon: <Truck className="h-5 w-5 text-primary" />,
      description: "Out of 24 total",
      change: "+2",
      href: "/user/dashboard/fleet",
    },
    {
      title: "Available Drivers",
      value: "12",
      icon: <Users className="h-5 w-5 text-primary" />,
      description: "Out of 20 total",
      change: "-3",
      href: "/user/dashboard/drivers",
    },
    {
      title: "Completed Orders",
      value: "98",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      description: "This month",
      change: "+15%",
      href: "/user/dashboard/orders?status=completed",
    },
  ];

  // Mock data for alerts
  const alerts = [
    {
      title: "Delivery Delay",
      description: "Order #ORD-1234 is running 2 hours behind schedule",
      type: "warning",
      actionLink: "/user/dashboard/orders/ORD-1234",
    },
    {
      title: "Vehicle Maintenance",
      description: "Vehicle XYZ-123 is due for maintenance tomorrow",
      type: "info",
      actionLink: "/user/dashboard/fleet/vehicles/XYZ-123",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild variant="primaryAction">
          <Link href="/user/dashboard/orders/new">Create New Order</Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </span>
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="text-xs text-green-500">
                    {stat.change} from last month
                  </span>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href={stat.href}
                  className="flex items-center text-sm text-primary hover:underline"
                >
                  View details
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card className="border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Alerts</CardTitle>
          <CardDescription>
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
                    <Clock className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded border-white/10"
                  asChild
                >
                  <Link
                    href={alert.actionLink}
                    className="hover:bg-[#1e293b] hover:border-transparent"
                  >
                    View
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="inline-flex bg-[#1d283a] rounded p-1 space-x-2">
          <TabsTrigger
            value="overview"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded
                 data-[state=active]:bg-[#111827]
                 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded
                 data-[state=active]:bg-[#111827]
                 data-[state=active]:text-white"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="fleet"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded
                 data-[state=active]:bg-[#111827]
                 data-[state=active]:text-white"
          >
            Fleet
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded
                 data-[state=active]:bg-[#111827]
                 data-[state=active]:text-white"
          >
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2">
              <OrdersOverview />
            </div>
            <div>
              <FleetStatus />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <RecentOrders />
        </TabsContent>

        <TabsContent value="fleet" className="space-y-4">
          <FleetStatus showAll />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
