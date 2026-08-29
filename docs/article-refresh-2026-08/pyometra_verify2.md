# Pyometra article — second-round verification

File checked: `pyometra_en_master.json` (state of 29-08-2026 16:17) against `pyometra_factcheck.md`.
Sources re-fetched today (not memory): Hagman 2022 full PDF (pub.epsilon.slu.se/30095, text-extracted), Jitpean 2014 (PMC3892096), Jitpean 2017 (PMC5217653), and the Europe PMC abstracts of Jitpean 2012 (23279535), Egenvall 2001 (11817057), Hagman 2014 cats (24726694), Niskanen & Thrusfield 1998 (9836400).

## Part 1 — Were the WRONG / IMPRECISE findings fixed?

| # | Finding | Status in current master |
|---|---|---|
| C2 | 1 in 4 by age 10 | FIXED — "roughly one in five … (19–24 % in Swedish insurance data)". Jitpean 2012: 19 %; Egenvall 2001: 23–24 %. Correct. |
| C7 | 2–8 weeks after heat | PARTLY FIXED — onset now "1–2 months … almost always within four months,," (typo + slight overstatement, see R1). The companion change ("weeks after her heat" → "weeks or months") was NOT applied in symptoms, diagnosis, contact (see R2). |
| C9 | Collapse "within a day or two" | FIXED — now "seriously ill within days … around 60 % … sepsis". Figure correct (Hagman 2022 p.635: "Approximately 60% of bitches and 86% of queens with pyometra suffer from sepsis") but placed so it reads as 60 % of closed cases (see R3). |
| C13 | Median age 7 | FIXED — "on average around 7 years, and in Finnish data the typical patient is about 9". Jitpean 2012 mean 7.0; Niskanen 1998 median 9. Correct. |
| C15/C45 | Heat-suppression hormones | PARTLY FIXED — causes now names oestrogen mismating injections (Niskanen OR > 6 in bitches ≤ 4 y). Prevention says "avoid hormonal 'mismating' injections" without "oestrogen" — see R8; progestogens dropped entirely although Hagman 2022 lists them. |
| C16 | Breed list | FIXED — Bernese 66 %, Great Dane 62 %, Leonberger 61 %, Rottweiler 58 %, Irish Wolfhound 58 % (Hagman 2022 Table 1) → "more than half" is true for every named breed. Low-risk list (Finnish Spitz 3 %, Dachshunds, German Shepherds — Egenvall 2001; mongrels — Niskanen 1998) correct. Minor label issue, see R9. |
| C17 | "almost always fatal" | NOT FIXED — sentence unchanged (see R4). |
| C21 | Recurrence "large proportion" | CHANGED TO "roughly 15–25 %" — but this now conflicts with the primary review, see R5. |
| C23 | Very high WBC typical | FIXED in substance — "about half … raised white cell count, and a low count is a warning sign of peritonitis". Leukopenia → 18-fold peritonitis risk (Jitpean 2014) is correct. "About half" is at the low end of the sources, see R6. |
| C24 | Raised kidney values typical | FIXED — now "check … the kidney and liver values" with no claim that they are typically raised. Correct (creatinine raised in 4.8 %, Jitpean 2014). |
| C30 | Cannot return once uterus gone | FIXED — stump-pyometra caveat added in treatment. Wording slightly circular, see R10 (optional). |
| C34 | Usually home on antibiotics | FIXED — "when the vet judges it necessary, a short course of antibiotics". Matches Hagman 2022 "discontinued as soon as possible". |
| C39 | Cat signs "the same" | FIXED — "similar … up to 40 % of queens show no visible discharge … typically around 4 years". Hagman 2022: "absent or concealed … in up to 40% of affected queens"; Hagman 2014: median age 4 y. Correct. |
| C42 | Cat: "Spaying prevents it entirely" | NOT FIXED — sentence unchanged and now contradicts the treatment section's stump-pyometra caveat (see R7). |
| C43 | Prevention: spaying removes risk completely | PARTLY — "completely" dropped, but "removes the risk" is still absolute (see R7). |

## Part 2 — Remaining issues (hostile read of the whole master)

### R1. onset.text — typo and overstatement
Current: "Pyometra typically develops 1–2 months after a heat, almost always within four months,, when progesterone has thickened the uterine lining …"
Problem: double comma; and "almost always" is stronger than the source. Hagman 2022 p.632: "usually diagnosed within 4 months of estrus"; p.638: "the disease can occur at any time during the estrus cycle".
Replacement: "Pyometra typically develops 1–2 months after a heat, and usually within four months of it, when progesterone has thickened the uterine lining …"

### R2. Internal contradiction — "weeks after her heat" (three places) vs "1–2 months"
Current (symptoms): "If an unspayed bitch is listless and drinking a lot in the weeks after her heat, see a vet the same day."
Current (diagnosis): "we scan any unspayed bitch who is unwell in the weeks after a heat, even without discharge."
Current (contact): "… drinks a lot or refuses food in the weeks after a heat."
Problem: the onset section (correctly) says the typical window is 1–2 months and up to four months; "in the weeks after" invites an owner whose bitch was in heat 10 weeks ago to rule pyometra out. Hagman 2022 p.635: "presented up to 2 months to 4 months after estrus"; Jitpean 2014: "All bitches were diagnosed within 2 months of the previous oestrus".
Replacement (all three): "in the weeks or months after her heat" / "in the weeks or months after a heat".

### R3. onset.text — the 60 % sepsis figure is attached to closed pyometra only
Current: "a closed pyometra can make a dog seriously ill within days, because toxins and bacteria pass from the uterus into the bloodstream — around 60 % of dogs already show signs of sepsis when they arrive at the clinic."
Problem: as written, "60 % of dogs" reads as 60 % of closed cases. Hagman 2022 p.635 gives ~60 % for all bitches with pyometra; Jitpean 2017 gives 51 % (open) vs 77 % (closed). Not wrong, but the number is anchored to the wrong subject.
Replacement: "a closed pyometra can make a dog seriously ill within days, because toxins and bacteria pass from the uterus into the bloodstream. Around 60 % of all dogs with pyometra already have sepsis when they arrive at the clinic, and the proportion is higher when the cervix is closed."

### R4. selfheal.text — "almost always fatal" (C17, not applied)
Current: "No. Untreated pyometra is almost always fatal: the uterus can rupture, and the infection causes sepsis, kidney failure and peritonitis."
Problem: no study quantifies the untreated course; the sources say "potentially life-threatening" (Jitpean 2014), "can be life-threatening in severe cases" (Hagman 2022 p.632). Hagman 2022 p.647 also notes antimicrobials alone "may reduce the disease and prevent its progression", so a proportion of open cases smoulder rather than die. "Almost always fatal" is an unsupported absolute.
Replacement: "No. Untreated pyometra is life-threatening: the uterus can rupture, and the infection leads to sepsis, kidney damage and peritonitis."

### R5. selfheal.text — recurrence "roughly 15–25 %" understates the review's pooled figure
Current: "and even then pyometra recurs in roughly 15–25 % of dogs at later heats."
Problem: Hagman 2022 p.649 (re-read today): "The mean recurrence rate reported in dogs is 29% (range 0%–85%)". The 15–25 % band in the first fact-check was built from four single studies (17/19/20/21 %) and omits the high-recurrence protocols (cloprostenol 85 %) that the review pools. Quoting a range below the review's mean is what a reviewer would call cherry-picking. Hagman also adds the practical consequence: "Breeding on the subsequent estrus cycle is consistently recommended after medical treatment, to avoid recurrence."
Replacement: "and even then pyometra comes back at a later heat in roughly one dog in four (reported range 0–85 % depending on the protocol), so the bitch should be bred at the very next heat and spayed once her breeding career is over."

### R6. diagnosis.text — "about half" have a raised white cell count
Current: "about half of dogs have a raised white cell count, and a low count is a warning sign of peritonitis"
Problem: the three sources give 54 % (Jitpean 2014), 61 % (Hagman 2022 Table 5) and 62 % open / 89 % closed (Jitpean 2017). "About half" is the floor. The leukopenia clause is correct (Jitpean 2014: 18-fold peritonitis risk; Hagman 2022 p.650).
Replacement: "more than half of dogs have a raised white cell count (most often in closed pyometra), and a low count is a warning sign of peritonitis"

### R7. cat.text + prevention.text — absolute "prevents it entirely" / "removes the risk" contradicts treatment.text
Current (cat): "Spaying prevents it entirely."
Current (prevention): "Spaying removes the risk, because the uterus and both ovaries are removed."
Problem: treatment.text now correctly admits stump pyometra; Hagman 2022 p.651: "A stump pyometra is when pyometra develops in residual uterine tissue in incompletely spayed bitches and queens, most often because of hormone-producing ovarian remnants." Two sections say "entirely/removes", one says "rare exception" — internal contradiction, and C42/C43 were flagged in round one.
Replacement (cat): "Spaying (removing the uterus and both ovaries) prevents it, apart from the rare stump pyometra described above."
Replacement (prevention): "Spaying all but removes the risk, because the uterus and both ovaries are removed — the only exception is the rare stump pyometra when a piece of ovary or uterus is left behind."

### R8. prevention.text — "hormonal 'mismating' injections" is too broad and could steer owners away from a safe drug
Current: "and avoid hormonal 'mismating' injections, which increase the risk."
Problem: the documented risk is oestrogen (Niskanen 1998: oestrogen OR > 6 in bitches ≤ 4 y; Hagman 2022: "estrogen compounds that increase the response to progesterone are associated with increased risk"). The mismating treatment actually used today is aglepristone (an anti-progestogen), which does not raise pyometra risk and is itself a pyometra treatment (Hagman 2022 Table 6). A blanket "avoid mismating injections" could lead an owner to refuse aglepristone after an accidental mating. Conversely, progestogen heat-suppression — which Hagman 2022 p.633 lists as a risk factor ("Exogenous treatments with steroid hormones, such as progestogens … are associated with increased risk") and which is still occasionally used — is now not mentioned anywhere. The Finnish study's non-confirmation of the progestin effect justifies softening, not deleting.
Replacement: "and avoid oestrogen-based 'mismating' injections, which clearly increase the risk; hormonal heat-suppression treatments (progestogens) are also linked to pyometra, although a large Finnish study did not confirm a strong effect. Ask us about safer alternatives."
(causes.text is fine as written: "Oestrogen injections given to prevent pregnancy after an unwanted mating are a well-documented risk factor.")

### R9. intro vs causes — source label inconsistency (minor)
Current (intro): "19–24 % in Swedish insurance data"; (causes): "in Nordic data more than half of intact Bernese Mountain Dog …"
Problem: the breed percentages are from the same Swedish insurance dataset (Jitpean 2012 / Hagman 2022 Table 1), not a pan-Nordic one; only the low-risk list mixes in Finnish data (Niskanen 1998). Not a factual error, but a careful reader will ask where "Nordic data" comes from.
Replacement: "Breed matters a great deal: in Swedish insurance data more than half of intact Bernese Mountain Dog, Great Dane, Leonberger, Rottweiler and Irish Wolfhound bitches develop pyometra by age 10, whereas in Swedish and Finnish studies the Finnish Spitz, Dachshunds, German Shepherds and mixed-breed dogs have a clearly lower risk."

### R10. treatment.text — stump pyometra clause is circular (optional)
Current: "once the uterus and both ovaries are completely removed the disease does not return (the rare exception is a 'stump pyometra' when ovarian tissue is left behind)."
Problem: the parenthesis is an exception to a condition ("completely removed") that already excludes it, and Hagman says stump pyometra needs residual uterine tissue and is "most often" (not only) due to ovarian remnants. Reads fine to a lay reader; tighten if convenient.
Replacement: "once the uterus and both ovaries are removed the disease cannot return; the rare 'stump pyometra' happens only if a piece of uterus and ovary is left behind at surgery."

## Part 3 — Cost paragraph
Current: "Pyometra surgery is priced case by case, because the operation, the fluids and antibiotics, the anaesthesia time and any hospitalisation depend on the size of the dog and on how ill she is when she arrives. You receive an estimate before surgery. For comparison, a planned spay of a healthy bitch costs 483–753 € depending on weight — an emergency pyometra operation costs more than that, and the earlier the dog is brought in, the less intensive care she needs. Direct insurance billing is available for LähiTapiola, Agria and Pohjola customers."
Check: case-by-case → yes; depends on size and severity → yes; 483–753 € presented as a planned-spay comparison only, not as the pyometra price → yes; no pyometra price is quoted anywhere else in the master → consistent. "Earlier = less intensive care" is supported by Hagman 2022 (mortality/complications rise with rupture, peritonitis, septic shock) and Jitpean 2014 (predictors of prolonged hospitalisation). PASS.

## Verified as correct on re-read (no action)
- 19–24 % / one in five (Jitpean 2012, Egenvall 2001).
- Mean 7 y / Finnish median 9 y (Jitpean 2012, Niskanen 1998).
- Breed sentence: each named breed > 50 % (Hagman 2022 Table 1: 66/62/61/58/58 %).
- 60 % sepsis figure itself (Hagman 2022 p.635) — placement only, R3.
- Low WBC = peritonitis warning (Jitpean 2014, Hagman 2022 p.650).
- Cats: up to 40 % no visible discharge (Hagman 2022 p.636), median age 4 y (Hagman 2014), prognosis good (case fatality 5.7 %).
- > 90 % recover (mortality 1–4.5 % in Swedish surgical cohorts; Hagman 3–20 % overall).
- Antibiotics on discharge case-by-case (Hagman 2022 p.648).
- Emergency number 0600 399 299 for the Vaasa area.

## Verdict
FIX (8) — R1–R8 required; R9–R10 optional polish. Cost paragraph PASS.
