import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

// MyZurich protected routes
const protectedRoutes: { [key: string]: "admin" | "user" } = {
  "/billing/add-new-billing": "admin",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Middleware Path:", pathname);

  if (pathname.startsWith("/api/auth")) {
    console.log("Skipping middleware for OAuth callback");
    return NextResponse.next();
  }
  const session = await auth();
  console.log("middleware path", pathname);
  console.log("session middleware:", session);

  if (pathname === "/login" && session?.user) {
    console.log("Redirecting authenticated user from /login to /billing");
    return NextResponse.redirect(new URL("/billing", request.url));
  }

  const requiredRole = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (requiredRole) {
    const roleRequired = protectedRoutes[requiredRole];
    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session.user.role !== roleRequired) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
