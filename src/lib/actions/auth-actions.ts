"use server";

import { setCookie, deleteCookie, COOKIE_KEYS } from "@/lib/cookie";

export async function loginAction(token: string) {
  await setCookie(COOKIE_KEYS.AUTH_TOKEN, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
}

export async function logoutAction() {
  await deleteCookie(COOKIE_KEYS.AUTH_TOKEN);
}
