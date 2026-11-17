#!/usr/bin/env python3
"""17-11-2026: build /elainlaakari-kurikka/ (Jurva, Kurikka, Kauhajoki) from the live Kristiinankaupunki page.

The sister page's generator (tools/sydosterbotten/build.js) is stale and must not be run, so this copies the
CURRENT hand-edited FI page and swaps only the town-specific parts. Body sections (services, prices, FAQ
except the emergency answer) stay identical. Copy: tools/kurikka/fi.json (native writer → critic → editor,
approved by Assaf). Every replacement must hit exactly the expected number of times, or nothing is written.

Drive times: Google Maps 17-11-2026 from Gerbyntie 18: Jurva 46 min 58.5 km, Kurikka 1 h 02 78.9 km,
Kauhajoki 1 h 16 95.5 km. On-call: kurikka.fi 0600 399 005 (Ilmajoki + Kurikka area, pets included),
kauhajoki.fi 0600 12202 (Kauhajoki, Isojoki, Karijoki, Teuva).

  python3 tools/kurikka/make_page.py          # writes elainlaakari-kurikka/index.html
"""
import json, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(ROOT, "elainlaakari-kristiinankaupunki", "index.html")
OUT = os.path.join(ROOT, "elainlaakari-kurikka", "index.html")
C = json.load(open(os.path.join(os.path.dirname(__file__), "fi.json"), encoding="utf-8"))

OLD_URL = "https://elainklinikkasaari.fi/elainlaakari-kristiinankaupunki/"
NEW_URL = "https://elainklinikkasaari.fi/elainlaakari-kurikka/"

TOWNS = [  # key, chip, "from" form, time, km, on-call group
    ("jurva", "Jurva", "Jurvasta", "noin 45 min", 59, "kurikka"),
    ("kurikka", "Kurikka", "Kurikasta", "noin 1 h", 79, "kurikka"),
    ("kauhajoki", "Kauhajoki", "Kauhajoelta", "noin 1 h 15 min", 96, "kauhajoki"),
]

def attr(s):  # for content="..." attributes
    return s.replace("&", "&amp;").replace('"', "&quot;")

def jstr(s):  # inside a JSON-LD string
    return json.dumps(s, ensure_ascii=False)[1:-1]

html = open(SRC, encoding="utf-8").read()
errors = []

def sub(old, new, count, label, regex=False):
    global html
    n = len(re.findall(old, html)) if regex else html.count(old)
    if n != count:
        errors.append(f"{label}: expected {count}, found {n}")
        return
    html = re.sub(old, lambda m: new, html) if regex else html.replace(old, new)

OLD_TITLE = "Eläinlääkäri Kristiinankaupunki – Eläinklinikka Saari, Vaasa"
OLD_META = ("Hammashoito ja hammasröntgen, ultraääni, sydäntutkimukset, ortopedia ja oma laboratorio Vaasassa – "
            "reilu tunti Kristiinankaupungista. Suomeksi ja ruotsiksi.")
OLD_H1 = "Eläinlääkäri Kristiinankaupungin ja Suupohjan lemmikeille – tunnin ajomatka Vaasaan"
OLD_P2 = ("Moni potilaistamme ajaa meille jo nyt rannikkoa pitkin etelästä. Ajomatka kestää reilun tunnin "
          "Kristiinankaupungista ja noin tunnin Närpiöstä ja Kaskisista – ja on asioita, joiden vuoksi matka kannattaa.")
OLD_TOGETHER = ("Monella etelästä tulevalla potilaallamme on oma eläinlääkäri kotipaikkakunnalla, "
                "ja Vaasaan tullaan toimenpiteitä varten.")
OLD_FAQ = ("Aukioloaikoina soita ensin meille. Aukioloaikojen ulkopuolella ota yhteys oman alueesi päivystävään "
           "eläinlääkäriin – rannikkokunnissa numero on 0600 399 199, Teuvalla, Karijoella ja Isojoella 0600 12202.")

# head: language alternates (this page has no SV/EN version) and the language toggle
sub(r'  <link rel="alternate" hreflang="[a-z-]+" href="[^"]+">\n', "", 4, "hreflang lines", regex=True)
sub(f'<a href="{OLD_URL}" class="active" aria-current="page">FI</a>',
    f'<a href="{NEW_URL}" class="active" aria-current="page">FI</a>', 1, "lang toggle FI")
sub('<a href="https://elainklinikkasaari.fi/sv/veterinar-narpes-kristinestad/" class="">SV</a>',
    '<a href="https://elainklinikkasaari.fi/sv/" class="">SV</a>', 1, "lang toggle SV")
sub('<a href="https://elainklinikkasaari.fi/en/veterinarian-kristinestad-narpes/" class="">EN</a>',
    '<a href="https://elainklinikkasaari.fi/en/" class="">EN</a>', 1, "lang toggle EN")

sub(f"<title>{OLD_TITLE}</title>", f"<title>{C['title']}</title>", 1, "title")
sub(f'content="{OLD_TITLE}"', f'content="{attr(C["title"])}"', 2, "og/twitter title")
sub(f'"name": "{OLD_TITLE}"', f'"name": "{jstr(C["title"])}"', 1, "ld name")
sub(f'content="{OLD_META}"', f'content="{attr(C["meta"])}"', 3, "meta descriptions")
sub(f'"description": "{OLD_META}"', f'"description": "{jstr(C["meta"])}"', 1, "ld description")
sub(OLD_URL, NEW_URL, 4, "page URL (canonical, og:url, ld url, breadcrumb item)")
sub('"lastReviewed": "2026-10-07"', '"lastReviewed": "2026-11-17"', 1, "lastReviewed")
sub('"areaServed": ["Vaasa", "Kristiinankaupunki", "Närpiö", "Kaskinen", "Teuva", "Karijoki", "Isojoki"]',
    '"areaServed": ["Vaasa", "Kurikka", "Jurva", "Kauhajoki"]', 1, "areaServed")
sub(f'"name": "{OLD_H1}"', f'"name": "{jstr(C["h1"])}"', 1, "breadcrumb name")
sub(f"<h1>{OLD_H1}</h1>", f"<h1>{C['h1']}</h1>", 1, "h1")
sub(OLD_P2, C["intro_p2"], 1, "intro p2")
sub(OLD_TOGETHER, C["together_last_sentence"], 1, "together sentence")
sub(f'"text": "{OLD_FAQ}"', f'"text": "{jstr(C["faq_emergency_answer"])}"', 1, "FAQ answer (ld)")
sub(f"<p>{OLD_FAQ}</p>", f"<p>{C['faq_emergency_answer']}</p>", 1, "FAQ answer (visible)")

# emergency paragraph (the <p> right after <h2>Hätätapaukset</h2>)
m = re.search(r"(<h2>Hätätapaukset</h2>\n      <p>)(Emme ole päivystysklinikka.*?)(</p>)", html, re.S)
if not m:
    errors.append("emergency paragraph: not found")
else:
    html = html[:m.start(2)] + C["emergency"] + html[m.end(2):]

# on-call box
sub(re.compile(r'<p class="oncall-line is-selected" data-oncall="south">.*?</p>\n\s*<p class="oncall-line" data-oncall="municipal">.*?</p>').pattern,
    f'<p class="oncall-line is-selected" data-oncall="kurikka">{C["oncall_kurikka"]}</p>\n'
    f'        <p class="oncall-line" data-oncall="kauhajoki">{C["oncall_kauhajoki"]}</p>', 1, "on-call box", regex=True)

# town chips, drive rows, trip-section drive times, on-call map in the inline script
chips = "\n          ".join(
    f'<a class="town-chip" href="#drive-{k}" data-town="{k}" aria-pressed="{"true" if i == 0 else "false"}">{chip}</a>'
    for i, (k, chip, *_r) in enumerate(TOWNS))
m = re.search(r'<a class="town-chip" href="#drive-kristiinankaupunki".*?>Isojoki</a>', html, re.S)
if not m: errors.append("chips: not found")
else: html = html[:m.start()] + chips + html[m.end():]

rows = "\n            ".join(
    f'<li class="drive-row{" is-selected" if i == 0 else ""}" id="drive-{k}" data-town="{k}"><span class="drive-from">{frm}</span> '
    f'<span class="drive-time">{t}</span> <span class="drive-km">{km}&nbsp;km</span></li>'
    for i, (k, chip, frm, t, km, oc) in enumerate(TOWNS))
m = re.search(r'<li class="drive-row is-selected" id="drive-kristiinankaupunki".*?id="drive-isojoki".*?</li>', html, re.S)
if not m: errors.append("drive rows: not found")
else: html = html[:m.start()] + rows + html[m.end():]

dl = "\n              ".join(f"<dt>{chip}</dt><dd>{t} · {km}&nbsp;km</dd>" for k, chip, frm, t, km, oc in TOWNS)
m = re.search(r"<dt>Kristiinankaupunki</dt>.*?<dt>Isojoki</dt><dd>[^<]*</dd>", html, re.S)
if not m: errors.append("trip drive times: not found")
else: html = html[:m.start()] + dl + html[m.end():]

oncall_js = "var ONCALL = {" + ", ".join(f"{k}: '{oc}'" for k, chip, frm, t, km, oc in TOWNS) + "};"
sub("var ONCALL = {kristiinankaupunki: 'south', kaskinen: 'south', narpio: 'south', teuva: 'municipal', "
    "karijoki: 'municipal', isojoki: 'municipal'};", oncall_js, 1, "ONCALL map")

# nothing from the old towns may survive
for word in ["Kristiinan", "Närpi", "Kaskis", "Kaskinen", "Teuva", "Karijo", "Isojo", "Suupohja", "Korsnäs",
             "Maalah", "0600 399 199", "rannikko", "etelästä", "kristiinankaupunki", "narpes"]:
    if word in html: errors.append(f"leftover: {word!r} still in page")
visible = re.sub(r"<script.*?</script>", "", html, flags=re.S)   # a JS comment in the page has an em dash
for bad in ["—", "erikois"]:
    if bad in visible: errors.append(f"forbidden: {bad!r}")

if errors:
    print("NOT WRITTEN:"); [print(" -", e) for e in errors]; sys.exit(1)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, "w", encoding="utf-8").write(html)
print("wrote", OUT, len(html), "bytes")
