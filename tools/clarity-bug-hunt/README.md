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
