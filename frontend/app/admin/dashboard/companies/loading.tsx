import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="mt-2 h-4 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Skeleton className="h-10 w-[300px]" />
        <div className="grid grid-cols-2 gap-2 md:flex md:gap-4">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  );
}
