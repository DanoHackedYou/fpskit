import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const pages = [
  '', 'edpi/', 'sensibilidad/', 'polling-rate/', 'tiempo-fotograma/',
  'hz-vs-fps/', 'resolucion-aspecto/', 'tiempo-descarga/',
  'almacenamiento-clips/', 'bitrate-video/', 'raton-y-punteria/',
  'rendimiento-y-pantalla/', 'descargas-y-grabacion/', 'sobre-fpskit/',
  'privacidad/', 'cookies/', 'aviso-legal/', 'contacto/'
];
const indexable = pages.filter((route) => !['privacidad/', 'cookies/', 'aviso-legal/', 'contacto/'].includes(route));
const titles = new Set();
const descriptions = new Set();
for (const route of pages) {
  const file = new URL(`${route}index.html`, root);
  await access(file);
  const html = await readFile(file, 'utf8');
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<meta name="description"/);
  assert.match(html, /href="\/favicon\.svg"/);
  assert.match(html, /href="\/"/);
  assert.match(html, /href="\/aviso-legal\/"/);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title), `título único en ${route || '/'}`);
  assert.ok(description && !descriptions.has(description), `descripción única en ${route || '/'}`);
  titles.add(title);
  descriptions.add(description);
  if (indexable.includes(route)) assert.match(html, new RegExp(`<link rel="canonical" href="https://fpskit\\.pages\\.dev/${route}"`));
}

assert.equal(800 * 0.35, 280, 'eDPI');
assert.equal((800 * 0.35) / 1600, 0.175, 'conversión DPI');
assert.ok(Math.abs((100e9 * 8) / (300e6 * 0.9) - 2962.962963) < 0.001, 'descarga bits/bytes');
assert.equal((50e6 * 120 * 20) / 8 / 1e9, 15, 'clips');
assert.ok(Math.abs(1000 / 144 - 6.944444) < 0.000001, 'frame time');
assert.equal(1000 / 1000, 1, 'polling rate');
assert.equal(Math.min(120, 144), 120, 'Hz frente a FPS');
assert.equal((2560 * 1440 * 100) / (1920 * 1080), 177.77777777777777, 'carga de resolución');
assert.ok(Math.abs(((50e6 + 320e3) * 3600) / 8 / 1e9 - 22.644) < 0.000001, 'bitrate');

const script = await readFile(new URL('../assets/app.js', import.meta.url), 'utf8');
new Function(script);
assert.match(script, /G-YXBECNCST0/);
assert.match(script, /analytics_storage: 'granted'/);
assert.ok(script.indexOf("consent', 'default'") < script.indexOf("window.gtag('config'"));
assert.doesNotMatch(await readFile(new URL('../index.html', import.meta.url), 'utf8'), /googletagmanager\.com/);
const sitemap = await readFile(new URL('../sitemap.xml', import.meta.url), 'utf8');
assert.equal((sitemap.match(/<url>/g) || []).length, 14);
const buildScript = await readFile(new URL('./build.mjs', import.meta.url), 'utf8');
assert.match(buildScript, /assetVersion/);
assert.match(buildScript, /google-adsense-account/);
assert.match(buildScript, /ca-pub-3665999275525388/);
assert.equal((await readFile(new URL('../ads.txt', import.meta.url), 'utf8')).trim(), 'google.com, pub-3665999275525388, DIRECT, f08c47fec0942fa0');
console.log(`FPSKit: ${pages.length} páginas y 9 fórmulas verificadas`);
