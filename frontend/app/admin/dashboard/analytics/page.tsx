import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlatformOverview } from "components/admin/platform-overview"
import { CompanyComparison } from "components/admin/company-comparison"
import { UserActivity } from "components/admin/user-activity"
import { ResourceUtilization } from "@/components/admin/resource-utilization"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export const metadata: Metadata = {
  title: "Admin | Analytics",
  description: "Platform analytics and insights",
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Comprehensive analytics and insights for the entire platform</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
          <DateRangePicker />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="c1">Acme Logistics</SelectItem>
              <SelectItem value="c2">Fast Transport Inc.</SelectItem>
              <SelectItem value="c3">Global Shipping Co.</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="companies">Company Comparison</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="resources">Resource Utilization</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <PlatformOverview />
        </TabsContent>
        <TabsContent value="companies" className="mt-6">
          <CompanyComparison />
        </TabsContent>
        <TabsContent value="users" className="mt-6">
          <UserActivity />
        </TabsContent>
        <TabsContent value="resources" className="mt-6">
          <ResourceUtilization />
        </TabsContent>
      </Tabs>
    </div>
  )
}
