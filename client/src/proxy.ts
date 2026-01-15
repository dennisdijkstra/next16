import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/', '/settings']

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname)

  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (accessToken && ! isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // const decoded = await jose.jwtVerify(accessToken!.value, new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN_SECRET))
  // console.log(decoded)
  return NextResponse.next()
}

export const config = { matcher: '/((?!.*\\.).*)' }
