"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("user");
  const [adminCode, setAdminCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      role,
      adminCode: role === "admin" ? adminCode : undefined,
      // other fields should be collected here using refs or state if needed
    };

    console.log("Form data:", formData);

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link
        href="/"
        className="absolute left-8 top-8 flex items-center gap-2 md:left-12 md:top-12"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Truck className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">LogiFlow</span>
      </Link>
      <div className="text-white flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
        <Card className="flex flex-col gap-4 p-6 shadow-sm transition-all hover:shadow-md border border-[#1b2638] bg-[#0a0e1a] text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    required
                    className="bg-transparent border border-[#1b2638] text-white placeholder:text-[#8e9cb1] focus-visible:ring-1 focus-visible:ring-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    required
                    className="bg-transparent border border-[#1b2638] text-white placeholder:text-[#8e9cb1] focus-visible:ring-1 focus-visible:ring-white/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-transparent border border-[#1b2638] text-white placeholder:text-[#8e9cb1] focus-visible:ring-1 focus-visible:ring-white/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company name</Label>
                <Input
                  id="company"
                  required
                  className="bg-transparent border border-[#1b2638] text-white placeholder:text-[#8e9cb1] focus-visible:ring-1 focus-visible:ring-white/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-transparent border border-[#1b2638] text-white focus-visible:ring-1 focus-visible:ring-[#1b2638] rounded-md"
                />
              </div>

              {/* 🚀 Role selection dropdown */}
              <div className="relative space-y-2">
                <Label htmlFor="role">Register as</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full appearance-none bg-[#0a0e1a] border border-[#1b2638] text-white px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/40"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                {/* Chevron Icon */}
                <div className="pointer-events-none absolute right-3 top-[38px] text-white">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 0 1 1.4-1.4L10 9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-.7.3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              
              {/* 🚀 Admin code input (only if admin is selected) */}
              {role === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="admin-code">Admin Access Code</Label>
                  <Input
                    id="admin-code"
                    type="text"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Enter admin code"
                    required
                    className="bg-transparent border border-[#1b2638] text-white placeholder:text-[#8e9cb1] focus-visible:ring-1 focus-visible:ring-white/40"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    privacy policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <div className="relative my-4 w-full">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full border-t"
                  style={{ borderColor: "#1b2638" }}
                ></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className="bg-[#0a0e1a] px-2"
                  style={{ color: "#8e9cb1" }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full border-[#1b2638] transition-all hover:bg-[#1e293b] hover:border-transparent"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>

              <Button
                variant="outline"
                className="w-full border-[#1b2638] transition-all hover:bg-[#1e293b] hover:border-transparent"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill="currentColor"
                  />
                </svg>
                Facebook
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
