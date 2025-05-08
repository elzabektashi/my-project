"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone, Mail, Globe, Upload } from "lucide-react";

export default function CompanyProfilePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [companyData, setCompanyData] = useState({
    name: "ABC Logistics",
    logo: "/diverse-business-team.png",
    address: "123 Shipping Lane",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    country: "USA",
    phone: "+1 (555) 123-4567",
    email: "info@abclogistics.com",
    website: "https://www.abclogistics.com",
    taxId: "12-3456789",
    description:
      "ABC Logistics is a leading provider of logistics and transportation services, specializing in nationwide freight delivery and supply chain management.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Company Profile</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Manage your company's basic information
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="flex flex-col items-center space-y-2 md:w-1/3">
                      <Avatar className="h-32 w-32">
                        <AvatarImage
                          src={companyData.logo}
                          alt={companyData.name}
                        />
                        <AvatarFallback className="text-2xl">
                          {companyData.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Logo
                      </Button>
                    </div>
                    <div className="space-y-4 md:w-2/3">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Company Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={companyData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                          <Input
                            id="taxId"
                            name="taxId"
                            value={companyData.taxId}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Company Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={companyData.description}
                          onChange={handleChange}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Manage your company's contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex">
                        <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                        </span>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={companyData.email}
                          onChange={handleChange}
                          className="rounded-l-none"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                        </span>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={companyData.phone}
                          onChange={handleChange}
                          className="rounded-l-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="flex">
                      <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                      </span>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={companyData.website}
                        onChange={handleChange}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex">
                      <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <Input
                        id="address"
                        name="address"
                        value={companyData.address}
                        onChange={handleChange}
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={companyData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        name="state"
                        value={companyData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip/Postal Code</Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={companyData.zip}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={companyData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primaryAction"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your company's billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Current Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Professional Plan
                      </p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">$49</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Payment Method</h3>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/2025
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Billing Address</h3>
                  <div className="rounded-md border p-4">
                    <p>{companyData.name}</p>
                    <p>{companyData.address}</p>
                    <p>
                      {companyData.city}, {companyData.state} {companyData.zip}
                    </p>
                    <p>{companyData.country}</p>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
