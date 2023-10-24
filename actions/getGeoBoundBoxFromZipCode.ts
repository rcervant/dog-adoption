import { DEFAULT_SEARCH_RADIUS_KM, SIGN_IN_PATH } from "@/lib/constants";
import { calculateBoundingBox } from "@/lib/server/utils";

import getCurrentUser from "./getCurrentUser";
import { FetchLocation, GeoPoint } from "@/types";
import { redirect } from "next/navigation";

interface IGetGeoBoundingBoxFromZipCode {
  zipCode: string;
  searchRadius?: number;
}

const getGeoBoundBoxFromZipCode = async ({
  zipCode,
  searchRadius = DEFAULT_SEARCH_RADIUS_KM,
}: IGetGeoBoundingBoxFromZipCode) => {
  if (!zipCode) throw new Error("No zip code");
  if (!searchRadius) throw new Error("No search radius");

  const FETCH_API_URL = process.env.NEXT_PUBLIC_FETCH_API_URL;
  if (!FETCH_API_URL) throw new Error("No fetch api url");

  const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
  if (!ORIGIN) throw new Error("No origin");

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) redirect(`${ORIGIN}${SIGN_IN_PATH}`);

    const res = await fetch(`${FETCH_API_URL}/locations`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: currentUser.session,
      },
      body: JSON.stringify([zipCode]),
    });

    if (!res) throw new Error("No response");

    if (!res.ok) {
      throw new Error(
        `Error in getGeoBoundBoxFromZipCode: ${res.status} ${res.statusText}`,
      );
    }

    const [location] = (await res.json()) as FetchLocation[];
    if (!location) throw new Error("No location");

    const { latitude, longitude } = location;

    const centerLocation: GeoPoint = {
      lat: latitude,
      lon: longitude,
    } as GeoPoint;

    const radiusKm = searchRadius;
    const boundingBox = await calculateBoundingBox(centerLocation, radiusKm);
    if (!boundingBox) throw new Error("No bounding box");

    return boundingBox;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default getGeoBoundBoxFromZipCode;
