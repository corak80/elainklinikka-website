---
version: 1
slug: "articles-koira-ontuu-html"
primary_target: "articles/koira-ontuu.html"
related_targets: ["sv/artiklar/hunden-haltar.html","en/articles/dog-limping.html"]
---

# Dog limping article (FI/SV/EN)

Scope: one hand-built health article, Read mode (with a decision task on top: "is my dog's limp urgent?"). Audience: a worried owner on a phone, often in the evening, dog limping now. Job: decide how urgent it is, act (call / book / rest), then understand causes, exam, treatment and cost. Proof: our own prices, our cruciate surgery, rehab, acupuncture, real clinic X-ray. Constraints: copy is fact-checked and FINAL (no wording changes), site chrome shared, three languages, mobile-first, tel:/booking conversion hooks kept.

## Direction contract
THESIS: The decision never scrolls away. Refuses the category default of a single text column where the urgency advice is buried in paragraph three.
OWN-WORLD: The site's own world — Inter, white ground, ink #1a1a2e, pink #E58DB4 for actions only. Urgency is the one new material: three lanes as stacked tinted bands, each marked by a solid lane-colour icon chip (coloured edge stripes are a craft-floor ban) and a plain bold label (the lane's own lead words; Rest = the strict-rest phrase), red #B42318 / amber #B54708 / green #067647 text on tinted grounds, never colour alone.
STORY: In seconds the owner knows which lane their dog is in and has the number under their thumb; then reads at leisure, ending at our exam price and booking.
FIRST VIEWPORT: Desktop ≥1024px: 8/4 grid. Left: tag + date, H1, intro, then the full "When should I take my limping dog to the vet?" lanes. Right: sticky rail (top = header + 24px) with the three lanes compressed to one line each, the two phone numbers as buttons, and "Book a lameness exam · 163 €". Phone: lanes inline right after the intro; a 56px sticky bottom bar "Is it urgent?" + Call opens a bottom sheet with the three lanes.
FORM: Act-now rail, dealt candidate 7 of 7 (seed f4d7265e). Signature interaction: tapping a rail lane scrolls to its full list in the article and outlines it once; the phone bottom sheet slides up 220ms ease-out, none under reduced motion.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
