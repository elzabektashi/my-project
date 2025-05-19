import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminNotifications() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center justify-between px-4 py-2">
        <h3 className="font-semibold">Notifications</h3>
        <TabsList className="grid w-auto grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all" className="m-0">
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-start gap-4 rounded-lg bg-accent/50 p-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-xs font-bold">AC</span>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Acme Logistics has registered
                </p>
                <p className="text-xs text-muted-foreground">
                  A new company has registered and is awaiting approval
                </p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg p-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-primary-foreground">
                <span className="text-xs font-bold">SY</span>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  System alert: High API usage
                </p>
                <p className="text-xs text-muted-foreground">
                  FastTrack Shipping has exceeded 90% of their API quota
                </p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg p-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <span className="text-xs font-bold">SY</span>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Daily backup completed
                </p>
                <p className="text-xs text-muted-foreground">
                  The system backup has completed successfully
                </p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex items-center justify-center border-t p-2">
          <Button variant="ghost" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="unread" className="m-0">
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-start gap-4 rounded-lg bg-accent/50 p-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-xs font-bold">AC</span>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Acme Logistics has registered
                </p>
                <p className="text-xs text-muted-foreground">
                  A new company has registered and is awaiting approval
                </p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg bg-accent/50 p-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-primary-foreground">
                <span className="text-xs font-bold">SY</span>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  System alert: High API usage
                </p>
                <p className="text-xs text-muted-foreground">
                  FastTrack Shipping has exceeded 90% of their API quota
                </p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex items-center justify-center border-t p-2">
          <Button variant="ghost" size="sm" className="w-full">
            Mark all as read
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="alerts" className="m-0">
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-start gap-4 rounded-lg bg-accent/50 p-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-primary-foreground">
                <span className="text-xs font-bold">SY</span>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  System alert: High API usage
                </p>
                <p className="text-xs text-muted-foreground">
                  FastTrack Shipping has exceeded 90% of their API quota
                </p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex items-center justify-center border-t p-2">
          <Button variant="ghost" size="sm" className="w-full">
            View all alerts
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
