"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

// Form validation schema
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

export default function NewVehiclePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values
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
      status: "available",
      notes: "",
      maintenanceRequired: false,
      nextMaintenanceDate: "",
      insuranceNumber: "",
      insuranceExpiry: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: VehicleFormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Vehicle data:", data);
      toast({
        title: "Vehicle created successfully",
        description: `${data.make} ${data.model} has been added to your fleet.`,
      });
      router.push("/user/dashboard/fleet");
    } catch (error) {
      console.error("Error creating vehicle:", error);
      toast({
        title: "Error creating vehicle",
        description:
          "There was a problem creating the vehicle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="border border-white/10"
          >
            <Link href="/dashboard/fleet">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Add New Vehicle</h1>
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
                    Enter the basic details of the vehicle
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
                              <SelectTrigger className="border border-white/10">
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
                              <SelectTrigger className="border border-white/10">
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
                              className="border border-white/10"
                              {...field}
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
                              className="border border-white/10"
                              {...field}
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
                              type="number"
                              className="border border-white/10"
                              {...field}
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
                              className="border border-white/10"
                              {...field}
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
                              className="border border-white/10"
                              {...field}
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
                              className="border border-white/10"
                              {...field}
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
                              <SelectTrigger className="border border-white/10">
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
                            className="border border-white/10"
                            {...field}
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
                    Track maintenance schedule and insurance details
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
                              className="border border-white/10"
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
                              className="border border-white/10"
                              {...field}
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
                                className="border border-white/10"
                                {...field}
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
                                className="border border-white/10"
                                {...field}
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
                    Upload registration and other important documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              asChild
              className="border border-white/10"
            >
              <Link href="/dashboard/fleet">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="border border-white/10"
            >
              {isSubmitting ? "Creating..." : "Create Vehicle"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
