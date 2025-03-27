import "@clerk/nextjs/server";

declare module "@clerk/nextjs/server" {
  interface SessionClaims {
    publicMetadata?: {
      role?: "admin" | "user";
    };
  }
}

declare global {
  namespace Clerk {
    interface AuthData {
      sessionClaims?: SessionClaims;
    }
  }
}