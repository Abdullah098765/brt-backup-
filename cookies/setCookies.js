"use server";

import { cookies } from "next/headers";

export async function createCookies(data) {
    cookies().set({
        name: "bragtimelogin",
        value: data,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    });
}
