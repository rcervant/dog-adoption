"use client";

import { Skeleton } from "@/components/ui/skeleton";
import HeadingSkeleton from "../HeadingSkeleton";

const DogInfoSkeleton = () => {
  return (
    <div className="">
      <div className="">
        <div
          className="
            flex 
            flex-row 
            gap-2 
          "
        >
          <HeadingSkeleton />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-2 
          "
        >
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-6 w-[150px]" />
        </div>
      </div>
      <div className="w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default DogInfoSkeleton;
