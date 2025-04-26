import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import Link from "next/link";

export function AvailableVehicles() {
  const vehicles = [
    {
      id: "VEH-001",
      type: "Truck",
      capacity: "20 tons",
      status: "Available",
    },
    {
      id: "VEH-002",
      type: "Van",
      capacity: "3 tons",
      status: "Available",
    },
    {
      id: "VEH-003",
      type: "Truck",
      capacity: "15 tons",
      status: "Available",
    },
  ];

  return (
    <Card className="bg-[#0d1526] border border-[#1b2638] text-white">
      <CardHeader>
        <CardTitle className="text-white">Available Vehicles</CardTitle>
        <CardDescription className="text-[#8e9cb1]">
          Vehicles ready for assignment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center justify-between rounded-lg border border-[#1b2638] p-4 bg-[#0d1526]"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-[#1b2638] p-2">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-white">{vehicle.id}</p>
                  <p className="text-sm text-[#8e9cb1]">
                    {vehicle.type} • {vehicle.capacity}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="bg-green-500/20 text-green-500 border-green-500/30"
              >
                {vehicle.status}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="border-[#1b2638] text-[#8e9cb1] hover:bg-[#1b2638]"
            asChild
          >
            <Link href="/dashboard/vehicles">View all vehicles</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
