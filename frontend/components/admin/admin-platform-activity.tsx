"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    orders: 4000,
    users: 2400,
    apiCalls: 8000,
  },
  {
    name: "Feb",
    orders: 3000,
    users: 1398,
    apiCalls: 6000,
  },
  {
    name: "Mar",
    orders: 2000,
    users: 9800,
    apiCalls: 10000,
  },
  {
    name: "Apr",
    orders: 2780,
    users: 3908,
    apiCalls: 12000,
  },
  {
    name: "May",
    orders: 1890,
    users: 4800,
    apiCalls: 9000,
  },
  {
    name: "Jun",
    orders: 2390,
    users: 3800,
    apiCalls: 11000,
  },
  {
    name: "Jul",
    orders: 3490,
    users: 4300,
    apiCalls: 14000,
  },
];

export function AdminPlatformActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" />
              <Line type="monotone" dataKey="apiCalls" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
