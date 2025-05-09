"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  AlertCircle,
  Bell,
  Clock,
  Eye,
  HelpCircle,
  Info,
  Link2,
  LogOut,
  Mail,
  MessageSquare,
  Save,
  Shield,
  Smartphone,
  Trash2,
  Truck,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareProfileInfo: true,
    shareLocationData: true,
    allowDataAnalytics: true,
    marketingCommunications: false,
    dataRetentionPeriod: "1-year",
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    driverUpdates: true,
    systemAlerts: true,
    marketingEmails: false,
    notificationFrequency: "immediate",
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginNotifications: true,
    securityQuestions: false,
  });

  // Support settings
  const [supportSettings, setSupportSettings] = useState({
    preferredContactMethod: "email",
    feedbackMessage: "",
  });

  // Active sessions
  const [activeSessions] = useState([
    {
      id: "session-1",
      device: "Chrome on Windows",
      location: "New York, USA",
      lastActive: "Just now",
      current: true,
    },
    {
      id: "session-2",
      device: "Safari on iPhone",
      location: "Boston, USA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "session-3",
      device: "Firefox on MacOS",
      location: "Chicago, USA",
      lastActive: "Yesterday",
      current: false,
    },
  ]);

  // Connected services
  const [connectedServices] = useState([
    {
      id: "service-1",
      name: "GPS Tracking",
      status: "Connected",
      lastSync: "10 minutes ago",
    },
    {
      id: "service-2",
      name: "Payment Gateway",
      status: "Not connected",
      lastSync: "Never",
    },
    {
      id: "service-3",
      name: "CRM Integration",
      status: "Connected",
      lastSync: "1 hour ago",
    },
  ]);

  const handlePrivacyChange = (setting: string, value: any) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: value,
    });
  };

  const handleNotificationChange = (setting: string, value: any) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value,
    });
  };

  const handleSecurityChange = (setting: string, value: any) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: value,
    });
  };

  const handleSupportChange = (setting: string, value: any) => {
    setSupportSettings({
      ...supportSettings,
      [setting]: value,
    });
  };

  const handleSaveSettings = (section: string) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: `${section} settings saved`,
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleLogoutSession = (sessionId: string) => {
    // Simulate API call
    toast({
      title: "Session logged out",
      description: "The selected session has been terminated.",
    });
  };

  const handleResetPassword = () => {
    // Simulate API call
    toast({
      title: "Password reset email sent",
      description:
        "Please check your email for instructions to reset your password.",
    });
  };

  const handleDeleteAccount = () => {
    // Simulate API call
    toast({
      title: "Account deletion requested",
      description:
        "Your account deletion request has been submitted. Our team will contact you shortly.",
      variant: "destructive",
    });
  };

  const handleConnectService = (serviceId: string) => {
    // Simulate API call
    toast({
      title: "Service connection initiated",
      description: "Please follow the instructions to complete the connection.",
    });
  };

  const handleSubmitFeedback = () => {
    if (!supportSettings.feedbackMessage) {
      toast({
        title: "Feedback required",
        description: "Please enter your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSupportSettings({
        ...supportSettings,
        feedbackMessage: "",
      });
      toast({
        title: "Feedback submitted",
        description:
          "Thank you for your feedback. Our team will review it shortly.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="privacy" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="help">Help & Support</TabsTrigger>
        </TabsList>

        {/* Privacy Settings Tab */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage how your information is used and shared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 border-b border-white/10 pb-4">
                <h3 className="text-lg font-medium">Data Visibility</h3>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="shareProfileInfo" className="flex-1">
                      Share profile information with other users
                    </Label>
                  </div>
                  <Switch
                    id="shareProfileInfo"
                    checked={privacySettings.shareProfileInfo}
                    onCheckedChange={(checked) =>
                      handlePrivacyChange("shareProfileInfo", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="shareLocationData" className="flex-1">
                      Share location data for tracking
                    </Label>
                  </div>
                  <Switch
                    id="shareLocationInfo"
                    checked={privacySettings.shareLocationInfo}
                    onCheckedChange={(checked) =>
                      handlePrivacyChange("shareLocationInfo", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4 border-b border-white/10 pb-4">
                <h3 className="text-lg font-medium">Data Usage</h3>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="allowDataAnalytics" className="flex-1">
                      Allow data analytics to improve services
                    </Label>
                  </div>
                  <Switch
                    id="allowDataAnalytics"
                    checked={privacySettings.allowDataAnalytics}
                    onCheckedChange={(checked) =>
                      handlePrivacyChange("allowDataAnalytics", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="marketingCommunications" className="flex-1">
                      Receive marketing communications
                    </Label>
                  </div>
                  <Switch
                    id="marketingCommunications"
                    checked={privacySettings.marketingCommunications}
                    onCheckedChange={(checked) =>
                      handlePrivacyChange("marketingCommunications", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4 border-b border-white/10 pb-6">
                <h3 className="text-lg font-medium">Data Retention</h3>
                <div className="grid gap-2">
                  <Label htmlFor="dataRetentionPeriod">
                    Data retention period
                  </Label>
                  <Select
                    value={privacySettings.dataRetentionPeriod}
                    onValueChange={(value) =>
                      handlePrivacyChange("dataRetentionPeriod", value)
                    }
                  >
                    <SelectTrigger
                      id="dataRetentionPeriod"
                      className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:ring-blue-500 hover:bg-[#1e293b]"
                    >
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1526] border border-white/10 rounded-md">
                      <SelectItem
                        value="6-months"
                        className="hover:bg-[#1e293b]"
                      >
                        6 months
                      </SelectItem>
                      <SelectItem value="1-year" className="hover:bg-[#1e293b]">
                        1 year
                      </SelectItem>
                      <SelectItem
                        value="2-years"
                        className="hover:bg-[#1e293b]"
                      >
                        2 years
                      </SelectItem>
                      <SelectItem
                        value="indefinite"
                        className="hover:bg-[#1e293b]"
                      >
                        Indefinite
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    This determines how long we keep your data after account
                    closure
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Legal Documents</h3>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Terms of Service
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("Privacy")}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="mr-2 h-4 w-4 " />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications from the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 border-b border-white/10 pb-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="emailNotifications" className="flex-1">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("emailNotifications", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="smsNotifications" className="flex-1">
                      SMS Notifications
                    </Label>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("smsNotifications", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="pushNotifications" className="flex-1">
                      Push Notifications
                    </Label>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("pushNotifications", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4 border-b border-white/10 pb-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="orderUpdates" className="flex-1">
                      Order Updates
                    </Label>
                  </div>
                  <Switch
                    id="orderUpdates"
                    checked={notificationSettings.orderUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("orderUpdates", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="driverUpdates" className="flex-1">
                      Driver Updates
                    </Label>
                  </div>
                  <Switch
                    id="driverUpdates"
                    checked={notificationSettings.driverUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("driverUpdates", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="systemAlerts" className="flex-1">
                      System Alerts
                    </Label>
                  </div>
                  <Switch
                    id="systemAlerts"
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("systemAlerts", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="marketingEmails" className="flex-1">
                      Marketing Emails
                    </Label>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("marketingEmails", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Frequency</h3>
                <div className="grid gap-2">
                  <Label htmlFor="notificationFrequency">
                    Delivery Frequency
                  </Label>
                  <Select
                    value={notificationSettings.notificationFrequency}
                    onValueChange={(value) =>
                      handleNotificationChange("notificationFrequency", value)
                    }
                  >
                    <SelectTrigger
                      id="notificationFrequency"
                      className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:ring-blue-500 hover:bg-[#1e293b]"
                    >
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1526] border border-white/10 rounded-md">
                      <SelectItem
                        value="immediate"
                        className="hover:bg-[#1e293b]"
                      >
                        Immediate
                      </SelectItem>
                      <SelectItem value="hourly" className="hover:bg-[#1e293b]">
                        Hourly Digest
                      </SelectItem>
                      <SelectItem value="daily" className="hover:bg-[#1e293b]">
                        Daily Digest
                      </SelectItem>
                      <SelectItem value="weekly" className="hover:bg-[#1e293b]">
                        Weekly Digest
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose how frequently you want to receive notification
                    digests
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("Notifications")}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 border-b border-white/10 pb-4">
                <h3 className="text-lg font-medium">Password Management</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="border border-white/10"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      className="border border-white/10"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="border border-white/10"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={handleResetPassword}>
                      Reset Password
                    </Button>
                    <Button
                      onClick={() => handleSaveSettings("Password")}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4 border-b border-white/10 pb-4">
                <h3 className="text-lg font-medium">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="twoFactorAuth" className="flex-1">
                      Enable Two-Factor Authentication
                    </Label>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      handleSecurityChange("twoFactorAuth", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
                {securitySettings.twoFactorAuth && (
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex flex-col space-y-2">
                      <h4 className="font-medium">
                        Setup Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Scan the QR code with your authenticator app or enter
                        the code manually.
                      </p>
                      <div className="flex justify-center py-4">
                        <div className="h-40 w-40 bg-white flex items-center justify-center rounded-md">
                          <span className="text-sm text-muted-foreground">
                            QR Code Placeholder
                          </span>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="verificationCode">
                          Verification Code
                        </Label>
                        <Input
                          id="verificationCode"
                          placeholder="Enter 6-digit code"
                          className="border border-white/10"
                        />
                      </div>
                      <div className="pt-2">
                        <Button>Verify and Enable</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Management</h3>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="sessionTimeout">
                      Session Timeout (minutes)
                    </Label>
                  </div>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      handleSecurityChange("sessionTimeout", e.target.value)
                    }
                    className="border border-white/10"
                    min="5"
                    max="120"
                  />
                  <p className="text-sm text-muted-foreground">
                    Your session will expire after this period of inactivity
                  </p>
                </div>
              </div>

              <div className="space-y-4 ">
                <h3 className="text-lg font-medium">Active Sessions</h3>
                <div className="rounded-md border border border-white/10">
                  {activeSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border-b border-white/10 last:border-0"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{session.device}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{session.location}</span>
                          <span className="mx-2">•</span>
                          <span>{session.lastActive}</span>
                          {session.current && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="text-green-500">
                                Current session
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {!session.current && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLogoutSession(session.id)}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Login Notifications</h3>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="loginNotifications" className="flex-1">
                      Receive notifications for new logins
                    </Label>
                  </div>
                  <Switch
                    id="loginNotifications"
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) =>
                      handleSecurityChange("loginNotifications", checked)
                    }
                    className="data-[state=unchecked]:bg-[#1e293b] bg-[#0d1526] border border-white/10 rounded-full h-6 w-11 data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("Security")}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Help & Support Tab */}
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>
                Get assistance and provide feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 ">
                <h3 className="text-lg font-medium">
                  Frequently Asked Questions
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I create a new shipment?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/70 px-3 py-2">
                      To create a new shipment, navigate to the Orders section
                      in the dashboard and click on the "New Order" button. Fill
                      in the required information and submit the form.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How do I track my shipments?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/70 px-3 py-2">
                      You can track your shipments by going to the Orders
                      section and clicking on the specific order you want to
                      track. The order details page will show the current status
                      and location of your shipment.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      How do I add a new driver to my fleet?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/70 px-3 py-2">
                      To add a new driver, go to the Fleet section, select the
                      Drivers tab, and click on the "New Driver" button. Fill in
                      the driver's information and submit the form.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      How do I generate reports?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/70 px-3 py-2">
                      You can generate reports by navigating to the Reports
                      section in the dashboard. Select the type of report you
                      want to generate, specify the date range and other
                      parameters, and click on the "Generate Report" button.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      How do I update my account information?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/70 px-3 py-2">
                      To update your account information, go to the Settings
                      section and select the appropriate tab (e.g., Profile,
                      Security). Make the necessary changes and click on the
                      "Save Changes" button.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <Separator />

              <div className="space-y-4 border-b border-white/10 pb-4">
                <h3 className="text-lg font-medium">Contact Support</h3>
                <div className="rounded-md bg-muted p-4 bg-[#1e293b]">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/support-agent.png" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Support Center</h4>
                      <p className="text-sm text-muted-foreground">
                        Our support team is available 24/7 to assist you
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">support@logisticsapp.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Live Chat (Available 9 AM - 5 PM EST)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Knowledge Base
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4 border-b border-white/10 pb-4">
                <h3 className="text-lg font-medium">Provide Feedback</h3>
                <div className="grid gap-2">
                  <Label htmlFor="preferredContactMethod">
                    Preferred Contact Method
                  </Label>
                  <Select
                    value={supportSettings.preferredContactMethod}
                    onValueChange={(value) =>
                      handleSupportChange("preferredContactMethod", value)
                    }
                  >
                    <SelectTrigger
                      id="preferredContactMethod"
                      className="w-full px-3 py-2 bg-[#0d1526] border border-white/10 rounded-md text-white focus:ring-blue-500 hover:bg-[#1e293b]"
                    >
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1526] border border-white/10 rounded-md">
                      <SelectItem
                        value="email"
                        className="hover:bg-[#1e293b] text-white"
                      >
                        Email
                      </SelectItem>
                      <SelectItem
                        value="phone"
                        className="hover:bg-[#1e293b] text-white"
                      >
                        Phone
                      </SelectItem>
                      <SelectItem
                        value="none"
                        className="hover:bg-[#1e293b] text-white"
                      >
                        No Contact Needed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="feedbackMessage">Your Feedback</Label>
                  <Textarea
                    id="feedbackMessage"
                    placeholder="Share your thoughts, suggestions, or report issues..."
                    value={supportSettings.feedbackMessage}
                    onChange={(e) =>
                      handleSupportChange("feedbackMessage", e.target.value)
                    }
                    className="border border-white/10"
                    rows={5}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmitFeedback}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Documentation & Tutorials
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border border-white/10 p-4 ">
                    <h4 className="font-medium">Getting Started Guide</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn the basics of using the logistics platform
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      View Guide
                    </Button>
                  </div>
                  <div className="rounded-md border border-white/10 p-4">
                    <h4 className="font-medium">Video Tutorials</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Watch step-by-step tutorials on key features
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      Watch Videos
                    </Button>
                  </div>
                  <div className="rounded-md border border-white/10 p-4">
                    <h4 className="font-medium">API Documentation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Technical documentation for developers
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      View Docs
                    </Button>
                  </div>
                  <div className="rounded-md border border-white/10 p-4">
                    <h4 className="font-medium">Best Practices</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tips and tricks for optimal usage
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      Learn More
                    </Button>
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
