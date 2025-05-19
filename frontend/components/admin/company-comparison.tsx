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
  LineChart,
  Line,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for company comparison
const orderComparisonData = [
  {
    month: "Jan",
    "Acme Logistics": 450,
    "Fast Transport": 380,
    "Global Shipping": 320,
  },
  {
    month: "Feb",
    "Acme Logistics": 520,
    "Fast Transport": 430,
    "Global Shipping": 390,
  },
  {
    month: "Mar",
    "Acme Logistics": 640,
    "Fast Transport": 550,
    "Global Shipping": 480,
  },
  {
    month: "Apr",
    "Acme Logistics": 700,
    "Fast Transport": 600,
    "Global Shipping": 520,
  },
  {
    month: "May",
    "Acme Logistics": 780,
    "Fast Transport": 650,
    "Global Shipping": 580,
  },
  {
    month: "Jun",
    "Acme Logistics": 820,
    "Fast Transport": 700,
    "Global Shipping": 620,
  },
  {
    month: "Jul",
    "Acme Logistics": 900,
    "Fast Transport": 750,
    "Global Shipping": 680,
  },
];

const userComparisonData = [
  {
    month: "Jan",
    "Acme Logistics": 120,
    "Fast Transport": 95,
    "Global Shipping": 85,
  },
  {
    month: "Feb",
    "Acme Logistics": 135,
    "Fast Transport": 105,
    "Global Shipping": 90,
  },
  {
    month: "Mar",
    "Acme Logistics": 150,
    "Fast Transport": 120,
    "Global Shipping": 100,
  },
  {
    month: "Apr",
    "Acme Logistics": 165,
    "Fast Transport": 130,
    "Global Shipping": 110,
  },
  {
    month: "May",
    "Acme Logistics": 180,
    "Fast Transport": 145,
    "Global Shipping": 125,
  },
  {
    month: "Jun",
    "Acme Logistics": 200,
    "Fast Transport": 160,
    "Global Shipping": 140,
  },
  {
    month: "Jul",
    "Acme Logistics": 220,
    "Fast Transport": 175,
    "Global Shipping": 155,
  },
];

const apiComparisonData = [
  {
    month: "Jan",
    "Acme Logistics": 150000,
    "Fast Transport": 120000,
    "Global Shipping": 90000,
  },
  {
    month: "Feb",
    "Acme Logistics": 180000,
    "Fast Transport": 140000,
    "Global Shipping": 100000,
  },
  {
    month: "Mar",
    "Acme Logistics": 220000,
    "Fast Transport": 170000,
    "Global Shipping": 120000,
  },
  {
    month: "Apr",
    "Acme Logistics": 250000,
    "Fast Transport": 190000,
    "Global Shipping": 140000,
  },
  {
    month: "May",
    "Acme Logistics": 280000,
    "Fast Transport": 210000,
    "Global Shipping": 160000,
  },
  {
    month: "Jun",
    "Acme Logistics": 320000,
    "Fast Transport": 240000,
    "Global Shipping": 180000,
  },
  {
    month: "Jul",
    "Acme Logistics": 350000,
    "Fast Transport": 260000,
    "Global Shipping": 200000,
  },
];

const storageComparisonData = [
  {
    month: "Jan",
    "Acme Logistics": 50,
    "Fast Transport": 35,
    "Global Shipping": 25,
  },
  {
    month: "Feb",
    "Acme Logistics": 60,
    "Fast Transport": 40,
    "Global Shipping": 30,
  },
  {
    month: "Mar",
    "Acme Logistics": 75,
    "Fast Transport": 50,
    "Global Shipping": 40,
  },
  {
    month: "Apr",
    "Acme Logistics": 90,
    "Fast Transport": 65,
    "Global Shipping": 50,
  },
  {
    month: "May",
    "Acme Logistics": 110,
    "Fast Transport": 80,
    "Global Shipping": 65,
  },
  {
    month: "Jun",
    "Acme Logistics": 130,
    "Fast Transport": 95,
    "Global Shipping": 80,
  },
  {
    month: "Jul",
    "Acme Logistics": 150,
    "Fast Transport": 110,
    "Global Shipping": 95,
  },
];

export function CompanyComparison() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="api">API Usage</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Volume Comparison</CardTitle>
              <CardDescription>Monthly order volume by company</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orderComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Acme Logistics" fill="#3b82f6" />
                    <Bar dataKey="Fast Transport" fill="#10b981" />
                    <Bar dataKey="Global Shipping" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth Comparison</CardTitle>
              <CardDescription>Monthly active users by company</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Acme Logistics"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Fast Transport"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Global Shipping"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Comparison</CardTitle>
              <CardDescription>Monthly API calls by company</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={apiComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Acme Logistics"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Fast Transport"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Global Shipping"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Usage Comparison</CardTitle>
              <CardDescription>
                Monthly storage usage (GB) by company
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={storageComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Acme Logistics" fill="#3b82f6" />
                    <Bar dataKey="Fast Transport" fill="#10b981" />
                    <Bar dataKey="Global Shipping" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
