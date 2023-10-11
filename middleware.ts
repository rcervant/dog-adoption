import { NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
// allow all paths

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|search|sign-in).*)",
};

export function middleware(request: NextRequest) {
  return NextResponse.next();
}
