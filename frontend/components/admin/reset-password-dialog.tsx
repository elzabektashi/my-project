"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  companyId: string;
  role: string;
  status: string;
  lastActive: string;
  avatar: string;
}

export function ResetPasswordDialog({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    // In a real app, you would call an API to reset the password
    toast({
      title: "Password Reset Email Sent",
      description: `A password reset email has been sent to ${user.email}.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset User Password</DialogTitle>
          <DialogDescription>
            This will send a password reset email to the user.
          </DialogDescription>
        </DialogHeader>
        <Alert
          variant="default"
          className="bg-yellow-100 border-yellow-400 text-yellow-800"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action will invalidate the user's current password. They will
            need to create a new password to access their account.
          </AlertDescription>
        </Alert>
        <div className="py-4">
          <p>Are you sure you want to reset the password for:</p>
          <p className="font-medium">
            {user.name} ({user.email})
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleReset}>
            Reset Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
