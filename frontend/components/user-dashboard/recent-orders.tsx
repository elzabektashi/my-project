import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function RecentOrders() {
  // Mock data for orders
  const orders = [
    {
      id: "ORD-1234",
      customer: "ABC Corp",
      destination: "New York, NY",
      status: "In Transit",
      driver: "John Doe",
      vehicle: "ABC-1234",
      deliveryDate: "2023-11-15",
    },
    {
      id: "ORD-1233",
      customer: "XYZ Inc",
      destination: "Boston, MA",
      status: "Pending",
      driver: "Unassigned",
      vehicle: "Unassigned",
      deliveryDate: "2023-11-16",
    },
    {
      id: "ORD-1232",
      customer: "123 Industries",
      destination: "Chicago, IL",
      status: "Delivered",
      driver: "Jane Smith",
      vehicle: "XYZ-5678",
      deliveryDate: "2023-11-14",
    },
    {
      id: "ORD-1231",
      customer: "Global Enterprises",
      destination: "Miami, FL",
      status: "In Transit",
      driver: "Mike Johnson",
      vehicle: "DEF-9012",
      deliveryDate: "2023-11-15",
    },
    {
      id: "ORD-1230",
      customer: "Tech Solutions",
      destination: "San Francisco, CA",
      status: "Delivered",
      driver: "Sarah Williams",
      vehicle: "GHI-3456",
      deliveryDate: "2023-11-13",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-zinc-700 text-white";
    }
  };

  return (
    <Card className="border-white/10 rounded-lg">
      <CardHeader className="px-6 pt-6 pb-3">
        <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
        <CardDescription className="text-sm">
          Overview of your latest orders and their status
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-base font-semibold py-3 text-[#94a3b8]">
                  Order ID
                </th>
                <th className="text-left text-base font-semibold py-3 text-[#94a3b8]">
                  Customer
                </th>
                <th className="text-left text-base font-semibold py-3 text-[#94a3b8]">
                  Destination
                </th>
                <th className="text-left text-base font-semibold py-3 text-[#94a3b8]">
                  Status
                </th>
                <th className="text-left text-base font-semibold py-3 text-[#94a3b8]">
                  Driver
                </th>
                <th className="text-left text-base font-semibold py-3 text-[#94a3b8]">
                  Vehicle
                </th>
                <th className="text-left text-base font-semibold py-3 text-[#94a3b8]">
                  Delivery Date
                </th>
                <th className="text-right text-base font-semibold py-3 text-[#94a3b8]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/10">
                  <td className="text-base font-medium text-white py-4">
                    {order.id}
                  </td>
                  <td className="text-base py-4">
                    {order.customer}
                  </td>
                  <td className="text-base py-4">
                    {order.destination}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="text-base py-4">
                    {order.driver}
                  </td>
                  <td className="text-base py-4">
                    {order.vehicle}
                  </td>
                  <td className="text-base py-4">
                    {order.deliveryDate}
                  </td>
                  <td className="text-right py-4">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <Eye className="h-5 w-5" />
                        <span className="sr-only">View order {order.id}</span>
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            className="rounded border-white/10"
            asChild
          >
            <Link
              href="/user/dashboard/orders"
              className="flex items-center gap-2 px-5 py-2 text-base font-medium text-white hover:bg-[#1e293b] hover:border-transparent"
            >
              View all orders
              <ArrowUpRight className="h-5 w-5 text-zinc-300" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
