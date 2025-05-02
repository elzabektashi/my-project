import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/user-dashboard/sidebar";
import { DashboardHeader } from "@/components/user-dashboard/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1526] text-white">

      <DashboardHeader />

      <div className="flex flex-1 min-h-0">
        <DashboardSidebar />

        <main className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
