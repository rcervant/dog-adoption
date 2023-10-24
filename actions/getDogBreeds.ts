"use server";

import getCurrentUser from "./getCurrentUser";

const getDogBreeds = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user");

    const FETCH_API_URL = process.env.NEXT_PUBLIC_FETCH_API_URL;
    if (!FETCH_API_URL) throw new Error("No fetch api url");

    const res = await fetch(`${FETCH_API_URL}/dogs/breeds`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: currentUser.session,
      },
    });

    if (!res) throw new Error("No response");

    if (!res.ok) {
      throw new Error(`Error in getDogBreeds: ${res.status} ${res.statusText}`);
    }

    const dogBreeds = (await res.json()) as string[];
    if (!dogBreeds) throw new Error("No data");

    return dogBreeds;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default getDogBreeds;
