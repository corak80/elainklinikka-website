# Domain Migration Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update every hardcoded `saarivet.fi` reference across the codebase (outside the website repo itself, which was already fixed at cutover) that points at public/marketing content or ad-attribution data, so they use the new canonical domain `elainklinikkasaari.fi` established by the 17-07-2026 domain cutover.

**Architecture:** This is not a feature — it's a sweep of small, independent string-literal fixes across 8 files in 4 separate repos/services (clinic-tv on Hetzner, retell on Hetzner, wildlife on its own Hetzner VM, and two local-only Python scripts). Each task touches exactly one file and is independently deployable/testable. There is no shared code path between tasks.

**Tech Stack:** Node.js (Express handlers on Hetzner), Python (retell + local scripts), static HTML.

## Global Constraints

- Canonical public domain since 17-07-2026 is `https://elainklinikkasaari.fi` — see `[[project_saarivet]]` memory. `saarivet.fi` now 301-redirects at the Cloudflare edge (Worker `saarivet-redirect`), preserving path (verified: `curl -sI https://saarivet.fi/images/logo-horizontal.png` → `301` → `location: https://elainklinikkasaari.fi/images/logo-horizontal.png`).
- Do NOT touch any `@saarivet.fi` email address (`info@saarivet.fi`, `assaf@saarivet.fi`, `pamela@saarivet.fi`) — Cloudflare Email Routing MX intentionally stayed on saarivet.fi and was explicitly untouched by the cutover.
- Do NOT touch infra subdomains: `wildlife.saarivet.fi`, `pacs.saarivet.fi`, `pacs2.saarivet.fi`, `dashboard.saarivet.fi`, `share.saarivet.fi`, or any `<clinic>.saarivet.fi` partner-Pi subdomain. These are separate Hetzner services with their own DNS records in the same Cloudflare zone — unrelated to the marketing-site domain cutover.
- Do NOT touch anything under `docs/`, `briefings/`, `drafts/`, `campaigns/`, `test_fixtures/`, `docs/superpowers/plans|specs/` anywhere — those are historical records, not live config.
- Every JS file edited is live production code on Hetzner (clinic-tv or wildlife services) or (retell) `claude_server.py` — each task's deploy step restarts a production service. Confirm before deploying if unsure.

---

## File Structure

No new files. Modifies:
- `~/clinic-tv/capi_handler.js` — Meta Conversions API event forwarding (deployed via clinic-tv's `deploy.sh`)
- `~/clinic-tv/vaccination_handler.js` — vaccination reminder email/SMS composer (deployed via clinic-tv's `deploy.sh`)
- `~/clinic-tv/share_email_handler.js` — OHIF "share by email" composer (deployed via clinic-tv's `deploy.sh`)
- `~/clinic-tv/email_handler.js` — AI email-assistant system prompt (deployed via clinic-tv's `deploy.sh`)
- `~/clinic-tv/public/wildlife-report.html` + `~/wildlife/public/report.html` — two copies of the same public wildlife-case report page footer (clinic-tv copy via `deploy.sh`; wildlife copy via manual scp+restart, no deploy script exists for that repo)
- `~/retell/claude_server.py` — price-list scraper + fallback error page (deployed via manual scp+restart per CLAUDE.md)
- `~/miranda/miranda.py` — `cmd_create_audience` docstring example + fallback rule (local-only script, no deploy)
- `~/google_analytics/ga4_query.py` — module docstring (local-only script, no deploy)

## Task 1: Meta CAPI event_source_url default

**Files:**
- Modify: `~/clinic-tv/capi_handler.js:117`, `~/clinic-tv/capi_handler.js:156`

**Interfaces:** None — standalone literal-default fix, no callers change.

- [ ] **Step 1: Edit both defaults**

Line 117, inside `app.post('/capi/event', ...)`:
```js
        event_source_url: event_source_url || 'https://saarivet.fi',
```
→
```js
        event_source_url: event_source_url || 'https://elainklinikkasaari.fi',
```

Line 156, inside `app.post('/capi/batch', ...)`:
```js
          event_source_url: e.event_source_url || 'https://saarivet.fi',
```
→
```js
          event_source_url: e.event_source_url || 'https://elainklinikkasaari.fi',
```

- [ ] **Step 2: Syntax check**

Run: `node -c ~/clinic-tv/capi_handler.js`
Expected: no output, exit code 0.

- [ ] **Step 3: Verify no stray reference left**

Run: `grep -n "saarivet.fi" ~/clinic-tv/capi_handler.js`
Expected: no output (no matches).

- [ ] **Step 4: Commit**

```bash
cd ~/clinic-tv && git add capi_handler.js && git commit -m "fix: CAPI event_source_url default points to elainklinikkasaari.fi post-migration"
```

## Task 2: Vaccination reminder email/SMS domain references

**Files:**
- Modify: `~/clinic-tv/vaccination_handler.js:314`, `:332`, `:401`

**Interfaces:** None.

- [ ] **Step 1: Fix the logo image src (line 314)**

```js
    <img src="https://saarivet.fi/images/logo-horizontal.png" alt="Eläinklinikka Saari" width="220" style="max-width:220px; height:auto;">
```
→
```js
    <img src="https://elainklinikkasaari.fi/images/logo-horizontal.png" alt="Eläinklinikka Saari" width="220" style="max-width:220px; height:auto;">
```

- [ ] **Step 2: Fix the footer link (line 332)**

```js
    &#127760; <a href="https://saarivet.fi" style="color:#E58DB4;">saarivet.fi</a>
```
→
```js
    &#127760; <a href="https://elainklinikkasaari.fi" style="color:#E58DB4;">elainklinikkasaari.fi</a>
```

- [ ] **Step 3: Remove the now-backwards SMS domain rewrite (line 401)**

Context — `sendReminderSms()`:
```js
  // Use ProvetCloud's pre-composed SMS text, update URL
  let smsBody = reminder.sms_text || reminder.email_text || '';
  smsBody = smsBody.replace(/<[^>]*>/g, '').replace(/\r?\n/g, '\n').trim();
  smsBody = smsBody.replace(/www\.elainklinikkasaari\.fi/g, 'www.saarivet.fi');
  // Add blank line between Finnish and Swedish sections
  smsBody = smsBody.replace(/\n(Vaccinationerna av ert husdjur)/, '\n\n$1');
```

This line was written when `elainklinikkasaari.fi` was the old WP site and `saarivet.fi` was the new canonical site — it rewrote ProvetCloud's hardcoded old-domain link forward to the new site. Since the 17-07-2026 cutover reversed which domain is canonical, ProvetCloud's own `www.elainklinikkasaari.fi` text is now already correct and this line silently rewrites it backwards to the redirect-only domain in every outbound patient SMS. Delete it:

```js
  // Use ProvetCloud's pre-composed SMS text, update URL
  let smsBody = reminder.sms_text || reminder.email_text || '';
  smsBody = smsBody.replace(/<[^>]*>/g, '').replace(/\r?\n/g, '\n').trim();
  // Add blank line between Finnish and Swedish sections
  smsBody = smsBody.replace(/\n(Vaccinationerna av ert husdjur)/, '\n\n$1');
```

- [ ] **Step 4: Syntax check**

Run: `node -c ~/clinic-tv/vaccination_handler.js`
Expected: no output, exit code 0.

- [ ] **Step 5: Verify no stray reference left**

Run: `grep -n "saarivet.fi" ~/clinic-tv/vaccination_handler.js`
Expected: only `info@saarivet.fi` matches remain (email address, untouched).

- [ ] **Step 6: Commit**

```bash
cd ~/clinic-tv && git add vaccination_handler.js && git commit -m "fix: vaccination reminder logo/link use elainklinikkasaari.fi, drop backwards SMS domain rewrite"
```

## Task 3: OHIF share-by-email footer

**Files:**
- Modify: `~/clinic-tv/share_email_handler.js:131`, `:164`

**Interfaces:** None.

- [ ] **Step 1: Fix plain-text footer (line 131)**

```js
      `Gerbyntie 18, 65230 Vaasa  ·  (06) 321 7300  ·  saarivet.fi`;
```
→
```js
      `Gerbyntie 18, 65230 Vaasa  ·  (06) 321 7300  ·  elainklinikkasaari.fi`;
```

- [ ] **Step 2: Fix HTML footer link (line 164)**

```js
          Gerbyntie 18, 65230 Vaasa &nbsp;·&nbsp; <a href="tel:+35863217300" style="color:#888;text-decoration:none">(06) 321 7300</a> &nbsp;·&nbsp; <a href="https://saarivet.fi" style="color:#888;text-decoration:none">saarivet.fi</a>
```
→
```js
          Gerbyntie 18, 65230 Vaasa &nbsp;·&nbsp; <a href="tel:+35863217300" style="color:#888;text-decoration:none">(06) 321 7300</a> &nbsp;·&nbsp; <a href="https://elainklinikkasaari.fi" style="color:#888;text-decoration:none">elainklinikkasaari.fi</a>
```

- [ ] **Step 3: Syntax check**

Run: `node -c ~/clinic-tv/share_email_handler.js`
Expected: no output, exit code 0.

- [ ] **Step 4: Verify no stray reference left**

Run: `grep -n "saarivet.fi" ~/clinic-tv/share_email_handler.js`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
cd ~/clinic-tv && git add share_email_handler.js && git commit -m "fix: OHIF share-email footer uses elainklinikkasaari.fi"
```

## Task 4: AI email-assistant system prompt

**Files:**
- Modify: `~/clinic-tv/email_handler.js:632`, `:637`, `:638`

**Interfaces:** None. This is prompt text handed to Claude for classifying/drafting replies to incoming clinic emails — the URLs and prices are copied into a system prompt string, not fetched live.

- [ ] **Step 1: Fix the three mentions**

```js
Online booking: saarivet.fi
```
→
```js
Online booking: elainklinikkasaari.fi
```

```js
- Booking: saarivet.fi or call 06 3217300, Mon-Fri 9-17.
```
→
```js
- Booking: elainklinikkasaari.fi or call 06 3217300, Mon-Fri 9-17.
```

```js
- When asked about prices, use these (from saarivet.fi):
```
→
```js
- When asked about prices, use these (from elainklinikkasaari.fi):
```

- [ ] **Step 2: Syntax check**

Run: `node -c ~/clinic-tv/email_handler.js`
Expected: no output, exit code 0.

- [ ] **Step 3: Verify no stray reference left**

Run: `grep -n "saarivet.fi" ~/clinic-tv/email_handler.js`
Expected: only `info@saarivet.fi` (line 628) remains.

- [ ] **Step 4: Commit**

```bash
cd ~/clinic-tv && git add email_handler.js && git commit -m "fix: email-assistant prompt references elainklinikkasaari.fi"
```

## Task 5: Wildlife report page footer (two copies)

**Files:**
- Modify: `~/clinic-tv/public/wildlife-report.html:630`
- Modify: `~/wildlife/public/report.html:630`

**Interfaces:** None. Both files currently have the identical line.

- [ ] **Step 1: Fix clinic-tv's copy**

```html
    <a href="https://saarivet.fi">Eläinklinikka Saari</a> — Vaasa
```
→
```html
    <a href="https://elainklinikkasaari.fi">Eläinklinikka Saari</a> — Vaasa
```

- [ ] **Step 2: Apply the identical fix to `~/wildlife/public/report.html`**

Same line, same replacement.

- [ ] **Step 3: Verify no stray reference left in either file**

Run: `grep -n "saarivet.fi" ~/clinic-tv/public/wildlife-report.html ~/wildlife/public/report.html`
Expected: no output.

- [ ] **Step 4: Commit each repo's copy separately**

`~/clinic-tv` and `~/wildlife` are separate git repos. Commit only `report.html`/`wildlife-report.html` in each — `~/wildlife` has unrelated pre-existing uncommitted changes to other files (`index.html`, `stats.html`, `server.js`); do not stage or commit those, they belong to other in-progress work.

```bash
cd ~/clinic-tv && git add public/wildlife-report.html && git commit -m "fix: wildlife report footer link uses elainklinikkasaari.fi"
cd ~/wildlife && git add public/report.html && git commit -m "fix: wildlife report footer link uses elainklinikkasaari.fi"
```

## Task 6: Retell price-list URL

**Files:**
- Modify: `~/retell/claude_server.py:2020`, `:2132`

**Interfaces:** `_PRICES_URL` is read by the scraper that builds the phone-agent price list (`_render_prices_html` and its caller fetch this URL directly with an HTTP client) — confirmed `/hinnasto/` exists natively at the new canonical domain (`~/elainklinikka-website/hinnasto/index.html`), so no redirect hop needed after this fix.

- [ ] **Step 1: Fix the scrape source**

```python
_PRICES_URL = "https://saarivet.fi/hinnasto/"
```
→
```python
_PRICES_URL = "https://elainklinikkasaari.fi/hinnasto/"
```

- [ ] **Step 2: Fix the fallback error page's displayed link**

```python
<p>Käytä julkista sivua: <a href="https://saarivet.fi/hinnasto/" target="_blank">saarivet.fi/hinnasto</a></p>
```
→
```python
<p>Käytä julkista sivua: <a href="https://elainklinikkasaari.fi/hinnasto/" target="_blank">elainklinikkasaari.fi/hinnasto</a></p>
```

- [ ] **Step 3: Syntax check**

Run: `python3 -m py_compile ~/retell/claude_server.py`
Expected: no output, exit code 0.

- [ ] **Step 4: Verify no stray reference left**

Run: `grep -n "saarivet\.fi" ~/retell/claude_server.py`
Expected: only the docstring comment on line 558 (`"""Parse the saarivet.fi hinnasto page...`) remains — update that comment too in this same step for consistency:

```python
    """Parse the saarivet.fi hinnasto page into a list of categories.
```
→
```python
    """Parse the elainklinikkasaari.fi hinnasto page into a list of categories.
```

Re-run the grep — expected: no output at all now.

- [ ] **Step 5: Live-verify the fetch actually works before deploying**

Run: `curl -sI https://elainklinikkasaari.fi/hinnasto/ --max-time 10 | head -3`
Expected: `HTTP/2 200`.

## Task 7: Miranda audience-creation default

**Files:**
- Modify: `~/miranda/miranda.py:1355`, `:1357`, `:1408`

**Interfaces:** `cmd_create_audience(spec_file)` — the fallback `rule` (line 1408) is only used when a caller's JSON spec omits `"rule"`. Verified live on 17-07-2026 via Graph API that neither of the two existing WEBSITE custom audiences (`120242287956730172`, `120241269871860172`) actually use a URL-based rule — both just match any `PageView` event on their pixel, so this fix has no effect on live ad delivery. It only corrects the default for any *future* audience created without an explicit rule.

- [ ] **Step 1: Fix the docstring example**

```python
        "description": "People who visited saarivet.fi in last 30 days",
        "retention_days": 30,
        "rule": {"url": {"i_contains": "saarivet.fi"}},
```
→
```python
        "description": "People who visited elainklinikkasaari.fi in last 30 days",
        "retention_days": 30,
        "rule": {"url": {"i_contains": "elainklinikkasaari.fi"}},
```

- [ ] **Step 2: Fix the fallback default**

```python
        rule = spec.get("rule", {"url": {"i_contains": "saarivet.fi"}})
```
→
```python
        rule = spec.get("rule", {"url": {"i_contains": "elainklinikkasaari.fi"}})
```

- [ ] **Step 3: Syntax check**

Run: `python3 -m py_compile ~/miranda/miranda.py`
Expected: no output, exit code 0.

- [ ] **Step 4: Verify no stray reference left**

Run: `grep -n "saarivet\.fi" ~/miranda/miranda.py`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
cd ~/miranda && git add miranda.py && git commit -m "fix: audience-creation default rule/example use elainklinikkasaari.fi" 2>&1 || echo "no git repo here, skip commit"
```

## Task 8: GA4 query helper docstring

**Files:**
- Modify: `~/google_analytics/ga4_query.py:2`

**Interfaces:** None — comment only, purely cosmetic, no functional change (GA4 tracks by measurement ID embedded in the site's own HTML, not by this script's docstring).

- [ ] **Step 1: Fix the docstring**

```python
"""GA4 query helper for saarivet.fi.
```
→
```python
"""GA4 query helper for elainklinikkasaari.fi.
```

- [ ] **Step 2: Syntax check**

Run: `python3 -m py_compile ~/google_analytics/ga4_query.py`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
cd ~/google_analytics && git add ga4_query.py && git commit -m "docs: update ga4_query.py docstring to elainklinikkasaari.fi" 2>&1 || echo "no git repo here, skip commit"
```

## Task 9: Deploy clinic-tv changes (Tasks 1-5)

**Files:** None new — deploys the already-committed changes from Tasks 1-5.

**Interfaces:** Uses clinic-tv's existing guarded deploy script (syntax check → backup → restart → `/tv/health` probe → auto-rollback on failure), documented in CLAUDE.md.

- [ ] **Step 1: Confirm all five files are committed**

Run: `cd ~/clinic-tv && git status --short capi_handler.js vaccination_handler.js share_email_handler.js email_handler.js public/wildlife-report.html`
Expected: no output (clean — everything from Tasks 1-5 committed).

- [ ] **Step 2: Deploy**

Run: `cd ~/clinic-tv && ./deploy.sh capi_handler.js vaccination_handler.js share_email_handler.js email_handler.js public/wildlife-report.html`
Expected: script reports syntax OK, backup taken, service restarted, `/tv/health` probe passes. If it reports a rollback, STOP and report the failure — do not retry blindly.

- [ ] **Step 3: Post-deploy smoke check**

Run: `curl -s https://178-156-228-28.sslip.io/tv/health`
Expected: healthy JSON response (same shape as before deploy).

## Task 10: Deploy wildlife report footer fix

**Files:** None new — deploys the already-fixed `~/wildlife/public/report.html` from Task 5, Step 2.

**Interfaces:** No guarded deploy script exists for this repo (per CLAUDE.md, only `wildlife-backup.sh` exists) — deploy manually via scp + service restart, matching the pattern CLAUDE.md documents for `retell`.

- [ ] **Step 1: Copy the file to the VM**

Run: `scp -i ~/.ssh/hetzner_retell ~/wildlife/public/report.html root@204.168.134.244:/opt/wildlife/public/report.html`
Expected: transfer completes, no error.

- [ ] **Step 2: Restart the service**

Run: `ssh -i ~/.ssh/hetzner_retell root@204.168.134.244 'systemctl restart wildlife'`
Expected: no error.

- [ ] **Step 3: Smoke check**

Run: `ssh -i ~/.ssh/hetzner_retell root@204.168.134.244 'systemctl is-active wildlife'` then `curl -s https://wildlife.saarivet.fi/report | grep -o 'elainklinikkasaari.fi'`
Expected: `active`, then one match (confirms the new footer link is live).

## Task 11: Deploy retell claude_server.py fix

**Files:** None new — deploys the already-fixed `~/retell/claude_server.py` from Task 6.

**Interfaces:** Uses the manual scp + restart pattern documented in CLAUDE.md under "Deploy server update".

- [ ] **Step 1: Copy the file to Hetzner**

Run: `scp -i ~/.ssh/hetzner_retell ~/retell/claude_server.py root@178.156.228.28:/root/retell/`
Expected: transfer completes, no error.

- [ ] **Step 2: Restart the service**

Run: `ssh -i ~/.ssh/hetzner_retell root@178.156.228.28 'systemctl restart retell-ws'`
Expected: no error.

- [ ] **Step 3: Smoke check**

Run: `ssh -i ~/.ssh/hetzner_retell root@178.156.228.28 'systemctl is-active retell-ws'`
Expected: `active`.

The price list is served at `GET /prices` (line 2136), gated behind a `dash_auth` cookie (`verify_dashboard`, line 182-185) — not curl-able without that cookie, so verify server-side instead. `_PRICES_CACHE` (line 2019) is populated lazily on first `/prices` hit with a 300s TTL, so restarting the service alone won't trigger a fetch — check the journal after someone next opens the dashboard's Prices tab, or trigger it directly:

Run: `ssh -i ~/.ssh/hetzner_retell root@178.156.228.28 "journalctl -u retell-ws --since '2 min ago' --no-pager | grep -i price"`
Expected: no fetch-error lines. If nothing prints, that just means `/prices` hasn't been hit yet since restart — Task 6 Step 5's local curl to `https://elainklinikkasaari.fi/hinnasto/` already confirmed the target URL itself is live and fetchable, which is the part this change actually touches.

---

## Task 12b: server.js CAPI CORS origin (discovered during Final Verification, not in original scope)

**Files:**
- Modify: `~/clinic-tv/server.js:61`, `:63`

**Interfaces:** None — standalone literal-default fix, same bug class as Task 1.

The final verification sweep found a reference the original audit missed: `server.js` sets a CORS `Access-Control-Allow-Origin` header scoped to the CAPI endpoint (`/capi`), hardcoded to the old domain. Since the marketing site (and its Pixel/CAPI-calling surface, if ever called cross-origin from the browser) now lives at elainklinikkasaari.fi, this should track the canonical domain, same as Task 1's fix in `capi_handler.js`.

- [ ] **Step 1: Edit both lines**

```js
// Permissive CORS for CAPI endpoint (called cross-origin from saarivet.fi)
app.use('/capi', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://saarivet.fi');
```
→
```js
// Permissive CORS for CAPI endpoint (called cross-origin from elainklinikkasaari.fi)
app.use('/capi', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://elainklinikkasaari.fi');
```

- [ ] **Step 2: Syntax check**

Run: `node -c ~/clinic-tv/server.js`
Expected: no output, exit code 0.

- [ ] **Step 3: Verify no stray reference left in these two lines**

Run: `grep -n "saarivet.fi" ~/clinic-tv/server.js`
Expected: only the pre-existing `wildlife.saarivet.fi` infra-subdomain redirect lines remain (out of scope, do not touch).

- [ ] **Step 4: Commit**

`server.js` has unrelated pre-existing WIP on this branch (hunks elsewhere in the file, unrelated to lines 61-63) — expect the same commit-bundling issue seen in Tasks 1-2 and handle it the same way (isolate, split, restore).

```bash
cd ~/clinic-tv && git add server.js && git commit -m "fix: CAPI CORS origin points to elainklinikkasaari.fi post-migration"
```

- [ ] **Step 5: Redeploy clinic-tv** (server.js is the default deploy target)

Same guarded deploy as Task 9, using the clean committed version (not the WIP-restored working-tree version) — same swap-deploy-restore technique.

## Task 13: Miranda ad-campaign spec landing URLs (discovered during Final Whole-Plan Review)

**Files:**
- Modify: `~/miranda/campaigns/senior_299_test.json`
- Modify: `~/miranda/examples/campaign_template.json`

**Interfaces:** None — these are input specs consumed by `miranda.py create campaign <spec_file>` / `miranda.py post <platform> <json>`-style commands; not currently live ads (both specs have `"status": "PAUSED"`), so this has zero effect on any currently-running campaign. It only matters if/when someone reuses these specs to launch or relaunch an ad.

Explicitly OUT of scope, do not touch:
- `~/miranda/drafts/*.json` — these are social-post drafts, not ad specs, and per project memory at least some of them (siilinpoikanen, likely kyynpurema) are already-published Facebook/Instagram posts. Editing the local JSON would not change what's actually live on Facebook and would create a misleading local record of what the post actually said when published. Leave all of `drafts/` untouched.
- `~/miranda/tests/fixtures/*.json` — generic test fixtures for spec-validation logic, unrelated to real campaign content; already excluded by the original plan's Global Constraints.

- [ ] **Step 1: Fix `campaigns/senior_299_test.json`**

Three occurrences of `https://saarivet.fi` (two are duplicated `link` + `call_to_action.value.link` per language variant — 4 total string occurrences across FI and SV adsets):

```json
"link": "https://saarivet.fi/palvelut/senioritarkastus/?utm_source=meta&utm_medium=cpc&utm_campaign=senior_299_test&utm_content=fi",
```
→
```json
"link": "https://elainklinikkasaari.fi/palvelut/senioritarkastus/?utm_source=meta&utm_medium=cpc&utm_campaign=senior_299_test&utm_content=fi",
```
(same replacement inside the matching `call_to_action.value.link` for the FI adset — identical URL string, appears twice)

```json
"link": "https://saarivet.fi/sv/tjanster/seniorundersokning/?utm_source=meta&utm_medium=cpc&utm_campaign=senior_299_test&utm_content=sv",
```
→
```json
"link": "https://elainklinikkasaari.fi/sv/tjanster/seniorundersokning/?utm_source=meta&utm_medium=cpc&utm_campaign=senior_299_test&utm_content=sv",
```
(same replacement inside the matching `call_to_action.value.link` for the SV adset — identical URL string, appears twice)

Only the domain changes — keep every path segment and every UTM query parameter byte-for-byte identical (`utm_source=meta&utm_medium=cpc&utm_campaign=senior_299_test&utm_content=fi` / `...=sv`). Both target paths already exist natively on the new domain (verified: `~/elainklinikka-website/palvelut/senioritarkastus/index.html` and `~/elainklinikka-website/sv/tjanster/seniorundersokning/index.html`), so no slug remapping is needed.

- [ ] **Step 2: Fix `examples/campaign_template.json`**

One occurrence:
```json
"link": "https://saarivet.fi",
```
→
```json
"link": "https://elainklinikkasaari.fi",
```

- [ ] **Step 3: Validate JSON syntax**

Run: `python3 -c "import json; json.load(open('/Users/assafwydra/miranda/campaigns/senior_299_test.json')); json.load(open('/Users/assafwydra/miranda/examples/campaign_template.json')); print('valid')"`
Expected: `valid`

- [ ] **Step 4: Verify no stray reference left, and drafts/tests untouched**

Run: `grep -rn "saarivet.fi" /Users/assafwydra/miranda/campaigns/senior_299_test.json /Users/assafwydra/miranda/examples/campaign_template.json`
Expected: no output.

Run: `git -C /Users/assafwydra/miranda status --short` — confirm ONLY `campaigns/senior_299_test.json` and `examples/campaign_template.json` show as modified; `drafts/` and `tests/fixtures/` must not appear.

- [ ] **Step 5: Commit**

```bash
cd ~/miranda && git add campaigns/senior_299_test.json examples/campaign_template.json && git commit -m "fix: ad-campaign spec landing URLs use elainklinikkasaari.fi"
```

No deploy needed — these are local spec files read at campaign-creation time, not served anywhere.

## Final Verification

- [ ] Run one repo-root sweep to confirm no live-code stragglers remain anywhere in scope:

```bash
grep -rn "saarivet\.fi" --include="*.js" --include="*.py" --include="*.html" \
  --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=backups --exclude-dir=".claude" \
  ~/clinic-tv ~/whatsapp_business ~/retell ~/google_analytics ~/miranda ~/wildlife ~/pacs \
  2>/dev/null | grep -v "@saarivet.fi" | grep -v "docs/superpowers" | grep -v "test_fixtures" \
  | grep -v "briefings/" | grep -v "wildlife.saarivet.fi\|pacs.saarivet.fi\|pacs2.saarivet.fi\|dashboard.saarivet.fi\|share.saarivet.fi\|<clinic>.saarivet.fi\|\\$CLINIC.saarivet.fi"
```

Expected: no output (everything in scope fixed; remaining hits are infra subdomains, email addresses, or historical docs, all intentionally excluded).
