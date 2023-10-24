import Container from "@/components/Container";
import DogHeadSkeleton from "./DogHeadSkeleton";
import DogInfoSkeleton from "./DogInfoSkeleton";
import DogResultsPageSkeleton from "./DogResultsPageSkeleton";
import { NUM_DOGS_TO_DISPLAY } from "@/lib/constants";

const DogProfileSkeleton = () => {
  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <DogHeadSkeleton />
          <DogInfoSkeleton />
        </div>
        <DogResultsPageSkeleton size={NUM_DOGS_TO_DISPLAY} />
      </div>
    </Container>
  );
};

export default DogProfileSkeleton;
