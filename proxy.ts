import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const INDEXABLE_HOST = "blitzeblank.lu"

export function proxy(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || request.headers.get("host") || ""
  const hostname = host.split(":")[0].toLowerCase().replace(/\.$/, "")

  if (hostname === `www.${INDEXABLE_HOST}`) {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${INDEXABLE_HOST}`)
    return NextResponse.redirect(target, 308)
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
