# Getting Started with the Drama Engine on Vercel and Next.js

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub%2Ecom%2FWrite%2Dwith%2DLAIKA%2Fdrama%2Dengine%2Dtemplate)

This project provides a template to quickly get started with using the [Drama Engine](https://drama-engine.com) with Vercel and the Next.js framework.

The Drama Engine is a framework for agentic interaction with language models. It is written in TypeScript to execute in any browser, enabling front-end developers to directly work with agents. The Drama Engine is model- and provider-agnostic.

A more detailed documentation can be found in the [Drama Engine Technical Report](https://drama-engine.com/documentation/Drama%20Engine%20Technical%20Report.pdf).

Get the source code in the [Drama Engine git repository](https://github.com/Write-with-LAIKA/drama-engine).

## Setup

This template requires you to enter your own API key. Sign up with a language model provider like [Together.ai](https://www.together.ai) or [Novita AI](http://novita.ai) and retrieve your key there. Then, enter your provider's base URL, their completion endpoint, your API key, and the model you want to use in the interface that pops up once you run the template. If everything is correctly set up you can start chatting with two companions individually and in a group chat. Edit the file ```companions.ts``` if you want to change the personality of the companions.

## Next.js functionality

The relevant code can be found in `src/middleware.ts`. This middleware is designed to be activated only for the paths `/v1/completions` and `/v1/chat/completions`. When activated, it adds the necessary API keys and other relevant headers to the request, and then forwards the modified request to the upstream server. The response is then returned directly to the original source without any modifications.

## Important Note

While this middleware template helps to prevent API keys and credentials from being exposed to clients, it is not a foolproof solution as the requests are simply being forwarded. Hence, it is essential to add additional logic to authorize clients and only forward authorized requests to the upstream server.
