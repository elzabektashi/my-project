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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

// Mock permissions data
const permissions = [
  {
    category: "Orders",
    items: [
      { id: "orders-view", label: "View Orders" },
      { id: "orders-create", label: "Create Orders" },
      { id: "orders-edit", label: "Edit Orders" },
      { id: "orders-delete", label: "Delete Orders" },
    ],
  },
  {
    category: "Vehicles",
    items: [
      { id: "vehicles-view", label: "View Vehicles" },
      { id: "vehicles-create", label: "Create Vehicles" },
      { id: "vehicles-edit", label: "Edit Vehicles" },
      { id: "vehicles-delete", label: "Delete Vehicles" },
    ],
  },
  {
    category: "Drivers",
    items: [
      { id: "drivers-view", label: "View Drivers" },
      { id: "drivers-create", label: "Create Drivers" },
      { id: "drivers-edit", label: "Edit Drivers" },
      { id: "drivers-delete", label: "Delete Drivers" },
    ],
  },
  {
    category: "Reports",
    items: [
      { id: "reports-view", label: "View Reports" },
      { id: "reports-create", label: "Create Reports" },
      { id: "reports-export", label: "Export Reports" },
    ],
  },
];

export function ManageRolesDialog({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // In a real app, you would fetch the user's current permissions
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "orders-view",
    "vehicles-view",
    "drivers-view",
    "reports-view",
  ]);

  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions((current) =>
      current.includes(permissionId)
        ? current.filter((id) => id !== permissionId)
        : [...current, permissionId]
    );
  };

  const handleSave = () => {
    // In a real app, you would call an API to update the user's permissions
    toast({
      title: "Permissions Updated",
      description: `Permissions for ${user.name} have been updated successfully.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage User Roles & Permissions</DialogTitle>
          <DialogDescription>
            Configure what {user.name} can access and modify within the
            platform.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto py-4">
          {permissions.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="mb-3 font-medium">{category.category}</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {category.items.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={() =>
                        handlePermissionChange(permission.id)
                      }
                    />
                    <Label htmlFor={permission.id}>{permission.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
