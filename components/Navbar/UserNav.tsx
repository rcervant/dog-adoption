"use client";

import signOut from "@/actions/signOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSort from "@/hooks/useSort";
import {
  ASCENDING,
  DESCENDING,
  FAVORITES_PATH,
  MATCH_PATH,
  SIGN_IN_PATH,
} from "@/lib/constants";
import { SerializableUser } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UserNavProps {
  currentUser?: SerializableUser | null;
}

const UserNav = ({ currentUser }: UserNavProps) => {
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

  const handleLogout = useCallback(async () => {
    const res = (await signOut()) || null;
    if (!res) {
      throw new Error("Error logging out");
    }

    router.push(SIGN_IN_PATH);
    router.refresh();
  }, [router]);

  const handleSort = () => {
    const newSortOrder = sortOrder === DESCENDING ? ASCENDING : DESCENDING;
    setSortOrder(newSortOrder);

    const query = createQueryString("sort", `breed:${newSortOrder}`);

    router.push(`${url}?${query}`);
    router.refresh();
  };

  const getInitials = useCallback((name: string) => {
    const initials = name.match(/\b\w/g) || [];
    const firstInitial = initials.shift() || "";
    const lastInitial = initials.pop() || "";

    return (firstInitial + lastInitial).toUpperCase();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger data-testid="user-nav-trigger" asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          data-testid="user-nav-button"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/images/placeholder.jpg" alt="avatar" />
            <AvatarFallback>
              {getInitials(currentUser?.name || "")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser ? currentUser.name : "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="sm:hidden"
            onClick={() => router.push(MATCH_PATH)}
          >
            Match
          </DropdownMenuItem>
          <DropdownMenuItem className="sm:hidden" onClick={handleSort}>
            {`Sort ${field} ${sortOrder === ASCENDING ? "A-Z" : "Z-A"}`}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="sm:hidden" />
          <DropdownMenuItem
            onClick={() => {
              router.push(FAVORITES_PATH);
            }}
          >
            My Favorites
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          data-testid="user-nav-logout-button"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
