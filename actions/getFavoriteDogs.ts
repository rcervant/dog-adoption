"use server";

import prisma from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import getDogsById from "./getDogsById";

// TODO: add pagination
const getFavoriteDogs = async () => {
  try {
    const currentUser = (await getCurrentUser()) || null;
    if (!currentUser) throw new Error("No current user");

    const favorites =
      (await prisma.favorite.findMany({
        where: {
          userId: currentUser.id,
        },
      })) || null;
    if (!favorites) throw new Error(`Could not fetch favorites`);

    const favoriteDogIds = favorites.map((favorite) => favorite.dogId);
    const favoriteDogs =
      (await getDogsById({
        dogIdsToRetrieve: favoriteDogIds,
        user: currentUser,
      })) || null;
    if (!favoriteDogs) throw new Error(`Could not fetch favoriteDogs`);

    return favoriteDogs;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default getFavoriteDogs;
