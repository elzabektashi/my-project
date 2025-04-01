import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={`flex flex-col gap-4 p-6 shadow-sm transition-all hover:shadow-md border border-white/10 bg-white/5 text-white ${className}`}
    >
      <div className="rounded-full bg-primary/10 p-3 w-fit">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-auto pt-4">
        <Link
          href="#"
          className="inline-flex items-center text-sm font-medium text-primary"
        >
          Learn more
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
