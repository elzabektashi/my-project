"use client";

import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function AdminImpersonationBanner() {
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [impersonatedUser, setImpersonatedUser] = useState({
    name: "John Doe",
    company: "Acme Logistics",
    role: "Company Admin",
  });
  const { toast } = useToast();

  const handleEndImpersonation = () => {
    setIsImpersonating(false);
    toast({
      title: "Impersonation ended",
      description: `You are no longer impersonating ${impersonatedUser.name}`,
    });
  };

  if (!isImpersonating) return null;

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-yellow-100 px-4 py-2 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        <p className="text-sm font-medium">
          You are currently impersonating{" "}
          <strong>{impersonatedUser.name}</strong> ({impersonatedUser.role}) at{" "}
          <strong>{impersonatedUser.company}</strong>
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-7 border-yellow-600 bg-transparent hover:bg-yellow-200 dark:border-yellow-400 dark:hover:bg-yellow-800"
        onClick={handleEndImpersonation}
      >
        <X className="mr-1 h-3.5 w-3.5" />
        End impersonation
      </Button>
    </div>
  );
}
