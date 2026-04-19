import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const auth = withAuth(
  function proxy(req: NextRequest) {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export default auth;

export const config = {
  matcher: ["/dashboard/:path*"],
};