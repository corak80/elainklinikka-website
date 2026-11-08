/* consent.js — the ONLY place on elainklinikkasaari.fi that loads tracking (08-11-2026).
 *
 * Why: until 08-11-2026 every page loaded the Meta pixel and Google's tag before the visitor
 * answered the cookie banner (Traficom: pixels and tags need prior consent, SVPL 205 §; the
 * Data Protection Ombudsman fined Mindemo/Heltti on 2.10.2026 for exactly that). Now:
 *   - nothing third-party loads until the visitor clicks Accept ("basic" consent mode);
 *   - Accept and Reject are the same size, on the first layer;
 *   - "Cookie settings" in every footer reopens the banner (withdrawal as easy as consent);
 *   - Google Maps embeds wait for consent or a click on "Show map";
 *   - the Meta Conversions API beacon (api.saarivet.fi/capi/event) is sent only with consent.
 *
 * Pages keep their own inline gtag()/fbq() calls: this file defines both as queues, so the calls
 * wait harmlessly and replay only if the real scripts load. Load it synchronously in <head>,
 * BEFORE any inline gtag/fbq code. Source: js/consent.src.js → js/consent.js (node build-consent-js.js).
 * Wording lives in TEXT below (FI/SV/EN).
 */
(function () {
  'use strict';
  var KEY = 'cookie_consent';
  var GA_ID = 'G-WKS3P1RFC2';
  var CLARITY_ID = 'x3bktm0h06';

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function granted() { return read() === 'accepted'; }

  // Queues. gtag.js / fbevents.js pick these up and replay them when (and only when) they load.
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') window.gtag = function () { window.dataLayer.push(arguments); };
  if (!window.fbq) {
    var n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!window._fbq) window._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  }

  var TEXT = {
    fi: {
      text: 'Haluaisimme käyttää evästeitä ja vastaavia seurantatekniikoita kävijämäärien ja mainostemme tehon mittaamiseen: Google Analytics, Google Ads, Meta (Facebook ja Instagram) ja Microsoft Clarity. Ne otetaan käyttöön vain, jos hyväksyt. Voit muuttaa valintaasi milloin tahansa sivun alareunan kohdasta Evästeasetukset.',
      accept: 'Hyväksy', reject: 'Hylkää', privacy: 'Tietosuojaseloste', settings: 'Evästeasetukset',
      mapText: 'Kartan näyttää Google Maps, joka käyttää evästeitä.', mapButton: 'Näytä kartta',
      privacyHref: '/tietosuoja/'
    },
    sv: {
      text: 'Vi vill använda cookies och liknande spårning för att mäta besöken och hur våra annonser fungerar: Google Analytics, Google Ads, Meta (Facebook och Instagram) och Microsoft Clarity. De används bara om du godkänner. Du kan ändra ditt val när som helst under Cookie-inställningar längst ner på sidan.',
      accept: 'Godkänn', reject: 'Avvisa', privacy: 'Dataskyddsbeskrivning', settings: 'Cookie-inställningar',
      mapText: 'Kartan visas av Google Maps, som använder cookies.', mapButton: 'Visa kartan',
      privacyHref: '/tietosuoja/'  // → '/sv/dataskydd/' once that page exists
    },
    en: {
      text: 'We would like to use cookies and similar tracking to measure visits and how our ads perform: Google Analytics, Google Ads, Meta (Facebook and Instagram) and Microsoft Clarity. They are switched on only if you accept. You can change your choice at any time under Cookie settings at the bottom of the page.',
      accept: 'Accept', reject: 'Reject', privacy: 'Privacy policy', settings: 'Cookie settings',
      mapText: 'The map is shown by Google Maps, which uses cookies.', mapButton: 'Show map',
      privacyHref: '/tietosuoja/'  // → '/en/privacy/' once that page exists
    }
  };
  var lang = 'fi';
  function pickLang(l) {
    l = String(l || document.documentElement.getAttribute('lang') || 'fi').slice(0, 2).toLowerCase();
    lang = TEXT[l] ? l : 'fi';
    return TEXT[lang];
  }

  // ── Loading the real tags (only after consent) ────────────────────────────
  var loaded = false;
  function addScript(src) {
    var s = document.createElement('script'); s.async = true; s.src = src;
    document.head.appendChild(s);
  }
  function loadTags() {
    if (loaded || !granted()) return;
    loaded = true;
    addScript('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
    addScript('https://connect.facebook.net/en_US/fbevents.js');
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }
  // The tags are ~430 KB: keep them off the critical path (first interaction or 1.2 s after load).
  function loadTagsSoon() {
    var go = function () { loadTags(); };
    ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (ev) {
      addEventListener(ev, go, { passive: true, once: true });
    });
    if (document.readyState === 'complete') setTimeout(go, 1200);
    else addEventListener('load', function () { setTimeout(go, 1200); });
  }
  function grantGoogle() {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted', ad_storage: 'granted',
      ad_user_data: 'granted', ad_personalization: 'granted'
    });
  }

  // Cookies the tags set on our own domain; removed when consent is withdrawn.
  function clearTrackingCookies() {
    var names = document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); });
    var host = location.hostname.replace(/^www\./, '');
    names.forEach(function (name) {
      if (!/^(_ga|_gid|_gat|_gcl|_fbp|_fbc|_clck|_clsk|CLID|MUID|ANONCHK|SM)/.test(name)) return;
      ['', host, '.' + host].forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  // ── Banner ────────────────────────────────────────────────────────────────
  var CSS = '#saari-consent{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:rgba(26,26,46,.62)}'
    + '#saari-consent[hidden]{display:none}'
    + '#saari-consent .sc-box{max-width:420px;width:100%;background:#fff;color:#1a1a2e;border-radius:24px;padding:2rem 1.75rem 1.5rem;box-shadow:0 25px 80px rgba(0,0,0,.25);text-align:center;font-family:Inter,system-ui,sans-serif}'
    + '#saari-consent .sc-box:focus{outline:none}'
    + '#saari-consent .sc-icon{font-size:2rem;line-height:1;margin-bottom:.75rem}'
    + '#saari-consent p{margin:0 0 1rem;font-size:.9rem;line-height:1.6;color:#444}'
    + '#saari-consent .sc-buttons{display:flex;gap:.75rem}'
    + '#saari-consent .sc-buttons button{flex:1 1 0;min-height:48px;border:2px solid #1a1a2e;border-radius:12px;background:#fff;color:#1a1a2e;font:600 1rem/1.2 Inter,system-ui,sans-serif;cursor:pointer;padding:.7rem 1rem}'
    + '#saari-consent .sc-buttons button:hover{background:#f6e3ec}'
    + '#saari-consent .sc-buttons button:focus-visible{outline:3px solid #c97a9d;outline-offset:2px}'
    + '#saari-consent .sc-privacy{display:inline-block;margin-top:1rem;font-size:.85rem;color:#444;text-decoration:underline}'
    + '.sc-settings-link{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}'
    + '.sc-map{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;min-height:240px;padding:1.5rem;background:#f4f1f3;border-radius:16px;text-align:center;font-size:.95rem;color:#444}'
    + '.sc-map button{min-height:44px;padding:.6rem 1.2rem;border:2px solid #1a1a2e;border-radius:12px;background:#fff;color:#1a1a2e;font:600 1rem/1.2 Inter,system-ui,sans-serif;cursor:pointer}';

  var banner = null, lastFocus = null;
  function addCss() {
    if (document.getElementById('saari-consent-css')) return;
    var st = document.createElement('style'); st.id = 'saari-consent-css'; st.textContent = CSS;
    document.head.appendChild(st);
  }
  function buildBanner() {
    if (banner) return banner;
    addCss();
    banner = document.createElement('div');
    banner.id = 'saari-consent';
    banner.hidden = true;
    banner.innerHTML = '<div class="sc-box" role="dialog" aria-modal="true" aria-labelledby="sc-text" tabindex="-1">'
      + '<div class="sc-icon" aria-hidden="true">🐶🍪</div>'
      + '<p id="sc-text"></p>'
      + '<div class="sc-buttons"><button type="button" data-sc="accept"></button><button type="button" data-sc="reject"></button></div>'
      + '<a class="sc-privacy" href="/tietosuoja/"></a></div>';
    banner.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-sc]');
      if (!b) return;
      if (b.getAttribute('data-sc') === 'accept') accept(); else reject();
    });
    banner.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;  // keep focus inside the dialog while it is open
      var f = banner.querySelectorAll('button, a[href]');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    document.body.appendChild(banner);
    return banner;
  }
  function fillBanner(l) {
    if (!banner) return;
    var t = pickLang(l);
    banner.querySelector('#sc-text').textContent = t.text;
    banner.querySelector('[data-sc="accept"]').textContent = t.accept;
    banner.querySelector('[data-sc="reject"]').textContent = t.reject;
    var a = banner.querySelector('.sc-privacy'); a.textContent = t.privacy; a.href = t.privacyHref;
  }
  function showBanner() {
    buildBanner(); fillBanner();
    lastFocus = document.activeElement;
    banner.hidden = false;
    var box = banner.querySelector('.sc-box'); if (box) box.focus();
  }
  function hideBanner() {
    if (banner) banner.hidden = true;
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  function accept() {
    write('accepted');
    hideBanner();
    grantGoogle();
    loadTags();
    showMaps();
  }
  function reject() {
    var wasGranted = granted();
    write('declined');
    hideBanner();
    window.gtag('consent', 'update', {
      analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
    });
    clearTrackingCookies();
    // Scripts already running can't be unloaded: a reload starts the page without them.
    if (wasGranted && loaded) location.reload();
  }

  // ── Footer "Cookie settings" link (next to the privacy link) ──────────────
  function addSettingsLinks() {
    var t = pickLang();
    var foot = document.querySelector('footer, .footer') || null;
    if (!foot || foot.querySelector('.sc-settings-link')) return;
    var priv = foot.querySelector('a[href*="tietosuoja"], a[href*="dataskydd"], a[href*="/privacy"]');
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'sc-settings-link'; btn.textContent = t.settings;
    btn.addEventListener('click', showBanner);
    if (priv && priv.parentNode) {
      priv.parentNode.insertBefore(btn, priv.nextSibling);
      priv.parentNode.insertBefore(document.createTextNode(' · '), btn);
    } else {
      var p = document.createElement('p'); p.style.textAlign = 'center'; p.appendChild(btn); foot.appendChild(p);
    }
  }

  // ── Google Maps embeds: <iframe data-consent-src="…"> ─────────────────────
  function showMaps() {
    var frames = document.querySelectorAll('iframe[data-consent-src]');
    for (var i = 0; i < frames.length; i++) {
      var f = frames[i];
      if (f.getAttribute('src')) continue;
      f.src = f.getAttribute('data-consent-src');
      f.hidden = false;
      var ph = f.previousElementSibling;
      if (ph && ph.classList && ph.classList.contains('sc-map')) ph.remove();
    }
  }
  function placeholderMaps() {
    var t = pickLang();
    var frames = document.querySelectorAll('iframe[data-consent-src]');
    for (var i = 0; i < frames.length; i++) {
      (function (f) {
        if (f.getAttribute('src') || (f.previousElementSibling && f.previousElementSibling.classList.contains('sc-map'))) return;
        addCss();
        f.hidden = true;
        var ph = document.createElement('div'); ph.className = 'sc-map';
        var p = document.createElement('span'); p.textContent = t.mapText;
        var b = document.createElement('button'); b.type = 'button'; b.textContent = t.mapButton;
        b.addEventListener('click', function () {  // a click is consent for this one map only
          f.src = f.getAttribute('data-consent-src'); f.hidden = false; ph.remove();
        });
        ph.appendChild(p); ph.appendChild(b);
        f.parentNode.insertBefore(ph, f);
      })(frames[i]);
    }
  }

  // ── Start ────────────────────────────────────────────────────────────────
  if (granted()) { grantGoogle(); loadTagsSoon(); }

  function onReady() {
    if (granted()) showMaps(); else placeholderMaps();
    addSettingsLinks();
    if (read() !== 'accepted' && read() !== 'declined') showBanner();
    // The homepage switches language in place.
    var orig = window.setLanguage;
    if (typeof orig === 'function' && !orig.__sc) {
      var wrapped = function (l) {
        orig.apply(this, arguments);
        fillBanner(l);
        var t = pickLang(l), s = document.querySelectorAll('.sc-settings-link');
        for (var i = 0; i < s.length; i++) s[i].textContent = t.settings;
      };
      wrapped.__sc = true;
      window.setLanguage = wrapped;
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
  else onReady();

  // Public API (also the old inline handler names, so stale cached HTML keeps working).
  window.saariConsent = { granted: granted, open: showBanner, accept: accept, reject: reject };
  window.acceptCookies = accept;
  window.declineCookies = reject;
  window.openCookieSettings = showBanner;
})();
