"use server";

import { Dog, SerializableUser } from "@/types";

interface IGetDogIdsParams {
  dogIdsToRetrieve?: string[];
  user: SerializableUser | null;
}

const getDogsById = async (
  getDogIdsParams: IGetDogIdsParams,
): Promise<Dog[]> => {
  try {
    if (!getDogIdsParams) throw new Error("No getDogIdsParams");
    
    const { dogIdsToRetrieve, user } = getDogIdsParams;
    if (!dogIdsToRetrieve) throw new Error("No dog ids to retrieve");
    if (!user) throw new Error("No current user");


    const idsToFetch = dogIdsToRetrieve || [];
    if (idsToFetch.length === 0) return [];

    const FETCH_API_URL = process.env.NEXT_PUBLIC_FETCH_API_URL;
    if (!FETCH_API_URL) throw new Error("No fetch api url");

    const res = await fetch(`${FETCH_API_URL}/dogs`, {
      method: "POST",
      body: JSON.stringify(idsToFetch),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: user.session,
      },
    }) || null;

    if (res === null) throw new Error("No response");

    if (!res.ok) {
      throw new Error(`Error in getDogsById: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as Dog[] || null;
    if (!data) throw new Error("No data");

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default getDogsById;
