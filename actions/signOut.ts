"use server";

import { cookies } from "next/headers";
import getCurrentUser from "./getCurrentUser";
import { redirect } from "next/navigation";

const signOut = async () => {
  const FETCH_API_URL = process.env.NEXT_PUBLIC_FETCH_API_URL;
  if (!FETCH_API_URL) throw new Error("No fetch api url");

  const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
  if (!ORIGIN) throw new Error("No origin");

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return redirect(`${ORIGIN}/sign-in`);

    const res = await fetch(`${FETCH_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: currentUser.session,
      },
    });

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
