# Finnish critique – fi_draft.json (9.11.2026)

Checked key by key against EN_master.md and BRIEF.md. All placeholders are present and unchanged ({order} {items} {date} {time} {checked_date} {result_html}). There are no em dashes. Sections in privacy_body_html are in the same order as the master (Rekisterinpitäjä → … → Yritystiedot), the table has a `<thead>`, and both bold sentences are kept. The law name 29/2000 is correct everywhere. All numbers, company names, the address, phone, email, Y-tunnus and ALV number match the master.

F = factual (meaning/fact differs from the master), L = language/legal wording.

1. **privacy_body_html – Kenelle tietoja luovutetaan, item 1 (F)** → The draft says "erikoiseläinlääkäreille, joita konsultoimme". The master now says "other vets we consult for advice", and specialist titles are not allowed. → Replace with:
   `ja muille eläinlääkäreille, joita konsultoimme: kyseisen tapauksen hoitoon tarvittavat tiedot.`
   Full item: `<li>Laboratorioille, joihin lähetämme näytteitä (IDEXX, Movet, Laboklin, Patovet), ja muille eläinlääkäreille, joita konsultoimme: kyseisen tapauksen hoitoon tarvittavat tiedot.</li>`

2. **privacy_body_html – Rekisterinpitäjä (F, minor)** → The master gives "65230 Vaasa, Finland", but the draft leaves the country out. → `Gerbyntie 18, 65230 Vaasa, Suomi.`

3. **privacy_body_html – table row "Sinulle lähettämämme viestit" (F, minor)** → The draft adds "eläimesi voinnista", which is not in the master ("a follow-up question after a visit"). It is true and arguably clearer, so it can stay if the editor agrees. For a strict match → `käynnin jälkeinen seurantakysymys`.

4. **privacy_body_html – table header (L, legal term)** → "Käsittelyn peruste" should be the standard GDPR term. → `<th>Käsittelyn oikeusperuste</th>`

5. **privacy_body_html – row "Puhelut…" and the retention list (L)** → "kirjoitetun tekstin" / "Puheluista kirjoitetut tekstit" sounds as if a person wrote it down by hand. The transcript is a machine text version of the call.
   → Row: `Säilytämme puhelusta tehdyn tekstiversion ja yhteenvedon.`
   → Retention: `<li>Puheluiden tekstiversiot ja WhatsApp-keskustelut: 12 kuukautta, minkä jälkeen ne poistetaan. …`

6. **privacy_body_html – "Puheluita ei nauhoiteta." (L, note for the editor, not an error)** → The agreed wording is "Puheluita ei tallenneta". The draft's "nauhoiteta" is the better choice here: the very next sentence says we *do* keep (store) a text version, and "tallenneta" would seem to contradict it. Recommendation: keep `<strong>Puheluita ei nauhoiteta.</strong>`. If the same claim appears elsewhere (phone greeting, other pages), use the same verb there. Editor to confirm.

7. **privacy_body_html – commas before ja / eikä between main clauses (L)** → Standard Finnish leaves out the comma here.
   → `<strong>Mitään ei tallenneta eikä kuvia säilytetä.</strong>`
   → `WhatsApp-linjallamme vastaa tekoälyavustaja ja henkilökunta voi ottaa keskustelun hoitaakseen.`
   (The same applies to the Yritystiedot sentence "…laillistettuja (…) ja heidän toimintaansa valvoo Ruokavirasto." This one is optional, because the clause is long.)

8. **privacy_body_html – Kenelle, item 3 (L, case agreement)** → The list is in the allative case ("Viranomaisille"), so the example must agree with it. → `<li>Viranomaisille, kun laki sitä edellyttää (esimerkiksi Ruokavirastolle).</li>`

9. **privacy_body_html – processors intro (L)** → "niitä sitoo sopimus kanssamme" reads as translated. → `<p>Nämä palveluntarjoajat ovat henkilötietojen käsittelijöitä, ja niitä sitoo kanssamme tehty sopimus.</p>`

10. **privacy_body_html – Anthropic line (L)** → "Tekoälykielimalli … avustajille … työkaluille" is stiff, and the case is wrong for "used in". → `<li>Tekoälyn kielimalli puhelin- ja WhatsApp-avustajissa sekä henkilökunnan työkaluissa: Anthropic PBC (Yhdysvallat)</li>`

11. **privacy_body_html – Twilio/Retell line (L)** → "tekoälyyn perustuva puheavustaja" is wordy and drops the link to "tekoälyavustaja", the term used everywhere else on the page. → `…Twilio Inc. (Yhdysvallat); puhelimen tekoälyavustaja: Retell AI Inc. (Yhdysvallat)`

12. **privacy_body_html – GitHub/Cloudflare line (L)** → "ylläpito" usually means maintenance or upkeep, which is not what "hosting" means here. → `<li>Verkkosivuston julkaisu ja tietoturva: GitHub Inc. (Yhdysvallat), Cloudflare Inc. (Yhdysvallat)</li>`

13. **privacy_body_html – transfer paragraph (L, minor)** → The institution's proper name is "Euroopan komissio". → `…ja/tai Euroopan komission vakiosopimuslausekkeilla.`

14. **privacy_body_html – Lääkekirjanpito (L, citation form)** → The official Finnish citation of an EU regulation is "asetus (EU) 2019/6". → `<li>Lääkekirjanpito: 5 vuotta (asetus (EU) 2019/6).</li>`

15. **privacy_body_html – Kirjanpitoaineisto (L, legal term)** → In kirjanpitolaki, "kirjanpitoaineisto" is the umbrella term and includes the kirjanpitokirjat. "Aineisto 6 v, kirjat 10 v" therefore overlaps. The 6-year part means the vouchers. → `<li>Tositteet ja muu kirjanpitoaineisto: 6 vuotta tilikauden päättymisestä, kirjanpitokirjat 10 vuotta (kirjanpitolaki).</li>`
    (FYI for the master, not a translation fault: KPL 2:10 counts the 6 years "sen vuoden lopusta, jonka aikana tilikausi on päättynyt". The master's "from the end of the financial year" is a simplification.)

16. **privacy_body_html – Evästeet, Clarity sentence (L)** → In "tallentaa anonymisoituja sivustokäyntejä, joissa lomakekentät on piilotettu", the visits themselves are not what is recorded, and it is the field contents that are hidden. → `Clarity tallentaa lisäksi anonymisoituja tallenteita sivustokäynneistä, eikä lomakekenttien sisältö näy niissä.`

17. **privacy_body_html – Oikeutesi (L, legal accuracy + flow)** → The data subject cannot restrict processing themselves. They can only ask for it to be restricted. "Voit myös" also appears twice in a row.
    → `Voit myös pyytää tietojesi käsittelyn rajoittamista tai vastustaa käsittelyä, saada tietosi siirrettävässä muodossa ja peruuttaa suostumuksesi milloin tahansa.`
    → last sentence: `Lisäksi voit tehdä valituksen Tietosuojavaltuutetun toimistolle (tietosuoja.fi).`

18. **privacy_meta_description (L)** → "käsittelee henkilötietoja: … ja oikeutesi" lists "your rights" as something we process. → `Näin Eläinklinikka Saari Oy käsittelee henkilötietojasi: potilastiedot, puhelut, WhatsApp, evästeet ja säilytysajat. Lisäksi oikeutesi ja yritystiedot.` (151 characters)

19. **banner_text (L, minor)** → "evästeitä ja vastaavaa seurantaa" is slightly loose. → `Haluaisimme käyttää evästeitä ja muita vastaavia seurantatekniikoita, jotta voimme mitata sivuston käyntejä ja mainostemme tehoa: …` (rest unchanged)

20. **reviews_note (L, minor)** → The last sentence's word order puts the object first, which reads as translated. → `Voit lukea Googlesta kaikki Google-arvostelumme, hyvät ja huonot.`

21. **shop_cancel_contact_label (L, consistency)** → The intro asks for "sähköpostiosoite", but the label says "Sähköposti". → `Sähköpostiosoite tai puhelinnumero`

22. **shop_email_body, first paragraph (L)** → It is stiff: two sentences and a "joka koskee" clause. → `vahvistamme, että saimme {date} klo {time} peruutuksesi, joka koskee tilausta {order} ({items}).` (The rest is fine. Keep "Hei," on its own line, then this paragraph.)

23. **shop_privacy_add (L, minor)** → Resend Inc. is a company, not a "palvelu", and "-palvelun" after "Inc." reads awkwardly. → `Sähköposteja lähetetään myös Resend Inc:n (Yhdysvallat) kautta, ja noutoilmoitus lähetetään ensin WhatsAppilla (Meta Platforms Ireland Ltd).`

These keys need no change: accept, reject, privacy_link, settings, map_text, map_button, privacy_title, privacy_updated, footer_privacy_link, deslorelin_implant, shop_cancel_link, shop_cancel_title, shop_cancel_intro, shop_cancel_order_label, shop_continue, shop_confirm_question, shop_confirm_yes, shop_done, shop_email_subject, shop_not_found, shop_expired, shop_accessibility_title, shop_accessibility_html.
