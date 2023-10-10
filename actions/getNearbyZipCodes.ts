"use server";

import { FetchLocationMetdata } from "@/types";
import getCurrentUser from "./getCurrentUser";
import { DEFAULT_SEARCH_RADIUS_KM } from "@/lib/constants";
import getGeoBoundBoxFromZipCode from "./getGeoBoundBoxFromZipCode";

interface ZipCodeParams {
  zipCode: string;
  searchRadius?: number;
}

const getNearbyZipCodes = async ({
  zipCode,
  searchRadius = DEFAULT_SEARCH_RADIUS_KM,
}: ZipCodeParams) => {
  const FETCH_API_URL = process.env.NEXT_PUBLIC_FETCH_API_URL;
  if (!FETCH_API_URL) throw new Error("No fetch api url");

  const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
  if (!ORIGIN) throw new Error("No origin");

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user");

    const boundingBox = await getGeoBoundBoxFromZipCode({
      zipCode,
      searchRadius,
    });

    const geoBoundingBoxToSend = {
      geoBoundingBox: {
        bottom_left: boundingBox.bottomLeft,
        top_right: boundingBox.topRight,
      },
    };

    const res = await fetch(`${FETCH_API_URL}/locations/search`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: currentUser.session,
      },
      body: JSON.stringify(geoBoundingBoxToSend),
    });

    if (!res.ok) {
      throw new Error(
        `Error in getNearbyZipCodes: ${res.status} ${res.statusText}`,
      );
    }

    const data = (await res.json()) as FetchLocationMetdata;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getNearbyZipCodes;
