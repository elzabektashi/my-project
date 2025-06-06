"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function EditOrderPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { toast } = useToast();

  const orderData = {
    id,
    origin: "warehouse-a",
    originName: "Warehouse A – New York",
    destination: "customer-2",
    destinationName: "Customer Site 2 – San Francisco",
    weight: "1200",
    deliveryDate: new Date("2025-04-08"),
    placeholder: "Handle with care. Fragile electronics inside.",
    vehicle: "veh-002",
    vehicleName: "VEH-002 (Van – Ford Transit)",
    driver: "drv-002",
    driverName: "Sarah Williams",
    notes: "Handle with extra caution",
  };

  const [date, setDate] = useState<Date | undefined>(orderData.deliveryDate);
  const [origin, setOrigin] = useState(orderData.origin);
  const [destination, setDestination] = useState(orderData.destination);
  const [weight, setWeight] = useState(orderData.weight);
  const [notes, setNotes] = useState(orderData.notes);
  const [selectedVehicle, setSelectedVehicle] = useState(orderData.vehicle);
  const [selectedDriver, setSelectedDriver] = useState(orderData.driver);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order updated",
      description: `Order ${id} has been updated successfully.`,
    });
    router.push(`/user/dashboard/orders/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/user/dashboard/orders/${id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to order</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Edit Order {id}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Order Details */}
          <Card className="border-white/10 bg-[#0d1526]">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>
                Update the information for this order
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Select value={origin} onValueChange={setOrigin} required>
                    <SelectTrigger
                      id="origin"
                      className="bg-[#0d1526] border-white/10"
                    >
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1526] border-white/10">
                      <SelectItem
                        value="warehouse-a"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Warehouse A – New York
                      </SelectItem>
                      <SelectItem
                        value="warehouse-b"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Warehouse B – Los Angeles
                      </SelectItem>
                      <SelectItem
                        value="warehouse-c"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Warehouse C – Chicago
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select
                    value={destination}
                    onValueChange={setDestination}
                    required
                  >
                    <SelectTrigger
                      id="destination"
                      className="bg-[#0d1526] border-white/10"
                    >
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1526] border-white/10">
                      <SelectItem
                        value="customer-1"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Customer Site 1 – Boston
                      </SelectItem>
                      <SelectItem
                        value="customer-2"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Customer Site 2 – San Francisco
                      </SelectItem>
                      <SelectItem
                        value="customer-3"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Customer Site 3 – Detroit
                      </SelectItem>
                      <SelectItem
                        value="customer-4"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Customer Site 4 – Miami
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min={0}
                    step={0.1}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    className="bg-[#0d1526] border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-date">Delivery Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-[#0d1526] border-white/10",
                          !date && "text-zinc-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#0d1526] border-white/10">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Instructions</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any special instructions for this order"
                  className="min-h-[100px] bg-[#0d1526] border-white/10"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Resource Assignment */}
          <Card className="border-white/10 bg-[#0d1526]">
            <CardHeader>
              <CardTitle>Resource Assignment</CardTitle>
              <CardDescription>
                Update the vehicle and driver assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Select
                    value={selectedVehicle}
                    onValueChange={setSelectedVehicle}
                  >
                    <SelectTrigger
                      id="vehicle"
                      className="bg-[#0d1526] border-white/10"
                    >
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1526] border-white/10">
                      <SelectItem
                        value="veh-001"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        VEH-001 (Truck – 20 tons)
                      </SelectItem>
                      <SelectItem
                        value="veh-002"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        VEH-002 (Van – 3 tons)
                      </SelectItem>
                      <SelectItem
                        value="veh-003"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        VEH-003 (Truck – 15 tons)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Driver</Label>
                  <Select
                    value={selectedDriver}
                    onValueChange={setSelectedDriver}
                  >
                    <SelectTrigger
                      id="driver"
                      className="bg-[#0d1526] border-white/10"
                    >
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1526] border-white/10">
                      <SelectItem
                        value="drv-001"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Alex Johnson
                      </SelectItem>
                      <SelectItem
                        value="drv-002"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Sarah Williams
                      </SelectItem>
                      <SelectItem
                        value="drv-005"
                        className="hover:bg-[#1e293b] focus:bg-[#1e293b]"
                      >
                        Emily Davis
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 border-t border-white/10 pt-6">
              <Button
                variant="outline"
                type="button"
                className="border border-white/10 hover:bg-[#1e293b] hover:border-transparent"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-blue-700 px-4 py-4 rounded-md"
              >
                Update Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
