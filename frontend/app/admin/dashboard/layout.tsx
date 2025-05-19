import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminImpersonationBanner } from "@/components/admin/admin-impersonation-banner"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminImpersonationBanner />
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
