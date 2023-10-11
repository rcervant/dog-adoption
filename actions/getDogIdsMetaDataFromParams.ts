"use server";

import { ASCENDING } from '@/lib/constants';
import { getQueryFromSearchParams } from "@/lib/server/utils";
import { DogIdsMetadata, IDogSearchParams, SerializableUser } from "@/types";

interface DogIdsMetadataParams {
  searchParams: IDogSearchParams;
  user: SerializableUser | null;
}

const getDogIdsMetaDataFromParams = async (
  dogIdSearchParams: DogIdsMetadataParams,
) => {
  try {
    if (!dogIdSearchParams) throw new Error("No dogIdSearchParams");

    const { searchParams = {sort: ASCENDING}, user } = dogIdSearchParams;
    if (!user) throw new Error("No current user");
    if (!searchParams) throw new Error("No search params");

    const query = await getQueryFromSearchParams(searchParams) || "";

    const FETCH_API_URL = process.env.NEXT_PUBLIC_FETCH_API_URL;
    if (!FETCH_API_URL) throw new Error("No fetch api url");

    const url = `${FETCH_API_URL}/dogs/search?${query}`;
    console.log(url)

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: user.session,
      },
    }) || null;

    if (res === null) throw new Error("No response");

    if (!res.ok) {
      throw new Error(
        `Error in getDogIdsMetaDataFromParams: ${res.status} ${res.statusText}`,
      );
    }

    const data = (await res.json()) as DogIdsMetadata || null;
    if (!data) throw new Error("No data");

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default getDogIdsMetaDataFromParams;
