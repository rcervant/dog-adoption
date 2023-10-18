"use client";

import ButtonWithIcon from "../ButtonWithIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useSort from "@/hooks/useSort";
import { ASCENDING, DESCENDING } from "@/lib/constants";
import { SlidersHorizontal } from "lucide-react";

const Sort = () => {
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
    <ButtonWithIcon
      label={`Sort ${field} ${sortOrder === ASCENDING ? "A-Z" : "Z-A"}`}
      icon={SlidersHorizontal}
      onClick={handleSort}
      data-testid="sort-button"
    />
  );
};

export default Sort;
