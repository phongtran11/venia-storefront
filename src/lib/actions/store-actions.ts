"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function setStoreAction(storeCode: string) {
    const cookieStore = await cookies()
    cookieStore.set("store", storeCode, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
    })
    revalidatePath("/")
}

export async function setCurrencyAction(currencyCode: string) {
    const cookieStore = await cookies()
    cookieStore.set("currency", currencyCode, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
    })
    revalidatePath("/")
}
