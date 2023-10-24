import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex w-full cursor-pointer rounded-full border-[1px] py-1 shadow-sm transition hover:shadow-md">
      <div className="flex w-full flex-row items-center justify-between pr-1">
        <div className="pl-4 text-sm font-semibold text-muted-foreground">
          Search for pups
        </div>
        <div className="rounded-full bg-primary p-2 text-white">
          <Search size={18} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
