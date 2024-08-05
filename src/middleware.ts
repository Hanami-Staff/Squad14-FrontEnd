import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  const cookieUser = cookies().get('user')
  if (!cookieUser) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: "/user/:path*"
}