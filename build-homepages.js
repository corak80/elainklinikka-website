#!/usr/bin/env node
/**
 * One-shot script to generate /sv/index.html and /en/index.html
 * from the FI homepage at /index.html.
 *
 * Reads i18n translations from js/main.src.js (the const translations object)
 * and applies them to all [data-i18n] elements. Also rewrites meta tags,
 * Open Graph, Twitter cards, hreflang, canonical, lang-toggle, and
 * Person.description JSON-LD entries for each language.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = '/Users/assafwydra/elainklinikka-website';
const FI_HOME = path.join(ROOT, 'index.html');
const MAIN_JS = path.join(ROOT, 'js', 'main.src.js');

// --- 1. Extract translations object from main.src.js ---
const mainJs = fs.readFileSync(MAIN_JS, 'utf8');
const startMarker = 'const translations = {';
const startIdx = mainJs.indexOf(startMarker);
if (startIdx < 0) throw new Error('translations object not found');

// Find matching `};`
let depth = 0;
let endIdx = -1;
for (let i = startIdx + startMarker.length - 1; i < mainJs.length; i++) {
  const ch = mainJs[i];
  if (ch === '{') depth++;
  else if (ch === '}') {
    depth--;
    if (depth === 0) { endIdx = i + 1; break; }
  }
}
if (endIdx < 0) throw new Error('matching brace not found');
const objLiteral = mainJs.substring(startIdx + 'const translations = '.length, endIdx);

const translations = vm.runInNewContext('(' + objLiteral + ')');
console.log(`Loaded ${Object.keys(translations).length} translation keys`);

// --- 2. Hand-crafted page-meta translations ---
const pageMeta = {
  fi: {
    htmlLang: 'fi',
    title: 'Eläinklinikka Saari — Pieneläinklinikka Vaasassa 1989',
    description: 'Pieneläinklinikka ja eläinlääkäri Vaasassa vuodesta 1989. Hammashoito, kirurgia, sydäntutkimukset ja ultraääni koirille ja kissoille. Varaa aika!',
    ogTitle: 'Eläinklinikka Saari – Pieneläinklinikka ja eläinlääkäri Vaasassa',
    ogDescription: 'Pieneläinklinikka ja eläinlääkäri Vaasassa vuodesta 1989. Hammashoito, kirurgia, sydäntutkimukset ja ultraääni koirille ja kissoille.',
    ogLocale: 'fi_FI',
    twitterDescription: 'Pieneläinklinikka ja eläinlääkäri Vaasassa vuodesta 1989',
    keywords: 'eläinlääkäri, Vaasa, eläinklinikka, pieneläinklinikka, eläinlääkäriasema, koira, kissa, hammashoito, kirurgia, sydäntutkimus, ultraääni, rokotus, veterinär, djurklinik, smådjursklinik',
    canonical: 'https://saarivet.fi/',
    skipLink: 'Siirry sisältöön',
    jobTitle: 'Eläinlääkäri',
  },
  sv: {
    htmlLang: 'sv',
    title: 'Veterinär Vasa — Djurklinik Saari, mån–fre 9–17',
    description: 'Smådjursklinik och veterinär i Vasa sedan 1989. Tandvård, kirurgi, hjärtundersökningar och ultraljud för hundar och katter. Boka tid!',
    ogTitle: 'Djurklinik Saari – Smådjursklinik och veterinär i Vasa',
    ogDescription: 'Smådjursklinik och veterinär i Vasa sedan 1989. Tandvård, kirurgi, hjärtundersökningar och ultraljud för hundar och katter.',
    ogLocale: 'sv_FI',
    twitterDescription: 'Smådjursklinik och veterinär i Vasa sedan 1989',
    keywords: 'veterinär, Vasa, djurklinik, smådjursklinik, veterinärstation, hund, katt, tandvård, kirurgi, hjärtundersökning, ultraljud, vaccination, eläinlääkäri',
    canonical: 'https://saarivet.fi/sv/',
    skipLink: 'Hoppa till innehåll',
    jobTitle: 'Veterinär',
  },
  en: {
    htmlLang: 'en',
    title: 'Veterinarian in Vaasa — Saari Clinic, Mon–Fri 9–17',
    description: 'Small animal clinic and veterinarian in Vaasa since 1989. Dental, surgery, cardiac examinations and ultrasound for dogs and cats. Book online.',
    ogTitle: 'Eläinklinikka Saari – Small Animal Clinic and Veterinarian in Vaasa',
    ogDescription: 'Small animal clinic and veterinarian in Vaasa since 1989. Dental care, surgery, cardiac examinations and ultrasound for dogs and cats.',
    ogLocale: 'en_GB',
    twitterDescription: 'Small animal clinic and veterinarian in Vaasa since 1989',
    keywords: 'veterinarian, Vaasa, animal clinic, small animal clinic, veterinary clinic, dog, cat, dental care, surgery, cardiac examination, ultrasound, vaccination',
    canonical: 'https://saarivet.fi/en/',
    skipLink: 'Skip to content',
    jobTitle: 'Veterinarian',
  },
};

// --- 3. Person.description translations (for the 5 vets) ---
const personDescriptions = {
  'Leena Sandström': {
    fi: 'Eläinlääkäri vuodesta 1997. Erikoistunut koirien ja kissojen sydänsairauksiin ja sisätauteihin. Suomen Kennelliiton valtuutettu sydäntutkija.',
    sv: 'Veterinär sedan 1997. Specialiserad på hjärtsjukdomar och internmedicin hos hund och katt. Auktoriserad hjärtundersökare för Finska Kennelklubben.',
    en: 'Veterinarian since 1997. Specialised in canine and feline cardiology and internal medicine. Authorised heart examiner for the Finnish Kennel Club.',
  },
  'Pamela Kvarngård': {
    fi: 'Eläinlääkäri vuodesta 2013. Erikoistunut ortopediseen kirurgiaan, pehmytkudoskirurgiaan ja hammashoitoon.',
    sv: 'Veterinär sedan 2013. Specialiserad på ortopedisk kirurgi, mjukdelskirurgi och tandvård.',
    en: 'Veterinarian since 2013. Specialised in orthopaedic surgery, soft tissue surgery and dentistry.',
  },
  'Assaf Wydra': {
    fi: 'Eläinlääkäri vuodesta 2011. Erikoistunut hammashoitoon, tähystystutkimuksiin ja luonnonvaraisten eläinten hoitoon.',
    sv: 'Veterinär sedan 2011. Specialiserad på tandvård, endoskopi och vård av vilda djur.',
    en: 'Veterinarian since 2011. Specialised in dentistry, endoscopy and wildlife medicine.',
  },
  'Nina Haglund': {
    fi: 'Eläinlääkäri vuodesta 2016/2017, Eläinklinikka Saaressa vuodesta 2020. Erikoistunut kirurgiaan, hammashoitoon ja dermatologiaan. Farmaseutin tausta.',
    sv: 'Veterinär sedan 2016/2017, vid Djurklinik Saari sedan 2020. Specialiserad på kirurgi, tandvård och dermatologi. Bakgrund som farmaceut.',
    en: 'Veterinarian since 2016/2017, at Eläinklinikka Saari since 2020. Specialised in surgery, dentistry and dermatology. Pharmacist background.',
  },
  'Merja Autio': {
    fi: 'Eläinlääkäri vuodesta 2024. Erityiset kiinnostuksen kohteet: pehmytkudoskirurgia ja eksoottiset eläimet.',
    sv: 'Veterinär sedan 2024. Särskilda intressen: mjukdelskirurgi och exotiska djur.',
    en: 'Veterinarian since 2024. Special interests: soft tissue surgery and exotic animals.',
  },
};

// --- 4. Helper functions ---
function escapeHtmlAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyDataI18n(html, lang) {
  // Match: <TAG ...data-i18n="key"...>CONTENT</TAG>  on a single line
  return html.replace(
    /(<(\w+)([^>]*?)data-i18n="([^"]+)"([^>]*?)>)([^\n]*?)(<\/\2>)/g,
    (match, openTag, tagName, beforeAttrs, key, afterAttrs, content, closeTag) => {
      const t = translations[key];
      if (!t || !t[lang]) return match; // keep original if no translation
      let translated = t[lang];
      // If the original tag has data-i18n-html, treat as HTML; otherwise as text
      const isHtml = /data-i18n-html\b/.test(openTag);
      if (!isHtml) {
        // Translation is plain text — escape special chars to be safe
        translated = translated; // i18n table content is already display-ready
      }
      return openTag + translated + closeTag;
    }
  );
}

function applyDataI18nPlaceholder(html, lang) {
  return html.replace(/(\splaceholder=")([^"]*)("\s+data-i18n-placeholder="([^"]+)")/g, (m, p1, oldVal, p3, key) => {
    const t = translations[key];
    if (!t || !t[lang]) return m;
    return ` placeholder="${escapeHtmlAttr(t[lang])}"${p3.replace(/^ placeholder="[^"]*"/, '')}`;
  });
}

function applyDataHrefs(html, lang) {
  // For elements with data-href-fi / data-href-sv / data-href-en, replace href with the lang variant
  return html.replace(
    /(<a\s+[^>]*?)href="([^"]+)"([^>]*?data-href-fi="([^"]*)"\s+data-href-sv="([^"]*)"\s+data-href-en="([^"]*)"[^>]*>)/g,
    (m, prefix, oldHref, rest, fi, sv, en) => {
      const target = lang === 'sv' ? sv : (lang === 'en' ? en : fi);
      return prefix + 'href="' + target + '"' + rest;
    }
  );
}

// FI article slug → SV/EN slug map (kept in sync with main.src.js articleSlugMap).
// Used to rewrite article hrefs on SV/EN homepages so they point to translated articles
// instead of the FI default. Without this, Googlebot indexing /sv/ or /en/ sees 25 FI links.
const ARTICLE_SLUG_MAP = {
  'tta-leikkaus': { sv: 'tta-operation', en: 'tta-surgery' },
  'video-otoskopia': { sv: 'video-otoskopi', en: 'video-otoscopy' },
  'kipulääkeinfuusio': { sv: 'smartlindringsinfusion', en: 'pain-relief-infusion' },
  'ripuli': { sv: 'diarre', en: 'diarrhoea' },
  'avoin-valtimotiehyt-pda': { sv: 'oppen-ductus-arteriosus-pda', en: 'patent-ductus-arteriosus-pda' },
  'hampaiden-harjaus': { sv: 'tandborstning', en: 'tooth-brushing' },
  'viljaton-ruoka': { sv: 'spannmalsfri-mat', en: 'grain-free-food' },
  'yksityinen-klinikka': { sv: 'privat-klinik', en: 'independent-clinic' },
  'ruoka-allergiat': { sv: 'foderallergier', en: 'food-allergies' },
  'kilpirauhasen-liikatoiminta': { sv: 'hypertyreos-katt', en: 'hyperthyroidism' },
  'munuaisten-vajaatoiminta': { sv: 'njursvikt', en: 'kidney-disease' },
  'kyynpurema': { sv: 'huggormsbett', en: 'snake-bite' },
  'kohtutulehdus': { sv: 'livmoderinflammation', en: 'pyometra' },
  'siili': { sv: 'igelkott', en: 'hedgehog' },
  'kissaystävällinen-klinikka': { sv: 'kattvanlig-klinik', en: 'cat-friendly-clinic' },
  'puhkeamattomat-hampaat': { sv: 'icke-framvaxta-tander', en: 'unerupted-teeth' },
  'gastroskopia': { sv: 'gastroskopi', en: 'gastroscopy' },
  'hammasresorptio': { sv: 'tandresorption', en: 'tooth-resorption' },
  'rokotukset': { sv: 'vaccinationsguide', en: 'vaccinations-guide' },
  'ibd-lymfooma': { sv: 'ibd-lymfom', en: 'ibd-lymphoma' },
  'hypotermia': { sv: 'hypotermi', en: 'hypothermia' },
  'anestesiaturvallisuus': { sv: 'anestesisakerhet', en: 'anaesthesia-safety' },
  'klinikkaeläinhoitaja': { sv: 'klinikdjurskotare', en: 'veterinary-nurse' },
  'periovive': { sv: 'periovive', en: 'periovive' },
  'lateral-suture': { sv: 'lateral-suture', en: 'lateral-suture' },
};

function rewriteArticleUrls(html, lang) {
  if (lang === 'fi') return html;
  const baseMap = { sv: '/sv/artiklar/', en: '/en/articles/' };
  const base = baseMap[lang];
  return html.replace(
    /href="\/articles\/([^"]+)\.html"/g,
    (m, fiSlug) => {
      const localized = (ARTICLE_SLUG_MAP[fiSlug] && ARTICLE_SLUG_MAP[fiSlug][lang]) || fiSlug;
      return `href="${base}${localized}.html"`;
    }
  );
}

function rewriteLangToggle(html, lang) {
  // The lang-toggle has <button data-lang="fi" class="active">FI</button> etc.
  // Move "active" class to the right button.
  return html.replace(
    /<div class="lang-toggle">([\s\S]*?)<\/div>/,
    (m, inner) => {
      const updated = inner
        .replace(/<button data-lang="fi"[^>]*>FI<\/button>/, `<button data-lang="fi" class="${lang==='fi'?'active':''}">FI</button>`)
        .replace(/<button data-lang="sv"[^>]*>SV<\/button>/, `<button data-lang="sv" class="${lang==='sv'?'active':''}">SV</button>`)
        .replace(/<button data-lang="en"[^>]*>EN<\/button>/, `<button data-lang="en" class="${lang==='en'?'active':''}">EN</button>`);
      return `<div class="lang-toggle">${updated}</div>`;
    }
  );
}

function rewriteHead(html, lang) {
  const meta = pageMeta[lang];

  // <html lang="...">
  html = html.replace(/<html lang="[^"]+">/, `<html lang="${meta.htmlLang}">`);

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtmlAttr(meta.title)}</title>`);

  // meta description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escapeHtmlAttr(meta.description)}">`
  );

  // meta keywords
  html = html.replace(
    /<meta name="keywords" content="[^"]*">/,
    `<meta name="keywords" content="${escapeHtmlAttr(meta.keywords)}">`
  );

  // canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]+">/,
    `<link rel="canonical" href="${meta.canonical}">`
  );

  // hreflang block — replace whatever is there with the full triplet + x-default
  // First strip existing hreflang lines
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g, '');
  // Then insert after canonical
  const hreflangBlock = [
    `  <link rel="alternate" hreflang="fi" href="https://saarivet.fi/">`,
    `  <link rel="alternate" hreflang="sv" href="https://saarivet.fi/sv/">`,
    `  <link rel="alternate" hreflang="en" href="https://saarivet.fi/en/">`,
    `  <link rel="alternate" hreflang="x-default" href="https://saarivet.fi/">`,
  ].join('\n');
  html = html.replace(
    /(<link rel="canonical" href="[^"]+">)/,
    `$1\n${hreflangBlock}`
  );

  // og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]+">/,
    `<meta property="og:url" content="${meta.canonical}">`
  );

  // og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]+">/,
    `<meta property="og:title" content="${escapeHtmlAttr(meta.ogTitle)}">`
  );

  // og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]+">/,
    `<meta property="og:description" content="${escapeHtmlAttr(meta.ogDescription)}">`
  );

  // og:locale
  html = html.replace(
    /<meta property="og:locale" content="[^"]+">/,
    `<meta property="og:locale" content="${meta.ogLocale}">`
  );

  // twitter:title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]+">/,
    `<meta name="twitter:title" content="${escapeHtmlAttr(meta.ogTitle)}">`
  );

  // twitter:description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]+">/,
    `<meta name="twitter:description" content="${escapeHtmlAttr(meta.twitterDescription)}">`
  );

  return html;
}

function rewriteJsonLd(html, lang) {
  const meta = pageMeta[lang];
  // Translate each Person.jobTitle and Person.description independently
  Object.keys(personDescriptions).forEach((name) => {
    const descT = personDescriptions[name];
    const escName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // 1) jobTitle: tightly anchored after name
    const reJob = new RegExp(`("name":\\s*"${escName}",\\s*"jobTitle":\\s*")[^"]+(")`);
    html = html.replace(reJob, (m, p1, p2) => `${p1}${meta.jobTitle}${p2}`);

    // 2) description: anchored by name, spans worksFor + image (use [\s\S]*?)
    const reDesc = new RegExp(`("name":\\s*"${escName}",[\\s\\S]*?"description":\\s*")[^"]+(")`);
    html = html.replace(reDesc, (m, p1, p2) => `${p1}${descT[lang]}${p2}`);
  });

  // Add worksFor to each Person if not already present.
  // The pattern is: after the closing brace of each Person object, add ,"worksFor": {...}
  // Since JSON-LD here uses a fixed structure, we'll splice worksFor after "name":"Personname"
  // Simpler approach: after "jobTitle": "...", add "worksFor"
  const worksForLiteral = `,
        "worksFor": {
          "@type": "VeterinaryCare",
          "name": "Eläinklinikka Saari",
          "url": "https://saarivet.fi"
        }`;
  // For each vet, insert worksFor after jobTitle if not already there
  Object.keys(personDescriptions).forEach((name) => {
    const escName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`("name":\\s*"${escName}",\\s*"jobTitle":\\s*"[^"]+")(,\\s*"image":)`);
    html = html.replace(re, (m, p1, p2) => {
      // If worksFor already exists, leave alone
      const idxStart = html.indexOf(p1);
      const idxEnd = html.indexOf('"image":', idxStart);
      const slice = html.substring(idxStart, idxEnd);
      if (slice.includes('"worksFor"')) return m;
      return p1 + worksForLiteral + p2;
    });
  });

  // skip-link text
  html = html.replace(
    /(<a href="#main-content" class="skip-link">)[^<]*(<\/a>)/,
    `$1${meta.skipLink}$2`
  );

  return html;
}

// --- 5. Build SV and EN homepages ---
const fiHtml = fs.readFileSync(FI_HOME, 'utf8');

// Apply worksFor to FI homepage too (for H2 enrichment) — write back
let fiRewritten = fiHtml;
fiRewritten = rewriteJsonLd(fiRewritten, 'fi');
fs.writeFileSync(FI_HOME, fiRewritten, 'utf8');
console.log('FI homepage: added worksFor to Person entries');

for (const lang of ['sv', 'en']) {
  let html = fiRewritten;
  html = applyDataI18n(html, lang);
  html = applyDataI18nPlaceholder(html, lang);
  html = applyDataHrefs(html, lang);
  html = rewriteArticleUrls(html, lang);
  html = rewriteLangToggle(html, lang);
  html = rewriteHead(html, lang);
  html = rewriteJsonLd(html, lang);

  const outPath = path.join(ROOT, lang, 'index.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`Wrote ${outPath} (${html.length} bytes)`);
}

console.log('Done.');
