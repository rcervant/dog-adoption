import { Skeleton } from "@/components/ui/skeleton";

const DogCardSkeleton = () => {
  return (
    <div className="group col-span-1 cursor-pointer space-y-1">
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex flex-row items-center gap-3">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[100px]" />
    </div>
  );
};

export default DogCardSkeleton;
