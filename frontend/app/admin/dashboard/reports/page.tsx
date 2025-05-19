import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportTemplates } from "components/admin/report-templates";
import { CustomReportBuilder } from "components/admin/custom-report-builder";
import { ScheduledReports } from "components/admin/scheduled-reports";

export const metadata: Metadata = {
  title: "Admin | Reports",
  description: "Generate and manage platform reports",
};

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and manage platform-wide and company-specific reports
        </p>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="templates" className="mt-6">
          <ReportTemplates />
        </TabsContent>
        <TabsContent value="custom" className="mt-6">
          <CustomReportBuilder />
        </TabsContent>
        <TabsContent value="scheduled" className="mt-6">
          <ScheduledReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
