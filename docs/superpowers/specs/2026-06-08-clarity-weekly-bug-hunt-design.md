# Clarity Weekly Bug Hunt — Design

**Status:** Approved 2026-06-08, ready for implementation planning.

## Context

Microsoft Clarity was wired into saarivet.fi on 2026-06-07 (consent-gated, all pages). First day showed 109 sessions, 67% mobile, and 79% of visitors never moved past the homepage. Within the first hour of watching recordings the user spotted two real bugs (a 404'd Cat Friendly logo on SV/EN homepages, and three hero badges rendered as unclickable `<div>`s where users were tapping them). Both shipped same day.

That hit rate makes the case: a regular, structured pass over Clarity's recordings catches things neither GA4 nor manual QA surfaces. This spec defines how that pass is automated.

## Goal

A weekly automated triage of Clarity insights, delivered as an actionable HTML email. The human stays in the editorial loop — the agent surfaces and ranks candidates; the user decides what to fix.

**Non-goals:**
- Conversion optimization, A/B testing, funnel building (separate workstream).
- Autonomous PRs against the live site (Option C in the brainstorm — rejected).
- Replacing GA4 for traffic analytics.

## Architecture

Three pieces:

1. **Smart Events** (one-time, manual setup in Clarity dashboard) — enrich the data so the agent can ask richer questions in week 2+.
2. **Weekly Triage Agent** — Anthropic remote agent (CCR) on a recurring cron, queries Clarity API, sends triaged email.
3. **Spec / re-arm loop** — the routine is one-shot scheduled (run_once_at); at the end of each run the agent re-arms itself for the next Sunday. Allows live tweaking of prompt without redeploying a cron.

### 1. Smart Events (prerequisite)

Created manually by the user in Clarity → Settings → Smart Events:

| Event name | Definition | Why |
|---|---|---|
| `ClickBooking` | Button click matching text "Varaa aika" OR href contains `/ajanvaraus/` or `/sv/tidsbokning/` or `/en/book-appointment/` | Primary CTA — enables funnel queries (landed → clicked Varaa → reached booking) |
| `ClickPhone` | Click on any `<a href^="tel:">` | Fallback contact path — high-intent signal |
| `ClickEmergency` | Click on Päivystys / emergency-banner link | Most urgent help-seeking visitors; if their session has rage clicks, that's a top-priority bug |

These take ~5 minutes to set up (Clarity admin role required; the project owner has it by default). They are not required for the first run but unlock filters like "sessions that triggered `ClickBooking` and then had a rage click" in subsequent weeks.

### 2. Weekly Triage Agent

**Schedule:** every Sunday 09:00 Europe/Helsinki (= 06:00 UTC).

**Environment:** Anthropic cloud, `claude-code-default`, model `claude-sonnet-4-6`.

**Inputs (embedded in prompt):**
- Clarity project ID `x3bktm0h06`
- Clarity API JWT (Data.Export scope; long-lived, source: `~/.claude.json`)
- Gmail SMTP: `smtp.gmail.com:587` STARTTLS, user `assaf.vidra@gmail.com`, App Password (per `feedback_hetzner_smtp_port.md`: 587, not 465)
- From / To: `assaf.vidra@gmail.com`

**Data pull plan:**
The Clarity Data Export API caps each request at 3 days and 3 dimensions; the daily project budget is 10 calls.

To cover 7 trailing days, chunk into three windows: D-7..D-5, D-4..D-2, D-1 (single-day window for the most recent day). Per window, query:

1. Sessions broken down by `Insight` dimension where insight ∈ {RageClick, DeadClick, JavascriptError, QuickBack} — 1 call per window.
2. Top-5 session recordings filtered by each insight — handled via `list-session-recordings` (separate tool, lighter budget impact). One call per insight per window = 12 calls if naive.

Optimisation: for week 1, pull only top 10 recordings per insight across the full 7-day window in a single `list-session-recordings` call (the tool accepts date ranges wider than 3 days because it's a list endpoint, not an aggregate). Total: ~3 dashboard calls + 4 recording-list calls = 7. Within budget with margin for retries.

**Triage layer:**
For each candidate the agent reads the recording metadata (URL, device, country, click count, signal types fired, duration) and assigns:

| Field | Values | Notes |
|---|---|---|
| `what_broke` | freeform 1-line guess | "Rage-clicked Cat Friendly badge in header" |
| `likely_cause` | enum: broken_link, dead_button, slow_response, confusing_ux, js_error | Best guess given the signal type and the page |
| `fix_complexity` | trivial / small / medium / unknown | trivial = HTML attribute; small = template change; medium = JS; unknown when no inspection possible |
| `ease_score` | 4 / 3 / 2 / 1 | trivial=4, small=3, medium=2, unknown=1 |
| `impact` | 1–10 | Computed: page weight (homepage 5, booking 5, service 3, article 2) + action criticality (booking 5, navigation 3, content 1), capped at 10 |
| `priority` | `impact × ease_score` | Range 1–40; higher is more worth shipping this week |

Output ranked by priority desc, top 5 in the email.

**Week-over-week comparison:**
The agent stores the previous week's run summary as a JSON gist (or in a Clarity-side label, TBD during implementation) so it can compute deltas. For week 1, deltas are "—".

### 3. Email format

HTML, simple table layout (per `feedback_email_design.md`: keep emails simple to stay in Gmail Primary).

```
Subject: Clarity weekly — Wk N (YYYY-MM-DD → YYYY-MM-DD)

Past 7 days: {sessions} sessions ({mobile%}% mobile), {flagged%} flagged.
Δ vs prior week: sessions {±N%}, flagged {±N pp}.

Top 5 candidates:
| # | Page | Signal | Likely cause | Complexity | Priority | Watch |
|---|------|--------|--------------|------------|----------|-------|
...

Full insight counts:
- Rage clicks: N sessions (top URL: …)
- Dead clicks: N
- JS errors: N
- Quick backs: N

Smart event funnel (week 2+):
- Landed → ClickBooking → reached /ajanvaraus/: {percentages}

API budget used: {calls}/10
Next run: Sunday {date} 09:00 Helsinki.
```

### 4. Delivery & re-arm

End of each successful run, the agent calls the `RemoteTrigger` API (or has the user re-run /schedule) to re-arm itself for the next Sunday. Simpler alternative: use `cron_expression: "0 6 * * 0"` for true recurrence. Decision deferred to implementation plan.

## Error handling

| Failure mode | Behavior |
|---|---|
| Clarity API returns empty data | Email goes out anyway with "no signals detected — possibly low traffic week" |
| Clarity API returns error | Email with the error message + raw response; do not retry the same call |
| SMTP failure | Agent logs to its CCR output (visible in claude.ai/code/routines UI) so the user sees the run failed |
| Budget exhausted mid-run | Send partial report with a "truncated due to API budget" note |

## Out of scope

- Conversion-optimization queries (separate workstream).
- Customizing Clarity masking (already discussed: keep default).
- Heatmaps (Clarity UI only; no API).
- Pulling session recording video files (not exposed by the MCP).

## Open implementation questions

1. **Recurrence mechanism:** one-shot re-arm vs cron expression. Cron is simpler; one-shot lets the prompt evolve more naturally. Resolve in the implementation plan.
2. **State storage for WoW deltas:** Gmail label search, a GitHub gist, or a tiny file in the saarivet repo. Resolve in plan.
3. **Smart event setup:** can the agent verify the events exist before relying on them, or assume the user followed the prerequisite? Resolve in plan.
