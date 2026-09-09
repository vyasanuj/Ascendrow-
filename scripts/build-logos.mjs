import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Logo pipeline.
 *
 * Every logo on the site renders as flat white on a dark ground, so this
 * script does the three things that makes that look deliberate:
 *   1. trims the source back to the mark's real bounding box — stock files
 *      are usually a small mark floating on a big empty canvas,
 *   2. normalises to one output height, and
 *   3. throws the colour away, keeping only the shape, which both bakes in
 *      the white and compresses far smaller than the original artwork.
 *
 * Run: node scripts/build-logos.mjs
 * Then copy the printed ratios into src/data/site.ts / content.ts — the
 * components use them to give every logo the same optical area.
 */

const SRC = 'D:/ehack_new/app/(diploma)/diploma-images';
const ROOT = 'D:/Ascendrow-final-design/ascendrow';

// Output height. Display sizes are 28–42px, so 160 gives >4x for retina.
const H = 160;

// knockout: for marks that are a LIGHT glyph sitting on a DARK solid shape.
// Alpha alone can't tell the two apart — both are opaque — so flattening to
// white would give a featureless blob. These use luminance to punch the light
// glyph back out, giving a white shape with the glyph showing through.
const SETS = [
  {
    label: 'client logos  → public/logos',
    out: 'public/logos',
    jobs: [
      ['profice-logo.png', 'profice.png'],
      ['ec-council-br.png', 'ec-council.png'],
      ['google-br.png', 'google.png'],
      ['HubSpot-br.png', 'hubspot.png'],
      ['jiva-br.png', 'jiva.png'],
      ['Meta-br.png', 'meta.png'],
      ['posthog-br.png', 'posthog.png'],
      ['master-union-br.png', 'masters-union.png'],
      ['tutela-br.png', 'tutela.png'],
      ['wati-br.png', 'wati.png'],
      ['dharita-br.png', 'dharita.png', { knockout: true }],
      ['campaign-logo-br.png', 'campaign.png'],
    ],
  },
  {
    label: 'stat brands   → public/brands',
    out: 'public/brands',
    jobs: [
      // Stat 1 — brands we've put into AI answers
      ['Claude-Logo-br.png', 'claude.png'],
      ['chatgpt-br.png', 'chatgpt.png'],
      ['perplexity-ai-logo.png', 'perplexity.png'],
      ['google-gemini-br.png', 'gemini.png'],

      // Stat 2 — keywords ranked on page one
      ['google-search-console-br.webp', 'search-console.png'],
      ['google-br.png', 'google.png'],
      ['Ahrefs-br.png', 'ahrefs.png'],
      ['Bing-br.png', 'bing.png'],
      ['semrush-br.png', 'semrush.png'],

      // Stat 3 — campaigns run on Google and Meta
      ['Google_Ads-br.webp', 'google-ads.png'],
      ['LinkedIn-Ads-br.png', 'linkedin-ads.png'],
      ['meta-ads-br.png', 'meta-ads.png'],
      ['Youtube-ads-br.png', 'youtube-ads.png'],
      ['reddit-ads-br.png', 'reddit-ads.png'],

      // Stat 4 — average lift in conversion rate
      ['figma-logo-br.png', 'figma.png'],
      ['Webflow-logo-br.png', 'webflow.png'],
      ['whimsical-logo-br.png', 'whimsical.png'],
      ['astro-logo-br.png', 'astro.png'],
      ['shadcn-Ui-logo-br.png', 'shadcn-ui.png'],
    ],
  },
];

for (const set of SETS) {
  const outDir = path.join(ROOT, set.out);
  fs.mkdirSync(outDir, { recursive: true });

  const rows = [];
  for (const [from, to, opts = {}] of set.jobs) {
    const src = path.join(SRC, from);
    if (!fs.existsSync(src)) {
      rows.push({ to, error: 'source missing' });
      continue;
    }
    const before = await sharp(src).metadata();
    try {
      const trimmed = await sharp(src)
        .ensureAlpha()
        // Trim fully-transparent padding back to the mark's real bounding box.
        .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
        // Never upscale. Enlarging a small source adds no detail — it just
        // makes a bigger, blurrier, worse-compressing file.
        .resize({ height: H, fit: 'inside', withoutEnlargement: true })
        .png()
        .toBuffer();

      const meta = await sharp(trimmed).metadata();

      const { data: rgba } = await sharp(trimmed)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const px = meta.width * meta.height;
      const alpha = Buffer.alloc(px);
      for (let i = 0; i < px; i++) {
        const a = rgba[i * 4 + 3];
        if (opts.knockout) {
          // Light pixels become holes, dark pixels stay solid.
          const lum =
            (0.2126 * rgba[i * 4] + 0.7152 * rgba[i * 4 + 1] + 0.0722 * rgba[i * 4 + 2]) / 255;
          alpha[i] = Math.round(a * (1 - lum));
        } else {
          alpha[i] = a;
        }
      }

      const buf = await sharp({
        create: {
          width: meta.width,
          height: meta.height,
          channels: 3,
          background: { r: 255, g: 255, b: 255 },
        },
      })
        .joinChannel(alpha, { raw: { width: meta.width, height: meta.height, channels: 1 } })
        .png({ compressionLevel: 9, palette: true })
        .toBuffer();

      fs.writeFileSync(path.join(outDir, to), buf);
      rows.push({
        to,
        before: `${before.width}x${before.height}`,
        after: `${meta.width}x${meta.height}`,
        ratio: (meta.width / meta.height).toFixed(2),
        kb: (buf.length / 1024).toFixed(1),
      });
    } catch (e) {
      rows.push({ to, error: String(e.message).slice(0, 70) });
    }
  }

  console.log('\n' + set.label);
  console.log('  ' + ['file', 'before', 'after', 'ratio', 'KB'].map((s) => s.padEnd(18)).join(''));
  for (const r of rows) {
    if (r.error) console.log('  ' + r.to.padEnd(18) + 'ERROR: ' + r.error);
    else
      console.log(
        '  ' +
          r.to.padEnd(18) +
          r.before.padEnd(18) +
          r.after.padEnd(18) +
          r.ratio.padEnd(18) +
          r.kb
      );
  }
}
