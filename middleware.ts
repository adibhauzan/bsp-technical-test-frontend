import { NextRequest, NextResponse } from "next/server";
import { getDecodedToken } from "./lib/jwt";
import { cookies } from "next/headers";

const protectedRoutes = ["/admin", "/customer"];
const publicRoutes = ["/sign-in", "/register", "/"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const access_token = cookies().get("access_token")?.value;
  if (isProtectedRoute && !access_token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isProtectedRoute && access_token) {
    const decodedToken = getDecodedToken(access_token);
    if (decodedToken.Level === "1" && !path.startsWith("/admin")) {
      console.log(decodedToken.Level === "1");
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (decodedToken.Level === "2" && !path.startsWith("/customer")) {
      return NextResponse.redirect(new URL("/customer", req.url));
    }
  }
}
