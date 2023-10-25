import { Skeleton } from "@/components/base/skeleton";
import HeadingSkeleton from "../HeadingSkeleton";

const DogHeadSkeleton = () => {
  return (
    <>
      <HeadingSkeleton center />
      <div className="flex w-full items-center justify-center">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:w-4/5 md:w-3/5 ">
          <Skeleton className="h-full w-full object-cover" />
        </div>
      </div>
    </>
  );
};

export default DogHeadSkeleton;
