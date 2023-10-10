import Container from "@/components/Container";
import DogCardSkeleton from "./DogCardSkeleton";

interface DogResultsPageSkeletonProps {
  size: number;
}

const DogResultsPageSkeleton = ({ size }: DogResultsPageSkeletonProps) => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: size }).map((_, i) => (
          <DogCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
};

export default DogResultsPageSkeleton;
