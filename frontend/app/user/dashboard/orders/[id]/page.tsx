"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Correct import for useParams
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Edit,
  Truck,
  User,
  MapPin,
  Calendar,
  Trash2,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams(); // Use useParams hook
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Mock data for order details, using params.id
  const order = {
    id: params?.id as string, // Safely access id, type assertion as string
    customer: "ABC Corp",
    customerContact: "John Smith",
    customerEmail: "john@abccorp.com",
    customerPhone: "+1 (555) 123-4567",
    origin: "123 Shipping Lane, Los Angeles, CA 90001",
    destination: "456 Delivery Ave, New York, NY 10001",
    status: "In Transit",
    priority: "Standard",
    createdAt: "2023-11-10",
    pickupDate: "2023-11-12",
    deliveryDate: "2023-11-15",
    driver: "John Doe",
    driverPhone: "+1 (555) 987-6543",
    vehicle: "ABC-1234",
    vehicleType: "Truck",
    items: [
      { name: "Electronics", quantity: 5, weight: "50kg" },
      { name: "Office Supplies", quantity: 10, weight: "30kg" },
      { name: "Furniture", quantity: 2, weight: "100kg" },
    ],
    notes: [
      {
        id: 1,
        author: "Jane Smith",
        content: "Customer requested delivery before noon.",
        timestamp: "2023-11-10T14:30:00Z",
      },
      {
        id: 2,
        author: "John Doe",
        content: "Traffic delay expected on I-95. Adjusting route.",
        timestamp: "2023-11-13T09:15:00Z",
      },
    ],
    documents: [
      {
        id: 1,
        name: "Bill of Lading.pdf",
        type: "Bill of Lading",
        uploadedBy: "Jane Smith",
        uploadedAt: "2023-11-10T15:45:00Z",
      },
      {
        id: 2,
        name: "Pickup Confirmation.pdf",
        type: "Confirmation",
        uploadedBy: "John Doe",
        uploadedAt: "2023-11-12T10:30:00Z",
      },
    ],
  };

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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/user/dashboard/orders");
    } catch (err) {
      console.error("Failed to delete order:", err);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="border border-white/10"
            size="icon"
            asChild
          >
            <Link href="/user/dashboard/orders">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to orders</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Order {order.id}
            </h1>
            <p className="text-muted-foreground">
              Created on {order.createdAt}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={getStatusColor(order.status)}>
            {order.status}
          </Badge>
          <Button
            variant="outline"
            className="border border-white/10 hover:bg-[#1e293b] hover:border-transparent"
            asChild
          >
            <Link href={`/user/dashboard/orders/${order.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Order
            </Link>
          </Button>
          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="bg-red-800 text-white hover:bg-red-700 rounded-md px-4 py-2"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  order <strong>{order.id}</strong> and remove all associated
                  data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border border-white/10 hover:bg-[#1e293b] hover:border-transparent">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  disabled={isDeleting}
                  className="bg-red-800 text-white hover:bg-red-700 rounded-md px-4 py-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>Delete Order</>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>
              Details about the customer for this order
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Company</h3>
              <p>{order.customer}</p>
            </div>
            <div>
              <h3 className="font-medium">Contact Person</h3>
              <p>{order.customerContact}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium">Email</h3>
                <p>{order.customerEmail}</p>
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p>{order.customerPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>
              Origin, destination, and delivery details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Origin</h3>
              </div>
              <p className="mt-1">{order.origin}</p>
            </div>
            <div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Destination</h3>
              </div>
              <p className="mt-1">{order.destination}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Pickup Date</h3>
                </div>
                <p className="mt-1">{order.pickupDate}</p>
              </div>
              <div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Delivery Date</h3>
                </div>
                <p className="mt-1">{order.deliveryDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle>Assignment</CardTitle>
            <CardDescription>
              Driver and vehicle assigned to this order
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Driver</h3>
              </div>
              <p className="mt-1">{order.driver}</p>
              <p className="text-sm text-muted-foreground">
                {order.driverPhone}
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Vehicle</h3>
              </div>
              <p className="mt-1">
                {order.vehicle} ({order.vehicleType})
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>Items included in this order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-white/10 p-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm">{item.weight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
