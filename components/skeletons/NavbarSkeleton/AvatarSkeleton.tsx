import { Skeleton } from "@/components/ui/skeleton";

const AvatarSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  );
};

export default AvatarSkeleton;
