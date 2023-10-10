import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};

// currently unused, will be used later for auth and a/b testing at edge
export function middleware(request: NextRequest) {
  return NextResponse.next();
}
