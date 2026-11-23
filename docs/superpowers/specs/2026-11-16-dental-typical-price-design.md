# Dental extractions: publish the typical price (design)

Date: 16-11-2026 · Size: small change · Status: awaiting Assaf's approval

## Intent and why

Owners compare dental prices before they book. Our pages only said "price depends" and promised an estimate.
Assaf: publish our median instead of a range. Owners can then plan before they book, and we stop
promising something we do not do: nobody can quote an extraction in advance, because the number of
teeth is only known once the pet is under anaesthesia with a full examination (probe + dental X-rays).
One tooth can turn out to be many. Assaf does not phone owners during the procedure and does not want
to offer that as a service.

## Goals

- Show a typical whole-visit price for a visit with a permanent tooth extraction: cat about 700 €,
  dog about 880 €.
- Explain honestly why the final bill varies.
- Remove every "estimate before the procedure" promise on the dental pages and price lists (FI/SV/EN).
- Rank better for "how much does a tooth extraction cost" searches (today position 8–15).

## Non-goals

- No phone call during the procedure, no new service.
- No day-hospital page.
- No Google Ads changes.

## Anti-goals (a failure even if it works)

- Any mention of another clinic, any open or veiled comparison, "cheaper", superlatives
  (SELL marketing guidelines). No line like "the whole bill, not just the procedure".
- Claiming the price ALWAYS includes dental X-rays or tartar removal. "Usually" is allowed (Assaf 16-11; bills May–Nov 2026: tartar removal cat 78 % / dog 68 %, X-rays 78 % / 75 % counting X-ray packages; the 2nd visit of a split case reuses the 1st visit's X-rays).
- Calling it a quote, an estimate or a guaranteed price.

## Facts (ProvetCloud reporting, finalized bills, VAT included, whole consultation total)

Visits containing a "Pysyvän hampaan poisto" / "Pysyvänhampaan poisto" item:

| | last 6 months (17-05 → 16-11-2026) | 01-06-2025 → 16-11-2026 |
|---|---|---|
| Cat | 89 visits, median 706 € | 236 visits, median 700 € |
| Dog | 130 visits, median 881 € | 362 visits, median 867 € |

Published figures: cat **about 700 €**, dog **about 880 €** (last 6 months, rounded).
Last 6 months: anaesthesia on 100 % of these bills; tartar removal cat 78 % / dog 68 %;
dental X-ray item cat 61 % / dog 73 % (78 % / 75 % counting X-ray packages such as "+/- Rtg").

## Approaches considered

1. Core only: price lists + dental pages FI/SV/EN, pricing.md, llms-full.txt. Smallest; no search gain.
2. **Core + search (chosen, Assaf: "u choose")**: 1 plus an FAQ question with FAQPage JSON-LD,
   "prices" in the dental page search title, and one cost line + link in the tooth-resorption articles.
3. Everything: 2 plus WhatsApp bot, phone AI and a social post. **Also chosen (Assaf: "and 3")**,
   run as step 2 after the website is live: the bots are live systems with their own deploys, and the
   post must link to a live page.

## Approved English master text

Price list rows (dental section):
- Permanent tooth extraction, cat: typically about 700 €
- Permanent tooth extraction, dog: typically about 880 €
- Note: "Typical" is the middle bill of our own extraction visits over the last six months, for the
  whole visit, anaesthesia included. The final price depends on how many teeth are removed and how
  difficult they are.

Dental page section (heading option A, "What does a tooth extraction cost?"), approved by Assaf 16-11:

> **Why we can't give an exact price in advance**
> We only know how many teeth need to come out once your pet is under anaesthesia and we have
> examined every tooth with a probe and taken dental X-rays. Much dental disease sits below the gum
> line, so a mouth that seems to need one extraction can turn out to need many. How much we can see
> beforehand also depends on how well your pet lets us look. That's why we give a typical price
> instead of a quote. It shows what a visit like this usually costs, and the final bill follows what
> the examination finds.

## Where it changes

- `hinnasto/`, `sv/prislista/`, `en/pricelist/` dental section; the matching strings in `js/main.src.js`
  + `js/main.js` (sed both, no rebuild).
- `palvelut/hammashoito/`, `sv/tjanster/tandvard/`, `en/services/dental-care/`: intro sentence, price
  table row, cost paragraph, the "Hampaiden poistot hinta-arviolla / Tandutdragning enligt
  kostnadsförslag / Extractions by estimate" lines, FAQ + FAQPage JSON-LD, search title.
  Also the generator `build-articles.js` (drifted: edit outputs and generator by hand).
- Tooth-resorption articles FI/SV/EN: one cost line + link to the dental page.
- `pricing.md` (update "Last updated"), `llms-full.txt`.

## Step 2 (after the website is live)

- **WhatsApp bot** (`~/whatsapp_business/claude_handler.js`): when an owner asks what an extraction
  or dental visit with extractions costs, give the same typical figures and the reason it varies;
  never a quote, never a promise of a call during the procedure; link the dental page. New prompt
  wording approved by Assaf before `./deploy.sh`; harness check after.
- **Phone AI** (`~/clinic-phone/ops/extract_prompts.py` → regenerate `app/prompts.py`): same rule
  for spoken answers; regression test; `./deploy.sh` (refuses during a call); wording approved first.
- **FB/IG post**: the approved English post draft → FI/SV native writers; follow MEMORY_SOCIAL.md
  rules; draft only, Assaf gives the go-word and the time (afternoon). Links to the live dental page.

## Left to the builder (my calls, Assaf can override)

- Finnish and Swedish: native writer → critic → editor per language from the English master;
  Finland-Swedish. Assaf approves the final FI/SV/EN text before anything is pushed.
- Exact title wording within the existing length budget; the town ("Vaasa") stays in.
- Verify after deploy: curl every changed page, Cloudflare purge incl. `/js/main.js` and `/js/main.js?v=20261123c`, no "estimate"
  promise left (grep FI/SV/EN), JSON-LD valid.
- Recheck our "eläinlääkäri vaasa" search position in early December (2.6 on 16-11).
