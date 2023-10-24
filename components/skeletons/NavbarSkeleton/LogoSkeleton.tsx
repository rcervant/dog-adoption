import { Skeleton } from "@/components/base/skeleton";
import AvatarSkeleton from "./AvatarSkeleton";

export function LogoSkeleton() {
  return (
    <div className="flex items-center">
      <Skeleton className="h-12 w-12 rounded-md" />
    </div>
  );
}
