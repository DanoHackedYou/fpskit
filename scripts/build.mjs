import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const entries = [
  'index.html', '404.html', 'assets', 'edpi', 'sensibilidad',
  'tiempo-descarga', 'almacenamiento-clips', 'sobre-fpskit',
  'privacidad', 'cookies', 'aviso-legal', 'contacto', 'favicon.svg', 'og.png',
  'raton-y-punteria', 'rendimiento-y-pantalla', 'descargas-y-grabacion',
  'tiempo-fotograma', 'polling-rate', 'hz-vs-fps', 'resolucion-aspecto',
  'bitrate-video', 'robots.txt', 'sitemap.xml', 'ads.txt', '_headers', '_redirects'
];

for (const entry of entries) {
  await cp(new URL(`../${entry}`, import.meta.url), new URL(`../dist/${entry}`, import.meta.url), { recursive: true });
}

const htmlEntries = [
  'index.html', '404.html', 'edpi/index.html', 'sensibilidad/index.html',
  'tiempo-descarga/index.html', 'almacenamiento-clips/index.html',
  'sobre-fpskit/index.html', 'privacidad/index.html', 'cookies/index.html',
  'aviso-legal/index.html', 'contacto/index.html', 'raton-y-punteria/index.html',
  'rendimiento-y-pantalla/index.html', 'descargas-y-grabacion/index.html',
  'tiempo-fotograma/index.html', 'polling-rate/index.html',
  'hz-vs-fps/index.html', 'resolucion-aspecto/index.html', 'bitrate-video/index.html'
];
const assetVersion = '20260904-adsense';
const adsenseAccountMeta = '<meta name="google-adsense-account" content="ca-pub-3665999275525388">';
for (const entry of htmlEntries) {
  const file = new URL(`../dist/${entry}`, import.meta.url);
  const html = await readFile(file, 'utf8');
  await writeFile(file, html
    .replace('<meta charset="utf-8">', `<meta charset="utf-8">${adsenseAccountMeta}`)
    .replaceAll('/assets/styles.css', `/assets/styles.css?v=${assetVersion}`)
    .replaceAll('/assets/app.js', `/assets/app.js?v=${assetVersion}`));
}

console.log(`FPSKit: ${entries.length} entradas copiadas a dist/`);
