import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OrderTimelineProps {
  orderId: string;
}

export function OrderTimeline({ orderId }: OrderTimelineProps) {
  // Mock timeline events
  const events = [
    {
      id: 1,
      title: "Order Created",
      description: "Order was created in the system",
      timestamp: "2023-11-10T10:30:00Z",
      user: "Jane Smith",
    },
    {
      id: 2,
      title: "Driver Assigned",
      description: "John Doe was assigned as the driver",
      timestamp: "2023-11-11T09:15:00Z",
      user: "Jane Smith",
    },
    {
      id: 3,
      title: "Pickup Confirmed",
      description: "Cargo was picked up from origin",
      timestamp: "2023-11-12T11:45:00Z",
      user: "John Doe",
    },
    {
      id: 4,
      title: "In Transit",
      description: "Order is now in transit to destination",
      timestamp: "2023-11-12T12:30:00Z",
      user: "John Doe",
    },
    {
      id: 5,
      title: "Checkpoint Reached",
      description: "Vehicle passed through Chicago checkpoint",
      timestamp: "2023-11-13T15:20:00Z",
      user: "System",
    },
  ];

  // Format timestamp to readable date and time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
        <CardDescription>Track the progress of this order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative ml-3 space-y-6 pb-2">
          {events.map((event, index) => (
            <div key={event.id} className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground">
                  <span className="text-xs">{index + 1}</span>
                </div>
                {index < events.length - 1 && (
                  <div className="h-full w-px bg-border" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-0">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                  <span>{formatTimestamp(event.timestamp)}</span>
                  <span className="mx-2">•</span>
                  <span>{event.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
