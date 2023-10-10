import { Favorite, User } from "@prisma/client";

// User Interfaces
export type SerializableUser = Omit<
  User,
  "createdAt" | "updatedAt" | "favorites"
> & {
  createdAt: string;
  updatedAt: string;
  favorites: SerializableFavorite[];
  session: string;
};

export type SerializableFavorite = Omit<Favorite, "createdAt"> & {
  createdAt: string;
};

export interface IDBUser {
  email: string;
  name: string;
  session: string;
}

export interface UserCredentialsProps {
  email: string;
  name: string;
}

// Dog Interfaces
export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface DogIdsMetadata {
  total: number;
  resultIds: string[];
  next: string;
  prev?: string;
}

export interface IDogSearchParams {
  [key: string]: any;
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: string;
  sort?: string;
}

// Location Interfaces
export interface FetchLocation {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface FetchLocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: GeoBoundingBox;
  size?: number;
  from?: string;
}

export interface GeoBoundingBox {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface FetchLocationMetdata {
  total: number;
  results: FetchLocation[];
}
