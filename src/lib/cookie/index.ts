import { cookies } from "next/headers";

export const COOKIE_KEYS = {
  STORE: "store",
  CURRENCY: "currency",
} as const;

export type CookieKey = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];

export const getCookie = async (key: CookieKey) => {
  return (await cookies()).get(key)?.value;
};

export const setCookie = async (key: CookieKey, value: string) => {
  return (await cookies()).set(key, value);
};

export const deleteCookie = async (key: CookieKey) => {
  return (await cookies()).delete(key);
};

export const hasCookie = async (key: CookieKey) => {
  return (await cookies()).has(key);
};

export const getAllCookies = async () => {
  return (await cookies()).getAll() as { name: CookieKey; value?: string }[];
};
