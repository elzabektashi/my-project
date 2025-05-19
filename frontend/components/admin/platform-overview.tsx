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
  LineChart,
  Line,
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

// Mock data for platform overview
const orderData = [
  { month: "Jan", orders: 1200 },
  { month: "Feb", orders: 1900 },
  { month: "Mar", orders: 2400 },
  { month: "Apr", orders: 1800 },
  { month: "May", orders: 2800 },
  { month: "Jun", orders: 3200 },
  { month: "Jul", orders: 3800 },
];

const userGrowthData = [
  { month: "Jan", users: 500 },
  { month: "Feb", users: 650 },
  { month: "Mar", users: 780 },
  { month: "Apr", users: 850 },
  { month: "May", users: 940 },
  { month: "Jun", users: 1050 },
  { month: "Jul", users: 1200 },
];

const companyDistributionData = [
  { name: "Free Tier", value: 45, color: "#94a3b8" },
  { name: "Basic", value: 30, color: "#64748b" },
  { name: "Professional", value: 15, color: "#475569" },
  { name: "Enterprise", value: 10, color: "#1e293b" },
];

const COLORS = ["#94a3b8", "#64748b", "#475569", "#1e293b"];

export function PlatformOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Order Volume</CardTitle>
          <CardDescription>
            Monthly order volume across all companies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>
            Monthly active users across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Distribution</CardTitle>
          <CardDescription>
            Distribution of companies by subscription plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={companyDistributionData}
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
                  {companyDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
          <CardDescription>Important platform metrics and KPIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total Companies
              </p>
              <p className="text-2xl font-bold">127</p>
              <p className="text-xs text-green-500">↑ 12% from last month</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Active Users
              </p>
              <p className="text-2xl font-bold">1,245</p>
              <p className="text-xs text-green-500">↑ 8% from last month</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total Orders
              </p>
              <p className="text-2xl font-bold">15,782</p>
              <p className="text-xs text-green-500">↑ 15% from last month</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Average Order Value
              </p>
              <p className="text-2xl font-bold">$1,245</p>
              <p className="text-xs text-red-500">↓ 3% from last month</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                API Calls (Daily)
              </p>
              <p className="text-2xl font-bold">2.4M</p>
              <p className="text-xs text-green-500">↑ 18% from last month</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Storage Used
              </p>
              <p className="text-2xl font-bold">1.2TB</p>
              <p className="text-xs text-green-500">↑ 5% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
