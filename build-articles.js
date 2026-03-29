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
      "name": "${article.tagKey === 'articles.tag.orthopedics' ? 'Pamela Kvarngård' : 'Assaf Wydra'}",
      "jobTitle": "${article.tagKey === 'articles.tag.orthopedics' ? 'Eläinlääkäri' : 'Eläinlääkäri, toimitusjohtaja'}",
      "worksFor": {
        "@type": "VeterinaryHospital",
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
        <div class="article-byline">Eläinlääkäri ${article.tagKey === 'articles.tag.orthopedics' ? 'Pamela Kvarngård' : 'Assaf Wydra'}, Eläinklinikka Saari</div>
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
    relatedArticles: ['hampaiden-harjaus', 'hammasresorptio', 'puhkeamattomat-hampaat', 'periovive'],
    schemaService: 'Veterinary Dental Care'
  },
  {
    slug: 'sydantutkimukset',
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
    relatedArticles: ['avoin-valtimotiehyt-pda', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Cardiology'
  },
  {
    slug: 'kirurgia',
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
    relatedArticles: ['tta-leikkaus', 'lateral-suture', 'anestesiaturvallisuus', 'kipulääkeinfuusio', 'hypotermia'],
    schemaService: 'Veterinary Surgery'
  },
  {
    slug: 'tahystykset',
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
    relatedArticles: ['gastroskopia', 'video-otoskopia', 'ibd-lymfooma', 'anestesiaturvallisuus'],
    schemaService: 'Veterinary Endoscopy'
  },
  {
    slug: 'rokotukset',
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
    relatedArticles: ['rokotukset', 'kissaystävällinen-klinikka', 'yksityinen-klinikka'],
    schemaService: 'Veterinary Vaccination'
  },
  {
    slug: 'ultraaani',
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
    relatedArticles: ['avoin-valtimotiehyt-pda', 'ibd-lymfooma', 'munuaisten-vajaatoiminta'],
    schemaService: 'Veterinary Ultrasound'
  },
  {
    slug: 'ihotaudit',
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
    relatedArticles: ['ruoka-allergiat', 'video-otoskopia', 'viljaton-ruoka'],
    schemaService: 'Veterinary Dermatology'
  },
  {
    slug: 'senioritarkastus',
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
    relatedArticles: ['munuaisten-vajaatoiminta', 'kilpirauhasen-liikatoiminta', 'rokotukset'],
    schemaService: 'Senior Pet Health Screening'
  },
  {
    slug: 'pentutarkastus',
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
    relatedArticles: ['rokotukset', 'kissaystävällinen-klinikka', 'ripuli'],
    schemaService: 'Puppy Health Examination'
  },
  {
    slug: 'akupunktio',
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
    relatedArticles: ['anestesiaturvallisuus', 'kipulääkeinfuusio', 'yksityinen-klinikka'],
    schemaService: 'Veterinary Acupuncture'
  },
  {
    slug: 'viralliset-tutkimukset',
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
    relatedArticles: ['anestesiaturvallisuus', 'tta-leikkaus', 'lateral-suture'],
    schemaService: 'Official Veterinary Examinations'
  },
  {
    slug: 'sterilisaatio',
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
    relatedArticles: ['kohtutulehdus', 'anestesiaturvallisuus', 'kipulääkeinfuusio'],
    schemaService: 'Veterinary Spay and Neuter'
  },
];

function generateServicePage(service, translations) {
  const t = (key) => translations[key]?.fi || '';
  const today = new Date().toISOString().split('T')[0];
  const canonicalUrl = `${BASE_URL}/palvelut/${service.slug}/`;

  // Build body sections
  let sectionsHtml = '';
  for (const section of service.sections) {
    sectionsHtml += `
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.text)}</p>`;
  }

  // Build related articles
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
          <a href="../../articles/${slug}.html" class="related-article-card">
            <span class="article-tag">${escapeHtml(tag)}</span>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(shortIntro)}</p>
          </a>`;
    }
    relatedHtml = `
      <div class="related-articles">
        <h2>Aiheeseen liittyvät artikkelit</h2>
        <div class="related-articles-grid">${cards}
        </div>
      </div>`;
  }

  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(service.title)}</title>

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

  <meta name="description" content="${escapeAttr(service.metaDesc)}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="fi" href="${canonicalUrl}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeAttr(service.h1)} — Eläinklinikka Saari">
  <meta property="og:description" content="${escapeAttr(service.metaDesc)}">
  <meta property="og:image" content="${BASE_URL}/images/clinic-about.jpg">
  <meta property="og:locale" content="fi_FI">
  <meta property="og:site_name" content="Eläinklinikka Saari">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(service.h1)} — Eläinklinikka Saari">
  <meta name="twitter:description" content="${escapeAttr(service.metaDesc)}">
  <meta name="twitter:image" content="${BASE_URL}/images/clinic-about.jpg">

  <script type="application/ld+json">
  [{
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": ${JSON.stringify(service.h1)},
    "description": ${JSON.stringify(service.metaDesc)},
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
        "name": "Etusivu",
        "item": "${BASE_URL}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Palvelut",
        "item": "${BASE_URL}/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": ${JSON.stringify(service.h1)},
        "item": "${canonicalUrl}"
      }
    ]
  }]
  </script>

  <link rel="stylesheet" href="../../css/style.css">
  <link rel="icon" type="image/png" href="../../images/logo.png">
</head>
<body class="article-page">
  <a href="#main-content" class="skip-link">Siirry sisältöön</a>

  <header class="header">
    <div class="container">
      <a href="../../" class="logo">
        <div class="logo-icon"><img src="../../images/logo.png" alt="Eläinklinikka Saari"></div>
      </a>
      <nav class="nav">
        <div class="nav-actions">
          <a href="../../" class="btn btn-outline btn-sm">\u2190 Takaisin etusivulle</a>
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
        <h1>${escapeHtml(service.h1)}</h1>
        <div class="article-content">${sectionsHtml}
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
${relatedHtml}
      <a href="../../" class="btn btn-secondary articles-back">\u2190 Takaisin etusivulle</a>
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
          <a href="../../#about">Klinikka</a>
          <a href="../../#services">Palvelut</a>
          <a href="../../#team">Henkilökunta</a>
          <a href="../../#prices">Hinnasto</a>
          <a href="../../#wildlife">Wildlife</a>
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

  <script src="../../js/main.js"></script>
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

  // Generate service landing pages
  console.log('\nBuilding service pages...');
  for (const service of servicePages) {
    const serviceDir = path.join(ROOT, 'palvelut', service.slug);
    if (!fs.existsSync(serviceDir)) {
      fs.mkdirSync(serviceDir, { recursive: true });
    }
    const html = generateServicePage(service, translations);
    fs.writeFileSync(path.join(serviceDir, 'index.html'), html, 'utf-8');
    console.log(`  palvelut/${service.slug}/index.html - ${service.h1}`);
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
