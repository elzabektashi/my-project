"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  AreaChart,
  Area,
} from "recharts"
import { Progress } from "@/components/ui/progress"

// Mock data for resource utilization
const apiUsageData = [
  { day: "Mon", calls: 1200000 },
  { day: "Tue", calls: 1500000 },
  { day: "Wed", calls: 1800000 },
  { day: "Thu", calls: 1600000 },
  { day: "Fri", calls: 2000000 },
  { day: "Sat", calls: 1000000 },
  { day: "Sun", calls: 800000 },
]

const storageGrowthData = [
  { month: "Jan", storage: 500 },
  { month: "Feb", storage: 650 },
  { month: "Mar", storage: 780 },
  { month: "Apr", storage: 900 },
  { month: "May", storage: 1050 },
  { month: "Jun", storage: 1200 },
  { month: "Jul", storage: 1350 },
]

const databaseQueriesData = [
  { hour: "00:00", queries: 45000 },
  { hour: "02:00", queries: 30000 },
  { hour: "04:00", queries: 20000 },
  { hour: "06:00", queries: 35000 },
  { hour: "08:00", queries: 120000 },
  { hour: "10:00", queries: 180000 },
  { hour: "12:00", queries: 150000 },
  { hour: "14:00", queries: 170000 },
  { hour: "16:00", queries: 160000 },
  { hour: "18:00", queries: 110000 },
  { hour: "20:00", queries: 85000 },
  { hour: "22:00", queries: 60000 },
]

export function ResourceUtilization() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
            <CardDescription>Daily API calls across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apiUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                  <Legend />
                  <Bar dataKey="calls" fill="#3b82f6" name="API Calls" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Growth</CardTitle>
            <CardDescription>Monthly storage usage (GB)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={storageGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="storage" fill="#10b981" stroke="#10b981" name="Storage (GB)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Database Queries</CardTitle>
          <CardDescription>Hourly database query volume (24h)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={databaseQueriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                <Legend />
                <Line type="monotone" dataKey="queries" stroke="#f59e0b" strokeWidth={2} name="DB Queries" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resource Allocation</CardTitle>
          <CardDescription>Current resource utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">CPU Usage</p>
                <p className="text-sm text-muted-foreground">65%</p>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Memory Usage</p>
                <p className="text-sm text-muted-foreground">78%</p>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Storage Capacity</p>
                <p className="text-sm text-muted-foreground">45%</p>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Network Bandwidth</p>
                <p className="text-sm text-muted-foreground">52%</p>
              </div>
              <Progress value={52} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Database Connections</p>
                <p className="text-sm text-muted-foreground">83%</p>
              </div>
              <Progress value={83} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
