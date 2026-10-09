// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import preact from '@astrojs/preact';

import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  site: 'https://ascendrow.com',
  output: 'static',
  integrations: [
    react({ exclude: ['**/src/**'] }),
    preact({ compat: false, include: ['**/src/**/*.tsx', '**/src/**/*.jsx'] }),
    sitemap(),
    keystatic()
  ],
  adapter: isDev ? undefined : cloudflare(),
  vite: {
    define: {
      'process.env.KEYSTATIC_GITHUB_CLIENT_ID': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_ID),
      'process.env.KEYSTATIC_GITHUB_CLIENT_SECRET': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET),
      'process.env.KEYSTATIC_SECRET': JSON.stringify(process.env.KEYSTATIC_SECRET),
      'process.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG': JSON.stringify(process.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG),
    }
  }
});