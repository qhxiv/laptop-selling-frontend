import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Temporarily allow all requests
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // Always authorize
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"],
} 