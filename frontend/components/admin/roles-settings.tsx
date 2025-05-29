"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Plus, Trash2, Users } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
}

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full access to all platform features",
    permissions: ["*"],
    userCount: 2,
    isSystem: true,
  },
  {
    id: "2",
    name: "Company Admin",
    description: "Manage company settings and users",
    permissions: ["company.manage", "users.manage", "orders.view"],
    userCount: 15,
    isSystem: true,
  },
  {
    id: "3",
    name: "Operations Manager",
    description: "Manage operations and logistics",
    permissions: ["orders.manage", "vehicles.manage", "drivers.manage"],
    userCount: 8,
    isSystem: false,
  },
  {
    id: "4",
    name: "Driver",
    description: "Access to driver-specific features",
    permissions: ["orders.view", "routes.view", "profile.manage"],
    userCount: 45,
    isSystem: true,
  },
];

const mockPermissions: Permission[] = [
  {
    id: "company.manage",
    name: "Manage Company",
    category: "Company",
    description: "Create, edit, and delete company settings",
  },
  {
    id: "users.manage",
    name: "Manage Users",
    category: "Users",
    description: "Create, edit, and delete users",
  },
  {
    id: "users.view",
    name: "View Users",
    category: "Users",
    description: "View user information",
  },
  {
    id: "orders.manage",
    name: "Manage Orders",
    category: "Orders",
    description: "Create, edit, and delete orders",
  },
  {
    id: "orders.view",
    name: "View Orders",
    category: "Orders",
    description: "View order information",
  },
  {
    id: "vehicles.manage",
    name: "Manage Vehicles",
    category: "Vehicles",
    description: "Create, edit, and delete vehicles",
  },
  {
    id: "vehicles.view",
    name: "View Vehicles",
    category: "Vehicles",
    description: "View vehicle information",
  },
  {
    id: "drivers.manage",
    name: "Manage Drivers",
    category: "Drivers",
    description: "Create, edit, and delete drivers",
  },
  {
    id: "drivers.view",
    name: "View Drivers",
    category: "Drivers",
    description: "View driver information",
  },
  {
    id: "routes.view",
    name: "View Routes",
    category: "Routes",
    description: "View route information",
  },
  {
    id: "reports.view",
    name: "View Reports",
    category: "Reports",
    description: "View reports and analytics",
  },
  {
    id: "reports.export",
    name: "Export Reports",
    category: "Reports",
    description: "Export reports and data",
  },
  {
    id: "profile.manage",
    name: "Manage Profile",
    category: "Profile",
    description: "Edit own profile information",
  },
];

export function RolesSettings() {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const permissionsByCategory = mockPermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  const handleCreateRole = () => {
    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0,
      isSystem: false,
    };
    setRoles([...roles, role]);
    setNewRole({ name: "", description: "", permissions: [] });
    setIsCreateDialogOpen(false);
    toast({
      title: "Role Created",
      description: `Role "${role.name}" has been created successfully.`,
    });
  };

  const handleEditRole = () => {
    if (!selectedRole) return;

    const updatedRoles = roles.map((role) =>
      role.id === selectedRole.id
        ? {
            ...role,
            name: newRole.name,
            description: newRole.description,
            permissions: newRole.permissions,
          }
        : role
    );
    setRoles(updatedRoles);
    setIsEditDialogOpen(false);
    setSelectedRole(null);
    setNewRole({ name: "", description: "", permissions: [] });
    toast({
      title: "Role Updated",
      description: `Role "${newRole.name}" has been updated successfully.`,
    });
  };

  const handleDeleteRole = (role: Role) => {
    if (role.isSystem) {
      toast({
        title: "Cannot Delete System Role",
        description: "System roles cannot be deleted.",
        variant: "destructive",
      });
      return;
    }

    setRoles(roles.filter((r) => r.id !== role.id));
    toast({
      title: "Role Deleted",
      description: `Role "${role.name}" has been deleted successfully.`,
    });
  };

  const openEditDialog = (role: Role) => {
    setSelectedRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setIsEditDialogOpen(true);
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setNewRole((prev) => ({
        ...prev,
        permissions: [...prev.permissions, permissionId],
      }));
    } else {
      setNewRole((prev) => ({
        ...prev,
        permissions: prev.permissions.filter((p) => p !== permissionId),
      }));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>
                Manage user roles and their permissions
              </CardDescription>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>
                    Create a new role and assign permissions to it.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-name">Role Name</Label>
                    <Input
                      id="role-name"
                      value={newRole.name}
                      onChange={(e) =>
                        setNewRole((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter role name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role-description">Description</Label>
                    <Textarea
                      id="role-description"
                      value={newRole.description}
                      onChange={(e) =>
                        setNewRole((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Enter role description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Permissions</Label>
                    {Object.entries(permissionsByCategory).map(
                      ([category, permissions]) => (
                        <div key={category} className="space-y-2">
                          <h4 className="font-medium text-sm">{category}</h4>
                          <div className="grid grid-cols-1 gap-2 pl-4">
                            {permissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={permission.id}
                                  checked={newRole.permissions.includes(
                                    permission.id
                                  )}
                                  onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                      permission.id,
                                      checked as boolean
                                    )
                                  }
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor={permission.id}
                                    className="text-sm font-normal"
                                  >
                                    {permission.name}
                                  </Label>
                                  <p className="text-xs text-muted-foreground">
                                    {permission.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateRole}
                    disabled={!newRole.name.trim()}
                  >
                    Create Role
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {role.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {role.userCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={role.isSystem ? "secondary" : "default"}>
                      {role.isSystem ? "System" : "Custom"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(role)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {!role.isSystem && (
                          <DropdownMenuItem
                            onClick={() => handleDeleteRole(role)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update the role details and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-role-name">Role Name</Label>
              <Input
                id="edit-role-name"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter role name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role-description">Description</Label>
              <Textarea
                id="edit-role-description"
                value={newRole.description}
                onChange={(e) =>
                  setNewRole((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter role description"
                rows={3}
              />
            </div>
            <div className="space-y-4">
              <Label>Permissions</Label>
              {Object.entries(permissionsByCategory).map(
                ([category, permissions]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-sm">{category}</h4>
                    <div className="grid grid-cols-1 gap-2 pl-4">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`edit-${permission.id}`}
                            checked={newRole.permissions.includes(
                              permission.id
                            )}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                permission.id,
                                checked as boolean
                              )
                            }
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={`edit-${permission.id}`}
                              className="text-sm font-normal"
                            >
                              {permission.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditRole} disabled={!newRole.name.trim()}>
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
