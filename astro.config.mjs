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
  adapter: isDev ? undefined : cloudflare()
});