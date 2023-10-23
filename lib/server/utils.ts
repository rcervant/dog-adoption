"use server";

import {
  ASCENDING,
  EARTH_RADIUS_KM,
  SEMI_COLON,
  VALID_PARAMS,
} from "@/lib/constants";
import { GeoPoint, IDogSearchParams } from "@/types";
import queryString from "query-string";

export async function getQueryFromSearchParams(searchParams: IDogSearchParams) {
  const params = searchParams.sort
    ? searchParams
    : { ...searchParams, sort: `breed:${ASCENDING}` };

  const query = queryString.stringify(params, {
    arrayFormat: "none",
    skipEmptyString: true,
    skipNull: true,
  });

  return query;
}

interface ISearchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function getSanitizedSearchParams({
  searchParams,
}: ISearchParams): Promise<IDogSearchParams> {
  const isParamValid = (key: string): boolean =>
    Object.hasOwn(VALID_PARAMS, key);

  const isValueValid = (value: string | string[]): boolean =>
    value !== undefined;

  const sanitizedSearchParams: IDogSearchParams = Object.entries(
    searchParams,
  ).reduce(
    (filteredSearchParams, [searchParam, value]) => {
      if (!value) return filteredSearchParams;

      if (isParamValid(searchParam) && isValueValid(value)) {
        return { ...filteredSearchParams, [searchParam]: value };
      }

      return filteredSearchParams;
    },
    { sort: `breed:${ASCENDING}` },
  );

  return sanitizedSearchParams;
}

interface IGetCookieString {
  stringToSearchThrough: string;
  stringToSearchFor: string;
}

export async function getCookieString({
  stringToSearchThrough,
  stringToSearchFor,
}: IGetCookieString) {
  const stringToLookForIndex = stringToSearchThrough.indexOf(stringToSearchFor);
  const stringToSearchThroughLength = stringToSearchThrough.length;

  let cookieString = "";
  let i = stringToLookForIndex;
  while (i < stringToSearchThroughLength) {
    const char = stringToSearchThrough[i];

    if (char === SEMI_COLON) break;

    cookieString += char;
    i += 1;
  }

  return cookieString;
}

export async function calculateBoundingBox(center: GeoPoint, radiusKm: number) {
  const earthRadiusKm = EARTH_RADIUS_KM;

  const latRadians = center.lat * (Math.PI / 180);
  const lonRadians = center.lon * (Math.PI / 180);

  const angularRadius = radiusKm / earthRadiusKm;

  const minLat = latRadians - angularRadius;
  const maxLat = latRadians + angularRadius;

  const minLon = lonRadians - angularRadius / Math.cos(latRadians);
  const maxLon = lonRadians + angularRadius / Math.cos(latRadians);

  const bottomLeft = {
    lat: parseFloat((minLat * (180 / Math.PI)).toFixed(4)),
    lon: parseFloat((minLon * (180 / Math.PI)).toFixed(4)),
  };

  const topRight = {
    lat: parseFloat((maxLat * (180 / Math.PI)).toFixed(4)),
    lon: parseFloat((maxLon * (180 / Math.PI)).toFixed(4)),
  };

  return { bottomLeft, topRight };
}
