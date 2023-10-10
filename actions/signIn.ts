"use server";

import { HOUR_IN_MS } from "@/lib/constants";
import prisma from "@/lib/db";
import { getCookieString } from "@/lib/server/utils";
import { IDBUser } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { FieldValues } from "react-hook-form";

const signIn = async (data: FieldValues) => {
  const FETCH_API_URL = process.env.NEXT_PUBLIC_FETCH_API_URL;
  if (!FETCH_API_URL) throw new Error("No fetch api url");

  try {
    const res = await fetch(`${FETCH_API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error in signIn: ${res.status} ${res.statusText}`);
    }

    const fetchResponseCookies = res.headers.get("set-cookie");
    if (fetchResponseCookies === null) return NextResponse.error();

    const fetchCookieName = process.env.NEXT_PUBLIC_FETCH_COOKIE_NAME;
    if (!fetchCookieName) throw new Error("No fetch cookie");

    const fetchSession = await getCookieString({
      stringToSearchThrough: fetchResponseCookies,
      stringToSearchFor: fetchCookieName,
    });
    if (!fetchSession) throw new Error("No fetch session");

    const [cookieName, cookieValue] = fetchSession.split("=");
    cookies().set(cookieName, cookieValue, {
      path: "/",
      sameSite: "lax",
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + HOUR_IN_MS),
    });

    const { email, name } = data as IDBUser;
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, session: fetchSession },
      create: { email, name, session: fetchSession },
    });

    return user;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default signIn;
