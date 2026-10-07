#!/usr/bin/env node
/**
 * Town landing pages for the southern coast (Kristiinankaupunki / Närpes / Kaskö / Teuva / Karijoki / Isojoki).
 *   FI  /elainlaakari-kristiinankaupunki/
 *   SV  /sv/veterinar-narpes-kristinestad/
 *
 * Copy lives in fi.json / sv.json (body) + fi_ui.json / sv_ui.json (interface strings) — approved and
 * native-reviewed 06-10-2026. Edit the JSON, run `node tools/sydosterbotten/build.js`, commit the outputs.
 * The script also appends its CSS block to css/style.css once (marker-guarded) and adds the two URLs to
 * sitemap.xml if missing (build-sitemap.js only refreshes lastmod, never adds URLs).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const HOST = 'https://elainklinikkasaari.fi';
const CSS_VERSION = '20261006a';
const JS_VERSION = '20260928b';
const TODAY = new Date().toISOString().slice(0, 10);

// Drive data (verified 06-10-2026: Närpes 82 km/1 h 02, Kaskö 94 km/1 h 05, Kristinestad 101 km/1 h 16,
// Teuva 81.6 km/1 h 09, Karijoki 104 km, Isojoki 134 km/1 h 45). On-call: southern district 0600 399 199
// covers Kaskinen, Korsnäs, Kristiinankaupunki, Maalahti, Närpiö; the South Ostrobothnia villages have their own.
const TOWNS = [
  { key: 'kristiinankaupunki', time: '1 h 15 min', km: 101, oncall: 'south' },
  { key: 'kaskinen',           time: '1 h 05 min', km: 94,  oncall: 'south' },
  { key: 'narpio',             time: '1 h',        km: 82,  oncall: 'south' },
  { key: 'teuva',              time: '1 h 10 min', km: 82,  oncall: 'municipal' },
  { key: 'karijoki',           time: '1 h 25 min', km: 104, oncall: 'municipal' },
  { key: 'isojoki',            time: '1 h 45 min', km: 134, oncall: 'municipal' },
];

const PAGES = {
  fi: {
    lang: 'fi', locale: 'fi_FI', path: '/elainlaakari-kristiinankaupunki/', out: 'elainlaakari-kristiinankaupunki/index.html',
    order: ['kristiinankaupunki', 'kaskinen', 'narpio', 'teuva', 'karijoki', 'isojoki'],
    home: '/', homeName: 'Etusivu', brand: 'Eläinklinikka Saari',
    nav: [['/#about', 'Klinikka'], ['/#services', 'Palvelut'], ['/henkilokunta/', 'Henkilökunta'], ['/#cat-friendly', 'Cat Friendly'],
          ['/hinnasto/', 'Hinnasto'], ['/#wildlife', 'Wildlife'], ['/#contact', 'Yhteystiedot'], ['/artikkelit/', 'Artikkelit']],
    shop: ['https://kauppa.elainklinikkasaari.fi/', 'Verkkokauppa'], book: 'Varaa aika',
    footerBrand: 'Vaasalainen yksityinen pieneläinklinikka Vetokannaksella.',
    footerLinks: [['/#about', 'Klinikka'], ['/#services', 'Palvelut'], ['/henkilokunta/', 'Henkilökunta'], ['/#cat-friendly', 'Cat Friendly'],
                  ['/hinnasto/', 'Hinnasto'], ['/#wildlife', 'Wildlife'], ['/meista/', 'Meistä'], ['/yhteystiedot/', 'Yhteystiedot'],
                  ['/artikkelit/', 'Artikkelit'], ['/arvostelut/', 'Arvostelut'], ['https://kauppa.elainklinikkasaari.fi/', 'Verkkokauppa']],
    footerHeads: ['Pikalinkit', 'Yhteystiedot', 'Seuraa meitä'], footerBottom: 'Y-tunnus: 0708667-9 &middot; Kaikki oikeudet pidätetään.',
    privacy: 'Tietosuojaseloste', mapsLabel: 'Gerbyntie 18, Vaasa', badgeAlt: 'Silver accredited Cat Friendly Clinic 2026',
    ctaAddress: 'Gerbyntie 18, 65230 Vaasa',
  },
  sv: {
    lang: 'sv', locale: 'sv_FI', path: '/sv/veterinar-narpes-kristinestad/', out: 'sv/veterinar-narpes-kristinestad/index.html',
    order: ['narpio', 'kristiinankaupunki', 'kaskinen', 'teuva', 'karijoki', 'isojoki'],
    home: '/sv/', homeName: 'Startsida', brand: 'Djurklinik Saari',
    nav: [['/sv/#about', 'Kliniken'], ['/sv/#services', 'Tjänster'], ['/sv/#team', 'Personal'], ['/sv/#cat-friendly', 'Cat Friendly'],
          ['/sv/prislista/', 'Prislista'], ['/sv/#wildlife', 'Wildlife'], ['/sv/#contact', 'Kontakt'], ['/artikkelit/', 'Artiklar']],
    shop: ['https://kauppa.elainklinikkasaari.fi/?lang=sv', 'Webbutik'], book: 'Boka tid',
    footerBrand: 'Privatägd smådjursklinik i Dragnäsbäck, Vasa.',
    footerLinks: [['/sv/#about', 'Kliniken'], ['/sv/#services', 'Tjänster'], ['/sv/#team', 'Personal'], ['/sv/#cat-friendly', 'Cat Friendly'],
                  ['/sv/prislista/', 'Prislista'], ['/sv/#wildlife', 'Wildlife'], ['/meista/', 'Om oss'], ['/yhteystiedot/', 'Kontakt'],
                  ['/sv/artiklar/', 'Artiklar'], ['/sv/omdomen/', 'Omdömen'], ['https://kauppa.elainklinikkasaari.fi/?lang=sv', 'Webbutik']],
    footerHeads: ['Snabblänkar', 'Kontakt', 'Följ oss'], footerBottom: 'FO-nummer: 0708667-9 &middot; Alla rättigheter förbehållna.',
    privacy: 'Integritetspolicy', mapsLabel: 'Gerbyntie 18, Vasa', badgeAlt: 'Silver accredited Cat Friendly Clinic 2026',
    ctaAddress: 'Gerbyvägen 18, 65230 Vasa',
  },
  en: {
    lang: 'en', locale: 'en_GB', path: '/en/veterinarian-kristinestad-narpes/', out: 'en/veterinarian-kristinestad-narpes/index.html',
    order: ['kristiinankaupunki', 'narpio', 'kaskinen', 'teuva', 'karijoki', 'isojoki'],
    home: '/en/', homeName: 'Home', brand: 'Eläinklinikka Saari',
    nav: [['/en/#about', 'Clinic'], ['/en/#services', 'Services'], ['/en/#team', 'Staff'], ['/en/#cat-friendly', 'Cat Friendly'],
          ['/en/pricelist/', 'Prices'], ['/en/#wildlife', 'Wildlife'], ['/en/#contact', 'Contact'], ['/artikkelit/', 'Articles']],
    shop: ['https://kauppa.elainklinikkasaari.fi/', 'Online shop'], book: 'Book Now',
    footerBrand: 'Finnish privately owned small animal clinic in Dragnäsbäck, Vaasa.',
    footerLinks: [['/en/#about', 'Clinic'], ['/en/#services', 'Services'], ['/en/#team', 'Staff'], ['/en/#cat-friendly', 'Cat Friendly'],
                  ['/en/pricelist/', 'Prices'], ['/en/#wildlife', 'Wildlife'], ['/meista/', 'About Us'], ['/yhteystiedot/', 'Contact'],
                  ['/en/articles/', 'Articles'], ['/en/reviews/', 'Reviews'], ['https://kauppa.elainklinikkasaari.fi/', 'Online shop']],
    footerHeads: ['Quick links', 'Contact', 'Follow us'], footerBottom: 'Business ID: 0708667-9 &middot; All rights reserved.',
    privacy: 'Privacy Policy', mapsLabel: 'Gerbyntie 18, Vaasa', badgeAlt: 'Silver accredited Cat Friendly Clinic 2026',
    ctaAddress: 'Gerbyntie 18, 65230 Vaasa',
  },
};
const LANGS = ['fi', 'sv', 'en'];

const MAPS = 'https://www.google.com/maps/place/El%C3%A4inklinikka+Saari+Oy/@63.1171801,21.6166625,460m/data=!3m1!1e3!4m15!1m8!3m7!1s0x467d61ab7b16cb15:0xb6114b98ae600fcb!2sGerbyntie+18,+65230+Vaasa!3b1!8m2!3d63.1171801!4d21.6192374!16s%2Fg%2F11w7r24yg_!3m5!1s0x467d61ab6b941cdd:0x6e79ec0774047719!8m2!3d63.1166737!4d21.618318!16s%2Fg%2F1tdl05nr';
const CSP = `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.net  https://www.clarity.ms https://*.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://pagead2.googlesyndication.com https://www.googleadservices.com https://www.google.com https://www.google.fi https://googleads.g.doubleclick.net https://www.facebook.com https://*.facebook.com; font-src 'self'; connect-src 'self' https://pagead2.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://*.analytics.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net https://*.clarity.ms; frame-src https://www.google.com; frame-ancestors 'none'`;

const esc = (s) => String(s).replace(/&(?!(amp|nbsp|#\d+|[a-z]+);)/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const jsonStr = (s) => JSON.stringify(plain(s));

function readJson(name) {
  const p = path.join(__dirname, name);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function render(cfg, d, ui) {
  const url = HOST + cfg.path;
  const other = cfg.lang === 'fi' ? PAGES.sv : PAGES.fi;
  const towns = cfg.order.map((k) => ({ ...TOWNS.find((t) => t.key === k), ...ui.towns[k] }));
  const lead = towns[0];

  const chips = towns.map((t, i) =>
    `<a class="town-chip" href="#drive-${t.key}" data-town="${t.key}" aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(t.chip)}</a>`).join('\n          ');
  // soft hyphen in the one town name that cannot fit a 390px row beside its time
  const softFrom = (s) => esc(s).replace('Kristiinankaupungista', 'Kristiinan&shy;kaupungista');
  const rows = towns.map((t, i) =>
    `<li class="drive-row${i === 0 ? ' is-selected' : ''}" id="drive-${t.key}" data-town="${t.key}"><span class="drive-from">${softFrom(t.from)}</span> <span class="drive-time">${esc(ui.about)} ${t.time}</span> <span class="drive-km">${t.km}&nbsp;km</span></li>`).join('\n            ');
  const tripTimes = towns.map((t) => `<dt>${esc(t.chip)}</dt><dd>${esc(ui.about)} ${t.time} · ${t.km}&nbsp;km</dd>`).join('\n              ');

  const tilePrice = { 0: ui.price_dental, 2: ui.price_cardiac, 3: ui.price_ortho };
  // FI copy carries "→ <a>…</a>" link cues; fold the arrow inside the anchor so it takes the link style and never orphans
  const linkArrow = (s) => String(s).replace(/\s*→\s*<a([^>]*)>([\s\S]*?)<\/a>/g, ' <a$1>$2&nbsp;→</a>');
  const tiles = d.worth_items.map((it, i) =>
    `<li class="worth-tile"><h3>${it.strong.replace(/[.:]\s*$/, '')}</h3><p>${linkArrow(it.text)}</p>${tilePrice[i] ? `<p class="worth-price">${tilePrice[i]}</p>` : ''}</li>`).join('\n          ');
  const address = String(d.cta_address).replace(/^\s*📍\s*/, '');
  const trips = d.trip_items.map((it, i) => i === 4
    ? `<li><strong>${it.strong}</strong>\n            <dl class="trip-times">\n              ${tripTimes}\n            </dl></li>`
    : `<li><strong>${it.strong}</strong> ${it.text}</li>`).join('\n          ');
  const prices = d.prices.map((p) => `<div class="price-row"><span class="price-name">${p.name}</span> <span class="price-value">${p.value}</span></div>`).join('');
  const faq = d.faq.map((f) => `<h3>${f.q}</h3>\n          <p>${f.a}</p>`).join('\n          ');
  const faqLd = d.faq.map((f) => `        {"@type": "Question", "name": ${jsonStr(f.q)}, "acceptedAnswer": {"@type": "Answer", "text": ${jsonStr(f.a)}}}`).join(',\n');

  const navLinks = cfg.nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join('\n          ');
  const footerLinks = cfg.footerLinks.map(([h, t]) => `<a href="${h}">${t}</a>`).join('\n          ');
  const book = `<a href="https://my.provet.com/elainklinikka-saari" rel="noopener" class="btn btn-cta mobile-cta" onclick="window.fbq&amp;&amp;fbq('track','Schedule');">${cfg.book}</a>`;

  return `<!DOCTYPE html>
<html lang="${cfg.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index,follow">
  <meta http-equiv="Content-Security-Policy" content="${CSP}">
  <title>${esc(d.title)}</title>

  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    });
    gtag('js', new Date());
    gtag('config', 'G-WKS3P1RFC2');
    gtag('config', 'AW-816483191');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-WKS3P1RFC2"></script>
  <script>
  function gtag_report_conversion(url) {
    var callback = function () {
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
      'send_to': 'AW-816483191/jzTzCJrAgJwcEPeWqoUD',
      'value': 1.0,
      'currency': 'EUR',
      'transport_type': 'beacon', 'event_callback': callback
    });
    return false;
  }
  </script>

  <meta name="description" content="${esc(d.meta_description)}">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="fi" href="${HOST}${PAGES.fi.path}">
  <link rel="alternate" hreflang="sv" href="${HOST}${PAGES.sv.path}">
  <link rel="alternate" hreflang="en" href="${HOST}${PAGES.en.path}">
  <link rel="alternate" hreflang="x-default" href="${HOST}${PAGES.fi.path}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(d.title)}">
  <meta property="og:description" content="${esc(d.meta_description)}">
  <meta property="og:image" content="${HOST}/images/clinic-about.jpg">
  <meta property="og:locale" content="${cfg.locale}">
  <meta property="og:site_name" content="${cfg.brand}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(d.title)}">
  <meta name="twitter:description" content="${esc(d.meta_description)}">
  <meta name="twitter:image" content="${HOST}/images/clinic-about.jpg">

  <script type="application/ld+json">
  [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": ${jsonStr(d.title)},
      "description": ${jsonStr(d.meta_description)},
      "url": "${url}",
      "inLanguage": "${cfg.lang}",
      "lastReviewed": "${TODAY}",
      "isPartOf": {"@type": "WebSite", "name": "Eläinklinikka Saari", "url": "${HOST}"},
      "about": {
        "@type": "VeterinaryCare",
        "name": "Eläinklinikka Saari",
        "url": "${HOST}",
        "telephone": "+358-6-321-7300",
        "address": {"@type": "PostalAddress", "streetAddress": "Gerbyntie 18", "postalCode": "65230", "addressLocality": "Vaasa", "addressCountry": "FI"},
        "areaServed": ["Vaasa", "Kristiinankaupunki", "Närpiö", "Kaskinen", "Teuva", "Karijoki", "Isojoki"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "${cfg.homeName}", "item": "${HOST}${cfg.home}"},
        {"@type": "ListItem", "position": 2, "name": ${jsonStr(d.h1)}, "item": "${url}"}
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
${faqLd}
      ]
    }
  ]
  </script>

  <link rel="preload" as="image" href="/images/logo.png">
  <link rel="stylesheet" href="/css/style.css?v=${CSS_VERSION}">
  <link rel="icon" type="image/png" href="/images/favicon-icon.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">${esc(ui.skip)}</a>

  <header class="header">
    <div class="container">
      <a href="${cfg.home}" class="logo">
        <div class="logo-icon"><img src="/images/logo.png" alt="${cfg.brand}" width="240" height="240"></div>
      </a>
      <a href="${cfg.home}#cat-friendly" class="header-credential" aria-label="${cfg.badgeAlt}">
        <img src="/images/cat-friendly-badge-header.webp" alt="${cfg.badgeAlt}" width="240" height="128">
      </a>
      <nav class="nav">
        <div class="nav-links">
          ${navLinks}
          <a href="${cfg.shop[0]}" class="nav-shop"><svg class="nav-shop-ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg><span>${cfg.shop[1]}</span></a>
          ${book}
        </div>

        <div class="nav-actions">
          <div class="lang-toggle">
            <a href="${HOST}${PAGES.fi.path}" class="${cfg.lang === 'fi' ? 'active' : ''}"${cfg.lang === 'fi' ? ' aria-current="page"' : ''}>FI</a>
            <a href="${HOST}${PAGES.sv.path}" class="${cfg.lang === 'sv' ? 'active' : ''}"${cfg.lang === 'sv' ? ' aria-current="page"' : ''}>SV</a>
            <a href="${HOST}${PAGES.en.path}" class="${cfg.lang === 'en' ? 'active' : ''}"${cfg.lang === 'en' ? ' aria-current="page"' : ''}>EN</a>
          </div>
          ${book.replace('btn btn-cta mobile-cta', 'btn btn-cta btn-sm desktop-only')}
        </div>

        <button class="mobile-menu-btn" aria-label="${esc(ui.menu)}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
  </header>

  <main id="main-content" class="town-page">
  <section class="section town-hero-section">
    <div class="container">
      <div class="town-hero">
        <h1>${d.h1}</h1>
        <div class="town-lead-wrap">
          <p class="town-lead">${d.intro[0]}</p>
          <p class="town-lead-2">${d.intro[1]}</p>
        </div>
        <div class="town-chips" role="group" aria-labelledby="town-chips-label">
          <span class="town-chips-label" id="town-chips-label">${esc(ui.choose_town)}</span>
          ${chips}
        </div>
        <aside class="drive-band" aria-live="polite">
          <h2 class="drive-heading">${esc(ui.drive_heading)}</h2>
          <ol class="drive-list">
            ${rows}
          </ol>
          <div class="service-cta-buttons town-cta">
            <a href="tel:+35863217300" class="btn btn-primary" onclick="gtag_report_conversion();">${d.cta_call}</a>
            <a href="https://my.provet.com/elainklinikka-saari" rel="noopener" class="btn btn-outline" onclick="window.fbq&amp;&amp;fbq('track','Schedule');">${d.cta_book}</a>
          </div>
          <p class="drive-hours">${ui.hours}</p>
        </aside>
      </div>
    </div>
  </section>

  <section class="section town-worth">
    <div class="container">
      <h2>${d.h2_worth}</h2>
      <p class="town-worth-intro">${d.worth_intro}</p>
      <ul class="worth-grid">
          ${tiles}
      </ul>
      <div class="proof-strip">
        <figure>
          <img src="/images/operating-room-anaesthesia-monitoring.webp" alt="${esc(plain(ui.proof_caption_or))}" width="1000" height="667" loading="lazy" decoding="async">
          <figcaption>${ui.proof_caption_or}</figcaption>
        </figure>
        <figure>
          <img src="/images/cat-ckd-ultrasound-left-kidney.webp" alt="${esc(plain(ui.proof_caption_us))}" width="708" height="642" loading="lazy" decoding="async">
          <figcaption>${ui.proof_caption_us}</figcaption>
        </figure>
      </div>
      <p class="town-second-opinion">${d.worth_second_opinion}</p>
    </div>
  </section>

  <section class="section town-trip">
    <div class="container town-narrow">
      <h2>${d.h2_trip}</h2>
      <ul class="trip-list">
          ${trips}
      </ul>
    </div>
  </section>

  <section class="section town-together">
    <div class="container town-narrow">
      <h2>${d.h2_together}</h2>
      <p>${d.together}</p>
      <h2>${d.h2_emergency}</h2>
      <p>${d.emergency}</p>
      <div class="oncall-aside" role="note">
        <p class="oncall-line${lead.oncall === 'south' ? ' is-selected' : ''}" data-oncall="south">${ui.oncall_south}</p>
        <p class="oncall-line${lead.oncall === 'municipal' ? ' is-selected' : ''}" data-oncall="municipal">${ui.oncall_municipal}</p>
      </div>
    </div>
  </section>

  <section class="section town-prices">
    <div class="container town-narrow">
      <h2>${d.h2_prices}</h2>
      <div class="price-category open"><div class="price-category-body">${prices}</div></div>
      <p class="town-prices-note">${d.prices_note}</p>
    </div>
  </section>

  <section class="section town-faq">
    <div class="container town-narrow">
      <h2>${d.h2_faq}</h2>
          ${faq}
    </div>
  </section>

  <section class="section town-close">
    <div class="container">
      <div class="service-cta-box">
        <h2>${d.cta_title}</h2>
        <p>${d.cta_text}</p>
        <div class="service-cta-buttons">
          <a href="tel:+35863217300" class="btn btn-primary" onclick="gtag_report_conversion();">${d.cta_call}</a>
          <a href="https://my.provet.com/elainklinikka-saari" rel="noopener" class="btn btn-outline" onclick="window.fbq&amp;&amp;fbq('track','Schedule');">${d.cta_book}</a>
        </div>
        <p style="margin-top: 1rem; font-size: 0.95em;">${address}</p>
      </div>
      <a href="${cfg.home}" class="btn btn-secondary articles-back">${ui.back}</a>
    </div>
  </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <p>${cfg.footerBrand}</p>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">${cfg.footerHeads[0]}</strong>
          ${footerLinks}
        </div>
        <div class="footer-col">
          <strong class="footer-heading">${cfg.footerHeads[1]}</strong>
          <a href="tel:+35863217300" onclick="gtag_report_conversion();">063217300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="${MAPS}">${cfg.mapsLabel}</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">${cfg.footerHeads[2]}</strong>
          <div class="footer-social">
            <a href="https://www.facebook.com/SaariKlinikka" target="_blank" rel="noopener" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.5-3h-3v-2c0-.9.3-1.5 1.6-1.5H16.7V4.1C16.4 4.1 15.4 4 14.3 4c-2.3 0-3.8 1.4-3.8 3.9v2.6h-2.5v3h2.5V21h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/elainklinikkasaari" target="_blank" rel="noopener" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; ${cfg.footerBottom}</span>
        <a href="/tietosuoja/">${cfg.privacy}</a>
      </div>
    </div>
  </footer>

  <script src="/js/main.js?v=${JS_VERSION}" defer></script>
  <script>
  (function () {
    var ONCALL = {${TOWNS.map((t) => `${t.key}: '${t.oncall}'`).join(', ')}};
    var chips = document.querySelectorAll('.town-chip');
    var list = document.querySelector('.drive-list');
    var rows = list ? list.querySelectorAll('.drive-row') : [];
    var lines = document.querySelectorAll('.oncall-line');
    if (!chips.length || !list) return;
    chips.forEach(function (c) { c.setAttribute('role', 'button'); });   // links until JS runs; toggles once it has
    function select(town, push) {
      if (!ONCALL[town]) return;
      var selected = null;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-town') === town ? 'true' : 'false'); });
      rows.forEach(function (r) { var on = r.getAttribute('data-town') === town; r.classList.toggle('is-selected', on); if (on) selected = r; });
      lines.forEach(function (l) { l.classList.toggle('is-selected', l.getAttribute('data-oncall') === ONCALL[town]); });
      if (selected && list.firstElementChild !== selected) {
        list.classList.add('is-switching');
        window.setTimeout(function () { list.insertBefore(selected, list.firstElementChild); list.classList.remove('is-switching'); }, 160);
      }
      if (push && window.history && history.replaceState) history.replaceState(null, '', '#drive-' + town);
    }
    chips.forEach(function (c) {
      // stopImmediatePropagation: main.js (deferred, so registered after us) adds a smooth-scroll
      // handler to every a[href^="#"] that would scroll the page to the drive row — the chip must not move the page
      c.addEventListener('click', function (e) { e.preventDefault(); e.stopImmediatePropagation(); select(c.getAttribute('data-town'), true); });
    });
    var hash = (window.location.hash || '').replace('#drive-', '').replace('#', '');
    if (ONCALL[hash]) select(hash, false);
  })();
  </script>
</body>
</html>
`;
}

const CSS_MARK = '/* ===== Town landing pages (Sydösterbotten / Suupohja) ===== */';
const CSS_BLOCK = `
${CSS_MARK}
.town-page .section { padding-top: var(--spacing-xl); padding-bottom: var(--spacing-xl); }
.town-page .town-hero-section { padding-top: var(--spacing-lg); }
.town-hero { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); grid-template-rows: auto auto 1fr; grid-template-areas: "h1 band" "chips band" "lead band"; gap: var(--spacing-md) var(--spacing-xl); align-items: start; }
.town-hero h1 { grid-area: h1; font-size: clamp(1.75rem, 1.2rem + 2vw, 2.5rem); line-height: 1.15; letter-spacing: -0.015em; text-wrap: balance; margin: 0; color: var(--color-text); }
.town-lead-wrap { grid-area: lead; }
.town-lead { font-size: var(--font-size-lg); line-height: 1.55; max-width: 60ch; margin-bottom: var(--spacing-sm); }
.town-lead-2 { color: var(--color-text-light); max-width: 60ch; margin: 0; }
.town-chips { grid-area: chips; align-self: start; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.drive-band { grid-area: band; }
.town-chips-label { flex-basis: 100%; font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-light); }
.town-chip { display: inline-flex; align-items: center; min-height: 44px; padding: 0 1.1rem; border-radius: 50px; border: 1.5px solid var(--color-border); background: #fff; color: var(--color-text); font-weight: 600; font-size: var(--font-size-sm); text-decoration: none; transition: background-color .2s cubic-bezier(.2,.8,.2,1), border-color .2s cubic-bezier(.2,.8,.2,1), color .2s cubic-bezier(.2,.8,.2,1); }
.town-chip:not([aria-pressed="true"]):hover { border-color: var(--color-primary); color: var(--color-primary-dark); }
.town-chip[aria-pressed="true"] { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-text); }
.town-chip:focus-visible, .town-page a:focus-visible, .town-page .btn:focus-visible { outline: 3px solid var(--color-primary-dark); outline-offset: 3px; }
.drive-band { background: var(--color-primary-light); border-radius: var(--radius-lg); padding: var(--spacing-lg); box-shadow: 0 10px 28px -14px rgba(26, 26, 46, 0.22); }
.drive-heading { font-size: var(--font-size-base); font-weight: 700; margin: 0 0 var(--spacing-sm); color: var(--color-text); }
.drive-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.25rem; }
.drive-row { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 0.75rem; align-items: baseline; padding: 0.35rem 0.6rem; border-radius: var(--radius-sm); font-variant-numeric: tabular-nums; color: var(--color-text-light); font-size: var(--font-size-sm); transition: opacity .16s cubic-bezier(.2,.8,.2,1); }
.drive-list.is-switching .drive-row { opacity: 0; }
.drive-row .drive-from { font-weight: 500; min-width: 0; overflow-wrap: anywhere; hyphens: auto; }
.drive-row .drive-time, .drive-row .drive-km { white-space: nowrap; }
.drive-row.is-selected, .drive-row:target { grid-template-columns: 1fr; gap: 0.15rem; background: #fff; color: var(--color-text); padding: 0.75rem 0.85rem 0.85rem; margin-bottom: 0.4rem; box-shadow: 0 6px 18px -12px rgba(26, 26, 46, 0.25); }
.drive-row.is-selected .drive-from, .drive-row:target .drive-from { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-light); }
.drive-row.is-selected .drive-time, .drive-row:target .drive-time { font-size: clamp(1.75rem, 1.3rem + 1.5vw, 2.25rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; color: var(--color-text); }
.drive-row.is-selected .drive-km, .drive-row:target .drive-km { font-size: var(--font-size-base); color: var(--color-text-light); }
.town-cta { display: grid; grid-template-columns: minmax(0, 1fr); justify-content: stretch; justify-items: stretch; gap: 0.6rem; margin-top: var(--spacing-md); }
.town-cta .btn { width: 100%; justify-content: center; }
.drive-hours { margin: var(--spacing-sm) 0 0; font-size: var(--font-size-sm); color: var(--color-text-light); }
.town-page h2 { font-size: var(--font-size-2xl); line-height: 1.2; margin: 0 0 var(--spacing-sm); text-wrap: balance; color: var(--color-text); }
.town-together h2 + p + h2 { margin-top: var(--spacing-xl); }
.town-worth-intro { max-width: 65ch; color: var(--color-text-light); }
.proof-strip { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: var(--spacing-md); margin: var(--spacing-lg) 0; }
.proof-strip figure { margin: 0; }
.proof-strip img { width: 100%; height: 340px; object-fit: cover; border-radius: var(--radius-md); display: block; }
.proof-strip figcaption { font-size: var(--font-size-sm); color: var(--color-text-light); margin-top: 0.5rem; }
.worth-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--spacing-sm); }
.worth-tile { background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--spacing-md); display: flex; flex-direction: column; gap: 0.5rem; }
.worth-tile:first-child, .worth-tile:last-child { grid-column: span 2; }
.worth-tile h3 { font-size: var(--font-size-lg); line-height: 1.25; margin: 0; color: var(--color-text); }
.worth-tile p { margin: 0; color: var(--color-text-light); font-size: var(--font-size-sm); line-height: 1.55; }
.worth-tile p a, .town-page .town-narrow a, .town-second-opinion a, .town-worth-intro a, .town-prices-note a { color: var(--color-text); text-decoration: underline; text-decoration-color: var(--color-primary); text-decoration-thickness: 2px; text-underline-offset: 3px; transition: text-decoration-color .2s cubic-bezier(.2,.8,.2,1); }
.worth-tile p a:hover, .town-page .town-narrow a:hover, .town-second-opinion a:hover, .town-worth-intro a:hover { text-decoration-color: var(--color-primary-dark); }
.worth-price { margin-top: auto; padding-top: 0.6rem; border-top: 1px solid var(--color-border); font-variant-numeric: tabular-nums; color: var(--color-text); font-weight: 600; }
.worth-tile .worth-price { color: var(--color-text); }
.town-second-opinion { margin-top: var(--spacing-md); max-width: 65ch; }
.town-narrow { max-width: 760px; }
.trip-list { list-style: none; padding: 0; margin: var(--spacing-md) 0 0; display: grid; gap: var(--spacing-sm); }
.trip-list li { padding-left: 1.3rem; position: relative; line-height: 1.6; }
.trip-list li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--color-text-muted); }
.trip-times { display: grid; grid-template-columns: max-content 1fr; gap: 0.2rem 1rem; margin: 0.5rem 0 0; font-variant-numeric: tabular-nums; }
.trip-times dt { font-weight: 500; }
.trip-times dd { margin: 0; color: var(--color-text-light); }
.oncall-aside { background: var(--color-primary-light); border-radius: var(--radius-md); padding: var(--spacing-md); margin-top: var(--spacing-md); display: grid; gap: 0.5rem; }
.oncall-line { margin: 0; color: var(--color-text-light); transition: color .2s cubic-bezier(.2,.8,.2,1); }
.oncall-line.is-selected { color: var(--color-text); font-weight: 600; }
.town-prices .price-category { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; margin-top: var(--spacing-md); }
.town-prices .price-row:first-child { border-top: 0; }
.town-prices .price-value { font-variant-numeric: tabular-nums; white-space: nowrap; font-weight: 600; }
.town-prices-note { margin-top: var(--spacing-sm); color: var(--color-text-light); font-size: var(--font-size-sm); }
.town-faq h3 { font-size: var(--font-size-lg); margin: var(--spacing-md) 0 0.35rem; color: var(--color-text); }
.town-faq p { color: var(--color-text-light); max-width: 65ch; }
.town-close .service-cta-box { margin-top: 0; }
.town-page ::selection { background: var(--color-primary); color: #fff; }
@media (max-width: 900px) {
  /* phones and small tablets: H1 → chips → drive band → the two lead paragraphs, so the number and Call are in the first screen */
  .town-hero { grid-template-columns: 1fr; grid-template-rows: auto; grid-template-areas: "h1" "chips" "band" "lead"; gap: var(--spacing-md); }
  .worth-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 600px) {
  .town-hero h1 { font-size: 1.6rem; }
  .worth-grid { grid-template-columns: 1fr; }
  .worth-tile:first-child, .worth-tile:last-child { grid-column: auto; }
  .proof-strip { grid-template-columns: 1fr; }
  .proof-strip img { height: auto; aspect-ratio: 3 / 2; }
  .trip-times { font-size: var(--font-size-sm); gap: 0.2rem 0.75rem; }
  .trip-times dd { white-space: nowrap; }
  /* inside the band: heading, selected town, Call/Book, then the other five towns, then hours */
  .drive-band { padding: var(--spacing-md); display: grid; gap: 0.25rem; }
  .drive-heading { order: -1; }
  .drive-list { display: contents; }
  .drive-row { order: 2; }
  .drive-row.is-selected, .drive-row:target { order: 0; margin-bottom: 0; }
  .town-cta { order: 1; margin: 0.35rem 0 0.6rem; }
  .drive-hours { order: 3; margin-top: 0.35rem; }
  .town-page h2 { font-size: var(--font-size-xl); }
}
@media (max-width: 400px) {
  .drive-row { font-size: 0.8125rem; gap: 0.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .town-chip, .drive-list, .oncall-line { transition: none; }
}
`;

function ensureCss() {
  const p = path.join(ROOT, 'css', 'style.css');
  const css = fs.readFileSync(p, 'utf8');
  if (css.includes(CSS_MARK)) return 'css: present';
  fs.writeFileSync(p, css.replace(/\s*$/, '\n') + CSS_BLOCK);
  return 'css: appended';
}

function ensureSitemap() {
  const p = path.join(ROOT, 'sitemap.xml');
  let xml = fs.readFileSync(p, 'utf8');
  const entry = (cfg) => `  <url>
    <loc>${HOST}${cfg.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fi" href="${HOST}${PAGES.fi.path}"/>
    <xhtml:link rel="alternate" hreflang="sv" href="${HOST}${PAGES.sv.path}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${HOST}${PAGES.en.path}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${HOST}${PAGES.fi.path}"/>
  </url>
`;
  let added = 0, updated = 0;
  for (const cfg of LANGS.map((l) => PAGES[l])) {
    const loc = `<loc>${HOST}${cfg.path}</loc>`;
    const block = new RegExp(`  <url>\\s*${loc.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}[\\s\\S]*?</url>\\n`);
    const m = xml.match(block);
    if (m && m[0].includes(`hreflang="en"`)) continue;
    if (m) { xml = xml.replace(m[0], entry(cfg)); updated++; }
    else { xml = xml.replace('</urlset>', entry(cfg) + '</urlset>'); added++; }
  }
  if (added || updated) fs.writeFileSync(p, xml);
  return `sitemap: ${added} added, ${updated} updated`;
}

const results = [];
for (const lang of LANGS) {
  const d = readJson(`${lang}.json`), ui = readJson(`${lang}_ui.json`);
  if (!d || !ui) { results.push(`${lang}: SKIPPED (missing ${lang}.json or ${lang}_ui.json)`); continue; }
  const cfg = PAGES[lang];
  const out = path.join(ROOT, cfg.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, render(cfg, d, ui));
  results.push(`${lang}: wrote ${cfg.out}`);
}
results.push(ensureCss());
results.push(ensureSitemap());
console.log(results.join('\n'));
