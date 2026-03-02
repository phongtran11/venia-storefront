"use server";

import { setCookie, deleteCookie } from "@/lib/cookie";

export async function loginAction(token: string) {
  // Store the authentication token in a cookie.
  // In a real application, you should likely configure this with additional secure flags as appropriate (e.g. `httpOnly`, `secure`, `sameSite`).
  // @ts-expect-error - auth_token is an extended key not yet populated in the base typed list
  await setCookie("auth_token", token);
}

export async function logoutAction() {
  // @ts-expect-error - auth_token is an extended key not yet populated in the base typed list
  await deleteCookie("auth_token");
}
