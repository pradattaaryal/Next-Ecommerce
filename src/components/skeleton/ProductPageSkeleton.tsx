"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function ProductPageSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Images Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-muted text-muted-foreground"
                  />
                ))}
              </div>
              <Skeleton className="h-4 w-20 rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-8 w-1/4 rounded-lg" />

          <Skeleton className="h-10 w-full rounded-lg" />

          <div className="mt-8 space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-1/2 rounded-lg" />
              <Skeleton className="h-10 w-1/2 rounded-lg" />
            </div>
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <Skeleton className="my-12 h-[1px] w-full" />

      {/* Reviews Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/4 rounded-lg" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}