"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface RecentCompany {
  id: string;
  name: string;
  status: "active" | "pending" | "blocked";
  registeredAt: string;
}

const recentCompanies: RecentCompany[] = [
  {
    id: "1",
    name: "Acme Logistics",
    status: "pending",
    registeredAt: "2 hours ago",
  },
  {
    id: "2",
    name: "FastTrack Shipping",
    status: "active",
    registeredAt: "1 day ago",
  },
  {
    id: "3",
    name: "Global Transport Co.",
    status: "active",
    registeredAt: "2 days ago",
  },
  {
    id: "4",
    name: "City Movers Inc.",
    status: "pending",
    registeredAt: "3 days ago",
  },
];

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default"; // Map "success" to "default" or "secondary"
    case "pending":
      return "outline"; // Map "warning" to "outline" or "secondary"
    case "blocked":
      return "destructive";
    default:
      return "default";
  }
};

export function AdminRecentCompanies() {
  const { toast } = useToast();

  const handleApprove = (companyId: string, companyName: string) => {
    toast({
      title: "Company approved",
      description: `${companyName} has been approved successfully.`,
    });
  };

  return (
    <div className="space-y-4">
      {recentCompanies.map((company) => (
        <div
          key={company.id}
          className="flex items-center justify-between rounded-lg border border-white/10 p-3"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{company.name}</span>
              <Badge variant={getBadgeVariant(company.status)}>
                {company.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Registered {company.registeredAt}
            </p>
          </div>
          {company.status === "pending" && (
            <Button
              size="sm"
              onClick={() => handleApprove(company.id, company.name)}
            >
              Approve
            </Button>
          )}
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View all companies
      </Button>
    </div>
  );
}
