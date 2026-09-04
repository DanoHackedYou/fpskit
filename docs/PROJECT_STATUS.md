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
- Privacidad: no hay cuentas, cookies propias, analítica ni anuncios.
- Servicios: Cloudflare Pages activo; propiedad URL de Search Console en proceso de verificación; Analytics y AdSense todavía no configurados.
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

- GA4: no instalado. Antes de activarlo se revisarán las condiciones vigentes de Google y el marco España/EEE; las etiquetas opcionales no deben cargarse antes de la elección aplicable.
- AdSense: no solicitado. La web necesita estar publicada, verificada, completar los datos legales del responsable, observar indexación/tráfico y ampliar utilidad real antes de evaluar una solicitud.
- Métricas futuras: pageviews, sesiones, páginas de entrada, consultas, CTR orgánico, países, dispositivos, RPM e ingresos.

## Costes e ingresos

| Fecha | Concepto | Tipo | Importe |
|---|---|---|---:|
| 2026-09-04 | Desarrollo local | Coste | 0 € |
| 2026-09-04 | Hosting previsto en free tier | Coste | 0 € |

Beneficio acumulado: 0 €.

## Próximos pasos operativos

1. Ejecutar QA público y corregir cualquier incidencia.
2. Completar datos legales del responsable antes de monetizar.
3. Configurar Search Console y enviar el sitemap.
4. Evaluar GA4 y consentimiento con requisitos actuales; no activar por defecto.
5. Recoger datos reales antes de priorizar nuevas herramientas o AdSense.
