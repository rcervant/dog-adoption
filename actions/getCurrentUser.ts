"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { getUserCredentialsFromCookieValue } from "@/lib/server/auth";
import { SerializableUser } from "@/types";

const getCurrentUser = async () => {
  try {
    const fetchTokenValue = cookies().get(
      process.env.NEXT_PUBLIC_FETCH_COOKIE_NAME ?? "",
    )?.value;

    if (!fetchTokenValue) return null;

    const userCredentials = getUserCredentialsFromCookieValue(fetchTokenValue);
    if (!userCredentials) return null;

    const { email } = userCredentials;

    const currentUser = await prisma.user.findUnique({
      where: { email },
      include: {
        favorites: true,
      },
    });

    if (!currentUser) return null;

    const serializedUser: SerializableUser = {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      favorites: currentUser.favorites.map((favorite) => ({
        ...favorite,
        createdAt: favorite.createdAt.toISOString(),
      })),
    } as SerializableUser;

    return serializedUser;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default getCurrentUser;
