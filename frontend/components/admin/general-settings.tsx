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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

export function GeneralSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6 bg-[#0d1526]">
      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Platform Information</CardTitle>
          <CardDescription>
            Configure basic platform information and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input
              id="platform-name"
              defaultValue="Logistics Management Platform"
              className="border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platform-description">Platform Description</Label>
            <Textarea
              id="platform-description"
              defaultValue="A comprehensive logistics management platform for companies of all sizes."
              rows={3}
              className="border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input
              id="support-email"
              type="email"
              defaultValue="support@logisticsplatform.com"
              className="border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-phone">Support Phone</Label>
            <Input
              id="support-phone"
              defaultValue="+1 (555) 123-4567"
              className="border-white/10"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Regional Settings</CardTitle>
          <CardDescription>
            Configure regional settings for the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timezone">Default Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger id="timezone" className="border-white/10">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent className="bg-[#0d1526] border-white/10">
                <SelectItem value="utc">
                  UTC (Coordinated Universal Time)
                </SelectItem>
                <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                <SelectItem value="mst">
                  MST (Mountain Standard Time)
                </SelectItem>
                <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-format">Date Format</Label>
            <Select defaultValue="mdy">
              <SelectTrigger id="date-format" className="border-white/10">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent className="bg-[#0d1526] border-white/10">
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger id="currency" className="border-white/10">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-[#0d1526] border-white/10">
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="cad">CAD (C$)</SelectItem>
                <SelectItem value="aud">AUD (A$)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="distance-unit">Distance Unit</Label>
            <Select defaultValue="miles">
              <SelectTrigger id="distance-unit" className="border-white/10">
                <SelectValue placeholder="Select distance unit" />
              </SelectTrigger>
              <SelectContent className="bg-[#0d1526] border-white/10">
                <SelectItem value="miles">Miles</SelectItem>
                <SelectItem value="kilometers">Kilometers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
          <CardDescription>Enable or disable platform features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="toggle-maintenance">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Put the platform in maintenance mode
              </p>
            </div>
            <Switch
              id="toggle-maintenance"
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="toggle-registration">User Registration</Label>
              <p className="text-sm text-muted-foreground">
                Allow new users to register
              </p>
            </div>
            <Switch
              id="toggle-registration"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="toggle-company-registration">
                Company Registration
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow new companies to register
              </p>
            </div>
            <Switch
              id="toggle-company-registration"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="toggle-api">Public API</Label>
              <p className="text-sm text-muted-foreground">
                Enable public API access
              </p>
            </div>
            <Switch
              id="toggle-api"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="toggle-analytics">Usage Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Collect anonymous usage analytics
              </p>
            </div>
            <Switch
              id="toggle-analytics"
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
