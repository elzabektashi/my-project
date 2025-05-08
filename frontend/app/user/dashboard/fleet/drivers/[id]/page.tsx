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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  User,
  Calendar,
  FileText,
  Pencil,
  Trash2,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Truck,
} from "lucide-react";
import Link from "next/link";

// Define types for driver data
interface VehicleDetails {
  id: string;
  make: string;
  model: string;
}

interface Document {
  name: string;
  uploaded: string;
}

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseType: string;
  licenseExpiry: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  notes: string;
  currentVehicle: string;
  currentVehicleDetails: VehicleDetails | null;
  hireDate: string;
  documents: Document[];
}

// Mock data
const mockDriverData: { [key: string]: Driver } = {
  "DRV-001": {
    id: "DRV-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    licenseNumber: "DL-123456",
    licenseType: "Class A (CDL)",
    licenseExpiry: "2025-06-30",
    status: "on_duty",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "+1 (555) 987-6543",
    notes: "Experienced long-haul driver",
    currentVehicle: "VEH-001",
    currentVehicleDetails: { id: "VEH-001", make: "Volvo", model: "FH16" },
    hireDate: "2020-03-15",
    documents: [
      { name: "Driver's License", uploaded: "2023-01-15" },
      { name: "Medical Certificate", uploaded: "2023-01-20" },
    ],
  },
  "DRV-002": {
    id: "DRV-002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    licenseNumber: "DL-789012",
    licenseType: "Class A (CDL)",
    licenseExpiry: "2024-08-15",
    status: "on_duty",
    address: "456 Oak Ave",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    country: "USA",
    emergencyContactName: "John Smith",
    emergencyContactPhone: "+1 (555) 876-5432",
    notes: "Specialized in refrigerated transport",
    currentVehicle: "VEH-005",
    currentVehicleDetails: { id: "VEH-005", make: "MAN", model: "TGX" },
    hireDate: "2021-05-10",
    documents: [
      { name: "Driver's License", uploaded: "2023-02-10" },
      { name: "Medical Certificate", uploaded: "2023-02-15" },
    ],
  },
  "DRV-003": {
    id: "DRV-003",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 345-6789",
    licenseNumber: "DL-345678",
    licenseType: "Class A (CDL)",
    licenseExpiry: "2026-03-22",
    status: "off_duty",
    address: "789 Pine St",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "USA",
    emergencyContactName: "Mary Johnson",
    emergencyContactPhone: "+1 (555) 765-4321",
    notes: "Hazardous materials certified",
    currentVehicle: "",
    currentVehicleDetails: null,
    hireDate: "2019-11-20",
    documents: [
      { name: "Driver's License", uploaded: "2023-03-05" },
      { name: "Medical Certificate", uploaded: "2023-03-10" },
      { name: "Hazmat Certification", uploaded: "2023-03-15" },
    ],
  },
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Helper function to get status badge variant
interface StatusBadge {
  variant: "outline";
  label: string;
  className: string;
}

const getStatusBadge = (status: string): StatusBadge => {
  switch (status) {
    case "available":
      return {
        variant: "outline",
        label: "Available",
        className: "bg-green-100 text-green-800 hover:bg-green-100",
      };
    case "on_duty":
      return {
        variant: "outline",
        label: "On Duty",
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      };
    case "off_duty":
      return {
        variant: "outline",
        label: "Off Duty",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      };
    case "on_leave":
      return {
        variant: "outline",
        label: "On Leave",
        className: "bg-red-100 text-red-800 hover:bg-red-100",
      };
    default:
      return { variant: "outline", label: status, className: "" };
  }
};

export default function DriverDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const driverId = params.id as string;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchDriverData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = mockDriverData[driverId];
        if (!data) throw new Error("Driver not found");
        setDriver(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (driverId) fetchDriverData();
  }, [driverId]);

  const handleDelete = async () => {
    if (!driver) return;
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/user/dashboard/fleet");
    } catch (err) {
      setError("Failed to delete driver. Please try again.");
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
            Loading driver data...
          </p>
        </div>
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/user/dashboard/fleet">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Driver Details</h1>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <h2 className="mt-4 text-xl font-semibold">Error Loading Driver</h2>
            <p className="mt-2 text-center text-muted-foreground">
              {error || "Driver not found or an error occurred."}
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/user/dashboard/fleet">
                Return to Driver Management
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusBadge = getStatusBadge(driver.status);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/user/dashboard/fleet">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>

          <Avatar className="h-16 w-16">
            <AvatarImage
              src={`/abstract-geometric-shapes.png?height=64&width=64&query=${driver.firstName}%20${driver.lastName}`}
              alt={`${driver.firstName} ${driver.lastName}`}
            />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {driver.firstName} {driver.lastName}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{driver.id}</span>
              <Badge className={statusBadge.className}>
                {statusBadge.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/user/dashboard/fleet/drivers/${driverId}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Driver
            </Link>
          </Button>

          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  driver{" "}
                  <strong>
                    {driver.firstName} {driver.lastName} ({driver.id})
                  </strong>{" "}
                  and remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  disabled={isDeleting}
                  className="bg-red-600 focus:ring-red-600"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>Delete Driver</>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Personal Information</TabsTrigger>
          <TabsTrigger value="license">License & Qualifications</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Contact details and personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${driver.email}`}
                      className="hover:underline"
                    >
                      {driver.email}
                    </a>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${driver.phone}`} className="hover:underline">
                      {driver.phone}
                    </a>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Hire Date
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(driver.hireDate)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Vehicle
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    {driver.currentVehicleDetails ? (
                      <Link
                        href={`/user/dashboard/fleet/vehicles/${driver.currentVehicle}`}
                        className="hover:underline"
                      >
                        {driver.currentVehicleDetails.make}{" "}
                        {driver.currentVehicleDetails.model} (
                        {driver.currentVehicle})
                      </Link>
                    ) : (
                      "Unassigned"
                    )}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Address</h3>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p>{driver.address}</p>
                    <p>
                      {driver.city}, {driver.state} {driver.zipCode}
                    </p>
                    <p>{driver.country}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Notes
                </p>
                <p>{driver.notes || "No notes available"}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="license">
          <Card>
            <CardHeader>
              <CardTitle>License Information</CardTitle>
              <CardDescription>
                Driver's license and qualification details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    License Number
                  </p>
                  <p className="font-medium">{driver.licenseNumber}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    License Type
                  </p>
                  <p className="font-medium">{driver.licenseType}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    License Expiry Date
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(driver.licenseExpiry)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>Emergency contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Emergency Contact Name
                  </p>
                  <p className="font-medium">{driver.emergencyContactName}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Emergency Contact Phone
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${driver.emergencyContactPhone}`}
                      className="hover:underline"
                    >
                      {driver.emergencyContactPhone}
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Driver Documents</CardTitle>
              <CardDescription>
                License and other important documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {driver.documents && driver.documents.length > 0 ? (
                <div className="space-y-4">
                  {driver.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded: {formatDate(doc.uploaded)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    No documents available
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Upload driver documents to keep track of important paperwork
                  </p>
                  <Button variant="outline" className="mt-4">
                    Upload Document
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
