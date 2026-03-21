#!/usr/bin/env node
/**
 * build-articles.js
 * Generates individual HTML pages for each article from index.html
 * Also regenerates sitemap.xml
 *
 * Usage: node build-articles.js
 * Zero dependencies — uses only Node.js built-ins.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ARTICLES_DIR = path.join(ROOT, 'articles');
const INDEX_PATH = path.join(ROOT, 'index.html');
const MAIN_JS_PATH = path.join(ROOT, 'js', 'main.js');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');
const BASE_URL = 'https://saarivet.fi';

// ──────────────────────────────────────────────
// 1. Article Registry
// ──────────────────────────────────────────────
// Each article: slug (URL), titleKey, tagKey, category, date
const articles = [
  {
    slug: 'tta-leikkaus',
    titleKey: 'article.tta.title',
    tagKey: 'articles.tag.orthopedics',
    category: 'surgery',
    date: '2026',
    sections: ['intro', 'how.title', 'how.text', 'vs.title', 'vs.text', 'recovery.title', 'recovery.text', 'risks.title', 'risks.text', 'when.title', 'when.text'],
    prefix: 'article.tta'
  },
  {
    slug: 'video-otoskopia',
    titleKey: 'article.otoscopy.title',
    tagKey: 'articles.tag.endoscopy',
    category: 'endoscopy',
    date: '2026',
    sections: ['intro', 'advantages.title', 'advantages.text', 'when.title', 'when.text', 'procedure.title', 'procedure.text', 'chronic.title', 'chronic.text', 'contact.title', 'contact.text'],
    prefix: 'article.otoscopy'
  },
  {
    slug: 'kipulääkeinfuusio',
    titleKey: 'article.mlk.title',
    tagKey: 'articles.tag.anesthesia',
    category: 'surgery',
    date: '2026',
    sections: ['intro', 'what.title', 'what.text', 'why.title', 'why.text', 'benefits.title', 'benefits.text', 'use.title', 'use.text', 'windup.title', 'windup.text'],
    prefix: 'article.mlk'
  },
  {
    slug: 'ripuli',
    titleKey: 'article.diarrhea.title',
    tagKey: 'article.tta.tag',
    category: 'health',
    date: '',
    sections: ['intro', 'causes.title', 'causes.text', 'homecare.title', 'homecare.text', 'warning.title', 'warning.text', 'prevention.title', 'prevention.text', 'contact.title', 'contact.text'],
    prefix: 'article.diarrhea'
  },
  {
    slug: 'avoin-valtimotiehyt-pda',
    titleKey: 'article.pda.title',
    tagKey: 'articles.filter.cardiology',
    category: 'cardiology',
    date: '',
    sections: ['intro', 'what.title', 'what.text', 'breeds.title', 'breeds.text', 'signs.title', 'signs.text', 'treatment.title', 'treatment.text', 'clinic.title', 'clinic.text', 'prognosis.title', 'prognosis.text', 'message.title', 'message.text'],
    prefix: 'article.pda'
  },
  {
    slug: 'hampaiden-harjaus',
    titleKey: 'article.brushing.title',
    tagKey: 'article.tta.tag',
    category: 'dental',
    date: '',
    sections: ['intro', 'why.title', 'why.text', 'how.title', 'how.text', 'start.title', 'start.text', 'signs.title', 'signs.text', 'professional.title', 'professional.text', 'challenge.title', 'challenge.text'],
    prefix: 'article.brushing'
  },
  {
    slug: 'viljaton-ruoka',
    titleKey: 'article.grainfree.title',
    tagKey: 'article.tta.tag',
    category: 'health',
    date: '',
    sections: ['intro', 'fda.title', 'fda.text', 'myth.title', 'myth.text', 'cats.title', 'cats.text', 'advice.title', 'advice.text'],
    prefix: 'article.grainfree'
  },
  {
    slug: 'periovive',
    titleKey: 'article.periovive.title',
    tagKey: 'article.tta.tag',
    category: 'dental',
    date: '',
    sections: ['intro', 'what.title', 'what.text', 'how.title', 'how.text', 'evidence.title', 'evidence.text', 'when.title', 'when.text', 'clinic.title', 'clinic.text'],
    prefix: 'article.periovive'
  },
  {
    slug: 'yksityinen-klinikka',
    titleKey: 'article.independent.title',
    tagKey: 'article.independent.tag',
    category: 'clinic',
    date: '',
    sections: ['intro', 'chains.title', 'chains.text', 'prices.title', 'prices.text', 'quality.title', 'quality.text', 'international.title', 'international.text', 'choice.title', 'choice.text'],
    prefix: 'article.independent'
  },
  {
    slug: 'ruoka-allergiat',
    titleKey: 'article.food.title',
    tagKey: 'article.food.tag',
    category: 'health',
    date: '',
    sections: ['intro', 'symptoms.title', 'symptoms.text', 'allergens.title', 'allergens.text', 'trial.title', 'trial.text', 'strict.title', 'strict.text', 'challenge.title', 'challenge.text', 'clinic.title', 'clinic.text'],
    prefix: 'article.food'
  },
  {
    slug: 'kilpirauhasen-liikatoiminta',
    titleKey: 'article.hyperthyroid.title',
    tagKey: 'article.hyperthyroid.tag',
    category: 'health',
    date: '',
    sections: ['intro', 'symptoms.title', 'symptoms.text', 'diagnosis.title', 'diagnosis.text', 'complications.title', 'complications.text', 'treatment.title', 'treatment.text'],
    prefix: 'article.hyperthyroid'
  },
  {
    slug: 'munuaisten-vajaatoiminta',
    titleKey: 'article.kidney.title',
    tagKey: 'article.kidney.tag',
    category: 'health',
    date: '',
    sections: ['intro', 'stages.title', 'stages.text', 'symptoms.title', 'symptoms.text', 'treatment.title', 'treatment.text'],
    prefix: 'article.kidney'
  },
  {
    slug: 'kyynpurema',
    titleKey: 'article.snake.title',
    tagKey: 'article.snake.tag',
    category: 'emergency',
    date: '',
    sections: ['intro', 'symptoms.title', 'symptoms.text', 'firstaid.title', 'firstaid.text', 'treatment.title', 'treatment.text', 'prevention.title', 'prevention.text'],
    prefix: 'article.snake'
  },
  {
    slug: 'kohtutulehdus',
    titleKey: 'article.pyometra.title',
    tagKey: 'article.pyometra.tag',
    category: 'emergency',
    date: '',
    sections: ['intro', 'symptoms.title', 'symptoms.text', 'danger.title', 'danger.text', 'treatment.title', 'treatment.text', 'prevention.title', 'prevention.text'],
    prefix: 'article.pyometra'
  },
  {
    slug: 'lateral-suture',
    titleKey: 'article.ccl.title',
    tagKey: 'articles.tag.orthopedics',
    category: 'surgery',
    date: '2026',
    sections: ['intro', 'how.title', 'how.text', 'who.title', 'who.text', 'recovery.title', 'recovery.text', 'risks.title', 'risks.text', 'vs.title', 'vs.text', 'signs.title', 'signs.text', 'price.title', 'price.text'],
    prefix: 'article.ccl'
  },
  {
    slug: 'siili',
    titleKey: 'article.hedgehog.title',
    tagKey: 'article.hedgehog.tag',
    category: 'wildlife',
    date: '2026',
    sections: ['intro', 'decline.title', 'decline.text', 'finland.title', 'finland.text', 'threats.title', 'threats.text', 'robots.title', 'robots.text', 'help.title', 'help.text', 'nest.title', 'nest.text'],
    prefix: 'article.hedgehog',
    hasSpecialContent: true
  },
  {
    slug: 'kissaystävällinen-klinikka',
    titleKey: 'article.catstress.title',
    tagKey: 'article.catstress.tag',
    category: 'health',
    date: '2026',
    sections: ['intro', 'signs.title', 'signs.text', 'feliway.title', 'feliway.text', 'clinic.title', 'clinic.text', 'tips.title', 'tips.text'],
    prefix: 'article.catstress'
  },
  {
    slug: 'puhkeamattomat-hampaat',
    titleKey: 'article.unerupted.title',
    tagKey: 'article.unerupted.tag',
    category: 'dental',
    date: '2026',
    sections: ['intro', 'cyst.title', 'cyst.text', 'symptoms.title', 'symptoms.text', 'breeds.title', 'breeds.text', 'diagnosis.title', 'diagnosis.text', 'treatment.title', 'treatment.text', 'prognosis.title', 'prognosis.text'],
    prefix: 'article.unerupted'
  },
  {
    slug: 'gastroskopia',
    titleKey: 'article.gastroscopy.title',
    tagKey: 'article.gastroscopy.tag',
    category: 'endoscopy',
    date: '2026',
    sections: ['intro', 'foreign.title', 'foreign.text', 'diagnosis.title', 'diagnosis.text', 'procedure.title', 'procedure.text', 'advantages.title', 'advantages.text', 'contact.title', 'contact.text'],
    prefix: 'article.gastroscopy'
  },
  {
    slug: 'hammasresorptio',
    titleKey: 'article.resorption.title',
    tagKey: 'article.resorption.tag',
    category: 'dental',
    date: '2026',
    sections: ['intro', 'types.title', 'types.text', 'symptoms.title', 'symptoms.text', 'diagnosis.title', 'diagnosis.text', 'treatment.title', 'treatment.text', 'after.title', 'after.text'],
    prefix: 'article.resorption'
  },
  {
    slug: 'rokotukset',
    titleKey: 'article.vaccination.title',
    tagKey: 'article.vaccination.tag',
    category: 'health',
    date: '2026',
    sections: ['intro', 'dogs.title', 'dogs.text', 'cats.title', 'cats.text', 'schedule.title', 'schedule.text', 'rabies.title', 'rabies.text', 'travel.title', 'travel.text'],
    prefix: 'article.vaccination',
    htmlSections: ['dogs.text', 'cats.text', 'schedule.text', 'travel.text']
  },
  {
    slug: 'ibd-lymfooma',
    titleKey: 'article.ibdlymphoma.title',
    tagKey: 'article.ibdlymphoma.tag',
    category: 'health',
    date: '2026',
    sections: ['intro', 'challenge.title', 'challenge.text', 'diagnosis.title', 'diagnosis.text', 'treatment.title', 'treatment.text', 'why.title', 'why.text'],
    prefix: 'article.ibdlymphoma',
    htmlSections: ['diagnosis.text', 'treatment.text']
  },
  {
    slug: 'hypotermia',
    titleKey: 'article.hypothermia.title',
    tagKey: 'article.hypothermia.tag',
    category: 'surgery',
    date: '2026',
    sections: ['intro', 'risks.title', 'risks.text', 'warming.title', 'warming.text', 'recovery.title', 'recovery.text', 'safety.title', 'safety.text'],
    prefix: 'article.hypothermia'
  },
  {
    slug: 'anestesiaturvallisuus',
    titleKey: 'article.anesthesia.title',
    tagKey: 'article.anesthesia.tag',
    category: 'surgery',
    date: '2026',
    sections: ['intro', 'risk.title', 'risk.text', 'monitoring.title', 'monitoring.text', 'balanced.title', 'balanced.text', 'vatinoxan.title', 'vatinoxan.text', 'preop.title', 'preop.text'],
    prefix: 'article.anesthesia',
    htmlSections: ['risk.text']
  },
  {
    slug: 'klinikkaeläinhoitaja',
    titleKey: 'article.vetnurse.title',
    tagKey: 'articles.filter.clinic',
    category: 'clinic',
    date: '2026',
    sections: ['intro', 'role.title', 'role.text', 'evidence.title', 'evidence.text', 'education.title', 'education.text', 'jenni.title', 'jenni.text'],
    prefix: 'article.vetnurse'
  }
];

// ──────────────────────────────────────────────
// 2. Extract translations from main.js
// ──────────────────────────────────────────────
function loadTranslations() {
  const jsSource = fs.readFileSync(MAIN_JS_PATH, 'utf-8');
  // Extract the translations object using a sandboxed approach
  // We find "const translations = {" and extract till the matching "};
  const startIdx = jsSource.indexOf('const translations = {');
  if (startIdx === -1) throw new Error('Could not find translations object in main.js');

  let depth = 0;
  let endIdx = -1;
  let inString = false;
  let stringChar = '';
  let escape = false;

  for (let i = startIdx + 'const translations = '.length; i < jsSource.length; i++) {
    const ch = jsSource[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (inString) {
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }

  if (endIdx === -1) throw new Error('Could not find end of translations object');

  const objStr = jsSource.substring(startIdx + 'const translations = '.length, endIdx);
  // Use Function constructor to evaluate (safer than eval, no global access)
  const translations = new Function('return ' + objStr)();
  return translations;
}

// ──────────────────────────────────────────────
// 3. Extract special article content from index.html
// ──────────────────────────────────────────────
function extractSpecialContent(indexHtml) {
  // Extract the hedgehog article's special content (images, links, CTA)
  const specialContent = {};

  // Hedgehog nest instructions paragraph
  const nestInstructionsMatch = indexHtml.match(/<p data-i18n="article\.hedgehog\.nest\.instructions">([\s\S]*?)<\/p>/);

  // Hedgehog house image
  const hedgehogHouseImg = indexHtml.match(/<div style="margin: var\(--spacing-lg\) 0;">\s*<img src="images\/hedgehog-house\.jpg"[\s\S]*?<\/div>/);

  // Hedgehog nest links (has data-i18n-html)
  const nestLinksMatch = indexHtml.match(/<p data-i18n="article\.hedgehog\.nest\.links" data-i18n-html>[\s\S]*?<\/p>/);

  // Hedgehog nest CTA (has data-i18n-html)
  const nestCtaMatch = indexHtml.match(/<p data-i18n="article\.hedgehog\.nest\.cta" data-i18n-html>[\s\S]*?<\/p>/);

  // Hedgehog injured section
  const injuredTitleMatch = indexHtml.match(/<h4 data-i18n="article\.hedgehog\.injured\.title">[\s\S]*?<\/h4>/);
  const injuredTextMatch = indexHtml.match(/<p data-i18n="article\.hedgehog\.injured\.text">[\s\S]*?<\/p>/);

  // Hedgehog size comparison image
  const hedgehogSizeImg = indexHtml.match(/<div style="margin: var\(--spacing-lg\) 0;">\s*<img src="images\/wildlife-hedgehog-size\.jpg"[\s\S]*?<\/div>/);

  // Hedgehog ecology section
  const ecologyTitleMatch = indexHtml.match(/<h4 data-i18n="article\.hedgehog\.ecology\.title">[\s\S]*?<\/h4>/);
  const ecologyTextMatch = indexHtml.match(/<p data-i18n="article\.hedgehog\.ecology\.text">[\s\S]*?<\/p>/);

  // Hedgehog photo caption
  const photoCaptionMatch = indexHtml.match(/<p data-i18n="article\.hedgehog\.photo\.caption"[\s\S]*?<\/p>/);

  specialContent.hedgehog = {
    nestInstructions: nestInstructionsMatch ? nestInstructionsMatch[0] : '',
    hedgehogHouseImg: hedgehogHouseImg ? hedgehogHouseImg[0] : '',
    nestLinks: nestLinksMatch ? nestLinksMatch[0] : '',
    nestCta: nestCtaMatch ? nestCtaMatch[0] : '',
    injuredTitle: injuredTitleMatch ? injuredTitleMatch[0] : '',
    injuredText: injuredTextMatch ? injuredTextMatch[0] : '',
    hedgehogSizeImg: hedgehogSizeImg ? hedgehogSizeImg[0] : '',
    ecologyTitle: ecologyTitleMatch ? ecologyTitleMatch[0] : '',
    ecologyText: ecologyTextMatch ? ecologyTextMatch[0] : '',
    photoCaption: photoCaptionMatch ? photoCaptionMatch[0] : ''
  };

  return specialContent;
}

// ──────────────────────────────────────────────
// 4. Generate article HTML content
// ──────────────────────────────────────────────
function generateArticleBody(article, translations, specialContent) {
  const t = (key) => {
    if (translations[key] && translations[key].fi) return translations[key].fi;
    return '';
  };

  const isHtml = (suffix) => article.htmlSections && article.htmlSections.includes(suffix);

  let html = '';

  for (let i = 0; i < article.sections.length; i++) {
    const suffix = article.sections[i];
    const key = `${article.prefix}.${suffix}`;
    const content = t(key);

    if (suffix === 'intro') {
      html += `          <p data-i18n="${key}">${content}</p>\n`;
    } else if (suffix.endsWith('.title')) {
      html += `\n          <h4 data-i18n="${key}">${content}</h4>\n`;
    } else {
      if (isHtml(suffix)) {
        html += `          <p data-i18n="${key}" data-i18n-html>${content}</p>\n`;
      } else {
        html += `          <p data-i18n="${key}">${content}</p>\n`;
      }
    }

    // Insert special hedgehog content after nest.text
    if (article.slug === 'siili' && suffix === 'nest.text') {
      const sc = specialContent.hedgehog;
      html += `\n          ${sc.nestInstructions}\n`;
      // Hedgehog house image (fix path)
      html += `\n          ${sc.hedgehogHouseImg.replace(/src="images\//g, 'src="../images/')}\n`;
      // Nest links
      html += `\n          ${sc.nestLinks}\n`;
      // Nest CTA
      html += `\n          ${sc.nestCta}\n`;
      // Injured section
      html += `\n          ${sc.injuredTitle}\n`;
      html += `          ${sc.injuredText}\n`;
      // Size comparison image (fix path)
      html += `\n          ${sc.hedgehogSizeImg.replace(/src="images\//g, 'src="../images/')}\n`;
      // Ecology section
      html += `\n          ${sc.ecologyTitle}\n`;
      html += `          ${sc.ecologyText}\n`;
    }
  }

  return html;
}

// ──────────────────────────────────────────────
// 5. Generate full article HTML page
// ──────────────────────────────────────────────
function generateArticlePage(article, translations, specialContent) {
  const t = (key) => {
    if (translations[key] && translations[key].fi) return translations[key].fi;
    return '';
  };

  const title = t(article.titleKey);
  const tag = t(article.tagKey);
  const pageTitle = `${title} | Eläinklinikka Saari`;
  // Use first 160 chars of intro as description
  const introKey = `${article.prefix}.intro`;
  let description = t(introKey);
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  const canonicalUrl = `${BASE_URL}/articles/${article.slug}.html`;
  const articleBody = generateArticleBody(article, translations, specialContent);
  const dateStr = article.date || '2026';
  const today = new Date().toISOString().split('T')[0];
  const isoDatePublished = '2026-01-01';
  const isoDateModified = today;

  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>

  <!-- Google Analytics: Consent Mode v2 (denied by default, enabled on accept) -->
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
    gtag('config', 'G-92LHP2TK6N');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-92LHP2TK6N"></script>

  <meta name="description" content="${escapeAttr(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="fi" href="${canonicalUrl}">
  <link rel="alternate" hreflang="sv" href="${canonicalUrl}">
  <link rel="alternate" hreflang="en" href="${canonicalUrl}">
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:image" content="${BASE_URL}/images/clinic-about.jpg">
  <meta property="og:locale" content="fi_FI">
  <meta property="og:site_name" content="Eläinklinikka Saari">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(title)}">
  <meta name="twitter:description" content="${escapeAttr(description)}">
  <meta name="twitter:image" content="${BASE_URL}/images/clinic-about.jpg">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  [{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(title)},
    "description": ${JSON.stringify(description)},
    "image": "${BASE_URL}/images/clinic-about.jpg",
    "datePublished": "${isoDatePublished}",
    "dateModified": "${isoDateModified}",
    "author": {
      "@type": "Organization",
      "name": "Eläinklinikka Saari",
      "url": "${BASE_URL}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Eläinklinikka Saari",
      "logo": {
        "@type": "ImageObject",
        "url": "${BASE_URL}/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${canonicalUrl}"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Etusivu",
        "item": "${BASE_URL}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Artikkelit",
        "item": "${BASE_URL}/#articles"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": ${JSON.stringify(title)},
        "item": "${canonicalUrl}"
      }
    ]
  }]
  </script>

  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/png" href="../images/logo.png">
</head>
<body class="article-page">

  <!-- ===== Header ===== -->
  <header class="header">
    <div class="container">
      <a href="../" class="logo">
        <div class="logo-icon"><img src="../images/logo.png" alt="Eläinklinikka Saari"></div>
      </a>

      <nav class="nav">
        <div class="nav-actions">
          <div class="lang-toggle">
            <button data-lang="fi" class="active" onclick="setLanguage('fi')">FI</button>
            <button data-lang="sv" onclick="setLanguage('sv')">SV</button>
            <button data-lang="en" onclick="setLanguage('en')">EN</button>
          </div>
          <a href="../" class="btn btn-outline btn-sm" data-i18n="articles.back">\u2190 Takaisin etusivulle</a>
        </div>
      </nav>
    </div>
  </header>

  <!-- ===== Article ===== -->
  <section class="section articles-section">
    <div class="container">
      <article class="article-card" data-category="${article.category}">
        <div class="article-header">
          <span class="article-tag" data-i18n="${article.tagKey}">${tag}</span>
${article.date ? `          <time>${article.date}</time>\n` : ''}        </div>
        <h1 data-i18n="${article.titleKey}">${title}</h1>
        <div class="article-content">
${articleBody}        </div>
      </article>

      <a href="../" class="btn btn-secondary articles-back" data-i18n="articles.back">\u2190 Takaisin etusivulle</a>
    </div>
  </section>

  <!-- ===== Footer ===== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <p data-i18n="footer.description">Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.</p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.quicklinks">Pikalinkit</h4>
          <a href="../#about" data-i18n="nav.about">Klinikka</a>
          <a href="../#services" data-i18n="nav.services">Palvelut</a>
          <a href="../#team" data-i18n="nav.team">Henkilökunta</a>
          <a href="../#prices" data-i18n="nav.prices">Hinnasto</a>
          <a href="../#wildlife" data-i18n="nav.wildlife">Wildlife</a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.contact">Yhteystiedot</h4>
          <a href="tel:+35863217300">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.follow">Seuraa meitä</h4>
          <div class="footer-social">
            <a href="https://www.facebook.com/SaariKlinikka" target="_blank" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/elainklinikkasaari" target="_blank" aria-label="Instagram">ig</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; Y-tunnus: 0708667-9 &middot; <span data-i18n="footer.rights">Kaikki oikeudet pidätetään.</span></span>
      </div>
    </div>
  </footer>

  <script src="../js/main.js"></script>

  <!-- Cookie Consent Banner -->
  <div id="cookie-consent" style="display:none;">
    <div class="cookie-consent-inner">
      <p id="cookie-consent-text">Käytämme evästeitä sivuston kävijäliikenteen analysointiin Google Analyticsin avulla. Evästeitä käytetään vain, jos hyväksyt ne.</p>
      <div class="cookie-consent-buttons">
        <button id="cookie-accept" onclick="acceptCookies()">Hyväksy</button>
        <button id="cookie-decline" onclick="declineCookies()">Hylkää</button>
      </div>
    </div>
  </div>

  <script>
    (function() {
      var consent = localStorage.getItem('cookie_consent');
      if (consent === 'accepted') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      } else if (consent !== 'declined') {
        document.getElementById('cookie-consent').style.display = 'flex';
      }

      var cookieTexts = {
        fi: { text: 'Käytämme evästeitä sivuston kävijäliikenteen analysointiin Google Analyticsin avulla. Evästeitä käytetään vain, jos hyväksyt ne.', accept: 'Hyväksy', decline: 'Hylkää' },
        sv: { text: 'Vi använder cookies för att analysera webbplatstrafiken med Google Analytics. Cookies används bara om du godkänner dem.', accept: 'Godkänn', decline: 'Avvisa' },
        en: { text: 'We use cookies to analyze site traffic with Google Analytics. Cookies are only used if you accept them.', accept: 'Accept', decline: 'Decline' }
      };

      function updateCookieText() {
        var lang = localStorage.getItem('preferredLanguage') || 'fi';
        var t = cookieTexts[lang] || cookieTexts.fi;
        var el = document.getElementById('cookie-consent-text');
        if (el) el.textContent = t.text;
        var acceptBtn = document.getElementById('cookie-accept');
        if (acceptBtn) acceptBtn.textContent = t.accept;
        var declineBtn = document.getElementById('cookie-decline');
        if (declineBtn) declineBtn.textContent = t.decline;
      }
      updateCookieText();

      var origSetLang = window.setLanguage;
      window.setLanguage = function(lang) {
        if (origSetLang) origSetLang(lang);
        updateCookieText();
      };
    })();

    function acceptCookies() {
      localStorage.setItem('cookie_consent', 'accepted');
      document.getElementById('cookie-consent').style.display = 'none';
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }

    function declineCookies() {
      localStorage.setItem('cookie_consent', 'declined');
      document.getElementById('cookie-consent').style.display = 'none';
    }
  </script>

</body>
</html>`;
}

// ──────────────────────────────────────────────
// 6. Generate sitemap.xml
// ──────────────────────────────────────────────
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

  for (const article of articles) {
    xml += `  <url>
    <loc>${BASE_URL}/articles/${article.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  xml += `</urlset>
`;
  return xml;
}

// ──────────────────────────────────────────────
// Utility functions
// ──────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────
function main() {
  console.log('Building article pages...\n');

  // Load translations
  console.log('Loading translations from js/main.js...');
  const translations = loadTranslations();
  const translationKeys = Object.keys(translations);
  console.log(`  Found ${translationKeys.length} translation keys`);

  // Read index.html for special content
  console.log('Reading index.html for special article content...');
  const indexHtml = fs.readFileSync(INDEX_PATH, 'utf-8');
  const specialContent = extractSpecialContent(indexHtml);

  // Ensure articles directory exists
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }

  // Generate each article page
  let count = 0;
  for (const article of articles) {
    const title = translations[article.titleKey]?.fi || article.slug;
    const html = generateArticlePage(article, translations, specialContent);
    const filePath = path.join(ARTICLES_DIR, `${article.slug}.html`);
    fs.writeFileSync(filePath, html, 'utf-8');
    count++;
    console.log(`  [${count}/${articles.length}] ${article.slug}.html - ${title.substring(0, 60)}...`);
  }

  // Generate sitemap
  console.log('\nGenerating sitemap.xml...');
  const sitemap = generateSitemap();
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf-8');
  console.log(`  Sitemap updated with ${articles.length + 1} URLs`);

  console.log(`\nDone! Generated ${count} article pages in articles/`);
}

main();
