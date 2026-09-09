// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://ascendrow.com',
  integrations: [preact()],

  // Output is fully static — `astro build` emits plain HTML/CSS/JS that
  // Cloudflare serves straight from its edge. No adapter needed for that.
  //
  // @astrojs/cloudflare is installed and ready. Re-enable it when we add the
  // first server route (the contact form action):
  //   import cloudflare from '@astrojs/cloudflare';
  //   adapter: cloudflare(),
  // Its workerd dev runner currently conflicts with Vite's SSR dep optimizer,
  // so it stays off while the site is static-only.
});
