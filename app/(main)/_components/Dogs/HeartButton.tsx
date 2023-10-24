"use client";

import { SerializableUser } from "@/types";
import useFavorite from "@/hooks/useFavorite";
import { THROTTLE_FAV_TIME } from "@/lib/constants";
import { useState } from "react";
import { Heart } from "lucide-react";

interface HeartButtonProps {
  dogId: string;
  currentUser?: SerializableUser | null;
}

const HeartButton = ({ dogId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    dogId,
    currentUser,
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      onClick={(e) => {
        setIsLoading(true);
        toggleFavorite(e);

        setTimeout(() => {
          setIsLoading(false);
        }, THROTTLE_FAV_TIME);
      }}
      className={`relative cursor-pointer transition hover:opacity-80 ${
        isLoading ? "pointer-events-none" : ""
      }`}
    >
      <Heart
        color="white"
        size={28}
        className={`
          absolute
          -right-[2px]
          -top-[2px]
          ${hasFavorited ? "fill-primary" : "fill-muted-foreground"}
        `}
      />
    </div>
  );
};

export default HeartButton;
