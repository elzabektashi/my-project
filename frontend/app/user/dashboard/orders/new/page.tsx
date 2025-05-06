"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function CreateOrderPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [date, setDate] = useState<Date | null>(null);
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: "", weight: "" },
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");

  const addItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([...items, { id: newId, name: "", quantity: "", weight: "" }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order created",
      description: "Your new order has been created successfully.",
    });
    router.push("/dashboard/orders");
  };

  return (
    <div className="space-y-6 bg-[#0d1526] min-h-screen p-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Create New Order</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Order Details */}
          <Card className="border border-white/10 bg-[#0d1526] text-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Order Details
              </CardTitle>
              <CardDescription>
                Enter the basic information for this order
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Select
                    value={selectedOrigin}
                    onValueChange={setSelectedOrigin}
                    required
                  >
                    <SelectTrigger
                      id="origin"
                      className="bg-[#0d1526] text-white border-white/10"
                    >
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1526] text-white border-white/10">
                      <SelectItem
                        value="warehouse-a"
                        className="hover:bg-[#1e293b]"
                      >
                        Warehouse A - New York
                      </SelectItem>
                      <SelectItem
                        value="warehouse-b"
                        className="hover:bg-[#1e293b]"
                      >
                        Warehouse B - Los Angeles
                      </SelectItem>
                      <SelectItem
                        value="warehouse-c"
                        className="hover:bg-[#1e293b]"
                      >
                        Warehouse C - Chicago
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select
                    value={selectedDestination}
                    onValueChange={setSelectedDestination}
                    required
                  >
                    <SelectTrigger
                      id="destination"
                      className="bg-[#0d1526] text-white border-white/10"
                    >
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1526] text-white border-white/10">
                      <SelectItem
                        value="customer-1"
                        className="hover:bg-[#1e293b]"
                      >
                        Customer Site 1 - Boston
                      </SelectItem>
                      <SelectItem
                        value="customer-2"
                        className="hover:bg-[#1e293b]"
                      >
                        Customer Site 2 - San Francisco
                      </SelectItem>
                      <SelectItem
                        value="customer-3"
                        className="hover:bg-[#1e293b]"
                      >
                        Customer Site 3 - Detroit
                      </SelectItem>
                      <SelectItem
                        value="customer-4"
                        className="hover:bg-[#1e293b]"
                      >
                        Customer Site 4 - Miami
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
                    min="0"
                    step="0.1"
                    required
                    className="bg-[#0d1526] text-white border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-date">Delivery Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-[#0d1526] text-white border-white/10",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#0d1526] text-white border-white/10">
                      <Calendar
                        mode="single"
                        selected={date ?? undefined}
                        onSelect={(selectedDate) =>
                          setDate(selectedDate ?? null)
                        }
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
                  className="min-h-[100px] bg-[#0d1526] text-white border-white/10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border border-white/10 bg-[#0d1526] text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">
                  Order Items
                </CardTitle>
                <CardDescription>
                  Add the items included in this order
                </CardDescription>
              </div>
              <Button
                type="button"
                onClick={addItem}
                size="sm"
                variant="outline"
                className="bg-[#0d1526] border-white/10 text-white hover:bg-[#1e293b] hover:border-transparent"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 gap-4 rounded-lg border border-white/10 p-4 md:grid-cols-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor={`item-name-${item.id}`}>Item Name</Label>
                      <Input
                        id={`item-name-${item.id}`}
                        value={item.name}
                        onChange={(e) =>
                          updateItem(item.id, "name", e.target.value)
                        }
                        className="bg-[#0d1526] text-white border-white/10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-quantity-${item.id}`}>
                        Quantity
                      </Label>
                      <Input
                        id={`item-quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, "quantity", e.target.value)
                        }
                        className="bg-[#0d1526] text-white border-white/10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-weight-${item.id}`}>
                        Weight (kg)
                      </Label>
                      <Input
                        id={`item-weight-${item.id}`}
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.weight}
                        onChange={(e) =>
                          updateItem(item.id, "weight", e.target.value)
                        }
                        className="bg-[#0d1526] text-white border-white/10"
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resource Assignment */}
          <Card className="border border-white/10 bg-[#0d1526] text-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Resource Assignment
              </CardTitle>
              <CardDescription>
                Assign a vehicle and driver to this order
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select
                  value={selectedVehicle}
                  onValueChange={setSelectedVehicle}
                  required
                >
                  <SelectTrigger
                    id="vehicle"
                    className="bg-[#0d1526] text-white border-white/10"
                  >
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1526] text-white border-white/10">
                    <SelectItem
                      value="vehicle-1"
                      className="hover:bg-[#1e293b]"
                    >
                      Truck 1 - Volvo
                    </SelectItem>
                    <SelectItem
                      value="vehicle-2"
                      className="hover:bg-[#1e293b]"
                    >
                      Truck 2 - Scania
                    </SelectItem>
                    <SelectItem
                      value="vehicle-3"
                      className="hover:bg-[#1e293b]"
                    >
                      Van 1 - Mercedes
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="driver">Driver</Label>
                <Select
                  value={selectedDriver}
                  onValueChange={setSelectedDriver}
                  required
                >
                  <SelectTrigger
                    id="driver"
                    className="bg-[#0d1526] text-white border-white/10"
                  >
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1526] text-white border-white/10">
                    <SelectItem
                      value="driver-1 "
                      className="hover:bg-[#1e293b]"
                    >
                      John Doe
                    </SelectItem>
                    <SelectItem value="driver-2" className="hover:bg-[#1e293b]">
                      Jane Smith
                    </SelectItem>
                    <SelectItem value="driver-3" className="hover:bg-[#1e293b]">
                      Carlos Gonzalez
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <CardFooter className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/user/dashboard/orders")}
              className="border-white/10 text-white hover:bg-[#1e293b] hover:border-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Create Order
            </Button>
          </CardFooter>
        </div>
      </form>
    </div>
  );
}
