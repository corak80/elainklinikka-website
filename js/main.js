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
    fi: 'Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä',
    sv: 'En finskägd privat djurklinik i Dragnäsbäck, Vasa',
    en: 'A Finnish-owned private small animal clinic in Dragnäsbäck, Vaasa'
  },
  'about.text1': {
    fi: 'Meille tyytyväinen asiakas ja potilaan terveys ovat pääasia. Tavoitteenamme on lämmin ja luotettava suhde asiakkaan ja potilaan kanssa.',
    sv: 'För oss är en nöjd kund och patientens hälsa vår huvudsak. Vår målsättning är ett varmt och tillförlitligt förhållande till kunden och patienten.',
    en: 'For us, a satisfied customer and the health of the patient are the main priority. Our goal is a warm and trustworthy relationship with both the customer and the patient.'
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
    fi: 'Ortopedia, pehmytkudoskirurgia, hammashoito',
    sv: 'Ortopedi, mjukdelskirurgi, tandvård',
    en: 'Orthopedics, soft tissue surgery, dentistry'
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
    fi: 'Eturistisiteen korjausleikkaukset kahdella menetelmällä: lateral suture -tekniikka stabiloi nivelen synteettisellä tukimateriaalilla, ja TTA (tibial tuberosity advancement) muuttaa polven biomekaniikkaa siirtämällä sääriluun kyhmyä eteenpäin. Lisäksi murtumaleikkaukset, amputaatiot (jalka, häntä, varpaat) sekä reisiluunpään poisto esim. kroonisen luksaation tai Legg-Perthes taudin vuoksi.',
    sv: 'Korsbandsskadeoperationer med två metoder: lateral sutur-teknik stabiliserar leden med syntetiskt stödmaterial, och TTA (tibial tuberosity advancement) förändrar knäets biomekanik genom att flytta skenbenets utskott framåt. Dessutom frakturkirurgi, amputationer (ben, svans, tår) samt lårbensh­uvudektomi vid t.ex. kronisk luxation eller Legg-Perthes sjukdom.',
    en: 'Cranial cruciate ligament repair with two methods: lateral suture technique stabilizes the joint with synthetic support material, and TTA (tibial tuberosity advancement) alters knee biomechanics by advancing the tibial tuberosity forward. Also fracture repairs, amputations (leg, tail, toes) and femoral head ostectomy for chronic luxation or Legg-Perthes disease.'
  },
  'service.desc.laboratory': {
    fi: 'Hyvin varusteltu oma laboratorio: verinäytteet, virtsanäytteet, verisivelyt, iho- ja korvanäytteet. Suurin osa tuloksista jo käynnin aikana. Tutkimuksia: hematologia, kliininen kemia, elektrolyytit, hormonit, virtsaviljelyt, sytologia.',
    sv: 'Välutrustat eget laboratorium: blodprover, urinprover, blodutstryk, hud- och öronprover. De flesta resultat redan under besöket. Analyser: hematologi, klinisk kemi, elektrolyter, hormoner, urinodlingar, cytologi.',
    en: 'Well-equipped in-house laboratory: blood samples, urine samples, blood smears, skin and ear samples. Most results during the visit. Analyses: hematology, clinical chemistry, electrolytes, hormones, urine cultures, cytology.'
  },
  'service.desc.official': {
    fi: 'Viralliset lonkka-, kyynär- ja selkätutkimukset. Viralliset polvitutkimukset. Viralliset sydämen auskultaatiotutkimukset.',
    sv: 'Officiella röntgenbilder (höfter, armbågar, rygg). Officiella knäundersökningar. Officiella hjärtauskultationer.',
    en: 'Official hip, elbow and back X-rays. Official knee examinations. Official heart auscultations.'
  },
  'service.desc.orthopedics': {
    fi: 'Ortopediset tutkimukset ja viralliset röntgentutkimukset. Eturistisiteen korjausleikkaukset kahdella menetelmällä: lateral suture -tekniikka (nivelen stabilointi synteettisellä tukimateriaalilla) ja TTA (sääriluun kyhmyn siirto polven biomekaniikan muuttamiseksi). Murtumaleikkaukset, amputaatiot sekä reisiluunpään poisto.',
    sv: 'Ortopediska undersökningar och officiella röntgenundersökningar. Korsbandsskadeoperationer med två metoder: lateral sutur-teknik (ledstabilisering med syntetiskt stödmaterial) och TTA (förflyttning av skenbenets utskott för att ändra knäets biomekanik). Frakturkirurgi, amputationer samt lårbensh­uvudektomi.',
    en: 'Orthopedic examinations and official X-ray examinations. Cranial cruciate ligament repair with two methods: lateral suture technique (joint stabilization with synthetic support material) and TTA (tibial tuberosity advancement to alter knee biomechanics). Fracture repairs, amputations, and femoral head ostectomy.'
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
    fi: 'Hammassairaudet ovat erittäin yleisiä — jo 3-vuoden iässä valtaosalla on hampaiden tulehdus. Palvelut: hammaskiven poisto, hammasröntgen, hampaiden poistot ja maitohampaiden poistot. Kaikki toimenpiteet yleisanestesiassa.',
    sv: 'Tandsjukdomar är mycket vanliga — vid 3 års ålder har de flesta hundar och katter inflammation i munnen. Tjänster: tandstensavlägsnande, tandröntgen, tandutdragningar och mjölktandsborttagning. Alla ingrepp under generell anestesi.',
    en: 'Dental disorders are very common — by age 3, most dogs and cats have some dental inflammation. Services: tartar removal, dental X-rays, tooth extractions, and deciduous teeth removals. All procedures under general anesthesia.'
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
    fi: 'Anestesia on lähellä sydäntämme. Päivitämme jatkuvasti osaamistamme ja koulutustamme, uudistamme protokolliamme ja valvomme potilaita tarkasti koko toimenpiteen ajan. Klinikalla on käytössä kaksi ventilaattoria turvallisen anestesian varmistamiseksi.',
    sv: 'Anestesi ligger oss varmt om hjärtat. Vi uppdaterar kontinuerligt vår utbildning, förnyar våra protokoll och övervakar patienterna noggrant under hela ingreppet. Kliniken har två ventilatorer för att säkerställa säker anestesi.',
    en: 'Anesthesia is close to our hearts. We continuously update our education, refresh our protocols and monitor patients closely throughout every procedure. The clinic has two ventilators to ensure safe anesthesia.'
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
    fi: 'Anestesia ja laboratoriotyö. Anestesia EAT-tutkinto.',
    sv: 'Anestesi och laboratoriearbete. Anestesi specialistkompetens.',
    en: 'Anesthesia and laboratory work. Anesthesia specialist qualification.'
  },
  'bio.meri': {
    fi: 'Kissojen hoitoon erikoistunut. Myös hevostenhoitajan tutkinto.',
    sv: 'Specialiserad på katter. Även utbildad hästskötare.',
    en: 'Specialized in cat care. Also qualified horse caretaker.'
  },
  'bio.susanna': {
    fi: 'Monipuolinen klinikkatyö ja jatkuva oppiminen.',
    sv: 'Varierande klinikarbete och kontinuerligt lärande.',
    en: 'Diverse clinical work and continuous learning.'
  },
  'bio.emilia': {
    fi: 'Anestesia, kirurgiset toimenpiteet ja hammashoito.',
    sv: 'Anestesi, kirurgiska ingrepp och tandvård.',
    en: 'Anesthesia, surgical procedures and dental care.'
  },
  'bio.jennifer': {
    fi: 'Anestesian valvonta, kirurgia ja eksoottiset potilaat.',
    sv: 'Anestesiövervakning, kirurgi och exotiska patienter.',
    en: 'Anesthesia monitoring, surgery and exotic patients.'
  },
  'bio.josefiina': {
    fi: 'Laboratorio- ja leikkaussalityö.',
    sv: 'Laboratorie- och operationsarbete.',
    en: 'Laboratory and operating room work.'
  },
  'bio.tiina': {
    fi: 'Kirurgia, ortopedia ja traumahoito.',
    sv: 'Kirurgi, ortopedi och traumavård.',
    en: 'Surgery, orthopedics and trauma care.'
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
  'price.surg.catmale': { fi: 'Uroskissan kastraatio', sv: 'Hankatt kastrering', en: 'Male cat neuter' },
  'price.surg.dogfemale': { fi: 'Naaraskoiran sterilisaatio', sv: 'Hontik sterilisering', en: 'Female dog spay' },
  'price.surg.dogmale': { fi: 'Uroskoiran kastraatio', sv: 'Hanhund kastrering', en: 'Male dog neuter' },

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

  'prices.note': {
    fi: 'Peruuttamattomista ajoista veloitetaan enintään 50% toimenpiteen hinnasta. Peruutukset 24h ennen.',
    sv: 'Avbokning krävs minst 24 timmar före besöket. Avgift högst 50% av behandlingens pris.',
    en: 'Cancellations require 24 hours notice. Fee up to 50% of procedure cost applies.'
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

  // Contact
  'contact.title': { fi: 'Yhteystiedot', sv: 'Kontaktuppgifter', en: 'Contact Us' },
  'contact.subtitle': {
    fi: 'Ota yhteyttä tai varaa aika',
    sv: 'Kontakta oss eller boka tid',
    en: 'Get in touch or book an appointment'
  },
  'contact.address.label': { fi: 'Osoite', sv: 'Adress', en: 'Address' },
  'contact.address': { fi: 'Gerbyntie 18-22, 65230 Vaasa', sv: 'Gerbyvägen 18-22, 65230 Vasa', en: 'Gerbyntie 18-22, 65230 Vaasa' },
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
    fi: 'Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.',
    sv: 'En finskägd privat djurklinik i Dragnäsbäck, Bockis hörnet, Vasa.',
    en: 'A Finnish-owned private small animal clinic in Dragnäsbäck, Vaasa.'
  },
  'footer.quicklinks': { fi: 'Pikalinkit', sv: 'Snabblänkar', en: 'Quick Links' },
  'footer.contact': { fi: 'Yhteystiedot', sv: 'Kontakt', en: 'Contact' },
  'footer.follow': { fi: 'Seuraa meitä', sv: 'Följ oss', en: 'Follow Us' },
  'footer.privacy': { fi: 'Tietosuojarekisteri', sv: 'Dataskyddsregister', en: 'Privacy Policy' },
  'footer.rights': { fi: 'Kaikki oikeudet pidätetään.', sv: 'Alla rättigheter förbehållna.', en: 'All rights reserved.' },

  // Navigation - Articles
  'nav.articles': { fi: 'Artikkelit', sv: 'Artiklar', en: 'Articles' },

  // Articles section
  'articles.title': { fi: 'Artikkelit', sv: 'Artiklar', en: 'Articles' },
  'articles.subtitle': {
    fi: 'Asiantuntija-artikkeleita lemmikkien terveydestä',
    sv: 'Expertartiklar om husdjurens hälsa',
    en: 'Expert articles about pet health'
  },
  'articles.back': { fi: '← Takaisin etusivulle', sv: '← Tillbaka till startsidan', en: '← Back to homepage' },
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
    fi: 'Kivunhallinta on yksi tärkeimmistä osa-alueista eläinkirurgiassa. Klinikalla käytämme MLK-infuusiota (morfiini-lidokaiini-ketamiini) vakiomenetelmänä kaikissa kivuliaissa pehmytkudosleikkauksissa — mukaan lukien naaraskoirien sterilisaatiot — sekä ortopedisissä toimenpiteissä. MLK on multimodaalinen eli monikomponenttinen kivunlievennystapa, jossa kolme eri lääkettä vaikuttavat samanaikaisesti eri kipumekanismeihin.',
    sv: 'Smärthantering är en av de viktigaste aspekterna av djurkirurgi. På kliniken använder vi MLK-infusion (morfin-lidokain-ketamin) som standardmetod vid alla smärtsamma mjukdelsoperationer — inklusive sterilisering av tikar — samt ortopediska ingrepp. MLK är en multimodal smärtlindringsmetod där tre olika läkemedel verkar samtidigt på olika smärtmekanismer.',
    en: 'Pain management is one of the most important aspects of veterinary surgery. At our clinic we use MLK infusion (morphine-lidocaine-ketamine) as the standard method for all painful soft tissue surgeries — including dog spays — and orthopedic procedures. MLK is a multimodal pain management approach where three different drugs act simultaneously on different pain pathways.'
  },
  'article.mlk.what.title': {
    fi: 'Mitä MLK-infuusio tarkoittaa?',
    sv: 'Vad innebär MLK-infusion?',
    en: 'What Is MLK Infusion?'
  },
  'article.mlk.what.text': {
    fi: 'MLK on kolmen lääkeaineen yhdistelmä, joka annostellaan jatkuvana suonensisäisenä infuusiona (CRI, constant rate infusion) koko leikkauksen ajan. Jokainen komponentti vaikuttaa eri mekanismilla: morfiini on opioidi, joka estää kipuviestien kulkua keskushermostossa; lidokaiini on puudute, joka vaimentaa kipusignaaleja perifeerisesti ja vähentää suoliston tulehdusreaktioita; ketamiini estää NMDA-reseptoreita ja ehkäisee tehokkaasti kivun "wind-up"-ilmiötä eli kipuherkkyyden voimistumista.',
    sv: 'MLK är en kombination av tre läkemedel som administreras som en kontinuerlig intravenös infusion (CRI, constant rate infusion) under hela operationen. Varje komponent verkar genom olika mekanismer: morfin är en opioid som blockerar smärtsignaler i centrala nervsystemet; lidokain är ett lokalbedövningsmedel som dämpar smärtsignaler perifert och minskar inflammatoriska reaktioner i tarmarna; ketamin blockerar NMDA-receptorer och förhindrar effektivt smärtans "wind-up"-fenomen, alltså en progressiv förstärkning av smärtkänsligheten.',
    en: 'MLK is a combination of three drugs administered as a continuous intravenous infusion (CRI, constant rate infusion) throughout surgery. Each component acts through a different mechanism: morphine is an opioid that blocks pain signals in the central nervous system; lidocaine is a local anesthetic that dampens pain signals peripherally and reduces intestinal inflammatory responses; ketamine blocks NMDA receptors and effectively prevents pain "wind-up" — the progressive amplification of pain sensitivity.'
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
let currentLang = localStorage.getItem('siteLanguage') || 'fi';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('siteLanguage', lang);

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });

  // Update language toggle buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;
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
function toggleArticles() {
  const articlesSection = document.getElementById('articles');
  const mainSections = document.querySelectorAll('body > .notice-banner, body > section:not(#articles), body > .hero');
  const isShowing = articlesSection.style.display !== 'none';

  if (isShowing) {
    // Hide articles, show main content
    articlesSection.style.display = 'none';
    mainSections.forEach(el => el.style.display = '');
  } else {
    // Show articles, hide main content
    mainSections.forEach(el => el.style.display = 'none');
    articlesSection.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Re-apply translations
    setLanguage(currentLang);
  }
}

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
      if (articlesSection && articlesSection.style.display !== 'none') {
        articlesSection.style.display = 'none';
        document.querySelectorAll('body > .notice-banner, body > section:not(#articles), body > .hero').forEach(el => el.style.display = '');
      }
    });
  });

  // Initialize all features
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initPriceAccordion();
  initActiveNav();
  initScrollAnimations();
});
