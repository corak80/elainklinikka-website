#!/usr/bin/env python3
"""Build the privacy policy pages (FI /tietosuoja/, SV /sv/dataskydd/, EN /en/privacy/) — 09-11-2026.

Text: docs/compliance-2026-11/{fi,sv,en}_final.json (privacy_title, privacy_updated, privacy_body_html,
privacy_meta_description, footer_privacy_link). Page chrome (header, nav, footer, consent.js) is taken
from a sibling page of the same language and depth, so the pages look like the rest of the site.
Also points every SV/EN page's footer privacy link at its own language and relabels the FI/SV/EN
footer links. Idempotent.

Usage: python3 tools/consent/build_privacy.py
"""
import html, json, os, re, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DOCS = os.path.join(ROOT, 'docs', 'compliance-2026-11')
BASE = 'https://elainklinikkasaari.fi'
PAGES = {
    'fi': {'path': '/tietosuoja/', 'template': 'tietosuoja/index.html', 'locale': 'fi_FI', 'brand': 'Eläinklinikka Saari'},
    # 'title': short name for the browser/search title only (the H1 keeps the full privacy_title with the company name)
    'sv': {'path': '/sv/dataskydd/', 'template': 'sv/kontakt/index.html', 'locale': 'sv_FI', 'brand': 'Djurklinik Saari', 'title': 'Dataskyddsbeskrivning'},
    'en': {'path': '/en/privacy/', 'template': 'en/contact/index.html', 'locale': 'en_GB', 'brand': 'Saari Animal Clinic'},
}
PRIVACY_CSS = '''  <style id="privacy-css">
    .privacy-policy table{width:100%;border-collapse:collapse;margin:1rem 0 1.5rem;font-size:.95rem}
    .privacy-policy th,.privacy-policy td{border:1px solid #e6dde2;padding:.6rem .7rem;text-align:left;vertical-align:top}
    .privacy-policy thead th{background:#fbf3f7}
    @media (max-width:640px){
      .privacy-policy thead{display:none}
      .privacy-policy tr{display:block;border:1px solid #e6dde2;border-radius:10px;margin:0 0 .9rem;padding:.3rem 0}
      .privacy-policy td{display:block;border:0;padding:.35rem .8rem}
      .privacy-policy td:first-child{font-weight:600}
    }
  </style>
'''
BACK = {'fi': 'Takaisin etusivulle', 'sv': 'Tillbaka till startsidan', 'en': 'Back to homepage'}
HOME = {'fi': ('Etusivu', '/'), 'sv': ('Startsidan', '/sv/'), 'en': ('Home', '/en/')}


def text(lang):
    return json.load(open(os.path.join(DOCS, f'{lang}_final.json'), encoding='utf-8'))


def set_attr(s, pattern, value):
    rx = re.compile(pattern)
    assert rx.search(s), pattern
    return rx.sub(lambda m: m.group(1) + html.escape(value, quote=True) + m.group(2), s, count=1)


def build(lang):
    p, t = PAGES[lang], text(lang)
    src = open(os.path.join(ROOT, p['template']), encoding='utf-8').read()
    url = BASE + p['path']
    title = f"{p.get('title', t['privacy_title'])} | {p['brand']}"
    desc = t['privacy_meta_description']
    s = re.sub(r'<title>.*?</title>', f'<title>{html.escape(title)}</title>', src, count=1, flags=re.S)
    s = set_attr(s, r'(<meta name="description" content=")[^"]*(")', desc)
    s = set_attr(s, r'(<link rel="canonical" href=")[^"]*(")', url)
    s = set_attr(s, r'(<meta property="og:url" content=")[^"]*(")', url)
    s = set_attr(s, r'(<meta property="og:title" content=")[^"]*(")', title)
    s = set_attr(s, r'(<meta property="og:description" content=")[^"]*(")', desc)
    s = set_attr(s, r'(<meta property="og:locale" content=")[^"]*(")', p['locale'])
    for k in ('title', 'description'):
        s = re.sub(rf'(<meta name="twitter:{k}" content=")[^"]*(")',
                   lambda m: m.group(1) + html.escape(title if k == 'title' else desc, quote=True) + m.group(2), s, count=1)
    # hreflang: the three privacy pages
    s = re.sub(r'[ \t]*<link rel="alternate" hreflang="[^"]+" href="[^"]*">\n', '', s)
    alt = ''.join(f'  <link rel="alternate" hreflang="{l}" href="{BASE}{PAGES[l]["path"]}">\n' for l in ('fi', 'sv', 'en'))
    alt += f'  <link rel="alternate" hreflang="x-default" href="{BASE}{PAGES["fi"]["path"]}">\n'
    s = re.sub(r'(<link rel="canonical" href="[^"]*">\n)', lambda m: m.group(1) + alt, s, count=1)
    # no structured data from the template (its Review/Article JSON-LD does not belong here),
    # only a breadcrumb: home > this page
    s = re.sub(r'[ \t]*<script type="application/ld\+json">.*?</script>\n?', '', s, flags=re.S)
    crumb = {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': 1, 'name': HOME[lang][0], 'item': BASE + HOME[lang][1]},
        {'@type': 'ListItem', 'position': 2, 'name': t['privacy_title'].split(' – ')[0], 'item': url},
    ]}
    ld = '  <script type="application/ld+json">' + json.dumps(crumb, ensure_ascii=False) + '</script>\n'
    s = s.replace('</head>', ld + '</head>', 1)
    # language toggle → the privacy page in each language
    def toggle(m):
        block = m.group(0)
        for l, label in (('fi', 'FI'), ('sv', 'SV'), ('en', 'EN')):
            active = ' class="active" aria-current="page"' if l == lang else ' class=""'
            block = re.sub(rf'<a href="[^"]*"[^>]*>{label}</a>', f'<a href="{BASE}{PAGES[l]["path"]}"{active}>{label}</a>', block, count=1)
        return block
    s = re.sub(r'<div class="lang-toggle">.*?</div>', toggle, s, count=1, flags=re.S)
    # the template page's own menu item is marked current; the privacy page has none
    s = re.sub(r'(<div class="nav-links">.*?</div>)', lambda m: m.group(1).replace(' class="active" aria-current="page"', ''), s, count=1, flags=re.S)
    main = f'''<main id="main-content">
  <section class="section articles-section">
    <div class="container">
      <article class="article-card">
        <h1>{html.escape(t['privacy_title'])}</h1>
        <p class="article-meta">{html.escape(t['privacy_updated'])}</p>
        <div class="article-content privacy-policy">
{t['privacy_body_html']}
        </div>
      </article>

      <div class="page-back-wrapper"><a href="{'../' if lang == 'fi' else '../../' + lang + '/'}" class="page-back-link">{BACK[lang]}</a></div>
    </div>
  </section>
  </main>'''
    s = re.sub(r'<main id="main-content">.*?</main>', lambda m: main, s, count=1, flags=re.S)
    if 'id="privacy-css"' not in s:
        s = s.replace('</head>', PRIVACY_CSS + '</head>', 1)
    out = os.path.join(ROOT, p['path'].strip('/'), 'index.html')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(s)
    return out


def relink_footers():
    """Footer privacy link: own language + the new label, on every page."""
    files = [f for f in subprocess.check_output(['git', 'ls-files', '-z', '*.html'], cwd=ROOT).decode().split('\0') if f]
    files += ['sv/dataskydd/index.html', 'en/privacy/index.html']
    labels = {l: html.escape(text(l)['footer_privacy_link']) for l in PAGES}
    rx = re.compile(r'(<div class="footer-bottom">.*?)<a href="[^"]*(?:tietosuoja|dataskydd|privacy)/"([^>]*)>[^<]*</a>', re.S)
    n = 0
    for f in sorted(set(files)):
        path = os.path.join(ROOT, f)
        if not os.path.exists(path):
            continue
        s = open(path, encoding='utf-8').read()
        lang = (re.search(r'<html lang="([a-z]{2})', s) or [None, 'fi'])[1]
        lang = lang if lang in PAGES else 'fi'
        t = rx.sub(lambda m: f'{m.group(1)}<a href="{PAGES[lang]["path"]}"{m.group(2)}>{labels[lang]}</a>', s, count=1)
        if t != s:
            open(path, 'w', encoding='utf-8').write(t); n += 1
    return n


if __name__ == '__main__':
    for l in PAGES:
        print('built', build(l))
    print('footer links updated on', relink_footers(), 'pages')
