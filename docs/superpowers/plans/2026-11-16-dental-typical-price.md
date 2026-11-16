# Dental Typical Price Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the typical whole-visit price for a permanent tooth extraction (cat about 700 €, dog about 880 €) on the FI/SV/EN site, remove every "estimate before the procedure" promise, then carry the same answer into the WhatsApp bot, the phone AI and one FB/IG post draft.

**Architecture:** Static site, hand-edited HTML outputs plus their sources (`js/main.src.js` + built `js/main.js`, `build-articles.js` data). The copy is approved once as a wording file, then a check script proves every surface carries the new text and none carries the old promise. Step 2 (bots, post) starts only after the site is live.

**Tech Stack:** HTML, Node (check script, `node --check`), git → GitHub Pages behind Cloudflare.

**Spec:** `docs/superpowers/specs/2026-11-16-dental-typical-price-design.md`

## Global Constraints

- Figures: cat **about 700 €**, dog **about 880 €** (median of the last 6 months). FI `noin 700 €` / `noin 880 €`; SV `cirka 700 €` / `cirka 880 €`; EN `about €700` / `about €880` (EN site format is `€299`).
- "Typical" = the middle bill of our own extraction visits over the last six months, whole visit, anaesthesia included. Never claim dental X-rays or tartar removal are included.
- Never: quote / estimate / hinta-arvio / kostnadsförslag / prisuppskattning for extractions; a promise to phone during the procedure; any other clinic, comparison, "cheaper", superlative (SELL guidelines); "specialist / erikois-".
- Finland-Swedish, never Sweden-Swedish. EN master first; FI and SV each by a native writer → critic → editor.
- Assaf approves the final FI/SV/EN text before any push, and gives an explicit "push" before `git push`.
- Edit `js/main.src.js` AND `js/main.js` with matching literal edits (main.js stores ä/ö/å as `\xE4`/`\xF6`/`\xE5`); never rebuild main.js; `node --check js/main.js` after.
- `build-articles.js` has drifted from its outputs: edit the generated HTML and the generator data by hand, never run the generator over the pages.

## Review Focus

1. A leftover promise in a hidden place (meta/og/twitter description, JSON-LD `description`, FAQ JSON-LD answer, the escaped string in `js/main.js`, `llms-full.txt`): the check script scans all of them, including the `\xE4`-escaped form.
2. Language switcher showing old text because a `main.src.js`/`main.js` key was not updated: the check script reads both files.
3. FAQPage JSON-LD broken by an edit (quotes, `€`, `&nbsp;`): the check script `JSON.parse`s every ld+json block on the three dental pages.
4. Cloudflare serving the old page or old `main.js` after the push: purge (incl. `/js/main.js`) and run the check script against the live URLs.
5. A long price value wrapping badly on a phone: keep the value short (`noin 700 €`) and put "typical price" in the row name; check the price list at 390 px width.

---

### Task 1: Final wording in three languages

**Files:**
- Create: `docs/superpowers/specs/2026-11-16-dental-typical-price-wording.json`

**Interfaces:**
- Produces: JSON with keys `rowCat`, `rowDog`, `valueCat`, `valueDog`, `note`, `whyHeading`, `whyText`, `faqQuestion`, `faqAnswer`, `introSentence`, `metaDescription`, `title`, `articleLine`, `pricingMd`; each `{ "fi": …, "sv": …, "en": … }` (`pricingMd` EN only). Tasks 2–5 read it.

- [ ] **Step 1: Write the EN master** from the spec's approved text. `faqQuestion` reuses the existing question on each page ("How much does a dog or cat tooth extraction cost?" / "Paljonko koiran tai kissan hampaan poisto maksaa?" / "Vad kostar det att dra ut en tand på hund eller katt?"). `introSentence` replaces the FI clause "ja mahdollisista hampaiden poistoista saat hinta-arvion ennen toimenpidettä". `title` keeps "hammaskiven poisto"/"tandsten"/"teeth cleaning" and the town, adds price, ≤ 65 characters. `articleLine`: one sentence, the typical extraction price + link to the dental page cost section.
- [ ] **Step 2: Native FI and SV** — per language one writer, one critic, one editor agent (Finland-Swedish for SV); programmatic check that every FI/SV string has the same numbers as EN and none of the banned words.
- [ ] **Step 3: Show Assaf all three languages side by side** (with English glosses); stop until he approves. Apply his edits.
- [ ] **Step 4: Commit** `git add docs/superpowers/specs/2026-11-16-dental-typical-price-wording.json && git commit -m "Dental typical price: approved FI/SV/EN wording"`

### Task 2: Check script (the test)

**Files:**
- Create: `tools/check-dental-price.js`

**Interfaces:**
- Consumes: the wording JSON (Task 1).
- Produces: `node tools/check-dental-price.js [--live]` → exit 0 when clean; prints one line per failure `<file>: <reason>`. `--live` fetches the same pages from https://elainklinikkasaari.fi instead of disk.

- [ ] **Step 1: Write the script.** Surfaces: `hinnasto/index.html`, `sv/prislista/index.html`, `en/pricelist/index.html`, `palvelut/hammashoito/index.html`, `sv/tjanster/tandvard/index.html`, `en/services/dental-care/index.html`, `articles/hammasresorptio.html`, `sv/artiklar/tandresorption.html`, `en/articles/tooth-resorption.html`, `js/main.src.js`, `js/main.js`, `pricing.md`. Assertions:
  - banned (case-insensitive, also `\xE4`-escaped forms): `hinta-arvio tutkimuksen jälkeen`, `hinta-arviolla`, `saat hinta-arvion ennen toimenpidettä`, `hinta-arviot suoraan klinikalta`, `kostnadsförslag`, `prisuppskattningar direkt`, `by estimate`, `price estimates directly`, `Ask the clinic for estimates`;
  - required: on each price list its language's `valueCat` and `valueDog`; on each dental page `valueCat`, `valueDog`, `whyHeading`; on each article its `articleLine` link target; in `main.src.js` the three `note` strings;
  - every `<script type="application/ld+json">` block on the three dental pages parses with `JSON.parse`, and the FAQ answer to `faqQuestion` contains both values.
- [ ] **Step 2: Run it, expect FAIL** — `node tools/check-dental-price.js` → failure lines for the old promises and missing values on all surfaces, exit 1.
- [ ] **Step 3: Commit** the script.

### Task 3: Price lists and price files

**Files:**
- Modify: `hinnasto/index.html:1074-1083`, `sv/prislista/index.html:1074-1083`, `en/pricelist/index.html:1074-1083`, `js/main.src.js:590-599` (+ matching literals in `js/main.js`), `pricing.md:84-88`

- [ ] **Step 1:** After the milk-tooth rows add two `price-row`s (`rowCat`/`valueCat`, `rowDog`/`valueDog`); replace the two `price-note-small` paragraphs with one carrying `note`. Same markup pattern as the existing rows.
- [ ] **Step 2:** In `main.src.js` add keys `price.dental.extraction.cat`, `price.dental.extraction.dog` (fi/sv/en row names), set `price.dental.extraction.note` to `note`, delete `price.dental.info.note`; same literal edits in `js/main.js`; `node --check js/main.js` → no output.
- [ ] **Step 3:** `pricing.md`: two extraction lines + `pricingMd`; "Last updated" → the deploy date.
- [ ] **Step 4:** `node tools/check-dental-price.js` → no price-list or main.js/pricing.md failures left.
- [ ] **Step 5: Commit** (the pre-commit hook regenerates and stages the llms-full files).

### Task 4: Dental service pages

**Files:**
- Modify: `palvelut/hammashoito/index.html`, `sv/tjanster/tandvard/index.html`, `en/services/dental-care/index.html` (title; meta/og/twitter description and JSON-LD `description` → `metaDescription`; intro → `introSentence`; price-table row "Pysyvän hampaan poisto / hinta-arvio tutkimuksen jälkeen" → the two typical rows; cost paragraph's "Saat hinta-arvion…" sentence → gone; new `whyHeading` + `whyText` section under the cost paragraph; visible FAQ answer + FAQPage JSON-LD answer → `faqAnswer`; extraction paragraph "hinnoitellaan tapauskohtaisesti … röntgenkuvien perusteella" → link to the new section)
- Modify: `build-articles.js` around line 2784 (the `hammashoito` service data): the same strings, by hand

- [ ] **Step 1:** Edit the FI page; `node tools/check-dental-price.js` → no FI dental-page failures.
- [ ] **Step 2:** Same for SV and EN; check → no dental-page failures.
- [ ] **Step 3:** Same strings in `build-articles.js`; `node --check build-articles.js`.
- [ ] **Step 4: Commit.**

### Task 5: Tooth-resorption articles

**Files:**
- Modify: `articles/hammasresorptio.html`, `sv/artiklar/tandresorption.html`, `en/articles/tooth-resorption.html` (treatment section, visible text AND the duplicated article text in their JSON-LD), plus the article's source string in `js/main.src.js`/`build-articles.js` wherever that section's text lives (`grep` the neighbouring sentence)

- [ ] **Step 1:** Insert `articleLine` at the end of the treatment section in all three, linking to the dental page's why-section anchor.
- [ ] **Step 2:** `node tools/check-dental-price.js` → exit 0, no output.
- [ ] **Step 3: Commit.**

### Task 6: Approval, push, live check

- [ ] **Step 1:** Show Assaf the rendered result (FI price list + FI dental page at phone width, screenshot or the diff). Wait for "push".
- [ ] **Step 2:** `node build-sitemap.js` (lastmod), commit, `git push origin main`.
- [ ] **Step 3:** Purge Cloudflare (recipe in memory `reference_cloudflare_purge.md`, token `~/.cloudflare/elainklinikkasaari_purge_token`): every changed URL + `/js/main.js` + `/pricing.md` + the three `llms-full.txt`.
- [ ] **Step 4:** `node tools/check-dental-price.js --live` → exit 0.
- [ ] **Step 5:** Memory: update `project_seo_audit_fixes_2026_11.md`-style note (new `project_dental_typical_price.md`) with what went live, and the early-December recheck of "eläinlääkäri vaasa" (pos 2.6 on 16-11) and the dental price queries; add the line to MEMORY.md.

### Task 7 (step 2): WhatsApp bot

**Files:** Modify `~/whatsapp_business/claude_handler.js` (SYSTEM_PROMPT, near the price rules); Test via the server harness.

- [ ] **Step 1:** Draft the rule: asked about extraction / dental-with-extractions cost → the typical figures in the customer's language, why it varies (one sentence), link to the dental page; never a quote, never a call promise. Show Assaf the exact wording; wait for approval.
- [ ] **Step 2:** Rollback copy to the scratchpad, edit, `node --check claude_handler.js`.
- [ ] **Step 3:** `./deploy.sh claude_handler.js` → "✅ deploy healthy".
- [ ] **Step 4:** Harness (`node test_harness.js '{"tests":[…]}'` on saari-box, FI + SV question "paljonko hampaan poisto maksaa kissalle?") → reply contains 700 €, no "arvio"/quote, no call promise.

### Task 8 (step 2): Phone AI

**Files:** Modify `~/clinic-phone/ops/extract_prompts.py` → regenerate `app/prompts.py` (never hand-edit); Test `~/clinic-phone/tests/` (a prompt-content test for the new rule).

- [ ] **Step 1:** Same rule, spoken form ("noin seitsemänsataa euroa"); show Assaf the wording; wait for approval.
- [ ] **Step 2:** Back up both files, edit, regenerate, add the test; `.venv/bin/python -m pytest -q` → all pass.
- [ ] **Step 3:** `./deploy.sh` (refuses during a call: retry after 2 min, max 3) → "DEPLOY OK"; `ops/phonectl.sh health` → `"ok": true`, `"force_mode": "auto"`.

### Task 9 (step 2): FB/IG post draft

- [ ] **Step 1:** Read `MEMORY_SOCIAL.md` first. EN master from the brainstorm draft (CTA "Book a dental check (32 €)", link to the live dental page); FI/SV native writer → critic → editor.
- [ ] **Step 2:** Show Assaf all three languages; draft only. Post only on his explicit go-word and time (afternoon), via `/miranda`.
