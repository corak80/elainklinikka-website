# /palvelut/paivystys/ — Emergency Landing Page Redesign

**Date**: 2026-05-19
**Author**: Claude (under direction of Assaf Wydra)
**Status**: Approved, ready to implement
**Replaces**: Initial commit `01fb9e0` on branch `seo/paivystys-page` (contained
factual errors about the regional emergency vet landscape).

## Why this redesign

The first version of the emergency landing page, written without research,
contained four material factual errors:

1. Claimed Saari "always tries to make room" for acute cases. Actual clinic
   policy: **daily reserved acute slots**. Different value proposition.
2. Claimed the Vaasa region has no after-hours veterinary emergency service.
   **Wrong.** There is a regional hotline serving Vaasa, Mustasaari, Laihia,
   Vähäkyrö, and Vöyri.
3. Claimed nearest 24/7 hospitals are in Tampere/Helsinki, "3–4 hours" away.
   **Wrong.** The closest 24/7 is in Pori (~2 hours).
4. Said Saari checks voicemail in the morning. **No voicemail exists.**

This redesign rewrites the page around verified facts.

## Target queries (from GSC, 90-day window)

| Query | Position | Impressions/90d |
|---|---|---|
| päivystävä eläinlääkäri vaasa | 11.9 | 210 |
| eläinlääkäripäivystys vaasa | 9.4 | 89 |
| vaasa eläinlääkäripäivystys | 4.9 | 42 (0% CTR) |
| päivystävä eläinlääkäri | 4.5 | 40 (0% CTR) |
| eläinlääkäripäivystys | 3.4 | 39 (0% CTR) |

The 0% CTR at top positions for the bare keyword variants confirms there's
no landing page that actually answers the query. Creating one should move
both impressions and CTR.

## Verified facts (with sources)

### Regional emergency hotline (Pohjoinen päivystysalue)

- **Phone**: 0600 399 299
- **Coverage**: Vaasa, Mustasaari, Laihia, Vähäkyrö, Vöyri
- **Hours**: weekday evenings 16:00 → next-morning 08:00; weekends Fri 16:00
  → Mon 08:00
- **Call cost**: 1.527 €/min daytime (8–20), 3.551 €/min nights (20–8) + local
  network fee
- **Visit surcharges**: +50% weekday evenings 17–22 and weekend daytime;
  +100% nights 22–08
- **Sources**: Vaasa city site (vaasa.fi), Suomi.fi (last updated 2025-06-02),
  Mustasaari municipality

### Closest 24/7 small-animal hospital

- **"Eläinklinikka Syke" (operated by Evidensia)**
- Address: Itäkeskuksenkaari 8, 28130 Pori
- Distance from Vaasa: ~195 km, real-world driving time ~2 hours
- **Source**: Evidensia 24/7 directory page

### Next closest 24/7 after Pori

- **"Eläinsairaala Veter" (operated by Evidensia)**
- Address: Peltokatu 16, 33100 Tampere
- Distance from Vaasa: ~240 km, ~3 hours
- **Source**: Evidensia 24/7 directory page

### Closest extended-hours (non-24/7) hospital

- **Evidensia Seinäjoen Eläinsairaala**
- Address: Ravitie 8 B, 60120 Seinäjoki
- Distance from Vaasa: ~80 km, ~1h 15min
- Hours: Mon–Sat 8–21, Sun 9:30–18
- Emergency triage line: 0600 41 8823
- **Source**: Evidensia clinic page

### Saari's own policy (user-confirmed)

- Hours: Mon–Fri 9–17, closed weekends.
- Office number (06) 321 7300: rings unanswered outside hours, **no voicemail**.
- **Daily reserved acute slots** every weekday for urgent cases.

## Page structure

Same 6-section structure as the original, with content rewritten around the
verified facts:

1. **Daily acute slots — weekdays 9–17** (replaces vague "we try to make room")
2. **When is it an emergency?** (universal symptom triage — broadened the
   urinary obstruction bullet to cover dogs as well as cats)
3. **What to do in an emergency** (5-step first-aid sequence, unchanged from
   v1 since it's universal)
4. **Evenings and weekends — Northern Emergency Area** (the major rewrite —
   names the regional hotline, lists Seinäjoki/Pori/Tampere referral options
   with correct distances)
5. **Common emergencies** (links to existing FI/SV/EN article versions of
   snake bite, pyometra, acute diarrhoea)
6. **FAQ** (6 entries, all factually re-verified)

Schema: same as v1 — MedicalWebPage + MedicalProcedure (`Emergency Veterinary
Care`) + BreadcrumbList + FAQPage + WebSite. Six FAQ Q&A pairs in JSON-LD.

## Translations

EN approved by user. FI and SV are translations of the same approved content.
Names of facilities (`Eläinklinikka Syke`, `Eläinsairaala Veter`, `Evidensia
Seinäjoen Eläinsairaala`) stay in their original form in all three languages
— these are proper nouns and that's how a panicked owner will recognise them
on Google Maps or in their phone contacts.

Phone numbers and address details are language-independent and identical in
all three versions.

## Implementation

Single source-of-truth edit: replace the `paivystys` entry in `build-articles.js`
(servicePages array). Re-run `node build-articles.js` to regenerate the three
HTML files and the sitemap.

The previous (incorrect) version on branch `seo/paivystys-page` will be
superseded by this update.

## Out of scope (deferred)

- `EmergencyService` schema type — the existing template uses `MedicalProcedure`
  with `Emergency Veterinary Care` as the service name. Stronger schema typing
  would require extending the template generator. Defer to a separate task.
- `openingHoursSpecification` with explicit time-of-day breakdown — would
  require either a separate LocalBusiness schema block or template extension.
  Defer.
- Live regional vet status (e.g., "duty veterinarian today: X") — out of scope.
- Updating the existing FI/SV/EN articles (kyynpurema, kohtutulehdus, ripuli)
  to cross-link back to /paivystys/ — could be a small follow-up.

## Approval log

- 2026-05-19: User reviewed and approved page structure in English.
- 2026-05-19: User confirmed clinic-policy claims (closed weekends, no
  voicemail, daily reserved acute slots).
- 2026-05-19: User confirmed Tampere should stay named in the page.
- 2026-05-19: User confirmed urinary obstruction bullet should cover dogs as
  well as cats (correction from v1).
