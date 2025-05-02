"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/charts"

export function OrdersOverview() {
  const [period, setPeriod] = useState("weekly")

  // Mock data for charts
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 15, 22, 18, 10, 14],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
      },
      {
        label: "Deliveries",
        data: [10, 15, 12, 18, 15, 8, 12],
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "rgb(16, 185, 129)",
      },
    ],
  }

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Orders",
        data: [65, 78, 90, 81, 86, 95, 91, 85, 90, 95, 100, 110],
        borderColor: "rgb(59, 130, 246)",
        tension: 0.3,
        fill: false,
      },
      {
        label: "Deliveries",
        data: [60, 70, 85, 75, 80, 90, 85, 80, 85, 90, 95, 105],
        borderColor: "rgb(16, 185, 129)",
        tension: 0.3,
        fill: false,
      },
    ],
  }

  return (
    <Card className="border-white/10 rounded-lg">
    <CardHeader className="px-6 pt-6 pb-3 flex flex-row items-center justify-between ">
      <div>
      <CardTitle className="text-xl font-semibold">Orders Overview</CardTitle>
      <CardDescription className="text-sm">Track your order volume and delivery performance</CardDescription>
      </div>

      {/* ← Updated buttons below */}
      <Tabs value={period} onValueChange={(v) => setPeriod(v as "weekly" | "monthly")}>
  <TabsList className="inline-flex bg-[#1d283a] rounded p-1 space-x-1">
    <TabsTrigger
      value="weekly"
      className="
       px-3 py-1 text-sm text-[#94a3b8] rounded
                data-[state=active]:bg-[#111827]
                data-[state=active]:text-white
      "
    >
      Weekly
    </TabsTrigger>
    <TabsTrigger
      value="monthly"
      className="
        px-3 py-1 text-sm text-[#94a3b8] rounded
                data-[state=active]:bg-[#111827]
                data-[state=active]:text-white
      "
    >
      Monthly
    </TabsTrigger>
  </TabsList>
</Tabs>
      {/* → Buttons end */}
    </CardHeader>

    <CardContent>
      <div className="h-[300px]">
        {period === "weekly"
          ? <BarChart data={weeklyData} />
          : <LineChart data={monthlyData} />}
      </div>
    </CardContent>
  </Card>
  )
}
