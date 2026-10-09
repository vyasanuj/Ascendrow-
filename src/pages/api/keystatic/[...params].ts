import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import keystaticConfig from '../../../../keystatic.config';
import type { APIContext } from 'astro';
// @ts-ignore
import { env } from 'cloudflare:workers';

export const prerender = false;

export const ALL = async (context: APIContext) => {
  const pEnv = (globalThis as any).process?.env || {};
  
  try {
    const handler = makeGenericAPIRouteHandler({
      config: keystaticConfig,
      clientId: env.KEYSTATIC_GITHUB_CLIENT_ID || pEnv.KEYSTATIC_GITHUB_CLIENT_ID,
      clientSecret: env.KEYSTATIC_GITHUB_CLIENT_SECRET || pEnv.KEYSTATIC_GITHUB_CLIENT_SECRET,
      secret: env.KEYSTATIC_SECRET || pEnv.KEYSTATIC_SECRET,
    });
    
    const keystaticResponse = await handler(context.request);
    
    if (!keystaticResponse) {
      return new Response('Not Found', { status: 404 });
    }
    
    return new Response(keystaticResponse.body as any, {
      status: keystaticResponse.status,
      headers: keystaticResponse.headers,
    });
  } catch (e: any) {
    return new Response(`Keystatic API Error: ${e.message}\n\nStack:\n${e.stack}`, { status: 500 });
  }
};
