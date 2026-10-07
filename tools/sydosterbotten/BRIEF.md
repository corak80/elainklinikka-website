# Brief — town landing pages for Eläinklinikka Saari (Vaasa)

Two pages, one per language, for pet owners on the southern Ostrobothnian coast who would drive ~1 h to Vaasa for things a one-vet practice rarely does in-house.

- **FI page** `/elainlaakari-kristiinankaupunki/` — leads with **Kristiinankaupunki** and the Suupohja villages (Teuva, Karijoki, Isojoki); Närpiö and Kaskinen also named.
- **SV page** `/sv/veterinar-narpes-kristinestad/` — leads with **Närpes, Kristinestad and Kaskö**; Korsnäs/Malax named in the emergency line only. Östermark (Teuva), Bötom (Karijoki), Storå (Isojoki) named in the drive-time list.

Approved English master is below. Translate its MEANING into natural, idiomatic native copy — not word-for-word. Keep every fact, number, name and link exactly. Do not add facts.

## Hard rules
- Never the words specialist / erikoiseläinlääkäri / erikoisala / specialist- (protected title in Finland). Use "focus areas", "experienced in", "trained in".
- Founding year 1989. Six vets, eight veterinary nurses.
- Rating/review counts: none on this page.
- No phone numbers other than 06 321 7300 (clinic), 0600 399 199 (southern on-call district) and 0600 12202 (Kauhajoki on-call for Teuva, Karijoki, Isojoki — verified kauhajoki.fi 07-10-2026). Write the clinic number as "06 321 7300" in running text.
- Dashes: en dash – (never em dash —). Quotes: FI ”…”, SV ”…”.
- Prices: "74,45 €", "1 703 €" (non-breaking space before € in HTML: `&nbsp;€`; thin/normal space as thousands separator written as `&nbsp;` too: `1&nbsp;703&nbsp;€`).
- Place names FI: Kristiinankaupunki (-kaupungista, -kaupungin), Närpiö (Närpiöstä), Kaskinen (Kaskisista), Teuva (Teuvalta), Karijoki (Karijoelta), Isojoki (Isojoelta), Korsnäs, Maalahti, Suupohja (Suupohjan, Suupohjaan), Vaasa (Vaasaan, Vaasassa).
- Place names SV: Vasa, Närpes, Kristinestad, Kaskö, Korsnäs, Malax, Östermark (Teuva), Bötom (Karijoki), Storå (Isojoki), Sydösterbotten.
- Finland-Swedish, not Sweden-Swedish: veterinär, djurklinik, boka tid, tidsbokning, direktersättning (insurance direct billing), jour / jourhavande veterinär, röntgen, ultraljud, tandvård, narkos/anestesi (use "narkos" for owners), smådjursklinik.
- Finnish owner vocabulary: eläinlääkäri, eläinklinikka, lemmikki, hammashoito, hammasröntgen, röntgen, ultraääni, sydänultra / sydämen ultraäänitutkimus, tähystys, laboratorio, nukutus (for owners; "yleisanestesia" acceptable once), suorakorvaus, päivystys / päivystävä eläinlääkäri, ristisideleikkaus.
- Address the reader as "sinä" (FI) / "du" (SV), as the rest of the site does.
- Keep the HTML inline tags that appear in the master (`<strong>`, `<a href>`), and keep every href exactly.

## Links (keep hrefs exactly)
- Book online: `https://my.provet.com/elainklinikka-saari`
- Call: `tel:+35863217300`
- Dental: `/palvelut/hammashoito/`
- X-ray: `/palvelut/rontgen/` · Ultrasound: `/palvelut/ultraaani/`
- Cardiac: `/palvelut/sydantutkimukset/`
- Surgery / orthopaedics: `/palvelut/ortopedia/`
- Endoscopy: `/palvelut/tahystykset/`
- Laboratory: `/palvelut/laboratorio/`
- Cat page: FI `/kissan-elainlaakari-vaasa/`, SV `/sv/kattveterinar-vasa/`
- Price list: FI `/hinnasto/`, SV `/sv/prislista/`
- On-call info page: FI `/palvelut/paivystys/`, SV `/sv/tjanster/jour/`

## Output format
Return ONE JSON object, keys exactly as below, values = HTML-ready strings (inline `<strong>`/`<a>` allowed, no block tags inside values). Arrays where indicated.

```
{
 "title": "...",                 // <title>, ≤ 65 chars
 "meta_description": "...",      // ≤ 160 chars, plain text
 "h1": "...",
 "intro": ["p1", "p2"],
 "h2_worth": "...",
 "worth_intro": "...",
 "worth_items": [{"strong": "...", "text": "..."}],   // 7 items, same order as master
 "worth_second_opinion": "...",
 "h2_trip": "...",
 "trip_items": [{"strong": "...", "text": "..."}],    // 5 items, same order; 5th = drive times
 "h2_together": "...",
 "together": "...",
 "h2_emergency": "...",
 "emergency": "...",
 "h2_prices": "...",
 "prices": [{"name": "...", "value": "..."}],         // 8 rows, same order as master
 "prices_note": "...",                                // one sentence incl. the price-list link
 "h2_faq": "...",
 "faq": [{"q": "...", "a": "..."}],                   // 5 items, same order
 "cta_title": "...", "cta_text": "...", "cta_call": "Soita 06 321 7300" / "Ring 06 321 7300", "cta_book": "...",
 "cta_address": "📍 Gerbyntie 18, 65230 Vaasa · ma–pe 7.45–17.00"  (SV: Gerbyvägen 18, 65230 Vasa · mån–fre 7.45–17.00)
}
```

---

# APPROVED ENGLISH MASTER

**Title:** Vet for Kristiinankaupunki, Närpes and Kaskö pet owners – Eläinklinikka Saari, Vaasa
**Meta description:** Dental care with X-ray, ultrasound, cardiac examinations, orthopaedic surgery and an in-house lab in Vaasa – about an hour from Närpes and Kristinestad. Service in Finnish and Swedish.

**H1 (FI page):** A vet for Kristiinankaupunki and Suupohja pets – an hour's drive to Vaasa
**H1 (SV page):** A vet for Närpes, Kristinestad and Kaskö – an hour's drive to Vasa

Eläinklinikka Saari is an independent small-animal clinic in Vaasa, open since 1989. We are not part of a chain: six vets and eight veterinary nurses, and the vet who examines your pet also makes the treatment decisions. We serve in Finnish, Swedish and English.

Many of our patients already come from the southern coast. The drive is about an hour from Närpes and Kaskö and a little over an hour from Kristinestad – and for some things, it is worth it.

## When the drive to Vaasa is worth it

Your local vet handles most of your pet's care close to home. We are the place for the things that need equipment or experience a one-vet practice rarely has in-house:

- **Dental care under general anaesthesia, with dental X-rays.** Scaling, extractions and the resorptive lesions in cats that only show on an X-ray. Dental X-rays are taken during the same anaesthesia. → Dental link
- **X-ray and ultrasound on the same visit.** Digital X-ray and abdominal ultrasound, read by the vet while you wait. → X-ray link · Ultrasound link
- **Cardiac examinations.** Echocardiography, ECG and blood pressure. Leena Sandström holds the ESAVS cardiology certificate and is authorised to perform the Finnish Kennel Club's official heart examinations. → Cardiac link
- **Orthopaedic surgery.** Cruciate ligament repair by TTA or lateral suture, fracture surgery. Pamela Kvarngård has trained in orthopaedic surgery in the AOVET and ESAVS programmes. → Orthopaedics link
- **Endoscopy.** Gastroscopy, video-otoscopy, rhinoscopy, cystoscopy and bronchoscopy – for swallowed objects, chronic ear and nose problems and biopsies without open surgery. → Endoscopy link
- **In-house laboratory.** Blood, urine and hormone results during the visit, so a decision can usually be made the same day. → Laboratory link
- **Cats.** We are an ISFM Cat Friendly Clinic (Silver), with a separate waiting area, examination room and ward for cats. → Cat page link

We are also happy to give a second opinion on a diagnosis or a treatment plan you have already received.

## Making one trip count

- **Tell us where you are coming from when you book.** We will plan the visit so that the examination, any imaging and the lab results fit into the same day.
- **Bring what you have.** Previous records, lab results or X-rays from your own vet save time and repeat tests. Your vet can also send them to us directly.
- **Free parking at the door**, with room for several cars.
- **Insurance direct billing** with LähiTapiola, Agria and Pohjola – you pay only your own share at the clinic.
- **Drive times:** Närpes about 1 h (82 km) · Kaskö about 1 h 05 (94 km) · Kristinestad about 1 h 15 (101 km) · Teuva about 1 h 10 · Karijoki about 1 h 25 · Isojoki about 1 h 45.   (FI page: order Kristiinankaupunki, Kaskinen, Närpiö, Teuva, Karijoki, Isojoki. SV page: Närpes, Kaskö, Kristinestad, Östermark, Bötom, Storå.)

## Working together with your own vet

You do not need a referral to come to us. After the visit we send our findings and recommendations to your vet, if you wish, so that follow-up checks, suture removal and repeat prescriptions can be handled close to home. Many of our southern-coast patients have one vet at home and come to Vaasa for the procedures.

## Emergencies

We are not an emergency clinic, and at 100 km we cannot be the right first call in a crisis. During opening hours (Mon–Fri 7:45–17:00), call us first on 06 321 7300 – we fit urgent cases into the day whenever we can, and we will tell you honestly if somewhere closer is the better choice. Outside opening hours, contact the on-call vet for your area: for Kristinestad, Närpes, Kaskö, Korsnäs and Malax the southern on-call district is 0600 399 199; Teuva, Karijoki and Isojoki have their own municipal on-call service. → On-call info page link

## Prices
Consultation, under 15 min — 74,45 € · Consultation, under 30 min — 104,80 € · Dental scaling, dog under / over 20 kg — 303 / 353 € · Dental scaling, cat — 263 € · Dental X-ray with dental treatment — 59–99 € · Cardiac ultrasound — 376–476 € · Senior health check — 299 € · Cruciate repair, lateral suture, cat / dog — 953 / 1 203 € · Cruciate repair, TTA, under / over 20 kg — 1 703 / 1 803 €
(Use 8 rows: merge the two consultations into one row "Consultation 15 / 30 min — 74,45 / 104,80 €".)
Prices-note sentence: "Prices include VAT. Full price list → link."

## Frequently asked questions

**Do I need a referral from my own vet?** No. You can book directly online or by phone. If your vet has examined your pet already, bring the notes or ask them to send them to us.

**Can everything be done on the same day?** Usually yes, if you tell us when booking what the visit is for. Examination, X-ray, ultrasound and blood tests can be done and read during one visit. Surgery and dental treatment under anaesthesia are normally booked as a separate day, and your pet goes home the same evening.

**Can I come just for a second opinion?** Yes. Bring the existing results and we will go through them with you.

**Do you serve in Swedish?** Yes. Pamela Kvarngård, Leena Sandström and Nina Haglund consult in Swedish, and the whole team works in both languages every day.   (FI page keeps this question; SV page asks "Do you serve in Finnish?" → "Yes, the whole team works in both languages; several vets also consult in English.")

**What if my pet needs emergency care?** During opening hours, call us first. Outside opening hours, use your area's on-call vet – for the coastal municipalities 0600 399 199.

**CTA box:** title "Book an appointment" · text "Call us or book online." · buttons Call 06 321 7300 / Book online · address line.
