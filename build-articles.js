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
const MAIN_JS_PATH = path.join(ROOT, 'js', 'main.src.js');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');
const BASE_URL = 'https://saarivet.fi';

// Returns the localized slug for an article in the given language.
// Falls back to the Finnish slug if no localized slug is defined.
function articleSlug(article, lang) {
  if (lang === 'sv') return article.slugSv || article.slug;
  if (lang === 'en') return article.slugEn || article.slug;
  return article.slug;
}

// Generates a client-side redirect stub (meta refresh + canonical).
// Used for old legacy SV/EN article paths to point at new localized slugs.
// GitHub Pages has no native 301 support, so this is the best available option.
function generateRedirectStub(targetUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Redirecting…</title>
<link rel="canonical" href="${targetUrl}">
<meta name="robots" content="noindex,follow">
<meta http-equiv="refresh" content="0; url=${targetUrl}">
<script>window.location.replace(${JSON.stringify(targetUrl)});</script>
</head>
<body>
<p>This page has moved. Redirecting to <a href="${targetUrl}">${targetUrl}</a>…</p>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// 1. Article Registry
// ──────────────────────────────────────────────
// Each article: slug (URL), titleKey, tagKey, category, date
const articles = [
  {
    slug: 'tta-leikkaus',
    slugSv: 'tta-operation',
    slugEn: 'tta-surgery',
    titleKey: 'article.tta.title',
    tagKey: 'articles.tag.orthopedics',
    category: 'surgery',
    date: '2026',
    publishDate: '2026-01-15',
    sections: ['intro', 'how.title', 'how.text', 'vs.title', 'vs.text', 'recovery.title', 'recovery.text', 'risks.title', 'risks.text', 'when.title', 'when.text'],
    prefix: 'article.tta'
  },
  {
    slug: 'video-otoskopia',
    slugSv: 'video-otoskopi',
    slugEn: 'video-otoscopy',
    titleKey: 'article.otoscopy.title',
    tagKey: 'articles.tag.endoscopy',
    category: 'endoscopy',
    date: '2026',
    publishDate: '2026-01-15',
    sections: ['intro', 'advantages.title', 'advantages.text', 'when.title', 'when.text', 'procedure.title', 'procedure.text', 'chronic.title', 'chronic.text', 'contact.title', 'contact.text'],
    prefix: 'article.otoscopy'
  },
  {
    slug: 'kipulääkeinfuusio',
    slugSv: 'smartlindringsinfusion',
    slugEn: 'pain-relief-infusion',
    titleKey: 'article.mlk.title',
    tagKey: 'articles.tag.anesthesia',
    category: 'surgery',
    date: '2026',
    publishDate: '2026-01-15',
    sections: ['intro', 'what.title', 'what.text', 'why.title', 'why.text', 'benefits.title', 'benefits.text', 'use.title', 'use.text', 'windup.title', 'windup.text'],
    prefix: 'article.mlk'
  },
  {
    slug: 'ripuli',
    slugSv: 'diarre',
    slugEn: 'diarrhoea',
    titleKey: 'article.diarrhea.title',
    tagKey: 'articles.filter.health',
    category: 'health',
    date: '2026',
    publishDate: '2026-01-20',
    sections: ['intro', 'causes.title', 'causes.text', 'homecare.title', 'homecare.text', 'warning.title', 'warning.text', 'prevention.title', 'prevention.text', 'contact.title', 'contact.text'],
    prefix: 'article.diarrhea'
  },
  {
    slug: 'avoin-valtimotiehyt-pda',
    slugSv: 'oppen-ductus-arteriosus-pda',
    slugEn: 'patent-ductus-arteriosus-pda',
    titleKey: 'article.pda.title',
    tagKey: 'articles.filter.cardiology',
    category: 'cardiology',
    date: '2026',
    publishDate: '2026-01-20',
    sections: ['intro', 'what.title', 'what.text', 'breeds.title', 'breeds.text', 'signs.title', 'signs.text', 'treatment.title', 'treatment.text', 'clinic.title', 'clinic.text', 'prognosis.title', 'prognosis.text', 'message.title', 'message.text'],
    prefix: 'article.pda'
  },
  {
    slug: 'hampaiden-harjaus',
    slugSv: 'tandborstning',
    slugEn: 'tooth-brushing',
    titleKey: 'article.brushing.title',
    tagKey: 'articles.filter.dental',
    category: 'dental',
    date: '2026',
    publishDate: '2026-01-25',
    sections: ['intro', 'why.title', 'why.text', 'how.title', 'how.text', 'start.title', 'start.text', 'signs.title', 'signs.text', 'professional.title', 'professional.text', 'challenge.title', 'challenge.text'],
    prefix: 'article.brushing'
  },
  {
    slug: 'viljaton-ruoka',
    slugSv: 'spannmalsfri-mat',
    slugEn: 'grain-free-food',
    titleKey: 'article.grainfree.title',
    tagKey: 'articles.filter.health',
    category: 'health',
    date: '2026',
    publishDate: '2026-01-25',
    sections: ['intro', 'fda.title', 'fda.text', 'myth.title', 'myth.text', 'cats.title', 'cats.text', 'advice.title', 'advice.text'],
    prefix: 'article.grainfree'
  },
  {
    slug: 'periovive',
    slugSv: 'periovive',
    slugEn: 'periovive',
    titleKey: 'article.periovive.title',
    tagKey: 'articles.filter.dental',
    category: 'dental',
    date: '2026',
    publishDate: '2026-01-30',
    sections: ['intro', 'what.title', 'what.text', 'how.title', 'how.text', 'evidence.title', 'evidence.text', 'when.title', 'when.text', 'clinic.title', 'clinic.text'],
    prefix: 'article.periovive'
  },
  {
    slug: 'yksityinen-klinikka',
    slugSv: 'privat-klinik',
    slugEn: 'independent-clinic',
    titleKey: 'article.independent.title',
    tagKey: 'article.independent.tag',
    category: 'clinic',
    date: '2026',
    publishDate: '2026-01-30',
    sections: ['intro', 'chains.title', 'chains.text', 'prices.title', 'prices.text', 'quality.title', 'quality.text', 'international.title', 'international.text', 'choice.title', 'choice.text'],
    prefix: 'article.independent'
  },
  {
    slug: 'ruoka-allergiat',
    slugSv: 'foderallergier',
    slugEn: 'food-allergies',
    titleKey: 'article.food.title',
    tagKey: 'article.food.tag',
    category: 'health',
    date: '2026',
    publishDate: '2026-02-01',
    sections: ['intro', 'symptoms.title', 'symptoms.text', 'allergens.title', 'allergens.text', 'trial.title', 'trial.text', 'strict.title', 'strict.text', 'challenge.title', 'challenge.text', 'clinic.title', 'clinic.text'],
    prefix: 'article.food'
  },
  {
    slug: 'kilpirauhasen-liikatoiminta',
    slugSv: 'hypertyreos-katt',
    slugEn: 'hyperthyroidism',
    titleKey: 'article.hyperthyroid.title',
    tagKey: 'article.hyperthyroid.tag',
    category: 'health',
    date: '2026',
    publishDate: '2026-02-01',
    sections: ['intro', 'symptoms.title', 'symptoms.text', 'diagnosis.title', 'diagnosis.text', 'complications.title', 'complications.text', 'treatment.title', 'treatment.text'],
    prefix: 'article.hyperthyroid'
  },
  {
    slug: 'munuaisten-vajaatoiminta',
    slugSv: 'njursvikt',
    slugEn: 'kidney-disease',
    titleKey: 'article.kidney.title',
    tagKey: 'article.kidney.tag',
    category: 'health',
    date: '2026',
    publishDate: '2026-02-05',
    sections: ['intro', 'stages.title', 'stages.text', 'symptoms.title', 'symptoms.text', 'treatment.title', 'treatment.text'],
    prefix: 'article.kidney'
  },
  {
    slug: 'kyynpurema',
    slugSv: 'huggormsbett',
    slugEn: 'snake-bite',
    titleKey: 'article.snake.title',
    tagKey: 'article.snake.tag',
    category: 'emergency',
    date: '2026',
    publishDate: '2026-02-05',
    sections: ['intro', 'symptoms.title', 'symptoms.text', 'firstaid.title', 'firstaid.text', 'treatment.title', 'treatment.text', 'prevention.title', 'prevention.text'],
    prefix: 'article.snake'
  },
  {
    slug: 'kohtutulehdus',
    slugSv: 'livmoderinflammation',
    slugEn: 'pyometra',
    titleKey: 'article.pyometra.title',
    tagKey: 'article.pyometra.tag',
    category: 'emergency',
    date: '2026',
    publishDate: '2026-02-10',
    sections: ['intro', 'symptoms.title', 'symptoms.text', 'danger.title', 'danger.text', 'treatment.title', 'treatment.text', 'prevention.title', 'prevention.text'],
    prefix: 'article.pyometra'
  },
  {
    slug: 'lateral-suture',
    slugSv: 'lateral-suture',
    slugEn: 'lateral-suture',
    titleKey: 'article.ccl.title',
    tagKey: 'articles.tag.orthopedics',
    category: 'surgery',
    date: '2026',
    publishDate: '2026-02-10',
    sections: ['intro', 'how.title', 'how.text', 'who.title', 'who.text', 'recovery.title', 'recovery.text', 'risks.title', 'risks.text', 'vs.title', 'vs.text', 'signs.title', 'signs.text', 'price.title', 'price.text'],
    prefix: 'article.ccl'
  },
  {
    slug: 'siili',
    slugSv: 'igelkott',
    slugEn: 'hedgehog',
    titleKey: 'article.hedgehog.title',
    tagKey: 'article.hedgehog.tag',
    category: 'wildlife',
    date: '2026',
    publishDate: '2026-02-15',
    sections: ['intro', 'decline.title', 'decline.text', 'finland.title', 'finland.text', 'threats.title', 'threats.text', 'robots.title', 'robots.text', 'help.title', 'help.text', 'nest.title', 'nest.text'],
    prefix: 'article.hedgehog',
    hasSpecialContent: true
  },
  {
    slug: 'kissaystävällinen-klinikka',
    slugSv: 'kattvanlig-klinik',
    slugEn: 'cat-friendly-clinic',
    titleKey: 'article.catstress.title',
    tagKey: 'article.catstress.tag',
    category: 'health',
    date: '2026',
    publishDate: '2026-02-20',
    sections: ['intro', 'signs.title', 'signs.text', 'feliway.title', 'feliway.text', 'clinic.title', 'clinic.text', 'tips.title', 'tips.text'],
    prefix: 'article.catstress'
  },
  {
    slug: 'puhkeamattomat-hampaat',
    slugSv: 'icke-framvaxta-tander',
    slugEn: 'unerupted-teeth',
    titleKey: 'article.unerupted.title',
    tagKey: 'article.unerupted.tag',
    category: 'dental',
    date: '2026',
    publishDate: '2026-02-20',
    sections: ['intro', 'cyst.title', 'cyst.text', 'symptoms.title', 'symptoms.text', 'breeds.title', 'breeds.text', 'diagnosis.title', 'diagnosis.text', 'treatment.title', 'treatment.text', 'prognosis.title', 'prognosis.text'],
    prefix: 'article.unerupted'
  },
  {
    slug: 'gastroskopia',
    slugSv: 'gastroskopi',
    slugEn: 'gastroscopy',
    titleKey: 'article.gastroscopy.title',
    tagKey: 'article.gastroscopy.tag',
    category: 'endoscopy',
    date: '2026',
    publishDate: '2026-02-25',
    sections: ['intro', 'foreign.title', 'foreign.text', 'diagnosis.title', 'diagnosis.text', 'procedure.title', 'procedure.text', 'advantages.title', 'advantages.text', 'contact.title', 'contact.text'],
    prefix: 'article.gastroscopy'
  },
  {
    slug: 'hammasresorptio',
    slugSv: 'tandresorption',
    slugEn: 'tooth-resorption',
    titleKey: 'article.resorption.title',
    tagKey: 'article.resorption.tag',
    category: 'dental',
    date: '2026',
    publishDate: '2026-02-25',
    sections: ['intro', 'types.title', 'types.text', 'symptoms.title', 'symptoms.text', 'diagnosis.title', 'diagnosis.text', 'treatment.title', 'treatment.text', 'after.title', 'after.text'],
    prefix: 'article.resorption'
  },
  {
    slug: 'rokotukset',
    slugSv: 'vaccinationsguide',
    slugEn: 'vaccinations-guide',
    titleKey: 'article.vaccination.title',
    tagKey: 'article.vaccination.tag',
    category: 'health',
    date: '2026',
    publishDate: '2026-03-01',
    sections: ['intro', 'dogs.title', 'dogs.text', 'cats.title', 'cats.text', 'schedule.title', 'schedule.text', 'rabies.title', 'rabies.text', 'travel.title', 'travel.text'],
    prefix: 'article.vaccination',
    htmlSections: ['dogs.text', 'cats.text', 'schedule.text', 'travel.text']
  },
  {
    slug: 'ibd-lymfooma',
    slugSv: 'ibd-lymfom',
    slugEn: 'ibd-lymphoma',
    titleKey: 'article.ibdlymphoma.title',
    tagKey: 'article.ibdlymphoma.tag',
    category: 'health',
    date: '2026',
    publishDate: '2026-03-01',
    sections: ['intro', 'challenge.title', 'challenge.text', 'diagnosis.title', 'diagnosis.text', 'treatment.title', 'treatment.text', 'why.title', 'why.text'],
    prefix: 'article.ibdlymphoma',
    htmlSections: ['diagnosis.text', 'treatment.text']
  },
  {
    slug: 'hypotermia',
    slugSv: 'hypotermi',
    slugEn: 'hypothermia',
    titleKey: 'article.hypothermia.title',
    tagKey: 'article.hypothermia.tag',
    category: 'surgery',
    date: '2026',
    publishDate: '2026-03-05',
    sections: ['intro', 'risks.title', 'risks.text', 'warming.title', 'warming.text', 'recovery.title', 'recovery.text', 'safety.title', 'safety.text'],
    prefix: 'article.hypothermia'
  },
  {
    slug: 'anestesiaturvallisuus',
    slugSv: 'anestesisakerhet',
    slugEn: 'anaesthesia-safety',
    titleKey: 'article.anesthesia.title',
    tagKey: 'article.anesthesia.tag',
    category: 'surgery',
    date: '2026',
    publishDate: '2026-03-05',
    sections: ['intro', 'risk.title', 'risk.text', 'monitoring.title', 'monitoring.text', 'balanced.title', 'balanced.text', 'vatinoxan.title', 'vatinoxan.text', 'preop.title', 'preop.text'],
    prefix: 'article.anesthesia',
    htmlSections: ['risk.text']
  },
  {
    slug: 'klinikkaeläinhoitaja',
    slugSv: 'klinikdjurskotare',
    slugEn: 'veterinary-nurse',
    titleKey: 'article.vetnurse.title',
    tagKey: 'articles.filter.clinic',
    category: 'clinic',
    date: '2026',
    publishDate: '2026-03-10',
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
// 2b. Related articles map (manual cross-links for SEO)
// ──────────────────────────────────────────────
const relatedArticles = {
  'tta-leikkaus': ['lateral-suture', 'anestesiaturvallisuus', 'kipulääkeinfuusio'],
  'lateral-suture': ['tta-leikkaus', 'anestesiaturvallisuus', 'kipulääkeinfuusio'],
  'video-otoskopia': ['gastroskopia', 'ruoka-allergiat', 'anestesiaturvallisuus'],
  'kipulääkeinfuusio': ['anestesiaturvallisuus', 'hypotermia', 'tta-leikkaus'],
  'ripuli': ['ruoka-allergiat', 'viljaton-ruoka', 'gastroskopia'],
  'avoin-valtimotiehyt-pda': ['anestesiaturvallisuus', 'kipulääkeinfuusio', 'hypotermia'],
  'hampaiden-harjaus': ['hammasresorptio', 'puhkeamattomat-hampaat', 'periovive'],
  'viljaton-ruoka': ['ruoka-allergiat', 'ripuli', 'ibd-lymfooma'],
  'periovive': ['hampaiden-harjaus', 'hammasresorptio', 'puhkeamattomat-hampaat'],
  'yksityinen-klinikka': ['kissaystävällinen-klinikka', 'anestesiaturvallisuus', 'rokotukset'],
  'ruoka-allergiat': ['viljaton-ruoka', 'ripuli', 'ibd-lymfooma'],
  'kilpirauhasen-liikatoiminta': ['munuaisten-vajaatoiminta', 'rokotukset', 'anestesiaturvallisuus'],
  'munuaisten-vajaatoiminta': ['kilpirauhasen-liikatoiminta', 'rokotukset', 'ruoka-allergiat'],
  'kyynpurema': ['kohtutulehdus', 'anestesiaturvallisuus', 'ripuli'],
  'kohtutulehdus': ['kyynpurema', 'anestesiaturvallisuus', 'rokotukset'],
  'siili': ['kissaystävällinen-klinikka', 'yksityinen-klinikka'],
  'kissaystävällinen-klinikka': ['hammasresorptio', 'kilpirauhasen-liikatoiminta', 'rokotukset'],
  'puhkeamattomat-hampaat': ['hammasresorptio', 'hampaiden-harjaus', 'periovive'],
  'gastroskopia': ['video-otoskopia', 'ripuli', 'ibd-lymfooma'],
  'hammasresorptio': ['puhkeamattomat-hampaat', 'hampaiden-harjaus', 'periovive'],
  'rokotukset': ['kissaystävällinen-klinikka', 'kyynpurema', 'yksityinen-klinikka'],
  'ibd-lymfooma': ['gastroskopia', 'ruoka-allergiat', 'anestesiaturvallisuus'],
  'hypotermia': ['anestesiaturvallisuus', 'kipulääkeinfuusio', 'avoin-valtimotiehyt-pda'],
  'anestesiaturvallisuus': ['kipulääkeinfuusio', 'hypotermia', 'klinikkaeläinhoitaja'],
  'klinikkaeläinhoitaja': ['anestesiaturvallisuus', 'kissaystävällinen-klinikka', 'yksityinen-klinikka'],
};

function generateRelatedArticlesHtml(currentSlug, translations, lang) {
  lang = lang || 'fi';
  const related = relatedArticles[currentSlug];
  if (!related || related.length === 0) return '';

  const t = (key) => translations[key]?.[lang] || translations[key]?.fi || '';
  const readAlso = { fi: 'Lue myös', sv: 'Läs också', en: 'Read also' };

  let cards = '';
  for (const slug of related) {
    const article = articles.find(a => a.slug === slug);
    if (!article) continue;
    const title = t(article.titleKey);
    const tag = t(article.tagKey);
    const intro = t(`${article.prefix}.intro`);
    const shortIntro = intro.length > 120 ? intro.substring(0, 117) + '...' : intro;
    const href = `${articleSlug(article, lang)}.html`;
    cards += `
        <a href="${href}" class="related-article-card">
          <span class="article-tag">${escapeHtml(tag)}</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(shortIntro)}</p>
        </a>`;
  }

  return `
      <div class="related-articles">
        <h2>${readAlso[lang]}</h2>
        <div class="related-articles-grid">${cards}
        </div>
      </div>`;
}

// ──────────────────────────────────────────────
// 2c. FAQ schema generator — extracts Q&A pairs from article sections
// ──────────────────────────────────────────────
function generateFaqSchema(article, translations, lang) {
  lang = lang || 'fi';
  const t = (key) => translations[key]?.[lang] || translations[key]?.fi || '';
  const faqPairs = [];

  for (let i = 0; i < article.sections.length; i++) {
    const suffix = article.sections[i];
    if (suffix.endsWith('.title') && i + 1 < article.sections.length) {
      const nextSuffix = article.sections[i + 1];
      if (nextSuffix.endsWith('.text')) {
        const question = t(`${article.prefix}.${suffix}`);
        const answer = t(`${article.prefix}.${nextSuffix}`);
        if (question && answer) {
          // Use full answer text — Google allows long FAQ answers (up to ~10k chars)
          // and truncation creates invalid structured data + hurts AI Overview citation.
          faqPairs.push({ question, answer });
        }
      }
    }
  }

  if (faqPairs.length < 2) return ''; // Need at least 2 Q&A pairs

  const items = faqPairs.map(pair => `    {
      "@type": "Question",
      "name": ${JSON.stringify(pair.question)},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ${JSON.stringify(pair.answer)}
      }
    }`).join(',\n');

  return `,
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${items}
    ]
  }`;
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
  const injuredTitleMatch = indexHtml.match(/<h2 data-i18n="article\.hedgehog\.injured\.title">[\s\S]*?<\/h2>/);
  const injuredTextMatch = indexHtml.match(/<p data-i18n="article\.hedgehog\.injured\.text">[\s\S]*?<\/p>/);

  // Hedgehog size comparison image
  const hedgehogSizeImg = indexHtml.match(/<div style="margin: var\(--spacing-lg\) 0;">\s*<img src="images\/wildlife-hedgehog-size\.jpg"[\s\S]*?<\/div>/);

  // Hedgehog ecology section
  const ecologyTitleMatch = indexHtml.match(/<h2 data-i18n="article\.hedgehog\.ecology\.title">[\s\S]*?<\/h2>/);
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
function generateArticleBody(article, translations, specialContent, lang) {
  lang = lang || 'fi';
  const t = (key) => {
    if (translations[key] && (translations[key][lang] || translations[key].fi)) return translations[key][lang] || translations[key].fi;
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
      html += `\n          <h2 data-i18n="${key}">${content}</h2>\n`;
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
function generateArticlePage(article, translations, specialContent, lang) {
  lang = lang || 'fi';
  const t = (key) => {
    if (translations[key] && (translations[key][lang] || translations[key].fi)) return translations[key][lang] || translations[key].fi;
    return '';
  };

  const title = t(article.titleKey);
  const tag = t(article.tagKey);
  const suffix = ' | Eläinklinikka Saari';
  let pageTitle;
  if ((title + suffix).length <= 60) {
    pageTitle = title + suffix;
  } else {
    const dashMatch = title.match(/^(.+?)\s*[—–]\s*/);
    if (dashMatch && (dashMatch[1] + suffix).length <= 60) {
      pageTitle = dashMatch[1] + suffix;
    } else {
      pageTitle = title.length <= 60 ? title : title.substring(0, 57) + '...';
    }
  }
  const introKey = `${article.prefix}.intro`;
  let description = t(introKey);
  // If intro is too short, append first section text
  if (description.length < 120) {
    for (const suffix of article.sections) {
      if (suffix !== 'intro' && suffix.endsWith('.text')) {
        const extra = t(`${article.prefix}.${suffix}`);
        if (extra) {
          description = description.replace(/\s*$/, ' ') + extra;
          break;
        }
      }
    }
  }
  description = description.replace(/[,;:\s]+$/, '').replace(/\.{2,}$/, '.');
  // Target ~155 chars but allow up to 170 to end on a complete sentence.
  // Never emit a literal "..." — it looks broken in SERPs.
  if (description.length > 170) {
    const window = description.substring(0, 170);
    const lastPeriod = window.lastIndexOf('. ');
    const lastExcl = window.lastIndexOf('! ');
    const lastQuest = window.lastIndexOf('? ');
    const sentenceCut = Math.max(lastPeriod, lastExcl, lastQuest);
    if (sentenceCut >= 80) {
      // Cut at a sentence boundary (keep the terminator)
      description = description.substring(0, sentenceCut + 1);
    } else {
      // No good sentence boundary — fall back to word boundary within 155 chars, no ellipsis
      const wordWindow = description.substring(0, 155);
      const lastSpace = wordWindow.lastIndexOf(' ');
      description = (lastSpace > 0 ? wordWindow.substring(0, lastSpace) : wordWindow).replace(/[,;:\s]+$/, '');
    }
  }

  // URLs for all language versions
  const fiUrl = `${BASE_URL}/articles/${articleSlug(article, 'fi')}.html`;
  const svUrl = `${BASE_URL}/sv/artiklar/${articleSlug(article, 'sv')}.html`;
  const enUrl = `${BASE_URL}/en/articles/${articleSlug(article, 'en')}.html`;
  const canonicalUrl = lang === 'fi' ? fiUrl : (lang === 'sv' ? svUrl : enUrl);
  const assetPrefix = lang === 'fi' ? '../' : '../../../';
  const homeUrl = lang === 'fi' ? assetPrefix : assetPrefix + '?lang=' + lang;

  const articleBody = generateArticleBody(article, translations, specialContent, lang);
  const relatedHtml = generateRelatedArticlesHtml(article.slug, translations, lang);
  const faqSchema = generateFaqSchema(article, translations, lang);
  const dateStr = article.date || '2026';
  const today = new Date().toISOString().split('T')[0];
  const isoDatePublished = article.publishDate || '2026-01-01';
  const isoDateModified = today;

  const ogLocales = { fi: 'fi_FI', sv: 'sv_SE', en: 'en_US' };
  const ogLocale = ogLocales[lang] || 'fi_FI';
  const skipTexts = { fi: 'Siirry sisältöön', sv: 'Hoppa till innehållet', en: 'Skip to content' };
  const backTexts = { fi: '← Takaisin etusivulle', sv: '← Tillbaka till startsidan', en: '← Back to homepage' };
  const readAlsoTexts = { fi: 'Lue myös', sv: 'Läs också', en: 'Read also' };
  const breadcrumbHome = { fi: 'Etusivu', sv: 'Startsidan', en: 'Home' };
  const breadcrumbArticles = { fi: 'Artikkelit', sv: 'Artiklar', en: 'Articles' };

  // Footer text (localized per language so Google doesn't collapse EN/SV pages
  // as duplicates of the FI version — JS-based i18n runs too late for that check).
  const footerDesc = {
    fi: 'Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.',
    sv: 'Finsk privatägd smådjursklinik i Dragsnäsbäck, Vasa, vid Bockis-kurvan.',
    en: 'Finnish privately owned small animal clinic in Dragsnäsbäck, Vaasa.'
  };
  const footerQuicklinks = { fi: 'Pikalinkit', sv: 'Snabblänkar', en: 'Quick links' };
  const footerContact = { fi: 'Yhteystiedot', sv: 'Kontaktuppgifter', en: 'Contact' };
  const footerFollow = { fi: 'Seuraa meitä', sv: 'Följ oss', en: 'Follow us' };
  const footerRights = { fi: 'Kaikki oikeudet pidätetään.', sv: 'Alla rättigheter förbehållna.', en: 'All rights reserved.' };
  const footerAbout = { fi: 'Meistä', sv: 'Om oss', en: 'About us' };
  const footerContactPage = { fi: 'Yhteystiedot', sv: 'Kontakt', en: 'Contact' };
  const footerArticles = { fi: 'Artikkelit', sv: 'Artiklar', en: 'Articles' };
  const footerPrivacy = { fi: 'Tietosuoja', sv: 'Integritetspolicy', en: 'Privacy policy' };
  const footerNavLabels = {
    fi: { about: 'Klinikka', services: 'Palvelut', team: 'Henkilökunta', catfriendly: 'Cat Friendly', prices: 'Hinnasto', wildlife: 'Wildlife' },
    sv: { about: 'Kliniken', services: 'Tjänster', team: 'Personal', catfriendly: 'Cat Friendly', prices: 'Prislista', wildlife: 'Wildlife' },
    en: { about: 'Clinic', services: 'Services', team: 'Staff', catfriendly: 'Cat Friendly', prices: 'Prices', wildlife: 'Wildlife' }
  };
  const fnav = footerNavLabels[lang] || footerNavLabels.fi;

  // Cookie consent banner (localized at build time for the page's language).
  const cookieBanner = {
    fi: { text: 'Käytämme evästeitä sivuston kävijäliikenteen analysointiin Google Analyticsin avulla. Evästeitä käytetään vain, jos hyväksyt ne.', accept: 'Hyväksy', decline: 'Hylkää' },
    sv: { text: 'Vi använder cookies för att analysera webbplatstrafiken med Google Analytics. Cookies används bara om du godkänner dem.', accept: 'Godkänn', decline: 'Avvisa' },
    en: { text: 'We use cookies to analyze site traffic with Google Analytics. Cookies are only used if you accept them.', accept: 'Accept', decline: 'Decline' }
  };
  const cb = cookieBanner[lang] || cookieBanner.fi;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google.com https://www.google.fi https://googleads.g.doubleclick.net https://www.facebook.com https://*.facebook.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net; frame-src https://www.google.com; frame-ancestors 'none'">
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
    gtag('config', 'AW-816483191');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-92LHP2TK6N"></script>
  <!-- Google Ads: Click to call conversion -->
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
      'event_callback': callback
    });
    return false;
  }
  </script>
  <!-- Meta Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '2008398676469644');
  fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=2008398676469644&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->

  <meta name="description" content="${escapeAttr(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="fi" href="${fiUrl}">
  <link rel="alternate" hreflang="sv" href="${svUrl}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="x-default" href="${fiUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:image" content="${BASE_URL}/images/clinic-about.jpg">
  <meta property="og:locale" content="${ogLocale}">
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
      "@type": "Person",
      "name": "${['articles.tag.orthopedics', 'articles.tag.anesthesia', 'article.anesthesia.tag', 'article.hypothermia.tag'].includes(article.tagKey) ? 'Pamela Kvarngård' : 'Assaf Wydra'}",
      "jobTitle": "${['articles.tag.orthopedics', 'articles.tag.anesthesia', 'article.anesthesia.tag', 'article.hypothermia.tag'].includes(article.tagKey) ? 'Eläinlääkäri' : 'Eläinlääkäri, toimitusjohtaja'}",
      "worksFor": {
        "@type": "VeterinaryCare",
        "name": "Eläinklinikka Saari",
        "url": "${BASE_URL}"
      }
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
        "name": "${breadcrumbHome[lang]}",
        "item": "${BASE_URL}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "${breadcrumbArticles[lang]}",
        "item": "${BASE_URL}/artikkelit/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": ${JSON.stringify(title)},
        "item": "${canonicalUrl}"
      }
    ]
  }${faqSchema}]
  </script>

  <link rel="preload" as="image" href="${assetPrefix}images/logo.png">
  <link rel="stylesheet" href="${assetPrefix}css/style.css">
  <link rel="icon" type="image/png" href="${assetPrefix}images/logo.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">${skipTexts[lang]}</a>

  <!-- ===== Header ===== -->
  <header class="header">
    <div class="container">
      <a href="${homeUrl}" class="logo">
        <div class="logo-icon"><img src="${assetPrefix}images/logo.png" alt="Eläinklinikka Saari" width="240" height="240"></div>
      </a>
      <a href="${homeUrl}#cat-friendly" class="cfc-header-logo" aria-label="Silver accredited Cat Friendly Clinic 2026">
        <img src="${assetPrefix}images/cat-friendly-clinic-silver-2026.png" alt="Silver accredited Cat Friendly Clinic 2026" width="1284" height="686">
      </a>

${renderHeaderNav({ lang, homeUrl, articlesUrl: getArticlesUrl(lang), fiUrl, svUrl, enUrl })}
    </div>
  </header>

  <!-- ===== Article ===== -->
  <main id="main-content">
  <section class="section articles-section">
    <div class="container">
      <article class="article-card" data-category="${article.category}">
        <div class="article-header">
          <span class="article-tag">${tag}</span>
${article.date ? `          <time>${article.date}</time>\n` : ''}        </div>
        <h1>${title}</h1>
        <div class="article-byline">${lang === 'en' ? 'Veterinarian' : lang === 'sv' ? 'Veterinär' : 'Eläinlääkäri'} ${['articles.tag.orthopedics', 'articles.tag.anesthesia', 'article.anesthesia.tag', 'article.hypothermia.tag'].includes(article.tagKey) ? 'Pamela Kvarngård' : 'Assaf Wydra'}, Eläinklinikka Saari</div>
        <div class="article-content">
${articleBody}        </div>
      </article>
${relatedHtml}
      <a href="${homeUrl}" class="btn btn-secondary articles-back">${backTexts[lang]}</a>
    </div>
  </section>
  </main>

  <!-- ===== Footer ===== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <p data-i18n="footer.description">${escapeHtml(footerDesc[lang] || footerDesc.fi)}</p>
        </div>
        <div class="footer-col">
          <strong class="footer-heading" data-i18n="footer.quicklinks">${escapeHtml(footerQuicklinks[lang] || footerQuicklinks.fi)}</strong>
          <a href="${homeUrl}#about" data-i18n="nav.about">${escapeHtml(fnav.about)}</a>
          <a href="${homeUrl}#services" data-i18n="nav.services">${escapeHtml(fnav.services)}</a>
          <a href="${homeUrl}#team" data-i18n="nav.team">${escapeHtml(fnav.team)}</a>
          <a href="${homeUrl}#cat-friendly" data-i18n="nav.catfriendly">${escapeHtml(fnav.catfriendly)}</a>
          <a href="${homeUrl}#prices" data-i18n="nav.prices">${escapeHtml(fnav.prices)}</a>
          <a href="${homeUrl}#wildlife" data-i18n="nav.wildlife">${escapeHtml(fnav.wildlife)}</a>
          <a href="/meista/">${escapeHtml(footerAbout[lang] || footerAbout.fi)}</a>
          <a href="/yhteystiedot/">${escapeHtml(footerContactPage[lang] || footerContactPage.fi)}</a>
          <a href="/artikkelit/">${escapeHtml(footerArticles[lang] || footerArticles.fi)}</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading" data-i18n="footer.contact">${escapeHtml(footerContact[lang] || footerContact.fi)}</strong>
          <a href="tel:+35863217300" onclick="gtag_report_conversion();">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading" data-i18n="footer.follow">${escapeHtml(footerFollow[lang] || footerFollow.fi)}</strong>
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
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; Y-tunnus: 0708667-9 &middot; <span data-i18n="footer.rights">${escapeHtml(footerRights[lang] || footerRights.fi)}</span></span>
        <a href="/tietosuoja/" data-i18n="footer.privacy">${escapeHtml(footerPrivacy[lang] || footerPrivacy.fi)}</a>
      </div>
    </div>
  </footer>

  <script src="${assetPrefix}js/main.js"></script>
  ${lang !== 'fi' ? `<script>if(typeof setLanguage==='function')setLanguage('${lang}');</script>` : ''}

  <!-- Cookie Consent Banner -->
  <div id="cookie-consent" style="display:none;">
    <div class="cookie-consent-inner">
      <p id="cookie-consent-text">${escapeHtml(cb.text)}</p>
      <div class="cookie-consent-buttons">
        <button id="cookie-accept" onclick="acceptCookies()">${escapeHtml(cb.accept)}</button>
        <button id="cookie-decline" onclick="declineCookies()">${escapeHtml(cb.decline)}</button>
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
// 6. Generate article index page (artikkelit/index.html)
// ──────────────────────────────────────────────
function generateArticleIndex(translations) {
  const t = (key) => translations[key]?.fi || '';
  const today = new Date().toISOString().split('T')[0];

  // Group articles by category
  const categoryLabels = {
    dental: 'Hammashoito',
    surgery: 'Kirurgia ja anestesia',
    cardiology: 'Kardiologia',
    endoscopy: 'Tähystykset',
    health: 'Terveys ja sairaudet',
    emergency: 'Päivystys',
    wildlife: 'Wildlife',
    clinic: 'Klinikka'
  };

  const categoryOrder = ['dental', 'surgery', 'cardiology', 'endoscopy', 'health', 'emergency', 'wildlife', 'clinic'];
  const grouped = {};
  for (const article of articles) {
    const cat = article.category || 'health';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(article);
  }

  let cardsHtml = '';
  for (const cat of categoryOrder) {
    if (!grouped[cat]) continue;
    cardsHtml += `\n        <h2>${categoryLabels[cat] || cat}</h2>\n        <div class="article-index-grid">\n`;
    for (const article of grouped[cat]) {
      const title = t(article.titleKey);
      const intro = t(`${article.prefix}.intro`);
      const shortIntro = intro.length > 150 ? intro.substring(0, 147) + '...' : intro;
      cardsHtml += `          <a href="../articles/${article.slug}.html" class="article-index-card">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(shortIntro)}</p>
          </a>\n`;
    }
    cardsHtml += `        </div>\n`;
  }

  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google.com https://www.google.fi https://googleads.g.doubleclick.net https://www.facebook.com https://*.facebook.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net; frame-src https://www.google.com; frame-ancestors 'none'">
  <title>Artikkelit — Eläinklinikka Saari</title>

  <!-- Google Analytics: Consent Mode v2 -->
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
    gtag('config', 'AW-816483191');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-92LHP2TK6N"></script>
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
      'event_callback': callback
    });
    return false;
  }
  </script>

  <meta name="description" content="Eläinlääketieteelliset artikkelit: hammashoito, kirurgia, sydänsairaudet, tähystykset, rokotukset ja paljon muuta. Eläinklinikka Saari, Vaasa.">
  <link rel="canonical" href="${BASE_URL}/artikkelit/">
  <link rel="alternate" hreflang="fi" href="${BASE_URL}/artikkelit/">
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/artikkelit/">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/artikkelit/">
  <meta property="og:title" content="Artikkelit — Eläinklinikka Saari">
  <meta property="og:description" content="Eläinlääketieteelliset artikkelit: hammashoito, kirurgia, sydänsairaudet, tähystykset, rokotukset ja paljon muuta.">
  <meta property="og:image" content="${BASE_URL}/images/clinic-about.jpg">
  <meta property="og:locale" content="fi_FI">
  <meta property="og:site_name" content="Eläinklinikka Saari">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Artikkelit — Eläinklinikka Saari">
  <meta name="twitter:description" content="Eläinlääketieteelliset artikkelit: hammashoito, kirurgia, sydänsairaudet, tähystykset ja paljon muuta.">
  <meta name="twitter:image" content="${BASE_URL}/images/clinic-about.jpg">

  <script type="application/ld+json">
  [{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Artikkelit",
    "description": "Eläinlääketieteelliset artikkelit Eläinklinikka Saarelta",
    "url": "${BASE_URL}/artikkelit/",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Eläinklinikka Saari",
      "url": "${BASE_URL}"
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
        "item": "${BASE_URL}/artikkelit/"
      }
    ]
  }]
  </script>

  <link rel="preload" as="image" href="../images/logo.png">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/png" href="../images/logo.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">Siirry sisältöön</a>

  <header class="header">
    <div class="container">
      <a href="../" class="logo">
        <div class="logo-icon"><img src="../images/logo.png" alt="Eläinklinikka Saari" width="240" height="240"></div>
      </a>
      <a href="../#cat-friendly" class="cfc-header-logo" aria-label="Silver accredited Cat Friendly Clinic 2026">
        <img src="../images/cat-friendly-clinic-silver-2026.png" alt="Silver accredited Cat Friendly Clinic 2026" width="1284" height="686">
      </a>
${renderHeaderNav({ lang: 'fi', homeUrl: '../', articlesUrl: getArticlesUrl('fi'), fiUrl: getArticlesUrl('fi'), svUrl: getArticlesUrl('sv'), enUrl: getArticlesUrl('en') })}
    </div>
  </header>

  <main id="main-content">
  <section class="section articles-section">
    <div class="container">
      <div class="section-header">
        <h1>Artikkelit</h1>
        <p>Eläinlääketieteelliset artikkelit ammattilaisilta</p>
      </div>
${cardsHtml}
      <a href="../" class="btn btn-secondary articles-back">\u2190 Takaisin etusivulle</a>
    </div>
  </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <p>Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.</p>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Pikalinkit</strong>
          <a href="../#about">Klinikka</a>
          <a href="../#services">Palvelut</a>
          <a href="../#team">Henkilökunta</a>
          <a href="../#cat-friendly">Cat Friendly</a>
          <a href="../#prices">Hinnasto</a>
          <a href="../#wildlife">Wildlife</a>
          <a href="/meista/">Meistä</a>
          <a href="/yhteystiedot/">Yhteystiedot</a>
          <a href="/artikkelit/">Artikkelit</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Yhteystiedot</strong>
          <a href="tel:+35863217300" onclick="gtag_report_conversion();">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Seuraa meitä</strong>
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
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; Y-tunnus: 0708667-9 &middot; Kaikki oikeudet pidätetään.</span>
        <a href="/tietosuoja/">Tietosuoja</a>
      </div>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// 7. Service landing pages
// ──────────────────────────────────────────────
const servicePages = [
  {
    slug: 'hammashoito',
    slugSv: 'tandvard',
    slugEn: 'dental-care',
    title: 'Hammashoito — Eläinklinikka Saari, Vaasa',
    h1: 'Hammashoito',
    metaDesc: 'Koiran ja kissan hammashoito Vaasassa. Hammaskiven poisto, hammasröntgen, hampaiden poistot. Kaikki toimenpiteet yleisanestesiassa. Eläinklinikka Saari.',
    icon: '🦷',
    sections: [
      { heading: 'Miksi hammashoito on tärkeää?', text: 'Hammassairaudet ovat eläinten yleisimpiä terveysongelmia. Jo kolmen vuoden iässä valtaosalla koirista ja kissoista on hammaskiveä ja ientulehdusta. Hoitamattomana hammasvauriot etenevät äänettömästi — eläimet peittävät kipua instinktiivisesti, joten omistaja huomaa ongelman usein vasta kun se on edennyt pitkälle. Säännöllinen ammattimainen hammashoito pidentää lemmikin elinikää ja parantaa elämänlaatua merkittävästi.' },
      { heading: 'Palvelumme', text: 'Klinikallamme tehdään kattavat hammashoidot yleisanestesiassa: hammaskiven poisto ultraäänilaitteella, hammasröntgentutkimukset (kaikki hampaat kuvataan digitaaliröntgenillä), hampaiden poistot, maitohampaiden poistot, parodontiitin hoito ja PerioVive-hyaluronihappogeelihoito. Jokainen hammastoimenpide sisältää täydellisen suun tutkimuksen ja hammaskartan.' },
      { heading: 'Hammasröntgen — piilossa olevan näkeminen', text: 'Hammasröntgen on hammashoidon tärkein diagnostinen työkalu. Yli puolet hammassairauksista on näkymättömiä silmämääräisessä tutkimuksessa — juuritulehdukset, hammasresorptio, kystat ja luukato paljastuvat vasta röntgenkuvissa. Klinikallamme kuvataan kaikki hampaat osana jokaista hammastoimenpidettä.' },
      { heading: 'Miten toimenpide etenee?', text: 'Ennen toimenpidettä potilaalle tehdään terveystarkastus ja tarvittaessa verikokeet. Toimenpide tehdään inhalaatioanestesiassa kattavalla kivunlievityksellä. Anestesian aikana valvomme jatkuvasti sydämen sykettä, happisaturaatiota, verenpainetta ja lämpötilaa. Toimenpiteessä poistetaan hammaskivi, kuvataan hammasröntgenkuvat, hoidetaan sairaat hampaat ja tarvittaessa poistetaan vaurioituneet hampaat. Kotiutus tapahtuu yleensä samana päivänä.' },
      { heading: 'Yleisimmät hammassairaudet koirilla ja kissoilla', text: 'Parodontiitti eli hampaan tukikudosten tulehdus on yleisin hammassairaus ja aiheuttaa pitkälle edettyessään hampaiden irtoamista ja kroonista kipua. Hammasresorptio on kissoilla erityisen yleinen vaurio, jossa hampaan rakenne hajoaa sisältäpäin — usein näkymätön silmämääräisesti ja huomattavasti kipua aiheuttava. Katkenneet hampaat (erityisesti kulmahampaat) altistavat juuritulehduksille. Maitohampaiden jääminen paikalleen pysyvien hampaiden puhjetessa aiheuttaa hammasvirheitä etenkin pienikokoisissa koiraroduissa. Jokainen näistä ongelmista voidaan diagnosoida ja hoitaa klinikallamme.' },
      { heading: 'Hampaiden kotihoito — ennaltaehkäisy alkaa kotoa', text: 'Säännöllinen hampaiden harjaus on tehokkain tapa ehkäistä hammaskiven kertymistä ja ientulehdusta. Aloita totuttelemalla lemmikki rauhassa sormiin ja erityisesti lemmikeille tarkoitettuun hammastahnaan — ihmisten hammastahna ei sovi eläimille fluoridin ja ksylitolin vuoksi. Päivittäinen harjaus on tavoite, mutta 2–3 kertaa viikossa tuottaa jo merkittäviä tuloksia. Lisäksi VOHC-sertifioidut purutuotteet ja hampaita suojaavat erityisruoat täydentävät kotihoitoa. Kotihoito ei kuitenkaan korvaa ammattimaista hammaskiven poistoa, joka on tehtävissä vain anestesiassa.' },
      { heading: 'Toipuminen hammashoidosta', text: 'Kotiutus tapahtuu yleensä saman päivän aikana ja lemmikki voidaan noutaa iltapäivällä. Suosittelemme pehmeää ruokaa 1–3 vuorokauden ajan, erityisesti jos hampaita on poistettu. Kivunlievitykseen annetaan kotiin tarvittaessa tulehduskipulääkitystä ja käyttöohjeet. Useimmat lemmikit palaavat normaaliin ruokailuun ja leikkimieleen 24–48 tunnin kuluessa. Jos toimenpiteen aikana on poistettu hampaita tai tehty ientoimenpiteitä, kontrollikäynti varataan 5 päivän päähän suun paranemisen varmistamiseksi.' },
    ],
    sv: {
      title: 'Tandvård — Djurklinik Saari, Vasa',
      h1: 'Tandvård',
      metaDesc: 'Tandvård för hund och katt i Vasa. Tandstensborttagning, dentalröntgen, tandextraktioner. Alla ingrepp under generell anestesi. Eläinklinikka Saari.',
      sections: [
        { heading: 'Varför är tandvård viktigt?', text: 'Tandsjukdomar är bland de vanligaste hälsoproblemen hos djur. Redan vid tre års ålder har majoriteten av hundar och katter tandsten och tandköttsinflammation. Obehandlade tandskador fortskrider tyst — djur döljer smärta instinktivt, så ägaren märker ofta problemet först när det har gått långt. Regelbunden professionell tandvård förlänger husdjurets livslängd och förbättrar livskvaliteten avsevärt.' },
        { heading: 'Våra tjänster', text: 'På vår klinik utförs omfattande tandvård under generell anestesi: tandstensborttagning med ultraljudsapparat, dentalröntgenundersökningar (alla tänder röntgas digitalt), tandextraktioner, borttagning av mjölktänder, parodontitbehandling och PerioVive-hyaluronsyrageelbehandling. Varje tandingrepp inkluderar en fullständig munundersökning och tandkarta.' },
        { heading: 'Dentalröntgen — att se det dolda', text: 'Dentalröntgen är tandvårdens viktigaste diagnostiska verktyg. Över hälften av tandsjukdomarna är osynliga vid visuell undersökning — rotinfektioner, tandresorption, cystor och benförlust avslöjas först på röntgenbilder. På vår klinik röntgas alla tänder som en del av varje tandingrepp.' },
        { heading: 'Hur går ingreppet till?', text: 'Före ingreppet görs en hälsokontroll och vid behov blodprov. Ingreppet utförs under inhalationsanestesi med omfattande smärtlindring. Under anestesin övervakar vi kontinuerligt hjärtfrekvens, syremättnad, blodtryck och temperatur. Under ingreppet avlägsnas tandsten, dentalröntgenbilder tas, sjuka tänder behandlas och vid behov extraheras skadade tänder. Hemgång sker vanligen samma dag.' },
        { heading: 'Vanliga tandsjukdomar hos hundar och katter', text: 'Parodontit, det vill säga inflammation i tandens stödjevävnader, är den vanligaste tandsjukdomen och leder i framskridna fall till tandlossning och kronisk smärta. Tandresorption är särskilt vanlig hos katter, där tandens struktur bryts ned inifrån — ofta osynlig vid visuell undersökning och mycket smärtsam. Frakturerade tänder (särskilt hörntänder) ger upphov till rotinfektioner. Kvarsittande mjölktänder vid genombrott av permanenta tänder orsakar bettproblem, särskilt hos små hundraser. Var och en av dessa kan diagnostiseras och behandlas på vår klinik.' },
        { heading: 'Tandvård i hemmet — förebyggande börjar hemma', text: 'Regelbunden tandborstning är det effektivaste sättet att förebygga tandstens- och tandköttsinflammation. Börja med att försiktigt vänja husdjuret vid fingrarna och en speciell tandkräm för djur — människors tandkräm passar inte djur på grund av fluor- och xylitolinnehållet. Daglig borstning är målet, men 2–3 gånger i veckan ger redan märkbara resultat. Dessutom kompletterar VOHC-certifierade tuggprodukter och dentalfoder hemvården. Observera dock att hemvård inte ersätter professionell tandstensborttagning — den kan endast göras under anestesi.' },
        { heading: 'Återhämtning efter tandvård', text: 'Hemgång sker vanligen samma dag och husdjuret kan hämtas på eftermiddagen. Mjuk föda rekommenderas i 1–3 dygn, särskilt om tänder har extraherats. Vid behov ges smärtstillande antiinflammatorisk medicin med hem tillsammans med bruksanvisning. De flesta husdjur återgår till normal matintag och lek inom 24–48 timmar. Om tänder har extraherats eller tandköttsingrepp utförts bokas ett kontrollbesök efter 5 dagar för att säkerställa läkningen.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Dental Care — Eläinklinikka Saari, Vaasa',
      h1: 'Dental Care',
      metaDesc: 'Dog and cat dental care in Vaasa. Scaling, dental X-rays, extractions. All procedures under general anaesthesia. Eläinklinikka Saari.',
      sections: [
        { heading: 'Why is dental care important?', text: 'Dental disease is among the most common health problems in pets. By the age of three, the majority of dogs and cats have tartar and gingivitis. Untreated dental damage progresses silently — animals instinctively hide pain, so owners often notice the problem only when it has advanced significantly. Regular professional dental care extends your pet\'s lifespan and significantly improves quality of life.' },
        { heading: 'Our services', text: 'Our clinic provides comprehensive dental care under general anaesthesia: ultrasonic scaling, dental X-ray examinations (all teeth are digitally radiographed), extractions, deciduous tooth removal, periodontal treatment, and PerioVive hyaluronic acid gel therapy. Every dental procedure includes a complete oral examination and dental chart.' },
        { heading: 'Dental X-rays — seeing what is hidden', text: 'Dental X-rays are the most important diagnostic tool in dentistry. Over half of dental diseases are invisible on visual examination — root infections, tooth resorption, cysts, and bone loss are only revealed on radiographs. At our clinic, all teeth are radiographed as part of every dental procedure.' },
        { heading: 'How does the procedure work?', text: 'Before the procedure, a health check and blood tests are performed as needed. The procedure is carried out under inhalation anaesthesia with comprehensive pain relief. During anaesthesia, we continuously monitor heart rate, oxygen saturation, blood pressure, and temperature. Tartar is removed, dental X-rays are taken, diseased teeth are treated, and damaged teeth are extracted if necessary. Patients are typically discharged the same day.' },
        { heading: 'Common dental diseases in dogs and cats', text: 'Periodontitis — inflammation of the tooth-supporting tissues — is the most common dental disease and leads to tooth loss and chronic pain when advanced. Tooth resorption is particularly common in cats, where the tooth structure breaks down from within — often invisible on visual examination and very painful. Fractured teeth (especially canines) predispose to root infections. Retained deciduous teeth when permanent teeth erupt cause alignment problems, especially in small dog breeds. Each of these conditions can be diagnosed and treated at our clinic.' },
        { heading: 'Home dental care — prevention starts at home', text: 'Regular tooth brushing is the most effective way to prevent tartar buildup and gingivitis. Start by gently getting your pet used to fingers and a pet-specific toothpaste — human toothpaste is not suitable for animals due to fluoride and xylitol content. Daily brushing is the goal, but 2–3 times per week already produces meaningful results. VOHC-certified chew products and dental diets complement home care. Note, however, that home care does not replace professional scaling, which can only be performed under anaesthesia.' },
        { heading: 'Recovery after dental care', text: 'Patients are typically discharged the same day and can be collected in the afternoon. Soft food is recommended for 1–3 days, especially if teeth have been extracted. Take-home anti-inflammatory pain medication is provided when needed, along with instructions for use. Most pets return to normal eating and play within 24–48 hours. If teeth have been extracted or gum procedures performed, a follow-up appointment is scheduled for 5 days later to verify healing.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['hampaiden-harjaus', 'hammasresorptio', 'puhkeamattomat-hampaat', 'periovive'],
    schemaService: 'Veterinary Dental Care',
    procedureType: 'SurgicalProcedure',
    faq: [
      { q: 'Paljonko koiran hammashoito maksaa?', a: 'Hammaskiven poisto koiralle maksaa alkaen 300 € (alle 20 kg) tai 350 € (yli 20 kg). Hinta sisältää yleisanestesian, hammaskiven poiston, hammasröntgenkuvat ja suun tutkimuksen. Hampaiden poistot hinnoitellaan tapauskohtaisesti.' },
      { q: 'Miten tiedän, tarvitseeko lemmikkini hammashoitoa?', a: 'Merkkejä hammassairauksista ovat pahanhajuinen hengitys, hammaskivi, punaiset ikenet, syömisen vaikeudet ja kuolaaminen. Suosittelemme hampaiden tarkastusta vastaanoton yhteydessä — usein ongelmia ei huomaa päällepäin.' },
      { q: 'Tehdäänkö hammashoito nukutuksessa?', a: 'Kyllä, kaikki hammashoidot tehdään yleisanestesiassa. Tämä on ainoa tapa tutkia ja hoitaa hampaat kunnolla ja turvallisesti. Nukutuksen aikana valvomme jatkuvasti elintoimintoja.' },
      { q: 'Miten usein lemmikkini hampaat pitäisi tarkastuttaa?', a: 'Hampaiden tarkastus kuuluu osaksi jokaista vuosikontrollia. Yli 3-vuotiailla koirilla ja kissoilla suosittelemme vuosittaista tarkastusta, sillä hammaskivi ja ientulehdus etenevät usein huomaamatta. Pieniroduille (kuten yorkshirenterrieri, chihuahua) suositellaan jo varhaisempia tarkastuksia.' },
      { q: 'Voiko lemmikin hampaita harjata kotona?', a: 'Kyllä, ja se on tehokkain kotihoidon muoto. Käytä aina lemmikeille tarkoitettua hammastahnaa — ihmisten hammastahnan fluoridi ja ksylitoli ovat myrkyllisiä eläimille. Aloita rauhallisesti sormella, totuttele sitten pehmeää lasten hammasharjaa tai erityistä lemmikkiharjaa. Päivittäinen harjaus antaa parhaan suojan, mutta 2–3 kertaa viikossa auttaa jo merkittävästi.' },
      { q: 'Milloin maitohampaat pitäisi poistaa?', a: 'Jos pysyvät hampaat ovat puhjenneet mutta maitohammas on jäänyt paikalleen (persistoiva maitohammas), se voi aiheuttaa hammasvirheitä ja tulehduksia. Yleensä ne poistetaan sterilisaation tai kastraation yhteydessä, kun koira on jo anestesiassa — näin säästyy erillinen anestesia.' },
    ]
  },
  {
    slug: 'sydantutkimukset',
    slugSv: 'hjartundersokningar',
    slugEn: 'cardiac-examinations',
    title: 'Sydäntutkimukset — Eläinklinikka Saari, Vaasa',
    h1: 'Sydäntutkimukset',
    metaDesc: 'Sydämen ultraääni, EKG ja Holter-tutkimukset koirille ja kissoille Vaasassa. Viralliset sydäntutkimukset ja jalostustarkastukset. Eläinklinikka Saari.',
    icon: '❤️',
    sections: [
      { heading: 'Sydänsairaudet lemmikeillä', text: 'Sydänsairaudet ovat yleisiä erityisesti tietyissä koira- ja kissaroduissa. Cavalier kingcharlesinspanielilla, dobermanneilla ja Maine Coon -kissoilla on perinnöllinen alttius sydänsairauksille. Ajoissa aloitettu lääkitys voi pidentää lemmikin elinikää huomattavasti — siksi säännölliset sydäntarkastukset ovat tärkeitä etenkin riskiroduilla.' },
      { heading: 'Tutkimusmenetelmät', text: 'Klinikallamme on kattavat kardiologiset tutkimusmahdollisuudet. Sydämen ultraäänitutkimus (ekokardiografia) on tärkein sydänsairauksien diagnostinen menetelmä — sillä nähdään sydämen rakenne, kammioiden koko, läppien toiminta ja verenvirtaus reaaliajassa. EKG-tutkimuksella mitataan sydämen sähköistä toimintaa ja tunnistetaan rytmihäiriöt. Holter-tutkimuksella seurataan sydämen rytmiä 24 tunnin ajan kotioloissa.' },
      { heading: 'Viralliset sydäntutkimukset', text: 'Klinikalla on Suomen Kennelliiton myöntämät viralliset sydämen auskultaatio-oikeudet. Teemme virallisia sydämen auskultaatio- ja ultraäänitutkimuksia jalostustarkastusten yhteydessä. Viralliset tulokset kirjataan Kennelliiton tietokantaan.' },
      { heading: 'Milloin hakeutua tutkimuksiin?', text: 'Oireita voivat olla yskiminen (erityisesti levossa tai rasituksen jälkeen), rasituksen sietokyvyn heikkeneminen, tiheä hengitys, pyörtyily tai äkillinen väsähtäminen. Riskirotujen kohdalla suosittelemme säännöllisiä sydäntarkastuksia jo nuorella iällä, vaikka oireita ei olisi. Varaa aika sydäntutkimukseen — varhainen diagnoosi ja hoito tekevät merkittävän eron.' },
      { heading: 'Yleisimmät sydänsairaudet koirilla ja kissoilla', text: 'Koirilla yleisin sydänsairaus on läppävian aiheuttama krooninen mitraaliläppäsairaus (MMVD), joka on erityisen yleinen pienikokoisilla roduilla ja cavalier kingcharlesinspanielilla. Isokokoisilla roduilla (dobermann, isot mäyräkoirat, newfoundlandinkoira) yleisempi on laajentuva kardiomyopatia (DCM), joka heikentää sydänlihaksen supistumiskykyä. Kissoilla yleisin sydänsairaus on hypertrofinen kardiomyopatia (HCM), jossa sydänlihas paksuuntuu liikaa ja vaikeuttaa verenkiertoa — Maine Coon ja ragdoll ovat erityisiä riskirotuja. Jokainen sairaus voidaan todeta ultraäänellä ja aloittaa oikea-aikainen hoito.' },
      { heading: 'Lääkehoito ja seuranta', text: 'Kun sydänsairaus on diagnosoitu, lääkitys räätälöidään yksilöllisesti diagnoosin, sairauden vaiheen ja oireiden mukaan. Tyypillisiä lääkkeitä ovat pimobendaani (Vetmedin), ACE-estäjät, diureetit ja spironolaktoni. ACVIM:n ohjeistusten mukaan varhaisessa vaiheessa aloitettu pimobendaanilääkitys voi pidentää oireettomana pysymisen aikaa merkittävästi. Seurantakäyntejä tarvitaan alkuvaiheessa tiiviimmin (4–8 viikon välein), vakaassa vaiheessa yleensä noin 12 kuukauden välein. Kontrollissa arvioidaan lääkityksen tehoa, mitataan tarvittaessa verenpainetta ja seurataan munuaisten toimintaa verikokeilla.' },
      { heading: 'Kotihoito ja elämänlaatu', text: 'Sydänsairaan lemmikin kotihoidon kulmakiviä ovat lääkkeiden säännöllinen antaminen, ruokahalun ja hengitystaajuuden tarkkailu ja maltillinen liikunta. Pyydämme omistajaa seuraamaan levossa tapahtuvaa hengitystaajuutta: toistuvasti yli 30 hengenvetoa minuutissa levossa voi merkitä sydämen vajaatoiminnan pahenemista ja vaatia lääkityksen tarkistamista. Suolan rajoittaminen ruokavaliossa auttaa erityisesti pitkälle edenneessä vajaatoiminnassa. Oikean hoidon turvin monet sydänsairaat lemmikit elävät laadukasta elämää vielä vuosia diagnoosin jälkeen.' },
      { heading: 'Usein kysyttyä sydäntutkimuksista', text: '<strong>Kuinka usein sydäntutkimuksia tehdään?</strong> Riskirotujen kohdalla suosittelemme ensimmäistä sydäntutkimusta 1–2 vuoden iässä ja sen jälkeen vuosittain. Oireettomille lemmikeille riittää yleensä tarkastus senioritarkastuksen yhteydessä. Jos lemmikillä on todettu sydänsairaus, seurantaväli sovitaan yksilöllisesti — yleensä 3–12 kuukauden välein. <strong>Tarvitaanko sydäntutkimukseen rauhoitusta?</strong> Sydämen ultraäänitutkimus tehdään yleensä hereillä olevalle potilaalle ilman rauhoitusta. Tutkimus on kivuton ja kestää noin 15–30 minuuttia. Levottomille potilaille voidaan antaa kevyt rauhoitus, joka ei vaikuta tutkimustuloksiin.' },
    ],
    sv: {
      title: 'Hjärtundersökningar — Djurklinik Saari, Vasa',
      h1: 'Hjärtundersökningar',
      metaDesc: 'Hjärtultraljud, EKG och Holter för hundar och katter i Vasa. Officiella hjärtundersökningar. Tidig behandling förlänger livslängden. Eläinklinikka Saari.',
      sections: [
        { heading: 'Hjärtsjukdomar hos husdjur', text: 'Hjärtsjukdomar är vanliga särskilt hos vissa hund- och kattraser. Cavalier king charles spaniel, dobermann och Maine Coon-katter har en ärftlig benägenhet för hjärtsjukdomar. Tidigt insatt medicinering kan förlänga husdjurets livslängd avsevärt — därför är regelbundna hjärtkontroller viktiga, särskilt för riskraser.' },
        { heading: 'Undersökningsmetoder', text: 'Vår klinik har omfattande kardiologiska undersökningsmöjligheter. Hjärtultraljud (ekokardiografi) är den viktigaste diagnostiska metoden för hjärtsjukdomar — den visar hjärtats struktur, kammarstorlek, klaffarnas funktion och blodflöde i realtid. EKG-undersökning mäter hjärtats elektriska aktivitet och identifierar arytmier. Holter-undersökning övervakar hjärtrytmen under 24 timmar i hemmiljö.' },
        { heading: 'Officiella hjärtundersökningar', text: 'Kliniken har officiella rättigheter för hjärtauskultation beviljade av Finska Kennelklubben. Vi utför officiella hjärtauskultations- och ultraljudsundersökningar i samband med avelskontroller. Officiella resultat registreras i Kennelklubbens databas.' },
        { heading: 'När ska man söka undersökning?', text: 'Symtom kan vara hosta (särskilt i vila eller efter ansträngning), minskad tolerans för fysisk aktivitet, snabb andning, svimning eller plötslig trötthet. För riskraser rekommenderar vi regelbundna hjärtkontroller redan i ung ålder, även utan symtom. Boka tid för hjärtundersökning — tidig diagnos och behandling gör en betydande skillnad.' },
        { heading: 'Vanligaste hjärtsjukdomarna hos hundar och katter', text: 'Hos hundar är den vanligaste hjärtsjukdomen kronisk klaffsjukdom i mitralklaffen (MMVD), som är särskilt vanlig hos små raser och hos cavalier king charles spaniel. Hos större raser (dobermann, stora tax, newfoundlandshund) är utvidgad kardiomyopati (DCM) vanligare, vilket försämrar hjärtmuskelns sammandragningsförmåga. Hos katter är den vanligaste hjärtsjukdomen hypertrofisk kardiomyopati (HCM), där hjärtmuskeln förtjockas onaturligt och försvårar blodcirkulationen — Maine Coon och ragdoll är särskilda riskraser. Varje sjukdom kan diagnostiseras med ultraljud och rätt behandling sättas in i tid.' },
        { heading: 'Läkemedelsbehandling och uppföljning', text: 'När en hjärtsjukdom har diagnostiserats skräddarsys medicineringen individuellt efter diagnos, sjukdomsstadium och symtom. Typiska läkemedel är pimobendan (Vetmedin), ACE-hämmare, diuretika och spironolakton. Enligt ACVIM:s riktlinjer kan tidigt insatt pimobendanbehandling förlänga den symtomfria perioden avsevärt. Uppföljningsbesök behövs tätare i inledningsskedet (var 4–8 vecka) och i stabilt skede vanligen ungefär var 12:e månad. Vid kontrollen bedöms medicineringens effekt, vid behov mäts blodtryck och njurfunktionen följs med blodprov.' },
        { heading: 'Hemvård och livskvalitet', text: 'Grunden i hemvården av ett husdjur med hjärtsjukdom är regelbunden medicinering, observation av aptit och andningsfrekvens samt måttlig motion. Vi ber ägaren följa andningsfrekvensen i vila: upprepat över 30 andetag per minut i vila kan tyda på försämrad hjärtsvikt och kräva justering av medicineringen. Att begränsa salt i kosten hjälper särskilt vid framskriden hjärtsvikt. Med rätt behandling lever många hjärtsjuka husdjur ett högkvalitativt liv i ytterligare många år efter diagnosen.' },
        { heading: 'Vanliga frågor om hjärtundersökningar', text: '<strong>Hur ofta görs hjärtundersökningar?</strong> För riskraser rekommenderar vi den första hjärtundersökningen vid 1–2 års ålder och därefter årligen. För symtomfria husdjur räcker det vanligen med kontroll i samband med seniorundersökningen. Om husdjuret har en diagnostiserad hjärtsjukdom bestäms uppföljningsintervallet individuellt — vanligen var 3–12 månad. <strong>Behövs sedering för hjärtundersökning?</strong> Hjärtultraljud görs vanligen på en vaken patient utan sedering. Undersökningen är smärtfri och tar cirka 15–30 minuter. Oroliga patienter kan få lätt sedering som inte påverkar undersökningsresultaten.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Cardiac Examinations — Eläinklinikka Saari, Vaasa',
      h1: 'Cardiac Examinations',
      metaDesc: 'Cardiac ultrasound, ECG and Holter monitoring for dogs and cats in Vaasa. Official heart screenings. Early treatment extends lifespan. Eläinklinikka Saari.',
      sections: [
        { heading: 'Heart disease in pets', text: 'Heart disease is common, particularly in certain dog and cat breeds. Cavalier King Charles Spaniels, Dobermanns, and Maine Coon cats have a hereditary predisposition to heart disease. Early medication can significantly extend your pet\'s lifespan — which is why regular cardiac check-ups are important, especially for at-risk breeds.' },
        { heading: 'Examination methods', text: 'Our clinic offers comprehensive cardiological examination capabilities. Cardiac ultrasound (echocardiography) is the primary diagnostic method for heart disease — it shows heart structure, chamber size, valve function, and blood flow in real time. ECG examination measures the heart\'s electrical activity and identifies arrhythmias. Holter monitoring tracks heart rhythm over 24 hours in the home environment.' },
        { heading: 'Official cardiac examinations', text: 'Our clinic holds official heart auscultation rights granted by the Finnish Kennel Club. We perform official cardiac auscultation and ultrasound examinations in connection with breeding evaluations. Official results are recorded in the Kennel Club database.' },
        { heading: 'When to seek examination?', text: 'Symptoms may include coughing (especially at rest or after exertion), reduced exercise tolerance, rapid breathing, fainting, or sudden lethargy. For at-risk breeds, we recommend regular cardiac check-ups from a young age, even without symptoms. Book an appointment for a cardiac examination — early diagnosis and treatment make a significant difference.' },
        { heading: 'Most common heart diseases in dogs and cats', text: 'In dogs, mitral valve disease (MMVD, myxomatous mitral valve degeneration) is the most common heart condition and affects particularly small breeds such as the Cavalier King Charles Spaniel, Dachshund, and Poodle. Dilated cardiomyopathy (DCM) is typical of large breeds such as the Dobermann, Great Dane, and Boxer. In cats, hypertrophic cardiomyopathy (HCM) is the most common heart disease — it often progresses silently, and the first sign may be a sudden severe problem such as a blood clot or acute heart failure. That is why regular cardiac examinations are important, especially for at-risk breeds.' },
        { heading: 'Medication and follow-up', text: 'When heart disease is diagnosed, the right medication and regular follow-up are essential. Pimobendan, ACE inhibitors, diuretics (furosemide, torasemide), and beta blockers are commonly used in treatment. Each pet gets an individual treatment plan based on the type and stage of the heart disease. Follow-up usually includes a cardiac ultrasound, blood pressure measurement, blood tests (kidney values, electrolytes), and sometimes a chest X-ray. The follow-up interval depends on the stage of the disease — typically around every 12 months once the patient is stable.' },
        { heading: 'Home care and quality of life', text: 'Home care plays an important role in the treatment of heart disease. It is good to monitor resting respiratory rate (normal is below 30 breaths per minute when asleep), exercise tolerance, appetite, and energy levels. Medications must be given consistently at the same times. Exercise should be kept moderate — strenuous activity is to be avoided, but gentle walks are good. A special cardiac diet can support treatment. With proper treatment, many pets with heart disease can live good-quality lives for years after diagnosis.' },
        { heading: 'Frequently asked questions about cardiac examinations', text: '<strong>How often are cardiac examinations performed?</strong> For at-risk breeds, we recommend the first cardiac examination at 1–2 years of age and annually thereafter. For asymptomatic pets, a check-up during the senior examination is usually sufficient. If your pet has been diagnosed with heart disease, the follow-up interval is agreed individually — typically every 3–12 months. <strong>Is sedation needed for cardiac examination?</strong> Cardiac ultrasound is usually performed on an awake patient without sedation. The examination is painless and takes approximately 15–30 minutes. Restless patients may receive light sedation that does not affect the examination results.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['avoin-valtimotiehyt-pda', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Cardiology',
    faq: [
      { q: 'Miten tiedän, onko lemmikkilläni sydänsairaus?', a: 'Oireita voivat olla yskiminen, rasituksen sietokyvyn heikkeneminen, tiheä hengitys tai pyörtyily. Monilla roduilla (Cavalier, Dobermann, Maine Coon) suosittelemme tutkimusta jo nuorella iällä, ennen kuin oireita ilmenee.' },
      { q: 'Paljonko sydämen ultraääni maksaa?', a: 'Sydäntutkimuksen hinta riippuu tutkimuksen laajuudesta. Ota yhteyttä klinikkaan saadaksesi tarkemman hinta-arvion. Puhelin (06) 321 7300.' },
      { q: 'Tarvitaanko sydäntutkimukseen ajanvaraus?', a: 'Kyllä, sydäntutkimus vaatii ajanvarauksen. Varaa aika soittamalla (06) 321 7300 tai verkkoajanvarauksesta saarivet.fi.' },
      { q: 'Kuinka kauan sydänsairas lemmikki voi elää lääkityksen kanssa?', a: 'Ennuste riippuu sydänsairauden tyypistä ja vaiheesta. Varhaisvaiheen mitraaliläpän sairautta sairastavat koirat voivat elää normaalin elinikänsä ilman oireita. Sydämen vajaatoimintavaiheessa oleva koira elää hyvällä lääkityksellä keskimäärin 1–3 vuotta diagnoosin jälkeen. Kissan HCM:n ennuste vaihtelee paljon — osa elää vuosia oireettomina, osa saa nopeasti komplikaatioita. Säännöllinen seuranta ja oikea lääkitys pidentävät elinikää merkittävästi.' },
      { q: 'Mitä eroa on sydämen ultraäänellä ja EKG:llä?', a: 'Sydämen ultraääni (ekokardiografia) näyttää sydämen rakenteen, läppien toiminnan ja verenvirtauksen reaaliajassa — se on ensisijainen diagnostinen menetelmä sydänsairauksiin. EKG mittaa sydämen sähköistä toimintaa ja tunnistaa rytmihäiriöt. Usein nämä tutkimukset täydentävät toisiaan: ultraääni paljastaa rakennemuutokset, EKG rytmin ongelmat.' },
      { q: 'Tarvitseeko sydänlääkettä antaa koko loppuelämän?', a: 'Kyllä, sydänsairauden lääkitys on yleensä elinikäistä. Lääkkeiden tehtävä on hidastaa sairauden etenemistä, helpottaa oireita ja parantaa elämänlaatua — ne eivät paranna itse sairautta. Lääkityksen äkillinen lopettaminen voi johtaa nopeaan voinnin heikkenemiseen. Lääkitystä ja annoksia säädetään seurannan perusteella.' },
    ]
  },
  {
    slug: 'kirurgia',
    slugSv: 'kirurgi',
    slugEn: 'surgery',
    title: 'Kirurgia — Eläinklinikka Saari, Vaasa',
    h1: 'Kirurgia',
    metaDesc: 'Eläinkirurgia Vaasassa: pehmytkudoskirurgia, ortopedia, TTA, lateral suture, murtumaleikkaukset. Turvallinen anestesia ja kivunlievitys.',
    icon: '🔪',
    sections: [
      { heading: 'Pehmytkudoskirurgia', text: 'Klinikallamme tehdään laaja valikoima pehmytkudoskirurgisia toimenpiteitä: sterilisaatiot ja kastraatiot, keisarinleikkaukset, kasvainten poistot, vierasesineleikkaukset (mahalaukusta tai suolistosta), virtsakivileikkaukset, pernapoistot sekä silmä- ja korvaleikkaukset. Jokainen toimenpide suunnitellaan yksilöllisesti potilaan tarpeiden mukaan.' },
      { heading: 'Ortopedinen kirurgia', text: 'Eturistisiteen korjausleikkaukset ovat yleisin ortopedinen toimenpide koirilla. Klinikallamme käytetään kahta menetelmää: lateral suture -tekniikka stabiloi nivelen synteettisellä tukimateriaalilla ja sopii erityisesti pienille koirille ja kissoille. TTA (tibial tuberosity advancement) muuttaa polven biomekaniikkaa pysyvästi ja on hyvä vaihtoehto aktiivisille ja suuremmille koirille. Lisäksi teemme murtumaleikkauksia, amputaatioita ja reisiluunpään poistoja.' },
      { heading: 'Turvallinen anestesia', text: 'Anestesiaturvallisuus on meille sydämen asia. Käytämme inhalaatioanestesiaa ja jatkuvaa monitorointia: sydämen syke, verenpaine, happisaturaatio, kapnografia, EKG ja lämpötila. Klinikalla on kaksi ventilaattoria ja käytössä moderni balansoitu anestesiaprotokolla. Jatkuva kipulääkeinfuusio (CRI) varmistaa tasaisen kivunlievityksen leikkauksen aikana ja sen jälkeen.' },
      { heading: 'Leikkausta edeltävät tutkimukset', text: 'Turvallinen kirurgia alkaa huolellisesta potilaan arvioinnista. Ennen leikkausta teemme yleistutkimuksen, otamme tarvittavat verikokeet (hematologia, biokemia), tarkistamme maksan ja munuaisten toiminnan sekä iäkkäillä ja riskipotilailla sydämen kunnon ja verenpaineen. Näiden tietojen pohjalta suunnittelemme yksilöllisen anestesiaprotokollan ja minimoimme riskit. Riskipotilaille, kuten rotujohdannaisille (brakykefaaliset rodut) tai sydänsairaille, räätälöimme erityisprotokollat.' },
      { heading: 'Leikkauksen jälkeinen hoito ja toipuminen', text: 'Toipuminen alkaa jo leikkaussalissa. Potilasta lämmitetään aktiivisesti ja kivunlievityksestä huolehditaan multimodaalisesti: opioidit, tulehduskipulääkkeet ja paikallispuudutukset yhdessä. Heräämöhoidossa potilasta seurataan kunnes hän on täysin hereillä ja vakaa. Kotiin saat selkeät ohjeet kivunlievityksestä, liikuntarajoituksista, ruokavaliosta ja haavan hoidosta. Useimmat potilaat kotiutetaan samana päivänä. Tikit poistetaan 10–14 päivän kuluttua.' },
      { heading: 'Kivunlievitys ja hyvinvointi', text: 'Kipu ei kuulu leikkauksen jälkeiseen toipumiseen. Käytämme monitasoista kivunlievitystä (multimodaalinen analgesia), jossa yhdistetään eri lääkeryhmiä. Tämä mahdollistaa tehokkaamman kivunlievityksen pienemmillä annoksilla ja vähentää sivuvaikutuksia. Riittävä kivunlievitys nopeuttaa toipumista, pienentää stressiä ja vähentää komplikaatioita — se on sekä eläinsuojelullinen että lääketieteellinen prioriteetti meille.' },
      { heading: 'Varaa aika konsultaatioon', text: 'Jos lemmikkisi tarvitsee kirurgista arviota, varaa aika konsultaatioon. Tutkimme potilaan, arvioimme toimenpiteiden tarpeen ja suunnittelemme parhaan hoitolinjan yhdessä omistajan kanssa. Hoidot annetaan samalla klinikalla tuttujen eläinlääkäreiden toimesta — lemmikin ei tarvitse matkustaa muualle.' },
    ],
    sv: {
      title: 'Kirurgi — Djurklinik Saari, Vasa',
      h1: 'Kirurgi',
      metaDesc: 'Veterinärkirurgi i Vasa: mjukdelskirurgi, ortopedi, TTA, lateral suture, frakturoperationer. Säker anestesi och smärtlindring. Eläinklinikka Saari.',
      sections: [
        { heading: 'Mjukdelskirurgi', text: 'På vår klinik utförs ett brett utbud av mjukdelskirurgiska ingrepp: steriliseringar och kastreringar, kejsarsnitt, tumörborttagning, främmandekroppsoperationer (från magsäck eller tarm), urinstensoperationer, mjältborttagning samt ögon- och öronoperationer. Varje ingrepp planeras individuellt utifrån patientens behov.' },
        { heading: 'Ortopedisk kirurgi', text: 'Korsbandsskador är det vanligaste ortopediska ingreppet hos hundar. Vår klinik använder två metoder: lateral suture-teknik stabiliserar leden med syntetiskt stödmaterial och passar särskilt för små hundar och katter. TTA (tibial tuberosity advancement) förändrar knäets biomekanik permanent och är ett bra alternativ för aktiva och större hundar. Dessutom utför vi frakturoperationer, amputationer och femurhuvudresektioner.' },
        { heading: 'Säker anestesi', text: 'Anestesisäkerhet är en hjärtefråga för oss. Vi använder inhalationsanestesi och kontinuerlig övervakning: hjärtfrekvens, blodtryck, syremättnad, kapnografi, EKG och temperatur. Kliniken har två ventilatorer och använder ett modernt balanserat anestesiprotokoll. Kontinuerlig smärtlindringsinfusion (CRI) säkerställer jämn smärtlindring under och efter operationen.' },
        { heading: 'Undersökningar före operation', text: 'Säker kirurgi börjar med en noggrann patientbedömning. Före operationen gör vi en allmän undersökning, tar nödvändiga blodprover (hematologi, biokemi), kontrollerar lever- och njurfunktion samt hos äldre patienter och riskpatienter även hjärtstatus och blodtryck. Utifrån dessa uppgifter planerar vi ett individuellt anestesiprotokoll och minimerar riskerna. För riskpatienter, såsom brakycefala raser eller hjärtsjuka djur, skräddarsyr vi särskilda protokoll.' },
        { heading: 'Eftervård och återhämtning', text: 'Återhämtningen börjar redan i operationssalen. Patienten värms aktivt och smärtlindringen sköts multimodalt: opioider, antiinflammatoriska läkemedel och lokalbedövningar tillsammans. I uppvakningsrummet övervakas patienten tills den är helt vaken och stabil. Med hem får du tydliga instruktioner om smärtlindring, motionsbegränsningar, kost och sårvård. De flesta patienter skrivs ut samma dag. Stygnen tas bort efter 10–14 dagar.' },
        { heading: 'Smärtlindring och välbefinnande', text: 'Smärta hör inte till återhämtningen efter en operation. Vi använder multimodal smärtlindring där olika läkemedelsgrupper kombineras. Detta möjliggör effektivare smärtlindring med lägre doser och minskar biverkningar. Tillräcklig smärtlindring snabbar upp återhämtningen, minskar stress och komplikationer — det är både en djurskyddsfråga och en medicinsk prioritet för oss.' },
        { heading: 'Boka tid för konsultation', text: 'Om ditt husdjur behöver en kirurgisk bedömning, boka tid för konsultation. Vi undersöker patienten, bedömer behovet av ingrepp och planerar den bästa behandlingslinjen tillsammans med ägaren. Behandlingar ges på samma klinik av bekanta veterinärer — husdjuret behöver inte resa någon annanstans.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Surgery — Eläinklinikka Saari, Vaasa',
      h1: 'Surgery',
      metaDesc: 'Veterinary surgery in Vaasa: soft tissue, orthopaedics, TTA, lateral suture, fracture repair. Safe anaesthesia. Eläinklinikka Saari.',
      sections: [
        { heading: 'Soft tissue surgery', text: 'Our clinic performs a wide range of soft tissue surgical procedures: spays and neutering, caesarean sections, tumour removals, foreign body surgery (from stomach or intestines), urinary stone surgery, splenectomies, and eye and ear operations. Each procedure is individually planned according to the patient\'s needs.' },
        { heading: 'Orthopaedic surgery', text: 'Cruciate ligament repair is the most common orthopaedic procedure in dogs. Our clinic uses two methods: the lateral suture technique stabilises the joint with synthetic support material and is especially suited for small dogs and cats. TTA (tibial tuberosity advancement) permanently alters the knee\'s biomechanics and is a good option for active and larger dogs. We also perform fracture repairs, amputations, and femoral head resections.' },
        { heading: 'Safe anaesthesia', text: 'Anaesthesia safety is close to our hearts. We use inhalation anaesthesia and continuous monitoring: heart rate, blood pressure, oxygen saturation, capnography, ECG, and temperature. The clinic has two ventilators and uses a modern balanced anaesthesia protocol. Continuous rate infusion (CRI) pain management ensures steady pain relief during and after surgery.' },
        { heading: 'Pre-operative assessment', text: 'Safe surgery starts with a thorough patient assessment. Before the operation, we perform a general examination, take the necessary blood tests (haematology, biochemistry), check liver and kidney function, and in older or high-risk patients also cardiac status and blood pressure. Based on these findings, we design an individual anaesthesia protocol and minimise the risks. For high-risk patients, such as brachycephalic breeds or animals with heart disease, we tailor specific protocols.' },
        { heading: 'Post-operative care and recovery', text: 'Recovery begins already in the operating theatre. The patient is actively warmed and pain relief is managed multimodally: opioids, anti-inflammatories, and local anaesthetics together. In recovery, the patient is monitored until fully awake and stable. You will go home with clear instructions on pain relief, exercise restrictions, diet, and wound care. Most patients are discharged the same day. Stitches are removed after 10–14 days.' },
        { heading: 'Pain management and welfare', text: 'Pain has no place in post-operative recovery. We use multimodal pain management, combining different drug groups. This allows more effective pain relief with lower doses and reduces side effects. Adequate pain relief speeds up recovery, reduces stress, and lowers the risk of complications — it is both an animal welfare and a medical priority for us.' },
        { heading: 'Book a consultation', text: 'If your pet needs a surgical evaluation, book a consultation appointment. We examine the patient, assess the need for procedures, and plan the best treatment approach together with the owner. Treatments are given at the same clinic by familiar veterinarians — your pet does not need to travel elsewhere.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['tta-leikkaus', 'lateral-suture', 'anestesiaturvallisuus', 'kipulääkeinfuusio', 'hypotermia'],
    schemaService: 'Veterinary Surgery',
    procedureType: 'SurgicalProcedure',
    faq: [
      { q: 'Onko eläinkirurgia turvallista?', a: 'Kyllä. Käytämme inhalaatioanestesiaa ja kattavaa monitorointia (sydän, happi, verenpaine, lämpötila). Anestesian aikana eläintä valvotaan jatkuvasti ja kivunlievitys on aina osa hoitoa.' },
      { q: 'Paljonko koiran sterilisaatio maksaa?', a: 'Naaraskoiran sterilisaatio alkaen 480 € ja uroskoiran kastraatio alkaen 380 €. Hinta riippuu koiran koosta. Hinta sisältää anestesian, leikkauksen, lääkkeet ja tikkien poiston.' },
      { q: 'Miten pitkä on leikkauksesta toipuminen?', a: 'Toipumisaika riippuu toimenpiteestä. Sterilisaatiosta toipuu yleensä 10-14 päivässä, ortopedisistä leikkauksista 6-8 viikossa. Kotihoito-ohjeet annetaan aina mukaan.' },
      { q: 'Pitääkö lemmikin paastota ennen leikkausta?', a: 'Kyllä. Aikuinen koira ja kissa paastotetaan yleensä 8–12 tuntia ennen leikkausta (viimeinen ateria edellisenä iltana). Vettä saa yleensä juoda aamuun asti. Pennuille, pienille jyrsijöille ja kaniineille on omat paastosuosituksensa — ohjeet saat aina ajanvarauksen yhteydessä. Paasto vähentää oksentamisen ja hengitysteiden aspiraation riskiä anestesian aikana.' },
      { q: 'Mitä eroa on TTA:lla ja lateral suturella eturistisideleikkauksissa?', a: 'Lateral suture -tekniikka stabiloi polvinivelen synteettisellä tukimateriaalilla polven ulkopuolelta. Se sopii erityisesti pienille koirille (alle 15 kg) ja kissoille. TTA (tibial tuberosity advancement) muuttaa polven biomekaniikkaa siirtämällä sääriluun kyhmyä eteenpäin levyllä ja ruuveilla. TTA on suositeltava menetelmä aktiivisille ja isoille koirille, koska se kestää paremmin rasitusta ja toipuminen on usein nopeampaa. Valinta tehdään koiran koon, aktiivisuustason ja nivelen tilanteen perusteella.' },
      { q: 'Pitääkö leikkauksen jälkeen käyttää kaulurupantaa?', a: 'Kyllä, leikkaushaavan suojaaminen on tärkeää — lemmikki voi nuolemalla avata tikit tai aiheuttaa haavainfektion. Perinteinen muovinen kaulus (Elizabethan collar) tai pehmeämmät vaihtoehdot, kuten suojapaita tai puhallettava kaulus, ovat hyviä vaihtoehtoja. Suosittelemme käyttämään suojausta koko ajan 10–14 päivän ajan eli tikkien poistoon asti. Lemmikki tottuu yleensä suojaukseen 1–2 päivässä.' },
    ]
  },
  {
    slug: 'tahystykset',
    slugSv: 'endoskopi',
    slugEn: 'endoscopy',
    title: 'Tähystystutkimukset — Eläinklinikka Saari, Vaasa',
    h1: 'Tähystystutkimukset',
    metaDesc: 'Tähystystutkimukset Vaasassa: gastroskopia, video-otoskopia, rhinoskopia, kystoskopia, bronkoskopia. Eläinklinikka Saari.',
    icon: '📷',
    sections: [
      { heading: 'Mitä tähystystutkimukset ovat?', text: 'Tähystystutkimukset (endoskopia) ovat minimaalisesti invasiivisia tutkimusmenetelmiä, joissa ohut kameraskooppi viedään kehon luonnollisten aukkojen kautta sisäelinten tutkimiseen. Menetelmä mahdollistaa tarkan diagnostiikan ilman avokirurgiaa, ja usein myös hoidon samalla kertaa — esimerkiksi vierasesineiden poiston mahalaukusta.' },
      { heading: 'Gastroskopia', text: 'Vatsalaukun ja suoliston tähystyksellä tutkitaan ja hoidetaan ruuansulatuskanavan ongelmia. Yleisin indikaatio on vierasesineen poisto — tähystyksellä esimerkiksi sukat, lelut ja luun kappaleet saadaan usein poistettua ilman vatsaleikkausta. Lisäksi otetaan koepalojen näytteitä kroonisten suolistosairauksien (IBD, lymfooma) diagnostiikkaan.' },
      { heading: 'Video-otoskopia', text: 'Korvien tähystystutkimus suurennetulla videokuvalla. Näkyvyys korvakäytävään on moninkertainen perinteiseen otoskooppiin verrattuna. Mahdollistaa korvakäytävän perusteellisen puhdistuksen ja huuhtelun näkökontrollissa. Erityisen arvokas kroonisten ja toistuvien korvatulehdusten tutkimuksessa ja hoidossa.' },
      { heading: 'Muut tähystykset', text: 'Rhinoskopia (nenäontelon tähystys) vierasesineille, kasvaimille ja krooniselle nuhalle. Kystoskopia (virtsateiden tähystys) virtsarakon ongelmien tutkimiseen. Bronkoskopia (hengitysteiden tähystys) kroonisen yskän ja hengitystieoireiden diagnostiikkaan.' },
      { heading: 'Usein kysyttyä tähystyksistä', text: '<strong>Onko tähystys kivuliasta?</strong> Tähystystutkimukset tehdään yleisanestesiassa, joten lemmikki ei tunne kipua toimenpiteen aikana. Toimenpiteen jälkeen potilas voi tuntea lievää vatsavaivaa, mutta toipuminen on yleensä nopeaa — useimmat potilaat kotiutetaan saman päivän aikana. <strong>Kuinka nopeasti tulokset saadaan?</strong> Tähystyksen aikana otetut löydökset ja kuvat arvioidaan heti toimenpiteen jälkeen. Jos koepalojen näytteitä lähetetään patologin tutkittavaksi, vastaukset saadaan yleensä 5–10 arkipäivässä. Eläinlääkäri käy tulokset läpi omistajan kanssa ja laatii hoitosuunnitelman.' },
    ],
    sv: {
      title: 'Endoskopi — Djurklinik Saari, Vasa',
      h1: 'Endoskopi',
      metaDesc: 'Endoskopi i Vasa: gastroskopi, video-otoskopi, rinoskopi, cystoskopi, bronkoskopi. Minimalt invasiv diagnostik för husdjur. Eläinklinikka Saari.',
      sections: [
        { heading: 'Vad är endoskopi?', text: 'Endoskopi är minimalt invasiva undersökningsmetoder där ett tunt kameraskop förs in genom kroppens naturliga öppningar för att undersöka inre organ. Metoden möjliggör exakt diagnostik utan öppen kirurgi, och ofta även behandling samtidigt — till exempel borttagning av främmande föremål från magsäcken.' },
        { heading: 'Gastroskopi', text: 'Med gastroskopi undersöks och behandlas problem i matsmältningskanalen. Den vanligaste indikationen är borttagning av främmande föremål — med endoskopi kan till exempel strumpor, leksaker och benbitar ofta avlägsnas utan bukoperation. Dessutom tas biopsier för diagnostik av kroniska tarmsjukdomar (IBD, lymfom).' },
        { heading: 'Video-otoskopi', text: 'Öronundersökning med förstorad videobild. Sikten in i hörselgången är mångdubbelt bättre jämfört med ett traditionellt otoskop. Möjliggör grundlig rengöring och sköljning av hörselgången under visuell kontroll. Särskilt värdefullt vid undersökning och behandling av kroniska och återkommande öroninflammationer.' },
        { heading: 'Övriga endoskopier', text: 'Rinoskopi (näshåleendoskopi) för främmande föremål, tumörer och kronisk snuva. Cystoskopi (urinvägsendoskopi) för undersökning av urinblåseproblem. Bronkoskopi (luftvägsendoskopi) för diagnostik av kronisk hosta och luftvägssymtom.' },
        { heading: 'Vanliga frågor om endoskopi', text: '<strong>Är endoskopi smärtsamt?</strong> Endoskopiska undersökningar utförs under generell anestesi, så husdjuret känner ingen smärta under ingreppet. Efter ingreppet kan patienten uppleva lätta magbesvär, men återhämtningen är vanligen snabb — de flesta patienter skrivs ut samma dag. <strong>Hur snabbt fås resultaten?</strong> Fynd och bilder som tas under endoskopin bedöms direkt efter ingreppet. Om biopsier skickas till patolog fås svaren vanligen inom 5–10 arbetsdagar. Veterinären går igenom resultaten med ägaren och upprättar en behandlingsplan.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Endoscopy — Eläinklinikka Saari, Vaasa',
      h1: 'Endoscopy',
      metaDesc: 'Endoscopy in Vaasa: gastroscopy, video otoscopy, rhinoscopy, cystoscopy, bronchoscopy. Minimally invasive diagnostics for pets. Eläinklinikka Saari.',
      sections: [
        { heading: 'What is endoscopy?', text: 'Endoscopy involves minimally invasive examination methods where a thin camera scope is inserted through the body\'s natural openings to examine internal organs. The method enables precise diagnostics without open surgery, and often treatment at the same time — for example, removal of foreign bodies from the stomach.' },
        { heading: 'Gastroscopy', text: 'Gastroscopy examines and treats digestive tract problems. The most common indication is foreign body removal — endoscopy can often remove socks, toys, and bone fragments without abdominal surgery. Biopsies are also taken for the diagnosis of chronic intestinal diseases (IBD, lymphoma).' },
        { heading: 'Video otoscopy', text: 'Ear examination with magnified video imaging. Visibility into the ear canal is many times greater compared to a traditional otoscope. It enables thorough cleaning and flushing of the ear canal under visual control. Particularly valuable in the investigation and treatment of chronic and recurrent ear infections.' },
        { heading: 'Other endoscopies', text: 'Rhinoscopy (nasal cavity endoscopy) for foreign bodies, tumours, and chronic nasal discharge. Cystoscopy (urinary tract endoscopy) for investigating bladder problems. Bronchoscopy (airway endoscopy) for diagnosing chronic cough and respiratory symptoms.' },
        { heading: 'Frequently asked questions about endoscopy', text: '<strong>Is endoscopy painful?</strong> Endoscopic examinations are performed under general anaesthesia, so your pet feels no pain during the procedure. After the procedure, the patient may experience mild stomach discomfort, but recovery is usually quick — most patients are discharged the same day. <strong>How quickly are results available?</strong> Findings and images taken during endoscopy are assessed immediately after the procedure. If biopsy samples are sent to a pathologist, results are usually available within 5–10 working days. The veterinarian reviews the results with the owner and prepares a treatment plan.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['gastroskopia', 'video-otoskopia', 'ibd-lymfooma', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Endoscopy'
  },
  {
    slug: 'rokotukset',
    slugSv: 'vaccinationer',
    slugEn: 'vaccinations',
    title: 'Rokotukset — Eläinklinikka Saari, Vaasa',
    h1: 'Rokotukset',
    metaDesc: 'Koiran ja kissan rokotukset Vaasassa. Pentujen rokotusohjelma, aikuisten tehosterokotukset, rabies ja matkustusasiakirjat. Eläinklinikka Saari.',
    icon: '💉',
    sections: [
      { heading: 'Miksi rokotus on tärkeää?', text: 'Rokotus on tärkein ennaltaehkäisevän terveydenhuollon muoto lemmikeille. Rokotukset suojaavat vakavasti sairauksilta, jotka voivat olla hengenvaarallisia tai jopa kuolemaan johtavia. Suomessa koirien ja kissojen rokotusohjelma perustuu Suomen Eläinlääkäriliiton suosituksiin.' },
      { heading: 'Koirien rokotukset', text: 'Koiranpennut rokotetaan ensimmäisen kerran 12 viikon iässä ja tehosterokotus annetaan 16 viikon iässä. Perusrokotus sisältää suojan penikkatautia, parvovirusta ja maksatulehdusta vastaan. Rabiesrokotus annetaan 12 viikon iästä alkaen. Kennelyskärokotus suositellaan koirille, jotka ovat paljon tekemisissä muiden koirien kanssa. Aikuisille koirille tehosterokotus annetaan 1–3 vuoden välein.' },
      { heading: 'Kissojen rokotukset', text: 'Kissanpennut rokotetaan 12 ja 16 viikon iässä. Perusrokotus sisältää suojan kissaruttoa, herpesvirusta ja calicivirusta vastaan. Rabiesrokotus on pakollinen ulkokissoille ja kaikille ulkomaille matkustaville kissoille. Aikuisille kissoille tehosterokotus annetaan 1–3 vuoden välein riippuen rokotteesta ja kissan elintavoista.' },
      { heading: 'Drop-in rokotukset ja matkustusasiakirjat', text: 'Klinikallamme on drop-in rokotukset ilman ajanvarausta tiistaisin klo 15.30–16.00. Laadimme myös EU-lemmikkieläinpassit ja matkustusasiakirjat ulkomaille matkustaville lemmikeille. Matkustusasiakirjojen vaatimukset vaihtelevat kohdemaan mukaan — ota yhteyttä hyvissä ajoin ennen matkaa.' },
      { heading: 'Pentujen rokotusohjelma askel askeleelta', text: 'Pennun ensimmäinen rokotussarja on ratkaisevan tärkeä, koska emältä saatu vasta-ainesuoja loppuu 8–12 viikon iässä. Koiranpentu rokotetaan 12 viikon iässä (penikkatauti, parvovirus, hepatiitti) ja tehosterokotus annetaan 16 viikon iässä samalla kun annetaan myös rabiesrokotus. Kissanpentu rokotetaan 12 viikon iässä (kissarutto, herpes, calici) ja tehoste 16 viikon iässä. Ensimmäisen vuoden tehosterokotus annetaan 12 kuukauden iässä — tämä on tärkeä vaihe, jossa pitkäaikainen immuniteetti vahvistuu. Sen jälkeen siirrytään 1–3 vuoden tehostevälille.' },
      { heading: 'Matkustaminen lemmikin kanssa', text: 'Lemmikkieläinpassi on pakollinen kaikille EU-alueella matkustaville koirille, kissoille ja freteille. Ennen matkaa lemmikki tarvitsee: sirun tunnistusta varten, voimassa olevan rabiesrokotuksen (vähintään 21 päivää rokotuksesta ensimmäisellä kerralla) ja joissakin maissa ekinokokki-lääkityksen (esim. Iso-Britannia, Suomi tuontiin). EU-maiden ulkopuolelle matkustaessa vaatimukset voivat olla paljon tiukempia — rabiesvasta-ainetesti ja karanteeniaika voivat olla tarpeen. Aloita matkan valmistelu vähintään 4–6 kuukautta etukäteen. Autamme mielellämme matkustusasiakirjojen laadinnassa.' },
      { heading: 'Rokotusten turvallisuus ja sivuvaikutukset', text: 'Rokotukset ovat eläinlääketieteen turvallisimpia toimenpiteitä, mutta kuten kaikki lääketieteelliset toimenpiteet, niihin voi liittyä lieviä reaktioita. Tavallisia ja harmittomia sivuvaikutuksia ovat lievä väsymys, ruokahaluttomuus tai lievä turvotus pistoskohdassa 1–2 päivän ajan. Vakavat reaktiot, kuten voimakas allerginen reaktio (naaman turvotus, oksentelu, heikkous), ovat erittäin harvinaisia mutta vaativat välitöntä eläinlääkärin hoitoa. Suosittelemme seuraamaan lemmikkiä 30 minuuttia rokotuksen jälkeen klinikalla ja loppupäivän kotona. Rokotusten hyödyt ovat moninkertaisia verrattuna pieneen haittariskeihin — rokottamattomat lemmikit ovat vaarassa sairastua vakaviin, usein hengenvaarallisiin tauteihin.' },
      { heading: 'Usein kysyttyä rokotuksista', text: '<strong>Kuinka usein rokotukset uusitaan?</strong> Ensimmäisen rokotussarjan jälkeen tehosterokotus annetaan vuoden kuluttua. Sen jälkeen aikuisten koirien ja kissojen perusrokotukset uusitaan 1–3 vuoden välein rokotteesta riippuen. Rabiesrokotus uusitaan 3 vuoden välein. Eläinlääkäri suunnittelee yksilöllisen rokotusohjelman lemmikkisi tarpeiden mukaan. <strong>Voiko rokottamattoman koiran ulkoiluttaa?</strong> Rokottamattomalla pennulla on suurempi riski sairastua vakaviin tartuntatauteihin kuten parvovirukseen. Pennun ensimmäisen rokotussarjan aikana on tärkeää välttää kontaktia tuntemattomien koirien kanssa ja paikkoja, joissa käy paljon koiria. Turvallista ulkoilua omalla pihalla tai puhtailla alueilla voi harjoittaa jo ennen rokotussarjan valmistumista.' },
    ],
    sv: {
      title: 'Vaccinationer — Djurklinik Saari, Vasa',
      h1: 'Vaccinationer',
      metaDesc: 'Vaccinationer för hund och katt i Vasa. Valpvaccinationsprogram, boostervaccinationer, rabies och resehandlingar. Boka tid hos Eläinklinikka Saari.',
      sections: [
        { heading: 'Varför är vaccination viktigt?', text: 'Vaccination är den viktigaste formen av förebyggande hälsovård för husdjur. Vaccinationer skyddar mot allvarliga sjukdomar som kan vara livshotande eller till och med dödliga. I Finland baseras vaccinationsprogrammet för hundar och katter på rekommendationer från Finlands Veterinärförbund.' },
        { heading: 'Hundvaccinationer', text: 'Hundvalpar vaccineras första gången vid 12 veckors ålder och en boostervaccination ges vid 16 veckors ålder. Grundvaccinationen inkluderar skydd mot valpsjuka, parvovirus och hepatit. Rabiesvaccination ges från 12 veckors ålder. Kennelhosta-vaccination rekommenderas för hundar som har mycket kontakt med andra hundar. Vuxna hundar får boostervaccination vart 1–3 år.' },
        { heading: 'Kattvaccinationer', text: 'Kattungar vaccineras vid 12 och 16 veckors ålder. Grundvaccinationen inkluderar skydd mot kattpest, herpesvirus och calicivirus. Rabiesvaccination är obligatorisk för utekatter och alla katter som reser utomlands. Vuxna katter får boostervaccination vart 1–3 år beroende på vaccin och kattens levnadsvanor.' },
        { heading: 'Drop-in-vaccinationer och resehandlingar', text: 'Vår klinik erbjuder drop-in-vaccinationer utan tidsbokning på tisdagar kl. 15.30–16.00. Vi utfärdar även EU-pass för sällskapsdjur och resehandlingar för husdjur som reser utomlands. Kraven för resehandlingar varierar beroende på destinationsland — kontakta oss i god tid före resan.' },
        { heading: 'Valpens vaccinationsprogram steg för steg', text: 'Valpens första vaccinationsserie är avgörande, eftersom antikroppsskyddet från modern upphör vid 8–12 veckors ålder. En hundvalp vaccineras vid 12 veckors ålder (valpsjuka, parvovirus, hepatit) och boostervaccinationen ges vid 16 veckors ålder samtidigt med rabiesvaccination. En kattunge vaccineras vid 12 veckors ålder (kattpest, herpes, calici) och en booster vid 16 veckors ålder. Första årets boostervaccination ges vid 12 månaders ålder — det är ett viktigt steg där det långvariga immunitetsskyddet etableras. Därefter övergår man till vaccinationsintervaller på 1–3 år.' },
        { heading: 'Resa med husdjur', text: 'Sällskapsdjurspass är obligatoriskt för alla hundar, katter och illrar som reser inom EU. Före resan behöver husdjuret: ett mikrochip för identifiering, ett giltigt rabiesvaccinationsintyg (minst 21 dagar efter vaccinationen första gången) och i vissa länder en ekinokock-behandling (t.ex. Storbritannien, Finland vid införsel). Vid resa utanför EU kan kraven vara betydligt strängare — rabiesantikroppstest och karantän kan krävas. Börja planera resan minst 4–6 månader i förväg. Vi hjälper gärna till med resehandlingarna.' },
        { heading: 'Vaccinationers säkerhet och biverkningar', text: 'Vaccinationer är bland veterinärmedicinens säkraste ingrepp, men som alla medicinska åtgärder kan de medföra lindriga reaktioner. Vanliga och ofarliga biverkningar är lätt trötthet, nedsatt aptit eller en liten svullnad vid injektionsstället under 1–2 dagar. Allvarliga reaktioner, såsom kraftig allergisk reaktion (ansiktssvullnad, kräkningar, svaghet), är mycket sällsynta men kräver omedelbar veterinärvård. Vi rekommenderar att du observerar husdjuret i 30 minuter efter vaccinationen på kliniken och resten av dagen hemma. Fördelarna med vaccinationer överstiger vida de små riskerna — ovaccinerade husdjur riskerar att drabbas av allvarliga, ofta livshotande sjukdomar.' },
        { heading: 'Vanliga frågor om vaccinationer', text: '<strong>Hur ofta förnyas vaccinationerna?</strong> Efter den första vaccinationsserien ges en boostervaccination efter ett år. Därefter förnyas grundvaccinationerna för vuxna hundar och katter vart 1–3 år beroende på vaccin. Rabiesvaccination förnyas vart 3:e år. Veterinären planerar ett individuellt vaccinationsprogram utifrån ditt husdjurs behov. <strong>Kan man rasta en ovaccinerad hund?</strong> En ovaccinerad valp löper större risk att drabbas av allvarliga smittsjukdomar som parvovirus. Under valpens första vaccinationsserie är det viktigt att undvika kontakt med okända hundar och platser där många hundar vistas. Säker utevistelse på egen gård eller rena områden kan utövas redan innan vaccinationsserien är klar.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Vaccinations — Eläinklinikka Saari, Vaasa',
      h1: 'Vaccinations',
      metaDesc: 'Dog and cat vaccinations in Vaasa. Puppy vaccination programme, booster vaccinations, rabies and travel documents. Book at Eläinklinikka Saari.',
      sections: [
        { heading: 'Why is vaccination important?', text: 'Vaccination is the most important form of preventive healthcare for pets. Vaccinations protect against serious diseases that can be life-threatening or even fatal. In Finland, the vaccination programme for dogs and cats is based on recommendations from the Finnish Veterinary Association.' },
        { heading: 'Dog vaccinations', text: 'Puppies receive their first vaccination at 12 weeks of age, with a booster at 16 weeks. The core vaccination includes protection against distemper, parvovirus, and hepatitis. Rabies vaccination is given from 12 weeks of age. Kennel cough vaccination is recommended for dogs that have frequent contact with other dogs. Adult dogs receive booster vaccinations every 1–3 years.' },
        { heading: 'Cat vaccinations', text: 'Kittens are vaccinated at 12 and 16 weeks of age. The core vaccination includes protection against feline panleukopenia, herpesvirus, and calicivirus. Rabies vaccination is mandatory for outdoor cats and all cats travelling abroad. Adult cats receive booster vaccinations every 1–3 years depending on the vaccine and the cat\'s lifestyle.' },
        { heading: 'Drop-in vaccinations and travel documents', text: 'Our clinic offers drop-in vaccinations without appointment on Tuesdays from 15:30 to 16:00. We also issue EU pet passports and travel documents for pets travelling abroad. Travel document requirements vary by destination country — please contact us well in advance of your trip.' },
        { heading: 'Puppy vaccination schedule step by step', text: 'The puppy\'s first vaccination series is crucial, as maternal antibody protection wanes at 8–12 weeks of age. A puppy is vaccinated at 12 weeks (distemper, parvovirus, hepatitis) and a booster is given at 16 weeks together with the rabies vaccine. A kitten is vaccinated at 12 weeks (feline panleukopenia, herpes, calici) and a booster at 16 weeks. The first-year booster is given at 12 months — an important milestone where long-lasting immunity is established. After that, vaccination intervals move to every 1–3 years.' },
        { heading: 'Travelling with your pet', text: 'A pet passport is mandatory for all dogs, cats, and ferrets travelling within the EU. Before travelling, your pet needs: a microchip for identification, a valid rabies vaccination (at least 21 days after the first vaccination) and, in some countries, echinococcus treatment (e.g. UK, Finland for import). Travelling outside the EU can involve much stricter requirements — a rabies antibody test and quarantine may be required. Start planning your trip at least 4–6 months in advance. We are happy to help with travel documentation.' },
        { heading: 'Vaccine safety and side effects', text: 'Vaccinations are among the safest procedures in veterinary medicine, but like all medical interventions they can occasionally cause mild reactions. Common and harmless side effects include mild lethargy, reduced appetite, or slight swelling at the injection site for 1–2 days. Serious reactions such as strong allergic responses (facial swelling, vomiting, weakness) are extremely rare but require immediate veterinary care. We recommend observing your pet for 30 minutes after the vaccination at the clinic and for the rest of the day at home. The benefits of vaccination far outweigh the small risks — unvaccinated pets are at risk of serious, often life-threatening diseases.' },
        { heading: 'Frequently asked questions about vaccinations', text: '<strong>How often are vaccinations renewed?</strong> After the initial vaccination series, a booster is given after one year. Thereafter, core vaccinations for adult dogs and cats are renewed every 1–3 years depending on the vaccine. Rabies vaccination is renewed every 3 years. The veterinarian will plan an individual vaccination programme based on your pet\'s needs. <strong>Can an unvaccinated dog be walked outside?</strong> An unvaccinated puppy has a higher risk of contracting serious infectious diseases such as parvovirus. During the puppy\'s first vaccination series, it is important to avoid contact with unknown dogs and places frequented by many dogs. Safe outdoor activity in your own garden or clean areas can be practised before the vaccination series is complete.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['rokotukset', 'kissaystävällinen-klinikka', 'yksityinen-klinikka'],
    schemaService: 'Veterinary Vaccination',
    faq: [
      { q: 'Paljonko koiran rokotus maksaa?', a: 'Koiran 4-rokotus (DHPPI) maksaa 77 € ja rabieslisällä 85 €. Kissan 3-rokotus (RCP) maksaa 75 € ja rabieslisällä 86 €.' },
      { q: 'Kuinka usein rokotukset uusitaan?', a: 'Perusrokotusten jälkeen tehosterokotus annetaan vuoden kuluttua. Sen jälkeen aikuisten koirien ja kissojen perusrokotukset uusitaan 1-3 vuoden välein rokotteesta riippuen. Rabiesrokotus uusitaan 3 vuoden välein.' },
      { q: 'Voiko tulla ilman ajanvarausta?', a: 'Kyllä! Tarjoamme walk-in-rokotukset ilman ajanvarausta tiistaisin klo 15:30-16:00. Muulloin varaa aika puhelimitse (06) 321 7300 tai verkosta saarivet.fi.' },
      { q: 'Milloin pentu voi aloittaa rokotussarjan?', a: 'Pennun ensimmäinen rokotus annetaan 12 viikon iässä ja tehosterokotus 16 viikon iässä. Ennen 12 viikon ikää pennut saavat suojaa emän antamista vasta-aineista. Jos pentu on tuotu ulkomailta tai erityisen riskialttiista ympäristöstä, rokotus voidaan joskus aloittaa aikaisemmin (8 viikon iässä) — tämä keskustellaan eläinlääkärin kanssa yksilöllisesti.' },
      { q: 'Voiko lemmikki saada rokotuksesta sivuvaikutuksia?', a: 'Lievät sivuvaikutukset ovat yleisiä ja harmittomia: väsymys, ruokahaluttomuus tai lievä turvotus pistoskohdassa 1–2 päivän ajan. Voimakkaat reaktiot (kasvojen turvotus, oksentelu, heikkous) ovat erittäin harvinaisia mutta vaativat välitöntä eläinlääkärin hoitoa. Suosittelemme seuraamaan lemmikkiä 30 minuuttia rokotuksen jälkeen klinikalla ja loppupäivän kotona.' },
      { q: 'Mitä rokotuksia tarvitaan matkustamiseen?', a: 'EU-maiden sisällä matkustaessa tarvitaan lemmikkieläinpassi, voimassa oleva rabiesrokotus (vähintään 21 päivää ensimmäisestä rokotuksesta) ja siru tunnistusta varten. Joissakin maissa (esim. Iso-Britannia) vaaditaan myös ekinokokki-lääkitys 1–5 päivää ennen saapumista. EU:n ulkopuolelle matkustaessa vaatimukset ovat usein tiukemmat — aloita valmistelu vähintään 4–6 kuukautta ennen matkaa.' },
    ]
  },
  {
    slug: 'ultraaani',
    slugSv: 'ultraljud',
    slugEn: 'ultrasound',
    title: 'Ultraäänitutkimukset — Eläinklinikka Saari, Vaasa',
    h1: 'Ultraäänitutkimukset',
    metaDesc: 'Ultraäänitutkimukset Vaasassa: vatsan ultraääni, sydämen ultraääni, tiineystutkimus. Laadukas diagnostiikka lemmikeille. Eläinklinikka Saari.',
    icon: '📡',
    sections: [
      { heading: 'Ultraääni diagnostiikan kulmakivenä', text: 'Ultraäänitutkimus on yksi eläinlääketieteen tärkeimmistä kuvantamismenetelmistä. Se on kivuton, ei-invasiivinen ja ei altista potilasta säteilylle. Tutkimus tehdään yleensä hereillä olevalle potilaalle — vain harva tarvitsee kevyen rauhoituksen.' },
      { heading: 'Vatsan ultraääni', text: 'Vatsan alueen ultraäänellä tutkitaan sisäelinten rakenne ja mahdolliset muutokset: maksa, perna, munuaiset, lisämunuaiset, virtsarakko, mahalaukku, suolisto, haima ja imusolmukkeet. Yleisiä indikaatioita ovat oksentelu, ripuli, painon lasku, virtsaamisongelmat, kasvainepäily ja yleisvoinnin lasku. Ultraääniohjatulla näytteenotolla voidaan ottaa koepalojen näytteitä suoraan muuttuneesta kudoksesta.' },
      { heading: 'Sydämen ultraääni', text: 'Sydämen ultraääni (ekokardiografia) on sydänsairauksien tärkein tutkimusmenetelmä. Tutkimuksessa arvioidaan sydämen kammioiden koko, seinämien paksuus, läppien toiminta ja verenvirtaus. Tutkimus on välttämätön sydänlääkityksen aloittamiselle ja seurannalle. Klinikallamme on viralliset oikeudet jalostukseen liittyviin sydämen ultraäänitutkimuksiin.' },
      { heading: 'Tiineystutkimus', text: 'Ultraäänellä voidaan todeta tiineys noin raskauspäivästä 24 alkaen. Tutkimuksella arvioidaan sikiöiden elinvoimaisuus ja kehitys. Röntgentutkimuksella voidaan arvioida pentujen lukumäärä tarkemmin raskauspäivästä 50 lähtien.' },
      { heading: 'Usein kysyttyä ultraäänitutkimuksista', text: '<strong>Tarvitaanko ultraäänitutkimukseen rauhoitusta?</strong> Valtaosa ultraäänitutkimuksista tehdään hereillä olevalle potilaalle ilman rauhoitusta. Tutkimus on kivuton — ainoa valmistelu on tutkimusalueen karvojen ajelu ja ultraäänigeeelin levittäminen iholle. Erityisen levottomille tai jännittyneille potilaille voidaan antaa kevyt rauhoitus. <strong>Kauanko ultraäänitutkimus kestää?</strong> Vatsan ultraäänitutkimus kestää yleensä 20–40 minuuttia riippuen löydöksistä ja tutkimuksen laajuudesta. Sydämen ultraääni vie noin 15–30 minuuttia. Tiineystutkimus on nopein ja kestää yleensä 10–15 minuuttia. Tulokset kerrotaan omistajalle heti tutkimuksen jälkeen.' },
    ],
    sv: {
      title: 'Ultraljud — Djurklinik Saari, Vasa',
      h1: 'Ultraljudsundersökningar',
      metaDesc: 'Ultraljudsundersökningar i Vasa: bukens ultraljud, hjärtultraljud, dräktighetsundersökning. Högkvalitativ diagnostik för husdjur. Eläinklinikka Saari.',
      sections: [
        { heading: 'Ultraljud som diagnostisk hörnsten', text: 'Ultraljudsundersökning är en av veterinärmedicinens viktigaste bilddiagnostiska metoder. Den är smärtfri, icke-invasiv och utsätter inte patienten för strålning. Undersökningen görs vanligen på en vaken patient — bara ett fåtal behöver lätt sedering.' },
        { heading: 'Bukens ultraljud', text: 'Med bukens ultraljud undersöks inre organs struktur och eventuella förändringar: lever, mjälte, njurar, binjurar, urinblåsa, magsäck, tarmar, bukspottkörtel och lymfknutor. Vanliga indikationer är kräkningar, diarré, viktnedgång, urineringsproblem, tumörmisstanke och nedsatt allmäntillstånd. Med ultraljudsledd provtagning kan biopsier tas direkt från förändrad vävnad.' },
        { heading: 'Hjärtultraljud', text: 'Hjärtultraljud (ekokardiografi) är den viktigaste undersökningsmetoden för hjärtsjukdomar. Undersökningen bedömer hjärtats kammarstorlek, väggars tjocklek, klaffarnas funktion och blodflöde. Undersökningen är nödvändig för att inleda och följa upp hjärtmedicinering. Vår klinik har officiella rättigheter för avelrelaterade hjärtultraljudsundersökningar.' },
        { heading: 'Dräktighetsundersökning', text: 'Med ultraljud kan dräktighet konstateras från ungefär dräktighetsdag 24. Undersökningen bedömer fosternas livskraft och utveckling. Med röntgenundersökning kan antalet valpar bedömas mer exakt från dräktighetsdag 50.' },
        { heading: 'Vanliga frågor om ultraljudsundersökningar', text: '<strong>Behövs sedering för ultraljudsundersökning?</strong> De flesta ultraljudsundersökningar görs på en vaken patient utan sedering. Undersökningen är smärtfri — den enda förberedelsen är rakning av undersökningsområdet och applicering av ultraljudsgel på huden. Särskilt oroliga eller spända patienter kan få lätt sedering. <strong>Hur lång tid tar en ultraljudsundersökning?</strong> Bukens ultraljudsundersökning tar vanligen 20–40 minuter beroende på fynd och undersökningens omfattning. Hjärtultraljud tar cirka 15–30 minuter. Dräktighetsundersökning är snabbast och tar vanligen 10–15 minuter. Resultaten meddelas ägaren direkt efter undersökningen.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Ultrasound — Eläinklinikka Saari, Vaasa',
      h1: 'Ultrasound Examinations',
      metaDesc: 'Ultrasound examinations in Vaasa: abdominal ultrasound, cardiac ultrasound, pregnancy scanning. Quality diagnostics for pets. Eläinklinikka Saari.',
      sections: [
        { heading: 'Ultrasound as a diagnostic cornerstone', text: 'Ultrasound is one of veterinary medicine\'s most important imaging methods. It is painless, non-invasive, and does not expose the patient to radiation. The examination is usually performed on an awake patient — only a few require light sedation.' },
        { heading: 'Abdominal ultrasound', text: 'Abdominal ultrasound examines the structure of internal organs and any changes: liver, spleen, kidneys, adrenal glands, bladder, stomach, intestines, pancreas, and lymph nodes. Common indications include vomiting, diarrhoea, weight loss, urination problems, suspected tumours, and general decline. Ultrasound-guided sampling allows biopsies to be taken directly from abnormal tissue.' },
        { heading: 'Cardiac ultrasound', text: 'Cardiac ultrasound (echocardiography) is the primary examination method for heart disease. The examination assesses chamber size, wall thickness, valve function, and blood flow. It is essential for initiating and monitoring cardiac medication. Our clinic has official rights for breeding-related cardiac ultrasound examinations.' },
        { heading: 'Pregnancy scanning', text: 'Ultrasound can confirm pregnancy from approximately day 24 of gestation. The examination assesses fetal viability and development. Radiography can more accurately estimate the number of puppies from day 50 of gestation.' },
        { heading: 'Frequently asked questions about ultrasound', text: '<strong>Is sedation needed for ultrasound?</strong> The majority of ultrasound examinations are performed on an awake patient without sedation. The examination is painless — the only preparation is shaving the examination area and applying ultrasound gel to the skin. Particularly restless or anxious patients may receive light sedation. <strong>How long does an ultrasound examination take?</strong> An abdominal ultrasound typically takes 20–40 minutes depending on findings and the scope of the examination. Cardiac ultrasound takes approximately 15–30 minutes. Pregnancy scanning is the quickest and usually takes 10–15 minutes. Results are communicated to the owner immediately after the examination.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['avoin-valtimotiehyt-pda', 'ibd-lymfooma', 'munuaisten-vajaatoiminta'],
    schemaService: 'Veterinary Ultrasound'
  },
  {
    slug: 'ihotaudit',
    slugSv: 'hudsjukdomar',
    slugEn: 'dermatology',
    title: 'Ihotaudit ja allergiat — Eläinklinikka Saari, Vaasa',
    h1: 'Ihotaudit ja allergiat',
    metaDesc: 'Koiran ja kissan ihotaudit ja allergiat Vaasassa. Allergiatestit, korvatulehdukset, kutina, ihotulehdukset. Diagnoosi ja hoito. Eläinklinikka Saari.',
    icon: '🔬',
    sections: [
      { heading: 'Yleisimmät iho-ongelmat', text: 'Ihotaudit ovat yksi yleisimmistä syistä hakeutua eläinlääkäriin. Joka kymmenennellä suomalaisella koiralla on allergioita, jotka usein oireilevat ihotulehduksina ja korvatulehduksina. Tyypillisiä oireita ovat tassujen nuoleminen, korvien raapiminen, kasvojen hankaaminen, vatsan alueen punoitus ja toistuva korvatulehdus.' },
      { heading: 'Allergian tutkiminen', text: 'Allergiaa epäiltäessä pyritään ensin poissulkemaan ruoka-aineet eliminaatiodieetillä. Jos ruoka-allergia suljetaan pois, kyseessä voi olla atooppinen ihottuma (ympäristöallergia). Tarvittaessa otetaan allergiaverinäytteet, joilla voidaan tunnistaa allergiaa aiheuttavat aineet. Iho- ja korvanäytteitä tutkitaan klinikan omassa laboratoriossa.' },
      { heading: 'Korvatulehdukset', text: 'Toistuvat korvatulehdukset liittyvät usein taustalla olevaan allergiaan. Klinikallamme on käytössä video-otoskopia, jolla korvaonteloa voidaan tutkia ja puhdistaa suurennetulla videokuvalla. Näkyvyys on moninkertainen perinteiseen tutkimukseen verrattuna, mikä mahdollistaa tehokkaamman hoidon.' },
      { heading: 'Hoitovaihtoehdot', text: 'Ihotautien hoito räätälöidään yksilöllisesti. Hoitoon voi kuulua eliminaatiodieetit, allergiaspesifinen immunoterapia (siedätyshoito), paikallishoidot, lääkitys ja ruokavaliomuutokset. Tavoitteena on löytää syy, ei vain lievittää oireita.' },
      { heading: 'Usein kysyttyä ihotaudeista', text: '<strong>Voiko allergiasta parantua?</strong> Allergia on krooninen sairaus, josta ei yleensä parannuta kokonaan. Hyvällä hoidolla oireet saadaan kuitenkin hallintaan ja lemmikin elämänlaatu pysyy hyvänä. Siedätyshoito (immunoterapia) voi vähentää allergian voimakkuutta merkittävästi — jopa 60–70 % potilaista hyötyy siedätyshoidosta. Hoito on pitkäkestoinen, mutta voi vähentää lääkityksen tarvetta pysyvästi. <strong>Kuinka nopeasti hoitovaste näkyy?</strong> Ihotautien hoitovaste riippuu diagnoosista. Bakteeri-ihotulehdus vastaa yleensä antibioottikuuriin 2–4 viikossa. Eliminaatiodieetti vaatii 6–8 viikon tiukan noudattamisen ennen kuin tuloksia voidaan arvioida. Siedätyshoito on hitain — ensimmäiset tulokset näkyvät usein vasta 6–12 kuukauden kuluessa.' },
    ],
    sv: {
      title: 'Hudsjukdomar och allergier — Djurklinik Saari, Vasa',
      h1: 'Hudsjukdomar och allergier',
      metaDesc: 'Hudsjukdomar och allergier hos hund och katt i Vasa. Allergitester, öroninflammationer, klåda, hudinfektioner. Diagnos och behandling. Eläinklinikka Saari.',
      sections: [
        { heading: 'De vanligaste hudproblemen', text: 'Hudsjukdomar är en av de vanligaste orsakerna till veterinärbesök. Var tionde finsk hund har allergier som ofta yttrar sig som hudinfektioner och öroninflammationer. Typiska symtom är slickande av tassar, klösande av öron, gnuggande av ansiktet, rodnad på buken och återkommande öroninflammation.' },
        { heading: 'Allergiutredning', text: 'Vid misstanke om allergi försöker man först utesluta livsmedel med eliminationsdiet. Om födoämnesallergi utesluts kan det vara atopisk dermatit (miljöallergi). Vid behov tas allergiblodprov för att identifiera allergiframkallande ämnen. Hud- och öronprov undersöks i klinikens eget laboratorium.' },
        { heading: 'Öroninflammationer', text: 'Återkommande öroninflammationer hänger ofta samman med en underliggande allergi. Vår klinik använder video-otoskopi, som gör det möjligt att undersöka och rengöra hörselgången med förstorad videobild. Sikten är mångdubbelt bättre jämfört med traditionell undersökning, vilket möjliggör effektivare behandling.' },
        { heading: 'Behandlingsalternativ', text: 'Behandlingen av hudsjukdomar skräddarsys individuellt. Behandlingen kan inkludera eliminationsdieter, allergenspecifik immunterapi (hyposensibilisering), lokalbehandlingar, medicinering och kostförändringar. Målet är att hitta orsaken, inte bara lindra symtomen.' },
        { heading: 'Vanliga frågor om hudsjukdomar', text: '<strong>Kan man bli av med allergi?</strong> Allergi är en kronisk sjukdom som vanligen inte kan botas helt. Med god behandling kan symtomen dock kontrolleras och husdjurets livskvalitet förbli god. Hyposensibilisering (immunterapi) kan minska allergins intensitet avsevärt — upp till 60–70 % av patienterna drar nytta av behandlingen. Behandlingen är långvarig men kan minska behovet av medicinering permanent. <strong>Hur snabbt syns behandlingsresultat?</strong> Behandlingssvaret vid hudsjukdomar beror på diagnosen. Bakteriell hudinfektion svarar vanligen på antibiotikakur inom 2–4 veckor. Eliminationsdiet kräver 6–8 veckors strikt efterlevnad innan resultat kan bedömas. Hyposensibilisering är långsammast — de första resultaten syns ofta först efter 6–12 månader.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Dermatology — Eläinklinikka Saari, Vaasa',
      h1: 'Skin Diseases and Allergies',
      metaDesc: 'Dog and cat dermatology and allergies in Vaasa. Allergy testing, ear infections, itching, skin infections. Diagnosis and treatment. Eläinklinikka Saari.',
      sections: [
        { heading: 'The most common skin problems', text: 'Skin diseases are one of the most common reasons for veterinary visits. One in ten Finnish dogs has allergies, which often manifest as skin infections and ear infections. Typical symptoms include paw licking, ear scratching, face rubbing, redness on the belly, and recurrent ear infections.' },
        { heading: 'Allergy investigation', text: 'When allergy is suspected, food allergens are first ruled out with an elimination diet. If food allergy is excluded, atopic dermatitis (environmental allergy) may be the cause. Allergy blood tests can be taken to identify allergens if needed. Skin and ear samples are examined in the clinic\'s own laboratory.' },
        { heading: 'Ear infections', text: 'Recurrent ear infections are often linked to an underlying allergy. Our clinic uses video otoscopy, which enables examination and cleaning of the ear canal with magnified video imaging. Visibility is many times greater compared to traditional examination, enabling more effective treatment.' },
        { heading: 'Treatment options', text: 'Treatment of skin diseases is individually tailored. Treatment may include elimination diets, allergen-specific immunotherapy (desensitisation), topical treatments, medication, and dietary changes. The goal is to find the cause, not just relieve symptoms.' },
        { heading: 'Frequently asked questions about skin diseases', text: '<strong>Can allergies be cured?</strong> Allergy is a chronic condition that usually cannot be completely cured. However, with good management, symptoms can be controlled and your pet\'s quality of life maintained. Allergen-specific immunotherapy (desensitisation) can significantly reduce the severity of allergies — up to 60–70% of patients benefit from the treatment. The treatment is long-term but can permanently reduce the need for medication. <strong>How quickly do treatment results appear?</strong> Treatment response for skin diseases depends on the diagnosis. Bacterial skin infections typically respond to antibiotic treatment within 2–4 weeks. An elimination diet requires 6–8 weeks of strict adherence before results can be assessed. Immunotherapy is the slowest — initial results often appear only after 6–12 months.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['ruoka-allergiat', 'video-otoskopia', 'viljaton-ruoka'],
    schemaService: 'Veterinary Dermatology'
  },
  {
    slug: 'senioritarkastus',
    slugSv: 'seniorundersokning',
    slugEn: 'senior-check-up',
    title: 'Senioritarkastus — Eläinklinikka Saari, Vaasa',
    h1: 'Senioritarkastus',
    metaDesc: 'Ikääntyvän lemmikin terveystarkastus Vaasassa. Verikokeet, sydäntutkimus, ultraääni. Varhainen diagnoosi pidentää elinikää. Eläinklinikka Saari.',
    icon: '🩺',
    sections: [
      { heading: 'Milloin lemmikki on seniori?', text: 'Koirat ovat senioreita noin 7-vuotiaina (suuret rodut jo 5-6-vuotiaina) ja kissat noin 10-vuotiaina. Ikääntyessä monet sairaudet kehittyvät hitaasti ja huomaamattomasti — munuaisten vajaatoiminta, kilpirauhasen liikatoiminta, sydänsairaudet ja nivelvauriot voivat edetä pitkälle ennen kuin omistaja huomaa oireita.' },
      { heading: 'Mitä senioritarkastukseen kuuluu?', text: 'Senioritarkastuksessa eläinlääkäri tutkii lemmikin kliinisesti päästä varpaisiin, kuuntelee sydäntä ja keuhkoja, tunnustelee vatsan ja imusolmukkeet. Verikokeet kertovat munuaisten, maksan ja kilpirauhasen toiminnasta. Virtsanäytteellä voidaan havaita varhaisia munuaismuutoksia. Tarvittaessa tehdään verenpaineen mittaus, sydämen ultraääni tai vatsan ultraääni.' },
      { heading: 'Miksi säännöllinen tarkastus on tärkeää?', text: 'Säännöllisellä senioritarkastuksella sairaudet havaitaan varhaisessa vaiheessa, jolloin hoito on tehokkaampaa ja lemmikin elämänlaatu säilyy pidempään. Esimerkiksi munuaisten vajaatoiminnan varhainen toteaminen mahdollistaa ruokavalion ja lääkityksen aloittamisen ajoissa, mikä voi pidentää elinikää vuosilla.' },
      { heading: 'Kuinka usein tarkastukseen?', text: 'Suosittelemme senioritarkastusta kerran vuodessa terveille ikääntyville lemmikeille. Jos lemmikillä on krooninen sairaus tai lääkitys, tarkempi seurantaväli sovitaan yksilöllisesti. Varaa aika senioritarkastukseen — se on parasta ennaltaehkäisevää hoitoa ikääntyvälle lemmikillesi.' },
      { heading: 'Usein kysyttyä senioritarkastuksesta', text: '<strong>Kuinka usein senioritarkastus tehdään?</strong> Terveelle ikääntyvälle lemmikille suositellaan senioritarkastusta kerran vuodessa. Suurikokoisille koiraroduille tarkastukset voidaan aloittaa jo 5–6 vuoden iässä, pienemmille roduille noin 7-vuotiaana ja kissoille noin 10-vuotiaana. Jos lemmikillä on krooninen sairaus tai lääkitys, seurantaväli voi olla tiiviimpi — esimerkiksi puolivuosittain. <strong>Mitä verikokeet kertovat?</strong> Senioritarkastuksen verikokeet paljastavat munuaisten, maksan ja kilpirauhasen toiminnan muutokset usein jo ennen kuin näkyviä oireita ilmenee. Verinäytteestä mitataan mm. kreatiniini ja SDMA (munuaiset), ALAT ja ALP (maksa), T4 (kilpirauhanen) sekä verenkuva. Varhainen diagnoosi mahdollistaa hoidon aloittamisen ajoissa, mikä voi pidentää lemmikin elinikää merkittävästi.' },
    ],
    sv: {
      title: 'Seniorundersökning — Djurklinik Saari, Vasa',
      h1: 'Seniorundersökning',
      metaDesc: 'Hälsokontroll för äldre husdjur i Vasa. Blodprov, hjärtundersökning, ultraljud. Tidig diagnos förlänger livslängden. Boka tid hos Eläinklinikka Saari.',
      sections: [
        { heading: 'När är ett husdjur senior?', text: 'Hundar är seniorer vid cirka 7 års ålder (stora raser redan vid 5–6 år) och katter vid cirka 10 års ålder. Med åldern utvecklas många sjukdomar långsamt och obemärkt — njursvikt, sköldkörtelöverfunktion, hjärtsjukdomar och ledskador kan fortskrida långt innan ägaren märker symtom.' },
        { heading: 'Vad ingår i seniorundersökningen?', text: 'Vid seniorundersökningen undersöker veterinären husdjuret kliniskt från huvud till tå, lyssnar på hjärta och lungor, palperar buken och lymfknutorna. Blodprov berättar om njurarnas, leverns och sköldkörtelns funktion. Urinprov kan avslöja tidiga njurförändringar. Vid behov görs blodtrycksmätning, hjärtultraljud eller bukultraljud.' },
        { heading: 'Varför är regelbunden kontroll viktigt?', text: 'Med regelbundna seniorundersökningar upptäcks sjukdomar i ett tidigt skede, då behandlingen är effektivare och husdjurets livskvalitet bevaras längre. Till exempel möjliggör tidig upptäckt av njursvikt att kost och medicinering kan påbörjas i tid, vilket kan förlänga livslängden med år.' },
        { heading: 'Hur ofta bör man undersökas?', text: 'Vi rekommenderar seniorundersökning en gång om året för friska äldre husdjur. Om husdjuret har en kronisk sjukdom eller medicinering, bestäms ett tätare uppföljningsintervall individuellt. Boka tid för seniorundersökning — det är den bästa förebyggande vården för ditt äldre husdjur.' },
        { heading: 'Vanliga frågor om seniorundersökning', text: '<strong>Hur ofta görs seniorundersökning?</strong> För friska äldre husdjur rekommenderas seniorundersökning en gång om året. För stora hundraser kan undersökningarna påbörjas redan vid 5–6 års ålder, för mindre raser vid cirka 7 år och för katter vid cirka 10 år. Om husdjuret har en kronisk sjukdom eller medicinering kan uppföljningsintervallet vara tätare — till exempel halvårsvis. <strong>Vad berättar blodproven?</strong> Blodproven vid seniorundersökning avslöjar förändringar i njurarnas, leverns och sköldkörtelns funktion ofta redan innan synliga symtom uppträder. Från blodprovet mäts bl.a. kreatinin och SDMA (njurar), ALAT och ALP (lever), T4 (sköldkörtel) samt blodstatus. Tidig diagnos möjliggör behandlingsstart i tid, vilket kan förlänga husdjurets livslängd avsevärt.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Senior Pet Check-up — Eläinklinikka Saari, Vaasa',
      h1: 'Senior Pet Check-up',
      metaDesc: 'Health check-up for ageing pets in Vaasa. Blood tests, cardiac examination, ultrasound. Early diagnosis extends lifespan. Book at Eläinklinikka Saari.',
      sections: [
        { heading: 'When is a pet a senior?', text: 'Dogs are seniors at around 7 years of age (large breeds as early as 5–6 years) and cats at around 10 years. As pets age, many diseases develop slowly and unnoticed — kidney failure, hyperthyroidism, heart disease, and joint damage can progress significantly before the owner notices symptoms.' },
        { heading: 'What does the senior check-up include?', text: 'During the senior check-up, the veterinarian examines the pet clinically from head to toe, listens to the heart and lungs, and palpates the abdomen and lymph nodes. Blood tests assess kidney, liver, and thyroid function. A urine sample can detect early kidney changes. Blood pressure measurement, cardiac ultrasound, or abdominal ultrasound are performed as needed.' },
        { heading: 'Why are regular check-ups important?', text: 'With regular senior check-ups, diseases are detected at an early stage when treatment is more effective and quality of life is preserved longer. For example, early detection of kidney failure allows diet and medication to be started in time, which can extend lifespan by years.' },
        { heading: 'How often should check-ups be done?', text: 'We recommend a senior check-up once a year for healthy ageing pets. If your pet has a chronic disease or medication, a more frequent follow-up interval is agreed individually. Book a senior check-up appointment — it is the best preventive care for your ageing pet.' },
        { heading: 'Frequently asked questions about senior check-ups', text: '<strong>How often is a senior check-up performed?</strong> For healthy ageing pets, a senior check-up is recommended once a year. For large dog breeds, check-ups can begin as early as 5–6 years of age, for smaller breeds at around 7 years, and for cats at around 10 years. If your pet has a chronic disease or is on medication, the follow-up interval may be more frequent — for example, every six months. <strong>What do blood tests reveal?</strong> Blood tests during a senior check-up detect changes in kidney, liver, and thyroid function often before visible symptoms appear. The blood sample measures creatinine and SDMA (kidneys), ALT and ALP (liver), T4 (thyroid), and a complete blood count. Early diagnosis enables timely treatment, which can significantly extend your pet\'s lifespan.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['munuaisten-vajaatoiminta', 'kilpirauhasen-liikatoiminta', 'rokotukset'],
    schemaService: 'Senior Pet Health Screening'
  },
  {
    slug: 'pentutarkastus',
    slugSv: 'valpundersokning',
    slugEn: 'puppy-check-up',
    title: 'Pentutarkastus ja mikrosiru — Eläinklinikka Saari, Vaasa',
    h1: 'Pentutarkastus',
    metaDesc: 'Koiranpennun ja kissanpennun terveystarkastus Vaasassa. Pentutarkastus, mikrosiru, rokotusohjelma, madotus. Eläinklinikka Saari.',
    icon: '🐕',
    sections: [
      { heading: 'Ensimmäinen käynti eläinlääkärillä', text: 'Pentutarkastus on tärkeä askel uuden perheenjäsenen elämässä. Eläinlääkäri tutkii pennun huolellisesti päästä varpaisiin: sydämen kuuntelu, silmien, korvien ja suun tarkastus, imusolmukkeiden tunnustelu, navan tarkastus ja yleisen kehityksen arviointi. Tarkastuksen yhteydessä annetaan terveystodistus.' },
      { heading: 'Mikrosiru — pysyvä tunnistus', text: 'Mikrosiru on riisinjyvän kokoinen tunniste, joka asetetaan ihon alle niskaan. Siruttaminen on nopea ja lähes kivuton toimenpide. Mikrosiru on ainoa pysyvä tunnistustapa — tatuoinnit haalistuvat ja pannat voivat kadota. Siru rekisteröidään omistajan tietoihin, jolloin kadonnut lemmikki löytää helposti takaisin kotiin.' },
      { heading: 'Pennun rokotusohjelma', text: 'Ensimmäinen rokotus annetaan yleensä 12 viikon iässä ja tehosterokotus 16 viikon iässä. Rokotukset suojaavat vakavien tautien kuten penikkataudin, parvoviruksen ja rabieksen varalta. Ennen rokotussuojan valmistumista pentu ei saisi olla kosketuksissa tuntemattomien koirien kanssa.' },
      { heading: 'Madotus ja loisten ehkäisy', text: 'Pennut madotetaan säännöllisesti sisäloisia vastaan. Eläinlääkäri laatii yksilöllisen madotus- ja loistorjuntaohjelman pennun iän, painon ja elinolosuhteiden mukaan. Varaa aika pentutarkastukseen — hyvä alku turvaa lemmikin terveyden pitkälle tulevaisuuteen.' },
      { heading: 'Usein kysyttyä pentutarkastuksesta', text: '<strong>Missä iässä pentu tulee tarkastaa?</strong> Pentutarkastus suositellaan tehtäväksi mahdollisimman pian uuden pennun kotiutumisen jälkeen, yleensä 8–12 viikon iässä. Ensimmäinen käynti on tärkeä, jotta mahdolliset synnynnäiset viat (kuten sydänviat, napanuoran ongelmat tai purentavirheet) havaitaan ajoissa. Samalla aloitetaan rokotusohjelma ja siruttaminen. <strong>Mitä pentutarkastukseen kuuluu?</strong> Pentutarkastus sisältää kattavan kliinisen tutkimuksen: sydämen kuuntelu sivuäänien varalta, silmien, korvien ja suun tarkastus, imusolmukkeiden tunnustelu, navan tarkastus ja yleisen kehityksen arviointi. Eläinlääkäri tarkastaa myös purennan ja kivesten laskeutumisen urospennuilla. Tarkastuksen yhteydessä annetaan terveystodistus, keskustellaan ruokinnasta, madotuksesta ja rokotusaikataulusta.' },
    ],
    sv: {
      title: 'Valpundersökning och mikrochip — Djurklinik Saari, Vasa',
      h1: 'Valpundersökning',
      metaDesc: 'Hälsokontroll för hund- och kattungar i Vasa. Valpundersökning, mikrochip, vaccinationsprogram, avmaskning. Boka tid hos Eläinklinikka Saari.',
      sections: [
        { heading: 'Första besöket hos veterinären', text: 'Valpundersökning är ett viktigt steg i den nya familjemedlemmens liv. Veterinären undersöker valpen noggrant från huvud till tå: hjärtauskultation, kontroll av ögon, öron och mun, palpation av lymfknutor, kontroll av naveln och bedömning av den allmänna utvecklingen. I samband med undersökningen utfärdas ett hälsointyg.' },
        { heading: 'Mikrochip — permanent identifiering', text: 'Ett mikrochip är en identifikationsmarkör i storlek av ett riskorn som placeras under huden i nacken. Chipningen är en snabb och nästan smärtfri procedur. Mikrochip är det enda permanenta identifieringssättet — tatueringar bleknar och halsband kan försvinna. Chipet registreras med ägarens uppgifter, så att ett försvunnet husdjur lätt hittar hem.' },
        { heading: 'Valpens vaccinationsprogram', text: 'Den första vaccinationen ges vanligen vid 12 veckors ålder och en boostervaccination vid 16 veckors ålder. Vaccinationerna skyddar mot allvarliga sjukdomar som valpsjuka, parvovirus och rabies. Innan vaccinationsskyddet är fullständigt bör valpen inte vara i kontakt med okända hundar.' },
        { heading: 'Avmaskning och parasitförebyggande', text: 'Valpar avmaskas regelbundet mot inre parasiter. Veterinären utarbetar ett individuellt avmasknings- och parasitbekämpningsprogram baserat på valpens ålder, vikt och levnadsförhållanden. Boka tid för valpundersökning — en bra start tryggar husdjurets hälsa långt in i framtiden.' },
        { heading: 'Vanliga frågor om valpundersökning', text: '<strong>Vid vilken ålder bör valpen undersökas?</strong> Valpundersökning rekommenderas så snart som möjligt efter att den nya valpen kommit hem, vanligen vid 8–12 veckors ålder. Det första besöket är viktigt för att upptäcka eventuella medfödda defekter (som hjärtfel, navelproblem eller bettfel) i tid. Samtidigt påbörjas vaccinationsprogrammet och chipning. <strong>Vad ingår i valpundersökningen?</strong> Valpundersökningen inkluderar en omfattande klinisk undersökning: hjärtauskultation för att kontrollera blåsljud, kontroll av ögon, öron och mun, palpation av lymfknutor, kontroll av naveln och bedömning av den allmänna utvecklingen. Veterinären kontrollerar även bettet och testikelnedstigningen hos hanvalpar. I samband med undersökningen utfärdas ett hälsointyg och man diskuterar utfodring, avmaskning och vaccinationsschema.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Puppy Check-up and Microchip — Eläinklinikka Saari, Vaasa',
      h1: 'Puppy Check-up',
      metaDesc: 'Puppy and kitten health check in Vaasa. Health examination, microchipping, vaccination programme, deworming. Book at Eläinklinikka Saari.',
      sections: [
        { heading: 'First visit to the vet', text: 'The puppy check-up is an important step in your new family member\'s life. The veterinarian examines the puppy carefully from head to toe: heart auscultation, examination of eyes, ears, and mouth, lymph node palpation, umbilical check, and assessment of overall development. A health certificate is issued during the examination.' },
        { heading: 'Microchip — permanent identification', text: 'A microchip is a rice-grain-sized identifier placed under the skin at the back of the neck. Microchipping is a quick and virtually painless procedure. A microchip is the only permanent form of identification — tattoos fade and collars can be lost. The chip is registered with the owner\'s details, so a lost pet can easily find its way home.' },
        { heading: 'Puppy vaccination programme', text: 'The first vaccination is usually given at 12 weeks of age, with a booster at 16 weeks. Vaccinations protect against serious diseases such as distemper, parvovirus, and rabies. Before vaccination protection is complete, the puppy should not be in contact with unknown dogs.' },
        { heading: 'Deworming and parasite prevention', text: 'Puppies are dewormed regularly against internal parasites. The veterinarian creates an individual deworming and parasite control programme based on the puppy\'s age, weight, and living conditions. Book a puppy check-up — a good start ensures your pet\'s health far into the future.' },
        { heading: 'Frequently asked questions about puppy check-ups', text: '<strong>At what age should a puppy be checked?</strong> A puppy check-up is recommended as soon as possible after bringing a new puppy home, usually at 8–12 weeks of age. The first visit is important to detect any congenital defects (such as heart defects, umbilical problems, or bite abnormalities) early. At the same time, the vaccination programme and microchipping are started. <strong>What does the puppy check-up include?</strong> The puppy check-up includes a comprehensive clinical examination: heart auscultation for murmurs, examination of eyes, ears, and mouth, lymph node palpation, umbilical check, and assessment of overall development. The veterinarian also checks the bite and testicular descent in male puppies. A health certificate is issued during the visit, and feeding, deworming, and vaccination schedule are discussed.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['rokotukset', 'kissaystävällinen-klinikka', 'ripuli'],
    schemaService: 'Puppy Health Examination'
  },
  {
    slug: 'akupunktio',
    slugSv: 'akupunktur',
    slugEn: 'acupuncture',
    title: 'Akupunktio — Eläinklinikka Saari, Vaasa',
    h1: 'Akupunktio',
    metaDesc: 'Eläinakupunktio Vaasassa. Kivunlievitys, tuki- ja liikuntaelinvaivat, neurologiset oireet. Jatkokouluttautunut eläinlääkäri. Eläinklinikka Saari.',
    icon: '🪡',
    sections: [
      { heading: 'Mitä eläinakupunktio on?', text: 'Akupunktio on tuhansia vuosia vanha hoitomuoto, jossa ohuita neuloja asetetaan tiettyihin pisteisiin kehossa. Eläinlääketieteessä akupunktiota käytetään erityisesti kivunlievitykseen, tuki- ja liikuntaelinvaivoihin sekä neurologisten oireiden hoitoon. Hoito perustuu hermostimulaatioon, joka vapauttaa kehon omia kipua lievittäviä aineita.' },
      { heading: 'Milloin akupunktiosta on hyötyä?', text: 'Akupunktio soveltuu erityisesti kroonisen kivun hoitoon, nivelrikon oireiden lievitykseen, selkäkipuihin, välilevyongelmiin, leikkauksen jälkeiseen kuntoutukseen ja neurologisiin oireisiin. Se toimii hyvin yhdessä muun lääkehoidon kanssa ja voi vähentää kipulääkkeiden tarvetta.' },
      { heading: 'Miten hoito etenee?', text: 'Hoitokäynti kestää noin 30-45 minuuttia. Ohuet neulat asetetaan akupunktiopisteisiin ja ne jätetään paikoilleen 15-20 minuutiksi. Useimmat eläimet rentoutuvat hoidon aikana ja voivat jopa nukahtaa. Vaste nähdään tyypillisesti 3-4 hoitokerran jälkeen, ja hoidon tehoa ylläpidetään säännöllisin välein.' },
      { heading: 'Koulutus ja kokemus', text: 'Klinikallamme akupunktiota tekee Assaf Wydra, joka on jatkokouluttautunut koirien ja hevosten akupunktiossa. Koulutus sisältää sekä perinteisen kiinalaisen lääketieteen periaatteet että modernin eläinlääketieteellisen akupunktion.' },
      { heading: 'Usein kysyttyä akupunktiosta', text: '<strong>Kuinka monta hoitokertaa tarvitaan?</strong> Tyypillisesti akupunktion vaikutus nähdään 3–4 hoitokerran jälkeen. Akuuteissa kiputiloissa helpotus voi tulla jo ensimmäisen hoidon jälkeen. Kroonisissa tiloissa, kuten nivelrikossa, hoitoja annetaan aluksi viikoittain ja ylläpitovaiheessa 2–6 viikon välein. Hoitosuunnitelma laaditaan yksilöllisesti potilaan vasteen mukaan. <strong>Onko akupunktio kivuliasta?</strong> Akupunktio on useimmille eläimille lähes kivuton kokemus. Neulat ovat erittäin ohuita ja niiden asettaminen aiheuttaa korkeintaan lievän tuntemuksen. Useimmat potilaat rentoutuvat hoidon aikana selvästi — monet jopa nukahtavat. Akupunktio ei vaadi rauhoitusta eikä anestesiaa, ja normaaliin arkeen voi palata heti hoidon jälkeen.' },
    ],
    sv: {
      title: 'Akupunktur — Djurklinik Saari, Vasa',
      h1: 'Akupunktur',
      metaDesc: 'Veterinärakupunktur i Vasa. Smärtlindring, muskuloskeletala besvär, neurologiska symtom. Vidareutbildad veterinär. Eläinklinikka Saari.',
      sections: [
        { heading: 'Vad är veterinärakupunktur?', text: 'Akupunktur är en tusenårig behandlingsform där tunna nålar placeras i specifika punkter på kroppen. Inom veterinärmedicin används akupunktur särskilt för smärtlindring, muskuloskeletala besvär och behandling av neurologiska symtom. Behandlingen bygger på nervstimulering som frigör kroppens egna smärtlindrande ämnen.' },
        { heading: 'När är akupunktur till nytta?', text: 'Akupunktur lämpar sig särskilt för behandling av kronisk smärta, lindring av artrossymtom, ryggsmärtor, diskproblem, rehabilitering efter operation och neurologiska symtom. Den fungerar bra tillsammans med annan läkemedelsbehandling och kan minska behovet av smärtstillande medel.' },
        { heading: 'Hur går behandlingen till?', text: 'Ett behandlingsbesök varar cirka 30–45 minuter. Tunna nålar placeras i akupunkturpunkterna och lämnas på plats i 15–20 minuter. De flesta djur slappnar av under behandlingen och kan till och med somna. Effekt ses typiskt efter 3–4 behandlingar, och behandlingseffekten upprätthålls med regelbundna intervall.' },
        { heading: 'Utbildning och erfarenhet', text: 'På vår klinik utför Assaf Wydra akupunktur. Han har vidareutbildning i akupunktur för hundar och hästar. Utbildningen omfattar både traditionell kinesisk medicins principer och modern veterinärmedicinsk akupunktur.' },
        { heading: 'Vanliga frågor om akupunktur', text: '<strong>Hur många behandlingar behövs?</strong> Vanligtvis ses effekten av akupunktur efter 3–4 behandlingar. Vid akuta smärttillstånd kan lindring komma redan efter första behandlingen. Vid kroniska tillstånd som artros ges behandlingar inledningsvis varje vecka och i underhållsfasen var 2–6 vecka. Behandlingsplanen upprättas individuellt utifrån patientens respons. <strong>Är akupunktur smärtsamt?</strong> Akupunktur är en nästan smärtfri upplevelse för de flesta djur. Nålarna är extremt tunna och deras insättning orsakar som mest en lätt känsla. De flesta patienter slappnar av tydligt under behandlingen — många somnar till och med. Akupunktur kräver varken sedering eller anestesi, och normal vardag kan återupptas direkt efter behandlingen.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Acupuncture — Eläinklinikka Saari, Vaasa',
      h1: 'Acupuncture',
      metaDesc: 'Veterinary acupuncture in Vaasa. Pain relief, musculoskeletal conditions, neurological symptoms. Specially trained veterinarian. Eläinklinikka Saari.',
      sections: [
        { heading: 'What is veterinary acupuncture?', text: 'Acupuncture is a thousands-of-years-old treatment in which thin needles are placed at specific points on the body. In veterinary medicine, acupuncture is used especially for pain relief, musculoskeletal conditions, and treatment of neurological symptoms. The treatment is based on nerve stimulation that releases the body\'s own pain-relieving substances.' },
        { heading: 'When is acupuncture beneficial?', text: 'Acupuncture is particularly suited for treating chronic pain, relieving osteoarthritis symptoms, back pain, disc problems, post-surgical rehabilitation, and neurological symptoms. It works well alongside other medication and can reduce the need for pain relief drugs.' },
        { heading: 'How does treatment work?', text: 'A treatment session lasts approximately 30–45 minutes. Thin needles are placed at acupuncture points and left in place for 15–20 minutes. Most animals relax during treatment and may even fall asleep. A response is typically seen after 3–4 treatments, and the therapeutic effect is maintained at regular intervals.' },
        { heading: 'Training and experience', text: 'At our clinic, acupuncture is performed by Assaf Wydra, who has advanced training in acupuncture for dogs and horses. The training covers both traditional Chinese medicine principles and modern veterinary acupuncture.' },
        { heading: 'Frequently asked questions about acupuncture', text: '<strong>How many treatment sessions are needed?</strong> Typically, the effect of acupuncture is seen after 3–4 treatments. In acute pain conditions, relief may come after the first treatment. For chronic conditions such as osteoarthritis, treatments are given weekly initially and every 2–6 weeks during the maintenance phase. The treatment plan is tailored individually based on the patient\'s response. <strong>Is acupuncture painful?</strong> Acupuncture is a virtually painless experience for most animals. The needles are extremely thin and their insertion causes at most a mild sensation. Most patients visibly relax during treatment — many even fall asleep. Acupuncture requires neither sedation nor anaesthesia, and normal daily life can resume immediately after treatment.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['anestesiaturvallisuus', 'kipulääkeinfuusio', 'yksityinen-klinikka'],
    schemaService: 'Veterinary Acupuncture'
  },
  {
    slug: 'viralliset-tutkimukset',
    slugSv: 'officiella-undersokningar',
    slugEn: 'official-examinations',
    title: 'Viralliset tutkimukset — Eläinklinikka Saari, Vaasa',
    h1: 'Viralliset tutkimukset',
    metaDesc: 'Viralliset lonkka-, kyynär-, polvi- ja sydäntutkimukset Vaasassa. Kennelliiton hyväksymä tutkija. Jalostustarkastukset. Eläinklinikka Saari.',
    icon: '📋',
    sections: [
      { heading: 'Viralliset röntgentutkimukset', text: 'Klinikallamme tehdään Suomen Kennelliiton hyväksymiä virallisia röntgentutkimuksia: lonkka-, kyynär- ja selkäkuvaukset. Viralliset röntgenkuvat lähetetään Kennelliiton arvostelijalle ja tulokset kirjataan Jalostustietojärjestelmään. Tutkimukset tehdään kevyessä rauhoituksessa oikean asennon varmistamiseksi.' },
      { heading: 'Polvi- ja sydäntutkimukset', text: 'Viralliset polvitutkimukset tehdään kliinisesti ilman rauhoitusta. Klinikalla on myös viralliset sydämen auskultaatio-oikeudet — kuuntelututkimuksella arvioidaan, onko koiralla sydämen sivuääniä. Nämä tutkimukset ovat osa monen rodun jalostustarkastuksia.' },
      { heading: 'Kenelle viralliset tutkimukset?', text: 'Viralliset tutkimukset ovat pakollisia tai suositeltuja jalostuskoirille rodusta riippuen. Tutkimusten tavoitteena on vähentää perinnöllisten sairauksien esiintyvyyttä roduissa. Tutkimukset voidaan tehdä aikaisintaan 12 kuukauden iässä (lonkat 18 kk iässä) ja ne ovat voimassa koko koiran eliniän.' },
      { heading: 'Ajanvaraus ja lisätiedot', text: 'Viralliset tutkimukset vaativat etukäteisvarauksen, sillä ne edellyttävät rauhoitusta ja riittävästi aikaa laadukkaiden kuvien ottamiseen. Ota yhteyttä klinikkaan sopiaksesi tutkimusajan — kerromme mielellämme tarkemmin, mitä tutkimuksia koirasi rodulle suositellaan.' },
      { heading: 'Usein kysyttyä virallisista tutkimuksista', text: '<strong>Missä iässä viralliset tutkimukset tehdään?</strong> Viralliset lonkkaröntgenkuvat otetaan aikaisintaan 18 kuukauden iässä ja kyynärröntgenkuvat 12 kuukauden iässä. Polvitutkimukset voidaan tehdä 12 kuukauden iästä alkaen. Sydämen auskultaatio voidaan tehdä jo aikaisemmin, mutta jalostuskäyttöön hyväksytty tutkimus edellyttää yleensä vähintään 12 kuukauden ikää. On tärkeää tarkistaa rotukohtaiset vaatimukset Kennelliiton sivuilta. <strong>Kuinka kauan tulokset ovat voimassa?</strong> Viralliset röntgentutkimustulokset ovat voimassa koiran koko eliniän — niitä ei tarvitse uusia. Sydämen auskultaatiotulokset ovat voimassa rodusta riippuen 1–2 vuotta. Polvitutkimuksen tulos on pysyvä. Tulokset kirjataan Kennelliiton Jalostustietojärjestelmään, jossa ne ovat julkisesti nähtävissä.' },
    ],
    sv: {
      title: 'Officiella undersökningar — Djurklinik Saari, Vasa',
      h1: 'Officiella undersökningar',
      metaDesc: 'Officiella höft-, armbågs-, knä- och hjärtundersökningar i Vasa. Godkänd av Finska Kennelklubben. Avelskontroller. Eläinklinikka Saari.',
      sections: [
        { heading: 'Officiella röntgenundersökningar', text: 'På vår klinik utförs officiella röntgenundersökningar godkända av Finska Kennelklubben: höft-, armbågs- och ryggröntgen. Officiella röntgenbilder skickas till Kennelklubbens granskare och resultaten registreras i Avelsdatasystemet. Undersökningarna görs under lätt sedering för att säkerställa korrekt position.' },
        { heading: 'Knä- och hjärtundersökningar', text: 'Officiella knäundersökningar görs kliniskt utan sedering. Kliniken har även officiella rättigheter för hjärtauskultation — med auskultationsundersökning bedöms om hunden har hjärtblåsljud. Dessa undersökningar är en del av avelskontrollerna för många raser.' },
        { heading: 'Vem behöver officiella undersökningar?', text: 'Officiella undersökningar är obligatoriska eller rekommenderade för avelsdjur beroende på ras. Syftet med undersökningarna är att minska förekomsten av ärftliga sjukdomar inom raserna. Undersökningarna kan göras tidigast vid 12 månaders ålder (höfter vid 18 månaders ålder) och gäller hela hundens livstid.' },
        { heading: 'Tidsbokning och information', text: 'Officiella undersökningar kräver förbokning, eftersom de kräver sedering och tillräckligt med tid för att ta bilder av hög kvalitet. Kontakta kliniken för att boka undersökningstid — vi berättar gärna mer om vilka undersökningar som rekommenderas för din hunds ras.' },
        { heading: 'Vanliga frågor om officiella undersökningar', text: '<strong>Vid vilken ålder görs officiella undersökningar?</strong> Officiella höftröntgen tas tidigast vid 18 månaders ålder och armbågsröntgen vid 12 månaders ålder. Knäundersökningar kan göras från 12 månaders ålder. Hjärtauskultation kan göras tidigare, men en undersökning godkänd för avel kräver vanligen minst 12 månaders ålder. Det är viktigt att kontrollera rasspecifika krav på Kennelklubbens sidor. <strong>Hur länge gäller resultaten?</strong> Officiella röntgenresultat gäller hela hundens livstid — de behöver inte förnyas. Hjärtauskultationsresultat gäller beroende på ras 1–2 år. Knäundersökningens resultat är permanent. Resultaten registreras i Kennelklubbens Avelsdatasystem, där de är offentligt tillgängliga.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Official Examinations — Eläinklinikka Saari, Vaasa',
      h1: 'Official Examinations',
      metaDesc: 'Official hip, elbow, patella and cardiac examinations in Vaasa. Finnish Kennel Club approved examiner. Breeding evaluations. Eläinklinikka Saari.',
      sections: [
        { heading: 'Official radiographic examinations', text: 'Our clinic performs official radiographic examinations approved by the Finnish Kennel Club: hip, elbow, and spinal imaging. Official radiographs are sent to the Kennel Club evaluator and results are recorded in the Breeding Information System. Examinations are performed under light sedation to ensure correct positioning.' },
        { heading: 'Patella and cardiac examinations', text: 'Official patella examinations are performed clinically without sedation. The clinic also holds official cardiac auscultation rights — the auscultation examination assesses whether the dog has a heart murmur. These examinations are part of the breeding evaluations for many breeds.' },
        { heading: 'Who needs official examinations?', text: 'Official examinations are mandatory or recommended for breeding dogs depending on the breed. The aim of the examinations is to reduce the incidence of hereditary diseases within breeds. Examinations can be performed from 12 months of age (hips from 18 months) and are valid for the dog\'s entire lifetime.' },
        { heading: 'Booking and information', text: 'Official examinations require advance booking as they require sedation and sufficient time to take high-quality images. Contact the clinic to arrange an examination appointment — we are happy to advise on which examinations are recommended for your dog\'s breed.' },
        { heading: 'Frequently asked questions about official examinations', text: '<strong>At what age are official examinations performed?</strong> Official hip radiographs are taken from 18 months of age at the earliest, and elbow radiographs from 12 months. Patella examinations can be performed from 12 months. Cardiac auscultation can be done earlier, but an examination approved for breeding typically requires at least 12 months of age. It is important to check breed-specific requirements on the Finnish Kennel Club website. <strong>How long are results valid?</strong> Official radiographic results are valid for the dog\'s entire lifetime — they do not need to be renewed. Cardiac auscultation results are valid for 1–2 years depending on the breed. Patella examination results are permanent. Results are recorded in the Kennel Club Breeding Information System, where they are publicly available.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['anestesiaturvallisuus', 'tta-leikkaus', 'lateral-suture'],
    schemaService: 'Official Veterinary Examinations'
  },
  {
    slug: 'sterilisaatio',
    slugSv: 'sterilisering',
    slugEn: 'spay-and-neuter',
    title: 'Sterilisaatio ja kastraatio — Eläinklinikka Saari, Vaasa',
    h1: 'Sterilisaatio ja kastraatio',
    metaDesc: 'Koiran, kissan ja kanin sterilisaatio ja kastraatio Vaasassa. Inhalaatioanestesia, kattava kivunlievitys. Myös kemiallinen kastraatio. Eläinklinikka Saari.',
    icon: '🏥',
    sections: [
      { heading: 'Miksi sterilisaatio tai kastraatio?', text: 'Sterilisaatiolla ja kastraatiolla voidaan ennaltaehkäistä monia sairauksia: nisäkasvaimet, kohtutulehdus, eturauhasvaivat ja kiveskasvaimet. Sterilisaatio poistaa kohdun ja munasarjat, mikä eliminoi hormonaaliset sairaudet kokonaan. Kastraatiolla voidaan myös vähentää ei-toivottua merkkailua ja aggressiivisuutta.' },
      { heading: 'Toimenpide klinikallamme', text: 'Kaikki sterilisaatiot ja kastraatiot tehdään inhalaatioanestesiassa kattavalla kivunlievityksellä. Valvomme potilasta jatkuvasti koko toimenpiteen ajan: sydämen syke, verenpaine, happisaturaatio ja lämpötila. Potilas kotiutuu yleensä samana päivänä ja saa mukaansa kipulääkityksen kotiin.' },
      { heading: 'Kemiallinen kastraatio', text: 'Koirille on tarjolla myös kemiallinen kastraatio hormoni-implantilla (Suprelorin). Implantti asetetaan ihon alle ja sen vaikutus kestää 6 tai 12 kuukautta. Kemiallinen kastraatio on hyvä vaihtoehto, kun halutaan kokeilla kastraation vaikutusta ennen pysyvää päätöstä, tai kun kirurginen toimenpide ei ole toivottu.' },
      { heading: 'Oikea ajoitus', text: 'Optimaalinen sterilisaatio- tai kastraatioikä riippuu rodusta, koosta ja yksilöllisestä tilanteesta. Keskustellaan yhdessä, mikä on paras ajoitus juuri sinun lemmikillesi. Varaa aika konsultaatioon tai toimenpiteeseen.' },
      { heading: 'Usein kysyttyä sterilisaatiosta', text: '<strong>Missä iässä sterilisaatio tehdään?</strong> Optimaalinen sterilisaatioikä riippuu rodusta ja koosta. Pienillä koiraroduilla sterilisaatio voidaan tehdä noin 6 kuukauden iässä, suurilla roduilla suositellaan odottamista 12–18 kuukauden ikään kasvun varmistamiseksi. Kissoilla sterilisaatio tehdään yleensä noin 5–6 kuukauden iässä. Eläinlääkäri arvioi parhaan ajankohdan yksilöllisesti. <strong>Kuinka pitkä on toipumisaika?</strong> Sterilisaation jälkeen lemmikki tarvitsee lepoa noin 10–14 päivää. Tänä aikana on vältettävä hyppimistä, juoksemista ja rajua leikkiä. Kipulääkitys annetaan mukaan kotiin ja haavaa suojataan body-puvulla tai kaulurilla. Ompeleet poistetaan tai sulavat itsestään noin 10 päivän kuluttua. Useimmat potilaat toipuvat nopeasti ja palaavat normaaliin arkeen viikon kuluessa.' },
    ],
    sv: {
      title: 'Sterilisering och kastrering — Djurklinik Saari, Vasa',
      h1: 'Sterilisering och kastrering',
      metaDesc: 'Sterilisering och kastrering av hund, katt och kanin i Vasa. Inhalationsanestesi, omfattande smärtlindring. Även kemisk kastrering. Eläinklinikka Saari.',
      sections: [
        { heading: 'Varför sterilisering eller kastrering?', text: 'Med sterilisering och kastrering kan man förebygga många sjukdomar: bröstcancer, livmoderinflammation, prostataproblem och testikelcancer. Sterilisering avlägsnar livmodern och äggstockarna, vilket eliminerar hormonella sjukdomar helt. Kastrering kan också minska oönskad markering och aggressivitet.' },
        { heading: 'Ingreppet på vår klinik', text: 'Alla steriliseringar och kastreringar utförs under inhalationsanestesi med omfattande smärtlindring. Vi övervakar patienten kontinuerligt under hela ingreppet: hjärtfrekvens, blodtryck, syremättnad och temperatur. Patienten skrivs vanligen ut samma dag och får smärtstillande medicin med sig hem.' },
        { heading: 'Kemisk kastrering', text: 'För hundar finns även kemisk kastrering med hormonimplantat (Suprelorin). Implantatet placeras under huden och dess effekt varar 6 eller 12 månader. Kemisk kastrering är ett bra alternativ när man vill testa effekten av kastrering innan ett permanent beslut fattas, eller när ett kirurgiskt ingrepp inte är önskat.' },
        { heading: 'Rätt tidpunkt', text: 'Optimal ålder för sterilisering eller kastrering beror på ras, storlek och individuell situation. Vi diskuterar gärna tillsammans vad som är den bästa tidpunkten just för ditt husdjur. Boka tid för konsultation eller ingrepp.' },
        { heading: 'Vanliga frågor om sterilisering', text: '<strong>Vid vilken ålder görs sterilisering?</strong> Optimal ålder för sterilisering beror på ras och storlek. Hos små hundraser kan sterilisering göras vid cirka 6 månaders ålder, hos stora raser rekommenderas att vänta till 12–18 månaders ålder för att säkerställa tillväxten. Hos katter görs sterilisering vanligen vid cirka 5–6 månaders ålder. Veterinären bedömer den bästa tidpunkten individuellt. <strong>Hur lång är återhämtningsperioden?</strong> Efter sterilisering behöver husdjuret vila i cirka 10–14 dagar. Under denna tid bör man undvika hoppande, springande och vild lek. Smärtstillande medicin ges med hem och såret skyddas med body eller krage. Stygnena tas bort eller löses upp själva efter cirka 10 dagar. De flesta patienter återhämtar sig snabbt och återgår till normal vardag inom en vecka.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Spay and Neuter — Eläinklinikka Saari, Vaasa',
      h1: 'Spay and Neuter',
      metaDesc: 'Spaying and neutering for dogs, cats and rabbits in Vaasa. Inhalation anaesthesia, comprehensive pain management. Eläinklinikka Saari.',
      sections: [
        { heading: 'Why spay or neuter?', text: 'Spaying and neutering can prevent many diseases: mammary tumours, pyometra, prostate problems, and testicular cancer. Spaying removes the uterus and ovaries, completely eliminating hormonal diseases. Neutering can also reduce unwanted marking behaviour and aggression.' },
        { heading: 'The procedure at our clinic', text: 'All spays and neuters are performed under inhalation anaesthesia with comprehensive pain management. We monitor the patient continuously throughout the procedure: heart rate, blood pressure, oxygen saturation, and temperature. Patients are typically discharged the same day with pain medication to take home.' },
        { heading: 'Chemical castration', text: 'For dogs, chemical castration with a hormone implant (Suprelorin) is also available. The implant is placed under the skin and its effect lasts 6 or 12 months. Chemical castration is a good option when you want to trial the effects of castration before making a permanent decision, or when surgical procedure is not desired.' },
        { heading: 'The right timing', text: 'The optimal age for spaying or neutering depends on breed, size, and individual circumstances. Let us discuss together what is the best timing for your pet. Book an appointment for a consultation or procedure.' },
        { heading: 'Frequently asked questions about spaying', text: '<strong>At what age is spaying performed?</strong> The optimal age for spaying depends on breed and size. Small dog breeds can be spayed at around 6 months of age, while for large breeds it is recommended to wait until 12–18 months to ensure growth. Cats are usually spayed at around 5–6 months of age. The veterinarian assesses the best timing individually. <strong>How long is the recovery period?</strong> After spaying, the pet needs rest for approximately 10–14 days. During this time, jumping, running, and rough play should be avoided. Pain medication is sent home and the wound is protected with a body suit or cone. Sutures are removed or dissolve on their own after approximately 10 days. Most patients recover quickly and return to normal daily life within a week.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['kohtutulehdus', 'anestesiaturvallisuus', 'kipulääkeinfuusio'],
    schemaService: 'Veterinary Spay and Neuter',
    procedureType: 'SurgicalProcedure',
    faq: [
      { q: 'Paljonko kissan sterilisaatio maksaa?', a: 'Naaraskissan sterilisaatio maksaa 205 € ja uroskissan kastraatio 105 €. Hinta sisältää anestesian, leikkauksen, lääkkeet ja kaulurin tai haalarin.' },
      { q: 'Missä iässä sterilisaatio tehdään?', a: 'Kissat sterilisoidaan yleensä noin 5-6 kuukauden iässä. Pienillä koiraroduilla noin 6 kuukauden iässä, suurilla roduilla 12-18 kuukauden iässä. Eläinlääkäri arvioi parhaan ajankohdan yksilöllisesti.' },
      { q: 'Miten pitkä on toipumisaika?', a: 'Sterilisaation jälkeen lemmikki tarvitsee lepoa noin 10-14 päivää. Kipulääkkeet annetaan mukaan kotiin ja haava suojataan haalarilla tai kaulurilla. Useimmat potilaat toipuvat nopeasti.' },
    ]
  },
  {
    slug: 'sisataudit',
    slugSv: 'internmedicin',
    slugEn: 'internal-medicine',
    title: 'Sisätaudit — Eläinklinikka Saari, Vaasa',
    h1: 'Sisätaudit',
    metaDesc: 'Eläinten sisätaudit Vaasassa: diabetes, Cushing, haimatulehdus, anemia. Perusteellinen diagnostiikka ja hoito. Eläinklinikka Saari.',
    icon: '💊',
    sections: [
      { heading: 'Yleisimmät sisätaudit', text: 'Sisätaudit kattavat laajan kirjon eläinten sairauksia. Yleisimpiä ovat diabetes (sokeritauti), Cushingin tauti (lisämunuaiskuoren liikatoiminta), Addisonin tauti (lisämunuaiskuoren vajaatoiminta), haimatulehdus (pankreatiitti), erilaiset anemiat sekä autoimmuunisairaudet. Monilla näistä sairauksista on oireita, jotka etenevät hitaasti — omistaja saattaa huomata vain lisääntyneen janon, painon muutoksen tai yleisen väsymyksen.' },
      { heading: 'Diagnostiikka', text: 'Sisätautien selvittely vaatii usein perusteellista diagnostiikkaa. Klinikallamme tutkimme verinäytteitä, virtsanäytteitä ja hormonitasoja omassa laboratoriossa, jolloin saamme tulokset nopeasti. Vatsan alueen ultraäänitutkimuksella nähdään sisäelinten rakenne ja mahdolliset muutokset. Tarvittaessa otetaan koepalojen näytteitä ultraääniohjauksessa tai tähystyksessä.' },
      { heading: 'Hoito', text: 'Sisätautien hoito on usein pitkäaikaista ja vaatii säännöllistä seurantaa. Diabetesta hoidetaan insuliinilla ja ruokavaliomuutoksilla, Cushingin tautia lääkityksellä, haimatulehdusta nesteyhoidolla ja kivunlievityksellä. Autoimmuunisairaudet vaativat immunosuppressiivista lääkitystä. Hoitosuunnitelma räätälöidään aina yksilöllisesti — tavoitteena on lemmikin hyvä elämänlaatu.' },
      { heading: 'Milloin hakeutua tutkimuksiin?', text: 'Oireita, jotka viittaavat sisätautiin, voivat olla lisääntynyt janoisuus ja virtsaaminen, painon muutos, oksentelu, ripuli, väsymys, ruokahaluttomuus, ihon tai turkin muutokset tai vatsan turpoaminen. Jos huomaat näitä oireita lemmikkilläsi, varaa aika tutkimukseen — varhainen diagnoosi ja hoito parantavat ennustetta merkittävästi.' },
      { heading: 'Usein kysyttyä sisätaudeista', text: '<strong>Miten diabetes diagnosoidaan?</strong> Diabetes diagnosoidaan verinäytteestä mitatun korkean verensokerin ja virtsanäytteessä havaitun glukoosin perusteella. Fruktosamiiniarvo kertoo verensokerin tasosta pidemmällä aikavälillä. Diabeteksen hoito aloitetaan insuliinilla ja ruokavaliomuutoksilla, ja seurataan säännöllisin verikokeilla. Useimmat diabeetikkolemmikkit elävät hyvää elämää asianmukaisella hoidolla. <strong>Tarvitseeko lemmikki elinikäistä lääkitystä?</strong> Monet sisätaudit, kuten diabetes, kilpirauhasen vajaatoiminta ja Cushingin tauti, vaativat elinikäistä lääkitystä. Hoidon tavoitteena on pitää sairaus hallinnassa ja turvata hyvä elämänlaatu. Lääkityksen annosta säädetään säännöllisten kontrollikäyntien perusteella. Joissakin tapauksissa, kuten haimatulehduksessa, hoito voi olla tilapäistä ja lemmikki toipuu kokonaan.' },
    ],
    sv: {
      title: 'Internmedicin — Djurklinik Saari, Vasa',
      h1: 'Internmedicin',
      metaDesc: 'Internmedicin för husdjur i Vasa: diabetes, Cushings sjukdom, pankreatit, anemi. Grundlig diagnostik och behandling. Eläinklinikka Saari.',
      sections: [
        { heading: 'De vanligaste internmedicinska sjukdomarna', text: 'Internmedicin omfattar ett brett spektrum av sjukdomar hos djur. De vanligaste är diabetes (sockersjuka), Cushings sjukdom (binjurebarkens överfunktion), Addisons sjukdom (binjurebarkens underfunktion), pankreatit (bukspottkörtelinflammation), olika former av anemi samt autoimmunsjukdomar. Många av dessa sjukdomar har symtom som fortskrider långsamt — ägaren kanske bara märker ökad törst, viktförändring eller allmän trötthet.' },
        { heading: 'Diagnostik', text: 'Utredning av internmedicinska sjukdomar kräver ofta grundlig diagnostik. På vår klinik undersöker vi blodprov, urinprov och hormonnivåer i vårt eget laboratorium, vilket ger snabba resultat. Med bukens ultraljud kan vi se inre organs struktur och eventuella förändringar. Vid behov tas biopsier under ultraljudsvägledning eller endoskopi.' },
        { heading: 'Behandling', text: 'Behandling av internmedicinska sjukdomar är ofta långvarig och kräver regelbunden uppföljning. Diabetes behandlas med insulin och kostförändringar, Cushings sjukdom med medicinering, pankreatit med vätskebehandling och smärtlindring. Autoimmunsjukdomar kräver immunsuppressiv medicinering. Behandlingsplanen skräddarsys alltid individuellt — målet är god livskvalitet för husdjuret.' },
        { heading: 'När ska man söka undersökning?', text: 'Symtom som kan tyda på internmedicinsk sjukdom kan vara ökad törst och urinering, viktförändring, kräkningar, diarré, trötthet, aptitlöshet, förändringar i hud eller päls eller uppsvälld buk. Om du märker dessa symtom hos ditt husdjur, boka tid för undersökning — tidig diagnos och behandling förbättrar prognosen avsevärt.' },
        { heading: 'Vanliga frågor om internmedicin', text: '<strong>Hur diagnostiseras diabetes?</strong> Diabetes diagnostiseras baserat på förhöjt blodsocker i blodprov och glukos i urinprov. Fruktosaminvärdet berättar om blodsockernivån under en längre period. Diabetesbehandling inleds med insulin och kostförändringar och följs upp med regelbundna blodprov. De flesta husdjur med diabetes lever ett bra liv med rätt behandling. <strong>Behöver husdjuret livslång medicinering?</strong> Många internmedicinska sjukdomar, som diabetes, hypotyreos och Cushings sjukdom, kräver livslång medicinering. Behandlingens mål är att hålla sjukdomen under kontroll och trygga god livskvalitet. Medicineringsdosen justeras baserat på regelbundna kontrollbesök. I vissa fall, som vid pankreatit, kan behandlingen vara tillfällig och husdjuret återhämtar sig helt.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Internal Medicine — Eläinklinikka Saari, Vaasa',
      h1: 'Internal Medicine',
      metaDesc: 'Veterinary internal medicine in Vaasa: diabetes, Cushing\'s disease, pancreatitis, anaemia. Thorough diagnostics and treatment. Eläinklinikka Saari.',
      sections: [
        { heading: 'The most common internal diseases', text: 'Internal medicine covers a wide range of animal diseases. The most common include diabetes mellitus, Cushing\'s disease (hyperadrenocorticism), Addison\'s disease (hypoadrenocorticism), pancreatitis, various forms of anaemia, and autoimmune diseases. Many of these conditions have symptoms that progress slowly — the owner may only notice increased thirst, weight change, or general lethargy.' },
        { heading: 'Diagnostics', text: 'Investigating internal diseases often requires thorough diagnostics. At our clinic, we analyse blood samples, urine samples, and hormone levels in our own laboratory, providing rapid results. Abdominal ultrasound reveals organ structure and any abnormalities. When necessary, biopsies are taken under ultrasound guidance or during endoscopy.' },
        { heading: 'Treatment', text: 'Treatment of internal diseases is often long-term and requires regular follow-up. Diabetes is managed with insulin and dietary changes, Cushing\'s disease with medication, and pancreatitis with fluid therapy and pain relief. Autoimmune diseases require immunosuppressive medication. The treatment plan is always individually tailored — the goal is a good quality of life for your pet.' },
        { heading: 'When to seek examination?', text: 'Symptoms that may indicate internal disease include increased thirst and urination, weight changes, vomiting, diarrhoea, lethargy, loss of appetite, changes in the skin or coat, or abdominal swelling. If you notice these symptoms in your pet, book an examination — early diagnosis and treatment significantly improve the prognosis.' },
        { heading: 'Frequently asked questions about internal medicine', text: '<strong>How is diabetes diagnosed?</strong> Diabetes is diagnosed based on elevated blood glucose in a blood sample and glucose detected in a urine sample. The fructosamine level indicates blood sugar levels over a longer period. Diabetes treatment is initiated with insulin and dietary changes, and monitored with regular blood tests. Most diabetic pets live a good life with proper management. <strong>Does my pet need lifelong medication?</strong> Many internal diseases, such as diabetes, hypothyroidism, and Cushing\'s disease, require lifelong medication. The goal of treatment is to keep the disease under control and ensure good quality of life. Medication doses are adjusted based on regular check-up visits. In some cases, such as pancreatitis, treatment may be temporary and the pet recovers fully.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['kilpirauhasen-liikatoiminta', 'munuaisten-vajaatoiminta', 'ibd-lymfooma'],
    schemaService: 'Veterinary Internal Medicine'
  },
  {
    slug: 'silmataudit',
    slugSv: 'ogonsjukdomar',
    slugEn: 'ophthalmology',
    title: 'Silmätaudit — Eläinklinikka Saari, Vaasa',
    h1: 'Silmätaudit',
    metaDesc: 'Eläinten silmäsairaudet Vaasassa: sarveiskalvon haavaumat, glaukooma, kuivasilmäisyys, kaihi. Tutkimus ja hoito. Eläinklinikka Saari.',
    icon: '👁️',
    sections: [
      { heading: 'Yleisimmät silmäsairaudet', text: 'Silmäsairaudet ovat yleisiä lemmikeillä ja voivat olla hyvin kivuliaita. Yleisimpiä ovat sarveiskalvon haavaumat (eroosiot ja ulseraatiot), glaukooma (silmänpainetauti), kuivasilmäisyys (keratoconjunctivitis sicca), kaihi (linssin samentuma) sekä silmäluomien sairaudet kuten entropion (silmäluomen sisäänpäin kääntyminen) ja ektropion (ulospäin kääntyminen). Tietyt rodut, kuten brakykefaaliset (lyhytkuonoiset) koirat, ovat erityisen alttiita silmäongelmille.' },
      { heading: 'Tutkimusmenetelmät', text: 'Silmätutkimuksessa käytetään useita diagnostisia menetelmiä. Fluoresiinivärjäys paljastaa sarveiskalvon vauriot ja haavaumat. Silmänpainemittauksella (tonometria) tunnistetaan glaukooma. Schirmerin kyyneltestillä mitataan kyynelnesteen tuotantoa. Silmälamppututkimuksella arvioidaan silmän etuosan rakenteet. Näiden tutkimusten avulla saadaan tarkka kuva silmän tilasta ja voidaan aloittaa oikea hoito.' },
      { heading: 'Hoito', text: 'Silmäsairauksien hoito riippuu diagnoosista. Sarveiskalvon haavaumat hoidetaan silmätipoilla ja tarvittaessa suojalinssillä tai kirurgisesti. Glaukooman hoitoon käytetään silmänpainetta alentavia lääkkeitä. Kuivasilmäisyyttä hoidetaan kyynelkorvikkeilla ja immunomoduloivilla tipoilla. Entropion ja muut silmäluomien rakenteelliset ongelmat vaativat usein kirurgista korjausta.' },
      { heading: 'Milloin hakeutua tutkimuksiin?', text: 'Silmäoireisiin tulee reagoida nopeasti, sillä monet silmäsairaudet etenevät nopeasti ja voivat johtaa pysyvään näkövaurioon. Hakeudu vastaanotolle, jos lemmikkisi siristää silmäänsä, silmä vuotaa, silmä on punoittava, pupillit ovat erikokoiset, silmä on samentunut tai lemmikki raapii silmäänsä. Varhainen hoito on silmäsairauksissa erityisen tärkeää.' },
      { heading: 'Usein kysyttyä silmätaudeista', text: '<strong>Ovatko silmäsairaudet perinnöllisiä?</strong> Monet silmäsairaudet ovat perinnöllisiä tai rotutyypillisiä. Brakykefaalisilla (lyhytkuonoisilla) roduilla, kuten mopseilla ja englanninbulldogeilla, on alttius sarveiskalvon vaurioille ja kuivasilmäisyydelle. Cocker spanielilla ja pudeleilla esiintyy kaihia, ja collieilla verkkokalvosairauksia. Perinnöllisten silmäsairauksien seulonta on osa jalostustarkastuksia. <strong>Kuinka nopeasti hoitoon pitää hakeutua?</strong> Silmäoireissa nopeus on ratkaisevaa. Sarveiskalvon haavauma voi syventyä vuorokaudessa ilman hoitoa, ja glaukooma voi johtaa pysyvään sokeuteen tunneissa. Jos lemmikkisi siristää silmäänsä, silmä on punainen tai samentunut, tai pupillit ovat erikokoiset, hakeudu vastaanotolle saman päivän aikana. Silmäoireet eivät parane itsestään.' },
    ],
    sv: {
      title: 'Ögonsjukdomar — Djurklinik Saari, Vasa',
      h1: 'Ögonsjukdomar',
      metaDesc: 'Ögonsjukdomar hos husdjur i Vasa: hornhinnesår, glaukom, torra ögon, katarakt, ögonlockssjukdomar. Undersökning och behandling. Eläinklinikka Saari.',
      sections: [
        { heading: 'De vanligaste ögonsjukdomarna', text: 'Ögonsjukdomar är vanliga hos husdjur och kan vara mycket smärtsamma. De vanligaste är hornhinnesår (erosioner och ulcerationer), glaukom (förhöjt ögontryck), torra ögon (keratoconjunctivitis sicca), katarakt (linsgrumling) samt ögonlockssjukdomar som entropion (inåtvänt ögonlock) och ektropion (utåtvänt ögonlock). Vissa raser, som brakycefala (kortnosade) hundar, är särskilt mottagliga för ögonproblem.' },
        { heading: 'Undersökningsmetoder', text: 'Vid ögonundersökning används flera diagnostiska metoder. Fluoresceinfärgning avslöjar hornhinneskador och sår. Ögontrycksmätning (tonometri) identifierar glaukom. Schirmers tårtest mäter tårproduktionen. Spaltlampsundersökning bedömer strukturerna i ögats främre del. Med hjälp av dessa undersökningar fås en exakt bild av ögats tillstånd och rätt behandling kan påbörjas.' },
        { heading: 'Behandling', text: 'Behandlingen av ögonsjukdomar beror på diagnosen. Hornhinnesår behandlas med ögondroppar och vid behov med skyddslins eller kirurgiskt. Glaukom behandlas med trycksänkande läkemedel. Torra ögon behandlas med tårersättningsmedel och immunmodulerande droppar. Entropion och andra strukturella ögonlocksproblem kräver ofta kirurgisk korrigering.' },
        { heading: 'När ska man söka undersökning?', text: 'Man bör reagera snabbt på ögonsymtom, eftersom många ögonsjukdomar fortskrider snabbt och kan leda till permanent synskada. Sök vård om ditt husdjur kisar, ögat rinner, ögat är rött, pupillerna är olika stora, ögat är grumligt eller husdjuret kliar sig i ögat. Tidig behandling är särskilt viktigt vid ögonsjukdomar.' },
        { heading: 'Vanliga frågor om ögonsjukdomar', text: '<strong>Är ögonsjukdomar ärftliga?</strong> Många ögonsjukdomar är ärftliga eller rasspecifika. Brakycefala (kortnosade) raser som mops och engelsk bulldogg har benägenhet för hornhinneskador och torra ögon. Cocker spaniel och pudel drabbas av katarakt, och collier av näthinnesjukdomar. Screening för ärftliga ögonsjukdomar är en del av avelskontrollerna. <strong>Hur snabbt ska man söka vård?</strong> Vid ögonsymtom är snabbhet avgörande. Ett hornhinnesår kan fördjupas inom ett dygn utan behandling, och glaukom kan leda till permanent blindhet inom timmar. Om ditt husdjur kisar, ögat är rött eller grumligt, eller pupillerna är olika stora, sök vård samma dag. Ögonsymtom läker inte av sig själva.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Ophthalmology — Eläinklinikka Saari, Vaasa',
      h1: 'Ophthalmology',
      metaDesc: 'Veterinary ophthalmology in Vaasa: corneal ulcers, glaucoma, dry eye, cataracts, eyelid diseases. Examination and treatment. Eläinklinikka Saari.',
      sections: [
        { heading: 'The most common eye diseases', text: 'Eye diseases are common in pets and can be extremely painful. The most common include corneal ulcers (erosions and ulcerations), glaucoma (elevated intraocular pressure), dry eye (keratoconjunctivitis sicca), cataracts (lens opacity), and eyelid conditions such as entropion (inward-turning eyelid) and ectropion (outward-turning eyelid). Certain breeds, particularly brachycephalic (short-nosed) dogs, are especially prone to eye problems.' },
        { heading: 'Examination methods', text: 'Eye examination uses several diagnostic methods. Fluorescein staining reveals corneal damage and ulcers. Intraocular pressure measurement (tonometry) identifies glaucoma. The Schirmer tear test measures tear production. Slit lamp examination assesses the structures of the anterior segment. These examinations provide a precise picture of the eye\'s condition and allow appropriate treatment to be initiated.' },
        { heading: 'Treatment', text: 'Treatment of eye diseases depends on the diagnosis. Corneal ulcers are treated with eye drops and, when necessary, with a protective contact lens or surgically. Glaucoma is managed with pressure-lowering medications. Dry eye is treated with tear substitutes and immunomodulatory drops. Entropion and other structural eyelid problems often require surgical correction.' },
        { heading: 'When to seek examination?', text: 'Eye symptoms should be addressed promptly, as many eye diseases progress rapidly and can lead to permanent vision loss. Seek veterinary care if your pet is squinting, the eye is watering, the eye is red, the pupils are unequal in size, the eye appears cloudy, or your pet is pawing at its eye. Early treatment is particularly critical in eye diseases.' },
        { heading: 'Frequently asked questions about eye diseases', text: '<strong>Are eye diseases hereditary?</strong> Many eye diseases are hereditary or breed-related. Brachycephalic (short-nosed) breeds such as Pugs and English Bulldogs are predisposed to corneal damage and dry eye. Cocker Spaniels and Poodles are prone to cataracts, and Collies to retinal diseases. Screening for hereditary eye diseases is part of breeding evaluations. <strong>How quickly should I seek treatment?</strong> With eye symptoms, speed is crucial. A corneal ulcer can deepen within 24 hours without treatment, and glaucoma can lead to permanent blindness within hours. If your pet is squinting, the eye is red or cloudy, or the pupils are unequal in size, seek veterinary care the same day. Eye symptoms do not resolve on their own.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['anestesiaturvallisuus', 'kissaystävällinen-klinikka'],
    schemaService: 'Veterinary Ophthalmology'
  },
  {
    slug: 'laboratorio',
    slugSv: 'laboratorium',
    slugEn: 'laboratory',
    title: 'Laboratorio — Eläinklinikka Saari, Vaasa',
    h1: 'Laboratorio',
    metaDesc: 'Eläinklinikan oma laboratorio Vaasassa: verikokeet, virtsanäytteet, sytologia, hormonitutkimukset. Tulokset jo käynnin aikana. Eläinklinikka Saari.',
    icon: '🧪',
    sections: [
      { heading: 'Laboratoriotutkimukset', text: 'Hyvin varusteltu oma laboratorio on modernin eläinlääkinnän kulmakivi. Klinikallamme on kattava laboratoriovälineistö, jolla pystymme tekemään valtaosan tutkimuksista paikan päällä. Tämä tarkoittaa, että saat tulokset yleensä jo käynnin aikana — ei tarvitse odottaa päiviä ulkopuolisen laboratorion vastausta. Nopeat tulokset mahdollistavat välittömän diagnoosin ja hoidon aloittamisen.' },
      { heading: 'Verinäytteet', text: 'Verinäytteistä tutkimme täydellisen verenkuvan (hematologia), kliinisen kemian parametrit (maksa- ja munuaisarvot, proteiinit, glukoosi), elektrolyytit, hormonit (kilpirauhanen, lisämunuainen, kortisoli), tulehdusarvot ja hyytymistekijät. Verisivelymikroskopialla tutkimme verisolujen rakennetta ja mahdollisia loisia. Verikokeet ovat tärkeä osa lähes kaikkia sairaustutkimuksia sekä anestesian esitutkimuksia.' },
      { heading: 'Virtsanäytteet', text: 'Virtsatutkimuksella saadaan tärkeää tietoa munuaisten toiminnasta, virtsateiden terveydestä ja aineenvaihdunnasta. Tutkimme virtsan ominaisuudet (väri, sameus, ominaispaino), kemiallisen koostumuksen (proteiini, glukoosi, pH, veri) ja sedimentin mikroskopoimalla (kiteet, solut, bakteerit). Tarvittaessa virtsasta voidaan tehdä bakteeriviljelyt ja herkkyysmääritykset antibioottihoidon kohdentamiseksi.' },
      { heading: 'Näytteenotto ja tulokset', text: 'Näytteenotto on nopea ja turvallinen toimenpide. Verinäyte otetaan yleensä etujalasta tai kaulasta — eläimet sietävät sen hyvin. Virtsanäyte voidaan ottaa vapaasti lasketusta virtsasta, katetrilla tai kystostenteesillä (ultraääniohjauksessa neulalla virtsarakosta). Iho- ja korvanäytteitä tutkimme mikroskoopilla suoraan vastaanotolla. Tulosten pohjalta eläinlääkäri keskustelee löydöksistä ja suosittelee jatkohoitoa.' },
    ],
    sv: {
      title: 'Laboratorium — Djurklinik Saari, Vasa',
      h1: 'Laboratorium',
      metaDesc: 'Djurklinikens eget laboratorium i Vasa: blodprov, urinprov, cytologi, hormonundersökningar. Resultat redan under besöket. Eläinklinikka Saari.',
      sections: [
        { heading: 'Laboratorieundersökningar', text: 'Ett välutrustat eget laboratorium är en hörnsten i modern veterinärmedicin. Vår klinik har omfattande laboratorieutrustning som gör det möjligt att utföra de flesta undersökningar på plats. Det innebär att du vanligen får resultaten redan under besöket — ingen väntan i dagar på svar från ett externt laboratorium. Snabba resultat möjliggör omedelbar diagnos och behandlingsstart.' },
        { heading: 'Blodprov', text: 'Från blodprov undersöker vi fullständig blodstatus (hematologi), klinisk kemi (lever- och njurvärden, proteiner, glukos), elektrolyter, hormoner (sköldkörtel, binjure, kortisol), inflammationsmarkörer och koagulationsfaktorer. Med blodutstryk under mikroskop undersöker vi blodcellernas struktur och eventuella parasiter. Blodprov är en viktig del av nästan alla sjukdomsutredningar samt förberedelse inför anestesi.' },
        { heading: 'Urinprov', text: 'Urinundersökning ger viktig information om njurarnas funktion, urinvägarnas hälsa och ämnesomsättningen. Vi undersöker urinens egenskaper (färg, grumlighet, specifik vikt), kemiska sammansättning (protein, glukos, pH, blod) och sediment under mikroskop (kristaller, celler, bakterier). Vid behov kan urinodlingar och resistensbestämningar göras för att rikta antibiotikabehandlingen.' },
        { heading: 'Provtagning och resultat', text: 'Provtagning är en snabb och säker procedur. Blodprov tas vanligen från frambenet eller halsen — djur tolererar det väl. Urinprov kan tas från fritt kastad urin, med kateter eller genom cystocentes (med nål från urinblåsan under ultraljudsvägledning). Hud- och öronprov undersöker vi under mikroskop direkt på mottagningen. Baserat på resultaten diskuterar veterinären fynden och rekommenderar fortsatt behandling.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Laboratory — Eläinklinikka Saari, Vaasa',
      h1: 'Laboratory',
      metaDesc: 'In-house veterinary laboratory in Vaasa: blood tests, urinalysis, cytology, hormone testing. Results during your visit. Eläinklinikka Saari.',
      sections: [
        { heading: 'Laboratory services', text: 'A well-equipped in-house laboratory is a cornerstone of modern veterinary medicine. Our clinic has comprehensive laboratory equipment that allows us to perform the majority of tests on-site. This means you typically receive results during your visit — no waiting days for an external laboratory\'s response. Rapid results enable immediate diagnosis and prompt initiation of treatment.' },
        { heading: 'Blood tests', text: 'From blood samples we analyse a complete blood count (haematology), clinical chemistry parameters (liver and kidney values, proteins, glucose), electrolytes, hormones (thyroid, adrenal, cortisol), inflammatory markers, and coagulation factors. Blood smear microscopy examines blood cell structure and potential parasites. Blood tests are an important part of nearly all disease investigations as well as pre-anaesthetic assessments.' },
        { heading: 'Urinalysis', text: 'Urinalysis provides essential information about kidney function, urinary tract health, and metabolism. We examine urine properties (colour, turbidity, specific gravity), chemical composition (protein, glucose, pH, blood), and sediment under the microscope (crystals, cells, bacteria). When needed, urine cultures and sensitivity testing can be performed to target antibiotic therapy.' },
        { heading: 'Sampling and results', text: 'Sample collection is a quick and safe procedure. Blood samples are usually taken from the front leg or neck — animals tolerate this well. Urine samples can be collected from free-catch urine, by catheter, or by cystocentesis (needle aspiration from the bladder under ultrasound guidance). Skin and ear samples are examined under the microscope directly during the consultation. Based on the results, the veterinarian discusses the findings and recommends further treatment.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['munuaisten-vajaatoiminta', 'kilpirauhasen-liikatoiminta', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Laboratory Services'
  },
  {
    slug: 'rontgen',
    slugSv: 'rontgen',
    slugEn: 'x-ray',
    title: 'Röntgen — Eläinklinikka Saari, Vaasa',
    h1: 'Röntgen',
    metaDesc: 'Digitaalinen röntgen ja hammasröntgen eläimille Vaasassa. Korkealaatuiset kuvat, nopeat tulokset. Viralliset röntgentutkimukset. Eläinklinikka Saari.',
    icon: '☢️',
    sections: [
      { heading: 'Röntgentutkimukset', text: 'Röntgentutkimus on yksi eläinlääketieteen perusdiagnostisista menetelmistä. Se antaa nopeasti tärkeää tietoa luuston, rintaontelon ja vatsaontelon rakenteista. Röntgenkuvaus on kivuton ja nopea tutkimus, joka ei vaadi useimmissa tapauksissa rauhoitusta.' },
      { heading: 'Digitaalinen röntgen', text: 'Klinikallamme käytetään digitaalista röntgeniä, joka tuottaa korkealaatuisia kuvia sekunneissa. Digitaalinen tekniikka mahdollistaa kuvien suurentamisen, kontrastin säädön ja nopean lähettämisen konsultointiin. Yleisimpiä röntgentutkimuksen kohteita ovat luunmurtumat, nivelten sairaudet, rintaontelon kuvaukset (sydämen koko, keuhkomuutokset) ja vatsaontelon kuvaukset (vierasesineet, virtsatiekivet, sisäelinten muutokset).' },
      { heading: 'Hammasröntgen', text: 'Hammasröntgen on välttämätön osa jokaista hammastoimenpidettä. Yli puolet hammassairauksista on näkymättömiä silmämääräisessä tutkimuksessa — juuritulehdukset, hammasresorptio, kystat ja luukato paljastuvat vasta röntgenkuvissa. Klinikallamme kuvataan kaikki hampaat osana jokaista hammastoimenpidettä digitaalisella hammasröntgenillä.' },
      { heading: 'Milloin röntgenkuvia tarvitaan?', text: 'Röntgentutkimusta suositellaan ontumisen tutkimisessa, epäiltäessä murtumia tai nivelongelmia, sydän- tai keuhko-oireiden diagnostiikassa, akuutin oksentelun tai vierasesineen epäilyn yhteydessä, virtsaamisvaikeuksien tutkimisessa ja ennen virallisia jalostustutkimuksia. Kuvat tallennetaan digitaalisesti ja niitä voidaan verrata aiempiin kuviin seurantaa varten.' },
      { heading: 'Usein kysyttyä röntgenistä', text: '<strong>Tarvitaanko rauhoitusta röntgeniin?</strong> Useimmissa tapauksissa röntgenkuvaus onnistuu ilman rauhoitusta. Potilaan asentoa ohjataan kevyesti ja kuvaus kestää vain sekunteja. Rauhoitusta tarvitaan, jos potilas on kovin levoton tai kivulias, tai kun kyseessä ovat viralliset jalostusröntgenkuvat, jotka vaativat tarkan asennon. Rauhoitus on turvallinen ja potilas toipuu nopeasti. <strong>Onko röntgensäteily vaarallista?</strong> Röntgenkuvaus on turvallinen diagnostinen tutkimus. Yksittäisen kuvan säteilyannos on erittäin pieni eikä aiheuta terveysriskiä. Digitaalinen röntgen vähentää tarvittavaa säteilyannosta entisestään perinteiseen filmitekniikkaan verrattuna. Hoitohenkilökunta käyttää suojavarusteita ja noudattaa säteilyturvallisuusohjeita.' },
    ],
    sv: {
      title: 'Röntgen — Djurklinik Saari, Vasa',
      h1: 'Röntgen',
      metaDesc: 'Digital röntgen och dentalröntgen för djur i Vasa. Högkvalitativa bilder, snabba resultat. Officiella röntgenundersökningar. Eläinklinikka Saari.',
      sections: [
        { heading: 'Röntgenundersökningar', text: 'Röntgenundersökning är en av veterinärmedicinens grundläggande diagnostiska metoder. Den ger snabbt viktig information om skelettets, bröstkorgens och bukhålans strukturer. Röntgen är en smärtfri och snabb undersökning som i de flesta fall inte kräver sedering.' },
        { heading: 'Digital röntgen', text: 'Vår klinik använder digital röntgen som producerar högkvalitativa bilder på sekunder. Digital teknik möjliggör förstoring av bilder, kontrastjustering och snabb översändning för konsultation. De vanligaste indikationerna för röntgen är benfrakturer, ledsjukdomar, thoraxröntgen (hjärtstorlek, lungförändringar) och bukröntgen (främmande föremål, urinstenar, förändringar i inre organ).' },
        { heading: 'Dentalröntgen', text: 'Dentalröntgen är en nödvändig del av varje tandingrepp. Över hälften av tandsjukdomarna är osynliga vid visuell undersökning — rotinfektioner, tandresorption, cystor och benförlust avslöjas först på röntgenbilder. På vår klinik röntgas alla tänder som en del av varje tandingrepp med digital dentalröntgen.' },
        { heading: 'När behövs röntgenbilder?', text: 'Röntgenundersökning rekommenderas vid utredning av hälta, misstanke om frakturer eller ledproblem, diagnostik av hjärt- eller lungsymtom, akuta kräkningar eller misstanke om främmande föremål, utredning av urineringsproblem och inför officiella avelsundersökningar. Bilderna sparas digitalt och kan jämföras med tidigare bilder för uppföljning.' },
        { heading: 'Vanliga frågor om röntgen', text: '<strong>Behövs sedering för röntgen?</strong> I de flesta fall lyckas röntgen utan sedering. Patientens position justeras försiktigt och bildtagningen tar bara sekunder. Sedering behövs om patienten är mycket orolig eller smärtpåverkad, eller vid officiella avelsröntgen som kräver exakt position. Sederingen är säker och patienten återhämtar sig snabbt. <strong>Är röntgenstrålning farligt?</strong> Röntgen är en säker diagnostisk undersökning. Stråldosen vid en enskild bild är mycket liten och utgör ingen hälsorisk. Digital röntgen minskar den nödvändiga stråldosen ytterligare jämfört med traditionell filmteknik. Personalen använder skyddsutrustning och följer strålsäkerhetsföreskrifter.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'X-ray — Eläinklinikka Saari, Vaasa',
      h1: 'X-ray',
      metaDesc: 'Digital X-ray and dental radiography for pets in Vaasa. High-quality imaging, rapid results. Official radiographic examinations. Eläinklinikka Saari.',
      sections: [
        { heading: 'X-ray examinations', text: 'X-ray is one of the fundamental diagnostic methods in veterinary medicine. It quickly provides essential information about skeletal, thoracic, and abdominal structures. Radiography is a painless and rapid examination that does not require sedation in most cases.' },
        { heading: 'Digital X-ray', text: 'Our clinic uses digital X-ray technology that produces high-quality images in seconds. Digital technology enables image magnification, contrast adjustment, and rapid transmission for consultation. The most common indications for X-ray include bone fractures, joint diseases, thoracic imaging (heart size, lung changes), and abdominal imaging (foreign bodies, urinary stones, organ abnormalities).' },
        { heading: 'Dental X-ray', text: 'Dental radiography is an essential part of every dental procedure. Over half of dental diseases are invisible on visual examination — root infections, tooth resorption, cysts, and bone loss are only revealed on radiographs. At our clinic, all teeth are radiographed as part of every dental procedure using digital dental X-ray.' },
        { heading: 'When are X-rays needed?', text: 'X-ray examination is recommended for investigating lameness, suspected fractures or joint problems, diagnosing cardiac or respiratory symptoms, acute vomiting or suspected foreign body ingestion, investigating urination difficulties, and before official breeding examinations. Images are stored digitally and can be compared with previous images for follow-up monitoring.' },
        { heading: 'Frequently asked questions about X-rays', text: '<strong>Is sedation needed for X-rays?</strong> In most cases, X-ray imaging is successful without sedation. The patient\'s position is gently adjusted and image capture takes only seconds. Sedation is needed if the patient is very restless or in pain, or for official breeding radiographs that require precise positioning. Sedation is safe and the patient recovers quickly. <strong>Is X-ray radiation dangerous?</strong> X-ray is a safe diagnostic examination. The radiation dose from a single image is very small and poses no health risk. Digital X-ray further reduces the required radiation dose compared to traditional film technology. Staff use protective equipment and follow radiation safety guidelines.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['tta-leikkaus', 'lateral-suture', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Radiology'
  },
  {
    slug: 'eutanasia',
    slugSv: 'eutanasi',
    slugEn: 'euthanasia',
    title: 'Eutanasia — Eläinklinikka Saari, Vaasa',
    h1: 'Eutanasia — lemmikin viimeinen matka',
    metaDesc: 'Lemmikin rauhallinen ja arvokas lopetus Vaasassa. Kivuton eutanasia rauhoituksella. Tuhkaus ja yksilötuhkaus. Surusta selviytyminen. Eläinklinikka Saari.',
    icon: '🕊️',
    sections: [
      { heading: 'Milloin on aika?', text: 'Päätös lemmikin lopettamisesta on yksi vaikeimmista hetkistä lemmikkieläimen omistajan elämässä. Tiedämme, ettei päätöstä tehdä kevyesti. Joskus sairaus etenee niin pitkälle, ettei hoito enää tuo helpotusta, tai lemmikin elämänlaatu on laskenut merkittävästi. Jos pohdit, onko lemmikkisi vielä onnellinen, älä epäröi keskustella asiasta kanssamme — olemme täällä auttamassa sinua tässä vaikeassa päätöksessä, ilman painostusta ja oman aikataulusi mukaan.' },
      { heading: 'Miten toimenpide etenee?', text: 'Pyrimme siihen, että hyvästien otto tapahtuu rauhallisesti, ilman kiirettä. Lemmikille annetaan ensin rauhoittava lääke kipulievityksineen, jolloin eläin rentoutuu ja nukahtaa muutamassa minuutissa. Saat olla lemmikkisi vierellä koko ajan. Kun eläin on syvässä unessa, annetaan nukutuslääke suonensisäisesti. Lemmikki nukkuu pois rauhallisesti ja kivuttomasti — se ei tunne mitään. Koko prosessi on suunniteltu siten, että se on mahdollisimman lempeä sekä lemmikille että sinulle.' },
      { heading: 'Käytännön asiat', text: 'Voit tuoda mukanasi lemmikkisi lempiviltin tai lelun. Varaathan aikaa, jotta saat hyvästellä rauhassa. Meillä ei ole kiirettä. Toimenpiteen jälkeen voit valita tuhkauksen, yksilötuhkauksen (tuhka palautetaan uurnassa) tai kotihautauksen. Kerromme mielellämme eri vaihtoehdoista. Lasku lähetetään jälkikäteen — sinun ei tarvitse huolehtia maksamisesta sillä hetkellä.' },
      { heading: 'Surutyö', text: 'Lemmikin menetys on aitoa surua, ja se on luonnollista. Jokainen suree omalla tavallaan ja omassa tahdissaan. Muistot, joita olet jakanut lemmikkisi kanssa, ovat arvokkaita ja pysyviä. Lapsillekin on tärkeää antaa mahdollisuus surra ja käsitellä menetystä. Jos tunnet tarvitsevasi tukea, älä epäröi keskustella kanssamme tai hakea apua. Lemmikin antama rakkaus ei katoa — se jää sydämeen.' },
    ],
    sv: {
      title: 'Eutanasi — Djurklinik Saari, Vasa',
      h1: 'Eutanasi — husdjurets sista resa',
      metaDesc: 'Lugn och värdig avskildning för ditt husdjur i Vasa. Smärtfri eutanasi med sedering. Kremering och individuell kremering. Eläinklinikka Saari.',
      sections: [
        { heading: 'När är det dags?', text: 'Beslutet att avliva ett husdjur är ett av de svåraste ögonblicken i en djurägares liv. Vi vet att beslutet inte fattas lättvindigt. Ibland fortskrider sjukdomen så långt att behandling inte längre ger lindring, eller att husdjurets livskvalitet har försämrats avsevärt. Om du funderar på om ditt husdjur fortfarande är lyckligt, tveka inte att prata med oss — vi finns här för att hjälpa dig med detta svåra beslut, utan press och i din egen takt.' },
        { heading: 'Hur går ingreppet till?', text: 'Vi strävar efter att avskedet sker lugnt, utan brådska. Husdjuret ges först ett lugnande läkemedel med smärtlindring, varvid djuret slappnar av och somnar inom några minuter. Du får vara vid ditt husdjurs sida hela tiden. När djuret är i djup sömn ges avlivningsmedlet intravenöst. Husdjuret somnar in lugnt och smärtfritt — det känner ingenting. Hela processen är utformad för att vara så skonsam som möjligt, både för husdjuret och för dig.' },
        { heading: 'Praktiska frågor', text: 'Du kan ta med ditt husdjurs favoritfilt eller leksak. Reservera gott om tid så att du kan ta farväl i lugn och ro. Vi har ingen brådska. Efter ingreppet kan du välja kremering, individuell kremering (askan returneras i en urna) eller hembegravning. Vi berättar gärna om de olika alternativen. Fakturan skickas i efterhand — du behöver inte bekymra dig om betalning just då.' },
        { heading: 'Sorg', text: 'Förlusten av ett husdjur är äkta sorg, och det är naturligt. Alla sörjer på sitt eget sätt och i sin egen takt. Minnena du delat med ditt husdjur är värdefulla och bestående. Det är viktigt att även ge barn möjlighet att sörja och bearbeta förlusten. Om du känner att du behöver stöd, tveka inte att prata med oss eller söka hjälp. Kärleken ett husdjur ger försvinner inte — den stannar i hjärtat.' },
      ],
      ctaTitle: 'Kontakta oss',
      ctaText: 'Ring oss så pratar vi i lugn och ro.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Euthanasia — Eläinklinikka Saari, Vaasa',
      h1: 'Euthanasia — your pet\'s final journey',
      metaDesc: 'Peaceful and dignified pet euthanasia in Vaasa. Pain-free with sedation. Cremation and individual cremation options. Grief support. Eläinklinikka Saari.',
      sections: [
        { heading: 'When is it time?', text: 'The decision to euthanise a pet is one of the most difficult moments in a pet owner\'s life. We understand that this decision is never made lightly. Sometimes illness progresses to a point where treatment no longer brings relief, or your pet\'s quality of life has declined significantly. If you are wondering whether your pet is still happy, please do not hesitate to talk with us — we are here to help you with this difficult decision, without pressure and at your own pace.' },
        { heading: 'How does the procedure work?', text: 'We strive to ensure that saying goodbye happens calmly, without rush. Your pet is first given a sedative with pain relief, causing the animal to relax and fall asleep within a few minutes. You are welcome to stay by your pet\'s side throughout. Once the animal is in deep sleep, the euthanasia agent is administered intravenously. Your pet passes peacefully and painlessly — they feel nothing. The entire process is designed to be as gentle as possible, both for your pet and for you.' },
        { heading: 'Practical matters', text: 'You are welcome to bring your pet\'s favourite blanket or toy. Please allow enough time so that you can say goodbye in peace. There is no rush. After the procedure, you may choose cremation, individual cremation (ashes returned in an urn), or home burial. We are happy to explain the different options. The invoice is sent afterwards — you do not need to worry about payment at that moment.' },
        { heading: 'Grief', text: 'Losing a pet is genuine grief, and that is natural. Everyone grieves in their own way and at their own pace. The memories you shared with your pet are precious and lasting. It is important to allow children the opportunity to grieve and process the loss as well. If you feel you need support, do not hesitate to speak with us or seek help. The love a pet gives does not disappear — it stays in your heart.' },
      ],
      ctaTitle: 'Contact us',
      ctaText: 'Call us and we will talk at your pace.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['kissaystävällinen-klinikka', 'munuaisten-vajaatoiminta'],
    schemaService: 'Veterinary Euthanasia'
  },
  {
    slug: 'eu-lemmikkipassi',
    slugSv: 'eu-sallskapsdjurspass',
    slugEn: 'eu-pet-passport',
    title: 'EU-lemmikkipassi — Eläinklinikka Saari, Vaasa',
    h1: 'EU-lemmikkipassi',
    metaDesc: 'EU-lemmikkipassi ja matkustusasiakirjat Vaasassa. Rabiesrokotus, tiitteritutkimus, terveystodistukset. Eläinklinikka Saari.',
    icon: '🛂',
    sections: [
      { heading: 'Mikä on EU-lemmikkipassi?', text: 'EU-lemmikkieläinpassi on virallinen asiakirja, joka todistaa lemmikkisi tunnistuksen ja rokotustiedot. Passi vaaditaan kaikille koirille, kissoille ja freteille, jotka matkustavat EU-maiden välillä. Passin saa vain eläinlääkäriltä, ja se edellyttää voimassa olevaa mikrosirutunnistusta ja rabiesrokotusta. Passi on lemmikkisi henkilöllisyystodistus kansainvälisessä matkustamisessa.' },
      { heading: 'Matkustaminen EU:n sisällä', text: 'EU:n sisäinen matkustaminen lemmikin kanssa on suhteellisen suoraviivaista. Vaatimuksena on voimassa oleva EU-lemmikkipassi, mikrosiru ja rabiesrokotus (annettu vähintään 21 päivää ennen matkaa). Rabiesrokotuksen tehosteväli on 1–3 vuotta rokotteesta riippuen, ja voimassaolon on jatkuttava koko matkan ajan. Joissakin maissa on lisävaatimuksia, kuten ekinokokkilääkitys Iso-Britanniaan matkustettaessa.' },
      { heading: 'Matkustaminen EU:n ulkopuolelle', text: 'EU:n ulkopuolelle matkustettaessa vaatimukset vaihtelevat maan mukaan. Joihinkin maihin tarvitaan rabies-tiitteritutkimus (vasta-ainemääritys), joka on tehtävä vähintään 30 päivää rokotuksen jälkeen ja 3 kuukautta ennen matkaa. Lisäksi voidaan vaatia erillinen eläinlääkärin terveystodistus, tuontilupa tai karanteeni. Ota yhteyttä meihin hyvissä ajoin — selvitämme kohdemaasi vaatimukset ja autamme aikatauluttamaan tutkimukset ja rokotukset oikein.' },
      { heading: 'Miten hakea passia?', text: 'EU-lemmikkipassin saat klinikaltamme. Passiin tarvitaan mikrosiru (jos lemmikillä ei ole, asennamme sen samalla käynnillä) ja voimassa oleva rabiesrokotus. Varaa aika passinhakua varten — käynti sisältää terveystarkastuksen, mahdollisen mikrosirun asennuksen ja rabiesrokotuksen. Saat passin mukaasi samana päivänä. Jos suunnittelet matkaa, aloita valmistelut ajoissa — osa vaatimuksista edellyttää viikkojen odotusaikoja.' },
      { heading: 'Usein kysyttyä EU-lemmikkipassista', text: '<strong>Kuinka aikaisin passia kannattaa hakea?</strong> Suosittelemme aloittamaan passihakemuksen vähintään 1–3 kuukautta ennen suunniteltua matkaa. Rabiesrokotus on annettava vähintään 21 päivää ennen EU:n sisäistä matkustamista. EU:n ulkopuolelle matkustettaessa tiitteri-tutkimus vaatii 30 päivän odotuksen rokotuksesta ja 3 kuukauden odotuksen ennen matkaa. Ota yhteyttä ajoissa, niin suunnitellaan aikataulu yhdessä. <strong>Tarvitaanko rabiesrokotus?</strong> Kyllä, rabiesrokotus on pakollinen kaikille EU-maiden välillä matkustaville koirille, kissoille ja freteille. Rokotus on annettava vähintään 21 päivää ennen matkaa. Rokotuksen voimassaoloaika riippuu käytetystä rokotteesta — yleensä 1–3 vuotta. Rokotustiedot kirjataan passiin ja voimassaolo tarkistetaan rajanylityksessä.' },
    ],
    sv: {
      title: 'EU-sällskapsdjurspass — Djurklinik Saari, Vasa',
      h1: 'EU-sällskapsdjurspass',
      metaDesc: 'EU-pass för sällskapsdjur och resehandlingar i Vasa. Rabiesvaccination, titertest, hälsointyg. Res tryggt med ditt husdjur. Eläinklinikka Saari.',
      sections: [
        { heading: 'Vad är ett EU-sällskapsdjurspass?', text: 'EU-sällskapsdjurspasset är ett officiellt dokument som intygar ditt husdjurs identifiering och vaccinationsuppgifter. Passet krävs för alla hundar, katter och illrar som reser mellan EU-länder. Passet kan utfärdas av en veterinär och kräver giltig mikrochipidentifiering och rabiesvaccination. Passet är ditt husdjurs identitetsbevis vid internationellt resande.' },
        { heading: 'Resa inom EU', text: 'Att resa med husdjur inom EU är relativt okomplicerat. Kraven är giltigt EU-sällskapsdjurspass, mikrochip och rabiesvaccination (given minst 21 dagar före resan). Intervallet för rabiesvaccinationens booster är 1–3 år beroende på vaccin, och giltigheten måste gälla under hela resan. Vissa länder har ytterligare krav, som echinococcbehandling vid resa till Storbritannien.' },
        { heading: 'Resa utanför EU', text: 'Vid resa utanför EU varierar kraven beroende på land. Till vissa länder krävs rabies-titertest (antikroppsbestämning) som måste göras minst 30 dagar efter vaccination och 3 månader före resan. Dessutom kan separat veterinärhälsointyg, importtillstånd eller karantän krävas. Kontakta oss i god tid — vi utreder kraven för ditt destinationsland och hjälper dig att schemalägga undersökningar och vaccinationer korrekt.' },
        { heading: 'Hur ansöker man om pass?', text: 'EU-sällskapsdjurspasset kan du få på vår klinik. För passet behövs mikrochip (om ditt husdjur inte har ett, installerar vi det vid samma besök) och giltig rabiesvaccination. Boka tid för passansökan — besöket inkluderar hälsokontroll, eventuell mikrochipinstallation och rabiesvaccination. Du får passet med dig samma dag. Om du planerar en resa, börja förberedelserna i tid — vissa krav innebär väntetider på flera veckor.' },
        { heading: 'Vanliga frågor om EU-sällskapsdjurspass', text: '<strong>Hur tidigt bör man ansöka om pass?</strong> Vi rekommenderar att påbörja passansökan minst 1–3 månader före planerad resa. Rabiesvaccination måste ges minst 21 dagar före resa inom EU. Vid resa utanför EU kräver titertestet 30 dagars väntan efter vaccination och 3 månaders väntan före resan. Kontakta oss i god tid så planerar vi schemat tillsammans. <strong>Behövs rabiesvaccination?</strong> Ja, rabiesvaccination är obligatorisk för alla hundar, katter och illrar som reser mellan EU-länder. Vaccinationen måste ges minst 21 dagar före resan. Vaccinationens giltighetstid beror på det använda vaccinet — vanligen 1–3 år. Vaccinationsuppgifterna registreras i passet och giltigheten kontrolleras vid gränspassering.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'EU Pet Passport — Eläinklinikka Saari, Vaasa',
      h1: 'EU Pet Passport',
      metaDesc: 'EU pet passport and travel documents in Vaasa. Rabies vaccination, titre testing, health certificates. Travel safely with your pet. Eläinklinikka Saari.',
      sections: [
        { heading: 'What is an EU pet passport?', text: 'The EU pet passport is an official document that certifies your pet\'s identification and vaccination records. The passport is required for all dogs, cats, and ferrets travelling between EU countries. It can only be issued by a veterinarian and requires valid microchip identification and rabies vaccination. The passport is your pet\'s identity document for international travel.' },
        { heading: 'Travelling within the EU', text: 'Travelling with a pet within the EU is relatively straightforward. The requirements are a valid EU pet passport, microchip, and rabies vaccination (administered at least 21 days before travel). The rabies booster interval is 1–3 years depending on the vaccine, and validity must cover the entire journey. Some countries have additional requirements, such as echinococcus treatment when travelling to the United Kingdom.' },
        { heading: 'Travelling outside the EU', text: 'When travelling outside the EU, requirements vary by country. Some countries require a rabies titre test (antibody determination), which must be performed at least 30 days after vaccination and 3 months before travel. Additionally, a separate veterinary health certificate, import permit, or quarantine may be required. Contact us well in advance — we will clarify the requirements for your destination country and help schedule examinations and vaccinations correctly.' },
        { heading: 'How to apply for a passport?', text: 'You can obtain an EU pet passport at our clinic. The passport requires a microchip (if your pet does not have one, we will implant it during the same visit) and a valid rabies vaccination. Book an appointment for passport application — the visit includes a health check, microchip implantation if needed, and rabies vaccination. You receive the passport on the same day. If you are planning a trip, start preparations early — some requirements involve waiting periods of several weeks.' },
        { heading: 'Frequently asked questions about EU pet passports', text: '<strong>How early should I apply for a passport?</strong> We recommend starting the passport application at least 1–3 months before the planned trip. Rabies vaccination must be given at least 21 days before travel within the EU. For travel outside the EU, the titre test requires a 30-day wait after vaccination and a 3-month wait before travel. Contact us in good time so we can plan the schedule together. <strong>Is rabies vaccination required?</strong> Yes, rabies vaccination is mandatory for all dogs, cats, and ferrets travelling between EU countries. The vaccination must be given at least 21 days before travel. The vaccination\'s validity period depends on the vaccine used — typically 1–3 years. Vaccination details are recorded in the passport and validity is checked at border crossings.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['rokotukset', 'yksityinen-klinikka'],
    schemaService: 'EU Pet Passport Services'
  },
  {
    slug: 'verikokeet',
    slugSv: 'blodprov',
    slugEn: 'blood-tests',
    title: 'Verikokeet — Eläinklinikka Saari, Vaasa',
    h1: 'Verikokeet',
    metaDesc: 'Lemmikin verikokeet Vaasassa. Oma laboratorio, nopeat tulokset käynnin aikana. Hematologia, kliininen kemia, hormonit, virtsaviljely. Eläinklinikka Saari.',
    icon: '🩸',
    sections: [
      { heading: 'Oma laboratorio — nopeat vastaukset', text: 'Klinikallamme on hyvin varusteltu oma laboratorio, jossa tutkimme suurimman osan verinäytteistä paikan päällä. Tämä tarkoittaa, että saat vastaukset useimmiten jo käynnin aikana — ei tarvitse odottaa päiviä ulkopuolisen laboratorion tuloksia. Nopeat tulokset mahdollistavat hoidon aloittamisen heti, mikä on erityisen tärkeää akuuteissa tilanteissa.' },
      { heading: 'Tutkimukset', text: 'Laboratoriossamme tehdään kattavasti erilaisia tutkimuksia: hematologia (täydellinen verenkuva), kliininen kemia (maksa-, munuais- ja haimaentsyymit), elektrolyytit, hormonitutkimukset (kilpirauhanen, lisämunuainen, kortisoli), virtsatutkimukset ja virtsaviljelyt. Lisäksi teemme sytologisia tutkimuksia eli solunäytteitä kasvaimista, iholta ja korvista.' },
      { heading: 'Milloin verikokeet ovat tarpeen?', text: 'Verikokeet ovat tärkeä osa monia tilanteita: ennen anestesiaa ja leikkausta, sairauden syyn selvittämisessä, kroonisten sairauksien seurannassa, lääkityksen vaikutuksen arvioinnissa ja senioritarkastuksissa. Ikääntyvillä lemmikeillä säännölliset verikokeet paljastavat muutokset munuaisissa, maksassa ja kilpirauhasessa ajoissa.' },
      { heading: 'Näytteenotto on helppoa', text: 'Verinäytteen ottaminen on nopea ja lähes kivuton toimenpide. Näyte otetaan yleensä etujalasta tai kaulasta. Useimmissa tapauksissa paastoa ei vaadita, mutta rasva-arvoja tutkittaessa suositellaan 8–12 tunnin paastoa. Tulokset käydään läpi yhdessä vastaanotolla ja tarvittaessa laaditaan hoitosuunnitelma heti.' },
      { heading: 'Usein kysyttyä verikokeista', text: '<strong>Pitääkö lemmikin olla ravinnotta?</strong> Useimpien verikokeiden kohdalla paastoa ei vaadita — voit syöttää lemmikkiäsi normaalisti ennen käyntiä. Paastoa suositellaan ainoastaan rasva-arvojen (triglyseridi, kolesteroli) tutkimisessa — tällöin 8–12 tunnin paasto riittää. Vettä saa ja pitää tarjota normaalisti. Eläinlääkäri kertoo ajanvarauksen yhteydessä, jos paasto on tarpeen. <strong>Kuinka nopeasti tulokset saadaan?</strong> Klinikkamme omassa laboratoriossa suurin osa tuloksista valmistuu 15–30 minuutissa, joten saat vastaukset yleensä jo käynnin aikana. Tämä mahdollistaa hoidon aloittamisen heti. Harvinaisemmat tutkimukset, kuten hormonitasot ja erikoisvärjäykset, lähetetään ulkopuoliseen laboratorioon, jolloin vastaus saadaan 1–5 arkipäivässä.' },
    ],
    sv: {
      title: 'Blodprov — Djurklinik Saari, Vasa',
      h1: 'Blodprov',
      metaDesc: 'Blodprov för husdjur i Vasa. Eget laboratorium med snabba resultat under besöket. Hematologi, klinisk kemi, hormoner. Eläinklinikka Saari.',
      sections: [
        { heading: 'Eget laboratorium — snabba svar', text: 'Vår klinik har ett välutrustat eget laboratorium där vi analyserar de flesta blodprov på plats. Det innebär att du får svar oftast redan under besöket — ingen väntan i dagar på resultat från externt laboratorium. Snabba resultat möjliggör att behandling kan påbörjas omedelbart, vilket är särskilt viktigt i akuta situationer.' },
        { heading: 'Undersökningar', text: 'I vårt laboratorium utförs omfattande undersökningar: hematologi (komplett blodstatus), klinisk kemi (lever-, njur- och bukspottskörtelenzymer), elektrolyter, hormonundersökningar (sköldkörtel, binjure, kortisol), urinundersökningar och urinodlingar. Dessutom utför vi cytologiska undersökningar, det vill säga cellprov från tumörer, hud och öron.' },
        { heading: 'När behövs blodprov?', text: 'Blodprov är en viktig del av många situationer: före anestesi och operation, vid utredning av sjukdomsorsak, uppföljning av kroniska sjukdomar, bedömning av läkemedelseffekt och seniorundersökningar. Hos äldre husdjur avslöjar regelbundna blodprov förändringar i njurar, lever och sköldkörtel i tid.' },
        { heading: 'Provtagning är enkelt', text: 'Blodprovstagning är en snabb och nästan smärtfri procedur. Provet tas vanligen från frambenet eller halsen. I de flesta fall krävs ingen fasta, men vid undersökning av fettvärden rekommenderas 8–12 timmars fasta. Resultaten gås igenom tillsammans på mottagningen och vid behov upprättas en behandlingsplan direkt.' },
        { heading: 'Vanliga frågor om blodprov', text: '<strong>Behöver husdjuret vara fastande?</strong> För de flesta blodprov krävs ingen fasta — du kan utfodra ditt husdjur normalt före besöket. Fasta rekommenderas enbart vid undersökning av fettvärden (triglycerider, kolesterol) — då räcker 8–12 timmars fasta. Vatten ska och bör erbjudas normalt. Veterinären meddelar vid tidsbokning om fasta behövs. <strong>Hur snabbt fås resultaten?</strong> I vår kliniks eget laboratorium blir de flesta resultat klara på 15–30 minuter, så du får svaren vanligen redan under besöket. Det möjliggör att behandling kan påbörjas direkt. Mer sällsynta undersökningar, som hormonnivåer och specialfärgningar, skickas till externt laboratorium och svaret fås inom 1–5 arbetsdagar.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Blood Tests — Eläinklinikka Saari, Vaasa',
      h1: 'Blood Tests',
      metaDesc: 'Pet blood tests in Vaasa. In-house laboratory with fast results during your visit. Haematology, clinical chemistry, hormones. Eläinklinikka Saari.',
      sections: [
        { heading: 'In-house laboratory — fast results', text: 'Our clinic has a well-equipped in-house laboratory where we analyse most blood samples on-site. This means you receive results most often during the visit itself — no waiting days for external laboratory results. Fast results enable treatment to begin immediately, which is especially important in acute situations.' },
        { heading: 'Tests we perform', text: 'Our laboratory performs a comprehensive range of tests: haematology (complete blood count), clinical chemistry (liver, kidney, and pancreatic enzymes), electrolytes, hormone testing (thyroid, adrenal, cortisol), urine analysis, and urine cultures. We also perform cytological examinations — cell samples from tumours, skin, and ears.' },
        { heading: 'When are blood tests needed?', text: 'Blood tests are an important part of many situations: before anaesthesia and surgery, investigating the cause of illness, monitoring chronic diseases, evaluating medication effects, and senior check-ups. In ageing pets, regular blood tests reveal changes in the kidneys, liver, and thyroid gland in time.' },
        { heading: 'Sampling is easy', text: 'Taking a blood sample is a quick and virtually painless procedure. The sample is usually taken from the front leg or neck. In most cases, fasting is not required, but for lipid values, 8–12 hours of fasting is recommended. Results are reviewed together at the consultation and a treatment plan is drawn up immediately if needed.' },
        { heading: 'Frequently asked questions about blood tests', text: '<strong>Does my pet need to fast?</strong> For most blood tests, fasting is not required — you can feed your pet normally before the visit. Fasting is recommended only when testing lipid values (triglycerides, cholesterol) — in that case, 8–12 hours of fasting is sufficient. Water should be offered as normal. The veterinarian will advise when booking whether fasting is needed. <strong>How quickly are results available?</strong> In our clinic\'s in-house laboratory, most results are ready within 15–30 minutes, so you typically receive answers during the visit. This enables treatment to begin immediately. Less common tests such as hormone levels and special stains are sent to an external laboratory, with results available within 1–5 working days.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['kilpirauhasen-liikatoiminta', 'munuaisten-vajaatoiminta'],
    schemaService: 'Veterinary Blood Testing'
  },
  {
    slug: 'tiineystutkimus',
    slugSv: 'draktighetsundersokning',
    slugEn: 'pregnancy-examination',
    title: 'Tiineystutkimus — Eläinklinikka Saari, Vaasa',
    h1: 'Tiineystutkimus',
    metaDesc: 'Tiineystutkimus koiralle ja kissalle Vaasassa. Ultraääni, röntgen, sikiöiden seuranta, keisarinleikkauksen suunnittelu. Eläinklinikka Saari.',
    icon: '🤰',
    sections: [
      { heading: 'Tiineyden toteaminen ultraäänellä', text: 'Ultraäänitutkimuksella voidaan todeta tiineys luotettavasti noin raskauspäivästä 24 alkaen. Tutkimuksessa nähdään sikiörakkulat ja voidaan arvioida sikiöiden elinvoimaisuutta sydämenlyöntien perusteella. Ultraääni on turvallinen ja kivuton tutkimus, joka ei altista emää tai sikiöitä säteilylle. Tutkimus tehdään hereillä olevalle potilaalle ilman rauhoitusta.' },
      { heading: 'Röntgen — pentujen lukumäärä', text: 'Röntgentutkimuksella voidaan arvioida pentujen lukumäärä tarkemmin noin raskauspäivästä 50 alkaen, jolloin sikiöiden luusto on riittävästi mineralisoitunut näkyäkseen röntgenkuvassa. Tarkka pentumäärän tietäminen on tärkeää synnytyksen suunnittelun kannalta — se auttaa tunnistamaan, milloin kaikki pennut ovat syntyneet, ja varautumaan mahdollisiin komplikaatioihin.' },
      { heading: 'Sikiöiden seuranta', text: 'Tiineyden loppuvaiheessa ultraäänellä seurataan sikiöiden elinvoimaisuutta. Sydämenlyöntien tiheys kertoo sikiöiden voinnista — normaali sikiön syke on yli 200 lyöntiä minuutissa. Alentunut syke voi viitata sikiöahdinkoon, jolloin keisarinleikkaus voi olla tarpeen. Säännöllinen seuranta on erityisen tärkeää riskiraskauksissa.' },
      { heading: 'Keisarinleikkauksen suunnittelu', text: 'Joillakin roduilla (esim. englanninbulldoggi, ranskanbulldoggi, bostoninterrieri) keisarinleikkaus on usein suunniteltava etukäteen. Klinikallamme on valmius sekä suunniteltuihin että hätäkeisarinleikkauksiin. Tiineystutkimuksissa arvioidaan pentujen koko suhteessa synnytyskanavaan ja suunnitellaan synnytysten ajankohta yhdessä omistajan kanssa.' },
      { heading: 'Usein kysyttyä tiineystutkimuksesta', text: '<strong>Milloin tiineys näkyy ultraäänellä?</strong> Tiineys voidaan todeta ultraäänellä luotettavasti noin raskauspäivästä 24–25 alkaen. Tällöin näkyvät sikiörakkulat ja sikiöiden sydämenlyönnit ovat havaittavissa. Liian aikainen tutkimus voi antaa väärän negatiivisen tuloksen. Jos astutuksesta on kulunut vähemmän kuin 24 päivää, suosittelemme odottamaan muutaman päivän ja varaamaan ajan sen jälkeen. <strong>Kuinka monta pentua voidaan laskea?</strong> Ultraäänellä voidaan arvioida pentujen lukumäärää, mutta tarkin tulos saadaan röntgentutkimuksella noin raskauspäivästä 50 alkaen, jolloin sikiöiden luusto on mineralisoitunut. Röntgenkuvasta voidaan laskea kallot ja selkärangat luotettavasti. Tarkka pentumäärä on tärkeä tieto synnytyksen seurannan kannalta — se kertoo, milloin kaikki pennut ovat syntyneet.' },
    ],
    sv: {
      title: 'Dräktighetsundersökning — Djurklinik Saari, Vasa',
      h1: 'Dräktighetsundersökning',
      metaDesc: 'Dräktighetsundersökning för hund och katt i Vasa. Ultraljud, röntgen, fosterövervakning, planering av kejsarsnitt. Eläinklinikka Saari.',
      sections: [
        { heading: 'Fastställande av dräktighet med ultraljud', text: 'Med ultraljudsundersökning kan dräktighet konstateras tillförlitligt från ungefär dräktighetsdag 24. Undersökningen visar fosterhinnorna och fosternas livskraft kan bedömas utifrån hjärtslag. Ultraljud är en säker och smärtfri undersökning som inte utsätter honan eller fostren för strålning. Undersökningen görs på en vaken patient utan sedering.' },
        { heading: 'Röntgen — antal valpar', text: 'Med röntgenundersökning kan antalet valpar bedömas mer exakt från ungefär dräktighetsdag 50, då fosternas skelett har mineraliserats tillräckligt för att synas på röntgen. Att veta det exakta antalet valpar är viktigt för planeringen av förlossningen — det hjälper att identifiera när alla valpar har fötts och att förbereda sig för eventuella komplikationer.' },
        { heading: 'Fosterövervakning', text: 'I slutet av dräktigheten övervakas fosternas livskraft med ultraljud. Hjärtslagsfrekvensen berättar om fosternas tillstånd — normal fosterhjärtfrekvens är över 200 slag per minut. Sänkt frekvens kan tyda på fetal distress, varvid kejsarsnitt kan bli nödvändigt. Regelbunden uppföljning är särskilt viktig vid riskgraviditeter.' },
        { heading: 'Planering av kejsarsnitt', text: 'Hos vissa raser (t.ex. engelsk bulldogg, fransk bulldogg, bostonterrier) behöver kejsarsnitt ofta planeras i förväg. Vår klinik har beredskap för både planerade och akuta kejsarsnitt. Vid dräktighetsundersökning bedöms valparnas storlek i förhållande till förlossningskanalen och förlossningens tidpunkt planeras tillsammans med ägaren.' },
        { heading: 'Vanliga frågor om dräktighetsundersökning', text: '<strong>När syns dräktigheten på ultraljud?</strong> Dräktighet kan konstateras tillförlitligt med ultraljud från ungefär dräktighetsdag 24–25. Då syns fostersäckarna och fosternas hjärtslag kan registreras. En för tidig undersökning kan ge falskt negativt resultat. Om det gått mindre än 24 dagar sedan parningen rekommenderar vi att vänta några dagar och boka tid därefter. <strong>Hur många valpar kan räknas?</strong> Med ultraljud kan antalet valpar uppskattas, men det mest exakta resultatet fås med röntgen från ungefär dräktighetsdag 50, då fosternas skelett har mineraliserats. På röntgenbilden kan skallar och ryggrader räknas tillförlitligt. Exakt antal valpar är viktig information för uppföljningen av förlossningen — det berättar när alla valpar har fötts.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Pregnancy Examination — Eläinklinikka Saari, Vaasa',
      h1: 'Pregnancy Examination',
      metaDesc: 'Pregnancy examination for dogs and cats in Vaasa. Ultrasound, X-ray, fetal monitoring, C-section planning. Book at Eläinklinikka Saari.',
      sections: [
        { heading: 'Confirming pregnancy with ultrasound', text: 'Ultrasound can reliably confirm pregnancy from approximately day 24 of gestation. The examination reveals gestational sacs and fetal viability can be assessed based on heartbeats. Ultrasound is a safe and painless examination that does not expose the dam or foetuses to radiation. The examination is performed on an awake patient without sedation.' },
        { heading: 'X-ray — counting puppies', text: 'Radiography can more accurately estimate the number of puppies from approximately day 50 of gestation, when the fetal skeleton has mineralised sufficiently to be visible on X-ray. Knowing the exact number of puppies is important for delivery planning — it helps identify when all puppies have been born and prepare for potential complications.' },
        { heading: 'Fetal monitoring', text: 'In late pregnancy, fetal viability is monitored with ultrasound. Heart rate indicates fetal wellbeing — a normal fetal heart rate is above 200 beats per minute. A decreased rate may indicate fetal distress, in which case a caesarean section may be necessary. Regular monitoring is especially important in high-risk pregnancies.' },
        { heading: 'Caesarean section planning', text: 'In certain breeds (e.g. English Bulldog, French Bulldog, Boston Terrier), caesarean sections often need to be planned in advance. Our clinic is equipped for both planned and emergency caesarean sections. During pregnancy examinations, puppy size is assessed relative to the birth canal and the delivery timing is planned together with the owner.' },
        { heading: 'Frequently asked questions about pregnancy examinations', text: '<strong>When does pregnancy become visible on ultrasound?</strong> Pregnancy can be reliably confirmed by ultrasound from approximately day 24–25 of gestation. At this stage, gestational sacs are visible and fetal heartbeats can be detected. Too early an examination may give a false negative result. If fewer than 24 days have passed since mating, we recommend waiting a few days before booking. <strong>How many puppies can be counted?</strong> Ultrasound can estimate the number of puppies, but the most accurate count is obtained by X-ray from approximately day 50 of gestation, when the fetal skeletons have mineralised. Skulls and spines can be reliably counted on the radiograph. Knowing the exact number of puppies is important for monitoring delivery — it confirms when all puppies have been born.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['rokotukset', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Pregnancy Examination'
  },
  {
    slug: 'rehumyynti',
    slugSv: 'foderforsaljning',
    slugEn: 'prescription-diets',
    title: 'Rehumyynti — Eläinklinikka Saari, Vaasa',
    h1: 'Rehumyynti',
    metaDesc: 'Erikoisruokavaliot lemmikeille Vaasassa. Royal Canin, Specific, Hill\'s. Nivelrikko, munuaiset, allergia, painonhallinta. Eläinklinikka Saari.',
    icon: '🍖',
    sections: [
      { heading: 'Erikoisruokavaliot sairauksien hoitoon', text: 'Oikea ravinto on olennainen osa monen sairauden hoitoa. Erikoisruokavaliot on suunniteltu tukemaan hoitoa esimerkiksi nivelrikossa, munuaisten vajaatoiminnassa, vatsa- ja suolistosairauksissa, ruoka-aineallergioissa, virtsatiesairauksissa ja painonhallinnassa. Eläinlääkäri suosittelee sopivan ruokavalion lemmikin diagnoosin ja yksilöllisen tilanteen perusteella.' },
      { heading: 'Merkit ja valikoima', text: 'Klinikaltamme löydät laajan valikoiman erikoisruokia johtavilta valmistajilta: Royal Canin, Specific ja Hill\'s. Valikoimamme kattaa kuiva- ja märkäruokia koirille ja kissoille. Ruoat ovat saatavilla suoraan klinikalta ilman erillistä tilausta — voit hakea ruoan samalla käynnillä tai tilata sen noudettavaksi.' },
      { heading: 'Milloin erikoisruokavalio?', text: 'Erikoisruokavaliot ovat erityisen tärkeitä munuaisten vajaatoiminnassa (vähentää fosforin ja proteiinin kuormitusta), ruoka-aineallergioissa (hydrolysoidut tai uudet proteiinilähteet), nivelrikossa (lisätyt omega-rasvahapot ja niveltä tukevat ravintoaineet), virtsatiesairauksissa (virtsan pH:n säätely) ja painonhallinnassa (kontrolloitu energiasisältö). Oikea ravinto voi parantaa elämänlaatua merkittävästi.' },
      { heading: 'Asiantunteva neuvonta', text: 'Eläinlääkärimme auttavat valitsemaan lemmikillesi sopivan ruokavalion. Ravitsemuskonsultaatiossa arvioidaan lemmikin terveydentila, paino ja erityistarpeet. Autamme myös ruokavalion vaihdossa — uuteen ruokaan siirtyminen tehdään asteittain noin viikon aikana. Kysy meiltä neuvoa lemmikin ravitsemukseen liittyvissä kysymyksissä.' },
      { heading: 'Usein kysyttyä rehumyynnistä', text: '<strong>Tarvitaanko resepti erikoisruokiin?</strong> Suurin osa erikoisruoista ei vaadi reseptiä ja niitä voi ostaa suoraan klinikalta. Eläinlääkärin suositus on kuitenkin tärkeä, jotta lemmikille valitaan juuri oikea ruokavalio diagnoosiin ja yksilölliseen tilanteeseen sopivaksi. Väärä erikoisruoka voi jopa pahentaa oireita, joten suosittelemme aina keskustelua eläinlääkärin kanssa ennen ruokavalion vaihtoa. <strong>Voiko ruokaa tilata etukäteen?</strong> Kyllä, voit tilata ruokaa etukäteen soittamalla klinikkaan tai mainitsemalla asiasta edellisellä käynnillä. Tilaamme ruoan valmiiksi noudettavaksi, jolloin sinun ei tarvitse odottaa. Pidämme varastossa laajan valikoiman yleisimpiä erikoisruokia, mutta harvinaisempia tuotteita tilaamme tarpeen mukaan — toimitusaika on yleensä 1–3 arkipäivää.' },
    ],
    sv: {
      title: 'Foderförsäljning — Djurklinik Saari, Vasa',
      h1: 'Foderförsäljning',
      metaDesc: 'Specialfoder för husdjur i Vasa. Royal Canin, Specific, Hill\'s. Artros, njursjukdom, allergi, viktkontroll. Eläinklinikka Saari.',
      sections: [
        { heading: 'Specialfoder för sjukdomsbehandling', text: 'Rätt näring är en väsentlig del av behandlingen av många sjukdomar. Specialfoder är utformade för att stödja behandlingen av till exempel artros, njursvikt, mag- och tarmsjukdomar, födoämnesallergier, urinvägssjukdomar och viktkontroll. Veterinären rekommenderar en lämplig kost baserat på husdjurets diagnos och individuella situation.' },
        { heading: 'Märken och sortiment', text: 'Hos oss hittar du ett brett utbud av specialfoder från ledande tillverkare: Royal Canin, Specific och Hill\'s. Vårt sortiment omfattar torr- och våtfoder för hundar och katter. Fodren finns tillgängliga direkt på kliniken utan separat beställning — du kan hämta fodret vid samma besök eller beställa det för avhämtning.' },
        { heading: 'När behövs specialfoder?', text: 'Specialfoder är särskilt viktigt vid njursvikt (minskar fosfor- och proteinbelastningen), födoämnesallergier (hydrolyserade eller nya proteinkällor), artros (tillsatta omega-fettsyror och ledstödjande näringsämnen), urinvägssjukdomar (reglering av urinens pH) och viktkontroll (kontrollerat energiinnehåll). Rätt näring kan förbättra livskvaliteten avsevärt.' },
        { heading: 'Sakkunnig rådgivning', text: 'Våra veterinärer hjälper dig att välja rätt kost för ditt husdjur. Vid näringskonsultation bedöms husdjurets hälsotillstånd, vikt och specialbehov. Vi hjälper även vid kostbyte — övergången till ny kost görs gradvis under ungefär en vecka. Fråga oss om allt som rör ditt husdjurs näring.' },
        { heading: 'Vanliga frågor om foderförsäljning', text: '<strong>Behövs recept för specialfoder?</strong> De flesta specialfoder kräver inget recept och kan köpas direkt på kliniken. En veterinärrekommendation är dock viktig för att välja rätt kost för husdjurets diagnos och individuella situation. Fel specialfoder kan till och med förvärra symtomen, så vi rekommenderar alltid att diskutera med veterinären innan kostbyte. <strong>Kan man beställa foder i förväg?</strong> Ja, du kan beställa foder i förväg genom att ringa kliniken eller nämna det vid föregående besök. Vi beställer fodret färdigt för avhämtning så att du inte behöver vänta. Vi har ett brett lager av de vanligaste specialfodren, men mer sällsynta produkter beställer vi vid behov — leveranstiden är vanligen 1–3 arbetsdagar.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Prescription Diets — Eläinklinikka Saari, Vaasa',
      h1: 'Prescription Diets',
      metaDesc: 'Prescription diets for pets in Vaasa. Royal Canin, Specific, Hill\'s. Joint disease, kidney disease, allergies, weight management. Eläinklinikka Saari.',
      sections: [
        { heading: 'Prescription diets for disease management', text: 'Proper nutrition is an essential part of managing many diseases. Prescription diets are designed to support treatment of conditions such as osteoarthritis, kidney failure, gastrointestinal diseases, food allergies, urinary tract diseases, and weight management. Your veterinarian recommends a suitable diet based on your pet\'s diagnosis and individual situation.' },
        { heading: 'Brands and range', text: 'At our clinic you will find a wide selection of prescription diets from leading manufacturers: Royal Canin, Specific, and Hill\'s. Our range covers dry and wet foods for dogs and cats. Diets are available directly from the clinic without separate ordering — you can pick up the food during the same visit or order it for collection.' },
        { heading: 'When is a prescription diet needed?', text: 'Prescription diets are especially important in kidney failure (reducing phosphorus and protein load), food allergies (hydrolysed or novel protein sources), osteoarthritis (added omega fatty acids and joint-supporting nutrients), urinary tract diseases (urine pH regulation), and weight management (controlled energy content). The right nutrition can significantly improve quality of life.' },
        { heading: 'Expert advice', text: 'Our veterinarians help you choose the right diet for your pet. During a nutrition consultation, your pet\'s health status, weight, and special needs are assessed. We also help with diet transition — switching to a new food is done gradually over about one week. Ask us about any questions related to your pet\'s nutrition.' },
        { heading: 'Frequently asked questions about prescription diets', text: '<strong>Is a prescription needed for special diets?</strong> Most prescription diets do not require a prescription and can be purchased directly from the clinic. However, a veterinary recommendation is important to ensure the right diet is chosen for your pet\'s diagnosis and individual situation. The wrong prescription diet can even worsen symptoms, so we always recommend discussing with the veterinarian before changing diets. <strong>Can food be ordered in advance?</strong> Yes, you can order food in advance by calling the clinic or mentioning it at your previous visit. We order the food ready for collection so you do not need to wait. We keep a wide stock of the most common prescription diets, but rarer products are ordered on demand — delivery time is usually 1–3 working days.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['ruoka-allergiat', 'viljaton-ruoka', 'munuaisten-vajaatoiminta'],
    schemaService: 'Veterinary Prescription Diets'
  },
  {
    slug: 'kuntoutus',
    slugSv: 'rehabilitering',
    slugEn: 'rehabilitation',
    title: 'Hyvinvointi ja kuntoutus — Eläinklinikka Saari, Vaasa',
    h1: 'Hyvinvointi ja kuntoutus',
    metaDesc: 'Eläinten kuntoutus Vaasassa. Liikkumisanalyysi, hieronta, elektroterapia, harjoitusohjelmat, leikkauksen jälkeinen kuntoutus. Eläinklinikka Saari.',
    icon: '💪',
    sections: [
      { heading: 'Toimintakyvyn arviointi', text: 'Kuntoutuksen perustana on huolellinen toimintakyvyn arviointi. Eläinlääkäri arvioi lemmikin liikkumista, nivelten liikkuvuutta, lihasten kuntoa ja mahdollisia kiputiloja. Liikkumisanalyysin avulla tunnistetaan ongelma-alueet ja laaditaan yksilöllinen kuntoutussuunnitelma. Arviointi toistetaan säännöllisesti hoidon edistymisen seuraamiseksi.' },
      { heading: 'Kuntoutusmenetelmät', text: 'Klinikallamme on käytössä monipuoliset kuntoutusmenetelmät: manuaalinen terapia ja hieronta lihasjäykkyyden lievittämiseen, elektroterapia kivunlievitykseen ja lihasten stimulointiin, sekä yksilölliset harjoitusohjelmat lihasvoiman ja liikkuvuuden parantamiseen. Hoitosuunnitelma räätälöidään potilaan tarpeiden ja tavoitteiden mukaan.' },
      { heading: 'Leikkauksen jälkeinen kuntoutus', text: 'Leikkauksen jälkeinen kuntoutus on olennainen osa toipumista, erityisesti ortopedisten toimenpiteiden jälkeen. Kuntoutus nopeuttaa paranemista, palauttaa toimintakykyä ja vähentää komplikaatioiden riskiä. Aloitamme kuntoutuksen yleensä 1–2 viikkoa leikkauksen jälkeen ja jatkamme kunnes potilas on saavuttanut normaalin liikkumisen.' },
      { heading: 'Kroonisen kivun hallinta', text: 'Kuntoutus on tärkeä osa kroonisen kivun hoitoa, erityisesti nivelrikossa ja ikääntymiseen liittyvissä liikuntaelinvaivoissa. Säännöllinen kuntoutus yhdistettynä kipulääkitykseen ja tarvittaessa akupunktioon parantaa lemmikin elämänlaatua merkittävästi. Tavoitteena on aktiivinen ja kivuton arki mahdollisimman pitkään.' },
      { heading: 'Usein kysyttyä kuntoutuksesta', text: '<strong>Kuinka nopeasti kuntoutus kannattaa aloittaa leikkauksen jälkeen?</strong> Kuntoutuksen aloitusajankohta riippuu toimenpiteestä ja potilaan tilasta. Yleensä kuntoutus aloitetaan 1–2 viikkoa leikkauksen jälkeen, kun haavan paraneminen on hyvässä vauhdissa. Eläinlääkäri arvioi optimaalisen aloitusajankohdan jälkitarkastuksessa. Liian aikainen aloitus voi rasittaa leikkausaluetta, mutta liian pitkä odottaminen hidastaa lihasvoiman ja liikkuvuuden palautumista. <strong>Sopiiko kuntoutus myös vanhoille lemmikeille?</strong> Kyllä, kuntoutus sopii erinomaisesti iäkkäille lemmikeille. Ikääntyneillä koirilla ja kissoilla kuntoutus auttaa erityisesti nivelrikon oireiden hallinnassa, lihasvoiman ylläpitämisessä ja liikkuvuuden parantamisessa. Hoito-ohjelma räätälöidään potilaan kunnon ja rajoitteiden mukaan — iäkkäille lemmikeille valitaan hellävaraisempia menetelmiä ja harjoituksia. Monet omistajat huomaavat, että säännöllinen kuntoutus parantaa merkittävästi ikääntyneen lemmikin elämänlaatua ja aktiivisuutta arjessa.' },
    ],
    sv: {
      title: 'Välbefinnande och rehabilitering — Djurklinik Saari, Vasa',
      h1: 'Välbefinnande och rehabilitering',
      metaDesc: 'Djurrehabilitering i Vasa. Rörelseanalys, massage, elektroterapi, träningsprogram, postoperativ rehabilitering. Eläinklinikka Saari.',
      sections: [
        { heading: 'Funktionsbedömning', text: 'Grunden för rehabilitering är en noggrann funktionsbedömning. Veterinären bedömer husdjurets rörelse, ledrörlighet, muskelkondition och eventuella smärttillstånd. Med hjälp av rörelseanalys identifieras problemområden och en individuell rehabiliteringsplan upprättas. Bedömningen upprepas regelbundet för att följa behandlingens framsteg.' },
        { heading: 'Rehabiliteringsmetoder', text: 'Vår klinik erbjuder mångsidiga rehabiliteringsmetoder: manuell terapi och massage för att lindra muskelstelhet, elektroterapi för smärtlindring och muskelstimulering, samt individuella träningsprogram för att förbättra muskelstyrka och rörlighet. Behandlingsplanen skräddarsys efter patientens behov och mål.' },
        { heading: 'Postoperativ rehabilitering', text: 'Rehabilitering efter operation är en väsentlig del av tillfrisknandet, särskilt efter ortopediska ingrepp. Rehabilitering påskyndar läkningen, återställer funktionsförmågan och minskar risken för komplikationer. Vi påbörjar rehabiliteringen vanligen 1–2 veckor efter operationen och fortsätter tills patienten har uppnått normal rörlighet.' },
        { heading: 'Kronisk smärthantering', text: 'Rehabilitering är en viktig del av behandlingen av kronisk smärta, särskilt vid artros och åldersrelaterade muskuloskeletala besvär. Regelbunden rehabilitering i kombination med smärtmedicin och vid behov akupunktur förbättrar husdjurets livskvalitet avsevärt. Målet är en aktiv och smärtfri vardag så länge som möjligt.' },
        { heading: 'Vanliga frågor om rehabilitering', text: '<strong>Hur snabbt bör rehabiliteringen påbörjas efter operation?</strong> Tidpunkten för rehabiliteringens start beror på ingreppet och patientens tillstånd. Vanligen påbörjas rehabiliteringen 1–2 veckor efter operationen, när sårläkningen har kommit igång ordentligt. Veterinären bedömer den optimala starttidpunkten vid efterkontrollen. För tidig start kan belasta operationsområdet, men för lång väntan fördröjer återhämtningen av muskelstyrka och rörlighet. <strong>Passar rehabilitering även för äldre husdjur?</strong> Ja, rehabilitering passar utmärkt för äldre husdjur. Hos äldre hundar och katter hjälper rehabilitering särskilt med hantering av artrossymtom, bibehållande av muskelstyrka och förbättring av rörlighet. Behandlingsprogrammet skräddarsys efter patientens kondition och begränsningar — för äldre husdjur väljs skonsamma metoder och övningar. Många ägare märker att regelbunden rehabilitering avsevärt förbättrar det äldre husdjurets livskvalitet och aktivitetsnivå i vardagen.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Wellness and Rehabilitation — Eläinklinikka Saari, Vaasa',
      h1: 'Wellness and Rehabilitation',
      metaDesc: 'Veterinary rehabilitation in Vaasa. Mobility analysis, massage, electrotherapy, exercise programmes, post-surgical rehab. Eläinklinikka Saari.',
      sections: [
        { heading: 'Functional assessment', text: 'Rehabilitation is founded on a thorough functional assessment. The veterinarian evaluates your pet\'s movement, joint mobility, muscle condition, and any pain issues. Mobility analysis identifies problem areas and an individual rehabilitation plan is drawn up. The assessment is repeated regularly to track treatment progress.' },
        { heading: 'Rehabilitation methods', text: 'Our clinic offers a range of rehabilitation methods: manual therapy and massage to relieve muscle stiffness, electrotherapy for pain relief and muscle stimulation, and individual exercise programmes to improve muscle strength and mobility. The treatment plan is tailored to the patient\'s needs and goals.' },
        { heading: 'Post-surgical rehabilitation', text: 'Post-surgical rehabilitation is an essential part of recovery, especially after orthopaedic procedures. Rehabilitation accelerates healing, restores function, and reduces the risk of complications. We typically begin rehabilitation 1–2 weeks after surgery and continue until the patient has achieved normal mobility.' },
        { heading: 'Chronic pain management', text: 'Rehabilitation is an important part of chronic pain management, especially in osteoarthritis and age-related musculoskeletal conditions. Regular rehabilitation combined with pain medication and acupuncture when needed significantly improves your pet\'s quality of life. The goal is an active and pain-free daily life for as long as possible.' },
        { heading: 'Frequently asked questions about rehabilitation', text: '<strong>How soon should rehabilitation begin after surgery?</strong> The timing for starting rehabilitation depends on the procedure and the patient\'s condition. Rehabilitation typically begins 1–2 weeks after surgery, once wound healing is well under way. The veterinarian assesses the optimal start time at the post-operative check-up. Starting too early may strain the surgical site, but waiting too long delays the recovery of muscle strength and mobility. <strong>Is rehabilitation suitable for older pets?</strong> Yes, rehabilitation is excellent for elderly pets. In older dogs and cats, rehabilitation is particularly helpful for managing osteoarthritis symptoms, maintaining muscle strength, and improving mobility. The treatment programme is tailored to the patient\'s condition and limitations — gentler methods and exercises are chosen for older pets. Many owners notice that regular rehabilitation significantly improves their senior pet\'s quality of life and daily activity level.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['kipulääkeinfuusio', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Rehabilitation'
  },
  {
    slug: 'kastraatio',
    slugSv: 'kastrering',
    slugEn: 'castration',
    title: 'Kastraatio — Eläinklinikka Saari, Vaasa',
    h1: 'Kastraatio',
    metaDesc: 'Koiran, kissan ja kanin kastraatio Vaasassa. Kemiallinen kastraatio Suprelorin-implantilla. Inhalaatioanestesia. Eläinklinikka Saari.',
    icon: '✂️',
    sections: [
      { heading: 'Kastraatio kissoille, koirille ja kaneille', text: 'Kastraatio on yleinen ja turvallinen toimenpide, jossa poistetaan kivekset. Kissojen kastraatiolla ehkäistään merkkailua, kiertelyä ja tappeluvammoja. Koiran kastraatio voi olla lääketieteellisesti perusteltua eturauhasvaivojen, kiveskasvainten tai hormonaalisten käytösongelmien vuoksi. Myös kanien kastraatio on suositeltavaa, mikäli kani elää toisen kanin kanssa.' },
      { heading: 'Kemiallinen kastraatio', text: 'Koirille on tarjolla kemiallinen kastraatio Suprelorin-hormoni-implantilla. Implantti asetetaan ihon alle niskaan — toimenpide on nopea eikä vaadi anestesiaa. Vaikutus kestää 6 tai 12 kuukautta valitun implantin mukaan. Kemiallinen kastraatio on hyvä vaihtoehto, kun halutaan kokeilla kastraation vaikutusta käytökseen ennen pysyvää päätöstä, tai kun kirurgista toimenpidettä halutaan välttää.' },
      { heading: 'Turvallinen anestesia', text: 'Kirurginen kastraatio tehdään inhalaatioanestesiassa kattavalla kivunlievityksellä. Potilasta valvotaan jatkuvasti koko toimenpiteen ajan monitoreilla, jotka seuraavat sydämen sykettä, verenpainetta, happisaturaatiota ja lämpötilaa. Potilas kotiutuu yleensä samana päivänä ja saa mukaansa kipulääkityksen toipumisajalle.' },
      { heading: 'Oikea ajoitus ja neuvonta', text: 'Kastraation optimaalinen ajoitus riippuu eläimen lajista, rodusta ja koosta. Kissat kastroidaan yleensä noin 5–6 kuukauden iässä, koirat rodun mukaan 6–18 kuukauden iässä. Keskustellaan yhdessä, mikä on paras vaihtoehto juuri sinun lemmikillesi — kirurginen vai kemiallinen kastraatio, ja oikea ajankohta. Varaa aika konsultaatioon.' },
      { heading: 'Usein kysyttyä kastraatiosta', text: '<strong>Muuttuuko koiran käytös kastraation jälkeen?</strong> Kastraatio voi vähentää hormonaalista käytöstä kuten merkkailua, kiertelyä ja muita koiraita kohtaan osoitettua aggressiivisuutta. Vaikutus käytökseen riippuu kuitenkin yksilöstä — opitut käytösmallit eivät välttämättä muutu pelkän kastraation myötä. Kemiallinen kastraatio on hyvä tapa kokeilla vaikutusta ennen pysyvää päätöstä. Perusluonne ja opittu käytös säilyvät ennallaan. <strong>Voiko kastraation peruuttaa?</strong> Kirurginen kastraatio on pysyvä toimenpide, jota ei voi peruuttaa. Sen vuoksi tarjoamme kemiallista kastraatiota Suprelorin-implantilla, jonka vaikutus kestää 6 tai 12 kuukautta ja häviää sen jälkeen kokonaan. Kemiallinen kastraatio on erinomainen tapa kokeilla, miten kastraatio vaikuttaa koiran käytökseen ja terveyteen ennen lopullista päätöstä.' },
    ],
    sv: {
      title: 'Kastrering — Djurklinik Saari, Vasa',
      h1: 'Kastrering',
      metaDesc: 'Kastrering av hund, katt och kanin i Vasa. Kemisk kastrering med Suprelorin-implantat. Inhalationsanestesi. Eläinklinikka Saari.',
      sections: [
        { heading: 'Kastrering för katter, hundar och kaniner', text: 'Kastrering är ett vanligt och säkert ingrepp där testiklarna avlägsnas. Kastrering av katter förebygger markering, strövande och slagsmålsskador. Kastrering av hundar kan vara medicinskt motiverat vid prostataproblem, testikeltumörer eller hormonellt betingade beteendeproblem. Även kaninkastrering rekommenderas om kaninen lever med en annan kanin.' },
        { heading: 'Kemisk kastrering', text: 'För hundar finns kemisk kastrering med Suprelorin-hormonimplantat. Implantatet placeras under huden i nacken — ingreppet är snabbt och kräver ingen anestesi. Effekten varar 6 eller 12 månader beroende på valt implantat. Kemisk kastrering är ett bra alternativ när man vill testa kastrationens effekt på beteendet innan ett permanent beslut fattas, eller när man vill undvika kirurgiskt ingrepp.' },
        { heading: 'Säker anestesi', text: 'Kirurgisk kastrering utförs under inhalationsanestesi med omfattande smärtlindring. Patienten övervakas kontinuerligt under hela ingreppet med monitorer som följer hjärtfrekvens, blodtryck, syremättnad och temperatur. Patienten skrivs vanligen ut samma dag och får smärtstillande medicin med sig för tillfrisknandet.' },
        { heading: 'Rätt tidpunkt och rådgivning', text: 'Optimal tidpunkt för kastrering beror på djurets art, ras och storlek. Katter kastreras vanligen vid cirka 5–6 månaders ålder, hundar beroende på ras vid 6–18 månaders ålder. Vi diskuterar gärna vad som är det bästa alternativet just för ditt husdjur — kirurgisk eller kemisk kastrering, och rätt tidpunkt. Boka tid för konsultation.' },
        { heading: 'Vanliga frågor om kastrering', text: '<strong>Förändras hundens beteende efter kastrering?</strong> Kastrering kan minska hormonellt betingat beteende som markering, strövande och aggressivitet mot andra hundar. Effekten på beteendet beror dock på individen — inlärda beteendemönster förändras inte nödvändigtvis enbart genom kastrering. Kemisk kastrering är ett bra sätt att testa effekten innan ett permanent beslut fattas. Grundläggande personlighet och inlärt beteende förblir oförändrade. <strong>Kan kastrering ångras?</strong> Kirurgisk kastrering är ett permanent ingrepp som inte kan ångras. Därför erbjuder vi kemisk kastrering med Suprelorin-implantat, vars effekt varar 6 eller 12 månader och därefter försvinner helt. Kemisk kastrering är ett utmärkt sätt att testa hur kastrering påverkar hundens beteende och hälsa innan ett slutgiltigt beslut fattas.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Castration — Eläinklinikka Saari, Vaasa',
      h1: 'Castration',
      metaDesc: 'Dog, cat and rabbit castration in Vaasa. Chemical castration with Suprelorin implant. Inhalation anaesthesia. Book at Eläinklinikka Saari.',
      sections: [
        { heading: 'Castration for cats, dogs, and rabbits', text: 'Castration is a common and safe procedure in which the testicles are removed. Cat castration prevents spraying, roaming, and fight injuries. Dog castration may be medically indicated for prostate problems, testicular tumours, or hormonal behavioural issues. Rabbit castration is also recommended if the rabbit lives with another rabbit.' },
        { heading: 'Chemical castration', text: 'Chemical castration with a Suprelorin hormone implant is available for dogs. The implant is placed under the skin at the back of the neck — the procedure is quick and does not require anaesthesia. The effect lasts 6 or 12 months depending on the implant chosen. Chemical castration is a good option when you want to test the effect of castration on behaviour before making a permanent decision, or when surgical intervention is not desired.' },
        { heading: 'Safe anaesthesia', text: 'Surgical castration is performed under inhalation anaesthesia with comprehensive pain relief. The patient is continuously monitored throughout the procedure with monitors tracking heart rate, blood pressure, oxygen saturation, and temperature. Patients are typically discharged the same day with pain medication for the recovery period.' },
        { heading: 'Timing and guidance', text: 'The optimal timing for castration depends on the animal\'s species, breed, and size. Cats are usually castrated at around 5–6 months of age, dogs at 6–18 months depending on the breed. Let us discuss together what is the best option for your pet — surgical or chemical castration, and the right timing. Book a consultation appointment.' },
        { heading: 'Frequently asked questions about castration', text: '<strong>Does a dog\'s behaviour change after castration?</strong> Castration can reduce hormonal behaviours such as marking, roaming, and aggression towards other dogs. However, the effect on behaviour depends on the individual — learned behaviour patterns do not necessarily change through castration alone. Chemical castration is a good way to test the effect before making a permanent decision. Basic temperament and learned behaviour remain unchanged. <strong>Can castration be reversed?</strong> Surgical castration is a permanent procedure that cannot be reversed. That is why we offer chemical castration with a Suprelorin implant, whose effect lasts 6 or 12 months and then disappears completely. Chemical castration is an excellent way to test how castration affects your dog\'s behaviour and health before making a final decision.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['kohtutulehdus', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Castration',
    procedureType: 'SurgicalProcedure'
  },
  {
    slug: 'ortopedia',
    slugSv: 'ortopedi',
    slugEn: 'orthopedics',
    title: 'Ortopedia — Eläinklinikka Saari, Vaasa',
    h1: 'Ortopedia',
    metaDesc: 'Ortopedia Vaasassa: eturistisiteen korjaus (TTA, lateral suture), murtumaleikkaukset, amputaatiot, viralliset röntgentutkimukset. Eläinklinikka Saari.',
    icon: '🦴',
    sections: [
      { heading: 'Eturistisiteen korjausleikkaukset', text: 'Eturistisiteen repeämä on koiran yleisin ortopedinen ongelma. Klinikallamme käytetään kahta korjausmenetelmää: TTA (tibial tuberosity advancement) muuttaa polven biomekaniikkaa pysyvästi siirtämällä sääriluun kyhmyä eteenpäin — menetelmä sopii erityisesti aktiivisille ja keskikokoisille tai suurille koirille. Lateral suture -tekniikka stabiloi nivelen synteettisellä tukimateriaalilla ja on hyvä vaihtoehto pienille koirille ja kissoille.' },
      { heading: 'Murtumaleikkaukset ja amputaatiot', text: 'Klinikallamme tehdään murtumaleikkauksia, joissa luun kappaleet kiinnitetään levyillä, ruuveilla tai ulkoisella fiksaattorilla. Amputaatioita tehdään tarvittaessa — raaja, häntä tai varpaat — esimerkiksi vakavan trauman, kasvaimen tai kroonisen kiputilan vuoksi. Eläimet sopeutuvat kolmella jalalla yllättävän hyvin ja elämänlaatu paranee, kun kipu poistuu.' },
      { heading: 'Patellaluksaatio ja reisiluunpään poisto', text: 'Polvilumpion sijoiltaanmeno (patellaluksaatio) on yleinen erityisesti pienillä koiraroduilla. Hoito on leikkauksellinen, ja menetelmä valitaan luksaation vakavuusasteen mukaan. Reisiluunpään poisto (FHO) tehdään esimerkiksi kroonisen lonkkaluksaation tai Legg-Perthes-taudin vuoksi — toimenpide poistaa kivun lähteen ja potilas oppii käyttämään raajaa ilman lonkkaniveltä.' },
      { heading: 'Viralliset röntgentutkimukset', text: 'Klinikallamme on Suomen Kennelliiton hyväksyntä virallisiin lonkka-, kyynär- ja selkäröntgenkuvauksiin. Viralliset tutkimukset ovat osa jalostustarkastuksia ja niiden tavoitteena on vähentää perinnöllisten ortopedisten sairauksien esiintyvyyttä. Tutkimukset tehdään kevyessä rauhoituksessa ja kuvat lähetetään Kennelliiton arvostelijalle.' },
      { heading: 'Usein kysyttyä ortopediasta', text: '<strong>Kuinka pitkä on toipumisaika leikkauksen jälkeen?</strong> Toipumisaika riippuu toimenpiteestä. Eturistisiteen korjausleikkauksen (TTA tai lateral suture) jälkeen toipuminen kestää noin 8–12 viikkoa, jonka aikana liikkumista rajoitetaan asteittain. Murtumaleikkausten toipuminen kestää yleensä 6–12 viikkoa. Kuntoutus ja kontrollikäynnit ovat olennainen osa toipumista — ne nopeuttavat paranemista ja parantavat lopputulosta. <strong>Voiko ontumisen syyn selvittää ilman leikkausta?</strong> Kyllä, useimmat ontumisen syyt voidaan tutkia ilman leikkausta. Ortopedinen tutkimus, röntgenkuvat ja tarvittaessa ultraääni tai CT-kuvaus antavat tarkan diagnoosin. Kaikki ontumisen syyt eivät vaadi leikkausta — esimerkiksi lievä nivelrikko ja jänneongelmat hoidetaan usein konservatiivisesti lääkityksellä, levolla ja kuntoutuksella. Eläinlääkäri arvioi parhaan hoitolinjan yksilöllisesti.' },
    ],
    sv: {
      title: 'Ortopedi — Djurklinik Saari, Vasa',
      h1: 'Ortopedi',
      metaDesc: 'Ortopedi i Vasa: korsbandsskada (TTA, lateral suture), frakturoperationer, amputationer, officiella röntgenundersökningar. Eläinklinikka Saari.',
      sections: [
        { heading: 'Korsbandsskador', text: 'Korsbandsskada är hundens vanligaste ortopediska problem. Vår klinik använder två reparationsmetoder: TTA (tibial tuberosity advancement) förändrar knäets biomekanik permanent genom att flytta skenbensknölen framåt — metoden lämpar sig särskilt för aktiva och medelstora till stora hundar. Lateral suture-teknik stabiliserar leden med syntetiskt stödmaterial och är ett bra alternativ för små hundar och katter.' },
        { heading: 'Frakturoperationer och amputationer', text: 'Vår klinik utför frakturoperationer där benfragment fixeras med plattor, skruvar eller extern fixator. Amputationer utförs vid behov — ben, svans eller tår — till exempel vid allvarligt trauma, tumör eller kroniskt smärttillstånd. Djur anpassar sig förvånansvärt bra på tre ben och livskvaliteten förbättras när smärtan försvinner.' },
        { heading: 'Patellaluxation och femurhuvudresektion', text: 'Knäskålsluxation (patellaluxation) är vanligt särskilt hos små hundraser. Behandlingen är kirurgisk och metoden väljs utifrån luxationens svårighetsgrad. Femurhuvedresektion (FHO) utförs till exempel vid kronisk höftluxation eller Legg-Perthes sjukdom — ingreppet avlägsnar smärtkällan och patienten lär sig använda benet utan höftled.' },
        { heading: 'Officiella röntgenundersökningar', text: 'Vår klinik har Finska Kennelklubbens godkännande för officiella höft-, armbågs- och ryggröntgenundersökningar. Officiella undersökningar är en del av avelskontrollerna och syftar till att minska förekomsten av ärftliga ortopediska sjukdomar. Undersökningarna görs under lätt sedering och bilderna skickas till Kennelklubbens granskare.' },
        { heading: 'Vanliga frågor om ortopedi', text: '<strong>Hur lång är återhämtningsperioden efter operation?</strong> Återhämtningsperioden beror på ingreppet. Efter korsbandsskadeoperation (TTA eller lateral suture) varar återhämtningen cirka 8–12 veckor, under vilken tid rörligheten begränsas gradvis. Frakturoperationers återhämtning tar vanligen 6–12 veckor. Rehabilitering och kontrollbesök är en väsentlig del av tillfrisknandet — de påskyndar läkningen och förbättrar slutresultatet. <strong>Kan orsaken till hälta utredas utan operation?</strong> Ja, de flesta orsaker till hälta kan utredas utan operation. Ortopedisk undersökning, röntgenbilder och vid behov ultraljud eller CT-undersökning ger en exakt diagnos. Alla orsaker till hälta kräver inte operation — till exempel lindrig artros och senproblem behandlas ofta konservativt med medicinering, vila och rehabilitering. Veterinären bedömer den bästa behandlingslinjen individuellt.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Orthopaedics — Eläinklinikka Saari, Vaasa',
      h1: 'Orthopaedics',
      metaDesc: 'Veterinary orthopaedics in Vaasa: cruciate ligament repair (TTA, lateral suture), fracture surgery, amputations, official X-rays. Eläinklinikka Saari.',
      sections: [
        { heading: 'Cruciate ligament repair', text: 'Cruciate ligament rupture is the most common orthopaedic problem in dogs. Our clinic uses two repair methods: TTA (tibial tuberosity advancement) permanently alters the knee\'s biomechanics by advancing the tibial tuberosity — the method is especially suited for active medium to large dogs. The lateral suture technique stabilises the joint with synthetic support material and is a good option for small dogs and cats.' },
        { heading: 'Fracture surgery and amputations', text: 'Our clinic performs fracture surgery in which bone fragments are fixed with plates, screws, or external fixators. Amputations are performed when necessary — limb, tail, or digits — for example due to severe trauma, tumour, or chronic pain. Animals adapt surprisingly well on three legs and quality of life improves when pain is eliminated.' },
        { heading: 'Patella luxation and femoral head resection', text: 'Kneecap displacement (patella luxation) is common especially in small dog breeds. Treatment is surgical and the method is chosen based on the severity of the luxation. Femoral head osteotomy (FHO) is performed for example in chronic hip luxation or Legg-Perthes disease — the procedure removes the source of pain and the patient learns to use the limb without the hip joint.' },
        { heading: 'Official radiographic examinations', text: 'Our clinic holds Finnish Kennel Club approval for official hip, elbow, and spinal radiographic examinations. Official examinations are part of breeding evaluations and aim to reduce the incidence of hereditary orthopaedic diseases. Examinations are performed under light sedation and images are sent to the Kennel Club evaluator.' },
        { heading: 'Frequently asked questions about orthopaedics', text: '<strong>How long is the recovery period after surgery?</strong> The recovery period depends on the procedure. After cruciate ligament repair (TTA or lateral suture), recovery takes approximately 8–12 weeks, during which movement is gradually restricted. Fracture surgery recovery typically takes 6–12 weeks. Rehabilitation and check-up visits are an essential part of recovery — they accelerate healing and improve the outcome. <strong>Can the cause of lameness be determined without surgery?</strong> Yes, most causes of lameness can be investigated without surgery. Orthopaedic examination, X-rays, and when needed ultrasound or CT provide an accurate diagnosis. Not all causes of lameness require surgery — for example, mild osteoarthritis and tendon problems are often treated conservatively with medication, rest, and rehabilitation. The veterinarian assesses the best treatment approach individually.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['tta-leikkaus', 'lateral-suture', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Orthopedics',
    procedureType: 'SurgicalProcedure'
  },
  {
    slug: 'anestesia',
    slugSv: 'anestesi',
    slugEn: 'anesthesia',
    title: 'Anestesia — Eläinklinikka Saari, Vaasa',
    h1: 'Anestesia',
    metaDesc: 'Turvallinen eläinanestesia Vaasassa. Inhalaatioanestesia, jatkuva valvonta, kaksi ventilaattoria, balansoitu protokolla. Eläinklinikka Saari.',
    icon: '😴',
    sections: [
      { heading: 'Inhalaatioanestesia', text: 'Klinikallamme kaikki toimenpiteet tehdään inhalaatioanestesiassa, joka on turvallisin anestesiamuoto eläimille. Inhalaatioanestesiassa nukutusaine annetaan hengitysteitse, mikä mahdollistaa anestesian syvyyden tarkan säätelyn. Potilas herää nopeasti toimenpiteen jälkeen, koska anestesia-aine poistuu elimistöstä hengityksen kautta.' },
      { heading: 'Jatkuva valvonta', text: 'Potilasta valvotaan jatkuvasti koko anestesian ajan monitoroimalla: sydämen syke ja EKG, verenpaine, happisaturaatio (SpO2), kapnografia (uloshengityksen hiilidioksidi), hengitystaajuus ja ruumiinlämpötila. Kokenut hoitaja vastaa anestesiavalvonnasta koko toimenpiteen ajan, ja poikkeamiin reagoidaan välittömästi.' },
      { heading: 'Balansoitu anestesiaprotokolla', text: 'Käytämme modernia balansoitua anestesiaprotokollaa, jossa yhdistetään useita eri lääkeaineita pienemmillä annoksilla parhaan vaikutuksen ja turvallisuuden saavuttamiseksi. Jatkuva kipulääkeinfuusio (CRI) varmistaa tasaisen ja tehokkaan kivunlievityksen leikkauksen aikana ja sen jälkeen. Klinikalla on kaksi ventilaattoria potilasturvallisuuden varmistamiseksi.' },
      { heading: 'Ennen anestesiaa', text: 'Ennen toimenpidettä tehdään huolellinen esitarkastus ja tarvittaessa verikokeet. Arvioimme jokaisen potilaan yksilöllisesti ja valitsemme anestesiaprotokollan iän, rodun, terveydentilan ja toimenpiteen mukaan. Eläinlääkäri keskustelee anestesiaan liittyvistä riskeistä ja valmistautumisesta kanssasi. Potilaiden tulee olla syömättä 8–12 tuntia ennen toimenpidettä.' },
      { heading: 'Usein kysyttyä anestesiasta', text: '<strong>Onko anestesia turvallista?</strong> Moderni inhalaatioanestesia on erittäin turvallinen. Anestesiariski terveellä potilaalla on alle 0,1 %. Riskiä pienennetään huolellisella esitarkastuksella, verikokeilla, yksilöllisellä anestesiaprotokollalla ja jatkuvalla monitoroinnilla. Klinikallamme jokaista potilasta valvoo kokenut hoitaja, joka seuraa sydämen sykettä, verenpainetta, happisaturaatiota, kapnografiaa ja lämpötilaa reaaliajassa. <strong>Kuinka pitkään toipuminen kestää?</strong> Inhalaatioanestesiasta herääminen on nopeaa — useimmat potilaat ovat hereillä 10–30 minuutin kuluessa toimenpiteen päättymisestä. Potilas voi olla tokkurainen muutaman tunnin ajan, mutta palautuu yleensä normaaliksi saman päivän aikana. Kotiutus tapahtuu yleensä iltapäivällä, kun potilas kävelee itsenäisesti ja voi normaalisti. Kipulääkitys jatkuu kotona eläinlääkärin ohjeen mukaan.' },
    ],
    sv: {
      title: 'Anestesi — Djurklinik Saari, Vasa',
      h1: 'Anestesi',
      metaDesc: 'Säker veterinäranestesi i Vasa. Inhalationsanestesi, kontinuerlig övervakning, två ventilatorer, balanserat protokoll. Eläinklinikka Saari.',
      sections: [
        { heading: 'Inhalationsanestesi', text: 'På vår klinik utförs alla ingrepp under inhalationsanestesi, som är den säkraste anestesiformen för djur. Vid inhalationsanestesi ges narkosmedlet via andningsvägarna, vilket möjliggör exakt reglering av anestesidjupet. Patienten vaknar snabbt efter ingreppet eftersom anestesimedlet lämnar kroppen via andningen.' },
        { heading: 'Kontinuerlig övervakning', text: 'Patienten övervakas kontinuerligt under hela anestesin genom monitorering av: hjärtfrekvens och EKG, blodtryck, syremättnad (SpO2), kapnografi (koldioxid i utandningsluft), andningsfrekvens och kroppstemperatur. En erfaren sköterska ansvarar för anestesiövervakningen under hela ingreppet, och avvikelser åtgärdas omedelbart.' },
        { heading: 'Balanserat anestesiprotokoll', text: 'Vi använder ett modernt balanserat anestesiprotokoll där flera olika läkemedel kombineras i lägre doser för bästa effekt och säkerhet. Kontinuerlig smärtlindringsinfusion (CRI) säkerställer jämn och effektiv smärtlindring under och efter operationen. Kliniken har två ventilatorer för att säkerställa patientsäkerheten.' },
        { heading: 'Före anestesin', text: 'Före ingreppet görs en noggrann förundersökning och vid behov blodprov. Vi bedömer varje patient individuellt och väljer anestesiprotokoll utifrån ålder, ras, hälsotillstånd och typ av ingrepp. Veterinären diskuterar risker och förberedelser med dig. Patienter ska vara fastande 8–12 timmar före ingreppet.' },
        { heading: 'Vanliga frågor om anestesi', text: '<strong>Är anestesi säkert?</strong> Modern inhalationsanestesi är mycket säker. Anestesirisken för en frisk patient är under 0,1 %. Risken minskas genom noggrann förundersökning, blodprov, individuellt anestesiprotokoll och kontinuerlig övervakning. På vår klinik övervakas varje patient av en erfaren sköterska som följer hjärtfrekvens, blodtryck, syremättnad, kapnografi och temperatur i realtid. <strong>Hur lång tid tar återhämtningen?</strong> Uppvaknande från inhalationsanestesi är snabbt — de flesta patienter är vakna inom 10–30 minuter efter ingreppets slut. Patienten kan vara dåsig några timmar, men återgår vanligen till normalt tillstånd under samma dag. Hemgång sker vanligen på eftermiddagen, när patienten går självständigt och mår bra. Smärtlindring fortsätter hemma enligt veterinärens instruktioner.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Anaesthesia — Eläinklinikka Saari, Vaasa',
      h1: 'Anaesthesia',
      metaDesc: 'Safe veterinary anaesthesia in Vaasa. Inhalation anaesthesia, continuous monitoring, two ventilators, balanced protocol. Eläinklinikka Saari.',
      sections: [
        { heading: 'Inhalation anaesthesia', text: 'At our clinic, all procedures are performed under inhalation anaesthesia, which is the safest form of anaesthesia for animals. In inhalation anaesthesia, the anaesthetic agent is delivered via the airways, enabling precise control of anaesthesia depth. The patient wakes up quickly after the procedure because the anaesthetic is eliminated from the body through breathing.' },
        { heading: 'Continuous monitoring', text: 'The patient is continuously monitored throughout anaesthesia: heart rate and ECG, blood pressure, oxygen saturation (SpO2), capnography (end-tidal CO2), respiratory rate, and body temperature. An experienced nurse is responsible for anaesthesia monitoring throughout the procedure, and any deviations are addressed immediately.' },
        { heading: 'Balanced anaesthesia protocol', text: 'We use a modern balanced anaesthesia protocol combining multiple drugs at lower doses for optimal effect and safety. Continuous rate infusion (CRI) pain management ensures steady and effective pain relief during and after surgery. The clinic has two ventilators to ensure patient safety.' },
        { heading: 'Before anaesthesia', text: 'Before the procedure, a thorough pre-anaesthetic assessment is performed and blood tests are taken as needed. We assess each patient individually and select the anaesthesia protocol based on age, breed, health status, and the type of procedure. The veterinarian discusses risks and preparation with you. Patients should be fasted for 8–12 hours before the procedure.' },
        { heading: 'Frequently asked questions about anaesthesia', text: '<strong>Is anaesthesia safe?</strong> Modern inhalation anaesthesia is very safe. The anaesthesia risk for a healthy patient is less than 0.1%. Risk is minimised through thorough pre-anaesthetic assessment, blood tests, an individualised anaesthesia protocol, and continuous monitoring. At our clinic, every patient is monitored by an experienced nurse tracking heart rate, blood pressure, oxygen saturation, capnography, and temperature in real time. <strong>How long does recovery take?</strong> Waking from inhalation anaesthesia is rapid — most patients are awake within 10–30 minutes of the procedure ending. The patient may be drowsy for a few hours but typically returns to normal during the same day. Discharge usually occurs in the afternoon, once the patient is walking independently and feeling well. Pain medication continues at home according to the veterinarian\'s instructions.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['anestesiaturvallisuus', 'kipulääkeinfuusio', 'hypotermia'],
    schemaService: 'Veterinary Anesthesia'
  },
  {
    slug: 'hygienia',
    slugSv: 'hygien',
    slugEn: 'hygiene',
    title: 'Hygienia — Eläinklinikka Saari, Vaasa',
    h1: 'Hygienia',
    metaDesc: 'Korkea hygieniataso eläinklinikalla Vaasassa. Pintojen desinfiointi, UV-desinfiointi, ISFM-kissaystävälliset standardit. Eläinklinikka Saari.',
    icon: '🧼',
    sections: [
      { heading: 'Korkeat hygieniavaatimukset', text: 'Hygienia on yksi klinikkamme tärkeimmistä arvoista. Jokaisen potilaan välillä desinfioimme kaikki tutkimuspöydät ja pinnat, joihin potilas tai henkilökunta on koskenut. Käytämme tehokkaita desinfektioaineita, jotka tuhoavat bakteerit, virukset ja sienet. Näin estämme tartuntojen leviämisen potilaiden välillä.' },
      { heading: 'UV-desinfiointi ja kankaiden pesu', text: 'Käytämme UV-valoa kaikkien klinikan tilojen desinfiointiin säännöllisesti. UV-valo tuhoaa mikro-organismeja pinnoilta, joita perinteiset desinfektioaineet eivät välttämättä tavoita. Kaikki kankaat — pyyhkeet, peitot ja koiranpedit — pestään jokaisen käytön jälkeen. Kertakäyttöisiä materiaaleja käytetään aina kun mahdollista.' },
      { heading: 'Anestesia ja ilmanlaatu', text: 'Inhalaatioanestesiassa käytämme suodattimia, jotka estävät mikrobien leviämisen potilaiden välillä anestesialaitteiston kautta. Lattiat desinfioidaan kahdesti päivässä ja tehokkaammin aina tarpeen mukaan. Ilmanvaihto varmistaa puhtaan sisäilman kaikissa tiloissa.' },
      { heading: 'ISFM-kissaystävälliset standardit', text: 'Noudatamme International Society of Feline Medicine (ISFM) -standardeja kissaystävällisessä klinikkatoiminnassa. Tämä tarkoittaa erityistä huomiota kissapotilaiden hygieniaan, erillisiä odotustiloja ja tutkimushuoneita kissoille, sekä feromonivalmisteiden käyttöä stressin vähentämiseksi. Kissaystävälliset käytännöt parantavat sekä hygieniaa että potilaan hyvinvointia.' },
      { heading: 'Usein kysyttyä hygieniasta', text: '<strong>Kuinka usein tilat desinfioidaan?</strong> Jokaisen potilaan jälkeen desinfioimme kaikki tutkimuspöydät ja kosketuspinnat. Lattiat desinfioidaan kahdesti päivässä ja tehokkaammin aina tarpeen mukaan. UV-desinfiointi suoritetaan säännöllisesti kaikissa tiloissa. Kankaat — pyyhkeet, peitot ja koiranpedit — pestään jokaisen käytön jälkeen. Näin estämme tartuntojen leviämisen potilaiden välillä. <strong>Käytetäänkö antibakteerisia aineita?</strong> Käytämme tehokkaita desinfektioaineita, jotka tuhoavat bakteerit, virukset ja sienet. Desinfektioaineet valitaan niiden laaja-alaisuuden ja turvallisuuden perusteella — ne ovat tehokkaita mutta eivät aiheuta haittaa potilaille. Lisäksi käytämme UV-valoa pintojen desinfointiin, mikä täydentää kemiallista puhdistusta. Kertakäyttöisiä materiaaleja käytetään aina kun mahdollista.' },
    ],
    sv: {
      title: 'Hygien — Djurklinik Saari, Vasa',
      h1: 'Hygien',
      metaDesc: 'Hög hygiensstandard på djurkliniken i Vasa. Ytdesinfektion, UV-desinfektion, ISFM kattvänliga standarder. Eläinklinikka Saari.',
      sections: [
        { heading: 'Höga hygienkrav', text: 'Hygien är en av våra viktigaste värderingar. Mellan varje patient desinficerar vi alla undersökningsbord och ytor som patienten eller personalen har berört. Vi använder effektiva desinfektionsmedel som dödar bakterier, virus och svampar. Så förhindrar vi smittspridning mellan patienter.' },
        { heading: 'UV-desinfektion och tvättning av textilier', text: 'Vi använder UV-ljus för att regelbundet desinficera alla klinikens utrymmen. UV-ljus dödar mikroorganismer på ytor som traditionella desinfektionsmedel kanske inte når. Alla textilier — handdukar, filtar och hundbäddar — tvättas efter varje användning. Engångsmaterial används när det är möjligt.' },
        { heading: 'Anestesi och luftkvalitet', text: 'Vid inhalationsanestesi använder vi filter som förhindrar spridning av mikrober mellan patienter via anestesiutrustningen. Golven desinficeras två gånger dagligen och mer noggrant vid behov. Ventilationen säkerställer ren inomhusluft i alla utrymmen.' },
        { heading: 'ISFM kattvänliga standarder', text: 'Vi följer International Society of Feline Medicine (ISFM) standarder för kattvänlig klinikverksamhet. Det innebär särskild uppmärksamhet på hygien för kattpatienter, separata väntrum och undersökningsrum för katter, samt användning av feromonpreparat för att minska stress. Kattvänliga rutiner förbättrar både hygien och patientens välbefinnande.' },
        { heading: 'Vanliga frågor om hygien', text: '<strong>Hur ofta desinficeras lokalerna?</strong> Efter varje patient desinficerar vi alla undersökningsbord och beröringsytor. Golven desinficeras två gånger dagligen och mer noggrant vid behov. UV-desinfektion utförs regelbundet i alla utrymmen. Textilier — handdukar, filtar och hundbäddar — tvättas efter varje användning. Så förhindrar vi smittspridning mellan patienter. <strong>Används antibakteriella medel?</strong> Vi använder effektiva desinfektionsmedel som dödar bakterier, virus och svampar. Desinfektionsmedlen väljs utifrån deras bredspektrumsverkan och säkerhet — de är effektiva men skadar inte patienterna. Dessutom använder vi UV-ljus för ytdesinfektion, vilket kompletterar den kemiska rengöringen. Engångsmaterial används när det är möjligt.' },
      ],
      ctaTitle: 'Boka tid',
      ctaText: 'Ring oss eller boka tid online.',
      ctaCall: 'Ring (06) 321 7300',
      ctaBook: 'Boka online',
      back: '\u2190 Tillbaka till startsidan',
      relatedTitle: 'Relaterade artiklar',
    },
    en: {
      title: 'Hygiene — Eläinklinikka Saari, Vaasa',
      h1: 'Hygiene',
      metaDesc: 'High hygiene standards at the veterinary clinic in Vaasa. Surface disinfection, UV disinfection, ISFM cat-friendly standards. Eläinklinikka Saari.',
      sections: [
        { heading: 'High hygiene standards', text: 'Hygiene is one of our clinic\'s most important values. Between every patient, we disinfect all examination tables and surfaces that the patient or staff have touched. We use effective disinfectants that destroy bacteria, viruses, and fungi. This prevents the spread of infections between patients.' },
        { heading: 'UV disinfection and fabric washing', text: 'We use UV light to regularly disinfect all clinic areas. UV light destroys microorganisms on surfaces that traditional disinfectants may not reach. All fabrics — towels, blankets, and dog beds — are washed after every use. Disposable materials are used whenever possible.' },
        { heading: 'Anaesthesia and air quality', text: 'During inhalation anaesthesia, we use filters that prevent the spread of microbes between patients via the anaesthesia equipment. Floors are disinfected twice daily and more thoroughly as needed. Ventilation ensures clean indoor air in all areas.' },
        { heading: 'ISFM cat-friendly standards', text: 'We follow International Society of Feline Medicine (ISFM) standards for cat-friendly clinic practice. This means special attention to hygiene for cat patients, separate waiting areas and examination rooms for cats, and the use of pheromone products to reduce stress. Cat-friendly practices improve both hygiene and patient wellbeing.' },
        { heading: 'Frequently asked questions about hygiene', text: '<strong>How often are the premises disinfected?</strong> After every patient, we disinfect all examination tables and contact surfaces. Floors are disinfected twice daily and more thoroughly as needed. UV disinfection is performed regularly in all areas. Fabrics — towels, blankets, and dog beds — are washed after every use. This prevents the spread of infections between patients. <strong>Are antibacterial agents used?</strong> We use effective disinfectants that destroy bacteria, viruses, and fungi. Disinfectants are chosen based on their broad-spectrum efficacy and safety — they are effective but do not harm patients. Additionally, we use UV light for surface disinfection, which complements chemical cleaning. Disposable materials are used whenever possible.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['kissaystävällinen-klinikka', 'yksityinen-klinikka'],
    schemaService: 'Veterinary Clinic Hygiene'
  },
];

function generateServicePage(service, translations, lang) {
  lang = lang || 'fi';
  const t = (key) => translations[key]?.fi || '';
  const today = new Date().toISOString().split('T')[0];

  // Language-specific data
  const langData = lang === 'fi' ? null : service[lang];
  const pageTitle = lang === 'fi' ? service.title : (langData ? langData.title : service.title);
  const pageH1 = lang === 'fi' ? service.h1 : (langData ? langData.h1 : service.h1);
  const pageMetaDesc = lang === 'fi' ? service.metaDesc : (langData ? langData.metaDesc : service.metaDesc);
  const pageSections = lang === 'fi' ? service.sections : (langData ? langData.sections : service.sections);

  // CTA text
  const ctaTexts = {
    fi: { title: 'Varaa aika', text: 'Soita meille tai varaa aika verkosta.', call: 'Soita (06) 321 7300', book: 'Varaa verkossa' },
    sv: langData ? { title: langData.ctaTitle, text: langData.ctaText, call: langData.ctaCall, book: langData.ctaBook } : { title: 'Boka tid', text: 'Ring oss eller boka tid online.', call: 'Ring (06) 321 7300', book: 'Boka online' },
    en: langData ? { title: langData.ctaTitle, text: langData.ctaText, call: langData.ctaCall, book: langData.ctaBook } : { title: 'Book an appointment', text: 'Call us or book online.', call: 'Call (06) 321 7300', book: 'Book online' },
  };
  const cta = ctaTexts[lang] || ctaTexts.fi;

  // Back button text
  const backTexts = { fi: '\u2190 Takaisin etusivulle', sv: '\u2190 Tillbaka till startsidan', en: '\u2190 Back to homepage' };
  const backText = (lang !== 'fi' && langData) ? langData.back : backTexts[lang] || backTexts.fi;

  // Skip link text
  const skipTexts = { fi: 'Siirry sisältöön', sv: 'Hoppa till innehållet', en: 'Skip to content' };
  const skipText = skipTexts[lang] || skipTexts.fi;

  // OG locale
  const ogLocales = { fi: 'fi_FI', sv: 'sv_SE', en: 'en_US' };
  const ogLocale = ogLocales[lang] || 'fi_FI';

  // URLs for all language versions
  const fiUrl = `${BASE_URL}/palvelut/${service.slug}/`;
  const svUrl = `${BASE_URL}/sv/tjanster/${service.slugSv}/`;
  const enUrl = `${BASE_URL}/en/services/${service.slugEn}/`;
  const canonicalUrl = lang === 'fi' ? fiUrl : (lang === 'sv' ? svUrl : enUrl);

  // Asset path: FI pages are at /palvelut/slug/, SV/EN at /sv/tjanster/slug/ or /en/services/slug/
  const assetPrefix = lang === 'fi' ? '../../' : '../../../';
  const homeUrl = lang === 'fi' ? assetPrefix : assetPrefix + '?lang=' + lang;

  // Breadcrumb labels
  const breadcrumbHome = { fi: 'Etusivu', sv: 'Startsidan', en: 'Home' };
  const breadcrumbServices = { fi: 'Palvelut', sv: 'Tjänster', en: 'Services' };

  // Footer text
  const footerDesc = {
    fi: 'Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.',
    sv: 'Finsk privatägd smådjursklinik i Dragsnäsbäck, Vasa, vid Bockis-kurvan.',
    en: 'Finnish privately owned small animal clinic in Dragsnäsbäck, Vaasa.'
  };
  const footerQuicklinks = { fi: 'Pikalinkit', sv: 'Snabblänkar', en: 'Quick links' };
  const footerContact = { fi: 'Yhteystiedot', sv: 'Kontaktuppgifter', en: 'Contact' };
  const footerFollow = { fi: 'Seuraa meitä', sv: 'Följ oss', en: 'Follow us' };
  const footerRights = { fi: 'Kaikki oikeudet pidätetään.', sv: 'Alla rättigheter förbehållna.', en: 'All rights reserved.' };
  const footerBusinessId = { fi: 'Y-tunnus', sv: 'FO-nummer', en: 'Business ID' };
  const footerAbout = { fi: 'Meistä', sv: 'Om oss', en: 'About Us' };
  const footerContactPage = { fi: 'Yhteystiedot', sv: 'Kontakt', en: 'Contact' };
  const footerArticles = { fi: 'Artikkelit', sv: 'Artiklar', en: 'Articles' };
  const footerPrivacy = { fi: 'Tietosuoja', sv: 'Integritetspolicy', en: 'Privacy Policy' };
  const navLabels = {
    fi: { about: 'Klinikka', services: 'Palvelut', team: 'Henkilökunta', catfriendly: 'Cat Friendly', prices: 'Hinnasto', wildlife: 'Wildlife' },
    sv: { about: 'Kliniken', services: 'Tjänster', team: 'Personal', catfriendly: 'Cat Friendly', prices: 'Prislista', wildlife: 'Wildlife' },
    en: { about: 'Clinic', services: 'Services', team: 'Staff', catfriendly: 'Cat Friendly', prices: 'Prices', wildlife: 'Wildlife' }
  };
  const nav = navLabels[lang] || navLabels.fi;

  // Related articles title
  const relatedTitle = (lang !== 'fi' && langData) ? langData.relatedTitle : { fi: 'Aiheeseen liittyvät artikkelit', sv: 'Relaterade artiklar', en: 'Related articles' }[lang] || 'Aiheeseen liittyvät artikkelit';

  // Build body sections
  let sectionsHtml = '';
  for (const section of pageSections) {
    sectionsHtml += `
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${section.text}</p>`;
  }

  // Build related articles — translate titles/tags/intros per page language
  const tLang = (key) => translations[key]?.[lang] || translations[key]?.fi || '';
  const articlePathPrefix = lang === 'fi' ? 'articles' : lang === 'sv' ? 'sv/artiklar' : 'en/articles';
  let relatedHtml = '';
  if (service.relatedArticles && service.relatedArticles.length > 0) {
    let cards = '';
    for (const slug of service.relatedArticles) {
      const article = articles.find(a => a.slug === slug);
      if (!article) continue;
      const title = tLang(article.titleKey);
      const tag = tLang(article.tagKey);
      const intro = tLang(`${article.prefix}.intro`);
      const shortIntro = intro.length > 120 ? intro.substring(0, 117) + '...' : intro;
      const localizedSlug = articleSlug(article, lang);
      cards += `
          <a href="${assetPrefix}${articlePathPrefix}/${localizedSlug}.html" class="related-article-card">
            <span class="article-tag">${escapeHtml(tag)}</span>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(shortIntro)}</p>
          </a>`;
    }
    if (cards) {
      const relatedNote = lang === 'sv' ? '<p class="related-note">Artiklarna finns tillgängliga på finska.</p>'
        : lang === 'en' ? '<p class="related-note">Articles are available in Finnish.</p>'
        : '';
      relatedHtml = `
      <div class="related-articles">
        <h2>${escapeHtml(relatedTitle)}</h2>${relatedNote}
        <div class="related-articles-grid">${cards}
        </div>
      </div>`;
    }
  }

  // Language switcher
  const langSwitcher = `
          <div class="lang-toggle">
            <a href="${'/' + 'palvelut/' + service.slug + '/'}" class="${lang === 'fi' ? 'active' : ''}"${lang === 'fi' ? ' aria-current="page"' : ''}>FI</a>
            <a href="${'/sv/tjanster/' + service.slugSv + '/'}" class="${lang === 'sv' ? 'active' : ''}"${lang === 'sv' ? ' aria-current="page"' : ''}>SV</a>
            <a href="${'/en/services/' + service.slugEn + '/'}" class="${lang === 'en' ? 'active' : ''}"${lang === 'en' ? ' aria-current="page"' : ''}>EN</a>
          </div>`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google.com https://www.google.fi https://googleads.g.doubleclick.net https://www.facebook.com https://*.facebook.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net; frame-src https://www.google.com; frame-ancestors 'none'">
  <title>${escapeHtml(pageTitle)}</title>

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
    gtag('config', 'AW-816483191');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-92LHP2TK6N"></script>
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
      'event_callback': callback
    });
    return false;
  }
  </script>

  <meta name="description" content="${escapeAttr(pageMetaDesc)}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="fi" href="${fiUrl}">
  <link rel="alternate" hreflang="sv" href="${svUrl}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="x-default" href="${fiUrl}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeAttr(pageH1)} — Eläinklinikka Saari">
  <meta property="og:description" content="${escapeAttr(pageMetaDesc)}">
  <meta property="og:image" content="${BASE_URL}/images/clinic-about.jpg">
  <meta property="og:locale" content="${ogLocale}">
  <meta property="og:site_name" content="Eläinklinikka Saari">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(pageH1)} — Eläinklinikka Saari">
  <meta name="twitter:description" content="${escapeAttr(pageMetaDesc)}">
  <meta name="twitter:image" content="${BASE_URL}/images/clinic-about.jpg">

  <script type="application/ld+json">
  [{
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": ${JSON.stringify(pageH1)},
    "description": ${JSON.stringify(pageMetaDesc)},
    "url": "${canonicalUrl}",
    "lastReviewed": "${today}",
    "mainEntity": {
      "@type": "MedicalProcedure",
      "name": "${service.schemaService}",
      "procedureType": "http://schema.org/${service.procedureType || 'NoninvasiveProcedure'}"
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Eläinklinikka Saari",
      "url": "${BASE_URL}"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "${breadcrumbHome[lang] || 'Etusivu'}",
        "item": "${BASE_URL}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": ${JSON.stringify(pageH1)},
        "item": "${canonicalUrl}"
      }
    ]
  }${service.faq && service.faq.length > 0 ? `,
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [${service.faq.map(f => `
      {
        "@type": "Question",
        "name": ${JSON.stringify(f.q)},
        "acceptedAnswer": {
          "@type": "Answer",
          "text": ${JSON.stringify(f.a)}
        }
      }`).join(',')}
    ]
  }` : ''}]
  </script>

  <link rel="preload" as="image" href="${assetPrefix}images/logo.png">
  <link rel="stylesheet" href="${assetPrefix}css/style.css">
  <link rel="icon" type="image/png" href="${assetPrefix}images/logo.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">${escapeHtml(skipText)}</a>

  <header class="header">
    <div class="container">
      <a href="${homeUrl}" class="logo">
        <div class="logo-icon"><img src="${assetPrefix}images/logo.png" alt="Eläinklinikka Saari" width="240" height="240"></div>
      </a>
      <a href="${homeUrl}#cat-friendly" class="cfc-header-logo" aria-label="Silver accredited Cat Friendly Clinic 2026">
        <img src="${assetPrefix}images/cat-friendly-clinic-silver-2026.png" alt="Silver accredited Cat Friendly Clinic 2026" width="1284" height="686">
      </a>
${renderHeaderNav({ lang, homeUrl, articlesUrl: getArticlesUrl(lang), fiUrl, svUrl, enUrl })}
    </div>
  </header>

  <main id="main-content">
  <section class="section articles-section">
    <div class="container">
      <article class="article-card">
        <div class="article-header">
          <span class="service-icon-large">${service.icon}</span>
        </div>
        <h1>${escapeHtml(pageH1)}</h1>
        <div class="article-content">${sectionsHtml}
        </div>
      </article>

      <div class="service-cta-box">
        <h2>${escapeHtml(cta.title)}</h2>
        <p>${escapeHtml(cta.text)}</p>
        <div class="service-cta-buttons">
          <a href="tel:+35863217300" class="btn btn-primary" onclick="gtag_report_conversion();">${escapeHtml(cta.call)}</a>
          <a href="https://my.provet.com/elainklinikka-saari" target="_blank" rel="noopener" class="btn btn-outline">${escapeHtml(cta.book)}</a>
        </div>
      </div>
${relatedHtml}
      <a href="${homeUrl}" class="btn btn-secondary articles-back">${escapeHtml(backText)}</a>
    </div>
  </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <p>${escapeHtml(footerDesc[lang] || footerDesc.fi)}</p>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">${escapeHtml(footerQuicklinks[lang] || footerQuicklinks.fi)}</strong>
          <a href="${homeUrl}#about">${escapeHtml(nav.about)}</a>
          <a href="${homeUrl}#services">${escapeHtml(nav.services)}</a>
          <a href="${homeUrl}#team">${escapeHtml(nav.team)}</a>
          <a href="${homeUrl}#cat-friendly">${escapeHtml(nav.catfriendly)}</a>
          <a href="${homeUrl}#prices">${escapeHtml(nav.prices)}</a>
          <a href="${homeUrl}#wildlife">${escapeHtml(nav.wildlife)}</a>
          <a href="/meista/">${escapeHtml(footerAbout[lang] || footerAbout.fi)}</a>
          <a href="/yhteystiedot/">${escapeHtml(footerContactPage[lang] || footerContactPage.fi)}</a>
          <a href="/artikkelit/">${escapeHtml(footerArticles[lang] || footerArticles.fi)}</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">${escapeHtml(footerContact[lang] || footerContact.fi)}</strong>
          <a href="tel:+35863217300" onclick="gtag_report_conversion();">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">${escapeHtml(footerFollow[lang] || footerFollow.fi)}</strong>
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
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; ${footerBusinessId[lang] || footerBusinessId.fi}: 0708667-9 &middot; ${escapeHtml(footerRights[lang] || footerRights.fi)}</span>
        <a href="/tietosuoja/">${escapeHtml(footerPrivacy[lang] || footerPrivacy.fi)}</a>
      </div>
    </div>
  </footer>

  <script src="${assetPrefix}js/main.js"></script>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// 8. Generate privacy policy standalone page
// ──────────────────────────────────────────────
function generatePrivacyPage() {
  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google.com https://www.google.fi https://googleads.g.doubleclick.net https://www.facebook.com https://*.facebook.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net; frame-src https://www.google.com; frame-ancestors 'none'">
  <title>Tietosuojaseloste — Eläinklinikka Saari</title>

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

  <meta name="description" content="Eläinklinikka Saari Oy:n tietosuojaseloste. Henkilötietojen käsittely, rekisteröidyn oikeudet ja tietojen suojaus.">
  <meta name="page-topic" content="Privacy Policy">
  <link rel="canonical" href="${BASE_URL}/tietosuoja/">
  <link rel="alternate" hreflang="fi" href="${BASE_URL}/tietosuoja/">
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/tietosuoja/">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/tietosuoja/">
  <meta property="og:title" content="Tietosuojaseloste — Eläinklinikka Saari">
  <meta property="og:description" content="Eläinklinikka Saari Oy:n tietosuojaseloste ja rekisteriseloste.">
  <meta property="og:image" content="${BASE_URL}/images/clinic-about.jpg">
  <meta property="og:locale" content="fi_FI">
  <meta property="og:site_name" content="Eläinklinikka Saari">

  <link rel="preload" as="image" href="../images/logo.png">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/png" href="../images/logo.png">
</head>
<body class="article-page">

  <a href="#main-content" class="skip-link">Siirry sisältöön</a>

  <header class="header">
    <div class="container">
      <a href="../" class="logo">
        <div class="logo-icon"><img src="../images/logo.png" alt="Eläinklinikka Saari" width="240" height="240"></div>
      </a>
      <a href="../#cat-friendly" class="cfc-header-logo" aria-label="Silver accredited Cat Friendly Clinic 2026">
        <img src="../images/cat-friendly-clinic-silver-2026.png" alt="Silver accredited Cat Friendly Clinic 2026" width="1284" height="686">
      </a>
${renderHeaderNav({ lang: 'fi', homeUrl: '../', articlesUrl: getArticlesUrl('fi'), fiUrl: getArticlesUrl('fi'), svUrl: getArticlesUrl('sv'), enUrl: getArticlesUrl('en') })}
    </div>
  </header>

  <main id="main-content">
  <section class="section articles-section">
    <div class="container">
      <article class="article-card">
        <h1>Tietosuojaseloste</h1>
        <div class="article-content">
          <h2>Rekisterinpitäjä</h2>
          <p>Eläinklinikka Saari Oy<br>Y-tunnus: 0708667-9<br>Gerbyntie 18, 65230 Vaasa</p>

          <h2>Rekisteriasioiden yhteyshenkilö</h2>
          <p>Pamela Kvarngård<br>Puh: 06-3217300<br>info@saarivet.fi</p>

          <h2>Rekisterin nimi</h2>
          <p>Eläinklinikka Saari Oy:n asiakasrekisteri</p>

          <h2>Henkilötietojen käyttötarkoitus</h2>
          <p>Henkilötietoja käytetään viestintään, asiakaspalveluun ja potilassuhteen ylläpitoon.</p>

          <h2>Käsittelyn oikeusperuste</h2>
          <p>Henkilötietojen käsittely perustuu sopimussuhteeseen (eläinlääkäripalveluiden tarjoaminen) sekä lakisääteisiin velvoitteisiin (eläinlääkintähuoltolaki, kirjanpitolaki). Erämaksun yhteydessä käsittely perustuu oikeutettuun etuun.</p>

          <h2>Rekisterin tietokentät</h2>
          <p>Potilaan tiedot ja omistajan nimi, puhelinnumero, osoite ja sähköpostiosoite. Asiakkaiden sosiaaliturvatunnus vain jos käyttää erämaksua. Potilaan hoitohistoria: toimenpiteet, asiakasviestintä ja hoitosuunnitelmat. Vakuutusnumero tarvittaessa.</p>

          <h2>Tietolähteet</h2>
          <p>Tiedot saadaan pääasiassa asiakkailta. Potilasasiakirjat voivat sisältää tietoja muista klinikoista, mikäli asiakas on saanut hoitoa muualla tai siirtänyt asiakkuutensa.</p>

          <h2>Tietojen luovutus</h2>
          <p>Tietoja luovutetaan vain asiantuntijoille (eläinlääkärit) konsultaatiotapauksissa (nimi, osoite, potilastiedot, löydökset). Muutoin tietoja ei luovuteta kolmansille osapuolille ellei asiakas sitä edellytä.</p>

          <h2>Tietojen suojaus</h2>
          <p>Rekisteri on talletettu salasanasuojattuun asiakkuudenhallintajärjestelmään, johon on pääsy Eläinklinikka Saari Oy:n valtuuttamilla henkilökunnan jäsenillä.</p>

          <h2>Tietojen säilytysaika</h2>
          <p>Potilasasiakirjoja säilytetään vähintään 3 vuotta viimeisestä hoitokäynnistä eläinlääkintälainsäädännön mukaisesti. Kirjanpitoaineistoa säilytetään 6 vuotta tilikauden päättymisestä. Muut henkilötiedot poistetaan, kun asiakassuhde päättyy eikä säilyttämiselle ole lakisääteistä perustetta.</p>

          <h2>Rekisteröidyn oikeudet</h2>
          <p>Asiakkaalla on oikeus tarkistaa itseään koskevat tiedot sekä pyytää virheellisten, tarpeettomien, puutteellisten tai vanhentuneiden tietojen korjaamista tai poistamista.</p>

          <h2>Tarkemmat oikeudet (EU:n yleinen tietosuoja-asetus)</h2>
          <p>Rekisteröidyllä on oikeus: (1) saada pääsy omiin tietoihinsa, (2) vaatia tietojen oikaisua, (3) vaatia tietojen poistamista, ellei säilyttämiselle ole lakisääteistä perustetta, (4) rajoittaa tietojen käsittelyä, (5) siirtää tiedot toiselle rekisterinpitäjälle (tietojen siirrettävyys), (6) vastustaa tietojen käsittelyä. Pyynnöt tulee osoittaa rekisteriasioiden yhteyshenkilölle. Rekisteröidyllä on myös oikeus tehdä valitus valvontaviranomaiselle: Tietosuojavaltuutetun toimisto, tietosuoja.fi.</p>

          <h2>Digitaaliset palvelut</h2>
          <p>Verkkosivusto käyttää Google Analytics -palvelua kävijäliikenteen analysointiin. Analytiikkaevästeet otetaan käyttöön vain käyttäjän suostumuksella. Ajanvaraus tapahtuu ProvetCloud-järjestelmän kautta, jonka tietosuojasta vastaa Finnish Net Solutions Oy. WhatsApp-viestipalvelussa viestejä käsittelee tekoälypohjainen chatbot asiakaspalvelun tueksi.</p>

          <h2>Luottopäätöksen käsittely</h2>
          <p>Lindorff Invest Oy toimii rekisterinpitäjänä maksuhakemusten käsittelyssä. Henkilötiedot ovat välttämättömiä hakemuksen käsittelyyn, luottopäätökseen ja asiakassuhteen hoitoon. Automaattisia luottopäätöksiä voi kiistää ja pyytää manuaalista käsittelyä ottamalla yhteyttä Lindorffin asiakaspalveluun, puh. 02 2700 327. Lisätietoja: lindorff.fi/tietosuoja.</p>
        </div>
      </article>

      <a href="../" class="btn btn-secondary articles-back">← Takaisin etusivulle</a>
    </div>
  </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <p>Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.</p>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Pikalinkit</strong>
          <a href="../#about">Klinikka</a>
          <a href="../#services">Palvelut</a>
          <a href="../#team">Henkilökunta</a>
          <a href="../#cat-friendly">Cat Friendly</a>
          <a href="../#prices">Hinnasto</a>
          <a href="../#wildlife">Wildlife</a>
          <a href="/meista/">Meistä</a>
          <a href="/yhteystiedot/">Yhteystiedot</a>
          <a href="/artikkelit/">Artikkelit</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Yhteystiedot</strong>
          <a href="tel:+35863217300">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Seuraa meitä</strong>
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
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; Y-tunnus: 0708667-9 &middot; Kaikki oikeudet pidätetään.</span>
        <a href="/tietosuoja/">Tietosuoja</a>
      </div>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// 9a. Generate About page (/meista/)
// ──────────────────────────────────────────────
function generateAboutPage() {
  const today = new Date().toISOString().split('T')[0];
  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google.com https://www.google.fi https://googleads.g.doubleclick.net https://www.facebook.com https://*.facebook.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net; frame-src https://www.google.com; frame-ancestors 'none'">
  <title>Tietoa klinikasta — Eläinklinikka Saari, Vaasa</title>

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
    gtag('config', 'AW-816483191');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-92LHP2TK6N"></script>
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
      'event_callback': callback
    });
    return false;
  }
  </script>

  <meta name="description" content="Eläinklinikka Saari on suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä. Laaja diagnostiikka, moderni kirurgia, sydäntutkimukset ja ISFM-kissaystävällinen klinikka.">
  <meta name="page-topic" content="About us">
  <link rel="canonical" href="${BASE_URL}/meista/">
  <link rel="alternate" hreflang="fi" href="${BASE_URL}/meista/">
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/meista/">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/meista/">
  <meta property="og:title" content="Tietoa klinikasta — Eläinklinikka Saari">
  <meta property="og:description" content="Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä. Laaja diagnostiikka, moderni kirurgia, ISFM-kissaystävällinen klinikka.">
  <meta property="og:image" content="${BASE_URL}/images/clinic-about.jpg">
  <meta property="og:locale" content="fi_FI">
  <meta property="og:site_name" content="Eläinklinikka Saari">

  <script type="application/ld+json">
  [{
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "name": "Eläinklinikka Saari",
    "description": "Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä",
    "url": "${BASE_URL}",
    "telephone": "+358-6-321-7300",
    "email": "info@saarivet.fi",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gerbyntie 18",
      "addressLocality": "Vaasa",
      "postalCode": "65230",
      "addressCountry": "FI"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "16:00"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Etusivu", "item": "${BASE_URL}/" },
      { "@type": "ListItem", "position": 2, "name": "Tietoa klinikasta", "item": "${BASE_URL}/meista/" }
    ]
  }]
  </script>

  <link rel="preload" as="image" href="../images/logo.png">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/png" href="../images/logo.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">Siirry sisältöön</a>

  <header class="header">
    <div class="container">
      <a href="../" class="logo">
        <div class="logo-icon"><img src="../images/logo.png" alt="Eläinklinikka Saari" width="240" height="240"></div>
      </a>
      <a href="../#cat-friendly" class="cfc-header-logo" aria-label="Silver accredited Cat Friendly Clinic 2026">
        <img src="../images/cat-friendly-clinic-silver-2026.png" alt="Silver accredited Cat Friendly Clinic 2026" width="1284" height="686">
      </a>
${renderHeaderNav({ lang: 'fi', homeUrl: '../', articlesUrl: getArticlesUrl('fi'), fiUrl: getArticlesUrl('fi'), svUrl: getArticlesUrl('sv'), enUrl: getArticlesUrl('en') })}
    </div>
  </header>

  <main id="main-content">
  <section class="section articles-section">
    <div class="container">
      <article class="article-card">
        <h1>Tietoa klinikasta</h1>
        <div class="article-content">
          <h2>Eläinklinikka Saari — yksityinen pieneläinklinikka Vaasassa</h2>
          <p>Eläinklinikka Saari on suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa. Klinikka on perustettu vuonna 1989, ja olemme palvelleet vaasalaisia lemmikkien omistajia yli 35 vuoden ajan. Meille tyytyväinen asiakas ja potilaan terveys ovat pääasia. Tavoitteenamme on lämmin ja luotettava suhde asiakkaan ja potilaan kanssa.</p>
          <p>Ammattitaitoinen hoitotiimimme koostuu 13 ammattilaisesta — kokeneista eläinlääkäreistä ja eläintenhoitajista — jotka tarjoavat asiantuntevaa palvelua aina eläimenne parhaaksi. Klinikkamme on ISFM-sertifioitu kissaystävällinen klinikka (International Society of Feline Medicine), mikä tarkoittaa erityistä huomiota kissapotilaiden hyvinvointiin ja stressin vähentämiseen vastaanottotilanteissa.</p>

          <h2>Erikoisalat ja osaaminen</h2>
          <p>Klinikalla on laaja erikoisosaaminen useilla eläinlääketieteen osa-alueilla. Erikoisalueitamme ovat hammashoito, kardiologia (sydäntutkimukset), ortopedinen ja pehmytkudoskirurgia, ihotaudit (dermatologia) sekä tähystystutkimukset (endoskopia). Eläinlääkäreillemme on vuosikymmenten kokemus ja jatkokoulutusta näillä erikoisaloilla, minkä ansiosta pystymme tarjoamaan korkeatasoista hoitoa ilman lähetettä erikoisklinikkaan.</p>

          <h2>Moderni laitteisto</h2>
          <p>Investoimme jatkuvasti nykyaikaiseen teknologiaan, jotta diagnostiikka ja hoito ovat mahdollisimman tarkkoja ja turvallisia. Käytössämme on digitaalinen röntgen, hammasröntgen, ultraäänilaitteisto (vatsa- ja sydänultraääni), EKG, Holter-monitori sekä monipuolinen tähystysvälineistö gastroskopiasta bronkoskopiaan ja video-otoskopiaan. Oma laboratorio tuottaa tulokset nopeasti vastaanoton aikana, mikä mahdollistaa nopean hoidon aloittamisen.</p>

          <h2>Palvelumme</h2>
          <p>Tarjoamme monipuoliset eläinlääkäripalvelut:</p>
          <p><strong>Laaja diagnostiikka</strong> — Digitaalinen röntgen, hammasröntgen, ultraääni (vatsa ja sydän), tähystystutkimukset (gastroskopia, video-otoskopia, rhinoskopia, kystoskopia, bronkoskopia) sekä oma laboratorio nopeilla tuloksilla.</p>
          <p><strong>Moderni kirurgia</strong> — Pehmytkudoskirurgia, ortopedia (TTA, lateral suture, murtumaleikkaukset), inhalaatioanestesia kahdella ventilaattorilla ja jatkuvalla monitoroinnilla.</p>
          <p><strong>Sydäntutkimukset</strong> — Sydämen ultraääni, EKG, Holter-tutkimus. Viralliset sydäntutkimukset jalostuskoirille Kennelliiton hyväksymänä tutkijana.</p>
          <p><strong>Hammashoito</strong> — Hammaskiven poisto, hammasröntgen, hampaiden poistot, PerioVive-hyaluronihappogeelihoito.</p>

          <h2>Hoitofilosofia</h2>
          <p>Uskomme myötätuntoiseen ja yksilölliseen hoitoon. Jokainen potilas kohdataan yksilönä, ja hoitosuunnitelma laaditaan yhdessä omistajan kanssa. Haluamme, että käynti kliniikalla on mahdollisimman stressitön sekä lemmikille että omistajalle. Kissapotilaiden erityistarpeet huomioidaan ISFM-sertifioinnin mukaisesti erillisillä odotustiloilla ja rauhallisilla hoitokäytännöillä.</p>

          <h2>Henkilökunta</h2>
          <p>Klinikkamme tiimi koostuu kokeneista eläinlääkäreistä ja eläintenhoitajista. Eläinlääkäreillemme on vuosikymmenten kokemus pieneläinlääketieteestä ja jatkokoulutus mm. ortopediassa, kardiologiassa, akupunktiossa ja hammashoidossa. Hoitajamme ovat ammattitaitoisia ja huolehtivat potilaista lämpimästi ennen, aikana ja jälkeen toimenpiteiden.</p>

          <div class="cat-friendly-badge" style="margin-top:1.5rem;">
            🐱 <span>ISFM-sertifioitu kissaystävällinen klinikka</span>
          </div>

          <h2>Sijainti</h2>
          <p>Gerbyntie 18, 65230 Vaasa (Dragnäsbäck, Bockis-kurvissa). Ilmainen pysäköinti klinikan edessä. Klinikka sijaitsee keskeisellä paikalla ja on helposti saavutettavissa sekä autolla että julkisilla liikennevälineillä.</p>
        </div>
      </article>

      <div class="service-cta-box">
        <h2>Varaa aika</h2>
        <p>Soita meille tai varaa aika verkosta.</p>
        <div class="service-cta-buttons">
          <a href="tel:+35863217300" class="btn btn-primary" onclick="gtag_report_conversion();">Soita (06) 321 7300</a>
          <a href="https://my.provet.com/elainklinikka-saari" target="_blank" rel="noopener" class="btn btn-outline">Varaa verkossa</a>
        </div>
      </div>

      <a href="../" class="btn btn-secondary articles-back">\u2190 Takaisin etusivulle</a>
    </div>
  </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <p>Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.</p>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Pikalinkit</strong>
          <a href="../#about">Klinikka</a>
          <a href="../#services">Palvelut</a>
          <a href="../#team">Henkilökunta</a>
          <a href="../#cat-friendly">Cat Friendly</a>
          <a href="../#prices">Hinnasto</a>
          <a href="../#wildlife">Wildlife</a>
          <a href="/meista/">Meistä</a>
          <a href="/yhteystiedot/">Yhteystiedot</a>
          <a href="/artikkelit/">Artikkelit</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Yhteystiedot</strong>
          <a href="tel:+35863217300" onclick="gtag_report_conversion();">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Seuraa meitä</strong>
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
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; Y-tunnus: 0708667-9 &middot; Kaikki oikeudet pidätetään.</span>
        <a href="/tietosuoja/">Tietosuoja</a>
      </div>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// 9b. Generate Contact page (/yhteystiedot/)
// ──────────────────────────────────────────────
function generateContactPage() {
  const today = new Date().toISOString().split('T')[0];
  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google.com https://www.google.fi https://googleads.g.doubleclick.net https://www.facebook.com https://*.facebook.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net; frame-src https://www.google.com; frame-ancestors 'none'">
  <title>Yhteystiedot — Eläinklinikka Saari, Vaasa</title>

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
    gtag('config', 'AW-816483191');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-92LHP2TK6N"></script>
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
      'event_callback': callback
    });
    return false;
  }
  </script>

  <meta name="description" content="Eläinklinikka Saaren yhteystiedot. Osoite: Gerbyntie 18, Vaasa. Puhelin: (06) 321 7300. Sähköposti: info@saarivet.fi. Aukioloajat ja ajanvaraus.">
  <meta name="page-topic" content="Contact">
  <link rel="canonical" href="${BASE_URL}/yhteystiedot/">
  <link rel="alternate" hreflang="fi" href="${BASE_URL}/yhteystiedot/">
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/yhteystiedot/">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/yhteystiedot/">
  <meta property="og:title" content="Yhteystiedot — Eläinklinikka Saari">
  <meta property="og:description" content="Eläinklinikka Saari, Gerbyntie 18, 65230 Vaasa. Puhelin (06) 321 7300. Ajanvaraus verkossa.">
  <meta property="og:image" content="${BASE_URL}/images/clinic-about.jpg">
  <meta property="og:locale" content="fi_FI">
  <meta property="og:site_name" content="Eläinklinikka Saari">

  <script type="application/ld+json">
  [{
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "name": "Eläinklinikka Saari",
    "url": "${BASE_URL}",
    "telephone": "+358-6-321-7300",
    "email": "info@saarivet.fi",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gerbyntie 18",
      "addressLocality": "Vaasa",
      "postalCode": "65230",
      "addressCountry": "FI"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 63.0833,
      "longitude": 21.6167
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Etusivu", "item": "${BASE_URL}/" },
      { "@type": "ListItem", "position": 2, "name": "Yhteystiedot", "item": "${BASE_URL}/yhteystiedot/" }
    ]
  }]
  </script>

  <link rel="preload" as="image" href="../images/logo.png">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/png" href="../images/logo.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">Siirry sisältöön</a>

  <header class="header">
    <div class="container">
      <a href="../" class="logo">
        <div class="logo-icon"><img src="../images/logo.png" alt="Eläinklinikka Saari" width="240" height="240"></div>
      </a>
      <a href="../#cat-friendly" class="cfc-header-logo" aria-label="Silver accredited Cat Friendly Clinic 2026">
        <img src="../images/cat-friendly-clinic-silver-2026.png" alt="Silver accredited Cat Friendly Clinic 2026" width="1284" height="686">
      </a>
${renderHeaderNav({ lang: 'fi', homeUrl: '../', articlesUrl: getArticlesUrl('fi'), fiUrl: getArticlesUrl('fi'), svUrl: getArticlesUrl('sv'), enUrl: getArticlesUrl('en') })}
    </div>
  </header>

  <main id="main-content">
  <section class="section articles-section">
    <div class="container">
      <article class="article-card">
        <h1>Yhteystiedot</h1>
        <div class="article-content">
          <h2>Osoite ja sijainti</h2>
          <p><strong>Eläinklinikka Saari</strong><br>
          Gerbyntie 18<br>
          65230 Vaasa<br>
          (Dragnäsbäck, Bockis-kurvissa)</p>

          <h2>Saapumisohjeet</h2>
          <p><strong>Autolla:</strong> Klinikka sijaitsee Dragnäsbäckin kaupunginosassa, Gerbyntien ja Dragnäsbäckintien risteyksessä (Bockis-kurvi). Vaasan keskustasta ajoaika on noin 5 minuuttia. Aja Wolffintietä etelään ja käänny Gerbyntielle — klinikka on oikealla puolella. Ilmainen pysäköinti klinikan edessä olevalla parkkipaikalla, jossa on tilaa useille autoille.</p>
          <p><strong>Bussilla:</strong> Lähin bussipysäkki on Dragnäsbäckintien varrella, noin 200 metrin kävelymatkan päässä klinikasta. Vaasan paikallisliikenteen linja 1 kulkee reitin varrella. Tarkista aikataulut osoitteesta lysreisor.fi.</p>

          <h2>Puhelin ja sähköposti</h2>
          <p>Puhelin: <a href="tel:+35863217300" onclick="gtag_report_conversion();"><strong>(06) 321 7300</strong></a><br>
          Sähköposti: <a href="mailto:info@saarivet.fi">info@saarivet.fi</a></p>
          <p>Puhelimeen vastataan arkisin aukioloaikojen puitteissa. Kiireettömissä asioissa voit myös lähettää sähköpostia tai WhatsApp-viestin, niin vastaamme mahdollisimman pian.</p>

          <h2>Aukioloajat</h2>
          <p>Ma–Pe: 9:00–16:00<br>
          La–Su: Suljettu</p>
          <p>Vastaanotto toimii ajanvarauksella. Suosittelemme varaamaan ajan etukäteen, jotta voimme varata riittävästi aikaa lemmikkisi hoitoon. Päivystystilanteissa soita numeroon (06) 321 7300, niin opastamme sinut oikean päivystävän klinikan puoleen.</p>

          <h2>Ajanvaraus</h2>
          <p>Voit varata ajan kahdella tavalla:</p>
          <p><strong>Puhelimitse:</strong> Soita <a href="tel:+35863217300" onclick="gtag_report_conversion();">(06) 321 7300</a> arkisin klo 9–16. Vastaanottomme henkilökunta auttaa löytämään sopivan ajan.</p>
          <p><strong>Verkkoajanvaraus:</strong> Varaa aika ympäri vuorokauden verkkoajanvarausjärjestelmässämme osoitteessa <a href="https://my.provet.com/elainklinikka-saari" target="_blank" rel="noopener">my.provet.com/elainklinikka-saari</a>. Verkkoajanvaraus on nopea ja helppokäyttöinen.</p>

          <h2>Mitä ottaa mukaan vastaanotolle</h2>
          <p>Ota vastaanotolle mukaan lemmikin mahdolliset aiemmat hoitotiedot tai epikriisit, voimassa oleva lääkitys sekä rokotuskortti. Jos lemmikillä on vakuutus, ota mukaan vakuutustodistus — teemme suorakorvauksen Lähitapiolan, Agrian ja Pohjolan vakuutuksille. Kissapotilaat tulisi tuoda kuljetuskopassa ja koirat talutushihnassa.</p>

          <h2>Hätätilanteet</h2>
          <p>Klinikkamme ei tarjoa ympärivuorokautista päivystystä. Hätätilanteissa aukioloaikojen ulkopuolella soita klinikan numeroon (06) 321 7300, jossa puhelinvastaaja ohjaa lähimpään päivystävään klinikkaan. Akuuteissa hengenvaarallisissa tilanteissa ota välittömästi yhteyttä päivystävään eläinlääkäriin.</p>

          <h2>Sijainti kartalla</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1707.5!2d21.5967!3d63.0883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x467d6007bf4e31b1%3A0x3e189f57a09e4f42!2sGerbyntie%2018%2C%2065230%20Vaasa!5e0!3m2!1sfi!2sfi!4v1700000000000" width="100%" height="350" style="border:0;border-radius:var(--radius-lg);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Eläinklinikka Saari kartalla"></iframe>
        </div>
      </article>

      <div class="service-cta-box">
        <h2>Varaa aika</h2>
        <p>Soita meille tai varaa aika verkosta.</p>
        <div class="service-cta-buttons">
          <a href="tel:+35863217300" class="btn btn-primary" onclick="gtag_report_conversion();">Soita (06) 321 7300</a>
          <a href="https://my.provet.com/elainklinikka-saari" target="_blank" rel="noopener" class="btn btn-outline">Varaa verkossa</a>
        </div>
      </div>

      <a href="../" class="btn btn-secondary articles-back">\u2190 Takaisin etusivulle</a>
    </div>
  </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <p>Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.</p>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Pikalinkit</strong>
          <a href="../#about">Klinikka</a>
          <a href="../#services">Palvelut</a>
          <a href="../#team">Henkilökunta</a>
          <a href="../#cat-friendly">Cat Friendly</a>
          <a href="../#prices">Hinnasto</a>
          <a href="../#wildlife">Wildlife</a>
          <a href="/meista/">Meistä</a>
          <a href="/yhteystiedot/">Yhteystiedot</a>
          <a href="/artikkelit/">Artikkelit</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Yhteystiedot</strong>
          <a href="tel:+35863217300" onclick="gtag_report_conversion();">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <strong class="footer-heading">Seuraa meitä</strong>
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
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; Y-tunnus: 0708667-9 &middot; Kaikki oikeudet pidätetään.</span>
        <a href="/tietosuoja/">Tietosuoja</a>
      </div>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// 10. Generate sitemap.xml
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
  <url>
    <loc>${BASE_URL}/artikkelit/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

  xml += `  <url>
    <loc>${BASE_URL}/tietosuoja/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
`;

  xml += `  <url>
    <loc>${BASE_URL}/meista/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  xml += `  <url>
    <loc>${BASE_URL}/yhteystiedot/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  for (const service of servicePages) {
    xml += `  <url>
    <loc>${BASE_URL}/palvelut/${service.slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
`;
    xml += `  <url>
    <loc>${BASE_URL}/sv/tjanster/${service.slugSv}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    xml += `  <url>
    <loc>${BASE_URL}/en/services/${service.slugEn}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  for (const article of articles) {
    const articleDate = article.publishDate || today;
    xml += `  <url>
    <loc>${BASE_URL}/articles/${articleSlug(article, 'fi')}.html</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    xml += `  <url>
    <loc>${BASE_URL}/sv/artiklar/${articleSlug(article, 'sv')}.html</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    xml += `  <url>
    <loc>${BASE_URL}/en/articles/${articleSlug(article, 'en')}.html</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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

function getArticlesUrl(lang) {
  if (lang === 'sv') return `${BASE_URL}/sv/artiklar/`;
  if (lang === 'en') return `${BASE_URL}/en/articles/`;
  return `${BASE_URL}/artikkelit/`;
}

// Canonical nav labels used in every page's header (single source of truth).
const NAV_LABELS = {
  fi: { about: 'Klinikka', services: 'Palvelut', team: 'Henkilökunta', catfriendly: 'Cat Friendly', prices: 'Hinnasto', wildlife: 'Wildlife', contact: 'Yhteystiedot', articles: 'Artikkelit', book: 'Varaa aika' },
  sv: { about: 'Kliniken', services: 'Tjänster', team: 'Personal', catfriendly: 'Cat Friendly', prices: 'Prislista', wildlife: 'Wildlife', contact: 'Kontakt', articles: 'Artiklar', book: 'Boka tid' },
  en: { about: 'Clinic', services: 'Services', team: 'Staff', catfriendly: 'Cat Friendly', prices: 'Prices', wildlife: 'Wildlife', contact: 'Contact', articles: 'Articles', book: 'Book Now' }
};

// Full nav matching index.html — used on every non-homepage page so the header is identical everywhere.
// Article/service/static pages use <a> for the lang toggle (each lang is a separate URL); homepage uses <button> + JS.
function renderHeaderNav({ lang, homeUrl, articlesUrl, fiUrl, svUrl, enUrl }) {
  const nav = NAV_LABELS[lang] || NAV_LABELS.fi;
  const bookingUrl = 'https://my.provet.com/elainklinikka-saari';
  return `      <nav class="nav">
        <div class="nav-links">
          <a href="${homeUrl}#about">${escapeHtml(nav.about)}</a>
          <a href="${homeUrl}#services">${escapeHtml(nav.services)}</a>
          <a href="${homeUrl}#team">${escapeHtml(nav.team)}</a>
          <a href="${homeUrl}#cat-friendly">${escapeHtml(nav.catfriendly)}</a>
          <a href="${homeUrl}#prices">${escapeHtml(nav.prices)}</a>
          <a href="${homeUrl}#wildlife">${escapeHtml(nav.wildlife)}</a>
          <a href="${homeUrl}#contact">${escapeHtml(nav.contact)}</a>
          <a href="${articlesUrl}">${escapeHtml(nav.articles)}</a>
          <a href="${bookingUrl}" target="_blank" rel="noopener" class="btn btn-cta mobile-cta" onclick="fbq('track','Schedule');">${escapeHtml(nav.book)}</a>
        </div>

        <div class="nav-actions">
          <div class="lang-toggle">
            <a href="${fiUrl}" class="${lang === 'fi' ? 'active' : ''}"${lang === 'fi' ? ' aria-current="page"' : ''}>FI</a>
            <a href="${svUrl}" class="${lang === 'sv' ? 'active' : ''}"${lang === 'sv' ? ' aria-current="page"' : ''}>SV</a>
            <a href="${enUrl}" class="${lang === 'en' ? 'active' : ''}"${lang === 'en' ? ' aria-current="page"' : ''}>EN</a>
          </div>
          <a href="${bookingUrl}" target="_blank" rel="noopener" class="btn btn-cta btn-sm desktop-only" onclick="fbq('track','Schedule');">${escapeHtml(nav.book)}</a>
        </div>

        <button class="mobile-menu-btn" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>`;
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

  // Generate each article page (FI, SV, EN)
  let count = 0;
  const svDir = path.join(ROOT, 'sv', 'artiklar');
  const enDir = path.join(ROOT, 'en', 'articles');
  if (!fs.existsSync(svDir)) fs.mkdirSync(svDir, { recursive: true });
  if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });

  for (const article of articles) {
    // Finnish
    const titleFi = translations[article.titleKey]?.fi || article.slug;
    const htmlFi = generateArticlePage(article, translations, specialContent, 'fi');
    fs.writeFileSync(path.join(ARTICLES_DIR, `${article.slug}.html`), htmlFi, 'utf-8');
    count++;
    console.log(`  [${count}/${articles.length}] ${article.slug}.html - ${titleFi.substring(0, 60)}...`);

    // Swedish
    const htmlSv = generateArticlePage(article, translations, specialContent, 'sv');
    const svSlug = articleSlug(article, 'sv');
    fs.writeFileSync(path.join(svDir, `${svSlug}.html`), htmlSv, 'utf-8');
    if (svSlug !== article.slug) {
      const oldSvPath = path.join(svDir, `${article.slug}.html`);
      const newSvUrl = `${BASE_URL}/sv/artiklar/${svSlug}.html`;
      fs.writeFileSync(oldSvPath, generateRedirectStub(newSvUrl), 'utf-8');
    }

    // English
    const htmlEn = generateArticlePage(article, translations, specialContent, 'en');
    const enSlug = articleSlug(article, 'en');
    fs.writeFileSync(path.join(enDir, `${enSlug}.html`), htmlEn, 'utf-8');
    if (enSlug !== article.slug) {
      const oldEnPath = path.join(enDir, `${article.slug}.html`);
      const newEnUrl = `${BASE_URL}/en/articles/${enSlug}.html`;
      fs.writeFileSync(oldEnPath, generateRedirectStub(newEnUrl), 'utf-8');
    }
  }

  // Generate service landing pages (FI, SV, EN)
  console.log('\nBuilding service pages...');
  for (const service of servicePages) {
    // Finnish
    const serviceDir = path.join(ROOT, 'palvelut', service.slug);
    if (!fs.existsSync(serviceDir)) {
      fs.mkdirSync(serviceDir, { recursive: true });
    }
    const htmlFi = generateServicePage(service, translations, 'fi');
    fs.writeFileSync(path.join(serviceDir, 'index.html'), htmlFi, 'utf-8');
    console.log(`  palvelut/${service.slug}/index.html - ${service.h1}`);

    // Swedish
    const svDir = path.join(ROOT, 'sv', 'tjanster', service.slugSv);
    if (!fs.existsSync(svDir)) {
      fs.mkdirSync(svDir, { recursive: true });
    }
    const htmlSv = generateServicePage(service, translations, 'sv');
    fs.writeFileSync(path.join(svDir, 'index.html'), htmlSv, 'utf-8');
    console.log(`  sv/tjanster/${service.slugSv}/index.html - ${service.sv.h1}`);

    // English
    const enDir = path.join(ROOT, 'en', 'services', service.slugEn);
    if (!fs.existsSync(enDir)) {
      fs.mkdirSync(enDir, { recursive: true });
    }
    const htmlEn = generateServicePage(service, translations, 'en');
    fs.writeFileSync(path.join(enDir, 'index.html'), htmlEn, 'utf-8');
    console.log(`  en/services/${service.slugEn}/index.html - ${service.en.h1}`);
  }

  // Generate article index page
  const artikkelitDir = path.join(ROOT, 'artikkelit');
  if (!fs.existsSync(artikkelitDir)) {
    fs.mkdirSync(artikkelitDir, { recursive: true });
  }
  const indexPage = generateArticleIndex(translations);
  fs.writeFileSync(path.join(artikkelitDir, 'index.html'), indexPage, 'utf-8');
  console.log('  Generated artikkelit/index.html');

  // Generate about page
  console.log('\nBuilding about page...');
  const aboutDir = path.join(ROOT, 'meista');
  if (!fs.existsSync(aboutDir)) {
    fs.mkdirSync(aboutDir, { recursive: true });
  }
  const aboutPage = generateAboutPage();
  fs.writeFileSync(path.join(aboutDir, 'index.html'), aboutPage, 'utf-8');
  console.log('  Generated meista/index.html');

  // Generate contact page
  console.log('Building contact page...');
  const contactDir = path.join(ROOT, 'yhteystiedot');
  if (!fs.existsSync(contactDir)) {
    fs.mkdirSync(contactDir, { recursive: true });
  }
  const contactPage = generateContactPage();
  fs.writeFileSync(path.join(contactDir, 'index.html'), contactPage, 'utf-8');
  console.log('  Generated yhteystiedot/index.html');

  // Generate privacy policy page
  console.log('\nBuilding privacy policy page...');
  const privacyDir = path.join(ROOT, 'tietosuoja');
  if (!fs.existsSync(privacyDir)) {
    fs.mkdirSync(privacyDir, { recursive: true });
  }
  const privacyPage = generatePrivacyPage();
  fs.writeFileSync(path.join(privacyDir, 'index.html'), privacyPage, 'utf-8');
  console.log('  Generated tietosuoja/index.html');

  // Generate sitemap
  console.log('\nGenerating sitemap.xml...');
  const sitemap = generateSitemap();
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf-8');
  console.log(`  Sitemap updated with ${articles.length + servicePages.length + 3} URLs`);

  console.log(`\nDone! Generated ${count} article pages in articles/`);
}

main();
