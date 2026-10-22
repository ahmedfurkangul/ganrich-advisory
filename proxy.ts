import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ganrich-language", request.nextUrl.pathname.startsWith("/tr") ? "tr" : "en");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/en/:path*", "/tr/:path*"],
};
