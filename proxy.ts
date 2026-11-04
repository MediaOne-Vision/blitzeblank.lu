import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { resolveBlogDestination } from "./lib/legacy-redirects.mjs"

const INDEXABLE_HOST = "blitzeblank.lu"

// Reste der alten WordPress-Installation ohne Gegenstück auf der neuen Seite
const GONE_PATHS = /^\/(wp-admin|wp-includes|wp-content|wp-json|log-in|product)(\/|$)|(^|\/)feed\/?$/

export function proxy(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || request.headers.get("host") || ""
  const hostname = host.split(":")[0].toLowerCase().replace(/\.$/, "")

  if (hostname === `www.${INDEXABLE_HOST}`) {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${INDEXABLE_HOST}`)
    return NextResponse.redirect(target, 308)
  }

  const { pathname, searchParams } = request.nextUrl
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    const destination = resolveBlogDestination(searchParams.get("post"))
    return NextResponse.redirect(new URL(destination, request.url), 308)
  }

  if (GONE_PATHS.test(request.nextUrl.pathname)) {
    return new NextResponse("Gone", { status: 410, headers: { "X-Robots-Tag": "noindex" } })
  }

  const response = NextResponse.next()

  if (hostname !== INDEXABLE_HOST) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow")
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

export default proxy
