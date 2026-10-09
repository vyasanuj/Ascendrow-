import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  // Cloudflare Pages injects environment variables into context.locals.runtime.env
  // But Keystatic's internal code only knows how to look for them in process.env
  // This middleware bridges the gap by polyfilling process.env on every request
  const cloudflareEnv = (context.locals as any).runtime?.env;

  if (cloudflareEnv) {
    // Ensure process and process.env exist globally
    globalThis.process = globalThis.process || {};
    globalThis.process.env = globalThis.process.env || {};

    // Copy all Cloudflare environment variables into process.env
    Object.assign(globalThis.process.env, cloudflareEnv);
  }

  return next();
});
