import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
  variant?: "default" | "outline";
  className?: string;
}

export default function PricingCard({
  title,
  description,
  price,
  features,
  ctaText,
  ctaLink,
  popular = false,
  variant = "default",
  className,
}: PricingCardProps) {
  return (
    <Card
      className={`text-white flex flex-col p-6 border-white/10 bg-[#0a0e1a] ${
        popular ? "shadow-lg hover:shadow-xl" : "shadow-sm hover:shadow-md"
      } transition-all relative ${className}`}
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
      </div>
      <ul className="my-8 space-y-3 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        size="lg"
        variant={variant}
        className={`mt-auto h-12 transition-colors ${
          variant === "default"
            ? "bg-primary hover:bg-blue-700 text-white"
            : "border border-white/10 bg-muted hover:bg-[#1e293b] hover:border-transparent text-white"
        }`}
        asChild
      >
        <Link href={ctaLink}>
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}
