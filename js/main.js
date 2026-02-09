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
    fi: 'Yksityinen pieneläinklinikka Vaasan Pukinkulman Autotalossa',
    sv: 'En privatägd smådjursklinik i Bocks hörna, Vasa',
    en: 'A privately owned small animal veterinary clinic in Bock\'s corner, Vaasa'
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
    fi: 'Suomalainen yksityinen pieneläinklinikka Vaasan Dragnäsbäckissä, Bockis-kulmauksessa.',
    sv: 'En finskägd privat djurklinik i Dragnäsbäck, Bockis hörnet, Vasa.',
    en: 'A Finnish-owned private small animal clinic in Dragnäsbäck, Vaasa.'
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
      el.textContent = translations[key][lang];
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
function toggleArticles() {
  const articlesSection = document.getElementById('articles');
  const privacySection = document.getElementById('privacy');
  const mainSections = document.querySelectorAll('body > .notice-banner, body > section:not(#articles):not(#privacy), body > .hero');
  const isShowing = articlesSection.style.display !== 'none';

  if (isShowing) {
    articlesSection.style.display = 'none';
    mainSections.forEach(el => el.style.display = '');
  } else {
    mainSections.forEach(el => el.style.display = 'none');
    privacySection.style.display = 'none';
    articlesSection.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLanguage(currentLang);
  }
}

function togglePrivacy() {
  const privacySection = document.getElementById('privacy');
  const articlesSection = document.getElementById('articles');
  const mainSections = document.querySelectorAll('body > .notice-banner, body > section:not(#articles):not(#privacy), body > .hero');
  const isShowing = privacySection.style.display !== 'none';

  if (isShowing) {
    privacySection.style.display = 'none';
    mainSections.forEach(el => el.style.display = '');
  } else {
    mainSections.forEach(el => el.style.display = 'none');
    articlesSection.style.display = 'none';
    privacySection.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLanguage(currentLang);
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
        if (articlesSection) articlesSection.style.display = 'none';
        if (privacySection) privacySection.style.display = 'none';
        document.querySelectorAll('body > .notice-banner, body > section:not(#articles):not(#privacy), body > .hero').forEach(el => el.style.display = '');
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
