(() => {
  const format = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 3 });
  const compact = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  const path = location.pathname;
  const categoryRoutes = {
    mouse: ['/edpi/', '/sensibilidad/', '/polling-rate/', '/raton-y-punteria/'],
    performance: ['/tiempo-fotograma/', '/hz-vs-fps/', '/resolucion-aspecto/', '/rendimiento-y-pantalla/'],
    files: ['/tiempo-descarga/', '/almacenamiento-clips/', '/bitrate-video/', '/descargas-y-grabacion/']
  };
  const activeCategory = Object.entries(categoryRoutes).find(([, routes]) => routes.includes(path))?.[0];
  const headerNav = document.querySelector('.site-header nav');
  if (headerNav) {
    const current = (category) => activeCategory === category ? ' aria-current="page"' : '';
    headerNav.innerHTML = `<a${current('mouse')} href="/raton-y-punteria/">Ratón</a><a${current('performance')} href="/rendimiento-y-pantalla/">Rendimiento</a><a${current('files')} href="/descargas-y-grabacion/">Archivos</a>`;
  }
  const valid = (...values) => values.every((value) => Number.isFinite(value) && value > 0);
  const duration = (seconds) => {
    const rounded = Math.ceil(seconds);
    const days = Math.floor(rounded / 86400);
    const hours = Math.floor((rounded % 86400) / 3600);
    const minutes = Math.floor((rounded % 3600) / 60);
    const secs = rounded % 60;
    return [[days, 'd'], [hours, 'h'], [minutes, 'min'], [secs, 's']]
      .filter(([value]) => value > 0).slice(0, 2).map(([value, unit]) => `${value} ${unit}`).join(' ') || '< 1 s';
  };
  const setResult = (form, value, detail = '') => {
    form.querySelector('[data-result]').textContent = value;
    const detailEl = form.querySelector('[data-detail]');
    if (detailEl) detailEl.textContent = detail;
  };
  const calculators = {
    edpi(form) {
      const dpi = Number(form.elements.dpi.value);
      const sensitivity = Number(form.elements.sensitivity.value);
      setResult(form, valid(dpi, sensitivity) ? format.format(dpi * sensitivity) : '—', valid(dpi, sensitivity) ? `${format.format(dpi)} DPI × ${format.format(sensitivity)}` : 'Introduce valores mayores que cero.');
    },
    sensitivity(form) {
      const currentDpi = Number(form.elements.currentDpi.value);
      const currentSensitivity = Number(form.elements.currentSensitivity.value);
      const newDpi = Number(form.elements.newDpi.value);
      const ok = valid(currentDpi, currentSensitivity, newDpi);
      setResult(form, ok ? format.format((currentDpi * currentSensitivity) / newDpi) : '—', ok ? `Sensibilidad equivalente a ${format.format(newDpi)} DPI` : 'Introduce valores mayores que cero.');
    },
    download(form) {
      const size = Number(form.elements.size.value);
      const speed = Number(form.elements.speed.value);
      const efficiency = Number(form.elements.efficiency.value) / 100;
      const sizeMultiplier = form.elements.sizeUnit.value === 'TB' ? 1e12 : 1e9;
      const speedMultiplier = form.elements.speedUnit.value === 'Gbps' ? 1e9 : 1e6;
      const ok = valid(size, speed, efficiency) && efficiency <= 1;
      const seconds = ok ? (size * sizeMultiplier * 8) / (speed * speedMultiplier * efficiency) : 0;
      setResult(form, ok ? duration(seconds) : '—', ok ? `Estimación con un ${compact.format(efficiency * 100)} % de aprovechamiento` : 'Revisa el tamaño, la velocidad y la eficiencia.');
    },
    clips(form) {
      const bitrate = Number(form.elements.bitrate.value);
      const minutes = Number(form.elements.minutes.value);
      const count = Number(form.elements.count.value);
      const ok = valid(bitrate, minutes, count);
      const gigabytes = ok ? (bitrate * 1e6 * minutes * 60 * count) / 8 / 1e9 : 0;
      setResult(form, ok ? `${compact.format(gigabytes)} GB` : '—', ok ? `${compact.format(gigabytes / count)} GB por clip (estimación decimal)` : 'Introduce valores mayores que cero.');
    },
    frameTime(form) {
      const fps = Number(form.elements.fps.value);
      const ok = valid(fps);
      const milliseconds = ok ? 1000 / fps : 0;
      setResult(form, ok ? `${compact.format(milliseconds)} ms` : '—', ok ? `Tiempo máximo por fotograma para mantener ${format.format(fps)} FPS` : 'Introduce una tasa de FPS mayor que cero.');
    },
    polling(form) {
      const rate = Number(form.elements.rate.value);
      const ok = valid(rate);
      const interval = ok ? 1000 / rate : 0;
      setResult(form, ok ? `${compact.format(interval)} ms` : '—', ok ? `Intervalo medio teórico de espera: ${compact.format(interval / 2)} ms` : 'Introduce una frecuencia mayor que cero.');
    },
    bitrate(form) {
      const video = Number(form.elements.video.value);
      const audio = Number(form.elements.audio.value);
      const minutes = Number(form.elements.minutes.value);
      const ok = valid(video, minutes) && Number.isFinite(audio) && audio >= 0;
      const bitsPerSecond = ok ? (video * 1e6) + (audio * 1e3) : 0;
      const gigabytes = ok ? (bitsPerSecond * minutes * 60) / 8 / 1e9 : 0;
      const gigabytesPerHour = ok ? (bitsPerSecond * 3600) / 8 / 1e9 : 0;
      setResult(form, ok ? `${compact.format(gigabytes)} GB` : '—', ok ? `${compact.format(gigabytesPerHour)} GB por hora · incluye audio` : 'Revisa bitrate, audio y duración.');
    },
    refresh(form) {
      const fps = Number(form.elements.fps.value);
      const hz = Number(form.elements.hz.value);
      const ok = valid(fps, hz);
      const visible = ok ? Math.min(fps, hz) : 0;
      const relation = ok
        ? (fps >= hz ? `${compact.format(fps - hz)} FPS superan la frecuencia del monitor` : `cada fotograma dura ${compact.format(hz / fps)} ciclos de refresco de media`)
        : 'Introduce valores mayores que cero.';
      setResult(form, ok ? `${format.format(visible)} fps` : '—', ok ? `Máximo teórico de fotogramas completos distintos por segundo; ${relation}` : relation);
    },
    resolution(form) {
      const width = Number(form.elements.width.value);
      const height = Number(form.elements.height.value);
      const baseWidth = Number(form.elements.baseWidth.value);
      const baseHeight = Number(form.elements.baseHeight.value);
      const ok = valid(width, height, baseWidth, baseHeight) && [width, height, baseWidth, baseHeight].every(Number.isInteger);
      const gcd = (a, b) => (b ? gcd(b, a % b) : a);
      const divisor = ok ? gcd(width, height) : 1;
      const megapixels = ok ? (width * height) / 1e6 : 0;
      const relative = ok ? (width * height * 100) / (baseWidth * baseHeight) : 0;
      setResult(form, ok ? `${width / divisor}:${height / divisor}` : '—', ok ? `${compact.format(megapixels)} MP · ${compact.format(relative)} % de píxeles frente a ${baseWidth}×${baseHeight}` : 'Usa dimensiones enteras mayores que cero.');
    }
  };
  document.querySelectorAll('[data-calculator]').forEach((form) => {
    const update = () => calculators[form.dataset.calculator]?.(form);
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', (event) => event.preventDefault());
    update();
  });

  const analytics = {
    id: 'G-YXBECNCST0',
    storageKey: 'fpskit:analytics-consent:v1',
    loaded: false,
    getChoice() {
      try { return localStorage.getItem(this.storageKey); } catch { return null; }
    },
    setChoice(value) {
      try { localStorage.setItem(this.storageKey, value); } catch { /* The choice will apply for this page only. */ }
    },
    load() {
      if (this.loaded) return;
      this.loaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
      window.gtag('js', new Date());
      window.gtag('config', this.id, {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.id}`;
      document.head.append(script);
    },
    revoke() {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
      const cookieNames = ['_ga', `_ga_${this.id.replace('G-', '')}`];
      const domains = ['', location.hostname, `.${location.hostname}`];
      cookieNames.forEach((name) => domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ''}; SameSite=Lax`;
      }));
    }
  };

  const consentPanel = document.createElement('section');
  consentPanel.className = 'consent-panel';
  consentPanel.setAttribute('role', 'dialog');
  consentPanel.setAttribute('aria-labelledby', 'consent-title');
  consentPanel.hidden = true;
  consentPanel.innerHTML = `
    <div class="consent-panel__body">
      <div>
        <h2 id="consent-title">Tu privacidad, sin rodeos</h2>
        <p>Usamos Google Analytics solo si lo aceptas para saber qué páginas resultan útiles. Si rechazas, no cargamos Analytics. Las calculadoras funcionan igual.</p>
      </div>
      <div class="consent-panel__actions">
        <button class="button button--secondary" type="button" data-consent="rejected">Rechazar</button>
        <a class="button button--link" href="/cookies/">Más información</a>
        <button class="button button--primary" type="button" data-consent="accepted">Aceptar analítica</button>
      </div>
    </div>`;
  document.body.append(consentPanel);

  const showConsent = () => {
    consentPanel.hidden = false;
    consentPanel.querySelector('[data-consent="rejected"]').focus();
  };
  const hideConsent = () => { consentPanel.hidden = true; };

  consentPanel.querySelectorAll('[data-consent]').forEach((button) => {
    button.addEventListener('click', () => {
      const previous = analytics.getChoice();
      const choice = button.dataset.consent;
      analytics.setChoice(choice);
      hideConsent();
      if (choice === 'accepted') analytics.load();
      if (choice === 'rejected') {
        analytics.revoke();
        if (previous === 'accepted') location.reload();
      }
    });
  });

  const footerNav = document.querySelector('footer nav');
  if (footerNav) {
    const toolsLink = document.createElement('a');
    toolsLink.href = '/#categorias';
    toolsLink.textContent = 'Herramientas';
    footerNav.prepend(toolsLink);
    const contactLink = document.createElement('a');
    contactLink.href = '/contacto/';
    contactLink.textContent = 'Contacto';
    toolsLink.after(contactLink);
    const manageButton = document.createElement('button');
    manageButton.className = 'privacy-settings';
    manageButton.type = 'button';
    manageButton.textContent = 'Configurar privacidad';
    manageButton.addEventListener('click', showConsent);
    footerNav.append(manageButton);
  }

  const consentChoice = analytics.getChoice();
  if (consentChoice === 'accepted') analytics.load();
  if (!consentChoice) showConsent();
})();
