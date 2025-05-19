"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for user activity
const loginActivityData = [
  { hour: "00:00", logins: 45 },
  { hour: "02:00", logins: 30 },
  { hour: "04:00", logins: 20 },
  { hour: "06:00", logins: 35 },
  { hour: "08:00", logins: 120 },
  { hour: "10:00", logins: 180 },
  { hour: "12:00", logins: 150 },
  { hour: "14:00", logins: 170 },
  { hour: "16:00", logins: 160 },
  { hour: "18:00", logins: 110 },
  { hour: "20:00", logins: 85 },
  { hour: "22:00", logins: 60 },
];

const userRoleData = [
  { name: "Admin", value: 15, color: "#3b82f6" },
  { name: "Manager", value: 45, color: "#10b981" },
  { name: "Dispatcher", value: 80, color: "#f59e0b" },
  { name: "Driver", value: 120, color: "#ef4444" },
  { name: "Customer", value: 200, color: "#8b5cf6" },
];

const userDeviceData = [
  { name: "Desktop", value: 65, color: "#3b82f6" },
  { name: "Mobile", value: 30, color: "#10b981" },
  { name: "Tablet", value: 5, color: "#f59e0b" },
];

const userActionData = [
  { action: "View", count: 4500 },
  { action: "Create", count: 1200 },
  { action: "Update", count: 2300 },
  { action: "Delete", count: 450 },
  { action: "Export", count: 800 },
  { action: "Import", count: 350 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export function UserActivity() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Login Activity</CardTitle>
          <CardDescription>User logins by time of day (24h)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loginActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="logins" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Actions</CardTitle>
          <CardDescription>Distribution of user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="action" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Roles</CardTitle>
          <CardDescription>Distribution of users by role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Usage</CardTitle>
          <CardDescription>
            Distribution of users by device type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDeviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {userDeviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
