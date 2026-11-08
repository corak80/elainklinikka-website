# Regulation research for the elainklinikkasaari.fi audit (status 08-11-2026)

Legend: **VERIFIED** = read in the official text or on the authority's own page. **PARTLY** = official source found but a detail (e.g. § number) not read. **UNVERIFIED** = not confirmed.

## 1. Cookies in Finland (SVPL 917/2014, 205 §; Traficom)
- **Rule:** Every non-essential cookie or "cookie-like technique" needs prior consent. Analytics cookies are listed as non-essential, and legitimate interest is not a lawful basis. VERIFIED: https://www.kyberturvallisuuskeskus.fi/fi/toimintamme/saantely-ja-valvonta/evasteet (page updated 12-10-2026; guidance in force since 13.9.2021).
- **Reject on the first layer:** Yes. In the Telia decision (21.11.2023, Dnro TRAFICOM/12792/09.00.01/2021), Traficom ordered Telia to let users refuse non-essential cookies on the banner's first level. A first layer with only "Accept all" and "Settings" is equated with a pre-ticked box (Planet49 C-673/17), so accepting must not be easier than refusing. VERIFIED: https://kyberturvallisuuskeskus.fi/sites/default/files/media/file/Telia%20Finland%20Oyj.pdf. The general guidance only says refusing must be "easy". The first-layer requirement comes from the decision.
- **Withdrawal:** Must be as easy as giving consent. If a banner was used, it must be easy to bring back, for example through an icon or link on the site, so in practice a persistent link. Withdrawal must actually stop or delete the storage. VERIFIED (same Traficom page).
- **Pixels:** Tracking pixels and tags are "cookie-like techniques". They are normally not strictly necessary, so they need consent even when they store nothing. Suomalainen Kirjakauppa decision, 29.9.2022: https://kyberturvallisuuskeskus.fi/sites/default/files/media/regulation/Suomalainen%20Kirjakauppa%20Oy.pdf. VERIFIED.
- **Traficom decisions 2023–2026:** Telia 21.11.2023, Lippupiste 28.5.2024, A-lehdet 7.6.2024, Foreca 12.6.2024, Silmäasema 16.10.2025. No 2026 Traficom cookie decision was found.
- **Data Protection Ombudsman (GDPR side):**
  - **Mindemo Oy (formerly Heltti), TSV/303/2022, 2.10.2026:** Meta Pixel, GA4/Ads, Microsoft/LinkedIn tags were running on an appointment-booking flow. Breaches of GDPR art 5(1)(f), 25 and 32. Reprimand plus a €33,000 fine. Cookie consent did not shift responsibility away from the controller. Not final. https://www.edilex.fi/tsv/20260032 VERIFIED.
  - **Yliopiston Apteekki, 27.5.2025:** About €1.1M fine for Google and Meta trackers in its web pharmacy (art 5(1)(f), 32). https://www.edpb.europa.eu/news/finnish-sa-pharmacy-company-yliopiston-apteekki-issued-administrative-fine-for-online-shop_ga. One secondary source says a Helsinki court later overturned the fine because the pharmacy is public sector. UNVERIFIED.
- **Changed/pending:** Only the Digital Omnibus (item 3). Nothing in force.

## 2. Consent Mode v2 "advanced", pixels, EDPB 2/2023
- **EDPB Guidelines 2/2023 on the technical scope of Art 5(3):** The final text is **Version 2.0, adopted 7 October 2024**. Section 3.1 "URL and pixel tracking" brings pixels within Art 5(3): delivering the pixel is storage, at least through caching, and an instruction to the device to send identifiers back. Script-driven sending of device information is covered too. https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf VERIFIED.
- **Effect on "advanced" mode:** gtag.js loads and makes the browser send cookieless pings before consent. Under the EDPB reading, and Traficom's own pixel/tag position in Suomalainen 2022, this is a 5(3) access that needs consent unless it is strictly necessary. Analytics and ads are not strictly necessary. This is an inference: no Finnish or Nordic DPA has ruled on Consent Mode by name (none found = UNVERIFIED). Basic mode (no Google tag before consent) is the defensible setting.
- **Nordic precedents:**
  - **IMY Sweden, 30.8.2024:** Apoteket fined SEK 37M and Apohem SEK 8M over Meta Pixel "advanced matching" (GDPR art 32). https://www.imy.se/en/news/administrative-fines-against-apoteket-and-apohem-for-transferring-personal-data-to-meta/ VERIFIED.
  - **Danish Datatilsynet, 21.9.2022:** Google Analytics unlawful without supplementary measures because of US transfers. That basis was largely overtaken by the EU-US Data Privacy Framework adequacy decision of 10.7.2023. https://huntonak.com/privacy-and-information-security-law/danish-dpa-declares-use-of-google-analytics-unlawful-without-supplementary-measures (secondary source).

## 3. EU Digital Omnibus
- **Data/GDPR/cookie part, COM(2025) 837, procedure 2025/0360(COD):** Proposed 19.11.2025. **Not adopted; no trilogue yet.**
  - **Parliament:** ITRE+LIBE draft report 22.6.2026; more than 1,750 amendments tabled.
  - **Council:** Negotiating mandate 21.10.2026.
  - **Sources:** https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (updated 25.10.2026) and https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-regulation-proposal. VERIFIED.
  - **Commission draft:** Moves terminal-equipment rules into the GDPR (art 88a). Consent exemptions for aggregated audience measurement and security. One-click refusal. A 6-month wait before re-asking. Browser/OS signals (art 88b).
  - **Council mandate:** Keeps the rules in the ePrivacy Directive. Adds more consent-free purposes, including contextual-ad measurement without personal data. Requires refusal by a single click. Cuts the re-ask wait to 4 months. Source: https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/data-protection/eu-digital-omnibus-european-council-adopts-its-position/ (secondary). The report that the browser signal was dropped is secondary only (ppc.land): UNVERIFIED.
  - **Timing:** Trilogues are not expected before about March 2027. **Today's rules apply.**
- **AI part:** **Regulation (EU) 2026/1744** (Digital Omnibus on AI). Published in the OJ 24.7.2026, **in force 27.7.2026**. Annex III high-risk duties moved to 2.12.2027 and others to 2.8.2028. Art 50(2) watermarking gets a grace period to 2.12.2026 for systems already on the market. **Art 50(1) was not postponed.** https://eur-lex.europa.eu/eli/reg/2026/1744/oj and https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus/

## 4. AI Act Art 50(1): chatbot and voice agent
- **Rule:** Reg (EU) 2024/1689 art 50(1). Providers must design an AI system that talks directly with people so that people are told they are dealing with AI, unless that is obvious. Art 50(5): the information must be clear and given at the latest at the first interaction. **Applies from 2.8.2026, not postponed** (see item 3). https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- **Finland:** Laki eräiden tekoälyjärjestelmien valvonnasta **1377/2025**, in force 1.1.2026.
  - 5 §: **Traficom** supervises art 50.
  - 22 §: administrative fine for breaching art 50(1), set by Traficom's sanctions board, max €15M or 3%.
  - https://www.finlex.fi/api/media/statute/898466/mainPdf/main.pdf VERIFIED.
- **What the clinic must do:**
  - The WhatsApp bot and the phone agent each say "you are talking to an AI" at the start of the first contact. The phone line already does this.
  - The site's chatbot and phone pages say the same.
  - The clinic is the provider of its own bot (built in-house on Claude). For Retell, it is at least the deployer that configures the agent, so in practice the duty sits with the clinic.

## 5. Accessibility (EAA 2019/882) in Finland
- **Where it is implemented:** Consumer e-commerce services fall under **digipalvelulaki 306/2019, chapter 3 a** (plus Government Decree 179/2023). Law 102/2023 covers products and some other services. Applies from **28.6.2025**. Online shops must have an **accessibility statement** that includes a general description of the service and how the service-specific requirements are met. The shop must also give accessibility information for the products it sells where the manufacturer has supplied it. The technical standard is EN 301 549, in practice WCAG 2.1 AA. A feedback channel is required. https://www.saavutettavuusvaatimukset.fi/fi/palvelukohtaiset-vaatimukset-ja-velvoitteet (updated 15.4.2026) VERIFIED.
- **Microenterprise exemption:** A microenterprise has fewer than 10 employees AND turnover or balance sheet total of at most €2M. Micros are exempt for services. https://www.traficom.fi/fi/traficom/esteettomyys/uudet-esteettomyysvaatimukset
- **Saari:** With about 25 staff it is **not** a microenterprise, so the turnover figure doesn't matter.
- **What is in scope:** kauppa.saarivet.fi = e-commerce service, **in scope**. A purely informational clinic site is not an "e-commerce service". Online booking that concludes a consumer contract for a vet visit arguably is. It runs on my.provet.com, so it is shared with Provet. This is interpretation: UNVERIFIED.
- **Supervisor:** **Traficom** (Digital Accessibility Supervision Unit). Supervision was centralised from ESAVI to Traficom on 1.1.2025. The 1.1.2026 Lupa- ja valvontavirasto reform does **not** apply here. https://www.saavutettavuusvaatimukset.fi/

## 6. Provider information and the regulated profession
- **SVPL 917/2014, 176 §** (old 458/2002 7 §, now repealed): name, geographic address, email, business ID/register, VAT number, and for a regulated profession: professional body, professional title and the state that granted it, and a reference to the professional rules and where to find them. Laws 177–178 § cover pre-order information and terms. Section numbers confirmed in HE 14/2022, which describes the "176–178 §" provisions: https://www.eduskunta.fi/pdf/HE+14/2022. PARTLY (consolidated wording not read).
- **Services Act 1166/2009, 7 §:** Name, legal form, contact details, register and business ID, VAT number, licensing authority, liability insurance if required, standard terms. PARTLY: https://www.gtai.de/de/trade/finnland/recht/informationen-zur-qualifikation-des-dienstleisters-86016
- **Veterinarians:** Licensing and supervision are by **Ruokavirasto** under the Veterinary Practice Act 29/2000. https://www.ruokavirasto.fi/elaimet/elainlaakaripalvelut/elainlaakareiden-valvonta/ (25.5.2026) VERIFIED. On 1.1.2026 the AVIs' animal-health and food tasks moved to Ruokavirasto, not to the new LVV. Title "eläinlääkäri" (laillistettu), granted in Finland; professional rules 29/2000. Suomen Eläinlääkäriliitto is a voluntary association, so name it only as membership.
- **Changed law:** **Eläinlääkintähuoltolaki 285/2023 replaced 765/2009 from 1.1.2026.** https://www.edilex.fi/lainsaadanto/20230285 and https://sell.fi/elainlaakintahuoltolaki/ VERIFIED. There is no separate "laki eläinlääkäripalveluista". The 285/2023 23 § "Ilmoitusvelvollisuus" exists, but its content for private providers was not read: UNVERIFIED.

## 7. Record retention
- **Patient records:** 29/2000 15 § as amended by **286/2023**: "at least **three years** from the last entry". Retention responsibility lies with the provider company under 285/2023 (25 §). An MMM decree may add detail; one on the veterinary patient register was in draft in 2025, final status UNVERIFIED. https://data.finlex.fi/api/media/statute/11371/mainPdf/main.pdf VERIFIED.
- **Medicine records under EU 2019/6:**
  - Art 103(3)–(5): retailer records of prescription veterinary medicine transactions, kept for **5 years**.
  - Art 108(5): records kept by owners and keepers of food-producing animals, at least 5 years.
  - Art 105: prescription content, no retention rule.
  - Finnish vets keep records "per art 103(3)" under laki eläinten lääkitsemisestä 387/2014, 21 §. PARTLY (from a draft text).
  - https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019R0006 VERIFIED.

## 8. Advertising and distance selling of veterinary medicines
- **Advertising:** Reg 2019/6 art 120(1): prescription-only veterinary medicines may be advertised **only to vets and persons permitted to supply them**. Art 119 covers all advertising: it must follow the SPC, must not mislead, must encourage responsible use. Art 4(40): "advertising" = any representation made **to promote supply, sale, prescription or use**. VERIFIED (EUR-Lex link above).
- **The line:** Neutral, balanced disease information that names options, uses active substances and gives no promotional claim, no price and no call to action is information. Brand-led promotion by a clinic that prescribes and supplies the product is advertising. In practice, use the active substance (fluralaner, bedinvetmab, deslorelin) or the brand only inside neutral clinical information. This is interpretation. Fimea has no published veterinary-specific guidance; its marketing page covers human medicines (https://fimea.fi/en/supervision/supervision-of-pharmaceutical-marketing). The national lääkelaki section for veterinary advertising was not confirmed: UNVERIFIED.
- **Distance selling:** Art 104: only persons allowed to retail veterinary medicines (in Finland, pharmacies) may sell non-prescription veterinary medicines online. They need the **common EU logo** on every relevant page, linked to the national list, plus the authority's contact details. The webshop must not sell any veterinary medicinal product. The Finnish pharmacy-only retail section number is UNVERIFIED.

## 9. Consumer reviews
- **Rule:** KSL 38/1978 **2 luku 8 e §**: when reviews are shown, the business must state whether it checks that they come from real users or buyers, and how.
- **Blacklist:** VN asetus 601/2008, 1 § points 26–27 (UCPD Annex I 23b/23c). Points 26–27 ban claiming reviews are genuine without reasonable checks, and ban fake or **distorted** reviews. Showing only positive reviews while hiding negative ones is "distorting".
- **Source:** Omnibus implementation HE 14/2022: https://www.eduskunta.fi/pdf/HE+14/2022 VERIFIED. In force since 2022; exact date UNVERIFIED.
- **For the reviews page:** Say that the quotes are copied from Google, that the clinic does not verify the authors, and how the quotes were chosen, or link the full Google profile.

## 10. Webshop consumer information
- **ODR link:** Reg (EU) **2024/3228** repealed Reg 524/2013 from **20.7.2025**. The duty to link the ODR platform ended, so **remove the link**, which now points to a dead service. https://eur-lex.europa.eu/eli/reg/2024/3228/oj/eng VERIFIED.
- **Kuluttajariitalautakunta:** Still required (ADR Directive 2013/11 art 13). Name it on the website and in the terms. https://www.yrittajat.fi/uutiset/viranomainen-muistuttaa-yrityksia-ala-unohda-tata-kuluttajan-kannalta-tarkeaa-tietoa/. The KSL § number is UNVERIFIED (probably 2 luku 8 b §).
- **Price reductions:** **KSL 2 luku 11 §** (not 8 b §). Show the lowest price of the previous 30 days. There is an exception for campaigns of at most 60 days with stepped discounts, and perishable food is exempt. HE 14/2022 VERIFIED.
- **Withdrawal function:** Directive 2023/2673 is implemented by **laki 31/2026**, which adds **KSL 6 luku 14 a §** (plus 6:9 point 10), **in force 19.6.2026**.
  - The function must be clearly labelled and always visible on the online interface for the whole withdrawal period.
  - The consumer gives their name, the contract and a contact channel, then confirms.
  - The business must send an immediate acknowledgement on a durable medium with the date and time.
  - https://www.edilex.fi/saadoskokoelma/20260031.pdf VERIFIED.
  - Also note law **573/2026** (HE 47/2026, green transition): in force 31.7.2026, partly from 27.9.2026.

## 11. Recorded AI phone calls
- **Information duty:** GDPR art 13 applies at the moment of collection, so callers must be told **at the start**: that the call is recorded, why, the legal basis, who receives it (Retell as processor and its sub-processors), how long it is kept (30 days), and their rights.
- **Guidance:** EDPB SME guide: https://www.edpb.europa.eu/sme-data-protection-guide/faq-frequently-asked-questions/answer/can-i-record-telephone_fi. Finnish industry practice: a short recorded notice before the call starts (ASML 2025). No tietosuoja.fi guidance page was found: UNVERIFIED.
- **Access requests:** DPA decision TSV/5836/2025, 2.3.2026 (Suomen Numerokeskus): a recording is personal data, and refusing a copy breached art 15, giving a €5,000 fine. https://www.edilex.fi/tsv/20260005 VERIFIED.
- **Saari's gap:** Callers are currently **not** told the call is recorded (per CLAUDE.md), so this is a gap. AI Act art 50(1) also applies (item 4).

## 12. Company names
- **Lindorff in Finland:** It did **not** become Intrum. The EU required Lindorff's Finnish business to be divested as a condition of the Intrum merger (https://www.intrum.com/investors/financial-info/intrum-justitia-and-lindorff). Lowell bought it, and the entity is now **Lowell Suomi Oy (formerly Lindorff Oy), business ID 0140351-4**, based in Turku. Source is a directory, not checked in YTJ: PARTLY. Whether Lowell still offers a consumer instalment ("erämaksu") product: UNVERIFIED. Check the actual provider before naming it.
- **ProvetCloud:** The terms of service name **Nordhealth Finland Oy**, Bulevardi 21, 00180 Helsinki (terms effective 17.9.2026). https://www.provet.com/legal/terms-of-service VERIFIED. Finnish Net Solutions and Three Plus Group were renamed Nordhealth in April 2021 (https://nordhealth.com/news/we-are-now-called-nordhealth/). The brand is now "Provet" (provet.com). Business ID not shown: check YTJ.
