import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function sendFetch(req: NextRequest) {
  // A default error response
  const errorResponse: NextResponse = NextResponse.json({ error: 'Unknown error.' }, { status: 502 });

  const origHeaders = req.headers;
  const apiKey = origHeaders.get("DE_BACKEND_API_KEY") || "";
  const baseUrl = origHeaders.get("DE_BASE_URL") || "";

  // Create a headers object
  const newHeaders = new Headers();

  // Add authorization and other relevant headers
  newHeaders.set('Authorization', `Bearer ${apiKey}`);
  newHeaders.set('Accept', 'application/json');
  newHeaders.set('Content-Type', 'application/json');

  const newURL = new URL(baseUrl + req.nextUrl.pathname).toString();

  try {
    const response = await fetch(newURL, {
      method: req.method,
      headers: newHeaders,
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