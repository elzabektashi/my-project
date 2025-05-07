import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface FleetStatusProps {
  showAll?: boolean;
}

export function FleetStatus({ showAll = false }: FleetStatusProps) {
  const vehicles = [
    {
      id: "ABC-1234",
      type: "Truck",
      regNumber: "ABC-1234",
      status: "In Transit",
      driver: "John Doe",
      location: "En route to New York",
    },
    {
      id: "XYZ-5678",
      type: "Van",
      regNumber: "XYZ-5678",
      status: "Available",
      driver: "Unassigned",
      location: "Warehouse A",
    },
    {
      id: "DEF-9012",
      type: "Truck",
      regNumber: "DEF-9012",
      status: "Maintenance",
      driver: "Unassigned",
      location: "Service Center",
    },
    {
      id: "GHI-3456",
      type: "Van",
      regNumber: "GHI-3456",
      status: "In Transit",
      driver: "Jane Smith",
      location: "En route to Boston",
    },
    {
      id: "JKL-7890",
      type: "Truck",
      regNumber: "JKL-7890",
      status: "Available",
      driver: "Unassigned",
      location: "Warehouse B",
    },
  ];
  const display = showAll ? vehicles : vehicles.slice(0, 3);

  const getBadge = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-zinc-700 text-white";
    }
  };

  return (
    <Card className="bg-[#0d1526] border border-white/10 rounded-lg">
      <CardHeader className="px-6 pt-6 pb-4">
        <CardTitle className="text-xl font-semibold">Fleet Status</CardTitle>
        <CardDescription className="text-sm ">
          Current status of your vehicles and drivers
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-4">
        {display.map((v) => (
          <div
            key={v.id}
            className="relative flex items-start gap-4 rounded-lg border border-white/10 p-4"
          >
            {/* Icon */}
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Truck className="h-5 w-5" />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-1">
              <p className="text-base font-medium text-white ">{v.id}</p>
              <p className="text-sm text-muted-foreground">{v.type}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-1 h-4 w-4" />
                {v.driver}
              </div>
              <p className="text-xs text-muted-foreground">{v.location}</p>
            </div>

            {/* Status pill */}
            <span
              className={`
                inline-block px-2 py-0.5 rounded-full text-xs font-medium
                ${getBadge(v.status)}
              `}
            >
              {v.status}
            </span>
          </div>
        ))}

        {!showAll && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              className="rounded border-white/10"
              asChild
            >
              <Link
                href="/user/dashboard/fleet"
                className="flex items-center gap-2 px-5 py-2 text-base font-medium text-white hover:bg-[#1e293b] hover:border-transparent"
              >
                View all vehicles
                <ArrowUpRight className="h-5 w-5 text-zinc-300" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
