"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { Copy, RefreshCw } from "lucide-react";

export function ApiSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "API Settings Saved",
      description: "Your API settings have been updated successfully.",
    });
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(
      "sk_live_51JKl2JGjR8xZQKlM5tY6vX9Zs7gN2pJmHbVwQZlM5tY6vX9Zs"
    );
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const handleRegenerateApiKey = () => {
    toast({
      title: "API Key Regenerated",
      description:
        "A new API key has been generated. Make sure to update your applications.",
    });
  };

  return (
    <div className="space-y-6 bg-[#0d1526]">
      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>
            Manage API access and authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-api">Enable API Access</Label>
              <p className="text-sm text-gray-400">
                Allow external applications to access the platform via API
              </p>
            </div>
            <Switch
              id="enable-api"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex items-center gap-2">
              <Input
                id="api-key"
                type="password"
                value="sk_live_51JKl2JGjR8xZQKlM5tY6vX9Zs7gN2pJmHbVwQZlM5tY6vX9Zs"
                readOnly
                className="border-white/10 text-gray-200"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyApiKey}
                className="border-white/10"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRegenerateApiKey}
                className="border-white/10"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              This key grants full access to your account. Keep it secure and
              never share it publicly.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-secret">API Secret</Label>
            <div className="flex items-center gap-2">
              <Input
                id="api-secret"
                type="password"
                value="whsec_JKl2JGjR8xZQKlM5tY6vX9Zs7gN2pJmHbVwQZlM5tY6vX9Zs7gN2"
                readOnly
                className="border-white/10 text-gray-200"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyApiKey}
                className="border-white/10"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRegenerateApiKey}
                className="border-white/10"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Rate Limiting</CardTitle>
          <CardDescription>
            Configure API rate limiting settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-rate-limiting">Enable Rate Limiting</Label>
              <p className="text-sm text-gray-400">
                Limit the number of API requests that can be made in a given
                time period
              </p>
            </div>
            <Switch
              id="enable-rate-limiting"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
            <Input
              id="rate-limit"
              type="number"
              defaultValue="100"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="burst-limit">
              Burst Limit (requests per second)
            </Label>
            <Input
              id="burst-limit"
              type="number"
              defaultValue="10"
              className="border-white/10 text-gray-200"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>
            Configure webhook endpoints for real-time event notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-webhooks">Enable Webhooks</Label>
              <p className="text-sm text-gray-400">
                Send event notifications to external URLs when certain actions
                occur
              </p>
            </div>
            <Switch
              id="enable-webhooks"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              defaultValue="https://example.com/webhook"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-secret">Webhook Secret</Label>
            <Input
              id="webhook-secret"
              type="password"
              value="whsec_JKl2JGjR8xZQKlM5tY6vX9Zs"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label>Events to Send</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="event-order-created"
                  defaultChecked
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="event-order-created">Order Created</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="event-order-updated"
                  defaultChecked
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="event-order-updated">Order Updated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="event-order-completed"
                  defaultChecked
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="event-order-completed">Order Completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="event-user-created"
                  defaultChecked
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="event-user-created">User Created</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="event-user-updated"
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="event-user-updated">User Updated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="event-payment-received"
                  defaultChecked
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="event-payment-received">Payment Received</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Configure API documentation settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-docs">Enable API Documentation</Label>
              <p className="text-sm text-gray-400">
                Make API documentation available to developers
              </p>
            </div>
            <Switch
              id="enable-docs"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="docs-url">Documentation URL</Label>
            <Input
              id="docs-url"
              defaultValue="https://api.logisticsplatform.com/docs"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-version">Current API Version</Label>
            <Input
              id="api-version"
              defaultValue="v1"
              readOnly
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-playground">Enable API Playground</Label>
              <p className="text-sm text-gray-400">
                Allow developers to test API endpoints in the documentation
              </p>
            </div>
            <Switch
              id="enable-playground"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
