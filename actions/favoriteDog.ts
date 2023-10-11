"use server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/db";
import { SerializableFavorite } from "@/types";

interface IFavoriteDog {
  dogIdToFavorite: string;
}

export const favoriteDog = async ({ dogIdToFavorite }: IFavoriteDog) => {
  try {
    const currentUser = await getCurrentUser() || null;
    if (!currentUser) return null;

    const favorites = [...(currentUser.favorites || [])];

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: currentUser.id,
        dogId: dogIdToFavorite,
      },
    }) || null;

    if (existingFavorite) {
      return { message: "dog has already been favorited" };
    }

    const newFavorite = await prisma.favorite.create({
      data: {
        dogId: dogIdToFavorite,
        userId: currentUser.id,
      },
    }) || null;

    if (!newFavorite) throw new Error("Could not create new favorite");

    const serializedNewFavorite: SerializableFavorite = {
      ...newFavorite,
      createdAt: newFavorite.createdAt.toISOString(),
    } as SerializableFavorite;

    favorites.push(serializedNewFavorite);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favorites: {
          connect: favorites.map((favorite) => ({
            dogId_userId: {
              dogId: favorite.dogId,
              userId: currentUser.id,
            },
          })),
        },
      },
    }) || null;
    if (!user) throw new Error("Could not update user");

    return { message: "dog has been favorited successfully" };
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

interface IUnfavoriteDog {
  dogIdToUnfavorite: string;
}

export const unfavoriteDog = async ({ dogIdToUnfavorite }: IUnfavoriteDog) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user");

    const favorites = [...(currentUser.favorites || [])];
    const [favoriteToRemove] = favorites.filter(
      (favorite) => favorite.dogId === dogIdToUnfavorite,
    );

    const deletedFavorite = await prisma.favorite.delete({
      where: {
        id: favoriteToRemove?.id,
      },
    });

    return { message: "dog has been unfavorited successfully" };
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
