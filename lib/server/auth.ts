import { cookies } from "next/headers";

export const isAuthenticated = () => {
  const cookieName = process.env.NEXT_PUBLIC_FETCH_COOKIE;
  if (!cookieName) return false;

  return cookies().has(cookieName);
};

interface UserCredentialsProps {
  email: string;
  name: string;
}

export const getUserCredentialsFromCookieValue = (sessionToken: string) => {
  if (!sessionToken) return null;

  const [_, base64Payload] = sessionToken.split(".");
  const decodedBase64Payload = Buffer.from(base64Payload, "base64").toString();
  const userCredentials = JSON.parse(
    decodedBase64Payload,
  ) as UserCredentialsProps;

  return userCredentials;
};

export default getUserCredentialsFromCookieValue;
