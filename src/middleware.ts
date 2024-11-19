import { NextRequest, NextResponse } from "next/server";
import { authRoutes, apiAuthPrefix, publicRoutes } from "@/routes";

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const url = req.nextUrl.clone();
  url.pathname = "/login";

  if (isApiAuthRoute || isAuthRoute || publicRoutes) {
    return NextResponse.next();
  }

  if (!isApiAuthRoute && !isAuthRoute && !publicRoutes) {
    return NextResponse.redirect(url);
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!.*\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
