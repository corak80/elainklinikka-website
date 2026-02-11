/* ============================================
   Eläinklinikka Saari - Main JavaScript
   Language switching, mobile menu, interactions
   ============================================ */

// --- Translation Data ---
const translations = {
  // Navigation
  'nav.about': { fi: 'Klinikka', sv: 'Klinik', en: 'Clinic' },
  'nav.services': { fi: 'Palvelut', sv: 'Tjänster', en: 'Services' },
  'nav.team': { fi: 'Henkilökunta', sv: 'Personal', en: 'Staff' },
  'nav.prices': { fi: 'Hinnasto', sv: 'Prislista', en: 'Prices' },
  'nav.wildlife': { fi: 'Wildlife', sv: 'Wildlife', en: 'Wildlife' },
  'nav.contact': { fi: 'Yhteystiedot', sv: 'Kontakt', en: 'Contact' },
  'nav.book': { fi: 'Varaa aika', sv: 'Boka tid', en: 'Book Now' },

  // Notice banner
  'notice': {
    fi: 'Drop-in rokotukset ilman ajanvarausta tiistaisin klo 15.30–16.00',
    sv: 'Drop-in vaccinationer utan tidsbokning på tisdagar kl 15.30–16.00',
    en: 'Drop-in vaccinations without appointment on Tuesdays 3:30–4:00 PM'
  },

  // Hero
  'hero.title1': {
    fi: 'Eläinklinikka',
    sv: 'Djurklinik',
    en: 'Animal Clinic'
  },
  'hero.title2': { fi: 'Saari', sv: 'Saari', en: 'Saari' },
  'hero.subtitle': {
    fi: 'Ammattitaitoista ja lämmintä eläinlääkäripalvelua Vaasassa vuodesta 1989.',
    sv: 'Professionell och varm djursjukvård i Vasa sedan 1989.',
    en: 'Professional and warm veterinary care in Vaasa since 1989.'
  },
  'hero.cta': { fi: 'Varaa aika', sv: 'Boka tid', en: 'Book Appointment' },
  'hero.services': { fi: 'Palvelumme', sv: 'Våra tjänster', en: 'Our Services' },
  'hero.badge.catfriendly': {
    fi: 'Kissaystävällinen klinikka',
    sv: 'Kattvänlig klinik',
    en: 'Cat Friendly Clinic'
  },
  'hero.badge.since': {
    fi: 'Perustettu 1989',
    sv: 'Grundad 1989',
    en: 'Est. 1989'
  },
  'hero.badge.team': {
    fi: '13 ammattilaista',
    sv: '13 specialister',
    en: '13 Professionals'
  },

  // About
  'about.title': { fi: 'Tietoa klinikasta', sv: 'Om kliniken', en: 'About the Clinic' },
  'about.subtitle': {
    fi: 'Vaasan ainoa yksityinen pieneläinklinikka – Pukinkulman Autotalossa vuodesta 1989',
    sv: 'Vasas enda privata smådjursklinik – i Bocks hörna sedan 1989',
    en: 'The only private small animal clinic in Vaasa – in Bock\'s corner since 1989'
  },
  'about.text1': {
    fi: 'Meille potilaan hyvinvointi ja asiakkaan tyytyväisyys ovat tärkeimmät prioriteetit. Pyrimme luomaan lämpimän ja luottamuksellisen suhteen niin asiakkaaseen kuin potilaasenkin.',
    sv: 'För oss är patientens välbefinnande och kundens tillfredsställelse de viktigaste prioriteringarna. Vi strävar efter att skapa en varm och förtroendefull relation till både kunden och patienten.',
    en: 'For us, the welfare of the patient and the satisfaction of the customer are the number one priorities. We strive to create a warm and trusting relationship with both the customer and the patient.'
  },
  'about.text2': {
    fi: 'Ammattitaitoinen hoitotiimimme tarjoaa Teille kokenutta ja asiantuntevaa palvelua aina eläimenne parhaaksi.',
    sv: 'Vårt professionella vårdteam erbjuder Er erfaren och sakkunning service alltid för ert djurs bästa.',
    en: 'Our professional care team offers you experienced and knowledgeable service, always for the best of your pet.'
  },
  'about.catfriendly.title': {
    fi: 'ISFM-sertifioitu kissaystävällinen klinikka',
    sv: 'ISFM-certifierad kattvänlig klinik',
    en: 'ISFM Certified Cat Friendly Clinic'
  },
  'about.catfriendly.text': {
    fi: 'Kansainvälinen kissajärjestö ISFM on myöntänyt meille kissaystävällisen klinikan sertifikaatin.',
    sv: 'Den internationella kattorganisationen ISFM har tilldelat oss certifikat för kattvänlig klinik.',
    en: 'The international cat organization ISFM has awarded us the Cat Friendly Clinic certificate.'
  },
  'about.feature1.title': {
    fi: 'Laaja diagnostiikka',
    sv: 'Bred diagnostik',
    en: 'Comprehensive Diagnostics'
  },
  'about.feature1.text': {
    fi: 'Röntgen, ultraääni, tähystys, laboratorio',
    sv: 'Röntgen, ultraljud, endoskopi, laboratorium',
    en: 'X-ray, ultrasound, endoscopy, laboratory'
  },
  'about.feature2.title': {
    fi: 'Moderni kirurgia',
    sv: 'Modern kirurgi',
    en: 'Modern Surgery'
  },
  'about.feature2.text': {
    fi: 'Ortopedia ja pehmytkudoskirurgia',
    sv: 'Ortopedi och mjukdelskirurgi',
    en: 'Orthopedics and soft tissue surgery'
  },
  'about.feature3.title': {
    fi: 'Sydäntutkimukset',
    sv: 'Hjärtundersökningar',
    en: 'Cardiac Examinations'
  },
  'about.feature3.text': {
    fi: 'Viralliset sydänultraäänitutkimukset',
    sv: 'Officiella hjärtultraljudsundersökningar',
    en: 'Official cardiac ultrasound examinations'
  },
  'about.feature4.title': {
    fi: 'Laaja hammashoito',
    sv: 'Omfattande tandvård',
    en: 'Extensive Dental Care'
  },
  'about.feature4.text': {
    fi: 'Hammasröntgen, poistot ja vaativat tapaukset',
    sv: 'Tandröntgen, extraktioner och komplicerade fall',
    en: 'Dental X-rays, extractions and complicated cases'
  },
  'about.placeholder': {
    fi: 'Klinikan kuva',
    sv: 'Klinikbild',
    en: 'Clinic photo'
  },

  // Services
  'services.title': { fi: 'Palvelumme', sv: 'Våra tjänster', en: 'Our Services' },
  'services.subtitle': {
    fi: 'Tarjoamme monipuoliset eläinlääkäripalvelut lemmikillesi',
    sv: 'Vi erbjuder mångsidiga veterinärtjänster för ditt husdjur',
    en: 'We offer comprehensive veterinary services for your pet'
  },

  // Individual services
  'service.acupuncture': { fi: 'Akupunktio', sv: 'Akupunktur', en: 'Acupuncture' },
  'service.bloodtests': { fi: 'Verikokeet', sv: 'Blodprov', en: 'Blood Tests' },
  'service.dermatology': { fi: 'Ihotaudit ja allergiat', sv: 'Dermatologi och allergier', en: 'Dermatology & Allergies' },
  'service.pregnancy': { fi: 'Tiineystutkimus', sv: 'Dräktighetsdiagnos', en: 'Pregnancy Diagnosis' },
  'service.endoscopy': { fi: 'Tähystystutkimukset', sv: 'Endoskopi', en: 'Endoscopy' },
  'service.food': { fi: 'Rehunmyynti', sv: 'Foderförsäljning', en: 'Feed Sales' },
  'service.wellness': { fi: 'Hyvinvointi ja kuntoutus', sv: 'Friskvård och rehabilitering', en: 'Wellness & Rehabilitation' },
  'service.healthcheck': { fi: 'Terveystarkastukset', sv: 'Hälsogranskning', en: 'Health Examinations' },
  'service.cardiology': { fi: 'Sydänsairaudet', sv: 'Hjärtsjukdomar', en: 'Heart Diseases' },
  'service.castration': { fi: 'Kastraatio', sv: 'Kastrering', en: 'Castration' },
  'service.surgery.dental': { fi: 'Hammaskirurgia', sv: 'Tandkirurgi', en: 'Dental Surgery' },
  'service.surgery.soft': { fi: 'Pehmytkudoskirurgia', sv: 'Mjukdelskirurgi', en: 'Soft Tissue Surgery' },
  'service.surgery.ortho': { fi: 'Ortopedinen kirurgia', sv: 'Ortopedisk kirurgi', en: 'Orthopedic Surgery' },
  'service.laboratory': { fi: 'Laboratorio', sv: 'Laboratorium', en: 'Laboratory' },
  'service.official': { fi: 'Viralliset tutkimukset', sv: 'Officiella undersökningar', en: 'Official Examinations' },
  'service.orthopedics': { fi: 'Ortopedia', sv: 'Ortopedi', en: 'Orthopedics' },
  'service.xray': { fi: 'Röntgen', sv: 'Röntgen', en: 'X-ray' },
  'service.euthanasia': { fi: 'Viimeinen jäähyväinen', sv: 'Sista farväl – eutanasi', en: 'Final Farewell – Euthanasia' },
  'service.sterilization': { fi: 'Sterilisaatio', sv: 'Sterilisering', en: 'Sterilization' },
  'service.dental': { fi: 'Hammashoito', sv: 'Tandvård', en: 'Dental Care' },
  'service.ultrasound': { fi: 'Ultraäänitutkimukset', sv: 'Ultraljud', en: 'Ultrasound' },
  'service.vaccinations': { fi: 'Rokotukset', sv: 'Vaccinationer', en: 'Vaccinations' },
  'service.puppy': { fi: 'Pentutarkastus', sv: 'Valpgranskning', en: 'Puppy Examinations' },
  'service.anesthesia': { fi: 'Anestesia', sv: 'Anestesi', en: 'Anesthesia' },
  'service.hygiene': { fi: 'Hygienia', sv: 'Hygien', en: 'Hygiene' },

  // Service descriptions
  'service.desc.acupuncture': {
    fi: 'Akupunktiota käytetään kivunlievennykseen ja joidenkin tautien hoitoon. Akupunktiota klinikalla tekee Assaf, joka on jatkokouluttautunut koirien ja hevosten akupunktiossa.',
    sv: 'Akupunktur används till smärtlindring och för behandling av vissa sjukdomar. Behandlingen utförs av Assaf, som har vidareutbildning inom akupunktur för hundar och hästar.',
    en: 'Acupuncture is used for pain relief and for the treatment of some diseases. Administered by Assaf, who has completed specialized training in canine and equine acupuncture.'
  },
  'service.desc.bloodtests': {
    fi: 'Klinikallamme on mahdollisuus tutkia lemmikin verinäytteet. Useimmat näytteet tutkimme omassa laboratoriossamme, jolloin saamme vastauksen jo käynnin aikana.',
    sv: 'De flesta prover undersöks i vårt eget laboratorium, så vi får svaret redan under besöket.',
    en: 'Most samples are examined in our own laboratory, so we get the answer already during the visit.'
  },
  'service.desc.dermatology': {
    fi: 'Ihotaudit ovat yksi yleisimmistä syistä hakeutua eläinlääkäriin. Joka kymmenennellä suomalaisella koiralla on allergioita, jotka usein oireilevat ihotulehduksina ja korvatulehduksina. Tyypillisiä oireita ovat tassujen nuoleminen, korvien raapiminen ja kasvojen hankaaminen. Allergiaa epäiltäessä pyritään ensin poissulkemaan ruoka-aineet, ja tarvittaessa otetaan allergiaverinäytteet.',
    sv: 'Dermatologiska sjukdomar är en av de vanligaste orsakerna att uppsöka veterinär. Allergier drabbar ungefär en av tio hundar i Finland och visar sig ofta genom hud- och öroninflammation. Typiska symtom inkluderar tasslickande, öronkliande och ansiktsgnuggning. Vid allergimisstanke försöker vi först utesluta foderallergier, och vid behov tas allergiblodprover.',
    en: 'Skin diseases are one of the most common reasons to seek veterinary care. About one in ten dogs in Finland has allergies, which often cause skin and ear infections. Typical symptoms include paw licking, ear scratching, and face rubbing. When allergy is suspected, we first try to eliminate food as a source, and if necessary collect allergy blood samples.'
  },
  'service.desc.pregnancy': {
    fi: 'Ultraäänitutkimuksella voidaan todeta tiineys noin raskauspäivästä 24. Röntgentutkimuksella voidaan arvioida pentujen lukumäärä tarkemmin, noin raskauspäivästä 50 lähtien.',
    sv: 'Ultraljudsundersökning kan upptäcka dräktighet från dag 24. Röntgenundersökning kan ge en mer exakt bedömning av antalet valpar, från dag 50 och framåt.',
    en: 'Ultrasound pregnancy confirmation is possible from day 24. X-ray examination can estimate the number of puppies more closely, from approximately day 50.'
  },
  'service.desc.endoscopy': {
    fi: 'Klinikalla tehdään video-otoskopia (korvaontelon tähystys ja huuhtelu), rhinoskopia (nenäontelon tähystys), gastroskopia (vatsan ja suoliston tähystys), kystoskopia (virtsateiden tähystys) ja bronkoskopia (hengitysteiden tähystys).',
    sv: 'Vi utför video-otoskopi (öronundersökning och spolning), rhinoskopi (näshåleundersökning), gastroskopi (mag-tarmundersökning), cystoskopi (urinvägsundersökning) och bronkoskopi (luftvägsundersökning).',
    en: 'We perform video-otoscopy (ear canal examination and flushing), rhinoscopy (nasal cavity examination), gastroscopy (gastrointestinal examination), cystoscopy (urinary tract examination) and bronchoscopy (airway examination).'
  },
  'service.desc.food': {
    fi: 'Klinikaltamme löydät lemmikin eri sairauksien hoidossa käytettävät erikoisruokavaliot. Erikoisruokia suositellaan esimerkiksi nivelrikkoon, munuaisten vajaatoimintaan, vatsa- ja suolistovaivoihin, ruoka-aineallergioihin ja painonhallintaan. Merkit: Royal Canin, Specific, Hill\'s.',
    sv: 'På kliniken hittar ni olika specialfoder som används som stöd under sjukdom. Rekommenderas vid bland annat artros, njursvikt, mag-tarmproblem, urinvägssjukdomar, foderallergier och viktkontroll. Märken: Royal Canin, Specific, Hill\'s.',
    en: 'Special therapeutic diets used as part of the treatment of various diseases. Recommended for osteoarthritis, renal failure, gastrointestinal diseases, food allergies, urinary tract diseases, and weight management. Brands: Royal Canin, Specific, Hill\'s.'
  },
  'service.desc.wellness': {
    fi: 'Kuntoutuksen avulla arvioidaan ja pyritään parantamaan eläimen toimintakykyä ja liikkumista. Yleisimmät syyt ovat liikkuvuuden häiriöt, suorituskyvyn alentuminen, trauman jälkeiset kiputilat ja leikkauksen jälkeinen kuntoutus. Palvelut: liikkumisanalyysi, hieronta, elektroterapia, harjoitusohjelmat.',
    sv: 'Med hjälp av friskvård och rehabilitering analyseras och förbättras djurets förmåga till rörelse. De vanligaste orsakerna är funktionsstörningar, nedsatt prestationsförmåga, smärta efter trauma samt rehabilitering efter operationer. Tjänster: rörelseanalys, djupgående massage, elektroterapi, träningsprogram.',
    en: 'Wellness and rehabilitation to analyze and improve the animal\'s function and mobility. Common reasons include reduced mobility, pain following trauma, and post-surgical recovery. Services: gait analysis, deep massage, electrotherapy, customized training programs.'
  },
  'service.desc.healthcheck': {
    fi: 'Terveystarkastuksessa voidaan havaita muutokset jotka voivat pitkällä tähtäimellä aiheuttaa terveysongelmia. Eläinlääkäri tutkii koko eläimen kliinisesti, kuuntelee sydäntä ja keuhkoja sekä tarvittaessa ottaa verinäytteet.',
    sv: 'Under hälsogranskningen kan man upptäcka förändringar som i det långa loppet kan förorsaka hälsoproblem. Veterinären gör en klinisk undersökning, lyssnar på hjärtat och lungorna och vid behov tas blodprover.',
    en: 'During health checks we can detect changes that may cause health problems in the long run. The vet examines the whole animal clinically, listens to the heart and lungs and, if necessary, takes blood samples.'
  },
  'service.desc.cardiology': {
    fi: 'Sydänsairaudet ovat yleisiä erityisesti tietyissä roduissa. Ajoissa aloitettu lääkitys voi pidentää lemmikin elinikää. Klinikalla tehdään sydämen ultraäänitutkimuksia, EKG- ja Holter-tutkimuksia. Teemme myös virallisia sydämen ultraäänitutkimuksia koirille. Klinikalla on viralliset sydämen auskultaatio-oikeudet.',
    sv: 'Hjärtsjukdomar är vanliga särskilt hos vissa raser. Tidig intervention kan förlänga livslängden och förbättra livskvaliteten. Kliniken erbjuder hjärtultraljud, EKG och Holter-monitorering. Vi utför även officiella hjärtultraljudsundersökningar för hundar. Vi har officiella hjärtauskultationsrättigheter.',
    en: 'Heart diseases are common especially in certain breeds. Early medication can extend pet lifespan and improve quality of life. We offer cardiac ultrasound, ECG and Holter monitoring. We also perform official heart ultrasound examinations for dogs. We hold official heart auscultation rights.'
  },
  'service.desc.castration': {
    fi: 'Teemme kissojen, koirien ja kanien kastraatioita. Koiran kastraatiolla voidaan ennaltaehkäistä eturauhasvaivoja ja merkkailua. Tarjolla myös kemiallinen kastraatio hormoni-implantilla (6 tai 12 kk teho).',
    sv: 'Vi kastrerar katter, hundar och kaniner. Kastrering av hund kan motverka prostataproblem och urinmarkering. Kemisk kastrering med hormonimplantat finns också tillgängligt (6 eller 12 månaders effektivitet).',
    en: 'We castrate cats, dogs and rabbits. Dog castration can prevent prostate problems and urine marking. Chemical castration with a hormonal implant is also available (6 or 12-month duration).'
  },
  'service.desc.surgery.dental': {
    fi: 'Hammaskiven poisto ultraäänilaitteella, hammasröntgen, hampaiden kirurgiset poistot sekä maitohampaiden poistot. Kaikki toimenpiteet tehdään yleisanestesiassa inhalaatioanestesialla, suonensisäisellä nesteytyksellä ja kattavalla kivunlievennyksellä.',
    sv: 'Tandstensavlägsnande med ultraljud, tandröntgen, kirurgiska tandutdragningar samt mjölktandsborttagning. Alla ingrepp utförs under generell anestesi med inhalationsanestesi, intravenöst dropp och omfattande smärthantering.',
    en: 'Tartar removal with ultrasound, dental X-rays, surgical tooth extractions and deciduous teeth removals. All procedures under general anesthesia with inhalation anesthesia, intravenous fluids and comprehensive pain management.'
  },
  'service.desc.surgery.soft': {
    fi: 'Sterilisaatiot, kastraatiot, keisarinleikkaukset, kasvainten poistot, vierasesineleikkaukset, virtsakivileikkaukset, muut vatsaonteloleikkaukset sekä silmä- ja korvaleikkaukset.',
    sv: 'Sterilisering, kastrering, kejsarsnitt, tumöroperationer, främmandekroppsoperationer, urinstenar, övriga bukoperationer samt ögon- och öronkirurgi.',
    en: 'Spays, neuters, caesarean sections, tumor removals, foreign body extraction, bladder stone surgery, other abdominal surgeries, and eye and ear procedures.'
  },
  'service.desc.surgery.ortho': {
    fi: 'Klinikalla on oma ortopedinen leikkaussali, jossa on korkeampi steriiliyystaso. Eturistisiteen korjausleikkaukset kahdella menetelmällä: lateral suture -tekniikka stabiloi nivelen synteettisellä tukimateriaalilla, ja TTA (tibial tuberosity advancement) muuttaa polven biomekaniikkaa siirtämällä sääriluun kyhmyä eteenpäin. Lisäksi murtumaleikkaukset, amputaatiot (jalka, häntä, varpaat) sekä reisiluunpään poisto esim. kroonisen luksaation tai Legg-Perthes taudin vuoksi.',
    sv: 'Kliniken har ett dedikerat ortopediskt operationsrum med högre sterilitetsnivå. Korsbandsskadeoperationer med två metoder: lateral sutur-teknik stabiliserar leden med syntetiskt stödmaterial, och TTA (tibial tuberosity advancement) förändrar knäets biomekanik genom att flytta skenbenets utskott framåt. Dessutom frakturkirurgi, amputationer (ben, svans, tår) samt lårbensh­uvudektomi vid t.ex. kronisk luxation eller Legg-Perthes sjukdom.',
    en: 'The clinic has a dedicated orthopedic surgery room with a higher level of sterility. Cranial cruciate ligament repair with two methods: lateral suture technique stabilizes the joint with synthetic support material, and TTA (tibial tuberosity advancement) alters knee biomechanics by advancing the tibial tuberosity forward. Also fracture repairs, amputations (leg, tail, toes) and femoral head ostectomy for chronic luxation or Legg-Perthes disease.'
  },
  'service.desc.laboratory': {
    fi: 'Hyvin varusteltu oma laboratorio: verinäytteet, virtsanäytteet, verisivelyt, iho- ja korvanäytteet. Suurin osa tuloksista jo käynnin aikana. Tutkimuksia: hematologia, kliininen kemia, elektrolyytit, hormonit, virtsaviljelyt, sytologia.',
    sv: 'Välutrustat eget laboratorium: blodprover, urinprover, blodutstryk, hud- och öronprover. De flesta resultat redan under besöket. Analyser: hematologi, klinisk kemi, elektrolyter, hormoner, urinodlingar, cytologi.',
    en: 'Well-equipped in-house laboratory: blood samples, urine samples, blood smears, skin and ear samples. Most results during the visit. Analyses: hematology, clinical chemistry, electrolytes, hormones, urine cultures, cytology.'
  },
  'service.desc.official': {
    fi: 'Viralliset lonkka-, kyynär- ja selkätutkimukset. Viralliset polvitutkimukset. Viralliset sydämen auskultaatiotutkimukset. Viralliset sydämen ultraäänitutkimukset koirille.',
    sv: 'Officiella röntgenbilder (höfter, armbågar, rygg). Officiella knäundersökningar. Officiella hjärtauskultationer. Officiella hjärtultraljudsundersökningar för hundar.',
    en: 'Official hip, elbow and back X-rays. Official knee examinations. Official heart auscultations. Official heart ultrasound examinations for dogs.'
  },
  'service.desc.orthopedics': {
    fi: 'Ortopediset tutkimukset ja viralliset röntgentutkimukset. Klinikalla on oma ortopedinen leikkaussali, jossa on korkeampi steriiliyystaso. Eturistisiteen korjausleikkaukset kahdella menetelmällä: lateral suture -tekniikka (nivelen stabilointi synteettisellä tukimateriaalilla) ja TTA (sääriluun kyhmyn siirto polven biomekaniikan muuttamiseksi). Murtumaleikkaukset, amputaatiot sekä reisiluunpään poisto.',
    sv: 'Ortopediska undersökningar och officiella röntgenundersökningar. Kliniken har ett dedikerat ortopediskt operationsrum med högre sterilitetsnivå. Korsbandsskadeoperationer med två metoder: lateral sutur-teknik (ledstabilisering med syntetiskt stödmaterial) och TTA (förflyttning av skenbenets utskott för att ändra knäets biomekanik). Frakturkirurgi, amputationer samt lårbensh­uvudektomi.',
    en: 'Orthopedic examinations and official X-ray examinations. The clinic has a dedicated orthopedic surgery room with a higher level of sterility. Cranial cruciate ligament repair with two methods: lateral suture technique (joint stabilization with synthetic support material) and TTA (tibial tuberosity advancement to alter knee biomechanics). Fracture repairs, amputations, and femoral head ostectomy.'
  },
  'service.desc.xray': {
    fi: 'Digitaalinen röntgen. Suositellaan esim. ontumiin, keuhko- tai sydänoireisiin, akuuttiin oksenteluun, virtsaamisvaikeuksiin, kasvainepäilyihin ja virallisiin röntgenkuvauksiin.',
    sv: 'Digital röntgen. Rekommenderas vid hälta, lung- och hjärtsymtom, akut kräkning, urinproblem, misstänkta tumörer och officiella röntgenbilder.',
    en: 'Digital X-ray. Recommended for limping, respiratory or cardiac symptoms, acute vomiting, urinary problems, tumor suspicion, and official screening X-rays.'
  },
  'service.desc.euthanasia': {
    fi: 'Pyrimme siihen, että hyvästien otto tapahtuu rauhallisesti, ilman kiirettä. Lemmikille annetaan ensin rauhoite kivunlievennyksellä, sitten nukutusaine. Vaihtoehdot: kotihautaus, tuhkaus tai yksilötuhkaus uurnalla.',
    sv: 'Vi strävar efter att farvälet ska vara lugnt och utan brådska. Djuret får först ett lugnande medel med smärtlindring, sedan sömnmedel. Alternativ: hemgravering, kremering eller individuell kremering med urna.',
    en: 'We strive to make the final farewell peaceful and unhurried. The pet first receives a sedative with pain relief, then an anesthetic. Options: home burial, cremation, or individual cremation with urn.'
  },
  'service.desc.sterilization': {
    fi: 'Yleinen toimenpide koirille, kissoille ja kaneille. Sterilisaatiolla voidaan välttyä hormonaalisilta taudeilta, kuten nisäkasvaimilta tai kohtutulehdukselta. Inhalaatioanestesia ja kattava kivunlievennys.',
    sv: 'Ett vanligt ingrepp på hundar, katter och kaniner. Sterilisering kan motverka hormonala sjukdomar som juvertumörer och livmoderinflammation. Inhalationsanestesi och omfattande smärthantering.',
    en: 'A common procedure for dogs, cats and rabbits. Sterilization helps prevent hormonal diseases including mammary tumors and uterine infections. Inhalation anesthesia with comprehensive pain management.'
  },
  'service.desc.dental': {
    fi: 'Hammassairaudet ovat erittäin yleisiä — jo 3-vuoden iässä valtaosalla on hampaiden tulehdus. Palvelut: hammaskiven poisto ultraäänilaitteella, hammasröntgen, hampaiden kirurgiset poistot, maitohampaiden poistot sekä puhkeamattomien hampaiden ja kystojen poisto. Kaikki toimenpiteet yleisanestesiassa inhalaatioanestesialla, suonensisäisellä nesteytyksellä ja kattavalla kivunlievennyksellä.',
    sv: 'Tandsjukdomar är mycket vanliga — vid 3 års ålder har de flesta hundar och katter inflammation i munnen. Tjänster: tandstensavlägsnande med ultraljud, tandröntgen, kirurgiska tandutdragningar, mjölktandsborttagning samt borttagning av icke-erupterade tänder och cystor. Alla ingrepp under generell anestesi med inhalationsanestesi, intravenöst dropp och omfattande smärthantering.',
    en: 'Dental disorders are very common — by age 3, most dogs and cats have some dental inflammation. Services: tartar removal with ultrasound, dental X-rays, surgical tooth extractions, deciduous teeth removals, and removal of unerupted teeth and cysts. All procedures under general anesthesia with inhalation anesthesia, intravenous fluids and comprehensive pain management.'
  },
  'service.desc.ultrasound': {
    fi: 'Laadukas ultraääni: vatsan alueen tutkimukset, kohdun tutkimukset, maksan, munuaisten ja sisäelinten tutkimukset sekä sydämen ultraäänitutkimukset.',
    sv: 'Högklassigt ultraljud: abdominella undersökningar, livmoderundersökningar, lever-, njur- och andra organundersökningar samt hjärtultraljud.',
    en: 'High-quality ultrasound: abdominal examinations, uterine examinations, liver, kidney and other organ examinations, and heart ultrasound.'
  },
  'service.desc.vaccinations': {
    fi: 'Rokotus on tärkeää ennaltaehkäisevää terveydenhoitoa. Koiranpennut rokotetaan 12 ja 16 viikon ikäisinä. Kissanpennut samoin. Aikuiset rokotetaan 1–3 vuoden välein. Koirat: parvovirus, maksatulehdus, penikkatuti, rabies, kennelyskä. Kissat: kissarutto, herpes, calici.',
    sv: 'Vaccinationer är en viktig del av förebyggande hälsovård. Valpar vaccineras vid 12 och 16 veckors ålder. Kattungar likaså. Vuxna djur vaccineras med 1–3 års intervall. Hundar: parvovirus, hepatit, valpsjuka, rabies, kennelhosta. Katter: panleukopeni, herpes, calici.',
    en: 'Vaccination is important preventative healthcare. Puppies are vaccinated at 12 and 16 weeks. Kittens likewise. Adults every 1–3 years. Dogs: parvovirus, hepatitis, distemper, rabies, kennel cough. Cats: panleukopenia, herpes, calicivirus.'
  },
  'service.desc.puppy': {
    fi: 'Pentutarkastuksessa eläinlääkäri tutkii pennun päästä varpaisiin ja antaa terveystodistuksen. Tarkastuksen yhteydessä voidaan asettaa mikrosiru.',
    sv: 'Vid valpgranskningen undersöker veterinären valpen från topp till tå och utfärdar ett hälsointyg. I samband med undersökningen kan man sätta mikrochip.',
    en: 'The veterinarian examines the puppy thoroughly from head to toe and issues a health certificate. A microchip can be implanted during the visit.'
  },
  'service.desc.anesthesia': {
    fi: 'Anestesia on lähellä sydäntämme. Päivitämme jatkuvasti osaamistamme ja koulutustamme, uudistamme protokolliamme ja valvomme potilaita tarkasti koko toimenpiteen ajan. Klinikalla on kehittyneet monitorointilaitteet, neljä anestesiakonetta ja kaksi ventilaattoria turvallisen anestesian varmistamiseksi.',
    sv: 'Anestesi ligger oss varmt om hjärtat. Vi uppdaterar kontinuerligt vår utbildning, förnyar våra protokoll och övervakar patienterna noggrant under hela ingreppet. Kliniken har avancerad övervakningsutrustning, fyra anestesimaskiner och två ventilatorer för att säkerställa säker anestesi.',
    en: 'Anesthesia is close to our hearts. We continuously update our education, refresh our protocols and monitor patients closely throughout every procedure. The clinic has advanced monitoring equipment, four anesthesia machines and two ventilators to ensure safe anesthesia.'
  },
  'service.desc.hygiene': {
    fi: 'Korkea hygieniataso on meille keskeinen tavoite. Pesemme kädet ja käytämme kertakäyttökäsineitä jokaisen potilaan kohdalla. Tutkimuspöydät desinfioidaan potilaiden välillä ja kankaat pestään jokaisen käytön jälkeen. Käytämme UV-valoa klinikan tilojen desinfiointiin ja suodattimia inhalaatioanestesiassa. Lattiat desinfioidaan kahdesti päivässä.',
    sv: 'Hög hygiennivå är ett centralt mål för oss. Vi tvättar händerna och använder engångshandskar för varje patient. Undersökningsborden desinficeras mellan patienter och textilier tvättas efter varje användning. Vi använder UV-ljus för desinfektion av klinikens utrymmen och filter vid inhalationsanestesi. Golven desinficeras två gånger om dagen.',
    en: 'Maintaining a high level of hygiene is a core priority for us. We wash our hands and use single-use gloves for every patient. Examination tables are disinfected between patients and fabrics are washed after every use. We use UV light to disinfect all clinic areas and filters with inhalation anesthesia. Floors are disinfected twice per day.'
  },

  // Team
  'team.title': { fi: 'Henkilökuntamme', sv: 'Vår personal', en: 'Our Team' },
  'team.subtitle': {
    fi: 'Ammattitaitoinen hoitotiimimme palveluksessanne',
    sv: 'Vårt professionella vårdteam till er tjänst',
    en: 'Our professional care team at your service'
  },
  'team.vets': { fi: 'Eläinlääkärit', sv: 'Veterinärer', en: 'Veterinarians' },
  'team.techs': { fi: 'Hoitohenkilökunta', sv: 'Vårdpersonal', en: 'Support Staff' },

  // Staff roles
  'role.vet': { fi: 'Eläinlääkäri', sv: 'Veterinär', en: 'Veterinarian' },
  'vet.experience': { fi: 'Kokemus', sv: 'Erfarenhet', en: 'Experience' },
  'vet.training': { fi: 'Koulutus', sv: 'Utbildning', en: 'Training' },
  'vet.focus': { fi: 'Erikoisosaaminen', sv: 'Specialkompetens', en: 'Areas of Expertise' },
  'nurse.background': { fi: 'Tausta', sv: 'Bakgrund', en: 'Background' },
  'nurse.interests': { fi: 'Kiinnostuksen kohteet', sv: 'Intresseområden', en: 'Interests' },
  'role.manager': { fi: 'Klinikkamanageri, klinikkaeläinhoitaja', sv: 'Klinikföreståndare, klinikdjurskötare', en: 'Clinic Manager, Veterinary Technician' },
  'role.headtech': { fi: 'Johtava klinikkaeläinhoitaja', sv: 'Ledande klinikdjurskötare', en: 'Head Veterinary Technician' },
  'role.tech': { fi: 'Klinikkaeläinhoitaja', sv: 'Klinikdjurskötare', en: 'Veterinary Technician' },
  'role.nurse_student': { fi: 'Eläinhoitaja / opiskelija', sv: 'Djurskötare / studerande', en: 'Veterinary Nurse / Student' },
  'role.practical': { fi: 'Lähihoitaja', sv: 'Närvårdare', en: 'Practical Nurse' },

  // Staff bios
  'bio.leena': {
    fi: 'Sydänsairaudet ja sisätaudit. ESAVS-kardiologian sertifikaatti. Kennelklubin valtuutettu sydäntutkija.',
    sv: 'Hjärtsjukdomar och internmedicin. ESAVS kardiologicertifikat. Auktoriserad hjärtundersökare för Kennelklubben.',
    en: 'Heart diseases and internal medicine. ESAVS Cardiology Certificate. Authorized heart examiner for the Finnish Kennel Club.'
  },
  'bio.pamela': {
    fi: 'Ortopedia, pehmytkudoskirurgia ja hammashoito. AOVET & ESAVS koulutus.',
    sv: 'Ortopedi, mjukdelskirurgi och tandvård. AOVET & ESAVS utbildning.',
    en: 'Orthopedics, soft tissue surgery and dentistry. AOVET & ESAVS training.'
  },
  'bio.assaf': {
    fi: 'Hammashoito, tähystystutkimukset ja luonnonvaraisten eläinten hoito.',
    sv: 'Tandvård, endoskopi och vård av vilda djur.',
    en: 'Dentistry, endoscopic examinations and wildlife care.'
  },
  'bio.nina': {
    fi: 'Kirurgia, hammashoito ja ihotaudit. Farmaseutin tausta.',
    sv: 'Kirurgi, tandvård och dermatologi. Bakgrund som farmaceut.',
    en: 'Surgery, dentistry and dermatology. Pharmacist background.'
  },
  'bio.merja': {
    fi: 'Pehmytkudoskirurgia ja eksoottisten eläinten hoito.',
    sv: 'Mjukdelskirurgi och exotiska djur.',
    en: 'Soft tissue surgery and exotic animals.'
  },
  'bio.sanna': {
    fi: 'Klinikan hallinto, tilaukset ja aikataulut.',
    sv: 'Klinikadministration, beställningar och schemaläggning.',
    en: 'Clinic administration, orders and scheduling.'
  },
  'bio.jenni': {
    fi: 'Kiinnostuksen kohteet: anestesia ja laboratoriotyö. Anestesia EAT-tutkinto.',
    sv: 'Intresseområden: anestesi och laboratoriearbete. Anestesi specialistkompetens.',
    en: 'Interests: anesthesia and laboratory work. Anesthesia specialist qualification.'
  },
  'bio.meri': {
    fi: 'Kiinnostuksen kohteet: kissojen hoito. Myös hevostenhoitajan tutkinto.',
    sv: 'Intresseområden: kattvård. Även utbildad hästskötare.',
    en: 'Interests: cat care. Also qualified horse caretaker.'
  },
  'bio.susanna': {
    fi: 'Kiinnostuksen kohteet: monipuolinen klinikkatyö ja jatkuva oppiminen.',
    sv: 'Intresseområden: varierande klinikarbete och kontinuerligt lärande.',
    en: 'Interests: diverse clinical work and continuous learning.'
  },
  'bio.emilia': {
    fi: 'Kiinnostuksen kohteet: anestesia, kirurgiset toimenpiteet ja hammashoito.',
    sv: 'Intresseområden: anestesi, kirurgiska ingrepp och tandvård.',
    en: 'Interests: anesthesia, surgical procedures and dental care.'
  },
  'bio.jennifer': {
    fi: 'Kiinnostuksen kohteet: anestesian valvonta, kirurgia ja eksoottiset potilaat.',
    sv: 'Intresseområden: anestesiövervakning, kirurgi och exotiska patienter.',
    en: 'Interests: anesthesia monitoring, surgery and exotic patients.'
  },
  'bio.josefiina': {
    fi: 'Kiinnostuksen kohteet: laboratorio- ja leikkaussalityö.',
    sv: 'Intresseområden: laboratorie- och operationsarbete.',
    en: 'Interests: laboratory and operating room work.'
  },
  'bio.tiina': {
    fi: 'Kiinnostuksen kohteet: kirurgia, ortopedia ja traumahoito.',
    sv: 'Intresseområden: kirurgi, ortopedi och traumavård.',
    en: 'Interests: surgery, orthopedics and trauma care.'
  },

  // Prices
  'prices.title': { fi: 'Hinnasto', sv: 'Prislista', en: 'Price List' },
  'prices.subtitle': {
    fi: 'Hinnat ovat kokonaishintoja. Leikkaukset sisältävät lääkkeet ja tarvikkeet.',
    sv: 'Priserna är totalpriser. Kirurgiska ingrepp innehåller mediciner och tillbehör.',
    en: 'Prices are total amounts. Surgical procedures include medicines and supplies.'
  },
  'prices.cat.consultation': { fi: 'Eläinlääkärin vastaanotto', sv: 'Veterinärbesök', en: 'Veterinary Consultation' },
  'prices.cat.vaccinations': { fi: 'Rokotukset', sv: 'Vaccinationer', en: 'Vaccinations' },
  'prices.cat.surgery': { fi: 'Peruskirurgia', sv: 'Grundkirurgi', en: 'Basic Surgery' },
  'prices.cat.orthopedics': { fi: 'Ortopedia', sv: 'Ortopedi', en: 'Orthopedics' },
  'prices.cat.dental': { fi: 'Hammashoidot', sv: 'Tandvård', en: 'Dental Care' },
  'prices.cat.pregnancy': { fi: 'Tiineystutkimukset', sv: 'Dräktighetsundersökningar', en: 'Pregnancy Examinations' },
  'prices.cat.official': { fi: 'Viralliset tutkimukset', sv: 'Officiella undersökningar', en: 'Official Examinations' },
  'prices.cat.endoscopy': { fi: 'Tähystystoimenpiteet', sv: 'Endoskopi', en: 'Endoscopy' },
  'prices.cat.cardiac': { fi: 'Sydäntutkimukset', sv: 'Hjärtundersökningar', en: 'Cardiac Examinations' },
  'prices.cat.other': { fi: 'Muut toimenpiteet', sv: 'Övriga tjänster', en: 'Other Services' },

  // Price items - Consultation
  'price.consult15': { fi: 'Vastaanotto <15 min', sv: 'Besök <15 min', en: 'Visit <15 min' },
  'price.consult30': { fi: 'Vastaanotto <30 min', sv: 'Besök <30 min', en: 'Visit <30 min' },
  'price.consult45': { fi: 'Vastaanotto <45 min', sv: 'Besök <45 min', en: 'Visit <45 min' },

  // Price items - Vaccinations
  'price.vacc.catrcp': { fi: 'Kissan 3-rokotus (RCP)', sv: 'Katt RCP-vaccin', en: 'Cat RCP vaccine' },
  'price.vacc.catrcprabies': { fi: 'Kissan 3-rokotus + rabies', sv: 'Katt RCP + rabies', en: 'Cat RCP + rabies' },
  'price.vacc.dogdhppi': { fi: 'Koiran 4-rokotus (DHPPI)', sv: 'Hund DHPPI-vaccin', en: 'Dog DHPPI vaccine' },
  'price.vacc.dogdhppirabies': { fi: 'Koiran 4-rokotus + rabies', sv: 'Hund DHPPI + rabies', en: 'Dog DHPPI + rabies' },
  'price.vacc.kennelpi': { fi: 'Kennelyskärokotus PI', sv: 'Kennelhosta PI', en: 'Kennel cough PI' },
  'price.vacc.kennelkc': { fi: 'Kennelyskärokotus KC', sv: 'Kennelhosta KC', en: 'Kennel cough KC' },

  // Price items - Surgery
  'price.surg.catfemale': { fi: 'Naaraskissan sterilisaatio', sv: 'Honkatt sterilisering', en: 'Female cat spay' },
  'price.surg.catfemale.note': { fi: 'Sis. kaulurin ja kipulääkkeet', sv: 'Inkl. krage och smärtlindring', en: 'Incl. collar and pain medication' },
  'price.surg.catmale': { fi: 'Uroskissan kastraatio', sv: 'Hankatt kastrering', en: 'Male cat neuter' },
  'price.surg.catmale.note': { fi: 'Sis. kipulääkkeet', sv: 'Inkl. smärtlindring', en: 'Incl. pain medication' },
  'price.surg.dogfemale.5': { fi: 'Naaraskoiran sterilisaatio <5kg', sv: 'Hontik sterilisering <5kg', en: 'Female dog spay <5kg' },
  'price.surg.dogfemale.20': { fi: 'Naaraskoiran sterilisaatio 5–20kg', sv: 'Hontik sterilisering 5–20kg', en: 'Female dog spay 5–20kg' },
  'price.surg.dogfemale.40': { fi: 'Naaraskoiran sterilisaatio 20–40kg', sv: 'Hontik sterilisering 20–40kg', en: 'Female dog spay 20–40kg' },
  'price.surg.dogfemale.over40': { fi: 'Naaraskoiran sterilisaatio >40kg', sv: 'Hontik sterilisering >40kg', en: 'Female dog spay >40kg' },
  'price.surg.dogmale.10': { fi: 'Uroskoiran kastraatio <10kg', sv: 'Hanhund kastrering <10kg', en: 'Male dog neuter <10kg' },
  'price.surg.dogmale.20': { fi: 'Uroskoiran kastraatio 10–20kg', sv: 'Hanhund kastrering 10–20kg', en: 'Male dog neuter 10–20kg' },
  'price.surg.dogmale.40': { fi: 'Uroskoiran kastraatio 20–40kg', sv: 'Hanhund kastrering 20–40kg', en: 'Male dog neuter 20–40kg' },
  'price.surg.dogmale.over40': { fi: 'Uroskoiran kastraatio >40kg', sv: 'Hanhund kastrering >40kg', en: 'Male dog neuter >40kg' },
  'price.surg.crypto.inguinal.small': { fi: 'Piilokivesleikkaus, nivusesta <20kg', sv: 'Kryptorkidoperation, inguinal <20kg', en: 'Cryptorchid surgery, inguinal <20kg' },
  'price.surg.crypto.inguinal.large': { fi: 'Piilokivesleikkaus, nivusesta >20kg', sv: 'Kryptorkidoperation, inguinal >20kg', en: 'Cryptorchid surgery, inguinal >20kg' },
  'price.surg.crypto.abdom.small': { fi: 'Piilokivesleikkaus, vatsaontelosta <20kg', sv: 'Kryptorkidoperation, abdominell <20kg', en: 'Cryptorchid surgery, abdominal <20kg' },
  'price.surg.crypto.abdom.large': { fi: 'Piilokivesleikkaus, vatsaontelosta >20kg', sv: 'Kryptorkidoperation, abdominell >20kg', en: 'Cryptorchid surgery, abdominal >20kg' },
  'price.surg.stitch.note': { fi: 'Leikkausten hintaan sisältyy tikkien poisto.', sv: 'Stygnen ingår i operationspriset.', en: 'Stitch removal is included in the surgery price.' },

  // Price items - Dental
  'price.dental.check': { fi: 'Hampaiden tarkistus hereillä', sv: 'Tandkontroll vaken', en: 'Dental check (awake)' },
  'price.dental.catscaling': { fi: 'Hammaskiven poisto kissa', sv: 'Tandstensborttagning katt', en: 'Cat dental scaling' },
  'price.dental.dogsmall': { fi: 'Hammaskiven poisto koira <20kg', sv: 'Tandstensborttagning hund <20kg', en: 'Dog dental scaling <20kg' },
  'price.dental.doglarge': { fi: 'Hammaskiven poisto koira >20kg', sv: 'Tandstensborttagning hund >20kg', en: 'Dog dental scaling >20kg' },

  // Price items - Other
  'price.other.passport': { fi: 'EU-passi', sv: 'EU-pass', en: 'EU Passport' },
  'price.other.chip': { fi: 'Mikrosiru', sv: 'Mikrochip', en: 'Microchip' },
  'price.other.nails': { fi: 'Kynsien lyhennys', sv: 'Nagelklippning', en: 'Nail trimming' },
  'price.other.euthcat': { fi: 'Eutanasia kissa', sv: 'Eutanasi katt', en: 'Euthanasia cat' },
  'price.other.euthdog': { fi: 'Eutanasia koira', sv: 'Eutanasi hund', en: 'Euthanasia dog' },

  // Orthopedics prices
  'price.ortho.lameness': { fi: 'Ontumatutkimus', sv: 'Hältundersökning', en: 'Lameness exam' },
  'price.ortho.xray': { fi: '+ röntgen (nukutettu)', sv: '+ röntgen (sederad)', en: '+ X-ray (sedated)' },
  'price.ortho.fracture': { fi: 'Murtumaleikkaukset', sv: 'Frakturkirurgi', en: 'Fracture surgery' },
  'price.ortho.cruciate': { fi: 'Ristisideleikkaus lateraalisutuura', sv: 'Korsbandsoperation lateral sutur', en: 'Cruciate ligament lateral suture' },
  'price.ortho.tta': { fi: 'Ristisideleikkaus TTA', sv: 'Korsbandsoperation TTA', en: 'Cruciate ligament TTA' },
  'price.ortho.patella': { fi: 'Patellaluksaatio', sv: 'Patellaluxation', en: 'Patellar luxation' },
  'price.ortho.femoral': { fi: 'Reisiluunpään poisto', sv: 'Lårbenshuvudresektion', en: 'Femoral head removal' },
  'price.ortho.fracture.price': { fi: 'alk. 1,300 €', sv: 'fr. 1,300 €', en: 'from 1,300 €' },
  'price.ortho.amputation': { fi: 'Amputaatiot yms.', sv: 'Amputationer m.m.', en: 'Amputations etc.' },
  'price.ortho.contact': { fi: 'Ota yhteyttä', sv: 'Kontakta oss', en: 'Contact us' },
  'price.ortho.cruciate.note': {
    fi: 'Lateraalisutuura sopii kissojen ja pienten koirien ristisidevaurioiden hoitoon. Aktiivisesti harrastaville tai suurille koirille sopii paremmin TTA-menetelmä.',
    sv: 'Lateral sutur lämpar sig för behandling av korsbandsskador hos katter och små hundar. För aktiva eller stora hundar passar TTA-metoden bättre.',
    en: 'Lateral suture is suitable for cruciate ligament injuries in cats and small dogs. For active or large dogs, the TTA method is more appropriate.'
  },

  // Dental prices
  'price.dental.xray': { fi: 'Hammasröntgen', sv: 'Tandröntgen', en: 'Dental X-ray' },
  'price.dental.milk12': { fi: 'Maitohampaan poisto 1–2 hammasta', sv: 'Mjölktandsextraktion 1–2 tänder', en: 'Milk tooth extraction 1–2 teeth' },
  'price.dental.milk34': { fi: 'Maitohampaan poisto 3–4 hammasta', sv: 'Mjölktandsextraktion 3–4 tänder', en: 'Milk tooth extraction 3–4 teeth' },
  'price.dental.large.surcharge': { fi: 'Lisämaksu koira >40kg', sv: 'Tillägg hund >40kg', en: 'Surcharge dog >40kg' },
  'price.dental.extraction.note': {
    fi: 'Hampaiden poistot tehdään kliinisen tutkimuksen ja röntgenkuvien perusteella. Hinta riippuu käytetystä ajasta ja hampaan/ikenen kunnosta.',
    sv: 'Tandextraktioner utförs baserat på klinisk undersökning och röntgenbilder. Priset beror på tidsåtgång och tandens/tandköttets skick.',
    en: 'Extractions are performed based on clinical examination and X-rays. Price depends on time required and tooth/gum condition.'
  },

  // Pregnancy prices
  'price.preg.ultrasound': { fi: 'Tiineysultraääni', sv: 'Dräktighetsultraljud', en: 'Pregnancy ultrasound' },
  'price.preg.xray': { fi: 'Tiineysröntgen', sv: 'Dräktighetsröntgen', en: 'Pregnancy X-ray' },

  // Official examination prices
  'price.official.hip.small': { fi: 'Lonkkakuvat <20kg', sv: 'Höftröntgen <20kg', en: 'Hip X-ray <20kg' },
  'price.official.hip.medium': { fi: 'Lonkkakuvat 20–40kg', sv: 'Höftröntgen 20–40kg', en: 'Hip X-ray 20–40kg' },
  'price.official.hip.large': { fi: 'Lonkkakuvat >40kg', sv: 'Höftröntgen >40kg', en: 'Hip X-ray >40kg' },
  'price.official.elbow': { fi: 'Kyynärnivelkuvat', sv: 'Armbågsröntgen', en: 'Elbow X-ray' },
  'price.official.spine': { fi: 'Selkäkuvat', sv: 'Ryggröntgen', en: 'Spine X-ray' },
  'price.official.package.small': { fi: 'Paketti <40kg', sv: 'Paket <40kg', en: 'Package <40kg' },
  'price.official.package.large': { fi: 'Paketti >40kg', sv: 'Paket >40kg', en: 'Package >40kg' },
  'price.official.knee': { fi: 'Polvitarkastus', sv: 'Knäundersökning', en: 'Knee exam' },
  'price.official.heart': { fi: 'Sydänauskultaatio', sv: 'Hjärtauskultation', en: 'Heart auscultation' },

  // Endoscopy prices
  'price.endo.earflush': { fi: 'Korvahuuhtelu (video-otoskooppinen)', sv: 'Öronspolning (video-otoskopisk)', en: 'Ear flushing (video-otoscopic)' },
  'price.endo.rhinoscopy': { fi: 'Rhinoskopia', sv: 'Rinoskopi', en: 'Rhinoscopy' },
  'price.endo.gi': { fi: 'Ruoansulatuskanavan ja keuhkojen tähystys', sv: 'Endoskopi av mag-tarmkanal och lungor', en: 'GI tract and lung endoscopy' },
  'price.endo.gi.contact': { fi: 'Ota yhteyttä', sv: 'Kontakta oss', en: 'Contact us' },

  // Cardiac prices
  'price.cardiac.official.small': { fi: 'Virallinen sydämen ultraääni <40kg', sv: 'Officiellt hjärtultraljud <40kg', en: 'Official cardiac ultrasound <40kg' },
  'price.cardiac.official.large': { fi: 'Virallinen sydämen ultraääni >40kg', sv: 'Officiellt hjärtultraljud >40kg', en: 'Official cardiac ultrasound >40kg' },
  'price.cardiac.ultrasound': { fi: 'Sydämen ultraääni', sv: 'Hjärtultraljud', en: 'Heart ultrasound' },
  'price.cardiac.auscultation': { fi: 'Virallinen sydänauskultaatio', sv: 'Officiell hjärtauskultation', en: 'Official heart auscultation' },
  'price.cardiac.auscultation.combined': {
    fi: 'Virallinen sydänauskultaatio muun käynnin yhteydessä',
    sv: 'Officiell hjärtauskultation i samband med annat besök',
    en: 'Official heart auscultation with another visit'
  },

  // Other prices
  'price.other.catgrooming': { fi: 'Kissan turkinhuolto nukutettuna', sv: 'Kattpälsvård under sedering', en: 'Cat grooming under sedation' },
  'price.other.euthdog.small': { fi: 'Eutanasia koira <20kg', sv: 'Eutanasi hund <20kg', en: 'Euthanasia dog <20kg' },
  'price.other.euthdog.medium': { fi: 'Eutanasia koira 20–40kg', sv: 'Eutanasi hund 20–40kg', en: 'Euthanasia dog 20–40kg' },
  'price.other.euthdog.large': { fi: 'Eutanasia koira >40kg', sv: 'Eutanasi hund >40kg', en: 'Euthanasia dog >40kg' },

  'prices.note': {
    fi: 'Alle 24h ennen peruutetuista ajoista veloitetaan 30–100 €.',
    sv: 'Avbokning mindre än 24 timmar före besöket debiteras 30–100 €.',
    en: 'Cancellations less than 24 hours before the appointment are charged 30–100 €.'
  },
  'prices.rights': {
    fi: 'Pidätämme oikeuden hintojen muutoksiin.',
    sv: 'Vi förbehåller oss rätten att ändra priserna.',
    en: 'We reserve the right to change prices.'
  },
  'prices.payment': {
    fi: 'Voit maksaa myös laskulla tai erissä — ota yhteyttä niin kerromme lisää!',
    sv: 'Du kan även betala med faktura eller på avbetalning — kontakta oss för mer info!',
    en: 'You can also pay by invoice or in installments — contact us for more info!'
  },
  'prices.insurance': {
    fi: 'Suorakorvaus: Lähitapiola, Agria, Pohjola',
    sv: 'Direktersättning: Lokaltapiola, Agria, Pohjola',
    en: 'Direct insurance billing: Lähitapiola, Agria, Pohjola'
  },

  // Wildlife
  'wildlife.title': { fi: 'Wildlife', sv: 'Wildlife', en: 'Wildlife' },
  'wildlife.subtitle': {
    fi: 'Yhteistyössä Nordic Wildlife Caren kanssa',
    sv: 'I samarbete med Nordic Wildlife Care',
    en: 'In cooperation with Nordic Wildlife Care'
  },
  'wildlife.text1': {
    fi: 'Eläinklinikka Saari tekee yhteistyötä villieläinhoitolan kanssa. Vapaaehtoistyömme organisaation kanssa tapahtuu maksutta.',
    sv: 'Djurklinik Saari samarbetar med en viltdjursvårdsanläggning. Vårt frivilligarbete med organisationen sker utan kostnad.',
    en: 'Animal Clinic Saari cooperates with a wildlife care facility. Our volunteer work with the organization is free of charge.'
  },
  'wildlife.text2': {
    fi: 'Tarjoamme diagnostiikka- ja hoitopalveluita loukkaantuneille villieläimille. Eläimet saavat ensihoitoa ennen kuntoutuskeskukseen siirtoa, ja tavoitteena on vapauttaa ne takaisin luontoon.',
    sv: 'Vi erbjuder diagnostik och behandling för skadade vilda djur. Djuren får initialvård innan de överförs till rehabiliteringscenter, med målet att släppa ut dem i naturen igen.',
    en: 'We provide diagnostic and treatment services for injured wild animals. Animals receive initial care before transfer to rehabilitation centers, with the goal of releasing them back into nature.'
  },
  'wildlife.donate': {
    fi: 'Tue villieläinhoitolaa lahjoittamalla Nordic Wildlife Carelle',
    sv: 'Stöd viltdjursvården genom att donera till Nordic Wildlife Care',
    en: 'Support wildlife care by donating to Nordic Wildlife Care'
  },
  'wildlife.found': {
    fi: 'Löysitkö loukkaantuneen villieläimen? Ota yhteyttä hoitolaan tai tuo eläin suoraan klinikalle.',
    sv: 'Har du hittat ett skadat vilt djur? Kontakta rehabiliteringsanläggningen eller ta djuret direkt till kliniken.',
    en: 'Found an injured wild animal? Contact the rehabilitation facility or bring the animal directly to the clinic.'
  },
  'wildlife.placeholder': {
    fi: 'Villieläinkuva',
    sv: 'Viltdjurbild',
    en: 'Wildlife photo'
  },

  // Testimonials
  'testimonials.title': { fi: 'Asiakaspalaute', sv: 'Kundrecensioner', en: 'Testimonials' },
  'testimonials.subtitle': {
    fi: 'Mitä asiakkaamme sanovat',
    sv: 'Vad våra kunder säger',
    en: 'What our clients say'
  },
  'testimonial.1': {
    fi: 'Kiitos erittäin hyvästä palvelusta sekä ystävällisestä ja ammattimaisesta kohtelusta!',
    sv: 'Tack för mycket bra betjäning samt vänligt och professionellt bemötande!',
    en: 'Thank you for excellent service and friendly, professional treatment!'
  },
  'testimonial.2': {
    fi: 'Parasta palvelua, ystävällisyyttä ja ammattimaisuutta mitä voi kuvitella.',
    sv: 'Den bästa service, vänlighet och professionalism man kan tänka sig.',
    en: 'The best service, kindness and professionalism you can imagine.'
  },
  'testimonial.3': {
    fi: 'Aina huippuluokan hoitoa. Ihana ja osaava henkilökunta.',
    sv: 'Alltid toppklass på vården. Härlig och kunnig personal.',
    en: 'Always top-class care. Wonderful and knowledgeable staff.'
  },
  'testimonial.4': {
    fi: 'Ammattimaista palvelua eläinten hyvinvointi edellä!',
    sv: 'Proffsig service med fokus på djurens välmående!',
    en: 'Professional service with focus on animal wellbeing!'
  },
  'testimonial.5': {
    fi: 'Ystävällinen ja ammattimainen kohtelu.',
    sv: 'Vänligt och professionellt bemötande.',
    en: 'Friendly and professional treatment.'
  },
  'testimonial.6': {
    fi: 'Luotettava klinikka, jonne voi aina turvallisesti tuoda lemmikkinsä.',
    sv: 'En pålitlig klinik dit man alltid tryggt kan ta sitt husdjur.',
    en: 'A reliable clinic where you can always safely bring your pet.'
  },

  // Contact
  'contact.title': { fi: 'Yhteystiedot', sv: 'Kontaktuppgifter', en: 'Contact Us' },
  'contact.subtitle': {
    fi: 'Ota yhteyttä tai varaa aika',
    sv: 'Kontakta oss eller boka tid',
    en: 'Get in touch or book an appointment'
  },
  'contact.address.label': { fi: 'Osoite', sv: 'Adress', en: 'Address' },
  'contact.address': { fi: 'Gerbyntie 18, 65230 Vaasa', sv: 'Gerbyvägen 18, 65230 Vasa', en: 'Gerbyntie 18, 65230 Vaasa' },
  'contact.phone.label': { fi: 'Puhelin', sv: 'Telefon', en: 'Phone' },
  'contact.email.label': { fi: 'Sähköposti', sv: 'E-post', en: 'Email' },
  'contact.hours.label': { fi: 'Aukioloajat', sv: 'Öppettider', en: 'Opening Hours' },
  'contact.hours.weekdays': { fi: 'Ma–Pe', sv: 'Mån–Fre', en: 'Mon–Fri' },
  'contact.hours.weekdays.time': { fi: '9:00–17:00', sv: '9:00–17:00', en: '9:00 AM–5:00 PM' },
  'contact.hours.weekends': { fi: 'La–Su', sv: 'Lör–Sön', en: 'Sat–Sun' },
  'contact.hours.weekends.time': { fi: 'Suljettu', sv: 'Stängt', en: 'Closed' },
  'contact.book': { fi: 'Varaa aika verkossa', sv: 'Boka tid online', en: 'Book Online' },

  // Footer
  'footer.description': {
    fi: 'Vaasan ainoa yksityinen pieneläinklinikka. Korkeatasoista eläinlääkäripalvelua vuodesta 1989 – viisi eläinlääkäriä ja kahdeksan hoitajaa palveluksessanne.',
    sv: 'Vasas enda privata smådjursklinik. Högklassig veterinärvård sedan 1989 – fem veterinärer och åtta djurskötare till er tjänst.',
    en: 'The only private small animal clinic in Vaasa. High-quality veterinary care since 1989 – five veterinarians and eight technicians at your service.'
  },
  'footer.quicklinks': { fi: 'Pikalinkit', sv: 'Snabblänkar', en: 'Quick Links' },
  'footer.contact': { fi: 'Yhteystiedot', sv: 'Kontakt', en: 'Contact' },
  'footer.follow': { fi: 'Seuraa meitä', sv: 'Följ oss', en: 'Follow Us' },
  'footer.privacy': { fi: 'Tietosuojaseloste', sv: 'Integritetspolicy', en: 'Privacy Policy' },
  'footer.rights': { fi: 'Kaikki oikeudet pidätetään.', sv: 'Alla rättigheter förbehållna.', en: 'All rights reserved.' },

  // Privacy Policy
  'privacy.title': { fi: 'Tietosuojaseloste', sv: 'Integritetspolicy', en: 'Privacy Policy' },
  'privacy.controller.title': { fi: 'Rekisterinpitäjä', sv: 'Personuppgiftsansvarig', en: 'Data Controller' },
  'privacy.contact.title': { fi: 'Rekisteriasioiden yhteyshenkilö', sv: 'Kontaktperson för registerfrågor', en: 'Contact Person for Registry Matters' },
  'privacy.name.title': { fi: 'Rekisterin nimi', sv: 'Registrets namn', en: 'Registry Name' },
  'privacy.name.text': { fi: 'Eläinklinikka Saari Oy:n asiakasrekisteri', sv: 'Eläinklinikka Saari Oy:s kundregister', en: 'Eläinklinikka Saari Oy Customer Registry' },
  'privacy.purpose.title': { fi: 'Henkilötietojen käyttötarkoitus', sv: 'Syfte med behandling av personuppgifter', en: 'Purpose of Personal Data Processing' },
  'privacy.purpose.text': { fi: 'Henkilötietoja käytetään viestintään, asiakaspalveluun ja potilassuhteen ylläpitoon.', sv: 'Personuppgifter används för kommunikation, kundservice och upprätthållande av patientrelationer.', en: 'Personal data is used for communication, customer service and maintaining patient relationships.' },
  'privacy.data.title': { fi: 'Rekisterin tietokentät', sv: 'Registrets datafält', en: 'Registry Data Fields' },
  'privacy.data.text': { fi: 'Potilaan tiedot ja omistajan nimi, puhelinnumero, osoite ja sähköpostiosoite. Asiakkaiden sosiaaliturvatunnus vain jos käyttää erämaksua. Potilaan hoitohistoria: toimenpiteet, asiakasviestintä ja hoitosuunnitelmat. Vakuutusnumero tarvittaessa.', sv: 'Patientuppgifter och ägarens namn, telefonnummer, adress och e-postadress. Kundens personnummer registreras endast vid delbetalning. Patientens vårdhistorik: åtgärder, kundkommunikation och behandlingsplaner. Försäkringsnummer vid behov.', en: 'Patient information and owner\'s name, phone number, address and email. Customer\'s social security number only if using installment payment. Patient treatment history: procedures, customer communications and treatment plans. Insurance number when available.' },
  'privacy.sources.title': { fi: 'Tietolähteet', sv: 'Datakällor', en: 'Data Sources' },
  'privacy.sources.text': { fi: 'Tiedot saadaan pääasiassa asiakkailta. Potilasasiakirjat voivat sisältää tietoja muista klinikoista, mikäli asiakas on saanut hoitoa muualla tai siirtänyt asiakkuutensa.', sv: 'Uppgifterna erhålls främst från kunderna. Patientjournaler kan innehålla information från andra kliniker om kunden har fått vård på annat håll eller överfört sin kundrelation.', en: 'Information comes primarily from customers. Patient records may include information from other clinics if the customer received treatment elsewhere or transferred their account.' },
  'privacy.sharing.title': { fi: 'Tietojen luovutus', sv: 'Utlämnande av uppgifter', en: 'Data Sharing' },
  'privacy.sharing.text': { fi: 'Tietoja luovutetaan vain asiantuntijoille (eläinlääkärit) konsultaatiotapauksissa (nimi, osoite, potilastiedot, löydökset). Muutoin tietoja ei luovuteta kolmansille osapuolille ellei asiakas sitä edellytä.', sv: 'Uppgifter lämnas ut enbart till specialister (veterinärer) vid konsultationsfall (namn, adress, patientuppgifter, fynd). I övrigt lämnas uppgifter inte ut till tredje part såvida kunden inte begär det.', en: 'Information is shared only with specialists (veterinarians) in consultation cases (name, address, patient data, findings). Otherwise, data is not disclosed to third parties unless the customer requires it.' },
  'privacy.security.title': { fi: 'Tietojen suojaus', sv: 'Dataskydd', en: 'Data Security' },
  'privacy.security.text': { fi: 'Rekisteri on talletettu salasanasuojattuun asiakkuudenhallintajärjestelmään, johon on pääsy Eläinklinikka Saari Oy:n valtuuttamilla henkilökunnan jäsenillä.', sv: 'Registret lagras i ett lösenordsskyddat kundhanteringssystem som är tillgängligt för Eläinklinikka Saari Oy:s behöriga personalmedlemmar.', en: 'The registry is stored in a password-protected customer management system accessible to authorized staff members of Eläinklinikka Saari Oy.' },
  'privacy.rights.title': { fi: 'Rekisteröidyn oikeudet', sv: 'Den registrerades rättigheter', en: 'Individual Rights' },
  'privacy.rights.text': { fi: 'Asiakkaalla on oikeus tarkistaa itseään koskevat tiedot sekä pyytää virheellisten, tarpeettomien, puutteellisten tai vanhentuneiden tietojen korjaamista tai poistamista.', sv: 'Kunden har rätt att granska sina personuppgifter samt begära rättelse eller radering av felaktiga, onödiga, ofullständiga eller föråldrade uppgifter.', en: 'Customers have the right to inspect their personal data and request correction or deletion of inaccurate, unnecessary, incomplete or outdated information.' },
  'privacy.credit.title': { fi: 'Luottopäätöksen käsittely', sv: 'Kreditbeslut', en: 'Credit Processing' },
  'privacy.credit.text': { fi: 'Lindorff Invest Oy toimii rekisterinpitäjänä maksuhakemusten käsittelyssä. Henkilötiedot ovat välttämättömiä hakemuksen käsittelyyn, luottopäätökseen ja asiakassuhteen hoitoon. Automaattisia luottopäätöksiä voi kiistää ja pyytää manuaalista käsittelyä ottamalla yhteyttä Lindorffin asiakaspalveluun, puh. 02 2700 327. Lisätietoja: lindorff.fi/tietosuoja.', sv: 'Lindorff Invest Oy fungerar som personuppgiftsansvarig vid behandling av betalningsansökningar. Personuppgifter är nödvändiga för ansökningsbehandling, kreditbeslut och kundrelationshantering. Automatiserade kreditbeslut kan bestridas; kunden kan begära manuell granskning genom att kontakta Lindorffs kundtjänst, tfn 02 2700 327. Mer information: lindorff.fi/tietosuoja.', en: 'Lindorff Invest Oy acts as data controller for payment application processing. Personal data is necessary for application handling, credit decisions and customer relationship management. Automated credit decisions can be contested; customers may request manual review by contacting Lindorff customer service at 02 2700 327. More information: lindorff.fi/tietosuoja.' },
  'privacy.back': { fi: '← Takaisin etusivulle', sv: '← Tillbaka till startsidan', en: '← Back to front page' },

  // Navigation - Articles
  'nav.articles': { fi: 'Artikkelit', sv: 'Artiklar', en: 'Articles' },

  // Articles section
  'articles.title': { fi: 'Artikkelit', sv: 'Artiklar', en: 'Articles' },
  'articles.subtitle': {
    fi: 'Ammatillisia artikkeleita lemmikkien terveydestä',
    sv: 'Professionella artiklar om husdjurens hälsa',
    en: 'Professional articles about pet health'
  },
  'articles.back': { fi: '← Takaisin etusivulle', sv: '← Tillbaka till startsidan', en: '← Back to homepage' },
  'articles.filter.all': { fi: 'Kaikki', sv: 'Alla', en: 'All' },
  'articles.filter.health': { fi: 'Terveys', sv: 'Hälsa', en: 'Health' },
  'articles.filter.surgery': { fi: 'Kirurgia', sv: 'Kirurgi', en: 'Surgery' },
  'articles.filter.dental': { fi: 'Hammashoito', sv: 'Tandvård', en: 'Dental' },
  'articles.filter.emergency': { fi: 'Päivystys', sv: 'Akutvård', en: 'Emergency' },
  'articles.filter.clinic': { fi: 'Klinikka', sv: 'Klinik', en: 'Clinic' },
  'articles.filter.cardiology': { fi: 'Kardiologia', sv: 'Kardiologi', en: 'Cardiology' },
  'articles.filter.endoscopy': { fi: 'Tähystys', sv: 'Endoskopi', en: 'Endoscopy' },
  'articles.filter.wildlife': { fi: 'Wildlife', sv: 'Wildlife', en: 'Wildlife' },
  'articles.tag.orthopedics': { fi: 'Ortopedia', sv: 'Ortopedi', en: 'Orthopedics' },

  // TTA Article
  'article.tta.title': {
    fi: 'TTA-leikkaus koirilla – eturistisiteen korjaus tibial tuberosity advancement -menetelmällä',
    sv: 'TTA-kirurgi hos hundar – korsbandsskadereparation med tibial tuberosity advancement-metoden',
    en: 'TTA Surgery in Dogs – Cranial Cruciate Ligament Repair with Tibial Tuberosity Advancement'
  },
  'article.tta.intro': {
    fi: 'Eturistisiteen (cranial cruciate ligament, CCL) repeämä on yksi yleisimmistä ortopedisistä ongelmista koirilla. Vaurioitunut ristiside aiheuttaa polvinivelen epävakautta, kipua, ontumista ja johtaa hoitamattomana nivelrikkoon. TTA eli tibial tuberosity advancement on moderni kirurginen menetelmä, jolla polvinivelen biomekaniikka korjataan ilman ristisiteen korvaamista.',
    sv: 'Främre korsbandsskada (cranial cruciate ligament, CCL) är ett av de vanligaste ortopediska problemen hos hundar. Det skadade korsbandet orsakar instabilitet i knäleden, smärta, hälta och leder obehandlat till artros. TTA, tibial tuberosity advancement, är en modern kirurgisk metod som korrigerar knäledens biomekanik utan att ersätta korsbandet.',
    en: 'Cranial cruciate ligament (CCL) rupture is one of the most common orthopedic problems in dogs. A damaged cruciate ligament causes knee joint instability, pain, limping, and leads to arthritis if left untreated. TTA, or tibial tuberosity advancement, is a modern surgical method that corrects knee joint biomechanics without replacing the ligament.'
  },
  'article.tta.how.title': {
    fi: 'Miten TTA toimii?',
    sv: 'Hur fungerar TTA?',
    en: 'How Does TTA Work?'
  },
  'article.tta.how.text': {
    fi: 'TTA-leikkauksessa sääriluun kyhmyä (tuberositas tibiae) siirretään eteenpäin ja kiinnitetään titaanisella levyllä, ruuveilla ja välikappaleella. Tämä muuttaa patellajänteen kulmaa suhteessa sääriluun yläpintaan noin 90 asteeseen, jolloin polvinivelen leikkaavat voimat (cranial tibial thrust) neutraloituvat. Koiran polvi stabiloituu toiminnallisesti ilman keinotekoista sidettä.',
    sv: 'Vid TTA-kirurgi flyttas skenbenets utskott (tuberositas tibiae) framåt och fixeras med en titanplatta, skruvar och distans. Detta ändrar patellarsenans vinkel i förhållande till skenbenets övre yta till cirka 90 grader, vilket neutraliserar de skjuvkrafter (cranial tibial thrust) som verkar på knäleden. Hundens knä stabiliseras funktionellt utan ett konstgjort ligament.',
    en: 'In TTA surgery, the tibial tuberosity is advanced forward and secured with a titanium plate, screws and spacer. This changes the angle of the patellar tendon relative to the tibial plateau to approximately 90 degrees, neutralizing the shear forces (cranial tibial thrust) acting on the knee joint. The dog\'s knee is functionally stabilized without an artificial ligament.'
  },
  'article.tta.vs.title': {
    fi: 'TTA vai lateral suture?',
    sv: 'TTA eller lateral sutur?',
    en: 'TTA or Lateral Suture?'
  },
  'article.tta.vs.text': {
    fi: 'Klinikalla käytämme kahta eri menetelmää eturistisiteen korjaukseen. Lateral suture -tekniikka stabiloi polvinivelen synteettisellä tukimateriaalilla, joka jäljittelee ristisiteen toimintaa. TTA sen sijaan muuttaa polven biomekaniikkaa pysyvästi. Lateral suture sopii erinomaisesti pienille ja keskikokoisille koirille sekä kissoille, kun taas TTA on hyvä vaihtoehto erityisesti aktiivisille ja suuremmille koirille.',
    sv: 'På kliniken använder vi två olika metoder för korsbandsskadereparation. Lateral sutur-teknik stabiliserar knäleden med syntetiskt stödmaterial som efterliknar korsbandets funktion. TTA förändrar däremot knäets biomekanik permanent. Lateral sutur passar utmärkt för små och medelstora hundar samt katter, medan TTA är ett bra alternativ särskilt för aktiva och större hundar.',
    en: 'At our clinic we use two methods for cruciate ligament repair. The lateral suture technique stabilizes the knee joint with synthetic support material that mimics the function of the ligament. TTA, on the other hand, permanently alters knee biomechanics. Lateral suture is excellent for small and medium-sized dogs and cats, while TTA is a good option especially for active and larger dogs.'
  },
  'article.tta.recovery.title': {
    fi: 'Toipuminen',
    sv: 'Återhämtning',
    en: 'Recovery'
  },
  'article.tta.recovery.text': {
    fi: 'TTA-leikkauksen jälkeen koira alkaa tyypillisesti varata jalalle jo muutaman päivän kuluessa. Luun paraneminen kestää noin 8 viikkoa, ja noin 16 viikon kohdalla useimmat koirat ovat palanneet täyteen aktiivisuuteen. Liikkumista rajoitetaan toipumisaikana ja kontrollikäynnit tehdään 2 ja 8 viikon kohdalla. Tutkimusten mukaan yli 90 % koirista saavuttaa hyvän tai erinomaisen lopputuloksen.',
    sv: 'Efter TTA-kirurgi börjar hunden vanligtvis belasta benet redan efter några dagar. Benläkningen tar cirka 8 veckor, och vid cirka 16 veckor har de flesta hundar återgått till full aktivitet. Rörelsen begränsas under återhämtningsperioden och kontrollbesök görs vid 2 och 8 veckor. Studier visar att över 90 % av hundarna uppnår ett bra eller utmärkt resultat.',
    en: 'After TTA surgery, dogs typically begin bearing weight within a few days. Bone healing takes about 8 weeks, and by around 16 weeks most dogs have returned to full activity. Movement is restricted during recovery and follow-up visits are scheduled at 2 and 8 weeks. Studies show that over 90% of dogs achieve a good or excellent outcome.'
  },
  'article.tta.risks.title': {
    fi: 'Riskit ja komplikaatiot',
    sv: 'Risker och komplikationer',
    en: 'Risks and Complications'
  },
  'article.tta.risks.text': {
    fi: 'Kuten kaikissa leikkauksissa, TTA:han liittyy komplikaatioiden mahdollisuus: infektio, implantin löystyminen, luun hitaampi paraneminen tai meniskivaurio (noin 9–10 % tapauksista). Komplikaatioriski pienenee kirurgin kokemuksen myötä. Klinikalla valvomme anestesiaa tarkasti ja käytämme kattavaa kivunlievennystä kaikissa ortopedisissä leikkauksissa.',
    sv: 'Som vid alla operationer finns risk för komplikationer vid TTA: infektion, implantatslossning, långsammare benläkning eller meniskskada (cirka 9–10 % av fallen). Komplikationsrisken minskar med kirurgens erfarenhet. På kliniken övervakar vi anestesin noggrant och använder omfattande smärtlindring vid alla ortopediska ingrepp.',
    en: 'As with all surgeries, TTA carries a risk of complications: infection, implant loosening, slower bone healing, or meniscal injury (approximately 9–10% of cases). Complication risk decreases with surgeon experience. At our clinic we closely monitor anesthesia and provide comprehensive pain management for all orthopedic procedures.'
  },
  'article.tta.when.title': {
    fi: 'Milloin kannattaa ottaa yhteyttä?',
    sv: 'När bör du kontakta oss?',
    en: 'When Should You Contact Us?'
  },
  'article.tta.when.text': {
    fi: 'Jos koirasi ontuu takajalkaansa, välttää rasitusta tai jäykistelee levon jälkeen, ristisidevaurio on yleinen syy. Varhainen diagnoosi ja hoito parantavat ennustetta merkittävästi. Varaa aika ortopediseen tutkimukseen — arvioimme tilanteen ja suosittelemme koirallesi parhaiten sopivan leikkausmenetelmän.',
    sv: 'Om din hund haltar på bakbenet, undviker ansträngning eller är stel efter vila kan en korsbandsskada vara orsaken. Tidig diagnos och behandling förbättrar prognosen avsevärt. Boka tid för en ortopedisk undersökning — vi bedömer situationen och rekommenderar den bäst lämpade operationsmetoden för din hund.',
    en: 'If your dog is limping on a hind leg, avoiding exertion, or stiff after rest, a cruciate ligament injury is a common cause. Early diagnosis and treatment significantly improve the prognosis. Book an orthopedic examination — we will assess the situation and recommend the most suitable surgical method for your dog.'
  },

  // Video-otoscopy Article
  'articles.tag.endoscopy': { fi: 'Tähystys', sv: 'Endoskopi', en: 'Endoscopy' },
  'article.otoscopy.title': {
    fi: 'Video-otoskopia – korvien tähystystutkimus koirilla ja kissoilla',
    sv: 'Video-otoskopi – öronendoskopi hos hundar och katter',
    en: 'Video-Otoscopy – Ear Endoscopy in Dogs and Cats'
  },
  'article.otoscopy.intro': {
    fi: 'Korvatulehdukset ovat yksi yleisimmistä syistä eläinlääkärikäyntiin. Tavallisella korvantähystimellä näkeminen rajoittuu korvakäytävän ulko-osiin, mutta video-otoskopia tuo aivan uuden tason diagnostiikkaan ja hoitoon. Menetelmässä korvakäytävään viedään ohut, jäykkä tähystin, jonka kärjessä on teräväpiirtokamera ja kirkas valo — kuva heijastetaan suurennettuna monitorille reaaliajassa.',
    sv: 'Öroninflammationer är en av de vanligaste orsakerna till veterinärbesök. Med ett vanligt otoskop begränsas sikten till hörselgångens yttre delar, men video-otoskopi ger en helt ny nivå av diagnostik och behandling. Metoden innebär att ett tunt, styvt endoskop med en högupplöst kamera och starkt ljus förs in i hörselgången — bilden projiceras förstorad på en monitor i realtid.',
    en: 'Ear infections are one of the most common reasons for veterinary visits. With a traditional otoscope, visibility is limited to the outer parts of the ear canal, but video-otoscopy brings an entirely new level of diagnostics and treatment. The method uses a thin, rigid endoscope with a high-definition camera and bright light inserted into the ear canal — the image is projected magnified onto a monitor in real time.'
  },
  'article.otoscopy.advantages.title': {
    fi: 'Miksi video-otoskopia?',
    sv: 'Varför video-otoskopi?',
    en: 'Why Video-Otoscopy?'
  },
  'article.otoscopy.advantages.text': {
    fi: 'Perinteiseen korvantähystimeen verrattuna video-otoskopia tarjoaa merkittävästi paremman suurennuksen ja valaistuksen, mahdollistaen koko korvakäytävän ja tärykalvon tarkan tarkastelun. Tähystimen kautta voidaan samanaikaisesti käyttää erikoistyökaluja: huuhtelukatetreja, harjoja, biopsiapihtejä ja imulaitteita. Näin diagnoosi ja hoito tapahtuvat samassa toimenpiteessä.',
    sv: 'Jämfört med ett traditionellt otoskop erbjuder video-otoskopi betydligt bättre förstoring och belysning, vilket möjliggör noggrann granskning av hela hörselgången och trumhinnan. Genom endoskopet kan man samtidigt använda specialverktyg: spolkatetrar, borstar, biopsitänger och sugapparater. Diagnos och behandling sker på så vis i samma ingrepp.',
    en: 'Compared to a traditional otoscope, video-otoscopy offers significantly better magnification and illumination, enabling detailed examination of the entire ear canal and tympanic membrane. Through the endoscope, specialized tools can be used simultaneously: flushing catheters, brushes, biopsy forceps and suction devices. This way diagnosis and treatment happen in the same procedure.'
  },
  'article.otoscopy.when.title': {
    fi: 'Milloin video-otoskopiaa suositellaan?',
    sv: 'När rekommenderas video-otoskopi?',
    en: 'When Is Video-Otoscopy Recommended?'
  },
  'article.otoscopy.when.text': {
    fi: 'Video-otoskopia on erityisen hyödyllinen kroonisissa korvatulehduksissa, jotka eivät reagoi tavanomaiseen lääkehoitoon. Tyypillisiä syitä tutkimukseen ovat toistuva korvatulehdus, epäilys vierasesineestä (esim. heinänkorsi korvakäytävässä), polyypit tai kasvaimet korvakäytävässä, tärykalvon vaurioepäily sekä välikorvatulehdus.',
    sv: 'Video-otoskopi är särskilt användbart vid kroniska öroninflammationer som inte svarar på konventionell medicinsk behandling. Typiska indikationer är återkommande öroninflammation, misstanke om främmande föremål (t.ex. grässtrå i hörselgången), polyper eller tumörer i hörselgången, misstänkt trumhinneskada samt mellanöreinflammation.',
    en: 'Video-otoscopy is especially useful for chronic ear infections that do not respond to conventional medical treatment. Typical indications include recurrent ear infections, suspected foreign bodies (e.g. grass awns in the ear canal), polyps or tumors in the ear canal, suspected tympanic membrane damage, and middle ear infections.'
  },
  'article.otoscopy.procedure.title': {
    fi: 'Miten toimenpide etenee?',
    sv: 'Hur går ingreppet till?',
    en: 'How Does the Procedure Work?'
  },
  'article.otoscopy.procedure.text': {
    fi: 'Video-otoskopia tehdään yleisanestesiassa, koska korvakäytävä on herkkä ja potilaan on pysyttävä täysin liikkumatta. Eläinlääkäri vie tähystimen varovasti korvakäytävään ja tutkii sen koko pituudelta monitorilta. Korvakäytävä huuhdellaan perusteellisesti — lika, erite ja biofilmi poistetaan. Tarvittaessa otetaan näytteitä bakteeriviljelyä varten, poistetaan vierasesineitä tai polyypeja, tai tehdään myringotomia (tärykalvon avaus) välikorvan tutkimiseksi ja hoitamiseksi.',
    sv: 'Video-otoskopi utförs under generell anestesi eftersom hörselgången är känslig och patienten måste ligga helt stilla. Veterinären för försiktigt in endoskopet i hörselgången och undersöker hela dess längd på monitorn. Hörselgången spolas noggrant — smuts, sekret och biofilm avlägsnas. Vid behov tas prover för bakterieodling, främmande föremål eller polyper avlägsnas, eller en myringotomi (öppning av trumhinnan) utförs för att undersöka och behandla mellanörat.',
    en: 'Video-otoscopy is performed under general anesthesia because the ear canal is sensitive and the patient must remain completely still. The veterinarian carefully guides the endoscope into the ear canal and examines its full length on the monitor. The ear canal is thoroughly flushed — debris, discharge and biofilm are removed. If needed, samples are collected for bacterial culture, foreign bodies or polyps are removed, or a myringotomy (opening of the tympanic membrane) is performed to examine and treat the middle ear.'
  },
  'article.otoscopy.chronic.title': {
    fi: 'Krooninen korvatulehdus ja sen haasteet',
    sv: 'Kronisk öroninflammation och dess utmaningar',
    en: 'Chronic Ear Infections and Their Challenges'
  },
  'article.otoscopy.chronic.text': {
    fi: 'Krooninen korvatulehdus on yleinen erityisesti luppakorvaisilla koiraroduilla ja allergisilla koirilla. Pitkittynyt tulehdus voi johtaa korvakäytävän ahtautumiseen, biofilmin muodostumiseen ja resistenttien bakteerien kasvuun. Video-otoskopia mahdollistaa perusteellisen syväpuhdistuksen, jossa bakteereja suojaava biofilmi poistetaan mekaanisesti. Puhdistuksen jälkeen korvaan voidaan annostella lääkettä suoraan tulehdusalueelle.',
    sv: 'Kronisk öroninflammation är särskilt vanlig hos hundraser med hängande öron och hos allergiska hundar. Långvarig inflammation kan leda till att hörselgången smalnar av, biofilm bildas och resistenta bakterier växer till. Video-otoskopi möjliggör grundlig djuprengöring där biofilmen som skyddar bakterierna avlägsnas mekaniskt. Efter rengöringen kan medicin appliceras direkt på det inflammerade området.',
    en: 'Chronic ear infection is especially common in floppy-eared dog breeds and allergic dogs. Prolonged inflammation can lead to narrowing of the ear canal, biofilm formation, and growth of resistant bacteria. Video-otoscopy enables thorough deep cleaning where the biofilm protecting bacteria is mechanically removed. After cleaning, medication can be applied directly to the inflamed area.'
  },
  'article.otoscopy.contact.title': {
    fi: 'Milloin kannattaa ottaa yhteyttä?',
    sv: 'När bör du kontakta oss?',
    en: 'When Should You Contact Us?'
  },
  'article.otoscopy.contact.text': {
    fi: 'Jos lemmikkisi raapii korviaan toistuvasti, korvista tulee pahaa hajua tai eritettä, pää on kallellaan, tai korvatulehdus palaa aina uudelleen hoidosta huolimatta — video-otoskopia voi olla avain ongelman ratkaisemiseen. Varaa aika tutkimukseen, niin selvitämme tilanteen ja suunnittelemme tehokkaan hoitostrategian.',
    sv: 'Om ditt husdjur kliar sig i öronen upprepat, det luktar illa från öronen eller det kommer sekret, huvudet är snett, eller öroninflammationen återkommer gång på gång trots behandling — kan video-otoskopi vara nyckeln till att lösa problemet. Boka tid för undersökning, så utreder vi situationen och planerar en effektiv behandlingsstrategi.',
    en: 'If your pet scratches its ears repeatedly, there is a bad smell or discharge from the ears, the head is tilted, or ear infections keep returning despite treatment — video-otoscopy may be the key to solving the problem. Book an appointment for examination, and we will investigate the situation and plan an effective treatment strategy.'
  },

  // MLK Anesthesia Article
  'articles.tag.anesthesia': { fi: 'Anestesia', sv: 'Anestesi', en: 'Anesthesia' },
  'article.mlk.title': {
    fi: 'MLK-infuusio – multimodaalinen kivunlievennys leikkausten aikana',
    sv: 'MLK-infusion – multimodal smärtlindring under kirurgi',
    en: 'MLK Infusion – Multimodal Pain Management During Surgery'
  },
  'article.mlk.intro': {
    fi: 'Kivunhallinta on yksi tärkeimmistä osa-alueista eläinkirurgiassa. Klinikalla käytämme MLK-infuusiota (metadoni-lidokaiini-ketamiini) vakiomenetelmänä kaikissa kivuliaissa pehmytkudosleikkauksissa — mukaan lukien naaraskoirien sterilisaatiot — sekä ortopedisissä toimenpiteissä. MLK on multimodaalinen eli monikomponenttinen kivunlievennystapa, jossa kolme eri lääkettä vaikuttavat samanaikaisesti eri kipumekanismeihin.',
    sv: 'Smärthantering är en av de viktigaste aspekterna av djurkirurgi. På kliniken använder vi MLK-infusion (metadon-lidokain-ketamin) som standardmetod vid alla smärtsamma mjukdelsoperationer — inklusive sterilisering av tikar — samt ortopediska ingrepp. MLK är en multimodal smärtlindringsmetod där tre olika läkemedel verkar samtidigt på olika smärtmekanismer.',
    en: 'Pain management is one of the most important aspects of veterinary surgery. At our clinic we use MLK infusion (methadone-lidocaine-ketamine) as the standard method for all painful soft tissue surgeries — including dog spays — and orthopedic procedures. MLK is a multimodal pain management approach where three different drugs act simultaneously on different pain pathways.'
  },
  'article.mlk.what.title': {
    fi: 'Mitä MLK-infuusio tarkoittaa?',
    sv: 'Vad innebär MLK-infusion?',
    en: 'What Is MLK Infusion?'
  },
  'article.mlk.what.text': {
    fi: 'MLK on kolmen lääkeaineen yhdistelmä, joka annostellaan jatkuvana suonensisäisenä infuusiona (CRI, constant rate infusion) koko leikkauksen ajan. Jokainen komponentti vaikuttaa eri mekanismilla: metadoni on opioidi, joka estää kipuviestien kulkua keskushermostossa; lidokaiini on puudute, joka vaimentaa kipusignaaleja perifeerisesti ja vähentää suoliston tulehdusreaktioita; ketamiini estää NMDA-reseptoreita ja ehkäisee tehokkaasti kivun "wind-up"-ilmiötä eli kipuherkkyyden voimistumista.',
    sv: 'MLK är en kombination av tre läkemedel som administreras som en kontinuerlig intravenös infusion (CRI, constant rate infusion) under hela operationen. Varje komponent verkar genom olika mekanismer: metadon är en opioid som blockerar smärtsignaler i centrala nervsystemet; lidokain är ett lokalbedövningsmedel som dämpar smärtsignaler perifert och minskar inflammatoriska reaktioner i tarmarna; ketamin blockerar NMDA-receptorer och förhindrar effektivt smärtans "wind-up"-fenomen, alltså en progressiv förstärkning av smärtkänsligheten.',
    en: 'MLK is a combination of three drugs administered as a continuous intravenous infusion (CRI, constant rate infusion) throughout surgery. Each component acts through a different mechanism: methadone is an opioid that blocks pain signals in the central nervous system; lidocaine is a local anesthetic that dampens pain signals peripherally and reduces intestinal inflammatory responses; ketamine blocks NMDA receptors and effectively prevents pain "wind-up" — the progressive amplification of pain sensitivity.'
  },
  'article.mlk.why.title': {
    fi: 'Miksi monikomponenttinen lähestymistapa?',
    sv: 'Varför en multimodal approach?',
    en: 'Why a Multimodal Approach?'
  },
  'article.mlk.why.text': {
    fi: 'Yksittäinen kipulääke vaikuttaa vain yhteen kipumekanismiin. Yhdistämällä kolme eri lääkeainetta matalilla annoksilla saadaan tehokkaampi kivunlievennys kuin yhdellä lääkkeellä yksinään — ja samalla pidetään kunkin lääkkeen sivuvaikutukset mahdollisimman pieninä. Tutkimusten mukaan MLK-infuusio vähentää inhalaatioanesteetin (isofluraanin) tarvetta jopa 45 %, mikä parantaa hemodynamiikkaa ja vähentää anestesiaan liittyviä riskejä.',
    sv: 'Ett enskilt smärtstillande läkemedel påverkar bara en smärtmekanism. Genom att kombinera tre olika läkemedel i låga doser uppnås effektivare smärtlindring än med ett enda läkemedel — samtidigt som biverkningarna från varje enskilt läkemedel hålls minimala. Studier visar att MLK-infusion minskar behovet av inhalationsanestesi (isofluran) med upp till 45 %, vilket förbättrar hemodynamiken och minskar anestesirelaterade risker.',
    en: 'A single painkiller affects only one pain mechanism. By combining three different drugs at low doses, more effective pain relief is achieved than with any single drug alone — while keeping the side effects of each drug to a minimum. Studies show that MLK infusion reduces the need for inhalation anesthetic (isoflurane) by up to 45%, which improves hemodynamics and reduces anesthesia-related risks.'
  },
  'article.mlk.benefits.title': {
    fi: 'Edut verrattuna perinteiseen kerta-annokseen',
    sv: 'Fördelar jämfört med traditionell engångsdosering',
    en: 'Advantages Over Traditional Single Dosing'
  },
  'article.mlk.benefits.text': {
    fi: 'Kun kipulääke annetaan yksittäisinä annoksina, potilaan verenkierrossa tapahtuu lääkepitoisuuden nousuja ja laskuja — välillä lääke vaikuttaa, välillä kipu palaa. Jatkuva infuusio tasoittaa nämä vaihtelut ja tarjoaa tasaisen, katkeamattoman kivunlievennyksen. Näin potilas pysyy vakaassa tilassa koko leikkauksen ajan ja toipuminen on nopeampaa ja kivuttomampaa.',
    sv: 'När smärtstillande ges som enskilda doser uppstår toppar och dalar i läkemedelskoncentrationen i blodet — ibland verkar läkemedlet, ibland återkommer smärtan. En kontinuerlig infusion jämnar ut dessa variationer och erbjuder jämn, oavbruten smärtlindring. På så vis förblir patienten stabil under hela operationen och återhämtningen blir snabbare och mer smärtfri.',
    en: 'When painkillers are given as single doses, the patient experiences peaks and troughs in blood drug levels — sometimes the drug is effective, sometimes the pain returns. A continuous infusion smooths out these fluctuations and provides steady, uninterrupted pain relief. This keeps the patient stable throughout surgery and makes recovery faster and less painful.'
  },
  'article.mlk.use.title': {
    fi: 'Käyttö klinikallamme',
    sv: 'Användning på vår klinik',
    en: 'Use at Our Clinic'
  },
  'article.mlk.use.text': {
    fi: 'MLK-infuusio on vakiomenetelmämme kaikissa kivuliaissa kirurgisissa toimenpiteissä. Käytämme sitä naaraskoirien sterilisaatioissa, kasvainleikkauksissa, vatsaonteloleikkauksissa ja kaikissa ortopedisissä leikkauksissa, kuten ristisideleikkauksissa, murtumien korjauksissa ja amputaatioissa. Infuusio aloitetaan ennen leikkausta ja sitä jatketaan tarvittaessa myös leikkauksen jälkeen optimaalisen kivunlievennyksen takaamiseksi.',
    sv: 'MLK-infusion är vår standardmetod vid alla smärtsamma kirurgiska ingrepp. Vi använder den vid sterilisering av tikar, tumöroperationer, bukoperationer och alla ortopediska ingrepp som korsbandsskadeoperationer, frakturreparationer och amputationer. Infusionen startas före operationen och fortsätter vid behov även postoperativt för optimal smärtlindring.',
    en: 'MLK infusion is our standard method for all painful surgical procedures. We use it for dog spays, tumor surgeries, abdominal surgeries and all orthopedic procedures such as cruciate ligament repairs, fracture repairs and amputations. The infusion is started before surgery and continued postoperatively when needed for optimal pain relief.'
  },
  'article.mlk.windup.title': {
    fi: 'Mitä on kivun "wind-up"?',
    sv: 'Vad är smärtans "wind-up"?',
    en: 'What Is Pain "Wind-Up"?'
  },
  'article.mlk.windup.text': {
    fi: 'Wind-up on ilmiö, jossa pitkittynyt kipu herkistää keskushermoston kipuratoja niin, että kipukokemus voimistuu progressiivisesti. Jos leikkauksen aikainen kivunlievennys on riittämätöntä, toipumisvaiheessa kipu voi olla vaikeasti hallittavissa ja vaatii huomattavasti suurempia lääkeannoksia. MLK-infuusion ketamiinikomponentti estää tätä herkistymistä tehokkaasti, mikä on yksi menetelmän merkittävimmistä eduista.',
    sv: 'Wind-up är ett fenomen där långvarig smärta sensibiliserar centrala nervsystemets smärtbanor så att smärtupplevelsen förstärks progressivt. Om smärtlindringen under operationen är otillräcklig kan smärtan i återhämtningsfasen vara svårkontrollerad och kräva betydligt högre läkemedelsdoser. Ketaminkomponenten i MLK-infusionen förhindrar effektivt denna sensibilisering, vilket är en av metodens mest betydande fördelar.',
    en: 'Wind-up is a phenomenon where prolonged pain sensitizes the central nervous system\'s pain pathways so that the pain experience intensifies progressively. If intraoperative pain relief is inadequate, post-surgical pain can be difficult to control and requires significantly higher drug doses. The ketamine component in MLK infusion effectively prevents this sensitization, which is one of the method\'s most significant advantages.'
  },
  'article.mlk.safety.title': {
    fi: 'Turvallisuus ja valvonta',
    sv: 'Säkerhet och övervakning',
    en: 'Safety and Monitoring'
  },
  'article.mlk.safety.text': {
    fi: 'MLK-infuusion lääkeaineet annetaan matalilla annoksilla, jolloin sivuvaikutusriski on pieni. Tutkimuksissa MLK ei ole aiheuttanut haitallisia hemodynaamiseen vaikutuksia. Klinikalla valvomme jokaista potilasta tarkasti koko anestesian ajan — käytössämme on kaksi ventilaattoria turvallisen anestesian varmistamiseksi, ja päivitämme jatkuvasti protokolliamme ja koulutustamme.',
    sv: 'Läkemedlen i MLK-infusionen ges i låga doser, vilket ger en liten risk för biverkningar. I studier har MLK inte orsakat negativa hemodynamiska effekter. På kliniken övervakar vi varje patient noggrant under hela anestesin — vi har två ventilatorer för att säkerställa säker anestesi, och vi uppdaterar kontinuerligt våra protokoll och vår utbildning.',
    en: 'The drugs in MLK infusion are given at low doses, resulting in a low risk of side effects. Studies have shown that MLK does not cause adverse hemodynamic effects. At our clinic we closely monitor every patient throughout anesthesia — we have two ventilators to ensure safe anesthesia, and we continuously update our protocols and training.'
  },

  // Article: Diarrhea
  'article.diarrhea.title': {
    fi: 'Ripuli koirilla ja kissoilla — syyt, kotihoito ja milloin ottaa yhteyttä klinikkaan',
    sv: 'Diarré hos hundar och katter — orsaker, hembehandling och när du ska kontakta kliniken',
    en: 'Diarrhea in Dogs and Cats — Causes, Home Care and When to Contact the Clinic'
  },
  'article.diarrhea.intro': {
    fi: 'Ripuli on yksi yleisimmistä syistä eläinlääkärikäyntiin. Lähes jokainen koira ja kissa kärsii ripulista jossain vaiheessa elämäänsä. Useimmiten kyseessä on lievä, itsestään paraneva vaiva — mutta joskus ripuli voi olla merkki vakavammasta sairaudesta. Tässä artikkelissa käymme läpi yleisimmät syyt, kotihoidon perusteet ja tilanteet, joissa on syytä ottaa yhteyttä eläinlääkäriin.',
    sv: 'Diarré är en av de vanligaste orsakerna till veterinärbesök. Nästan varje hund och katt drabbas av diarré någon gång i livet. Oftast handlar det om ett lindrigt, självläkande besvär — men ibland kan diarré vara tecken på allvarligare sjukdom. I denna artikel går vi igenom de vanligaste orsakerna, grunderna i hembehandling och situationer då du bör kontakta veterinären.',
    en: 'Diarrhea is one of the most common reasons for a veterinary visit. Nearly every dog and cat experiences diarrhea at some point. Most often it is a mild, self-resolving issue — but sometimes diarrhea can indicate a more serious condition. In this article we cover the most common causes, basics of home care and situations where you should contact the clinic.'
  },
  'article.diarrhea.causes.title': {
    fi: 'Yleisimmät syyt',
    sv: 'Vanligaste orsaker',
    en: 'Most Common Causes'
  },
  'article.diarrhea.causes.text': {
    fi: 'Koirilla yleisin syy on ruokavaliovirhe — roskien syöminen, ruuanvaihto liian nopeasti tai pöytäjätteiden syöminen. Kissoilla äkillinen ruuanvaihto on tavallinen laukaisija. Muita yleisiä syitä ovat suolistoloiset (Giardia, suolinkaiset, kokkidit), stressi (muutto, lemmikkihotelli, muutokset arjessa), ruoka-aineallergia tai -intoleranssi, bakteeri- ja virusinfektiot (erityisesti parvovirukseen rokottamattomat pennut ja kissanpennut) sekä myrkylliset aineet.',
    sv: 'Hos hundar är den vanligaste orsaken felaktigt matintag — att äta skräp, för snabbt fobyte eller bordssrester. Hos katter är plötsligt fobyte en vanlig utlösare. Andra vanliga orsaker inkluderar tarmparasiter (Giardia, spolmask, koccidier), stress (flytt, hundpensionat, förändringar i vardagen), foallergi eller -intolerans, bakterie- och virusinfektioner (särskilt parvoviruset hos ovaccinerade valpar och kattungar) samt giftiga ämnen.',
    en: 'In dogs, the most common cause is dietary indiscretion — eating garbage, switching food too quickly or consuming table scraps. In cats, sudden food changes are a common trigger. Other common causes include intestinal parasites (Giardia, roundworms, coccidia), stress (moving, boarding, changes in routine), food allergy or intolerance, bacterial and viral infections (especially parvovirus in unvaccinated puppies and kittens) and toxic substances.'
  },
  'article.diarrhea.homecare.title': {
    fi: 'Kotihoito',
    sv: 'Hembehandling',
    en: 'Home Care'
  },
  'article.diarrhea.homecare.text': {
    fi: 'Jos lemmikkisi on muuten virkeä, syö ja juo normaalisti eikä ripuli ole veristä, voit kokeilla kotihoitoa 24–48 tunnin ajan. Koiralla voidaan pidättäytyä ruuasta 12–24 tuntia suoliston lepuuttamiseksi — kissaa ei saa paastottaa yli 12 tuntia maksan rasvoittumisriskin vuoksi. Siirry miedolle dieettille: keitetty kana (ilman nahkaa ja luita) ja riisi suhteessa 1:2. Tarjoa pieniä annoksia 4–6 kertaa päivässä. Varmista riittävä nesteensaanti — raikasta vettä tulee olla aina tarjolla. Eläimille tarkoitetut probiootit (esim. Fortiflora) tukevat suoliston palautumista. Jatka mietoa dieettiä 3–5 päivää ulosteen normalisoitumisen jälkeen ja palaa normaaliin ruokaan asteittain 5–7 päivän kuluessa.',
    sv: 'Om ditt husdjur annars är pigg, äter och dricker normalt och diarrén inte är blodig, kan du prova hembehandling i 24–48 timmar. Hundar kan fastas 12–24 timmar för att låta tarmen vila — katter ska inte fastas mer än 12 timmar på grund av risk för leverförfettning. Byt till mild diet: kokt kyckling (utan skinn och ben) och ris i förhållandet 1:2. Ge små portioner 4–6 gånger dagligen. Säkerställ tillräckligt vätskeintag — färskt vatten ska alltid finnas tillgängligt. Probiotika avsedda för djur (t.ex. Fortiflora) stödjer tarmens återhämtning. Fortsätt med mild diet 3–5 dagar efter att avföringen normaliserats och återgå gradvis till normal kost under 5–7 dagar.',
    en: 'If your pet is otherwise alert, eating and drinking normally and the diarrhea is not bloody, you can try home care for 24–48 hours. Dogs can be fasted for 12–24 hours to rest the gut — cats should not be fasted for more than 12 hours due to the risk of hepatic lipidosis. Switch to a bland diet: boiled chicken (no skin, no bones) and rice at a 1:2 ratio. Offer small portions 4–6 times daily. Ensure adequate hydration — fresh water should always be available. Veterinary probiotics (e.g. Fortiflora) support gut recovery. Continue the bland diet for 3–5 days after the stool normalizes and gradually return to regular food over 5–7 days.'
  },
  'article.diarrhea.warning.title': {
    fi: 'Milloin ottaa yhteyttä eläinlääkäriin',
    sv: 'När ska du kontakta veterinären',
    en: 'When to Contact the Veterinarian'
  },
  'article.diarrhea.warning.text': {
    fi: 'Ota yhteyttä eläinlääkäriin välittömästi, jos ripuli on veristä (veri voi olla kirkkaanpunaista tai tummaa/tervamusta), lemmikki oksentaa samanaikaisesti, eläin on väsynyt tai apaattinen, huomaat kuivumisen merkkejä (kuivat ikenet, ihon joustamattomuus), epäilet myrkyn syömistä, eläimellä on kuumetta tai vatsakipua. Pentujen ja kissanpentujen kohdalla älä odota — ne kuivuvat nopeasti ja ovat alttiita vakavalle parvovirustaudille. Ota yhteyttä 12–24 tunnin kuluessa oireiden alkamisesta. Myös iäkkäät ja pienet rodut kuivuvat nopeammin. Jos ripuli ei hellitä 48 tunnin kotihoidon jälkeen tai palaa toistuvasti, varaa aika tutkimuksiin. Vinkki: ota ulosteesta valokuva — se auttaa eläinlääkäriä arvioimaan tilanteen.',
    sv: 'Kontakta veterinären omedelbart om diarrén är blodig (blodet kan vara klarrött eller mörkt/tjärsvart), husdjuret kräks samtidigt, djuret är trött eller apatiskt, du märker tecken på uttorkning (torra tandkött, minskad hudelasticitet), du misstänker förgiftning, djuret har feber eller buksmärta. För valpar och kattungar — vänta inte. De torkar ut snabbt och är känsliga för allvarlig parvovirusinfektion. Kontakta kliniken inom 12–24 timmar efter symtomdebut. Även äldre djur och små raser torkar ut snabbare. Om diarrén inte förbättras efter 48 timmars hembehandling eller återkommer upprepade gånger, boka tid för undersökning. Tips: ta ett foto av avföringen — det hjälper veterinären att bedöma situationen.',
    en: 'Contact the veterinarian immediately if the diarrhea is bloody (blood can be bright red or dark/tarry black), your pet is vomiting at the same time, the animal is lethargic or apathetic, you notice signs of dehydration (dry gums, loss of skin elasticity), you suspect toxin ingestion, or the animal has fever or abdominal pain. For puppies and kittens — do not wait. They dehydrate quickly and are vulnerable to serious parvovirus infection. Contact the clinic within 12–24 hours of symptom onset. Older animals and small breeds also dehydrate faster. If diarrhea does not improve after 48 hours of home care or keeps recurring, book an appointment for examination. Tip: take a photo of the stool — it helps the veterinarian assess the situation.'
  },
  'article.diarrhea.prevention.title': {
    fi: 'Ehkäisy',
    sv: 'Förebyggande',
    en: 'Prevention'
  },
  'article.diarrhea.prevention.text': {
    fi: 'Vaihda ruokaa asteittain 7–10 päivän kuluessa. Vältä pöytäjätteitä, luita ja pääsyä roskakoriin. Huolehdi säännöllisistä madotuksista — matolääkkeitä saa apteekista ilman reseptiä. Huolehdi myös rokotuksista. Vähennä stressiä muutostilanteissa (feromonivalmisteet kuten Adaptil koirille ja Feliway kissoille voivat auttaa).',
    sv: 'Byt foder gradvis under 7–10 dagar. Undvik bordsrester, ben och tillgång till sopor. Se till att avmaskning sker regelbundet — avmaskningsmedel finns receptfritt på apoteket. Se även till att vaccinationerna är uppdaterade. Minska stress vid förändringar (feromonprodukter som Adaptil för hundar och Feliway för katter kan hjälpa).',
    en: 'Switch food gradually over 7–10 days. Avoid table scraps, bones and access to garbage. Keep up with regular deworming — deworming medicine is available over the counter at pharmacies. Keep vaccinations up to date. Reduce stress during transitions (pheromone products like Adaptil for dogs and Feliway for cats can help).'
  },
  'article.diarrhea.contact.title': {
    fi: 'Ota yhteyttä',
    sv: 'Kontakta oss',
    en: 'Contact Us'
  },
  'article.diarrhea.contact.text': {
    fi: 'Jos olet epävarma, soita meille (puh. 06-3217300) tai lähetä sähköpostia osoitteeseen elainklinikkasaari.vaasa@gmail.com — voit liittää mukaan valokuvia. Neuvomme mielellämme, onko eläinlääkärikäynti tarpeen.',
    sv: 'Om du är osäker, ring oss (tfn 06-3217300) eller skicka e-post till elainklinikkasaari.vaasa@gmail.com — du kan bifoga foton. Vi ger gärna råd om ett veterinärbesök behövs.',
    en: 'If you are unsure, give us a call (tel. 06-3217300) or send an email to elainklinikkasaari.vaasa@gmail.com — you can attach photos. We are happy to advise whether a visit is needed.'
  },

  // Article: PDA
  'article.pda.title': {
    fi: 'Avoin valtimotiehyt (PDA) koirilla — synnynnäinen sydänvika, joka on parannettavissa',
    sv: 'Öppen ductus arteriosus (PDA) hos hundar — ett medfött hjärtfel som kan botas',
    en: 'Patent Ductus Arteriosus (PDA) in Dogs — A Congenital Heart Defect That Can Be Cured'
  },
  'article.pda.intro': {
    fi: 'Avoin valtimotiehyt eli PDA on yksi koirien yleisimmistä synnynnäisistä sydänvioista. Kyseessä on verisuoni, joka yhdistää aortan ja keuhkovaltimon sikiökaudella, mutta jonka pitäisi sulkeutua syntymän jälkeen. Kun se jää auki, sydän kuormittuu ja ilman hoitoa 60–70 % koirista menehtyy ensimmäisen elinvuoden aikana sydämen vajaatoimintaan. Hyvä uutinen: PDA on yksi harvoista sydänsairauksista, joka voidaan parantaa kokonaan, kun se havaitaan ajoissa.',
    sv: 'Öppen ductus arteriosus, eller PDA, är ett av de vanligaste medfödda hjärtfelen hos hundar. Det handlar om ett blodkärl som förbinder aorta och lungartären under fosterlivet, men som normalt stängs efter födseln. När det förblir öppet överbelastas hjärtat, och utan behandling dör 60–70 % av hundarna inom första levnadsåret av hjärtsvikt. Den goda nyheten: PDA är ett av få hjärtfel som kan botas helt om det upptäcks i tid.',
    en: 'Patent ductus arteriosus, or PDA, is one of the most common congenital heart defects in dogs. It is a blood vessel that connects the aorta and pulmonary artery during fetal life but should close after birth. When it remains open, the heart becomes overloaded, and without treatment 60–70% of affected dogs die within the first year from heart failure. The good news: PDA is one of the few heart conditions that can be completely cured when detected early.'
  },
  'article.pda.what.title': {
    fi: 'Mikä on PDA?',
    sv: 'Vad är PDA?',
    en: 'What Is PDA?'
  },
  'article.pda.what.text': {
    fi: 'Sikiökaudella keuhkot eivät toimi ja kaasunvaihto tapahtuu istukan kautta. Valtimotiehyt ohjaa veren keuhkojen ohi suoraan verenkiertoon. Syntymän jälkeen keuhkot laajenevat, happipitoisuus nousee ja valtimotiehyt supistuu ja sulkeutuu normaalisti 12–24 tunnin kuluessa. PDA:ssa tämä sulkeutuminen jää tapahtumatta. Veri virtaa jatkuvasti aortasta keuhkovaltimoon, mikä kuormittaa sydämen vasenta puolta ja johtaa sen laajentumiseen. Hoitamattomana tämä etenee sydämen vajaatoimintaan.',
    sv: 'Under fosterutvecklingen fungerar inte lungorna och gasutbytet sker via moderkakan. Ductus arteriosus leder blodet förbi lungorna direkt ut i cirkulationen. Efter födseln expanderar lungorna, syrenivån stiger och ductus arteriosus drar ihop sig och stängs normalt inom 12–24 timmar. Vid PDA sker denna stängning inte. Blod flödar kontinuerligt från aorta till lungartären, vilket överbelastar hjärtats vänstra sida och leder till att det vidgas. Utan behandling fortskrider detta till hjärtsvikt.',
    en: 'During fetal development the lungs are not functional and gas exchange occurs via the placenta. The ductus arteriosus diverts blood past the lungs directly into the circulation. After birth the lungs expand, oxygen levels rise, and the ductus arteriosus constricts and normally closes within 12–24 hours. In PDA this closure does not happen. Blood flows continuously from the aorta into the pulmonary artery, overloading the left side of the heart and causing it to enlarge. Without treatment this progresses to heart failure.'
  },
  'article.pda.breeds.title': {
    fi: 'Altiit rodut',
    sv: 'Predisponerade raser',
    en: 'Predisposed Breeds'
  },
  'article.pda.breeds.text': {
    fi: 'PDA:lla on geneettinen tausta ja se on yleisempi naarailla (suhde 3:1). Alttiita rotuja ovat muun muassa maltankoira, pomeranian, shetlanninlammaskoira, englanninspringerspanieli, bichon frise, kääpiö- ja toyvillakoira, yorkshirenterrieri, chihuahua ja cockerspanieli. PDA:ta esiintyy myös kissoilla, mutta huomattavasti harvemmin.',
    sv: 'PDA har en genetisk grund och är vanligare hos tikar (förhållande 3:1). Predisponerade raser inkluderar bland annat malteser, pomeranian, shetland sheepdog, engelsk springer spaniel, bichon frise, dvärg- och toypudel, yorkshireterrier, chihuahua och cockerspaniel. PDA förekommer även hos katter, men betydligt mer sällan.',
    en: 'PDA has a genetic basis and is more common in females (ratio 3:1). Predisposed breeds include Maltese, Pomeranian, Shetland Sheepdog, English Springer Spaniel, Bichon Frise, Miniature and Toy Poodle, Yorkshire Terrier, Chihuahua and Cocker Spaniel. PDA also occurs in cats but much less frequently.'
  },
  'article.pda.signs.title': {
    fi: 'Oireet — mitä omistaja voi huomata',
    sv: 'Symtom — vad ägaren kan märka',
    en: 'Signs — What Owners May Notice'
  },
  'article.pda.signs.text': {
    fi: 'PDA löytyy usein ensimmäisellä eläinlääkärikäynnillä, kun eläinlääkäri kuulee jatkuvan "koneäänen" (machinery murmur) sydäntä kuunnellessaan. Omistaja voi huomata, että pentu on pentueensa pienin, väsyy nopeasti leikkiessä, hengittää normaalia nopeammin tai yskii. Vakavammissa tapauksissa voi esiintyä pyörtymistä tai vatsan turvotusta. Joskus omistaja tuntee rintakehällä värinää lemmikkiä pidettäessä.',
    sv: 'PDA upptäcks ofta vid det första veterinärbesöket, när veterinären hör ett kontinuerligt "maskinljud" (machinery murmur) vid auskultation. Ägaren kan märka att valpen är kullens minsta, tröttas snabbt under lek, andas snabbare än normalt eller hostar. I allvarligare fall kan svimning eller buksvullnad förekomma. Ibland känner ägaren en vibration på bröstkorgen när de håller sitt husdjur.',
    en: 'PDA is often discovered at the first veterinary visit when the vet hears a continuous "machinery murmur" during auscultation. Owners may notice the puppy is the smallest in the litter, tires quickly during play, breathes faster than normal, or coughs. In more severe cases fainting or abdominal swelling may occur. Sometimes owners feel a vibration on the chest wall when holding their pet.'
  },
  'article.pda.treatment.title': {
    fi: 'Hoito',
    sv: 'Behandling',
    en: 'Treatment'
  },
  'article.pda.treatment.text': {
    fi: 'PDA hoidetaan sulkemalla avoin valtimotiehyt. Tähän on kaksi päämenetelmää. Kirurginen ligatuura tehdään rintakehän avauksella, jossa tiehyt suljetaan ompelemalla — menetelmällä on yli 90–95 % onnistumisprosentti. Katetritoimenpiteessä (ACDO, Amplatz Canine Duct Occluder) erikoislaite viedään reisivaltimon kautta tiehyeen ja se sulkee verisuonen sisältäpäin — tämä on vähemmän invasiivinen, ja onnistumisprosentti on yli 95–98 %. Lääkehoidolla voidaan vakauttaa potilaan tila ennen toimenpidettä, mutta se ei paranna PDA:ta. Mitä aikaisemmin sulku tehdään — mieluiten ennen 6 kuukauden ikää — sitä parempi ennuste.',
    sv: 'PDA behandlas genom att stänga den öppna ductus arteriosus. Det finns två huvudmetoder. Kirurgisk ligering utförs via torakotomi, där kanalen stängs med suturer — metoden har över 90–95 % framgångsfrekvens. Vid kateterbaserad stängning (ACDO, Amplatz Canine Duct Occluder) förs en specialanordning via lårbensartären till kanalen och stänger blodkärlet inifrån — detta är mindre invasivt med över 95–98 % framgångsfrekvens. Medicinsk behandling kan stabilisera patienten före ingreppet men botar inte PDA. Ju tidigare stängningen görs — helst före 6 månaders ålder — desto bättre prognos.',
    en: 'PDA is treated by closing the open ductus. There are two main methods. Surgical ligation is performed via thoracotomy, where the duct is tied off with sutures — success rate exceeds 90–95%. Catheter-based closure (ACDO, Amplatz Canine Duct Occluder) involves delivering a specialized device through the femoral artery to seal the vessel from within — this is less invasive with a success rate over 95–98%. Medical treatment can stabilize the patient before the procedure but does not cure PDA. The earlier the closure is performed — ideally before 6 months of age — the better the prognosis.'
  },
  'article.pda.clinic.title': {
    fi: 'Diagnostiikka klinikallamme',
    sv: 'Diagnostik på vår klinik',
    en: 'Diagnosis at Our Clinic'
  },
  'article.pda.clinic.text': {
    fi: 'Eläinklinikka Saaressa teemme sydämen ultraäänitutkimuksia, joiden avulla PDA voidaan havaita ja diagnosoida klinikalla. Eläinlääkärimme Leena suorittaa sydämen kaikututkimukset. Jos pennullasi todetaan sivuääni, voimme tutkia sydämen ultraäänellä ja tarvittaessa ohjata jatkohoitoon erikoisklinikalle.',
    sv: 'På Djurkliniken Saari utför vi hjärtultraljudsundersökningar som gör det möjligt att upptäcka och diagnostisera PDA på kliniken. Vår veterinär Leena utför hjärtultraljudsundersökningarna. Om ett blåsljud upptäcks hos din valp kan vi undersöka hjärtat med ultraljud och vid behov remittera till en specialistklinik för vidare behandling.',
    en: 'At Eläinklinikka Saari, we perform cardiac ultrasound examinations that allow us to detect and diagnose PDA at our clinic. Our veterinarian Leena performs the cardiac ultrasound examinations. If a murmur is detected in your puppy, we can examine the heart with ultrasound and refer to a specialist clinic for further treatment if needed.'
  },
  'article.pda.prognosis.title': {
    fi: 'Ennuste',
    sv: 'Prognos',
    en: 'Prognosis'
  },
  'article.pda.prognosis.text': {
    fi: 'Ajoissa hoidetun PDA:n ennuste on erinomainen. Koirat, joiden valtimotiehyt suljetaan ennen sydämen vajaatoiminnan kehittymistä, elävät tyypillisesti normaalin elämän. Sydämen laajentuminen palautuu usein viikkojen tai kuukausien kuluessa. Ilman hoitoa ennuste on huono: noin 60–70 % koirista menehtyy ensimmäisen elinvuoden aikana.',
    sv: 'Prognosen för PDA som behandlas i tid är utmärkt. Hundar vars ductus stängs innan hjärtsvikt utvecklas lever vanligtvis ett normalt liv. Hjärtförstoringen går ofta tillbaka inom veckor till månader. Utan behandling är prognosen dålig: cirka 60–70 % av hundarna dör inom det första levnadsåret.',
    en: 'The prognosis for PDA treated in time is excellent. Dogs whose ductus is closed before heart failure develops typically live a normal life. Heart enlargement often reverses within weeks to months. Without treatment the prognosis is poor: approximately 60–70% of dogs die within the first year.'
  },
  'article.pda.message.title': {
    fi: 'Tärkein viesti omistajille',
    sv: 'Det viktigaste budskapet till ägare',
    en: 'The Most Important Message for Owners'
  },
  'article.pda.message.text': {
    fi: 'Jokaisen pennun sydän tulee kuunnella ensimmäisellä eläinlääkärikäynnillä. Jos sivuääni todetaan, jatkotutkimukset sydämen ultraäänellä tulee tehdä viipymättä. PDA on parannettavissa — kunhan se havaitaan ajoissa. Alttiiden rotujen kasvattajien ja omistajien tulisi olla erityisen valppaina.',
    sv: 'Varje valps hjärta bör auskulteras vid det första veterinärbesöket. Om ett blåsljud upptäcks bör vidare undersökning med hjärtultraljud ske utan dröjsmål. PDA kan botas — förutsatt att det upptäcks i tid. Uppfödare och ägare av predisponerade raser bör vara särskilt uppmärksamma.',
    en: 'Every puppy\'s heart should be auscultated at the first veterinary visit. If a murmur is detected, further examination with cardiac ultrasound should be done without delay. PDA is curable — as long as it is detected in time. Breeders and owners of predisposed breeds should be especially vigilant.'
  },

  // Article: Grain-Free Food
  'article.grainfree.title': {
    fi: 'Viljaton ruoka koirille ja kissoille — onko se tarpeellista vai haitallista?',
    sv: 'Spannmålsfri mat för hundar och katter — är det nödvändigt eller skadligt?',
    en: 'Grain-Free Food for Dogs and Cats — Is It Necessary or Harmful?'
  },
  'article.grainfree.intro': {
    fi: 'Viljaton lemmikkiruoka on ollut valtava trendi viime vuosina. Markkinointi lupaa "luonnollisempaa" ruokavaliota, mutta vuonna 2018 Yhdysvaltain elintarvikevirasto FDA aloitti tutkimuksen, joka yhdisti viljattomat ruokavaliot koirien sydänsairauksiin. Tässä artikkelissa selvitämme, mitä tiede sanoo — ja mitä eläinlääkärit suosittelevat.',
    sv: 'Spannmålsfri djurmat har varit en enorm trend de senaste åren. Marknadsföringen lovar en "mer naturlig" diet, men 2018 inledde amerikanska livsmedelsverket FDA en undersökning som kopplade spannmålsfria dieter till hjärtsjukdom hos hundar. I denna artikel reder vi ut vad forskningen säger — och vad veterinärer rekommenderar.',
    en: 'Grain-free pet food has been a huge trend in recent years. Marketing promises a "more natural" diet, but in 2018 the U.S. Food and Drug Administration (FDA) launched an investigation linking grain-free diets to heart disease in dogs. In this article we examine what the science says — and what veterinarians recommend.'
  },
  'article.grainfree.fda.title': {
    fi: 'FDA:n tutkimus ja sydänsairaus',
    sv: 'FDA:s undersökning och hjärtsjukdom',
    en: 'The FDA Investigation and Heart Disease'
  },
  'article.grainfree.fda.text': {
    fi: 'FDA tutki satoja raportteja dilatoivasta kardiomyopatiasta (DCM) — sydänsairaudesta, jossa sydänlihas heikkenee ja sydän laajenee. Huolestuttavaa oli, että DCM:ää esiintyi roduilla, jotka eivät normaalisti ole alttiita sille, kuten kultaisilla noutajilla, labradoreilla ja sekarotuisilla. Tutkimuksessa 91 % epäillyistä ruokavalioista oli viljattomia ja 93 % sisälsi herneitä tai linssejä pääainesosina. Vaikka suoraa syy-yhteyttä ei lopullisesti todistettu, monet koirat toipuivat, kun ruokavalio vaihdettiin viljapohjaiseen — mikä on merkittävä havainto.',
    sv: 'FDA undersökte hundratals rapporter om dilaterad kardiomyopati (DCM) — en hjärtsjukdom där hjärtmuskeln försvagas och hjärtat vidgas. Det oroande var att DCM förekom hos raser som normalt inte är predisponerade, som golden retriever, labrador och blandraser. I undersökningen var 91 % av de misstänkta dieterna spannmålsfria och 93 % innehöll ärtor eller linser som huvudingredienser. Även om ett direkt orsakssamband inte slutgiltigt bevisades, återhämtade sig många hundar när kosten byttes till spannmålsbaserad — vilket är en viktig observation.',
    en: 'The FDA investigated hundreds of reports of dilated cardiomyopathy (DCM) — a heart disease where the heart muscle weakens and the heart enlarges. What was alarming was that DCM appeared in breeds not normally prone to it, such as Golden Retrievers, Labradors and mixed breeds. In the investigation, 91% of suspected diets were grain-free and 93% contained peas or lentils as main ingredients. While a direct causal link was not definitively proven, many dogs recovered when switched to grain-inclusive diets — which is a significant finding.'
  },
  'article.grainfree.myth.title': {
    fi: 'Tarvitseeko lemmikkini villatonta ruokaa?',
    sv: 'Behöver mitt husdjur spannmålsfri mat?',
    en: 'Does My Pet Need Grain-Free Food?'
  },
  'article.grainfree.myth.text': {
    fi: 'Todennäköisesti ei. Markkinointiväite siitä, että viljat ovat "täyteaineita" tai aiheuttavat allergioita, ei perustu tieteeseen. Koirat ovat kehittyneet tuhansia vuosia ihmisen rinnalla ja niillä on jopa 30 kopiota AMY2B-geenistä, joka pilkkoo tärkkelystä — susilla vain 2. Koirat sulattavat kypsennettyjä viljoja yli 99-prosenttisesti. Todellinen vilja-allergia on erittäin harvinainen: vain noin 1 % ruoka-allergisista koirista reagoi viljoihin. Yleisimmät allergeenit ovat nauta (34 %), maitotuotteet (17 %) ja kana (15 %).',
    sv: 'Förmodligen inte. Marknadsföringspåståendet att spannmål är "fyllmedel" eller orsakar allergier saknar vetenskapligt stöd. Hundar har utvecklats i tusentals år vid människans sida och har upp till 30 kopior av AMY2B-genen som bryter ner stärkelse — vargar har bara 2. Hundar smälter tillagad spannmål till över 99 %. Verklig spannmålsallergi är extremt ovanlig: bara cirka 1 % av hundar med matallergi reagerar på spannmål. De vanligaste allergenerna är nötkött (34 %), mejeriprodukter (17 %) och kyckling (15 %).',
    en: 'Probably not. The marketing claim that grains are "fillers" or cause allergies is not supported by science. Dogs have evolved alongside humans for thousands of years and carry up to 30 copies of the AMY2B gene for starch digestion — wolves have only 2. Dogs digest cooked grains at over 99% efficiency. True grain allergy is extremely rare: only about 1% of food-allergic dogs react to grains. The most common allergens are beef (34%), dairy (17%) and chicken (15%).'
  },
  'article.grainfree.cats.title': {
    fi: 'Entä kissat?',
    sv: 'Hur är det med katter?',
    en: 'What About Cats?'
  },
  'article.grainfree.cats.text': {
    fi: 'Kissat ovat pakollisia lihansyöjiä ja tarvitsevat runsaasti eläinproteiinia. Viljattomat kissanruoat korvaavat kuitenkin usein viljat perunalla, herneillä tai tapiokalla — jolloin hiilihydraattipitoisuus on käytännössä sama tai jopa korkeampi. Tutkimukset osoittavat, että kissat pystyvät sulattamaan hiilihydraatteja tehokkaasti (94–100 %). Kissojen ruoassa tärkeintä on riittävä eläinproteiinin ja tauriinin määrä — ei se, onko ruoka villatonta vai ei.',
    sv: 'Katter är obligata köttätare och behöver rikligt med animaliskt protein. Spannmålsfria kattfoder ersätter dock ofta spannmål med potatis, ärtor eller tapioka — varvid kolhydratinnehållet i praktiken är detsamma eller till och med högre. Studier visar att katter kan smälta kolhydrater effektivt (94–100 %). Det viktigaste i kattmat är tillräckligt animaliskt protein och taurin — inte huruvida maten är spannmålsfri eller inte.',
    en: 'Cats are obligate carnivores and need plenty of animal protein. However, grain-free cat foods often replace grains with potatoes, peas or tapioca — meaning the carbohydrate content is practically the same or even higher. Studies show cats can digest carbohydrates effectively (94–100%). What matters most in cat food is adequate animal protein and taurine — not whether it is grain-free or not.'
  },
  'article.grainfree.advice.title': {
    fi: 'Eläinlääkärin suositus',
    sv: 'Veterinärens rekommendation',
    en: 'Veterinary Recommendation'
  },
  'article.grainfree.advice.text': {
    fi: 'Älä valitse villatonta ruokaa ilman lääketieteellistä syytä. Vältä ruokia, joissa herneet, linssit tai kikherneet ovat pääainesosina. Valitse ruoka tunnetuilta valmistajilta, jotka työllistävät eläinravitsemuksen asiantuntijoita ja toteuttavat ruokintakokeita. Jos epäilet ruoka-allergiaa, ota yhteyttä eläinlääkäriin — oikea diagnoosi tehdään eliminaatiodieetillä, ei vaihtamalla satunnaisesti ruokaa. Jos lemmikkisi syö tällä hetkellä villatonta ruokaa, keskustele eläinlääkärisi kanssa vaihtoehdoista.',
    sv: 'Välj inte spannmålsfri mat utan medicinsk anledning. Undvik foder där ärtor, linser eller kikärtor är huvudingredienser. Välj foder från etablerade tillverkare som anställer djurnutritionsexperter och genomför utfodringsförsök. Om du misstänker matallergi, kontakta veterinären — korrekt diagnos ställs med eliminationsdiet, inte genom att slumpmässigt byta foder. Om ditt husdjur för närvarande äter spannmålsfri mat, diskutera alternativ med din veterinär.',
    en: 'Do not choose grain-free food without a medical reason. Avoid foods where peas, lentils or chickpeas are among the main ingredients. Choose food from established manufacturers that employ animal nutrition experts and conduct feeding trials. If you suspect a food allergy, contact the veterinarian — proper diagnosis is made through an elimination diet, not by randomly switching foods. If your pet currently eats grain-free food, discuss alternatives with your vet.'
  },

  // Article: Dental Brushing
  'article.brushing.title': {
    fi: 'Hampaiden harjaus — paras asia, jonka voit tehdä lemmikkisi hampaiden hyväksi',
    sv: 'Tandborstning — det bästa du kan göra för ditt husdjurs tänder',
    en: 'Tooth Brushing — The Best Thing You Can Do for Your Pet\'s Teeth'
  },
  'article.brushing.intro': {
    fi: '80 % koirista ja 70 % kissoista kärsii jonkinasteisesta hammassairaudesta jo kolmen vuoden ikäisinä. Hammassairaudet aiheuttavat kroonista kipua, infektioita ja voivat vahingoittaa jopa sydäntä, munuaisia ja maksaa. Päivittäinen hampaiden harjaus on tehokkain keino ehkäistä näitä ongelmia — ja se on helpompaa kuin luulet.',
    sv: '80 % av hundarna och 70 % av katterna lider av någon grad av tandsjukdom redan vid tre års ålder. Tandsjukdomar orsakar kronisk smärta, infektioner och kan till och med skada hjärtat, njurarna och levern. Daglig tandborstning är det mest effektiva sättet att förebygga dessa problem — och det är enklare än du tror.',
    en: '80% of dogs and 70% of cats suffer from some degree of dental disease by age three. Dental disease causes chronic pain, infections and can even damage the heart, kidneys and liver. Daily tooth brushing is the most effective way to prevent these problems — and it is easier than you think.'
  },
  'article.brushing.why.title': {
    fi: 'Miksi päivittäin?',
    sv: 'Varför dagligen?',
    en: 'Why Daily?'
  },
  'article.brushing.why.text': {
    fi: 'Plakki — bakteerien muodostama pehmeä kerros — alkaa muodostua hampaiden pinnoille 6–8 tunnin kuluessa puhdistuksen jälkeen. Jo 24 tunnissa plakki kovettuu hammaskiveksi, jota ei enää saa harjaamalla pois. Siksi päivittäinen harjaus on ratkaisevan tärkeää: se katkaisee kierteen ennen kuin plakki ehtii kovettua. Tutkimusten mukaan päivittäinen harjaus vähentää plakin kertymistä 40–70 %. Joka toinen päivä harjaaminen on vain noin puolet yhtä tehokasta.',
    sv: 'Plack — en mjuk beläggning av bakterier — börjar bildas på tandytorna 6–8 timmar efter rengöring. Redan inom 24 timmar hårdnar plack till tandsten, som inte längre kan avlägsnas med borstning. Därför är daglig borstning avgörande: den bryter cykeln innan plack hinner hårdna. Studier visar att daglig borstning minskar plackbildningen med 40–70 %. Borstning varannan dag är bara ungefär hälften så effektivt.',
    en: 'Plaque — a soft layer of bacteria — begins forming on tooth surfaces within 6–8 hours of cleaning. Within just 24 hours, plaque hardens into tartar that can no longer be removed by brushing. This is why daily brushing is critical: it breaks the cycle before plaque hardens. Studies show daily brushing reduces plaque buildup by 40–70%. Brushing every other day is only about half as effective.'
  },
  'article.brushing.how.title': {
    fi: 'Näin harjaat lemmikkisi hampaat',
    sv: 'Så borstar du ditt husdjurs tänder',
    en: 'How to Brush Your Pet\'s Teeth'
  },
  'article.brushing.how.text': {
    fi: 'Käytä aina eläimille tarkoitettua hammastahnaa — ei koskaan ihmisten tahnaa, joka voi sisältää ksylitolia (erittäin myrkyllistä koirille) ja fluorideja. Eläintahnat ovat turvallisia nieltäväksi ja niitä on liha- ja kalamakuisina. Sormiharja on hyvä aloittelijoille ja kissoille. Nosta huulta ja harjaa 45 asteen kulmassa ienrajaa vasten pyörivin liikkein. Keskity ulkopintoihin — kieli puhdistaa sisäpintoja luonnollisesti. Tärkeimmät kohdat ovat yläleuan takahampaat ja kulmahampaiden alue. 1–2 minuuttia riittää.',
    sv: 'Använd alltid tandkräm avsedd för djur — aldrig mänsklig tandkräm som kan innehålla xylitol (extremt giftigt för hundar) och fluorid. Djurtandkräm är säker att svälja och finns i kött- och fisksmaker. Fingerborste är bra för nybörjare och katter. Lyft läppen och borsta i 45 graders vinkel mot tandköttsranden med cirkulära rörelser. Fokusera på yttersidorna — tungan rengör insidorna naturligt. De viktigaste områdena är överkäkens bakre tänder och hörntänderna. 1–2 minuter räcker.',
    en: 'Always use toothpaste made for pets — never human toothpaste, which may contain xylitol (extremely toxic to dogs) and fluoride. Pet toothpaste is safe to swallow and comes in meat and fish flavors. A finger brush is great for beginners and cats. Lift the lip and brush at a 45-degree angle to the gumline using circular motions. Focus on the outer surfaces — the tongue naturally cleans the inner surfaces. The most important areas are the upper back teeth and the canines. 1–2 minutes is enough.'
  },
  'article.brushing.start.title': {
    fi: 'Näin totutat lemmikkisi harjaukseen',
    sv: 'Så vänjer du ditt husdjur vid borstning',
    en: 'Getting Your Pet Used to Brushing'
  },
  'article.brushing.start.text': {
    fi: 'Aloita rauhallisesti. Ensimmäisellä viikolla totuta lemmikkisi suun käsittelyyn koskettamalla huulia ja hampaita sormella. Toisella viikolla anna lemmikkisi maistaa hammastahnaa sormeltasi ja hieroa sitä etuhampaiden pintaan. Kolmannella viikolla ota harja mukaan ja harjaa muutama hammas. Laajenna vähitellen harjattavaa aluetta. Anna aina palkinto jälkeenpäin. Älä pakota — pidä tuokiot lyhyinä ja positiivisina. Pentuiällä aloittaminen on helpointa, mutta myös aikuinen eläin voi oppia.',
    sv: 'Börja lugnt. Under första veckan, vänj husdjuret vid munhantering genom att röra vid läppar och tänder med fingret. Under andra veckan, låt husdjuret smaka på tandkrämen från ditt finger och gnid lite på framtänderna. Under tredje veckan, ta med borsten och borsta några tänder. Utöka gradvis det borstade området. Ge alltid belöning efteråt. Tvinga inte — håll stunderna korta och positiva. Det är lättast att börja som valp, men även vuxna djur kan lära sig.',
    en: 'Start slowly. During the first week, get your pet used to mouth handling by touching the lips and teeth with your finger. In the second week, let your pet taste the toothpaste from your finger and rub some on the front teeth. In the third week, introduce the brush and brush a few teeth. Gradually expand the area. Always reward afterward. Never force — keep sessions short and positive. Starting as a puppy is easiest, but adult animals can learn too.'
  },
  'article.brushing.signs.title': {
    fi: 'Hammassairauden merkit',
    sv: 'Tecken på tandsjukdom',
    en: 'Signs of Dental Disease'
  },
  'article.brushing.signs.text': {
    fi: 'Pahanhajuinen hengitys (ei ole normaalia!), punaiset tai turvonneet ikenet, näkyvä hammaskivi, ruuan putoilu syödessä, yhdellä puolella pureskelu, kuolaaminen, kasvojen turvotus, haluttomuus antaa koskea päähän, käyttäytymisen muutokset tai painon lasku. Muista, että eläimet piilottavat kipua — monet vakavasti sairaat lemmikit syövät edelleen normaalisti. Omistajat raportoivat usein dramaattisen muutoksen käytöksessä hammashoidon jälkeen.',
    sv: 'Dålig andedräkt (det är inte normalt!), röda eller svullna tandkött, synlig tandsten, tappar mat vid ätande, tuggar bara på ena sidan, dregling, svullnad i ansiktet, ovilja att bli berörd vid huvudet, beteendeförändringar eller viktnedgång. Kom ihåg att djur döljer smärta — många allvarligt sjuka husdjur fortsätter äta normalt. Ägare rapporterar ofta dramatisk beteendeförbättring efter tandbehandling.',
    en: 'Bad breath (this is not normal!), red or swollen gums, visible tartar, dropping food while eating, chewing on one side only, drooling, facial swelling, reluctance to have the head touched, behavioral changes or weight loss. Remember that animals hide pain — many seriously ill pets continue eating normally. Owners often report dramatic behavioral improvement after dental treatment.'
  },
  'article.brushing.professional.title': {
    fi: 'Ammattimainen hammaspuhdistus',
    sv: 'Professionell tandrengöring',
    en: 'Professional Dental Cleaning'
  },
  'article.brushing.professional.text': {
    fi: 'Vaikka harjaisit päivittäin, ammattimainen hammaspuhdistus yleisanestesiassa on tarpeen ajoittain. Ammattipuhdistuksessa pääsemme käsittelemään ienrajan alaiset alueet, otamme hammasröntgenkuvat (jopa 60 % hammassairauksista on piilossa ienrajan alla) ja tarkastamme jokaisen hampaan. Yleisanestesia on välttämätön turvalliseen ja perusteelliseen puhdistukseen. Niin sanottu "anestesiaton hammaspuhdistus" on vain kosmeettista — se ei hoida ienrajan alaista sairautta ja antaa väärän turvallisuudentunteen.',
    sv: 'Även om du borstar dagligen behövs professionell tandrengöring under generell anestesi med jämna mellanrum. Vid professionell rengöring kan vi behandla områden under tandköttsranden, ta tandröntgen (upp till 60 % av tandsjukdomar är dolda under tandköttsranden) och undersöka varje tand. Generell anestesi är nödvändig för en säker och grundlig rengöring. Så kallad "anestesifri tandrengöring" är bara kosmetisk — den behandlar inte sjukdom under tandköttsranden och ger en falsk känsla av trygghet.',
    en: 'Even with daily brushing, professional dental cleaning under general anesthesia is needed periodically. During professional cleaning we can treat areas below the gumline, take dental X-rays (up to 60% of dental disease is hidden below the gumline) and examine every tooth. General anesthesia is essential for safe and thorough cleaning. So-called "anesthesia-free dental cleaning" is purely cosmetic — it does not address disease below the gumline and gives a false sense of security.'
  },
  'article.brushing.challenge.title': {
    fi: '#BrushChamp — harjaatko joka päivä?',
    sv: '#BrushChamp — borstar du varje dag?',
    en: '#BrushChamp — Do You Brush Every Day?'
  },
  'article.brushing.challenge.text': {
    fi: 'Eläinklinikka Saaressa arvostamme omistajia, jotka sitoutuvat lemmikkinsä hampaiden päivittäiseen harjaukseen. Jos harjaat lemmikkisi hampaat joka päivä, kerro meille — kunniajäsenet saavat #BrushChamp-mitalin! Ota yhteyttä klinikalla tai sähköpostitse: elainklinikkasaari.vaasa@gmail.com.',
    sv: 'På Eläinklinikka Saari uppskattar vi ägare som förbinder sig till daglig tandborstning av sitt husdjur. Om du borstar ditt husdjurs tänder varje dag, berätta för oss — hedersmedlemmar får #BrushChamp-medaljen! Kontakta oss på kliniken eller via e-post: elainklinikkasaari.vaasa@gmail.com.',
    en: 'At Eläinklinikka Saari we value owners who commit to daily tooth brushing. If you brush your pet\'s teeth every day, let us know — dedicated brushers receive the #BrushChamp medal! Contact us at the clinic or by email: elainklinikkasaari.vaasa@gmail.com.'
  },

  // Article: PerioVive
  'article.periovive.title': {
    fi: 'PerioVive — hyaluronihappogeeli parodontaalisairauksien hoitoon',
    sv: 'PerioVive — hyaluronsyragel för behandling av parodontal sjukdom',
    en: 'PerioVive — Hyaluronic Acid Gel for Periodontal Disease Treatment'
  },
  'article.periovive.intro': {
    fi: 'Parodontaalisairaus (ientauti) on yleisin sairaus koirilla ja kissoilla — jopa 80 % yli kolmevuotiaista koirista kärsii jonkinasteisesta ientaudista. Hoitamattomana se johtaa hampaan kiinnityskudosten tuhoutumiseen, luukatoon ja lopulta hampaiden menetykseen. PerioVive on eläinlääketieteelliseen käyttöön kehitetty hyaluronihappogeeli, joka tuo uuden mahdollisuuden parodontaalisairauksien hoitoon hammastoimenpiteiden yhteydessä.',
    sv: 'Parodontal sjukdom (tandköttsinflammation) är den vanligaste sjukdomen hos hundar och katter — upp till 80 % av hundar över tre år lider av någon grad av tandköttssjukdom. Obehandlad leder den till förstörelse av tandens stödjevävnader, benförlust och slutligen tandförlust. PerioVive är en hyaluronsyragel utvecklad för veterinärmedicinskt bruk som ger nya möjligheter att behandla parodontal sjukdom i samband med tandbehandlingar.',
    en: 'Periodontal disease is the most common disease in dogs and cats — up to 80% of dogs over three years old suffer from some degree of gum disease. Left untreated, it leads to destruction of tooth support structures, bone loss and ultimately tooth loss. PerioVive is a hyaluronic acid gel developed for veterinary use that brings a new option for treating periodontal disease during dental procedures.'
  },
  'article.periovive.what.title': {
    fi: 'Mitä PerioVive on?',
    sv: 'Vad är PerioVive?',
    en: 'What is PerioVive?'
  },
  'article.periovive.what.text': {
    fi: 'PerioVive on 0,8 % hyaluronihappoa (HA) sisältävä geeli, joka on suunniteltu eläinlääketieteellisiin hammastoimenpiteisiin. Hyaluronihappo on luonnollisesti sidekudoksessa, ikenissä ja nivelnesteessä esiintyvä aine, jolla on keskeinen rooli kudosten paranemisessa ja uusiutumisessa. Geeli levitetään suoraan ientaskuihin ja hoitoalueille hammastoimenpiteen yhteydessä.',
    sv: 'PerioVive är en gel som innehåller 0,8 % hyaluronsyra (HA) och är designad för veterinärmedicinska tandbehandlingar. Hyaluronsyra förekommer naturligt i bindväv, tandkött och ledvätska och spelar en central roll i vävnadsläkning och regenerering. Gelen appliceras direkt i tandköttsfickor och behandlingsområden under tandbehandlingen.',
    en: 'PerioVive is a 0.8% hyaluronic acid (HA) gel designed for veterinary dental procedures. Hyaluronic acid is a naturally occurring substance in connective tissue, gums and joint fluid that plays a key role in tissue healing and regeneration. The gel is applied directly to periodontal pockets and treatment areas during the dental procedure.'
  },
  'article.periovive.how.title': {
    fi: 'Miten se vaikuttaa?',
    sv: 'Hur fungerar det?',
    en: 'How Does It Work?'
  },
  'article.periovive.how.text': {
    fi: 'Hyaluronihappo vaikuttaa usealla eri mekanismilla. Se vähentää tulehdusta ja turvotusta ikenissä, edistää pehmytkudosten ja luun uusiutumista, tukee verihyytymän vakautta toimenpidealueella, muodostaa suojaavan esteen mikrobeja vastaan ja nopeuttaa kudosten paranemista. Tutkimuksissa yksittäinen HA-annos toimenpiteen jälkeen nopeutti kudosten paranemista, lisäsi luun muodostumista ja vähensi ientaskujen syvyyttä merkittävästi.',
    sv: 'Hyaluronsyra verkar genom flera mekanismer. Den minskar inflammation och svullnad i tandköttet, främjar regenerering av mjukvävnad och ben, stöder blodkoagelstabilitet i behandlingsområdet, bildar en skyddande barriär mot mikrober och påskyndar vävnadsläkning. Studier visar att en enda dos HA efter ingreppet påskyndade vävnadsläkning, ökade benbildning och minskade tandköttsfickans djup avsevärt.',
    en: 'Hyaluronic acid works through multiple mechanisms. It reduces inflammation and swelling in the gums, promotes soft tissue and bone regeneration, supports blood clot stability at the treatment site, forms a protective barrier against microbes and accelerates tissue healing. Studies show a single dose of HA after the procedure accelerated tissue healing, increased bone formation and significantly reduced periodontal pocket depth.'
  },
  'article.periovive.evidence.title': {
    fi: 'Tieteellinen näyttö',
    sv: 'Vetenskaplig evidens',
    en: 'Scientific Evidence'
  },
  'article.periovive.evidence.text': {
    fi: 'Hyaluronihapon tehosta parodontaalisairauksien hoidossa on runsaasti tutkimusnäyttöä. Koiramalleilla tehdyissä tutkimuksissa HA osoitti 89 % luun uudelleenmuodostumisen hoidetuissa kudosvaurioissa, verrattuna 39 %:iin kontrolliryhmässä. Ientaskujen syvyyden väheneminen ja kliininen kiinnittymisen paraneminen olivat tilastollisesti merkitseviä. Hyaluronihapon tehoa tukevat yli 5 koiratutkimusta ja yli 100 ihmistutkimusta parodontaalisairauksien hoidossa.',
    sv: 'Det finns omfattande forskningsbevis för hyaluronsyrans effekt vid behandling av parodontal sjukdom. I studier på hundmodeller visade HA 89 % bennybildning i behandlade vävnadsdefekter, jämfört med 39 % i kontrollgruppen. Minskning av tandköttsfickornas djup och förbättrad klinisk fästning var statistiskt signifikanta. Effekten av hyaluronsyra stöds av över 5 hundstudier och över 100 humanstudier inom parodontal behandling.',
    en: 'There is extensive research evidence for the effectiveness of hyaluronic acid in treating periodontal disease. In canine model studies, HA demonstrated 89% bone regeneration in treated tissue defects, compared to 39% in the control group. Reduction in pocket depth and improvement in clinical attachment were statistically significant. The effectiveness of HA is supported by over 5 canine studies and over 100 human studies in periodontal treatment.'
  },
  'article.periovive.when.title': {
    fi: 'Milloin PerioVivea käytetään?',
    sv: 'När används PerioVive?',
    en: 'When is PerioVive Used?'
  },
  'article.periovive.when.text': {
    fi: 'PerioVive soveltuu käytettäväksi hammaskiven poiston jälkeen syventyneiden ientaskujen hoitoon, hampaanpoiston jälkeen paranemisen edistämiseen, ikenien kirurgisten toimenpiteiden yhteydessä sekä parodontaalisairauden etenemisen hidastamiseen. Geeli levitetään toimenpidealueelle nukutuksen aikana, joten erillistä käyntiä ei tarvita.',
    sv: 'PerioVive lämpar sig för behandling av fördjupade tandköttsfickor efter tandstensborttagning, för att främja läkning efter tandextraktion, vid kirurgiska ingrepp på tandköttet samt för att bromsa parodontal sjukdomsutveckling. Gelen appliceras på behandlingsområdet under narkos, så inget separat besök behövs.',
    en: 'PerioVive is suitable for treating deepened periodontal pockets after scaling, promoting healing after tooth extraction, during gingival surgical procedures and slowing the progression of periodontal disease. The gel is applied to the treatment area during anesthesia, so no separate visit is needed.'
  },
  'article.periovive.clinic.title': {
    fi: 'PerioVive-hoito klinikallamme',
    sv: 'PerioVive-behandling på vår klinik',
    en: 'PerioVive Treatment at Our Clinic'
  },
  'article.periovive.clinic.text': {
    fi: 'Eläinklinikka Saaressa tarjoamme PerioVive-hoitoa osana laajaa hammashoitopalveluamme. Käytämme PerioViveä hammastoimenpiteiden yhteydessä edistämään ikenien ja luun paranemista. Kysy lisää seuraavalla käynnillä tai ota yhteyttä klinikkaan — arvioimme mielellämme, hyötyisikö lemmikkisi PerioVive-hoidosta.',
    sv: 'På Djurkliniken Saari erbjuder vi PerioVive-behandling som en del av vår omfattande tandvård. Vi använder PerioVive i samband med tandbehandlingar för att främja läkning av tandkött och ben. Fråga mer vid nästa besök eller kontakta kliniken — vi bedömer gärna om ditt husdjur skulle dra nytta av PerioVive-behandling.',
    en: 'At Eläinklinikka Saari, we offer PerioVive treatment as part of our extensive dental care services. We use PerioVive during dental procedures to promote gum and bone healing. Ask us more at your next visit or contact the clinic — we are happy to assess whether your pet would benefit from PerioVive treatment.'
  },

  // Article 9: Independent Clinic
  'article.independent.tag': { fi: 'Klinikka', sv: 'Klinik', en: 'Clinic' },
  'article.independent.title': {
    fi: 'Miksi yksityinen eläinklinikka on tärkeä valinta?',
    sv: 'Varför är en privat djurklinik ett viktigt val?',
    en: 'Why Choosing an Independent Veterinary Clinic Matters'
  },
  'article.independent.intro': {
    fi: 'Suomen eläinlääkärimarkkina on muuttunut dramaattisesti viimeisen vuosikymmenen aikana. Kaksi ulkomaalaisomisteista ketjua — Evidensia ja Vireä — hallitsevat nyt 50–70 % markkinasta. Eläinklinikka Saari on Vaasan ainoa yksityinen pieneläinklinikka, ja haluamme kertoa, miksi se merkitsee.',
    sv: 'Den finländska veterinärmarknaden har förändrats dramatiskt under det senaste årtiondet. Två utlandsägda kedjor — Evidensia och Vireä — kontrollerar nu 50–70 % av marknaden. Djurklinik Saari är den enda privata smådjurskliniken i Vasa, och vi vill berätta varför det spelar roll.',
    en: 'The Finnish veterinary market has changed dramatically over the past decade. Two foreign-owned chains — Evidensia and Vireä — now control 50–70% of the market. Eläinklinikka Saari is the only private small animal clinic in Vaasa, and we want to explain why that matters.'
  },
  'article.independent.chains.title': {
    fi: 'Ketjut Suomessa',
    sv: 'Kedjorna i Finland',
    en: 'Chains in Finland'
  },
  'article.independent.chains.text': {
    fi: 'Evidensia on osa IVC Evidensia -konsernia, jota hallitsevat ruotsalainen pääomasijoitusyhtiö EQT, yhdysvaltalainen Silver Lake ja muut sijoittajat. Konsernin arvo on noin 12,3 miljardia euroa. Suomessa Evidensialla on noin 50 klinikkaa ja 40–50 % markkinaosuus. Vireä (ent. Univet) kuuluu tanskalaiseen Vetopia-ryhmään, jota omistaa tanskalainen pääomasijoitusyhtiö Axcel. Vireällä on noin 15 klinikkaa Suomessa. Lisäksi 11 Suomen 13 päivystyseläinsairaalasta on Evidensian omistuksessa.',
    sv: 'Evidensia är en del av IVC Evidensia-koncernen, som kontrolleras av det svenska riskkapitalbolaget EQT, amerikanska Silver Lake och andra investerare. Koncernens värde uppgår till cirka 12,3 miljarder euro. I Finland har Evidensia cirka 50 kliniker och 40–50 % marknadsandel. Vireä (f.d. Univet) ingår i den danska Vetopia-gruppen, som ägs av det danska riskkapitalbolaget Axcel. Vireä har cirka 15 kliniker i Finland. Dessutom ägs 11 av Finlands 13 jourdjursjukhus av Evidensia.',
    en: 'Evidensia is part of the IVC Evidensia group, controlled by Swedish private equity firm EQT, American Silver Lake and other investors. The group is valued at approximately €12.3 billion. In Finland, Evidensia operates about 50 clinics with 40–50% market share. Vireä (formerly Univet) belongs to the Danish Vetopia group, owned by Danish private equity firm Axcel. Vireä has about 15 clinics in Finland. Additionally, 11 of Finland\'s 13 emergency animal hospitals are owned by Evidensia.'
  },
  'article.independent.prices.title': {
    fi: 'Vaikutus hintoihin',
    sv: 'Påverkan på priser',
    en: 'Impact on Prices'
  },
  'article.independent.prices.text': {
    fi: 'Kilpailu- ja kuluttajaviraston (KKV) marraskuussa 2024 julkaiseman tutkimuksen mukaan Evidensia nosti hintojaan 28 % vuosina 2021–2024 — 15 prosenttiyksikköä enemmän kuin alan keskiarvo. Kotitalouksien eläinlääkärimenot ovat kaksinkertaistuneet kymmenessä vuodessa. Yksityiset klinikat ovat KKV:n mukaan johdonmukaisesti edullisempia kuin ketjuklinikat.',
    sv: 'Enligt en studie publicerad av Konkurrens- och konsumentverket (KKV) i november 2024 höjde Evidensia sina priser med 28 % mellan 2021 och 2024 — 15 procentenheter mer än branschgenomsnittet. Hushållens veterinärutgifter har fördubblats på tio år. Enligt KKV är privata kliniker konsekvent billigare än kedjekliniker.',
    en: 'According to a study published by the Finnish Competition and Consumer Authority (KKV) in November 2024, Evidensia raised its prices by 28% between 2021 and 2024 — 15 percentage points above the industry average. Household spending on veterinary care has doubled in ten years. According to KKV, independent clinics are consistently more affordable than chain clinics.'
  },
  'article.independent.quality.title': {
    fi: 'Mitä ketjuistuminen tarkoittaa hoidolle?',
    sv: 'Vad innebär kedjeetableringen för vården?',
    en: 'What Does Chain Ownership Mean for Care?'
  },
  'article.independent.quality.text': {
    fi: 'Kun sijoitusyhtiöt omistavat klinikat, tavoitteena on tuotto — ei eläinten hyvinvointi. Eläinlääkäreiltä odotetaan enemmän potilaita vuoroa kohden ja tulostavoitteet ohjaavat hoitopäätöksiä. YLE:n selvityksen mukaan ketjuissa hinnat nousivat 2–4 kertaa vuodessa, mutta palkat eivät nousseet kolmeen vuoteen. Hoitohenkilökunta ei uskalla puhua, koska monilla alueilla ei ole vaihtoehtoista työnantajaa.',
    sv: 'När investeringsbolag äger kliniker är målet avkastning — inte djurens välbefinnande. Veterinärer förväntas ta emot fler patienter per skift och resultatmål styr behandlingsbeslut. Enligt YLE:s undersökning höjdes priserna 2–4 gånger per år i kedjorna, men lönerna steg inte på tre år. Vårdpersonal vågar inte tala ut eftersom det på många orter inte finns en alternativ arbetsgivare.',
    en: 'When investment firms own clinics, the goal is profit — not animal welfare. Veterinarians are expected to see more patients per shift and revenue targets influence treatment decisions. According to YLE\'s investigation, chain prices rose 2–4 times per year, but staff salaries did not increase for three years. Staff are afraid to speak up because in many regions there is no alternative employer.'
  },
  'article.independent.international.title': {
    fi: 'Kansainvälinen esimerkki',
    sv: 'Internationella exempel',
    en: 'International Examples'
  },
  'article.independent.international.text': {
    fi: 'Iso-Britanniassa eläinlääkärimarkkinat ketjuistuivat aikaisemmin. Yksityisten klinikoiden osuus laski 83 %:sta 45 %:iin kahdeksassa vuodessa, ja hinnat nousivat 63 %. Maan kilpailuviranomainen (CMA) totesi, että ketjuklinikoissa maksetaan keskimäärin 16,6 % enemmän kuin yksityisillä. Ruotsissa Evidensian hinnat nousivat 15 % vuodessa — yksityisillä vain 6 %.',
    sv: 'I Storbritannien konsoliderades veterinärmarknaden tidigare. Andelen privata kliniker sjönk från 83 % till 45 % på åtta år, och priserna steg med 63 %. Landets konkurrensmyndighet (CMA) konstaterade att kedjekliniker i genomsnitt är 16,6 % dyrare än privata. I Sverige steg Evidensias priser med 15 % per år — medan privata kliniker bara höjde med 6 %.',
    en: 'In the UK, veterinary market consolidation happened earlier. Independent clinics dropped from 83% to 45% in eight years, and prices rose 63%. The Competition and Markets Authority (CMA) found that chain clinics charge on average 16.6% more than independents. In Sweden, Evidensia raised prices 15% per year — independents only 6%.'
  },
  'article.independent.choice.title': {
    fi: 'Eläinklinikka Saari — tietoinen valinta',
    sv: 'Djurklinik Saari — ett medvetet val',
    en: 'Eläinklinikka Saari — A Conscious Choice'
  },
  'article.independent.choice.text': {
    fi: 'Olemme saaneet useita yhteydenottoja ketjuilta, jotka haluaisivat ostaa klinikkamme. Olemme päättäneet pysyä yksityisenä. Meille tämä tarkoittaa, että hoitopäätökset tekee aina eläinlääkäri — ei sijoitusyhtiö. Hintamme perustuvat todellisiin kustannuksiin, emme noudata konsernin tulostavoitteita. Sama eläinlääkäri hoitaa lemmikkisi koko sen elämän ajan. Tulomme jäävät Vaasaan. Kun valitset yksityisen klinikan, tuet myös suomalaista yrittäjyyttä ja kilpailua markkinoilla, jotka keskittyvät yhä harvempiin käsiin.',
    sv: 'Vi har fått flera förfrågningar från kedjor som vill köpa vår klinik. Vi har beslutat att förbli privata. För oss innebär detta att behandlingsbeslut alltid fattas av veterinären — inte av ett investeringsbolag. Våra priser baseras på verkliga kostnader, vi följer inga koncernens resultatmål. Samma veterinär tar hand om ditt husdjur hela dess liv. Våra intäkter stannar i Vasa. När du väljer en privat klinik stöder du också finländskt företagande och konkurrens på en marknad som koncentreras i allt färre händer.',
    en: 'We have received multiple offers from chains wanting to buy our clinic. We have chosen to remain independent. For us this means that treatment decisions are always made by the veterinarian — not an investment firm. Our prices are based on actual costs, not corporate revenue targets. The same vet cares for your pet throughout its life. Our revenue stays in Vaasa. When you choose an independent clinic, you also support Finnish entrepreneurship and competition in a market that is concentrating into fewer and fewer hands.'
  },

  // Article 10: Food Allergies
  'article.food.tag': { fi: 'Lemmikkien terveys', sv: 'Husdjurshälsa', en: 'Pet Health' },
  'article.food.title': {
    fi: 'Ruoka-allergiat koirilla ja kissoilla — oireet, diagnoosi ja eliminaatioruokavalio',
    sv: 'Födoämnesallergi hos hundar och katter — symtom, diagnos och eliminationsdiet',
    en: 'Food Allergies in Dogs and Cats — Symptoms, Diagnosis and Elimination Diet'
  },
  'article.food.intro': {
    fi: 'Ruoka-allergia on yksi yleisimmistä kutinaa aiheuttavista sairauksista koirilla ja kissoilla. Tutkimusten mukaan 9–40 % kutisevista koirista ja 12–21 % kutisevista kissoista kärsii ruoka-allergiasta. Monet omistajat luulevat viljojen olevan ongelma, mutta tutkimukset osoittavat selvästi: yleisimmät allergeenit ovat eläinproteiineja — nauta (34 %), maito (17 %) ja kana (15 %). Oikea diagnoosi vaatii eliminaatioruokavalion, ja me autamme siinä.',
    sv: 'Födoämnesallergi är en av de vanligaste orsakerna till klåda hos hundar och katter. Enligt studier lider 9–40 % av kliande hundar och 12–21 % av kliande katter av födoämnesallergi. Många ägare tror att spannmål är problemet, men forskning visar tydligt: de vanligaste allergenerna är animaliska proteiner — nötkött (34 %), mjölk (17 %) och kyckling (15 %). En korrekt diagnos kräver en eliminationsdiet, och vi hjälper dig med det.',
    en: 'Food allergy is one of the most common causes of itching in dogs and cats. Studies show that 9–40% of itchy dogs and 12–21% of itchy cats suffer from food allergies. Many owners believe grains are the problem, but research clearly shows: the most common allergens are animal proteins — beef (34%), dairy (17%) and chicken (15%). A correct diagnosis requires an elimination diet, and we can help you with that.'
  },
  'article.food.symptoms.title': {
    fi: 'Oireet',
    sv: 'Symtom',
    en: 'Symptoms'
  },
  'article.food.symptoms.text': {
    fi: 'Ruoka-allergian tyypillisimpiä oireita ovat kutina, toistuvat korvatulehdukset, tassujen nuoleminen, ihotulehdukset ja vatsa-suolioireet (oksentelu, ripuli). Kissoilla oireet ilmenevät usein pään ja kaulan alueen kutinana. Toisin kuin ympäristöallergiat, ruoka-allergia ei ole kausittainen — oireet jatkuvat ympäri vuoden. Jos lemmikillesi on yli 2 ulostuskertaa päivässä ja iho-oireet alkoivat alle vuoden iässä, ruoka-allergia on erityisen todennäköinen.',
    sv: 'De vanligaste symtomen på födoämnesallergi är klåda, återkommande öroninflammationer, slickande av tassar, hudinfektioner och mag-tarmbesvär (kräkningar, diarré). Hos katter visar sig symtomen ofta som klåda runt huvud och hals. Till skillnad från miljöallergier är födoämnesallergi inte säsongsbetonad — symtomen fortsätter året runt. Om ditt husdjur har mer än 2 avföringar per dag och hudsymtom som började före ett års ålder är födoämnesallergi särskilt sannolik.',
    en: 'The most common symptoms of food allergy are itching, recurring ear infections, paw licking, skin infections and gastrointestinal symptoms (vomiting, diarrhea). In cats, symptoms often appear as itching around the head and neck. Unlike environmental allergies, food allergy is not seasonal — symptoms persist year-round. If your pet has more than 2 bowel movements per day and skin symptoms started before one year of age, food allergy is particularly likely.'
  },
  'article.food.allergens.title': {
    fi: 'Yleisimmät allergeenit',
    sv: 'Vanligaste allergenerna',
    en: 'Most Common Allergens'
  },
  'article.food.allergens.text': {
    fi: 'Tutkimuksissa yleisimmät allergeenit koirilla ovat nauta (34 %), maitotuotteet (17 %), kana (15 %), vehnä (13 %) ja soija (6 %). Kissoilla yleisimpiä ovat nauta (18 %), kala (17 %) ja kana (5 %). Viljat aiheuttavat siis vain pienen osan allergiatapauksista — vehnä 13 % ja maissi 4 %. "Viljaton" ruoka ei ole ratkaisu, koska se sisältää usein edelleen yleisimpiä allergeenejä (nauta, kana). Lisäksi viljojen korvaaminen palkokasveilla on yhdistetty sydänsairauksien (DCM) riskiin koirilla.',
    sv: 'I studier är de vanligaste allergenerna hos hundar nötkött (34 %), mejeriprodukter (17 %), kyckling (15 %), vete (13 %) och soja (6 %). Hos katter är de vanligaste nötkött (18 %), fisk (17 %) och kyckling (5 %). Spannmål orsakar alltså bara en liten del av allergifallen — vete 13 % och majs 4 %. "Spannmålsfri" mat är ingen lösning eftersom den ofta fortfarande innehåller de vanligaste allergenerna (nötkött, kyckling). Dessutom har ersättning av spannmål med baljväxter kopplats till risk för hjärtsjukdom (DCM) hos hundar.',
    en: 'In studies, the most common allergens in dogs are beef (34%), dairy (17%), chicken (15%), wheat (13%) and soy (6%). In cats, the most common are beef (18%), fish (17%) and chicken (5%). Grains cause only a small portion of allergy cases — wheat 13% and corn 4%. "Grain-free" food is not the solution because it often still contains the most common allergens (beef, chicken). Additionally, replacing grains with legumes has been linked to heart disease (DCM) risk in dogs.'
  },
  'article.food.trial.title': {
    fi: 'Eliminaatioruokavalio — ainoa luotettava diagnoosimenetelmä',
    sv: 'Eliminationsdiet — den enda tillförlitliga diagnosmetoden',
    en: 'Elimination Diet — The Only Reliable Diagnostic Method'
  },
  'article.food.trial.text': {
    fi: 'Allergiaverikokeet ruoka-aineille eivät ole luotettavia — tutkimuksessa kaikki 30 tervettä koiraa ilman allergiahistoriaa saivat virheellisiä positiivisia tuloksia. Ainoa luotettava menetelmä on eliminaatioruokavalio: lemmikille syötetään 8–12 viikon ajan ainoastaan hydrolysoitua proteiiniruokaa, jossa proteiinit on pilkottu niin pieniksi, ettei immuunijärjestelmä tunnista niitä.',
    sv: 'Allergiblodprov för livsmedel är inte tillförlitliga — i en studie fick alla 30 friska hundar utan allergihistorik felaktigt positiva resultat. Den enda tillförlitliga metoden är en eliminationsdiet: husdjuret matas under 8–12 veckor uteslutande med hydrolyserad proteinmat där proteinerna har brutits ner till så små delar att immunsystemet inte känner igen dem.',
    en: 'Allergy blood tests for food are not reliable — in one study, all 30 healthy dogs with no allergy history received false positive results. The only reliable method is an elimination diet: the pet is fed for 8–12 weeks exclusively hydrolyzed protein food where proteins have been broken down so small that the immune system cannot recognize them.'
  },
  'article.food.strict.title': {
    fi: 'Eliminaatioruokavalion säännöt',
    sv: 'Regler för eliminationsdiet',
    en: 'Elimination Diet Rules'
  },
  'article.food.strict.text': {
    fi: 'Eliminaatioruokavalion on oltava ehdottoman tiukka. Lemmikin suuhun saa mennä VAIN eliminaatioruoka. Ei makupaloja, ei ihmisruokaa, ei raakavuotia tai puruluita, ei maustettua hammastahnaa, ei maustettuja lääkkeitä (matolääkkeet, punkkitabletit). Lääkkeet vaihdetaan maustamattomiin vaihtoehtoihin. Kaupan "rajoitetun ainesosan" ruoat eivät kelpaa — tutkimukset osoittavat, että 33–83 % niistä sisältää ilmoittamattomia proteiineja. Siksi käytämme aina eläinlääkärin reseptiruokia.',
    sv: 'Eliminationsdieten måste vara absolut strikt. BARA eliminationsmat får gå i husdjurets mun. Inga godisbitar, ingen människomat, inga råhudsben eller tuggben, ingen smaksatt tandkräm, inga smaksatta mediciner (avmaskningsmedel, fästingtabletter). Mediciner byts till osmakade alternativ. Butikens "begränsad ingrediens"-foder duger inte — studier visar att 33–83 % av dem innehåller odeklarerade proteiner. Därför använder vi alltid veterinärrecept-foder.',
    en: 'The elimination diet must be absolutely strict. ONLY the elimination food may enter your pet\'s mouth. No treats, no human food, no rawhide or chew bones, no flavored toothpaste, no flavored medications (dewormers, flea/tick tablets). Medications are switched to unflavored alternatives. Store-bought "limited ingredient" foods are not suitable — studies show 33–83% of them contain undeclared proteins. That is why we always use veterinary prescription diets.'
  },
  'article.food.challenge.title': {
    fi: 'Haastevaihe ja pitkäaikaishoito',
    sv: 'Provokationsfas och långtidsvård',
    en: 'Challenge Phase and Long-Term Management'
  },
  'article.food.challenge.text': {
    fi: 'Jos oireet paranevat eliminaatioruokavaliolla, diagnoosi varmistetaan syöttämällä vanha ruoka uudelleen. 90 % koirista reagoi 7 päivän kuluessa. Tämän jälkeen palataan eliminaatioruokaan ja testataan yksittäisiä proteiineja yksitellen. Näin selviää, mitkä proteiinit ovat turvallisia ja mitä on vältettävä. Ruoka-allergiaa ei voi parantaa, mutta kun allergeenejä välttää, lemmikki voi elää täysin oireetta ilman lääkitystä. Eläinlääkärin ohjauksessa tehtynä eliminaatioruokavalio on tehokas ja turvallinen prosessi.',
    sv: 'Om symtomen förbättras med eliminationsdieten bekräftas diagnosen genom att ge den gamla maten igen. 90 % av hundarna reagerar inom 7 dagar. Därefter återgår man till eliminationsdieten och testar enskilda proteiner en i taget. Så klargörs vilka proteiner som är säkra och vilka som måste undvikas. Födoämnesallergi kan inte botas, men när allergener undviks kan husdjuret leva helt symtomfritt utan medicinering. Under veterinärens vägledning är eliminationsdieten en effektiv och säker process.',
    en: 'If symptoms improve on the elimination diet, the diagnosis is confirmed by reintroducing the old food. 90% of dogs react within 7 days. After this, the pet returns to the elimination diet and individual proteins are tested one at a time. This reveals which proteins are safe and which must be avoided. Food allergy cannot be cured, but when allergens are avoided, your pet can live completely symptom-free without medication. Under veterinary guidance, the elimination diet is an effective and safe process.'
  },
  'article.food.clinic.title': {
    fi: 'Ruoka-allergiatutkimukset klinikallamme',
    sv: 'Födoämnesallergutredning på vår klinik',
    en: 'Food Allergy Investigations at Our Clinic'
  },
  'article.food.clinic.text': {
    fi: 'Eläinklinikka Saaressa autamme sinua ruoka-allergian tutkimisessa ja hoidossa. Suunnittelemme yksilöllisen eliminaatioruokavalion lemmikillesi, hoidamme samalla sekundaariset iho- ja korvainfektiot ja seuraamme edistymistä koko prosessin ajan. Myymme klinikaltamme myös eliminaatioruokavalioita ja voimme neuvoa sopivan ruokavalion valinnassa.',
    sv: 'På Djurkliniken Saari hjälper vi dig med utredning och behandling av födoämnesallergi. Vi planerar en individuell eliminationsdiet för ditt husdjur, behandlar samtidigt sekundära hud- och öroninfektioner och följer upp framstegen under hela processen. Vi säljer även eliminationsdieter på kliniken och kan rådge om rätt dietval.',
    en: 'At Eläinklinikka Saari, we help you investigate and manage food allergies. We design an individual elimination diet for your pet, treat secondary skin and ear infections at the same time, and monitor progress throughout the process. We also sell elimination diets at our clinic and can advise on choosing the right diet.'
  },

  // Article 11: Hyperthyroidism
  'article.hyperthyroid.tag': { fi: 'Kissaterveys', sv: 'Katthälsa', en: 'Cat Health' },
  'article.hyperthyroid.title': {
    fi: 'Kilpirauhasen liikatoiminta kissalla — oireet, diagnoosi ja hoito',
    sv: 'Sköldkörtelöverfunktion hos katter — symtom, diagnos och behandling',
    en: 'Hyperthyroidism in Cats — Symptoms, Diagnosis and Treatment'
  },
  'article.hyperthyroid.intro': {
    fi: 'Kilpirauhasen liikatoiminta (hypertyreoosi) on ikääntyvien kissojen yleisin hormonisairaus. Se todetaan noin 10 %:lla yli 10-vuotiaista kissoista. Kilpirauhanen tuottaa liikaa kilpirauhashormonia (T4), mikä kiihdyttää aineenvaihduntaa ja rasittaa monia elimiä — erityisesti sydäntä ja munuaisia. Hoitamattomana sairaus johtaa vakaviin komplikaatioihin, mutta oikein hoidettuna ennuste on hyvä.',
    sv: 'Sköldkörtelöverfunktion (hypertyreos) är den vanligaste hormonsjukdomen hos åldrande katter. Den diagnostiseras hos cirka 10 % av katter över 10 år. Sköldkörteln producerar för mycket sköldkörtelhormon (T4), vilket ökar ämnesomsättningen och belastar många organ — särskilt hjärtat och njurarna. Obehandlad leder sjukdomen till allvarliga komplikationer, men med rätt behandling är prognosen god.',
    en: 'Hyperthyroidism is the most common hormonal disease in aging cats. It is diagnosed in approximately 10% of cats over 10 years of age. The thyroid gland produces excess thyroid hormone (T4), which accelerates metabolism and strains many organs — especially the heart and kidneys. Left untreated, the disease leads to serious complications, but with proper treatment the prognosis is good.'
  },
  'article.hyperthyroid.symptoms.title': {
    fi: 'Oireet',
    sv: 'Symtom',
    en: 'Symptoms'
  },
  'article.hyperthyroid.symptoms.text': {
    fi: 'Tyypillisimpiä oireita ovat painonlasku hyvästä ruokahalusta huolimatta, lisääntynyt juominen ja virtsaaminen, oksentelu, ripuli, yliaktiivisuus tai levottomuus, huono turkki ja nopea sydämen syke. Joillakin kissoilla näkyy myös laihtumista, lihaskatoa ja käytösmuutoksia. Oireet kehittyvät yleensä hitaasti, ja omistajat saattavat pitää niitä normaalina ikääntymiseen liittyvinä muutoksina.',
    sv: 'De vanligaste symtomen är viktnedgång trots god aptit, ökad törst och urinering, kräkningar, diarré, hyperaktivitet eller rastlöshet, dålig päls och snabb hjärtrytm. Vissa katter visar även avmagring, muskelförlust och beteendeförändringar. Symtomen utvecklas vanligtvis långsamt och ägare kan förväxla dem med normala åldersförändringar.',
    en: 'The most common symptoms are weight loss despite good appetite, increased drinking and urination, vomiting, diarrhea, hyperactivity or restlessness, poor coat and rapid heart rate. Some cats also show wasting, muscle loss and behavioral changes. Symptoms usually develop slowly, and owners may mistake them for normal age-related changes.'
  },
  'article.hyperthyroid.diagnosis.title': {
    fi: 'Diagnoosi',
    sv: 'Diagnos',
    en: 'Diagnosis'
  },
  'article.hyperthyroid.diagnosis.text': {
    fi: 'Diagnoosi perustuu verikokeeseen, jossa mitataan kilpirauhashormoni T4. Kohonnut T4-arvo yhdessä tyypillisten oireiden kanssa vahvistaa diagnoosin. Joskus T4 voi olla normaali, vaikka sairaus on olemassa — silloin mitataan vapaa T4 (fT4). Kliinisessä tutkimuksessa eläinlääkäri voi tunnustella suurentuneen kilpirauhasen kaulan alueella. Samalla tutkitaan sydän, verenpaine ja munuaisarvot.',
    sv: 'Diagnosen baseras på ett blodprov som mäter sköldkörtelhormonet T4. Ett förhöjt T4-värde tillsammans med typiska symtom bekräftar diagnosen. Ibland kan T4 vara normalt trots att sjukdomen finns — då mäts fritt T4 (fT4). Vid klinisk undersökning kan veterinären palpera en förstorad sköldkörtel i halsområdet. Samtidigt undersöks hjärtat, blodtrycket och njurvärdena.',
    en: 'Diagnosis is based on a blood test measuring thyroid hormone T4. An elevated T4 value together with typical symptoms confirms the diagnosis. Sometimes T4 can be normal even when the disease is present — then free T4 (fT4) is measured. During clinical examination, the vet can feel an enlarged thyroid gland in the neck area. At the same time, the heart, blood pressure and kidney values are checked.'
  },
  'article.hyperthyroid.complications.title': {
    fi: 'Komplikaatiot',
    sv: 'Komplikationer',
    en: 'Complications'
  },
  'article.hyperthyroid.complications.text': {
    fi: 'Hoitamaton hypertyreoosi voi aiheuttaa sydämen liikakasvu (hypertrofinen kardiomyopatia), korkean verenpaineen, verkkokalvon irtoamisen ja näköhäiriöitä. Tärkeä yhteys on myös munuaissairauteen: hypertyreoosi lisää munuaisten verenvirtausta, mikä voi peittää taustalla olevan munuaisten vajaatoiminnan. Kun kilpirauhasen toiminta korjataan, piilevä munuaissairaus saattaa paljastua. Siksi munuaisarvoja seurataan tarkasti hoidon aikana.',
    sv: 'Obehandlad hypertyreos kan orsaka hjärtförstoring (hypertrofisk kardiomyopati), högt blodtryck, näthinneavlossning och synstörningar. Det finns även ett viktigt samband med njursjukdom: hypertyreos ökar blodflödet till njurarna, vilket kan dölja en underliggande njursvikt. När sköldkörtelfunktionen korrigeras kan en dold njursjukdom avslöjas. Därför övervakas njurvärdena noggrant under behandlingen.',
    en: 'Untreated hyperthyroidism can cause heart enlargement (hypertrophic cardiomyopathy), high blood pressure, retinal detachment and vision problems. There is also an important connection to kidney disease: hyperthyroidism increases blood flow to the kidneys, which can mask underlying kidney failure. When thyroid function is corrected, hidden kidney disease may be revealed. That is why kidney values are monitored closely during treatment.'
  },
  'article.hyperthyroid.treatment.title': {
    fi: 'Hoitovaihtoehdot',
    sv: 'Behandlingsalternativ',
    en: 'Treatment Options'
  },
  'article.hyperthyroid.treatment.text': {
    fi: 'Hoitovaihtoehtoja on neljä: 1) Päivittäinen lääkitys (metimatsoli/Felimazole) — yleisin vaihtoehto, edullinen mutta elinikäinen. 2) Leikkaus (tyreoidektomia) — kilpirauhasen poisto, parantava hoito. 3) Radiojodihoito (I-131) — kultastandardi, yksi hoitokerta parantaa yli 95 % tapauksista, mutta vaatii erikoisklinikan. 4) Reseptiruokavalio (Hill\'s y/d) — jodirajoitettu ruoka, sopii lieväoireisille kissoille. Klinikallamme autamme valitsemaan parhaan hoitomuodon kissasi tilanteeseen.',
    sv: 'Det finns fyra behandlingsalternativ: 1) Daglig medicinering (metimazol/Felimazole) — det vanligaste alternativet, prisvärt men livslångt. 2) Kirurgi (tyreoidektomi) — borttagning av sköldkörteln, botande behandling. 3) Radiojodbehandling (I-131) — guldstandard, en behandling botar över 95 % av fallen men kräver specialklinik. 4) Receptdiet (Hill\'s y/d) — jodbegränsad mat, lämplig för katter med lindriga symtom. På vår klinik hjälper vi dig välja den bästa behandlingen för din katts situation.',
    en: 'There are four treatment options: 1) Daily medication (methimazole/Felimazole) — the most common option, affordable but lifelong. 2) Surgery (thyroidectomy) — removal of the thyroid gland, a curative treatment. 3) Radioactive iodine therapy (I-131) — the gold standard, one treatment cures over 95% of cases but requires a specialized clinic. 4) Prescription diet (Hill\'s y/d) — iodine-restricted food, suitable for cats with mild symptoms. At our clinic, we help you choose the best treatment for your cat\'s situation.'
  },

  // Article 12: Kidney Disease
  'article.kidney.tag': { fi: 'Lemmikkien terveys', sv: 'Husdjurshälsa', en: 'Pet Health' },
  'article.kidney.title': {
    fi: 'Munuaisten vajaatoiminta koirilla ja kissoilla — tunnista oireet ajoissa',
    sv: 'Njursvikt hos hundar och katter — känn igen symtomen i tid',
    en: 'Kidney Disease in Dogs and Cats — Recognizing the Symptoms Early'
  },
  'article.kidney.intro': {
    fi: 'Krooninen munuaissairaus (CKD) on yksi ikääntyvien kissojen ja koirien yleisimmistä sairauksista. Jopa 30–40 % yli 10-vuotiaista kissoista kärsii jonkinasteisesta munuaisten vajaatoiminnasta. Munuaiset menettävät toimintakykyään hitaasti ja peruuttamattomasti, mutta varhaisella diagnoosilla ja oikealla hoidolla elinaikaa ja elämänlaatua voidaan parantaa merkittävästi.',
    sv: 'Kronisk njursjukdom (CKD) är en av de vanligaste sjukdomarna hos åldrande katter och hundar. Upp till 30–40 % av katter över 10 år lider av någon grad av njursvikt. Njurarna förlorar sin funktion långsamt och oåterkalleligt, men med tidig diagnos och rätt behandling kan livslängd och livskvalitet förbättras avsevärt.',
    en: 'Chronic kidney disease (CKD) is one of the most common diseases in aging cats and dogs. Up to 30–40% of cats over 10 years of age suffer from some degree of kidney failure. The kidneys lose function slowly and irreversibly, but with early diagnosis and proper treatment, life expectancy and quality of life can be significantly improved.'
  },
  'article.kidney.stages.title': {
    fi: 'IRIS-luokitus — sairauden vaiheet',
    sv: 'IRIS-klassificering — sjukdomens stadier',
    en: 'IRIS Classification — Disease Stages'
  },
  'article.kidney.stages.text': {
    fi: 'Munuaissairaus luokitellaan kansainvälisen IRIS-järjestelmän mukaan neljään vaiheeseen. Vaihe 1: munuaisvaurio ilman oireita, kreatiniini normaali. Vaihe 2: lievä munuaisten vajaatoiminta, lieviä oireita (lisääntynyt juominen). Vaihe 3: kohtalainen vajaatoiminta, selvät oireet (ruokahaluttomuus, oksentelu, laihtuminen). Vaihe 4: vaikea vajaatoiminta, ureemiset oireet (pahoinvointi, suun haavaumat, kouristukset). Varhaisessa vaiheessa SDMA-verikoe voi havaita munuaisvaurion jopa kuukausia ennen kuin kreatiniini nousee.',
    sv: 'Njursjukdom klassificeras enligt det internationella IRIS-systemet i fyra stadier. Stadium 1: njurskada utan symtom, kreatinin normalt. Stadium 2: lindrig njursvikt, lindriga symtom (ökad törst). Stadium 3: måttlig njursvikt, tydliga symtom (aptitlöshet, kräkningar, viktnedgång). Stadium 4: svår njursvikt, uremiska symtom (illamående, munsår, kramper). I ett tidigt skede kan SDMA-blodprovet upptäcka njurskada redan månader innan kreatininet stiger.',
    en: 'Kidney disease is classified according to the international IRIS system into four stages. Stage 1: kidney damage without symptoms, creatinine normal. Stage 2: mild kidney failure, mild symptoms (increased drinking). Stage 3: moderate failure, clear symptoms (loss of appetite, vomiting, weight loss). Stage 4: severe failure, uremic symptoms (nausea, mouth ulcers, seizures). In the early stages, the SDMA blood test can detect kidney damage months before creatinine rises.'
  },
  'article.kidney.symptoms.title': {
    fi: 'Oireet',
    sv: 'Symtom',
    en: 'Symptoms'
  },
  'article.kidney.symptoms.text': {
    fi: 'Varhaiset oireet ovat usein hienovaraisia: lisääntynyt juominen ja virtsaaminen, lievä laihtuminen ja vähentynyt ruokahalu. Sairauden edetessä oireet voimistuvat: oksentelu, ripuli, huono turkki, lihasheikkous, anemia (kalpeat limakalvot), suun haavaumat ja ammoniakin haju hengityksessä. Koska oireet kehittyvät hitaasti, monet omistajat eivät huomaa muutoksia ajoissa. Siksi suosittelemme vuosittaista verikoetta yli 7-vuotiaille lemmikeille.',
    sv: 'Tidiga symtom är ofta subtila: ökad törst och urinering, lätt viktnedgång och minskad aptit. När sjukdomen fortskrider förstärks symtomen: kräkningar, diarré, dålig päls, muskelsvaghet, anemi (bleka slemhinnor), munsår och ammoniaklukt i andedräkten. Eftersom symtomen utvecklas långsamt märker många ägare inte förändringarna i tid. Därför rekommenderar vi årligt blodprov för husdjur över 7 år.',
    en: 'Early symptoms are often subtle: increased drinking and urination, mild weight loss and decreased appetite. As the disease progresses, symptoms intensify: vomiting, diarrhea, poor coat, muscle weakness, anemia (pale gums), mouth ulcers and ammonia smell in the breath. Because symptoms develop slowly, many owners do not notice the changes in time. That is why we recommend annual blood tests for pets over 7 years of age.'
  },
  'article.kidney.treatment.title': {
    fi: 'Hoito ja seuranta',
    sv: 'Behandling och uppföljning',
    en: 'Treatment and Monitoring'
  },
  'article.kidney.treatment.text': {
    fi: 'Munuaissairautta ei voi parantaa, mutta etenemistä voidaan hidastaa merkittävästi. Hoidon kulmakiviä ovat: munuaisruokavalio (vähentynyt proteiini ja fosfori — tutkitusti pidentää elinaikaa), fosforinsitojahoito, nestehoito (ihonalainen tai suonensisäinen), verenpainelääkitys ja pahoinvointilääkitys. Anemiaa hoidetaan tarvittaessa erytropoietiinilla. Säännöllinen seuranta (verikokeet, verenpaine, virtsakoe) on välttämätöntä hoidon sopeuttamiseksi. Klinikallamme seuraamme munuaispotilaita yksilöllisellä aikataululla.',
    sv: 'Njursjukdom kan inte botas, men sjukdomsförloppet kan bromsas avsevärt. Behandlingens hörnstenar är: njurdiet (minskat protein och fosfor — bevisat förlänger livslängden), fosforbindarterapi, vätskebehandling (subkutan eller intravenös), blodtrycksmedicin och medel mot illamående. Anemi behandlas vid behov med erytropoetin. Regelbunden uppföljning (blodprover, blodtryck, urinprov) är nödvändig för att anpassa behandlingen. På vår klinik följer vi njurpatienter med individuellt anpassade scheman.',
    en: 'Kidney disease cannot be cured, but progression can be significantly slowed. The cornerstones of treatment are: renal diet (reduced protein and phosphorus — proven to extend life expectancy), phosphate binder therapy, fluid therapy (subcutaneous or intravenous), blood pressure medication and anti-nausea medication. Anemia is treated with erythropoietin when needed. Regular monitoring (blood tests, blood pressure, urinalysis) is essential for adjusting treatment. At our clinic, we follow kidney patients on individually tailored schedules.'
  },

  // Article 13: Snake Bite
  'article.snake.tag': { fi: 'Päivystys', sv: 'Akutvård', en: 'Emergency' },
  'article.snake.title': {
    fi: 'Kyynpurema — Suomen ainoan myrkyllisen käärmeen purema lemmikille',
    sv: 'Huggormsbett — bett av Finlands enda giftiga orm',
    en: 'Adder Bite — Finland\'s Only Venomous Snake Bite in Pets'
  },
  'article.snake.intro': {
    fi: 'Kyy (Vipera berus) on Suomen ainoa myrkyllinen käärme. Kyynpuremat ovat yleisimpiä touko–syyskuussa, erityisesti keväällä, kun käärmeet ovat juuri heränneet talviuniltaan ja ovat hitaita. Koirat ovat suurimmassa vaarassa uteliaisuutensa vuoksi — useimmat puremat kohdistuvat kuonoon tai etutassuihin. Kyynpurema on aina eläinlääkäripäivystys.',
    sv: 'Huggormen (Vipera berus) är Finlands enda giftiga orm. Huggormsbett är vanligast från maj till september, särskilt på våren när ormarna just vaknat ur vinterdvalan och är tröga. Hundar löper störst risk på grund av sin nyfikenhet — de flesta bett drabbar nosen eller framtassarna. Ett huggormsbett är alltid en veterinärakut.',
    en: 'The European adder (Vipera berus) is Finland\'s only venomous snake. Adder bites are most common from May to September, especially in spring when the snakes have just woken from hibernation and are sluggish. Dogs are at greatest risk due to their curiosity — most bites occur on the snout or front paws. An adder bite is always a veterinary emergency.'
  },
  'article.snake.symptoms.title': {
    fi: 'Oireet',
    sv: 'Symtom',
    en: 'Symptoms'
  },
  'article.snake.symptoms.text': {
    fi: 'Oireet ilmaantuvat yleensä minuuteista tunteihin pureman jälkeen. Paikallisoireet: voimakas turvotus purema-alueella, kipu, kaksi pistohaavaa. Yleisoireet: kuolaaminen, oksentelu, nopea hengitys, heikkous, lamautuminen. Vaikeissa tapauksissa: allerginen reaktio (kasvojen turpoaminen, hengitysvaikeudet), verenhyytymishäiriöt, sokki ja kollapsi. Kuonoon saatu purema voi aihtaa hengenvaarallista turvotusta hengitysteissä. Oireet voivat pahentua 24–48 tunnin ajan.',
    sv: 'Symtom uppträder vanligtvis från minuter till timmar efter bettet. Lokala symtom: kraftig svullnad vid bettområdet, smärta, två sticksår. Allmänna symtom: dregling, kräkningar, snabb andning, svaghet, förlamning. I svåra fall: allergisk reaktion (ansiktssvullnad, andningssvårigheter), koagulationsrubbningar, chock och kollaps. Bett i nosen kan orsaka livshotande svullnad i luftvägarna. Symtomen kan förvärras under 24–48 timmar.',
    en: 'Symptoms appear from minutes to hours after the bite. Local symptoms: severe swelling at the bite area, pain, two puncture wounds. Systemic symptoms: drooling, vomiting, rapid breathing, weakness, collapse. In severe cases: allergic reaction (facial swelling, breathing difficulties), blood clotting disorders, shock and collapse. A bite to the snout can cause life-threatening airway swelling. Symptoms may worsen over 24–48 hours.'
  },
  'article.snake.firstaid.title': {
    fi: 'Ensiapu',
    sv: 'Första hjälpen',
    en: 'First Aid'
  },
  'article.snake.firstaid.text': {
    fi: 'Pidä lemmikki rauhallisena ja liikkumattomana — liike levittää myrkkyä nopeammin. Älä yritä imeä myrkkyä, asettaa kiristyssidettä tai jäädyttää puremakohtaa. Kanna koiraa, jos mahdollista. Hakeudu eläinlääkäriin mahdollisimman nopeasti — aika on ratkaiseva tekijä. Valokuvaa käärme, jos se onnistuu turvallisesti.',
    sv: 'Håll husdjuret lugnt och stilla — rörelse sprider giftet snabbare. Försök inte suga ut giftet, sätta på stasband eller kyla ner bettområdet. Bär hunden om möjligt. Uppsök veterinär så snabbt som möjligt — tid är en avgörande faktor. Fotografera ormen om det kan göras säkert.',
    en: 'Keep your pet calm and still — movement spreads the venom faster. Do not try to suck out the venom, apply a tourniquet or ice the bite area. Carry the dog if possible. Seek veterinary care as quickly as possible — time is crucial. Photograph the snake if it can be done safely.'
  },
  'article.snake.treatment.title': {
    fi: 'Eläinlääkärin hoito',
    sv: 'Veterinärbehandling',
    en: 'Veterinary Treatment'
  },
  'article.snake.treatment.text': {
    fi: 'Hoito sisältää kivunlievityksen, tulehduskipulääkkeet tai kortisonia, suonensisäisen nestehoidon ja tarvittaessa antihistamiinia. Vaikeissa tapauksissa käytetään antiveniiniä (kyykäärmeseerumi). Potilasta seurataan hyytymistekijöiden, munuaisten ja maksan toiminnan osalta. Useimmat koirat toipuvat 2–5 päivässä, mutta vakavissa tapauksissa sairaalahoito voi kestää pidempään. Kuolleisuus hoidolla on alle 5 %, mutta hoitamattomana purema voi olla kohtalokas erityisesti pienille koirille.',
    sv: 'Behandlingen inkluderar smärtlindring, antiinflammatoriska läkemedel eller kortison, intravenös vätskebehandling och vid behov antihistamin. I svåra fall används antiserum (huggormserum). Patienten övervakas avseende koagulationsfaktorer, njur- och leverfunktion. De flesta hundar återhämtar sig inom 2–5 dagar, men i allvarliga fall kan sjukhusvård ta längre tid. Dödligheten med behandling är under 5 %, men utan behandling kan bettet vara dödligt särskilt för små hundar.',
    en: 'Treatment includes pain relief, anti-inflammatory medication or corticosteroids, intravenous fluid therapy and antihistamines when needed. In severe cases, antivenom is used. The patient is monitored for clotting factors, kidney and liver function. Most dogs recover within 2–5 days, but in severe cases hospitalization may take longer. Mortality with treatment is under 5%, but without treatment the bite can be fatal, especially for small dogs.'
  },
  'article.snake.prevention.title': {
    fi: 'Ehkäisy',
    sv: 'Förebyggande',
    en: 'Prevention'
  },
  'article.snake.prevention.text': {
    fi: 'Pidä koira kytkettynä alueilla, joilla kyitä esiintyy (kalliot, avoimet maastot, metsänreunat). Kyyt ovat aktiivisimpia lämpimillä aamuilla ja iltapäivillä. Tarkista maasto ennen kuin päästät koiran vapaaksi. Jos koirasi on aiemmin saanut kyynpureman, riski vakavaan reaktioon on suurempi seuraavalla kerralla.',
    sv: 'Håll hunden kopplad i områden där huggormar förekommer (klippor, öppna marker, skogsbryn). Huggormar är mest aktiva varma morgnar och eftermiddagar. Kontrollera terrängen innan du släpper hunden lös. Om din hund tidigare fått ett huggormsbett är risken för en allvarlig reaktion större nästa gång.',
    en: 'Keep your dog on a leash in areas where adders are found (rocky areas, open terrain, forest edges). Adders are most active on warm mornings and afternoons. Check the terrain before letting your dog off the leash. If your dog has previously been bitten by an adder, the risk of a severe reaction is greater next time.'
  },

  // Article 14: Pyometra
  'article.pyometra.tag': { fi: 'Päivystys', sv: 'Akutvård', en: 'Emergency' },
  'article.pyometra.title': {
    fi: 'Kohtutulehdus (pyometra) — hengenvaarallinen sairaus, joka vaatii pikaista hoitoa',
    sv: 'Livmoderinflammation (pyometra) — livshotande sjukdom som kräver snabb behandling',
    en: 'Pyometra (Uterine Infection) — A Life-Threatening Condition Requiring Urgent Treatment'
  },
  'article.pyometra.intro': {
    fi: 'Pyometra eli kohtutulehdus on vakava, henkeä uhkaava infektio, jossa kohtu täyttyy märkäeritteellä. Se on yksi yleisimmistä hätätilanteista steriloimattomilla narttukoirilla — jopa 25 % steriloimattomista nartuista sairastuu pyometraan ennen 10 vuoden ikää. Sairaus vaatii yleensä kiireellistä leikkaushoitoa. Oireiden tunnistaminen voi pelastaa lemmikkisi hengen.',
    sv: 'Pyometra, det vill säga livmoderinflammation, är en allvarlig, livshotande infektion där livmodern fylls med var. Det är en av de vanligaste akutsituationerna hos osteriliserade tikar — upp till 25 % av osteriliserade tikar drabbas av pyometra före 10 års ålder. Sjukdomen kräver vanligtvis akut kirurgisk behandling. Att känna igen symtomen kan rädda ditt husdjurs liv.',
    en: 'Pyometra is a serious, life-threatening infection in which the uterus fills with pus. It is one of the most common emergencies in unspayed female dogs — up to 25% of unspayed females develop pyometra before 10 years of age. The condition usually requires emergency surgery. Recognizing the symptoms can save your pet\'s life.'
  },
  'article.pyometra.symptoms.title': {
    fi: 'Oireet — tunnista ajoissa',
    sv: 'Symtom — känn igen i tid',
    en: 'Symptoms — Recognize Them Early'
  },
  'article.pyometra.symptoms.text': {
    fi: 'Pyometra kehittyy tyypillisesti 2–8 viikkoa kiiman jälkeen. Avoimessa pyometrassa kohdunkaulasta vuotaa märkäistä, usein pahanhajuista eritettä — tämä on selkein merkki. Suljetussa pyometrassa eritettä ei tule ulos, mikä tekee taudista erityisen vaarallisen, koska oireet ovat epämääräisempiä. Muita oireita ovat: lisääntynyt juominen ja virtsaaminen, ruokahaluttomuus, väsymys ja apaattisuus, oksentelu, laajentunut tai kipeä vatsa ja kuume (tai alilämpö vakavissa tapauksissa). Jos steriloimaton narttu on väsynyt ja juo paljon kiiman jälkeen, hakeudu eläinlääkäriin heti.',
    sv: 'Pyometra utvecklas typiskt 2–8 veckor efter löpningen. Vid öppen pyometra läcker varig, ofta illaluktande flytning från livmoderhalsen — detta är det tydligaste tecknet. Vid sluten pyometra kommer ingen flytning ut, vilket gör sjukdomen särskilt farlig då symtomen är vagare. Övriga symtom är: ökad törst och urinering, aptitlöshet, trötthet och apati, kräkningar, utspänd eller smärtsam buk samt feber (eller undertemperatur i allvarliga fall). Om en osteriliserad tik är trött och dricker mycket efter löpning — uppsök veterinär omedelbart.',
    en: 'Pyometra typically develops 2–8 weeks after the heat cycle. In open pyometra, purulent, often foul-smelling discharge drains from the cervix — this is the clearest sign. In closed pyometra, no discharge comes out, making the condition particularly dangerous as symptoms are more vague. Other symptoms include: increased drinking and urination, loss of appetite, fatigue and lethargy, vomiting, distended or painful abdomen, and fever (or hypothermia in severe cases). If an unspayed female is tired and drinking excessively after her heat — seek veterinary care immediately.'
  },
  'article.pyometra.danger.title': {
    fi: 'Miksi pyometra on hengenvaarallinen?',
    sv: 'Varför är pyometra livshotande?',
    en: 'Why Is Pyometra Life-Threatening?'
  },
  'article.pyometra.danger.text': {
    fi: 'Suljetussa pyometrassa bakteerit ja myrkylliset aineet imeytyvät kohdusta verenkiertoon aiheuttaen sepsiksen (verenmyrkytyksen). Tämä voi johtaa munuaisten vajaatoimintaan, vatsakalvontulehdukseen, veren hyytymishäiriöihin (DIC) ja monielinvaurioon. Hoitamaton pyometra on lähes aina kuolemaan johtava. Myös kohtu voi revetä, jolloin märkä vuotaa vatsaonteloon.',
    sv: 'Vid sluten pyometra absorberas bakterier och giftiga ämnen från livmodern till blodomloppet och orsakar sepsis (blodförgiftning). Detta kan leda till njursvikt, bukhinneinflammation, koagulationsrubbningar (DIC) och multiorgansvikt. Obehandlad pyometra leder nästan alltid till döden. Livmodern kan även brista, varvid var läcker ut i bukhålan.',
    en: 'In closed pyometra, bacteria and toxins are absorbed from the uterus into the bloodstream, causing sepsis (blood poisoning). This can lead to kidney failure, peritonitis, blood clotting disorders (DIC) and multi-organ failure. Untreated pyometra is almost always fatal. The uterus can also rupture, causing pus to leak into the abdominal cavity.'
  },
  'article.pyometra.treatment.title': {
    fi: 'Hoito — leikkaus on ainoa vaihtoehto',
    sv: 'Behandling — kirurgi är enda alternativet',
    en: 'Treatment — Surgery Is the Only Option'
  },
  'article.pyometra.treatment.text': {
    fi: 'Pyometran ainoa hoito on kohdunpoisto (ovariohysterektomia) eli sterilisaatio. Leikkaus tehdään kiireellisesti, usein saman päivän aikana. Ennen leikkausta potilas stabiloidaan nestehoidolla ja aloitetaan suonensisäinen antibioottihoito. Leikkaus poistaa sekä infektoituneen kohdun että munasarjat, mikä estää taudin uusiutumisen. Lääkinnällistä hoitoa ei suositella, koska tauti uusiutuu jopa 75 %:ssa tapauksista. Leikkaushoidolla ennuste on hyvä — yli 90 % potilaista toipuu.',
    sv: 'Den enda behandlingen av pyometra är livmoderavlägsnande (ovariohysterektomi), det vill säga sterilisering. Operationen utförs akut, ofta samma dag. Innan operationen stabiliseras patienten med vätskebehandling och intravenös antibiotikabehandling påbörjas. Operationen avlägsnar både den infekterade livmodern och äggstockarna, vilket förhindrar återfall. Medicinsk behandling rekommenderas inte eftersom sjukdomen återkommer i upp till 75 % av fallen. Med kirurgisk behandling är prognosen god — över 90 % av patienterna tillfrisknar.',
    en: 'The only treatment for pyometra is ovariohysterectomy (surgical removal of the uterus and ovaries), essentially spaying. Surgery is performed urgently, often on the same day. Before surgery, the patient is stabilized with fluid therapy and intravenous antibiotics are started. The surgery removes both the infected uterus and the ovaries, preventing recurrence. Medical treatment is not recommended as the disease recurs in up to 75% of cases. With surgical treatment, the prognosis is good — over 90% of patients recover.'
  },
  'article.pyometra.prevention.title': {
    fi: 'Ehkäisy',
    sv: 'Förebyggande',
    en: 'Prevention'
  },
  'article.pyometra.prevention.text': {
    fi: 'Tehokkain ehkäisy on sterilointi. Jos koiraa ei käytetä jalostukseen, suosittelemme sterilointia — se poistaa pyometran riskin kokonaan. Kissoilla pyometra on harvinaisempi, mutta mahdollinen, ja oireet ovat samankaltaiset. Jos suunnittelet lemmikin sterilointia tai huomaat pyometran oireita, ota yhteyttä klinikkaamme.',
    sv: 'Det mest effektiva förebyggandet är sterilisering. Om hunden inte ska användas i avel rekommenderar vi sterilisering — det eliminerar risken för pyometra helt. Hos katter är pyometra mer sällsynt men möjlig, och symtomen är liknande. Om du planerar att sterilisera ditt husdjur eller märker symtom på pyometra, kontakta vår klinik.',
    en: 'The most effective prevention is spaying. If the dog is not used for breeding, we recommend spaying — it eliminates the risk of pyometra entirely. In cats, pyometra is rarer but possible, and the symptoms are similar. If you are planning to spay your pet or notice symptoms of pyometra, contact our clinic.'
  },

  // Article 15: CCL / Lateral Suture
  'article.ccl.title': {
    fi: 'Lateral suture — eturistisiteen korjaus synteettisellä tukimateriaalilla',
    sv: 'Lateral sutur — korsbandsskadereparation med syntetiskt stödmaterial',
    en: 'Lateral Suture — Cruciate Ligament Repair with Synthetic Support Material'
  },
  'article.ccl.intro': {
    fi: 'Eturistisiteen (cranial cruciate ligament, CCL) repeämä on koirien yleisin ortopedinen ongelma ja sitä esiintyy myös kissoilla. Lateral suture eli ekstrakapsulaari lateraalisuturaatio on tehokas ja pitkään käytetty kirurginen menetelmä, jossa polvinivel stabiloidaan synteettisellä tukimateriaalilla nivelen ulkopuolelta. Menetelmä sopii erinomaisesti pienille ja keskikokoisille koirille sekä kissoille. Klinikallamme leikkauksen suorittaa eläinlääkäri Pamela, jolla on laaja kokemus ortopedisistä toimenpiteistä.',
    sv: 'Främre korsbandsskada (cranial cruciate ligament, CCL) är det vanligaste ortopediska problemet hos hundar och förekommer även hos katter. Lateral sutur, det vill säga extrakapsulär lateral suturering, är en effektiv och beprövad kirurgisk metod där knäleden stabiliseras med syntetiskt stödmaterial utanför leden. Metoden passar utmärkt för små och medelstora hundar samt katter. På vår klinik utförs operationen av veterinär Pamela, som har bred erfarenhet av ortopediska ingrepp.',
    en: 'Cranial cruciate ligament (CCL) rupture is the most common orthopedic problem in dogs and also occurs in cats. The lateral suture technique, also known as extracapsular lateral suture stabilization, is an effective and well-established surgical method where the knee joint is stabilized with synthetic support material placed outside the joint. The technique is excellent for small and medium-sized dogs and cats. At our clinic, the surgery is performed by veterinarian Pamela, who has extensive experience in orthopedic procedures.'
  },
  'article.ccl.how.title': {
    fi: 'Miten lateral suture toimii?',
    sv: 'Hur fungerar lateral sutur?',
    en: 'How Does Lateral Suture Work?'
  },
  'article.ccl.how.text': {
    fi: 'Leikkauksessa polvinivel avataan ja tarkastetaan: repeytyneen ristisiteen jäänteet poistetaan ja nivelkierukat (meniskit) tutkitaan vaurioiden varalta. Tämän jälkeen nivelen ulkopuolelle asennetaan vahva monofilamenttinen nylonlanka, joka kierretään reisiluun takaosan (fabella) ympäri ja kiinnitetään sääriluun etuosaan poratun tunnelin kautta. Lanka kiristetään ja lukitaan metallisilla puristusholkeilla (crimp clamp). Tämä stabiloi polvinivelen ja estää sääriluun liukumisen eteenpäin — aivan kuten terve ristiside tekisi. Lanka toimii väliaikaisena tukirakenteena, kunnes kehon oma sidekudos (periarticulaarinen fibroosi) muodostuu nivelen ympärille ja tarjoaa pysyvän vakauden.',
    sv: 'Under operationen öppnas knäleden och undersöks: resterna av det skadade korsbandet avlägsnas och meniskerna kontrolleras för skador. Därefter placeras en stark monofilament nylontråd utanför leden — tråden leds runt den bakre delen av lårbenet (fabella) och fästs genom en borrad tunnel i skenbenet. Tråden spänns och låses med metallklämmor (crimp clamp). Detta stabiliserar knäleden och förhindrar skenbenet från att glida framåt — precis som ett friskt korsband. Tråden fungerar som en tillfällig stödstruktur tills kroppens egen bindväv (periartikulär fibros) bildas runt leden och ger permanent stabilitet.',
    en: 'During surgery, the knee joint is opened and examined: remnants of the torn cruciate ligament are removed and the menisci are checked for damage. A strong monofilament nylon suture is then placed outside the joint — it is routed around the back of the femur (fabella) and secured through a drilled tunnel in the tibia. The suture is tightened and locked with metal crimp clamps. This stabilizes the knee joint and prevents the tibia from sliding forward — just as a healthy cruciate ligament would. The suture acts as a temporary support structure until the body\'s own connective tissue (periarticular fibrosis) forms around the joint and provides permanent stability.'
  },
  'article.ccl.who.title': {
    fi: 'Kenelle lateral suture sopii?',
    sv: 'Vilka patienter passar lateral sutur för?',
    en: 'Who Is Lateral Suture Suitable For?'
  },
  'article.ccl.who.text': {
    fi: 'Lateral suture on erinomainen valinta pienille koirille (alle 15 kg) ja kissoille — näillä potilailla onnistumisprosentti on yli 90 %. Menetelmä sopii hyvin myös keskikokoisille koirille (15–25 kg) sekä iäkkäämmille, rauhallisemmille suurille koirille. Kissoilla lateral suture on eturistisiteen korjauksen standardimenetelmä, sillä kissojen kevyt ruumiinrakenne sopii tekniikkaan erinomaisesti. Aktiivisille ja suurille koirille (yli 25 kg) suosittelemme TTA-leikkausta, joka muuttaa polven biomekaniikkaa pysyvästi.',
    sv: 'Lateral sutur är ett utmärkt val för små hundar (under 15 kg) och katter — hos dessa patienter överstiger framgångsgraden 90 %. Metoden passar också bra för medelstora hundar (15–25 kg) samt äldre, lugnare stora hundar. Hos katter är lateral sutur standardmetoden för korsbandsskadereparation, då katternas lätta kroppsbyggnad passar tekniken utmärkt. För aktiva och stora hundar (över 25 kg) rekommenderar vi TTA-kirurgi, som permanent förändrar knäets biomekanik.',
    en: 'Lateral suture is an excellent choice for small dogs (under 15 kg) and cats — with a success rate exceeding 90% in these patients. The technique also works well for medium-sized dogs (15–25 kg) and for older, calmer large dogs. In cats, the lateral suture is the standard method for cruciate ligament repair, as cats\' light body frame is perfectly suited to the technique. For active and large dogs (over 25 kg), we recommend TTA surgery, which permanently alters knee biomechanics.'
  },
  'article.ccl.recovery.title': {
    fi: 'Toipuminen',
    sv: 'Återhämtning',
    en: 'Recovery'
  },
  'article.ccl.recovery.text': {
    fi: 'Leikkauksen jälkeen ensimmäiset 6 viikkoa ovat kriittisiä: liikkumista rajoitetaan tiukasti, jotta sidekudos ehtii muodostua nivelen ympärille. Koira ulkoilutetaan lyhyillä talutushihnakävelyillä (5–15 minuuttia) ja hyppiminen, juokseminen ja portaat ovat kiellettyjä. Tikit poistetaan noin 2 viikon kohdalla. 6–8 viikon kontrollikäynnillä arvioidaan paraneminen ja kävelylenkkejä pidennetään asteittain. Noin 12–16 viikon kohdalla useimmat potilaat palaavat normaaliin aktiivisuuteen. Kuntoutus — esimerkiksi vesijuoksumatto — nopeuttaa toipumista merkittävästi.',
    sv: 'De första 6 veckorna efter operationen är kritiska: rörelsen begränsas strikt så att bindväv hinner bildas runt leden. Hunden rastas med korta koppelpromenader (5–15 minuter) och hoppande, springande och trappor är förbjudna. Stygnen tas bort efter cirka 2 veckor. Vid kontrollbesöket efter 6–8 veckor bedöms läkningen och promenaderna förlängs stegvis. Efter cirka 12–16 veckor har de flesta patienter återgått till normal aktivitet. Rehabilitering — till exempel undervattenslöpband — påskyndar återhämtningen avsevärt.',
    en: 'The first 6 weeks after surgery are critical: activity is strictly restricted to allow connective tissue to form around the joint. The dog is taken on short leash walks (5–15 minutes) and jumping, running and stairs are prohibited. Sutures are removed at approximately 2 weeks. At the 6–8 week follow-up, healing is assessed and walks are gradually extended. By approximately 12–16 weeks, most patients have returned to normal activity. Rehabilitation — such as an underwater treadmill — significantly speeds recovery.'
  },
  'article.ccl.risks.title': {
    fi: 'Riskit ja komplikaatiot',
    sv: 'Risker och komplikationer',
    en: 'Risks and Complications'
  },
  'article.ccl.risks.text': {
    fi: 'Komplikaatioriski on pieni (5–17 %), ja suurin osa komplikaatioista on lieviä: turvotusta, serooman muodostumista tai lievää infektiota. Harvinaisempi mutta kliinisesti merkittävä komplikaatio on myöhäinen nivelkierukkavaurio (noin 7 %), joka voi ilmetä viikkojen tai kuukausien kuluttua äkillisenä ontumisena. Langan pettäminen on mahdollista erityisesti ylipainoisilla tai liian aikaisin aktiivisilla koirilla. Paras keino ehkäistä komplikaatioita on noudattaa toipumisohjeita tarkasti.',
    sv: 'Komplikationsrisken är liten (5–17 %), och de flesta komplikationer är lindriga: svullnad, serombildning eller lätt infektion. En mer sällsynt men kliniskt betydande komplikation är sen meniskskada (cirka 7 %), som kan visa sig som plötslig hälta veckor eller månader efter operationen. Suturbrott kan förekomma särskilt hos överviktiga eller för tidigt aktiva hundar. Det bästa sättet att förebygga komplikationer är att följa återhämtningsinstruktionerna noggrant.',
    en: 'The complication rate is low (5–17%), and most complications are minor: swelling, seroma formation, or mild infection. A rarer but clinically significant complication is late meniscal injury (approximately 7%), which can present as sudden lameness weeks or months after surgery. Suture failure can occur particularly in overweight dogs or those returned to activity too early. The best way to prevent complications is to follow recovery instructions carefully.'
  },
  'article.ccl.vs.title': {
    fi: 'Lateral suture vai TTA?',
    sv: 'Lateral sutur eller TTA?',
    en: 'Lateral Suture or TTA?'
  },
  'article.ccl.vs.text': {
    fi: 'Klinikallamme käytämme kahta menetelmää eturistisiteen korjaukseen. Lateral suture stabiloi nivelen synteettisellä langalla ilman luun sahaamista — se on lyhyempi toimenpide, edullisempi ja erinomainen vaihtoehto pienille ja keskikokoisille potilaille. TTA muuttaa polven biomekaniikkaa pysyvästi siirtämällä sääriluun kyhmyä ja on parempi valinta aktiivisille ja suuremmille koirille. Arvioimme aina yksilöllisesti, kumpi menetelmä sopii parhaiten juuri sinun lemmikillesi.',
    sv: 'På vår klinik använder vi två metoder för korsbandsskadereparation. Lateral sutur stabiliserar leden med en syntetisk tråd utan att behöva såga i benet — det är ett kortare ingrepp, mer ekonomiskt och ett utmärkt alternativ för små och medelstora patienter. TTA förändrar knäets biomekanik permanent genom att flytta skenbenets utskott framåt och är ett bättre val för aktiva och större hundar. Vi bedömer alltid individuellt vilken metod som passar bäst för just ditt husdjur.',
    en: 'At our clinic we use two methods for cruciate ligament repair. The lateral suture stabilizes the joint with a synthetic suture without cutting bone — it is a shorter procedure, more affordable, and an excellent option for small and medium-sized patients. TTA permanently alters knee biomechanics by advancing the tibial tuberosity and is a better choice for active and larger dogs. We always assess individually which method is best suited for your pet.'
  },
  'article.ccl.signs.title': {
    fi: 'Milloin kannattaa ottaa yhteyttä?',
    sv: 'När bör du kontakta oss?',
    en: 'When Should You Contact Us?'
  },
  'article.ccl.signs.text': {
    fi: 'Ristisidevauriota kannattaa epäillä, jos koira tai kissa ontuu takajalkaansa, ei halua hypätä tai nousta portaita, jäykistelee levon jälkeen tai liikunnan aikana jalka "pettää". Oireet voivat alkaa äkillisesti tai kehittyä hitaasti viikkojen kuluessa. Varhainen diagnoosi parantaa ennustetta merkittävästi — varaa aika ortopediseen tutkimukseen, niin arvioimme tilanteen ja suosittelemme parhaiten sopivan hoitovaihtoehdon.',
    sv: 'En korsbandsskada bör misstänkas om hunden eller katten haltar på bakbenet, inte vill hoppa eller gå i trappor, är stel efter vila eller om benet "viker sig" under aktivitet. Symtomen kan börja plötsligt eller utvecklas långsamt under veckor. Tidig diagnos förbättrar prognosen avsevärt — boka tid för en ortopedisk undersökning, så bedömer vi situationen och rekommenderar det bäst lämpade behandlingsalternativet.',
    en: 'A cruciate ligament injury should be suspected if your dog or cat is limping on a hind leg, reluctant to jump or climb stairs, stiff after rest, or the leg "gives way" during activity. Symptoms can start suddenly or develop slowly over weeks. Early diagnosis significantly improves the prognosis — book an orthopedic examination and we will assess the situation and recommend the most suitable treatment option.'
  },
  'article.ccl.price.title': {
    fi: 'Hinta',
    sv: 'Pris',
    en: 'Price'
  },
  'article.ccl.price.text': {
    fi: 'Lateral suture -leikkauksen hinta klinikallamme alkaa noin 1 200 eurosta. Hinta sisältää leikkausta edeltävän tutkimuksen, anestesian valvontoineen, itse leikkauksen ja välittömän jälkihoidon. Tarkka hinta riippuu potilaan koosta ja tapauksen vaativuudesta. Vertailun vuoksi TTA-leikkaus alkaa noin 2 500 eurosta.',
    sv: 'Priset för lateral sutur-operation på vår klinik börjar från cirka 1 200 euro. Priset inkluderar undersökning före operationen, anestesi med övervakning, själva operationen och omedelbar eftervård. Det exakta priset beror på patientens storlek och fallets komplexitet. Som jämförelse börjar TTA-operationen från cirka 2 500 euro.',
    en: 'The price for lateral suture surgery at our clinic starts from approximately 1,200 euros. The price includes the pre-operative examination, anesthesia with monitoring, the surgery itself, and immediate aftercare. The exact price depends on the patient\'s size and case complexity. For comparison, TTA surgery starts from approximately 2,500 euros.'
  },

  // Article 16: Hedgehog Conservation
  'article.hedgehog.tag': { fi: 'Wildlife', sv: 'Wildlife', en: 'Wildlife' },
  'article.hedgehog.title': {
    fi: 'Siili Euroopassa ja Suomessa — uhanalainen puutarhan ystävä, joka tarvitsee apuamme',
    sv: 'Igelkotten i Europa och Finland — en hotad trädgårdsvän som behöver vår hjälp',
    en: 'The Hedgehog in Europe and Finland — An Endangered Garden Friend That Needs Our Help'
  },
  'article.hedgehog.intro': {
    fi: 'Euroopan siili (Erinaceus europaeus) on yksi rakastetuimmista villieläimistämme — ja yksi nopeimmin vähenevistä. Lokakuussa 2024 IUCN nosti siilin uhanalaisuusluokituksen luokasta "elinvoimainen" luokkaan "silmälläpidettävä" (Near Threatened), koska kannat ovat romahtaneet yli 30 % kymmenessä vuodessa monissa Euroopan maissa. Suomessa siili elää levinneisyytensä pohjoisrajalla, mikä tekee kannastamme erityisen haavoittuvan. Tässä artikkelissa käymme läpi siilin tilanteen, uhat ja sen, miten jokainen voi auttaa.',
    sv: 'Den europeiska igelkotten (Erinaceus europaeus) är ett av våra mest älskade vilda djur — och ett av de snabbast minskande. I oktober 2024 uppgraderade IUCN igelkottens hotstatus till "nära hotad" (Near Threatened), eftersom populationerna har minskat med över 30 % på tio år i många europeiska länder. I Finland lever igelkotten vid den nordligaste gränsen av sitt utbredningsområde, vilket gör vår population särskilt sårbar. I denna artikel går vi igenom igelkottens situation, hoten och hur var och en kan hjälpa till.',
    en: 'The European hedgehog (Erinaceus europaeus) is one of our most beloved wild animals — and one of the fastest declining. In October 2024, the IUCN upgraded the hedgehog\'s threat status to Near Threatened, as populations have collapsed by over 30% in ten years across many European countries. In Finland, the hedgehog lives at the northernmost limit of its range, making our population particularly vulnerable. In this article, we cover the hedgehog\'s situation, the threats it faces, and how everyone can help.'
  },
  'article.hedgehog.photo.caption': {
    fi: 'Vasemmalla: 420 g siili, oikealla: 750 g siili — puhelin kokovertailuna. Syksyllä alle 600 g painava siili ei selviä talvihorroksesta ja tarvitsee apua, mutta alkukesällä pienet siilit ovat usein terveitä poikasia. Kuva: Eläinklinikka Saari.',
    sv: 'Till vänster: 420 g igelkott, till höger: 750 g igelkott — telefonen som storleksjämförelse. På hösten klarar en igelkott under 600 g inte vinterdvalan och behöver hjälp, men på försommaren är små igelkottar ofta friska ungar. Foto: Djurkliniken Saari.',
    en: 'Left: 420 g hedgehog, right: 750 g hedgehog — phone for scale. In autumn, a hedgehog under 600 g cannot survive hibernation and needs help, but in early summer small hedgehogs are often healthy juveniles. Photo: Eläinklinikka Saari.'
  },
  'article.hedgehog.decline.title': {
    fi: 'Kannan romahdus Euroopassa',
    sv: 'Populationskollapsen i Europa',
    en: 'Population Collapse Across Europe'
  },
  'article.hedgehog.decline.text': {
    fi: 'Siilikanta on laskenut dramaattisesti kaikkialla Euroopassa. Iso-Britanniassa maaseudun siilikanta on pienentynyt 30–75 % vuodesta 2000 ja siili on luokiteltu vaarantuneeksi (Vulnerable). Saksassa kanta on puolittunut Baijerissa kymmenessä vuodessa. Alankomaissa siili on luokiteltu erittäin uhanalaiseksi (Endangered). Ruotsissa ja Norjassa kannan arvioidaan laskeneen yli 30 %. Vuonna 2025 julkaistu kattava tutkimus (Biological Conservation) vahvisti, että siilikanta on pienentynyt yli puolessa niistä Euroopan maista, joissa laji esiintyy. Euroopan parlamentissa on käynnistetty työ EU:n laajuisen siilien suojelustrategian luomiseksi.',
    sv: 'Igelkottspopulationen har minskat dramatiskt i hela Europa. I Storbritannien har landsbygdens population minskat med 30–75 % sedan år 2000 och igelkotten klassas som sårbar (Vulnerable). I Tyskland har populationen halverats i Bayern på tio år. I Nederländerna klassas igelkotten som starkt hotad (Endangered). I Sverige och Norge beräknas populationen ha minskat med över 30 %. En omfattande studie publicerad 2025 (Biological Conservation) bekräftade att igelkottspopulationen har minskat i mer än hälften av de europeiska länder där arten förekommer. I Europaparlamentet har arbete inletts för att skapa en EU-omfattande strategi för igelkottsskydd.',
    en: 'The hedgehog population has declined dramatically across Europe. In Great Britain, the rural population has decreased by 30–75% since 2000 and the hedgehog is classified as Vulnerable. In Germany, the population has halved in Bavaria in ten years. In the Netherlands, the hedgehog is classified as Endangered. In Sweden and Norway, the population is estimated to have declined by over 30%. A comprehensive study published in 2025 (Biological Conservation) confirmed that hedgehog populations have decreased in more than half of the European countries where the species occurs. The European Parliament has begun work on creating an EU-wide Hedgehog Conservation Strategy.'
  },
  'article.hedgehog.finland.title': {
    fi: 'Siili Suomessa',
    sv: 'Igelkotten i Finland',
    en: 'The Hedgehog in Finland'
  },
  'article.hedgehog.finland.text': {
    fi: 'Suomessa siili elää levinneisyytensä pohjoisrajalla — yhtenäinen esiintymisalue ulottuu suunnilleen Tornio–Kuhmo-linjalle asti. Siili on rauhoitettu luonnonsuojelulain (9/2023) nojalla. Vuoden 2019 uhanalaisuusarvioinnissa siili luokiteltiin Suomessa elinvoimaiseksi (LC), mutta kannan kehityksestä ei ole järjestelmällistä seurantatietoa ja laskua epäillään. Siili tarvitsee vähintään 155 halleetonta päivää lisääntyäkseen ja kerätäkseen riittävät rasvavarastot talvihorrokseen — Suomen lyhyt kesä tekee tästä haastavaa. Siilit elävät meillä lähes yksinomaan ihmisasutuksen läheisyydessä: pihoilla, puistoissa ja puutarhoissa.',
    sv: 'I Finland lever igelkotten vid den nordligaste gränsen av sitt utbredningsområde — det sammanhängande utbredningsområdet sträcker sig ungefär till linjen Torneå–Kuhmo. Igelkotten är fridlyst enligt naturvårdslagen (9/2023). I den finska rödlistebedömningen 2019 klassades igelkotten som livskraftig (LC), men det finns ingen systematisk övervakning av populationsutvecklingen och en minskning misstänks. Igelkotten behöver minst 155 frostfria dagar för att kunna fortplanta sig och samla tillräckliga fettreserver för vinterdvala — Finlands korta sommar gör detta utmanande. Hos oss lever igelkottar nästan uteslutande i närheten av bebyggelse: på gårdar, i parker och trädgårdar.',
    en: 'In Finland, the hedgehog lives at the northernmost limit of its range — the continuous distribution area extends approximately to the Tornio–Kuhmo line. The hedgehog is protected under the Nature Conservation Act (9/2023). In the 2019 Finnish Red List assessment, the hedgehog was classified as Least Concern (LC), but there is no systematic monitoring of population trends and a decline is suspected. The hedgehog needs at least 155 frost-free days to breed and accumulate sufficient fat reserves for hibernation — Finland\'s short summer makes this challenging. In Finland, hedgehogs live almost exclusively near human habitation: in yards, parks and gardens.'
  },
  'article.hedgehog.threats.title': {
    fi: 'Miksi siilit vähenevät?',
    sv: 'Varför minskar igelkottarna?',
    en: 'Why Are Hedgehogs Declining?'
  },
  'article.hedgehog.threats.text': {
    fi: 'Suurimmat uhkat ovat ihmisen aiheuttamia. Liikenne tappaa Euroopassa vuosittain satoja tuhansia siilejä — pelkästään Saksassa jopa miljoona, Alankomaissa 340 000 ja Belgiassa 230 000–350 000. Elinympäristöjen pirstoutuminen umpinaisilla aidoilla estää siilien liikkumisen. Maatalouden tehostuminen, torjunta-aineet ja hyönteiskato vähentävät ravintoa. Tanskassa 2024 julkaistu tutkimus osoitti, että 84 % tutkituista siileistä oli altistunut jyrsijämyrkyille ja 43 % hyönteismyrkyille. Ilmastonmuutos aiheuttaa ennenaikaisia talvihorrosheräämisiä, jotka kuluttavat kriittisiä rasvavarastoja.',
    sv: 'De största hoten är orsakade av människan. Trafiken dödar hundratusentals igelkottar i Europa årligen — enbart i Tyskland upp till en miljon, i Nederländerna 340 000 och i Belgien 230 000–350 000. Fragmentering av livsmiljöer med täta staket hindrar igelkottars rörelse. Intensifierat jordbruk, bekämpningsmedel och insektsdöd minskar födotillgången. En dansk studie publicerad 2024 visade att 84 % av undersökta igelkottar hade exponerats för gnagargift och 43 % för insekticider. Klimatförändringen orsakar förtida uppvaknanden från vinterdvala som förbrukar kritiska fettreserver.',
    en: 'The greatest threats are human-caused. Traffic kills hundreds of thousands of hedgehogs in Europe annually — in Germany alone up to one million, in the Netherlands 340,000 and in Belgium 230,000–350,000. Habitat fragmentation with solid fences prevents hedgehog movement. Agricultural intensification, pesticides and insect decline reduce food availability. A Danish study published in 2024 showed that 84% of examined hedgehogs had been exposed to rodenticides and 43% to insecticides. Climate change causes premature awakenings from hibernation that deplete critical fat reserves.'
  },
  'article.hedgehog.robots.title': {
    fi: 'Robottiruohonleikkurit — kasvava uhka',
    sv: 'Robotgräsklippare — ett växande hot',
    en: 'Robot Lawn Mowers — A Growing Threat'
  },
  'article.hedgehog.robots.text': {
    fi: 'Robottiruohonleikkurit ovat nousseet yhdeksi merkittävimmistä siilien uhista. Oxfordin yliopiston ja Leibniz-instituutin vuonna 2024 julkaisemassa tutkimuksessa testattiin 19 robottileikkuria — käytännössä kaikki aiheuttivat vammoja siileille. Saksassa dokumentoitiin 16 kuukauden aikana 370 robottiruohonleikkurin vahingoittamaa siiliä, joista lähes puolet kuoli. Todellinen luku on huomattavasti suurempi. Siilit ovat yöeläimiä, ja robottiruohonleikkurit toimivat usein öisin valvomattomina — siilin puolustusmekanismi (keräytyminen palloksi) ei suojaa teriltä. Tärkein viesti: älä koskaan käytä robottiruohonleikkuria yöllä.',
    sv: 'Robotgräsklippare har blivit ett av de mest betydande hoten mot igelkottar. I en studie publicerad 2024 av Oxfords universitet och Leibniz-institutet testades 19 robotklippare — praktiskt taget alla orsakade skador på igelkottar. I Tyskland dokumenterades under 16 månader 370 igelkottar skadade av robotgräsklippare, varav nästan hälften dog. Det verkliga antalet är betydligt högre. Igelkottar är nattdjur och robotgräsklippare körs ofta nattetid utan uppsikt — igelkottens försvarsmekanism (att rulla ihop sig till en boll) skyddar inte mot klingorna. Det viktigaste budskapet: kör aldrig robotgräsklipparen på natten.',
    en: 'Robot lawn mowers have become one of the most significant threats to hedgehogs. In a study published in 2024 by the University of Oxford and the Leibniz Institute, 19 robot mowers were tested — virtually all caused injuries to hedgehogs. In Germany, 370 hedgehogs injured by robot mowers were documented over 16 months, of which nearly half died. The actual number is significantly higher. Hedgehogs are nocturnal, and robot mowers often operate at night unattended — the hedgehog\'s defense mechanism (curling into a ball) offers no protection against the blades. The most important message: never run robot mowers at night.'
  },
  'article.hedgehog.help.title': {
    fi: 'Miten voit auttaa siilejä?',
    sv: 'Hur kan du hjälpa igelkottarna?',
    en: 'How Can You Help Hedgehogs?'
  },
  'article.hedgehog.help.text': {
    fi: 'Tee siiliaukko aitaan — 13 × 13 cm:n reikä aidan alaosassa riittää ja mahdollistaa siilien liikkumisen pihojen välillä. Tämä on yksittäisistä toimista vaikuttavin. Älä käytä robottiruohonleikkuria hämärän jälkeen. Jätä puutarhaan villiintyneitä alueita — lehtikasat ja risukot tarjoavat pesäpaikkoja. Tarjoa raikasta vettä matalassa astiassa. Lisäruokana sopii kissanruoka (lihapohjasta, ei kalaa) — älä koskaan anna leipää tai maitoa, ne aiheuttavat ripulia. Vältä torjunta-aineita ja etanasyöttejä — siilit ovat luonnon parhaita etanan- ja kotiloidentorjujia. Tarkista aina nuotiopaikat ja lehtikasot ennen polttamista. Asenna lammikkoon nousuramppi, sillä siilit uivat mutta väsyvät nopeasti.',
    sv: 'Gör en igelkottsöppning i staketet — ett hål på 13 × 13 cm vid staketets botten räcker och gör det möjligt för igelkottar att röra sig mellan trädgårdar. Detta är den enskilt mest effektiva åtgärden. Kör inte robotgräsklipparen efter skymning. Lämna vilda ytor i trädgården — lövhögar och rishögar erbjuder boplatser. Ställ ut friskt vatten i en grund skål. Som tillskottsfoder passar kattmat (köttbaserad, inte fisk) — ge aldrig bröd eller mjölk, det orsakar diarré. Undvik bekämpningsmedel och snigelgift — igelkottar är naturens bästa snigel- och snäckbekämpare. Kontrollera alltid eldhögar och lövhögar innan du tänder eld. Installera en ramp i dammen, eftersom igelkottar kan simma men tröttar snabbt.',
    en: 'Make a hedgehog highway — a 13 × 13 cm hole at the bottom of your fence is enough and allows hedgehogs to move between gardens. This is the single most impactful action. Never run robot mowers after dusk. Leave wild areas in your garden — leaf piles and brush heaps provide nesting sites. Provide fresh water in a shallow dish. Supplementary food can be meat-based cat food (not fish) — never give bread or milk, as they cause diarrhea. Avoid pesticides and slug pellets — hedgehogs are nature\'s best slug and snail controllers. Always check bonfire sites and leaf piles before burning. Install a ramp in your pond, as hedgehogs can swim but tire quickly.'
  },
  'article.hedgehog.nest.title': {
    fi: 'Rakenna siilille talvipesä',
    sv: 'Bygg ett vinterbo åt igelkotten',
    en: 'Build a Winter Nest for Hedgehogs'
  },
  'article.hedgehog.nest.text': {
    fi: 'Yksi parhaista tavoista auttaa siilejä on rakentaa talvipesä eli siilitalo. Suomessa talvihorros kestää jopa 8 kuukautta — lokakuusta huhtikuuhun — ja hyvä pesä voi ratkaista siilin selviytymisen. Suomen luonnonsuojeluliiton ja WWF Suomen ohjeiden mukaan talvipesän rakentaminen on yksinkertaista:',
    sv: 'Ett av de bästa sätten att hjälpa igelkottar är att bygga ett vinterbo, ett så kallat igelkottshus. I Finland varar vinterdvalan upp till 8 månader — från oktober till april — och ett bra bo kan avgöra om igelkotten överlever. Enligt anvisningar från Finlands naturskyddsförbund och WWF Finland är det enkelt att bygga ett vinterbo:',
    en: 'One of the best ways to help hedgehogs is to build a winter nest, a hedgehog house. In Finland, hibernation lasts up to 8 months — from October to April — and a good nest can determine whether a hedgehog survives. According to guidelines from the Finnish Association for Nature Conservation and WWF Finland, building a winter nest is straightforward:'
  },
  'article.hedgehog.nest.instructions': {
    fi: 'Käsittelemättömistä laudoista (EI vaneria — vaneri ei hengitä ja homehtuu) rakennetaan noin 40 × 40 × 40 cm:n laatikko ILMAN pohjaa — avoin pohja päästää virtsan valumaan maahan eikä siili jäädy märkään pohjaan. Yhdelle seinälle sahataan 10 × 15 cm:n sisäänkäyntiaukko, johon kiinnitetään kolmesta laudasta rakennettu 15–20 cm:n tunneli — tunneli estää kettuja ja kissoja pääsemästä sisään. Molempiin yläkulmiin porataan tuuletusreiät (homeenesto). Kansi tehdään irrotettavaksi ja päällystetään kattohuovalla vesisateelta suojaksi. Sisälle levitetään ensin soraa (salaojitus), sitten multaa, sammalta ja lopuksi pakkaus täyteen kuivia lehtiä (vaahteran lehdet ovat siilien suosikkeja) ja heinää. Pesä sijoitetaan rauhalliseen, varjoisaan paikkaan pohjoissuuntaan — EI aurinkoiselle puolelle, sillä keväinen aurinko herättäisi siilin liian aikaisin. Suuntaa sisäänkäynti tuulelta suojaan. Pesän tulee olla valmis viimeistään syyskuun lopussa, mielellään jo elokuussa. Lokakuun ja huhtikuun välillä pesää ei saa avata eikä häiritä — lumen alla oleva pesä on lämmin ja turvallinen. Älä koskaan poista lunta pesän päältä. Keväällä (touko-kesäkuussa) pesä puhdistetaan hansikkaat kädessä, pestään kuumalla vedellä ja täytetään uudelleen tuoreilla lehdillä.',
    sv: 'Av obehandlade brädor (INTE plywood — plywood andas inte och mögelbildas) byggs en låda på ungefär 40 × 40 × 40 cm UTAN botten — den öppna botten låter urinen rinna ner i marken och igelkotten fryser inte fast i ett vått golv. I en vägg sågas en ingångsöppning på 10 × 15 cm, där en tunnel på 15–20 cm fästs, byggd av tre brädor — tunneln hindrar rävar och katter från att ta sig in. I båda övre hörnen borras ventilationshål (mot mögel). Locket görs avtagbart och kläs med takpapp som vattenskydd. Inuti läggs först grus (dränering), sedan jord, mossa och slutligen fylls hela utrymmet med torra löv (lönnlöv är igelkottarnas favorit) och hö. Boet placeras på en lugn, skuggig plats i norrläge — INTE på solsidan, eftersom vårsolen skulle väcka igelkotten för tidigt. Rikta ingången i lä. Boet ska vara klart senast i slutet av september, helst redan i augusti. Mellan oktober och april får boet inte öppnas eller störas — ett bo under snön är varmt och tryggt. Ta aldrig bort snö från boet. På våren (maj–juni) rengörs boet med handskar, tvättas med hett vatten och fylls på nytt med färska löv.',
    en: 'From untreated boards (NOT plywood — plywood does not breathe and develops mold) build a box of approximately 40 × 40 × 40 cm WITHOUT a bottom — the open bottom lets urine drain into the soil and prevents the hedgehog from freezing to a wet floor. Cut a 10 × 15 cm entrance opening in one wall and attach a 15–20 cm tunnel made from three boards — the tunnel prevents foxes and cats from reaching inside. Drill ventilation holes in both upper corners (to prevent mold). Make the lid removable and cover it with roofing felt for rain protection. Inside, first spread gravel (drainage), then soil, moss, and finally pack the entire space full of dry leaves (maple leaves are hedgehogs\' favorite) and hay. Place the nest in a quiet, shaded spot facing north — NOT on the sunny side, as spring sunshine would wake the hedgehog too early. Point the entrance away from prevailing winds. The nest must be ready by the end of September at the latest, preferably by August. Between October and April, do not open or disturb the nest — a nest under snow is warm and safe. Never remove snow from the nest. In spring (May–June), clean the nest wearing gloves, wash with hot water, and refill with fresh leaves.'
  },
  'article.hedgehog.nest.links': {
    fi: 'Yksityiskohtaiset rakennus\u00ADohjeet kuvien kanssa löydät täältä: Suomen luonnonsuojeluliitto (<a href="https://www.sll.fi/2019/05/21/nikkaroi-siilille-pesa/" target="_blank" rel="noopener">sll.fi</a>), WWF Suomi (<a href="https://wwf.fi/ala-villiksi/tee-siilille-pesa/" target="_blank" rel="noopener">wwf.fi</a>) ja YLE Strömsö (<a href="https://yle.fi/aihe/artikkeli/2018/05/18/rakenna-kodikas-pesa-siilille" target="_blank" rel="noopener">yle.fi</a>).',
    sv: 'Detaljerade bygginstruktioner med bilder hittar du här: Finlands naturskyddsförbund (<a href="https://www.sll.fi/2019/05/21/nikkaroi-siilille-pesa/" target="_blank" rel="noopener">sll.fi</a>), WWF Finland (<a href="https://wwf.fi/ala-villiksi/tee-siilille-pesa/" target="_blank" rel="noopener">wwf.fi</a>) och YLE Strömsö (<a href="https://yle.fi/aihe/artikkeli/2018/05/18/rakenna-kodikas-pesa-siilille" target="_blank" rel="noopener">yle.fi</a>).',
    en: 'Detailed building instructions with photos can be found here: Finnish Association for Nature Conservation (<a href="https://www.sll.fi/2019/05/21/nikkaroi-siilille-pesa/" target="_blank" rel="noopener">sll.fi</a>), WWF Finland (<a href="https://wwf.fi/ala-villiksi/tee-siilille-pesa/" target="_blank" rel="noopener">wwf.fi</a>) and YLE Strömsö (<a href="https://yle.fi/aihe/artikkeli/2018/05/18/rakenna-kodikas-pesa-siilille" target="_blank" rel="noopener">yle.fi</a>).'
  },
  'article.hedgehog.nest.photo.caption': {
    fi: 'Siili kurkistaa puisesta suojastaan. Yksinkertainenkin siilitalo voi pelastaa siilin hengen talvella. Kuva: Alexas Fotos / Pexels.',
    sv: 'En igelkott kikar ut från sitt träskydd. Även ett enkelt igelkottshus kan rädda en igelkotts liv på vintern. Foto: Alexas Fotos / Pexels.',
    en: 'A hedgehog peeks out from its wooden shelter. Even a simple hedgehog house can save a hedgehog\'s life in winter. Photo: Alexas Fotos / Pexels.'
  },
  'article.hedgehog.nest.cta': {
    fi: '<strong>Osaatko rakentaa siilitalon ja haluaisit rakentaa myös muille?</strong> Ota meihin yhteyttä — yhdistämme sinut apua tarvitsevien kanssa. Yhdessä voimme auttaa Vaasan alueen siilejä selviytymään talvesta.',
    sv: '<strong>Kan du bygga igelkottshus och vill du bygga åt andra också?</strong> Kontakta oss — vi kopplar ihop dig med dem som behöver hjälp. Tillsammans kan vi hjälpa Vasaregionens igelkottar att överleva vintern.',
    en: '<strong>Do you know how to build a hedgehog house and would you be willing to build for others?</strong> Contact us — we will connect you with people who need help. Together we can help the hedgehogs of the Vaasa region survive the winter.'
  },
  'article.hedgehog.injured.title': {
    fi: 'Löysitkö loukkaantuneen siilin?',
    sv: 'Hittade du en skadad igelkott?',
    en: 'Found an Injured Hedgehog?'
  },
  'article.hedgehog.injured.text': {
    fi: 'Siili tarvitsee apua, jos se horjuu tai makaa kyljellään, liikkuu päivänvalossa (terve siili on yöeläin), sillä on näkyviä vammoja tai kärpäsen toukkia, tai se on syksyllä (syyskuusta lähtien) pieni — alle 600 g. Alkukesällä pienet siilit ovat usein poikasia, jotka syntyvät kesä–heinäkuussa ja painavat vieroitettuna vain 120–350 g: tämä on normaalia. Mutta syyskuusta lähtien alle 600 g painava siili ei selviä Suomen talvihorroksesta ilman apua. Nosta siili paksut hansikkaat kädessä ja aseta se korkeareunaisen pahvilaatikon sisälle, jossa on pyyhe pohjalla. Tarjoa lämpöä — lämpimällä vedellä täytetty, pyyhkeeseen kääritty kuumavesipullo. Tarjoa vettä ja ruokaa (kissanruoka). Ota yhteyttä eläinlääkäriin mahdollisimman pian. Eläinklinikka Saaressa hoidamme yhteistyössä Nordic Wildlife Caren kanssa myös loukkaantuneita siilejä — tuo eläin klinikalle, niin annamme ensiavun ja järjestämme jatkohoidon.',
    sv: 'En igelkott behöver hjälp om den raglar eller ligger på sidan, rör sig i dagsljus (en frisk igelkott är ett nattdjur), har synliga skador eller fluglarver, eller om den är liten på hösten (från september) — under 600 g. På försommaren är små igelkottar ofta ungar som föds i juni–juli och väger bara 120–350 g vid avvänjning: detta är helt normalt. Men från september klarar en igelkott under 600 g inte Finlands långa vinterdvala utan hjälp. Lyft igelkotten med tjocka handskar och placera den i en låda med höga kanter med en handduk i botten. Erbjud värme — en varmvattenflaska fylld med varmt vatten, inlindad i en handduk. Erbjud vatten och mat (kattmat). Kontakta veterinär så snart som möjligt. På Djurkliniken Saari vårdar vi i samarbete med Nordic Wildlife Care även skadade igelkottar — ta med djuret till kliniken så ger vi första hjälpen och ordnar fortsatt vård.',
    en: 'A hedgehog needs help if it is staggering or lying on its side, active during daylight (a healthy hedgehog is nocturnal), has visible injuries or fly larvae, or is small in autumn (from September onwards) — under 600 g. In early summer, small hedgehogs are often juveniles born in June–July that weigh only 120–350 g when weaned: this is completely normal. But from September onwards, a hedgehog under 600 g cannot survive Finland\'s long hibernation without help. Pick up the hedgehog wearing thick gloves and place it in a high-sided cardboard box with a towel at the bottom. Provide warmth — a hot water bottle filled with warm water, wrapped in a towel. Offer water and food (cat food). Contact a veterinarian as soon as possible. At Eläinklinikka Saari, we care for injured hedgehogs in cooperation with Nordic Wildlife Care — bring the animal to the clinic and we will provide first aid and arrange ongoing care.'
  },
  'article.hedgehog.ecology.title': {
    fi: 'Siilin elämää lyhyesti',
    sv: 'Igelkottens liv i korthet',
    en: 'Hedgehog Life in Brief'
  },
  'article.hedgehog.ecology.text': {
    fi: 'Siili on yöeläin, joka kulkee yössä 1–2 km ravintoa etsien. Aikuinen siili painaa 600–1 100 g ja sillä on noin 5 000–6 000 piikkiä. Ravintona ovat kovakuoriaiset, toukat, etanat, kotilot, madot ja hyönteiset — siili on puutarhurin paras ystävä. Talvihorros kestää Suomessa noin lokakuusta huhtikuuhun: ruumiinlämpö laskee 35 asteesta jopa 1–4 asteeseen ja syke putoaa 190:stä noin 20 lyöntiin minuutissa. Lisääntymiskausi on huhti–syyskuussa, ja naaras synnyttää keskimäärin 4–5 poikasta. Siilin keskimääräinen elinikä luonnossa on 2–3 vuotta. Suomessa siili vaatii vähintään noin 450–600 gramman painon selviytyäkseen talvihorroksesta.',
    sv: 'Igelkotten är ett nattdjur som rör sig 1–2 km per natt i jakt på föda. En vuxen igelkott väger 600–1 100 g och har cirka 5 000–6 000 taggar. Födan består av skalbaggar, larver, sniglar, snäckor, maskar och insekter — igelkotten är trädgårdsmästarens bästa vän. Vinterdvalan varar i Finland ungefär från oktober till april: kroppstemperaturen sjunker från 35 grader till så lågt som 1–4 grader och hjärtfrekvensen sjunker från 190 till cirka 20 slag per minut. Fortplantningstiden är april–september och honan föder i genomsnitt 4–5 ungar. Igelkottens genomsnittliga livslängd i det vilda är 2–3 år. I Finland behöver igelkotten en vikt på minst cirka 450–600 gram för att överleva vinterdvalan.',
    en: 'The hedgehog is a nocturnal animal that travels 1–2 km per night foraging for food. An adult hedgehog weighs 600–1,100 g and has approximately 5,000–6,000 spines. Its diet consists of beetles, larvae, slugs, snails, worms and insects — the hedgehog is the gardener\'s best friend. Hibernation in Finland lasts approximately from October to April: body temperature drops from 35 degrees to as low as 1–4 degrees and heart rate falls from 190 to about 20 beats per minute. The breeding season is April–September and the female gives birth to an average of 4–5 hoglets. The average lifespan of a hedgehog in the wild is 2–3 years. In Finland, a hedgehog needs a weight of at least approximately 450–600 grams to survive hibernation.'
  },

  // Cat Stress & Cat Friendly Clinic Article
  'article.catstress.tag': { fi: 'Kissojen terveys', sv: 'Katthälsa', en: 'Cat Health' },
  'article.catstress.title': {
    fi: 'Stressitön eläinlääkärikäynti kissalle — näin autamme ja näin voit valmistautua',
    sv: 'Stressfritt veterinärbesök för katten — så hjälper vi och så kan du förbereda dig',
    en: 'A Stress-Free Vet Visit for Your Cat — How We Help and How You Can Prepare'
  },
  'article.catstress.intro': {
    fi: 'Eläinlääkärikäynti on monelle kissalle stressaava kokemus. Vieras ympäristö, oudot hajut, koirien läsnäolo ja vieraiden ihmisten käsittely voivat laukaista voimakkaan stressireaktion. Stressi ei ole vain epämukavaa — se vaikuttaa myös tutkimustuloksiin: stressaantuneen kissan verensokeriarvo voi nousta jopa 10 mmol/l (ns. stressihyperglykemia), ja verenpaine voi kohota 15–75 mmHg ("valkotakkihypertensio"), mikä vaikeuttaa diagnosointia. Eläinklinikka Saarella olemme panostaneet kissojen hyvinvointiin ja saaneet kansainvälisen ISFM-järjestön Cat Friendly Clinic Silver -sertifikaatin.',
    sv: 'Ett veterinärbesök är en stressande upplevelse för många katter. En främmande miljö, okända lukter, närvaro av hundar och hantering av främlingar kan utlösa en stark stressreaktion. Stress är inte bara obehagligt — det påverkar också undersökningsresultaten: en stressad katts blodsockervärde kan stiga med upp till 10 mmol/l (s.k. stresshyperglykemi) och blodtrycket kan höjas med 15–75 mmHg ("vitrockhypertension"), vilket försvårar diagnostiken. På Djurkliniken Saari har vi satsat på katternas välbefinnande och erhållit den internationella ISFM-organisationens Cat Friendly Clinic Silver-certifiering.',
    en: 'A vet visit is a stressful experience for many cats. An unfamiliar environment, strange smells, the presence of dogs, and handling by strangers can trigger a strong stress response. Stress is not just uncomfortable — it also affects test results: a stressed cat\'s blood glucose can rise by up to 10 mmol/L (stress hyperglycemia), and blood pressure can increase by 15–75 mmHg ("white coat hypertension"), making diagnosis more difficult. At Eläinklinikka Saari, we have invested in feline wellbeing and earned the international ISFM Cat Friendly Clinic Silver certification.'
  },
  'article.catstress.signs.title': {
    fi: 'Stressin merkit kissalla',
    sv: 'Tecken på stress hos katten',
    en: 'Signs of Stress in Cats'
  },
  'article.catstress.signs.text': {
    fi: 'Stressaantunut kissa osoittaa merkkejä kehonkielellään: pupillit laajenevat, korvat painuvat litteiksi tai sivuille, keho jäykistyy ja häntä painuu kiinni vartaloon. Kissa voi sihistä, murisee, yrittää paeta tai jähmettyä paikoilleen. Stressioireita ovat myös liiallinen nuoleminen, haukottelu, huulten lipominen sekä pahimmillaan virtsan tai ulosteen hallitsematon karkaaminen. Nämä reaktiot ovat normaaleja — ne kertovat, että kissa kokee tilanteen uhkaavaksi.',
    sv: 'En stressad katt visar tecken genom sitt kroppsspråk: pupillerna vidgas, öronen plattas till eller vänds åt sidorna, kroppen styvnar och svansen pressas mot kroppen. Katten kan fräsa, morra, försöka fly eller frysa på plats. Andra stresstecken är överdriven slickning, gäspning, läppslickning och i värsta fall okontrollerad urinering eller avföring. Dessa reaktioner är normala — de berättar att katten upplever situationen som hotfull.',
    en: 'A stressed cat shows signs through body language: pupils dilate, ears flatten or turn sideways, the body stiffens and the tail presses against the body. The cat may hiss, growl, try to escape, or freeze in place. Other stress signs include excessive licking, yawning, lip licking, and in the worst case, loss of bladder or bowel control. These reactions are normal — they indicate that the cat perceives the situation as threatening.'
  },
  'article.catstress.feliway.title': {
    fi: 'Feliway — kissan oma rauhoittava viesti',
    sv: 'Feliway — kattens eget lugnande budskap',
    en: 'Feliway — The Cat\'s Own Calming Signal'
  },
  'article.catstress.feliway.text': {
    fi: 'Kun kissa tuntee olonsa turvalliseksi, se hieroo päätään ja poskiaan kalusteisiin jättäen kasvojen feromoneja (F3-fraktio). Feliway on synteettinen kopio tästä feromonista. Se lähettää kissan vomeronasaalielimen kautta rauhoittavan viestin: "tämä paikka on turvallinen." Tutkimuksissa Feliway-suihketta saaneiden kissojen stressipisteet olivat merkitsevästi alhaisemmat kuin verrokkiryhmän, ja 41 % omistajista koki kissansa olevan selvästi rauhallisempi. Klinikallamme käytämme Feliway-haihdutiota vastaanotto- ja odotustiloissa sekä Feliway-suihketta tutkimuspöydillä ja pyyhkeillä.',
    sv: 'När en katt känner sig trygg gnider den sitt huvud och kinder mot möbler och avsätter ansiktsferomoner (F3-fraktionen). Feliway är en syntetisk kopia av detta feromon. Det skickar via kattens vomeronasala organ ett lugnande budskap: "den här platsen är trygg." I studier hade katter som exponerades för Feliway-spray signifikant lägre stresspoäng än kontrollgruppen, och 41 % av ägarna upplevde sin katt som tydligt lugnare. På vår klinik använder vi Feliway-diffusorer i mottagnings- och väntrum samt Feliway-spray på undersökningsbord och handdukar.',
    en: 'When a cat feels safe, it rubs its head and cheeks against furniture, depositing facial pheromones (the F3 fraction). Feliway is a synthetic copy of this pheromone. It sends a calming message through the cat\'s vomeronasal organ: "this place is safe." In studies, cats exposed to Feliway spray had significantly lower stress scores than the control group, and 41% of owners reported their cat was noticeably calmer. At our clinic, we use Feliway diffusers in reception and waiting areas and Feliway spray on examination tables and towels.'
  },
  'article.catstress.clinic.title': {
    fi: 'Cat Friendly Clinic Silver — mitä se tarkoittaa?',
    sv: 'Cat Friendly Clinic Silver — vad innebär det?',
    en: 'Cat Friendly Clinic Silver — What Does It Mean?'
  },
  'article.catstress.clinic.text': {
    fi: 'ISFM:n (International Society of Feline Medicine) Cat Friendly Clinic -ohjelma on kansainvälinen sertifiointijärjestelmä, joka asettaa standardit kissojen hoidolle eläinklinikoilla. Silver-taso edellyttää mm. erillistä odotustilaa kissoille erillään koirista, Feliway-feromonihaihduttimien käyttöä kaikissa tiloissa, nimettyä "kissavastaavaa" (Cat Advocate) henkilökunnasta, kissaystävällisiä käsittelytekniikoita (scruff-free — emme koskaan nosta kissaa niskasta), henkilökunnan koulutusta stressin tunnistamiseen sekä rauhallista ympäristöä sairaalahoitotiloissa piiloutumispaikkoineen ja näköestein. Sertifikaatti uusitaan kolmen vuoden välein.',
    sv: 'ISFM:s (International Society of Feline Medicine) Cat Friendly Clinic-program är ett internationellt certifieringssystem som sätter standarder för kattvård på veterinärkliniker. Silver-nivån kräver bl.a. separat väntområde för katter skilt från hundar, Feliway-feromondiffusorer i alla utrymmen, en utsedd "kattansvarig" (Cat Advocate) bland personalen, kattvänliga hanteringstekniker (scruff-free — vi lyfter aldrig katten i nackskinnet), personalutbildning i stressigenkänning samt en lugn miljö på vårdavdelningen med gömställen och synbarriärer. Certifikatet förnyas vart tredje år.',
    en: 'The ISFM (International Society of Feline Medicine) Cat Friendly Clinic program is an international certification system that sets standards for cat care at veterinary clinics. The Silver level requires a separate waiting area for cats away from dogs, Feliway pheromone diffusers in all areas, a designated Cat Advocate among the staff, cat-friendly handling techniques (scruff-free — we never lift a cat by the scruff), staff training in stress recognition, and a calm environment in hospitalization areas with hiding spots and visual barriers. The certificate is renewed every three years.'
  },
  'article.catstress.tips.title': {
    fi: 'Näin valmistaudut kissasi eläinlääkärikäyntiin',
    sv: 'Så förbereder du din katt för veterinärbesöket',
    en: 'How to Prepare Your Cat for the Vet Visit'
  },
  'article.catstress.tips.text': {
    fi: 'Jätä kuljetuslaatikko kotona pysyvästi esille avoimena — laita sisälle pehmeä peitto ja herkkuja, jotta kissa oppii yhdistämään laatikon turvalliseen paikkaan. Suihkuta Feliway-suihketta kuljetuslaatikon sisälle (8–10 suihkausta) vähintään 15 minuuttia ennen kissaa — alkoholin tulee haihtua ensin. Peitä kuljetuslaatikko pyyhkeellä autossa ja odotustilassa. Jos verikokeet ovat mahdollisia, paastota kissaa 8–12 tuntia ennen käyntiä. Aseta kuljetuslaatikko klinikalla korotettuun paikkaan — ei lattialle. Klinikallamme voit pyytää odottamaan kissojen omassa odotustilassa. Tutkimushuoneessa anna kissan tulla ulos laatikosta vapaaehtoisesti tai pyydä meitä avaamaan laatikon yläosa — emme koskaan vedä kissaa ulos väkisin.',
    sv: 'Låt transportburen stå framme hemma permanent med öppen dörr — lägg i en mjuk filt och godsaker så att katten lär sig associera buren med en trygg plats. Spraya Feliway-spray inuti buren (8–10 sprayningar) minst 15 minuter innan katten placeras i — alkoholen måste avdunsta först. Täck buren med en handduk i bilen och i väntrummet. Om blodprov kan bli aktuellt, låt katten fasta 8–12 timmar före besöket. Ställ buren på en upphöjd yta på kliniken — inte på golvet. På vår klinik kan du be om att vänta i katternas eget väntområde. I undersökningsrummet, låt katten komma ut ur buren frivilligt eller be oss att öppna burens ovandel — vi drar aldrig ut katten med tvång.',
    en: 'Leave the carrier out at home permanently with the door open — place a soft blanket and treats inside so the cat learns to associate the carrier with a safe place. Spray Feliway spray inside the carrier (8–10 sprays) at least 15 minutes before placing the cat in — the alcohol must evaporate first. Cover the carrier with a towel in the car and in the waiting room. If blood tests may be needed, fast the cat for 8–12 hours before the visit. Place the carrier on a raised surface at the clinic — not on the floor. At our clinic, you can ask to wait in the cats\' own waiting area. In the examination room, let the cat come out of the carrier voluntarily or ask us to open the top of the carrier — we never pull a cat out by force.'
  },

  // Unerupted Teeth & Dentigerous Cyst Article
  'article.unerupted.tag': { fi: 'Hammashoito', sv: 'Tandvård', en: 'Dental' },
  'article.unerupted.title': {
    fi: 'Puhkeamattomat hampaat ja dentigeroottinen kysta — piilevä vaara leukaluussa',
    sv: 'Icke-erupterade tänder och dentigena cystor — en dold fara i käkbenet',
    en: 'Unerupted Teeth and Dentigerous Cysts — A Hidden Danger in the Jawbone'
  },
  'article.unerupted.intro': {
    fi: 'Puhkeamaton hammas on hammas, joka ei ole noussut normaalisti suuonteloon vaan jäänyt leukaluun sisään. Tila on yllättävän yleinen erityisesti koirilla — noin 5–7 % koirista kärsii siitä, ja lyhytkuonoisilla roduilla osuus on vielä suurempi. Puhkeamattoman hampaan ympärille voi kehittyä dentigeroottinen kysta, nestettä täynnä oleva rakenne, joka kasvaa hitaasti ja tuhoaa leukaluuta. Ilman hammasröntgeniä tilanne jää havaitsematta, kunnes vahinko on jo merkittävä. Klinikallamme suoritamme hammasröntgenkuvaukset ja puhkeamattomien hampaiden kirurgiset poistot.',
    sv: 'En icke-erupterad tand är en tand som inte har kommit upp normalt i munhålan utan stannat kvar inuti käkbenet. Tillståndet är förvånansvärt vanligt, särskilt hos hundar — cirka 5–7 % av hundar drabbas, och hos brachycefala (trubbnosiga) raser är andelen ännu högre. Runt en icke-erupterad tand kan en dentigena cysta utvecklas — en vätskefylld struktur som växer långsamt och förstör käkbenet. Utan tandröngen förblir tillståndet oupptäckt tills skadan redan är betydande. På vår klinik utför vi tandröngenundersökningar och kirurgiska extraktioner av icke-erupterade tänder.',
    en: 'An unerupted tooth is a tooth that has failed to emerge normally into the oral cavity and remains trapped inside the jawbone. The condition is surprisingly common, especially in dogs — approximately 5–7% of dogs are affected, and the proportion is even higher in brachycephalic (short-nosed) breeds. A dentigerous cyst can develop around an unerupted tooth — a fluid-filled structure that grows slowly and destroys the jawbone. Without dental X-rays, the condition goes undetected until significant damage has already occurred. At our clinic, we perform dental radiography and surgical extraction of unerupted teeth.'
  },
  'article.unerupted.cyst.title': {
    fi: 'Mikä on dentigeroottinen kysta?',
    sv: 'Vad är en dentigen cysta?',
    en: 'What Is a Dentigerous Cyst?'
  },
  'article.unerupted.cyst.text': {
    fi: 'Normaalissa hampaan kehityksessä hampaan kruunua ympäröivä kiillekalvo (ns. redusoitu kiille-epitheeli) hajoaa hampaan puhjetessa. Kun hammas ei puhkea, tämä epiteelikerros jää ehjäksi ja nesteen kertyessä sen ympärille muodostuu kysta. Kysta kasvaa hitaasti mutta väistämättä: neste aiheuttaa painetta, joka aktivoi leukaluun syöjäsolut (osteoklastit). Tutkimusten mukaan 29–50 % puhkeamattomista hampaista kehittää dentigeroottisen kystan.',
    sv: 'Under normal tandutveckling bryts emaljehinnan (det s.k. reducerade emalj-epitelet) som omger tandkronan ned när tanden erupterar. När tanden inte erupterar förblir detta epitelskikt intakt och vätska samlas, vilket bildar en cysta. Cystan växer långsamt men oundvikligt: vätskan skapar tryck som aktiverar käkbenets nedbrytningsceller (osteoklaster). Studier visar att 29–50 % av icke-erupterade tänder utvecklar en dentigen cysta.',
    en: 'During normal tooth development, the enamel membrane (the reduced enamel epithelium) surrounding the tooth crown breaks down as the tooth erupts. When a tooth fails to erupt, this epithelial layer remains intact and fluid accumulates, forming a cyst. The cyst grows slowly but inevitably: the fluid creates pressure that activates the jawbone\'s resorption cells (osteoclasts). Studies show that 29–50% of unerupted teeth develop a dentigerous cyst.'
  },
  'article.unerupted.symptoms.title': {
    fi: 'Oireet — usein oireeton',
    sv: 'Symtom — ofta symtomfritt',
    en: 'Symptoms — Often Asymptomatic'
  },
  'article.unerupted.symptoms.text': {
    fi: 'Dentigeroottinen kysta on usein täysin oireeton alkuvaiheessa — tämä tekee siitä erityisen salakavalan. Yleisin löydös on "puuttuva hammas" suun tarkastuksessa: hammas, jonka pitäisi olla paikallaan, ei näy. Muita merkkejä voivat olla leuan turvotus, viereisten hampaiden siirtyminen tai kallistuminen, ja pitkälle edenneissä tapauksissa fisteli eli märkäkäytävä. Pahimmassa tapauksessa kysta heikentää leukaluuta niin paljon, että syntyy patologinen murtuma — leuka murtuu normaalista kuormituksesta.',
    sv: 'En dentigen cysta är ofta helt symtomfri i början — detta gör den särskilt lömsk. Det vanligaste fyndet är en "saknad tand" vid munundersökning: en tand som borde finnas på plats syns inte. Andra tecken kan vara svullnad i käken, förskjutning eller lutning av intilliggande tänder, och i avancerade fall en fistel (varutgång). I värsta fall försvagar cystan käkbenet så mycket att en patologisk fraktur uppstår — käken bryts av normal belastning.',
    en: 'A dentigerous cyst is often completely asymptomatic in the early stages — this makes it particularly insidious. The most common finding is a "missing tooth" on oral examination: a tooth that should be present is not visible. Other signs may include jaw swelling, displacement or tilting of adjacent teeth, and in advanced cases a fistula (draining tract). In the worst case, the cyst weakens the jawbone so much that a pathological fracture occurs — the jaw breaks under normal load.'
  },
  'article.unerupted.breeds.title': {
    fi: 'Riskirodut',
    sv: 'Riskraser',
    en: 'At-Risk Breeds'
  },
  'article.unerupted.breeds.text': {
    fi: 'Lyhytkuonoiset rodut (brakykefaaliset) ovat suurimmassa vaarassa, koska niiden lyhentynyt leuka ei tarjoa riittävästi tilaa kaikille hampaille. Erityisesti bokseri, englanninbulldoggi, ranskanbulldoggi, bostoninterrieri, mopsi ja shih tzu ovat yliedustettuja. Myös pienet rodut kuten maltankoira, yorkshirenterrieri, chihuahua, kääpiövillakoira ja mäyräkoira ovat riskissä. Kissoilla puhkeamattomat hampaat ja dentigeroottinen kysta ovat harvinaisia, mutta mahdollisia — samat periaatteet pätevät.',
    sv: 'Brachycefala (trubbnosiga) raser löper störst risk eftersom deras förkortade käke inte erbjuder tillräckligt med utrymme för alla tänder. Särskilt boxer, engelsk bulldogg, fransk bulldogg, bostonterrier, mops och shih tzu är överrepresenterade. Även små raser som malteser, yorkshireterrier, chihuahua, dvärg- och toypudel samt tax löper risk. Hos katter är icke-erupterade tänder och dentigena cystor sällsynta men möjliga — samma principer gäller.',
    en: 'Brachycephalic (short-nosed) breeds are at greatest risk because their shortened jaw does not provide enough space for all teeth. Boxers, English Bulldogs, French Bulldogs, Boston Terriers, Pugs, and Shih Tzus are particularly overrepresented. Small breeds such as Maltese, Yorkshire Terriers, Chihuahuas, Miniature Poodles, and Dachshunds are also at risk. In cats, unerupted teeth and dentigerous cysts are rare but possible — the same principles apply.'
  },
  'article.unerupted.diagnosis.title': {
    fi: 'Diagnoosi — hammasröntgen on välttämätön',
    sv: 'Diagnos — tandröngen är nödvändig',
    en: 'Diagnosis — Dental X-Rays Are Essential'
  },
  'article.unerupted.diagnosis.text': {
    fi: 'Puhkeamatonta hammasta ja dentigeroottista kystaa ei voi havaita paljaalla silmällä — ainoa tapa on hammasröntgen. Röntgenkuvassa näkyy selkeärajainen, pyöreä tai soikea kirkasalue (nestettä sisältävä onkalo) puhkeamattoman hampaan kruunun ympärillä. Röntgenkuva paljastaa myös luukadon laajuuden ja vaikutuksen viereisiin hampaisiin. Siksi suosittelemme täyden suun röntgenkuvausta jokaisen hammashoidon yhteydessä — tutkimukset osoittavat, että hammasröntgen muuttaa hoitosuunnitelmaa 28–50 %:lla potilaista paljastamalla piileviä ongelmia.',
    sv: 'En icke-erupterad tand och dentigen cysta kan inte upptäckas med blotta ögat — det enda sättet är tandröngen. På röngenbilden syns ett välavgränsat, runt eller ovalt genomskinligt område (en vätskefylld hålighet) runt kronan på den icke-erupterade tanden. Röngenbilden avslöjar också omfattningen av benförlust och påverkan på intilliggande tänder. Därför rekommenderar vi tandröngen av hela munnen vid varje tandbehandling — studier visar att tandröngen ändrar behandlingsplanen hos 28–50 % av patienterna genom att avslöja dolda problem.',
    en: 'An unerupted tooth and dentigerous cyst cannot be detected with the naked eye — the only way is dental X-rays. On the radiograph, a well-defined, round or oval radiolucent area (a fluid-filled cavity) appears around the crown of the unerupted tooth. The X-ray also reveals the extent of bone loss and the effect on adjacent teeth. This is why we recommend full-mouth radiographs with every dental procedure — studies show that dental X-rays change the treatment plan in 28–50% of patients by revealing hidden problems.'
  },
  'article.unerupted.treatment.title': {
    fi: 'Hoito — kirurginen poisto',
    sv: 'Behandling — kirurgisk extraktion',
    en: 'Treatment — Surgical Extraction'
  },
  'article.unerupted.treatment.text': {
    fi: 'Hoitona on puhkeamattoman hampaan kirurginen poisto ja kystaonkalon perusteellinen kaavinta (kyretaasi), jotta kaikki epiteelisolut saadaan poistettua. Toimenpiteessä nostetaan limakalvoläppä, avataan luussa ikkuna, poistetaan hammas ja kystan seinämä kokonaisuudessaan, ja suljetaan haava. Luuontelo täyttyy uudella luulla 2–6 kuukauden kuluessa. Hoitamattomana kysta jatkaa kasvuaan, tuhoaa luuta ja voi johtaa patologiseen murtumaan — kysta ei koskaan parane itsestään. Eläinklinikka Saarella suoritamme puhkeamattomien hampaiden kirurgiset poistot ja kystakaavinta on osa hammashoidon palvelujamme — varaa aika hammastutkimukseen, niin arvioimme tilanteen.',
    sv: 'Behandlingen är kirurgisk extraktion av den icke-erupterade tanden och noggrann utskrapning (kyrettage) av cystahålan för att avlägsna alla epitelceller. Vid ingreppet lyfts en mukoperiosteal lambå, ett fönster öppnas i benet, tanden och cystans hela vägg avlägsnas, och såret sluts. Benhålan fylls med nytt ben inom 2–6 månader. Obehandlad fortsätter cystan att växa, förstöra ben och kan leda till patologisk fraktur — en cysta läker aldrig av sig själv. På Djurkliniken Saari utför vi kirurgiska extraktioner av icke-erupterade tänder och cystakirurgi är en del av våra tandvårdstjänster — boka tid för en tandundersökning så bedömer vi situationen.',
    en: 'Treatment involves surgical extraction of the unerupted tooth and thorough curettage of the cyst cavity to remove all epithelial cells. The procedure involves raising a mucoperiosteal flap, opening a window in the bone, removing the tooth and the entire cyst wall, and closing the wound. The bone cavity fills with new bone within 2–6 months. Left untreated, the cyst continues to grow, destroys bone, and can lead to pathological fracture — a cyst never resolves on its own. At Eläinklinikka Saari, we perform surgical extractions of unerupted teeth and cyst surgery is part of our dental services — book an appointment for a dental examination and we will assess the situation.'
  },
  'article.unerupted.prognosis.title': {
    fi: 'Ennuste',
    sv: 'Prognos',
    en: 'Prognosis'
  },
  'article.unerupted.prognosis.text': {
    fi: 'Varhain havaitun ja täydellisesti poistetun dentigeroottisen kystan ennuste on erinomainen. Uusiutumisriski on pieni, kun kystan seinämä on poistettu kokonaan. Ennuste on heikompi, jos kysta on kasvanut suureksi, luuta on tuhoutunut laajasti tai leuka on jo murtunut. Siksi varhainen diagnoosi on ratkaiseva — hammasröntgen on paras keino löytää puhkeamattomat hampaat ennen kuin kysta ehtii muodostua.',
    sv: 'Prognosen för en tidigt upptäckt och fullständigt avlägsnad dentigen cysta är utmärkt. Risken för återfall är liten när cystans vägg har avlägsnats helt. Prognosen är sämre om cystan har vuxit sig stor, betydande benförlust har skett eller käken redan har frakturerats. Därför är tidig diagnos avgörande — tandröngen är det bästa sättet att hitta icke-erupterade tänder innan en cysta hinner bildas.',
    en: 'The prognosis for an early-detected and completely removed dentigerous cyst is excellent. The risk of recurrence is low when the cyst wall has been entirely removed. The prognosis is worse if the cyst has grown large, extensive bone has been destroyed, or the jaw has already fractured. This is why early diagnosis is crucial — dental X-rays are the best way to find unerupted teeth before a cyst has time to form.'
  },

  // Article 19: Gastroscopy
  'article.gastroscopy.tag': {
    fi: 'Tähystys',
    sv: 'Endoskopi',
    en: 'Endoscopy'
  },
  'article.gastroscopy.title': {
    fi: 'Gastroskopia — mahalaukun tähystys ja vierasesineiden poisto ilman leikkausta',
    sv: 'Gastroskopi — magsäcksundersökning och avlägsnande av främmande föremål utan kirurgi',
    en: 'Gastroscopy — Stomach Examination and Foreign Body Removal Without Surgery'
  },
  'article.gastroscopy.intro': {
    fi: 'Gastroskopia on tähystystutkimus, jossa taipuisa kameraendoskooppi viedään suun kautta ruokatorveen, mahalaukkuun ja pohjukaissuoleen. Tutkimus mahdollistaa limakalvojen tarkastelun reaaliajassa monitorilta, koepalojen oton ja vierasesineiden poiston — kaikki ilman kirurgista viiltoa. Gastroskopia on yksi yleisimmistä tähystystoimenpiteistä eläinlääketieteessä, ja se on erityisen arvokas työkalu kroonisten vatsaoireiden selvittämisessä ja vierasesineiden poistossa.',
    sv: 'Gastroskopi är en endoskopisk undersökning där ett flexibelt kameraendoskop förs genom munnen till matstrupen, magsäcken och tolvfingertarmen. Undersökningen möjliggör granskning av slemhinnorna i realtid på en monitor, provtagning av vävnadsprover och avlägsnande av främmande föremål — allt utan kirurgiskt snitt. Gastroskopi är en av de vanligaste endoskopiska procedurerna inom veterinärmedicin och är ett särskilt värdefullt verktyg för att utreda kroniska magsymtom och avlägsna främmande föremål.',
    en: 'Gastroscopy is an endoscopic procedure in which a flexible camera endoscope is passed through the mouth into the esophagus, stomach, and duodenum. The examination allows real-time viewing of the mucosal lining on a monitor, tissue biopsy collection, and foreign body removal — all without a surgical incision. Gastroscopy is one of the most common endoscopic procedures in veterinary medicine and is an especially valuable tool for investigating chronic gastrointestinal symptoms and removing foreign bodies.'
  },
  'article.gastroscopy.foreign.title': {
    fi: 'Vierasesineiden poisto — leikkauksen vaihtoehto',
    sv: 'Avlägsnande av främmande föremål — ett alternativ till kirurgi',
    en: 'Foreign Body Removal — an Alternative to Surgery'
  },
  'article.gastroscopy.foreign.text': {
    fi: 'Vierasesineen poisto on gastroskopian yleisimpiä käyttöaiheita. Tutkimusten mukaan endoskooppinen poisto onnistuu 83–88 % tapauksista. Koirilla yleisimmät vierasesineet ovat sukat, muovinpalat, kankaat, luut ja lelut. Kissoilla tyypillisimpiä ovat neulat, langat, kengännauhat ja kumilenkit. Endoskooppinen poisto on huomattavasti vähemmän invasiivinen kuin leikkaus: komplikaatioriski on merkittävästi pienempi, toipuminen nopeampaa, ja lemmikki pääsee usein kotiin samana päivänä. Vierasesineen nieltämisen jälkeen nopea hoitoon hakeutuminen on tärkeää — yli 24 tunnin oksentelu heikentää ennustetta merkittävästi.',
    sv: 'Avlägsnande av främmande föremål är en av de vanligaste indikationerna för gastroskopi. Studier visar att endoskopisk avlägsnande lyckas i 83–88 % av fallen. Hos hundar är de vanligaste främmande föremålen strumpor, plastbitar, tyg, ben och leksaker. Hos katter är nålar, trådar, skosnören och gummiband vanligast. Endoskopisk avlägsnande är betydligt mindre invasivt än kirurgi: komplikationsrisken är markant lägre, återhämtningen snabbare, och husdjuret kan ofta gå hem samma dag. Efter att ett främmande föremål svalts är det viktigt att snabbt söka vård — kräkningar i mer än 24 timmar försämrar prognosen avsevärt.',
    en: 'Foreign body removal is one of the most common indications for gastroscopy. Studies show that endoscopic removal succeeds in 83–88% of cases. In dogs, the most common foreign bodies are socks, plastic fragments, cloth, bones, and toys. In cats, needles, threads, shoelaces, and rubber bands are most typical. Endoscopic removal is significantly less invasive than surgery: the complication risk is markedly lower, recovery is faster, and the pet can often go home the same day. After swallowing a foreign body, seeking prompt veterinary care is important — vomiting for more than 24 hours significantly worsens the prognosis.'
  },
  'article.gastroscopy.diagnosis.title': {
    fi: 'Kroonisten vatsaoireiden selvittäminen',
    sv: 'Utredning av kroniska magsymtom',
    en: 'Investigating Chronic Gastrointestinal Symptoms'
  },
  'article.gastroscopy.diagnosis.text': {
    fi: 'Gastroskopia on välttämätön työkalu kroonisen oksentelun, ripulin, laihtumisen ja ruokahaluttomuuden syyn selvittämisessä. Tähystyksen aikana otetaan koepaloja limakalvosta. Koepalat otetaan aina, vaikka limakalvo näyttäisi normaalilta — monissa merkittävissä sairauksissa limakalvo voi näyttää silmämääräisesti terveeltä. Gastroskopia paljastaa myös mahalaukun kasvaimet, polyypit, haavaumat ja tulehdusmuutokset.',
    sv: 'Gastroskopi är ett oumbärligt verktyg för att utreda orsaken till kroniska kräkningar, diarré, viktminskning och aptitlöshet. Under undersökningen tas vävnadsprover (biopsier) från slemhinnan. Biopsier tas alltid, även om slemhinnan ser normal ut — vid många betydande sjukdomar kan slemhinnan se visuellt frisk ut. Gastroskopi avslöjar också tumörer i magsäcken, polyper, sår och inflammatoriska förändringar.',
    en: 'Gastroscopy is an essential tool for investigating the cause of chronic vomiting, diarrhea, weight loss, and loss of appetite. During the examination, tissue biopsies are taken from the mucosa. Biopsies are always taken even when the mucosa appears normal — in many significant diseases, the mucosa can look visually healthy. Gastroscopy also reveals stomach tumors, polyps, ulcers, and inflammatory changes.'
  },
  'article.gastroscopy.procedure.title': {
    fi: 'Toimenpide',
    sv: 'Proceduren',
    en: 'The Procedure'
  },
  'article.gastroscopy.procedure.text': {
    fi: 'Gastroskopia tehdään yleisanestesiassa. Lemmikki paastoaa 12–18 tuntia ennen toimenpidettä. Taipuisa endoskooppi viedään suun kautta ruokatorveen ja edelleen mahalaukkuun ja pohjukaissuoleen. Kamera välittää teräväpiirtokuvaa monitorille reaaliajassa. Endoskoopin työkanavan kautta voidaan käyttää biopsiapihtejä koepalojen ottoon, tarttumapihtejä vierasesineiden poistoon sekä huuhtelukatetria. Diagnostinen gastroskopia kestää tyypillisesti 15–30 minuuttia, vierasesineen poisto keskimäärin noin tunnin.',
    sv: 'Gastroskopi utförs under generell anestesi. Husdjuret fastar 12–18 timmar före ingreppet. Ett flexibelt endoskop förs genom munnen till matstrupen och vidare till magsäcken och tolvfingertarmen. Kameran överför högupplöst bild till en monitor i realtid. Genom endoskopets arbetskanal kan man använda biopsitänger för provtagning, greptänger för avlägsnande av främmande föremål samt spolkateter. Diagnostisk gastroskopi tar typiskt 15–30 minuter, avlägsnande av främmande föremål i genomsnitt cirka en timme.',
    en: 'Gastroscopy is performed under general anesthesia. The pet fasts for 12–18 hours before the procedure. A flexible endoscope is passed through the mouth into the esophagus and onward to the stomach and duodenum. The camera transmits high-definition images to a monitor in real time. Through the endoscope\'s working channel, biopsy forceps can be used for tissue sampling, grasping forceps for foreign body removal, and flushing catheters. Diagnostic gastroscopy typically takes 15–30 minutes, foreign body removal approximately one hour on average.'
  },
  'article.gastroscopy.advantages.title': {
    fi: 'Edut verrattuna leikkaukseen',
    sv: 'Fördelar jämfört med kirurgi',
    en: 'Advantages Over Surgery'
  },
  'article.gastroscopy.advantages.text': {
    fi: 'Gastroskopia on minimaalisesti invasiivinen — ei viiltoa, ei tikkejä mahalaukkuun tai suoleen. Lemmikki toipuu nopeammin, kipua on vähemmän ja infektioriski on pienempi. Useimmat potilaat pääsevät kotiin samana päivänä ja voivat syödä jo muutaman tunnin kuluttua. Komplikaatioriski on erittäin matala: mahalaukun perforaatioriski on vain 0,1 % koirilla ja 1,6 % kissoilla. Gastroskopia on sekä diagnostinen että hoidollinen — samassa toimenpiteessä voidaan tutkia, ottaa koepalaoja ja poistaa vierasesine.',
    sv: 'Gastroskopi är minimalt invasivt — inget snitt, inga suturer i magsäck eller tarm. Husdjuret återhämtar sig snabbare, smärtan är mindre och infektionsrisken lägre. De flesta patienter kan gå hem samma dag och kan äta redan efter några timmar. Komplikationsrisken är mycket låg: risken för magperforation är bara 0,1 % hos hundar och 1,6 % hos katter. Gastroskopi är både diagnostiskt och terapeutiskt — i samma ingrepp kan man undersöka, ta vävnadsprover och avlägsna främmande föremål.',
    en: 'Gastroscopy is minimally invasive — no incision, no sutures to the stomach or intestine. The pet recovers faster, there is less pain, and the infection risk is lower. Most patients go home the same day and can eat within a few hours. The complication risk is very low: the perforation rate is only 0.1% in dogs and 1.6% in cats. Gastroscopy is both diagnostic and therapeutic — in the same procedure, the doctor can examine, take biopsies, and remove foreign bodies.'
  },
  'article.gastroscopy.contact.title': {
    fi: 'Milloin hakeutua tutkimukseen?',
    sv: 'När ska man söka undersökning?',
    en: 'When to Seek Examination?'
  },
  'article.gastroscopy.contact.text': {
    fi: 'Ota yhteyttä, jos lemmikkisi oksentelee toistuvasti, on laihtunut selittämättömästi, välttelee ruokaa, ulosteessa on verta tai limaa, tai epäilet vierasesineen nielemistä. Eläinklinikka Saarella suoritamme gastroskopiatutkimukset ja vierasesineiden endoskooppiset poistot — varaa aika tutkimukseen.',
    sv: 'Kontakta oss om ditt husdjur kräks upprepade gånger, har gått ner i vikt utan förklaring, undviker mat, har blod eller slem i avföringen, eller om du misstänker att det har svalt ett främmande föremål. På Djurkliniken Saari utför vi gastroskopiundersökningar och endoskopiska avlägsnanden av främmande föremål — boka tid för undersökning.',
    en: 'Contact us if your pet vomits repeatedly, has lost weight unexpectedly, avoids food, has blood or mucus in the stool, or if you suspect it has swallowed a foreign object. At Eläinklinikka Saari, we perform gastroscopy examinations and endoscopic foreign body removals — book an appointment for examination.'
  },

  // Article 20: Tooth Resorption
  'article.resorption.tag': {
    fi: 'Hammashoito',
    sv: 'Tandvård',
    en: 'Dental'
  },
  'article.resorption.title': {
    fi: 'Hammasresorptio — piilevä ja kivulias hammassairaus',
    sv: 'Tandresorption — en dold och smärtsam tandsjukdom',
    en: 'Tooth Resorption — a Hidden and Painful Dental Disease'
  },
  'article.resorption.intro': {
    fi: 'Hammasresorptio on sairaus, jossa erikoistuneet solut (odontolastit) tuhoavat hampaan kovakudosta — kiillettä, dentiiniä ja hammassementtiä. Sairaus koskettaa sekä kissoja että koiria ja on paljon yleisempi kuin moni omistaja uskoo. Kissoilla esiintyvyys on 20–67 %, ja yli 5-vuotiailla jopa 75 %. Suomalaisessa 8 115 kissan tutkimuksessa rotukatit olivat selvästi alttiimpia (70 %) kuin sekarotuiset (38 %). Koirilla esiintyvyys on vastaavasti merkittävä: täyden suun röntgenkuvauksessa jopa 54 % koirista kärsi hammasresorptiosta, ja riski kasvaa erityisesti 9–11 vuoden iässä. Molemmilla lajeilla yleisimmin vaurioituvat hampaat ovat välihampaat (premolaarit). Sairaus on erityisen salakavala, koska sekä kissat että koirat peittävät suukipua — moni lemmikki syö ja käyttäytyy "normaalisti" vaikka kärsii merkittävästä kroonisesta kivusta.',
    sv: 'Tandresorption är en sjukdom där specialiserade celler (odontoklaster) bryter ner tandens hårda vävnader — emalj, dentin och tandcement. Sjukdomen drabbar både katter och hundar och är mycket vanligare än många ägare tror. Hos katter är prevalensen 20–67 %, och bland katter över 5 år upp till 75 %. I en finsk studie med 8 115 katter var raskatter klart mer mottagliga (70 %) än blandraser (38 %). Hos hundar är prevalensen likaså betydande: vid fullständig tandröntgen hade upp till 54 % av hundarna tandresorption, och risken ökar särskilt vid 9–11 års ålder. Hos båda arterna är premolarerna (kindtänderna) de mest drabbade tänderna. Sjukdomen är särskilt lömsk eftersom både katter och hundar döljer munsmärta — många husdjur äter och beter sig "normalt" trots betydande kronisk smärta.',
    en: 'Tooth resorption is a disease in which specialized cells (odontoclasts) destroy the hard tissues of the tooth — enamel, dentin, and cementum. The disease affects both cats and dogs and is far more common than many owners realize. In cats, the prevalence is 20–67%, rising to as high as 75% in cats over 5 years old. In a Finnish study of 8,115 cats, purebred cats were clearly more susceptible (70%) than mixed-breed cats (38%). In dogs, the prevalence is similarly significant: full-mouth radiographs revealed tooth resorption in up to 54% of dogs, with the risk increasing particularly at 9–11 years of age. In both species, the premolars are the most commonly affected teeth. The disease is particularly insidious because both cats and dogs hide oral pain — many pets eat and behave "normally" despite significant chronic pain.'
  },
  'article.resorption.types.title': {
    fi: 'Tyypit — miksi röntgen ratkaisee hoidon',
    sv: 'Typer — varför röntgen avgör behandlingen',
    en: 'Types — Why Radiographs Determine Treatment'
  },
  'article.resorption.types.text': {
    fi: 'Hammasresorptio jaetaan kolmeen tyyppiin, ja erottelu vaatii aina hammasröntgenkuvan. Tyypissä 1 hammas tuhoutuu paikallisesti ja tulehduskudos korvaa menetetyn hampaan — röntgenkuvassa näkyy tummia alueita, mutta hampaan juuret ja parodontaaliligamentti ovat edelleen tunnistettavissa. Tyypissä 2 hampaan juuri korvautuu luulla ja sulautuu leukaluuhun (ankyloosi) — röntgenkuvassa juuret näkyvät "haamuina" tai katoavat kokonaan ympäröivään luuhun. Tyypissä 3 samassa hampaassa esiintyy molempia. Tyyppi 2 on yleisempi, ja syytä pidetään tuntemattomana. Tyyppi 1 liittyy usein paikalliseen tulehdukseen.',
    sv: 'Tandresorption delas in i tre typer, och skillnaden kräver alltid tandröntgen. Vid typ 1 förstörs tanden lokalt och inflammatorisk granulationsvävnad ersätter den förlorade tanden — på röntgen syns mörka områden, men tandens rötter och parodontalligament är fortfarande identifierbara. Vid typ 2 ersätts tandroten med ben och smälter samman med käkbenet (ankylos) — på röntgen syns rötterna som "spöken" eller försvinner helt in i omgivande ben. Vid typ 3 förekommer båda typerna i samma tand. Typ 2 är vanligare och orsaken anses okänd. Typ 1 är ofta kopplad till lokal inflammation.',
    en: 'Tooth resorption is divided into three types, and distinguishing between them always requires dental radiographs. In Type 1, the tooth is destroyed locally and inflammatory granulation tissue replaces the lost tooth — radiographs show dark areas, but the roots and periodontal ligament are still identifiable. In Type 2, the root is replaced by bone and fuses with the jawbone (ankylosis) — on radiographs, the roots appear as "ghosts" or disappear entirely into the surrounding bone. Type 3 shows features of both in the same tooth. Type 2 is more common and its cause is considered unknown. Type 1 is often associated with local inflammation.'
  },
  'article.resorption.symptoms.title': {
    fi: 'Oireet — piilevä kipu',
    sv: 'Symtom — dold smärta',
    en: 'Symptoms — Hidden Pain'
  },
  'article.resorption.symptoms.text': {
    fi: 'Hammasresorptio on usein "hiljainen sairaus" — eläimet ovat evoluution myötä oppineet peittämään suukipua, koska luonnossa kivun näyttäminen tekee eläimestä saaliin. Omistaja voi huomata hienovaraisia merkkejä: ruoan putoilu suusta, pään kallistaminen syödessä, pureskelu vain toisella puolella, pureskelematta nieleminen, lisääntynyt kuolaaminen, leuan vapina tai naksahtelu (lihaskouristus kun vaurio koskettaa), kovien lelujen tai luiden välttely, ärtyisyys, vetäytyminen tai huonontunut turkki. Moni lemmikki jatkaa syömistä kivusta huolimatta. Kliinisessä tutkimuksessa voidaan nähdä vaaleanpunaisia pisteitä ikenessä (tulehduskudos kasvaa hampaan vaurioon), puuttuvia hampaita tai paikallista ientulehdusta yksittäisen hampaan ympärillä.',
    sv: 'Tandresorption är ofta en "tyst sjukdom" — djur har genom evolutionen lärt sig att dölja munsmärta, eftersom det i naturen gör djuret till ett byte. Ägaren kan märka subtila tecken: mat som faller ur munnen, huvudlutning vid ätande, tuggande bara på ena sidan, sväljning utan att tugga, ökad dregling, käkskakningar eller klickande (muskelkramper när lesionen berörs), undvikande av hårda leksaker eller ben, irritabilitet, tillbakadragenhet eller försämrad päls. Många husdjur fortsätter att äta trots smärta. Vid klinisk undersökning kan man se rosa fläckar i tandköttet (inflammatorisk vävnad som växer in i tandskadan), saknade tänder eller lokal tandköttsinflammation runt enskilda tänder.',
    en: 'Tooth resorption is often a "silent disease" — animals have evolved to hide oral pain, because in nature showing pain makes an animal prey. Owners may notice subtle signs: dropping food from the mouth, tilting the head while eating, chewing on only one side, swallowing without chewing, increased drooling, jaw trembling or chattering (muscle spasms when the lesion is touched), avoiding hard toys or bones, irritability, withdrawal, or a deteriorating coat. Many pets continue eating despite pain. During clinical examination, pink spots on the gums may be seen (inflammatory tissue growing into the tooth defect), missing teeth, or localized gingivitis around individual teeth.'
  },
  'article.resorption.diagnosis.title': {
    fi: 'Diagnoosi — hammasröntgen löytää 2,4-kertaisesti',
    sv: 'Diagnos — tandröntgen hittar 2,4 gånger mer',
    en: 'Diagnosis — Dental Radiographs Find 2.4 Times More'
  },
  'article.resorption.diagnosis.text': {
    fi: 'Hammasröntgen on ainoa tapa todeta hammasresorptio luotettavasti. Tutkimusten mukaan röntgen löytää 2,4 kertaa enemmän vaurioituneita hampaita kuin pelkkä kliininen tutkimus. Noin 60 % hampaan rakenteesta on ikenen alla näkymättömissä. Röntgenkuva paljastaa myös vaurion tyypin (1, 2 vai 3), mikä suoraan määrittää hoidon. Suosittelemme täyden suun hammasröntgenkuvausta yleisanestesiassa kaikille potilaille — erityisesti iäkkäämmille eläimille. "Puuttuva hammas" suun tarkastuksessa ei aina tarkoita menetystä — hammas on voinut resorboitua ikenen alle.',
    sv: 'Tandröntgen är det enda sättet att tillförlitligt diagnostisera tandresorption. Studier visar att röntgen hittar 2,4 gånger fler skadade tänder än enbart klinisk undersökning. Cirka 60 % av tandens struktur ligger under tandköttet och är osynlig. Röntgenbilden avslöjar också skadans typ (1, 2 eller 3), vilket direkt bestämmer behandlingen. Vi rekommenderar fullständig tandröntgen under generell anestesi för alla patienter — särskilt äldre djur. En "saknad tand" vid munundersökning betyder inte alltid att den tappats — tanden kan ha resorberats under tandköttet.',
    en: 'Dental radiographs are the only way to reliably diagnose tooth resorption. Studies show that radiographs detect 2.4 times more affected teeth than clinical examination alone. About 60% of tooth structure lies below the gum line and is invisible. Radiographs also reveal the lesion type (1, 2, or 3), which directly determines treatment. We recommend full-mouth dental radiographs under general anesthesia for all patients — especially older animals. A "missing tooth" during oral examination does not always mean it was lost — the tooth may have resorbed beneath the gum.'
  },
  'article.resorption.treatment.title': {
    fi: 'Hoito — tyyppi määrittää menetelmän',
    sv: 'Behandling — typen avgör metoden',
    en: 'Treatment — Type Determines the Method'
  },
  'article.resorption.treatment.text': {
    fi: 'Tyypin 1 hoito on kirurginen poisto — sekä kruunu että kaikki juuret poistetaan kokonaan, koska parodontaaliligamentti on ehjä ja juurissa voi olla tulehduskudosta. Tyypin 2 hoito on kruunun amputaatio — koska juuret ovat korvautumassa luulla, niitä ei tarvitse eikä tule yrittää poistaa (ankyloituneen juuren poistoyritys voi johtaa leukaluun murtumaan). Tyypin 3 hoito on sama kuin tyypin 1 — täydellinen poisto. Paikkausta tai fluorihoitoa ei suositella — tutkimuksissa 72 % paikatuista hampaista eteni. Hammasresorptio ei koskaan parane itsestään. Eläinklinikka Saarella suoritamme hammasröntgenkuvaukset ja hampaiden kirurgiset poistot — varaa aika hammastutkimukseen.',
    sv: 'Behandlingen för typ 1 är kirurgisk extraktion — både kronan och alla rötter avlägsnas helt, eftersom parodontalligamentet är intakt och rötterna kan innehålla inflammatorisk vävnad. Behandlingen för typ 2 är kronamputering — eftersom rötterna håller på att ersättas av ben behöver de inte och ska inte försöka avlägsnas (försök att extrahera en ankyloserad rot kan leda till käkfraktur). Typ 3 behandlas som typ 1 — fullständig extraktion. Lagning eller fluorbehandling rekommenderas inte — i studier fortskred 72 % av lagade tänder. Tandresorption läker aldrig av sig själv. På Djurkliniken Saari utför vi tandröntgen och kirurgiska tandextraktioner — boka tid för en tandundersökning.',
    en: 'Type 1 treatment is surgical extraction — both the crown and all roots are completely removed, because the periodontal ligament is intact and the roots may contain inflammatory tissue. Type 2 treatment is crown amputation — since the roots are being replaced by bone, they do not need to be and should not be attempted to be removed (attempting to extract an ankylosed root can lead to jaw fracture). Type 3 is treated the same as Type 1 — complete extraction. Fillings or fluoride treatment are not recommended — in studies, 72% of filled teeth progressed. Tooth resorption never heals on its own. At Eläinklinikka Saari, we perform dental radiographs and surgical tooth extractions — book an appointment for a dental examination.'
  },
  'article.resorption.after.title': {
    fi: 'Hoidon jälkeen — dramaattinen muutos',
    sv: 'Efter behandling — en dramatisk förändring',
    en: 'After Treatment — a Dramatic Change'
  },
  'article.resorption.after.text': {
    fi: 'Omistajat raportoivat usein hämmästyttävästä muutoksesta 24–48 tunnin kuluessa poistosta: lemmikki on energisempi, syö paremmin, on sosiaalisempi ja "kuin eri eläin". Tämä muutos itsessään todistaa, kuinka paljon kipua eläin kätki. Ennaltaehkäisyä ei tunneta, koska sairauden syy on edelleen tuntematon — paras suoja on säännöllinen hammastutkimus yleisanestesiassa, jotta vauriot löydetään varhain.',
    sv: 'Ägare rapporterar ofta en häpnadsväckande förändring inom 24–48 timmar efter extraktion: husdjuret är mer energiskt, äter bättre, är mer socialt och "som ett annat djur". Denna förändring i sig bevisar hur mycket smärta djuret dolde. Det finns ingen känd förebyggande åtgärd eftersom sjukdomens orsak fortfarande är okänd — det bästa skyddet är regelbunden tandundersökning under generell anestesi så att skador upptäcks tidigt.',
    en: 'Owners often report an astonishing change within 24–48 hours after extraction: the pet is more energetic, eats better, is more social, and is "like a different animal." This transformation itself proves how much pain the animal was hiding. There is no known prevention because the cause of the disease remains unknown — the best protection is regular dental examination under general anesthesia so that lesions are detected early.'
  },

  // --- Article 21: Vaccination ---
  'article.vaccination.tag': {
    fi: 'Terveys',
    sv: 'Hälsa',
    en: 'Health'
  },
  'article.vaccination.title': {
    fi: 'Rokotukset Suomessa — koirien ja kissojen rokotusohjelma',
    sv: 'Vaccinationer i Finland — vaccinationsprogram för hundar och katter',
    en: 'Vaccinations in Finland — Vaccination Program for Dogs and Cats'
  },
  'article.vaccination.intro': {
    fi: 'Rokotukset ovat tehokkain tapa suojata lemmikkiä tartuntataudeilta. Suomessa Ruokavirasto antaa rokotussuosituksia, mutta ne eivät ole juridisesti sitovia — eläinlääkäri tekee aina yksilöllisen arvion. Suomen rokotuskäytäntö seuraa WSAVA:n kansainvälisiä ohjeita maan matalan tautipaineen huomioiden.',
    sv: 'Vaccinationer är det mest effektiva sättet att skydda husdjur mot smittsamma sjukdomar. I Finland ger Livsmedelsverket (Ruokavirasto) vaccinationsrekommendationer, men de är inte juridiskt bindande — veterinären gör alltid en individuell bedömning. Finlands vaccinationspraxis följer WSAVA:s internationella riktlinjer med hänsyn till landets låga sjukdomstryck.',
    en: 'Vaccinations are the most effective way to protect pets from infectious diseases. In Finland, the Finnish Food Authority (Ruokavirasto) provides vaccination recommendations, but they are not legally binding — the veterinarian always makes an individual assessment. Finnish vaccination practice follows WSAVA international guidelines, taking into account the country\'s low disease pressure.'
  },
  'article.vaccination.dogs.title': {
    fi: 'Koirien perusrokotteet',
    sv: 'Grundvacciner för hundar',
    en: 'Core Vaccines for Dogs'
  },
  'article.vaccination.dogs.text': {
    fi: 'Kaikille koirille suositellaan perusrokotuksia kolmea tautia vastaan: <strong>penikkatautia</strong> (CDV), <strong>tarttuva maksatulehdusta</strong> (CAV) ja <strong>parvovirusta</strong> (CPV). Nämä annetaan yleensä kolmoisrokotteena. Lisäksi <strong>rabies</strong> suositellaan kaikille koirille ja on lakisääteinen metsästys- ja virkakoirille. Ei-ydinrokotteet kuten kennelyskä (parainfluenssa + Bordetella) suositellaan koirille, jotka tapaavat säännöllisesti muita koiria. Leptospiroosirokotus suositellaan vain endeemisille alueille matkustaville — Suomi ei ole endeeminen alue.',
    sv: 'Alla hundar rekommenderas grundvaccinationer mot tre sjukdomar: <strong>valpsjuka</strong> (CDV), <strong>smittsam leverinflammation</strong> (CAV) och <strong>parvovirus</strong> (CPV). Dessa ges vanligtvis som ett trippelvaccin. Dessutom rekommenderas <strong>rabies</strong> för alla hundar och är lagstadgat för jakthundar och tjänstehundar. Icke-kärnvacciner som kennelhosta (parainfluensa + Bordetella) rekommenderas för hundar som regelbundet träffar andra hundar. Leptospirosvaccination rekommenderas bara för hundar som reser till endemiska områden — Finland är inte ett endemiskt område.',
    en: 'All dogs are recommended core vaccinations against three diseases: <strong>canine distemper</strong> (CDV), <strong>infectious hepatitis</strong> (CAV), and <strong>parvovirus</strong> (CPV). These are usually given as a triple vaccine. Additionally, <strong>rabies</strong> is recommended for all dogs and is legally required for hunting and service dogs. Non-core vaccines such as kennel cough (parainfluenza + Bordetella) are recommended for dogs that regularly meet other dogs. Leptospirosis vaccination is recommended only for dogs travelling to endemic areas — Finland is not an endemic area.'
  },
  'article.vaccination.cats.title': {
    fi: 'Kissojen perusrokotteet',
    sv: 'Grundvacciner för katter',
    en: 'Core Vaccines for Cats'
  },
  'article.vaccination.cats.text': {
    fi: 'Kaikille kissoille suositellaan kolmoisrokotusta (RCP): <strong>kissaruttoa</strong> (FPV), <strong>kalikivirusta</strong> (FCV) ja <strong>herpesvirusta</strong> (FHV-1) vastaan. Hengitystievirusrokotus ei estä tartuntaa kokonaan, mutta lieventää oireita merkittävästi. Rabies suositellaan ulkoilukissoille ja on pakollinen matkustaville kissoille. <strong>Kissaleukemia</strong> (FeLV) ei kuulu Suomen rutiiinirokotuksiin, sillä FeLV:n esiintyvyys Suomessa on lähes nolla — se suositellaan vain FeLV-positiivisen kissan kanssa asuville.',
    sv: 'Alla katter rekommenderas trippelvaccination (RCP): mot <strong>kattpest</strong> (FPV), <strong>calicivirus</strong> (FCV) och <strong>herpesvirus</strong> (FHV-1). Vaccin mot luftvägsinfektioner förhindrar inte smitta helt, men mildrar symtomen avsevärt. Rabies rekommenderas för utekatter och är obligatoriskt för katter som reser. <strong>Kattleukemi</strong> (FeLV) ingår inte i Finlands rutinvaccinationer, eftersom förekomsten av FeLV i Finland är nästan noll — det rekommenderas bara för katter som bor med en FeLV-positiv katt.',
    en: 'All cats are recommended the triple vaccination (RCP): against <strong>feline panleukopenia</strong> (FPV), <strong>calicivirus</strong> (FCV), and <strong>herpesvirus</strong> (FHV-1). Respiratory virus vaccination does not completely prevent infection, but significantly reduces symptoms. Rabies is recommended for outdoor cats and is mandatory for cats travelling abroad. <strong>Feline leukemia</strong> (FeLV) is not part of routine vaccination in Finland, as FeLV prevalence in Finland is nearly zero — it is recommended only for cats living with a FeLV-positive cat.'
  },
  'article.vaccination.schedule.title': {
    fi: 'Pentujen ja kissanpentujen rokotusohjelma',
    sv: 'Vaccinationsprogram för valpar och kattungar',
    en: 'Vaccination Schedule for Puppies and Kittens'
  },
  'article.vaccination.schedule.text': {
    fi: '<strong>Koiranpennut:</strong> Ensimmäinen rokotus 8 viikon iässä (kolmoisrokote), toinen 12 viikon iässä, rabies 12–16 viikon iässä. Tehosterokotus 6–16 kuukauden iässä. Aikuisilla koirilla perusrokotteet 3 vuoden välein.<br><br><strong>Kissanpennut:</strong> Ensimmäinen RCP-rokotus 8–9 viikon iässä, toinen 12 viikon iässä. Tehosterokotus 12–16 kuukauden iässä. Aikuisilla kissoilla kissarutto (FPV) 3 vuoden välein, hengitystievirukset (FCV + FHV-1) 1–3 vuoden välein riskin mukaan.',
    sv: '<strong>Valpar:</strong> Första vaccination vid 8 veckors ålder (trippelvaccin), andra vid 12 veckor, rabies vid 12–16 veckor. Boostervaccination vid 6–16 månaders ålder. Vuxna hundar: grundvacciner vart 3:e år.<br><br><strong>Kattungar:</strong> Första RCP-vaccination vid 8–9 veckors ålder, andra vid 12 veckor. Boostervaccination vid 12–16 månaders ålder. Vuxna katter: kattpest (FPV) vart 3:e år, luftvägsvirus (FCV + FHV-1) vart 1–3 år beroende på risk.',
    en: '<strong>Puppies:</strong> First vaccination at 8 weeks (triple vaccine), second at 12 weeks, rabies at 12–16 weeks. Booster at 6–16 months of age. Adult dogs: core vaccines every 3 years.<br><br><strong>Kittens:</strong> First RCP vaccination at 8–9 weeks, second at 12 weeks. Booster at 12–16 months of age. Adult cats: panleukopenia (FPV) every 3 years, respiratory viruses (FCV + FHV-1) every 1–3 years depending on risk.'
  },
  'article.vaccination.rabies.title': {
    fi: 'Rabies Suomessa',
    sv: 'Rabies i Finland',
    en: 'Rabies in Finland'
  },
  'article.vaccination.rabies.text': {
    fi: 'Suomi on ollut virallisesti rabiesvapaa vuodesta 1991. Rabiesrokotus on lakisääteinen metsästyskoirille, viranomaisten palveluskoirille ja kaikille ulkomaille matkustaville lemmikeille. Tavalliselle kotikoiralle rokotus ei ole juridisesti pakollinen, mutta Ruokavirasto suosittelee sitä vahvasti kaikille koirille ja kissoille. Kennelliitto vaatii rabiesrokotuksen kaikilta näyttelyihin osallistuvilta koirilta. Ensimmäinen annos noin 4 kuukauden iässä, tehosterokotus vuoden iässä, sen jälkeen 3 vuoden välein.',
    sv: 'Finland har varit officiellt rabiesfritt sedan 1991. Rabiesvaccination är lagstadgad för jakthundar, myndigheters tjänstehundar och alla husdjur som reser utomlands. För vanliga sällskapshundar är vaccinet inte juridiskt obligatoriskt, men Livsmedelsverket rekommenderar det starkt för alla hundar och katter. Kennelklubben kräver rabiesvaccination för alla hundar som deltar i utställningar. Första dosen vid cirka 4 månaders ålder, booster vid ett års ålder, därefter vart 3:e år.',
    en: 'Finland has been officially rabies-free since 1991. Rabies vaccination is legally required for hunting dogs, government service dogs, and all pets travelling abroad. For ordinary pet dogs, vaccination is not legally mandatory, but the Finnish Food Authority strongly recommends it for all dogs and cats. The Finnish Kennel Club requires rabies vaccination for all dogs attending shows. First dose at approximately 4 months of age, booster at one year, then every 3 years.'
  },
  'article.vaccination.travel.title': {
    fi: 'Matkustaminen lemmikin kanssa',
    sv: 'Resa med husdjur',
    en: 'Travelling with Your Pet'
  },
  'article.vaccination.travel.text': {
    fi: 'EU:n alueella matkustamiseen tarvitaan <strong>mikrosiru</strong> (ennen rabiesrokotusta), voimassa oleva <strong>rabiesrokotus</strong> (vähintään 21 päivää ennen matkaa) ja <strong>EU-lemmikkipassi</strong>. Koirilta vaaditaan lisäksi <strong>ekinokokkoosilääkitys</strong> 1–5 päivää ennen Suomeen paluuta. Riskimaista (esim. Venäjä, Turkki) saapuvilta vaaditaan rabiesvasta-ainepitoisuustesti EU-hyväksytyssä laboratoriossa. Varaa aika rokotuksille ja matkustusasiakirjoille — hoidamme EU-lemmikkipassit klinikallamme.',
    sv: 'För resor inom EU krävs <strong>mikrochip</strong> (före rabiesvaccination), giltig <strong>rabiesvaccination</strong> (minst 21 dagar före resan) och <strong>EU-sällskapsdjurspass</strong>. För hundar krävs dessutom <strong>ekinokockbehandling</strong> 1–5 dagar före återkomst till Finland. Från högriskländer (t.ex. Ryssland, Turkiet) krävs ett rabiesantikroppstest vid ett EU-godkänt laboratorium. Boka tid för vaccinationer och resedokument — vi utfärdar EU-sällskapsdjurspass på vår klinik.',
    en: 'For travel within the EU, you need a <strong>microchip</strong> (before rabies vaccination), a valid <strong>rabies vaccination</strong> (at least 21 days before travel), and an <strong>EU pet passport</strong>. Dogs additionally require <strong>echinococcus treatment</strong> 1–5 days before returning to Finland. Pets arriving from high-risk countries (e.g., Russia, Turkey) require a rabies antibody titer test at an EU-approved laboratory. Book an appointment for vaccinations and travel documents — we issue EU pet passports at our clinic.'
  },

};

// --- Service icons mapping ---
const serviceIcons = {
  acupuncture: '🪡',
  bloodtests: '🩸',
  dermatology: '🔬',
  pregnancy: '🤰',
  endoscopy: '📷',
  food: '🍖',
  wellness: '💪',
  healthcheck: '🩺',
  cardiology: '❤️',
  castration: '✂️',
  surgery: '🔪',
  laboratory: '🧪',
  official: '📋',
  orthopedics: '🦴',
  xray: '☢️',
  euthanasia: '🕊️',
  sterilization: '🏥',
  dental: '🦷',
  ultrasound: '📡',
  vaccinations: '💉',
  puppy: '🐕'
};

// --- Language System ---
let currentLang = 'fi';

function setLanguage(lang) {
  currentLang = lang;

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][lang]) {
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translations[key][lang];
      } else {
        el.textContent = translations[key][lang];
      }
    }
  });

  // Update language toggle buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update vet modal if open
  const modal = document.getElementById('vet-modal');
  if (modal && modal.classList.contains('active')) {
    const img = document.getElementById('vet-modal-img');
    if (img && img.src) {
      const vetId = Object.keys(vetProfiles).find(id => img.src.includes(vetProfiles[id].image));
      if (vetId) {
        const profile = vetProfiles[vetId];
        document.getElementById('vet-modal-bio').textContent = profile.bio[lang] || profile.bio.fi;
        document.getElementById('vet-modal-experience').textContent = profile.experience[lang] || profile.experience.fi;
        document.getElementById('vet-modal-training').textContent = profile.training[lang] || profile.training.fi;
        document.getElementById('vet-modal-focus').textContent = profile.focus[lang] || profile.focus.fi;
      }
    }
  }

  // Update nurse modal if open
  const nurseModal = document.getElementById('nurse-modal');
  if (nurseModal && nurseModal.classList.contains('active')) {
    const nurseImg = document.getElementById('nurse-modal-img');
    if (nurseImg && nurseImg.src) {
      const nurseId = Object.keys(nurseProfiles).find(id => nurseImg.src.includes(nurseProfiles[id].image));
      if (nurseId) {
        const profile = nurseProfiles[nurseId];
        const roleData = translations[profile.role];
        document.getElementById('nurse-modal-role').textContent = roleData ? (roleData[lang] || roleData.fi) : '';
        document.getElementById('nurse-modal-bio').textContent = profile.bio[lang] || profile.bio.fi;
        document.getElementById('nurse-modal-background').textContent = profile.background[lang] || profile.background.fi;
        document.getElementById('nurse-modal-interests').textContent = profile.interests[lang] || profile.interests.fi;
      }
    }
  }
}

// --- Mobile Menu ---
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close menu when clicking a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
}

// --- Header Scroll Effect ---
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });
}

// --- Smooth Scroll ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// --- Price Accordion ---
function initPriceAccordion() {
  document.querySelectorAll('.price-category-header').forEach(header => {
    header.addEventListener('click', () => {
      const category = header.parentElement;
      const wasOpen = category.classList.contains('open');

      // Close all
      document.querySelectorAll('.price-category').forEach(c => c.classList.remove('open'));

      // Toggle current
      if (!wasOpen) {
        category.classList.add('open');
      }
    });
  });
}

// --- Active Nav Highlight ---
function initActiveNav() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

// --- Scroll Animations ---
function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.service-card, .team-card, .testimonial-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => observer.observe(el));
}

// --- Articles Toggle ---
function showMainPage() {
  const articlesSection = document.getElementById('articles');
  const privacySection = document.getElementById('privacy');
  const mainSections = document.querySelectorAll('body > .notice-banner, body > section:not(#articles):not(#privacy), body > .hero');
  articlesSection.style.display = 'none';
  privacySection.style.display = 'none';
  mainSections.forEach(el => el.style.display = '');
}

function toggleArticles() {
  const articlesSection = document.getElementById('articles');
  const privacySection = document.getElementById('privacy');
  const mainSections = document.querySelectorAll('body > .notice-banner, body > section:not(#articles):not(#privacy), body > .hero');
  const isShowing = articlesSection.style.display !== 'none';

  if (isShowing) {
    articlesSection.style.display = 'none';
    mainSections.forEach(el => el.style.display = '');
    history.pushState({ page: 'main' }, '', window.location.pathname);
  } else {
    mainSections.forEach(el => el.style.display = 'none');
    privacySection.style.display = 'none';
    articlesSection.style.display = '';
    filterArticles('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLanguage(currentLang);
    history.pushState({ page: 'articles' }, '', window.location.pathname + '#articles');
  }
}

// --- Article Category Filters ---
function filterArticles(category) {
  const articles = document.querySelectorAll('#articles .article-card[data-category]');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === category));

  articles.forEach(article => {
    if (category === 'all' || article.dataset.category === category) {
      article.classList.remove('filter-hidden');
    } else {
      article.classList.add('filter-hidden');
    }
  });
}

function initArticleFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterArticles(btn.dataset.filter));
  });
}

function togglePrivacy() {
  const privacySection = document.getElementById('privacy');
  const articlesSection = document.getElementById('articles');
  const mainSections = document.querySelectorAll('body > .notice-banner, body > section:not(#articles):not(#privacy), body > .hero');
  const isShowing = privacySection.style.display !== 'none';

  if (isShowing) {
    privacySection.style.display = 'none';
    mainSections.forEach(el => el.style.display = '');
    history.pushState({ page: 'main' }, '', window.location.pathname);
  } else {
    mainSections.forEach(el => el.style.display = 'none');
    articlesSection.style.display = 'none';
    privacySection.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLanguage(currentLang);
    history.pushState({ page: 'privacy' }, '', window.location.pathname + '#privacy');
  }
}

// --- Vet Profiles ---
const vetProfiles = {
  leena: {
    name: 'Leena Sandström',
    image: 'images/leena.webp',
    bio: {
      fi: 'Leena on kokenut eläinlääkäri, joka on erikoistunut sydänsairauksiin ja sisätauteihin. Hän on Suomen Kennelklubin valtuutettu sydäntutkija ja suorittaa virallisia sydänultraäänitutkimuksia klinikallamme.',
      sv: 'Leena är en erfaren veterinär som specialiserat sig på hjärtsjukdomar och internmedicin. Hon är auktoriserad hjärtundersökare för Finska Kennelklubben och utför officiella hjärtultraljudsundersökningar på vår klinik.',
      en: 'Leena is an experienced veterinarian specializing in heart diseases and internal medicine. She is an authorized heart examiner for the Finnish Kennel Club and performs official cardiac ultrasound examinations at our clinic.'
    },
    experience: {
      fi: 'Valmistunut eläinlääkäriksi vuonna 1997. Pitkä kokemus pieneläinlääketieteestä.',
      sv: 'Utexaminerad som veterinär 1997. Lång erfarenhet inom smådjursmedicin.',
      en: 'Graduated as veterinarian in 1997. Extensive experience in small animal medicine.'
    },
    training: {
      fi: 'ESAVS-kardiologian sertifikaatti. Kennelklubin valtuutettu sydäntutkija.',
      sv: 'ESAVS kardiologicertifikat. Auktoriserad hjärtundersökare för Kennelklubben.',
      en: 'ESAVS Cardiology Certificate. Authorized heart examiner for the Finnish Kennel Club.'
    },
    focus: {
      fi: 'Sydänsairaudet, sisätaudit, sydänultraäänitutkimukset',
      sv: 'Hjärtsjukdomar, internmedicin, hjärtultraljudsundersökningar',
      en: 'Heart diseases, internal medicine, cardiac ultrasound examinations'
    }
  },
  pamela: {
    name: 'Pamela Kvarngård',
    image: 'images/pamela.webp',
    bio: {
      fi: 'Pamela on monipuolinen kirurgi, joka on erikoistunut ortopediaan, pehmytkudoskirurgiaan ja hammashoitoon. Hän on suorittanut laajat jatkokoulutukset sekä ortopedisessa kirurgiassa että hammashoidossa.',
      sv: 'Pamela är en mångsidig kirurg som specialiserat sig på ortopedi, mjukdelskirurgi och tandvård. Hon har genomgått omfattande vidareutbildning inom både ortopedisk kirurgi och tandvård.',
      en: 'Pamela is a versatile surgeon specializing in orthopedics, soft tissue surgery and dental care. She has completed extensive continuing education in both orthopedic surgery and dentistry.'
    },
    experience: {
      fi: 'Eläinlääkärinä vuodesta 2013. Klinikkamme johtava kirurgi.',
      sv: 'Veterinär sedan 2013. Vår kliniks ledande kirurg.',
      en: 'Veterinarian since 2013. Our clinic\'s lead surgeon.'
    },
    training: {
      fi: 'AOVET ja ESAVS ortopedisen kirurgian koulutus. Accesian hammashoidon koulutus.',
      sv: 'AOVET och ESAVS utbildning i ortopedisk kirurgi. Accesia tandvårdsutbildning.',
      en: 'AOVET and ESAVS orthopedic surgery training. Accesia dental care training.'
    },
    focus: {
      fi: 'Ortopedinen kirurgia, pehmytkudoskirurgia, hammashoito',
      sv: 'Ortopedisk kirurgi, mjukdelskirurgi, tandvård',
      en: 'Orthopedic surgery, soft tissue surgery, dental care'
    }
  },
  assaf: {
    name: 'Assaf Wydra',
    image: 'images/assaf.webp',
    bio: {
      fi: 'Assaf on klinikan perustajan poika ja intohimoinen eläinlääkäri, joka on erikoistunut hammashoitoon, tähystystutkimuksiin ja luonnonvaraisten eläinten hoitoon. Hän on myös koulutettu koirien ja hevosten akupunktiossa.',
      sv: 'Assaf är grundarens son och en passionerad veterinär som specialiserat sig på tandvård, endoskopi och vård av vilda djur. Han har också utbildning i akupunktur för hundar och hästar.',
      en: 'Assaf is the founder\'s son and a passionate veterinarian specializing in dental care, endoscopy and wildlife care. He is also trained in canine and equine acupuncture.'
    },
    experience: {
      fi: 'Eläinlääkärinä vuodesta 2011. Nordic Wildlife Care -yhteistyö.',
      sv: 'Veterinär sedan 2011. Nordic Wildlife Care -samarbete.',
      en: 'Veterinarian since 2011. Nordic Wildlife Care cooperation.'
    },
    training: {
      fi: 'Accesian hammashoidon koulutus. Tähystys- ja luonnonvaraisten eläinten koulutus. Akupunktiokoulutus.',
      sv: 'Accesia tandvårdsutbildning. Endoskopi- och viltdjursutbildning. Akupunkturutbildning.',
      en: 'Accesia dental training. Endoscopy and wildlife education. Acupuncture training.'
    },
    focus: {
      fi: 'Hammashoito, tähystystutkimukset, luonnonvaraisten eläinten hoito, akupunktio',
      sv: 'Tandvård, endoskopi, vård av vilda djur, akupunktur',
      en: 'Dental care, endoscopy, wildlife care, acupuncture'
    }
  },
  nina: {
    name: 'Nina Haglund',
    image: 'images/nina.webp',
    bio: {
      fi: 'Nina tuo ainutlaatuisen farmaseuttisen taustan eläinlääkärin työhönsä. Hän on erikoistunut kirurgiaan, hammashoitoon ja ihotauteihin, ja on suorittanut jatkokoulutukset sekä hammashoidossa että pehmytkudoskirurgiassa.',
      sv: 'Nina bidrar med en unik farmaceutisk bakgrund till sitt veterinärarbete. Hon har specialiserat sig på kirurgi, tandvård och dermatologi, och har genomgått vidareutbildning i både tandvård och mjukdelskirurgi.',
      en: 'Nina brings a unique pharmaceutical background to her veterinary work. She specializes in surgery, dental care and dermatology, and has completed continuing education in both dentistry and soft tissue surgery.'
    },
    experience: {
      fi: 'Eläinlääkäriksi 2016/2017, Saaren klinikalla vuodesta 2020. Aiempi farmaseutin tausta.',
      sv: 'Veterinär 2016/2017, på Saari kliniken sedan 2020. Tidigare bakgrund som farmaceut.',
      en: 'Veterinarian since 2016/2017, at Saari Clinic since 2020. Previous pharmacist background.'
    },
    training: {
      fi: 'Accesian hammashoidon koulutus. ESAVS pehmytkudoskirurgian koulutus.',
      sv: 'Accesia tandvårdsutbildning. ESAVS mjukdelskirurgiutbildning.',
      en: 'Accesia dental training. ESAVS soft tissue surgery training.'
    },
    focus: {
      fi: 'Kirurgia, hammashoito, ihotaudit',
      sv: 'Kirurgi, tandvård, dermatologi',
      en: 'Surgery, dental care, dermatology'
    }
  },
  merja: {
    name: 'Merja Autio',
    image: 'images/merja.webp',
    bio: {
      fi: 'Merja on tuore eläinlääkäri, joka valmistui Viron maaelämän yliopistosta kesällä 2025 ja liittyi tiimiimme huhtikuussa 2025. Hän on erityisen kiinnostunut pehmytkudoskirurgiasta ja eksoottisten eläinten hoidosta.',
      sv: 'Merja är en nyutexaminerad veterinär som tog examen från Estlands lantbruksuniversitet sommaren 2025 och anslöt sig till vårt team i april 2025. Hon är särskilt intresserad av mjukdelskirurgi och vård av exotiska djur.',
      en: 'Merja is a recent graduate who obtained her degree from the Estonian University of Life Sciences in summer 2025 and joined our team in April 2025. She is particularly interested in soft tissue surgery and exotic animal care.'
    },
    experience: {
      fi: 'Valmistunut kesällä 2025 Viron maaelämän yliopistosta. Saaren klinikalla huhtikuusta 2025.',
      sv: 'Utexaminerad sommaren 2025 från Estlands lantbruksuniversitet. På Saari kliniken sedan april 2025.',
      en: 'Graduated summer 2025 from Estonian University of Life Sciences. At Saari Clinic since April 2025.'
    },
    training: {
      fi: 'Eläinlääketieteen tutkinto, Viron maaelämän yliopisto.',
      sv: 'Veterinärmedicin examen, Estlands lantbruksuniversitet.',
      en: 'Veterinary Medicine degree, Estonian University of Life Sciences.'
    },
    focus: {
      fi: 'Pehmytkudoskirurgia, eksoottisten eläinten hoito',
      sv: 'Mjukdelskirurgi, vård av exotiska djur',
      en: 'Soft tissue surgery, exotic animal care'
    }
  }
};

function openVetProfile(vetId) {
  const profile = vetProfiles[vetId];
  if (!profile) return;

  document.getElementById('vet-modal-img').src = profile.image;
  document.getElementById('vet-modal-img').alt = profile.name;
  document.getElementById('vet-modal-name').textContent = profile.name;
  document.getElementById('vet-modal-bio').textContent = profile.bio[currentLang] || profile.bio.fi;
  document.getElementById('vet-modal-experience').textContent = profile.experience[currentLang] || profile.experience.fi;
  document.getElementById('vet-modal-training').textContent = profile.training[currentLang] || profile.training.fi;
  document.getElementById('vet-modal-focus').textContent = profile.focus[currentLang] || profile.focus.fi;

  document.getElementById('vet-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVetProfile() {
  document.getElementById('vet-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// --- Nurse Profiles ---
const nurseProfiles = {
  sanna: {
    name: 'Sanna Koskiluhta',
    image: 'images/sanna.webp',
    role: 'role.manager',
    bio: {
      fi: 'Sanna toimii klinikan managerina ja vastaa klinikan hallinnosta, tilauksista ja aikataulutuksesta. Hän pitää huolta siitä, että klinikka toimii sujuvasti ja tehokkaasti joka päivä.',
      sv: 'Sanna är klinikens föreståndare och ansvarar för administration, beställningar och schemaläggning. Hon ser till att kliniken fungerar smidigt och effektivt varje dag.',
      en: 'Sanna serves as the clinic manager, responsible for administration, orders and scheduling. She ensures the clinic runs smoothly and efficiently every day.'
    },
    background: {
      fi: 'Klinikkaeläinhoitaja. Pitkä kokemus klinikkatyöstä ja hallinnosta.',
      sv: 'Klinikdjurskötare. Lång erfarenhet av klinikarbete och administration.',
      en: 'Veterinary technician. Extensive experience in clinical work and administration.'
    },
    interests: {
      fi: 'Klinikan hallinto, tilaukset ja aikataulutus',
      sv: 'Klinikadministration, beställningar och schemaläggning',
      en: 'Clinic administration, orders and scheduling'
    }
  },
  jenni: {
    name: 'Jenni Ruotsala',
    image: 'images/jenni.webp',
    role: 'role.headtech',
    bio: {
      fi: 'Jenni on klinikan johtava klinikkaeläinhoitaja, jolla on erityisosaamista anestesiassa ja laboratoriotyössä. Hän on suorittanut anestesian erikoisammattitutkinnon (EAT).',
      sv: 'Jenni är klinikens ledande djurskötare med specialkompetens inom anestesi och laboratoriearbete. Hon har avlagt specialyrkesexamen (EAT) inom anestesi.',
      en: 'Jenni is the clinic\'s head veterinary technician with expertise in anesthesia and laboratory work. She holds a specialist qualification (EAT) in anesthesia.'
    },
    background: {
      fi: 'Johtava klinikkaeläinhoitaja. Anestesia EAT-tutkinto.',
      sv: 'Ledande klinikdjurskötare. Anestesi specialistkompetens (EAT).',
      en: 'Head veterinary technician. Anesthesia specialist qualification (EAT).'
    },
    interests: {
      fi: 'Anestesia ja laboratoriotyö',
      sv: 'Anestesi och laboratoriearbete',
      en: 'Anesthesia and laboratory work'
    }
  },
  meri: {
    name: 'Meri Vilén',
    image: 'images/meri.webp',
    role: 'role.tech',
    bio: {
      fi: 'Meri on klinikkaeläinhoitaja, jolla on erityinen kiinnostus kissojen hoitoon. Hänellä on myös hevostenhoitajan tutkinto, mikä tuo monipuolista osaamista eläinten käsittelyyn.',
      sv: 'Meri är klinikdjurskötare med särskilt intresse för kattvård. Hon har även utbildning som hästskötare, vilket ger mångsidig kompetens inom djurhantering.',
      en: 'Meri is a veterinary technician with a special interest in cat care. She also holds a horse caretaker qualification, bringing versatile animal handling skills.'
    },
    background: {
      fi: 'Klinikkaeläinhoitaja. Myös hevostenhoitajan tutkinto.',
      sv: 'Klinikdjurskötare. Även utbildad hästskötare.',
      en: 'Veterinary technician. Also qualified horse caretaker.'
    },
    interests: {
      fi: 'Kissojen hoito',
      sv: 'Kattvård',
      en: 'Cat care'
    }
  },
  susanna: {
    name: 'Susanna Seljas',
    image: 'images/susanna.webp',
    role: 'role.tech',
    bio: {
      fi: 'Susanna on monipuolinen klinikkaeläinhoitaja, joka nauttii klinikkatyön vaihtelevuudesta. Hän kehittää jatkuvasti osaamistaan ja on aina valmis oppimaan uutta.',
      sv: 'Susanna är en mångsidig klinikdjurskötare som trivs med variationen i klinikarbetet. Hon utvecklar kontinuerligt sin kompetens och är alltid redo att lära sig nytt.',
      en: 'Susanna is a versatile veterinary technician who enjoys the variety of clinical work. She continuously develops her skills and is always ready to learn something new.'
    },
    background: {
      fi: 'Klinikkaeläinhoitaja.',
      sv: 'Klinikdjurskötare.',
      en: 'Veterinary technician.'
    },
    interests: {
      fi: 'Monipuolinen klinikkatyö ja jatkuva oppiminen',
      sv: 'Varierande klinikarbete och kontinuerligt lärande',
      en: 'Diverse clinical work and continuous learning'
    }
  },
  emilia: {
    name: 'Emilia Svahn',
    image: 'images/emilia.webp',
    role: 'role.tech',
    bio: {
      fi: 'Emilia on klinikkaeläinhoitaja, jolla on vahva kiinnostus anestesiaan, kirurgisiin toimenpiteisiin ja hammashoitoon. Hän avustaa eläinlääkäreitä vaativissa leikkauksissa ja hammastoimenpiteissä.',
      sv: 'Emilia är klinikdjurskötare med starkt intresse för anestesi, kirurgiska ingrepp och tandvård. Hon assisterar veterinärerna vid krävande operationer och tandingrepp.',
      en: 'Emilia is a veterinary technician with a strong interest in anesthesia, surgical procedures and dental care. She assists the veterinarians in demanding surgeries and dental procedures.'
    },
    background: {
      fi: 'Klinikkaeläinhoitaja.',
      sv: 'Klinikdjurskötare.',
      en: 'Veterinary technician.'
    },
    interests: {
      fi: 'Anestesia, kirurgiset toimenpiteet ja hammashoito',
      sv: 'Anestesi, kirurgiska ingrepp och tandvård',
      en: 'Anesthesia, surgical procedures and dental care'
    }
  },
  jennifer: {
    name: 'Jennifer Couloigner',
    image: 'images/jennifer.webp',
    role: 'role.nurse_student',
    bio: {
      fi: 'Jennifer on eläinhoitaja ja opiskelija, joka kehittää osaamistaan klinikkatyössä. Hän on erityisen kiinnostunut anestesian valvonnasta, kirurgiasta ja eksoottisten eläinten hoidosta.',
      sv: 'Jennifer är djurskötare och studerande som utvecklar sin kompetens i klinikarbetet. Hon är särskilt intresserad av anestesiövervakning, kirurgi och vård av exotiska djur.',
      en: 'Jennifer is a veterinary nurse and student developing her skills in clinical work. She is particularly interested in anesthesia monitoring, surgery and exotic animal care.'
    },
    background: {
      fi: 'Eläinhoitaja, opiskelija.',
      sv: 'Djurskötare, studerande.',
      en: 'Veterinary nurse, student.'
    },
    interests: {
      fi: 'Anestesian valvonta, kirurgia ja eksoottiset potilaat',
      sv: 'Anestesiövervakning, kirurgi och exotiska patienter',
      en: 'Anesthesia monitoring, surgery and exotic patients'
    }
  },
  josefiina: {
    name: 'Josefiina Saarimäki',
    image: 'images/josefiina.webp',
    role: 'role.practical',
    bio: {
      fi: 'Josefiina on lähihoitaja, joka työskentelee monipuolisesti klinikan eri tehtävissä. Hänen vahvuuksiaan ovat laboratorio- ja leikkaussalityö.',
      sv: 'Josefiina är närvårdare som arbetar mångsidigt med klinikens olika uppgifter. Hennes styrkor är laboratorie- och operationssalsarbete.',
      en: 'Josefiina is a practical nurse who works across various clinic tasks. Her strengths lie in laboratory and operating room work.'
    },
    background: {
      fi: 'Lähihoitaja.',
      sv: 'Närvårdare.',
      en: 'Practical nurse.'
    },
    interests: {
      fi: 'Laboratorio- ja leikkaussalityö',
      sv: 'Laboratorie- och operationssalsarbete',
      en: 'Laboratory and operating room work'
    }
  },
  tiina: {
    name: 'Tiina McBreen',
    image: 'images/tiina.webp',
    role: 'role.practical',
    bio: {
      fi: 'Tiina on lähihoitaja, joka on erityisen kiinnostunut kirurgiasta, ortopediasta ja traumahoidosta. Hän avustaa aktiivisesti leikkauksissa ja ortopedisissä toimenpiteissä.',
      sv: 'Tiina är närvårdare med särskilt intresse för kirurgi, ortopedi och traumavård. Hon assisterar aktivt vid operationer och ortopediska ingrepp.',
      en: 'Tiina is a practical nurse with a particular interest in surgery, orthopedics and trauma care. She actively assists in surgeries and orthopedic procedures.'
    },
    background: {
      fi: 'Lähihoitaja.',
      sv: 'Närvårdare.',
      en: 'Practical nurse.'
    },
    interests: {
      fi: 'Kirurgia, ortopedia ja traumahoito',
      sv: 'Kirurgi, ortopedi och traumavård',
      en: 'Surgery, orthopedics and trauma care'
    }
  }
};

function openNurseProfile(nurseId) {
  const profile = nurseProfiles[nurseId];
  if (!profile) return;

  document.getElementById('nurse-modal-img').src = profile.image;
  document.getElementById('nurse-modal-img').alt = profile.name;
  document.getElementById('nurse-modal-name').textContent = profile.name;
  const roleEl = document.getElementById('nurse-modal-role');
  const roleData = translations[profile.role];
  roleEl.textContent = roleData ? (roleData[currentLang] || roleData.fi) : '';
  document.getElementById('nurse-modal-bio').textContent = profile.bio[currentLang] || profile.bio.fi;
  document.getElementById('nurse-modal-background').textContent = profile.background[currentLang] || profile.background.fi;
  document.getElementById('nurse-modal-interests').textContent = profile.interests[currentLang] || profile.interests.fi;

  document.getElementById('nurse-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNurseProfile() {
  document.getElementById('nurse-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const vetModal = document.getElementById('vet-modal');
    if (vetModal && vetModal.classList.contains('active')) {
      closeVetProfile();
    }
    const nurseModal = document.getElementById('nurse-modal');
    if (nurseModal && nurseModal.classList.contains('active')) {
      closeNurseProfile();
    }
  }
});

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize language
  setLanguage(currentLang);

  // Bind language toggle
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Close articles when clicking any regular nav link (not the Articles link itself)
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    if (link.getAttribute('onclick')) return; // skip the Articles link
    link.addEventListener('click', () => {
      const articlesSection = document.getElementById('articles');
      const privacySection = document.getElementById('privacy');
      const anyOverlay = (articlesSection && articlesSection.style.display !== 'none') || (privacySection && privacySection.style.display !== 'none');
      if (anyOverlay) {
        showMainPage();
        history.pushState({ page: 'main' }, '', window.location.pathname + link.getAttribute('href'));
      }
    });
  });

  // Browser back/forward button support
  window.addEventListener('popstate', (e) => {
    const state = e.state;
    if (state && state.page === 'articles') {
      const articlesSection = document.getElementById('articles');
      const privacySection = document.getElementById('privacy');
      const mainSections = document.querySelectorAll('body > .notice-banner, body > section:not(#articles):not(#privacy), body > .hero');
      mainSections.forEach(el => el.style.display = 'none');
      privacySection.style.display = 'none';
      articlesSection.style.display = '';
      filterArticles('all');
      window.scrollTo({ top: 0 });
      setLanguage(currentLang);
    } else if (state && state.page === 'privacy') {
      const articlesSection = document.getElementById('articles');
      const privacySection = document.getElementById('privacy');
      const mainSections = document.querySelectorAll('body > .notice-banner, body > section:not(#articles):not(#privacy), body > .hero');
      mainSections.forEach(el => el.style.display = 'none');
      articlesSection.style.display = 'none';
      privacySection.style.display = '';
      window.scrollTo({ top: 0 });
      setLanguage(currentLang);
    } else {
      showMainPage();
      window.scrollTo({ top: 0 });
    }
  });

  // Set initial state and handle direct hash navigation
  history.replaceState({ page: 'main' }, '', window.location.pathname + window.location.hash);
  if (window.location.hash === '#articles') {
    toggleArticles();
  } else if (window.location.hash === '#privacy') {
    togglePrivacy();
  }

  // Initialize all features
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initPriceAccordion();
  initActiveNav();
  initScrollAnimations();
  initArticleFilters();
});
