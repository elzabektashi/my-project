import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Filter } from "lucide-react";
import Link from "next/link";

export function RecentOrders() {
  const orders = [
    {
      id: "ORD-1001",
      date: "2025-04-05",
      status: "Delivered",
      vehicle: "VEH-001",
      driver: "Alex Johnson",
      origin: "New York, NY",
      destination: "Boston, MA",
    },
    {
      id: "ORD-1002",
      date: "2025-04-06",
      status: "In Transit",
      vehicle: "VEH-002",
      driver: "Sarah Williams",
      origin: "Los Angeles, CA",
      destination: "San Francisco, CA",
    },
    {
      id: "ORD-1003",
      date: "2025-04-06",
      status: "Processing",
      vehicle: "Unassigned",
      driver: "Unassigned",
      origin: "Chicago, IL",
      destination: "Detroit, MI",
    },
    {
      id: "ORD-1004",
      date: "2025-04-07",
      status: "In Transit",
      vehicle: "VEH-004",
      driver: "Michael Brown",
      origin: "Miami, FL",
      destination: "Orlando, FL",
    },
    
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-500 border-green-500/20";
      case "In Transit":
        return "bg-blue-500/20 text-blue-500 border-blue-500/20";
      case "Processing":
        return "bg-amber-500/20 text-amber-500 border-amber-500/20";
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <Card className="border-[#1b2638] bg-[#0d1526]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your most recent shipments</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1b2638]">
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                  Vehicle
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                  Driver
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-[#1b2638]">
                  <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-zinc-400">
                    {order.date}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={getStatusColor(order.status)}
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">
                    {order.vehicle}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">
                    {order.driver}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {order.status !== "Delivered" && (
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/orders/${order.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">
                              Edit order {order.id}
                            </span>
                          </Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View order {order.id}</span>
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/orders">View all orders</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
