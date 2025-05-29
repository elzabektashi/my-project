import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralSettings } from "@/components/admin/general-settings"
import { SecuritySettings } from "@/components/admin/security-settings"
import { IntegrationSettings } from "@/components/admin/integration-settings"
import { EmailSettings } from "@/components/admin/email-settings"
import { ApiSettings } from "@/components/admin/api-settings"
import { BrandingSettings } from "@/components/admin/branding-settings"
import { RolesSettings } from "@/components/admin/roles-settings"
import { NotificationSettings } from "@/components/admin/notification-settings"

export const metadata: Metadata = {
  title: "Admin | Settings",
  description: "Configure platform-wide settings",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure platform-wide settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-7 lg:w-[800px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-6">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="branding" className="mt-6">
          <BrandingSettings />
        </TabsContent>
        <TabsContent value="security" className="mt-6">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="roles" className="mt-6">
          <RolesSettings />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="integrations" className="mt-6">
          <IntegrationSettings />
        </TabsContent>
        <TabsContent value="email" className="mt-6">
          <EmailSettings />
        </TabsContent>
        <TabsContent value="api" className="mt-6">
          <ApiSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
