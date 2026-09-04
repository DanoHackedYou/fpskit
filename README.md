# FPSKit

FPSKit es una web estática en español con calculadoras gratuitas para PC gaming. La primera versión incluye:

- cálculo de eDPI;
- conversión de sensibilidad al cambiar DPI;
- estimación del tiempo de descarga;
- estimación de almacenamiento para clips.

Cada herramienta explica su fórmula, ejemplo, limitaciones y casos de uso. Los cálculos se ejecutan localmente en el navegador y no requieren cuenta.

## Desarrollo

Requiere Node.js solo para las comprobaciones y para generar `dist/`; la web publicada no tiene dependencias de ejecución.

```sh
npm test
npm run build
```

Para una vista local, sirve la raíz con cualquier servidor HTTP estático. En Cloudflare Pages, el comando de construcción es `npm run build` y el directorio de salida es `dist`.

## Privacidad y monetización

La versión inicial no instala analítica ni publicidad. Antes de habilitar GA4 o AdSense deben completarse el responsable y contacto legal, revisar los requisitos vigentes y configurar consentimiento para España/EEE cuando proceda.

## Estado

Consulta [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) para el registro operativo, costes, SEO y próximos pasos.
