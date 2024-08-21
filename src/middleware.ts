import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function sendFetch(req: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(req.headers)

  // Add API key to Authorization header
  requestHeaders.set('Authorization', `Bearer ${process.env.DE_BACKEND_API_KEY}`)

  // A default error response
  const errorResponse: NextResponse = NextResponse.json({ error: 'Unknown error.' }, { status: 502 })

  const baseURL = process.env.DE_BASE_URL;
  const newURL = new URL(req.nextUrl.pathname, baseURL).toString()

  try {
    const response = await fetch(newURL, {
      method: req.method,
      headers: requestHeaders,
      body: req.body,
    })

    return response;
  } catch (error: any) {
    console.error(error)
    return errorResponse
  }
}

export async function middleware(request: NextRequest) {
  return await sendFetch(request);
}

export const config = {
  matcher: ['/v1/completions', '/v1/chat/completions']
};