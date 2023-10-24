"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { getUserCredentialsFromCookieValue } from "@/lib/server/auth";
import { SerializableUser } from "@/types";

const getCurrentUser = async () => {
  try {
    const fetchCookieName = process.env.NEXT_PUBLIC_FETCH_COOKIE_NAME;
    if (!fetchCookieName) return null;

    const fetchTokenValue = cookies().get(fetchCookieName)?.value;
    if (!fetchTokenValue) return null;

    const userCredentials = getUserCredentialsFromCookieValue(fetchTokenValue);
    if (!userCredentials) return null;

    const { email } = userCredentials;
    if (!email) return null;

    const emailLowerCased = email.toLowerCase();

    const currentUser = await prisma.user.findUnique({
      where: { email: emailLowerCased },
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
