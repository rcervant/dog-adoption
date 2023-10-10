import { DEFAULT_SEARCH_RADIUS_KM } from "@/lib/constants";
import getCurrentUser from "./getCurrentUser";
import { redirect } from "next/navigation";
import { FetchLocation, GeoPoint } from "@/types";
import { calculateBoundingBox } from "@/lib/server/utils";

interface IGetGeoBoundingBoxFromZipCode {
  zipCode: string;
  searchRadius?: number;
}

const getGeoBoundBoxFromZipCode = async ({
  zipCode,
  searchRadius = DEFAULT_SEARCH_RADIUS_KM,
}: IGetGeoBoundingBoxFromZipCode) => {
  const FETCH_API_URL = process.env.NEXT_PUBLIC_FETCH_API_URL;
  if (!FETCH_API_URL) throw new Error("No fetch api url");

  const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
  if (!ORIGIN) throw new Error("No origin");

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) redirect(`${ORIGIN}/sign-in`);

    const res = await fetch(`${FETCH_API_URL}/locations`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: currentUser.session,
      },
      body: JSON.stringify([zipCode]),
    });

    if (!res.ok) {
      throw new Error(
        `Error in getGeoBoundBoxFromZipCode: ${res.status} ${res.statusText}`,
      );
    }

    const [location] = (await res.json()) as FetchLocation[];

    const { latitude, longitude } = location;

    const centerLocation: GeoPoint = {
      lat: latitude,
      lon: longitude,
    } as GeoPoint;

    const radiusKm = searchRadius;
    const boundingBox = await calculateBoundingBox(centerLocation, radiusKm);

    return boundingBox;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default getGeoBoundBoxFromZipCode;
