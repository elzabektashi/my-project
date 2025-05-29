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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function EmailSettings() {
  const { toast } = useToast();
  const [smtpPassword, setSmtpPassword] = useState("••••••••••••••••");

  const handleSave = () => {
    toast({
      title: "Email Settings Saved",
      description: "Your email settings have been updated successfully.",
    });
  };

  const handleTestEmail = () => {
    toast({
      title: "Test Email Sent",
      description: "A test email has been sent to the specified address.",
    });
  };

  return (
    <div className="space-y-6 bg-[#0d1526]">
      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>SMTP Configuration</CardTitle>
          <CardDescription>
            Configure the SMTP server for sending emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smtp-host">SMTP Host</Label>
            <Input
              id="smtp-host"
              defaultValue="smtp.example.com"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-port">SMTP Port</Label>
            <Input
              id="smtp-port"
              defaultValue="587"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-username">SMTP Username</Label>
            <Input
              id="smtp-username"
              defaultValue="notifications@example.com"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-password">SMTP Password</Label>
            <Input
              id="smtp-password"
              type="password"
              value={smtpPassword}
              onChange={(e) => setSmtpPassword(e.target.value)}
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-encryption">Encryption</Label>
            <Select defaultValue="tls">
              <SelectTrigger id="smtp-encryption" className="border-white/10">
                <SelectValue placeholder="Select encryption type" />
              </SelectTrigger>
              <SelectContent className="bg-[#0d1526] border-white/10">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="ssl">SSL</SelectItem>
                <SelectItem value="tls">TLS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="smtp-auth">Use SMTP Authentication</Label>
              <p className="text-sm text-gray-400">
                Enable SMTP authentication for sending emails
              </p>
            </div>
            <Switch
              id="smtp-auth"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-email">From Email Address</Label>
            <Input
              id="from-email"
              defaultValue="notifications@logisticsplatform.com"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-name">From Name</Label>
            <Input
              id="from-name"
              defaultValue="Logistics Platform"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply-to">Reply-To Email Address</Label>
            <Input
              id="reply-to"
              defaultValue="support@logisticsplatform.com"
              className="border-white/10 text-gray-200"
            />
          </div>
          <div className="pt-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter test email address"
                className="border-white/10 text-gray-200"
              />
              <Button onClick={handleTestEmail}>Send Test Email</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>
            Configure email templates for various notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="welcome">
            <TabsList className="inline-flex bg-[#1d283a] rounded p-1 space-x-2">
              <TabsTrigger value="welcome">Welcome</TabsTrigger>
              <TabsTrigger value="reset-password">Reset Password</TabsTrigger>
              <TabsTrigger value="order-confirmation">
                Order Confirmation
              </TabsTrigger>
              <TabsTrigger value="invoice">Invoice</TabsTrigger>
            </TabsList>
            <TabsContent
              value="welcome"
              className="space-y-4 pt-4 bg-[#0d1526]"
            >
              <div className="space-y-2">
                <Label htmlFor="welcome-subject">Subject</Label>
                <Input
                  id="welcome-subject"
                  defaultValue="Welcome to Logistics Platform"
                  className="border-white/10 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcome-template">Email Body</Label>
                <Textarea
                  id="welcome-template"
                  rows={10}
                  defaultValue={`<h1>Welcome to Logistics Platform!</h1>
<p>Dear {{name}},</p>
<p>Thank you for joining Logistics Platform. We're excited to have you on board!</p>
<p>Your account has been created successfully. You can now log in using your email and password.</p>
<p>If you have any questions, please don't hesitate to contact our support team.</p>
<p>Best regards,<br>The Logistics Platform Team</p>`}
                  className="border-white/10 text-gray-200"
                />
              </div>
            </TabsContent>
            <TabsContent
              value="reset-password"
              className="space-y-4 pt-4 bg-[#0d1526]"
            >
              <div className="space-y-2">
                <Label htmlFor="reset-subject">Subject</Label>
                <Input
                  id="reset-subject"
                  defaultValue="Reset Your Password"
                  className="border-white/10 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reset-template">Email Body</Label>
                <Textarea
                  id="reset-template"
                  rows={10}
                  defaultValue={`<h1>Reset Your Password</h1>
<p>Dear {{name}},</p>
<p>We received a request to reset your password. Click the button below to create a new password:</p>
<p><a href="{{resetLink}}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a></p>
<p>If you didn't request a password reset, you can ignore this email.</p>
<p>Best regards,<br>The Logistics Platform Team</p>`}
                  className="border-white/10 text-gray-200"
                />
              </div>
            </TabsContent>
            <TabsContent
              value="order-confirmation"
              className="space-y-4 pt-4 bg-[#0d1526]"
            >
              <div className="space-y-2">
                <Label htmlFor="order-subject">Subject</Label>
                <Input
                  id="order-subject"
                  defaultValue="Order Confirmation - #{{orderNumber}}"
                  className="border-white/10 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-template">Email Body</Label>
                <Textarea
                  id="order-template"
                  rows={10}
                  defaultValue={`<h1>Order Confirmation</h1>
<p>Dear {{name}},</p>
<p>Thank you for your order. We're pleased to confirm that we've received your order #{{orderNumber}}.</p>
<p>Order Details:</p>
<ul>
  <li>Order Number: {{orderNumber}}</li>
  <li>Order Date: {{orderDate}}</li>
  <li>Total Amount: {{totalAmount}}</li>
</ul>
<p>You can track your order status by logging into your account.</p>
<p>Best regards,<br>The Logistics Platform Team</p>`}
                  className="border-white/10 text-gray-200"
                />
              </div>
            </TabsContent>
            <TabsContent
              value="invoice"
              className="space-y-4 pt-4 bg-[#0d1526]"
            >
              <div className="space-y-2">
                <Label htmlFor="invoice-subject">Subject</Label>
                <Input
                  id="invoice-subject"
                  defaultValue="Invoice #{{invoiceNumber}} for Order #{{orderNumber}}"
                  className="border-white/10 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-template">Email Body</Label>
                <Textarea
                  id="invoice-template"
                  rows={10}
                  defaultValue={`<h1>Invoice #{{invoiceNumber}}</h1>
<p>Dear {{name}},</p>
<p>Please find attached your invoice #{{invoiceNumber}} for order #{{orderNumber}}.</p>
<p>Invoice Details:</p>
<ul>
  <li>Invoice Number: {{invoiceNumber}}</li>
  <li>Invoice Date: {{invoiceDate}}</li>
  <li>Due Date: {{dueDate}}</li>
  <li>Total Amount: {{totalAmount}}</li>
</ul>
<p>If you have any questions about this invoice, please contact our support team.</p>
<p>Best regards,<br>The Logistics Platform Team</p>`}
                  className="border-white/10 text-gray-200"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
