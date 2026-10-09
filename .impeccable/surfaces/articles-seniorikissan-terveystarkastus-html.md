---
version: 1
slug: "articles-seniorikissan-terveystarkastus-html"
primary_target: "articles/seniorikissan-terveystarkastus.html"
related_targets: ["sv/artiklar/halsokontroll-seniorkatt.html","en/articles/senior-cat-health-check.html"]
---

# Senior cat health check article (FI/SV/EN)

Scope: one hand-built health article, Read mode with a soft Persuade edge (book the senior check). Audience: owner of a 7+ year-old cat, usually on a phone, unsure whether a healthy-looking cat needs a check. Job: see exactly what the check includes and costs, understand why it matters, book. Proof: the real IDEXX Geriatric Profile panel, blood pressure in the awake cat, Cat Friendly Clinic Silver facilities, our own cat photo. Constraints: copy fact-checked and FINAL (no wording changes), site chrome shared, three languages, mobile-first, tel:/booking conversion hooks kept.

## Direction contract
THESIS: Show exactly what the cat gets before explaining why. Refuses the category default of a reassuring text column that names a price but never shows the content of the check.
OWN-WORLD: The site's world — Inter, white, ink #1a1a2e, pink #E58DB4 for actions. New material: a results-sheet card — fine 1px rules (#e5e7eb), tabular two-column rows, small-caps section labels, a ticked marker per item in pink, and a price line at the foot like a lab report total; light pink #fdf2f7 sheet header band.
STORY: The owner sees the examination, the blood panel and the blood-pressure row laid out like the results they will receive, believes the 299 €/309 € is concrete, books; then reads why age, signs and blood pressure matter.
FIRST VIEWPORT: Desktop: H1 + intro (max 680px), then a full-width sheet whose pink header band holds the section heading and its lead paragraph (copy final, no new heading); left column The examination (8 lines), right column Blood panel grouped (kidney incl. SDMA, thyroid T4, liver, sugar, blood count, fats, minerals); a blood-pressure row spanning both; foot line 299 € / 309 € with Book + Call. Phone: sheet columns stack, groups collapse to one line each with counts, expandable.
FORM: The check-up sheet, dealt candidate 1 of 7 (seed 4db5a0c8). Signature interaction: panel groups expand in place on phones (height animated 200ms, none under reduced motion); the sheet's foot line stays visible as a sticky bar on phones once the sheet has scrolled past.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
