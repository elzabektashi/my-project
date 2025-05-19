"\"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminCompanySettingsProps {
  companyId: string;
}

export function AdminCompanySettings({ companyId }: AdminCompanySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Settings form will be displayed here
        </p>
      </CardContent>
    </Card>
  );
}
