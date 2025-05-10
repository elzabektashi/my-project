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
  Upload,
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
    month: "2-digit",
    day: "2-digit",
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
  const [formData, setFormData] = useState<Driver | null>(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = mockDriverData[driverId];
        if (!data) throw new Error("Driver not found");
        setDriver(data);
        setFormData(data);
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSaveChanges = () => {
    if (formData) {
      setDriver(formData);
      alert("Changes saved successfully!");
    }
  };

  const handleCancel = () => {
    setFormData(driver);
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

  if (error || !driver || !formData) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border border-white/10 hover:bg-[#1e293b] hover:border-transparent"
            asChild
          >
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
          <Button
            variant="outline"
            size="icon"
            className="border border-white/10 hover:bg-[#1e293b] hover:border-transparent"
            asChild
          >
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
          <Button
            variant="outline"
            className="border border-white/10 hover:bg-[#1e293b] hover:border-transparent"
            asChild
          >
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
                  driver{" "}
                  <strong>
                    {driver.firstName} {driver.lastName} ({driver.id})
                  </strong>{" "}
                  and remove all associated data.
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
                    <>Delete Driver</>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-2">
        <TabsList className="inline-flex bg-[#0d1526] rounded p-1 space-x-1 mb-2 bg-[#1e293b]">
          <TabsTrigger
            value="details"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded data-[state=active]:bg-[#111827] data-[state=active]:text-white"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="license"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded data-[state=active]:bg-[#111827] data-[state=active]:text-white"
          >
            License & Qualifications
          </TabsTrigger>
          <TabsTrigger
            value="emergency"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded data-[state=active]:bg-[#111827] data-[state=active]:text-white"
          >
            Emergency Contact
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="px-3 py-1 text-sm text-[#94a3b8] rounded data-[state=active]:bg-[#111827] data-[state=active]:text-white "
          >
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="border-white/10 rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Personal Information
              </CardTitle>
              <CardDescription>
                Update the driver's personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=96&width=96&query=${driver.firstName}%20${driver.lastName}`}
                      alt={`${driver.firstName} ${driver.lastName}`}
                    />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 hover:bg-[#1e293b] hover:border-transparent"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="on_duty" className="hover:bg-[#1e293b]">
                          On Duty
                        </option>
                        <option value="off_duty" className="hover:bg-[#1e293b]">
                          Off Duty
                        </option>
                        <option value="on_leave" className="hover:bg-[#1e293b]">
                          On Leave
                        </option>
                        <option
                          value="available"
                          className="hover:bg-[#1e293b]"
                        >
                          Available
                        </option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Assigned Vehicle
                      </label>
                      <select
                        name="currentVehicle"
                        value={formData.currentVehicle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Unassigned</option>
                        <option value="VEH-001">VEH-001 (Volvo FH16)</option>
                        <option value="VEH-005">VEH-005 (MAN TGX)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address Information</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        State/Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Zip/Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="border-white/10 hover:bg-[#1e293b] hover:border-transparent"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="license">
          <Card className="border border-gray-800 rounded-lg bg-[#0d1526]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">
                License Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Update the driver's license and qualification details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#0d1526] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    License Type
                  </label>
                  <select
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#0d1526] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-[#1e293b]"
                  >
                    <option value="Class A (CDL)">Class A (CDL)</option>
                    <option value="Class B (CDL)">Class B (CDL)</option>
                    <option value="Class C (CDL)">Class C (CDL)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    License Expiry Date
                  </label>
                  <input
                    type="date"
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#0d1526] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Additional Qualifications & Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full h-24 px-3 py-2 bg-[#0d1526] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  className="border border-gray-700 hover:bg-[#1e293b] text-white"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency">
          <Card className="border-white/10 rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Emergency Contact
              </CardTitle>
              <CardDescription>
                Update the driver's emergency contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="border-white/10 hover:bg-[#1e293b] hover:border-transparent"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="border-white/10 rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Driver Documents
              </CardTitle>
              <CardDescription>
                Manage license and other important documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {driver.documents.map((doc, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg p-4 flex flex-col items-center text-center"
                >
                  <Upload className="h-6 w-6 text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-white">{doc.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {doc.name === "Driver's License"
                      ? "Upload a copy of the driver's license"
                      : "Upload the driver's medical certificate"}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border border-gray-700 hover:bg-[#1e293b] text-white"
                    >
                      View Current
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Upload New
                    </Button>
                  </div>
                </div>
              ))}
              {driver.documents.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 p-8 text-center text-gray-400">
                  <FileText className="h-10 w-10 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-white">
                    No documents available
                  </h3>
                  <p className="mt-2 text-sm">
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
