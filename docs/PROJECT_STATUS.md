# Registro maestro — cartera web

Actualizado: 4 de septiembre de 2026.

## Cartera

| Nº | Proyecto | Nicho | Estado | URL | Repositorio | Coste acumulado | Ingresos |
|---:|---|---|---|---|---|---:|---:|
| 01 | FPSKit | Herramientas PC gaming | Publicada | https://fpskit.pages.dev/ | https://github.com/DanoHackedYou/fpskit | 0 € | 0 € |

## FPSKit — estado actual

- Fuente original: el Work recibido no contenía el MVP ni un ZIP; solo contenía el encargo. El sitio se reconstruyó desde cero conforme a la especificación.
- Arquitectura: web estática, HTML semántico, CSS y JavaScript sin dependencias en producción.
- Rutas: inicio, tres categorías, nueve herramientas, sobre el proyecto, privacidad, cookies, aviso legal y 404.
- SEO: títulos y descripciones únicos; canonical, sitemap y robots con URL pública; enlazado interno y contenido explicativo.
- Privacidad y legal: responsable, domicilio y contacto publicados; no hay cuentas ni anuncios. GA4 solo se carga tras una aceptación expresa; rechazo y cambio de elección disponibles en todas las páginas.
- Servicios: Cloudflare Pages activo; propiedad URL de Search Console verificada; sitemap enviado (el primer estado mostrado fue «No se ha podido obtener», aunque el recurso público respondía correctamente); propiedad y flujo web de Analytics configurados. AdSense no está configurado.
- GitHub: repositorio público `DanoHackedYou/fpskit`, rama de producción `main`.
- Cloudflare Pages: `https://fpskit.pages.dev/`, integración Git activa, configuración `npm run build` → `dist`.

## QA

- Casos matemáticos automatizados: eDPI, conversión de sensibilidad, descarga, clips, FPS a frame time, polling rate, Hz frente a FPS, carga relativa de resolución y bitrate con audio.
- Comprobaciones automatizadas de rutas, metadatos básicos, navegación, sitemap y sintaxis JavaScript.
- Pendiente tras desplegar: navegación real pública, 404, cabeceras, viewport móvil, consola, URL canónica y rendimiento de campo.

## SEO y crecimiento

Implementado el 4 de septiembre de 2026:

1. Calculadora de frame time (FPS ↔ milisegundos).
2. Comparador Hz/FPS con límites claramente explicados.
3. Calculadora de bitrate y tamaño de vídeo con audio.
4. Polling rate y tiempo entre informes del ratón.
5. Resolución, relación de aspecto, megapíxeles y carga relativa.
6. Tres páginas de categoría para organizar y enlazar las nueve herramientas.

Backlog posterior, sin páginas vacías:

1. Calculadora de distancia por giro (cm/360), con multiplicadores documentados por juego.
2. Comparador de escalado de resolución y densidad de píxeles.
3. VRAM estimada: requiere investigación cuidadosa y evitar falsa precisión.

Antes de implementar cada ruta: revisar resultados actuales, intención de búsqueda y fuentes técnicas. No se han atribuido volúmenes de búsqueda sin datos.

## Analytics, consentimiento y AdSense

- GA4: propiedad `FPSKit` y flujo web `https://fpskit.pages.dev/` creados; ID de medición `G-YXBECNCST0`. Integración básica: no se descarga la etiqueta antes de aceptar, se mantienen denegados almacenamiento publicitario, datos de usuario para anuncios y personalización, y se permite retirar la elección. La recepción se validó en producción: el informe en tiempo real mostró la sesión de prueba desde España.
- AdSense: no solicitado. El contenido y la identificación legal ya están preparados; faltan crear la cuenta, verificar el sitio, publicar `ads.txt`, configurar una CMP certificada y superar la revisión.
- Métricas futuras: pageviews, sesiones, páginas de entrada, consultas, CTR orgánico, países, dispositivos, RPM e ingresos.

## Costes e ingresos

| Fecha | Concepto | Tipo | Importe |
|---|---|---|---:|
| 2026-09-04 | Desarrollo local | Coste | 0 € |
| 2026-09-04 | Hosting previsto en free tier | Coste | 0 € |

Beneficio acumulado: 0 €.

## Próximos pasos operativos

1. Volver a comprobar en Search Console el estado del sitemap tras el periodo inicial de procesamiento.
2. Crear la única cuenta AdSense del titular y probar la admisión de `fpskit.pages.dev`.
3. Verificar el sitio con metaetiqueta, publicar `ads.txt` con el ID real y solicitar revisión.
4. Antes de cargar anuncios, implantar una CMP certificada por Google para EEE, Reino Unido y Suiza y actualizar las políticas publicitarias.
