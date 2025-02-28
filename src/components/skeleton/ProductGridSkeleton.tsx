"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductGridSkeleton({ featured = false }: { featured?: boolean }) {
  // Determine number of skeleton cards to show
  const displayCount = featured ? 3 : 8;
  
  // Create an array of the correct length to map over
  const skeletonCards = Array.from({ length: displayCount }).map((_, i) => i);

  return (
    <div className="max-h-[95vh] h-full flex flex-col">
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skeletonCards.map((index) => (
            <Card key={index} className="overflow-hidden border-2 border-black dark:border-white">
              <CardContent className="p-0">
                {/* Image skeleton */}
                <Skeleton className="w-full h-[200px]" />
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex-1 space-y-2">
                  {/* Product name skeleton */}
                  <Skeleton className="h-5 w-3/4" />
                  {/* Price skeleton */}
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination section skeleton */}
      <div className="border-t">
        <div className="flex items-center justify-between p-4">
          {/* "Showing X products" text skeleton */}
          <Skeleton className="h-4 w-48" />
          
          {/* Pagination controls skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-20" /> {/* Previous button */}
            <Skeleton className="h-4 w-24" /> {/* Page indicator */}
            <Skeleton className="h-9 w-20" /> {/* Next button */}
          </div>
        </div>
      </div>
    </div>
  );  
}