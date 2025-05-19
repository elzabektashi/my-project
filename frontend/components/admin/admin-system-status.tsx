export function AdminSystemStatus() {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">API Service</p>
            <p className="text-xs text-muted-foreground">All endpoints operational</p>
          </div>
          <div className="flex h-2 w-2 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Database</p>
            <p className="text-xs text-muted-foreground">Healthy, 23ms response time</p>
          </div>
          <div className="flex h-2 w-2 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Storage Service</p>
            <p className="text-xs text-muted-foreground">Healthy, 78% capacity</p>
          </div>
          <div className="flex h-2 w-2 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Authentication Service</p>
            <p className="text-xs text-muted-foreground">Healthy, 45ms response time</p>
          </div>
          <div className="flex h-2 w-2 rounded-full bg-green-500" />
        </div>
      </div>
    )
  }
  