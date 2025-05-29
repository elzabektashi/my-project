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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export function NotificationSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email">Email Notifications</TabsTrigger>
          <TabsTrigger value="inapp">In-App Notifications</TabsTrigger>
          <TabsTrigger value="push">Push Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Settings</CardTitle>
              <CardDescription>
                Configure when and how email notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-enabled">
                    Enable Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications to users
                  </p>
                </div>
                <Switch id="email-enabled" defaultChecked />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">User Events</h4>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-welcome">Welcome Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Send welcome email to new users
                      </p>
                    </div>
                    <Switch id="email-welcome" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-password-reset">
                        Password Reset
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Send password reset emails
                      </p>
                    </div>
                    <Switch id="email-password-reset" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-account-changes">
                        Account Changes
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notify users of account modifications
                      </p>
                    </div>
                    <Switch id="email-account-changes" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Order Events</h4>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-order-created">Order Created</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when new orders are created
                      </p>
                    </div>
                    <Switch id="email-order-created" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-order-updated">
                        Order Status Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when order status changes
                      </p>
                    </div>
                    <Switch id="email-order-updated" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-order-completed">
                        Order Completed
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when orders are completed
                      </p>
                    </div>
                    <Switch id="email-order-completed" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">System Events</h4>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-maintenance">
                        Maintenance Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notify users of scheduled maintenance
                      </p>
                    </div>
                    <Switch id="email-maintenance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-security">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Send security-related notifications
                      </p>
                    </div>
                    <Switch id="email-security" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-frequency">Email Frequency</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger id="email-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="inapp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>In-App Notification Settings</CardTitle>
              <CardDescription>
                Configure in-app notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="inapp-enabled">
                    Enable In-App Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Show notifications within the application
                  </p>
                </div>
                <Switch id="inapp-enabled" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-position">
                  Notification Position
                </Label>
                <Select defaultValue="top-right">
                  <SelectTrigger id="notification-position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-duration">
                  Auto-dismiss Duration (seconds)
                </Label>
                <Input
                  id="notification-duration"
                  type="number"
                  defaultValue="5"
                  min="1"
                  max="30"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-enabled">Enable Sound</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sound for notifications
                  </p>
                </div>
                <Switch id="sound-enabled" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-sound">Notification Sound</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="notification-sound">
                    <SelectValue placeholder="Select sound" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="chime">Chime</SelectItem>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="push" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Push Notification Settings</CardTitle>
              <CardDescription>
                Configure browser and mobile push notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-enabled">
                    Enable Push Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Send push notifications to browsers and mobile devices
                  </p>
                </div>
                <Switch id="push-enabled" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vapid-public-key">VAPID Public Key</Label>
                <Input
                  id="vapid-public-key"
                  placeholder="Enter VAPID public key"
                  defaultValue="BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vapid-private-key">VAPID Private Key</Label>
                <Input
                  id="vapid-private-key"
                  type="password"
                  placeholder="Enter VAPID private key"
                  defaultValue="••••••••••••••••••••••••••••••••••••••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="push-endpoint">Push Service Endpoint</Label>
                <Input
                  id="push-endpoint"
                  placeholder="Enter push service endpoint"
                  defaultValue="https://fcm.googleapis.com/fcm/send"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Push Notification Events</h4>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-urgent-orders">Urgent Orders</Label>
                      <p className="text-sm text-muted-foreground">
                        Push notifications for urgent orders
                      </p>
                    </div>
                    <Switch id="push-urgent-orders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-system-alerts">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Push notifications for system alerts
                      </p>
                    </div>
                    <Switch id="push-system-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-reminders">Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Push notifications for reminders
                      </p>
                    </div>
                    <Switch id="push-reminders" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
