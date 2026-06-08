# Saarivet.fi Clarity Weekly Bug Hunt — Agent Instructions

You are a one-shot scheduled agent. Run the steps below in order, then exit.

## Context

You are auditing https://saarivet.fi (Eläinklinikka Saari, a veterinary clinic in Vaasa, Finland). The clinic uses Microsoft Clarity for behavioral analytics. Your job is to surface UX bugs by analyzing Clarity insights — rage clicks, dead clicks, JavaScript errors, and quick-back navigation — from the past 7 days. You do NOT propose code fixes; you triage and rank candidates so the human can decide what to ship.

## Credentials

- Clarity project ID: `x3bktm0h06`
- Clarity Data Export API token (Bearer): `__CLARITY_JWT__`
- Gmail SMTP: `smtp.gmail.com:587` STARTTLS
- Gmail user: `assaf.vidra@gmail.com`
- Gmail App Password: `__GMAIL_APP_PASSWORD__`
- Email goes from `assaf.vidra@gmail.com` to `assaf.vidra@gmail.com`

## Microsoft Clarity Data Export API

Endpoint: `GET https://www.clarity.ms/export-data/api/v1/project-live-insights`
Auth header: `Authorization: Bearer <TOKEN>`
Query params:
- `numOfDays` — 1, 2, or 3 (REQUIRED; max 3)
- `dimension1`, `dimension2`, `dimension3` — optional; each one of: `Browser`, `Device`, `OS`, `Country`, `URL`, `Channel`, `Source`, `Medium`

The response shape varies per dimension combination; always parse defensively. If a call returns HTTP 4xx/5xx or empty `data`, log the raw response into the email body and continue with the next call.

**Budget:** 10 API requests per UTC day. Aim for at most 8 calls; reserve 2 for retries.

## Step 1 — Pull data for the current week (last 7 days)

Today is the run date. Define:
- `current_week = [today-7, today-1]` (UTC days; 7 calendar days, excluding today which has partial data)
- `prior_week   = [today-14, today-8]` (the immediately preceding 7-day window for week-over-week comparison)

Since the API caps at 3 days per call, split each 7-day window into 3 chunks: `[d-7, d-5]`, `[d-4, d-2]`, `[d-1, d-1]`. For each chunk, issue ONE call with `numOfDays=N` (N = chunk size). Total: 6 calls for the two weeks combined.

For each chunk, request the aggregated metrics with no dimension (you get totals only — sessions, scroll depth, engagement time, rage clicks, dead clicks, quick backs, JS errors). Example curl:

```
curl -sS \
  -H "Authorization: Bearer __CLARITY_JWT__" \
  "https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=3"
```

Sum the chunk results to get a single 7-day total per week.

## Step 2 — Pull top candidate signals

Make 1 additional call with `dimension1=URL` and `numOfDays=3` for the most recent 3 days. This gives a per-URL session count and per-URL insight breakdown — your candidate pool.

For each URL in the response, extract any of these signals that are non-zero:
- `RageClickCount` / `RageClickSessionCount`
- `DeadClickCount` / `DeadClickSessionCount`
- `JavascriptErrorCount`
- `QuickBackClickCount`

If the response uses different field names, adapt — record them in the email's debug footer.

## Step 3 — Triage each candidate

For each (URL, signal) pair where the signal is non-zero, assign:

| Field | How to compute |
|-------|---------|
| `what_broke` | One-line natural-language guess based on URL + signal. E.g. URL=`/` + RageClick → "Users rage-clicked on the FI homepage; check hero badges, CTAs, navigation." |
| `likely_cause` | One of: `broken_link`, `dead_button`, `slow_response`, `confusing_ux`, `js_error` |
| `fix_complexity` | `trivial` / `small` / `medium` / `unknown` (default `unknown` — you cannot inspect the live site) |
| `ease_score` | trivial=4, small=3, medium=2, unknown=1 |
| `impact` | `page_weight + action_criticality`, capped at 10. Page weight: `/` or `/sv/` or `/en/` = 5; `/ajanvaraus/`, `/sv/tidsbokning/`, `/en/book-appointment/` = 5; `/palvelut/*` = 3; everything else = 2. Action criticality: rage_click=4, dead_click=4, js_error=3, quick_back=2 |
| `priority` | `impact × ease_score` (range 1–40) |

Sort all candidates by `priority` descending. Keep top 5.

## Step 4 — Smart events (optional, skip on failure)

Try ONE call: `dimension1=URL` with smart-event filter if the API supports it. The user may have set up smart events named `ClickBooking`, `ClickPhone`, `ClickEmergency`. If your call returns smart-event counts, include a "Funnel" section in the email. If the response shows zero counts for all three event names, OR the call errors, write a single line in the email: "Smart events not configured yet — funnel section omitted." Move on. Do NOT retry.

## Step 5 — Compose the HTML email

Subject: `Clarity weekly — Wk {ISO_WEEK} ({YYYY-MM-DD} → {YYYY-MM-DD})`

Body (HTML, simple table-based layout — no inline CSS frameworks, stay simple to land in Gmail Primary):

```html
<p><strong>Past 7 days:</strong> {sessions} sessions ({mobile_pct}% mobile), {flagged_pct}% with at least one Insight flag.</p>
<p><strong>Δ vs prior week:</strong> sessions {±%}, flagged sessions {±pp}.</p>

<h3>Top 5 candidates</h3>
<table border="1" cellpadding="6" cellspacing="0">
  <tr><th>#</th><th>Page</th><th>Signal</th><th>Likely cause</th><th>Complexity</th><th>Priority</th></tr>
  <!-- 1 row per candidate, no link to recording (the public Clarity dashboard URL is enough) -->
</table>

<h3>Insight totals (past 7 days)</h3>
<ul>
  <li>Rage clicks: {N} sessions, top URL: {url}</li>
  <li>Dead clicks: {N}</li>
  <li>JS errors: {N}</li>
  <li>Quick backs: {N}</li>
</ul>

<h3>Smart event funnel</h3>
<p>{funnel section OR "Smart events not configured yet."}</p>

<hr>
<p style="color:#888;font-size:12px;">
  API calls used: {N}/10 · Dashboard: <a href="https://clarity.microsoft.com/projects/view/x3bktm0h06/dashboard">https://clarity.microsoft.com/projects/view/x3bktm0h06/dashboard</a> · Next run: Sunday {next_sunday_date} 09:00 Helsinki.
</p>
```

## Step 6 — Send via SMTP

Use Python (`python3 -c "..."` is fine) and `smtplib.SMTP(..., 587).starttls()`. Example skeleton — adapt as needed:

```python
import smtplib, ssl
from email.mime.text import MIMEText
msg = MIMEText(html_body, "html", "utf-8")
msg["Subject"] = subject
msg["From"]    = "assaf.vidra@gmail.com"
msg["To"]      = "assaf.vidra@gmail.com"
with smtplib.SMTP("smtp.gmail.com", 587) as s:
    s.starttls(context=ssl.create_default_context())
    s.login("assaf.vidra@gmail.com", "__GMAIL_APP_PASSWORD__")
    s.send_message(msg)
```

If SMTP send fails (auth error, network), do NOT swallow it — print the full traceback to stdout so the user sees the failure in the routine output at https://claude.ai/code/routines.

## Step 7 — Done

Print a 1-line summary to stdout: "Sent Clarity weekly report for week {ISO_WEEK}: {N} candidates, top priority {P}." Exit.
