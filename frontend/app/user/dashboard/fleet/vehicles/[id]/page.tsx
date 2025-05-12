"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
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
  Truck,
  Calendar,
  FileText,
  AlertTriangle,
  Pencil,
  Trash2,
  Loader2,
  Upload,
} from "lucide-react";
import Link from "next/link";

// Mock data for demonstration - in a real app, this would come from an API
const mockVehicleData = {
  "VEH-001": {
    id: "VEH-001",
    vehicleType: "truck",
    make: "Volvo",
    model: "FH16",
    year: "2020",
    licensePlate: "ABC-1234",
    vin: "1HGCM82633A123456",
    capacity: "20 tons",
    fuelType: "diesel",
    status: "in_transit",
    notes: "This is our primary long-haul truck",
    maintenanceRequired: false,
    nextMaintenanceDate: "2023-12-15",
    insuranceNumber: "INS-789012",
    insuranceExpiry: "2024-06-30",
    currentDriver: "John Doe",
    driverId: "DRV-001",
    lastService: "2023-09-10",
    fuelEfficiency: "7.5 mpg",
    purchaseDate: "2020-03-15",
    documents: [
      { name: "Registration", uploaded: "2023-01-15" },
      { name: "Insurance", uploaded: "2023-01-15" },
    ],
  },
  "VEH-002": {
    id: "VEH-002",
    vehicleType: "van",
    make: "Mercedes",
    model: "Sprinter",
    year: "2021",
    licensePlate: "XYZ-5678",
    vin: "WDCYC3HF3BX123456",
    capacity: "3 tons",
    fuelType: "diesel",
    status: "available",
    notes: "Used for local deliveries",
    maintenanceRequired: false,
    nextMaintenanceDate: "2023-11-20",
    insuranceNumber: "INS-345678",
    insuranceExpiry: "2024-05-15",
    currentDriver: "Unassigned",
    driverId: null,
    lastService: "2023-08-05",
    fuelEfficiency: "22 mpg",
    purchaseDate: "2021-05-10",
    documents: [
      { name: "Registration", uploaded: "2023-02-20" },
      { name: "Insurance", uploaded: "2023-02-20" },
    ],
  },
  "VEH-003": {
    id: "VEH-003",
    vehicleType: "truck",
    make: "Scania",
    model: "R450",
    year: "2019",
    licensePlate: "DEF-9012",
    vin: "XLER4X20005246022",
    capacity: "18 tons",
    fuelType: "diesel",
    status: "maintenance",
    notes: "Scheduled for regular maintenance",
    maintenanceRequired: true,
    nextMaintenanceDate: "2024-01-05",
    insuranceNumber: "INS-901234",
    insuranceExpiry: "2024-04-20",
    currentDriver: "Unassigned",
    driverId: null,
    lastService: "2023-07-15",
    fuelEfficiency: "6.8 mpg",
    purchaseDate: "2019-11-20",
    documents: [
      { name: "Registration", uploaded: "2023-03-10" },
      { name: "Insurance", uploaded: "2023-03-10" },
      { name: "Maintenance History", uploaded: "2023-07-15" },
    ],
  },
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Helper function to get status badge variant
const getStatusBadge = (status: string) => {
  switch (status) {
    case "available":
      return {
        variant: "outline",
        label: "Available",
        className:
          "bg-green-100 text-green-800 hover:bg-green-100 border border-white/10",
      };
    case "in_transit":
      return {
        variant: "outline",
        label: "In Transit",
        className:
          "bg-blue-100 text-blue-800 hover:bg-blue-100 border border-white/10",
      };
    case "maintenance":
      return {
        variant: "outline",
        label: "Maintenance",
        className:
          "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border border-white/10",
      };
    case "out_of_service":
      return {
        variant: "outline",
        label: "Out of Service",
        className:
          "bg-red-100 text-red-800 hover:bg-red-100 border border-white/10",
      };
    default:
      return {
        variant: "outline",
        label: status,
        className: "border border-white/10",
      };
  }
};

export default function VehicleDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicleData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = mockVehicleData[vehicleId as keyof typeof mockVehicleData];

        if (!data) {
          throw new Error("Vehicle not found");
        }

        setVehicle(data);
      } catch (err) {
        console.error("Error fetching vehicle data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (vehicleId) {
      fetchVehicleData();
    }
  }, [vehicleId]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Vehicle deleted",
        description: `${vehicle.make} ${vehicle.model} has been deleted successfully.`,
      });

      router.push("/user/dashboard/fleet/vehicles");
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      toast({
        title: "Delete failed",
        description:
          err instanceof Error
            ? err.message
            : "Failed to delete vehicle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading vehicle data...
          </p>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="border border-white/10"
          >
            <Link href="/user/dashboard/fleet/vehicles">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Details</h1>
        </div>

        <Card className="border border-white/10">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <AlertTriangle className="h-10 w-10 text-amber-500" />
            <h2 className="mt-4 text-xl font-semibold">
              Error Loading Vehicle
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              {error || "Vehicle not found or an error occurred."}
            </p>
            <Button asChild className="mt-4 border border-white/10">
              <Link href="/user/dashboard/fleet/vehicles">
                Return to Vehicle List
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusBadge = getStatusBadge(vehicle.status);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="border border-white/10"
          >
            <Link href="/user/dashboard/fleet/vehicles">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {vehicle.make} {vehicle.model}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {vehicle.id}
              </span>
              <Badge className={statusBadge.className}>
                {statusBadge.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild className="border border-white/10">
            <Link href={`/user/dashboard/fleet/vehicles/${vehicleId}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Vehicle
            </Link>
          </Button>

          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="border border-white/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border border-white/10">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  vehicle
                  <strong>
                    {" "}
                    {vehicle.make} {vehicle.model} ({vehicle.id})
                  </strong>{" "}
                  and remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border border-white/10">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  disabled={isDeleting}
                  className="bg-red-600 focus:ring-red-600 border border-white/10"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>Delete Vehicle</>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList className="border border-white/10">
          <TabsTrigger value="details">Vehicle Details</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance & Insurance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="border border-white/10">
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>
                Details and specifications of the vehicle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Vehicle Type
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    {vehicle.vehicleType.charAt(0).toUpperCase() +
                      vehicle.vehicleType.slice(1)}
                  </p>
                </div>
                {/* ... (other divs remain the same) ... */}
              </div>

              <Separator className="border-b border-white/10" />

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Current Driver
                </p>
                <p className="font-medium">
                  {vehicle.currentDriver}
                  {vehicle.driverId && (
                    <Link
                      href={`/dashboard/drivers/${vehicle.driverId}`}
                      className="ml-2 text-sm text-primary hover:underline"
                    >
                      View Driver
                    </Link>
                  )}
                </p>
              </div>

              <Separator className="border-b border-white/10" />

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Notes
                </p>
                <p>{vehicle.notes || "No notes available"}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card className="border border-white/10">
            <CardHeader>
              <CardTitle>Maintenance & Insurance</CardTitle>
              <CardDescription>
                Maintenance schedule and insurance details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Maintenance Required
                  </p>
                  <div className="font-medium">
                    {vehicle.maintenanceRequired ? (
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 border border-white/10"
                      >
                        Yes
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 border border-white/10"
                      >
                        No
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Next Maintenance Date
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(vehicle.nextMaintenanceDate)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Service Date
                  </p>
                  <p className="font-medium">
                    {formatDate(vehicle.lastService)}
                  </p>
                </div>
              </div>

              <Separator className="border-b border-white/10" />

              <h3 className="text-lg font-medium">Insurance Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Insurance Policy Number
                  </p>
                  <p className="font-medium">{vehicle.insuranceNumber}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Insurance Expiry Date
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(vehicle.insuranceExpiry)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="border border-white/10">
            <CardHeader>
              <CardTitle>Vehicle Documents</CardTitle>
              <CardDescription>
                Registration and other important documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicle.documents && vehicle.documents.length > 0 ? (
                <div className="grid gap-4">
                  {vehicle.documents.map((doc: any, index: number) => (
                    <div
                      key={index}
                      className="rounded-md border border-white/10 p-6 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <h3 className="text-lg font-medium">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Uploaded: {formatDate(doc.uploaded)}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 border border-white/10"
                        >
                          View Document
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="rounded-md border border-white/10 p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <h3 className="text-lg font-medium">
                        Registration Document
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Upload the vehicle registration document
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border border-white/10"
                      >
                        Upload File
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border border-white/10 p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <h3 className="text-lg font-medium">
                        Insurance Document
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Upload the vehicle insurance document
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border border-white/10"
                      >
                        Upload File
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
