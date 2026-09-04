import { cp, mkdir, rm } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const entries = [
  'index.html', '404.html', 'assets', 'edpi', 'sensibilidad',
  'tiempo-descarga', 'almacenamiento-clips', 'sobre-fpskit',
  'privacidad', 'cookies', 'aviso-legal', 'favicon.svg', 'og.png',
  'robots.txt', 'sitemap.xml', '_headers', '_redirects'
];

for (const entry of entries) {
  await cp(new URL(`../${entry}`, import.meta.url), new URL(`../dist/${entry}`, import.meta.url), { recursive: true });
}

console.log(`FPSKit: ${entries.length} entradas copiadas a dist/`);
