# SV critique of sv_draft.json (Finland-Swedish critic, 09-11-2026)

Checked against EN_master.md and BRIEF.md. All keys are present. All numbers, law references, company names, phone numbers, FO/VAT numbers and placeholders ({order} {items} {date} {time} {checked_date} {result_html}) match the master. There are no em dashes. Both bold sentences are kept as `<strong>`. The section order in privacy_body_html matches the master, including the table and Företagsuppgifter. privacy_meta_description is 143 characters, under the 155 limit. Livsmedelsverket, Dataombudsmannens byrå, FO-nummer, personuppgiftsbiträde and självständig personuppgiftsansvarig (Walley) are all used correctly.

Issues found: 15 (1 factual/legal-meaning, 14 language/terminology).

1. **privacy_body_html, accounting row of the retention list** (FACTUAL). Today it says "Bokföringsmaterial: 6 år … bokföringsböcker 10 år". In Finland-Swedish, "bokföringsmaterial" covers all accounting material, so the line both says 6 years for everything and 10 years for the books. The bokföringslag (2 kap. 10 §) uses two terms: *verifikationer* are kept 6 years and *bokföringar* 10 years. "Bokföringsböcker" is not the Finnish law's term.
   Fix: replace `<li>Bokföringsmaterial: 6 år från räkenskapsperiodens slut, bokföringsböcker 10 år (bokföringslagen).</li>` with `<li>Verifikationer: 6 år från räkenskapsperiodens slut, bokföringar 10 år (bokföringslagen).</li>`

2. **privacy_body_html, table header**. "Rättslig grund" is understandable, but Dataombudsmannens byrå and the GDPR's Article 6 wording in Finland use *laglig grund*.
   Fix: `<th>Rättslig grund</th>` → `<th>Laglig grund</th>`

3. **privacy_body_html, first table row, purpose**. "Vård av ditt djur och patientjournaler" drops "keeping", so it reads as if the records themselves were a purpose.
   Fix: `<td>Vård av ditt djur och patientjournaler</td>` → `<td>Vård av ditt djur och förande av patientjournal</td>`

4. **privacy_body_html, phone-call row**. "den skrivna utskriften" doubles up, because an utskrift is already written.
   Fix: `Vi sparar den skrivna utskriften och sammanfattningen av samtalet.` → `Vi sparar en utskrift av samtalet och en sammanfattning av det.`

5. **privacy_body_html, waiting-room camera row**. "En direktbild från kameran" sounds translated. Vasa readers would say the picture is shown live.
   Fix: `En direktbild från kameran i väntrummet visas på personalens skärmar så att vi ser vem som väntar.` → `Bilden från kameran i väntrummet visas direkt på personalens skärmar så att vi ser vem som väntar.`

6. **privacy_body_html, "Statistik över webbplatsen" (twice)**. In the table row, "Statistik över webbplatsen och annonser" reads as statistics *over* the ads. The compound is the natural form.
   Fix: `<td>Statistik över webbplatsen och annonser</td>` → `<td>Webbplatsstatistik och annonser</td>`; and `<li>Statistik över webbplatsen: högst 14 månader` → `<li>Webbplatsstatistik: högst 14 månader`

7. **privacy_body_html, transcripts in the retention list**. "sparas också i djurets patientjournal och sparas så som anges ovan" repeats "sparas".
   Fix: `Allt som gäller ditt djur sparas också i djurets patientjournal och sparas så som anges ovan.` → `Allt som gäller ditt djur förs också in i djurets patientjournal och sparas så som anges ovan.`

8. **privacy_body_html, medicine row in the retention list**. Two problems: the correct way to cite an EU regulation in Swedish is "förordning (EU) 2019/6", and "Uppgifter om läkemedel" is vague.
   Fix: `<li>Uppgifter om läkemedel: 5 år (EU-förordning 2019/6).</li>` → `<li>Anteckningar om läkemedel: 5 år (förordning (EU) 2019/6).</li>`

9. **privacy_body_html, Google Analytics retention**. "(vår kontoinställning)" is clipped and reads like a note to self.
   Fix: `högst 14 månader i Google Analytics (vår kontoinställning)` → `högst 14 månader i Google Analytics (enligt vår kontoinställning)`

10. **banner_text**. "liknande spårning" is incomplete. You track *with* something, so it should name the techniques. "De kopplas på" is fine in speech but loose for consent wording.
    Fix: `Vi vill använda kakor och liknande spårning för att mäta besöken` → `Vi vill använda kakor och liknande spårningstekniker för att mäta besöken`; and `De kopplas på bara om du godkänner.` → `De används bara om du godkänner dem.`

11. **reviews_note**. "skribent" is stiff and means a professional writer to many readers. "Alla våra omdömen på Google … på Google" says Google twice.
    Fix (whole value): `Här är 29 omdömen som vi har valt ut från Google och Facebook. Vi kontrollerar inte om alla som har skrivit dem har varit våra kunder. Alla våra Google-omdömen, både bra och dåliga, kan du läsa på Google.`

12. **shop_cancel_intro**. "inom 14 dagar från att du hämtade den" is a grammar slip. The conjunction is "från det att".
    Fix: `inom 14 dagar från att du hämtade den` → `inom 14 dagar från det att du hämtade den`

13. **shop_done and shop_email_body**. "återbetalar summan" sounds off. The natural word for money paid back is "beloppet".
    Fix in shop_done: `Vi återbetalar summan inom 14 dagar till det kort eller konto som du betalade med.` → `Vi betalar tillbaka beloppet inom 14 dagar till det kort eller konto som du betalade med.`
    Fix in shop_email_body: `Vi återbetalar summan inom 14 dagar med samma betalningssätt som du använde.` → `Vi betalar tillbaka beloppet inom 14 dagar till samma betalningssätt som du använde.`

14. **shop_expired**. "Tiden på 14 dagar för att annullera …" is wordy. Konsumentskyddslagen in Swedish calls this period "ångerfrist", which owners also see in other webshops.
    Fix: `Tiden på 14 dagar för att annullera den här beställningen har gått ut.` → `Ångerfristen på 14 dagar för den här beställningen har gått ut.`

15. **shop_accessibility_html**. "granskades {checked_date}:" needs "den" before a date, the same way shop_done already writes "den {date}".
    Fix: `<p>Webbutiken granskades {checked_date}:</p>` → `<p>Webbutiken granskades den {checked_date}:</p>`

## Notes, not counted (for Assaf / the editor)

- **shop_cancel_link / shop_cancel_title "Annullera en beställning".** This is correct Finland-Swedish and matches the master. However, the 19.6.2026 rule (laki 31/2026, KSL 6:14 a §) only asks for a "clearly labelled" function, and the consumer-law word in Swedish is *ångerrätt / ångra köpet*. "Ångra en beställning" would tie the button to the legal right. I would keep "Annullera" unless the editor prefers to align the wording with the law. No factual problem either way.
- **Gerbyntie 18.** The official Swedish street name in bilingual Vasa is *Gerbyvägen*. The brief explicitly keeps "Gerbyntie 18", so I left it as is. Mention it only if Assaf wants the Swedish address form.
- **Master fact risk (outside this translation, affects FI/SV/EN equally).** The master says **"Calls are not recorded"**. CLAUDE.md (Clinic Phone Line → Call recordings, 09-10-2026) says Retell records every AI call (`data_storage_setting: everything`, deleted after 30 days) and the dashboard has a ▶ Play recording button. regulation_research.md §11 also lists "callers are not told the call is recorded" as a gap. Unless recording was switched off after 09-10-2026, this sentence is false in every language and must be fixed in the master before push.
