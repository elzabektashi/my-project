import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Search } from "lucide-react";
import Link from "next/link";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-1234",
      customer: "ABC Corp",
      origin: "Los Angeles, CA",
      destination: "New York, NY",
      status: "In Transit",
      driver: "John Doe",
      vehicle: "ABC-1234",
      deliveryDate: "2023-11-15",
    },
    {
      id: "ORD-1233",
      customer: "XYZ Inc",
      origin: "Chicago, IL",
      destination: "Boston, MA",
      status: "Pending",
      driver: "Unassigned",
      vehicle: "Unassigned",
      deliveryDate: "2023-11-16",
    },
    {
      id: "ORD-1232",
      customer: "123 Industries",
      origin: "Dallas, TX",
      destination: "Chicago, IL",
      status: "Delivered",
      driver: "Jane Smith",
      vehicle: "XYZ-5678",
      deliveryDate: "2023-11-14",
    },
    {
      id: "ORD-1231",
      customer: "Global Enterprises",
      origin: "Atlanta, GA",
      destination: "Miami, FL",
      status: "In Transit",
      driver: "Mike Johnson",
      vehicle: "DEF-9012",
      deliveryDate: "2023-11-15",
    },
    {
      id: "ORD-1230",
      customer: "Tech Solutions",
      origin: "Seattle, WA",
      destination: "San Francisco, CA",
      status: "Delivered",
      driver: "Sarah Williams",
      vehicle: "GHI-3456",
      deliveryDate: "2023-11-13",
    },
    {
      id: "ORD-1229",
      customer: "Acme Corporation",
      origin: "Phoenix, AZ",
      destination: "Denver, CO",
      status: "Pending",
      driver: "Unassigned",
      vehicle: "Unassigned",
      deliveryDate: "2023-11-17",
    },
    {
      id: "ORD-1228",
      customer: "Globex Inc",
      origin: "Houston, TX",
      destination: "New Orleans, LA",
      status: "Delivered",
      driver: "Robert Brown",
      vehicle: "JKL-7890",
      deliveryDate: "2023-11-12",
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
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <Button asChild variant="primaryAction">
          <Link href="/user/dashboard/orders/new">
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Link>
        </Button>
      </div>

      <Card className="border-white/10 rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Order Management
          </CardTitle>
          <CardDescription>
            View, filter, and manage all your orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="w-full pl-8 border-white/10"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px] border border-white/10 bg-[#0f172a] text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f172a] text-white border border-white/10">
                  <SelectItem
                    value="all"
                    className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                  >
                    All Statuses
                  </SelectItem>
                  <SelectItem
                    value="pending"
                    className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                  >
                    Pending
                  </SelectItem>
                  <SelectItem
                    value="in-transit"
                    className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                  >
                    In Transit
                  </SelectItem>
                  <SelectItem
                    value="delivered"
                    className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                  >
                    Delivered
                  </SelectItem>
                </SelectContent>
              </Select>

              <DateRangePicker />
            </div>
          </div>

          <div className="mt-6 overflow-auto rounded-md border border-white/10">
            <div className="min-w-[1200px]">
              <Table className="w-full text-sm">
                <TableHeader>
                  <TableRow className="border-b border-white/10">
                    <TableHead className="px-3 py-3">Order ID</TableHead>
                    <TableHead className="px-3 py-3">Customer</TableHead>
                    <TableHead className="px-3 py-3 hidden md:table-cell">
                      Origin
                    </TableHead>
                    <TableHead className="px-3 py-3 hidden md:table-cell">
                      Destination
                    </TableHead>
                    <TableHead className="px-3 py-3">Status</TableHead>
                    <TableHead className="px-3 py-3 hidden lg:table-cell">
                      Driver
                    </TableHead>
                    <TableHead className="px-3 py-3 hidden lg:table-cell">
                      Vehicle
                    </TableHead>
                    <TableHead className="px-3 py-3 hidden md:table-cell">
                      Delivery Date
                    </TableHead>
                    <TableHead className="px-3 py-3 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <TableCell className="py-4 px-3 font-medium">
                        {order.id}
                      </TableCell>
                      <TableCell className="py-4 px-3">
                        {order.customer}
                      </TableCell>
                      <TableCell className="py-4 px-3 hidden md:table-cell">
                        {order.origin}
                      </TableCell>
                      <TableCell className="py-4 px-3 hidden md:table-cell">
                        {order.destination}
                      </TableCell>
                      <TableCell className="py-4 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-3 hidden lg:table-cell">
                        {order.driver}
                      </TableCell>
                      <TableCell className="py-4 px-3 hidden lg:table-cell">
                        {order.vehicle}
                      </TableCell>
                      <TableCell className="py-4 px-3 hidden md:table-cell">
                        {order.deliveryDate}
                      </TableCell>
                      <TableCell className="py-4 px-3 text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/user/dashboard/orders/${order.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">
                              View order {order.id}
                            </span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
