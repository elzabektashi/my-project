"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AdminCompanyDetailsProps {
  companyId: string;
}

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default"; // Mapped from "success"
    case "pending":
      return "outline"; // Mapped from "warning"
    case "blocked":
      return "destructive";
    default:
      return "default";
  }
};

export function AdminCompanyDetails({ companyId }: AdminCompanyDetailsProps) {
  // Mocked company data for demonstration
  const companyDetails = {
    name: "Acme Logistics",
    status: "active",
    plan: "Enterprise",
    contactName: "John Doe",
    contactEmail: "john@acmelogistics.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    website: "https://acmelogistics.com",
    registeredAt: "January 15, 2023",
    description:
      "Acme Logistics is a leading provider of logistics services for businesses of all sizes. They specialize in last-mile delivery and warehouse management.",
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Company Name
              </dt>
              <dd>{companyDetails.name}</dd>
            </div>
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Status
              </dt>
              <dd>
                <Badge variant={getBadgeVariant(companyDetails.status)}>
                  {companyDetails.status}
                </Badge>
              </dd>
            </div>
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Subscription Plan
              </dt>
              <dd>{companyDetails.plan}</dd>
            </div>
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Registered On
              </dt>
              <dd>{companyDetails.registeredAt}</dd>
            </div>
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Website
              </dt>
              <dd>
                <a
                  href={companyDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {companyDetails.website}
                </a>
              </dd>
            </div>
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Description
              </dt>
              <dd>{companyDetails.description}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Primary Contact
              </dt>
              <dd>{companyDetails.contactName}</dd>
            </div>
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Email
              </dt>
              <dd>
                <a
                  href={`mailto:${companyDetails.contactEmail}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {companyDetails.contactEmail}
                </a>
              </dd>
            </div>
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Phone
              </dt>
              <dd>
                <a
                  href={`tel:${companyDetails.contactPhone}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {companyDetails.contactPhone}
                </a>
              </dd>
            </div>
            <div className="flex flex-col space-y-1">
              <dt className="text-sm font-medium text-muted-foreground">
                Address
              </dt>
              <dd>{companyDetails.address}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
