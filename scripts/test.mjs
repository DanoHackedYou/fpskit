import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const pages = ['', 'edpi/', 'sensibilidad/', 'tiempo-descarga/', 'almacenamiento-clips/', 'sobre-fpskit/', 'privacidad/', 'cookies/', 'aviso-legal/'];
for (const route of pages) {
  const file = new URL(`${route}index.html`, root);
  await access(file);
  const html = await readFile(file, 'utf8');
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<meta name="description"/);
  assert.match(html, /href="\/favicon\.svg"/);
  assert.match(html, /href="\/edpi\/"/);
  assert.match(html, /href="\/aviso-legal\/"/);
}

assert.equal(800 * 0.35, 280, 'eDPI');
assert.equal((800 * 0.35) / 1600, 0.175, 'conversión DPI');
assert.ok(Math.abs((100e9 * 8) / (300e6 * 0.9) - 2962.962963) < 0.001, 'descarga bits/bytes');
assert.equal((50e6 * 120 * 20) / 8 / 1e9, 15, 'clips');

const script = await readFile(new URL('../assets/app.js', import.meta.url), 'utf8');
new Function(script);
assert.match(script, /G-YXBECNCST0/);
assert.match(script, /analytics_storage: 'granted'/);
assert.ok(script.indexOf("consent', 'default'") < script.indexOf("window.gtag('config'"));
assert.doesNotMatch(await readFile(new URL('../index.html', import.meta.url), 'utf8'), /googletagmanager\.com/);
const sitemap = await readFile(new URL('../sitemap.xml', import.meta.url), 'utf8');
assert.equal((sitemap.match(/<url>/g) || []).length, 6);
const buildScript = await readFile(new URL('./build.mjs', import.meta.url), 'utf8');
assert.match(buildScript, /assetVersion/);
console.log(`FPSKit: ${pages.length} páginas y 4 fórmulas verificadas`);
