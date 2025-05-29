"use client";

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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, TestTube, CheckCircle, XCircle } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected" | "error";
  category: string;
}

const integrations: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing",
    status: "connected",
    category: "payment",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Alternative payment method",
    status: "disconnected",
    category: "payment",
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Web analytics",
    status: "connected",
    category: "analytics",
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    description: "Product analytics",
    status: "disconnected",
    category: "analytics",
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Email delivery service",
    status: "connected",
    category: "communication",
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "SMS and voice services",
    status: "error",
    category: "communication",
  },
];

export function IntegrationSettings() {
  const { toast } = useToast();
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});

  const toggleApiKeyVisibility = (integrationId: string) => {
    setShowApiKeys((prev) => ({
      ...prev,
      [integrationId]: !prev[integrationId],
    }));
  };

  const handleSave = () => {
    toast({
      title: "Integration Settings Saved",
      description: "Your integration settings have been updated successfully.",
    });
  };

  const handleTestConnection = (integrationName: string) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${integrationName}...`,
    });

    // Simulate API test
    setTimeout(() => {
      toast({
        title: "Connection Test Successful",
        description: `Successfully connected to ${integrationName}.`,
      });
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return <Badge variant="secondary">Disconnected</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stripe Integration</CardTitle>
              <CardDescription>
                Configure Stripe for payment processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="stripe-enabled">Enable Stripe</Label>
                  <p className="text-sm text-muted-foreground">
                    Use Stripe for payment processing
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge("connected")}
                  <Switch id="stripe-enabled" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stripe-publishable-key">Publishable Key</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="stripe-publishable-key"
                    type={showApiKeys.stripe ? "text" : "password"}
                    defaultValue="pk_live_51JKl2JGjR8xZQKlM5tY6vX9Zs7gN2pJmHbVwQZlM5tY6vX9Zs"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleApiKeyVisibility("stripe")}
                  >
                    {showApiKeys.stripe ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stripe-secret-key">Secret Key</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="stripe-secret-key"
                    type="password"
                    defaultValue="sk_live_51JKl2JGjR8xZQKlM5tY6vX9Zs7gN2pJmHbVwQZlM5tY6vX9Zs"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleTestConnection("Stripe")}
                  >
                    <TestTube className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stripe-webhook-secret">Webhook Secret</Label>
                <Input
                  id="stripe-webhook-secret"
                  type="password"
                  defaultValue="whsec_JKl2JGjR8xZQKlM5tY6vX9Zs7gN2pJmHbVwQZlM5tY6vX9Zs"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PayPal Integration</CardTitle>
              <CardDescription>
                Configure PayPal as an alternative payment method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="paypal-enabled">Enable PayPal</Label>
                  <p className="text-sm text-muted-foreground">
                    Use PayPal for payment processing
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge("disconnected")}
                  <Switch id="paypal-enabled" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paypal-client-id">Client ID</Label>
                <Input
                  id="paypal-client-id"
                  placeholder="Enter PayPal Client ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paypal-client-secret">Client Secret</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="paypal-client-secret"
                    type="password"
                    placeholder="Enter PayPal Client Secret"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleTestConnection("PayPal")}
                  >
                    <TestTube className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Analytics</CardTitle>
              <CardDescription>
                Track website and application analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ga-enabled">Enable Google Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Track user behavior and website performance
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge("connected")}
                  <Switch id="ga-enabled" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ga-tracking-id">Tracking ID</Label>
                <Input
                  id="ga-tracking-id"
                  defaultValue="GA-XXXXXXXXX-X"
                  placeholder="Enter Google Analytics Tracking ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ga-measurement-id">Measurement ID (GA4)</Label>
                <Input
                  id="ga-measurement-id"
                  defaultValue="G-XXXXXXXXXX"
                  placeholder="Enter GA4 Measurement ID"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mixpanel</CardTitle>
              <CardDescription>
                Advanced product analytics and user tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mixpanel-enabled">Enable Mixpanel</Label>
                  <p className="text-sm text-muted-foreground">
                    Track user events and product usage
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge("disconnected")}
                  <Switch id="mixpanel-enabled" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mixpanel-token">Project Token</Label>
                <Input
                  id="mixpanel-token"
                  placeholder="Enter Mixpanel Project Token"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SendGrid</CardTitle>
              <CardDescription>
                Email delivery and marketing automation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sendgrid-enabled">Enable SendGrid</Label>
                  <p className="text-sm text-muted-foreground">
                    Use SendGrid for email delivery
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge("connected")}
                  <Switch id="sendgrid-enabled" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sendgrid-api-key">API Key</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="sendgrid-api-key"
                    type="password"
                    defaultValue="SG.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleTestConnection("SendGrid")}
                  >
                    <TestTube className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Twilio</CardTitle>
              <CardDescription>
                SMS and voice communication services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twilio-enabled">Enable Twilio</Label>
                  <p className="text-sm text-muted-foreground">
                    Use Twilio for SMS and voice services
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge("error")}
                  <Switch id="twilio-enabled" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twilio-account-sid">Account SID</Label>
                <Input
                  id="twilio-account-sid"
                  placeholder="Enter Twilio Account SID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twilio-auth-token">Auth Token</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="twilio-auth-token"
                    type="password"
                    placeholder="Enter Twilio Auth Token"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleTestConnection("Twilio")}
                  >
                    <TestTube className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twilio-phone-number">Phone Number</Label>
                <Input id="twilio-phone-number" placeholder="+1234567890" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logistics Integrations</CardTitle>
              <CardDescription>
                Connect with shipping and logistics providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Logistics integrations coming soon...
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  We're working on integrations with major shipping providers
                  like FedEx, UPS, and DHL.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
