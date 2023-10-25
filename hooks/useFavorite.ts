"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { SerializableUser } from "@/types";
import { favoriteDog, unfavoriteDog } from "@/actions/favoriteDog";
import { useThrottle } from "./useThrottle";
import { THROTTLE_FAV_TIME } from "@/lib/constants";
import { useToast } from "@/components/base/use-toast";
import signOut from "@/actions/signOut";
import getCurrentUser from "@/actions/getCurrentUser";

interface IUseFavorite {
  dogId: string;
  currentUser?: SerializableUser | null;
}

const useFavorite = ({ dogId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const { toast } = useToast();

  const hasFavorited = useMemo(() => {
    const currFavorites = currentUser?.favorites || [];

    return currFavorites.some((favorite) => favorite.dogId === dogId);
  }, [currentUser, dogId]);

  const throttledToggleFavorite = useThrottle(
    toggleFavorite,
    THROTTLE_FAV_TIME,
  );

  async function toggleFavorite(e: React.MouseEvent<HTMLDivElement>) {
    if (e) {
      e.stopPropagation();
    }

    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        toast({
          title: "Signed out!",
          description: "You have been signed out for inactivity.",
        });
        await signOut();
      }

      if (!hasFavorited) {
        const res = await favoriteDog({ dogIdToFavorite: dogId });
        if (!res) {
          throw new Error("Something went wrong.");
        }

        if (res.message !== "dog has been favorited successfully") {
          throw new Error("Something went wrong.");
        }

        toast({
          title: "Dog favorited!",
          description: "You can view your favorites on your profile page.",
        });
      } else {
        const res = await unfavoriteDog({ dogIdToUnfavorite: dogId });
        if (!res) {
          throw new Error("Something went wrong.");
        }

        if (res.message !== "dog has been unfavorited successfully") {
          throw new Error("Something went wrong.");
        }

        toast({
          title: "Dog unfavorited!",
          description: "You can view your favorites on your profile page.",
        });
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return {
    hasFavorited,
    toggleFavorite: throttledToggleFavorite,
  };
};

export default useFavorite;
