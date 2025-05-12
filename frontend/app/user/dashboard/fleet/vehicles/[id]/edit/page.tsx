"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Form validation schema - same as the create form
const vehicleFormSchema = z.object({
  vehicleType: z.string({
    required_error: "Please select a vehicle type.",
  }),
  make: z.string().min(1, "Make is required."),
  model: z.string().min(1, "Model is required."),
  year: z
    .string()
    .min(4, "Year must be 4 digits.")
    .max(4, "Year must be 4 digits."),
  licensePlate: z.string().min(1, "License plate is required."),
  vin: z.string().min(1, "VIN is required."),
  capacity: z.string().optional(),
  fuelType: z.string().optional(),
  status: z.string({
    required_error: "Please select a status.",
  }),
  notes: z.string().optional(),
  maintenanceRequired: z.boolean().default(false),
  nextMaintenanceDate: z.string().optional(),
  insuranceNumber: z.string().optional(),
  insuranceExpiry: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

// Mock data for demonstration - in a real app, this would come from an API
const mockVehicleData = {
  "VEH-001": {
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
  },
  "VEH-002": {
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
  },
  "VEH-003": {
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
  },
};

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastModified, setLastModified] = useState<string | null>(null);

  // Initialize form
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      vehicleType: "",
      make: "",
      model: "",
      year: "",
      licensePlate: "",
      vin: "",
      capacity: "",
      fuelType: "",
      status: "",
      notes: "",
      maintenanceRequired: false,
      nextMaintenanceDate: "",
      insuranceNumber: "",
      insuranceExpiry: "",
    },
  });

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicleData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real application, this would be an API call
        // const response = await fetch(`/api/vehicles/${vehicleId}`);
        // if (!response.ok) throw new Error('Failed to fetch vehicle data');
        // const data = await response.json();

        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = mockVehicleData[vehicleId as keyof typeof mockVehicleData];

        if (!data) {
          throw new Error("Vehicle not found");
        }

        // Set form values
        form.reset(data);

        // Set last modified timestamp
        setLastModified(new Date().toISOString());
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
  }, [vehicleId, form]);

  // Form submission handler
  const onSubmit = async (data: VehicleFormValues) => {
    setIsSubmitting(true);

    try {
      // In a real application, this would be an API call
      // const response = await fetch(`/api/vehicles/${vehicleId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'If-Unmodified-Since': lastModified || '' // Optimistic concurrency control
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (response.status === 412) {
      //   // Precondition failed - data was modified by another user
      //   throw new Error('This vehicle has been modified by another user. Please refresh and try again.');
      // }

      // if (!response.ok) throw new Error('Failed to update vehicle');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updated vehicle data:", data);

      toast({
        title: "Vehicle updated",
        description: `${data.make} ${data.model} has been updated successfully.`,
      });

      // Navigate back to vehicle details or list
      router.push(`/dashboard/fleet`);
    } catch (err) {
      console.error("Error updating vehicle:", err);
      toast({
        title: "Update failed",
        description:
          err instanceof Error
            ? err.message
            : "Failed to update vehicle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border border-white/10"
            asChild
          >
            <Link href="/dashboard/fleet">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Edit Vehicle</h1>
        </div>

        <Alert variant="destructive" className="border border-white/10">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <Button asChild className="border border-white/10">
          <Link href="/dashboard/fleet">Return to Fleet Management</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border border-white/10"
            asChild
          >
            <Link href={`/user/dashboard/fleet/vehicles/${vehicleId}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            Edit Vehicle: {form.getValues("make")} {form.getValues("model")}
          </h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="border border-white/10">
              <TabsTrigger value="details">Vehicle Details</TabsTrigger>
              <TabsTrigger value="maintenance">
                Maintenance & Insurance
              </TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card className="border border-white/10">
                <CardHeader>
                  <CardTitle>Vehicle Information</CardTitle>
                  <CardDescription>
                    Update the details of the vehicle
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-[#0d1526] border border-white/10">
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0d1526] border border-white/10">
                              <SelectItem
                                value="truck"
                                className="hover:bg-[#1e293b]"
                              >
                                Truck
                              </SelectItem>
                              <SelectItem
                                value="van"
                                className="hover:bg-[#1e293b]"
                              >
                                Van
                              </SelectItem>
                              <SelectItem
                                value="car"
                                className="hover:bg-[#1e293b]"
                              >
                                Car
                              </SelectItem>
                              <SelectItem
                                value="trailer"
                                className="hover:bg-[#1e293b]"
                              >
                                Trailer
                              </SelectItem>
                              <SelectItem
                                value="other"
                                className="hover:bg-[#1e293b]"
                              >
                                Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-[#0d1526] border border-white/10">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0d1526] border border-white/10">
                              <SelectItem
                                value="available"
                                className="hover:bg-[#1e293b]"
                              >
                                Available
                              </SelectItem>
                              <SelectItem
                                value="in_transit"
                                className="hover:bg-[#1e293b]"
                              >
                                In Transit
                              </SelectItem>
                              <SelectItem
                                value="maintenance"
                                className="hover:bg-[#1e293b]"
                              >
                                Maintenance
                              </SelectItem>
                              <SelectItem
                                value="out_of_service"
                                className="hover:bg-[#1e293b]"
                              >
                                Out of Service
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="make"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Make</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Volvo, Mercedes, Ford"
                              {...field}
                              className="border border-white/10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. FH16, Sprinter, Transit"
                              {...field}
                              className="border border-white/10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. 2023"
                              {...field}
                              className="border border-white/10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. ABC-1234"
                              {...field}
                              className="border border-white/10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VIN</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Vehicle Identification Number"
                              {...field}
                              className="border border-white/10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. 2 tons"
                              {...field}
                              className="border border-white/10"
                            />
                          </FormControl>
                          <FormDescription>
                            Maximum load capacity of the vehicle
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fuelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuel Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-[#0d1526] border border-white/10">
                                <SelectValue placeholder="Select fuel type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0d1526] border border-white/10">
                              <SelectItem
                                value="diesel"
                                className="hover:bg-[#1e293b]"
                              >
                                Diesel
                              </SelectItem>
                              <SelectItem
                                value="gasoline"
                                className="hover:bg-[#1e293b]"
                              >
                                Gasoline
                              </SelectItem>
                              <SelectItem
                                value="electric"
                                className="hover:bg-[#1e293b]"
                              >
                                Electric
                              </SelectItem>
                              <SelectItem
                                value="hybrid"
                                className="hover:bg-[#1e293b]"
                              >
                                Hybrid
                              </SelectItem>
                              <SelectItem
                                value="other"
                                className="hover:bg-[#1e293b]"
                              >
                                Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional information about the vehicle"
                            {...field}
                            className="border border-white/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance">
              <Card className="border border-white/10">
                <CardHeader>
                  <CardTitle>Maintenance & Insurance</CardTitle>
                  <CardDescription>
                    Update maintenance schedule and insurance details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="maintenanceRequired"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/10 p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Maintenance Required</FormLabel>
                            <FormDescription>
                              Check if this vehicle needs maintenance
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nextMaintenanceDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Next Maintenance Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="border border-white/10"
                            />
                          </FormControl>
                          <FormDescription>
                            Schedule the next maintenance service
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Insurance Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="insuranceNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insurance Policy Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. INS-12345678"
                                {...field}
                                className="border border-white/10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="insuranceExpiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insurance Expiry Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="border border-white/10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                    Manage registration and other important documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-md border border-white/10 border-dashed p-6 text-center">
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
                          className="border border-white/10 mt-2"
                        >
                          Upload File
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border border-white/10 border-dashed p-6 text-center">
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
                          className="border border-white/10 mt-2"
                        >
                          Upload File
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              className="border border-white/10"
              asChild
            >
              <Link href="/dashboard/fleet">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="border border-white/10"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
