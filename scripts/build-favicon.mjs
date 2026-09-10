import sharp from 'sharp';
import fs from 'node:fs';

/**
 * Favicon set from the Ascendrow "A" mark.
 *
 * Run: node scripts/build-favicon.mjs
 *
 * Produces:
 *   favicon.ico          16 + 32px, PNG-in-ICO — covers the legacy /favicon.ico
 *                        request browsers make whether or not you link one
 *   favicon-32.png       the modern link target
 *   apple-touch-icon.png 180px on a solid ground — iOS ignores transparency and
 *                        composites it onto black or white, so the padding and
 *                        background are baked in rather than left to chance
 */

const SRC = 'D:/ehack_new/app/(diploma)/diploma-images/Ascendrow-favicon-br.png';
const OUT = 'public';

const trimmed = await sharp(SRC)
  .ensureAlpha()
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 })
  .toBuffer();

const meta = await sharp(trimmed).metadata();
console.log(`source mark: ${meta.width}x${meta.height}`);

/**
 * Square PNG of the mark, centred.
 *
 * `fill` is the fraction of the canvas the mark may occupy. The mark is
 * 1.21:1 — wider than tall — so fitting it inside a square makes WIDTH the
 * binding constraint and the height only reaches ~83% of that fraction. At
 * fill 0.82 it filled barely two thirds of the canvas vertically, which is
 * why it read as small in a tab. Tab icons now go edge to edge.
 */
async function square(size, background, fill = 1) {
  const inner = Math.round(size * fill);
  const mark = await sharp(trimmed)
    .resize({ width: inner, height: inner, fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  const m = await sharp(mark).metadata();
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([
      {
        input: mark,
        top: Math.round((size - m.height) / 2),
        left: Math.round((size - m.width) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const INK = { r: 15, g: 15, b: 20, alpha: 1 };

const png16 = await square(16, TRANSPARENT, 1);
const png32 = await square(32, TRANSPARENT, 1);
const png180 = await square(180, INK, 0.9);

fs.writeFileSync(`${OUT}/favicon-32.png`, png32);
fs.writeFileSync(`${OUT}/apple-touch-icon.png`, png180);

/**
 * Minimal multi-size ICO. The format allows a whole PNG as the payload of an
 * entry (Vista onward), so no BMP encoding is needed — just the 6-byte
 * directory header, one 16-byte entry per size, then the PNG bytes.
 */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const dir = [];
  for (const { size, data } of entries) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette size
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    dir.push(e);
    offset += data.length;
  }

  return Buffer.concat([header, ...dir, ...entries.map((e) => e.data)]);
}

const ico = buildIco([
  { size: 16, data: png16 },
  { size: 32, data: png32 },
]);
fs.writeFileSync(`${OUT}/favicon.ico`, ico);

const kb = (b) => (b.length / 1024).toFixed(1) + ' KB';
console.log(`favicon.ico          16+32   ${kb(ico)}`);
console.log(`favicon-32.png       32x32   ${kb(png32)}`);
console.log(`apple-touch-icon.png 180x180 ${kb(png180)}  (on #0F0F14)`);
