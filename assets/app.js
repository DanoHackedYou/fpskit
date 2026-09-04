(() => {
  const format = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 3 });
  const compact = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
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
    }
  };
  document.querySelectorAll('[data-calculator]').forEach((form) => {
    const update = () => calculators[form.dataset.calculator]?.(form);
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', (event) => event.preventDefault());
    update();
  });
})();
