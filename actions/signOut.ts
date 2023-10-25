"use server";

import { SIGN_IN_PATH } from '@/lib/constants';
import getCurrentUser from "./getCurrentUser";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const signOut = async () => {
  const FETCH_API_URL = process.env.NEXT_PUBLIC_FETCH_API_URL;
  if (!FETCH_API_URL) throw new Error("No fetch api url");

  const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
  if (!ORIGIN) throw new Error("No origin");

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) redirect(`${ORIGIN}${SIGN_IN_PATH}`);

    const res = await fetch(`${FETCH_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: currentUser.session,
      },
    });

    if (!res) throw new Error("No response");

    if (!res.ok) {
      throw new Error(`Error in signOut: ${res.status} ${res.statusText}`);
    }

    const allCookies = cookies().getAll();
    for (const cookie of allCookies) {
      const { name, value } = cookie;
      cookies().set(name, value, { maxAge: 0 });
    }

    const signOutMessage = "Signed out successfully";
    return signOutMessage;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default signOut;
