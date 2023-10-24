"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import useSort from "@/hooks/useSort";
import { ASCENDING, DESCENDING } from "@/lib/constants";

import { Button } from "@/components/base/button";
import { SlidersHorizontal } from "lucide-react";

const SortButton = () => {
  const router = useRouter();
  const url = usePathname();
  const searchParams = useSearchParams();

  const { field, sortOrder, setSortOrder } = useSort();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleSort = () => {
    const newSortOrder = sortOrder === DESCENDING ? ASCENDING : DESCENDING;
    setSortOrder(newSortOrder);

    const query = createQueryString("sort", `breed:${newSortOrder}`);

    router.push(`${url}?${query}`);
    router.refresh();
  };

  return (
    <Button onClick={handleSort} data-testid="sort-button">
      {`Sort ${field} ${sortOrder === ASCENDING ? "A-Z" : "Z-A"}`}
      <SlidersHorizontal className="ml-2 h-4 w-5" />
    </Button>
  );
};

export default SortButton;
