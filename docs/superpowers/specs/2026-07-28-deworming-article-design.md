# Deworming article — design & content spec

**Date:** 2026-07-28
**Goal:** Replace the retired `/uudet-pienelainten-madotussuositukset/` → `/artikkelit/` (index) redirect with a fresh, authoritative deworming article, and point the redirect straight at it. Turns a "Page with redirect" GSC entry into a live, indexable page on a high-intent local SEO topic (*koiran madotus* / *kissan madotus*).

## Sourcing
Grounded in current Finnish official / professional guidance:
- **Ruokavirasto** — mandatory echinococcus treatment (praziquantel 1–5 days / 24–120 h before entry to Finland; 28-day rule for frequent travellers); Finland is echinococcus-free.
- **ESCCAP-aligned Finnish vet guidance** (Orion, Inuvet) — shift from routine to **risk-based / fecal-testing**; puppy/kitten schedules; adult frequency by risk; roundworm zoonosis.

## Article
- **Titles:** FI "Koiran ja kissan madotus — milloin ja kuinka usein?" · SV "Avmaskning av hund och katt — när och hur ofta?" · EN "Deworming Dogs and Cats — When and How Often?"
- **Slugs:** FI `koiran-ja-kissan-madotus` · SV `avmaskning` · EN `deworming`
- **Category:** `health` · **Tag:** `articles.filter.health`
- **i18n prefix:** `article.deworming`
- **Sections:** `intro`, `dogs.title`/`dogs.text`, `cats.title`/`cats.text`, `risk.title`/`risk.text`, `parasites.title`/`parasites.text`, `travel.title`/`travel.text`, `cta.text`
- **htmlSections:** `dogs.text`, `cats.text`, `risk.text`, `parasites.text`, `travel.text` (contain `<strong>`, `<br>`, links)
- **Cross-links:** travel section → vaccination article (FI `/articles/rokotukset.html`, SV `/sv/artiklar/vaccinationsguide.html`, EN `/en/articles/vaccinations-guide.html`), which already owns the travel/echinococcus detail.

## Integration steps
1. Add `article.deworming.*` keys (fi/sv/en) to `js/main.src.js`.
2. Add article entry to `articles[]` in `build-articles.js`.
3. Add article card + `.article-content` block to `index.html` (+ `sv/index.html`, `en/index.html` mirrors) matching the vaccination article's markup.
4. Rebuild `js/main.js` from `main.src.js` (esbuild).
5. Run `build-articles.js` to generate the 3 per-language HTML pages + sitemap. **Watch for drift** (known: raw rebuild can revert hand fixes + blanket-bump `dateModified`) — diff and backport if needed.
6. Flip redirect in `redirects/slug_map.json`: `/uudet-pienelainten-madotussuositukset/` → `/articles/koiran-ja-kissan-madotus.html`; redeploy the `elainklinikkasaari-slugs` Cloudflare worker.
7. Commit + push (GitHub Pages), purge Cloudflare cache.
8. Verify: FI/SV/EN pages 200, old slug 301s to new FI article, sitemap includes all three, hreflang correct.

## Content (FI / SV / EN)

### intro
- **FI:** Madotus eli sisäloishäätö suojaa lemmikkiä suolistoloisilta, joista osa voi tarttua myös ihmiseen. Suomessa madotussuositukset ovat viime vuosina muuttuneet: tavoitteena ei ole lääkitä turhaan, vaan häätää loiset oikeaan aikaan ja oikealla tavalla. Nykysuositus on riskiperustainen — aikuista, matalan riskin lemmikkiä ei tarvitse madottaa rutiininomaisesti monta kertaa vuodessa, vaan hoito kohdennetaan ulostenäytteen ja elämäntavan perusteella. Pennut, kissanpennut ja riskiryhmiin kuuluvat lemmikit tarvitsevat sen sijaan säännöllistä loishäätöä.
- **SV:** Avmaskning skyddar husdjuret mot tarmparasiter, varav en del även kan smitta människor. I Finland har avmaskningsrekommendationerna förändrats under de senaste åren: målet är inte att medicinera i onödan, utan att avlägsna parasiterna vid rätt tidpunkt och på rätt sätt. Den nuvarande rekommendationen är riskbaserad — ett vuxet husdjur med låg risk behöver inte avmaskas rutinmässigt flera gånger om året, utan behandlingen riktas utifrån avföringsprov och levnadssätt. Valpar, kattungar och djur i riskgrupper behöver däremot regelbunden avmaskning.
- **EN:** Deworming protects your pet from intestinal parasites, some of which can also infect people. In Finland, deworming recommendations have changed in recent years: the goal is not to medicate unnecessarily, but to remove parasites at the right time and in the right way. The current recommendation is risk-based — a low-risk adult pet does not need routine deworming several times a year; instead, treatment is targeted based on a fecal test and the animal's lifestyle. Puppies, kittens and pets in risk groups, however, need regular deworming.

### dogs.title
- **FI:** Koirien madotus · **SV:** Avmaskning av hundar · **EN:** Deworming Dogs

### dogs.text
- **FI:** `<strong>Pennut:</strong>` Ensimmäinen madotus jo `<strong>`2 viikon iässä`</strong>`, sen jälkeen `<strong>`2 viikon välein vieroitukseen asti`</strong>` ja tämän jälkeen `<strong>`kerran kuukaudessa 6 kuukauden ikään`</strong>`. Emä madotetaan samaan aikaan pentujen kanssa, sillä loiset voivat tarttua pentuihin jo tiineyden tai imetyksen aikana.`<br><br><strong>`Aikuiset koirat:`</strong>` Matalan riskin kotikoiralle `<strong>`1–2 kertaa vuodessa`</strong>` riittää usein, mieluiten ulostenäytteeseen perustuen. Korkean riskin koirille — metsästys-, matkustus- ja kennelkoirat sekä ulkona vapaana liikkuvat ja ulosteita tai maata syövät koirat — suositellaan loishäätöä jopa `<strong>`4 kertaa vuodessa`</strong>`, ja metsästyskaudella heisimatoja vastaan tarvittaessa kuukausittain.
- **SV:** `<strong>`Valpar:`</strong>` Första avmaskningen redan vid `<strong>`2 veckors ålder`</strong>`, därefter `<strong>`varannan vecka fram till avvänjningen`</strong>` och sedan `<strong>`en gång i månaden till 6 månaders ålder`</strong>`. Tiken avmaskas samtidigt som valparna, eftersom parasiter kan överföras till valparna redan under dräktigheten eller digivningen.`<br><br><strong>`Vuxna hundar:`</strong>` För en familjehund med låg risk räcker det ofta med `<strong>`1–2 gånger om året`</strong>`, helst utifrån avföringsprov. För högriskhundar — jakt-, res- och kennelhundar samt hundar som rör sig fritt utomhus och äter avföring eller jord — rekommenderas avmaskning upp till `<strong>`4 gånger om året`</strong>`, och under jaktsäsongen vid behov månatligen mot bandmask.
- **EN:** `<strong>`Puppies:`</strong>` First deworming already at `<strong>`2 weeks of age`</strong>`, then `<strong>`every 2 weeks until weaning`</strong>`, and after that `<strong>`once a month until 6 months of age`</strong>`. The mother is dewormed at the same time as the puppies, because parasites can pass to puppies during pregnancy or nursing.`<br><br><strong>`Adult dogs:`</strong>` For a low-risk family dog, `<strong>`1–2 times a year`</strong>` is often enough, preferably based on a fecal test. For high-risk dogs — hunting, travelling and kennel dogs, as well as dogs that roam freely outdoors and eat feces or soil — deworming up to `<strong>`4 times a year`</strong>` is recommended, and monthly against tapeworm during the hunting season if needed.

### cats.title
- **FI:** Kissojen madotus · **SV:** Avmaskning av katter · **EN:** Deworming Cats

### cats.text
- **FI:** `<strong>`Kissanpennut:`</strong>` Ensimmäinen madotus `<strong>`3 viikon iässä`</strong>`, sen jälkeen `<strong>`2 viikon välein`</strong>` kunnes vieroituksesta on kulunut kaksi viikkoa, ja tämän jälkeen `<strong>`kuukausittain 6 kuukauden ikään`</strong>`.`<br><br><strong>`Aikuiset kissat:`</strong>` Sisäkissalle riittää yleensä `<strong>`1–2 kertaa vuodessa`</strong>`, mieluiten ulostenäytteen perusteella. Ulkona liikkuvalle ja etenkin jyrsijöitä saalistavalle kissalle suositellaan `<strong>`4 kertaa vuodessa`</strong>` — aktiivisesti saalistavalle jopa kuukausittain, sillä jyrsijät levittävät heisimatoja.
- **SV:** `<strong>`Kattungar:`</strong>` Första avmaskningen vid `<strong>`3 veckors ålder`</strong>`, därefter `<strong>`varannan vecka`</strong>` tills två veckor har gått sedan avvänjningen, och sedan `<strong>`månatligen till 6 månaders ålder`</strong>`.`<br><br><strong>`Vuxna katter:`</strong>` För en innekatt räcker det oftast med `<strong>`1–2 gånger om året`</strong>`, helst utifrån avföringsprov. För utekatter och särskilt katter som jagar gnagare rekommenderas `<strong>`4 gånger om året`</strong>` — för aktivt jagande katter till och med månatligen, eftersom gnagare sprider bandmask.
- **EN:** `<strong>`Kittens:`</strong>` First deworming at `<strong>`3 weeks of age`</strong>`, then `<strong>`every 2 weeks`</strong>` until two weeks after weaning, and after that `<strong>`monthly until 6 months of age`</strong>`.`<br><br><strong>`Adult cats:`</strong>` For an indoor cat, `<strong>`1–2 times a year`</strong>` is usually enough, preferably based on a fecal test. For outdoor cats, and especially cats that hunt rodents, `<strong>`4 times a year`</strong>` is recommended — even monthly for actively hunting cats, as rodents spread tapeworm.

### risk.title
- **FI:** Riskiryhmät ja ulostenäyte · **SV:** Riskgrupper och avföringsprov · **EN:** Risk Groups and Fecal Testing

### risk.text
- **FI:** Loishäädön tarve arvioidaan yksilöllisesti elämäntavan perusteella. Suurentunut riski on `<strong>`alle vuoden ikäisillä`</strong>` pennuilla ja kissanpennuilla, ulkona vapaana liikkuvilla, metsästävillä ja saalistavilla lemmikeillä sekä eläimillä, jotka syövät ulosteita, raakaa lihaa tai jyrsijöitä. Turhaa lääkitystä pyritään kuitenkin välttämään: aikuiselle, matalan riskin lemmikille suositellaan `<strong>`ulostenäytettä`</strong>`, josta selviää, onko loisia — jos näyte on puhdas, madotusta ei tarvita. Suosittelemme ulostenäytettä aikuisille lemmikeille kerran vuodessa madotuksen tarpeen arvioimiseksi.
- **SV:** Behovet av avmaskning bedöms individuellt utifrån levnadssättet. Förhöjd risk har `<strong>`valpar och kattungar under ett år`</strong>`, djur som rör sig fritt utomhus, jagar eller fångar byte samt djur som äter avföring, rått kött eller gnagare. Onödig medicinering undviks dock: för ett vuxet husdjur med låg risk rekommenderas `<strong>`avföringsprov`</strong>` som visar om det finns parasiter — är provet rent behövs ingen avmaskning. Vi rekommenderar avföringsprov för vuxna husdjur en gång om året för att bedöma behovet av avmaskning.
- **EN:** The need for deworming is assessed individually based on lifestyle. Higher risk applies to `<strong>`puppies and kittens under one year`</strong>`, animals that roam freely outdoors, hunt or catch prey, and animals that eat feces, raw meat or rodents. Unnecessary medication is avoided, however: for a low-risk adult pet, a `<strong>`fecal test`</strong>` is recommended to show whether parasites are present — if the sample is clean, no deworming is needed. We recommend a fecal test once a year for adult pets to assess the need for deworming.

### parasites.title
- **FI:** Yleisimmät suolistoloiset Suomessa · **SV:** De vanligaste tarmparasiterna i Finland · **EN:** The Most Common Intestinal Parasites in Finland

### parasites.text
- **FI:** `<strong>`Suolinkaiset (Toxocara)`</strong>` ovat yleisin pentujen ja kissanpentujen loinen. Ne voivat tarttua myös ihmiseen, minkä vuoksi loishäädöstä huolehtiminen on tärkeää etenkin lapsiperheissä. `<strong>`Heisimadot`</strong>` tarttuvat useimmiten jyrsijöitä tai raakaa lihaa syöville eläimille. `<strong>`Giardia`</strong>`-alkueläin aiheuttaa ripulia ja tarttuu ulosteen saastuttamasta vedestä tai ympäristöstä. Ekinokokki-heisimatoa `<strong>`ei esiinny Suomessa`</strong>`, ja tuontivaatimusten tarkoitus on pitää tilanne tällaisena.
- **SV:** `<strong>`Spolmask (Toxocara)`</strong>` är den vanligaste parasiten hos valpar och kattungar. Den kan även smitta människor, vilket gör avmaskning viktigt särskilt i barnfamiljer. `<strong>`Bandmask`</strong>` smittar oftast djur som äter gnagare eller rått kött. `<strong>`Giardia`</strong>` är en encellig parasit som orsakar diarré och smittar via vatten eller miljö förorenad med avföring. Rävens dvärgbandmask (echinococcus) `<strong>`förekommer inte i Finland`</strong>`, och syftet med importkraven är att hålla situationen sådan.
- **EN:** `<strong>`Roundworm (Toxocara)`</strong>` is the most common parasite in puppies and kittens. It can also infect humans, which makes deworming important especially in families with children. `<strong>`Tapeworms`</strong>` most often infect animals that eat rodents or raw meat. `<strong>`Giardia`</strong>` is a protozoan that causes diarrhea and spreads through water or an environment contaminated with feces. The echinococcus tapeworm `<strong>`does not occur in Finland`</strong>`, and the purpose of import requirements is to keep it that way.

### travel.title
- **FI:** Matkustaminen ja pakollinen ekinokokkilääkitys · **SV:** Resor och obligatorisk echinococcusbehandling · **EN:** Travel and Mandatory Echinococcus Treatment

### travel.text
- **FI:** Suomeen palaavalle koiralle on `<strong>`lakisääteinen ekinokokkilääkitys`</strong>`: pratsikvanteli (tai muu vastaava valmiste) annetaan `<strong>`1–5 vuorokautta (24–120 tuntia) ennen Suomeen saapumista`</strong>`. Usein matkustaville koirille on vaihtoehtona `<strong>`28 vuorokauden sääntö`</strong>`: kaksi aloituskäsittelyä, minkä jälkeen lääkitys toistetaan enintään 28 vuorokauden välein ja viimeinen annos annetaan Suomessa matkan päätyttyä. Lue lisää matkustusvaatimuksista ja EU-lemmikkipassista `<a href="/articles/rokotukset.html">`rokotusartikkelistamme`</a>`. Hoidamme ekinokokkilääkitykset ja matkustusasiakirjat klinikallamme.
- **SV:** För en hund som återvänder till Finland är `<strong>`echinococcusbehandling lagstadgad`</strong>`: prazikvantel (eller ett annat motsvarande preparat) ges `<strong>`1–5 dygn (24–120 timmar) före ankomsten till Finland`</strong>`. För hundar som reser ofta finns `<strong>`28-dygnsregeln`</strong>` som alternativ: två inledande behandlingar, varefter behandlingen upprepas med högst 28 dygns mellanrum och den sista dosen ges i Finland efter resan. Läs mer om reskraven och EU-passet i vår `<a href="/sv/artiklar/vaccinationsguide.html">`vaccinationsartikel`</a>`. Vi sköter echinococcusbehandlingar och resedokument på vår klinik.
- **EN:** For a dog returning to Finland, `<strong>`echinococcus treatment is required by law`</strong>`: praziquantel (or another equally effective product) is given `<strong>`1–5 days (24–120 hours) before arrival in Finland`</strong>`. For frequently travelling dogs, the `<strong>`28-day rule`</strong>` is an alternative: two initial treatments, after which treatment is repeated at intervals of no more than 28 days, with the final dose given in Finland after the trip. Read more about travel requirements and the EU pet passport in our `<a href="/en/articles/vaccinations-guide.html">`vaccination article`</a>`. We handle echinococcus treatments and travel documents at our clinic.

### cta.text
- **FI:** Epävarma, tarvitseeko lemmikkisi madotusta? Varaa aika ulostenäytteeseen tai loishäätöön — autamme arvioimaan oikean hoidon lemmikkisi elämäntavan mukaan.
- **SV:** Osäker på om ditt husdjur behöver avmaskning? Boka tid för avföringsprov eller avmaskning — vi hjälper dig att bedöma rätt behandling utifrån ditt husdjurs levnadssätt.
- **EN:** Not sure whether your pet needs deworming? Book an appointment for a fecal test or deworming — we'll help you determine the right treatment based on your pet's lifestyle.
