/**
 * Baixa as mídias do WordPress antigo a partir do export XML e otimiza com sharp.
 * Uso: node scripts/fetch-media.mjs
 *
 * Roda uma vez só — o resultado (public/images) é versionado no git.
 */
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const XML = join(ROOT, "_source", "austersade.WordPress.2026-07-29.xml");
const OUT = join(ROOT, "public", "images");

const MAX_WIDTH = 1920;
const TIMEOUT_MS = 120_000;
const RETRIES = 4;

async function download(url) {
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (attempt === RETRIES) throw err;
      const wait = attempt * 3000;
      console.warn(`  retry ${attempt}/${RETRIES - 1} em ${wait}ms (${err.message})`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

/** Redimensiona e recomprime. SVG passa direto. */
async function optimize(buf, ext) {
  if (ext === ".svg") return buf;
  const img = sharp(buf, { animated: false });
  const meta = await img.metadata();
  const pipeline = meta.width > MAX_WIDTH ? img.resize({ width: MAX_WIDTH }) : img;

  if (ext === ".png") return pipeline.png({ compressionLevel: 9, palette: true }).toBuffer();
  if (ext === ".webp") return pipeline.webp({ quality: 82 }).toBuffer();
  if (ext === ".avif") return pipeline.avif({ quality: 55 }).toBuffer();
  return pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

const xml = await readFile(XML, "utf8");
const urls = [...xml.matchAll(/<wp:attachment_url><!\[CDATA\[(.*?)\]\]><\/wp:attachment_url>/g)].map(
  (m) => m[1],
);

await mkdir(OUT, { recursive: true });
console.log(`${urls.length} mídias encontradas no export\n`);

let ok = 0;
let skipped = 0;
const failed = [];

for (const url of urls) {
  const name = basename(new URL(url).pathname);
  const ext = extname(name).toLowerCase();
  const dest = join(OUT, name);

  try {
    await stat(dest);
    skipped++;
    continue;
  } catch {
    /* não existe, baixa */
  }

  try {
    console.log(`↓ ${name}`);
    const raw = await download(url);
    const out = await optimize(raw, ext);
    await writeFile(dest, out);
    const saved = Math.round((1 - out.length / raw.length) * 100);
    console.log(`  ${(raw.length / 1024).toFixed(0)}kB → ${(out.length / 1024).toFixed(0)}kB (-${saved}%)`);
    ok++;
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
    failed.push(name);
  }
}

console.log(`\nbaixadas: ${ok} | já existiam: ${skipped} | falhas: ${failed.length}`);
if (failed.length) {
  console.log("falharam:", failed.join(", "));
  process.exitCode = 1;
}
