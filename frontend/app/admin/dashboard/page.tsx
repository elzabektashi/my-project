import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminOverviewStats } from "@/components/admin/admin-overview-stats";
import { AdminPlatformActivity } from "components/admin/admin-platform-activity";
import { AdminCompanyGrowth } from "components/admin/admin-company-growth";
import { AdminRecentCompanies } from "components/admin/admin-recent-companies";
import { AdminResourceUsage } from "components/admin/admin-resource-usage";
import { AdminSystemStatus } from "components/admin/admin-system-status";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <AdminOverviewStats />

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Platform Activity</TabsTrigger>
          <TabsTrigger value="growth">Company Growth</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <AdminPlatformActivity />
        </TabsContent>
        <TabsContent value="growth" className="space-y-4">
          <AdminCompanyGrowth />
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <AdminResourceUsage />
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminRecentCompanies />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminSystemStatus />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
