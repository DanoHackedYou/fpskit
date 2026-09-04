# Registro maestro — cartera web

Actualizado: 4 de septiembre de 2026.

## Cartera

| Nº | Proyecto | Nicho | Estado | URL | Repositorio | Coste acumulado | Ingresos |
|---:|---|---|---|---|---|---:|---:|
| 01 | FPSKit | Herramientas PC gaming | Publicada | https://fpskit.pages.dev/ | https://github.com/DanoHackedYou/fpskit | 0 € | 0 € |

## FPSKit — estado actual

- Fuente original: el Work recibido no contenía el MVP ni un ZIP; solo contenía el encargo. El sitio se reconstruyó desde cero conforme a la especificación.
- Arquitectura: web estática, HTML semántico, CSS y JavaScript sin dependencias en producción.
- Rutas: inicio, cuatro herramientas, sobre el proyecto, privacidad, cookies, aviso legal y 404.
- SEO: títulos y descripciones únicos; canonical, sitemap y robots con URL pública; enlazado interno y contenido explicativo.
- Privacidad: no hay cuentas ni anuncios. GA4 solo se carga tras una aceptación expresa; rechazo y cambio de elección disponibles en todas las páginas.
- Servicios: Cloudflare Pages activo; propiedad URL de Search Console verificada; sitemap enviado (el primer estado mostrado fue «No se ha podido obtener», aunque el recurso público respondía correctamente); propiedad y flujo web de Analytics configurados. AdSense no está configurado.
- GitHub: repositorio público `DanoHackedYou/fpskit`, rama de producción `main`.
- Cloudflare Pages: `https://fpskit.pages.dev/`, integración Git activa, configuración `npm run build` → `dist`.

## QA

- Casos matemáticos de referencia automatizados: eDPI 800 × 0,35 = 280; conversión 800 × 0,35 ÷ 1600 = 0,175; descarga con conversión de bytes a bits; clips 50 Mbps × 120 s × 20 ÷ 8 = 15 GB.
- Comprobaciones automatizadas de rutas, metadatos básicos, navegación, sitemap y sintaxis JavaScript.
- Pendiente tras desplegar: navegación real pública, 404, cabeceras, viewport móvil, consola, URL canónica y rendimiento de campo.

## SEO y crecimiento

Backlog sin páginas vacías:

1. Calculadora de frame time (FPS ↔ milisegundos), por utilidad y relación directa con rendimiento.
2. Comparador Hz/FPS, con explicación de refresco, latencia y tearing.
3. Calculadora de bitrate orientada a grabación local y streaming.
4. VRAM estimada: requiere investigación cuidadosa y evitar falsa precisión.
5. Polling rate y tiempo entre informes del ratón.
6. Resolución y aspect ratio.

Antes de implementar cada ruta: revisar resultados actuales, intención de búsqueda y fuentes técnicas. No se han atribuido volúmenes de búsqueda sin datos.

## Analytics, consentimiento y AdSense

- GA4: propiedad `FPSKit` y flujo web `https://fpskit.pages.dev/` creados; ID de medición `G-YXBECNCST0`. Integración básica: no se descarga la etiqueta antes de aceptar, se mantienen denegados almacenamiento publicitario, datos de usuario para anuncios y personalización, y se permite retirar la elección. La recepción se validó en producción: el informe en tiempo real mostró la sesión de prueba desde España.
- AdSense: no solicitado. La web necesita estar publicada, verificada, completar los datos legales del responsable, observar indexación/tráfico y ampliar utilidad real antes de evaluar una solicitud.
- Métricas futuras: pageviews, sesiones, páginas de entrada, consultas, CTR orgánico, países, dispositivos, RPM e ingresos.

## Costes e ingresos

| Fecha | Concepto | Tipo | Importe |
|---|---|---|---:|
| 2026-09-04 | Desarrollo local | Coste | 0 € |
| 2026-09-04 | Hosting previsto en free tier | Coste | 0 € |

Beneficio acumulado: 0 €.

## Próximos pasos operativos

1. Volver a comprobar en Search Console el estado del sitemap tras el periodo inicial de procesamiento.
2. Completar datos legales del responsable antes de monetizar.
3. Recoger datos reales antes de priorizar nuevas herramientas o AdSense.
4. Antes de AdSense, implantar una CMP certificada por Google para EEE, Reino Unido y Suiza y actualizar las políticas.
