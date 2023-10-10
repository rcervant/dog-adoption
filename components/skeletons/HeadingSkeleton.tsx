"use client";

import { Skeleton } from "../ui/skeleton";

interface HeadingSkeletonProps {
  center?: boolean;
}

const HeadingSkeleton = ({ center }: HeadingSkeletonProps) => {
  return (
    <div className={center ? "m-auto" : ""}>
      <Skeleton className="h-9 w-[200px]" />
      <div className="mt-2">
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
};

export default HeadingSkeleton;
