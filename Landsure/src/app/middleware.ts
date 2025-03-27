import { authMiddleware } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";

declare module "@clerk/nextjs/server" {
  interface ClerkMiddlewareAuth {
    sessionClaims?: {
      publicMetadata?: {
        role?: "admin" | "user";
      };
    };
  }
}

export default authMiddleware({
  publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)"],
  ignoredRoutes: ["/api/webhook/clerk"],
  afterAuth: (auth: ClerkMiddlewareAuth, req: NextRequest) => {
    const { pathname } = req.nextUrl;

    // Redirect unauthenticated users
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Admin route protection
    if (pathname.startsWith("/admin")) {
      if (!auth.userId) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
      
      const role = auth.sessionClaims?.publicMetadata?.role;
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/admin/(.*)",
    "/((?!.+\\.[\\w]+$|_next|api|trpc).*)",
    "/",
  ],
};