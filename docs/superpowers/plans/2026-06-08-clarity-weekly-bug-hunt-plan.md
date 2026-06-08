# Clarity Weekly Bug Hunt Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the weekly Clarity bug-hunt agent end-to-end — write the agent prompt, schedule it via the claude.ai Routines API, fire a one-off run to validate, then leave the recurring cron live.

**Architecture:** A single Anthropic-cloud remote agent (CCR) runs every Sunday 06:00 UTC. It uses `curl` (no MCP — Clarity isn't a claude.ai connector) to hit Microsoft Clarity's Data Export API for both the trailing 7-day window and the prior 7-day window, ranks candidates by `impact × ease_score`, and ships an HTML triage email via Gmail SMTP (587 STARTTLS). The agent's full instructions live in the routine's prompt; nothing on the user's Mac runs.

**Tech Stack:** claude.ai Routines API (via `RemoteTrigger`), Microsoft Clarity Data Export API, curl, Python 3 with `smtplib`, Gmail App Password.

---

## Resolutions of spec open questions

1. **Cron vs one-shot re-arm** → **Cron**: `0 6 * * 0` (Sundays 06:00 UTC = 09:00 EEST / 08:00 EET). Simpler, native to the API, no need for the agent to call back into RemoteTrigger.
2. **State storage for WoW deltas** → **None.** The agent queries Clarity for both windows in the same run (3 chunks for current week + 3 chunks for prior week = 6 dashboard calls, within the 10/day budget). Removes a moving part.
3. **Smart-event verification** → The agent tries to query smart-event funnel data; on empty / error, prints a one-line "smart events not configured this week, funnel section omitted" in the email and continues. Never blocks the run.

## File Structure

This is mostly a routine-config exercise. The only files we create live in the saarivet repo:

- **Create:** `tools/clarity-bug-hunt/agent-prompt.md` — the full agent prompt (single source of truth; the routine's `message.content` is built from this).
- **Create:** `tools/clarity-bug-hunt/README.md` — admin notes: how to update the prompt, how to rotate credentials, the routine ID, smart-event setup checklist.
- **Modify:** `~/.claude/projects/-Users-assafwydra/memory/project_clarity.md` — append routine ID + admin pointer once live.
- **Modify:** `~/.claude/projects/-Users-assafwydra/memory/MEMORY.md` — already has Clarity entry; no change needed unless we rename.

No code in the saarivet repo runs in production. The repo just hosts the source-of-truth prompt for future edits.

## Credentials (must be referenced, never invented)

- Clarity Data Export JWT — currently in `/Users/assafwydra/.claude.json` under `mcpServers.clarity.args` (long-lived, Data.Export scope). Copy from there.
- Gmail App Password — `npmtphaeevhsbmjt` (per `feedback_hetzner_smtp_port.md` and `project_saarivet.md`).
- Gmail SMTP — `smtp.gmail.com:587` STARTTLS, user `assaf.vidra@gmail.com`.

Both go into the routine prompt at create time. Risk equivalence with current state per the design discussion.

---

## Task 1: Write the agent prompt

**Files:**
- Create: `tools/clarity-bug-hunt/agent-prompt.md`

The prompt is the agent. It must be fully self-contained — the agent starts with zero context.

- [ ] **Step 1: Create the prompt file with placeholders intact**

Write the file with exactly this content. **Leave `__CLARITY_JWT__` and `__GMAIL_APP_PASSWORD__` as literal strings** — do NOT substitute. Substitution happens in-memory at Task 4 (the committed file must never contain real credentials).

````markdown
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
````

- [ ] **Step 2: Sanity-check the file**

```bash
grep -c "__CLARITY_JWT__" tools/clarity-bug-hunt/agent-prompt.md
```
Expected: `2` (one in Credentials, one in the curl example). If `0`, you forgot to leave the placeholder.

```bash
grep -c "__GMAIL_APP_PASSWORD__" tools/clarity-bug-hunt/agent-prompt.md
```
Expected: `2` (one in Credentials, one in the smtplib example).

- [ ] **Step 3: Commit (placeholder version — safe to share)**

```bash
cd ~/elainklinikka-website
git add tools/clarity-bug-hunt/agent-prompt.md
git commit -m "Add Clarity weekly bug-hunt agent prompt (placeholders)"
```

---

## Task 2: Write the admin README

**Files:**
- Create: `tools/clarity-bug-hunt/README.md`

- [ ] **Step 1: Create README**

````markdown
# Clarity Weekly Bug Hunt — Admin Notes

Weekly automated triage of saarivet.fi UX bugs via Microsoft Clarity.

## What it does

Every Sunday 06:00 UTC (09:00 EEST / 08:00 EET) an Anthropic-cloud agent queries Clarity's Data Export API, ranks UX-bug candidates by `impact × ease_score`, and emails a triage report to `assaf.vidra@gmail.com`.

- Spec: `docs/superpowers/specs/2026-06-08-clarity-weekly-bug-hunt-design.md`
- Plan: `docs/superpowers/plans/2026-06-08-clarity-weekly-bug-hunt-plan.md`
- Routine ID: see memory file `~/.claude/projects/-Users-assafwydra/memory/project_clarity.md` (populated after Task 4 runs)
- Routine dashboard: https://claude.ai/code/routines

## Updating the prompt

1. Edit `tools/clarity-bug-hunt/agent-prompt.md` (placeholders `__CLARITY_JWT__` and `__GMAIL_APP_PASSWORD__`).
2. Substitute the placeholders with real values (see Credentials below).
3. Call `RemoteTrigger update` with the new `message.content` (see Task 5 below for the exact body).

## Credentials

- Clarity JWT — `~/.claude.json` → `mcpServers.clarity.args[1]` (strip the `--clarity_api_token=` prefix).
- Gmail App Password — see memory `project_saarivet.md` (`npmtphaeevhsbmjt`).

## Smart events (one-time, manual, in Clarity dashboard)

Set these up in Clarity → Settings → Smart Events (admin role required, default for project owner):

| Name | Definition |
|---|---|
| `ClickBooking` | Button click matching text `Varaa aika`, `Boka tid`, or `Book appointment`; OR href contains `/ajanvaraus/`, `/sv/tidsbokning/`, `/en/book-appointment/` |
| `ClickPhone` | Click on any `<a href^="tel:">` |
| `ClickEmergency` | Click on `Päivystys` / `Jour` / `Emergency` link in the notice banner |

These take ~5 minutes and unlock funnel queries in subsequent weeks (the week-1 run will skip the funnel section).

## Disabling / pausing

To pause: `RemoteTrigger update` with `{"enabled": false}`.
To delete: go to https://claude.ai/code/routines (no API for delete).
````

- [ ] **Step 2: Commit**

```bash
cd ~/elainklinikka-website
git add tools/clarity-bug-hunt/README.md
git commit -m "Add Clarity bug-hunt admin notes"
```

---

## Task 3: Read credentials from local sources

**Files:**
- Read-only: `/Users/assafwydra/.claude.json`

- [ ] **Step 1: Extract the Clarity JWT**

```bash
python3 -c "import json; cfg = json.load(open('/Users/assafwydra/.claude.json')); args = cfg['mcpServers']['clarity']['args']; print([a for a in args if a.startswith('--clarity_api_token=')][0].split('=', 1)[1])"
```

Expected output: a long JWT starting with `eyJ...`. Copy it; you'll need it for Task 4.

- [ ] **Step 2: Confirm the Gmail App Password**

The password is `npmtphaeevhsbmjt`. No spaces.

---

## Task 4: Create the routine via RemoteTrigger

**Files:** none (API call).

- [ ] **Step 1: Build the substituted prompt in memory**

You will NOT save the substituted file to disk. Read the placeholder file, substitute, send to the API in one shot:

```bash
PROMPT=$(sed -e "s|__CLARITY_JWT__|<JWT_FROM_TASK_3>|g" -e "s|__GMAIL_APP_PASSWORD__|npmtphaeevhsbmjt|g" ~/elainklinikka-website/tools/clarity-bug-hunt/agent-prompt.md)
```

- [ ] **Step 2: Call RemoteTrigger create**

Use the `RemoteTrigger` tool with this body (substitute the actual prompt and a fresh lowercase v4 UUID):

```json
{
  "name": "Saarivet.fi Clarity weekly bug hunt",
  "cron_expression": "0 6 * * 0",
  "enabled": true,
  "job_config": {
    "ccr": {
      "environment_id": "env_016d7Md6sWRvuubXNTRU5pE5",
      "session_context": {
        "model": "claude-sonnet-4-6",
        "sources": [],
        "allowed_tools": ["Bash"]
      },
      "events": [
        {"data": {
          "uuid": "<fresh lowercase v4 uuid>",
          "session_id": "",
          "type": "user",
          "parent_tool_use_id": null,
          "message": {"content": "<PROMPT_FROM_STEP_1>", "role": "user"}
        }}
      ]
    }
  }
}
```

Note: `sources: []` because the agent doesn't need the saarivet repo — everything it needs is in the prompt.

Expected response: JSON with the new routine's `id`. Save this ID — Task 6 writes it to memory.

- [ ] **Step 3: Verify via list**

Call `RemoteTrigger {"action": "list"}` and confirm "Saarivet.fi Clarity weekly bug hunt" appears with `enabled: true` and the cron expression `0 6 * * 0`.

---

## Task 5: Fire a smoke test run

**Files:** none.

- [ ] **Step 1: Trigger a run-now**

Call `RemoteTrigger {"action": "run", "trigger_id": "<ID_FROM_TASK_4>"}`. The response is asynchronous — the routine will execute in the cloud over ~1-5 minutes.

- [ ] **Step 2: Wait for completion (out-of-band)**

The user receives a claude.ai notification when the run completes. While waiting, do NOT poll — let the user surface the notification or move on to other work. Mention to the user: "Smoke run triggered — you'll get a claude.ai notification when it's done; check assaf.vidra@gmail.com for the email."

- [ ] **Step 3: Inspect the email**

Once the user reports the run completed, they should:
1. Confirm an email arrived in `assaf.vidra@gmail.com` with subject starting `Clarity weekly — Wk`.
2. Open it and sanity-check: top-5 table populated (or "no candidates this week"), insight totals match the Clarity dashboard at https://clarity.microsoft.com/projects/view/x3bktm0h06/dashboard.

- [ ] **Step 4: If anything's broken**

Open https://claude.ai/code/routines, click the routine, view the run's stdout. Common failure modes and fixes:
- **`401 Unauthorized` from Clarity** → JWT expired or mis-pasted; regenerate at Clarity → Settings → Data Export and call `RemoteTrigger update` with a fresh prompt.
- **`SMTP authentication failed`** → App Password revoked; generate a new one at https://myaccount.google.com/apppasswords and `RemoteTrigger update`.
- **`No data returned`** → Project too new or low traffic; the email should still arrive with `0` for everything.

---

## Task 6: Record the routine ID in memory

**Files:**
- Modify: `/Users/assafwydra/.claude/projects/-Users-assafwydra/memory/project_clarity.md`

- [ ] **Step 1: Append routine info to memory**

Add this section at the bottom of `project_clarity.md`:

```markdown

**Weekly bug-hunt routine** (created 2026-06-08):
- Routine ID: `<ID_FROM_TASK_4>`
- Cron: `0 6 * * 0` (Sun 09:00 EEST / 08:00 EET)
- Source-of-truth prompt: `~/elainklinikka-website/tools/clarity-bug-hunt/agent-prompt.md` (placeholders only; substitute before sending to `RemoteTrigger update`)
- Admin notes: `~/elainklinikka-website/tools/clarity-bug-hunt/README.md`
- Routine dashboard: https://claude.ai/code/routines/<ID_FROM_TASK_4>
```

- [ ] **Step 2: No commit needed** (memory directory is not git-tracked)

---

## Task 7: Set the user up for the manual smart-event step

**Files:** none.

- [ ] **Step 1: Message the user**

Tell the user (paste verbatim — they need this to do it themselves):

> The routine is live. One manual prerequisite for richer week-2+ reports:
>
> Go to https://clarity.microsoft.com/projects/view/x3bktm0h06/settings → **Smart events** → **New event**, and create these three:
>
> 1. **ClickBooking** — Button click matching text "Varaa aika" OR href contains `/ajanvaraus/` or `/sv/tidsbokning/` or `/en/book-appointment/`
> 2. **ClickPhone** — Click on any `<a href^="tel:">`
> 3. **ClickEmergency** — Click on the Päivystys / Jour / Emergency notice-banner link
>
> Takes ~5 min. The week-1 report on Sunday will skip the funnel section; week-2+ will use it.

---

## Self-review checklist

- [x] Spec coverage: every section of `2026-06-08-clarity-weekly-bug-hunt-design.md` maps to a task. Smart events covered (Task 7); data pull (Task 1 prompt); triage (Task 1 prompt); email format (Task 1 prompt); delivery (Task 4 + 5); error handling (Task 1 prompt + Task 5 step 4).
- [x] Open implementation questions resolved in the header.
- [x] No placeholders in plan text (real cron, real cred sources, real dashboard URLs). The `__CLARITY_JWT__` / `__GMAIL_APP_PASSWORD__` placeholders inside the agent-prompt FILE are intentional — they're substituted at Task 4.
- [x] Each task is bite-sized and self-contained.
- [x] Plan implementable in one session — yes, ~30 min of actual work (Tasks 1-4) plus a 1-5 min smoke-test wait.

---

## Notes for the executor

- **No TDD here.** This plan creates a remote-agent config, not testable software. The "test" is Task 5 — fire a real run and inspect the email. If the run produces a sensible-looking email, ship it.
- **Don't commit substituted prompts.** The repo-committed `agent-prompt.md` keeps placeholders forever. The substituted version exists only in the routine's stored config.
- **One-shot vs cron rollback.** If the cron form misbehaves (e.g., Clarity API rate limit during off-peak makes weekly runs fail), swap to `run_once_at` and have the agent re-arm itself at the end of each run. The spec preferred cron for simplicity; keep one-shot as a fallback if needed.
