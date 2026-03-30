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
    publishDate: '2026-01-15',
    sections: ['intro', 'how.title', 'how.text', 'vs.title', 'vs.text', 'recovery.title', 'recovery.text', 'risks.title', 'risks.text', 'when.title', 'when.text'],
    prefix: 'article.tta'
  },
  {
    slug: 'video-otoskopia',
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
    titleKey: 'article.diarrhea.title',
    tagKey: 'article.tta.tag',
    category: 'health',
    date: '2026',
    publishDate: '2026-01-20',
    sections: ['intro', 'causes.title', 'causes.text', 'homecare.title', 'homecare.text', 'warning.title', 'warning.text', 'prevention.title', 'prevention.text', 'contact.title', 'contact.text'],
    prefix: 'article.diarrhea'
  },
  {
    slug: 'avoin-valtimotiehyt-pda',
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
    titleKey: 'article.brushing.title',
    tagKey: 'article.tta.tag',
    category: 'dental',
    date: '2026',
    publishDate: '2026-01-25',
    sections: ['intro', 'why.title', 'why.text', 'how.title', 'how.text', 'start.title', 'start.text', 'signs.title', 'signs.text', 'professional.title', 'professional.text', 'challenge.title', 'challenge.text'],
    prefix: 'article.brushing'
  },
  {
    slug: 'viljaton-ruoka',
    titleKey: 'article.grainfree.title',
    tagKey: 'article.tta.tag',
    category: 'health',
    date: '2026',
    publishDate: '2026-01-25',
    sections: ['intro', 'fda.title', 'fda.text', 'myth.title', 'myth.text', 'cats.title', 'cats.text', 'advice.title', 'advice.text'],
    prefix: 'article.grainfree'
  },
  {
    slug: 'periovive',
    titleKey: 'article.periovive.title',
    tagKey: 'article.tta.tag',
    category: 'dental',
    date: '2026',
    publishDate: '2026-01-30',
    sections: ['intro', 'what.title', 'what.text', 'how.title', 'how.text', 'evidence.title', 'evidence.text', 'when.title', 'when.text', 'clinic.title', 'clinic.text'],
    prefix: 'article.periovive'
  },
  {
    slug: 'yksityinen-klinikka',
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

function generateRelatedArticlesHtml(currentSlug, translations) {
  const related = relatedArticles[currentSlug];
  if (!related || related.length === 0) return '';

  const t = (key) => translations[key]?.fi || '';

  let cards = '';
  for (const slug of related) {
    const article = articles.find(a => a.slug === slug);
    if (!article) continue;
    const title = t(article.titleKey);
    const tag = t(article.tagKey);
    const intro = t(`${article.prefix}.intro`);
    const shortIntro = intro.length > 120 ? intro.substring(0, 117) + '...' : intro;
    cards += `
        <a href="${slug}.html" class="related-article-card">
          <span class="article-tag">${escapeHtml(tag)}</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(shortIntro)}</p>
        </a>`;
  }

  return `
      <div class="related-articles">
        <h2>Lue myös</h2>
        <div class="related-articles-grid">${cards}
        </div>
      </div>`;
}

// ──────────────────────────────────────────────
// 2c. FAQ schema generator — extracts Q&A pairs from article sections
// ──────────────────────────────────────────────
function generateFaqSchema(article, translations) {
  const t = (key) => translations[key]?.fi || '';
  const faqPairs = [];

  for (let i = 0; i < article.sections.length; i++) {
    const suffix = article.sections[i];
    if (suffix.endsWith('.title') && i + 1 < article.sections.length) {
      const nextSuffix = article.sections[i + 1];
      if (nextSuffix.endsWith('.text')) {
        const question = t(`${article.prefix}.${suffix}`);
        let answer = t(`${article.prefix}.${nextSuffix}`);
        if (question && answer) {
          // Truncate answer to 300 chars for schema
          if (answer.length > 300) answer = answer.substring(0, 297) + '...';
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
function generateArticlePage(article, translations, specialContent) {
  const t = (key) => {
    if (translations[key] && translations[key].fi) return translations[key].fi;
    return '';
  };

  const title = t(article.titleKey);
  const tag = t(article.tagKey);
  // Smart page title: if full title + suffix > 70 chars, use part before dash
  const suffix = ' | Eläinklinikka Saari';
  let pageTitle;
  if ((title + suffix).length <= 60) {
    pageTitle = title + suffix;
  } else {
    // Try using part before em-dash/en-dash
    const dashMatch = title.match(/^(.+?)\s*[—–]\s*/);
    if (dashMatch && (dashMatch[1] + suffix).length <= 60) {
      pageTitle = dashMatch[1] + suffix;
    } else {
      // Just use title without suffix to stay under limit
      pageTitle = title.length <= 60 ? title : title.substring(0, 57) + '...';
    }
  }
  // Use first 155 chars of intro, cut at sentence boundary
  const introKey = `${article.prefix}.intro`;
  let description = t(introKey);
  if (description.length > 155) {
    // Try to cut at last sentence boundary before 155 chars
    const truncated = description.substring(0, 155);
    const lastPeriod = truncated.lastIndexOf('. ');
    const lastExcl = truncated.lastIndexOf('! ');
    const cutPoint = Math.max(lastPeriod, lastExcl);
    if (cutPoint > 80) {
      description = description.substring(0, cutPoint + 1);
    } else {
      // Fall back to last comma or space
      const lastComma = truncated.lastIndexOf(', ');
      if (lastComma > 80) {
        description = description.substring(0, lastComma + 1);
      } else {
        description = truncated.substring(0, truncated.lastIndexOf(' ')) + '...';
      }
    }
  }

  const canonicalUrl = `${BASE_URL}/articles/${article.slug}.html`;
  const articleBody = generateArticleBody(article, translations, specialContent);
  const relatedHtml = generateRelatedArticlesHtml(article.slug, translations);
  const faqSchema = generateFaqSchema(article, translations);
  const dateStr = article.date || '2026';
  const today = new Date().toISOString().split('T')[0];
  const isoDatePublished = article.publishDate || '2026-01-01';
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
    gtag('config', 'AW-816483191');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-92LHP2TK6N"></script>
  <!-- Google Ads: Click to call conversion -->
  <script>
  function gtag_report_conversion() {
    gtag('event', 'conversion', {
      'send_to': 'AW-816483191/FPP_CIm07owcEPeWqoUD',
      'value': 1.0,
      'currency': 'EUR'
    });
  }
  </script>

  <meta name="description" content="${escapeAttr(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="fi" href="${canonicalUrl}">

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
        "name": "Etusivu",
        "item": "${BASE_URL}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Artikkelit",
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

  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/png" href="../images/logo.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">Siirry sisältöön</a>

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
  <main id="main-content">
  <section class="section articles-section">
    <div class="container">
      <article class="article-card" data-category="${article.category}">
        <div class="article-header">
          <span class="article-tag" data-i18n="${article.tagKey}">${tag}</span>
${article.date ? `          <time>${article.date}</time>\n` : ''}        </div>
        <h1 data-i18n="${article.titleKey}">${title}</h1>
        <div class="article-byline">Eläinlääkäri ${['articles.tag.orthopedics', 'articles.tag.anesthesia', 'article.anesthesia.tag', 'article.hypothermia.tag'].includes(article.tagKey) ? 'Pamela Kvarngård' : 'Assaf Wydra'}, Eläinklinikka Saari</div>
        <div class="article-content">
${articleBody}        </div>
      </article>
${relatedHtml}
      <a href="../" class="btn btn-secondary articles-back" data-i18n="articles.back">\u2190 Takaisin etusivulle</a>
    </div>
  </section>
  </main>

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
          <a href="tel:+35863217300" onclick="gtag_report_conversion();">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.follow">Seuraa meitä</h4>
          <div class="footer-social">
            <a href="https://www.facebook.com/SaariKlinikka" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/elainklinikkasaari" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
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
  function gtag_report_conversion() {
    gtag('event', 'conversion', {
      'send_to': 'AW-816483191/FPP_CIm07owcEPeWqoUD',
      'value': 1.0,
      'currency': 'EUR'
    });
  }
  </script>

  <meta name="description" content="Eläinlääketieteelliset artikkelit: hammashoito, kirurgia, sydänsairaudet, tähystykset, rokotukset ja paljon muuta. Eläinklinikka Saari, Vaasa.">
  <link rel="canonical" href="${BASE_URL}/artikkelit/">
  <link rel="alternate" hreflang="fi" href="${BASE_URL}/artikkelit/">

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

  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/png" href="../images/logo.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">Siirry sisältöön</a>

  <header class="header">
    <div class="container">
      <a href="../" class="logo">
        <div class="logo-icon"><img src="../images/logo.png" alt="Eläinklinikka Saari"></div>
      </a>
      <nav class="nav">
        <div class="nav-actions">
          <a href="../" class="btn btn-outline btn-sm">\u2190 Takaisin etusivulle</a>
        </div>
      </nav>
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
          <h4>Pikalinkit</h4>
          <a href="../#about">Klinikka</a>
          <a href="../#services">Palvelut</a>
          <a href="../#team">Henkilökunta</a>
          <a href="../#prices">Hinnasto</a>
          <a href="../#wildlife">Wildlife</a>
        </div>
        <div class="footer-col">
          <h4>Yhteystiedot</h4>
          <a href="tel:+35863217300" onclick="gtag_report_conversion();">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <h4>Seuraa meitä</h4>
          <div class="footer-social">
            <a href="https://www.facebook.com/SaariKlinikka" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/elainklinikkasaari" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; Y-tunnus: 0708667-9 &middot; Kaikki oikeudet pidätetään.</span>
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
      metaDesc: 'Dog and cat dental care in Vaasa. Scaling, dental X-rays, extractions. All procedures under general anaesthesia. Book an appointment at Eläinklinikka Saari.',
      sections: [
        { heading: 'Why is dental care important?', text: 'Dental disease is among the most common health problems in pets. By the age of three, the majority of dogs and cats have tartar and gingivitis. Untreated dental damage progresses silently — animals instinctively hide pain, so owners often notice the problem only when it has advanced significantly. Regular professional dental care extends your pet\'s lifespan and significantly improves quality of life.' },
        { heading: 'Our services', text: 'Our clinic provides comprehensive dental care under general anaesthesia: ultrasonic scaling, dental X-ray examinations (all teeth are digitally radiographed), extractions, deciduous tooth removal, periodontal treatment, and PerioVive hyaluronic acid gel therapy. Every dental procedure includes a complete oral examination and dental chart.' },
        { heading: 'Dental X-rays — seeing what is hidden', text: 'Dental X-rays are the most important diagnostic tool in dentistry. Over half of dental diseases are invisible on visual examination — root infections, tooth resorption, cysts, and bone loss are only revealed on radiographs. At our clinic, all teeth are radiographed as part of every dental procedure.' },
        { heading: 'How does the procedure work?', text: 'Before the procedure, a health check and blood tests are performed as needed. The procedure is carried out under inhalation anaesthesia with comprehensive pain relief. During anaesthesia, we continuously monitor heart rate, oxygen saturation, blood pressure, and temperature. Tartar is removed, dental X-rays are taken, diseased teeth are treated, and damaged teeth are extracted if necessary. Patients are typically discharged the same day.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['hampaiden-harjaus', 'hammasresorptio', 'puhkeamattomat-hampaat', 'periovive'],
    schemaService: 'Veterinary Dental Care'
  },
  {
    slug: 'sydantutkimukset',
    slugSv: 'hjartundersokningar',
    slugEn: 'cardiac-examinations',
    title: 'Sydäntutkimukset — Eläinklinikka Saari, Vaasa',
    h1: 'Sydäntutkimukset',
    metaDesc: 'Sydämen ultraääni, EKG ja Holter koirille ja kissoille Vaasassa. Viralliset sydäntutkimukset. Ajoissa aloitettu hoito pidentää elinikää. Eläinklinikka Saari.',
    icon: '❤️',
    sections: [
      { heading: 'Sydänsairaudet lemmikeillä', text: 'Sydänsairaudet ovat yleisiä erityisesti tietyissä koira- ja kissaroduissa. Cavalier kingcharlesinspanielilla, dobermanneilla ja Maine Coon -kissoilla on perinnöllinen alttius sydänsairauksille. Ajoissa aloitettu lääkitys voi pidentää lemmikin elinikää huomattavasti — siksi säännölliset sydäntarkastukset ovat tärkeitä etenkin riskiroduilla.' },
      { heading: 'Tutkimusmenetelmät', text: 'Klinikallamme on kattavat kardiologiset tutkimusmahdollisuudet. Sydämen ultraäänitutkimus (ekokardiografia) on tärkein sydänsairauksien diagnostinen menetelmä — sillä nähdään sydämen rakenne, kammioiden koko, läppien toiminta ja verenvirtaus reaaliajassa. EKG-tutkimuksella mitataan sydämen sähköistä toimintaa ja tunnistetaan rytmihäiriöt. Holter-tutkimuksella seurataan sydämen rytmiä 24 tunnin ajan kotioloissa.' },
      { heading: 'Viralliset sydäntutkimukset', text: 'Klinikalla on Suomen Kennelliiton myöntämät viralliset sydämen auskultaatio-oikeudet. Teemme virallisia sydämen auskultaatio- ja ultraäänitutkimuksia jalostustarkastusten yhteydessä. Viralliset tulokset kirjataan Kennelliiton tietokantaan.' },
      { heading: 'Milloin hakeutua tutkimuksiin?', text: 'Oireita voivat olla yskiminen (erityisesti levossa tai rasituksen jälkeen), rasituksen sietokyvyn heikkeneminen, tiheä hengitys, pyörtyily tai äkillinen väsähtäminen. Riskirotujen kohdalla suosittelemme säännöllisiä sydäntarkastuksia jo nuorella iällä, vaikka oireita ei olisi. Varaa aika sydäntutkimukseen — varhainen diagnoosi ja hoito tekevät merkittävän eron.' },
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
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['avoin-valtimotiehyt-pda', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Cardiology'
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
      { heading: 'Varaa aika konsultaatioon', text: 'Jos lemmikkisi tarvitsee kirurgista arviota, varaa aika konsultaatioon. Tutkimme potilaan, arvioimme toimenpiteiden tarpeen ja suunnittelemme parhaan hoitolinjan yhdessä omistajan kanssa. Hoidot annetaan samalla klinikalla tuttujen eläinlääkäreiden toimesta — lemmikin ei tarvitse matkustaa muualle.' },
    ],
    sv: {
      title: 'Kirurgi — Djurklinik Saari, Vasa',
      h1: 'Kirurgi',
      metaDesc: 'Veterinärkirurgi i Vasa: mjukdelskirurgi, ortopedi, TTA, lateral suture, frakturoperationer. Säker anestesi och smärtlindring. Eläinklinikka Saari.',
      sections: [
        { heading: 'Mjukdelskirurgi', text: 'På vår klinik utförs ett brett utbud av mjukdelskirurgiska ingrepp: steriliseringar och kastreringar, kejsarsnitt, tumörborttagning, främmandekroppsoperationer (från magsäck eller tarm), urinstensoperationer, mjältborttagning samt ögon- och öronoperationer. Varje ingrepp planeras individuellt utifrån patientens behov.' },
        { heading: 'Ortopedisk kirurgi', text: 'Korsbandsskador är det vanligaste ortopediska ingreppet hos hundar. Vår klinik använder två metoder: lateral suture-teknik stabiliserar leden med syntetiskt stödmaterial och passar särskilt för små hundar och katter. TTA (tibial tuberosity advancement) förändrar knäets biomekanik permanent och är ett bra alternativ för aktiva och större hundar. Dessutom utför vi frakturoperationer, amputationer och femurhuvedresektioner.' },
        { heading: 'Säker anestesi', text: 'Anestesisäkerhet är en hjärtefråga för oss. Vi använder inhalationsanestesi och kontinuerlig övervakning: hjärtfrekvens, blodtryck, syremättnad, kapnografi, EKG och temperatur. Kliniken har två ventilatorer och använder ett modernt balanserat anestesiprotokoll. Kontinuerlig smärtlindringsinfusion (CRI) säkerställer jämn smärtlindring under och efter operationen.' },
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
      metaDesc: 'Veterinary surgery in Vaasa: soft tissue surgery, orthopaedics, TTA, lateral suture, fracture repair. Safe anaesthesia and pain management. Eläinklinikka Saari.',
      sections: [
        { heading: 'Soft tissue surgery', text: 'Our clinic performs a wide range of soft tissue surgical procedures: spays and neutering, caesarean sections, tumour removals, foreign body surgery (from stomach or intestines), urinary stone surgery, splenectomies, and eye and ear operations. Each procedure is individually planned according to the patient\'s needs.' },
        { heading: 'Orthopaedic surgery', text: 'Cruciate ligament repair is the most common orthopaedic procedure in dogs. Our clinic uses two methods: the lateral suture technique stabilises the joint with synthetic support material and is especially suited for small dogs and cats. TTA (tibial tuberosity advancement) permanently alters the knee\'s biomechanics and is a good option for active and larger dogs. We also perform fracture repairs, amputations, and femoral head resections.' },
        { heading: 'Safe anaesthesia', text: 'Anaesthesia safety is close to our hearts. We use inhalation anaesthesia and continuous monitoring: heart rate, blood pressure, oxygen saturation, capnography, ECG, and temperature. The clinic has two ventilators and uses a modern balanced anaesthesia protocol. Continuous rate infusion (CRI) pain management ensures steady pain relief during and after surgery.' },
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
    schemaService: 'Veterinary Surgery'
  },
  {
    slug: 'tahystykset',
    slugSv: 'endoskopi',
    slugEn: 'endoscopy',
    title: 'Tähystystutkimukset — Eläinklinikka Saari, Vaasa',
    h1: 'Tähystystutkimukset',
    metaDesc: 'Tähystystutkimukset Vaasassa: gastroskopia, video-otoskopia, rhinoskopia, kystoskopia, bronkoskopia. Vähemmän invasiivinen diagnostiikka. Eläinklinikka Saari.',
    icon: '📷',
    sections: [
      { heading: 'Mitä tähystystutkimukset ovat?', text: 'Tähystystutkimukset (endoskopia) ovat minimaalisesti invasiivisia tutkimusmenetelmiä, joissa ohut kameraskooppi viedään kehon luonnollisten aukkojen kautta sisäelinten tutkimiseen. Menetelmä mahdollistaa tarkan diagnostiikan ilman avokirurgiaa, ja usein myös hoidon samalla kertaa — esimerkiksi vierasesineiden poiston mahalaukusta.' },
      { heading: 'Gastroskopia', text: 'Vatsalaukun ja suoliston tähystyksellä tutkitaan ja hoidetaan ruuansulatuskanavan ongelmia. Yleisin indikaatio on vierasesineen poisto — tähystyksellä esimerkiksi sukat, lelut ja luun kappaleet saadaan usein poistettua ilman vatsaleikkausta. Lisäksi otetaan koepalojen näytteitä kroonisten suolistosairauksien (IBD, lymfooma) diagnostiikkaan.' },
      { heading: 'Video-otoskopia', text: 'Korvien tähystystutkimus suurennetulla videokuvalla. Näkyvyys korvakäytävään on moninkertainen perinteiseen otoskooppiin verrattuna. Mahdollistaa korvakäytävän perusteellisen puhdistuksen ja huuhtelun näkökontrollissa. Erityisen arvokas kroonisten ja toistuvien korvatulehdusten tutkimuksessa ja hoidossa.' },
      { heading: 'Muut tähystykset', text: 'Rhinoskopia (nenäontelon tähystys) vierasesineille, kasvaimille ja krooniselle nuhalle. Kystoskopia (virtsateiden tähystys) virtsarakon ongelmien tutkimiseen. Bronkoskopia (hengitysteiden tähystys) kroonisen yskän ja hengitystieoireiden diagnostiikkaan.' },
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
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['rokotukset', 'kissaystävällinen-klinikka', 'yksityinen-klinikka'],
    schemaService: 'Veterinary Vaccination'
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
      { heading: 'Varaa aika', text: 'Viralliset tutkimukset vaativat etukäteisvarauksen, sillä ne edellyttävät rauhoitusta ja riittävästi aikaa laadukkaiden kuvien ottamiseen. Ota yhteyttä klinikkaan sopiaksesi tutkimusajan — kerromme mielellämme tarkemmin, mitä tutkimuksia koirasi rodulle suositellaan.' },
    ],
    sv: {
      title: 'Officiella undersökningar — Djurklinik Saari, Vasa',
      h1: 'Officiella undersökningar',
      metaDesc: 'Officiella höft-, armbågs-, knä- och hjärtundersökningar i Vasa. Godkänd av Finska Kennelklubben. Avelskontroller. Eläinklinikka Saari.',
      sections: [
        { heading: 'Officiella röntgenundersökningar', text: 'På vår klinik utförs officiella röntgenundersökningar godkända av Finska Kennelklubben: höft-, armbågs- och ryggröntgen. Officiella röntgenbilder skickas till Kennelklubbens granskare och resultaten registreras i Avelsdatasystemet. Undersökningarna görs under lätt sedering för att säkerställa korrekt position.' },
        { heading: 'Knä- och hjärtundersökningar', text: 'Officiella knäundersökningar görs kliniskt utan sedering. Kliniken har även officiella rättigheter för hjärtauskultation — med auskultationsundersökning bedöms om hunden har hjärtblåsljud. Dessa undersökningar är en del av avelskontrollerna för många raser.' },
        { heading: 'Vem behöver officiella undersökningar?', text: 'Officiella undersökningar är obligatoriska eller rekommenderade för avelsdjur beroende på ras. Syftet med undersökningarna är att minska förekomsten av ärftliga sjukdomar inom raserna. Undersökningarna kan göras tidigast vid 12 månaders ålder (höfter vid 18 månaders ålder) och gäller hela hundens livstid.' },
        { heading: 'Boka tid', text: 'Officiella undersökningar kräver förbokning, eftersom de kräver sedering och tillräckligt med tid för att ta bilder av hög kvalitet. Kontakta kliniken för att boka undersökningstid — vi berättar gärna mer om vilka undersökningar som rekommenderas för din hunds ras.' },
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
        { heading: 'Book an appointment', text: 'Official examinations require advance booking as they require sedation and sufficient time to take high-quality images. Contact the clinic to arrange an examination appointment — we are happy to advise on which examinations are recommended for your dog\'s breed.' },
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
      metaDesc: 'Spaying and neutering for dogs, cats and rabbits in Vaasa. Inhalation anaesthesia, comprehensive pain management. Also chemical castration. Eläinklinikka Saari.',
      sections: [
        { heading: 'Why spay or neuter?', text: 'Spaying and neutering can prevent many diseases: mammary tumours, pyometra, prostate problems, and testicular cancer. Spaying removes the uterus and ovaries, completely eliminating hormonal diseases. Neutering can also reduce unwanted marking behaviour and aggression.' },
        { heading: 'The procedure at our clinic', text: 'All spays and neuters are performed under inhalation anaesthesia with comprehensive pain management. We monitor the patient continuously throughout the procedure: heart rate, blood pressure, oxygen saturation, and temperature. Patients are typically discharged the same day with pain medication to take home.' },
        { heading: 'Chemical castration', text: 'For dogs, chemical castration with a hormone implant (Suprelorin) is also available. The implant is placed under the skin and its effect lasts 6 or 12 months. Chemical castration is a good option when you want to trial the effects of castration before making a permanent decision, or when surgical procedure is not desired.' },
        { heading: 'The right timing', text: 'The optimal age for spaying or neutering depends on breed, size, and individual circumstances. Let us discuss together what is the best timing for your pet. Book an appointment for a consultation or procedure.' },
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['kohtutulehdus', 'anestesiaturvallisuus', 'kipulääkeinfuusio'],
    schemaService: 'Veterinary Spay and Neuter'
  },
  {
    slug: 'sisataudit',
    slugSv: 'internmedicin',
    slugEn: 'internal-medicine',
    title: 'Sisätaudit — Eläinklinikka Saari, Vaasa',
    h1: 'Sisätaudit',
    metaDesc: 'Eläinten sisätaudit Vaasassa: diabetes, Cushingin tauti, haimatulehdus, anemia, autoimmuunisairaudet. Perusteellinen diagnostiikka ja hoito. Eläinklinikka Saari.',
    icon: '💊',
    sections: [
      { heading: 'Yleisimmät sisätaudit', text: 'Sisätaudit kattavat laajan kirjon eläinten sairauksia. Yleisimpiä ovat diabetes (sokeritauti), Cushingin tauti (lisämunuaiskuoren liikatoiminta), Addisonin tauti (lisämunuaiskuoren vajaatoiminta), haimatulehdus (pankreatiitti), erilaiset anemiat sekä autoimmuunisairaudet. Monilla näistä sairauksista on oireita, jotka etenevät hitaasti — omistaja saattaa huomata vain lisääntyneen janon, painon muutoksen tai yleisen väsymyksen.' },
      { heading: 'Diagnostiikka', text: 'Sisätautien selvittely vaatii usein perusteellista diagnostiikkaa. Klinikallamme tutkimme verinäytteitä, virtsanäytteitä ja hormonitasoja omassa laboratoriossa, jolloin saamme tulokset nopeasti. Vatsan alueen ultraäänitutkimuksella nähdään sisäelinten rakenne ja mahdolliset muutokset. Tarvittaessa otetaan koepalojen näytteitä ultraääniohjauksessa tai tähystyksessä.' },
      { heading: 'Hoito', text: 'Sisätautien hoito on usein pitkäaikaista ja vaatii säännöllistä seurantaa. Diabetesta hoidetaan insuliinilla ja ruokavaliomuutoksilla, Cushingin tautia lääkityksellä, haimatulehdusta nesteyhoidolla ja kivunlievityksellä. Autoimmuunisairaudet vaativat immunosuppressiivista lääkitystä. Hoitosuunnitelma räätälöidään aina yksilöllisesti — tavoitteena on lemmikin hyvä elämänlaatu.' },
      { heading: 'Milloin hakeutua tutkimuksiin?', text: 'Oireita, jotka viittaavat sisätautiin, voivat olla lisääntynyt janoisuus ja virtsaaminen, painon muutos, oksentelu, ripuli, väsymys, ruokahaluttomuus, ihon tai turkin muutokset tai vatsan turpoaminen. Jos huomaat näitä oireita lemmikkilläsi, varaa aika tutkimukseen — varhainen diagnoosi ja hoito parantavat ennustetta merkittävästi.' },
    ],
    sv: {
      title: 'Internmedicin — Djurklinik Saari, Vasa',
      h1: 'Internmedicin',
      metaDesc: 'Internmedicin för husdjur i Vasa: diabetes, Cushings sjukdom, pankreatit, anemi, autoimmunsjukdomar. Grundlig diagnostik och behandling. Eläinklinikka Saari.',
      sections: [
        { heading: 'De vanligaste internmedicinska sjukdomarna', text: 'Internmedicin omfattar ett brett spektrum av sjukdomar hos djur. De vanligaste är diabetes (sockersjuka), Cushings sjukdom (binjurebarkens överfunktion), Addisons sjukdom (binjurebarkens underfunktion), pankreatit (bukspottkörtelinflammation), olika former av anemi samt autoimmunsjukdomar. Många av dessa sjukdomar har symtom som fortskrider långsamt — ägaren kanske bara märker ökad törst, viktförändring eller allmän trötthet.' },
        { heading: 'Diagnostik', text: 'Utredning av internmedicinska sjukdomar kräver ofta grundlig diagnostik. På vår klinik undersöker vi blodprov, urinprov och hormonnivåer i vårt eget laboratorium, vilket ger snabba resultat. Med bukens ultraljud kan vi se inre organs struktur och eventuella förändringar. Vid behov tas biopsier under ultraljudsvägledning eller endoskopi.' },
        { heading: 'Behandling', text: 'Behandling av internmedicinska sjukdomar är ofta långvarig och kräver regelbunden uppföljning. Diabetes behandlas med insulin och kostförändringar, Cushings sjukdom med medicinering, pankreatit med vätskebehandling och smärtlindring. Autoimmunsjukdomar kräver immunsuppressiv medicinering. Behandlingsplanen skräddarsys alltid individuellt — målet är god livskvalitet för husdjuret.' },
        { heading: 'När ska man söka undersökning?', text: 'Symtom som kan tyda på internmedicinsk sjukdom kan vara ökad törst och urinering, viktförändring, kräkningar, diarré, trötthet, aptitlöshet, förändringar i hud eller päls eller uppsvälld buk. Om du märker dessa symtom hos ditt husdjur, boka tid för undersökning — tidig diagnos och behandling förbättrar prognosen avsevärt.' },
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
      metaDesc: 'Veterinary internal medicine in Vaasa: diabetes, Cushing\'s disease, pancreatitis, anaemia, autoimmune diseases. Thorough diagnostics and treatment. Eläinklinikka Saari.',
      sections: [
        { heading: 'The most common internal diseases', text: 'Internal medicine covers a wide range of animal diseases. The most common include diabetes mellitus, Cushing\'s disease (hyperadrenocorticism), Addison\'s disease (hypoadrenocorticism), pancreatitis, various forms of anaemia, and autoimmune diseases. Many of these conditions have symptoms that progress slowly — the owner may only notice increased thirst, weight change, or general lethargy.' },
        { heading: 'Diagnostics', text: 'Investigating internal diseases often requires thorough diagnostics. At our clinic, we analyse blood samples, urine samples, and hormone levels in our own laboratory, providing rapid results. Abdominal ultrasound reveals organ structure and any abnormalities. When necessary, biopsies are taken under ultrasound guidance or during endoscopy.' },
        { heading: 'Treatment', text: 'Treatment of internal diseases is often long-term and requires regular follow-up. Diabetes is managed with insulin and dietary changes, Cushing\'s disease with medication, and pancreatitis with fluid therapy and pain relief. Autoimmune diseases require immunosuppressive medication. The treatment plan is always individually tailored — the goal is a good quality of life for your pet.' },
        { heading: 'When to seek examination?', text: 'Symptoms that may indicate internal disease include increased thirst and urination, weight changes, vomiting, diarrhoea, lethargy, loss of appetite, changes in the skin or coat, or abdominal swelling. If you notice these symptoms in your pet, book an examination — early diagnosis and treatment significantly improve the prognosis.' },
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
    metaDesc: 'Eläinten silmäsairaudet Vaasassa: sarveiskalvon haavaumat, glaukooma, kuivasilmäisyys, kaihi, silmäluomien sairaudet. Tutkimus ja hoito. Eläinklinikka Saari.',
    icon: '👁️',
    sections: [
      { heading: 'Yleisimmät silmäsairaudet', text: 'Silmäsairaudet ovat yleisiä lemmikeillä ja voivat olla hyvin kivuliaita. Yleisimpiä ovat sarveiskalvon haavaumat (eroosiot ja ulseraatiot), glaukooma (silmänpainetauti), kuivasilmäisyys (keratoconjunctivitis sicca), kaihi (linssin samentuma) sekä silmäluomien sairaudet kuten entropion (silmäluomen sisäänpäin kääntyminen) ja ektropion (ulospäin kääntyminen). Tietyt rodut, kuten brakykefaaliset (lyhytkuonoiset) koirat, ovat erityisen alttiita silmäongelmille.' },
      { heading: 'Tutkimusmenetelmät', text: 'Silmätutkimuksessa käytetään useita diagnostisia menetelmiä. Fluoresiinivärjäys paljastaa sarveiskalvon vauriot ja haavaumat. Silmänpainemittauksella (tonometria) tunnistetaan glaukooma. Schirmerin kyyneltestillä mitataan kyynelnesteen tuotantoa. Silmälamppututkimuksella arvioidaan silmän etuosan rakenteet. Näiden tutkimusten avulla saadaan tarkka kuva silmän tilasta ja voidaan aloittaa oikea hoito.' },
      { heading: 'Hoito', text: 'Silmäsairauksien hoito riippuu diagnoosista. Sarveiskalvon haavaumat hoidetaan silmätipoilla ja tarvittaessa suojalinssillä tai kirurgisesti. Glaukooman hoitoon käytetään silmänpainetta alentavia lääkkeitä. Kuivasilmäisyyttä hoidetaan kyynelkorvikkeilla ja immunomoduloivilla tipoilla. Entropion ja muut silmäluomien rakenteelliset ongelmat vaativat usein kirurgista korjausta.' },
      { heading: 'Milloin hakeutua tutkimuksiin?', text: 'Silmäoireisiin tulee reagoida nopeasti, sillä monet silmäsairaudet etenevät nopeasti ja voivat johtaa pysyvään näkövaurioon. Hakeudu vastaanotolle, jos lemmikkisi siristää silmäänsä, silmä vuotaa, silmä on punoittava, pupillit ovat erikokoiset, silmä on samentunut tai lemmikki raapii silmäänsä. Varhainen hoito on silmäsairauksissa erityisen tärkeää.' },
    ],
    sv: {
      title: 'Ögonsjukdomar — Djurklinik Saari, Vasa',
      h1: 'Ögonsjukdomar',
      metaDesc: 'Ögonsjukdomar hos husdjur i Vasa: hornhinnesår, glaukom, torra ögon, katarakt, ögonlockssjukdomar. Undersökning och behandling. Eläinklinikka Saari.',
      sections: [
        { heading: 'De vanligaste ögonsjukdomarna', text: 'Ögonsjukdomar är vanliga hos husdjur och kan vara mycket smärtsamma. De vanligaste är hornhinnesår (erosioner och ulcerationer), glaukom (förhöjt ögontryck), torra ögon (keratoconjunctivitis sicca), katarakt (linsgrumling) samt ögonlockssjukdomar som entropion (inåtvänt ögonlock) och ektropion (utåtvänt ögonlock). Vissa raser, som brakycefala (kortnosade) hundar, är särskilt mottagliga för ögonproblem.' },
        { heading: 'Undersökningsmetoder', text: 'Vid ögonundersökning används flera diagnostiska metoder. Fluoresceinfärgning avslöjar hornhinneskador och sår. Ögontrycksmätning (tonometri) identifierar glaukom. Schirmers tårtest mäter tårproduktionen. Spaltlampundersökning bedömer strukturerna i ögats främre del. Med hjälp av dessa undersökningar fås en exakt bild av ögats tillstånd och rätt behandling kan påbörjas.' },
        { heading: 'Behandling', text: 'Behandlingen av ögonsjukdomar beror på diagnosen. Hornhinnesår behandlas med ögondroppar och vid behov med skyddslins eller kirurgiskt. Glaukom behandlas med trycksänkande läkemedel. Torra ögon behandlas med tårersättningsmedel och immunmodulerande droppar. Entropion och andra strukturella ögonlocksproblem kräver ofta kirurgisk korrigering.' },
        { heading: 'När ska man söka undersökning?', text: 'Man bör reagera snabbt på ögonsymtom, eftersom många ögonsjukdomar fortskrider snabbt och kan leda till permanent synskada. Sök vård om ditt husdjur kisar, ögat rinner, ögat är rött, pupillerna är olika stora, ögat är grumligt eller husdjuret kliar sig i ögat. Tidig behandling är särskilt viktigt vid ögonsjukdomar.' },
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
    relatedArticles: ['senioritarkastus', 'munuaisten-vajaatoiminta', 'kilpirauhasen-liikatoiminta'],
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
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['kirurgia', 'viralliset-tutkimukset', 'tta-leikkaus'],
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
    relatedArticles: ['senioritarkastus'],
    schemaService: 'Veterinary Euthanasia'
  },
  {
    slug: 'eu-lemmikkipassi',
    slugSv: 'eu-sallskapsdjurspass',
    slugEn: 'eu-pet-passport',
    title: 'EU-lemmikkipassi — Eläinklinikka Saari, Vaasa',
    h1: 'EU-lemmikkipassi',
    metaDesc: 'EU-lemmikkieläinpassi ja matkustusasiakirjat Vaasassa. Rabiesrokotus, tiitteritutkimus, terveystodistukset. Matkusta turvallisesti lemmikkisi kanssa. Eläinklinikka Saari.',
    icon: '🛂',
    sections: [
      { heading: 'Mikä on EU-lemmikkipassi?', text: 'EU-lemmikkieläinpassi on virallinen asiakirja, joka todistaa lemmikkisi tunnistuksen ja rokotustiedot. Passi vaaditaan kaikille koirille, kissoille ja freteille, jotka matkustavat EU-maiden välillä. Passin saa vain eläinlääkäriltä, ja se edellyttää voimassa olevaa mikrosirutunnistusta ja rabiesrokotusta. Passi on lemmikkisi henkilöllisyystodistus kansainvälisessä matkustamisessa.' },
      { heading: 'Matkustaminen EU:n sisällä', text: 'EU:n sisäinen matkustaminen lemmikin kanssa on suhteellisen suoraviivaista. Vaatimuksena on voimassa oleva EU-lemmikkipassi, mikrosiru ja rabiesrokotus (annettu vähintään 21 päivää ennen matkaa). Rabiesrokotuksen tehosteväli on 1–3 vuotta rokotteesta riippuen, ja voimassaolon on jatkuttava koko matkan ajan. Joissakin maissa on lisävaatimuksia, kuten ekinokokkilääkitys Iso-Britanniaan matkustettaessa.' },
      { heading: 'Matkustaminen EU:n ulkopuolelle', text: 'EU:n ulkopuolelle matkustettaessa vaatimukset vaihtelevat maan mukaan. Joihinkin maihin tarvitaan rabies-tiitteritutkimus (vasta-ainemääritys), joka on tehtävä vähintään 30 päivää rokotuksen jälkeen ja 3 kuukautta ennen matkaa. Lisäksi voidaan vaatia erillinen eläinlääkärin terveystodistus, tuontilupa tai karanteeni. Ota yhteyttä meihin hyvissä ajoin — selvitämme kohdemaasi vaatimukset ja autamme aikatauluttamaan tutkimukset ja rokotukset oikein.' },
      { heading: 'Miten hakea passia?', text: 'EU-lemmikkipassin saat klinikaltamme. Passiin tarvitaan mikrosiru (jos lemmikillä ei ole, asennamme sen samalla käynnillä) ja voimassa oleva rabiesrokotus. Varaa aika passinhakua varten — käynti sisältää terveystarkastuksen, mahdollisen mikrosirun asennuksen ja rabiesrokotuksen. Saat passin mukaasi samana päivänä. Jos suunnittelet matkaa, aloita valmistelut ajoissa — osa vaatimuksista edellyttää viikkojen odotusaikoja.' },
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
      ],
      ctaTitle: 'Book an appointment',
      ctaText: 'Call us or book online.',
      ctaCall: 'Call (06) 321 7300',
      ctaBook: 'Book online',
      back: '\u2190 Back to homepage',
      relatedTitle: 'Related articles',
    },
    relatedArticles: ['rokotukset'],
    schemaService: 'EU Pet Passport Services'
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

  // Breadcrumb labels
  const breadcrumbHome = { fi: 'Etusivu', sv: 'Startsidan', en: 'Home' };
  const breadcrumbServices = { fi: 'Palvelut', sv: 'Tjänster', en: 'Services' };

  // Footer text
  const footerDesc = {
    fi: 'Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.',
    sv: 'Finsk privatägd smådjursklinik i Dragnäsbäck, Vasa, vid Bockis-kurvan.',
    en: 'Finnish independent small animal clinic in Dragnäsbäck, Vaasa, at the Bockis curve.'
  };
  const footerQuicklinks = { fi: 'Pikalinkit', sv: 'Snabblänkar', en: 'Quick links' };
  const footerContact = { fi: 'Yhteystiedot', sv: 'Kontaktuppgifter', en: 'Contact' };
  const footerFollow = { fi: 'Seuraa meitä', sv: 'Följ oss', en: 'Follow us' };
  const footerRights = { fi: 'Kaikki oikeudet pidätetään.', sv: 'Alla rättigheter förbehållna.', en: 'All rights reserved.' };
  const navLabels = {
    fi: { about: 'Klinikka', services: 'Palvelut', team: 'Henkilökunta', prices: 'Hinnasto', wildlife: 'Wildlife' },
    sv: { about: 'Kliniken', services: 'Tjänster', team: 'Personal', prices: 'Prislista', wildlife: 'Wildlife' },
    en: { about: 'Clinic', services: 'Services', team: 'Staff', prices: 'Prices', wildlife: 'Wildlife' }
  };
  const nav = navLabels[lang] || navLabels.fi;

  // Related articles title
  const relatedTitle = (lang !== 'fi' && langData) ? langData.relatedTitle : { fi: 'Aiheeseen liittyvät artikkelit', sv: 'Relaterade artiklar', en: 'Related articles' }[lang] || 'Aiheeseen liittyvät artikkelit';

  // Build body sections
  let sectionsHtml = '';
  for (const section of pageSections) {
    sectionsHtml += `
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.text)}</p>`;
  }

  // Build related articles (always Finnish article links since articles are only in Finnish)
  let relatedHtml = '';
  if (service.relatedArticles && service.relatedArticles.length > 0) {
    let cards = '';
    for (const slug of service.relatedArticles) {
      const article = articles.find(a => a.slug === slug);
      if (!article) continue;
      const title = t(article.titleKey);
      const tag = t(article.tagKey);
      const intro = t(`${article.prefix}.intro`);
      const shortIntro = intro.length > 120 ? intro.substring(0, 117) + '...' : intro;
      cards += `
          <a href="${assetPrefix}articles/${slug}.html" class="related-article-card">
            <span class="article-tag">${escapeHtml(tag)}</span>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(shortIntro)}</p>
          </a>`;
    }
    relatedHtml = `
      <div class="related-articles">
        <h2>${escapeHtml(relatedTitle)}</h2>
        <div class="related-articles-grid">${cards}
        </div>
      </div>`;
  }

  // Language switcher
  const langSwitcher = `
          <div class="lang-toggle">
            <a href="${lang === 'fi' ? '#' : ('/' + 'palvelut/' + service.slug + '/')}" class="${lang === 'fi' ? 'active' : ''}">FI</a>
            <a href="${lang === 'sv' ? '#' : ('/sv/tjanster/' + service.slugSv + '/')}" class="${lang === 'sv' ? 'active' : ''}">SV</a>
            <a href="${lang === 'en' ? '#' : ('/en/services/' + service.slugEn + '/')}" class="${lang === 'en' ? 'active' : ''}">EN</a>
          </div>`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
  function gtag_report_conversion() {
    gtag('event', 'conversion', {
      'send_to': 'AW-816483191/FPP_CIm07owcEPeWqoUD',
      'value': 1.0,
      'currency': 'EUR'
    });
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
      "procedureType": "http://schema.org/NoninvasiveProcedure"
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
        "name": "${breadcrumbServices[lang] || 'Palvelut'}",
        "item": "${BASE_URL}/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": ${JSON.stringify(pageH1)},
        "item": "${canonicalUrl}"
      }
    ]
  }]
  </script>

  <link rel="stylesheet" href="${assetPrefix}css/style.css">
  <link rel="icon" type="image/png" href="${assetPrefix}images/logo.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">${escapeHtml(skipText)}</a>

  <header class="header">
    <div class="container">
      <a href="${assetPrefix}" class="logo">
        <div class="logo-icon"><img src="${assetPrefix}images/logo.png" alt="Eläinklinikka Saari"></div>
      </a>
      <nav class="nav">
        <div class="nav-actions">
${langSwitcher}
          <a href="${assetPrefix}" class="btn btn-outline btn-sm">${escapeHtml(backText)}</a>
        </div>
      </nav>
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
      <a href="${assetPrefix}" class="btn btn-secondary articles-back">${escapeHtml(backText)}</a>
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
          <h4>${escapeHtml(footerQuicklinks[lang] || footerQuicklinks.fi)}</h4>
          <a href="${assetPrefix}#about">${escapeHtml(nav.about)}</a>
          <a href="${assetPrefix}#services">${escapeHtml(nav.services)}</a>
          <a href="${assetPrefix}#team">${escapeHtml(nav.team)}</a>
          <a href="${assetPrefix}#prices">${escapeHtml(nav.prices)}</a>
          <a href="${assetPrefix}#wildlife">${escapeHtml(nav.wildlife)}</a>
        </div>
        <div class="footer-col">
          <h4>${escapeHtml(footerContact[lang] || footerContact.fi)}</h4>
          <a href="tel:+35863217300" onclick="gtag_report_conversion();">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <h4>${escapeHtml(footerFollow[lang] || footerFollow.fi)}</h4>
          <div class="footer-social">
            <a href="https://www.facebook.com/SaariKlinikka" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/elainklinikkasaari" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; Y-tunnus: 0708667-9 &middot; ${escapeHtml(footerRights[lang] || footerRights.fi)}</span>
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
  <link rel="canonical" href="${BASE_URL}/tietosuoja/">
  <link rel="alternate" hreflang="fi" href="${BASE_URL}/tietosuoja/">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/tietosuoja/">
  <meta property="og:title" content="Tietosuojaseloste — Eläinklinikka Saari">
  <meta property="og:description" content="Eläinklinikka Saari Oy:n tietosuojaseloste ja rekisteriseloste.">
  <meta property="og:locale" content="fi_FI">
  <meta property="og:site_name" content="Eläinklinikka Saari">

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
      <nav class="nav">
        <div class="nav-actions">
          <a href="../" class="btn btn-outline btn-sm">← Takaisin etusivulle</a>
        </div>
      </nav>
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
          <h4>Pikalinkit</h4>
          <a href="../#about">Klinikka</a>
          <a href="../#services">Palvelut</a>
          <a href="../#team">Henkilökunta</a>
          <a href="../#prices">Hinnasto</a>
        </div>
        <div class="footer-col">
          <h4>Yhteystiedot</h4>
          <a href="tel:+35863217300">(06) 321 7300</a>
          <a href="mailto:info@saarivet.fi">info@saarivet.fi</a>
          <a href="https://maps.google.com/?q=Gerbyntie+18+Vaasa">Gerbyntie 18, Vaasa</a>
        </div>
        <div class="footer-col">
          <h4>Seuraa meitä</h4>
          <div class="footer-social">
            <a href="https://www.facebook.com/SaariKlinikka" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/elainklinikkasaari" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Eläinklinikka Saari Oy &middot; Y-tunnus: 0708667-9 &middot; Kaikki oikeudet pidätetään.</span>
      </div>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// 9. Generate sitemap.xml
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
