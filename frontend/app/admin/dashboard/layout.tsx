import type React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminImpersonationBanner } from "@/components/admin/admin-impersonation-banner";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1526] text-white">
      <AdminHeader />
      <div className="flex flex-1 min-h-0">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-6 py-8 bg-[url('/path/to/wave-background.jpg')] bg-cover bg-center">
          <div className="mx-auto max-w-7xl">
            <AdminImpersonationBanner />
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
