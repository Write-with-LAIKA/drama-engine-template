# Getting Started with the Drama Engine on Vercel and Next.js

This project provides a template to quickly get started with using the [Drama Engine](https://drama-engine.com) with Vercel and the Next.js framework.

The relevant code can be found in `src/middleware.ts`. This middleware is designed to be activated only for the paths `/v1/completions` and `/v1/chat/completions`. When activated, it adds the necessary API keys and other relevant headers to the request, and then forwards the modified request to the upstream server. The response is then returned directly to the original source without any modifications.

## Important Note

While this middleware template helps to prevent API keys and credentials from being exposed to clients, it is not a foolproof solution as the requests are simply being forwarded. Hence, it is essential to add additional logic to authorize clients and only forward authorized requests to the upstream server.
