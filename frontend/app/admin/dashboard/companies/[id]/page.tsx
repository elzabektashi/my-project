import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminCompanyDetails } from "components/admin/admin-company-details"
import { AdminCompanyUsers } from "components/admin/admin-company-users"
import { AdminCompanySettings } from "components/admin/admin-company-settings"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminCompanyPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/companies">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Acme Logistics</h1>
          <p className="text-muted-foreground">Company ID: {params.id}</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Company Details</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="usage">Usage & Billing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <AdminCompanyDetails companyId={params.id} />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <AdminCompanyUsers companyId={params.id} />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <AdminCompanySettings companyId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
