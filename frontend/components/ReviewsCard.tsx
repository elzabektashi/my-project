import { Card } from "@/components/ui/card";

interface ReviewsCardProps {
  name: string;
  role: string;
  testimonial: string;
  image: string;
  className?: string;
}

export default function ReviewsCard({
  name,
  role,
  testimonial,
  image,
  className,
}: ReviewsCardProps) {
  return (
    <Card
      className={`flex flex-col gap-4 p-6 shadow-sm transition-all hover:shadow-md border border-white/10 bg-white/5 text-white ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            width={48}
            height={48}
          />
        </div>
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>

      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-yellow-500"
          >
            <path d="M12 2l3.09 6.26L21.39 9.25l-4.69 4.57 1.11 6.46L12 17.25l-5.81 3.03 1.11-6.46-4.69-4.57 6.3-0.91L12 2z" />
          </svg>
        ))}
      </div>

      <p className="text-muted-foreground">"{testimonial}"</p>
    </Card>
  );
}
