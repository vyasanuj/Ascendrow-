import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import keystaticConfig from '../../../../keystatic.config';
import type { APIContext } from 'astro';
// @ts-ignore
import { env } from 'cloudflare:workers';

export const prerender = false;

export const ALL = async (context: APIContext) => {
  const pEnv = (globalThis as any).process?.env || {};
  
  const handler = makeGenericAPIRouteHandler({
    config: keystaticConfig,
    clientId: env.KEYSTATIC_GITHUB_CLIENT_ID || pEnv.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: env.KEYSTATIC_GITHUB_CLIENT_SECRET || pEnv.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: env.KEYSTATIC_SECRET || pEnv.KEYSTATIC_SECRET,
  });
  
  return handler(context.request);
};
