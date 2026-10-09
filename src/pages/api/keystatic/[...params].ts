import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import keystaticConfig from '../../../../keystatic.config';
import type { APIContext } from 'astro';

export const ALL = async (context: APIContext) => {
  // Grab the environment variables directly from Cloudflare's runtime
  const env = (context.locals as any).runtime?.env || process.env;
  
  const handler = makeGenericAPIRouteHandler(keystaticConfig, {
    clientId: env?.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: env?.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: env?.KEYSTATIC_SECRET,
  });
  
  return handler(context.request);
};
