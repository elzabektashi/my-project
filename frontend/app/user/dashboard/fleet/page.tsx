"use client";
import { useState } from "react";
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
import { Eye, Plus, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FleetPage() {
  const [activeTab, setActiveTab] = useState<"vehicles" | "drivers">(
    "vehicles"
  );

  // Mock data for vehicles
  const vehicles = [
    {
      id: "VEH-001",
      type: "Truck",
      regNumber: "ABC-1234",
      make: "Volvo",
      model: "FH16",
      year: 2020,
      capacity: "20 tons",
      status: "In Transit",
      driver: "John Doe",
      lastMaintenance: "2023-09-15",
      nextMaintenance: "2023-12-15",
    },
    {
      id: "VEH-002",
      type: "Van",
      regNumber: "XYZ-5678",
      make: "Mercedes",
      model: "Sprinter",
      year: 2021,
      capacity: "3 tons",
      status: "Available",
      driver: "Unassigned",
      lastMaintenance: "2023-08-20",
      nextMaintenance: "2023-11-20",
    },
    {
      id: "VEH-003",
      type: "Truck",
      regNumber: "DEF-9012",
      make: "Scania",
      model: "R450",
      year: 2019,
      capacity: "18 tons",
      status: "Maintenance",
      driver: "Unassigned",
      lastMaintenance: "2023-10-05",
      nextMaintenance: "2024-01-05",
    },
    {
      id: "VEH-004",
      type: "Van",
      regNumber: "GHI-3456",
      make: "Ford",
      model: "Transit",
      year: 2022,
      capacity: "2.5 tons",
      status: "Available",
      driver: "Unassigned",
      lastMaintenance: "2023-09-10",
      nextMaintenance: "2023-12-10",
    },
    {
      id: "VEH-005",
      type: "Truck",
      regNumber: "JKL-7890",
      make: "MAN",
      model: "TGX",
      year: 2020,
      capacity: "22 tons",
      status: "In Transit",
      driver: "Jane Smith",
      lastMaintenance: "2023-07-25",
      nextMaintenance: "2023-10-25",
    },
  ];

  // Mock data for drivers
  const drivers = [
    {
      id: "DRV-001",
      name: "John Doe",
      licenseNumber: "DL-123456",
      licenseExpiry: "2025-06-30",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      status: "On Duty",
      experience: "5 years",
      vehicleType: "Truck",
      currentVehicle: "VEH-001",
    },
    {
      id: "DRV-002",
      name: "Jane Smith",
      licenseNumber: "DL-789012",
      licenseExpiry: "2024-08-15",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@example.com",
      status: "On Duty",
      experience: "3 years",
      vehicleType: "Truck",
      currentVehicle: "VEH-005",
    },
    {
      id: "DRV-003",
      name: "Robert Johnson",
      licenseNumber: "DL-345678",
      licenseExpiry: "2026-03-22",
      phone: "+1 (555) 456-7890",
      email: "robert.johnson@example.com",
      status: "Off Duty",
      experience: "7 years",
      vehicleType: "Truck",
      currentVehicle: "Unassigned",
    },
    {
      id: "DRV-004",
      name: "Sarah Williams",
      licenseNumber: "DL-901234",
      licenseExpiry: "2025-11-10",
      phone: "+1 (555) 234-5678",
      email: "sarah.williams@example.com",
      status: "Available",
      experience: "2 years",
      vehicleType: "Van",
      currentVehicle: "Unassigned",
    },
    {
      id: "DRV-005",
      name: "Michael Brown",
      licenseNumber: "DL-567890",
      licenseExpiry: "2024-05-18",
      phone: "+1 (555) 876-5432",
      email: "michael.brown@example.com",
      status: "Available",
      experience: "4 years",
      vehicleType: "Truck",
      currentVehicle: "Unassigned",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "In Transit":
      case "On Duty":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
      case "Off Duty":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Fleet Management</h1>
        <div className="flex space-x-2">
          {activeTab === "vehicles" && (
            <Button asChild>
              <Link href="/user/dashboard/fleet/vehicles/new">
                <Plus className="mr-2 h-4 w-4" />
                New Vehicle
              </Link>
            </Button>
          )}
          {activeTab === "drivers" && (
            <Button asChild>
              <Link href="/user/dashboard/fleet/drivers/new">
                <Plus className="mr-2 h-4 w-4" />
                New Driver
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "vehicles" | "drivers")}
      >
        <TabsList className="inline-flex bg-[#1d283a] rounded p-1 space-x-1 mb-2">
          <TabsTrigger
            value="vehicles"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded data-[state=active]:bg-[#111827] data-[state=active]:text-white"
          >
            Vehicles
          </TabsTrigger>
          <TabsTrigger
            value="drivers"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded data-[state=active]:bg-[#111827] data-[state=active]:text-white"
          >
            Drivers
          </TabsTrigger>
        </TabsList>

        {/* VEHICLES TAB */}
        <TabsContent value="vehicles">
          <Card className="border-white/10 rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Vehicle Management
              </CardTitle>
              <CardDescription>
                View and manage your fleet of vehicles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex flex-1 items-center space-x-2">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search vehicles..."
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
                        value="available"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        Available
                      </SelectItem>
                      <SelectItem
                        value="in-transit"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        In Transit
                      </SelectItem>
                      <SelectItem
                        value="maintenance"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        Maintenance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px] border border-white/10 bg-[#0f172a] text-white">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f172a] text-white border border-white/10">
                      <SelectItem
                        value="all"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        All Types
                      </SelectItem>
                      <SelectItem
                        value="truck"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        Truck
                      </SelectItem>
                      <SelectItem
                        value="van"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        Van
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/10"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 overflow-auto rounded-md border border-white/10">
                <div className="min-w-[1200px]">
                  <Table className="w-full text-sm">
                    <TableHeader>
                      <TableRow className="border-b border-white/10">
                        <TableHead className="px-3 py-3">ID</TableHead>
                        <TableHead className="px-3 py-3">Reg Number</TableHead>
                        <TableHead className="px-3 py-3">Type</TableHead>
                        <TableHead className="px-3 py-3 hidden md:table-cell">
                          Make/Model
                        </TableHead>
                        <TableHead className="px-3 py-3 hidden lg:table-cell">
                          Year
                        </TableHead>
                        <TableHead className="px-3 py-3">Status</TableHead>
                        <TableHead className="px-3 py-3 hidden md:table-cell">
                          Driver
                        </TableHead>
                        <TableHead className="px-3 py-3 hidden lg:table-cell">
                          Next Maintenance
                        </TableHead>
                        <TableHead className="px-3 py-3 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicles.map((vehicle) => (
                        <TableRow
                          key={vehicle.id}
                          className="border-b border-white/10 hover:bg-white/5"
                        >
                          <TableCell className="py-4 px-3 font-medium">
                            {vehicle.id}
                          </TableCell>
                          <TableCell className="py-4 px-3">
                            {vehicle.regNumber}
                          </TableCell>
                          <TableCell className="py-4 px-3">
                            {vehicle.type}
                          </TableCell>
                          <TableCell className="py-4 px-3 hidden md:table-cell">
                            {vehicle.make} {vehicle.model}
                          </TableCell>
                          <TableCell className="py-4 px-3 hidden lg:table-cell">
                            {vehicle.year}
                          </TableCell>
                          <TableCell className="py-4 px-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                vehicle.status
                              )}`}
                            >
                              {vehicle.status}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-3 hidden md:table-cell">
                            {vehicle.driver}
                          </TableCell>
                          <TableCell className="py-4 px-3 hidden lg:table-cell">
                            {vehicle.nextMaintenance}
                          </TableCell>
                          <TableCell className="py-4 px-3 text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <Link
                                href={`/user/dashboard/fleet/vehicles/${vehicle.id}`}
                              >
                                <Eye className="h-4 w-4" />
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
        </TabsContent>

        {/* DRIVERS TAB */}
        <TabsContent value="drivers">
          <Card className="border-white/10 rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Driver Management
              </CardTitle>
              <CardDescription>
                View and manage your driver personnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex flex-1 items-center space-x-2">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search drivers..."
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
                        value="available"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        Available
                      </SelectItem>
                      <SelectItem
                        value="on-duty"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        On Duty
                      </SelectItem>
                      <SelectItem
                        value="off-duty"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        Off Duty
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px] border border-white/10 bg-[#0f172a] text-white">
                      <SelectValue placeholder="Vehicle Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f172a] text-white border border-white/10">
                      <SelectItem
                        value="all"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        All Types
                      </SelectItem>
                      <SelectItem
                        value="truck"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        Truck
                      </SelectItem>
                      <SelectItem
                        value="van"
                        className="px-3 py-2 text-sm hover:bg-[#1e293b] hover:text-white transition-colors"
                      >
                        Van
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/10"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 overflow-auto rounded-md border border-white/10">
                <div className="min-w-[1200px]">
                  <Table className="w-full text-sm">
                    <TableHeader>
                      <TableRow className="border-b border-white/10">
                        <TableHead className="px-3 py-3">ID</TableHead>
                        <TableHead className="px-3 py-3">Name</TableHead>
                        <TableHead className="px-3 py-3 hidden md:table-cell">
                          License
                        </TableHead>
                        <TableHead className="px-3 py-3 hidden lg:table-cell">
                          License Expiry
                        </TableHead>
                        <TableHead className="px-3 py-3">Status</TableHead>
                        <TableHead className="px-3 py-3 hidden md:table-cell">
                          Vehicle Type
                        </TableHead>
                        <TableHead className="px-3 py-3 hidden lg:table-cell">
                          Current Vehicle
                        </TableHead>
                        <TableHead className="px-3 py-3 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {drivers.map((driver) => (
                        <TableRow
                          key={driver.id}
                          className="border-b border-white/10 hover:bg-white/5"
                        >
                          <TableCell className="py-4 px-3 font-medium">
                            {driver.id}
                          </TableCell>
                          <TableCell className="py-4 px-3">
                            {driver.name}
                          </TableCell>
                          <TableCell className="py-4 px-3 hidden md:table-cell">
                            {driver.licenseNumber}
                          </TableCell>
                          <TableCell className="py-4 px-3 hidden lg:table-cell">
                            {driver.licenseExpiry}
                          </TableCell>
                          <TableCell className="py-4 px-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                driver.status
                              )}`}
                            >
                              {driver.status}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-3 hidden md:table-cell">
                            {driver.vehicleType}
                          </TableCell>
                          <TableCell className="py-4 px-3 hidden lg:table-cell">
                            {driver.currentVehicle}
                          </TableCell>
                          <TableCell className="py-4 px-3 text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <Link
                                href={`/user/dashboard/fleet/drivers/${driver.id}`}
                              >
                                <Eye className="h-4 w-4 text-muted-foreground hover:text-white transition-colors cursor-pointer" />
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
