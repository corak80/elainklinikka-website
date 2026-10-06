---
version: 1
slug: "elainlaakari-kristiinankaupunki-index-html"
primary_target: "elainlaakari-kristiinankaupunki/index.html"
related_targets: ["sv/veterinar-narpes-kristinestad/index.html"]
---

# Surface: town landing pages (FI /elainlaakari-kristiinankaupunki/, SV /sv/veterinar-narpes-kristinestad/)

Scope: two hand-authored pages inside the established site world (shared header/footer/CTA box, style.css tokens). Visitor mode: Persuade.
Audience: pet owners in Kristiinankaupunki, Närpes, Kaskö, Teuva, Karijoki, Isojoki, mostly on a phone, arriving from a Google ad or a town search; job = decide whether a ~1 h drive to Vaasa is worth it and book. Action: call 06 321 7300 or book at my.provet.com. Proof: named services with published prices, Leena's cardiology certificate + Kennelliitto examiner rights, Pamela's AOVET/ESAVS training, Cat Friendly Clinic Silver, independent since 1989, six vets. Constraints: PRODUCT.md hard rules (no specialist wording, no invented credentials, no 24/7 claims, repo-sourced facts); copy fixed by the approved FI/SV JSON; must work without JS.
Memorable moment: tap your town and the page becomes about your drive.
Unresolved: none.

## Direction contract

THESIS: The town is the first decision the page makes for the visitor — tap your municipality and every number on the page (drive time, kilometres, on-call number) becomes yours. It refuses the category default: a generic "we serve the whole region" prose column with the town facts buried in paragraph nine.

OWN-WORLD: The site's own world, not a new one. White ground, #1a1a2e Inter text, pink #E58DB4 reserved for exactly two things: the primary action and the active town chip; pale pink #fdf2f7 for the drive band and the emergency aside; article-card radius (16px) and the site's soft shadow. Town chips are pill buttons with the site border, 44px tall. Service tiles are white cards, 1px border, service name 700, price in tabular figures, a plain text link; no icons, no emoji, no gradients. One or two real clinic photos (ultrasound / endoscopy from media/) as proof, never stock.

STORY: An owner in Teuva taps an ad "Eläinlääkäri myös Suupohjaan", sees Teuva already named, reads "noin 1 h 10 min · 82 km", scans seven things that are worth that drive with prices, learns the clinic sends findings back to her own vet and is honest about emergencies, and books — or calls, because the number is on screen the whole time.

FIRST VIEWPORT: Mobile (390): site header; H1 on two lines; the chip row (six towns, wraps to two lines, chosen chip filled pink); the drive band — town name small, "noin 1 h 10 min" large in tabular figures with km beside it — and under it the two buttons, Call (pink, primary) and Book online (outline); the first service tile peeks at the fold. Desktop (1440): H1 and chips in the left 7 columns, the drive band with both buttons as a card in the right 5; service tiles in three columns directly below. Primary action = Call, present in the first viewport at every width.

FORM: "Pick your town" — position 6 on my ordered list of seven grounded structures (route-first, proof-stack landing, FAQ-led, one-trip plan, home-vs-Vaasa ledger, pick-your-town, sister article); seed key f32866cf dealt 4, 6, 7; the user locked 6. Signature interaction: tapping a chip rewrites the drive band and the emergency block in place (200 ms crossfade), sets the URL hash (#teuva), and deep links select on load; without JS all six towns are listed in the band and both on-call lines show. Motion grammar: one crossfade, one chip fill; nothing else moves.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
