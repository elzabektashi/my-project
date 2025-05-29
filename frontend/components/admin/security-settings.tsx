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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export function SecuritySettings() {
  const { toast } = useToast();
  const [passwordLength, setPasswordLength] = useState([12]);

  const handleSave = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 bg-[#0d1526]">
      <Card className="bg-[#0d1526] border-white/10">
        <CardHeader>
          <CardTitle>Password Policy</CardTitle>
          <CardDescription>
            Configure password requirements for all users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password-length">
                Minimum Password Length: {passwordLength[0]}
              </Label>
            </div>
            <Slider
              id="password-length"
              min={8}
              max={24}
              step={1}
              value={passwordLength}
              onValueChange={setPasswordLength}
              className="border-white/10"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-uppercase">
                Require Uppercase Letters
              </Label>
              <p className="text-sm text-muted-foreground">
                Passwords must contain at least one uppercase letter
              </p>
            </div>
            <Switch
              id="require-uppercase"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-lowercase">
                Require Lowercase Letters
              </Label>
              <p className="text-sm text-muted-foreground">
                Passwords must contain at least one lowercase letter
              </p>
            </div>
            <Switch
              id="require-lowercase"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-numbers">Require Numbers</Label>
              <p className="text-sm text-muted-foreground">
                Passwords must contain at least one number
              </p>
            </div>
            <Switch
              id="require-numbers"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-symbols">
                Require Special Characters
              </Label>
              <p className="text-sm text-muted-foreground">
                Passwords must contain at least one special character
              </p>
            </div>
            <Switch
              id="require-symbols"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="password-expiry">Password Expiry</Label>
              <p className="text-sm text-muted-foreground">
                Force users to change their password periodically
              </p>
            </div>
            <Select defaultValue="90">
              <SelectTrigger className="w-[180px] border-white/10">
                <SelectValue placeholder="Select expiry period" />
              </SelectTrigger>
              <SelectContent className="bg-[#0d1526] border-white/10">
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="60">60 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="180">180 Days</SelectItem>
                <SelectItem value="365">365 Days</SelectItem>
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
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Configure two-factor authentication settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-2fa">Require 2FA for All Users</Label>
              <p className="text-sm text-muted-foreground">
                Force all users to set up two-factor authentication
              </p>
            </div>
            <Switch
              id="require-2fa"
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-admin-2fa">Require 2FA for Admins</Label>
              <p className="text-sm text-muted-foreground">
                Force all admin users to set up two-factor authentication
              </p>
            </div>
            <Switch
              id="require-admin-2fa"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="2fa-methods">Allowed 2FA Methods</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="2fa-app"
                  defaultChecked
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="2fa-app">Authenticator App</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="2fa-sms"
                  defaultChecked
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="2fa-sms">SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="2fa-email"
                  defaultChecked
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="2fa-email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="2fa-security-key"
                  className="data-[state=unchecked]:bg-[#1e293b]"
                />
                <Label htmlFor="2fa-security-key">
                  Security Key (WebAuthn)
                </Label>
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
          <CardTitle>Session Settings</CardTitle>
          <CardDescription>Configure user session settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout</Label>
            <Select defaultValue="60">
              <SelectTrigger id="session-timeout" className="border-white/10">
                <SelectValue placeholder="Select timeout period" />
              </SelectTrigger>
              <SelectContent className="bg-[#0d1526] border-white/10">
                <SelectItem value="15">15 Minutes</SelectItem>
                <SelectItem value="30">30 Minutes</SelectItem>
                <SelectItem value="60">1 Hour</SelectItem>
                <SelectItem value="120">2 Hours</SelectItem>
                <SelectItem value="240">4 Hours</SelectItem>
                <SelectItem value="480">8 Hours</SelectItem>
                <SelectItem value="720">12 Hours</SelectItem>
                <SelectItem value="1440">24 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="concurrent-sessions">
                Allow Concurrent Sessions
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow users to be logged in from multiple devices simultaneously
              </p>
            </div>
            <Switch
              id="concurrent-sessions"
              defaultChecked
              className="data-[state=unchecked]:bg-[#1e293b]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="remember-me">Allow "Remember Me" Option</Label>
              <p className="text-sm text-muted-foreground">
                Allow users to stay logged in for extended periods
              </p>
            </div>
            <Switch
              id="remember-me"
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
