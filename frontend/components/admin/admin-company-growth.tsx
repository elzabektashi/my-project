"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    newCompanies: 65,
    churnedCompanies: 12,
  },
  {
    name: "Feb",
    newCompanies: 59,
    churnedCompanies: 10,
  },
  {
    name: "Mar",
    newCompanies: 80,
    churnedCompanies: 8,
  },
  {
    name: "Apr",
    newCompanies: 81,
    churnedCompanies: 15,
  },
  {
    name: "May",
    newCompanies: 56,
    churnedCompanies: 12,
  },
  {
    name: "Jun",
    newCompanies: 55,
    churnedCompanies: 9,
  },
  {
    name: "Jul",
    newCompanies: 40,
    churnedCompanies: 7,
  },
];

export function AdminCompanyGrowth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <Bar dataKey="newCompanies" fill="#8884d8" name="New Companies" />
              <Bar
                dataKey="churnedCompanies"
                fill="#ff8042"
                name="Churned Companies"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
