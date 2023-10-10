import DogResultsPageSkeleton from "@/components/skeletons/DogPage/DogResultsPageSkeleton";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

const SearchPageSkeleton = () => {
  return <DogResultsPageSkeleton size={DEFAULT_PAGE_SIZE} />;
};

export default SearchPageSkeleton;
