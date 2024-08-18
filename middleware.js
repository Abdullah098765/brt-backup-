import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request, response) {
    const cook = cookies();
    const loginUser = cook.get("bragtimelogin");
    if (loginUser?.value) {
        if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    } else {
        if (request.nextUrl.pathname === "/home") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
}
