import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function sendFetch(req: NextRequest) {
  // A default error response
  const errorResponse: NextResponse = NextResponse.json({ error: 'Unknown error.' }, { status: 502 });

  // Create a headers object
  const requestHeaders = new Headers();

  // Add authorization and other relevant headers
  requestHeaders.set('Authorization', `Bearer ${process.env.DE_BACKEND_API_KEY}`);
  requestHeaders.set('Accept', 'application/json');
  requestHeaders.set('Content-Type', 'application/json');

  const newURL = new URL(process.env.DE_BASE_URL + req.nextUrl.pathname).toString();

  try {
    const response = await fetch(newURL, {
      method: req.method,
      headers: requestHeaders,
      body: req.body,
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return errorResponse;
  }
}

export async function middleware(request: NextRequest) {
  return await sendFetch(request);
}

// Use the middleware only for certain endpoints
export const config = {
  matcher: ['/v1/completions', '/v1/chat/completions']
};