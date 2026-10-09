import { Skeleton } from "@/components/ui/skeleton";

/** Route-level loading placeholder shown while a page chunk or data loads. */
const PageSkeleton = () => (
  <div role="status" aria-label="Loading" className="min-h-screen">
    <div className="h-16 border-b border-border" />
    <Skeleton className="h-[42vh] w-full rounded-none" />
    <div className="container-site grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/3] w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
    <span className="sr-only">Loading…</span>
  </div>
);

export default PageSkeleton;
