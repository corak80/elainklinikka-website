/* Designed health articles: dog limping (act-now rail) and senior cat (check-up sheet). */
(function () {
  var body = document.body;
  if (!body || !body.classList.contains('article-designed')) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showWhenPast(target, bar) {
    if (!target || !bar || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      var past = !e.isIntersecting && e.boundingClientRect.top < 0;
      bar.classList.toggle('is-visible', past);
      bar.setAttribute('aria-hidden', past ? 'false' : 'true');
      bar.inert = !past;
    }).observe(target);
  }

  /* ---------- Dog limping ---------- */
  var rail = document.querySelector('.dl-rail');
  if (rail) {
    var bar = document.querySelector('.dl-bar');
    var openBtn = document.querySelector('[data-sheet-open]');
    var closeBtn = rail.querySelector('.dl-rail-close');
    var mqSheet = window.matchMedia('(max-width: 1023.98px)');
    var backdrop = null;
    var lastFocus = null;

    function setSheetMode() {
      var on = mqSheet.matches;
      rail.classList.toggle('is-sheet', on);
      if (on) {
        rail.setAttribute('role', 'dialog');
        rail.setAttribute('aria-modal', 'true');
        if (!rail.classList.contains('is-open')) rail.setAttribute('hidden', '');
      } else {
        closeSheet(true);
        rail.removeAttribute('role');
        rail.removeAttribute('aria-modal');
        rail.removeAttribute('hidden');
      }
    }

    function trapTab(e) {
      if (e.key !== 'Tab' || !rail.classList.contains('is-open')) return;
      var f = rail.querySelectorAll('a[href], button:not([disabled])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function openSheet() {
      if (!mqSheet.matches) return;
      document.addEventListener('keydown', trapTab, true);
      lastFocus = document.activeElement;
      backdrop = document.createElement('div');
      backdrop.className = 'dl-backdrop';
      backdrop.addEventListener('click', function () { closeSheet(); });
      document.body.appendChild(backdrop);
      rail.removeAttribute('hidden');
      body.classList.add('sheet-open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (backdrop) backdrop.classList.add('is-open');
          rail.classList.add('is-open');
          if (closeBtn) closeBtn.focus();
        });
      });
    }

    function closeSheet(instant) {
      if (!rail.classList.contains('is-open')) return;
      rail.classList.remove('is-open');
      body.classList.remove('sheet-open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      var b = backdrop;
      backdrop = null;
      if (b) b.classList.remove('is-open');
      var done = function () {
        if (b && b.parentNode) b.parentNode.removeChild(b);
        if (mqSheet.matches && !rail.classList.contains('is-open')) rail.setAttribute('hidden', '');
      };
      document.removeEventListener('keydown', trapTab, true);
      if (instant || reduce) done(); else setTimeout(done, 220);
      if (!instant && lastFocus && lastFocus.focus) lastFocus.focus();
    }

    if (openBtn) openBtn.addEventListener('click', openSheet);
    if (closeBtn) closeBtn.addEventListener('click', function () { closeSheet(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSheet();
    });
    if (mqSheet.addEventListener) mqSheet.addEventListener('change', setSheetMode);
    setSheetMode();

    /* Rail lane: jump to the full list in the article and mark it once. Capture phase +
       stopImmediatePropagation so the site's global smooth-scroll for #links stays out. */
    rail.querySelectorAll('.dl-rail-lane').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = (a.getAttribute('href') || '').slice(1);
        var lane = id && document.getElementById(id);
        if (!lane) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        closeSheet(true);
        lane.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        lane.classList.remove('is-flash');
        void lane.offsetWidth;
        lane.classList.add('is-flash');
        lane.setAttribute('tabindex', '-1');
        lane.focus({ preventScroll: true });
        if (history.replaceState) history.replaceState(null, '', '#' + id);
      }, true);
    });

    function syncBar() {
      if (!bar) return;
      var on = mqSheet.matches;
      bar.classList.toggle('is-visible', on);
      bar.setAttribute('aria-hidden', on ? 'false' : 'true');
      bar.inert = !on;
    }
    syncBar();
    if (mqSheet.addEventListener) mqSheet.addEventListener('change', syncBar);
  }

  /* ---------- Senior cat ---------- */
  var sheet = document.querySelector('.cs-sheet');
  if (sheet) {
    var mqWide = window.matchMedia('(min-width: 760px)');
    var rows = sheet.querySelectorAll('.cs-rows details');
    function syncRows() {
      rows.forEach(function (d) { d.open = mqWide.matches; });
    }
    syncRows();
    if (mqWide.addEventListener) mqWide.addEventListener('change', syncRows);
    // A printout must show every value, whatever the screen width.
    window.addEventListener('beforeprint', function () { rows.forEach(function (d) { d.open = true; }); });
    window.addEventListener('afterprint', syncRows);
    rows.forEach(function (d) {
      var values = d.querySelector('.cs-values');
      d.querySelector('summary').addEventListener('click', function (e) {
        e.preventDefault();
        if (mqWide.matches) return;
        if (reduce || !values || !values.animate) { d.open = !d.open; return; }
        var ease = 'cubic-bezier(0.16, 1, 0.3, 1)';
        if (!d.open) {
          d.open = true;
          var h = values.scrollHeight;
          values.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 200, easing: ease });
        } else {
          var h2 = values.scrollHeight;
          var a = values.animate([{ height: h2 + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 200, easing: ease });
          a.onfinish = function () { d.open = false; };
        }
      });
    });
    showWhenPast(sheet, document.querySelector('.cs-bar'));
  }
})();
