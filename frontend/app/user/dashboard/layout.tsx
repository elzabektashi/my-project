import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/user-dashboard/sidebar";
import { DashboardHeader } from "@/components/user-dashboard/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0e1a] text-white">
      {/* Header stays at the top */}
      <DashboardHeader />

      {/* This fills remaining screen height */}
      <div className="flex flex-1 min-h-0">
        <DashboardSidebar />

        <main className="flex-1 overflow-y-auto p-0">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
