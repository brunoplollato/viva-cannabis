import { getToken } from 'next-auth/jwt';
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const { pathname } = request.nextUrl;

  if (
    pathname === "/login" && token
  )
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (
    (pathname.startsWith("/dashboard") && !token)
  )
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|login|not-found|_next/static|_next/image|favicon.ico).*)',
  ],
};
