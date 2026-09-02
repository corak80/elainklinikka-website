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
  'nav.partnerships': { fi: 'Yhteistyö', sv: 'Samarbete', en: 'Partnerships' },
  'nav.contact': { fi: 'Yhteystiedot', sv: 'Kontakt', en: 'Contact' },
  'nav.catfriendly': { fi: 'Cat Friendly', sv: 'Cat Friendly', en: 'Cat Friendly' },
  'nav.book': { fi: 'Varaa aika', sv: 'Boka tid', en: 'Book Now' },

  // Cat Friendly Clinic section
  'cfc.title': {
    fi: 'Olemme Silver-tason akkreditoitu Cat Friendly Clinic',
    sv: 'Vi är en silverackrediterad Cat Friendly Clinic',
    en: 'We are a Silver accredited Cat Friendly Clinic'
  },
  'cfc.intro': {
    fi: 'Haluamme minimoida klinikallamme käyvien kissojen stressin, siksi klinikkamme on International Cat Care -järjestön akkreditoima Cat Friendly Clinic.',
    sv: 'Eftersom vi vill minimera stressen för katter som besöker oss är vår klinik en International Cat Care-ackrediterad Cat Friendly Clinic.',
    en: 'We want to minimise stress for cats visiting our clinic, so we are an International Cat Care Cat Friendly Clinic.'
  },
  'cfc.promise.heading': {
    fi: 'LUPAAMME SINULLE:',
    sv: 'VI GARANTERAR ATT:',
    en: 'THIS IS OUR PROMISE TO YOU:'
  },
  'cfc.promise.1': {
    fi: 'Käsittelemme kissoja hellävaraisesti ja huolehtivasti',
    sv: 'Vi behandlar katter på ett varsamt och omhändertagande sätt',
    en: 'We are gentle and caring with cats'
  },
  'cfc.promise.2': {
    fi: 'Ymmärrämme kissojen tarpeet',
    sv: 'Vi förstår katternas behov',
    en: 'We understand the needs of cats'
  },
  'cfc.promise.3': {
    fi: 'Meillä on kissaystävälliset tilat',
    sv: 'Vi har kattvänliga faciliteter',
    en: 'We have cat friendly facilities'
  },
  'cfc.ask': {
    fi: 'Voit kysyä keneltä tahansa henkilökunnastamme, jos haluat tutustua klinikkaamme tai sinulla on kysyttävää.',
    sv: 'Du är välkommen att kontakta vem som helst i vår personal om du skulle vilja se vår klinik eller om du har några frågor.',
    en: 'Please ask any of our staff if you would like to see our clinic or if you have any questions.'
  },
  'cfc.more': {
    fi: 'Lisätietoja:',
    sv: 'Mer information hittar du på:',
    en: 'To find out more visit:'
  },
  'cfc.charity': {
    fi: 'International Cat Care on hyväntekeväisyysjärjestö, joka toimii sellaisen maailman puolesta, jossa kaikkia kissoja – omistettuja ja omistamattomia – kohdellaan huolenpidolla, myötätunnolla ja ymmärryksellä.',
    sv: 'International Cat Care är en välgörenhetsorganisation som arbetar för en värld där alla katter – med eller utan ägare – behandlas med omsorg, medkänsla och förståelse.',
    en: 'International Cat Care is a charity working towards a world where all cats, owned and unowned, are treated with care, compassion and understanding.'
  },

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
  'hero.title3': {
    fi: 'Eläinlääkäri Vaasassa',
    sv: 'Veterinär i Vasa',
    en: 'Veterinarian in Vaasa'
  },
  'hero.subtitle': {
    fi: 'Ammattitaitoista ja lämmintä eläinlääkäripalvelua Vaasassa vuodesta 1989',
    sv: 'Professionell och varm djursjukvård i Vasa sedan 1989',
    en: 'Professional and warm veterinary care in Vaasa since 1989'
  },
  'hero.cta': { fi: 'Varaa aika', sv: 'Boka tid', en: 'Book Appointment' },
  'hero.services': { fi: 'Palvelumme', sv: 'Våra tjänster', en: 'Our Services' },
  'hero.senior': { fi: 'Senioripaketti 299 €', sv: 'Seniorpaket 299 €', en: 'Senior Package €299' },
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
    fi: '14 ammattilaista',
    sv: '14 medarbetare',
    en: '14 Professionals'
  },

  // About
  'about.title': { fi: 'Tietoa klinikasta', sv: 'Om kliniken', en: 'About the Clinic' },
  'about.subtitle': {
    fi: 'Vaasan ainoa perheomisteinen ketjuihin kuulumaton pieneläinklinikka \u2013 vuodesta 1989',
    sv: 'Vasas enda familjeägda kedjefria smådjursklinik \u2013 sedan 1989',
    en: 'Vaasa\'s only family-owned independent small animal clinic \u2013 since 1989'
  },
  'about.text1': {
    fi: 'Meille potilaan hyvinvointi ja asiakkaan tyytyväisyys ovat kaikkein tärkeintä. Haluamme luoda lämpimän ja luottamuksellisen suhteen niin sinuun kuin lemmikkiisikin.',
    sv: 'För oss är patientens välbefinnande och kundens tillfredsställelse de viktigaste prioriteringarna. Vi strävar efter att skapa en varm och förtroendefull relation till både kunden och patienten.',
    en: 'For us, patient welfare and client satisfaction are our top priorities. We strive to create a warm and trusting relationship with both you and your pet.'
  },
  'about.text2': {
    fi: 'Ammattitaitoinen hoitotiimimme tarjoaa sinulle kokenutta ja asiantuntevaa palvelua aina eläimesi parhaaksi. Aukioloaikoina otamme vastaan myös kiireelliset tapaukset — <a href="/palvelut/paivystys/">lue päivystysohjeet</a>.',
    sv: 'Vårt professionella vårdteam erbjuder dig erfaren och kunnig service – alltid för ditt djurs bästa. Under öppettiderna tar vi även emot brådskande fall — <a href="/sv/tjanster/jour/">se jouranvisningarna</a>.',
    en: 'Our professional care team offers experienced and knowledgeable service, always in the best interest of your pet. During opening hours we also reserve slots for urgent cases — <a href="/en/services/emergency/">see emergency instructions</a>.'
  },
  'about.catfriendly.title': {
    fi: 'ISFM-sertifioitu kissaystävällinen klinikka',
    sv: 'ISFM-certifierad kattvänlig klinik',
    en: 'ISFM Certified Cat Friendly Clinic'
  },
  'about.catfriendly.text': {
    fi: 'Kansainvälinen kissalääketieteen järjestö ISFM on myöntänyt meille kissaystävällisen klinikan sertifikaatin.',
    sv: 'Den internationella kattmedicinska organisationen ISFM har tilldelat oss certifikatet Cat Friendly Clinic.',
    en: 'The International Society of Feline Medicine (ISFM) has awarded us the Cat Friendly Clinic certificate.'
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

  // Service category tabs
  'service.cat.checkups': { fi: 'Terveys ja ennaltaehkäisy', sv: 'Hälsa och förebyggande', en: 'Health & Prevention' },
  'service.cat.diagnostics': { fi: 'Diagnostiikka ja kuvantaminen', sv: 'Diagnostik och bilddiagnostik', en: 'Diagnostics & Imaging' },
  'service.cat.surgery': { fi: 'Kirurgia ja anestesia', sv: 'Kirurgi och anestesi', en: 'Surgery & Anesthesia' },
  'service.cat.specialties': { fi: 'Iho, silmät ja hyvinvointi', sv: 'Hud, ögon och välmående', en: 'Skin, Eyes & Wellness' },
  'service.cat.other': { fi: 'Päivystys ja muut palvelut', sv: 'Jour och övriga tjänster', en: 'Emergency & Other' },
  'service.count.suffix': { fi: 'palvelua', sv: 'tjänster', en: 'services' },

  // Hero rating badge
  'hero.rating.score': { fi: '4,6', sv: '4,6', en: '4.6' },
  'hero.rating.label': { fi: '281 Google-arvostelua', sv: '281 omdömen på Google', en: '281 Google reviews' },
  'hero.rating.shortlabel': { fi: '281 arvostelua', sv: '281 omdömen', en: '281 reviews' },

  // About section eyebrow
  'about.eyebrow': { fi: 'Vuodesta 1989', sv: 'Sedan 1989', en: 'Since 1989' },

  // Individual services
  'service.emergency': { fi: 'Päivystys', sv: 'Jour', en: 'Emergency' },
  'service.acupuncture': { fi: 'Akupunktio', sv: 'Akupunktur', en: 'Acupuncture' },
  'service.bloodtests': { fi: 'Verikokeet', sv: 'Blodprov', en: 'Blood Tests' },
  'service.dermatology': { fi: 'Ihotaudit ja allergiat', sv: 'Dermatologi och allergier', en: 'Dermatology & Allergies' },
  'service.pregnancy': { fi: 'Tiineystutkimus', sv: 'Dräktighetsdiagnos', en: 'Pregnancy Diagnosis' },
  'service.endoscopy': { fi: 'Tähystystutkimukset', sv: 'Endoskopi', en: 'Endoscopy' },
  'service.food': { fi: 'Rehumyynti', sv: 'Foderförsäljning', en: 'Therapeutic Diets' },
  'service.wellness': { fi: 'Hyvinvointi ja kuntoutus', sv: 'Friskvård och rehabilitering', en: 'Wellness & Rehabilitation' },
  'service.healthcheck': { fi: 'Terveystarkastukset', sv: 'Hälsokontroll', en: 'Health Examinations' },
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
  'service.puppy': { fi: 'Pentutarkastus', sv: 'Valpkontroll', en: 'Puppy Examinations' },
  'service.internalmedicine': { fi: 'Sisätaudit', sv: 'Internmedicin', en: 'Internal Medicine' },
  'service.ophthalmology': { fi: 'Silmätaudit', sv: 'Ögonsjukdomar', en: 'Ophthalmology' },
  'service.eupetpassport': { fi: 'EU-lemmikkipassi', sv: 'EU-sällskapsdjurspass', en: 'EU Pet Passport' },
  'service.anesthesia': { fi: 'Anestesia', sv: 'Anestesi', en: 'Anesthesia' },
  'service.hygiene': { fi: 'Hygienia', sv: 'Hygien', en: 'Hygiene' },

  // Service descriptions
  'service.desc.emergency': {
    fi: 'Päivittäin varatut akuuttiajat arkisin 7:45–17. Iltaisin ja viikonloppuisin Pohjoisen päivystysalueen numero 0600 399 299. Hätätilanteen ensiapu ja toimintaohjeet.',
    sv: 'Dagliga akuttider vardagar 7:45–17. Kvällar och helger Norra jourområdets nummer 0600 399 299. Råd om första hjälpen vid nödsituationer.',
    en: 'Daily reserved acute slots weekdays 7:45–17. Evenings and weekends: regional hotline 0600 399 299. First aid guidance for emergencies.'
  },
  'service.desc.acupuncture': {
    fi: 'Akupunktiota käytetään kivunlievennykseen ja joidenkin tautien hoitoon. Akupunktiota klinikalla tekee Assaf, joka on jatkokouluttautunut koirien ja hevosten akupunktiossa.',
    sv: 'Akupunktur används till smärtlindring och för behandling av vissa sjukdomar. Behandlingen utförs av Assaf, som har vidareutbildning inom akupunktur för hundar och hästar.',
    en: 'Acupuncture is used for pain relief and for the treatment of some diseases. Administered by Assaf, who has completed further training in canine and equine acupuncture.'
  },
  'service.desc.bloodtests': {
    fi: 'Klinikallamme on mahdollisuus tutkia lemmikkisi verinäytteet. Useimmat näytteet tutkimme omassa laboratoriossamme, joten saat vastauksen jo käynnin aikana.',
    sv: 'De flesta prover undersöks i vårt eget laboratorium, så vi får svaret redan under besöket.',
    en: 'Most samples are examined in our own laboratory, so you can get results during the same visit.'
  },
  'service.desc.dermatology': {
    fi: 'Ihotaudit ovat yksi yleisimmistä syistä hakeutua eläinlääkäriin. Joka kymmenennellä suomalaisella koiralla on allergioita, jotka usein oireilevat ihotulehduksina ja korvatulehduksina. Tyypillisiä oireita ovat tassujen nuoleminen, korvien raapiminen ja kasvojen hankaaminen. Allergiaa epäiltäessä pyrimme ensin poissulkemaan ruoka-aineet, ja tarvittaessa otamme allergiaverinäytteet.',
    sv: 'Dermatologiska sjukdomar är en av de vanligaste orsakerna att uppsöka veterinär. Allergier drabbar ungefär en av tio hundar i Finland och visar sig ofta genom hud- och öroninflammation. Typiska symtom inkluderar tasslickande, öronkliande och ansiktsgnuggning. Vid allergimisstanke försöker vi först utesluta foderallergier, och vid behov tas allergiblodprover.',
    en: 'Skin diseases are one of the most common reasons to seek veterinary care. About one in ten dogs in Finland has allergies, which often cause skin and ear infections. Typical symptoms include paw licking, ear scratching, and face rubbing. When allergy is suspected, we first try to rule out food as a cause, and if necessary, collect allergy blood samples.'
  },
  'service.desc.pregnancy': {
    fi: 'Ultraäänitutkimuksella voidaan todeta tiineys noin tiineyspäivästä 24. Röntgentutkimuksella voidaan arvioida pentujen lukumäärä tarkemmin, noin tiineyspäivästä 50 lähtien.',
    sv: 'Ultraljudsundersökning kan upptäcka dräktighet från dag 24. Röntgenundersökning kan ge en mer exakt bedömning av antalet valpar, från dag 50 och framåt.',
    en: 'Ultrasound can confirm pregnancy from approximately day 24. X-ray examination can provide a more accurate estimate of the number of puppies from approximately day 50.'
  },
  'service.desc.endoscopy': {
    fi: 'Klinikalla tehdään video-otoskopia (korvaontelon tähystys ja huuhtelu), rhinoskopia (nenäontelon tähystys), gastroskopia (vatsan ja suoliston tähystys), kystoskopia (virtsateiden tähystys) ja bronkoskopia (hengitysteiden tähystys).',
    sv: 'Vi utför video-otoskopi (öronundersökning och spolning), rhinoskopi (näshåleundersökning), gastroskopi (mag-tarmundersökning), cystoskopi (urinvägsundersökning) och bronkoskopi (luftvägsundersökning).',
    en: 'We perform video-otoscopy (ear canal examination and flushing), rhinoscopy (nasal cavity examination), gastroscopy (gastrointestinal examination), cystoscopy (urinary tract examination) and bronchoscopy (airway examination).'
  },
  'service.desc.food': {
    fi: 'Klinikaltamme saat lemmikkisi eri sairauksien hoitoon tarkoitetut erikoisruoat. Erikoisruokia suositellaan esimerkiksi nivelrikkoon, munuaisten vajaatoimintaan, vatsa- ja suolistovaivoihin, ruoka-aineallergioihin ja painonhallintaan. Merkit: Royal Canin, Specific, Hill\'s.',
    sv: 'På kliniken hittar du olika specialfoder som används som stöd under sjukdom. Rekommenderas vid bland annat artros, njursvikt, mag-tarmproblem, urinvägssjukdomar, foderallergier och viktkontroll. Märken: Royal Canin, Specific, Hill\'s.',
    en: 'We carry special therapeutic diets used as part of the treatment for various conditions. Recommended for osteoarthritis, renal failure, gastrointestinal diseases, food allergies, urinary tract diseases, and weight management. Brands: Royal Canin, Specific, Hill\'s.'
  },
  'service.desc.wellness': {
    fi: 'Kuntoutuksen avulla arvioidaan ja pyritään parantamaan eläimen toimintakykyä ja liikkumista. Yleisimmät syyt ovat liikkuvuuden häiriöt, suorituskyvyn alentuminen, trauman jälkeiset kiputilat ja leikkauksen jälkeinen kuntoutus. Palvelut: liikkumisanalyysi, hieronta, elektroterapia, harjoitusohjelmat.',
    sv: 'Med hjälp av friskvård och rehabilitering analyseras och förbättras djurets förmåga till rörelse. De vanligaste orsakerna är funktionsstörningar, nedsatt prestationsförmåga, smärta efter trauma samt rehabilitering efter operationer. Tjänster: rörelseanalys, djupgående massage, elektroterapi, träningsprogram.',
    en: 'Wellness and rehabilitation services to assess and improve your pet\'s mobility and function. Common reasons include reduced mobility, pain following trauma, and post-surgical recovery. Services: gait analysis, deep massage, electrotherapy, customized training programs.'
  },
  'service.desc.healthcheck': {
    fi: 'Terveystarkastuksessa voidaan havaita muutokset, jotka voivat pitkällä tähtäimellä aiheuttaa terveysongelmia. Eläinlääkäri tutkii lemmikkisi kliinisesti, kuuntelee sydämen ja keuhkot sekä tarvittaessa ottaa verinäytteet.',
    sv: 'Under hälsoundersökningen kan man upptäcka förändringar som i det långa loppet kan förorsaka hälsoproblem. Veterinären gör en klinisk undersökning, lyssnar på hjärtat och lungorna och vid behov tas blodprover.',
    en: 'During health checks we can detect changes that may cause health problems in the long run. The vet performs a full clinical examination, listens to the heart and lungs and, if necessary, takes blood samples.'
  },
  'service.desc.cardiology': {
    fi: 'Sydänsairaudet ovat yleisiä erityisesti tietyissä roduissa. Ajoissa aloitettu lääkitys voi pidentää lemmikkisi elinikää. Klinikalla tehdään sydämen ultraäänitutkimuksia, EKG- ja Holter-tutkimuksia. Teemme myös virallisia sydämen ultraäänitutkimuksia koirille. Klinikallamme on viralliset oikeudet sydämen auskultaatiotutkimuksiin.',
    sv: 'Hjärtsjukdomar är vanliga särskilt hos vissa raser. Tidig behandling kan förlänga livslängden och förbättra livskvaliteten. Kliniken erbjuder hjärtultraljud, EKG och Holter-monitorering. Vi utför även officiella hjärtultraljudsundersökningar för hundar. Vi har officiella rättigheter för hjärtauskultation.',
    en: 'Heart diseases are common, especially in certain breeds. Early treatment can extend your pet\'s lifespan and improve quality of life. We offer cardiac ultrasound, ECG and Holter monitoring. We also perform official heart ultrasound examinations for dogs. We are authorized to perform official heart auscultation examinations.'
  },
  'service.desc.castration': {
    fi: 'Teemme kissojen, koirien ja kanien kastraatioita. Koiran kastraatio auttaa ennaltaehkäisemään eturauhasvaivoja ja merkkailua. Tarjolla myös kemiallinen kastraatio hormoni-implantilla (6 tai 12 kk teho).',
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
    fi: 'Klinikallamme on oma ortopedinen leikkaussali, jossa on korkeampi steriiliystaso. Klinikalla ollaan tehty polvileikkauksia vuodesta 2017. Nykyään eturistisiteen korjausleikkaukset kahdella menetelmällä: lateral suture -tekniikka stabiloi nivelen synteettisellä tukimateriaalilla, ja TTA (tibial tuberosity advancement) muuttaa polven biomekaniikkaa siirtämällä sääriluun kyhmyä eteenpäin. Lisäksi patellaluksaatioleikkaukset, murtumaleikkaukset, amputaatiot sekä reisiluunpään poisto esim. kroonisen luksaation tai Legg-Perthes taudin vuoksi.',
    sv: 'Kliniken har ett dedikerat ortopediskt operationsrum med högre sterilitetsnivå. Vi har utfört knäoperationer sedan 2017. Idag erbjuds korsbandsskadeoperationer med två metoder: lateral sutur-teknik stabiliserar leden med syntetiskt stödmaterial, och TTA (tibial tuberosity advancement) förändrar knäets biomekanik genom att flytta skenbenets utskott framåt. Dessutom patellaluxationsoperationer, frakturkirurgi, amputationer samt lårbenshuvudresektion vid t.ex. kronisk luxation eller Legg-Perthes sjukdom.',
    en: 'The clinic has a dedicated orthopedic surgery room with a higher level of sterility. We have been performing knee surgeries since 2017. Cruciate ligament repair with two methods: lateral suture technique stabilizes the joint with synthetic support material, and TTA (tibial tuberosity advancement) alters knee biomechanics by advancing the tibial tuberosity forward. Also patellar luxation surgery, fracture repairs, amputations and femoral head ostectomy for chronic luxation or Legg-Perthes disease.'
  },
  'service.desc.laboratory': {
    fi: 'Hyvin varusteltu oma laboratorio: verinäytteet, virtsanäytteet, verisivelyt, iho- ja korvanäytteet. Suurin osa tuloksista on valmiina jo käynnin aikana. Tutkimuksia: hematologia, kliininen kemia, elektrolyytit, hormonit, virtsaviljelyt, sytologia.',
    sv: 'Välutrustat eget laboratorium: blodprover, urinprover, blodutstryk, hud- och öronprover. De flesta resultat redan under besöket. Analyser: hematologi, klinisk kemi, elektrolyter, hormoner, urinodlingar, cytologi.',
    en: 'Well-equipped in-house laboratory: blood samples, urine samples, blood smears, skin and ear samples. Most results available during your visit. Analyses: hematology, clinical chemistry, electrolytes, hormones, urine cultures, cytology.'
  },
  'service.desc.official': {
    fi: 'Viralliset lonkka-, kyynär- ja selkäkuvaukset. Viralliset polvitutkimukset. Viralliset sydämen auskultaatiotutkimukset. Viralliset sydämen ultraäänitutkimukset koirille.',
    sv: 'Officiella röntgenbilder (höfter, armbågar, rygg). Officiella knäundersökningar. Officiella hjärtauskultationer. Officiella hjärtultraljudsundersökningar för hundar.',
    en: 'Official hip, elbow and back X-rays. Official knee examinations. Official heart auscultations. Official heart ultrasound examinations for dogs.'
  },
  'service.desc.orthopedics': {
    fi: 'Ortopediset tutkimukset ja viralliset röntgentutkimukset. Klinikallamme on oma ortopedinen leikkaussali, jossa on korkeampi steriiliystaso. Klinikalla ollaan tehty polvileikkauksia vuodesta 2017. Nykyään eturistisiteen korjausleikkaukset kahdella menetelmällä: lateral suture -tekniikka (nivelen stabilointi synteettisellä tukimateriaalilla) ja TTA (sääriluun kyhmyn siirto polven biomekaniikan muuttamiseksi). Patellaluksaatioleikkaukset, murtumaleikkaukset, amputaatiot sekä reisiluunpään poisto.',
    sv: 'Ortopediska undersökningar och officiella röntgenundersökningar. Kliniken har ett dedikerat ortopediskt operationsrum med högre sterilitetsnivå. Vi har utfört knäoperationer sedan 2017. Idag erbjuds korsbandsskadeoperationer med två metoder: lateral sutur-teknik (ledstabilisering med syntetiskt stödmaterial) och TTA (förflyttning av skenbenets utskott för att ändra knäets biomekanik). Patellaluxationsoperationer, frakturkirurgi, amputationer samt lårbenshuvudresektion.',
    en: 'Orthopedic examinations and official X-ray examinations. The clinic has a dedicated orthopedic surgery room with a higher level of sterility. We have been performing knee surgeries since 2017. Cruciate ligament repair with two methods: lateral suture technique (joint stabilization with synthetic support material) and TTA (tibial tuberosity advancement to alter knee biomechanics). Patellar luxation surgery, fracture repairs, amputations, and femoral head ostectomy.'
  },
  'service.desc.xray': {
    fi: 'Digitaalinen röntgen. Suosittelemme esimerkiksi ontumisen, keuhko- tai sydänoireiden, akuutin oksentelun, virtsaamisvaikeuksien ja kasvainepäilyjen tutkimiseen sekä virallisiin röntgenkuvauksiin.',
    sv: 'Digital röntgen. Rekommenderas vid hälta, lung- och hjärtsymtom, akut kräkning, urinproblem, misstänkta tumörer och officiella röntgenbilder.',
    en: 'Digital X-ray. Recommended for limping, respiratory or cardiac symptoms, acute vomiting, urinary problems, tumor suspicion, and official screening X-rays.'
  },
  'service.desc.euthanasia': {
    fi: 'Pyrimme siihen, että viimeinen jäähyväinen tapahtuu rauhallisesti, ilman kiirettä. Lemmikille annetaan ensin rauhoite kivunlievennyksellä, sitten nukutusaine. Vaihtoehdot: kotihautaus, tuhkaus tai yksilötuhkaus uurnalla.',
    sv: 'Vi strävar efter att farvälet ska vara lugnt och utan brådska. Djuret får först ett lugnande medel med smärtlindring, sedan sömnmedel. Alternativ: hembegravning, kremering eller individuell kremering med urna.',
    en: 'We strive to make the final farewell peaceful and unhurried. Your pet first receives a sedative with pain relief, followed by an anesthetic. Options: home burial, cremation, or individual cremation with urn.'
  },
  'service.desc.sterilization': {
    fi: 'Yleinen toimenpide koirille, kissoille ja kaneille. Sterilisaatio auttaa ehkäisemään hormonaalisia sairauksia, kuten nisäkasvaimia ja kohtutulehdusta. Inhalaatioanestesia ja kattava kivunlievitys.',
    sv: 'Ett vanligt ingrepp på hundar, katter och kaniner. Sterilisering kan motverka hormonala sjukdomar som juvertumörer och livmoderinflammation. Inhalationsanestesi och omfattande smärthantering.',
    en: 'A common procedure for dogs, cats and rabbits. Sterilization helps prevent hormonal diseases including mammary tumors and uterine infections. Inhalation anesthesia with comprehensive pain management.'
  },
  'service.desc.dental': {
    fi: 'Hammassairaudet ovat erittäin yleisiä — jo kolmen vuoden iässä valtaosalla koirista ja kissoista on jonkinasteinen hammastulehdus. Palvelut: hammaskiven poisto ultraäänilaitteella, hammasröntgen, hampaiden kirurgiset poistot, maitohampaiden poistot sekä puhkeamattomien hampaiden ja kystojen poisto. Kaikki toimenpiteet yleisanestesiassa inhalaatioanestesialla, suonensisäisellä nesteytyksellä ja kattavalla kivunlievennyksellä.',
    sv: 'Tandsjukdomar är mycket vanliga — vid 3 års ålder har de flesta hundar och katter inflammation i munnen. Tjänster: tandstensavlägsnande med ultraljud, tandröntgen, kirurgiska tandutdragningar, mjölktandsborttagning samt borttagning av icke-erupterade tänder och cystor. Alla ingrepp under generell anestesi med inhalationsanestesi, intravenöst dropp och omfattande smärthantering.',
    en: 'Dental disorders are very common — by age 3, most dogs and cats have some dental inflammation. Services: tartar removal with ultrasound, dental X-rays, surgical tooth extractions, deciduous teeth removals, and removal of unerupted teeth and cysts. All procedures under general anesthesia with inhalation anesthesia, intravenous fluids and comprehensive pain management.'
  },
  'service.desc.ultrasound': {
    fi: 'Laadukas ultraääni: vatsan alueen tutkimukset, kohdun tutkimukset, maksan, munuaisten ja sisäelinten tutkimukset sekä sydämen ultraäänitutkimukset.',
    sv: 'Högklassigt ultraljud: abdominella undersökningar, livmoderundersökningar, lever-, njur- och andra organundersökningar samt hjärtultraljud.',
    en: 'High-quality ultrasound: abdominal examinations, uterine examinations, liver, kidney and other organ examinations, and heart ultrasound.'
  },
  'service.desc.vaccinations': {
    fi: 'Rokotukset ovat tärkeä osa ennaltaehkäisevää terveydenhoitoa. Koiranpennut rokotetaan useimmiten 12 ja 16 viikon iässä, kissanpennut samoin. Aikuiset rokotetaan 1–3 vuoden välein.',
    sv: 'Vaccinationer är en viktig del av förebyggande hälsovård. Valpar vaccineras oftast vid 12 och 16 veckors ålder, kattungar likaså. Vuxna djur vaccineras med 1–3 års intervall.',
    en: 'Vaccinations are an important part of preventive healthcare. Puppies are usually vaccinated at 12 and 16 weeks of age, kittens likewise. Adults are vaccinated every 1–3 years.'
  },
  'service.desc.puppy': {
    fi: 'Pentutarkastuksessa eläinlääkäri tutkii pennun päästä varpaisiin ja antaa terveystodistuksen. Tarkastuksen yhteydessä voimme asettaa mikrosirun.',
    sv: 'Vid valpkontrollen undersöker veterinären valpen från topp till tå och utfärdar ett hälsointyg. I samband med undersökningen kan man sätta mikrochip.',
    en: 'The veterinarian examines the puppy thoroughly from head to toe and issues a health certificate. A microchip can be implanted during the visit.'
  },
  'service.desc.internalmedicine': {
    fi: 'Sisätaudit kattavat laajan kirjon eläinten sairauksia: diabetes, Cushingin tauti, haimatulehdus, anemia, autoimmuunisairaudet. Perusteellinen diagnostiikka ja hoitosuunnitelma.',
    sv: 'Internmedicin omfattar ett brett spektrum av sjukdomar hos djur: diabetes, Cushings sjukdom, pankreatit, anemi, autoimmunsjukdomar. Grundlig diagnostik och behandlingsplan.',
    en: 'Internal medicine covers a wide range of animal diseases: diabetes, Cushing\'s disease, pancreatitis, anaemia, autoimmune diseases. Thorough diagnostics and treatment planning.'
  },
  'service.desc.ophthalmology': {
    fi: 'Silmäsairaudet ovat yleisiä lemmikeillä. Sarveiskalvon haavaumat, glaukooma, kuivasilmäisyys, kaihi, silmäluomien sairaudet. Tutkimus ja hoito samalla käynnillä.',
    sv: 'Ögonsjukdomar är vanliga hos husdjur. Hornhinnesår, glaukom, torra ögon, katarakt, ögonlockssjukdomar. Undersökning och behandling vid samma besök.',
    en: 'Eye diseases are common in pets. Corneal ulcers, glaucoma, dry eye, cataracts, eyelid diseases. Examination and treatment during the same visit.'
  },
  'service.desc.eupetpassport': {
    fi: 'EU-lemmikkieläinpassit, rabiesrokotus, tiitteritutkimus ja terveystodistukset. Kaikki matkustusasiakirjat saman katon alta.',
    sv: 'EU-sällskapsdjurspass, rabiesvaccination, titerundersökning och hälsointyg. Alla resedokument under samma tak.',
    en: 'EU pet passports, rabies vaccination, titre testing and health certificates. All travel documents under one roof.'
  },
  'service.desc.anesthesia': {
    fi: 'Anestesia on lähellä sydäntämme. Päivitämme jatkuvasti osaamistamme, uudistamme protokolliamme ja valvomme potilaita tarkasti koko toimenpiteen ajan. Klinikallamme on edistykselliset valvontalaitteet, neljä anestesiakonetta ja kaksi ventilaattoria turvallisen anestesian varmistamiseksi.',
    sv: 'Anestesi ligger oss varmt om hjärtat. Vi uppdaterar kontinuerligt vår utbildning, förnyar våra protokoll och övervakar patienterna noggrant under hela ingreppet. Kliniken har avancerad övervakningsutrustning, fyra anestesimaskiner och två ventilatorer för att säkerställa säker anestesi.',
    en: 'Anesthesia is close to our hearts. We continuously update our education, refresh our protocols and monitor patients closely throughout every procedure. The clinic has advanced monitoring equipment, four anesthesia machines and two ventilators to ensure safe anesthesia.'
  },
  'service.desc.hygiene': {
    fi: 'Korkea hygieniataso on meille ensiarvoisen tärkeää. Tutkimuspöydät desinfioidaan potilaiden välillä ja viltit ja alustat pestään jokaisen käytön jälkeen. Käytämme UV-valoa klinikan tilojen desinfiointiin ja suodattimia inhalaatioanestesiassa. Lattiat desinfioidaan kahdesti päivässä.',
    sv: 'Hög hygiennivå är av största vikt för oss. Undersökningsborden desinficeras mellan patienter och filtar och underlag tvättas efter varje användning. Vi använder UV-ljus för desinfektion av klinikens utrymmen och filter vid inhalationsanestesi. Golven desinficeras två gånger om dagen.',
    en: 'A high level of hygiene is of utmost importance to us. Examination tables are disinfected between patients and blankets and pads are washed after every use. We use UV light to disinfect clinic areas and filters with inhalation anesthesia. Floors are disinfected twice daily.'
  },

  // Team
  'team.title': { fi: 'Henkilökuntamme', sv: 'Vår personal', en: 'Our Team' },
  'team.more': { fi: 'Tutustu koko henkilökuntaan', sv: 'Bekanta dig med hela personalen', en: 'Meet the whole team' },
  'team.subtitle': {
    fi: 'Ammattitaitoinen hoitotiimimme palveluksessasi',
    sv: 'Vårt professionella vårdteam till din tjänst',
    en: 'Our professional care team at your service'
  },
  'team.vets': { fi: 'Eläinlääkärit', sv: 'Veterinärer', en: 'Veterinarians' },
  'team.techs': { fi: 'Hoitohenkilökunta', sv: 'Vårdpersonal', en: 'Support Staff' },

  // Staff roles
  'role.vet': { fi: 'Eläinlääkäri', sv: 'Veterinär', en: 'Veterinarian' },
  'vet.experience': { fi: 'Kokemus', sv: 'Erfarenhet', en: 'Experience' },
  'vet.training': { fi: 'Koulutus', sv: 'Utbildning', en: 'Training' },
  'vet.focus': { fi: 'Painopistealueet', sv: 'Fokusområden', en: 'Special Interests' },
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
    fi: 'Ortopedia, pehmytkudoskirurgia ja hammashoito. Jatkokoulutus AOVET, ESAVS ja Accesia Academy.',
    sv: 'Ortopedi, mjukdelskirurgi och tandvård. Vidareutbildning AOVET, ESAVS och Accesia Academy.',
    en: 'Orthopedics, soft tissue surgery and dentistry. Further training AOVET, ESAVS and Accesia Academy.'
  },
  'bio.assaf': {
    fi: 'Hammashoito, tähystystutkimukset ja luonnonvaraisten eläinten hoito. Accesia Academy.',
    sv: 'Tandvård, endoskopi och vård av vilda djur. Accesia Academy.',
    en: 'Dentistry, endoscopy and wildlife care. Accesia Academy.'
  },
  'bio.nina': {
    fi: 'Kirurgia, hammashoito ja ihotaudit. Farmaseutin koulutus, Accesia Academy ja ESAVS.',
    sv: 'Kirurgi, tandvård och dermatologi. Farmaceutexamen, Accesia Academy och ESAVS.',
    en: 'Surgery, dentistry and dermatology. Pharmacist degree, Accesia Academy and ESAVS.'
  },
  'bio.merja': {
    fi: 'Pehmytkudoskirurgia ja eksoottiset eläimet. Valmistunut 2025 Eesti Maaülikoolista.',
    sv: 'Mjukdelskirurgi och exotiska djur. Examen 2025 från Eesti Maaülikool.',
    en: 'Soft tissue surgery and exotic animals. Graduated 2025 from Eesti Maaülikool.'
  },
  'bio.hanna': {
    fi: 'Sisätaudit, dermatologia ja pehmytkudoskirurgia. Eksoottiset nisäkkäät ja pelkopotilaat.',
    sv: 'Invärtesmedicin, dermatologi och mjukdelskirurgi. Exotiska däggdjur och rädda patienter.',
    en: 'Internal medicine, dermatology and soft-tissue surgery. Exotic mammals and fearful patients.'
  },
  'bio.sanna': {
    fi: 'Ravitsemus ja anestesiavalvonta. Hallinto, tilaukset ja työvuorosuunnittelu.',
    sv: 'Nutrition och anestesiövervakning. Administration, beställningar och schemaplanering.',
    en: 'Nutrition and anesthesia monitoring. Administration, orders and scheduling.'
  },
  'bio.jenni': {
    fi: 'Anestesia ja laboratoriotyö. Anestesian erikoisammattitutkinto (EAT) 2025.',
    sv: 'Anestesi och laboratoriearbete. Specialyrkesexamen i anestesi (EAT) 2025.',
    en: 'Anesthesia and laboratory work. Specialist qualification in anesthesia (EAT) 2025.'
  },
  'bio.meri': {
    fi: 'Klinikkaeläinhoitaja, erityinen kiinnostus kissoihin. Myös hevostenhoitajan tutkinto.',
    sv: 'Klinikdjurskötare, särskilt intresse för katter. Även utbildad hästskötare.',
    en: 'Veterinary nurse with a passion for cats. Also qualified horse caretaker.'
  },
  'bio.susanna': {
    fi: 'Monipuolinen klinikkatyö ja jatkuva kehittyminen.',
    sv: 'Varierande klinikarbete och ständig utveckling.',
    en: 'Diverse clinical work and continuous development.'
  },
  'bio.emilia': {
    fi: 'Anestesia, kirurgiset toimenpiteet ja hammashoito.',
    sv: 'Anestesi, kirurgiska ingrepp och tandvård.',
    en: 'Anesthesia, surgical procedures and dental care.'
  },
  'bio.jennifer': {
    fi: 'Anestesiavalvonta, kirurgia ja eksoottiset potilaat. Opiskelee klinikkaeläinhoitajaksi.',
    sv: 'Anestesiövervakning, kirurgi och exotiska patienter. Studerar till klinikdjurskötare.',
    en: 'Anesthesia monitoring, surgery and exotic patients. Studying to become a veterinary technician.'
  },
  'bio.josefiina': {
    fi: 'Laboratorio- ja leikkaussalityö. Tavoitteena klinikkaeläinhoitajan koulutus.',
    sv: 'Laboratorie- och operationssalsarbete. Mål att utbilda sig till klinikdjurskötare.',
    en: 'Laboratory and operating room work. Aiming to qualify as veterinary nurse.'
  },
  'bio.tiina': {
    fi: 'Kirurgia, ortopedia ja traumahoito. Pitkä kokemus eläinten vapaaehtoistyöstä.',
    sv: 'Kirurgi, ortopedi och traumavård. Lång erfarenhet av frivilligarbete med djur.',
    en: 'Surgery, orthopedics and trauma care. Long experience in animal volunteer work.'
  },

  // Prices
  'prices.title': { fi: 'Hinnasto', sv: 'Prislista', en: 'Price List' },
  'prices.subtitle': {
    fi: 'Hinnat ovat kokonaishintoja. Leikkaukset sisältävät lääkkeet ja tarvikkeet sekä tarvittaessa tikkien poiston.',
    sv: 'Priserna är totalpriser. Kirurgiska ingrepp inkluderar mediciner, förbrukningsmaterial och vid behov borttagning av stygn.',
    en: 'Prices are total amounts. Surgical procedures include medicines, supplies and stitch removal when needed.'
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
  'prices.cat.euthanasia': { fi: 'Eutanasia', sv: 'Eutanasi', en: 'Euthanasia' },

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
  'price.vacc.leptospira': { fi: 'Koiran leptospira', sv: 'Hund leptospira', en: 'Dog leptospira' },

  // Price items - Surgery
  'price.surg.catfemale': { fi: 'Naaraskissan sterilisaatio', sv: 'Honkatt sterilisering', en: 'Female cat spay' },
  'price.surg.catfemale.note': { fi: 'Sis. kaulurin ja kipulääkkeet', sv: 'Inkl. krage och smärtlindring', en: 'Incl. collar and pain medication' },
  'price.surg.catmale': { fi: 'Uroskissan kastraatio', sv: 'Hankatt kastrering', en: 'Male cat neuter' },
  'price.surg.catmale.note': { fi: 'Sis. kipulääkkeet', sv: 'Inkl. smärtlindring', en: 'Incl. pain medication' },
  'price.surg.dogfemale.5': { fi: 'Naaraskoiran sterilisaatio <5kg', sv: 'Tik sterilisering <5kg', en: 'Female dog spay <5kg' },
  'price.surg.dogfemale.20': { fi: 'Naaraskoiran sterilisaatio 5–20kg', sv: 'Tik sterilisering 5–20kg', en: 'Female dog spay 5–20kg' },
  'price.surg.dogfemale.40': { fi: 'Naaraskoiran sterilisaatio 20–40kg', sv: 'Tik sterilisering 20–40kg', en: 'Female dog spay 20–40kg' },
  'price.surg.dogfemale.over40': { fi: 'Naaraskoiran sterilisaatio >40kg', sv: 'Tik sterilisering >40kg', en: 'Female dog spay >40kg' },
  'price.surg.dogmale.10': { fi: 'Uroskoiran kastraatio <10kg', sv: 'Hanhund kastrering <10kg', en: 'Male dog neuter <10kg' },
  'price.surg.dogmale.20': { fi: 'Uroskoiran kastraatio 10–20kg', sv: 'Hanhund kastrering 10–20kg', en: 'Male dog neuter 10–20kg' },
  'price.surg.dogmale.40': { fi: 'Uroskoiran kastraatio 20–40kg', sv: 'Hanhund kastrering 20–40kg', en: 'Male dog neuter 20–40kg' },
  'price.surg.dogmale.over40': { fi: 'Uroskoiran kastraatio >40kg', sv: 'Hanhund kastrering >40kg', en: 'Male dog neuter >40kg' },
  'price.surg.rabbitmale': { fi: 'Uroskanin kastraatio', sv: 'Hankanin kastrering', en: 'Male rabbit neuter' },
  'price.surg.rabbitfemale': { fi: 'Naaraskanin sterilisaatio', sv: 'Honkanin sterilisering', en: 'Female rabbit spay' },
  'price.surg.crypto.inguinal.small': { fi: 'Koiran piilokivesleikkaus, nivusesta <20kg', sv: 'Kryptorkidoperation, inguinal <20kg', en: 'Cryptorchid surgery, inguinal <20kg' },
  'price.surg.crypto.inguinal.large': { fi: 'Koiran piilokivesleikkaus, nivusesta >20kg', sv: 'Kryptorkidoperation, inguinal >20kg', en: 'Cryptorchid surgery, inguinal >20kg' },
  'price.surg.crypto.abdom.small': { fi: 'Koiran piilokivesleikkaus, vatsaontelosta <20kg', sv: 'Kryptorkidoperation, abdominell <20kg', en: 'Cryptorchid surgery, abdominal <20kg' },
  'price.surg.crypto.abdom.large': { fi: 'Koiran piilokivesleikkaus, vatsaontelosta >20kg', sv: 'Kryptorkidoperation, abdominell >20kg', en: 'Cryptorchid surgery, abdominal >20kg' },
  'price.surg.crypto.cat': { fi: 'Kissan piilokivesleikkaus, nivusesta', sv: 'Kryptorkidoperation katt, inguinal', en: 'Cat cryptorchid surgery, inguinal' },
  'price.surg.crypto.cat.abdom': { fi: 'Kissan piilokivesleikkaus, vatsaontelosta', sv: 'Kryptorkidoperation katt, abdominell', en: 'Cat cryptorchid surgery, abdominal' },
  'price.surg.stitch.note': { fi: 'Leikkausten hintaan sisältyy tikkien poisto.', sv: 'Borttagning av stygn ingår i operationspriset.', en: 'Stitch removal is included in the surgery price.' },

  // Price items - Dental
  'price.dental.check': { fi: 'Hampaiden tarkistus hereillä', sv: 'Tandkontroll vaken', en: 'Dental check (awake)' },
  'price.dental.check.note': { fi: 'Hoitotarpeen arviointi', sv: 'Bedömning av vårdbehov', en: 'Treatment needs assessment' },
  'price.dental.catscaling': { fi: 'Hammaskiven poisto kissa', sv: 'Tandstensborttagning katt', en: 'Cat dental scaling' },
  'price.dental.dogsmall': { fi: 'Hammaskiven poisto koira <20kg', sv: 'Tandstensborttagning hund <20kg', en: 'Dog dental scaling <20kg' },
  'price.dental.doglarge': { fi: 'Hammaskiven poisto koira >20kg', sv: 'Tandstensborttagning hund >20kg', en: 'Dog dental scaling >20kg' },

  // Price items - Other
  'price.other.passport': { fi: 'EU-passi', sv: 'EU-pass', en: 'EU Passport' },
  'price.other.passport.combined': { fi: 'EU-passi muun käynnin yhteydessä', sv: 'EU-pass i samband med annat besök', en: 'EU Passport with another visit' },
  'price.other.chip': { fi: 'Mikrosirutus', sv: 'Mikrochipning', en: 'Microchipping' },
  'price.other.chip.combined': { fi: 'Mikrosirutus muun käynnin yhteydessä', sv: 'Mikrochipning i samband med annat besök', en: 'Microchipping with another visit' },
  'price.other.nails': { fi: 'Kynsien lyhennys', sv: 'Kloklippning', en: 'Nail trimming' },
  'price.other.euthcat': { fi: 'Kissa', sv: 'Katt', en: 'Cat' },
  'price.other.euthdog': { fi: 'Eutanasia koira', sv: 'Eutanasi hund', en: 'Euthanasia dog' },

  // Orthopedics prices
  'price.ortho.lameness': { fi: 'Ontumatutkimus', sv: 'Hältundersökning', en: 'Lameness exam' },
  'price.ortho.exam': { fi: 'Ontumatutkimus + röntgentutkimus (nukutettu eläin)', sv: 'Hältundersökning + röntgen (sederat djur)', en: 'Lameness exam + X-ray (sedated animal)' },
  'price.ortho.exam.large': { fi: 'Ontumatutkimus + röntgentutkimus (nukutettu eläin) laaja/iso koira', sv: 'Hältundersökning + röntgen (sederat djur) utökad/stor hund', en: 'Lameness exam + X-ray (sedated) extended/large dog' },
  'price.ortho.fracture': { fi: 'Murtumaleikkaukset', sv: 'Frakturkirurgi', en: 'Fracture surgery' },
  'price.ortho.cruciate.cat': { fi: 'Ristisideleikkaus lateraalisutuura kissa', sv: 'Korsbandsoperation lateral sutur katt', en: 'Cruciate ligament lateral suture cat' },
  'price.ortho.cruciate.dog': { fi: 'Ristisideleikkaus lateraalisutuura koira', sv: 'Korsbandsoperation lateral sutur hund', en: 'Cruciate ligament lateral suture dog' },
  'price.ortho.tta.small': { fi: 'Ristisideleikkaus TTA <20kg', sv: 'Korsbandsoperation TTA <20kg', en: 'Cruciate ligament TTA <20kg' },
  'price.ortho.tta.large': { fi: 'Ristisideleikkaus TTA >20kg', sv: 'Korsbandsoperation TTA >20kg', en: 'Cruciate ligament TTA >20kg' },
  'price.ortho.patella.cat': { fi: 'Patellaluksaatio kissa', sv: 'Patellaluxation katt', en: 'Patellar luxation cat' },
  'price.ortho.patella.dog': { fi: 'Patellaluksaatio koira', sv: 'Patellaluxation hund', en: 'Patellar luxation dog' },
  'price.ortho.femoral.cat': { fi: 'Reisiluunpään poisto kissa', sv: 'Lårbenshuvudresektion katt', en: 'Femoral head ostectomy cat' },
  'price.ortho.femoral.dog': { fi: 'Reisiluunpään poisto koira', sv: 'Lårbenshuvudresektion hund', en: 'Femoral head ostectomy dog' },
  'price.ortho.fracture.price': { fi: 'alk. 1,300 €', sv: 'fr. 1,300 €', en: 'from 1,300 €' },
  'price.ortho.amputation': { fi: 'Amputaatiot yms.', sv: 'Amputationer m.m.', en: 'Amputations etc.' },
  'price.ortho.toe': { fi: 'Varvasamputaatio', sv: 'Tåamputation', en: 'Toe amputation' },
  'price.ortho.tail': { fi: 'Häntäamputaatio', sv: 'Svansamputation', en: 'Tail amputation' },
  'price.ortho.contact': { fi: 'Ota yhteyttä', sv: 'Kontakta oss', en: 'Contact us' },
  'price.ortho.cruciate.note': {
    fi: 'Lateraalisutuura sopii kissojen ja pienten koirien ristisidevaurioiden hoitoon. Aktiivisesti harrastaville tai suurille koirille sopii paremmin TTA-menetelmä.',
    sv: 'Lateral sutur lämpar sig för behandling av korsbandsskador hos katter och små hundar. För aktiva eller stora hundar passar TTA-metoden bättre.',
    en: 'Lateral suture is suitable for cruciate ligament injuries in cats and small dogs. For active or large dogs, the TTA method is more appropriate.'
  },

  // Dental prices
  'price.dental.xray': { fi: 'Hammasröntgen hammashoidon yhteydessä', sv: 'Tandröntgen i samband med tandvård', en: 'Dental X-ray during dental treatment' },
  'price.dental.milk12': { fi: 'Maitohampaan poisto 1–2 hammasta', sv: 'Mjölktandsextraktion 1–2 tänder', en: 'Milk tooth extraction 1–2 teeth' },
  'price.dental.milk34': { fi: 'Maitohampaan poisto 3–4 hammasta', sv: 'Mjölktandsextraktion 3–4 tänder', en: 'Milk tooth extraction 3–4 teeth' },
  'price.dental.large.surcharge': { fi: 'Lisämaksu koira >40kg', sv: 'Tillägg hund >40kg', en: 'Surcharge dog >40kg' },
  'price.dental.extraction.note': {
    fi: 'Hampaiden poistot tehdään kliinisen tutkimuksen ja röntgenkuvien perusteella. Hinta riippuu käytetystä ajasta ja hampaan/ikenen kunnosta.',
    sv: 'Tandextraktioner utförs baserat på klinisk undersökning och röntgenbilder. Priset beror på tidsåtgång och tandens/tandköttets skick.',
    en: 'Extractions are performed based on clinical examination and X-rays. Price depends on time required and tooth/gum condition.'
  },
  'price.dental.info.note': { fi: 'Lisätietoa ja hinta-arviot suoraan klinikalta.', sv: 'Mer information och prisuppskattningar direkt från kliniken.', en: 'More information and price estimates directly from the clinic.' },

  // Pregnancy prices
  'price.preg.ultrasound': { fi: 'Tiineysultraääni', sv: 'Dräktighetsultraljud', en: 'Pregnancy ultrasound' },
  'price.preg.xray': { fi: 'Tiineysröntgen', sv: 'Dräktighetsröntgen', en: 'Pregnancy X-ray' },

  // Official examination prices
  'price.official.hip.small': { fi: 'Lonkkakuvat <20kg', sv: 'Höftröntgen <20kg', en: 'Hip X-ray <20kg' },
  'price.official.hip.medium': { fi: 'Lonkkakuvat 20–40kg', sv: 'Höftröntgen 20–40kg', en: 'Hip X-ray 20–40kg' },
  'price.official.hip.large': { fi: 'Lonkkakuvat >40kg', sv: 'Höftröntgen >40kg', en: 'Hip X-ray >40kg' },
  'price.official.elbow': { fi: 'Kyynärnivelkuvat lonkkakuvien yhteydessä', sv: 'Armbågsröntgen i samband med höftröntgen', en: 'Elbow X-ray with hip X-rays' },
  'price.official.spine': { fi: 'Selkäkuvat', sv: 'Ryggröntgen', en: 'Spine X-ray' },
  'price.official.package.small': { fi: 'Lonkka-, kyynär- ja selkäkuvat <40kg / maks. 3 selkäkuvaa', sv: 'Höft-, armbågs- och ryggröntgen <40kg / max 3 ryggbilder', en: 'Hip, elbow and spine X-rays <40kg / max 3 spine images' },
  'price.official.package.large': { fi: 'Lonkka-, kyynär- ja selkäkuvat >40kg / monta selkäkuvaa', sv: 'Höft-, armbågs- och ryggröntgen >40kg / flera ryggbilder', en: 'Hip, elbow and spine X-rays >40kg / multiple spine images' },
  'price.official.knee': { fi: 'Polvitarkastus', sv: 'Knäundersökning', en: 'Knee exam' },
  'price.official.knee.combined': { fi: 'Polvitarkastus muun käynnin yhteydessä', sv: 'Knäundersökning i samband med annat besök', en: 'Knee exam with another visit' },
  'price.official.heart': { fi: 'Sydänauskultaatio', sv: 'Hjärtauskultation', en: 'Heart auscultation' },
  'price.official.heart.combined': { fi: 'Sydänauskultaatio muun käynnin yhteydessä', sv: 'Hjärtauskultation i samband med annat besök', en: 'Heart auscultation with another visit' },

  // Endoscopy prices
  'price.endo.earflush': { fi: 'Korvahuuhtelu (video-otoskooppinen)', sv: 'Öronspolning (video-otoskopisk)', en: 'Ear flushing (video-otoscopic)' },
  'price.endo.rhinoscopy': { fi: 'Rhinoskopia', sv: 'Rinoskopi', en: 'Rhinoscopy' },
  'price.endo.gi': { fi: 'Ruoansulatuskanavan ja keuhkojen tähystys', sv: 'Endoskopi av mag-tarmkanal och lungor', en: 'GI tract and lung endoscopy' },
  'price.endo.gi.contact': { fi: 'Ota yhteyttä', sv: 'Kontakta oss', en: 'Contact us' },

  // Cardiac prices
  'price.cardiac.official.small': { fi: 'Koiran virallinen sydämen ultraäänitutkimus <40kg', sv: 'Officiell hjärtultraljudsundersökning hund <40kg', en: 'Official canine cardiac ultrasound examination <40kg' },
  'price.cardiac.official.large': { fi: 'Koiran virallinen sydämen ultraäänitutkimus >40kg', sv: 'Officiell hjärtultraljudsundersökning hund >40kg', en: 'Official canine cardiac ultrasound examination >40kg' },
  'price.cardiac.ultrasound': { fi: 'Sydämen ultraäänitutkimus', sv: 'Hjärtultraljudsundersökning', en: 'Heart ultrasound examination' },
  'price.cardiac.auscultation': { fi: 'Virallinen sydänauskultaatio', sv: 'Officiell hjärtauskultation', en: 'Official heart auscultation' },
  'price.cardiac.auscultation.combined': {
    fi: 'Virallinen sydänauskultaatio muun käynnin yhteydessä',
    sv: 'Officiell hjärtauskultation i samband med annat besök',
    en: 'Official heart auscultation with another visit'
  },

  // Other prices
  'price.other.catgrooming': { fi: 'Kissan turkinhuolto nukutettuna', sv: 'Kattpälsvård under sedering', en: 'Cat grooming under sedation' },
  'price.other.euthdog.small': { fi: 'Koira <20kg', sv: 'Hund <20kg', en: 'Dog <20kg' },
  'price.other.euthdog.medium': { fi: 'Koira 20–40kg', sv: 'Hund 20–40kg', en: 'Dog 20–40kg' },
  'price.other.euthdog.large': { fi: 'Koira >40kg', sv: 'Hund >40kg', en: 'Dog >40kg' },
  'price.other.euthrodent': { fi: 'Jyrsijät/kanit', sv: 'Gnagare/kaniner', en: 'Rodents/rabbits' },

  'prices.note': {
    fi: 'Alle 24 tuntia ennen vastaanottoaikaa peruutetuista ajoista veloitamme 30–100 €.',
    sv: 'Avbokning mindre än 24 timmar före besöket debiteras 30–100 €.',
    en: 'Cancellations less than 24 hours before the appointment are charged 30–100 €.'
  },
  'prices.rights': {
    fi: 'Pidätämme oikeuden hinnanmuutoksiin.',
    sv: 'Vi förbehåller oss rätten att ändra priserna.',
    en: 'We reserve the right to change prices.'
  },
  'prices.payment': {
    fi: 'Voit maksaa myös laskulla tai osamaksulla — ota yhteyttä, niin kerromme lisää!',
    sv: 'Du kan även betala med faktura eller på avbetalning — kontakta oss för mer info!',
    en: 'You can also pay by invoice or in installments — contact us for more info!'
  },
  'prices.insurance': {
    fi: 'Suorakorvaus: Lähitapiola, Agria, Pohjola',
    sv: 'Direktersättning: LokalTapiola, Agria, Pohjola',
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
    fi: 'Eläinklinikka Saari tekee yhteistyötä Nordic Wildlife Care -villieläinhoitolan kanssa. Vapaaehtoistyömme on maksutonta.',
    sv: 'Djurkliniken Saari samarbetar med Nordic Wildlife Care. Vårt frivilligarbete är kostnadsfritt.',
    en: 'Animal Clinic Saari cooperates with Nordic Wildlife Care. Our volunteer work is free of charge.'
  },
  'wildlife.text2': {
    fi: 'Tarjoamme diagnostiikka- ja hoitopalveluja loukkaantuneille villieläimille. Eläimet saavat ensihoitoa klinikallamme ennen siirtoa kuntoutuskeskukseen, ja tavoitteena on vapauttaa ne takaisin luontoon.',
    sv: 'Vi erbjuder diagnostik och behandling för skadade vilda djur. Djuren får akutvård innan de överförs till rehabiliteringscenter, med målet att släppa ut dem i naturen igen.',
    en: 'We provide diagnostic and treatment services for injured wild animals. Animals receive initial care before transfer to rehabilitation centers, with the goal of releasing them back into nature.'
  },
  'wildlife.donate': {
    fi: 'Voit tukea villieläinhoitolaa lahjoittamalla Nordic Wildlife Carelle',
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
    sv: 'Viltdjursbild',
    en: 'Wildlife photo'
  },
  'wildlife.morelink': {
    fi: 'Lue villieläinpotilaiden tarinoita →',
    sv: 'Läs vilda patienters berättelser →',
    en: 'Read wildlife patient stories →'
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
    en: 'Professional service with a focus on animal wellbeing!'
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
  'contact.hours.weekdays.time': { fi: '7:45–17:00', sv: '7:45–17:00', en: '7:45 AM–5:00 PM' },
  'contact.hours.weekends': { fi: 'La–Su', sv: 'Lör–Sön', en: 'Sat–Sun' },
  'contact.hours.weekends.time': { fi: 'Suljettu', sv: 'Stängt', en: 'Closed' },
  'contact.book': { fi: 'Varaa aika verkossa', sv: 'Boka tid online', en: 'Book Online' },

  // Footer
  'footer.description': {
    fi: 'Vaasan ainoa perheomisteinen pieneläinklinikka. Korkeatasoista eläinlääkäripalvelua vuodesta 1989 — viisi eläinlääkäriä ja kahdeksan hoitajaa palveluksessasi.',
    sv: 'Vasas enda familjeägda smådjursklinik. Högklassig veterinärvård sedan 1989 – fem veterinärer och åtta djurskötare till din tjänst.',
    en: 'The only family-owned small animal clinic in Vaasa. High-quality veterinary care since 1989 – five veterinarians and eight technicians at your service.'
  },
  'footer.quicklinks': { fi: 'Pikalinkit', sv: 'Snabblänkar', en: 'Quick Links' },
  'footer.contact': { fi: 'Yhteystiedot', sv: 'Kontakt', en: 'Contact' },
  'footer.follow': { fi: 'Seuraa meitä', sv: 'Följ oss', en: 'Follow Us' },
  'footer.privacy': { fi: 'Tietosuoja', sv: 'Integritetspolicy', en: 'Privacy Policy' },
  'footer.rights': { fi: 'Kaikki oikeudet pidätetään.', sv: 'Alla rättigheter förbehållna.', en: 'All rights reserved.' },
  'footer.about': { fi: 'Meistä', sv: 'Om oss', en: 'About Us' },
  'footer.contactpage': { fi: 'Yhteystiedot', sv: 'Kontakt', en: 'Contact' },
  'footer.reviews': { fi: 'Arvostelut', sv: 'Omdömen', en: 'Reviews' },
  'footer.booking': { fi: 'Ajanvaraus', sv: 'Tidsbokning', en: 'Book appointment' },
  'footer.articles': { fi: 'Artikkelit', sv: 'Artiklar', en: 'Articles' },
  'footer.media': { fi: 'Saari mediassa', sv: 'Saari i media', en: 'Saari in the news' },
  'footer.businessid': { fi: 'Y-tunnus', sv: 'FO-nummer', en: 'Business ID' },

  // Privacy Policy
  'privacy.title': { fi: 'Tietosuojaseloste', sv: 'Integritetspolicy', en: 'Privacy Policy' },
  'privacy.controller.title': { fi: 'Rekisterinpitäjä', sv: 'Personuppgiftsansvarig', en: 'Data Controller' },
  'privacy.contact.title': { fi: 'Rekisteriasioiden yhteyshenkilö', sv: 'Kontaktperson för registerfrågor', en: 'Contact Person for Registry Matters' },
  'privacy.name.title': { fi: 'Rekisterin nimi', sv: 'Registrets namn', en: 'Registry Name' },
  'privacy.name.text': { fi: 'Eläinklinikka Saari Oy:n asiakasrekisteri', sv: 'Eläinklinikka Saari Oy:s kundregister', en: 'Eläinklinikka Saari Oy Customer Registry' },
  'privacy.purpose.title': { fi: 'Henkilötietojen käyttötarkoitus', sv: 'Syfte med behandling av personuppgifter', en: 'Purpose of Personal Data Processing' },
  'privacy.purpose.text': { fi: 'Henkilötietoja käytetään viestintään, asiakaspalveluun ja hoitosuhteen ylläpitoon.', sv: 'Personuppgifter används för kommunikation, kundservice och upprätthållande av patientrelationer.', en: 'Personal data is used for communication, customer service and maintaining patient relationships.' },
  'privacy.basis.title': { fi: 'Käsittelyn oikeusperuste', sv: 'Rättslig grund för behandling', en: 'Legal Basis for Processing' },
  'privacy.basis.text': { fi: 'Henkilötietojen käsittely perustuu sopimussuhteeseen (eläinlääkäripalveluiden tarjoaminen) sekä lakisääteisiin velvoitteisiin (eläinlääkintähuoltolaki, kirjanpitolaki). Erämaksun yhteydessä käsittely perustuu oikeutettuun etuun.', sv: 'Behandlingen av personuppgifter grundar sig på avtalsförhållande (tillhandahållande av veterinärtjänster) samt lagstadgade skyldigheter (lagen om veterinärvård, bokföringslagen). Vid delbetalning grundar sig behandlingen på berättigat intresse.', en: 'Processing of personal data is based on contractual relationship (provision of veterinary services) and legal obligations (Veterinary Care Act, Accounting Act). For installment payments, processing is based on legitimate interest.' },
  'privacy.data.title': { fi: 'Rekisterin tietokentät', sv: 'Registrets datafält', en: 'Registry Data Fields' },
  'privacy.data.text': { fi: 'Potilaan tiedot ja omistajan nimi, puhelinnumero, osoite ja sähköpostiosoite. Asiakkaiden sosiaaliturvatunnus vain jos käyttää erämaksua. Potilaan hoitohistoria: toimenpiteet, asiakasviestintä ja hoitosuunnitelmat. Vakuutusnumero tarvittaessa.', sv: 'Patientuppgifter och ägarens namn, telefonnummer, adress och e-postadress. Kundens personnummer registreras endast vid delbetalning. Patientens vårdhistorik: åtgärder, kundkommunikation och behandlingsplaner. Försäkringsnummer vid behov.', en: 'Patient information and owner\'s name, phone number, address and email. Customer\'s social security number only if using installment payment. Patient treatment history: procedures, customer communications and treatment plans. Insurance number when applicable.' },
  'privacy.sources.title': { fi: 'Tietolähteet', sv: 'Datakällor', en: 'Data Sources' },
  'privacy.sources.text': { fi: 'Tiedot saadaan pääasiassa asiakkailta. Potilasasiakirjat voivat sisältää tietoja muista klinikoista, mikäli asiakas on saanut hoitoa muualla tai siirtänyt asiakkuutensa.', sv: 'Uppgifterna erhålls främst från kunderna. Patientjournaler kan innehålla information från andra kliniker om kunden har fått vård på annat håll eller överfört sin kundrelation.', en: 'Information comes primarily from customers. Patient records may include information from other clinics if the customer received treatment elsewhere or transferred their account.' },
  'privacy.sharing.title': { fi: 'Tietojen luovutus', sv: 'Utlämnande av uppgifter', en: 'Data Sharing' },
  'privacy.sharing.text': { fi: 'Tietoja luovutetaan vain asiantuntijoille (eläinlääkärit) konsultaatiotapauksissa (nimi, osoite, potilastiedot, löydökset). Muutoin tietoja ei luovuteta kolmansille osapuolille, ellei asiakas sitä nimenomaisesti pyydä.', sv: 'Uppgifter lämnas ut enbart till specialister (veterinärer) vid konsultationsfall (namn, adress, patientuppgifter, fynd). I övrigt lämnas uppgifter inte ut till tredje part såvida kunden inte begär det.', en: 'Information is shared only with specialists (veterinarians) in consultation cases (name, address, patient data, findings). Otherwise, data is not disclosed to third parties unless the customer specifically requests it.' },
  'privacy.security.title': { fi: 'Tietojen suojaus', sv: 'Dataskydd', en: 'Data Security' },
  'privacy.security.text': { fi: 'Rekisteri on tallennettu salasanasuojattuun asiakkuudenhallintajärjestelmään, johon on pääsy ainoastaan Eläinklinikka Saari Oy:n valtuuttamilla henkilökunnan jäsenillä.', sv: 'Registret lagras i ett lösenordsskyddat kundhanteringssystem som är tillgängligt för Eläinklinikka Saari Oy:s behöriga personalmedlemmar.', en: 'The registry is stored in a password-protected customer management system accessible to authorized staff members of Eläinklinikka Saari Oy.' },
  'privacy.retention.title': { fi: 'Tietojen säilytysaika', sv: 'Lagringstid för uppgifter', en: 'Data Retention Period' },
  'privacy.retention.text': { fi: 'Potilasasiakirjoja säilytetään vähintään 3 vuotta viimeisestä hoitokäynnistä eläinlääkintälainsäädännön mukaisesti. Kirjanpitoaineistoa säilytetään 6 vuotta tilikauden päättymisestä. Muut henkilötiedot poistetaan, kun asiakassuhde päättyy eikä säilyttämiselle ole lakisääteistä perustetta.', sv: 'Patientjournaler bevaras i minst 3 år från senaste besöket enligt veterinärlagstiftningen. Bokföringsmaterial bevaras i 6 år efter räkenskapsperiodens slut. Övriga personuppgifter raderas när kundrelationen upphör och det inte finns lagstadgad grund för lagring.', en: 'Patient records are retained for at least 3 years from the last visit as required by veterinary legislation. Accounting records are retained for 6 years after the end of the financial year. Other personal data is deleted when the customer relationship ends and there is no legal basis for retention.' },
  'privacy.rights.title': { fi: 'Rekisteröidyn oikeudet', sv: 'Den registrerades rättigheter', en: 'Individual Rights' },
  'privacy.rights.text': { fi: 'Asiakkaalla on oikeus tarkistaa itseään koskevat tiedot sekä pyytää virheellisten, tarpeettomien, puutteellisten tai vanhentuneiden tietojen korjaamista tai poistamista.', sv: 'Kunden har rätt att granska sina personuppgifter samt begära rättelse eller radering av felaktiga, onödiga, ofullständiga eller föråldrade uppgifter.', en: 'Customers have the right to inspect their personal data and request correction or deletion of inaccurate, unnecessary, incomplete or outdated information.' },
  'privacy.rights.full.title': { fi: 'Tarkemmat oikeudet (EU:n yleinen tietosuoja-asetus)', sv: 'Detaljerade rättigheter (EU:s allmänna dataskyddsförordning)', en: 'Detailed Rights (EU General Data Protection Regulation)' },
  'privacy.rights.full.text': { fi: 'Rekisteröidyllä on oikeus: (1) saada pääsy omiin tietoihinsa, (2) vaatia tietojen oikaisua, (3) vaatia tietojen poistamista, ellei säilyttämiselle ole lakisääteistä perustetta, (4) rajoittaa tietojen käsittelyä, (5) siirtää tiedot toiselle rekisterinpitäjälle (tietojen siirrettävyys), (6) vastustaa tietojen käsittelyä. Pyynnöt tulee osoittaa rekisteriasioiden yhteyshenkilölle. Rekisteröidyllä on myös oikeus tehdä valitus valvontaviranomaiselle: Tietosuojavaltuutetun toimisto, tietosuoja.fi.', sv: 'Den registrerade har rätt att: (1) få tillgång till sina uppgifter, (2) kräva rättelse av uppgifter, (3) kräva radering av uppgifter om det inte finns lagstadgad grund för lagring, (4) begränsa behandlingen av uppgifter, (5) överföra uppgifter till en annan personuppgiftsansvarig (dataportabilitet), (6) invända mot behandling av uppgifter. Förfrågningar ska riktas till kontaktpersonen för registerfrågor. Den registrerade har också rätt att lämna in klagomål till tillsynsmyndigheten: Dataombudsmannens byrå, tietosuoja.fi.', en: 'The data subject has the right to: (1) access their data, (2) request rectification, (3) request erasure unless there is a legal basis for retention, (4) restrict processing, (5) data portability, (6) object to processing. Requests should be addressed to the contact person for registry matters. The data subject also has the right to lodge a complaint with the supervisory authority: Office of the Data Protection Ombudsman, tietosuoja.fi.' },
  'privacy.digital.title': { fi: 'Digitaaliset palvelut', sv: 'Digitala tjänster', en: 'Digital Services' },
  'privacy.digital.text': { fi: 'Verkkosivusto käyttää Google Analytics -palvelua kävijäliikenteen analysointiin. Analytiikkaevästeet otetaan käyttöön vain käyttäjän suostumuksella. Ajanvaraus tapahtuu ProvetCloud-järjestelmän kautta, jonka tietosuojasta vastaa Finnish Net Solutions Oy. WhatsApp-viestipalvelussa viestejä käsittelee tekoälypohjainen chatbot asiakaspalvelun tueksi.', sv: 'Webbplatsen använder Google Analytics för att analysera besökstrafiken. Analyticscookies aktiveras endast med användarens samtycke. Tidsbokning sker via ProvetCloud-systemet, vars dataskydd ansvaras av Finnish Net Solutions Oy. I WhatsApp-meddelandetjänsten behandlas meddelanden av en AI-baserad chatbot som stöd för kundservicen.', en: 'The website uses Google Analytics to analyze visitor traffic. Analytics cookies are only enabled with user consent. Appointments are booked through the ProvetCloud system, whose data protection is managed by Finnish Net Solutions Oy. In the WhatsApp messaging service, messages are processed by an AI-powered chatbot to support customer service.' },
  'privacy.credit.title': { fi: 'Luottopäätöksen käsittely', sv: 'Kreditbeslut', en: 'Credit Processing' },
  'privacy.credit.text': { fi: 'Lindorff Invest Oy toimii rekisterinpitäjänä maksuhakemusten käsittelyssä. Henkilötiedot ovat välttämättömiä hakemuksen käsittelyyn, luottopäätökseen ja asiakassuhteen hoitoon. Automaattisia luottopäätöksiä voi kiistää ja pyytää manuaalista käsittelyä ottamalla yhteyttä Lindorffin asiakaspalveluun, puh. 02 2700 327. Lisätietoja: lindorff.fi/tietosuoja.', sv: 'Lindorff Invest Oy fungerar som personuppgiftsansvarig vid behandling av betalningsansökningar. Personuppgifter är nödvändiga för ansökningsbehandling, kreditbeslut och kundrelationshantering. Automatiserade kreditbeslut kan bestridas; kunden kan begära manuell granskning genom att kontakta Lindorffs kundtjänst, tfn 02 2700 327. Mer information: lindorff.fi/tietosuoja.', en: 'Lindorff Invest Oy acts as data controller for payment application processing. Personal data is necessary for application handling, credit decisions and customer relationship management. Automated credit decisions can be contested; customers may request manual review by contacting Lindorff customer service at 02 2700 327. More information: lindorff.fi/tietosuoja.' },
  'privacy.back': { fi: '← Takaisin etusivulle', sv: '← Tillbaka till startsidan', en: '← Back to homepage' },

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
  'articles.search.placeholder': { fi: 'Hae artikkeleista...', sv: 'Sök i artiklar...', en: 'Search articles...' },
  'articles.search.noresults': { fi: 'Ei hakutuloksia', sv: 'Inga sökresultat', en: 'No results found' },
  'articles.print': { fi: 'Tulosta', sv: 'Skriv ut', en: 'Print' },
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
    fi: 'TTA-leikkauksessa sääriluun kyhmyä (tuberositas tibiae) siirretään eteenpäin ja kiinnitetään titaanisella levyllä, ruuveilla ja välikappaleella. Tämä muuttaa patellajänteen kulmaa suhteessa sääriluun yläpintaan noin 90 asteeseen, jolloin polvinivelen poikkeava liikkuvuus (cranial tibial thrust) neutraloituu. Koiran polvi stabiloituu toiminnallisesti ilman keinotekoista sidettä.',
    sv: 'Vid TTA-kirurgi flyttas skenbenets utskott (tuberositas tibiae) framåt och fixeras med en titanplatta, skruvar och distans. Detta ändrar patella senans vinkel i förhållande till skenbenets övre yta till cirka 90 grader, vilket neutraliserar de dragkrafter (cranial tibial thrust) som verkar på knäleden. Hundens knä stabiliseras funktionellt utan ett konstgjort ligament.',
    en: 'In TTA surgery, the tibial tuberosity is advanced forward and secured with a titanium plate, screws and spacer. This changes the angle of the patellar tendon relative to the tibial plateau to approximately 90 degrees, neutralizing the shear forces (cranial tibial thrust) acting on the knee joint. The dog\'s knee is functionally stabilized without an artificial ligament.'
  },
  'article.tta.vs.title': {
    fi: 'TTA vai lateral suture?',
    sv: 'TTA eller lateral sutur?',
    en: 'TTA or Lateral Suture?'
  },
  'article.tta.vs.text': {
    fi: 'Klinikallamme käytämme kahta eri menetelmää eturistisiteen korjaukseen. Lateral suture -tekniikka stabiloi polvinivelen synteettisellä tukimateriaalilla, joka jäljittelee ristisiteen toimintaa. TTA sen sijaan muuttaa polven biomekaniikkaa pysyvästi. Lateral suture sopii pienille koirille sekä kissoille, kun taas TTA on hyvä vaihtoehto aktiivisille ja suuremmille koirille.',
    sv: 'På kliniken använder vi två olika metoder för korsbandsskadereparation. Lateral sutur-teknik stabiliserar knäleden med syntetiskt stödmaterial som efterliknar korsbandets funktion. TTA förändrar däremot knäets biomekanik permanent. Lateral sutur passar för små hundar samt katter, medan TTA är ett bra alternativ särskilt för aktiva och större hundar.',
    en: 'At our clinic we use two methods for cruciate ligament repair. The lateral suture technique stabilizes the knee joint with synthetic support material that mimics the function of the ligament. TTA, on the other hand, permanently alters knee biomechanics. Lateral suture is suitable for small dogs and cats, while TTA is a good option especially for active and larger dogs.'
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
    fi: 'Kuten kaikkiin leikkauksiin, myös TTA:han liittyy komplikaatioiden riskejä, kuten infektio, implantin löystyminen, luun hitaampi paraneminen tai kierukkavaurio (noin 9–10 % tapauksista). Komplikaatioriski pienenee kirurgin kokemuksen myötä. Klinikallamme valvomme anestesiaa tarkasti ja käytämme kattavaa kivunlievitystä kaikissa ortopedisissä leikkauksissa.',
    sv: 'Som vid alla operationer finns risk för komplikationer vid TTA: infektioner, implantat lossning, långsammare benläkning eller meniskskada (cirka 9–10 % av fallen). Komplikationsrisken minskar med kirurgens erfarenhet. På kliniken övervakar vi anestesin noggrant och använder omfattande smärtlindring vid alla ortopediska ingrepp.',
    en: 'As with all surgeries, TTA carries a risk of complications: infection, implant loosening, slower bone healing, or meniscal injury (approximately 9–10% of cases). Complication risk decreases with surgeon experience. At our clinic we closely monitor anesthesia and provide comprehensive pain management for all orthopedic procedures.'
  },
  'article.tta.when.title': {
    fi: 'Milloin kannattaa ottaa yhteyttä?',
    sv: 'När bör du kontakta oss?',
    en: 'When Should You Contact Us?'
  },
  'article.tta.when.text': {
    fi: 'Jos koirasi ontuu takajalkaansa, välttelee rasitusta tai on jäykän oloinen levon jälkeen, ristisidevaurio on yleinen syy. Varhainen diagnoosi ja hoito parantavat ennustetta merkittävästi. Varaa aika ortopediseen tutkimukseen — arvioimme tilanteen ja tarvittaessa suosittelemme koirallesi parhaiten sopivan leikkausmenetelmän.',
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
    fi: 'Korvatulehdukset ovat yksi yleisimmistä syistä eläinlääkäri käynneille. Tavallisella otoskoopilla näkeminen rajoittuu korvakäytävän ulko-osiin, mutta video-otoskopia tuo aivan uuden tason diagnostiikkaan ja hoitoon. Menetelmässä korvakäytävään viedään ohut, kiinteä tähystin, jonka kärjessä on teräväpiirtokamera ja kirkas valo — kuva heijastetaan suurennettuna monitorille reaaliajassa.',
    sv: 'Öroninflammationer är en av de vanligaste orsakerna till veterinärbesök. Med ett vanligt otoskop begränsas sikten till hörselgångens yttre delar, men video-otoskopi ger en helt ny nivå av diagnostik och behandling. Metoden innebär att ett tunt, styvt endoskop med en högupplöst kamera och starkt ljus förs in i hörselgången — bilden förstoras och framställs på en monitor i realtid.',
    en: 'Ear infections are one of the most common reasons for veterinary visits. With a traditional otoscope, visibility is limited to the outer parts of the ear canal, but video-otoscopy brings an entirely new level of diagnostics and treatment. The method uses a thin, rigid endoscope with a high-definition camera and bright light inserted into the ear canal — the image is projected magnified onto a monitor in real time.'
  },
  'article.otoscopy.advantages.title': {
    fi: 'Miksi video-otoskopia?',
    sv: 'Varför video-otoskopi?',
    en: 'Why Video-Otoscopy?'
  },
  'article.otoscopy.advantages.text': {
    fi: 'Perinteiseen otoskooppiin verrattuna video-otoskopia tarjoaa merkittävästi paremman näkyvyyden ja valaistuksen, mahdollistaen koko korvakäytävän ja tärykalvon tarkan tarkastelun. Tähystimen kautta voidaan samanaikaisesti käyttää erikoistyökaluja: huuhtelukatetreja, harjoja, biopsiapihtejä ja imulaitteita. Näin diagnoosi ja hoito tapahtuvat samassa toimenpiteessä.',
    sv: 'Jämfört med ett traditionellt otoskop erbjuder video-otoskopi betydligt bättre förstoring och belysning, vilket möjliggör noggrann granskning av hela hörselgången och trumhinnan. Genom endoskopet kan man samtidigt använda specialverktyg: spolkatetrar, borstar, biopsitänger och sugapparater. Diagnos och behandling sker på så vis i samma ingrepp.',
    en: 'Compared to a traditional otoscope, video-otoscopy offers significantly better magnification and illumination, enabling detailed examination of the entire ear canal and tympanic membrane. Through the endoscope, specialized tools can be used simultaneously: flushing catheters, brushes, biopsy forceps and suction devices. This way diagnosis and treatment happen in the same procedure.'
  },
  'article.otoscopy.when.title': {
    fi: 'Milloin video-otoskopiaa suositellaan?',
    sv: 'När rekommenderas video-otoskopi?',
    en: 'When Is Video-Otoscopy Recommended?'
  },
  'article.otoscopy.when.text': {
    fi: 'Video-otoskopia on erityisen hyödyllinen kroonisissa korvatulehduksissa, jotka eivät reagoi tavanomaiseen lääkehoitoon. Tyypillisiä syitä tutkimukseen ovat toistuva korvatulehdus, epäilys vierasesineestä (esim. heinänkorsi korvakäytävässä), polyypit tai kasvaimet korvakäytävässä, epäily tärykalvon vaurioista sekä välikorvan tulehdus.',
    sv: 'Video-otoskopi är särskilt användbart vid kroniska öroninflammationer som inte svarar på konventionell medicinsk behandling. Typiska indikationer är återkommande öroninflammation, misstanke om främmande föremål (t.ex. grässtrå i hörselgången), polyper eller tumörer i hörselgången, misstänkt trumhinne skada, samt mellanöreinflammation.',
    en: 'Video-otoscopy is especially useful for chronic ear infections that do not respond to conventional medical treatment. Typical indications include recurrent ear infections, suspected foreign bodies (e.g. grass awns in the ear canal), polyps or tumors in the ear canal, suspected tympanic membrane damage, and middle ear infections.'
  },
  'article.otoscopy.procedure.title': {
    fi: 'Miten toimenpide etenee?',
    sv: 'Hur går ingreppet till?',
    en: 'How Does the Procedure Work?'
  },
  'article.otoscopy.procedure.text': {
    fi: 'Video-otoskopia tehdään yleisanestesiassa, koska korvakäytävä on herkkä ja potilaan on pysyttävä täysin liikkumatta. Eläinlääkäri vie tähystimen varovasti korvakäytävään ja tutkii sen koko pituudelta monitorin avulla. Korvakäytävä huuhdellaan perusteellisesti — lika, erite ja biofilmi poistetaan. Tarvittaessa otetaan näytteitä bakteeriviljelyä varten, poistetaan vierasesineitä tai polyypeja, tai tehdään myringotomia (tärykalvon avaus) välikorvan tutkimiseksi ja hoitamiseksi.',
    sv: 'Video-otoskopi utförs under generell anestesi eftersom hörselgången är känslig och patienten måste ligga helt stilla. Veterinären för försiktigt in endoskopet i hörselgången och undersöker hela dess längd på monitorn. Hörselgången spolas noggrant — smuts, sekret och biofilm avlägsnas. Vid behov tas prover för bakterieodling, främmande föremål eller polyper avlägsnas, eller en myringotomi (öppning av trumhinnan) utförs för att undersöka och behandla mellanörat.',
    en: 'Video-otoscopy is performed under general anesthesia because the ear canal is sensitive and the patient must remain completely still. The veterinarian carefully guides the endoscope into the ear canal and examines its full length on the monitor. The ear canal is thoroughly flushed — debris, discharge and biofilm are removed. If needed, samples are collected for bacterial culture, foreign bodies or polyps are removed, or a myringotomy (opening of the tympanic membrane) is performed to examine and treat the middle ear.'
  },
  'article.otoscopy.chronic.title': {
    fi: 'Krooninen korvatulehdus ja sen haasteet',
    sv: 'Kronisk öroninflammation och dess utmaningar',
    en: 'Chronic Ear Infections and Their Challenges'
  },
  'article.otoscopy.chronic.text': {
    fi: 'Krooninen korvatulehdus on yleinen erityisesti luppakorvaisilla koiraroduilla ja allergisilla koirilla. Pitkittynyt tulehdus voi johtaa korvakäytävän ahtautumiseen, biofilmin muodostumiseen ja resistenttien bakteerien kasvuun. Video-otoskopia mahdollistaa perusteellisen syväpuhdistuksen, jossa haitallisia bakteereja suojaava biofilmi poistetaan mekaanisesti. Puhdistuksen jälkeen korvaan voidaan annostella lääkettä suoraan tulehdusalueelle.',
    sv: 'Kronisk öroninflammation är särskilt vanlig hos hundraser med hängande öron och hos allergiska hundar. Långvarig inflammation kan leda till att hörselgången smalnar av, biofilm bildas och resistenta bakterier växer till. Video-otoskopi möjliggör grundlig djuprengöring där biofilmen som skyddar bakterierna avlägsnas mekaniskt. Efter rengöringen kan medicin appliceras direkt på det inflammerade området.',
    en: 'Chronic ear infection is especially common in floppy-eared dog breeds and allergic dogs. Prolonged inflammation can lead to narrowing of the ear canal, biofilm formation, and growth of resistant bacteria. Video-otoscopy enables thorough deep cleaning where the biofilm protecting bacteria is mechanically removed. After cleaning, medication can be applied directly to the inflamed area.'
  },
  'article.otoscopy.contact.title': {
    fi: 'Milloin kannattaa ottaa yhteyttä?',
    sv: 'När bör du kontakta oss?',
    en: 'When Should You Contact Us?'
  },
  'article.otoscopy.contact.text': {
    fi: 'Jos lemmikkisi raapii korviaan toistuvasti, korvista tulee pahaa hajua tai eritettä, lemmikki pitää päätä kallellaan, tai korvatulehdus palaa aina uudelleen hoidosta huolimatta — video-otoskopia voi olla avain ongelman ratkaisemiseen. Varaa aika tutkimukseen, niin selvitämme tilanteen ja suunnittelemme tehokkaan hoitostrategian.',
    sv: 'Om ditt husdjur kliar sig i öronen upprepat, det luktar illa från öronen eller det kommer sekret, huvudet är snett, eller öroninflammationen återkommer gång på gång trots behandling — kan video-otoskopi vara nyckeln till att lösa problemet. Boka tid för undersökning, så utreder vi situationen och planerar en effektiv behandlingsstrategi.',
    en: 'If your pet scratches its ears repeatedly, there is a bad smell or discharge from the ears, the head is tilted, or ear infections keep returning despite treatment — video-otoscopy may be the key to solving the problem. Book an appointment for examination, and we will investigate the situation and plan an effective treatment strategy.'
  },

  // Ear infection article (koiran-korvatulehdus)
  "article.earinfection.title": {
    fi: "Koiran korvatulehdus – oireet, syyt, hoito ja hinta",
    sv: "Öroninflammation hos hund – symtom, orsaker, behandling och pris",
    en: "Ear Infections in Dogs — Symptoms, Causes, Treatment and Cost"
  },
  "article.earinfection.intro": {
    fi: "Koiran korvatulehdus (otitis externa) on yksi yleisimmistä syistä tulla eläinlääkäriin. Koira ravistelee päätään, raapii korviaan, ja korvasta haisee tai vuotaa eritettä. Korvatulehdus ei parane itsestään, mutta kunnolla tutkittuna ja hoidettuna se paranee yleensä parissa viikossa – ja toistuvan tulehduksen taustalta löytyy lähes aina syy, jota voidaan hoitaa. Tässä artikkelissa kerromme, mistä korvatulehduksen tunnistaa, mitä vastaanotolla tapahtuu, mitä hoito maksaa Eläinklinikka Saaressa ja miten tulehduksen uusiutumista voi ehkäistä.",
    sv: "Öroninflammation hos hund (otitis externa) är en av de vanligaste orsakerna till ett veterinärbesök. Hunden skakar på huvudet, kliar sig i öronen och örat luktar illa eller rinner. En öroninflammation läker inte av sig själv, men ordentligt undersökt och behandlad går den oftast över på ett par veckor – och bakom en öroninflammation som återkommer finns nästan alltid en orsak som går att behandla. Här berättar vi hur du känner igen en öroninflammation, vad som händer hos veterinären, vad behandlingen kostar på Djurklinik Saari och hur du förebygger att den kommer tillbaka.",
    en: "An ear infection in dogs (otitis externa) is one of the most common reasons for a vet visit. The dog shakes its head, scratches its ears, and the ear smells bad or discharges. An ear infection does not heal on its own, but properly examined and treated it usually clears within a couple of weeks — and behind a recurring infection there is almost always a cause that can be treated. This article explains how to recognise an ear infection, what happens at the vet, what treatment costs at Saari Animal Clinic, and how to prevent it from coming back."
  },
  "article.earinfection.symptoms.title": {
    fi: "Mitkä ovat koiran korvatulehduksen oireet?",
    sv: "Vilka är symtomen på öroninflammation hos hund?",
    en: "What are the symptoms of an ear infection in dogs?"
  },
  "article.earinfection.symptoms.text": {
    fi: "Tyypillisimmät merkit ovat pään ravistelu, korvien raapiminen ja hankaaminen lattiaa tai huonekaluja vasten, paha haju korvasta, kellertävä, ruskea tai tumma erite, korvakäytävän ja korvalehden punoitus sekä arkuus – koira saattaa vinkaista tai vetää päänsä pois, kun korvaan kosketaan. Pitkittyneessä tulehduksessa korvakäytävän iho paksuuntuu, ja käytävä voi mennä lähes umpeen. Jos koira kallistaa päätään, kävelee horjuen tai sen silmät nykivät edestakaisin, tulehdus on voinut levitä välikorvaan tai sisäkorvaan – silloin eläinlääkäriin on lähdettävä heti.",
    sv: "De typiska tecknen är att hunden skakar på huvudet, kliar sig i öronen och gnider dem mot golvet eller möblerna, att det luktar illa från örat, att det kommer gulaktig, brun eller mörk flytning, att hörselgången och öronlappen är röda och att örat ömmar – hunden kan gnälla till eller dra undan huvudet när man rör vid örat. Vid en långvarig inflammation blir huden i hörselgången förtjockad och gången kan vara nästan igenväxt. Om hunden håller huvudet på sned, går ostadigt eller ögonen darrar (nystagmus) kan inflammationen ha spridit sig till mellan- eller innerörat – uppsök veterinär genast.",
    en: "The most typical signs are head shaking, scratching and rubbing the ears on the floor or furniture, a bad smell from the ear, yellowish, brown or dark discharge, redness of the ear canal and ear flap, and tenderness — the dog may yelp or pull its head away when the ear is touched. In a prolonged infection the skin of the ear canal thickens and the canal can be almost closed. If the dog tilts its head, walks unsteadily or its eyes flicker, the infection may have spread to the middle or inner ear — see a vet immediately."
  },
  "article.earinfection.causes.title": {
    fi: "Mistä koiran korvatulehdus johtuu?",
    sv: "Varför får hundar öroninflammation?",
    en: "Why do dogs get ear infections?"
  },
  "article.earinfection.causes.text": {
    fi: "Korvatulehdus on lähes aina seurausta jostakin muusta. Yleisin taustasyy on allergia – ruoka- tai ympäristöallergia näkyy usein ensimmäisenä juuri korvissa. Muita syitä ovat korvapunkit, vierasesine korvakäytävässä (esimerkiksi heinänkorsi tai vihne), ihon talirauhasten toimintahäiriöt ja hormonaaliset sairaudet, kuten kilpirauhasen vajaatoiminta. Altistavia tekijöitä ovat luppakorvat, karvaiset ja ahtaat korvakäytävät (esimerkiksi cockerspanieli, kultainennoutaja, villakoira ja ranskanbulldoggi) sekä kosteus – uiminen ja peseminen. Kostea, lämmin ja tulehtunut korvakäytävä on ihanteellinen kasvualusta hiivalle (Malassezia) ja bakteereille, jotka pahentavat ja pitkittävät tulehdusta.",
    sv: "En öroninflammation är nästan alltid en följd av något annat. Den vanligaste bakomliggande orsaken är allergi – foder- eller miljöallergi visar sig ofta först i öronen. Andra orsaker är öronskabb, en främmande kropp i hörselgången (till exempel ett gräsax), störningar i hudens talgkörtlar och hormonella sjukdomar som hypotyreos, alltså underfunktion i sköldkörteln. Hängande öron, håriga och trånga hörselgångar (till exempel cocker spaniel, golden retriever, pudel och fransk bulldogg) och fukt – simning och bad – ökar risken. En fuktig, varm och inflammerad hörselgång är en idealisk grogrund för jästsvamp (Malassezia) och bakterier, som förvärrar inflammationen och håller den vid liv.",
    en: "An ear infection is almost always the result of something else. The most common underlying cause is allergy — food or environmental allergy often shows first in the ears. Other causes are ear mites, a foreign body in the ear canal (a grass awn, for example), skin oil-gland disorders and hormonal diseases such as hypothyroidism. Predisposing factors are floppy ears, hairy and narrow ear canals (Cocker Spaniel, Golden Retriever, Poodle, French Bulldog, for example) and moisture — swimming and bathing. A moist, warm, inflamed ear canal is an ideal breeding ground for yeast (Malassezia) and bacteria, which worsen and perpetuate the infection."
  },
  "article.earinfection.self.title": {
    fi: "Paraneeko koiran korvatulehdus itsestään?",
    sv: "Läker öroninflammation hos hund av sig själv?",
    en: "Does a dog ear infection heal on its own?"
  },
  "article.earinfection.self.text": {
    fi: "Käytännössä ei koskaan. Hoitamaton korvatulehdus kroonistuu: korvakäytävän iho paksuuntuu ja arpeutuu, tulehdus voi levitä välikorvaan, ja pahimmillaan korvakäytävä kasvaa umpeen niin, että ainoa hoito on leikkaus. Älä myöskään aloita korvatippoja omin päin kotona: väärä lääke (antibiootti hiivatulehdukseen tai pelkkä kortisoni bakteeritulehdukseen) ei tehoa, ja osa korvatipoista vaurioittaa sisäkorvaa, jos tärykalvo on puhjennut – sen voi tarkistaa vain otoskoopilla. Reseptivapaata ”korvatulehduslääkettä” ei ole olemassa; apteekin korvanpuhdistusaineet sopivat vain terveen korvan puhdistukseen. Jos koira ravistelee päätään tai korva haisee, varaa aika eläinlääkärille – mitä aikaisemmin tulehdus hoidetaan, sitä nopeammin ja edullisemmin se paranee.",
    sv: "Praktiskt taget aldrig. En obehandlad öroninflammation blir kronisk: huden i hörselgången förtjockas och ärras, inflammationen kan sprida sig till mellanörat och i värsta fall växer hörselgången igen så att operation är den enda behandlingen. Börja inte heller med örondroppar på egen hand hemma: fel medicin (antibiotika mot en jästsvampinfektion, eller enbart kortison mot en bakteriell) hjälper inte, och en del örondroppar skadar innerörat om trumhinnan har spruckit – och det kan bara kontrolleras med otoskop. Det finns ingen receptfri ”medicin mot öroninflammation”; apotekets öronrengöringsmedel är bara till för att sköta ett friskt öra. Skakar hunden på huvudet eller luktar örat, boka tid hos veterinären – ju tidigare inflammationen behandlas, desto snabbare och billigare läker den.",
    en: "Practically never. An untreated ear infection becomes chronic: the skin of the ear canal thickens and scars, the infection can spread to the middle ear, and at worst the canal closes so that surgery is the only treatment. Do not start ear drops on your own at home either: the wrong medicine (antibiotics for a yeast infection, or steroid alone for a bacterial one) will not work, and some ear drops damage the inner ear if the eardrum is ruptured — which can only be checked with an otoscope. There are no over-the-counter \"ear infection medicines\"; pharmacy ear cleaners are only suitable for maintaining a healthy ear. If your dog is shaking its head or the ear smells, book a vet appointment — the earlier the infection is treated, the faster and cheaper it heals."
  },
  "article.earinfection.visit.title": {
    fi: "Miten koiran korvatulehdus tutkitaan ja hoidetaan eläinlääkärissä?",
    sv: "Hur undersöks och behandlas öroninflammation hos veterinären?",
    en: "How is an ear infection examined and treated at the vet?"
  },
  "article.earinfection.visit.text": {
    fi: "Vastaanotolla korvakäytävä ja tärykalvo tutkitaan otoskoopilla. Korvaeritteestä otetaan näyte, joka katsotaan mikroskoopilla saman tien klinikallamme: siitä nähdään, onko kyseessä hiiva, bakteeri, korvapunkki vai näiden yhdistelmä – ja hoito valitaan löydöksen mukaan, ei arvaamalla. Korva puhdistetaan, ja kotiin annetaan korvatipat, joissa on tarpeen mukaan sienilääkettä, antibioottia ja tulehdusta rauhoittavaa kortisonia. Hoito kestää yleensä 1–2 viikkoa, ja jälkitarkastuksessa varmistamme otoskoopilla ja tarvittaessa uudella näytteellä, että tulehdus on parantunut – oireiden häviäminen ei vielä tarkoita, että korva on terve. Jos korva on hyvin kipeä, tutkimus ja puhdistus voidaan tehdä kevyessä rauhoituksessa.",
    sv: "På mottagningen undersöker vi hörselgången och trumhinnan med otoskop. Ett prov av flytningen från örat tittar vi på i mikroskop på en gång, här på kliniken: det visar om det handlar om jästsvamp, bakterier, öronskabb eller en kombination – och behandlingen väljs enligt fyndet, inte på gissning. Örat rengörs och hunden får med sig örondroppar hem som efter behov innehåller svampmedel, antibiotika och inflammationsdämpande kortison. Behandlingen tar oftast 1–2 veckor, och vid kontrollbesöket bekräftar vi med otoskop och vid behov ett nytt prov att inflammationen är borta – att symtomen försvinner betyder ännu inte att örat är friskt. Om örat är mycket ömt kan undersökningen och rengöringen göras under lätt sedering.",
    en: "At the appointment the ear canal and eardrum are examined with an otoscope. A sample of the ear discharge is examined under the microscope right away at our clinic: this shows whether it is yeast, bacteria, ear mites or a combination — and treatment is chosen according to the finding, not by guessing. The ear is cleaned and ear drops are sent home, containing antifungal, antibiotic and anti-inflammatory steroid components as needed. Treatment usually lasts 1–2 weeks, and at the re-check we confirm with the otoscope and, if needed, a new sample that the infection has cleared — the disappearance of symptoms does not yet mean the ear is healthy. If the ear is very painful, the examination and cleaning can be done under light sedation."
  },
  "article.earinfection.video.title": {
    fi: "Milloin koira tarvitsee korvahuuhtelun tai video-otoskopian?",
    sv: "När behövs video-otoskopi och öronspolning?",
    en: "When are video-otoscopy and an ear flush needed?"
  },
  "article.earinfection.video.text": {
    fi: "Jos tulehdus on krooninen tai uusiutuu hoidosta huolimatta, korvakäytävä on eritteen tukkima tai tärykalvoa ei saada näkyviin, tarvitaan perusteellisempi tutkimus. Eläinklinikka Saaressa se tehdään video-otoskoopilla nukutuksessa: ohut kamera näyttää koko korvakäytävän ja tärykalvon suurennettuna näytöllä, korvakäytävä huuhdellaan puhtaaksi eritteestä ja biofilmistä, ja samalla voidaan ottaa näytteitä ja poistaa vierasesineitä. Puhdas korvakäytävä on edellytys sille, että lääke ylipäätään tehoaa. Lue lisää artikkelistamme <a href=\"/articles/video-otoskopia.html\">Video-otoskopia – korvan tähystys</a>.",
    sv: "Om inflammationen är kronisk eller återkommer trots behandling, om hörselgången är igensatt av flytning eller om trumhinnan inte går att se behövs en grundligare undersökning. På Djurklinik Saari gör vi den med video-otoskop under narkos: en tunn kamera visar en förstorad bild av hela hörselgången och trumhinnan på en skärm, hörselgången spolas ren från flytning och biofilm, och samtidigt kan vi ta prover och avlägsna främmande kroppar. En ren hörselgång är en förutsättning för att medicinen över huvud taget ska verka. Läs mer i vår artikel <a href=\"/sv/artiklar/video-otoskopi.html\">Video-otoskopi – öronendoskopi</a>.",
    en: "If the infection is chronic or keeps returning despite treatment, the ear canal is blocked with discharge, or the eardrum cannot be seen, a more thorough examination is needed. At Saari Animal Clinic this is done with a video-otoscope under anaesthesia: a thin camera shows a magnified image of the whole ear canal and eardrum on a monitor, the canal is flushed clean of discharge and biofilm, and samples can be taken and foreign bodies removed at the same time. A clean ear canal is a prerequisite for the medication to work at all. Read more in our article <a href=\"/en/articles/video-otoscopy.html\">Video-Otoscopy — Ear Endoscopy</a>."
  },
  "article.earinfection.cost.title": {
    fi: "Paljonko koiran korvatulehduksen hoito maksaa?",
    sv: "Vad kostar det att behandla öroninflammation hos hund?",
    en: "How much does treating a dog ear infection cost?"
  },
  "article.earinfection.cost.text": {
    fi: "Korvatulehduskäynti Eläinklinikka Saaressa: korvatutkimus, joka sisältää näytteenoton ja mikroskopoinnin, 99,79 € + käyntimaksu 38 € = yhteensä 137,79 €. Korvatipat ja muut kotiin annettavat lääkkeet veloitetaan erikseen. Video-otoskooppinen korvahuuhtelu nukutuksessa maksaa 449–489 €. Jälkitarkastus veloitetaan vastaanottokäynnin hinnan mukaan. Kaikki hinnat löytyvät <a href=\"/hinnasto/\">hinnastostamme</a>. Lemmikkivakuutuksen suorakorvaus onnistuu LähiTapiolan, Agrian ja Pohjolan asiakkaille. Ajoissa hoidettu korvatulehdus tulee aina edullisemmaksi kuin kroonistunut.",
    sv: "Ett besök för öroninflammation på Djurklinik Saari: öronundersökning inklusive provtagning och mikroskopi 99,79 € + besöksavgift 38 €, alltså sammanlagt 137,79 €. Örondroppar och eventuella andra mediciner som hunden får med sig hem tillkommer. Video-otoskopisk öronspolning under narkos kostar 449–489 €. Kontrollbesöket debiteras enligt prislistan för mottagningsbesök. Alla priser hittar du i vår <a href=\"/sv/prislista/\">prislista</a>. Vi har direktersättning för kunder hos LähiTapiola, Agria och Pohjola. En öroninflammation som behandlas i tid blir alltid billigare än en kronisk.",
    en: "An ear-infection visit at Saari Animal Clinic: ear examination including sampling and microscopy €99.79 + visit fee €38, i.e. €137.79 in total. Ear drops and any other medicines sent home are extra. A video-otoscopic ear flush under anaesthesia costs €449–489. The re-check is charged according to the consultation price list. All prices are in our <a href=\"/en/pricelist/\">price list</a>. Direct insurance billing is available for LähiTapiola, Agria and Pohjola customers. An ear infection treated early is always cheaper than a chronic one."
  },
  "article.earinfection.recurrent.title": {
    fi: "Miksi koiran korvatulehdus uusiutuu jatkuvasti?",
    sv: "Varför kommer hundens öroninflammation tillbaka?",
    en: "Why does a dog's ear infection keep coming back?"
  },
  "article.earinfection.recurrent.text": {
    fi: "Kun korvatulehdus palaa kerta toisensa jälkeen, korvatipat hoitavat vain seurausta. Taustalla on useimmiten allergia, ja silloin oikea hoito on allergiaselvitys: eliminaatiodieetti ruoka-allergian poissulkemiseksi sekä tarvittaessa allergiaverikokeet ja siedätyshoito. Muita syitä ovat hormonaaliset sairaudet, korvakäytävän rakenteelliset muutokset ja liian aikaisin lopetettu hoito. Kerromme toistuvien korvatulehdusten selvittelystä sivullamme <a href=\"/palvelut/ihotaudit/\">Ihotaudit, allergiat ja korvatulehdukset</a>.",
    sv: "När en öroninflammation återkommer gång på gång behandlar örondropparna bara följden. Den bakomliggande orsaken är oftast allergi, och då är rätt behandling en allergiutredning: en eliminationsdiet för att utesluta foderallergi och vid behov allergiblodprov och immunterapi. Andra orsaker är hormonella sjukdomar, strukturella förändringar i hörselgången och en behandling som avslutats för tidigt. Hur vi utreder återkommande öroninflammationer beskriver vi på sidan <a href=\"/sv/tjanster/hudsjukdomar/\">Hudsjukdomar, allergier och öroninflammationer</a>.",
    en: "When an ear infection keeps returning, ear drops are only treating the consequence. The underlying cause is most often allergy, and then the right treatment is an allergy work-up: an elimination diet to rule out food allergy, and allergy blood tests and immunotherapy if needed. Other causes are hormonal diseases, structural changes in the ear canal and treatment that was stopped too early. We describe the work-up of recurrent infections on our <a href=\"/en/services/dermatology/\">Skin diseases, allergies and ear infections</a> page."
  },
  "article.earinfection.home.title": {
    fi: "Miten hoidan koiran korvia kotona?",
    sv: "Hur sköter jag hundens öron hemma?",
    en: "How do I care for my dog's ears at home?"
  },
  "article.earinfection.home.text": {
    fi: "Tervettä korvaa ei tarvitse puhdistaa säännöllisesti – liika puhdistaminen vain ärsyttää sitä. Uimisen tai pesun jälkeen kuivaa korvat ja puhdista ne tarvittaessa eläinlääkärin suosittelemalla korvanpuhdistusaineella: täytä korvakäytävä, hiero korvan tyveä ja anna koiran ravistella ylimääräinen aine pois. Älä koskaan työnnä vanupuikkoa korvakäytävään – se painaa lian syvemmälle ja voi vaurioittaa tärykalvoa. Karvaisten korvakäytävien karvat voi nyppiä tai leikata trimmauksen yhteydessä. Tarkista korvat kerran viikossa: haju, punoitus tai erite on merkki siitä, että korva kannattaa näyttää eläinlääkärille.",
    sv: "Ett friskt öra behöver inte rengöras regelbundet – för mycket rengöring irriterar det. Torka öronen efter simning och bad och rengör dem vid behov med ett öronrengöringsmedel som veterinären rekommenderat: fyll hörselgången, massera öronbasen och låt hunden skaka ut överskottet. Peta aldrig in en bomullspinne i hörselgången – den trycker smutsen djupare in och kan skada trumhinnan. Hår i håriga hörselgångar kan plockas eller klippas i samband med pälsvården. Kontrollera öronen varje vecka: lukt, rodnad eller flytning är ett tecken på att veterinären bör ta en titt.",
    en: "A healthy ear does not need regular cleaning — over-cleaning irritates it. After swimming or bathing, dry the ears and, if needed, clean them with an ear cleaner recommended by your vet: fill the canal, massage the base of the ear, and let the dog shake out the excess. Never push a cotton bud into the ear canal — it pushes debris deeper and can damage the eardrum. Hair in hairy ear canals can be plucked or trimmed during grooming. Check the ears weekly: smell, redness or discharge is a sign that the vet should take a look."
  },
  "article.earinfection.cat.title": {
    fi: "Miten kissan korvatulehdus tunnistetaan ja hoidetaan?",
    sv: "Får katter öroninflammation?",
    en: "What about ear infections in cats?"
  },
  "article.earinfection.cat.text": {
    fi: "Kissalla korvatulehdukset ovat harvinaisempia kuin koiralla, ja yleisin syy on korvapunkki (Otodectes cynotis) – etenkin pennuilla ja monen kissan talouksissa. Tyypillinen merkki on tumma, kahvinporoja muistuttava lika korvassa ja voimakas kutina. Korvapunkki hoituu tehokkaasti loislääkkeellä, ja kaikki talouden kissat ja koirat hoidetaan samalla kertaa. Aikuisen kissan toistuvan korvatulehduksen taustalla voi olla allergia tai korvakäytävän polyyppi, joten myös kissan korva kannattaa aina tutkituttaa.",
    sv: "Hos katt är öroninflammation ovanligare än hos hund, och den vanligaste orsaken är öronskabb (Otodectes cynotis) – särskilt hos kattungar och i hushåll med flera katter. Det typiska tecknet är mörkt, kaffesumpsliknande smuts i örat och kraftig klåda. Öronskabb behandlas effektivt med ett antiparasitmedel, och alla katter och hundar i hushållet behandlas samtidigt. Bakom en återkommande öroninflammation hos en vuxen katt kan det finnas allergi eller en polyp i hörselgången, så även kattens öra ska alltid undersökas.",
    en: "In cats, ear infections are less common than in dogs, and the most frequent cause is ear mites (Otodectes cynotis) — especially in kittens and multi-cat households. The typical sign is dark, coffee-ground-like debris and intense itching. Ear mites are treated effectively with an antiparasitic, and all cats and dogs in the household are treated at the same time. Behind a recurring ear infection in an adult cat there may be allergy or an ear-canal polyp, so a cat's ear should always be examined too."
  },
  "article.earinfection.contact.title": {
    fi: "Milloin koiran korvatulehduksen kanssa pitää mennä eläinlääkäriin?",
    sv: "När ska man till veterinär med hundens öra?",
    en: "When does a dog ear infection need a vet?"
  },
  "article.earinfection.contact.text": {
    fi: "Aina, kun koira ravistelee päätään tai raapii korviaan toistuvasti, korva haisee tai erittää, tai korva on punoittava ja arka. Kiireellisesti, jos koira kallistaa päätään, kävelee horjuen tai on selvästi kivulias. Eläinklinikka Saari Vaasassa tutkii korvat otoskoopilla ja mikroskoopilla samalla käynnillä, ja kroonisia tapauksia varten meillä on video-otoskopia ja korvahuuhtelu. Varaa aika soittamalla (06) 321 7300 tai <a href=\"/ajanvaraus/\">nettiajanvarauksen</a> kautta.",
    sv: "Alltid när hunden skakar på huvudet eller kliar sig i öronen gång på gång, när örat luktar eller rinner, eller när det är rött och ömt. Genast om hunden håller huvudet på sned, går ostadigt eller har tydligt ont. På Djurklinik Saari i Vasa undersöker vi öronen med otoskop och mikroskop vid samma besök, och för kroniska fall har vi video-otoskopi och öronspolning. Boka tid genom att ringa (06) 321 7300 eller via <a href=\"/sv/tidsbokning/\">tidsbokningen på nätet</a>.",
    en: "Always when the dog shakes its head or scratches its ears repeatedly, the ear smells or discharges, or the ear is red and tender. Urgently if the dog tilts its head, walks unsteadily or is clearly in pain. Saari Animal Clinic in Vaasa examines the ears with an otoscope and microscope at the same visit, and for chronic cases we have video-otoscopy and ear flushing. Book an appointment by calling (06) 321 7300 or via <a href=\"/en/book-appointment/\">online booking</a>."
  },

  // MLK Anesthesia Article
  'articles.tag.anesthesia': { fi: 'Anestesia', sv: 'Anestesi', en: 'Anesthesia' },
  'article.mlk.title': {
    fi: 'Jatkuva kipulääkeinfuusio (CRI) — tasainen kivunhallinta leikkausten aikana',
    sv: 'Kontinuerlig smärtinfusion (CRI) — jämn smärtlindring under kirurgi',
    en: 'Continuous Rate Infusion (CRI) — Steady Pain Management During Surgery'
  },
  'article.mlk.intro': {
    fi: 'Kivun hallinta on yksi tärkeimmistä osa-alueista eläinkirurgiassa. Klinikallamme käytämme jatkuvaa suonensisäistä kipulääkeinfuusiota (CRI) vakiomenetelmänä kaikissa kivuliaissa leikkauksissa — pehmytkudoskirurgiasta ortopedisiin toimenpiteisiin. CRI tarkoittaa, että kipulääkkeitä annostellaan tasaisena virtana suonensisäisesti koko leikkauksen ajan, sen sijaan että annettaisiin yksittäisiä kerta-annoksia.',
    sv: 'Smärthantering är en av de viktigaste aspekterna av djurkirurgi. På vår klinik använder vi kontinuerlig intravenös smärtinfusion (CRI) som standardmetod vid alla smärtsamma operationer — från mjukdelskirurgi till ortopediska ingrepp. CRI innebär att smärtstillande läkemedel administreras som en jämn ström intravenöst under hela operationen, istället för enskilda engångsdoser.',
    en: 'Pain management is one of the most important aspects of veterinary surgery. At our clinic, we use continuous rate infusion (CRI) as the standard method for all painful surgeries — from soft tissue to orthopedic procedures. CRI means that pain medications are delivered as a steady intravenous stream throughout surgery, rather than as single bolus doses.'
  },
  'article.mlk.what.title': {
    fi: 'Miksi jatkuva infuusio?',
    sv: 'Varför kontinuerlig infusion?',
    en: 'Why Continuous Infusion?'
  },
  'article.mlk.what.text': {
    fi: 'Kun kipulääke annetaan yksittäisinä annoksina, potilaan verenkierrossa tapahtuu lääkepitoisuuden nousuja ja laskuja — välillä lääke vaikuttaa tehokkaasti, välillä kipu palaa. Jatkuva infuusio tasoittaa nämä vaihtelut ja tarjoaa tasaisen, katkeamattoman kivunlievityksen. Näin potilas pysyy vakaassa tilassa koko leikkauksen ajan ja toipuminen on nopeampaa ja kivuttomampaa.',
    sv: 'När smärtstillande ges som enskilda doser uppstår toppar och dalar i läkemedelskoncentrationen i blodet — ibland verkar läkemedlet effektivt, ibland återkommer smärtan. En kontinuerlig infusion jämnar ut dessa variationer och erbjuder jämn, oavbruten smärtlindring. På så vis förblir patienten stabil under hela operationen och återhämtningen blir snabbare och mer smärtfri.',
    en: 'When painkillers are given as single doses, the patient experiences peaks and troughs in blood drug levels — sometimes the drug is effective, sometimes the pain returns. A continuous infusion smooths out these fluctuations and provides steady, uninterrupted pain relief. This keeps the patient stable throughout surgery and makes recovery faster and less painful.'
  },
  'article.mlk.why.title': {
    fi: 'Multimodaalinen lähestymistapa',
    sv: 'Multimodalt angreppssätt',
    en: 'The Multimodal Approach'
  },
  'article.mlk.why.text': {
    fi: 'Yksittäinen kipulääke vaikuttaa vain yhteen kipureseptoriin. Yhdistämällä useita eri lääkeaineita matalilla annoksilla saadaan tehokkaampi kivunlievitys kuin yhdellä lääkkeellä yksinään — ja samalla kunkin lääkkeen sivuvaikutukset pysyvät mahdollisimman pieninä. Tutkimusten mukaan multimodaalinen CRI-kivunhallinta vähentää inhalaatioanesteetin tarvetta merkittävästi, mikä parantaa verenkierron vakautta ja vähentää anestesiaan liittyviä riskejä.',
    sv: 'Ett enskilt smärtstillande läkemedel påverkar bara en smärtmekanism. Genom att kombinera flera olika läkemedel i låga doser uppnås effektivare smärtlindring än med ett enda läkemedel — samtidigt som biverkningarna från varje enskilt läkemedel hålls minimala. Studier visar att multimodal CRI-smärtlindring minskar behovet av inhalationsanestesi avsevärt, vilket förbättrar cirkulationsstabiliteten och minskar anestesi-relaterade risker.',
    en: 'A single painkiller affects only one pain mechanism. By combining several different drugs at low doses, more effective pain relief is achieved than with any single drug alone — while keeping the side effects of each drug to a minimum. Studies show that multimodal CRI pain management significantly reduces the need for inhalation anesthetic, which improves circulatory stability and reduces anesthesia-related risks.'
  },
  'article.mlk.benefits.title': {
    fi: 'Käyttö klinikallamme',
    sv: 'Användning på vår klinik',
    en: 'Use at Our Clinic'
  },
  'article.mlk.benefits.text': {
    fi: 'CRI-kipulääkeinfuusio on vakiomenetelmämme kaikissa kivuliaissa kirurgisissa toimenpiteissä: sterilisaatioissa, kastraatioissa, kasvainleikkauksissa, vatsaonteloleikkauksissa ja ortopedisissä leikkauksissa. Infuusio aloitetaan ennen leikkausta ja sitä jatketaan tarvittaessa myös leikkauksen jälkeen optimaalisen kivunlievityksen takaamiseksi.',
    sv: 'CRI-smärtinfusion är vår standardmetod vid alla smärtsamma kirurgiska ingrepp: steriliseringar, kastreringar, tumöroperationer, bukoperationer och ortopediska operationer. Infusionen startas före operationen och fortsätter vid behov även postoperativt för optimal smärtlindring.',
    en: 'CRI pain infusion is our standard method for all painful surgical procedures: spays, neuters, tumor surgeries, abdominal surgeries, and orthopedic procedures. The infusion is started before surgery and continued postoperatively when needed for optimal pain relief.'
  },
  'article.mlk.use.title': {
    fi: 'Mitä on kivun "wind-up"?',
    sv: 'Vad är smärtans "wind-up"?',
    en: 'What Is Pain "Wind-Up"?'
  },
  'article.mlk.use.text': {
    fi: 'Wind-up on ilmiö, jossa pitkittynyt kipu herkistää keskushermoston kipuratoja niin, että kipukokemus voimistuu progressiivisesti. Mikäli leikkauksen aikainen kivunlievitys on riittämätöntä, toipumisvaiheessa kipu voi olla vaikeasti hallittavissa ja vaatia huomattavasti suurempia lääkeannoksia. Jatkuva infuusio estää tätä herkistymistä tehokkaasti, mikä on yksi menetelmän merkittävimmistä eduista.',
    sv: 'Wind-up är ett fenomen där långvarig smärta sensibiliserar centrala nervsystemets smärtbanor så att smärtupplevelsen förstärks progressivt. Om smärtlindringen under operationen är otillräcklig kan smärtan i återhämtningsfasen vara svårkontrollerad och kräva betydligt högre läkemedelsdoser. Kontinuerlig infusion förhindrar effektivt denna sensibilisering, vilket är en av metodens mest betydande fördelar.',
    en: 'Wind-up is a phenomenon where prolonged pain sensitizes the central nervous system\'s pain pathways so that the pain experience intensifies progressively. If intraoperative pain relief is inadequate, post-surgical pain can become difficult to control and may require significantly higher drug doses. Continuous infusion effectively prevents this sensitization, which is one of the method\'s most significant advantages.'
  },
  'article.mlk.windup.title': {
    fi: 'Turvallisuus',
    sv: 'Säkerhet',
    en: 'Safety'
  },
  'article.mlk.windup.text': {
    fi: 'Koska CRI-infuusiossa käytetään useita lääkeaineita matalilla annoksilla, sivuvaikutusriski on pienempi kuin käytettäessä yksittäistä lääkettä suurella annoksella. Klinikallamme valvomme jokaista potilasta tarkasti koko anestesian ajan ja säädämme infuusionopeutta potilaan vasteen mukaan reaaliajassa.',
    sv: 'Eftersom CRI-infusionen använder flera läkemedel i låga doser är risken för biverkningar lägre än med ett enskilt läkemedel i hög dos. På kliniken övervakar vi varje patient noggrant under hela anestesin och justerar infusionshastigheten i realtid efter patientens respons.',
    en: 'Because CRI uses multiple drugs at low doses, the risk of side effects is lower than with a single drug at a high dose. At our clinic, we closely monitor every patient throughout anesthesia and adjust the infusion rate in real time based on the patient\'s response.'
  },
  'article.mlk.safety.title': { fi: '', sv: '', en: '' },
  'article.mlk.safety.text': { fi: '', sv: '', en: '' },

  // Article: Diarrhea
  'article.diarrhea.title': {
    fi: 'Ripuli koirilla ja kissoilla — syyt, kotihoito ja milloin ottaa yhteyttä klinikkaan',
    sv: 'Diarré hos hundar och katter — orsaker, hembehandling och när du ska kontakta kliniken',
    en: 'Diarrhea in Dogs and Cats — Causes, Home Care and When to Contact the Clinic'
  },
  'article.diarrhea.intro': {
    fi: 'Ripuli on yksi yleisimmistä syistä eläinlääkärikäyntiin. Lähes jokainen koira ja kissa kärsii ripulista jossain vaiheessa elämäänsä. Useimmiten kyseessä on lievä, itsestään paraneva vaiva — mutta joskus ripuli voi olla merkki vakavammasta sairaudesta. Tässä artikkelissa käymme läpi yleisimmät syyt, kotihoidon perusteet ja tilanteet, joissa on syytä ottaa yhteyttä eläinlääkäriin.',
    sv: 'Diarré är en av de vanligaste orsakerna till veterinärbesök. Nästan varje hund och katt drabbas av diarré någon gång i livet. Oftast handlar det om ett lindrigt, självläkande besvär — men ibland kan diarré vara tecken på en allvarligare sjukdom. I denna artikel går vi igenom de vanligaste orsakerna, grunderna i hembehandling och situationer då du bör kontakta veterinären.',
    en: 'Diarrhea is one of the most common reasons for a veterinary visit. Nearly every dog and cat experiences diarrhea at some point. Most often it is a mild, self-resolving issue — but sometimes diarrhea can indicate a more serious condition. In this article we cover the most common causes, basics of home care and situations where you should contact the clinic.'
  },
  'article.diarrhea.causes.title': {
    fi: 'Yleisimmät syyt',
    sv: 'Vanligaste orsaker',
    en: 'Most Common Causes'
  },
  'article.diarrhea.causes.text': {
    fi: 'Koirilla yleisin syy liittyy ruokavalioon — roskien syöminen, äkillinen ruokavalion vaihtaminen/muutos tai ruoantähteiden syöminen. Kissoilla ruokavalion muutos on tavallinen laukaisija. Muita yleisiä syitä ovat suolistoloiset (Giardia, suolinkaiset, kokkidit), stressi (muutto, hoitolat, muutokset arjessa), ruoka-aineallergia tai -intoleranssi, bakteeri- ja virusinfektiot (erityisesti parvovirusta vastaan rokottamattomat pennut ja kissanpennut) sekä myrkylliset aineet.',
    sv: 'Hos hundar är den vanligaste orsaken felaktiga matintag — att äta skräp, för snabbt foderbyte eller bordsrester. Hos katter är plötsligt foderbyte en vanlig utlösare. Andra vanliga orsaker inkluderar tarmparasiter (Giardia, spolmask, koccidier), stress (flytt, hundpensionat, förändringar i vardagen), foderallergi eller -intolerans, bakterie- och virusinfektioner (särskilt parvoviruset hos ovaccinerade valpar och kattungar) samt giftiga ämnen.',
    en: 'In dogs, the most common cause is dietary indiscretion — eating garbage, switching food too quickly or consuming table scraps. In cats, sudden food changes are a common trigger. Other common causes include intestinal parasites (Giardia, roundworms, coccidia), stress (moving, boarding, changes in routine), food allergy or intolerance, bacterial and viral infections (especially parvovirus in unvaccinated puppies and kittens) and toxic substances.'
  },
  'article.diarrhea.homecare.title': {
    fi: 'Kotihoito',
    sv: 'Hembehandling',
    en: 'Home Care'
  },
  'article.diarrhea.homecare.text': {
    fi: 'Jos lemmikkisi on muuten virkeä, syö ja juo normaalisti eikä ripuli ole veristä, voit kokeilla kotihoitoa 24–48 tunnin ajan. Koiraa voi pitää paastolla 12–24 tuntia suoliston lepuuttamiseksi — kissaa ei saa paastottaa yli 12 tuntia maksan rasvoittumisriskin vuoksi. Voit kokeilla siirtymistä miedolle dieetille, vatsa ja suolistoystävällistä ruokaa löytyy klinikalta tai tarjoa keitettyä kanaa (ilman nahkaa ja luita) ja keitettyä riisiä suhteessa 1:2. Tarjoa pieniä annoksia 4–6 kertaa päivässä. Varmista riittävä nesteensaanti — raikasta vettä tulee olla aina tarjolla. Eläimille tarkoitetut probiootit (esim. FortiFlora) tukevat suoliston palautumista. Jatka mietoa dieettiä 3–5 päivää ulosteen normalisoitumisen jälkeen ja palaa normaaliin ruokaan asteittain 5–7 päivän kuluessa.',
    sv: 'Om ditt husdjur annars är pigg, äter och dricker normalt och diarrén inte är blodig, kan du prova hembehandling i 24–48 timmar. Hundar kan fastas 12–24 timmar för att låta tarmen vila — katter ska inte fastas mer än 12 timmar på grund av risk för leverförfettning. Byt till mild diet, mag- och tarmvänlig mat finns på kliniken eller ge kokt kyckling (utan skinn och ben) och ris i förhållandet 1:2. Ge små portioner 4–6 gånger dagligen. Säkerställ tillräckligt vätskeintag — färskt vatten ska alltid finnas tillgängligt. Probiotika avsedda för djur (t.ex. Fortiflora) stödjer tarmens återhämtning. Fortsätt med mild diet 3–5 dagar efter att avföringen normaliserats och återgå gradvis till normal kost under 5–7 dagar.',
    en: 'If your pet is otherwise alert, eating and drinking normally and the diarrhea is not bloody, you can try home care for 24–48 hours. Dogs can be fasted for 12–24 hours to rest the gut — cats should not be fasted for more than 12 hours due to the risk of hepatic lipidosis. Switch to a bland diet, gastrointestinal-friendly food is available at the clinic or offer boiled chicken (no skin, no bones) and rice at a 1:2 ratio. Offer small portions 4–6 times daily. Ensure adequate hydration — fresh water should always be available. Veterinary probiotics (e.g. Fortiflora) support gut recovery. Continue the bland diet for 3–5 days after the stool normalizes and gradually return to regular food over 5–7 days.'
  },
  'article.diarrhea.warning.title': {
    fi: 'Milloin ottaa yhteyttä eläinlääkäriin',
    sv: 'När ska du kontakta veterinären',
    en: 'When to Contact the Veterinarian'
  },
  'article.diarrhea.warning.text': {
    fi: 'Ota yhteyttä eläinlääkäriin välittömästi, jos ripuli on veristä (veri voi olla kirkkaan punaista tai tummaa), lemmikki oksentaa samanaikaisesti, eläin on väsynyt tai apaattinen, huomaat kuivumisen merkkejä (kuivat ikenet, heikentynyt ihon kimmoisuus), epäilet myrkyn syömistä, eläimellä on kuumetta tai vatsakipua. Pentujen ja kissanpentujen kohdalla älä odota — ne kuivuvat nopeasti ja ovat alttiita vakavalle parvovirus taudille. Ota yhteyttä klinikkaan 12–24 tunnin kuluessa oireiden alkamisesta. Myös iäkkäät lemmikit ja pienet rodut kuivuvat nopeammin. Jos ripuli ei hellitä 48 tunnin kotihoidon jälkeen tai palaa toistuvasti, varaa aika tutkimuksiin. Vinkki: ota ulosteesta valokuva — se auttaa eläinlääkäriä arvioimaan tilanteen.',
    sv: 'Kontakta veterinären omedelbart om diarrén är blodig (blodet kan vara klarrött eller mörkt/tjärsvart), husdjuret kräks samtidigt, djuret är trött eller apatiskt, du märker tecken på uttorkning (torrt tandkött, minskad hudelasticitet), du misstänker förgiftning, djuret har feber eller buksmärta. För valpar och kattungar — vänta inte. De torkar ut snabbt och är känsliga för allvarlig parvovirusinfektion. Kontakta kliniken inom 12–24 timmar efter symtomdebut. Även äldre djur och små raser torkar ut snabbare. Om diarrén inte förbättras efter 48 timmars hembehandling eller återkommer upprepade gånger, boka tid för undersökning. Tips: ta ett foto av avföringen — det hjälper veterinären att bedöma situationen.',
    en: 'Contact the veterinarian immediately if the diarrhea is bloody (blood can be bright red or dark/tarry black), your pet is vomiting at the same time, the animal is lethargic or apathetic, you notice signs of dehydration (dry gums, loss of skin elasticity), you suspect toxin ingestion, or the animal has fever or abdominal pain. For puppies and kittens — do not wait. They dehydrate quickly and are vulnerable to serious parvovirus infection. Contact the clinic within 12–24 hours of symptom onset. Older animals and small breeds also dehydrate faster. If diarrhea does not improve after 48 hours of home care or keeps recurring, book an appointment for examination. Tip: take a photo of the stool — it helps the veterinarian assess the situation.'
  },
  'article.diarrhea.prevention.title': {
    fi: 'Ehkäisy',
    sv: 'Förebyggande',
    en: 'Prevention'
  },
  'article.diarrhea.prevention.text': {
    fi: 'Tee ruokavaliomuutokset asteittain 7–10 päivän kuluessa. Vältä ruoantähteitä, luita ja pääsyä roskien luo. Huolehdi säännöllisistä madotuksista — matolääkkeitä saa apteekista ilman reseptiä. Huolehdi myös rokotuksista. Vähennä stressiä muutostilanteissa (feromonivalmisteet kuten Adaptil koirille ja Feliway kissoille voivat auttaa).',
    sv: 'Byt foder gradvis under 7–10 dagar. Undvik bordsrester, ben och tillgång till sopor. Se till att avmaskning sker regelbundet — avmaskningsmedel finns receptfritt på apoteket. Se även till att vaccinationerna är uppdaterade. Minska stress vid förändringar (feromonprodukter som Adaptil för hundar och Feliway för katter kan hjälpa).',
    en: 'Switch food gradually over 7–10 days. Avoid table scraps, bones and access to garbage. Keep up with regular deworming — deworming medicine is available over the counter at pharmacies. Keep vaccinations up to date. Reduce stress during transitions (pheromone products like Adaptil for dogs and Feliway for cats can help).'
  },
  'article.diarrhea.contact.title': {
    fi: 'Ota yhteyttä',
    sv: 'Kontakta oss',
    en: 'Contact Us'
  },
  'article.diarrhea.contact.text': {
    fi: 'Jos olet epävarma, soita meille (puh. 06-3217300) tai lähetä sähköpostia osoitteeseen info@saarivet.fi — voit liittää mukaan valokuvia. Neuvomme mielellämme, onko eläinlääkärikäynti tarpeen.',
    sv: 'Om du är osäker, ring oss (tfn 06-3217300) eller skicka e-post till info@saarivet.fi — du kan bifoga foton. Vi ger gärna råd om ett veterinärbesök behövs.',
    en: 'If you are unsure, give us a call (tel. 06-3217300) or send an email to info@saarivet.fi — you can attach photos. We are happy to advise whether a visit is needed.'
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
    fi: 'Sikiökaudella keuhkot eivät toimi ja hengitys tapahtuu istukan kautta. Valtimotiehyt ohjaa veren keuhkojen ohi suoraan verenkiertoon. Syntymän jälkeen keuhkot laajenevat, happipitoisuus nousee ja valtimotiehyt supistuu ja sulkeutuu normaalisti 12–24 tunnin kuluessa. PDA:ssa tämä sulkeutuminen jää tapahtumatta. Veri virtaa jatkuvasti aortasta keuhkovaltimoon, mikä kuormittaa sydämen vasenta puolta ja johtaa sen laajentumiseen. Hoitamattomana tämä etenee sydämen vajaatoimintaan.',
    sv: 'Under fosterutvecklingen fungerar inte lungorna och gasutbytet sker via moderkakan. Ductus arteriosus leder blodet förbi lungorna direkt ut i cirkulationen. Efter födseln expanderar lungorna, syrenivån stiger och ductus arteriosus drar ihop sig och stängs normalt inom 12–24 timmar. Vid PDA sker inte denna stängning. Blod flödar kontinuerligt från aorta till lungartären, vilket överbelastar hjärtats vänstra sida och leder till att det vidgas. Utan behandling fortskrider detta till hjärtsvikt.',
    en: 'During fetal development the lungs are not functional and gas exchange occurs via the placenta. The ductus arteriosus diverts blood past the lungs directly into the circulation. After birth the lungs expand, oxygen levels rise, and the ductus arteriosus constricts and normally closes within 12–24 hours. In PDA this closure does not happen. Blood flows continuously from the aorta into the pulmonary artery, overloading the left side of the heart and causing it to enlarge. Without treatment this progresses to heart failure.'
  },
  'article.pda.breeds.title': {
    fi: 'Altiit rodut',
    sv: 'Predisponerade raser',
    en: 'Predisposed Breeds'
  },
  'article.pda.breeds.text': {
    fi: 'PDA:lla on perinnöllinen tausta ja se on yleisempi naarailla (suhde 3:1). Alttiita rotuja ovat muun muassa maltankoira, pomeranian, shetlanninlammaskoira, englanninspringerspanieli, bichon frise, kääpiö- ja toyvillakoira, yorkshirenterrieri, chihuahua ja cockerspanieli. PDA:ta esiintyy myös kissoilla, mutta huomattavasti harvemmin.',
    sv: 'PDA har en genetisk grund och är vanligare hos tikar (förhållande 3:1). Predisponerade raser inkluderar bland annat malteser, pomeranian, shetland sheepdog, engelsk springer spaniel, bichon frise, dvärg- och toypudel, yorkshireterrier, chihuahua och cockerspaniel. PDA förekommer även hos katter, men betydligt mer sällan.',
    en: 'PDA has a genetic basis and is more common in females (ratio 3:1). Predisposed breeds include Maltese, Pomeranian, Shetland Sheepdog, English Springer Spaniel, Bichon Frise, Miniature and Toy Poodle, Yorkshire Terrier, Chihuahua and Cocker Spaniel. PDA also occurs in cats but much less frequently.'
  },
  'article.pda.signs.title': {
    fi: 'Oireet — mitä omistaja voi huomata',
    sv: 'Symtom — vad ägaren kan märka',
    en: 'Signs — What Owners May Notice'
  },
  'article.pda.signs.text': {
    fi: 'PDA löytyy usein ensimmäisellä eläinlääkärikäynnillä, kun eläinlääkäri kuulee jatkuvan poikkeavan äänen (machinery murmur) sydäntä kuunnellessaan. Omistaja saattaa huomata, että pentu on pentueen pienin, väsyy nopeasti leikkiessä, hengittää normaalia nopeammin tai yskii. Vakavammissa tapauksissa voi esiintyä pyörtymistä tai vatsan turvotusta. Joskus omistaja voi tuntea rintakehällä värinää lemmikkiä pidellessä.',
    sv: 'PDA upptäcks oftast vid det första veterinärbesöket, när veterinären hör ett kontinuerligt "biljud" (machinery murmur) vid auskultation. Ägaren kan märka att valpen är kullens minsta, blir tröttast snabbast under lek, andas snabbare än normalt eller hostar. I allvarligare fall kan svimningar eller buksvullnad förekomma. Ibland känner ägaren en vibration på bröstkorgen när de håller sitt husdjur.',
    en: 'PDA is often discovered at the first veterinary visit when the vet hears a continuous "machinery murmur" during auscultation. Owners may notice the puppy is the smallest in the litter, tires quickly during play, breathes faster than normal, or coughs. In more severe cases fainting or abdominal swelling may occur. Sometimes owners feel a vibration on the chest wall when holding their pet.'
  },
  'article.pda.treatment.title': {
    fi: 'Hoito',
    sv: 'Behandling',
    en: 'Treatment'
  },
  'article.pda.treatment.text': {
    fi: 'PDA hoidetaan sulkemalla avoin valtimotiehyt. Tähän on kaksi päämenetelmää. Kirurginen ligatuura tehdään torakotomialla eli rintakehän avauksella, jossa tiehyt suljetaan ompelemalla — menetelmän onnistumisprosentti on yli 90–95 %. Katetritoimenpiteessä (ACDO, Amplatz Canine Duct Occluder) erikoislaite viedään reisivaltimon kautta tiehyeen ja se sulkee verisuonen sisältäpäin — tämä on vähemmän invasiivinen, ja onnistumisprosentti on yli 95–98 %. Lääkehoidolla voidaan vakauttaa potilaan tila ennen toimenpidettä, mutta se ei paranna PDA:ta. Mitä aikaisemmin sulku tehdään — mieluiten ennen 6 kuukauden ikää — sitä parempi ennuste.',
    sv: 'PDA behandlas genom att stänga den öppna ductus arteriosus. Det finns två huvudmetoder. Kirurgisk ligering utförs via torakotomi, där kanalen stängs med suturer — metoden har över 90–95 % framgångsfrekvens. Vid kateterbaserad stängning (ACDO, Amplatz Canine Duct Occluder) förs en speciell anordning via lårbensartären till kanalen och stänger blodkärlet inifrån — detta är mindre invasivt med över 95–98 % framgångsfrekvens. Medicinsk behandling kan stabilisera patienten före ingreppet men botar inte PDA. Ju tidigare stängningen görs — helst före 6 månaders ålder — desto bättre prognos.',
    en: 'PDA is treated by closing the open ductus. There are two main methods. Surgical ligation is performed via thoracotomy, where the duct is tied off with sutures — success rate exceeds 90–95%. Catheter-based closure (ACDO, Amplatz Canine Duct Occluder) involves delivering a specialized device through the femoral artery to seal the vessel from within — this is less invasive with a success rate over 95–98%. Medical treatment can stabilize the patient before the procedure but does not cure PDA. The earlier the closure is performed — ideally before 6 months of age — the better the prognosis.'
  },
  'article.pda.clinic.title': {
    fi: 'Diagnostiikka klinikallamme',
    sv: 'Diagnostik på vår klinik',
    en: 'Diagnosis at Our Clinic'
  },
  'article.pda.clinic.text': {
    fi: 'Eläinklinikka Saarella teemme sydämen ultraäänitutkimuksia, joiden avulla PDA voidaan havaita ja diagnosoida. Eläinlääkärimme Leena suorittaa sydäntutkimukset. Jos pennullasi todetaan sivuääni, voimme tutkia sydämen ultraäänellä ja tarvittaessa ohjata jatkohoitoon sydänsairauksiin erikoistuneelle klinikalle.',
    sv: 'På Djurklinik Saari utför vi hjärtultraljudsundersökningar som gör det möjligt att upptäcka och diagnostisera PDA på kliniken. Vår veterinär Leena utför hjärtultraljudsundersökningarna. Om ett blåsljud upptäcks hos din valp kan vi undersöka hjärtat med ultraljud och vid behov remittera till en specialistklinik för vidare behandling.',
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
    fi: 'Jokaisen pennun sydän tulee kuunnella ensimmäisellä eläinlääkärikäynnillä. Jos sivuääni todetaan, jatkotutkimus sydämen ultraäänellä tulee tehdä viipymättä. PDA on parannettavissa — kunhan se havaitaan ajoissa. Alttiiden rotujen kasvattajien ja omistajien tulisi olla erityisen valppaina.',
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
    fi: 'Viljaton lemmikkien ruokavalio on ollut valtava trendi viime vuosina. Markkinointi lupaa "luonnollisempaa" ruokavaliota, mutta vuonna 2018 Yhdysvaltain elintarvike- ja lääkevirasto FDA alkoi selvittää mahdollista yhteyttä viljattomien ruokavalioiden ja koirien sydänsairauden (DCM) välillä. Tässä artikkelissa käymme läpi, mitä tiede tällä hetkellä sanoo — ja mitä eläinlääkärit suosittelevat.',
    sv: 'Spannmålsfri djurmat har varit en enorm trend de senaste åren. Marknadsföringen lovar en "mer naturlig" kost, men 2018 började amerikanska livsmedels- och läkemedelsmyndigheten FDA utreda ett möjligt samband mellan spannmålsfri kost och hjärtsjukdom (DCM) hos hundar. I denna artikel reder vi ut vad forskningen just nu säger — och vad veterinärer rekommenderar.',
    en: 'Grain-free pet food has been a huge trend in recent years. Marketing promises a "more natural" diet, but in 2018 the U.S. Food and Drug Administration (FDA) began investigating a possible link between grain-free diets and heart disease (DCM) in dogs. In this article we review what the science currently says — and what veterinarians recommend.'
  },
  'article.grainfree.fda.title': {
    fi: 'FDA:n tutkimus ja sydänsairaus',
    sv: 'FDA:s undersökning och hjärtsjukdom',
    en: 'The FDA Investigation and Heart Disease'
  },
  'article.grainfree.fda.text': {
    fi: 'FDA tutki satoja raportteja dilatoivasta kardiomyopatiasta (DCM) — sydänsairaudesta, jossa sydänlihas heikkenee ja sydän laajenee. Huolestuttavaa oli, että DCM:ää esiintyi myös roduilla, jotka eivät perinnöllisesti ole sille alttiita, kuten kultaisillanoutajilla, labradoreilla ja sekarotuisilla koirilla. Raportoiduista ruokavalioista yli 90 % oli viljattomia ja 93 % sisälsi herneitä tai linssejä pääainesosina (FDA). FDA ei kuitenkaan ole osoittanut syy-yhteyttä: viraston mukaan raporttien määrä ei yksinään riitä todistamaan yhteyttä, eikä uusia päivityksiä ole julkaistu marraskuun 2022 jälkeen. Yhteys viljattomien ruokien ja DCM:n välillä on siis edelleen tieteellisesti avoin — ei vahvistettu mutta ei myöskään poissuljettu.',
    sv: 'FDA undersökte hundratals rapporter om dilaterad kardiomyopati (DCM) — en hjärtsjukdom där hjärtmuskeln försvagas och hjärtat vidgas. Det oroande var att DCM även förekom hos raser som inte är ärftligt predisponerade, som golden retriever, labrador och blandraser. Av de rapporterade dieterna var över 90 % spannmålsfria och 93 % innehöll ärtor eller linser som huvudingredienser (FDA). FDA har dock inte påvisat något orsakssamband: enligt myndigheten räcker antalet rapporter inte i sig för att bevisa ett samband, och inga nya uppdateringar har publicerats efter november 2022. Sambandet mellan spannmålsfri mat och DCM är alltså fortfarande vetenskapligt öppet — varken bekräftat eller uteslutet.',
    en: 'The FDA investigated hundreds of reports of dilated cardiomyopathy (DCM) — a heart disease in which the heart muscle weakens and the heart enlarges. What was concerning was that DCM also appeared in breeds not genetically predisposed to it, such as Golden Retrievers, Labradors and mixed breeds. Of the reported diets, over 90% were grain-free and 93% contained peas or lentils as main ingredients (FDA). However, the FDA has not established a causal link: according to the agency, the number of reports alone is not sufficient to prove a connection, and no new updates have been published since November 2022. The link between grain-free food and DCM therefore remains scientifically open — neither confirmed nor ruled out.'
  },
  'article.grainfree.myth.title': {
    fi: 'Tarvitseeko lemmikkini viljatonta ruokaa?',
    sv: 'Behöver mitt husdjur spannmålsfri mat?',
    en: 'Does My Pet Need Grain-Free Food?'
  },
  'article.grainfree.myth.text': {
    fi: 'Markkinointiväite siitä, että viljat ovat pelkkiä "täyteaineita" tai yleinen allergioiden syy, ei perustu tieteeseen. Koirat ovat kehittyneet tuhansia vuosia ihmisen rinnalla, ja niillä on jopa noin 34 kopiota tärkkelystä pilkkovasta AMY2B-geenistä (tyypillisesti 4–34), kun susilla niitä on yleensä vain 2 (Axelsson ym., Nature 2013). Tämän geneettisen sopeutuman ansiosta koira sulattaa kypsennettyä viljaa erittäin tehokkaasti. Vilja-allergia on myös selvästi harvinaisempi kuin eläinproteiiniallergia: yleisimmät ruoka-allergeenit koirilla ovat nauta (34 %), maitotuotteet (17 %) ja kana (15 %), kun taas vehnä aiheuttaa noin 13 %, maissi 4 % ja riisi 2 % tapauksista (Mueller ym., 2016).',
    sv: 'Marknadsföringspåståendet att spannmål bara är "fyllmedel" eller en vanlig orsak till allergier saknar vetenskapligt stöd. Hundar har utvecklats i tusentals år vid människans sida och har upp till cirka 34 kopior av den stärkelsenedbrytande AMY2B-genen (vanligtvis 4–34), medan vargar oftast bara har 2 (Axelsson m.fl., Nature 2013). Tack vare denna genetiska anpassning smälter hunden tillagad spannmål mycket effektivt. Spannmålsallergi är också klart ovanligare än allergi mot animaliskt protein: de vanligaste matallergenerna hos hund är nötkött (34 %), mejeriprodukter (17 %) och kyckling (15 %), medan vete orsakar cirka 13 %, majs 4 % och ris 2 % av fallen (Mueller m.fl., 2016).',
    en: 'Probably not. The marketing claim that grains are merely "fillers" or a common cause of allergies is not supported by science. Dogs have evolved alongside humans for thousands of years and carry up to about 34 copies of the starch-digesting AMY2B gene (typically 4–34), while wolves usually have only 2 (Axelsson et al., Nature 2013). Thanks to this genetic adaptation, dogs digest cooked grains very efficiently. Grain allergy is also clearly less common than animal-protein allergy: the most common food allergens in dogs are beef (34%), dairy (17%) and chicken (15%), while wheat causes about 13%, corn 4% and rice 2% of cases (Mueller et al., 2016).'
  },
  'article.grainfree.cats.title': {
    fi: 'Entä kissat?',
    sv: 'Hur är det med katter?',
    en: 'What About Cats?'
  },
  'article.grainfree.cats.text': {
    fi: 'Kissat ovat lihansyöjiä ja tarvitsevat runsaasti eläinproteiinia. Viljattomat kissanruoat korvaavat kuitenkin viljat usein perunalla, herneillä tai tapiokalla — jolloin hiilihydraattipitoisuus on käytännössä sama tai jopa korkeampi. Tutkimukset osoittavat, että kissat sulattavat myös kasvipohjaiset hiilihydraatit tehokkaasti: tärkkelyksen kokonaissulavuus on yli 93 %, ruoka-aineesta riippuen noin 94–99 % (de-Oliveira ym., 2008). Kissojen ruoassa tärkeintä on riittävä eläinproteiinin ja tauriinin määrä — ei se, onko ruoka viljatonta vai ei.',
    sv: 'Katter är köttätare och behöver rikligt med animaliskt protein. Spannmålsfria kattfoder ersätter dock ofta spannmål med potatis, ärtor eller tapioka — varvid kolhydratinnehållet i praktiken är detsamma eller till och med högre. Studier visar att katter smälter även växtbaserade kolhydrater effektivt: stärkelsens totala smältbarhet är över 93 %, beroende på råvara cirka 94–99 % (de-Oliveira m.fl., 2008). Det viktigaste i kattmaten är tillräckligt med animaliskt protein och taurin — inte huruvida maten är spannmålsfri eller inte.',
    en: 'Cats are carnivores and need plenty of animal protein. However, grain-free cat foods often replace grains with potatoes, peas or tapioca — meaning the carbohydrate content is practically the same or even higher. Studies show cats digest plant-based carbohydrates efficiently too: total starch digestibility is over 93%, ranging from about 94% to 99% depending on the ingredient (de-Oliveira et al., 2008). What matters most in cat food is adequate animal protein and taurine — not whether it is grain-free or not.'
  },
  'article.grainfree.advice.title': {
    fi: 'Eläinlääkärin suositus',
    sv: 'Veterinärens rekommendation',
    en: 'Veterinary Recommendation'
  },
  'article.grainfree.advice.text': {
    fi: 'Älä valitse viljatonta ruokaa ilman lääketieteellistä syytä. Vältä ruokia, joissa herneet, linssit tai kikherneet ovat pääainesosina. Valitse ruoka tunnetuilta valmistajilta, jotka työllistävät eläinravitsemuksen asiantuntijoita ja toteuttavat ruokintakokeita (WSAVA:n suositus). Jos epäilet ruoka-aineallergiaa, ota yhteyttä eläinlääkäriin — oikea diagnoosi tehdään eliminaatiodieetillä, ei vaihtamalla satunnaisesti ruokaa. Jos lemmikkisi syö tällä hetkellä viljatonta ruokaa, keskustele eläinlääkärisi kanssa vaihtoehdoista.',
    sv: 'Välj inte spannmålsfri mat utan medicinsk anledning. Undvik foder där ärtor, linser eller kikärtor är huvudingredienser. Välj foder från etablerade tillverkare som anställer djurnutritionsexperter och genomför utfodringsförsök (WSAVA:s rekommendation). Om du misstänker matallergi, kontakta veterinären — korrekt diagnos ställs med eliminationsdiet, inte genom att slumpmässigt byta foder. Om ditt husdjur för närvarande äter spannmålsfri mat, diskutera dina alternativ med din veterinär.',
    en: 'Do not choose grain-free food without a medical reason. Avoid foods where peas, lentils or chickpeas are among the main ingredients. Choose food from established manufacturers that employ animal nutrition experts and conduct feeding trials (WSAVA recommendation). If you suspect a food allergy, contact your veterinarian — proper diagnosis is made through an elimination diet, not by randomly switching foods. If your pet currently eats grain-free food, discuss your options with your vet.'
  },
  'article.sources.heading': { fi: 'Lähteet', sv: 'Källor', en: 'Sources' },

  // Article: Dental Brushing
  'article.brushing.title': {
    fi: 'Hampaiden harjaus — paras asia, jonka voit tehdä lemmikkisi hampaiden hyväksi',
    sv: 'Tandborstning — det bästa du kan göra för ditt husdjurs tänder',
    en: 'Tooth Brushing — The Best Thing You Can Do for Your Pet\'s Teeth'
  },
  'article.brushing.intro': {
    fi: 'Jo noin 2–3 vuoden ikään mennessä valtaosalla koirista ja kissoista on jonkinasteinen hammassairaus (arviolta 70–80 %, joidenkin tutkimusten mukaan jopa 90 %). Hammassairaudet aiheuttavat kroonista kipua, infektioita ja voivat vahingoittaa jopa sydäntä, munuaisia ja maksaa. Päivittäinen hampaiden harjaus on tehokkain keino ehkäistä näitä ongelmia — ja se on helpompaa kuin luulet.',
    sv: 'Redan vid cirka 2–3 års ålder har de flesta hundar och katter någon grad av tandsjukdom (uppskattningsvis 70–80 %, enligt vissa studier upp till 90 %). Tandsjukdomar orsakar kronisk smärta, infektioner och kan till och med skada hjärtat, njurarna och levern. Daglig tandborstning är det mest effektiva sättet att förebygga dessa problem — och det är enklare än du tror.',
    en: 'By around 2–3 years of age, most dogs and cats have some degree of dental disease (an estimated 70–80%, and up to 90% in some studies). Dental disease causes chronic pain, infections and can even damage the heart, kidneys and liver. Daily tooth brushing is the most effective way to prevent these problems — and it is easier than you think.'
  },
  'article.brushing.why.title': {
    fi: 'Miksi päivittäin?',
    sv: 'Varför dagligen?',
    en: 'Why Daily?'
  },
  'article.brushing.why.text': {
    fi: 'Plakki — bakteerien muodostama pehmeä kerros — alkaa muodostua hampaiden pinnoille 6–8 tunnin kuluessa puhdistuksen jälkeen. Muutamassa päivässä plakki alkaa kovettua hammaskiveksi, jota ei enää saa harjaamalla pois. Siksi päivittäinen harjaus on ratkaisevan tärkeää: se katkaisee kierteen ennen kuin plakki ehtii kovettua. Päivittäinen harjaus vähentää plakin kertymistä merkittävästi, ja se on tutkimusten mukaan selvästi tehokkaampaa kuin harvemmin tehty harjaus — päivittäinen on tavoite.',
    sv: 'Plack — en mjuk beläggning av bakterier — börjar bildas på tandytorna 6–8 timmar efter rengöring. Inom några dagar börjar plack hårdna till tandsten, som inte längre kan avlägsnas med borstning. Därför är daglig borstning avgörande: den bryter cykeln innan plack hinner hårdna. Daglig borstning minskar plackbildningen betydligt och är enligt studier klart effektivare än mindre frekvent borstning — dagligen är målet.',
    en: 'Plaque — a soft layer of bacteria — begins forming on tooth surfaces within 6–8 hours of cleaning. Within a few days, plaque begins to harden into tartar that can no longer be removed by brushing. This is why daily brushing is critical: it breaks the cycle before plaque hardens. Daily brushing reduces plaque buildup substantially and, studies show, is clearly more effective than less frequent brushing — daily is the goal.'
  },
  'article.brushing.how.title': {
    fi: 'Näin harjaat lemmikkisi hampaat',
    sv: 'Så borstar du ditt husdjurs tänder',
    en: 'How to Brush Your Pet\'s Teeth'
  },
  'article.brushing.how.text': {
    fi: 'Käytä aina eläimille tarkoitettua hammastahnaa — ei koskaan ihmisten tahnaa, joka voi sisältää ksylitolia (erittäin myrkyllistä koirille) ja fluorideja. Eläintahnat ovat turvallisia niellä, ja niitä on saatavana lihan- ja kalan makuisina. Parhaiten sopii pehmeä lasten hammasharja, tai sormiharja. Nosta lemmikin huulta ja harjaa hampaat 45 asteen kulmassa ienrajaa vasten pyörivin liikkein. Opettele ensin harjaamaan ulkopinnat, ja jos lemmikkisi antaa niin voi yrittää harjata myös sisäpintoja. Etenkin poskihampaat on hyvä puhdistaa kunnolla. 1–2 minuuttia kerralla riittää.',
    sv: 'Använd alltid tandkräm avsedd för djur — aldrig mänsklig tandkräm som kan innehålla xylitol (extremt giftigt för hundar) och fluorid. Djurtandkräm är säker att svälja och finns i kött- och fisk smaker. Bäst passar en mjuk barntandborste eller fingerborste. Lyft läppen och borsta i 45 graders vinkel mot tandköttsranden med cirkulära rörelser. Lär dig först borsta yttersidorna, och om ditt husdjur tillåter kan du också försöka borsta insidorna. Särskilt kindtänderna är viktiga att rengöra ordentligt. 1–2 minuter räcker.',
    en: 'Always use toothpaste made for pets — never human toothpaste, which may contain xylitol (extremely toxic to dogs) and fluoride. Pet toothpaste is safe to swallow and comes in meat and fish flavors. A soft children\'s toothbrush or finger brush works best. Lift the lip and brush at a 45-degree angle to the gumline using circular motions. First learn to brush the outer surfaces, and if your pet allows, you can also try brushing the inner surfaces. The molars in particular should be cleaned thoroughly. 1–2 minutes is enough.'
  },
  'article.brushing.start.title': {
    fi: 'Näin totutat lemmikkisi harjaukseen',
    sv: 'Så vänjer du ditt husdjur vid borstning',
    en: 'Getting Your Pet Used to Brushing'
  },
  'article.brushing.start.text': {
    fi: 'Aloita rauhallisesti. Ensimmäisellä viikolla totuta lemmikkisi suun käsittelyyn koskettamalla huulia ja hampaita sormella. Toisella viikolla anna lemmikkisi maistaa hammastahnaa sormeltasi ja hiero sitä etuhampaiden pintaan. Kolmannella viikolla ota harja mukaan ja harjaa muutama hammas. Laajenna vähitellen harjattavaa aluetta. Anna aina palkinto jälkeenpäin. Älä pakota — pidä tuokiot lyhyinä ja positiivisina. Pentuiällä aloittaminen on helpointa, mutta myös aikuinen eläin voi oppia hampaiden harjaukseen.',
    sv: 'Börja lugnt. Under första veckan, vänj husdjuret vid munhantering genom att röra vid läppar och tänder med fingret. Under andra veckan, låt husdjuret smaka på tandkrämen från ditt finger och gnid lite på framtänderna. Under tredje veckan, ta med borsten och borsta några tänder. Utöka gradvis det borstade området. Ge alltid belöning efteråt. Tvinga inte — håll stunderna korta och positiva. Det är lättast att börja som valp, men även vuxna djur kan lära sig.',
    en: 'Start slowly. During the first week, get your pet used to mouth handling by touching the lips and teeth with your finger. In the second week, let your pet taste the toothpaste from your finger and rub some on the front teeth. In the third week, introduce the brush and brush a few teeth. Gradually expand the area. Always reward afterward. Never force — keep sessions short and positive. Starting as a puppy is easiest, but adult animals can learn too.'
  },
  'article.brushing.signs.title': {
    fi: 'Hammassairauden merkit',
    sv: 'Tecken på tandsjukdom',
    en: 'Signs of Dental Disease'
  },
  'article.brushing.signs.text': {
    fi: 'Pahanhajuinen hengitys (ei ole normaalia!), punaiset tai turvonneet ikenet, näkyvä hammaskivi, ruuan putoaminen suusta lemmikin syödessä, toispuoleinen pureskelu, kuolaaminen, kasvojen turvotus, haluttomuus antaa koskea päähän, käyttäytymisen muutokset tai painon lasku. Muista, että eläimet piilottavat kipua — monet vakavasti sairaat lemmikit syövät edelleen normaalisti. Omistajat raportoivat usein dramaattisen muutoksen käytöksessä hammashoidon jälkeen.',
    sv: 'Dålig andedräkt (det är inte normalt!), rött eller svullet tandkött, synlig tandsten, tappar mat vid ätande, tuggar bara på ena sidan, dregling, svullnad i ansiktet, ovilja att bli berörd vid huvudet, beteendeförändringar eller viktnedgång. Kom ihåg att djur döljer smärta — många allvarligt sjuka husdjur fortsätter äta normalt. Ägare rapporterar ofta dramatisk beteendeförbättring efter tandbehandling.',
    en: 'Bad breath (this is not normal!), red or swollen gums, visible tartar, dropping food while eating, chewing on one side only, drooling, facial swelling, reluctance to have the head touched, behavioral changes or weight loss. Remember that animals hide pain — many seriously ill pets continue eating normally. Owners often report dramatic behavioral improvement after dental treatment.'
  },
  'article.brushing.professional.title': {
    fi: 'Ammattimainen hammaspuhdistus',
    sv: 'Professionell tandrengöring',
    en: 'Professional Dental Cleaning'
  },
  'article.brushing.professional.text': {
    fi: 'Vaikka harjaisit lemmikin hampaat päivittäin, ammattimainen hammastarkastus ja puhdistus yleisanestesiassa on tarpeen ajoittain. Silloin pääsemme käsittelemään ienrajan alaiset alueet, otamme hammasröntgenkuvat (jopa 60 % hammassairauksista on piilossa ienrajan alla) ja tarkastamme jokaisen hampaan yksitellen. Yleisanestesia on välttämätön turvalliseen ja perusteelliseen puhdistukseen. Niin sanottu "hampaiden puhdistus ilman anestesiaa" on vain kosmeettista — se ei hoida ienrajan alaista sairautta, eikä korvaa eläinlääkärin tekemää hammastarkastusta- tai hoitoa.',
    sv: 'Även om du borstar dagligen behövs professionell tandrengöring under generell anestesi med jämna mellanrum. Vid professionell rengöring kan vi behandla områden under tandköttsranden, ta tandröntgen (upp till 60 % av tandsjukdomar är dolda under tandköttsranden) och undersöka varje tand. Generell anestesi är nödvändig för en säker och grundlig rengöring. Så kallad "anestesifri tandrengöring" är bara kosmetisk — den behandlar inte sjukdom under tandköttsranden och ger en falsk känsla av trygghet.',
    en: 'Even with daily brushing, professional dental cleaning under general anesthesia is needed periodically. During professional cleaning we can treat areas below the gumline, take dental X-rays (up to 60% of dental disease is hidden below the gumline) and examine every tooth. General anesthesia is essential for safe and thorough cleaning. So-called "anesthesia-free dental cleaning" is purely cosmetic — it does not address disease below the gumline and gives a false sense of security.'
  },
  'article.brushing.challenge.title': {
    fi: '#BrushChamp — harjaatko joka päivä?',
    sv: '#BrushChamp — borstar du varje dag?',
    en: '#BrushChamp — Do You Brush Every Day?'
  },
  'article.brushing.challenge.text': {
    fi: 'Eläinklinikka Saarella arvostamme omistajia, jotka sitoutuvat lemmikkinsä hampaiden päivittäiseen harjaamiseen. Jos harjaat lemmikkisi hampaat joka päivä, kerro siitä meille — olet ansainnut #BrushChamp-mitalin! Ota yhteyttä klinikalla tai sähköpostitse: info@saarivet.fi.',
    sv: 'På Djurklinik Saari uppskattar vi ägare som engagerar sig i daglig tandborstning av sitt husdjur. Om du borstar ditt husdjurs tänder varje dag, berätta för oss — hedersmedlemmar får #BrushChamp-medaljen! Kontakta oss på kliniken eller via e-post: info@saarivet.fi.',
    en: 'At Eläinklinikka Saari we value owners who commit to daily tooth brushing. If you brush your pet\'s teeth every day, let us know — dedicated brushers receive the #BrushChamp medal! Contact us at the clinic or by email: info@saarivet.fi.'
  },

  // Article: PerioVive
  'article.periovive.title': {
    fi: 'PerioVive — hyaluronihappogeeli parodontiittisairauksien hoitoon',
    sv: 'PerioVive — hyaluronsyragel för behandling av parodontal sjukdom',
    en: 'PerioVive — Hyaluronic Acid Gel for Periodontal Disease Treatment'
  },
  'article.periovive.intro': {
    fi: 'Parodontiitti (hampaan kiinnityskudostulehdus) on yleisin sairaus koirilla ja kissoilla — jopa 80 % yli kolmevuotiaista koirista kärsii jonkinasteisesta iensairaudesta. Hoitamattomana se johtaa hampaan kiinnityskudosten tuhoutumiseen, luukatoon ja lopulta hampaiden menetykseen. PerioVive on eläinlääketieteelliseen käyttöön kehitetty hyaluronihappogeeli, joka tuo uuden mahdollisuuden parodontiittisairauksien hoitoon hammastoimenpiteiden yhteydessä.',
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
    sv: 'PerioVive är en gel som innehåller 0,8 % hyaluronsyra (HA) och är utformad för veterinärmedicinska tandbehandlingar. Hyaluronsyra förekommer naturligt i bindväv, tandkött och ledvätska och spelar en central roll i vävnadsläkning och regenerering. Gelen appliceras direkt i tandköttsfickor och behandlingsområden under tandbehandlingen.',
    en: 'PerioVive is a 0.8% hyaluronic acid (HA) gel designed for veterinary dental procedures. Hyaluronic acid is a naturally occurring substance in connective tissue, gums and joint fluid that plays a key role in tissue healing and regeneration. The gel is applied directly to periodontal pockets and treatment areas during the dental procedure.'
  },
  'article.periovive.how.title': {
    fi: 'Miten se vaikuttaa?',
    sv: 'Hur fungerar det?',
    en: 'How Does It Work?'
  },
  'article.periovive.how.text': {
    fi: 'Hyaluronihappo vaikuttaa usealla eri mekanismilla. Se vähentää tulehdusta ja turvotusta ikenissä, edistää pehmytkudosten ja luun uusiutumista, tukee verihyytymän vakautta toimenpidealueella, muodostaa suojaavan esteen mikrobeja vastaan ja nopeuttaa kudosten paranemista. Tutkimuksissa yksittäinen annos toimenpiteen jälkeen nopeutti kudosten paranemista, lisäsi luun muodostumista ja vähensi ientaskujen syvyyttä merkittävästi.',
    sv: 'Hyaluronsyra verkar genom flera mekanismer. Den minskar inflammation och svullnad i tandköttet, främjar regenerering av mjukvävnad och ben, stöder blodkoagelstabilitet i behandlingsområdet, bildar en skyddande barriär mot mikrober och påskyndar vävnadsläkning. Studier visar att en enda dos HA efter ingreppet påskyndade vävnadsläkningen, ökade benbildningen och minskade tandköttsfickans djup avsevärt.',
    en: 'Hyaluronic acid works through multiple mechanisms. It reduces inflammation and swelling in the gums, promotes soft tissue and bone regeneration, supports blood clot stability at the treatment site, forms a protective barrier against microbes and accelerates tissue healing. Studies show a single dose of HA after the procedure accelerated tissue healing, increased bone formation and significantly reduced periodontal pocket depth.'
  },
  'article.periovive.evidence.title': {
    fi: 'Tieteellinen näyttö',
    sv: 'Vetenskaplig evidens',
    en: 'Scientific Evidence'
  },
  'article.periovive.evidence.text': {
    fi: 'Hyaluronihapon tehosta parodontiittisairauksien hoidossa on tutkimusnäyttöä sekä koirilta että ihmisiltä. Koirilla tehdyssä tutkimuksessa (Tella ym. 2023) 0,8 % hyaluronihappogeelillä hoidetuissa luuvaurioissa luun korkeudesta uusiutui noin 89 %, kun hoitamattomissa verrokkivaurioissa uusiutui noin 39 %. Ientaskujen syvyyden väheneminen ja kliininen kiinnityskudosten paraneminen olivat tilastollisesti merkitseviä. Tehoa tukevat useat koirilla tehdyt tutkimukset sekä lukuisat ihmistutkimukset, mukaan lukien 13 satunnaistetun vertailututkimuksen meta-analyysi (Eliezer ym. 2019).',
    sv: 'Det finns forskningsbevis för hyaluronsyrans effekt vid behandling av parodontal sjukdom hos både hund och människa. I en hundstudie (Tella m.fl. 2023) återbildades cirka 89 % av benhöjden i defekter som behandlats med 0,8 % hyaluronsyragel, jämfört med cirka 39 % i obehandlade kontrolldefekter. Minskningen av tandköttsfickornas djup och den kliniska fästförbättringen var statistiskt signifikanta. Effekten stöds av flera hundstudier och talrika humanstudier, inklusive en metaanalys av 13 randomiserade kontrollerade studier (Eliezer m.fl. 2019).',
    en: 'There is research evidence for the effectiveness of hyaluronic acid in treating periodontal disease in both dogs and humans. In a canine study (Tella et al. 2023), bone defects treated with 0.8% hyaluronic acid gel regained approximately 89% of lost bone height, compared with approximately 39% in untreated control defects. The reduction in pocket depth and the improvement in clinical attachment were statistically significant. The effectiveness of HA is supported by several canine studies and numerous human studies, including a meta-analysis of 13 randomized controlled trials (Eliezer et al. 2019).'
  },
  'article.periovive.when.title': {
    fi: 'Milloin PerioVivea käytetään?',
    sv: 'När används PerioVive?',
    en: 'When is PerioVive Used?'
  },
  'article.periovive.when.text': {
    fi: 'PerioVive soveltuu käytettäväksi syventyneiden ientaskujen hoitoon, hampaanpoiston jälkeisen paranemisen edistämiseen, ikenien kirurgisten toimenpiteiden yhteydessä sekä parodontiittisairauksien etenemisen hidastamiseen. Geeli levitetään toimenpidealueelle nukutuksen aikana, joten erillistä käyntiä ei tarvita.',
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
    sv: 'På Djurklinik Saari erbjuder vi PerioVive-behandling som en del av vår omfattande tandvård. Vi använder PerioVive i samband med tandbehandlingar för att främja läkning av tandkött och ben. Fråga mer vid nästa besök eller kontakta kliniken — vi bedömer gärna om ditt husdjur skulle dra nytta av PerioVive-behandling.',
    en: 'At Eläinklinikka Saari, we offer PerioVive treatment as part of our extensive dental care services. We use PerioVive during dental procedures to promote gum and bone healing. Ask us more at your next visit or contact the clinic — we are happy to assess whether your pet would benefit from PerioVive treatment.'
  },

  // Article 9: Independent Clinic
  'article.independent.tag': { fi: 'Klinikka', sv: 'Klinik', en: 'Clinic' },
  'article.independent.title': {
    fi: 'Miksi itsenäinen eläinklinikka on tärkeä valinta?',
    sv: 'Varför är en självständig djurklinik ett viktigt val?',
    en: 'Why Choosing an Independent Veterinary Clinic Matters'
  },
  'article.independent.intro': {
    fi: 'Suomen eläinlääkärimarkkinat ovat muuttuneet dramaattisesti viimeisen vuosikymmenen aikana. Kaksi ulkomaalaisomisteista ketjua — Evidensia ja Vireä — hallitsevat nyt 50–70 % markkinoista. Eläinklinikka Saari on Vaasan ainoa perheomisteinen pieneläinklinikka, ja haluamme kertoa, miksi se on merkityksellistä.',
    sv: 'Den finländska veterinärmarknaden har förändrats dramatiskt under det senaste årtiondet. Två utlandsägda kedjor — Evidensia och Vireä — kontrollerar nu 50–70 % av marknaden. Djurklinik Saari är den enda familjeägda smådjurskliniken i Vasa, och vi vill berätta varför det spelar roll.',
    en: 'The Finnish veterinary market has changed dramatically over the past decade. Two foreign-owned chains — Evidensia and Vireä — now control 50–70% of the market. Eläinklinikka Saari is the only family-owned small animal clinic in Vaasa, and we want to explain why that matters.'
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
    fi: 'Kilpailu- ja kuluttajaviraston (KKV) marraskuussa 2024 julkaiseman tutkimuksen mukaan Evidensia nosti hintojaan 28 % vuosina 2021–2024 — 15 prosenttiyksikköä enemmän kuin alan keskiarvo. Kotitalouksien eläinlääkärikustannukset ovat kaksinkertaistuneet kymmenessä vuodessa. Itsenäiset klinikat ovat KKV:n mukaan johdonmukaisesti edullisempia kuin ketjuuntuneet klinikat.',
    sv: 'Enligt en studie publicerad av Konkurrens- och konsumentverket (KKV) i november 2024 höjde Evidensia sina priser med 28 % mellan 2021 och 2024 — 15 procentenheter mer än branschgenomsnittet. Hushållens veterinärutgifter har fördubblats på tio år. Enligt KKV är självständiga kliniker konsekvent billigare än kedjekliniker.',
    en: 'According to a study published by the Finnish Competition and Consumer Authority (KKV) in November 2024, Evidensia raised its prices by 28% between 2021 and 2024 — 15 percentage points above the industry average. Household spending on veterinary care has doubled in ten years. According to KKV, independent clinics are consistently more affordable than chain clinics.'
  },
  'article.independent.quality.title': {
    fi: 'Miten ketjuuntuminen vaikuttaa lemmikkien hoitoon?',
    sv: 'Vad innebär kedjeetableringen för vården?',
    en: 'What Does Chain Ownership Mean for Care?'
  },
  'article.independent.quality.text': {
    fi: 'Kun sijoitusyhtiöt omistavat klinikat, ensisijainen tavoite on tuotto sijoittajille. Eläinlääkäreiltä odotetaan enemmän potilaita vuoroa kohden ja tulostavoitteet ohjaavat hoitopäätöksiä. YLE:n selvityksen mukaan ketjuissa hinnat nousivat 2–4 kertaa vuodessa, mutta palkat eivät nousseet kolmeen vuoteen. Hoitohenkilökunta ei uskalla puhua, koska monilla alueilla ei ole vaihtoehtoista työnantajaa.',
    sv: 'När investeringsbolag äger kliniker är det primära målet avkastning till investerarna. Veterinärer förväntas ta emot fler patienter per skift och resultatmål styr behandlingsbeslut. Enligt YLE:s undersökning höjdes priserna 2–4 gånger per år i kedjorna, men lönerna steg inte på tre år. Vårdpersonal vågar inte tala ut eftersom det på många orter inte finns en alternativ arbetsgivare.',
    en: 'When investment firms own clinics, the primary goal is return for investors. Veterinarians are expected to see more patients per shift and revenue targets influence treatment decisions. According to YLE\'s investigation, chain prices rose 2–4 times per year, but staff salaries did not increase for three years. Staff are afraid to speak up because in many regions there is no alternative employer.'
  },
  'article.independent.international.title': {
    fi: 'Kansainvälinen esimerkki',
    sv: 'Internationella exempel',
    en: 'International Examples'
  },
  'article.independent.international.text': {
    fi: 'Iso-Britanniassa eläinlääkärimarkkinat ketjuistuivat aikaisemmin. Itsenäisten klinikoiden osuus laski 83 %:sta 45 %:iin kahdeksassa vuodessa, ja hinnat nousivat 63 %. Maan kilpailuviranomainen (CMA) totesi, että ketjuklinikoissa maksetaan keskimäärin 16,6 % enemmän kuin itsenäisillä. Ruotsissa Evidensian hinnat nousivat 15 % vuodessa — itsenäisillä vain 6 %.',
    sv: 'I Storbritannien sammanslogs veterinärmarknaden tidigare. Andelen självständiga kliniker sjönk från 83 % till 45 % på åtta år, och priserna steg med 63 %. Landets konkurrensmyndighet (CMA) konstaterade att kedjekliniker i genomsnitt är 16,6 % dyrare än självständiga. I Sverige steg Evidensias priser med 15 % per år — medan självständiga kliniker bara höjde med 6 %.',
    en: 'In the UK, veterinary market consolidation happened earlier. Independent clinics dropped from 83% to 45% in eight years, and prices rose 63%. The Competition and Markets Authority (CMA) found that chain clinics charge on average 16.6% more than independents. In Sweden, Evidensia raised prices 15% per year — independents only 6%.'
  },
  'article.independent.choice.title': {
    fi: 'Eläinklinikka Saari — tietoinen valinta',
    sv: 'Djurklinik Saari — ett medvetet val',
    en: 'Eläinklinikka Saari — A Conscious Choice'
  },
  'article.independent.choice.text': {
    fi: 'Olemme saaneet useita yhteydenottoja ketjuilta, jotka haluaisivat ostaa klinikkamme. Olemme päättäneet pysyä itsenäisenä. Meille tämä tarkoittaa, että hoitopäätökset tekee aina eläinlääkäri — ei sijoitusyhtiö. Hintamme perustuvat todellisiin kustannuksiin, emme noudata konsernin tulostavoitteita. Sama eläinlääkäri hoitaa lemmikkisi koko sen elämän ajan. Tulomme jäävät Vaasaan. Kun valitset itsenäisen klinikan, tuet myös suomalaista yrittäjyyttä ja kilpailua markkinoilla, jotka keskittyvät yhä harvempiin käsiin.',
    sv: 'Vi har fått flera förfrågningar från kedjor som vill köpa vår klinik. Vi har beslutat att förbli självständiga. För oss innebär detta att behandlingsbeslut alltid fattas av veterinären — inte av ett investeringsbolag. Våra priser baseras på verkliga kostnader, vi följer inga koncernens resultatmål. Samma veterinär tar hand om ditt husdjur hela dess liv. Våra intäkter stannar i Vasa. När du väljer en självständig klinik stödjer du också finländskt företagande och konkurrens på en marknad som koncentreras i allt färre händer.',
    en: 'We have received multiple offers from chains wanting to buy our clinic. We have chosen to remain independent. For us this means that treatment decisions are always made by the veterinarian — not an investment firm. Our prices are based on actual costs, not corporate revenue targets. The same vet cares for your pet throughout its life. Our revenue stays in Vaasa. When you choose an independent clinic, you also support Finnish entrepreneurship and competition in a market that is concentrating into fewer and fewer hands.'
  },

  // Article 10: Food Allergies
  'article.food.tag': { fi: 'Lemmikkien terveys', sv: 'Husdjurshälsa', en: 'Pet Health' },
  'article.food.title': {
    fi: 'Ruoka-allergiat koirilla ja kissoilla — oireet, diagnoosi ja eliminaatiodieetti',
    sv: 'Födoämnesallergi hos hundar och katter — symtom, diagnos och eliminationsdiet',
    en: 'Food Allergies in Dogs and Cats — Symptoms, Diagnosis and Elimination Diet'
  },
  'article.food.intro': {
    fi: 'Ruoka-aineallergia on yksi kutinaa aiheuttavista sairauksista koirilla ja kissoilla, joskin selvästi harvinaisempi syy kuin ympäristöperäinen allergia (atopia). Monet omistajat ajattelevat viljojen olevan ongelma, mutta tutkimukset osoittavat selvästi: yleisimmät allergeenit ovat eläinproteiineja — nauta (34 %), maito (17 %) ja kana (15 %). Oikea diagnoosi vaatii eliminaatiodieetin, ja me autamme siinä.',
    sv: 'Födoämnesallergi är en av orsakerna till klåda hos hundar och katter, men en klart ovanligare orsak än miljöallergi (atopi). Många ägare tror att spannmål är problemet, men forskning visar tydligt: de vanligaste allergenerna är animaliska proteiner — nötkött (34 %), mjölk (17 %) och kyckling (15 %). En korrekt diagnos kräver en eliminationsdiet, och vi hjälper dig med det.',
    en: 'Food allergy is one of the causes of itching in dogs and cats, though a clearly less common cause than environmental allergy (atopy). Many owners believe grains are the problem, but research clearly shows: the most common allergens are animal proteins — beef (34%), dairy (17%) and chicken (15%). A correct diagnosis requires an elimination diet, and we can help you with that.'
  },
  'article.food.symptoms.title': {
    fi: 'Oireet',
    sv: 'Symtom',
    en: 'Symptoms'
  },
  'article.food.symptoms.text': {
    fi: 'Ruoka-aine allergian tyypillisimpiä oireita ovat kutina, toistuvat korvatulehdukset, tassujen nuoleminen, ihotulehdukset ja vatsaoireet (oksentelu, ripuli). Kissoilla oireet ilmenevät usein pään ja kaulan alueen kutinana. Toisin kuin ympäristöön liittyvät allergiat, ruoka-aine allergia ei ole kausittainen — oireet jatkuvat ympäri vuoden. Jos lemmikkisi ulostaa yli kaksi kertaa päivässä ja iho-oireet alkoivat alle vuoden iässä, ruoka-allergia on erityisen todennäköinen.',
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
    fi: 'Allergiaverikokeet ruoka-aineille eivät ole luotettavia — tutkimuksessa kaikki 30 tervettä koiraa ilman allergia historiaa saivat virheellisiä positiivisia tuloksia. Ainoa luotettava menetelmä on eliminaatioruokavalio: lemmikille syötetään 8–12 viikon ajan ainoastaan hydrolysoitua proteiiniruokaa, jossa proteiinit on pilkottu niin pieniksi, ettei immuunijärjestelmä tunnista niitä.',
    sv: 'Allergiblodprov för livsmedel är inte tillförlitliga — i en studie fick alla 30 friska hundar utan allergihistorik felaktigt positiva resultat. Den enda tillförlitliga metoden är en eliminationsdiet: husdjuret matas under 8–12 veckor uteslutande med hydrolyserad proteinmat där proteinerna har brutits ner till så små delar att immunsystemet inte känner igen dem.',
    en: 'Allergy blood tests for food are not reliable — in one study, all 30 healthy dogs with no allergy history received false positive results. The only reliable method is an elimination diet: the pet is fed for 8–12 weeks exclusively hydrolyzed protein food where proteins have been broken down so small that the immune system cannot recognize them.'
  },
  'article.food.strict.title': {
    fi: 'Eliminaatioruokavalion säännöt',
    sv: 'Regler för eliminationsdiet',
    en: 'Elimination Diet Rules'
  },
  'article.food.strict.text': {
    fi: 'Eliminaatiodieetin on oltava ehdottoman tiukka. Lemmikin suuhun saa mennä VAIN eliminaatidieettiruokaa. Ei makupaloja, ei ihmisruokaa, ei raakaruokia tai puruluita, ei maustettua hammastahnaa, ei maustettuja lääkkeitä (matolääkkeet, punkkitabletit). Lääkkeet vaihdetaan maustamattomiin vaihtoehtoihin. Kaupasta saatavat eläintenruoat eivät täytä eliminaatiodieetin vaatimuksia — tutkimukset osoittavat, että 33–83 % niistä sisältää ilmoittamattomia proteiineja. Siksi käytämme aina eläinlääkärin reseptiruokia.',
    sv: 'Eliminationsdieten måste vara absolut strikt. BARA eliminationsmat får gå i husdjurets mun. Inga godisbitar, ingen människomat, inga råhudsben eller tuggben, ingen smaksatt tandkräm, inga smaksatta mediciner (avmaskningsmedel, fästingtabletter). Mediciner byts till osmakade alternativ. Butikens "begränsad ingrediens"-foder duger inte — studier visar att 33–83 % av dem innehåller odeklarerade proteiner. Därför använder vi alltid veterinärrecept-foder.',
    en: 'The elimination diet must be absolutely strict. ONLY the elimination food may enter your pet\'s mouth. No treats, no human food, no rawhide or chew bones, no flavored toothpaste, no flavored medications (dewormers, flea/tick tablets). Medications are switched to unflavored alternatives. Store-bought "limited ingredient" foods are not suitable — studies show 33–83% of them contain undeclared proteins. That is why we always use veterinary prescription diets.'
  },
  'article.food.challenge.title': {
    fi: 'Haastevaihe ja pitkäaikaishoito',
    sv: 'Provokationsfas och långtidsvård',
    en: 'Challenge Phase and Long-Term Management'
  },
  'article.food.challenge.text': {
    fi: 'Jos oireet paranevat eliminaatiodieetillä, diagnoosi varmistetaan syöttämällä vanhaa ruokaa uudelleen. Noin 80 % koirista reagoi viikon kuluessa ja noin 90 % kahden viikon kuluessa; kissat reagoivat yleensä nopeammin. Tämän jälkeen palataan eliminaatioruokaan ja testataan yksittäisiä proteiineja yksitellen. Näin selviää, mitkä proteiinit ovat turvallisia ja mitä on vältettävä. Ruoka-aineista johtuvaa allergiaa ei voi parantaa, mutta kun allergeenejä välttää, lemmikki voi elää täysin oireetonta elämää ilman lääkitystä. Eläinlääkärin ohjauksessa tehty eliminaatiodieetti on tehokas ja turvallinen prosessi.',
    sv: 'Om symtomen förbättras med eliminationsdieten bekräftas diagnosen genom att ge den gamla maten igen. Cirka 80 % av hundarna reagerar inom en vecka och cirka 90 % inom två veckor; katter reagerar oftast snabbare. Därefter återgår man till eliminationsdieten och testar enskilda proteiner en i taget. Så klargörs vilka proteiner som är säkra och vilka som måste undvikas. Födoämnesallergi kan inte botas, men när allergener undviks kan husdjuret leva helt symtomfritt utan medicinering. Under veterinärens vägledning är eliminationsdieten en effektiv och säker process.',
    en: 'If symptoms improve on the elimination diet, the diagnosis is confirmed by reintroducing the old food. About 80% of dogs react within one week and about 90% within two weeks; cats usually react faster. After this, the pet returns to the elimination diet and individual proteins are tested one at a time. This reveals which proteins are safe and which must be avoided. Food allergy cannot be cured, but when allergens are avoided, your pet can live completely symptom-free without medication. Under veterinary guidance, the elimination diet is an effective and safe process.'
  },
  'article.food.clinic.title': {
    fi: 'Ruoka-allergiatutkimukset klinikallamme',
    sv: 'Födoämnesallergiutredning på vår klinik',
    en: 'Food Allergy Investigations at Our Clinic'
  },
  'article.food.clinic.text': {
    fi: 'Eläinklinikka Saarella autamme sinua allergian tutkimisessa ja hoidossa. Suunnittelemme yksilöllisen eliminaatiodieetin lemmikillesi, hoidamme samalla sekundaariset iho- ja korvainfektiot ja seuraamme edistymistä koko prosessin ajan. Myymme klinikaltamme myös eliminaatiodieettiin sopivia ruokia ja voimme neuvoa sopivan ruokavalion valinnassa.',
    sv: 'På Djurklinik Saari hjälper vi dig med utredning och behandling av födoämnesallergi. Vi planerar en individuell eliminationsdiet för ditt husdjur, behandlar samtidigt sekundära hud- och öroninfektioner och följer upp framstegen under hela processen. Vi säljer även eliminationsdieter på kliniken och kan rådge om rätt kostval.',
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
    fi: 'Tyypillisimpiä oireita ovat painonlasku hyvästä ruokahalusta huolimatta, lisääntynyt juominen ja virtsaaminen, oksentelu, ripuli, yliaktiivisuus tai levottomuus, huono turkki ja nopea sydämen syke. Joillakin kissoilla esiintyy myös laihtumista, lihaskatoa ja käytösmuutoksia. Oireet kehittyvät yleensä hitaasti, ja omistajat saattavat pitää niitä normaalina ikääntymiseen liittyvinä muutoksina.',
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
    fi: 'Hoitamaton hypertyreoosi voi aiheuttaa sydämen liikakasvua (hypertrofinen kardiomyopatia), korkean verenpaineen, verkkokalvon irtoamisen ja näköhäiriöitä. Tärkeä yhteys on myös munuaissairauteen: hypertyreoosi lisää munuaisten verenkiertoa, mikä voi peittää taustalla olevan munuaisten vajaatoiminnan. Kun kilpirauhasen toiminta korjataan, piilevä munuaissairaus saattaa paljastua. Siksi munuaisarvoja seurataan tarkasti hoidon aikana.',
    sv: 'Obehandlad hypertyreos kan orsaka hjärtförstoring (hypertrofisk kardiomyopati), högt blodtryck, näthinneavlossning och synstörningar. Det finns även ett viktigt samband med njursjukdom: hypertyreos ökar blodflödet till njurarna, vilket kan dölja en underliggande njursvikt. När sköldkörtelfunktionen korrigeras kan en dold njursjukdom avslöjas. Därför övervakas njurvärdena noggrant under behandlingen.',
    en: 'Untreated hyperthyroidism can cause heart enlargement (hypertrophic cardiomyopathy), high blood pressure, retinal detachment and vision problems. There is also an important connection to kidney disease: hyperthyroidism increases blood flow to the kidneys, which can mask underlying kidney failure. When thyroid function is corrected, hidden kidney disease may be revealed. That is why kidney values are monitored closely during treatment.'
  },
  'article.hyperthyroid.treatment.title': {
    fi: 'Hoitovaihtoehdot',
    sv: 'Behandlingsalternativ',
    en: 'Treatment Options'
  },
  'article.hyperthyroid.treatment.text': {
    fi: 'Hoitovaihtoehtoja on neljä: 1) Päivittäinen lääkitys (metimatsoli/Felimazole) — yleisin vaihtoehto, edullinen mutta elinikäinen. 2) Leikkaus (tyreoidektomia) — kilpirauhasen poisto, parantava hoito. 3) Radiojodihoito (I-131) — kultastandardi, yksi hoitokerta parantaa yli 95 % tapauksista, mutta vaatii hoitoon erikoistunutta eläinklinikkaa. 4) Reseptiruokavalio (Hill\'s y/d) — jodirajoitettu ruoka, sopii lieväoireisille kissoille. Klinikallamme autamme valitsemaan parhaan hoitomuodon kissasi tilanteeseen.',
    sv: 'Det finns fyra behandlingsalternativ: 1) Daglig medicinering (metimazol/Felimazole) — det vanligaste alternativet, prisvärt men livslångt. 2) Kirurgi (tyreoidektomi) — borttagning av sköldkörteln, botande behandling. 3) Radiojodbehandling (I-131) — guldstandard, en behandling botar över 95 % av fallen men kräver specialklinik. 4) Receptbelagd kost (Hill\'s y/d) — jodbegränsad mat, lämplig för katter med lindriga symtom. På vår klinik hjälper vi dig välja den bästa behandlingen för din katts situation.',
    en: 'There are four treatment options: 1) Daily medication (methimazole/Felimazole) — the most common option, affordable but lifelong. 2) Surgery (thyroidectomy) — removal of the thyroid gland, a curative treatment. 3) Radioactive iodine therapy (I-131) — the gold standard, one treatment cures over 95% of cases but requires a specialized clinic. 4) Prescription diet (Hill\'s y/d) — iodine-restricted food, suitable for cats with mild symptoms. At our clinic, we help you choose the best treatment for your cat\'s situation.'
  },

  // Article 12: Kidney Disease
  'article.kidney.tag': { fi: 'Lemmikkien terveys', sv: 'Husdjurshälsa', en: 'Pet Health' },
  "article.kidney.title": {
    fi: "Krooninen munuaissairaus (munuaisten vajaatoiminta) koiralla ja kissalla – oireet, vaiheet, hoito ja elinikä",
    sv: "Kronisk njursjukdom (njursvikt) hos hund och katt – symtom, stadier, behandling och livslängd",
    en: "Chronic kidney disease (kidney failure) in dogs and cats — symptoms, stages, treatment and life expectancy"
  },
  "article.kidney.intro": {
    fi: "Krooninen munuaissairaus, arkikielessä munuaisten vajaatoiminta, on yksi ikääntyvien kissojen yleisimmistä sairauksista: arviolta 30–40 %:lla tai useammallakin yli 10-vuotiaista kissoista on jonkinasteinen munuaissairaus, useimmilla vielä lievä. Koirilla se on paljon harvinaisempi, ja suurin osa tapauksista todetaan yli 10–12-vuotiailla. Munuaiset menettävät toimintakykyään hitaasti ja peruuttamattomasti, ja ensimmäiset merkit jäävät helposti huomaamatta. Munuaisten vajaatoiminta ei silti ole välitön kuolemantuomio: kun sairaus todetaan varhain ja ruokavalio sekä hoito ovat kohdallaan, moni kissa elää vielä vuosia ja koira useita kuukausia tai vuosia, ja elämänlaatu pysyy hyvänä. Tässä artikkelissa kerromme, miten oireet tunnistaa, mitä IRIS-vaiheet tarkoittavat, miten hoidamme munuaispotilaita Eläinklinikka Saarella, mitä munuaispotilaalle kannattaa syöttää ja mitä on odotettavissa.",
    sv: "Kronisk njursjukdom (CKD), i vardagligt tal njursvikt, är en av de vanligaste sjukdomarna hos äldre katter: uppskattningsvis 30–40 % eller fler av katterna över 10 år har någon grad av njursjukdom, i de flesta fall ännu lindrig. Hos hund är den betydligt ovanligare, och de flesta fallen gäller hundar över 10–12 år. Njurarna förlorar sin funktion långsamt och oåterkalleligt, och de första tecknen är lätta att missa. Men njursvikt är ingen omedelbar dödsdom – med tidig diagnos, rätt diet och rätt behandling lever många katter i flera år, och hundar i allt från många månader upp till flera år, med god livskvalitet. I den här artikeln går vi igenom hur du känner igen symtomen, vad IRIS-stadierna betyder, hur vi behandlar njurpatienter på Djurklinik Saari, vad djuret ska äta och vad du kan vänta dig.",
    en: "Chronic kidney disease (CKD), commonly called kidney failure, is one of the most common diseases of older cats: an estimated 30–40 % or more of cats over 10 years old have some degree of kidney disease, most of it still mild. In dogs it is much rarer, and most cases are in dogs over 10–12 years. The kidneys lose function slowly and irreversibly, and the first signs are easy to miss. But kidney failure is not an immediate death sentence — with early diagnosis, the right diet and treatment, many cats live for years and dogs for many months to years with a good quality of life. This article explains how to recognise the symptoms, what the IRIS stages mean, how we treat kidney patients at Saari Animal Clinic, what to feed, and what to expect."
  },
  "article.kidney.symptoms.title": {
    fi: "Mitkä ovat munuaisten vajaatoiminnan oireet koiralla ja kissalla?",
    sv: "Vilka är symtomen på njursvikt hos hund och katt?",
    en: "What are the symptoms of kidney failure in dogs and cats?"
  },
  "article.kidney.symptoms.text": {
    fi: "Ensimmäiset merkit ovat hienovaraisia: lemmikki juo ja virtsaa aiempaa enemmän (kissan hiekkalaatikko kastuu nopeammin, koira pyytää ulos useammin), ruokahalu heikkenee hieman ja paino laskee vähitellen. Sairauden edetessä oireet selkiytyvät: oksentelu, ripuli tai ummetus, kiilloton ja hoitamaton turkki, lihasten surkastuminen, väsymys, ammoniakilta haiseva hengitys, anemian vaalentamat ikenet ja suun haavaumat. Kissa muuttuu usein vain hiljaisemmaksi, piileskelee enemmän ja lopettaa turkkinsa hoitamisen. Koska muutokset tulevat kuukausien kuluessa, omistaja huomaa ne usein vasta, kun munuaisten toiminnasta on jo menetetty kaksi kolmasosaa – siksi suosittelemme yli 7-vuotiaille lemmikeille vuosittaista veri- ja virtsakoetta. Kissoilla painonlasku voi olla mitattavissa jo vuosia ennen diagnoosia, ja kolmasosalla kissoista ei ole lainkaan oireita, kun sairaus löytyy verikokeessa.",
    sv: "De tidigaste tecknen är diskreta: djuret dricker mer och kissar mer (kattlådan blir våt snabbare, hunden ber om att få gå ut oftare), aptiten sjunker en aning och vikten smyger nedåt. När sjukdomen fortskrider blir tecknen tydligare: kräkningar, diarré eller förstoppning, glanslös och ovårdad päls, muskelförtvining, orkeslöshet, dålig andedräkt med en ammoniakliknande lukt, blekt tandkött på grund av blodbrist och sår i munnen. Katter blir ofta bara tystare, gömmer sig mer och slutar tvätta sig. Eftersom förändringarna kommer smygande under månader märker ägaren dem ofta först när två tredjedelar av njurfunktionen redan är borta – därför rekommenderar vi ett årligt blod- och urinprov för djur över 7 år. Hos katt kan viktnedgången vara mätbar flera år före diagnosen, och en tredjedel av katterna visar inga tecken alls när sjukdomen upptäcks i ett blodprov.",
    en: "The earliest signs are subtle: the pet drinks more and urinates more (the litter box gets wet faster, the dog asks to go out more often), appetite drops a little and weight creeps down. As the disease progresses the signs become clearer: vomiting, diarrhoea or constipation, a dull, unkempt coat, muscle wasting, lethargy, bad breath with an ammonia-like smell, pale gums from anaemia and mouth ulcers. Cats often just become quieter, hide more and stop grooming. Because the changes come on over months, owners frequently notice them only when two thirds of kidney function is already gone — which is why we recommend a yearly blood and urine test for pets over 7. In cats, weight loss can be measurable years before diagnosis, and a third of cats show no signs at all when the disease is found in a blood test."
  },
  "article.kidney.causes.title": {
    fi: "Mistä munuaisten vajaatoiminta johtuu koiralla ja kissalla?",
    sv: "Vad orsakar njursvikt hos hund och katt?",
    en: "What causes kidney failure in dogs and cats?"
  },
  "article.kidney.causes.text": {
    fi: "Krooninen munuaissairaus on yleensä munuaiskudoksen hidasta kulumista iän myötä, eikä yksittäistä syytä usein löydy. Tunnettuja altistavia tekijöitä ovat korkea verenpaine, munuaistulehdukset ja munuaiskivet sekä perinnölliset sairaudet, kuten persialaisten ja niiden sukuisten kissarotujen monirakkulainen munuaissairaus; myös hammassairaudet on yhdistetty munuaissairauteen molemmilla lajeilla, vaikka niiden ei ole osoitettu aiheuttavan sitä. Akuutti munuaisten vajaatoiminta on eri asia: se iskee äkillisesti, missä iässä tahansa, myrkyn tai tulehduksen seurauksena – pakkasneste (etyleeniglykoli), viinirypäleet ja rusinat koirilla, liljat kissoilla, ihmisten kipulääkkeiden, kuten ibuprofeenin, yliannostus, leptospiroosi tai verenmyrkytykseen johtava tila, kuten kohtutulehdus (pyometra). Akuutti vajaatoiminta on hätätilanne: nopeasti hoidettuna munuaiset voivat usein toipua, mutta eivät aina – vaikeista tapauksista noin puolet menetetään. Kroonista vajaatoimintaa ei sen sijaan voi parantaa, sitä voidaan vain hidastaa.",
    sv: "Kronisk njursjukdom är oftast ett långsamt slitage av njurvävnaden med åldern, och ofta hittas ingen enskild orsak. Kända bidragande faktorer är högt blodtryck, njurinfektioner och njurstenar samt ärftliga tillstånd som polycystisk njursjukdom hos perser och besläktade kattraser; också tandsjukdom har ett samband med njursjukdom hos båda djurslagen, även om det inte är bevisat att den orsakar njursjukdomen. Akut njursvikt är något annat: den slår till plötsligt, i vilken ålder som helst, efter ett gift eller en infektion – kylarvätska (glykol), vindruvor och russin hos hund, liljor hos katt, överdoser av värkmediciner för människor (till exempel ibuprofen), leptospiros eller ett septiskt tillstånd som livmoderinflammation (pyometra). Akut njursvikt är ett nödfall: med snabb behandling kan njurarna ofta återhämta sig, men inte alltid – ungefär hälften av de svåra fallen går förlorade – medan kronisk njursvikt inte kan vändas, bara bromsas.",
    en: "Chronic kidney disease is usually a slow wearing-out of the kidney tissue with age, and often no single cause is found. Known contributors are high blood pressure, kidney infections and stones, and hereditary conditions such as polycystic kidney disease in Persian and related cat breeds; dental disease is also linked with kidney disease in both species, although it has not been proven to cause it. Acute kidney failure is different: it strikes suddenly, at any age, after a toxin or infection — antifreeze (ethylene glycol), grapes and raisins in dogs, lilies in cats, overdoses of human painkillers such as ibuprofen, leptospirosis, or a septic condition such as pyometra. Acute failure is an emergency: treated quickly, the kidneys can often recover, but not always — roughly half of severe cases are lost — whereas chronic failure cannot be reversed, only slowed."
  },
  "article.kidney.diagnosis.title": {
    fi: "Miten munuaissairaus todetaan?",
    sv: "Hur diagnostiseras njursjukdom hos hund och katt?",
    en: "How is kidney disease diagnosed?"
  },
  "article.kidney.diagnosis.text": {
    fi: "Diagnoosi tehdään verestä ja virtsasta. Verikokeesta mitataan kreatiniini, urea (BUN), fosfori ja kalium sekä meillä myös SDMA – merkkiaine, joka nousee, kun munuaisten toiminnasta on menetetty noin 40 %, eli kuukausia tai vuosia ennen kreatiniinia. Virtsakoe kertoo, pystyvätkö munuaiset vielä väkevöimään virtsaa (ominaispaino) ja vuotaako virtsaan valkuaista (UPC-suhde). Mittaamme verenpaineen, koska korkea verenpaine on sekä munuaissairauden seuraus että sitä pahentava tekijä, ja vatsan ultraäänessä näemme munuaisten koon ja rakenteen sekä etsimme kiviä, tukoksia tai kasvaimia. Yksi koholla oleva arvo ei vielä ole diagnoosi: vaihe määritetään vähintään kahdella eri kerralla otetuista näytteistä, kun potilas on vakaa ja hyvin nesteytetty. Siksi toistamme verikokeen usein muutaman viikon kuluttua, ennen kuin nimeämme hoitoa ohjaavan IRIS-vaiheen.",
    sv: "Diagnosen ställs med blod- och urinprov. Blodprovet mäter kreatinin, urea (BUN), fosfor och kalium, och hos oss också SDMA – en markör som stiger när ungefär 40 % av njurfunktionen har gått förlorad, månader till år innan kreatininet gör det. Urinprovet visar om njurarna fortfarande kan koncentrera urinen (specifik vikt) och om det läcker protein (UPC-kvot). Vi mäter blodtrycket, eftersom högt blodtryck både är en följd av njursjukdomen och förvärrar den, och ett ultraljud av buken visar njurarnas storlek och struktur och avslöjar eventuella stenar, stopp eller tumörer. Ett enda förhöjt värde är ingen diagnos: stadiet bestäms utifrån prover tagna vid minst två tillfällen på en stabil patient i god vätskebalans, och därför tar vi ofta om blodprovet efter några veckor innan vi fastställer det IRIS-stadium som styr behandlingen.",
    en: "Diagnosis is made from blood and urine. The blood test measures creatinine, urea (BUN), phosphorus and potassium, and at our clinic also SDMA — a marker that rises when about 40 % of kidney function is lost, months to years before creatinine does. The urine test shows whether the kidneys can still concentrate urine (specific gravity) and whether protein is leaking (UPC ratio). We measure blood pressure, because high blood pressure both results from and worsens kidney disease, and an abdominal ultrasound shows the size and structure of the kidneys and looks for stones, obstruction or tumours. A single raised value is not a diagnosis: the stage is set from tests taken on at least two occasions in a stable, well-hydrated patient, which is why we often repeat the blood test after a few weeks before naming the IRIS stage that guides treatment."
  },
  "article.kidney.stages.title": {
    fi: "Mitä munuaissairauden IRIS-vaiheet tarkoittavat?",
    sv: "Vad betyder IRIS-stadierna vid njursjukdom?",
    en: "What are the IRIS stages of kidney disease?"
  },
  "article.kidney.stages.text": {
    fi: "Kansainvälinen munuaissairauksien asiantuntijajärjestö IRIS (International Renal Interest Society) luokittelee kroonisen munuaissairauden neljään vaiheeseen veren kreatiniinin ja SDMA:n perusteella. Vaihe 1: kreatiniini on normaali, mutta munuaisissa on jokin muu poikkeavuus – pysyvästi koholla oleva SDMA, laimea virtsa (kissoilla), valkuaista virtsassa tai muutoksia ultraäänessä. Vaihe 2: lievä sairaus; kreatiniini normaali tai hieman koholla, oireet yleensä lieviä tai niitä ei ole lainkaan, ehkä vain lisääntynyt juominen. Vaihe 3: keskivaikea sairaus; huono ruokahalu, oksentelu ja painonlasku ovat tavallisia, mutta niitä ei aina esiinny. Vaihe 4: vaikea sairaus, jossa ureemisten kriisien – pahoinvoinnin, suun haavaumien ja heikkouden – riski on suuri. Jokainen vaihe jaetaan vielä alaluokkiin verenpaineen ja virtsan valkuaisen mukaan. Vaihe ratkaisee, mikä hoito aloitetaan ja kuinka usein tilannetta seurataan.",
    sv: "International Renal Interest Society (IRIS) delar in kronisk njursjukdom i fyra stadier utifrån kreatinin och SDMA i blodet. Stadium 1: kreatininet är normalt, men någon annan avvikelse i njurarna finns – ett bestående förhöjt SDMA, utspädd urin (hos katt), protein i urinen eller förändringar på ultraljud. Stadium 2: lindrig sjukdom; kreatininet är normalt eller lätt förhöjt, symtomen är oftast lindriga eller saknas helt, kanske bara ökad törst. Stadium 3: måttlig sjukdom; symtom som dålig aptit, kräkningar och viktnedgång är vanliga men finns inte alltid. Stadium 4: svår sjukdom med hög risk för uremiska kriser – illamående, sår i munnen, svaghet. Varje stadium delas dessutom in i understadier utifrån blodtryck och protein i urinen. Stadiet avgör vilken behandling som sätts in och hur ofta vi kontrollerar på nytt.",
    en: "The International Renal Interest Society (IRIS) classifies chronic kidney disease into four stages by blood creatinine and SDMA. Stage 1: creatinine normal, but some other kidney abnormality is present — a persistently raised SDMA, dilute urine (in cats), protein in the urine, or changes on ultrasound. Stage 2: mild disease; creatinine normal or slightly raised, symptoms usually mild or absent, perhaps only increased drinking. Stage 3: moderate disease; symptoms such as poor appetite, vomiting and weight loss are common but not always present. Stage 4: severe disease with a high risk of uraemic crises — nausea, mouth ulcers, weakness. Each stage is further sub-staged by blood pressure and urine protein. The stage determines what treatment is started and how often we re-check."
  },
  "article.kidney.treatment.title": {
    fi: "Miten munuaisten vajaatoimintaa hoidetaan?",
    sv: "Hur behandlas njursvikt hos hund och katt?",
    en: "How is kidney failure treated?"
  },
  "article.kidney.treatment.text": {
    fi: "Munuaissairautta ei voi parantaa, mutta sen etenemistä voidaan usein hidastaa huomattavasti. Hoidon kulmakiviä ovat munuaisruokavalio, jossa on rajoitetusti fosforia ja kohtuullisesti hyvälaatuista valkuaista (kliinisissä tutkimuksissa sen on osoitettu pidentävän elinaikaa), fosforinsitojat, jos fosfori pysyy koholla, sekä runsas veden saanti ja tarvittaessa nestehoito. Nestehoito annetaan joko suonensisäisesti klinikalla tai valikoiduille potilaille ihon alle kotona sen jälkeen, kun olemme opettaneet tekniikan, ja säännöllisin kontrollein, sillä liika neste voi olla haitallista (etenkin sydänsairaille kissoille). Kulmakiviin kuuluvat myös verenpainelääkitys, kun potilas on vakaa ja hyvin nesteytetty (kissoille amlodipiini, ja kun valkuaista vuotaa virtsaan, ACE:n estäjät tai telmisartaani), pahoinvointi- ja ruokahalulääkkeet, kaliumlisä sekä pitkälle edenneessä anemiassa punasolujen tuotantoa lisäävä hormonipistos (darbepoetiini). Virtsatietulehdukset hoidetaan viipymättä, koska munuaispotilaalla ne voivat levitä munuaisiin, ja hammassairaudet pidetään kurissa. Saarella laadimme jokaiselle munuaispotilaalle yksilöllisen hoitosuunnitelman ja tarkistamme sen jokaisella kontrollikäynnillä.",
    sv: "Njursjukdom kan inte botas, men förloppet kan ofta bromsas betydligt. Grundpelarna är en njurdiet med begränsad fosforhalt och måttlig mängd protein av hög kvalitet (som i kliniska studier har visats förlänga överlevnaden), fosfatbindare när fosforvärdet förblir högt, rikligt med vatten och – vid behov – vätsketerapi, antingen intravenöst på kliniken eller, för utvalda patienter, under huden hemma efter att vi har lärt dig tekniken och med regelbundna kontroller, eftersom för mycket vätska kan vara skadligt (särskilt för katter med hjärtsjukdom). Därtill kommer blodtrycksmedicin när patienten väl är stabil och i vätskebalans (amlodipin till katt, ACE-hämmare eller telmisartan när protein läcker ut i urinen), läkemedel mot illamående och aptitstimulerande medel, kaliumtillskott och, vid långt gången blodbrist, en hormoninjektion (darbepoetin) som stimulerar bildningen av röda blodkroppar. Urinvägsinfektioner behandlas utan dröjsmål, eftersom de hos en njurpatient kan sprida sig till njurarna, och tandsjukdom hålls under kontroll. På Saari gör vi upp en individuell plan för varje njurpatient och justerar den vid varje kontroll.",
    en: "Kidney disease cannot be cured, but its progression can often be slowed considerably. The cornerstones are a renal diet with restricted phosphorus and moderate high-quality protein (shown in clinical studies to extend survival), phosphate binders when phosphorus stays high, plenty of water and — when needed — fluid therapy, either intravenously at the clinic or, for selected patients, under the skin at home after we have taught you the technique and with regular checks, because too much fluid can be harmful (especially in cats with heart disease), blood-pressure medication once the patient is stable and hydrated (amlodipine for cats, ACE inhibitors or telmisartan when protein leaks into the urine), anti-nausea and appetite medication, potassium supplements and, in advanced anaemia, a hormone injection (darbepoetin) to stimulate red blood cell production. Urinary infections are treated promptly, because in a kidney patient they can spread to the kidneys, and dental disease is kept under control. At Saari we build an individual plan for each kidney patient and adjust it at every check-up."
  },
  "article.kidney.diet.title": {
    fi: "Mitä munuaissairaan koiran tai kissan pitäisi syödä?",
    sv: "Vad ska en hund eller katt med njursvikt äta?",
    en: "What should a dog or cat with kidney failure eat?"
  },
  "article.kidney.diet.text": {
    fi: "Munuaisruokavalio eli munuaispotilaille tarkoitettu erityisruoka on hoito, jolla on vahvin tutkimusnäyttö: tutkimuksissa munuaisruokaa syöneet kissat elivät noin kaksi kertaa pidempään kuin muuta ruokaa syöneet (yhdessä tutkimuksessa mediaani 633 päivää, verrokeilla 264 päivää), satunnaistetussa tutkimuksessa niillä oli selvästi vähemmän ureemisia kriisejä, ja koirat hyötyivät vähintään yhtä paljon (594 päivää munuaisruoalla, 188 päivää ilman sitä). Munuaisruoissa on vähän fosforia ja kohtuullisesti hyvälaatuista valkuaista, ja niihin on lisätty omega-3-rasvahappoja, kaliumia ja B-vitamiineja; ne myös happamoittavat elimistöä vähemmän. Märkäruoka on parempi vaihtoehto, koska sen mukana potilas saa vettä – moni munuaispotilas on jatkuvasti lievästi kuivunut. Aloita munuaisruokavalio ajoissa – mieluiten vaiheessa 2, kun ruokahalu on vielä hyvä – äläkä koskaan silloin, kun lemmikki on sairas, pahoinvoiva tai sairaalahoidossa, sillä pahoinvoinnin aikana syötyä ruokaa lemmikki ei useinkaan enää myöhemmin suostu syömään. Samasta syystä älä koskaan piilota tabletteja munuaisruokaan – käytä erillistä herkkua. Vaihda ruoka vähitellen usean viikon kuluessa (kissoilla usein 4–8 viikkoa) sekoittamalla vanhaa ja uutta, äläkä koskaan pakota munuaisruokaa lemmikille, joka ei sitä huoli; on tärkeämpää, että lemmikki syö jotain, kuin että se syö täydellistä ruokaa, ja meillä on kokeiltavaksi useita merkkejä ja makuja. Kotitekoinen munuaisruokavalio on mahdollinen, mutta sen on oltava ravitsemukseen erikoistuneen eläinlääkärin laatima – epätasapainoinen kotiruoka tekee enemmän haittaa kuin hyötyä. Kysy meiltä munuaisruoista; myymme niitä myös klinikalla.",
    sv: "En medicinsk njurdiet är den behandling som har starkast evidens: i studier levde katter som åt njurdiet ungefär dubbelt så länge som katter som inte gjorde det (median 633 mot 264 dagar i en studie), de fick betydligt färre uremiska kriser i en randomiserad studie, och hundar hade minst lika stor nytta (594 mot 188 dagar). Njurdieter innehåller lite fosfor, måttligt med protein av hög kvalitet, tillsatta omega-3-fettsyror, kalium och B-vitaminer, och de är mindre försurande. Våtfoder är att föredra eftersom djuret då får i sig vatten med maten – många njurpatienter är kroniskt lätt uttorkade. Börja med njurdieten tidigt – helst i stadium 2, medan aptiten ännu är god – och aldrig när djuret är sjukt, illamående eller inskrivet på kliniken, eftersom ett foder som ätits under illamående ofta ratas för gott efteråt. Av samma skäl: göm aldrig tabletter i njurfodret – använd en separat godbit. Byt foder stegvis under flera veckor (hos katt ofta 4–8 veckor) genom att blanda gammalt och nytt, och tvinga aldrig en njurdiet på ett djur som vägrar; att äta något alls är viktigare än att äta det perfekta fodret, och vi har flera märken och smaker att prova. Hemlagad njurdiet är möjlig men måste sättas ihop av en veterinär som är specialiserad på nutrition – en obalanserad hemlagad diet gör mer skada än nytta. Fråga oss om njurfoder; vi säljer dem också på kliniken.",
    en: "A therapeutic renal diet is the treatment with the best evidence behind it: in studies, cats that ate a renal diet lived around twice as long as cats that did not (median 633 versus 264 days in one study), had far fewer uraemic crises in a randomised trial, and dogs benefited at least as much (594 versus 188 days). Renal diets are low in phosphorus, have moderate amounts of high-quality protein, added omega-3 fatty acids, potassium and B vitamins, and are less acidifying. Wet food is preferable because it carries water into the patient — many kidney patients are chronically slightly dehydrated. Start the renal diet early — ideally in stage 2, while appetite is still good — and never while the pet is ill, nauseous or hospitalised, because a food eaten during nausea is often refused for good afterwards. For the same reason, never hide tablets in the renal food — use a separate treat. Change food gradually over several weeks (in cats often 4–8 weeks), mixing old and new, and never force a renal diet on a pet that refuses it; eating something is more important than eating the perfect food, and we have several brands and flavours to try. Home-cooked kidney diets are possible but must be formulated by a veterinary nutritionist — an unbalanced home diet does more harm than good. Ask us about renal foods; we also sell them at the clinic."
  },
  "article.kidney.prognosis.title": {
    fi: "Kuinka kauan munuaissairas koira tai kissa voi elää?",
    sv: "Hur länge kan en hund eller katt leva med njursvikt?",
    en: "How long can a dog or cat live with kidney failure?"
  },
  "article.kidney.prognosis.text": {
    fi: "Elinikä riippuu ennen kaikkea siitä, missä vaiheessa sairaus todetaan ja kuinka hyvin fosfori, verenpaine ja ruokahalu saadaan hallintaan. Kissat pärjäävät yleensä koiria paremmin: laajimmassa tutkimuksessa, jossa elinaikaa on tarkasteltu vaiheittain, vaiheen 2 yläpäässä todetut kissat elivät mediaanina noin 3 vuotta, vaiheessa 3 noin 2 vuotta ja vaiheessa 4 noin 3 kuukautta – vaiheen 2 alkupäässä löydettyjen kissojen voi odottaa pärjäävän paremmin. Koirilla sairaus etenee yleensä nopeammin: pienemmässä tutkimuksessa vaiheen 2 koirat elivät mediaanina yli vuoden, vaiheessa 3 useista kuukausista vuoteen ja vaiheessa 4 viikoista muutamaan kuukauteen. Nämä ovat julkaistujen tutkimusten mediaaniarvoja hoidetuista eläimistä – puolet eläimistä eli näitä lukuja pidempään – eivät ennusteita juuri sinun lemmikillesi: kun munuaisruoka maistuu, ruokahalu on hyvä ja seuranta säännöllistä, yksittäiset eläimet elävät usein näitä lukuja pidempään.",
    sv: "Det beror främst på stadiet vid diagnosen och på hur väl fosfor, blodtryck och aptit hålls under kontroll. Katter klarar sig i allmänhet bättre än hundar: i den största studien med överlevnad per stadium levde katter som fått diagnosen i den övre delen av stadium 2 i median ungefär 3 år, i stadium 3 ungefär 2 år och i stadium 4 ungefär 3 månader – katter som upptäcks tidigare i stadium 2 kan väntas klara sig bättre. Hos hund brukar sjukdomen gå snabbare framåt – i en mindre studie levde hundar i stadium 2 i median över ett år, i stadium 3 flera månader upp till ett år och i stadium 4 veckor till några månader. Det här är medianvärden från publicerade studier av behandlade djur – hälften av djuren levde längre än så – inte förutsägelser för just ditt djur: med en njurdiet som djuret gärna äter, god aptit och regelbunden uppföljning lever enskilda djur ofta längre än siffrorna anger.",
    en: "It depends mostly on the stage at diagnosis and on how well phosphorus, blood pressure and appetite are controlled. Cats generally do better than dogs: in the largest study with survival by stage, cats diagnosed at the upper end of stage 2 lived a median of about 3 years, in stage 3 about 2 years, and in stage 4 about 3 months — cats caught earlier in stage 2 can be expected to do better. In dogs the disease tends to progress faster — in a smaller study, dogs in stage 2 lived a median of over a year, in stage 3 several months to a year, and in stage 4 weeks to a few months. These are median values from published studies of treated animals — half of the animals lived longer than these figures — not predictions for your pet: with a well-accepted renal diet, good appetite and regular monitoring, individual animals frequently outlive them."
  },
  "article.kidney.endstage.title": {
    fi: "Miltä munuaisten vajaatoiminnan loppuvaihe näyttää?",
    sv: "Hur ser slutstadiet av njursvikt ut hos hund och katt?",
    en: "What does end-stage kidney failure look like?"
  },
  "article.kidney.endstage.text": {
    fi: "Loppuvaiheessa munuaiset eivät enää pysty puhdistamaan kuona-aineita verestä, ja lemmikki muuttuu ureemiseksi: se kieltäytyy ruoasta ja vedestä, oksentelee, laihtuu nopeasti, on heikko ja nukkuu suurimman osan päivästä; suussa voi olla haavaumia, hengitys haisee voimakkaasti ja joskus esiintyy vapinaa. Nesteytys, pahoinvointilääkkeet ja ruokahalua lisäävät lääkkeet voivat tuoda hyviä päiviä takaisin joksikin aikaa, ja autamme sinua arvioimaan elämänlaatua rehellisesti: syökö lemmikki yhä, liikkuuko se, ottaako se kontaktia ja onko se useimpina päivinä kivuton? Kun vastaus muuttuu kielteiseksi, eutanasia on viimeinen hyvä teko, jonka voimme tarjota, ja puhumme siitä kanssasi avoimesti ja ajoissa.",
    sv: "I slutstadiet kan njurarna inte längre rena blodet från slaggprodukter, och djuret blir uremiskt: det vägrar äta och dricka, kräks, går snabbt ner i vikt, är svagt och sover större delen av dagen, kan ha sår i munnen och en stark lukt från munnen, och ibland darrningar. Vätsketerapi, läkemedel mot illamående och aptitstimulerande medel kan ge goda dagar tillbaka för en tid, och vi hjälper dig att bedöma livskvaliteten ärligt: äter djuret ännu, rör det på sig, söker det kontakt och är det fritt från smärta de flesta dagar? När svaret blir nej är avlivning den sista omsorg vi kan visa djuret, och vi talar om den med dig öppet och i tid.",
    en: "In the final stage the kidneys can no longer clear waste from the blood, and the pet becomes uraemic: it refuses food and water, vomits, loses weight rapidly, is weak and sleeps most of the day, may have mouth ulcers, a strong smell on the breath, and occasionally tremors. Fluids, anti-nausea drugs and appetite stimulants can bring good days back for a while, and we help you judge quality of life honestly: is the pet still eating, moving, interacting and free of pain most days? When the answer becomes no, euthanasia is the last kindness we can offer, and we talk about it with you openly and in time."
  },
  "article.kidney.monitoring.title": {
    fi: "Kuinka usein munuaispotilasta pitää seurata?",
    sv: "Hur ofta ska en njurpatient kontrolleras?",
    en: "How often should a kidney patient be checked?"
  },
  "article.kidney.monitoring.text": {
    fi: "Diagnoosin jälkeen kutsumme lemmikin yleensä kontrolliin 2–4 viikon kuluessa, jotta näemme, miten ruokavalio ja hoito toimivat. Sen jälkeen vakaat vaiheen 2 potilaat käyvät kontrollissa 3–6 kuukauden välein, vaiheen 3 potilaat 2–3 kuukauden välein ja vaiheen 4 potilaat 1–2 kuukauden välein. Jokaiseen kontrolliin kuuluu punnitus, verenpaineen mittaus, verikoe (kreatiniini, SDMA, fosfori, kalium, punasolut) ja virtsakoe. Säännöllisen seurannan ansiosta voimme säätää hoitoa ennen kuin pieni ongelma kasvaa kriisiksi.",
    sv: "Efter diagnosen gör vi vanligen en ny kontroll inom 2–4 veckor för att se hur dieten och behandlingen fungerar, därefter med 3–6 månaders mellanrum hos stabila patienter i stadium 2, med 2–3 månaders mellanrum i stadium 3 och med 1–2 månaders mellanrum i stadium 4. Varje kontroll omfattar vikt, blodtryck, blodprov (kreatinin, SDMA, fosfor, kalium, röda blodkroppar) och urinprov. Den regelbundna uppföljningen är det som gör att vi kan justera behandlingen innan ett litet problem hinner bli en kris.",
    en: "After diagnosis we usually re-check within 2–4 weeks to see how the diet and treatment are working, then every 3–6 months in stable stage 2 patients, every 2–3 months in stage 3, and every 1–2 months in stage 4. Each check includes weight, blood pressure, a blood test (creatinine, SDMA, phosphorus, potassium, red blood cells) and a urine test. Regular monitoring is what lets us adjust treatment before a small problem becomes a crisis."
  },
  "article.kidney.prevention.title": {
    fi: "Voiko munuaissairauden ehkäistä tai todeta ajoissa?",
    sv: "Kan njursjukdom förebyggas eller upptäckas tidigt?",
    en: "Can kidney disease be prevented or caught early?"
  },
  "article.kidney.prevention.text": {
    fi: "Kroonista munuaissairautta ei voi täysin ehkäistä, mutta se voidaan löytää ajoissa – ja vaiheessa 2 aloitettu hoito antaa parhaat mahdollisuudet hidastaa sen etenemistä. Suosittelemme yli 7-vuotiaille koirille ja kissoille vuosittaista senioritarkastusta veri- ja virtsakokeineen (senioritarkastukseemme sisältyy SDMA-munuaiskoe), hampaiden pitämistä kunnossa (hammassairaudet on yhdistetty munuaissairauteen), märkäruokaa vähän juoville kissoille sekä pakkasnesteen, ihmisten kipulääkkeiden, viinirypäleiden ja liljojen pitämistä lemmikin ulottumattomissa. Jos kissa juo aiempaa enemmän tai laihtuu, tuo se tutkittavaksi viipymättä – nämä ovat tavallisimmat ensioireet, joskin kolmasosalla kissoista ei näy mitään ennen verikoetta.",
    sv: "Kronisk njursjukdom kan inte helt förebyggas, men den kan upptäckas tidigt – och behandling som sätts in i stadium 2 ger den bästa chansen att bromsa den. Vi rekommenderar en årlig seniorkontroll med blod- och urinprov för hundar och katter över 7 år (vår seniorkontroll omfattar ett SDMA-njurtest), friska tänder (tandsjukdom har ett samband med njursjukdom), våtfoder till katter som dricker lite, och att kylarvätska, värkmediciner för människor, vindruvor och liljor förvaras utom räckhåll. Boka tid direkt om din katt dricker mer eller går ner i vikt – det är de vanliga första tecknen, även om en tredjedel av katterna inte visar något alls förrän i blodprovet.",
    en: "Chronic kidney disease cannot be fully prevented, but it can be caught early — and treatment started in stage 2 gives the best chance of slowing it down. We recommend a yearly senior check with blood and urine tests for dogs and cats over 7 (our senior check-up includes an SDMA kidney test), keeping teeth healthy (dental disease is linked with kidney disease), feeding wet food to cats that drink little, and keeping antifreeze, human painkillers, grapes and lilies out of reach. Have a cat that is drinking more or losing weight checked without delay — these are the usual first signs, although a third of cats show nothing at all until the blood test."
  },
  "article.kidney.contact.title": {
    fi: "Milloin lemmikki pitää viedä eläinlääkäriin?",
    sv: "När ska jag ta min hund eller katt till veterinären?",
    en: "When should I bring my pet to the vet?"
  },
  "article.kidney.contact.text": {
    fi: "Jos koirasi tai kissasi juo ja virtsaa aiempaa enemmän, on laihtunut tai menettänyt ruokahalunsa, oksentelee toistuvasti tai sen hengitys haisee pahalta – varaa aika. Käynnillä otettava veri- ja virtsakoe kertoo, onko kyse munuaisista; kroonisen munuaissairauden varmistamiseksi ja vaiheen määrittämiseksi toistamme kokeen yleensä, kun lemmikin tila on vakaa. Eläinklinikka Saari Vaasassa seuraa munuaispotilaita yksilöllisen aikataulun mukaan; soita (06) 321 7300 tai varaa aika verkossa.",
    sv: "Om din hund eller katt dricker och kissar mer än förut, har gått ner i vikt eller tappat aptiten, kräks upprepade gånger eller har dålig andedräkt – boka en tid. Ett blod- och urinprov vid besöket visar om njurarna är inblandade; för att bekräfta kronisk njursjukdom och fastställa stadiet tar vi vanligen om provet när djuret är stabilt. Djurklinik Saari i Vasa följer upp njurpatienter enligt ett individuellt schema; ring (06) 321 7300 eller boka tid på nätet.",
    en: "If your dog or cat drinks and urinates more than before, has lost weight or appetite, vomits repeatedly or has bad breath — book an appointment. A blood and urine test taken at the visit shows whether the kidneys are involved; to confirm chronic kidney disease and set the stage we usually repeat it once the pet is stable. Saari Animal Clinic in Vaasa follows kidney patients on an individual schedule; call (06) 321 7300 or book online."
  },

  // Article 13: Snake Bite
  'article.snake.tag': { fi: 'Päivystys', sv: 'Akutvård', en: 'Emergency' },
  'article.snake.title': {
    fi: 'Kyynpurema — Suomen ainoan myrkyllisen käärmeen purema lemmikille',
    sv: 'Huggormsbett — bett av Finlands enda giftiga orm',
    en: 'Adder Bite — Finland\'s Only Venomous Snake Bite in Pets'
  },
  'article.snake.intro': {
    fi: 'Kyykäärme (Vipera berus) on Suomen ainoa myrkyllinen käärme. Kyynpuremat ovat yleisimpiä touko–syyskuussa, erityisesti keväällä, kun käärmeet ovat juuri heränneet talviuniltaan ja ovat hitaita. Koirat ovat suurimmassa vaarassa uteliaisuutensa vuoksi — useimmat puremat kohdistuvat kuonoon tai etutassuihin. Kyynpurema vaatii aina eläinlääkäripäivystykseen hakeutumista.',
    sv: 'Huggormen (Vipera berus) är Finlands enda giftiga orm. Huggormsbett är vanligast från maj till september, särskilt på våren när ormarna just vaknat ur vinterdvalan och är tröga. Hundar löper störst risk på grund av sin nyfikenhet — de flesta bett drabbar nosen eller framtassarna. Ett huggormsbett är alltid ett akut fall till veterinären.',
    en: 'The European adder (Vipera berus) is Finland\'s only venomous snake. Adder bites are most common from May to September, especially in spring when the snakes have just woken from hibernation and are sluggish. Dogs are at greatest risk due to their curiosity — most bites occur on the snout or front paws. An adder bite is always a veterinary emergency.'
  },
  'article.snake.symptoms.title': {
    fi: 'Oireet',
    sv: 'Symtom',
    en: 'Symptoms'
  },
  'article.snake.symptoms.text': {
    fi: 'Oireet ilmaantuvat yleensä minuuteista tunteihin pureman jälkeen. Paikallisoireet: voimakas turvotus purema-alueella, kipu, kaksi pistohaavaa. Yleisoireet: kuolaaminen, oksentelu, nopea hengitys, yleisvoinnin heikkeneminen, lamaantuminen. Vaikeissa tapauksissa: allerginen reaktio (kasvojen turpoaminen, hengitysvaikeudet), veren hyytymishäiriöt, sokki ja kollapsi. Kuonoon saatu purema voi aiheuttaa hengenvaarallista turvotusta hengitysteissä. Oireet voivat pahentua 24–48 tunnin ajan.',
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
    fi: 'Hoito perustuu tukihoitoon: laskimonsisäinen nestehoito, kivunlievitys (yleensä opioidi) ja tarkka monitorointi. Keskivaikeissa ja vaikeissa tapauksissa annetaan käärmeen vasta-ainetta (Vipera-antiseerumi). Potilasta seurataan hyytymistekijöiden, munuaisten ja maksan toiminnan osalta. Useimmat koirat toipuvat 2–5 päivässä, mutta vakavissa tapauksissa sairaalahoito voi kestää pidempään. Kuolleisuus hoidolla on alle 5 %, mutta hoitamattomana purema voi olla kohtalokas erityisesti pienille koirille.',
    sv: 'Behandlingen baseras på understödjande vård: intravenös vätsketerapi, smärtlindring (vanligen en opioid) och noggrann övervakning. Vid medelsvåra och svåra fall ges antiserum (Vipera-antiserum). Patienten övervakas avseende koagulationsfaktorer, njur- och leverfunktion. De flesta hundar återhämtar sig inom 2–5 dagar, men i allvarliga fall kan sjukhusvård ta längre tid. Dödligheten med behandling är under 5 %, men utan behandling kan bettet vara dödligt särskilt för små hundar.',
    en: 'Treatment is supportive care: intravenous fluid therapy, pain relief (typically an opioid), and close monitoring. Antivenom (Vipera antiserum) is given in moderate to severe cases. The patient is monitored for clotting factors, kidney, and liver function. Most dogs recover within 2–5 days, but in severe cases hospitalization may take longer. Mortality with treatment is under 5%, but without treatment the bite can be fatal, especially for small dogs.'
  },
  'article.snake.prevention.title': {
    fi: 'Ehkäisy',
    sv: 'Förebyggande',
    en: 'Prevention'
  },
  'article.snake.prevention.text': {
    fi: 'Pidä koira kytkettynä alueilla, joilla kyitä esiintyy (kalliot, avoimet maastot, metsänreunat). Kyyt ovat aktiivisimpia lämpimillä aamuilla ja iltapäivillä. Tarkista maasto ennen kuin päästät koiran vapaaksi. Jokainen kyynpurema on yksilöllinen — myös aiemmin purtu koira tarvitsee välittömän eläinlääkärihoidon.',
    sv: 'Håll hunden kopplad i områden där huggormar förekommer (klippor, öppna marker, skogsbryn). Huggormar är mest aktiva varma morgnar och eftermiddagar. Kontrollera terrängen innan du släpper hunden lös. Varje huggormsbett är individuellt — även en hund som tidigare blivit biten behöver omedelbar veterinärvård.',
    en: 'Keep your dog on a leash in areas where adders are found (rocky areas, open terrain, forest edges). Adders are most active on warm mornings and afternoons. Check the terrain before letting your dog off the leash. Every adder bite is individual — even a previously bitten dog needs immediate veterinary care.'
  },

  // Article: Poisoning (myrkytys) — native-panel final
  'article.poison.tag': { fi: 'Päivystys', sv: 'Akutvård', en: 'Emergency' },
  "article.poison.title": {
    fi: "Myrkytys koiralla ja kissalla – oireet, ensiapu ja milloin on toimittava heti",
    sv: "Förgiftning hos hund och katt — symtom, första hjälpen och när du bör agera genast",
    en: "Poisoning in Dogs and Cats: Symptoms, First Aid and When to Act Straight Away"
  },
  "article.poison.intro": {
    fi: "Myrkytykset ovat eläinlääkäripäivystyksen tavallisimpia syitä. Useimmiten koira tai kissa saa myrkytyksen syömällä jotain, joka on ihmiselle harmitonta mutta lemmikille myrkyllistä – vaikkapa suklaata, ksylitolia, viinirypäleitä tai ihmisen lääkkeitä. Oireiden voimakkuus riippuu aineesta, määrästä ja eläimen koosta. Myrkytysepäily kannattaa aina viedä heti eläinlääkärin arvioitavaksi, vaikka lemmikki vaikuttaisi vielä täysin terveeltä – monessa myrkytyksessä hoito tehoaa parhaiten jo ennen oireiden alkua.",
    sv: "Förgiftningar hör till de vanligaste orsakerna till akuta veterinärbesök. Oftast förgiftas hunden eller katten av något som är ofarligt för oss människor men giftigt för djur — choklad, xylitol, vindruvor eller våra egna mediciner. Hur allvarligt det blir beror på ämnet, mängden och djurets storlek. Misstänker du förgiftning ska du genast ringa veterinär, också om djuret ännu verkar må bra — vid många förgiftningar biter behandlingen bäst innan symtomen hunnit bryta ut.",
    en: "Poisoning is one of the most common reasons pets are rushed in as an emergency. More often than not, a dog or cat is poisoned by eating something that is perfectly harmless to us but toxic to them, such as chocolate, xylitol, grapes or human medicines. How ill the animal becomes depends on the substance, the amount swallowed and the animal's size. A suspected poisoning is always worth an immediate call to your vet, even if your pet still seems perfectly well, because for many poisons treatment works best before any signs appear."
  },
  "article.poison.common.title": {
    fi: "Yleisimmät myrkyt",
    sv: "Vanligaste gifterna",
    en: "Common poisons"
  },
  "article.poison.common.text": {
    fi: "Tavallisimpia lemmikeille vaarallisia aineita ovat suklaa ja kaakao (teobromiini) sekä ksylitoli, jota on purukumeissa ja leivonnaisissa. Ksylitoli on koiralle erittäin vaarallista: se romahduttaa verensokerin ja voi vaurioittaa maksaa. Vaarallisia ovat myös viinirypäleet ja rusinat (munuaisvaurio koiralla), sipuli ja valkosipuli (punasoluvaurio), jyrsijämyrkyt (sisäiset verenvuodot) sekä pakkasneste eli etyleeniglykoli, joka maistuu makealta ja on kissalle hengenvaarallista jo pieninä määrinä. Myös ihmisen kipulääkkeet ovat riski – ibuprofeeni ja parasetamoli, joista parasetamoli voi tappaa kissan jo yhdestä tabletista. Kissoille erityisen kohtalokkaita ovat liljat: jo siitepöly tai pieni pala lehteä voi aiheuttaa tappavan munuaisvaurion.",
    sv: "De ämnen som oftast ställer till skada är choklad och kakao (teobromin) samt xylitol, ett sötningsmedel i tuggummi och bakverk som är mycket farligt för hundar och ger blodsockerfall och leverskada. Också vindruvor och russin (njurskada hos hund), lök och vitlök (skadar de röda blodkropparna) och råttgift (ger inre blödningar) är farliga. Kylarvätska, alltså etylenglykol, smakar sött och är livshotande för katter redan i små mängder. Av de smärtstillande medlen för människor är både ibuprofen och paracetamol farliga — för en katt kan en enda paracetamoltablett vara dödlig. Särskilt lömska för katter är liljorna: redan pollen eller en liten bit av ett blad kan orsaka en dödlig njurskada.",
    en: "The substances that most often cause trouble are chocolate and cocoa (theobromine); xylitol, the sweetener in chewing gum and baked goods, which is very dangerous to dogs and causes a sudden drop in blood sugar along with liver damage; grapes and raisins, which can damage the kidneys in dogs; and onion and garlic, which harm the red blood cells. Rodenticides cause internal bleeding, and antifreeze (ethylene glycol) is sweet-tasting and life-threatening to cats in even tiny amounts. Human painkillers are another common culprit: ibuprofen is hazardous, and paracetamol can kill a cat with a single tablet. Lilies are especially dangerous to cats, as even the pollen or a small piece of leaf can cause fatal kidney damage."
  },
  "article.poison.symptoms.title": {
    fi: "Oireet",
    sv: "Symtom",
    en: "Symptoms"
  },
  "article.poison.symptoms.text": {
    fi: "Oireet riippuvat aineesta. Yleisimpiä ovat oksentelu, ripuli, kuolaaminen, vatsakipu, ruokahaluttomuus ja väsymys. Hermosto-oireita voivat olla vapina, kouristukset, tasapainovaikeudet, levottomuus tai lamaantuminen. Vakavassa myrkytyksessä hengitys voi tihentyä, syke kiihtyä ja limakalvot vaaleta tai kellastua, ja oksennuksessa tai ulosteessa voi näkyä verta – pahimmillaan eläin menettää tajuntansa. Kaikki myrkyt eivät oireile heti: jyrsijämyrkyn aiheuttama verenvuoto voi alkaa vasta päivien kuluttua, ja pakkasneste voi ensin aiheuttaa humalaisen, horjuvan olon, jonka jälkeen eläin näyttää toipuvan ennen vakavaa munuaisvauriota. Siksi epäilyyn on syytä reagoida heti, ei vasta oireiden ilmaannuttua.",
    sv: "Symtomen växlar beroende på ämnet. Vanligast är kräkningar, diarré, dregling, buksmärta, aptitlöshet och slöhet. Nervsymtom kan visa sig som darrningar, kramper, balanssvårigheter, oro eller förlamning. Vid en svår förgiftning kan djuret få snabb andning, hjärtklappning, bleka eller gulaktiga slemhinnor, blod i kräkningar eller avföring, och till slut bli medvetslöst. Alla gifter ger sig inte till känna med en gång: en blödning av råttgift kan visa sig först efter flera dygn, och kylarvätska kan först göra djuret berusat och ostadigt, varefter det tycks kvickna till innan en allvarlig njurskada utvecklas. Just därför ska man reagera redan på misstanken, inte vänta tills symtomen syns.",
    en: "The signs vary from one poison to the next. The most common are vomiting, diarrhoea, drooling, tummy pain, loss of appetite and lethargy. Neurological signs may include tremors, seizures, loss of balance, restlessness or collapse. In severe cases you may see rapid breathing, a racing heart, pale or yellowish gums, blood in the vomit or stools, and loss of consciousness. Not every poison shows itself straight away: bleeding from rodenticides may only start after several days, and antifreeze can first cause a drunken, unsteady state within hours, then seem to improve before serious kidney damage sets in. That is exactly why you should act on suspicion at once, rather than waiting for symptoms."
  },
  "article.poison.firstaid.title": {
    fi: "Ensiapu",
    sv: "Första hjälpen",
    en: "First aid"
  },
  "article.poison.firstaid.text": {
    fi: "Ota heti yhteyttä eläinlääkäriin ja kerro, mitä ainetta lemmikki on saanut, kuinka paljon ja milloin. Ota myrkyn pakkaus tai valokuva siitä mukaan klinikalle. Älä oksennuta eläintä omin päin äläkä turvaudu kotikonsteihin, kuten maitoon, suolaan tai öljyyn – väärin ajoitettu oksennus voi pahentaa tilannetta, ja syövyttävät tai öljypohjaiset aineet vahingoittavat lisää noustessaan takaisin ylös. Jos myrkkyä on iholla tai turkissa, huuhtele se pois runsaalla haalealla vedellä. Pidä eläin lämpimänä ja rauhallisena matkan ajan. Eläinlääkäri arvioi, onko oksennuttaminen turvallista – se auttaa vain ensimmäisten tuntien aikana.",
    sv: "Ring veterinären genast och berätta vad djuret fått i sig, hur mycket och när. Ta med förpackningen eller ett foto av giftet till kliniken. Framkalla inte kräkning på egen hand och ge inga huskurer som mjölk, salt eller olja — kräkning vid fel tidpunkt kan förvärra läget, och frätande eller oljiga ämnen skadar en gång till på vägen upp. Har djuret fått gift på huden eller i pälsen, skölj rikligt med ljummet vatten. Håll djuret varmt och lugnt under färden. Det är veterinären som avgör om det är tryggt att framkalla kräkning — det hjälper bara under de första timmarna.",
    en: "Ring your vet straight away and tell them what your pet has swallowed, how much and when. Bring the packaging, or a photo of it, to the clinic. Do not try to make your pet sick yourself, and do not give home remedies such as milk, salt or oil; badly timed vomiting can do more harm than good, and corrosive or oily substances cause further damage on the way back up. If there is poison on the skin or coat, rinse it off with plenty of lukewarm water. Keep your pet warm and calm on the journey in. Your vet will decide whether making your pet sick is safe, as it only helps within the first few hours."
  },
  "article.poison.treatment.title": {
    fi: "Eläinlääkärin hoito",
    sv: "Veterinärbehandling",
    en: "Veterinary treatment"
  },
  "article.poison.treatment.text": {
    fi: "Hoito riippuu myrkystä ja siitä, kuinka kauan altistuksesta on kulunut. Varhaisessa vaiheessa eläinlääkäri voi aiheuttaa hallitun oksennuksen ja antaa lääkehiiltä, joka sitoo myrkkyä suolistossa. Tukihoitoon kuuluvat suonensisäinen nestehoito, pahoinvointi- ja kouristuslääkitys sekä elintoimintojen tarkka seuranta. Osalle myrkyistä on vasta-aine: pakkasnestemyrkytykseen fomepitsoli ja jyrsijämyrkkyyn K-vitamiini. Vaikeissa tapauksissa eläin tarvitsee sairaalahoitoa sekä munuaisten ja maksan toiminnan seurantaa verikokein. Mitä nopeammin hoito päästään aloittamaan, sitä parempi ennuste on.",
    sv: "Behandlingen rättar sig efter giftet och efter hur lång tid som gått sedan djuret fick i sig det. I ett tidigt skede kan veterinären framkalla en kontrollerad kräkning och ge medicinskt kol, som binder giftet i tarmen. Den understödjande vården omfattar dropp, medel mot illamående och kramper samt övervakning av de livsviktiga funktionerna. Mot vissa gifter finns motgift: fomepizol vid kylarvätska och K-vitamin vid råttgift. I svåra fall behöver djuret vårdas på kliniken och njur- och leverfunktionen följas med blodprov. Ju snabbare behandlingen kommer i gång, desto bättre är prognosen.",
    en: "Treatment depends on the poison and how long ago it was swallowed. Early on, your vet may bring on controlled vomiting and give activated charcoal to bind the poison in the gut. Supportive care includes intravenous fluids, anti-sickness and anti-seizure medication, and close monitoring of the vital signs. A few poisons have a specific antidote: fomepizole for antifreeze and vitamin K for rodenticides. Severe cases need admission to hospital, along with blood tests to keep an eye on kidney and liver function. The sooner treatment starts, the better the outlook."
  },
  "article.poison.prevention.title": {
    fi: "Ehkäisy",
    sv: "Förebyggande",
    en: "Prevention"
  },
  "article.poison.prevention.text": {
    fi: "Säilytä lääkkeet, makeiset, ksylitolituotteet, siivousaineet ja pakkasneste eläinten ulottumattomissa. Älä anna lemmikille ihmisen ruokaa tai lääkkeitä kysymättä ensin eläinlääkäriltä. Pidä koira kytkettynä siellä, missä voi olla jyrsijämyrkkyä tai roskia. Älä pidä liljoja kodissa, jossa asuu kissa, ja tarkista myös muiden huonekasviesi myrkyllisyys. Tallenna Eläinklinikka Saaren numero (06) 321 7300 ja alueen päivystysnumero 0600 399 299 puhelimeesi jo etukäteen, niin apu löytyy nopeasti hätätilanteessa.",
    sv: "Förvara läkemedel, godis, xylitolprodukter, rengöringsmedel och kylarvätska utom räckhåll för djuren. Ge inte husdjuret människomat eller mediciner utan att först höra med veterinären. Håll hunden kopplad där det kan finnas råttgift eller skräp. Ha inga liljor hemma om du har katt, och ta reda på om dina krukväxter är giftiga. Spara Djurklinik Saaris nummer (06) 321 7300 och områdets journummer 0600 399 299 i telefonen på förhand, så finns hjälpen snabbt till hands om olyckan är framme.",
    en: "Keep medicines, sweets, xylitol products, cleaning agents and antifreeze well out of your pet's reach. Never give human food or medicine without checking with your vet first. Keep your dog on the lead anywhere rodenticide or rubbish might be lying about. Do not keep lilies in a home with a cat, and check whether your houseplants are toxic. Save Saari Animal Clinic's number, (06) 321 7300, and the regional out-of-hours emergency number, 0600 399 299, in your phone now, so that help is close at hand should the worst happen."
  },

  // Article 14: Pyometra
  'article.pyometra.tag': { fi: 'Päivystys', sv: 'Akutvård', en: 'Emergency' },
  "article.pyometra.title": {
    fi: "Koiran kohtutulehdus (pyometra) – oireet, kuinka nopeasti se etenee, hoito ja toipuminen",
    sv: "Livmoderinflammation (pyometra) hos hund – symtom, förlopp, behandling och återhämtning",
    en: "Pyometra in dogs — symptoms, how fast it progresses, treatment and recovery"
  },
  "article.pyometra.intro": {
    fi: "Kohtutulehdus eli pyometra on hengenvaarallinen tulehdus, jossa steriloimattoman nartun tai naaraskissan kohtu täyttyy märällä. Se on steriloimattomien narttujen yleisimpiä hätätapauksia: noin joka viides steriloimaton narttu (19–24 % ruotsalaisessa vakuutusaineistossa) sairastuu kohtutulehdukseen 10 ikävuoteen mennessä, ja tautia esiintyy myös kissoilla. Yleensä tarvitaan päivystysleikkaus, ja oireiden tunnistaminen ajoissa voi pelastaa lemmikkisi hengen. Tässä artikkelissa kerromme, miltä oireet näyttävät, kuinka nopeasti kohtutulehdus kehittyy, miksi pelkät antibiootit eivät riitä, miten hoidamme sen Eläinklinikka Saaressa, mitä toipuminen vaatii ja miten taudin voi ehkäistä.",
    sv: "Livmoderinflammation (pyometra) är en livshotande infektion där livmodern hos en osteriliserad tik fylls med var. Den hör till de vanligaste akutfallen hos intakta tikar – ungefär var femte osteriliserad tik (19–24 % i svenska försäkringsdata) får pyometra innan hon fyllt tio år – och den förekommer också hos katt. Tillståndet kräver i regel akut operation, och den som känner igen tecknen i tid kan rädda sitt djurs liv. I den här artikeln går vi igenom hur symtomen ser ut, hur snabbt pyometra utvecklas, varför enbart antibiotika inte räcker, hur vi behandlar sjukdomen på Djurklinik Saari, hur återhämtningen ser ut och hur den kan förebyggas.",
    en: "Pyometra is a life-threatening infection in which the uterus of an unspayed female fills with pus. It is one of the most common emergencies in intact bitches — roughly one in five unspayed female dogs (19–24 % in Swedish insurance data) develops pyometra by the age of 10 — and it also occurs in cats. The condition usually needs emergency surgery, and recognising the signs early can save your pet's life. This article explains what the symptoms look like, how quickly pyometra develops, why antibiotics alone are not enough, how it is treated at Saari Animal Clinic, what recovery involves and how to prevent it."
  },
  "article.pyometra.symptoms.title": {
    fi: "Mitkä ovat koiran kohtutulehduksen oireet?",
    sv: "Vilka är symtomen på livmoderinflammation hos hund?",
    en: "What are the symptoms of pyometra in dogs?"
  },
  "article.pyometra.symptoms.text": {
    fi: "Selvin merkki on märkäinen emätinvuoto – kellertävää, ruskehtavaa tai vanhan veren väristä, usein pahanhajuista – ja se, että koira nuolee takapäätään tavallista enemmän. Tällöin kyseessä on niin sanottu avoin kohtutulehdus. Suljetussa kohtutulehduksessa kohdunkaula on kiinni, mitään ei valu ulos, ja koira sairastuu nopeammin, mutta oireet ovat epämääräisempiä: se juo ja virtsaa selvästi tavallista enemmän, ei suostu syömään, on väsynyt ja apaattinen, oksentelee, vatsa on turvonnut tai kipeä, ja sillä on kuumetta tai vakavissa tapauksissa alilämpöä. Jos steriloimaton narttu on vetämätön ja juo paljon viikkoja tai kuukausia juoksuajan jälkeen, mene eläinlääkäriin samana päivänä.",
    sv: "Det tydligaste tecknet är en varig flytning från vulvan – gulaktig, brunaktig eller i färg som gammalt blod, ofta illaluktande – och att tiken slickar sig baktill mer än vanligt. Då talar vi om en ”öppen” pyometra. Vid en ”sluten” pyometra är livmoderhalsen stängd, ingenting rinner ut och tiken blir snabbare sjuk med mer diffusa tecken: hon dricker och kissar betydligt mer, vägrar äta, är trött och apatisk, kräks, har svullen eller öm buk, feber eller i svåra fall en kroppstemperatur under det normala. Om en osteriliserad tik är slö och dricker mycket under veckorna eller månaderna efter löpet ska du ta henne till veterinär samma dag.",
    en: "The clearest sign is a pus-like discharge from the vulva — yellowish, brownish or the colour of old blood, often foul-smelling — and the dog licking her rear end more than usual. This is an \"open\" pyometra. In a \"closed\" pyometra the cervix is shut, nothing drains out and the dog gets sicker faster with vaguer signs: drinking and urinating much more, refusing food, tiredness and apathy, vomiting, a swollen or painful belly, fever or in severe cases a below-normal temperature. If an unspayed bitch is listless and drinking a lot in the weeks or months after her heat, see a vet the same day."
  },
  "article.pyometra.onset.title": {
    fi: "Miten kohtutulehdus alkaa ja kuinka nopeasti se etenee?",
    sv: "Hur börjar livmoderinflammation och hur snabbt utvecklas den?",
    en: "How does pyometra start and how fast does it progress?"
  },
  "article.pyometra.onset.text": {
    fi: "Kohtutulehdus kehittyy tyypillisesti 1–2 kuukautta juoksuajan jälkeen ja yleensä viimeistään neljän kuukauden kuluessa juoksuajasta. Tällöin progesteroni on paksuntanut kohdun limakalvon, ja bakteerit – tavallisimmin koiran omasta suolistosta peräisin oleva E. coli – nousevat kohdunkaulan kautta kohtuun. Avoin kohtutulehdus voi kyteä päivistä viikkoihin niin, että vuoto on pääoire; suljettu kohtutulehdus voi tehdä koirasta vakavasti sairaan muutamassa päivässä, koska toksiinit ja bakteerit pääsevät kohdusta verenkiertoon. Noin 60 %:lla kaikista kohtutulehdusta sairastavista koirista on klinikalle tullessaan jo sepsis eli verenmyrkytys, ja osuus on suurempi silloin, kun kohdunkaula on kiinni. Siksi jokainen kohtutulehdusepäily on hätätapaus: mitä aikaisemmin leikkaus tehdään, sitä parempi on lopputulos.",
    sv: "Pyometra utvecklas typiskt 1–2 månader efter ett löp, och i regel inom fyra månader efter det, när progesteronet har förtjockat livmoderslemhinnan och bakterier – oftast E. coli från hundens egen tarm – vandrar upp genom livmoderhalsen. En öppen pyometra kan pyra i dagar till veckor med flytningen som främsta tecken; en sluten pyometra kan göra hunden allvarligt sjuk inom några dagar, eftersom toxiner och bakterier går från livmodern ut i blodet. Ungefär 60 % av alla hundar med pyometra har redan sepsis (blodförgiftning) när de kommer till kliniken, och andelen är högre när livmoderhalsen är sluten. Varje misstanke om pyometra är därför ett akutfall: ju tidigare operationen görs, desto bättre blir utgången.",
    en: "Pyometra typically develops 1–2 months after a heat, and usually within four months of it, when progesterone has thickened the uterine lining and bacteria — usually E. coli from the dog's own gut — climb up through the cervix. An open pyometra may smoulder for days to weeks with discharge as the main sign; a closed pyometra can make a dog seriously ill within days, because toxins and bacteria pass from the uterus into the bloodstream. Around 60 % of all dogs with pyometra already have sepsis when they arrive at the clinic, and the proportion is higher when the cervix is closed. Any suspicion of pyometra is therefore an emergency: the sooner surgery is done, the better the outcome."
  },
  "article.pyometra.causes.title": {
    fi: "Mistä kohtutulehdus johtuu ja mitkä koirat sairastuvat siihen?",
    sv: "Vad orsakar livmoderinflammation och vilka hundar drabbas?",
    en: "What causes pyometra and which dogs get it?"
  },
  "article.pyometra.causes.text": {
    fi: "Perimmäinen syy on hormonaalinen: jokaisen juoksuajan jälkeen progesteroni valmistaa kohtua tiineyteen, ja vuosien mittaan toistuvat kierrot saavat limakalvon paksuuntumaan rakkulaiseksi, jolloin siitä tulee bakteereille ihanteellinen kasvualusta. Kohtutulehdus on siis steriloimattomien naaraiden tauti, useimmiten keski-ikäisten ja vanhempien – keskimäärin noin 7-vuotiaiden, ja suomalaisessa aineistossa tyypillinen potilas on noin 9-vuotias – mutta se voi tulla jo ensimmäisen juoksuajan jälkeen. Vahinkoastutuksen jälkeen tiineyden estämiseksi annetut estrogeenipistokset ovat hyvin dokumentoitu riskitekijä. Rodulla on suuri merkitys: ruotsalaisessa vakuutusaineistossa yli puolet steriloimattomista berninpaimenkoira-, tanskandoggi-, leonberginkoira-, rottweiler- ja irlanninsusikoiranartuista sairastuu kohtutulehdukseen 10 ikävuoteen mennessä, kun taas suomenpystykorvalla, mäyräkoirilla, saksanpaimenkoirilla ja sekarotuisilla riski on ruotsalaisten ja suomalaisten tutkimusten mukaan selvästi pienempi.",
    sv: "Grundorsaken är hormonell: efter varje löp förbereder progesteronet livmodern för dräktighet, och med åren ger de upprepade cyklerna en cystisk förtjockning av slemhinnan som är en idealisk grogrund för bakterier. Pyometra är därför en sjukdom hos intakta (osteriliserade) tikar, oftast medelålders och äldre – i genomsnitt omkring 7 år, och i finländska data är den typiska patienten ungefär 9 år – men den kan uppstå redan efter första löpet. Östrogensprutor som ges för att förhindra dräktighet efter en oönskad parning är en väldokumenterad riskfaktor. Rasen spelar stor roll: i svenska försäkringsdata får över hälften av de intakta tikarna av raserna berner sennenhund, grand danois, leonberger, rottweiler och irländsk varghund pyometra innan de fyllt tio, medan finsk spets, taxar, schäfrar och blandrashundar har en klart lägre risk i svenska och finländska studier.",
    en: "The underlying cause is hormonal: after every heat, progesterone prepares the uterus for pregnancy, and over the years these repeated cycles cause cystic thickening of the lining, which is an ideal breeding ground for bacteria. Pyometra is therefore a disease of intact (unspayed) females, most often middle-aged and older — on average around 7 years, and in Finnish data the typical patient is about 9 — but it can occur after the first heat. Oestrogen injections given to prevent pregnancy after an unwanted mating are a well-documented risk factor. Breed matters a great deal: in Swedish insurance data more than half of intact Bernese Mountain Dog, Great Dane, Leonberger, Rottweiler and Irish Wolfhound bitches develop pyometra by age 10, whereas in Swedish and Finnish studies the Finnish Spitz, Dachshunds, German Shepherds and mixed-breed dogs have a clearly lower risk."
  },
  "article.pyometra.selfheal.title": {
    fi: "Voiko kohtutulehdus parantua itsestään tai antibiooteilla?",
    sv: "Kan livmoderinflammation läka av sig själv eller med antibiotika?",
    en: "Can pyometra heal on its own or with antibiotics?"
  },
  "article.pyometra.selfheal.text": {
    fi: "Ei. Hoitamaton kohtutulehdus on hengenvaarallinen: kohtu voi puhjeta, ja tulehdus johtaa sepsikseen, munuaisvaurioon ja vatsakalvontulehdukseen. Pelkät antibiootit eivät saa märkää pois suljetusta kohdusta. Lääkkeellinen hoito hormoneilla ja antibiooteilla tulee kyseeseen vain valikoiduilla potilailla – nuorella, muuten terveellä jalostusnartulla, jolla on avoin kohtutulehdus eikä merkkejä sepsiksestä – ja silloinkin kohtutulehdus uusii jonkin myöhemmän juoksuajan jälkeen suunnilleen joka neljännellä koiralla (raportoitu vaihteluväli 0–85 % hoitoprotokollasta riippuen), joten narttu tulisi astuttaa heti seuraavan juoksuajan yhteydessä ja steriloida, kun jalostuskäyttö on ohi. Kaikille muille potilaille leikkaus on ensisijainen hoito, ja Eläinklinikka Saaressa suosittelemme sitä lähes jokaisessa tapauksessa.",
    sv: "Nej. Obehandlad livmoderinflammation är livshotande: livmodern kan brista, och infektionen leder till sepsis, njurskador och bukhinneinflammation. Enbart antibiotika kan inte få bort varet ur en sluten livmoder. Medicinsk behandling med hormoner i kombination med antibiotika finns bara för utvalda fall – en ung, i övrigt frisk avelstik med öppen pyometra och utan tecken på sepsis – och även då kommer livmoderinflammationen tillbaka vid ett senare löp hos ungefär var fjärde tik (rapporterat spann 0–85 % beroende på protokoll), så tiken bör paras redan vid nästa löp och steriliseras när avelskarriären är över. För alla andra patienter är operation förstahandsvalet, och hos oss på Saari rekommenderar vi den i nästan alla fall.",
    en: "No. Untreated pyometra is life-threatening: the uterus can rupture, and the infection leads to sepsis, kidney damage and peritonitis. Antibiotics alone cannot clear pus from a closed uterus. Medical treatment with hormones plus antibiotics exists only for selected cases — a young, otherwise healthy breeding bitch with an open pyometra and no signs of sepsis — and even then pyometra comes back at a later heat in roughly one dog in four (reported range 0–85 % depending on the protocol), so the bitch should be bred at the very next heat and spayed once her breeding career is over. For all other patients surgery is the treatment of choice, and at Saari we recommend it in nearly every case."
  },
  "article.pyometra.diagnosis.title": {
    fi: "Miten kohtutulehdus todetaan?",
    sv: "Hur ställs diagnosen livmoderinflammation?",
    en: "How is pyometra diagnosed?"
  },
  "article.pyometra.diagnosis.text": {
    fi: "Tutkimme koiran ja otamme verinäytteen, josta katsomme valkosolut sekä munuais- ja maksa-arvot – yli puolella koirista valkosolut ovat koholla (useimmiten suljetussa kohtutulehduksessa), ja matala valkosolumäärä on varoitusmerkki vatsakalvontulehduksesta – ja varmistamme diagnoosin vatsan ultraäänitutkimuksella, jossa nesteen täyttämä, laajentunut kohtu näkyy muutamassa minuutissa. Koska suljettu kohtutulehdus voi muistuttaa monia muita sairauksia, tutkimme ultraäänellä jokaisen steriloimattoman nartun, joka voi huonosti viikkoja tai kuukausia juoksuajan jälkeen – myös silloin, kun vuotoa ei ole.",
    sv: "Vi undersöker hunden och tar ett blodprov för att kontrollera de vita blodkropparna samt njur- och levervärdena – fler än hälften av hundarna har ett förhöjt antal vita blodkroppar (oftast vid sluten pyometra), och ett lågt antal är en varningssignal för bukhinneinflammation – och bekräftar diagnosen med ultraljud av buken, som på några minuter visar den vätskefyllda, förstorade livmodern. Eftersom en sluten pyometra kan likna många andra sjukdomar undersöker vi med ultraljud varje osteriliserad tik som mår dåligt under veckorna eller månaderna efter ett löp, också när hon inte har någon flytning.",
    en: "We examine the dog and take a blood sample to check the white blood cells and the kidney and liver values — more than half of dogs have a raised white cell count (most often in closed pyometra), and a low count is a warning sign of peritonitis — and confirm the diagnosis with an abdominal ultrasound, which shows the fluid-filled, enlarged uterus within minutes. Because closed pyometra can look like many other illnesses, we scan any unspayed bitch who is unwell in the weeks or months after a heat, even without discharge."
  },
  "article.pyometra.treatment.title": {
    fi: "Miten kohtutulehdusta hoidetaan?",
    sv: "Hur behandlas livmoderinflammation hos hund?",
    en: "How is pyometra treated?"
  },
  "article.pyometra.treatment.text": {
    fi: "Hoito on päivystysleikkaus, jossa tulehtunut kohtu ja munasarjat poistetaan (ovariohysterektomia) – sama toimenpide kuin sterilointi, mutta sairaalle potilaalle, jonka kohtu on laajentunut ja hauras, joten leikkaus tehdään erityisen huolellisesti. Ennen leikkausta koiran tila vakautetaan suonensisäisellä nesteytyksellä ja antibiooteilla, ja elintoimintoja seurataan jatkuvasti inhalaatioanestesian aikana. Ennuste leikkauksella on hyvä: yli 90 % koirista toipuu, ja kun kohtu ja molemmat munasarjat on poistettu, tauti ei voi palata; harvinainen ”tynkäpyometra” syntyy vain, jos leikkauksessa jää jäljelle pala kohtua ja munasarjaa. Leikkauksen viivyttäminen on juuri se, mikä muuttaa kohtutulehduksen tavallisesta päivystysleikkauksesta taisteluksi elämästä ja kuolemasta.",
    sv: "Behandlingen är en akut operation där den infekterade livmodern och äggstockarna tas bort (ovariehysterektomi) – samma ingrepp som en sterilisering, men på en sjuk patient med en förstorad och skör livmoder, så det görs med extra försiktighet. Före operationen stabiliseras hunden med dropp och antibiotika, och under inhalationsnarkosen övervakas de livsviktiga funktionerna kontinuerligt. Prognosen med operation är god: över 90 % av hundarna tillfrisknar, och när livmodern och båda äggstockarna är borta kan sjukdomen inte komma tillbaka; den sällsynta ”stumppyometran” uppstår bara om en bit av livmodern och äggstocken har lämnats kvar vid operationen. Det är väntan med operationen som förvandlar pyometra från ett rutinmässigt akutfall till en kamp för livet.",
    en: "The treatment is emergency surgery to remove the infected uterus and the ovaries (ovariohysterectomy) — the same operation as a spay, but on a sick patient with an enlarged, fragile uterus, so it is done with extra care. Before surgery the dog is stabilised with intravenous fluids and antibiotics, and vital functions are monitored continuously under inhalation anaesthesia. The prognosis with surgery is good: over 90 % of dogs recover, and once the uterus and both ovaries are removed the disease cannot return; the rare \"stump pyometra\" happens only if a piece of uterus and ovary is left behind at surgery. Delaying surgery is what turns pyometra from a routine emergency into a fight for life."
  },
  "article.pyometra.cost.title": {
    fi: "Paljonko koiran kohtutulehdusleikkaus maksaa?",
    sv: "Vad kostar det att operera livmoderinflammation hos hund?",
    en: "How much does pyometra surgery cost?"
  },
  "article.pyometra.cost.text": {
    fi: "Kohtutulehdusleikkaus hinnoitellaan tapauskohtaisesti, koska leikkaus, nesteytys ja antibiootit, anestesian kesto ja mahdollinen sairaalahoito riippuvat koiran koosta ja siitä, kuinka sairaana se tulee meille. Saat kustannusarvion ennen leikkausta. Vertailun vuoksi: terveen nartun suunniteltu sterilointi maksaa painosta riippuen 483–753 €, ja päivystyksellinen kohtutulehdusleikkaus maksaa tätä enemmän – mitä aikaisemmin koira tuodaan hoitoon, sitä vähemmän tehohoitoa se tarvitsee. Suorakorvaus on käytettävissä LähiTapiolan, Agrian ja Pohjolan asiakkaille.",
    sv: "En pyometraoperation prissätts från fall till fall, eftersom själva ingreppet, dropp och antibiotika, narkostiden och en eventuell vårdtid på kliniken beror på hundens storlek och på hur sjuk hon är när hon kommer in. Du får ett kostnadsförslag före operationen. Som jämförelse kostar en planerad sterilisering av en frisk tik 483–753 € beroende på vikt – en akut pyometraoperation kostar mer än så, och ju tidigare hunden kommer in, desto mindre intensivvård behöver hon. Direktersättning går att få för kunder hos LähiTapiola, Agria och Pohjola.",
    en: "Pyometra surgery is priced case by case, because the operation, the fluids and antibiotics, the anaesthesia time and any hospitalisation depend on the size of the dog and on how ill she is when she arrives. You receive an estimate before surgery. For comparison, a planned spay of a healthy bitch costs 483–753 € depending on weight — an emergency pyometra operation costs more than that, and the earlier the dog is brought in, the less intensive care she needs. Direct insurance billing is available for LähiTapiola, Agria and Pohjola customers."
  },
  "article.pyometra.recovery.title": {
    fi: "Kuinka kauan toipuminen kohtutulehdusleikkauksesta kestää?",
    sv: "Hur lång är återhämtningen efter en operation för livmoderinflammation?",
    en: "How long is recovery after pyometra surgery?"
  },
  "article.pyometra.recovery.text": {
    fi: "Useimmat koirat ovat huomattavasti pirteämpiä jo päivän tai parin kuluttua leikkauksesta, kun tulehduksen lähde on poissa. Kotiin lähdetään kipulääkkeen kanssa ja eläinlääkärin harkinnan mukaan lyhyellä antibioottikuurilla; koira pitää haalaria tai kauluria 10–14 päivää, ja lenkit pidetään lyhyinä hihnalenkkeinä, kunnes ompeleet poistetaan tai ne ovat sulaneet noin 10 päivän kuluttua. Tarkistamme haavan ja yleisvoinnin leikkauksen jälkeen ja uusimme verikokeen, jos munuaisarvot olivat koholla. Täysi toipuminen kestää yleensä kaksi viikkoa.",
    sv: "De flesta hundar är märkbart piggare inom en eller två dagar efter operationen, när infektionskällan väl är borta. De åker hem med smärtlindring och, när veterinären bedömer att det behövs, en kort antibiotikakur; de bär skyddsdräkt eller krage i 10–14 dagar och går bara korta kopplade promenader tills stygnen tas bort eller har lösts upp efter ungefär 10 dagar. Vi kontrollerar såret och allmäntillståndet efter operationen och tar om blodprovet om njurvärdena var förhöjda. Full återhämtning tar normalt två veckor.",
    en: "Most dogs are noticeably brighter within a day or two of surgery, once the source of the infection is gone. They go home with pain relief and, when the vet judges it necessary, a short course of antibiotics; wear a recovery suit or cone for 10–14 days, and are kept to short lead walks until the sutures are removed or have dissolved at about 10 days. We re-check the wound and the general condition after surgery, and repeat the blood test if kidney values were raised. Full recovery normally takes two weeks."
  },
  "article.pyometra.cat.title": {
    fi: "Saako kissa kohtutulehduksen?",
    sv: "Kan katter få livmoderinflammation?",
    en: "Do cats get pyometra?"
  },
  "article.pyometra.cat.text": {
    fi: "Kyllä, joskin harvemmin kuin koirat. Kissalla oireet ovat samankaltaiset – vaisuus, huono ruokahalu, lisääntynyt juominen, turvonnut vatsa – mutta jopa 40 %:lla naaraskissoista ei ole näkyvää vuotoa, kissat peittävät sairautensa hyvin ja ne sairastuvat nuorempina (tyypillisesti noin 4-vuotiaina), joten tauti on usein jo pidemmällä, kun se huomataan. Hoito on sama päivystysleikkaus eli kohdun ja munasarjojen poisto, ja ennuste leikkauksella on hyvä. Sterilointi (kohdun ja molempien munasarjojen poisto) ehkäisee taudin, lukuun ottamatta edellä kuvattua harvinaista tynkäpyometraa.",
    sv: "Ja, men mer sällan än hundar. Hos katt är tecknen likartade – slöhet, dålig aptit, ökad törst, svullen buk – men upp till 40 % av honkatterna visar ingen synlig flytning, katter döljer sjukdom väl och de drabbas i yngre ålder (typiskt kring 4 år), så sjukdomen har ofta hunnit längre när den upptäcks. Behandlingen är samma akuta ovariehysterektomi, och prognosen med operation är god. Sterilisering (där livmodern och båda äggstockarna tas bort) förebygger sjukdomen, bortsett från den sällsynta stumppyometra som beskrivs ovan.",
    en: "Yes, though less often than dogs. In cats the signs are similar — lethargy, poor appetite, increased drinking, a swollen belly — but up to 40 % of queens show no visible discharge, cats hide illness well, and they are affected younger (typically around 4 years), so the disease is often further advanced when noticed. The treatment is the same emergency ovariohysterectomy, and the prognosis with surgery is good. Spaying (removing the uterus and both ovaries) prevents it, apart from the rare stump pyometra described above."
  },
  "article.pyometra.prevention.title": {
    fi: "Miten kohtutulehduksen voi ehkäistä?",
    sv: "Hur kan livmoderinflammation förebyggas?",
    en: "How can pyometra be prevented?"
  },
  "article.pyometra.prevention.text": {
    fi: "Sterilointi poistaa riskin lähes kokonaan, koska kohtu ja molemmat munasarjat poistetaan – ainoa poikkeus on harvinainen tynkäpyometra, jos pala munasarjaa tai kohtua jää jäljelle. Emme kuitenkaan suosittele sterilointia rutiininomaisesti jokaiselle terveelle naaraalle: toimenpiteessä on sekä hyötyjä että haittoja, ja niiden painoarvo vaihtelee yksilöittäin. Käymme ne kanssasi läpi ja teemme päätöksen yhdessä – lue lisää sterilointisivultamme. Jos pidät narttusi steriloimattomana, opettele oireet ja seuraa sitä tarkasti kahden kuukauden ajan jokaisen juoksuajan jälkeen, ja vältä estrogeenipohjaisia ”vahinkoastutuspistoksia”, jotka lisäävät riskiä selvästi; myös hormonaaliset juoksunestohoidot (progestiinit) on yhdistetty kohtutulehdukseen, joskaan laaja suomalainen tutkimus ei vahvistanut voimakasta yhteyttä. Kysy meiltä turvallisemmista vaihtoehdoista.",
    sv: "Sterilisering tar så gott som bort risken, eftersom livmodern och båda äggstockarna avlägsnas – det enda undantaget är den sällsynta stumppyometran, när en bit äggstock eller livmoder lämnats kvar. Vi rekommenderar ändå inte sterilisering rutinmässigt för varje frisk hona: ingreppet har både fördelar och nackdelar, och hur de väger mot varandra varierar från individ till individ. Vi går igenom dem tillsammans med dig och fattar beslutet gemensamt – läs mer på vår sida om sterilisering. Om du håller tiken intakt: lär dig tecknen, håll noga koll på henne under de två månaderna efter varje löp och undvik östrogenbaserade ”tjuvparningssprutor”, som klart ökar risken; hormonella löphämmande behandlingar (gestagener) har också kopplats till pyometra, även om en stor finländsk studie inte kunde bekräfta någon stark effekt. Fråga oss om säkrare alternativ.",
    en: "Spaying all but removes the risk, because the uterus and both ovaries are removed — the only exception is the rare stump pyometra when a piece of ovary or uterus is left behind. We do not, however, recommend spaying every healthy female as a matter of routine: the procedure has both benefits and drawbacks, and how they balance out differs from one animal to the next. We go through them with you and make the decision together — read more on our spaying page. If you keep your bitch intact, learn the signs and check her closely in the two months after every heat, and avoid oestrogen-based \"mismating\" injections, which clearly increase the risk; hormonal heat-suppression treatments (progestogens) are also linked to pyometra, although a large Finnish study did not confirm a strong effect. Ask us about safer alternatives."
  },
  "article.pyometra.contact.title": {
    fi: "Milloin pitää ottaa yhteyttä eläinlääkäriin?",
    sv: "När ska jag kontakta veterinären vid misstänkt livmoderinflammation?",
    en: "When should I contact the vet?"
  },
  "article.pyometra.contact.text": {
    fi: "Heti – samana päivänä – jos steriloimattomalla nartulla tai naaraskissalla on vuotoa tai se on vaisu, juo paljon tai kieltäytyy ruoasta viikkoja tai kuukausia juoksuajan tai kiiman jälkeen. Aukioloaikoina soita Vaasaan Eläinklinikka Saareen, p. (06) 321 7300; varaamme päivittäin aikoja akuuttipotilaille. Iltaisin ja viikonloppuisin soita alueen päivystysnumeroon 0600 399 299. Kohtutulehdus ei odota maanantaihin.",
    sv: "Genast – samma dag – om en osteriliserad tik eller honkatt har flytning, är slö, dricker mycket eller vägrar äta under veckorna eller månaderna efter ett löp. Under öppettiderna ringer du Djurklinik Saari i Vasa på (06) 321 7300; vi reserverar akuttider varje dag. Kvällar och veckoslut ringer du regionens jourtelefon 0600 399 299. Pyometra väntar inte till måndag.",
    en: "Immediately — the same day — if an unspayed female shows discharge, is listless, drinks a lot or refuses food in the weeks or months after a heat. During business hours call Saari Animal Clinic in Vaasa on (06) 321 7300; we reserve daily acute appointments. Evenings and weekends, call the regional emergency number 0600 399 299. Pyometra does not wait until Monday."
  },

  // Article 15: CCL / Lateral Suture
  'article.ccl.title': {
    fi: 'Lateral suture — eturistisiteen korjaus synteettisellä tukimateriaalilla',
    sv: 'Lateral sutur — korsbandsskadereparation med syntetiskt stödmaterial',
    en: 'Lateral Suture — Cruciate Ligament Repair with Synthetic Support Material'
  },
  'article.ccl.intro': {
    fi: 'Eturistisiteen (cranial cruciate ligament, CCL) repeämä on koirien yleisin ortopedinen ongelma ja sitä esiintyy myös kissoilla. Lateral suture eli ekstrakapsulaari lateraalisuturaatio on tehokas ja pitkään käytetty kirurginen menetelmä, jossa polvinivel stabiloidaan synteettisellä tukimateriaalilla nivelen ulkopuolelta. Menetelmä sopii erinomaisesti pienille koirille sekä kissoille. Klinikallamme leikkauksen suorittaa eläinlääkäri Pamela, jolla on laaja kokemus ortopedisistä toimenpiteistä.',
    sv: 'Främre korsbandsskada (cranial cruciate ligament, CCL) är det vanligaste ortopediska problemet hos hundar och förekommer även hos katter. Lateral sutur, det vill säga extrakapsulär lateral suturering, är en effektiv och beprövad kirurgisk metod där knäleden stabiliseras med syntetiskt stödmaterial utanför leden. Metoden passar utmärkt för små hundar samt katter. På vår klinik utförs operationen av veterinär Pamela, som har bred erfarenhet av ortopediska ingrepp.',
    en: 'Cranial cruciate ligament (CCL) rupture is the most common orthopedic problem in dogs and also occurs in cats. The lateral suture technique, also known as extracapsular lateral suture stabilization, is an effective and well-established surgical method where the knee joint is stabilized with synthetic support material placed outside the joint. The technique is excellent for small and medium-sized dogs and cats. At our clinic, the surgery is performed by veterinarian Pamela, who has extensive experience in orthopedic procedures.'
  },
  'article.ccl.how.title': {
    fi: 'Miten lateral suture toimii?',
    sv: 'Hur fungerar lateral sutur?',
    en: 'How Does Lateral Suture Work?'
  },
  'article.ccl.how.text': {
    fi: 'Leikkauksessa polvinivel avataan ja tarkastetaan: repeytyneen ristisiteen jäänteet poistetaan ja nivelkierukat (meniskit) tutkitaan vaurioiden varalta. Tämän jälkeen nivelen ulkopuolelle asennetaan vahva monofilamenttinen nylonlanka, joka kierretään reisiluun takaosan (fabella) ympäri ja kiinnitetään sääriluun etuosaan poratun tunnelin kautta. Lanka kiristetään ja lukitaan metallisilla puristusholkeilla (crimp clamp). Tämä stabiloi polvinivelen ja estää sääriluun liukumisen eteenpäin — aivan kuten terve ristiside tekisi. Lanka toimii väliaikaisena tukirakenteena, kunnes kehon oma sidekudos (periartikulaarinen fibroosi) muodostuu nivelen ympärille ja tarjoaa pysyvän vakauden.',
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
    fi: 'Komplikaatioriski on pieni (5–17 %), ja suurin osa komplikaatioista on lieviä: turvotusta, serooman muodostumista tai lievää infektiota. Harvinaisempi mutta kliinisesti merkittävä komplikaatio on myöhäinen nivelkierukkavaurio (noin 7 %), joka voi ilmetä viikkojen tai kuukausien kuluttua äkillisenä ontumisena. Langan pettäminen on mahdollista erityisesti ylipainoisilla tai aktiivisilla koirilla. Paras keino ehkäistä komplikaatioita on noudattaa kuntoutusohjeita tarkasti.',
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
    fi: 'Lateral suture -leikkauksen hinta klinikallamme on kissalle 950 euroa ja koiralle 1 200 euroa. Hinta sisältää leikkausta edeltävän tutkimuksen, anestesian ja sen valvonnan, itse leikkauksen ja välittömän jälkihoidon. Vertailun vuoksi TTA-leikkauksen hinta on 1 700–1 800 euroa.',
    sv: 'Priset för lateral sutur-operation på vår klinik är 950 euro för katt och 1 200 euro för hund. Priset inkluderar undersökning före operationen, anestesi med övervakning, själva operationen och omedelbar eftervård. Som jämförelse kostar TTA-operationen 1 700–1 800 euro.',
    en: 'The price for lateral suture surgery at our clinic is 950 euros for cats and 1,200 euros for dogs. The price includes the pre-operative examination, anesthesia with monitoring, the surgery itself, and immediate aftercare. For comparison, TTA surgery is 1,700–1,800 euros.'
  },

  // Article 16: Hedgehog Conservation
  'article.hedgehog.tag': { fi: 'Wildlife', sv: 'Wildlife', en: 'Wildlife' },
  'article.hedgehog.title': {
    fi: 'Siili Euroopassa ja Suomessa — uhanalainen puutarhan ystävä, joka tarvitsee apuamme',
    sv: 'Igelkotten i Europa och Finland — en hotad trädgårdsvän som behöver vår hjälp',
    en: 'The Hedgehog in Europe and Finland — An Endangered Garden Friend That Needs Our Help'
  },
  'article.hedgehog.intro': {
    fi: 'Euroopan siili (Erinaceus europaeus) on yksi rakastetuimmista villieläimistämme — ja yksi nopeimmin katoavista lajeista. Lokakuussa 2024 IUCN nosti siilin uhanalaisuusluokituksen luokasta "elinvoimainen" luokkaan "silmälläpidettävä", koska kannat ovat vähentyneet monin paikoin jopa yli 30 % kymmenessä vuodessa. Suomessa siili elää levinneisyytensä pohjoisrajalla, mikä tekee kannastamme erityisen haavoittuvan. Tässä artikkelissa käymme läpi siilin tilanteen, uhat ja sen, miten jokainen voi auttaa.',
    sv: 'Den europeiska igelkotten (Erinaceus europaeus) är ett av våra mest älskade vilda djur — och ett av de snabbast minskande. I oktober 2024 uppgraderade IUCN igelkottens hotstatus till "nära hotad" (Near Threatened), eftersom populationerna på många håll har minskat med rentav över 30 % på tio år. I Finland lever igelkotten vid den nordligaste gränsen av sitt utbredningsområde, vilket gör vår population särskilt sårbar. I denna artikel går vi igenom igelkottens situation, hoten och hur var och en kan hjälpa till.',
    en: 'The European hedgehog (Erinaceus europaeus) is one of our most beloved wild animals — and one of the fastest declining. In October 2024, the IUCN upgraded the hedgehog\'s threat status to Near Threatened, as populations have declined by more than 30% over ten years in many areas. In Finland, the hedgehog lives at the northernmost limit of its range, making our population particularly vulnerable. In this article, we cover the hedgehog\'s situation, the threats it faces, and how everyone can help.'
  },
  'article.hedgehog.photo.caption': {
    fi: 'Vasemmalla: 420 g siili, oikealla: 750 g siili — puhelin kokovertailuna. Syksyllä alle 600 g painava siili ei selviä talvihorroksesta ja tarvitsee apua, mutta alkukesällä pienet siilit ovat usein terveitä poikasia. Kuva: Eläinklinikka Saari.',
    sv: 'Till vänster: 420 g igelkott, till höger: 750 g igelkott — telefonen som storleksjämförelse. På hösten klarar en igelkott under 600 g inte vinterdvalan och behöver hjälp, men på försommaren är små igelkottar ofta friska ungar. Foto: Djurklinik Saari.',
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
    fi: 'Suomessa siili elää levinneisyytensä pohjoisrajalla — yhtenäinen esiintymisalue ulottuu suunnilleen Tornio–Kuhmo-linjalle asti. Siili on rauhoitettu luonnonsuojelulain (9/2023) nojalla. Vuoden 2019 uhanalaisuusarvioinnissa siili luokiteltiin Suomessa elinvoimaiseksi (LC), mutta kannan kehityksestä ei ole järjestelmällistä seurantatietoa. Siili tarvitsee vähintään 155 päivää vuodessa ilman pakkasta lisääntyäkseen ja kerätäkseen riittävät rasvavarastot talvihorrokseen — Suomen lyhyt kesä tekee tästä haastavaa. Siilit elävät meillä lähes yksinomaan ihmisasutuksen läheisyydessä: pihoilla, puistoissa ja puutarhoissa.',
    sv: 'I Finland lever igelkotten vid den nordligaste gränsen av sitt utbredningsområde — det sammanhängande utbredningsområdet sträcker sig ungefär till linjen Torneå–Kuhmo. Igelkotten är fridlyst enligt naturvårdslagen (9/2023). I den finska rödlistebedömningen 2019 klassades igelkotten som livskraftig (LC), men det finns ingen systematisk övervakning av populationsutvecklingen och en minskning misstänks. Igelkotten behöver minst 155 frostfria dagar för att kunna fortplanta sig och samla tillräckliga fettreserver för vinterdvala — Finlands korta sommar gör detta utmanande. Hos oss lever igelkottar nästan uteslutande i närheten av bebyggelse: på gårdar, i parker och trädgårdar.',
    en: 'In Finland, the hedgehog lives at the northernmost limit of its range — the continuous distribution area extends approximately to the Tornio–Kuhmo line. The hedgehog is protected under the Nature Conservation Act (9/2023). In the 2019 Finnish Red List assessment, the hedgehog was classified as Least Concern (LC), but there is no systematic monitoring of population trends and a decline is suspected. The hedgehog needs at least 155 frost-free days to breed and accumulate sufficient fat reserves for hibernation — Finland\'s short summer makes this challenging. In Finland, hedgehogs live almost exclusively near human habitation: in yards, parks and gardens.'
  },
  'article.hedgehog.threats.title': {
    fi: 'Miksi siilit vähenevät?',
    sv: 'Varför minskar igelkottarna?',
    en: 'Why Are Hedgehogs Declining?'
  },
  'article.hedgehog.threats.text': {
    fi: 'Suurimmat uhat ovat ihmisen aiheuttamia. Liikenne tappaa Euroopassa vuosittain satoja tuhansia siilejä — esimerkiksi Alankomaissa jopa 340 000 ja Belgiassa 230 000–350 000. Elinympäristöjen pirstoutuminen umpinaisilla aidoilla estää siilien liikkumisen. Maatalouden tehostuminen, torjunta-aineet ja hyönteiskato vähentävät ravintoa. Tanskassa 2024 julkaistu tutkimus osoitti, että 84 % tutkituista siileistä oli altistunut jyrsijämyrkyille ja 43 % hyönteismyrkyille. Ilmastonmuutos aiheuttaa ennenaikaisia heräämisiä talvihorroksesta, jotka kuluttavat kriittisiä rasvavarastoja.',
    sv: 'De största hoten är orsakade av människan. Trafiken dödar hundratusentals igelkottar i Europa årligen — till exempel i Nederländerna upp till 340 000 och i Belgien 230 000–350 000. Fragmentering av livsmiljöer med täta staket hindrar igelkottens rörelse. Intensifierat jordbruk, bekämpningsmedel och insektsdöd minskar födotillgången. En dansk studie publicerad 2024 visade att 84 % av undersökta igelkottar hade exponerats för gnagargift och 43 % för bekämpningsmedel. Klimatförändringen orsakar förtida uppvaknanden från vinterdvala som förbrukar kritiska fettreserver.',
    en: 'The greatest threats are human-caused. Traffic kills hundreds of thousands of hedgehogs in Europe annually — for example up to 340,000 in the Netherlands and 230,000–350,000 in Belgium. Habitat fragmentation with solid fences prevents hedgehog movement. Agricultural intensification, pesticides and insect decline reduce food availability. A Danish study published in 2024 showed that 84% of examined hedgehogs had been exposed to rodenticides and 43% to insecticides. Climate change causes premature awakenings from hibernation that deplete critical fat reserves.'
  },
  'article.hedgehog.robots.title': {
    fi: 'Robottiruohonleikkurit — kasvava uhka',
    sv: 'Robotgräsklippare — ett växande hot',
    en: 'Robot Lawn Mowers — A Growing Threat'
  },
  'article.hedgehog.robots.text': {
    fi: 'Robottiruohonleikkurit ovat nousseet yhdeksi merkittävimmistä siilien uhista. Oxfordin yliopiston ja Leibniz-instituutin vuonna 2024 julkaisemassa tutkimuksessa testattiin 19 robottileikkurimallia — osa vahingoitti siilejä, osa ei aiheuttanut havaittavaa vaaraa. Saksassa dokumentoitiin 16 kuukauden aikana 370 sähkökäyttöisten puutarhatyökalujen vahingoittamaa siiliä, joista lähes puolet kuoli. Todellinen luku on huomattavasti suurempi. Siilit ovat yöeläimiä, ja robottiruohonleikkurit toimivat usein öisin valvomattomina — siilin puolustusmekanismi (keräytyminen palloksi) ei suojaa teriltä. Tärkein viesti: älä koskaan käytä robottiruohonleikkuria yöllä.',
    sv: 'Robotgräsklippare har blivit ett av de mest betydande hoten mot igelkottar. I en studie publicerad 2024 av Oxfords universitet och Leibniz-institutet testades 19 robotgräsklipparmodeller — vissa skadade igelkottar, andra utgjorde ingen påvisbar fara. I Tyskland dokumenterades under 16 månader 370 igelkottar skadade av eldrivna trädgårdsredskap, varav nästan hälften dog. Det verkliga antalet är betydligt högre. Igelkottar är nattdjur och robotgräsklippare körs ofta nattetid utan uppsikt — igelkottens försvarsmekanism (att rulla ihop sig till en boll) skyddar inte mot klingorna. Det viktigaste budskapet: kör aldrig robotgräsklipparen på natten.',
    en: 'Robot lawn mowers have become one of the most significant threats to hedgehogs. In a study published in 2024 by the University of Oxford and the Leibniz Institute, 19 robot mower models were tested — some injured hedgehogs while others posed no detectable danger. In Germany, 370 hedgehogs injured by electric gardening tools were documented over 16 months, of which nearly half died. The actual number is significantly higher. Hedgehogs are nocturnal, and robot mowers often operate at night unattended — the hedgehog\'s defense mechanism (curling into a ball) offers no protection against the blades. The most important message: never run robot mowers at night.'
  },
  'article.hedgehog.help.title': {
    fi: 'Miten voit auttaa siilejä?',
    sv: 'Hur kan du hjälpa igelkottarna?',
    en: 'How Can You Help Hedgehogs?'
  },
  'article.hedgehog.help.text': {
    fi: 'Tee siiliaukko aitaan — 13 × 13 cm:n reikä aidan alaosassa riittää ja mahdollistaa siilien liikkumisen pihojen välillä. Tämä on yksittäisistä tavoista vaikuttavin. Älä käytä robottiruohonleikkuria hämärän jälkeen. Jätä puutarhaan villiintyneitä alueita — lehtikasat ja risukot tarjoavat pesäpaikkoja. Tarjoa raikasta vettä matalassa astiassa. Lisäruokana sopii kissanruoka (lihapohjaista, ei kalaa) — älä koskaan anna leipää tai maitoa, ne aiheuttavat ripulia. Vältä torjunta-aineita ja etanasyöttejä — siilit ovat luonnon parhaita etanan- ja kotiloiden torjujia. Tarkista aina nuotiopaikat ja lehtikasot ennen polttamista. Asenna lammikkoon nousuramppi, sillä siilit uivat mutta väsyvät nopeasti.',
    sv: 'Gör en igelkottsöppning i staketet — ett hål på 13 × 13 cm vid staketets botten räcker och gör det möjligt för igelkottar att röra sig mellan trädgårdar. Detta är den enskilt mest effektiva åtgärden. Kör inte robotgräsklipparen efter skymning. Lämna vilda ytor i trädgården — lövhögar och rishögar erbjuder boplatser. Ställ ut friskt vatten i en grund skål. Som tillskottsfoder passar kattmat (köttbaserad, inte fisk) — ge aldrig bröd eller mjölk, det orsakar diarré. Undvik bekämpningsmedel och snigelgift — igelkottar är naturens bästa snigel- och snäckbekämpare. Kontrollera alltid eldhögar och lövhögar innan du tänder eld. Installera en ramp i dammen, eftersom igelkottar kan simma men tröttnar snabbt.',
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
    fi: 'Käsittelemättömistä laudoista (EI vaneria — vaneri ei hengitä ja homehtuu) rakennetaan noin 40 × 40 × 40 cm:n laatikko ILMAN pohjaa — avoin pohja päästää virtsan valumaan maahan eikä siili jäädy märkään pohjaan. Yhdelle seinälle sahataan 10 × 15 cm:n sisäänkäynti aukko, johon kiinnitetään kolmesta laudasta rakennettu 15–20 cm:n tunneli — tunneli estää kettuja ja kissoja pääsemästä sisään. Molempiin yläkulmiin porataan tuuletusreiät (homeenesto). Kansi tehdään irroitettavaksi ja päällystetään kattohuovalla vesisateelta suojaksi. Sisälle levitetään ensin soraa (salaojitus), sitten multaa, sammalta ja lopuksi tila pakataan täyteen kuivia lehtiä (vaahteran lehdet ovat siilien suosikkeja) ja heinää. Pesä sijoitetaan rauhalliseen, varjoisaan paikkaan pohjoissuuntaan — EI aurinkoiselle puolelle, sillä keväinen aurinko herättäisi siilin liian aikaisin. Suuntaa sisäänkäynti tuulelta suojaan. Pesän tulee olla valmis viimeistään syyskuun lopussa, mielellään jo elokuussa. Lokakuun ja huhtikuun välillä pesää ei saa avata eikä häiritä — lumen alla oleva pesä on lämmin ja turvallinen. Älä koskaan poista lunta pesän päältä. Keväällä (touko-kesäkuussa) pesä puhdistetaan hansikkaat kädessä, pestään kuumalla vedellä ja täytetään uudelleen tuoreilla lehdillä.',
    sv: 'Av obehandlade brädor (INTE plywood — plywood andas inte och mögel bildas) byggs en låda på ungefär 40 × 40 × 40 cm UTAN botten — den öppna botten låter urinen rinna ner i marken och igelkotten fryser inte fast i ett vått golv. I en vägg sågas en ingångsöppning på 10 × 15 cm, där en tunnel på 15–20 cm fästs, byggd av tre brädor — tunneln hindrar rävar och katter från att ta sig in. I båda övre hörnen borras ventilationshål (mot mögel). Locket görs avtagbart och kläs med takpapp som vattenskydd. Inuti läggs först grus (dränering), sedan jord, mossa och slutligen fylls hela utrymmet med torra löv (lönnlöv är igelkottarnas favorit) och hö. Boet placeras på en lugn, skuggig plats i norrläge — INTE på solsidan, eftersom vårsolen skulle väcka igelkotten för tidigt. Rikta ingången i lä. Boet ska vara klart senast i slutet av september, helst redan i augusti. Mellan oktober och april får boet inte öppnas eller störas — ett bo under snön är varmt och tryggt. Ta aldrig bort snö från boet. På våren (maj–juni) rengörs boet med handskar, tvättas med hett vatten och fylls på nytt med färska löv.',
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
    fi: 'Siili tarvitsee apua, jos se horjuu tai makaa kyljellään, liikkuu päivänvalossa (terve siili on yöeläin), sillä on näkyviä vammoja tai kärpäsen toukkia, tai se on syksyllä (syyskuusta lähtien) pieni — alle 600 g. Alkukesällä pienet siilit ovat usein poikasia, jotka syntyvät kesä–heinäkuussa ja painavat vain 120–350 g: tämä on normaalia. Mutta syyskuusta lähtien alle 600 g painava siili ei selviä Suomen talvihorroksesta ilman apua. Nosta siili paksut hansikkaat kädessä ja aseta se korkeareunaisen pahvilaatikon sisälle, jossa on pyyhe pohjalla. Tarjoa lämpöä — lämpimällä vedellä täytetty, pyyhkeeseen kääritty kuumavesipullo on esimerkiksi helppo vaihtoehto. Tarjoa vettä ja kissan ruokaa. Ota yhteyttä eläinlääkäriin mahdollisimman pian. Eläinklinikka Saarella hoidamme yhteistyössä Nordic Wildlife Caren kanssa myös loukkaantuneita siilejä — tuo eläin klinikalle, niin annamme ensiavun ja järjestämme tarvittaessa jatkohoidon.',
    sv: 'En igelkott behöver hjälp om den går ostadigt eller ligger på sidan, rör sig i dagsljus (en frisk igelkott är ett nattdjur), har synliga skador eller fluglarver, eller om den är liten på hösten (från september) — under 600 g. På försommaren är små igelkottar ofta ungar som föds i juni–juli och väger bara 120–350 g vid avvänjning: detta är helt normalt. Men från september klarar en igelkott under 600 g inte Finlands långa vinterdvala utan hjälp. Lyft igelkotten med tjocka handskar och placera den i en låda med höga kanter med en handduk i botten. Erbjud värme — en varmvattenflaska fylld med varmt vatten, inlindad i en handduk. Erbjud vatten och mat (kattmat). Kontakta veterinär så snart som möjligt. På Djurklinik Saari vårdar vi i samarbete med Nordic Wildlife Care även skadade igelkottar — ta med djuret till kliniken så ger vi den första hjälpen och ordnar fortsatt vård.',
    en: 'A hedgehog needs help if it is staggering or lying on its side, active during daylight (a healthy hedgehog is nocturnal), has visible injuries or fly larvae, or is small in autumn (from September onwards) — under 600 g. In early summer, small hedgehogs are often juveniles born in June–July that weigh only 120–350 g when weaned: this is completely normal. But from September onwards, a hedgehog under 600 g cannot survive Finland\'s long hibernation without help. Pick up the hedgehog wearing thick gloves and place it in a high-sided cardboard box with a towel at the bottom. Provide warmth — a hot water bottle filled with warm water, wrapped in a towel. Offer water and food (cat food). Contact a veterinarian as soon as possible. At Eläinklinikka Saari, we care for injured hedgehogs in cooperation with Nordic Wildlife Care — bring the animal to the clinic and we will provide first aid and arrange ongoing care.'
  },
  'article.hedgehog.ecology.title': {
    fi: 'Siilin elämää lyhyesti',
    sv: 'Igelkottens liv i korthet',
    en: 'Hedgehog Life in Brief'
  },
  'article.hedgehog.ecology.text': {
    fi: 'Siili on yöeläin, joka kulkee noin 1–2 km yössä ravintoa etsien. Aikuinen siili painaa 600–1 100 g ja sillä on noin 5 000–6 000 piikkiä. Ravintona ovat kovakuoriaiset, toukat, etanat, kotilot, madot ja hyönteiset — siili on puutarhurin paras ystävä. Talvihorros kestää Suomessa noin lokakuusta huhtikuuhun: ruumiinlämpö laskee 35 asteesta jopa 1–4 asteeseen ja syke putoaa 190:stä noin 20 lyöntiin minuutissa. Lisääntymiskausi on huhti–syyskuussa, ja naaras synnyttää keskimäärin 4–5 poikasta. Siilin keskimääräinen elinikä luonnossa on 2–3 vuotta. Suomessa siili tarvitsee vähintään noin 450–600 gramman painon selviytyäkseen talvihorroksesta.',
    sv: 'Igelkotten är ett nattdjur som rör sig 1–2 km per natt i jakt på föda. En vuxen igelkott väger 600–1 100 g och har cirka 5 000–6 000 taggar. Födan består av skalbaggar, larver, sniglar, snäckor, maskar och insekter — igelkotten är trädgårdsmästarens bästa vän. Vinterdvalan varar i Finland ungefär från oktober till april: kroppstemperaturen sjunker från 35 grader till så lågt som 1–4 grader och hjärtfrekvensen sjunker från 190 till cirka 20 slag per minut. Fortplantningstiden är april–september och honan föder i genomsnitt 4–5 ungar. Igelkottens genomsnittliga livslängd i det vilda är 2–3 år. I Finland behöver igelkotten en vikt på minst cirka 450–600 gram för att överleva vinterdvalan.',
    en: 'The hedgehog is a nocturnal animal that travels 1–2 km per night foraging for food. An adult hedgehog weighs 600–1,100 g and has approximately 5,000–6,000 spines. Its diet consists of beetles, larvae, slugs, snails, worms and insects — the hedgehog is the gardener\'s best friend. Hibernation in Finland lasts approximately from October to April: body temperature drops from 35°C to as low as 1–4°C and heart rate falls from 190 to about 20 beats per minute. The breeding season is April–September and the female gives birth to an average of 4–5 hoglets. The average lifespan of a hedgehog in the wild is 2–3 years. In Finland, a hedgehog needs a weight of at least approximately 450–600 grams to survive hibernation.'
  },
  'article.hedgehog.register.title': {
    fi: 'Pesärekisteri — onko sinulla vapaa pesä kotona?',
    sv: 'Boregister — har du ett ledigt bo hemma?',
    en: 'Nesting register — do you have a free nest at home?'
  },
  'article.hedgehog.register.text': {
    fi: 'Tänä syksynä odotamme klinikalle tavallista enemmän siilejä, ja osa niistä on valmiina vapautettavaksi vasta myöhään syksyllä — liian myöhään rakentaakseen tai löytääkseen oman talvipesän ennen pakkasten tuloa. Siksi perustamme pesärekisterin: listan ihmisistä, joiden pihalla on valmis, vapaa pesä. Kun siili on valmis vapautettavaksi, voimme sijoittaa sen lähelläsi olevaan turvalliseen pesään.',
    sv: 'I höst väntar vi oss fler igelkottar på kliniken än vanligt, och en del av dem blir redo att släppas ut sent på hösten — för sent för att hinna bygga eller hitta ett eget vinterbo innan frosten kommer. Därför startar vi ett boregister: en lista över personer som har ett färdigt, ledigt bo på sin gård. När en igelkott är redo att släppas ut kan vi placera den i ett tryggt bo nära dig.',
    en: 'This autumn we\'re expecting more hedgehogs at the clinic than usual, and some of them won\'t be ready for release until late in the season — too late to build or find their own winter nest before the frost arrives. That\'s why we\'re starting a nesting register: a list of people who have a ready, free nest in their garden. When a hedgehog is ready for release, we can place it in a safe nest near you.'
  },
  'article.hedgehog.register.text2': {
    fi: 'Jos olet jo rakentanut yllä olevien ohjeiden mukaisen pesän — tai sinulla on muuten sopiva, rauhallinen ja suojainen paikka pihallasi — ilmoittaudu alla olevalla lomakkeella. Pesän ei tarvitse olla vapaa juuri nyt; riittää, että se on valmis jossain vaiheessa syksyä.',
    sv: 'Om du redan har byggt ett bo enligt instruktionerna ovan — eller har en annan lämplig, lugn och skyddad plats på din gård — anmäl dig med formuläret nedan. Boet behöver inte vara ledigt just nu; det räcker att det är klart någon gång under hösten.',
    en: 'If you\'ve already built a nest using the instructions above — or you have another suitable, quiet, sheltered spot in your garden — register using the form below. The nest doesn\'t need to be free right now; it just needs to be ready at some point this autumn.'
  },

  // Cat Stress & Cat Friendly Clinic Article
  'article.catstress.tag': { fi: 'Kissojen terveys', sv: 'Katthälsa', en: 'Cat Health' },
  'article.catstress.title': {
    fi: 'Stressitön eläinlääkärikäynti kissalle — näin autamme ja näin voit valmistautua',
    sv: 'Stressfritt veterinärbesök för katten — så hjälper vi och så kan du förbereda dig',
    en: 'A Stress-Free Vet Visit for Your Cat — How We Help and How You Can Prepare'
  },
  'article.catstress.intro': {
    fi: 'Eläinlääkärikäynti on monelle kissalle stressaava kokemus. Vieras ympäristö, oudot hajut, koirien läsnäolo ja vieraiden ihmisten käsittely voivat laukaista voimakkaan stressireaktion. Stressi ei ole vain epämukavaa — se vaikuttaa myös tutkimustuloksiin: stressaantuneen kissan verensokeriarvo voi nousta jopa 10 mmol/l (ns. stressihyperglykemia), ja verenpaine voi kohota 15–75 mmHg, mikä vaikeuttaa diagnosointia. Eläinklinikka Saarella olemme panostaneet kissojen hyvinvointiin ja saaneet kansainvälisen ISFM-järjestön Cat Friendly Clinic Silver -sertifikaatin.',
    sv: 'Ett veterinärbesök är en stressande upplevelse för många katter. En främmande miljö, okända lukter, närvaro av hundar och hantering av främlingar kan utlösa en stark stressreaktion. Stress är inte bara obehagligt — det påverkar också undersökningsresultaten: en stressad katts blodsockervärde kan stiga med upp till 10 mmol/l (s.k. stresshyperglykemi) och blodtrycket kan höjas med 15–75 mmHg ("vitrock hypertension"), vilket försvårar diagnostiken. På Djurklinik Saari har vi satsat på kattens välbefinnande och erhållit den internationella ISFM-organisationens Cat Friendly Clinic Silver-certifiering.',
    en: 'A vet visit is a stressful experience for many cats. An unfamiliar environment, strange smells, the presence of dogs, and handling by strangers can trigger a strong stress response. Stress is not just uncomfortable — it also affects test results: a stressed cat\'s blood glucose can rise by up to 10 mmol/L (stress hyperglycemia), and blood pressure can increase by 15–75 mmHg ("white coat hypertension"), making diagnosis more difficult. At Eläinklinikka Saari, we have invested in feline wellbeing and earned the international ISFM Cat Friendly Clinic Silver certification.'
  },
  'article.catstress.signs.title': {
    fi: 'Stressin merkit kissalla',
    sv: 'Tecken på stress hos katten',
    en: 'Signs of Stress in Cats'
  },
  'article.catstress.signs.text': {
    fi: 'Stressaantunut kissa osoittaa merkkejä kehonkielellään: pupillit laajenevat, korvat painuvat litteiksi tai sivuille, keho jäykistyy ja häntä painuu kiinni vartaloon. Kissa voi sihistä, murista, yrittää paeta tai jähmettyä paikoilleen. Stressioireita ovat myös liiallinen nuoleminen, haukottelu, huulten lipominen sekä pahimmillaan virtsan tai ulosteen hallitsematon karkaaminen. Nämä reaktiot ovat tyypillisiä stressiperäisiä oireita— ne kertovat, että kissa kokee tilanteen uhkaavaksi.',
    sv: 'En stressad katt visar tecken genom sitt kroppsspråk: pupillerna vidgas, öronen plattas till eller vänds åt sidorna, kroppen styvnar och svansen pressas mot kroppen. Katten kan fräsa, morra, försöka fly eller stelna till. Andra stresstecken är överdriven slickning, gäspning, läpp slickningar och i värsta fall okontrollerad urinering eller avföring. Dessa reaktioner är normala — de berättar att katten upplever situationen som hotfull.',
    en: 'A stressed cat shows signs through body language: pupils dilate, ears flatten or turn sideways, the body stiffens and the tail presses against the body. The cat may hiss, growl, try to escape, or freeze in place. Other stress signs include excessive licking, yawning, lip licking, and in the worst case, loss of bladder or bowel control. These reactions are normal — they indicate that the cat perceives the situation as threatening.'
  },
  'article.catstress.feliway.title': {
    fi: 'Feliway — kissan oma rauhoittava viesti',
    sv: 'Feliway — kattens eget lugnande budskap',
    en: 'Feliway — The Cat\'s Own Calming Signal'
  },
  'article.catstress.feliway.text': {
    fi: 'Kun kissa tuntee olonsa turvalliseksi, se hieroo päätään ja poskiaan kalusteisiin jättäen kasvojen feromoneja (F3-fraktio). Feliway on synteettinen kopio tästä feromonista. Se lähettää kissan vomeronasaalielimen kautta rauhoittavan viestin: "tämä paikka on turvallinen." Tutkimuksissa Feliway-suihketta saaneiden kissojen stressipisteet olivat merkittävästi alhaisemmat kuin verrokkiryhmän, ja 41 % omistajista koki kissansa olevan selvästi rauhallisempi. Klinikallamme käytämme Feliway-haihdutinta vastaanotto- ja odotustiloissa sekä Feliway-suihketta tutkimuspöydillä ja pyyhkeillä.',
    sv: 'När en katt känner sig trygg gnider den sitt huvud och kinder mot möbler och avsätter ansiktsferomoner (F3-fraktionen). Feliway är en syntetisk kopia av detta feromon. Det skickar via kattens vomeronasala organ ett lugnande budskap: "den här platsen är trygg." I studier hade katter som exponerades för Feliway-spray signifikant lägre stresspoäng än kontrollgruppen, och 41 % av ägarna upplevde sin katt som tydligt lugnare. På vår klinik använder vi Feliway-diffusorer i mottagnings- och väntrum samt Feliway-spray på undersökningsbord och handdukar.',
    en: 'When a cat feels safe, it rubs its head and cheeks against furniture, depositing facial pheromones (the F3 fraction). Feliway is a synthetic copy of this pheromone. It sends a calming message through the cat\'s vomeronasal organ: "this place is safe." In studies, cats exposed to Feliway spray had significantly lower stress scores than the control group, and 41% of owners reported their cat was noticeably calmer. At our clinic, we use Feliway diffusers in reception and waiting areas and Feliway spray on examination tables and towels.'
  },
  'article.catstress.clinic.title': {
    fi: 'Cat Friendly Clinic Silver — mitä se tarkoittaa?',
    sv: 'Cat Friendly Clinic Silver — vad innebär det?',
    en: 'Cat Friendly Clinic Silver — What Does It Mean?'
  },
  'article.catstress.clinic.text': {
    fi: 'ISFM:n (International Society of Feline Medicine) Cat Friendly Clinic -ohjelma on kansainvälinen sertifiointijärjestelmä, joka asettaa standardit kissojen hoidolle eläinklinikoilla. Silver-taso edellyttää mm. erillistä odotustilaa kissoille erillään koirista, Feliway-feromonihaihduttimien käyttöä kaikissa tiloissa, nimettyä "kissavastaavaa" (Cat Advocate) henkilökunnasta, kissaystävällisiä käsittelytekniikoita (scruff-free — emme koskaan nosta kissaa niskasta), henkilökunnan koulutusta stressin tunnistamiseen sekä rauhallista ympäristöä hoitotiloissa piiloutumispaikkoineen ja näköestein. Sertifikaatti uusitaan kolmen vuoden välein.',
    sv: 'ISFM:s (International Society of Feline Medicine) Cat Friendly Clinic-program är ett internationellt certifieringssystem som sätter standarder för kattvård på veterinärkliniker. Silver-nivån kräver bl.a. separat väntrum för katter skilt från hundar, Feliway-feromondiffusorer i alla utrymmen, en utsedd "katt ansvarig" (Cat Advocate) bland personalen, kattvänliga hanteringstekniker (scruff-free — vi lyfter aldrig katten i nackskinnet), personalutbildning i stress igenkänning samt en lugn miljö på vårdavdelningen med gömställen och syn barriärer. Certifikatet förnyas vart tredje år.',
    en: 'The ISFM (International Society of Feline Medicine) Cat Friendly Clinic program is an international certification system that sets standards for cat care at veterinary clinics. The Silver level requires a separate waiting area for cats away from dogs, Feliway pheromone diffusers in all areas, a designated Cat Advocate among the staff, cat-friendly handling techniques (scruff-free — we never lift a cat by the scruff), staff training in stress recognition, and a calm environment in hospitalization areas with hiding spots and visual barriers. The certificate is renewed every three years.'
  },
  'article.catstress.tips.title': {
    fi: 'Näin valmistaudut kissasi eläinlääkärikäyntiin',
    sv: 'Så förbereder du din katt för veterinärbesöket',
    en: 'How to Prepare Your Cat for the Vet Visit'
  },
  'article.catstress.tips.text': {
    fi: 'Jätä kuljetuslaatikko kotona pysyvästi esille avoimena — laita sisälle pehmeä peitto ja herkkuja, jotta kissa oppii yhdistämään laatikon turvalliseen paikkaan. Suihkuta Feliway-suihketta kuljetuslaatikon sisälle (8–10 suihkausta) vähintään 15 minuuttia ennen kissaa — alkoholin tulee haihtua ensin. Peitä kuljetuslaatikko pyyhkeellä autossa ja odotustilassa. Jos on mahdollista että kissalta otetaan verinäytteitä, pidä kissa ravinnotta 8–12 tuntia ennen käyntiä. Aseta kuljetuslaatikko klinikalla korotettuun paikkaan — ei lattialle. Klinikalla voitte ilmoittautumisen jälkeen odottaa vuoroanne kissojen omassa erillisessä odotustilassa. Tutkimushuoneessa anna kissan tulla ulos kantokopastaan vapaaehtoisesti tai pyydä meitä avaamaan laatikon yläosa — emme koskaan vedä kissaa ulos väkisin.',
    sv: 'Låt transportburen stå framme hemma permanent med öppen dörr — lägg i en mjuk filt och godsaker så att katten lär sig associera buren med en trygg plats. Spraya Feliway-spray inuti buren (8–10 sprayningar) minst 15 minuter innan katten placeras i — alkoholen måste avdunsta först. Täck buren med en handduk i bilen och i väntrummet. Om blodprov kan bli aktuellt, låt katten fasta 8–12 timmar före besöket. Ställ buren på en upphöjd yta på kliniken — inte på golvet. På vår klinik kan du be om att vänta i katternas egna väntrum. I undersökningsrummet, låt katten komma ut ur buren frivilligt eller be oss att öppna burens ovandel — vi drar aldrig ut katten med tvång.',
    en: 'Leave the carrier out at home permanently with the door open — place a soft blanket and treats inside so the cat learns to associate the carrier with a safe place. Spray Feliway spray inside the carrier (8–10 sprays) at least 15 minutes before placing the cat in — the alcohol must evaporate first. Cover the carrier with a towel in the car and in the waiting room. If blood tests may be needed, fast the cat for 8–12 hours before the visit. Place the carrier on a raised surface at the clinic — not on the floor. At our clinic, you can ask to wait in the cats\' own waiting area. In the examination room, let the cat come out of the carrier voluntarily or ask us to open the top of the carrier — we never pull a cat out by force.'
  },

  // Unerupted Teeth & Dentigerous Cyst Article
  'article.unerupted.tag': { fi: 'Hammashoito', sv: 'Tandvård', en: 'Dental' },
  'article.unerupted.title': {
    fi: 'Puhkeamattomat hampaat ja hammasaihekysta — piilevä vaara leukaluussa',
    sv: 'Icke-erupterade tänder och dentigena cystor — en dold fara i käkbenet',
    en: 'Unerupted Teeth and Dentigerous Cysts — A Hidden Danger in the Jawbone'
  },
  'article.unerupted.intro': {
    fi: 'Puhkeamaton hammas on hammas, joka ei ole noussut normaalisti suuonteloon vaan jäänyt leukaluun sisään. Tila on koirilla melko harvinainen — kliinisissä röntgentutkimuksissa noin 1–2 % koirista — mutta lyhytkuonoisilla (brakykefaalisilla) roduilla selvästi yleisempi. Puhkeamattoman hampaan ympärille voi kehittyä kysta, nestettä täynnä oleva rakenne, joka kasvaa hitaasti ja tuhoaa leukaluuta. Ilman hammasröntgenkuvausta tilanne jää havaitsematta, kunnes vahinko on jo merkittävä. Klinikallamme suoritamme hammasröntgenkuvaukset ja puhkeamattomien hampaiden kirurgiset poistot.',
    sv: 'En icke-erupterad tand är en tand som inte har kommit upp normalt i munhålan utan stannat kvar inuti käkbenet. Tillståndet är relativt ovanligt hos hundar — cirka 1–2 % i kliniska röntgenundersökningar — men klart vanligare hos brachycefala (trubbnosiga) raser. Runt en icke-erupterad tand kan en dentigena cysta utvecklas — en vätskefylld struktur som växer långsamt och förstör käkbenet. Utan tandröntgen förblir tillståndet oupptäckt tills skadan redan är betydande. På vår klinik utför vi tandröntgenundersökningar och kirurgiska extraktioner av icke-erupterade tänder.',
    en: 'An unerupted tooth is a tooth that has failed to emerge normally into the oral cavity and remains trapped inside the jawbone. The condition is relatively uncommon in dogs — about 1–2% in clinic radiographic studies — but markedly more frequent in brachycephalic (short-nosed) breeds. A dentigerous cyst can develop around an unerupted tooth — a fluid-filled structure that grows slowly and destroys the jawbone. Without dental X-rays, the condition goes undetected until significant damage has already occurred. At our clinic, we perform dental radiography and surgical extraction of unerupted teeth.'
  },
  'article.unerupted.cyst.title': {
    fi: 'Mikä on dentigeroottinen kysta?',
    sv: 'Vad är en dentigen cysta?',
    en: 'What Is a Dentigerous Cyst?'
  },
  'article.unerupted.cyst.text': {
    fi: 'Normaalissa hampaan kehityksessä hampaan kruunua ympäröivä kiillekalvo (ns. redusoitu kiille-epiteeli) hajoaa hampaan puhjetessa. Kun hammas ei puhkea, tämä epiteelikerros jää ehjäksi ja nesteen kertyessä sen ympärille muodostuu kysta. Kysta kasvaa hitaasti mutta väistämättä: neste aiheuttaa painetta, joka aktivoi leukaluun syöjäsolut (osteoklastit). Tutkimusten mukaan 29–50 % puhkeamattomista hampaista kehittää kystan.',
    sv: 'Under normal tandutveckling bryts emalj-hinnan (det s.k. reducerade emalj-epitelet) som omger tandkronan när tanden erupterar. När tanden inte erupterar förblir detta epitelskikt intakt och vätska samlas, vilket bildar en cysta. Cystan växer långsamt men oundvikligt: vätskan skapar tryck som aktiverar käkbenets nedbrytningsceller (osteoklaster). Studier visar att 29–50 % av icke-erupterade tänder utvecklar en dentigen cysta.',
    en: 'During normal tooth development, the enamel membrane (the reduced enamel epithelium) surrounding the tooth crown breaks down as the tooth erupts. When a tooth fails to erupt, this epithelial layer remains intact and fluid accumulates, forming a cyst. The cyst grows slowly but inevitably: the fluid creates pressure that activates the jawbone\'s resorption cells (osteoclasts). Studies show that 29–50% of unerupted teeth develop a dentigerous cyst.'
  },
  'article.unerupted.symptoms.title': {
    fi: 'Oireet — usein oireeton',
    sv: 'Symtom — ofta symtomfritt',
    en: 'Symptoms — Often Asymptomatic'
  },
  'article.unerupted.symptoms.text': {
    fi: 'Hammasaihekysta on usein täysin oireeton alkuvaiheessa — tämä tekee siitä erityisen salakavalan. Yleisin löydös on "puuttuva hammas" suun tarkastuksessa: hammas, jonka pitäisi olla paikallaan, mutta ei näy päällepäin. Muita merkkejä voivat olla leuan turvotus, viereisten hampaiden siirtyminen tai kallistuminen, ja pitkälle edenneissä tapauksissa fisteli eli märkäkäytävä. Pahimmassa tapauksessa kysta heikentää leukaluuta niin paljon, että syntyy patologinen murtuma — leuka murtuu normaalista kuormituksesta.',
    sv: 'En dentigen cysta är ofta helt symtomfri i början — detta gör den särskilt lömsk. Det vanligaste fyndet är en "saknad tand" vid munundersökningen: en tand som borde finnas på plats syns inte. Andra tecken kan vara svullnad i käken, förskjutning eller lutning av intilliggande tänder, och i avancerade fall en fistel (varutgång). I värsta fall försvagar cystan käkbenet så mycket att en patologisk fraktur uppstår — käken bryts av normal belastning.',
    en: 'A dentigerous cyst is often completely asymptomatic in the early stages — this makes it particularly insidious. The most common finding is a "missing tooth" on oral examination: a tooth that should be present is not visible. Other signs may include jaw swelling, displacement or tilting of adjacent teeth, and in advanced cases a fistula (draining tract). In the worst case, the cyst weakens the jawbone so much that a pathological fracture occurs — the jaw breaks under normal load.'
  },
  'article.unerupted.breeds.title': {
    fi: 'Riskirodut',
    sv: 'Riskraser',
    en: 'At-Risk Breeds'
  },
  'article.unerupted.breeds.text': {
    fi: 'Lyhytkuonoiset rodut (brakykefaaliset) ovat suurimmassa vaarassa, koska niiden lyhentynyt leuka ei tarjoa riittävästi tilaa kaikille hampaille. Erityisesti bokserit, englanninbulldogit, ranskanbulldogit, bostoninterrierit, mopsit ja shih tzut ovat suurentuneen riskin omaavia rotuja. Myös pienet rodut kuten maltankoira, yorkshirenterrieri, chihuahua, kääpiövillakoira ja mäyräkoira ovat riskissä. Kissoilla puhkeamattomat hampaat ja hammasaihekystat ovat harvinaisia, mutta mahdollisia — samat periaatteet pätevät.',
    sv: 'Brachycefala (trubbnosiga) raser löper störst risk eftersom deras förkortade käke inte erbjuder tillräckligt med utrymme för alla tänder. Särskilt boxer, engelsk bulldogg, fransk bulldogg, bostonterrier, mops och shih tzu är överrepresenterade. Även små raser som malteser, yorkshireterrier, chihuahua, dvärg- och toypudel samt tax löper risk. Hos katter är icke-erupterade tänder och dentigena cystor sällsynta men möjliga — samma principer gäller.',
    en: 'Brachycephalic (short-nosed) breeds are at greatest risk because their shortened jaw does not provide enough space for all teeth. Boxers, English Bulldogs, French Bulldogs, Boston Terriers, Pugs, and Shih Tzus are particularly overrepresented. Small breeds such as Maltese, Yorkshire Terriers, Chihuahuas, Miniature Poodles, and Dachshunds are also at risk. In cats, unerupted teeth and dentigerous cysts are rare but possible — the same principles apply.'
  },
  'article.unerupted.diagnosis.title': {
    fi: 'Diagnoosi — hammasröntgen on välttämätön',
    sv: 'Diagnos — tandröntgen är nödvändig',
    en: 'Diagnosis — Dental X-Rays Are Essential'
  },
  'article.unerupted.diagnosis.text': {
    fi: 'Puhkeamatonta hammasta ja hammasaihekystaa ei voi havaita paljaalla silmällä — ainoa tapa on hammasröntgen. Röntgenkuvassa näkyy selkeärajainen, pyöreä tai soikea alue (nestettä sisältävä onkalo) puhkeamattoman hampaan kruunun ympärillä. Röntgenkuva paljastaa myös luukadon laajuuden ja vaikutuksen viereisiin hampaisiin. Siksi suosittelemme täyden suun röntgenkuvausta jokaisen hammashoidon yhteydessä — tutkimukset osoittavat, että hammasröntgen paljastaa kliinisesti merkittäviä, silmämääräisesti näkymättömiä löydöksiä huomattavalla osalla potilaista (Verstraete ym. 1998).',
    sv: 'En icke-erupterad tand och dentigen cysta kan inte upptäckas med blotta ögat — det enda sättet är tandröntgen. På röntgenbilden syns ett välavgränsat, runt eller ovalt genomskinligt område (en vätskefylld hålighet) runt kronan på den icke-erupterade tanden. Röntgenbilden avslöjar också omfattningen av benförlust och påverkan på intilliggande tänder. Därför rekommenderar vi tandröntgen av hela munnen vid varje tandbehandling — studier visar att tandröntgen avslöjar kliniskt betydelsefulla fynd som inte syns med blotta ögat hos en betydande andel patienter (Verstraete m.fl. 1998).',
    en: 'An unerupted tooth and dentigerous cyst cannot be detected with the naked eye — the only way is dental X-rays. On the radiograph, a well-defined, round or oval radiolucent area (a fluid-filled cavity) appears around the crown of the unerupted tooth. The X-ray also reveals the extent of bone loss and the effect on adjacent teeth. This is why we recommend full-mouth radiographs with every dental procedure — studies show that dental X-rays reveal clinically important findings not visible on examination in a significant proportion of patients (Verstraete et al. 1998).'
  },
  'article.unerupted.treatment.title': {
    fi: 'Hoito — kirurginen poisto',
    sv: 'Behandling — kirurgisk extraktion',
    en: 'Treatment — Surgical Extraction'
  },
  'article.unerupted.treatment.text': {
    fi: 'Hoitona on puhkeamattoman hampaan ja kystaonkalon perusteellinen kirurginen poisto, jotta kaikki epiteelisolut saadaan poistettua. Toimenpiteessä nostetaan limakalvoläppä, avataan luussa ikkuna, poistetaan hammas ja kysta kokonaisuudessaan, ja suljetaan haava. Luuontelo täyttyy uudella luulla 2–6 kuukauden kuluessa. Hoitamattomana kysta jatkaa kasvuaan, tuhoaa luuta ja voi johtaa patologiseen murtumaan — kysta ei koskaan parane itsestään. Eläinklinikka Saarella suoritamme puhkeamattomien hampaiden kirurgiset poistot ja kystakaavinta on osa hammashoidon palvelujamme — varaa aika hammastutkimukseen, niin arvioimme tilanteen.',
    sv: 'Behandlingen är kirurgisk extraktion av den icke-erupterade tanden och noggrann utskrapning (kyrettage) av cystahålan för att avlägsna alla epitelceller. Vid ingreppet lyfts en mukoperiosteal lambå, ett fönster öppnas i benet, tanden och cystans hela vägg avlägsnas, och såret sluts. Benhålan fylls med nytt ben inom 2–6 månader. Obehandlad fortsätter cystan att växa, förstöra ben och kan leda till patologisk fraktur — en cysta läker aldrig av sig själv. På Djurklinik Saari utför vi kirurgiska extraktioner av icke-erupterade tänder och cystakirurgi är en del av våra tandvårdstjänster — boka tid för en tandundersökning så bedömer vi situationen.',
    en: 'Treatment involves surgical extraction of the unerupted tooth and thorough curettage of the cyst cavity to remove all epithelial cells. The procedure involves raising a mucoperiosteal flap, opening a window in the bone, removing the tooth and the entire cyst wall, and closing the wound. The bone cavity fills with new bone within 2–6 months. Left untreated, the cyst continues to grow, destroys bone, and can lead to pathological fracture — a cyst never resolves on its own. At Eläinklinikka Saari, we perform surgical extractions of unerupted teeth and cyst surgery is part of our dental services — book an appointment for a dental examination and we will assess the situation.'
  },
  'article.unerupted.prognosis.title': {
    fi: 'Ennuste',
    sv: 'Prognos',
    en: 'Prognosis'
  },
  'article.unerupted.prognosis.text': {
    fi: 'Varhain havaitun ja täydellisesti poistetun hammasaihekystan ennuste on erinomainen. Uusiutumisriski on pieni, kun kystan seinämä on poistettu kokonaan. Ennuste on heikompi, jos kysta on kasvanut suureksi, luuta on tuhoutunut laajasti tai leuka on jo murtunut. Siksi varhainen diagnoosi on ratkaiseva — hammasröntgen on paras keino löytää puhkeamattomat hampaat ennen kuin kysta ehtii muodostua.',
    sv: 'Prognosen för en tidigt upptäckt och fullständigt avlägsnad dentigen cysta är utmärkt. Risken för återfall är liten när cystans vägg har avlägsnats helt. Prognosen är sämre om cystan har vuxit sig stor, betydande benförlust har skett eller käken redan har frakturerats. Därför är tidig diagnos avgörande — tandröntgen är det bästa sättet att hitta icke-erupterade tänder innan en cysta hinner bildas.',
    en: 'The prognosis for an early-detected and completely removed dentigerous cyst is excellent. The risk of recurrence is low when the cyst wall has been entirely removed. The prognosis is worse if the cyst has grown large, extensive bone has been destroyed, or the jaw has already fractured. This is why early diagnosis is crucial — dental X-rays are the best way to find unerupted teeth before a cyst has time to form.'
  },

  // Article 19: Gastroscopy
  'article.gastroscopy.tag': {
    fi: 'Tähystys',
    sv: 'Endoskopi',
    en: 'Endoscopy'
  },
  'article.gastroscopy.title': {
    fi: 'Gastroskopia — vatsalaukun tähystys ja vierasesineiden poisto ilman leikkausta',
    sv: 'Gastroskopi — magsäcksundersökning och avlägsnande av främmande föremål utan kirurgi',
    en: 'Gastroscopy — Stomach Examination and Foreign Body Removal Without Surgery'
  },
  'article.gastroscopy.intro': {
    fi: 'Gastroskopia on tähystystutkimus, jossa taipuisa kameraendoskooppi viedään suun kautta ruokatorveen, vatsalaukkuun ja pohjukaissuoleen. Tutkimus mahdollistaa limakalvojen tarkastelun reaaliajassa monitorilta, koepalojen oton ja vierasesineiden poiston — kaikki ilman kirurgista viiltoa. Gastroskopia on yksi yleisimmistä tähystystoimenpiteistä eläinlääketieteessä, ja se on erityisen arvokas työkalu kroonisten vatsaoireiden selvittämisessä ja vierasesineiden poistossa.',
    sv: 'Gastroskopi är en endoskopisk undersökning där ett flexibelt kameraendoskop förs genom munnen till matstrupen, magsäcken och tolvfingertarmen. Undersökningen möjliggör granskning av slemhinnorna i realtid på en monitor, provtagning av vävnadsprover och avlägsnande av främmande föremål — allt utan kirurgiskt snitt. Gastroskopi är en av de vanligaste endoskopiska procedurerna inom veterinärmedicin och är ett särskilt värdefullt verktyg för att utreda kroniska magsymtom och avlägsna främmande föremål.',
    en: 'Gastroscopy is an endoscopic procedure in which a flexible camera endoscope is passed through the mouth into the esophagus, stomach, and duodenum. The examination allows real-time viewing of the mucosal lining on a monitor, tissue biopsy collection, and foreign body removal — all without a surgical incision. Gastroscopy is one of the most common endoscopic procedures in veterinary medicine and is an especially valuable tool for investigating chronic gastrointestinal symptoms and removing foreign bodies.'
  },
  'article.gastroscopy.foreign.title': {
    fi: 'Vierasesineiden poisto — leikkauksen vaihtoehto',
    sv: 'Avlägsnande av främmande föremål — ett alternativ till kirurgi',
    en: 'Foreign Body Removal — An Alternative to Surgery'
  },
  'article.gastroscopy.foreign.text': {
    fi: 'Vierasesineen poisto on gastroskopian yleisimpiä käyttöaiheita. Tutkimusten mukaan endoskooppinen poisto onnistuu 83–88 % tapauksista. Koirilla yleisimmät vierasesineet ovat sukat, muovinpalat, kankaat, luut ja lelut. Kissoilla tyypillisimpiä ovat neulat, langat, kengännauhat ja kumilenkit. Endoskooppinen poisto on huomattavasti vähemmän invasiivinen kuin leikkaus: komplikaatioriski on merkittävästi pienempi, toipuminen nopeampaa, ja lemmikki pääsee kotiin samana päivänä. Vierasesineen nielemisen jälkeen nopea hoitoon hakeutuminen on tärkeää — yli 24 tuntia vierasesineen syömisen jälkeen hoito on haastavampaa ja ennuste heikkenee.',
    sv: 'Avlägsnande av främmande föremål är en av de vanligaste indikationerna för gastroskopi. Studier visar att endoskopiskt avlägsnande lyckas i 83–88 % av fallen. Hos hundar är de vanligaste främmande föremålen strumpor, plastbitar, tyg, ben och leksaker. Hos katter är nålar, trådar, skosnören och gummiband vanligast. Endoskopisk avlägsnande är betydligt mindre invasivt än kirurgi: komplikationsrisken är markant lägre, återhämtningen snabbare, och husdjuret kan ofta gå hem samma dag. Efter att ett främmande föremål svalts är det viktigt att snabbt söka vård — kräkningar i mer än 24 timmar försämrar prognosen avsevärt.',
    en: 'Foreign body removal is one of the most common indications for gastroscopy. Studies show that endoscopic removal succeeds in 83–88% of cases. In dogs, the most common foreign bodies are socks, plastic fragments, cloth, bones, and toys. In cats, needles, threads, shoelaces, and rubber bands are most typical. Endoscopic removal is significantly less invasive than surgery: the complication risk is markedly lower, recovery is faster, and the pet can often go home the same day. After swallowing a foreign body, seeking prompt veterinary care is important — vomiting for more than 24 hours significantly worsens the prognosis.'
  },
  'article.gastroscopy.diagnosis.title': {
    fi: 'Kroonisten vatsaoireiden selvittäminen',
    sv: 'Utredning av kroniska magsymtom',
    en: 'Investigating Chronic Gastrointestinal Symptoms'
  },
  'article.gastroscopy.diagnosis.text': {
    fi: 'Gastroskopia on välttämätön työkalu kroonisen oksentelun, ripulin, laihtumisen ja ruokahaluttomuuden syyn selvittämisessä. Tähystyksen aikana otetaan koepaloja limakalvoista. Koepalat otetaan aina, vaikka limakalvo näyttäisi normaalilta — monissa merkittävissä sairauksissa limakalvo voi näyttää silmämääräisesti terveeltä. Gastroskopia paljastaa myös vatsalaukun kasvaimet, polyypit, haavaumat ja tulehdusmuutokset.',
    sv: 'Gastroskopi är ett nödvändigt verktyg för att utreda orsaken till kroniska kräkningar, diarré, viktminskning och aptitlöshet. Under undersökningen tas vävnadsprover (biopsier) från slemhinnan. Biopsier tas alltid, även om slemhinnan ser normal ut — vid många betydande sjukdomar kan slemhinnan se visuellt frisk ut. Gastroskopi avslöjar också tumörer i magsäcken, polyper, sår och inflammatoriska förändringar.',
    en: 'Gastroscopy is an essential tool for investigating the cause of chronic vomiting, diarrhea, weight loss, and loss of appetite. During the examination, tissue biopsies are taken from the mucosa. Biopsies are always taken even when the mucosa appears normal — in many significant diseases, the mucosa can look visually healthy. Gastroscopy also reveals stomach tumors, polyps, ulcers, and inflammatory changes.'
  },
  'article.gastroscopy.procedure.title': {
    fi: 'Toimenpide',
    sv: 'Proceduren',
    en: 'The Procedure'
  },
  'article.gastroscopy.procedure.text': {
    fi: 'Gastroskopia tehdään yleisanestesiassa. Lemmikki pidetään paastolla 12–18 tuntia ennen toimenpidettä. Taipuisa endoskooppi viedään suun kautta ruokatorveen ja edelleen vatsalaukkuun ja pohjukaissuoleen. Kamera välittää teräväpiirtokuvaa monitorille reaaliajassa. Endoskoopin työkanavan kautta voidaan käyttää biopsiapihtejä koepalojen ottoon, tarttumapihtejä vierasesineiden poistoon sekä huuhtelukatetria. Diagnostinen gastroskopia kestää tyypillisesti 15–30 minuuttia, vierasesineen poisto keskimäärin noin tunnin.',
    sv: 'Gastroskopi utförs under generell anestesi. Husdjuret fastar 12–18 timmar före ingreppet. Ett flexibelt endoskop förs genom munnen till matstrupen och vidare till magsäcken och tolvfingertarmen. Kameran överför högupplöst bild till en monitor i realtid. Genom endoskopets arbetskanal kan man använda biopsitänger för provtagning, greptänger för avlägsnande av främmande föremål samt spolkateter. Diagnostisk gastroskopi tar typiskt 15–30 minuter, avlägsnande av främmande föremål i genomsnitt cirka en timme.',
    en: 'Gastroscopy is performed under general anesthesia. The pet fasts for 12–18 hours before the procedure. A flexible endoscope is passed through the mouth into the esophagus and onward to the stomach and duodenum. The camera transmits high-definition images to a monitor in real time. Through the endoscope\'s working channel, biopsy forceps can be used for tissue sampling, grasping forceps for foreign body removal, and flushing catheters. Diagnostic gastroscopy typically takes 15–30 minutes, foreign body removal approximately one hour on average.'
  },
  'article.gastroscopy.advantages.title': {
    fi: 'Edut verrattuna leikkaukseen',
    sv: 'Fördelar jämfört med kirurgi',
    en: 'Advantages Over Surgery'
  },
  'article.gastroscopy.advantages.text': {
    fi: 'Gastroskopia on minimaalisesti invasiivinen — ei viiltoa, ei tikkejä vatsalaukkuun tai suoleen. Lemmikki toipuu nopeammin, kipua on vähemmän ja infektioriski on pienempi. Useimmat potilaat pääsevät kotiin samana päivänä ja voivat syödä jo muutaman tunnin kuluttua. Komplikaatioriski on erittäin matala: vatsalaukun perforaatioriski on vain 0,1 % koirilla ja 1,6 % kissoilla. Gastroskopia on sekä diagnostinen että hoidollinen — samassa toimenpiteessä voidaan tutkia, ottaa koepaloja ja poistaa vierasesine.',
    sv: 'Gastroskopi är minimalt invasivt — inget snitt, inga suturer i magsäck eller tarm. Husdjuret återhämtar sig snabbare, smärtan är mindre och infektionsrisken lägre. De flesta patienter kan gå hem samma dag och kan äta redan efter några timmar. Komplikationsrisken är mycket låg: risken för magperforation är bara 0,1 % hos hundar och 1,6 % hos katter. Gastroskopi är både diagnostiskt och terapeutiskt — i samma ingrepp kan man undersöka, ta vävnadsprover och avlägsna främmande föremål.',
    en: 'Gastroscopy is minimally invasive — no incision, no sutures to the stomach or intestine. The pet recovers faster, there is less pain, and the infection risk is lower. Most patients go home the same day and can eat within a few hours. The complication risk is very low: the perforation rate is only 0.1% in dogs and 1.6% in cats. Gastroscopy is both diagnostic and therapeutic — in the same procedure, the doctor can examine, take biopsies, and remove foreign bodies.'
  },
  'article.gastroscopy.contact.title': {
    fi: 'Milloin hakeutua tutkimukseen?',
    sv: 'När ska man söka undersökning?',
    en: 'When to Seek Examination?'
  },
  'article.gastroscopy.contact.text': {
    fi: 'Ota yhteyttä, jos lemmikkisi oksentelee toistuvasti, laihtuu selittämättömästi, välttelee ruokaa, ulosteessa on verta tai limaa, tai epäilet vierasesineen nielemistä. Eläinklinikka Saarella suoritamme gastroskopiatutkimukset ja vierasesineiden endoskooppiset poistot — varaa aika tutkimukseen.',
    sv: 'Kontakta oss om ditt husdjur kräks upprepade gånger, har gått ner i vikt utan förklaring, undviker mat, har blod eller slem i avföringen, eller om du misstänker att det har svalt ett främmande föremål. På Djurklinik Saari utför vi gastroskopiundersökningar och endoskopiska avlägsnanden av främmande föremål — boka tid för undersökning.',
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
    fi: 'Hammasresorptio on sairaus, jossa erikoistuneet solut (odontolastit) tuhoavat hampaan kovakudosta — kiillettä, dentiiniä ja hammassementtiä. Sairaus koskettaa sekä kissoja että koiria ja on paljon yleisempi kuin moni omistaja uskoo. Kissoilla esiintyvyys on 20–67 %, ja yli 5-vuotiailla jopa 75 %. Suomalaisessa 8 115 kissan tutkimuksessa hammasresorptiota todettiin noin 21 %:lla hammastutkituista kissoista, ja tietyillä roduilla — kuten eurooppalaisella lyhytkarvalla, ragdollilla ja cornish rexillä — riski oli kohonnut. Koirilla esiintyvyys on vastaavasti merkittävä: täyden suun röntgenkuvauksessa jopa 54 % koirista kärsi hammasresorptiosta, ja riski kasvaa erityisesti 9–11 vuoden iässä. Molemmilla lajeilla yleisimmin vaurioituvat hampaat ovat välihampaat (premolaarit). Sairaus on erityisen salakavala, koska sekä kissat että koirat peittävät suukipua — moni lemmikki syö ja käyttäytyy "normaalisti" vaikka kärsii merkittävästä kroonisesta kivusta.',
    sv: 'Tandresorption är en sjukdom där specialiserade celler (odontoklaster) bryter ner tandens hårda vävnader — emalj, dentin och tandcement. Sjukdomen drabbar både katter och hundar och är mycket vanligare än många ägare tror. Hos katter är prevalensen 20–67 %, och bland katter över 5 år upp till 75 %. I en finländsk studie med 8 115 katter konstaterades tandresorption hos cirka 21 % av de tandundersökta katterna, och vissa raser — såsom europeisk korthår, ragdoll och cornish rex — hade förhöjd risk. Hos hundar är prevalensen likaså betydande: vid fullständig tandröntgen hade upp till 54 % av hundarna tandresorption, och risken ökar särskilt vid 9–11 års ålder. Hos båda arterna är premolarerna (kindtänderna) de mest drabbade tänderna. Sjukdomen är särskilt lömsk eftersom både katter och hundar döljer munsmärta — många husdjur äter och beter sig "normalt" trots betydande kronisk smärta.',
    en: 'Tooth resorption is a disease in which specialized cells (odontoclasts) destroy the hard tissues of the tooth — enamel, dentin, and cementum. The disease affects both cats and dogs and is far more common than many owners realize. In cats, the prevalence is 20–67%, rising to as high as 75% in cats over 5 years old. In a Finnish study of 8,115 cats, tooth resorption was found in about 21% of the dentally examined cats, with certain breeds — such as the European Shorthair, Ragdoll and Cornish Rex — at increased risk. In dogs, the prevalence is similarly significant: full-mouth radiographs revealed tooth resorption in up to 54% of dogs, with the risk increasing particularly at 9–11 years of age. In both species, the premolars are the most commonly affected teeth. The disease is particularly insidious because both cats and dogs hide oral pain — many pets eat and behave "normally" despite significant chronic pain.'
  },
  'article.resorption.types.title': {
    fi: 'Tyypit — miksi röntgen ratkaisee hoidon',
    sv: 'Typer — varför röntgen avgör behandlingen',
    en: 'Types — Why Radiographs Determine Treatment'
  },
  'article.resorption.types.text': {
    fi: 'Hammasresorptio jaetaan kolmeen tyyppiin, ja erottelu vaatii aina hammasröntgenkuvan. Tyypissä 1 hammas tuhoutuu paikallisesti ja tulehduskudos korvaa menetetyn hampaan — röntgenkuvassa näkyy tummia alueita, mutta hampaan juuret ja parodontaaliligamentti ovat edelleen tunnistettavissa. Tyypissä 2 hampaan juuri korvautuu luulla ja sulautuu leukaluuhun — röntgenkuvassa juuret näkyvät epäselvästi tai katoavat kokonaan ympäröivään luuhun. Tyypissä 3 samassa hampaassa esiintyy molemmat edellämainituista. Tyyppi 2 on yleisempi, ja syytä pidetään tuntemattomana. Tyyppi 1 liittyy usein paikalliseen tulehdukseen.',
    sv: 'Tandresorption delas in i tre typer, och skillnaden kräver alltid tandröntgen. Vid typ 1 förstörs tanden lokalt och inflammatorisk granulationsvävnad ersätter den förlorade tanden — på röntgen syns mörka områden, men tandens rötter och parodontalligament är fortfarande identifierbara. Vid typ 2 ersätts tandroten med ben och smälter samman med käkbenet (ankylos) — på röntgen syns rötterna som "spöken" eller försvinner helt in i omgivande ben. Vid typ 3 förekommer båda typerna i samma tand. Typ 2 är vanligare och orsaken anses okänd. Typ 1 är ofta kopplad till lokal inflammation.',
    en: 'Tooth resorption is divided into three types, and distinguishing between them always requires dental radiographs. In Type 1, the tooth is destroyed locally and inflammatory granulation tissue replaces the lost tooth — radiographs show dark areas, but the roots and periodontal ligament are still identifiable. In Type 2, the root is replaced by bone and fuses with the jawbone (ankylosis) — on radiographs, the roots appear as "ghosts" or disappear entirely into the surrounding bone. Type 3 shows features of both in the same tooth. Type 2 is more common and its cause is considered unknown. Type 1 is often associated with local inflammation.'
  },
  'article.resorption.symptoms.title': {
    fi: 'Oireet — piilevä kipu',
    sv: 'Symtom — dold smärta',
    en: 'Symptoms — Hidden Pain'
  },
  'article.resorption.symptoms.text': {
    fi: 'Hammasresorptio on usein huomaamaton sairaus — eläimet ovat evoluution myötä oppineet peittämään suukipua, koska luonnossa kivun näyttäminen tekee eläimestä saaliin. Omistaja voi huomata hienovaraisia merkkejä: ruoan putoilu suusta, pään kallistaminen syödessä, pureskelu vain toisella puolella, pureskelematta nieleminen, lisääntynyt kuolaaminen, leuan vapina tai naksuminen, kovien lelujen tai luiden välttely, ärtyisyys, vetäytyminen tai huonontunut turkki. Moni lemmikki jatkaa syömistä kivusta huolimatta. Kliinisessä tutkimuksessa voidaan nähdä vaaleanpunaisia pisteitä ikenessä (tulehduskudos kasvaa hampaan vaurioon), puuttuvia hampaita tai paikallista ientulehdusta yksittäisen hampaan ympärillä.',
    sv: 'Tandresorption är ofta en "tyst sjukdom" — djur har genom evolutionen lärt sig att dölja munsmärta, eftersom det i naturen gör djuret till ett byte. Ägaren kan märka subtila tecken: mat som faller ur munnen, huvudlutning vid ätande, tuggande bara på ena sidan, sväljning utan att tugga, ökad dregling, käkskakningar eller knäppanden (muskelkramper när lesionen berörs), undvikande av hårda leksaker eller ben, irritabilitet, tillbakadragenhet eller försämrad päls. Många husdjur fortsätter att äta trots smärta. Vid klinisk undersökning kan man se rosa fläckar i tandköttet (inflammatorisk vävnad som växer in i tandskadan), saknade tänder eller lokal tandköttsinflammation runt enskilda tänder.',
    en: 'Tooth resorption is often a "silent disease" — animals have evolved to hide oral pain, because in nature showing pain makes an animal prey. Owners may notice subtle signs: dropping food from the mouth, tilting the head while eating, chewing on only one side, swallowing without chewing, increased drooling, jaw trembling or chattering (muscle spasms when the lesion is touched), avoiding hard toys or bones, irritability, withdrawal, or a deteriorating coat. Many pets continue eating despite pain. During clinical examination, pink spots on the gums may be seen (inflammatory tissue growing into the tooth defect), missing teeth, or localized gingivitis around individual teeth.'
  },
  'article.resorption.diagnosis.title': {
    fi: 'Diagnoosi — hammasröntgen löytää 2,4-kertaisesti',
    sv: 'Diagnos — tandröntgen hittar 2,4 gånger fler',
    en: 'Diagnosis — Dental Radiographs Find 2.4 Times More'
  },
  'article.resorption.diagnosis.text': {
    fi: 'Hammasröntgen on ainoa tapa todeta hammasresorptio luotettavasti. Tutkimusten mukaan röntgen löytää 2,4 kertaa enemmän vaurioituneita hampaita kuin pelkkä kliininen tutkimus. Noin 60 % hampaan rakenteesta on ikenen alla näkymättömissä. Röntgenkuva paljastaa myös vaurion tyypin (1, 2 vai 3), mikä suoraan määrittää hoidon. Suosittelemme täyden suun hammasröntgenkuvausta yleisanestesiassa kaikille potilaille — erityisesti iäkkäämmille lemmikeille. "Puuttuva hammas" suun tarkastuksessa ei aina tarkoita että kyseistä hammasta ei olisi ollenkaan — hammas on voinut resorboitua ikenen alle.',
    sv: 'Tandröntgen är det enda sättet att tillförlitligt diagnostisera tandresorption. Studier visar att röntgen hittar 2,4 gånger fler skadade tänder än enbart klinisk undersökning. Cirka 60 % av tandens struktur ligger under tandköttet och är osynlig. Röntgenbilden avslöjar också skadans typ (1, 2 eller 3), vilket direkt bestämmer behandlingen. Vi rekommenderar fullständig tandröntgen under generell anestesi för alla patienter — särskilt äldre djur. En "saknad tand" vid munundersökningen betyder inte alltid att den tappats — tanden kan ha resorberats under tandköttet.',
    en: 'Dental radiographs are the only way to reliably diagnose tooth resorption. Studies show that radiographs detect 2.4 times more affected teeth than clinical examination alone. About 60% of tooth structure lies below the gum line and is invisible. Radiographs also reveal the lesion type (1, 2, or 3), which directly determines treatment. We recommend full-mouth dental radiographs under general anesthesia for all patients — especially older animals. A "missing tooth" during oral examination does not always mean it was lost — the tooth may have resorbed beneath the gum.'
  },
  'article.resorption.treatment.title': {
    fi: 'Hoito — tyyppi määrittää menetelmän',
    sv: 'Behandling — typen avgör metoden',
    en: 'Treatment — Type Determines the Method'
  },
  'article.resorption.treatment.text': {
    fi: 'Tyypin 1 hoito on kirurginen poisto — sekä kruunu että kaikki juuret poistetaan kokonaan, koska parodontaaliligamentti on ehjä ja juurissa voi olla tulehduskudosta. Tyypin 2 hoito on kruunun amputaatio — koska juuret ovat korvautumassa luulla, niitä ei tarvitse eikä tule yrittää poistaa (ankyloituneen juuren poistoyritys voi johtaa leukaluun murtumaan). Tyypin 3 hoito on sama kuin tyypin 1 — täydellinen poisto. Paikkausta tai fluorihoitoa ei suositella — tutkimuksissa 72 % paikatuista hampaista vaurioitui hoidosta huolimatta. Hammasresorptio ei koskaan parane itsestään. Eläinklinikka Saarella suoritamme hammasröntgenkuvaukset ja hampaiden kirurgiset poistot — varaa aika hammastutkimukseen.',
    sv: 'Behandlingen för typ 1 är kirurgisk extraktion — både kronan och alla rötter avlägsnas helt, eftersom parodontalligamentet är intakt och rötterna kan innehålla inflammatorisk vävnad. Behandlingen för typ 2 är kronamputering — eftersom rötterna håller på att ersättas av ben behöver de inte och ska inte försöka avlägsnas (försök att extrahera en ankyloserad rot kan leda till käkfraktur). Typ 3 behandlas som typ 1 — fullständig extraktion. Lagning eller fluorbehandling rekommenderas inte — i studier fortskred 72 % av lagade tänder. Tandresorption läker aldrig av sig själv. På Djurklinik Saari utför vi tandröntgen och kirurgiska tandextraktioner — boka tid för en tandundersökning.',
    en: 'Type 1 treatment is surgical extraction — both the crown and all roots are completely removed, because the periodontal ligament is intact and the roots may contain inflammatory tissue. Type 2 treatment is crown amputation — since the roots are being replaced by bone, they do not need to be and should not be attempted to be removed (attempting to extract an ankylosed root can lead to jaw fracture). Type 3 is treated the same as Type 1 — complete extraction. Fillings or fluoride treatment are not recommended — in studies, 72% of filled teeth progressed. Tooth resorption never heals on its own. At Eläinklinikka Saari, we perform dental radiographs and surgical tooth extractions — book an appointment for a dental examination.'
  },
  'article.resorption.after.title': {
    fi: 'Hoidon jälkeen — dramaattinen muutos',
    sv: 'Efter behandling — en dramatisk förändring',
    en: 'After Treatment — a Dramatic Change'
  },
  'article.resorption.after.text': {
    fi: 'Omistajat raportoivat usein hämmästyttävästä muutoksesta 24–48 tunnin kuluessa poistosta: lemmikki on energisempi, syö paremmin, on sosiaalisempi ja iloisempi. Tämä muutos itsessään todistaa, kuinka paljon kipua eläimellä on ollut vaikka ei sitä ehkä silloin näyttänytkään. Ennaltaehkäisyä ei tunneta, koska sairauden syy on edelleen tuntematon — paras suoja on säännöllinen hammastutkimus yleisanestesiassa, jotta vauriot löydetään varhain ja hoito voidaan aloittaa ajoissa.',
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
    fi: 'Koirien perusrokotuksena annetaan <strong>DHPPi-rokote</strong>, joka suojaa neljältä taudilta: <strong>penikkataudilta</strong> (D), <strong>tarttuvalta maksatulehdukselta</strong> (H), <strong>parvovirukselta</strong> (P) ja <strong>parainfluenssalta</strong> (Pi). Lisäksi <strong>rabies</strong>rokote kuuluu perusrokotuksiin — sitä suositellaan kaikille koirille ja on lakisääteinen metsästys- ja virkakoirille. Suosittelemme myös <strong>kennelyskärokotusta</strong> kaikille koirille kerran vuodessa. Leptospiroosirokotus suositellaan vain endeemisille alueille matkustaville — Suomi ei ole endeeminen alue.',
    sv: 'Grundvaccinationen för hundar är <strong>DHPPi-vaccinet</strong>, som skyddar mot fyra sjukdomar: <strong>valpsjuka</strong> (D), <strong>smittsam leverinflammation</strong> (H), <strong>parvovirus</strong> (P) och <strong>parainfluensa</strong> (Pi). Dessutom ingår <strong>rabies</strong> i grundvaccinationerna — det rekommenderas för alla hundar och är lagstadgat för jakthundar och tjänstehundar. Vi rekommenderar också <strong>kennelhostavaccination</strong> (Bordetella) för alla hundar en gång per år. Leptospirosvaccination rekommenderas bara för hundar som reser till endemiska områden — Finland är inte ett endemiskt område.',
    en: 'The core vaccination for dogs is the <strong>DHPPi vaccine</strong>, which protects against four diseases: <strong>canine distemper</strong> (D), <strong>infectious hepatitis</strong> (H), <strong>parvovirus</strong> (P), and <strong>parainfluenza</strong> (Pi). Additionally, <strong>rabies</strong> is part of the core vaccinations — it is recommended for all dogs and legally required for hunting and service dogs. We also recommend <strong>kennel cough vaccination</strong> (Bordetella) for all dogs once a year. Leptospirosis vaccination is recommended only for dogs travelling to endemic areas — Finland is not an endemic area.'
  },
  'article.vaccination.cats.title': {
    fi: 'Kissojen perusrokotteet',
    sv: 'Grundvacciner för katter',
    en: 'Core Vaccines for Cats'
  },
  'article.vaccination.cats.text': {
    fi: 'Kaikille kissoille suositellaan kolmoisrokotusta (RCP): <strong>kissaruttoa</strong> (FPV), <strong>kalikivirusta</strong> (FCV) ja <strong>herpesvirusta</strong> (FHV-1) vastaan. Hengitystievirusta rokotus ei estä kokonaan, mutta lieventää oireita merkittävästi. Rabiesrokotusta suositellaan ulkokissoille ja on pakollinen matkustaville kissoille. <strong>Kissaleukemia</strong> (FeLV) ei kuulu Suomen rutiinirokotuksiin, sillä FeLV:n esiintyvyys Suomessa on lähes nolla — sitä suositellaan vain FeLV-positiivisen kissan kanssa asuville.',
    sv: 'Alla katter rekommenderas trippelvaccination (RCP): mot <strong>kattpest</strong> (FPV), <strong>calicivirus</strong> (FCV) och <strong>herpesvirus</strong> (FHV-1). Vaccin mot luftvägsinfektioner förhindrar inte smittan helt, men mildrar symtomen avsevärt. Rabies rekommenderas för utekatter och är obligatoriskt för katter som reser. <strong>Kattleukemi</strong> (FeLV) ingår inte i Finlands rutinvaccinationer, eftersom förekomsten av FeLV i Finland är nästan noll — det rekommenderas bara för katter som bor med en FeLV-positiv katt.',
    en: 'All cats are recommended the triple vaccination (RCP): against <strong>feline panleukopenia</strong> (FPV), <strong>calicivirus</strong> (FCV), and <strong>herpesvirus</strong> (FHV-1). Respiratory virus vaccination does not completely prevent infection, but significantly reduces symptoms. Rabies is recommended for outdoor cats and is mandatory for cats travelling abroad. <strong>Feline leukemia</strong> (FeLV) is not part of routine vaccination in Finland, as FeLV prevalence in Finland is nearly zero — it is recommended only for cats living with a FeLV-positive cat.'
  },
  'article.vaccination.schedule.title': {
    fi: 'Pentujen ja kissanpentujen rokotusohjelma',
    sv: 'Vaccinationsprogram för valpar och kattungar',
    en: 'Vaccination Schedule for Puppies and Kittens'
  },
  'article.vaccination.schedule.text': {
    fi: '<strong>Koiranpennut:</strong> Ensimmäinen DHPPi-rokotus 12 viikon iässä, toinen 16 viikon iässä, rabiesrokotus 16 viikon iässä. Tehosterokotukset vuoden kuluttua toisesta rokotuksesta. Aikuisilla koirilla DHPPi ja rabies 3 vuoden välein, kennelyskä kerran vuodessa.<br><br><strong>Kissanpennut:</strong> Ensimmäinen RCP-rokotus 12 viikon iässä, toinen 16 viikon iässä. Tehosterokotus vuoden kuluttua toisesta rokotuksesta. Aikuisilla kissoilla RCP 3 vuoden välein.',
    sv: '<strong>Valpar:</strong> Första DHPPi-vaccination vid 12 veckors ålder, andra vid 16 veckor, rabies vid 16 veckor. Boostervaccination ett år efter den andra vaccinationen. Vuxna hundar: DHPPi och rabies vart 3:e år, kennelhosta en gång per år.<br><br><strong>Kattungar:</strong> Första RCP-vaccination vid 12 veckors ålder, andra vid 16 veckor. Boostervaccination ett år efter den andra vaccinationen. Vuxna katter: RCP vart 3:e år.',
    en: '<strong>Puppies:</strong> First DHPPi vaccination at 12 weeks, second at 16 weeks, rabies at 16 weeks. Booster one year after the second vaccination. Adult dogs: DHPPi and rabies every 3 years, kennel cough once a year.<br><br><strong>Kittens:</strong> First RCP vaccination at 12 weeks, second at 16 weeks. Booster one year after the second vaccination. Adult cats: RCP every 3 years.'
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
    fi: 'EU:n alueella matkustamiseen vaaditaan <strong>mikrosiru</strong> (ennen rabiesrokotusta), voimassa oleva <strong>rabiesrokotus</strong> (vähintään 21 päivää ennen matkaa) ja <strong>EU-lemmikkipassi</strong>. Koirilta vaaditaan lisäksi <strong>ekinokokkoosilääkitys</strong> 1–5 päivää ennen Suomeen paluuta. Vaihtoehtoisesti voidaan käyttää 28 päivän sääntöä: kaksi hoitoa ennen matkaa (hoitojen välillä min 24h ja max 28vrk) ja kolmas Suomeen saapumisen jälkeen, joka päättää 28vrk:n lääkityssyklin. Riskimaista (esim. Venäjä, Turkki) saapuvilta vaaditaan rabiesvasta-ainepitoisuustesti EU-hyväksytyssä laboratoriossa. Varaa aika rokotuksille ja matkustusasiakirjoille — hoidamme EU-lemmikkipassit klinikallamme.',
    sv: 'För resor inom EU krävs <strong>mikrochip</strong> (före rabiesvaccination), giltig <strong>rabiesvaccination</strong> (minst 21 dagar före resan) och <strong>EU-sällskapsdjurspass</strong>. För hundar krävs dessutom <strong>ekinokockbehandling</strong> 1–5 dagar före återkomst till Finland. Alternativt kan 28-dagarsregeln användas: två behandlingar med högst 28 dagars mellanrum före resan och en tredje efter ankomst till Finland. Från högriskländer (t.ex. Ryssland, Turkiet) krävs ett rabiesantikroppstest vid ett EU-godkänt laboratorium. Boka tid för vaccinationer och resedokument — vi utfärdar EU-sällskapsdjurspass på vår klinik.',
    en: 'For travel within the EU, you need a <strong>microchip</strong> (before rabies vaccination), a valid <strong>rabies vaccination</strong> (at least 21 days before travel), and an <strong>EU pet passport</strong>. Dogs additionally require <strong>echinococcus treatment</strong> 1–5 days before returning to Finland. Alternatively, the 28-day rule can be used: two treatments no more than 28 days apart before travel and a third after arrival in Finland. Pets arriving from high-risk countries (e.g., Russia, Turkey) require a rabies antibody titer test at an EU-approved laboratory. Book an appointment for vaccinations and travel documents — we issue EU pet passports at our clinic.'
  },

  // --- Article 27: Deworming (madotus) — added 28-07-2026, FI/SV native-panel wording ---
  "article.deworming.title": {
    fi: "Koiran ja kissan madotus – kuinka usein pennut, aikuiset ja matkustavat lemmikit madotetaan?",
    sv: "Avmaskning av hund och katt – hur ofta? Valpar, kattungar, vuxna och resor",
    en: "How often should a dog or cat be dewormed? Puppies, kittens, adults and travel"
  },
  "article.deworming.intro": {
    fi: "Suomessa koiraa tai kissaa ei enää madoteta ”varmuuden vuoksi” useita kertoja vuodessa. Nykyaikainen sisäloishäätö perustuu riskinarviointiin: koiran- ja kissanpennut sekä metsästävät, vapaana kulkevat tai matkustavat eläimet madotetaan ohjelman mukaan, kun taas terve, vähäriskinen aikuinen tutkitaan ulostenäytteellä ja lääkitään vain tarvittaessa. Ajatus on yksinkertainen – madotetaan oikeaan aikaan ja oikeasta syystä, ei kalenterin mukaan. Alta löydät eurooppalaiseen ESCCAP-ohjeistukseen ja suomalaiseen käytäntöön perustuvat nykyiset suositukset kaikenikäisille kissoille ja koirille, matotartunnan oireet, ohjeet valmisteen valintaan sekä matkustavien koirien lakisääteisen heisimatolääkityksen.",
    sv: "I Finland avmaskar vi inte längre alla husdjur ”för säkerhets skull” flera gånger om året. Modern parasitkontroll utgår från risken: valpar, kattungar och djur som jagar, strövar fritt eller reser avmaskas enligt schema, medan en frisk vuxen hund eller katt med låg risk kontrolleras med avföringsprov och behandlas bara vid behov. Tanken är enkel – behandla vid rätt tidpunkt och av rätt orsak, inte efter kalendern. Här nedan går vi igenom de aktuella rekommendationerna, som bygger på de europeiska ESCCAP-riktlinjerna och finländsk praxis, för katter och hundar i alla åldrar, tecknen på maskinfektion, vilket maskmedel du ska välja och den lagstadgade bandmaskbehandlingen för hundar som reser.",
    en: "Deworming in Finland is no longer done \"just in case\" several times a year for every pet. Modern parasite control is risk-based: puppies, kittens and animals that hunt, roam or travel are dewormed on a schedule, while a healthy, low-risk adult is checked with a faecal sample and treated only when needed. The idea is simple — treat at the right time and for the right reason, not by the calendar. Below are the current recommendations, based on the European ESCCAP guidelines and Finnish practice, for cats and dogs of every age, the signs of a worm infection, which product to choose, and the legal tapeworm treatment for travelling dogs."
  },
  "article.deworming.catoften.title": {
    fi: "Kuinka usein kissa pitää madottaa?",
    sv: "Hur ofta ska en katt avmaskas?",
    en: "How often should a cat be dewormed?"
  },
  "article.deworming.catoften.text": {
    fi: "Aikuiselle sisäkissalle riittää yleensä madotus 1–2 kertaa vuodessa – ja mieluiten vasta, kun ulostenäyte osoittaa sen tarpeelliseksi. Ulkona liikkuva kissa madotetaan noin 4 kertaa vuodessa ja hiiriä ja muita jyrsijöitä aktiivisesti pyydystävä kissa kuukausittain, koska jyrsijät levittävät heisimatoja. Mitä enemmän kissasi metsästää, sitä useammin se tarvitsee matolääkkeen; pelkästään sisällä elävä kissa, jonka ulostenäyte on puhdas, ei välttämättä tarvitse madotusta lainkaan.",
    sv: "För en vuxen innekatt räcker det oftast med avmaskning 1–2 gånger om året – och helst först när ett avföringsprov visar att det behövs. En katt som går ute avmaskas ungefär 4 gånger om året, och en katt som aktivt jagar möss och andra gnagare varje månad, eftersom gnagare sprider bandmask. Ju mer din katt jagar, desto oftare behöver den behandlas; en katt som enbart lever inomhus och har ett rent avföringsprov behöver kanske ingen avmaskning alls.",
    en: "For an adult indoor cat, deworming 1–2 times a year is usually enough — and preferably only after a faecal sample shows it is needed. A cat that goes outdoors is dewormed about 4 times a year, and a cat that actively hunts mice and other rodents monthly, because rodents transmit tapeworms. The more your cat hunts, the more often it needs treatment; a strictly indoor cat with a clean faecal sample may not need any."
  },
  "article.deworming.kitten.title": {
    fi: "Milloin kissanpentu madotetaan ensimmäisen kerran?",
    sv: "När avmaskas en kattunge första gången?",
    en: "When is a kitten dewormed for the first time?"
  },
  "article.deworming.kitten.text": {
    fi: "Kissanpennun ensimmäinen madotus tehdään 3 viikon iässä, ja se toistetaan 2 viikon välein, kunnes vieroituksesta on kulunut 2 viikkoa. Sen jälkeen pennut, joilla riski jatkuu – esimerkiksi ulkona liikkuvat pennut – madotetaan kuukausittain 6 kuukauden ikään asti, muut ulostenäytteen perusteella. Emo madotetaan samaan aikaan pentueen kanssa. Kissanpennut madotetaan näin varhain ja näin usein siksi, että suolinkaisen toukat siirtyvät niihin maidon kautta, ja runsas matomäärä hidastaa pennun kasvua – pömppömaha, himmeä turkki, ripuli ja huono painonnousu ovat tyypillisiä. Juuri kotiin otettu kissanpentu madotetaan saman ohjelman mukaan, jos sen taustaa ei tiedetä, mieluiten 1–2 viikkoa ennen ensimmäistä rokotusta.",
    sv: "Kattungar avmaskas första gången vid 3 veckors ålder, och behandlingen upprepas varannan vecka tills det gått 2 veckor efter avvänjningen. Därefter avmaskas kattungar med fortsatt risk, till exempel sådana som får gå ute, varje månad fram till 6 månaders ålder – annars styr avföringsprovet. Kattmamman behandlas samtidigt som kullen. Att kattungar behandlas så tidigt och så ofta beror på att spolmasklarver överförs till dem via mjölken, och en kraftig maskbörda hämmar kattungens tillväxt – typiska tecken är en uppsvälld mage, glanslös päls, diarré och dålig viktökning. En kattunge du just har tagit hem avmaskas enligt samma schema om bakgrunden är okänd, helst 1–2 veckor före den första vaccinationen.",
    en: "Kittens get their first deworming at 3 weeks of age, and it is repeated every 2 weeks until 2 weeks after weaning, then — for kittens with ongoing risk, such as outdoor access — monthly until 6 months of age, otherwise by faecal sample. The mother is treated at the same time as the litter. Kittens are treated so early and so often because roundworm larvae pass to them through the milk, and a heavy worm burden stunts a kitten's growth — a pot belly, dull coat, diarrhoea and poor weight gain are typical. A kitten you have just adopted should be dewormed on the same schedule if its history is unknown, ideally 1–2 weeks before its first vaccination."
  },
  "article.deworming.indoor.title": {
    fi: "Tarvitseeko sisäkissa madotusta?",
    sv: "Behöver en innekatt avmaskas?",
    en: "Does an indoor cat need deworming?"
  },
  "article.deworming.indoor.text": {
    fi: "Harvemmin kuin ulkokissa – mutta tarvitsee. Sisäkissa voi saada suolinkaisen munia kengissä tai turkissa kulkeutuneesta liasta, ruukkukasvien mullasta tai raakalihasta, ja kissa, joka nappaa sisällä satunnaisen hiiren, voi saada heisimatoja. Järkevä käytäntö sisäkissalle on ulostenäyte kerran vuodessa ja madotus vain, jos loisia löytyy – tai rutiinimadotus 1–2 kertaa vuodessa, jos et halua tutkituttaa näytettä. Kissanpennut madotetaan pentuohjelman mukaan elintavoista riippumatta.",
    sv: "Mer sällan än en utekatt, men inte aldrig. En innekatt kan få i sig spolmaskägg som följer med in på skor eller i pälsen, från jorden i krukväxter eller från rått kött, och en katt som då och då fångar en mus inomhus kan få bandmask. Det förnuftiga för en innekatt är ett avföringsprov en gång om året och avmaskning bara om parasiter hittas – eller en rutinmässig behandling 1–2 gånger om året om du hellre låter bli att testa. Kattungar avmaskas enligt kattungeschemat oavsett livsstil.",
    en: "Less often than an outdoor cat, but not never. Indoor cats can pick up roundworm eggs carried in on shoes or fur, from soil in potted plants or from raw meat, and a cat that catches an occasional mouse in the house can get tapeworms. The sensible approach for an indoor cat is a faecal sample once a year and deworming only if parasites are found — or a routine treatment 1–2 times a year if you prefer not to test. Kittens are dewormed on the kitten schedule regardless of lifestyle."
  },
  "article.deworming.catsigns.title": {
    fi: "Mistä tiedän, onko kissalla tai koiralla matoja?",
    sv: "Hur vet jag om min katt eller hund har mask?",
    en: "How do I know if my cat or dog has worms?"
  },
  "article.deworming.catsigns.text": {
    fi: "Usein et tiedäkään – moni tartunnan saanut aikuinen eläin ei oireile lainkaan, ja juuri siksi ulostenäyte on tärkeä. Tarkkaile turvonnutta mahaa (etenkin kissan- ja koiranpennuilla), laihtumista hyvästä ruokahalusta huolimatta, ripulia tai oksentelua, himmeää turkkia, takapuolen hankaamista lattiaan sekä riisinjyvän näköisiä heisimadon jaokkeita peräaukon ympärillä tai makuupaikassa. Suolinkaisia näkee joskus oksennuksessa tai ulosteessa vaaleina, spagettimaisina säikeinä. Jos huomaat jotakin näistä, tuo ulostenäyte klinikalle – tutkimme sen samana päivänä.",
    sv: "Ofta märker du ingenting – många infekterade vuxna djur visar inga symtom alls, och det är just därför avföringsprovet är så viktigt. Tecken att hålla ögonen på är en uppsvälld mage (särskilt hos kattungar och valpar), viktminskning trots god aptit, diarré eller kräkningar, glanslös päls, att djuret hasar med baken längs golvet, och riskornsliknande bandmasksegment kring analöppningen eller i bädden. Spolmask syns ibland i kräkningar eller avföring som ljusa, spagettiliknande trådar. Ser du något av detta, ta med ett avföringsprov till kliniken – vi undersöker det samma dag.",
    en: "Often you don't — many infected adults show nothing, which is why the faecal sample matters. Signs to watch for are a swollen belly (especially in kittens and puppies), weight loss despite a good appetite, diarrhoea or vomiting, a dull coat, dragging the bottom along the floor, and rice-grain-like tapeworm segments around the anus or in the bedding. Roundworms are sometimes seen in vomit or faeces as pale spaghetti-like strands. If you see any of these, bring a faecal sample to the clinic — we examine it the same day."
  },
  "article.deworming.dogoften.title": {
    fi: "Kuinka usein koira pitää madottaa?",
    sv: "Hur ofta ska en hund avmaskas?",
    en: "How often should a dog be dewormed?"
  },
  "article.deworming.dogoften.text": {
    fi: "Madotusväli riippuu koiran elintavoista. Pääosin sisällä oleva koira, joka tapaa muita koiria vain vähän, madotetaan 1–2 kertaa vuodessa – tai sen ulostenäyte tutkitaan yhtä usein ja lääkitään vain tarvittaessa. Tavallinen perhekoira, joka tapaa muita koiria puistoissa ja lenkeillä, madotetaan tai sen ulostenäyte tutkitaan noin 4 kertaa vuodessa. Metsästyskoirat, vapaana liikkuvat koirat, saalista, raatoja tai ulosteita syövät koirat sekä matkustavat koirat madotetaan 4–12 kertaa vuodessa, ja metsästyskaudella kuukausittainen heisimatolääkitys on perusteltu. Myös koira, joka syö pakastamatonta tai kunnolla kuumentamatonta raakalihaa, tarvitsee heisimatolääkkeen kuukausittain.",
    sv: "Hur ofta beror på hundens livsstil. En hund som mest är inomhus och har lite kontakt med andra hundar avmaskas 1–2 gånger om året – eller kontrolleras med avföringsprov lika ofta och behandlas bara vid behov. En vanlig familjehund som träffar andra hundar i parker och på promenader bör behandlas, eller få ett avföringsprov undersökt, ungefär 4 gånger om året. Jakthundar, hundar som strövar fritt, hundar som äter bytesdjur, kadaver eller avföring, och hundar som reser behandlas 4–12 gånger om året, och under jaktsäsongen är en bandmaskbehandling varje månad motiverad. Hundar som utfodras med rått kött som inte har frysts eller upphettats ordentligt bör också få bandmaskbehandling varje månad.",
    en: "How often depends on the dog's lifestyle. A dog that is mostly indoors and has little contact with other dogs is dewormed 1–2 times a year — or checked with a faecal sample at the same frequency and treated only if needed. A typical family dog that meets other dogs in parks and on walks should be treated, or have a faecal sample examined, about 4 times a year. Hunting dogs, dogs that roam freely, dogs that eat prey, carcasses or faeces, and dogs that travel are treated 4–12 times a year, and during the hunting season a monthly tapeworm treatment is justified. Dogs fed raw meat that has not been frozen or thoroughly heated should also get a monthly tapeworm treatment."
  },
  "article.deworming.puppy.title": {
    fi: "Milloin koiranpentu madotetaan ensimmäisen kerran?",
    sv: "När avmaskas en valp första gången?",
    en: "When is a puppy dewormed for the first time?"
  },
  "article.deworming.puppy.text": {
    fi: "Koiranpennut madotetaan ensimmäisen kerran 2 viikon iässä, koska suolinkaisen toukat siirtyvät niihin jo kohdussa ja maidon kautta. Madotus toistetaan 2 viikon välein, kunnes vieroituksesta on kulunut 2 viikkoa, ja sen jälkeen pennut, joilla riski jatkuu – esimerkiksi pentukoulut ja koirapuistot – madotetaan kuukausittain 6 kuukauden ikään asti; emo madotetaan yhdessä pentueen kanssa. Pyydä kasvattajalta pennun madotustiedot, kun haet pennun kotiin, ja jatka eläinlääkärisi suosittelemaa ohjelmaa – säännöllisesti muita koiria tapaavalla pennulla se tarkoittaa tyypillisesti madotusta kuukausittain puolen vuoden ikään asti.",
    sv: "Valpar avmaskas första gången vid 2 veckors ålder, eftersom spolmasklarver överförs till dem redan i livmodern och via mjölken. Behandlingen upprepas varannan vecka tills det gått 2 veckor efter avvänjningen, och därefter – för valpar med fortsatt risk, till exempel valpkurser och hundparker – varje månad fram till 6 månaders ålder; tiken behandlas tillsammans med kullen. Be uppfödaren om valpens avmaskningsuppgifter när du hämtar den, och fortsätt enligt det schema din veterinär rekommenderar – vanligen varje månad fram till sex månaders ålder för en valp som regelbundet träffar andra hundar.",
    en: "Puppies are dewormed for the first time at 2 weeks of age, because roundworm larvae pass to them already in the womb and through the milk. Treatment is repeated every 2 weeks until 2 weeks after weaning and then — for puppies with ongoing risk, such as puppy classes and dog parks — monthly until 6 months of age; the dam is treated together with the litter. Ask the breeder for the puppy's deworming record when you collect it and continue the schedule your vet recommends — typically monthly until six months for a puppy that meets other dogs regularly."
  },
  "article.deworming.fecal.title": {
    fi: "Milloin ulostenäyte riittää madotuksen sijaan?",
    sv: "När räcker det med avföringsprov i stället för avmaskning?",
    en: "When is a faecal sample enough instead of deworming?"
  },
  "article.deworming.fecal.text": {
    fi: "Terveelle, vähäriskiseen ryhmään kuuluvalle aikuiselle – sisäkissalle tai koiralle, joka on enimmäkseen sisällä ja tapaa vain vähän muita koiria – riittää ulostenäyte kerran tai kahdesti vuodessa: jos näyte on puhdas, lääkettä ei tarvita. Koirat ja kissat, joilla on enemmän altistusta (puistolenkit ja koirakontaktit, ulkoilu), tutkitaan yhtä usein kuin ne muuten madotettaisiin, eli noin 4 kertaa vuodessa. Kerää pieni määrä tuoretta ulostetta (kolmelta peräkkäiseltä päivältä samaan purkkiin) ja tuo se klinikalle; tutkimme näytteen mikroskoopilla madonmunien ja Giardian varalta. Kun lääkitään vain silloin, kun loisia löytyy, vältetään turha lääkitys ja hidastetaan lääkeresistenssin kehittymistä – se ei ole vielä todettu ongelma Euroopassa, mutta hakamadoilla sitä on jo nähty Yhdysvalloissa ja Australiassa.",
    sv: "För ett friskt vuxet djur i lågriskgruppen – en innekatt, eller en hund som mest är inomhus och har lite kontakt med andra hundar – räcker ett avföringsprov en eller två gånger om året: är provet rent behövs inget maskmedel. Hundar och katter med större smittrisk (parkpromenader och hundkontakter, utevistelse) testas lika ofta som de annars skulle behandlas, ungefär 4 gånger om året. Samla en liten mängd färsk avföring (från tre dagar i följd, blandad i samma burk) och ta med den till kliniken; vi undersöker den i mikroskop efter maskägg och Giardia. Att behandla bara när parasiter hittas undviker onödig medicinering och bromsar utvecklingen av resistens mot maskmedel – ännu inte ett bevisat problem i Europa, men redan konstaterat hos hakmask i USA och Australien.",
    en: "For a healthy adult in the low-risk group — an indoor cat, or a dog that is mostly indoors and has little contact with other dogs — a faecal sample once or twice a year is enough: if it is clean, no medication is needed. Dogs and cats with more exposure (park walks and dog contact, outdoor access) are tested at the same frequency at which they would otherwise be treated, about 4 times a year. Collect a small amount of fresh faeces (from three consecutive days, mixed in one container) and bring it to the clinic; we examine it under the microscope for worm eggs and Giardia. Treating only when parasites are found avoids needless medication and slows the development of drug resistance — not yet a proven problem in Europe, but already seen in hookworms in the USA and Australia."
  },
  "article.deworming.parasites.title": {
    fi: "Mitkä suolistomadot ovat yleisiä Suomessa?",
    sv: "Vilka inälvsmaskar är vanliga i Finland?",
    en: "Which intestinal worms are common in Finland?"
  },
  "article.deworming.parasites.text": {
    fi: "Suolinkaiset (Toxocara) ovat yleisin löydös kissoilla sekä koiran- ja kissanpennuilla, ja ne ovat zoonooseja – ne voivat tarttua ihmiseen, erityisesti pieniin lapsiin, mikä on hyvä syy madottaa nuoret eläimet kunnolla. Heisimatoja esiintyy lähinnä eläimillä, jotka syövät jyrsijöitä tai raakaa lihaa. Giardia on ripulia aiheuttava alkueläin, joka leviää saastuneen veden ja ympäristön kautta. Hakamatoja (Uncinaria) löytyy suomalaisilta koirilta suunnilleen yhtä usein kuin suolinkaisia, kun taas piiskamadot ovat harvinaisia. Vaarallista myyräekinokokkia eli ketun heisimatoa (Echinococcus multilocularis) ei esiinny Suomessa – matkustavien koirien tuontisäännöt ovat olemassa juuri siksi, että näin pysyisi jatkossakin – mutta sen sukulainen hirviekinokokki (E. canadensis) esiintyy susilla, hirvillä ja poroilla Itä- ja Pohjois-Suomessa ja voi tarttua koiraan, joka syö raakoja hirven tai poron sisäelimiä. Sekin on yksi syy siihen, miksi metsästyskoirat saavat säännöllisen heisimatolääkityksen.",
    sv: "Spolmask (Toxocara) är det vanligaste fyndet hos katter och hos valpar och kattungar, och den är zoonotisk – den kan smitta människor, särskilt små barn, vilket är ett gott skäl att avmaska unga djur ordentligt. Bandmask förekommer främst hos djur som äter gnagare eller rått kött. Giardia är en encellig parasit som orsakar diarré och sprids via förorenat vatten och förorenad miljö. Hakmask (Uncinaria) hittas hos finländska hundar ungefär lika ofta som spolmask, medan piskmask är sällsynt. Rävens farliga dvärgbandmask, Echinococcus multilocularis, förekommer inte i Finland – införselreglerna för hundar som reser finns just för att det ska förbli så – men en besläktad art, älgens dvärgbandmask (E. canadensis), finns hos varg, älg och ren i östra och norra Finland och kan smitta hundar som äter råa inälvor av älg eller ren, vilket är ytterligare ett skäl till att jakthundar får regelbunden bandmaskbehandling.",
    en: "Roundworms (Toxocara) are the most common finding in cats and in puppies and kittens, and they are zoonotic — they can infect people, particularly small children, which is a good reason to deworm young animals properly. Tapeworms occur mainly in animals that eat rodents or raw meat. Giardia is a protozoan that causes diarrhoea and spreads through contaminated water and environment. Hookworms (Uncinaria) are found in Finnish dogs about as often as roundworms, whereas whipworms are rare. The dangerous fox tapeworm Echinococcus multilocularis does not occur in Finland — the import rules for travelling dogs exist precisely to keep it that way — but a related moose tapeworm (E. canadensis) is found in wolves, moose and reindeer in eastern and northern Finland and can infect dogs that eat raw moose or reindeer offal, which is one more reason hunting dogs get regular tapeworm treatment."
  },
  "article.deworming.product.title": {
    fi: "Mikä matolääke kannattaa valita – tabletti, pasta vai spot-on?",
    sv: "Vilket maskmedel ska jag välja – tablett, pasta eller spot-on?",
    en: "Which dewormer should I use — tablet, paste or spot-on?"
  },
  "article.deworming.product.text": {
    fi: "Oikea valmiste riippuu siitä, mitä loisia halutaan häätää: heisimatoihin tarvitaan pratsikvanteli, kun taas suolinkaisiin tehoavat milbemysiini, pyranteeli, fenbendatsoli tai emodepsidi. Yhdistelmätabletit kattavat molemmat; niskaan annosteltavat spot-on-valmisteet ovat käteviä kissoille, jotka eivät suostu ottamaan tabletteja, ja pastat sopivat koiran- ja kissanpennuille. Suomessa fenbendatsoli-, flubendatsoli- ja pyranteelivalmisteita sekä pratsikvantelia yksinään tai pyranteeliin yhdistettynä (kuten Drontal-tabletit tai Dronspot-spot-on) saa apteekista ilman reseptiä, kun taas milbemysiini (Milbemax), emodepsidi (Profender) sekä kirppuja, punkkeja ja matoja yhdessä torjuvat spot-on-valmisteet vaativat eläinlääkärin reseptin. Annos määräytyy painon mukaan ja valmiste valitaan loisen mukaan – kysy siis meiltä, mikä tuote sopii lemmikillesi, etenkin jos kyseessä on kissan- tai koiranpentu, tiine eläin tai eläin, jolla on muu lääkitys.",
    sv: "Rätt preparat beror på vilka parasiter du vill komma åt: mot bandmask behövs prazikvantel, medan spolmask svarar på milbemycin, pyrantel, fenbendazol eller emodepsid. Kombinationstabletter täcker båda; spot-on-preparat som droppas i nacken är praktiska för katter som inte tar tabletter; pasta passar valpar och kattungar. I Finland säljs fenbendazol-, flubendazol- och pyrantelpreparat, liksom prazikvantel ensamt eller i kombination med pyrantel (till exempel Drontal-tabletter eller Dronspot spot-on), receptfritt på apotek, medan milbemycin (Milbemax), emodepsid (Profender) och de kombinerade spot-on-preparaten mot loppor, fästingar och mask kräver recept från veterinären. Dosen bestäms av kroppsvikten och preparatet väljs efter parasit – så fråga oss vilket preparat som passar ditt djur, i synnerhet när det gäller kattungar, valpar, dräktiga djur och djur som står på annan medicinering.",
    en: "The right product depends on which parasites you are targeting: praziquantel is needed for tapeworms, while roundworms respond to milbemycin, pyrantel, fenbendazole or emodepside. Combination tablets cover both; spot-on products applied to the neck are convenient for cats that will not take tablets; pastes suit puppies and kittens. In Finland, fenbendazole, flubendazole and pyrantel products, and praziquantel on its own or combined with pyrantel (such as Drontal tablets or the Dronspot spot-on), are sold at pharmacies without prescription, whereas milbemycin (Milbemax), emodepside (Profender) and the combined flea-tick-worm spot-ons need a prescription from the vet. The dose is by body weight and the choice by parasite — so ask us which product fits your pet, especially for kittens, puppies, pregnant animals and animals on other medication."
  },
  "article.deworming.vaccine.title": {
    fi: "Pitääkö madottaa ennen rokotusta?",
    sv: "Ska jag avmaska före vaccinationen?",
    en: "Should I deworm before vaccination?"
  },
  "article.deworming.vaccine.text": {
    fi: "Se on hyvä käytäntö erityisesti koiran- ja kissanpennuilla: runsas matomäärä saattaa heikentää rokotevastetta, eikä matoinen pentu ole terve pentu rokotettavaksi, ja pentujen madotusohjelma ajoittaa madotuksen luontevasti 1–2 viikkoa ennen jokaista rokotuskäyntiä. Tervettä aikuista ei tarvitse madottaa vain siksi, että rokotus on ajankohtainen – tuo sen sijaan ulostenäyte mukaan, niin tutkimme sen samalla käynnillä.",
    sv: "Det är god praxis, särskilt för valpar och kattungar: en kraftig maskbörda kan försvaga svaret på vaccinet, en valp med mask är ingen frisk valp att vaccinera, och i valpschemat infaller en avmaskning av sig självt 1–2 veckor före varje vaccinationsbesök. För friska vuxna djur behöver man inte avmaska bara för att en vaccination står på tur – ta med ett avföringsprov i stället, så kontrollerar vi det vid samma besök.",
    en: "It is good practice, especially for puppies and kittens: a heavy worm burden may blunt the response to the vaccine and a wormy puppy is not a healthy puppy to vaccinate, and the puppy schedule naturally puts a deworming 1–2 weeks before each vaccination visit. For healthy adults it is not necessary to deworm just because a vaccination is due — bring a faecal sample instead and we check it at the same visit."
  },
  "article.deworming.travel.title": {
    fi: "Mikä on matkustavan koiran lakisääteinen heisimatolääkitys?",
    sv: "Vilken bandmaskbehandling krävs enligt lag för hundar som reser?",
    en: "What is the legal tapeworm treatment for dogs that travel?"
  },
  "article.deworming.travel.text": {
    fi: "Kun koira palaa ulkomailta Suomeen, se on lain mukaan lääkittävä ekinokokkia (ketun heisimatoa) vastaan pratsikvantelilla tai yhtä tehokkaalla valmisteella. Lääkityksen antaa eläinlääkäri ulkomailla 1–5 vuorokautta (24–120 tuntia) ennen Suomeen saapumista, ja se merkitään lemmikkipassiin – tämä koskee myös Ruotsia, Vaasa–Uumaja-lautta mukaan lukien. Usein EU-maissa, Norjassa ja Sveitsissä matkustavat koirat voivat käyttää 28 päivän sääntöä: kaksi aloituslääkitystä, jotka eläinlääkäri antaa Suomessa 1–28 päivän välein, ja sen jälkeen lääkitys enintään 28 päivän välein missä tahansa näistä maista niin, että viimeinen annos annetaan Suomessa matkan jälkeen – jokaisen annoksen antaa eläinlääkäri, ja jokainen merkitään passiin. Lääkitystä ei tarvita koirille, jotka saapuvat suoraan Norjasta, Irlannista tai Maltalta, ja suoraan Suomesta Norjaan tai Isoon-Britanniaan matkustavat koirat on vapautettu siitä perillä. Kaikki matkustusvaatimukset löytyvät EU-lemmikkipassia käsittelevältä sivultamme.",
    sv: "När en hund återvänder till Finland från utlandet måste den enligt lag behandlas mot rävens dvärgbandmask (Echinococcus) med prazikvantel eller ett lika effektivt preparat. Behandlingen ska ges av en veterinär utomlands 1–5 dygn (24–120 timmar) före ankomsten till Finland och antecknas i sällskapsdjurspasset – det gäller också Sverige, inklusive färjan Vasa–Umeå. Hundar som reser ofta inom EU, Norge och Schweiz kan använda 28-dagarsregeln: två inledande behandlingar som ges av en veterinär i Finland med 1–28 dagars mellanrum, därefter en behandling med högst 28 dagars mellanrum i vilket som helst av dessa länder, och den sista dosen ges i Finland efter resan – varje dos måste ges av en veterinär och antecknas i passet. Ingen behandling krävs för hundar som kommer direkt från Norge, Irland eller Malta, och hundar som reser direkt från Finland till Norge eller Storbritannien är befriade där. Alla resekrav hittar du på vår sida om EU:s sällskapsdjurspass.",
    en: "When a dog returns to Finland from abroad, it must by law be treated against the fox tapeworm (Echinococcus) with praziquantel or an equally effective product, given by a vet abroad 1–5 days (24–120 hours) before arrival in Finland and recorded in the pet passport — this applies to Sweden too, including the Vaasa–Umeå ferry. Dogs that travel often within the EU, Norway and Switzerland can use the 28-day rule: two starting treatments given by a vet in Finland 1–28 days apart, then a treatment at intervals of no more than 28 days in any of those countries, with the last dose given in Finland after the trip — every dose must be given by a vet and entered in the passport. No treatment is needed for dogs arriving directly from Norway, Ireland or Malta, and dogs travelling directly from Finland to Norway or Great Britain are exempt there. The full travel requirements are on our EU pet passport page."
  },
  "article.deworming.cta": {
    fi: "Arvioimme mielellämme lemmikkisi todellisen madotustarpeen ilman turhaa lääkitystä. Varaa aika ulostenäytteen tutkimukseen tai madotukseen Eläinklinikka Saarella – yhdessä varmistamme, että lemmikkisi hoidetaan oikeaan aikaan.",
    sv: "Vi bedömer gärna ditt djurs verkliga behov av avmaskning – utan onödig medicinering. Boka en kontroll med avföringsprov eller en avmaskning hos Djurklinik Saari, så ser vi tillsammans till att ditt djur behandlas vid rätt tidpunkt.",
    en: "We are happy to assess your pet's real need for deworming without unnecessary medication. Book a faecal-sample check or a deworming at Saari Animal Clinic — together we make sure your pet is treated at the right time."
  },

  // --- Article 22: IBD vs Lymphoma ---
  'article.ibdlymphoma.tag': {
    fi: 'Terveys',
    sv: 'Hälsa',
    en: 'Health'
  },
  'article.ibdlymphoma.title': {
    fi: 'IBD vai lymfooma? — eläinlääketieteen vaikein erotusdiagnoosi',
    sv: 'IBD eller lymfom? — veterinärmedicinens svåraste differentialdiagnos',
    en: 'IBD or Lymphoma? — The Most Difficult Differential Diagnosis in Veterinary Medicine'
  },
  'article.ibdlymphoma.intro': {
    fi: 'Tulehduksellinen suolistosairaus (IBD) ja matala-asteinen suoliston lymfooma ovat eläinlääketieteen vaikeimpia erotusdiagnooseja — erityisesti kissoilla. Molemmat aiheuttavat kroonista oksentelua, ripulia, laihtumista ja ruokahaluttomuutta, ja ne esiintyvät tyypillisesti keski-ikäisillä ja iäkkäillä eläimillä. Oikea diagnoosi on ratkaiseva, sillä hoidot eroavat merkittävästi: IBD:tä hoidetaan immunosuppressiolla, lymfoomaa kemoterapialla.',
    sv: 'Inflammatorisk tarmsjukdom (IBD) och låggradig intestinal lymfom är bland de svåraste differentialdiagnoserna inom veterinärmedicin — särskilt hos katter. Båda orsakar kroniska kräkningar, diarré, viktminskning och aptitlöshet, och drabbar typiskt medelålders och äldre djur. Korrekt diagnos är avgörande, eftersom behandlingarna skiljer sig markant: IBD behandlas med immunsuppression, lymfom med kemoterapi.',
    en: 'Inflammatory bowel disease (IBD) and low-grade intestinal lymphoma are among the most difficult differential diagnoses in veterinary medicine — especially in cats. Both cause chronic vomiting, diarrhea, weight loss, and loss of appetite, and typically occur in middle-aged and older animals. Accurate diagnosis is critical, as treatments differ significantly: IBD is treated with immunosuppression, lymphoma with chemotherapy.'
  },
  'article.ibdlymphoma.challenge.title': {
    fi: 'Miksi erottaminen on niin vaikeaa',
    sv: 'Varför det är så svårt att skilja dem åt',
    en: 'Why Differentiation Is So Difficult'
  },
  'article.ibdlymphoma.challenge.text': {
    fi: 'Vakava IBD ja matala-asteinen lymfooma näyttävät mikroskoopissa lähes identtisiltä — molemmat ilmenevät pienten lymfosyyttien tunkeutumisena suoliston limakalvoon. Tutkimuksissa patologit ovat erimielisiä diagnoosista merkittävässä osassa tapauksista pelkän perinteisen värjäyksen perusteella. Lisäksi krooninen tulehdus (IBD) ja lymfooma esiintyvät usein rinnakkain, ja on esitetty, että IBD saattaa joissakin tapauksissa edetä lymfoomaksi — suoraa näyttöä tästä muutoksesta ei kuitenkaan vielä ole. Kyseessä ei ehkä ole kaksi täysin erillistä sairautta vaan mahdollinen jatkumo.',
    sv: 'Allvarlig lymfocytär-plasmacytär IBD och låggradig lymfom ser nästan identiska ut i mikroskop — båda visar infiltration av små lymfocyter i tarmslemhinnan. Studier visar att patologer är oeniga om diagnosen i en betydande andel fall baserat enbart på konventionell färgning. Dessutom förekommer kronisk inflammation (IBD) och lymfom ofta samtidigt, och det har föreslagits att IBD i vissa fall kan utvecklas till lymfom — men det finns ännu inga direkta bevis för en sådan omvandling. Det handlar kanske inte om två helt separata sjukdomar utan om ett möjligt kontinuum.',
    en: 'Severe lymphocytic-plasmacytic IBD and low-grade lymphoma look nearly identical under the microscope — both appear as infiltration of small lymphocytes into the intestinal mucosa. Studies show that pathologists disagree on the diagnosis in a significant proportion of cases based on conventional staining alone. Furthermore, chronic inflammation (IBD) and lymphoma often occur together, and it has been proposed that IBD may in some cases progress to lymphoma — though there is not yet direct evidence of such transformation. These may not be two entirely separate diseases but rather a possible continuum.'
  },
  'article.ibdlymphoma.diagnosis.title': {
    fi: 'Diagnoosi vaatii kehittyneitä menetelmiä',
    sv: 'Diagnosen kräver avancerade metoder',
    en: 'Diagnosis Requires Advanced Methods'
  },
  'article.ibdlymphoma.diagnosis.text': {
    fi: 'Ultraäänitutkimus ohjaa koepalanottoa, mutta ei yksinään erota IBD:tä lymfoomasta. Kudosnäyte tähystyksellä tai kirurgisella koepalanotolla on välttämätön. Pelkkä histopatologia (H&E-värjäys) tunnistaa lymfooman vain 60–75 %:n herkkyydellä. <strong>Immunohistokemia</strong> (CD3/CD20) tunnistaa, onko solukko T- vai B-soluperäistä — matala-asteinen lymfooma on 80–95 % tapauksista T-soluperäistä. <strong>PARR-testi</strong> (PCR-klonaalisuustesti) on hyödyllinen lisätutkimus, joka tunnistaa, onko solukko monoklonaalista (viittaa lymfoomaan) vai polyklonaalista (tulehdus). Sitä ei kuitenkaan käytetä yksinään, sillä sen erottelukyky etenkin kissoilla on rajallinen. Diagnoosin kulmakivi on histopatologian ja immunohistokemian yhdistelmä, jota PARR täydentää epäselvissä tapauksissa. Yhdistelmällä päästään noin 80–85 %:n diagnostiseen tarkkuuteen.',
    sv: 'Ultraljud vägleder provtagningen, men kan inte ensamt skilja IBD från lymfom. Vävnadsprov via endoskopi eller kirurgisk biopsi är nödvändigt. Enbart histopatologi (H&E-färgning) identifierar lymfom med bara 60–75 % sensitivitet. <strong>Immunhistokemi</strong> (CD3/CD20) identifierar om cellpopulationen är T- eller B-cellsursprung — låggradig lymfom är T-cellsursprung i 80–95 % av fallen. <strong>PARR-klonalitetstest</strong> (PCR) är ett användbart tilläggsprov som identifierar om cellpopulationen är monoklonal (tyder på lymfom) eller polyklonal (inflammation). Det används dock inte ensamt, eftersom dess förmåga att skilja inflammation från lymfom är begränsad, särskilt hos katter. Diagnosens hörnsten är kombinationen av histopatologi och immunhistokemi, som PARR kompletterar i oklara fall. Kombinationen når en diagnostisk noggrannhet på cirka 80–85 %.',
    en: 'Ultrasound guides biopsy site selection but cannot alone differentiate IBD from lymphoma. Tissue sampling via endoscopy or surgical biopsy is essential. Histopathology alone (H&E staining) identifies lymphoma with only 60–75% sensitivity. <strong>Immunohistochemistry</strong> (CD3/CD20) identifies whether the cell population is T-cell or B-cell in origin — low-grade lymphoma is T-cell in origin in 80–95% of cases. <strong>PARR clonality testing</strong> (PCR) is a useful ancillary test that identifies whether the population is monoclonal (suggesting lymphoma) or polyclonal (inflammation). However, it is not used on its own, as its ability to distinguish inflammation from lymphoma is limited — especially in cats. The cornerstone of diagnosis is the combination of histopathology and immunohistochemistry, which PARR complements in ambiguous cases. Together they reach about 80–85% diagnostic accuracy.'
  },
  'article.ibdlymphoma.treatment.title': {
    fi: 'Hoito ja ennuste',
    sv: 'Behandling och prognos',
    en: 'Treatment and Prognosis'
  },
  'article.ibdlymphoma.treatment.text': {
    fi: '<strong>IBD</strong>:n hoito perustuu ruokavaliomuutokseen (hydrolysoitu proteiini) ja lääkitykseen (prednisoloni, budesonidi). Ennuste on yleensä hyvä — useimmat eläimet elävät vuosia oikealla hoidolla. <strong>Matala-asteisen lymfooman</strong> ennuste on huomattavasti parempi kuin korkea-asteisen: hoitovaste on 85–96 %, ja mediaanielinaika on 1,5–2,5 vuotta, parhaimmillaan yli 5 vuotta. <strong>Korkea-asteisen lymfooman</strong> ennuste on varovaisempi (mediaanielinaika 1,5–6 kuukautta).',
    sv: '<strong>IBD</strong> behandlas med kostförändring (hydrolyserat protein) och immunsuppression (prednisolon, budesonid). Prognosen är vanligtvis god — de flesta djur lever i flera år med rätt behandling. <strong>Låggradig lymfom</strong> har en betydligt bättre prognos än höggradig: behandlingssvaret är 85–96 %, och medianöverlevnaden är 1,5–2,5 år, i bästa fall över 5 år. <strong>Höggradig lymfom</strong> har en mer försiktig prognos (medianöverlevnad 1,5–6 månader).',
    en: '<strong>IBD</strong> is treated with dietary change (hydrolyzed protein) and immunosuppression (prednisolone, budesonide). The prognosis is generally good — most animals live for years with proper treatment. <strong>Low-grade lymphoma</strong> has a significantly better prognosis than high-grade: the response rate is 85–96%, and median survival is 1.5–2.5 years, with some animals surviving over 5 years. <strong>High-grade lymphoma</strong> has a more guarded prognosis (median survival 1.5–6 months).'
  },
  'article.ibdlymphoma.why.title': {
    fi: 'Miksi oikea diagnoosi on tärkeä',
    sv: 'Varför korrekt diagnos är viktig',
    en: 'Why Accurate Diagnosis Matters'
  },
  'article.ibdlymphoma.why.text': {
    fi: 'Jos lymfoomaa hoidetaan IBD:nä, kortikosteroidit voivat aluksi lievittää oireita ja antaa väärän turvallisuudentunteen. Immunosuppression lisääminen (esim. siklosporiini) voi heikentää kasvaimen vastaista immuniteettia ja nopeuttaa lymfooman etenemistä. Toisaalta IBD:n virheellinen hoito kemoterapialla altistaa eläimen tarpeettomille sivuvaikutuksille. Suosittelemme kehittyneitä diagnostisia tutkimuksia kaikissa epäselvissä tapauksissa — ota yhteyttä klinikkaamme.',
    sv: 'Om lymfom behandlas som IBD kan kortikosteroider initialt lindra symtomen och ge en falsk trygghetskänsla. Tillägg av immunsuppression (t.ex. ciklosporin) kan försvaga immunförsvaret mot tumören och påskynda lymfomets progression. Å andra sidan utsätter felaktig kemoterapibehandling av IBD djuret för onödiga biverkningar. Vi rekommenderar avancerade diagnostiska undersökningar i alla oklara fall — kontakta vår klinik.',
    en: 'If lymphoma is treated as IBD, corticosteroids may initially relieve symptoms and create a false sense of security. Adding immunosuppression (e.g., cyclosporine) can weaken anti-tumor immunity and accelerate lymphoma progression. Conversely, incorrectly treating IBD with chemotherapy exposes the animal to unnecessary side effects. We recommend advanced diagnostic testing in all equivocal cases — contact our clinic.'
  },

  // --- Article 23: Hypothermia Prevention ---
  'article.hypothermia.tag': {
    fi: 'Anestesia',
    sv: 'Anestesi',
    en: 'Anesthesia'
  },
  'article.hypothermia.title': {
    fi: 'Hypotermian ehkäisy — miksi aktiivinen lämmitys pelastaa henkiä',
    sv: 'Förebyggande av hypotermi — varför aktiv uppvärmning räddar liv',
    en: 'Hypothermia Prevention — Why Active Warming Saves Lives'
  },
  'article.hypothermia.intro': {
    fi: 'Hypotermia on yleisin anestesiakomplikaatio: yli 80 % koirista sekä lähes kaikilla kissoilla laskee ruumiinlämpö anestesian aikana. Anestesia-aineet vaikuttavat lamaavasti lämmönsäätelyyn, verisuonet laajenevat ja etenkin pienet potilaat menettävät lämpöä nopeasti. Seuraukset voivat olla vakavia — hidastunut aineenvaihdunta, pidentynyt toipuminen, hyytymishäiriöt, sydämen rytmihäiriöt ja jopa kolminkertainen infektioriski.',
    sv: 'Hypotermi är den vanligaste anestesikomplikationen: över 80 % av hundarna och nästan alla katter blir nedkylda under anestesi. Anestesimedel förlamar temperaturregleringen, blodkärlen vidgas och små patienter förlorar värme snabbt. Konsekvenserna är allvarliga — långsammare läkemedelsmetabolism, förlängd återhämtning, koagulationsstörningar, hjärtarytmier och till och med trefaldig infektionsrisk.',
    en: 'Hypothermia is the most common anesthesia complication: over 80% of dogs and nearly all cats become hypothermic during anesthesia. Anesthetic agents impair thermoregulation, blood vessels dilate, and small patients lose heat rapidly. The consequences are serious — slower drug metabolism, prolonged recovery, coagulopathy, cardiac arrhythmias, and even a threefold increase in infection risk.'
  },
  'article.hypothermia.risks.title': {
    fi: 'Hypotermian seuraukset',
    sv: 'Konsekvenser av hypotermi',
    en: 'Consequences of Hypothermia'
  },
  'article.hypothermia.risks.text': {
    fi: 'Kehon lämpötilan lasku 1 °C hidastaa aineenvaihduntaa noin 10 %. Anestesia-aineet poistuvat elimistöstä hitaammin, mikä pidentää heräämistä ja lisää yliannostuksen riskiä. Hyytymistekijöiden toiminta heikkenee, mikä lisää leikkausvuotoa. Sydänlihaksen rasitus kasvaa, ja alle 31 °C:ssa vakavat rytmihäiriöt ovat todennäköisiä. Ihmislääketieteessä on osoitettu, että jo 2 °C:n lasku kolminkertaistaa leikkaushaavainfektioiden riskin.',
    sv: 'En kroppstemperatursänkning på 1 °C saktar ner ämnesomsättningen med cirka 10 %. Anestesimedel elimineras långsammare, vilket förlänger uppvaknandet och ökar risken för överdosering. Koagulationsfaktorernas funktion försämras, vilket ökar kirurgisk blödning. Myokardiets irritabilitet ökar, och under 31 °C är allvarliga arytmier sannolika. Inom humanmedicin har man visat att redan en sänkning på 2 °C tredubblar risken för postoperativa sårinfektioner.',
    en: 'A 1 °C drop in body temperature slows metabolism by approximately 10%. Anesthetic agents are eliminated more slowly, prolonging recovery and increasing the risk of relative overdose. Coagulation factor function deteriorates, increasing surgical bleeding. Myocardial irritability increases, and below 31 °C serious arrhythmias become likely. In human medicine, it has been shown that even a 2 °C drop triples the risk of surgical site infection.'
  },
  'article.hypothermia.warming.title': {
    fi: 'Aktiivinen lämmitys — puhallinkuivaimen ylivertaisuus',
    sv: 'Aktiv uppvärmning — varmluftsvärmarens överlägsenhet',
    en: 'Active Warming — The Superiority of Forced Air Warmers'
  },
  'article.hypothermia.warming.text': {
    fi: 'Klinikallamme on käytössä kolme peittoa, jotka täyttyvät lämpimällä ilmalla (forced air warmer), joita pidetään lämmitysmenetelmien kultaisena standardina. Laite puhaltaa lämmitettyä ilmaa tasaisesti potilaan ympärille kertakäyttöisen peiton kautta — ilman palovammariskiä, joka liittyy sähköisiin lämpöpatjoihin. Tutkimukset osoittavat, että lämmitetyt infuusionesteet yksinään eivät estä hypotermiaa koirilla tai kissoilla. Passiivinen eristys (peitot, sukat) hidastaa lämmön menetystä vain 30 %. Aktiivinen puhallinlämmitys yhdistettynä lämpimiin nesteisiin ja peittoon sekä sukkiin on tehokkain yhdistelmä.',
    sv: 'På vår klinik har vi tre aktiva varmluftsvämare (forced air warmers), som anses vara guldstandarden bland uppvärmningsmetoder. Apparaten blåser uppvärmd luft jämnt runt patienten genom en engångsfilt — utan brännskaderisken som förknippas med elektriska värmedynor. Studier visar att uppvärmda infusionsvätskor ensamma inte förhindrar hypotermi hos hundar eller katter. Passiv isolering (filtar, strumpor) minskar värmeförlusten med bara 30 %. Aktiv varmluftsvärme kombinerat med varma vätskor och isolering är den mest effektiva kombinationen.',
    en: 'At our clinic, we have three active forced air warmers, which are considered the gold standard of warming methods. The device blows heated air evenly around the patient through a disposable blanket — without the burn risk associated with electric heating pads. Studies show that heated IV fluids alone do not prevent hypothermia in dogs or cats. Passive insulation (blankets, socks) reduces heat loss by only 30%. Active forced air warming combined with warm fluids and insulation is the most effective combination.'
  },
  'article.hypothermia.recovery.title': {
    fi: 'Toipumisvaiheen valvonta',
    sv: 'Övervakning under återhämtningen',
    en: 'Recovery Phase Monitoring'
  },
  'article.hypothermia.recovery.text': {
    fi: 'Klinikallamme jatkamme aktiivista lämmitystä ja valvontaa koko toipumisen ajan. Seuraamme lemmikin elintoimintoja kunnes potilas on hereillä ja normaalin kehonlämpötilan saavuttanut.',
    sv: 'Majoriteten av anestesidödsfallen inträffar under återhämtningsfasen — hos hundar 47–81 % och hos katter 61–75 %. På vår klinik fortsätter vi aktiv uppvärmning och övervakning under hela återhämtningen. Vi övervakar temperatur, syremättnad och blodtryck tills patienten är helt vaken och har uppnått normal kroppstemperatur.',
    en: 'The majority of anesthesia-related deaths occur during the recovery phase — 47–81% in dogs and 61–75% in cats. At our clinic, we continue active warming and monitoring throughout recovery. We monitor temperature, oxygen saturation, and blood pressure until the patient is fully awake and has reached normal body temperature.'
  },
  'article.hypothermia.safety.title': {
    fi: 'Turvallinen lämmitys',
    sv: 'Säker uppvärmning',
    en: 'Safe Warming'
  },
  'article.hypothermia.safety.text': {
    fi: 'Ihmisille tarkoitetut sähköiset lämpötyynyt ja kuumavesipullot voivat olla vaarallisia nukutetuille eläimille — potilas ei voi siirtyä pois liian kuumalta pinnalta eikä ilmaista kipua. Dokumentoituja palovammatapauksia on raportoitu. AAHA:n ohjeiden mukaan lämpötyynyjä ja häkkikuivaimia ei saa käyttää nukutettujen potilaiden lämmitykseen. Puhallinkuivaimet ja tarkoitukseen suunnitellut johtolämpömatot ovat turvallisimmat vaihtoehdot.',
    sv: 'Elektriska värmedynor och varmvattenflaskor avsedda för människor är farliga för sövda djur — patienten kan inte flytta sig från en för varm yta eller uttrycka smärta. Dokumenterade brännskadefall har rapporterats. Enligt AAHA:s riktlinjer får värmedynor inte användas för uppvärmning av sövda patienter. Varmluftsvämare och specialutformade konduktiva värmemattor är de säkraste alternativen.',
    en: 'Electric heating pads and hot water bottles designed for humans are dangerous for anesthetized animals — the patient cannot move away from an overheated surface or express pain. Documented burn cases have been reported. According to AAHA guidelines, heating pads and cage dryers must not be used for warming anesthetized patients. Forced air warmers and purpose-designed conductive warming mats are the safest options.'
  },

  // --- Article 24: Anesthesia Safety ---
  'article.anesthesia.tag': {
    fi: 'Anestesia',
    sv: 'Anestesi',
    en: 'Anesthesia'
  },
  'article.anesthesia.title': {
    fi: 'Anestesiaturvallisuus — tilastot, riskit ja miten minimoimme ne',
    sv: 'Anestesisäkerhet — statistik, risker och hur vi minimerar dem',
    en: 'Anesthesia Safety — Statistics, Risks, and How We Minimize Them'
  },
  'article.anesthesia.intro': {
    fi: 'Anestesia on välttämätön osa kirurgiaa, hammashoitoa ja monia diagnostisia toimenpiteitä. Monet omistajat pelkäävät nukutusta — ymmärrettävästi. Todellinen riski on kuitenkin nykyaikaisella valvonnalla ja protokollilla erittäin matala. Laaja CEPSAF-tutkimus (Brodbelt ym. 2008, lähes 100 000 koiraa ja 79 000 kissaa) osoitti anestesiaan liittyväksi kuolleisuudeksi 0,17 % koirilla ja 0,24 % kissoilla — terveillä potilailla vain 0,05 % (1/1 849) koirilla ja 0,11 % (1/895) kissoilla.',
    sv: 'Anestesi är en nödvändig del av kirurgi, tandvård och många diagnostiska ingrepp. Många djurägare fruktar narkos — förståeligt. Den faktiska risken är dock med modern övervakning och protokoll mycket låg. En omfattande CEPSAF-studie (Brodbelt m.fl. 2008, nästan 100 000 hundar och 79 000 katter) visade en anestesirelaterad dödlighet på 0,17 % hos hundar och 0,24 % hos katter — hos friska patienter bara 0,05 % (1/1 849) hos hundar och 0,11 % (1/895) hos katter.',
    en: 'Anesthesia is an essential part of surgery, dentistry, and many diagnostic procedures. Many owners fear anesthesia — understandably so. However, the actual risk with modern monitoring and protocols is very low. A large CEPSAF study (Brodbelt et al. 2008, nearly 100,000 dogs and 79,000 cats) showed anaesthesia-related mortality of 0.17% in dogs and 0.24% in cats — in healthy patients only 0.05% (1 in 1,849) in dogs and 0.11% (1 in 895) in cats.'
  },
  'article.anesthesia.risk.title': {
    fi: 'Riskitekijät ja ASA-luokitus',
    sv: 'Riskfaktorer och ASA-klassificering',
    en: 'Risk Factors and ASA Classification'
  },
  'article.anesthesia.risk.text': {
    fi: 'Suurin yksittäinen riskitekijä on potilaan terveydentila. Eläinlääketieteessä käytetään ASA-luokitusta (I–V), joka arvioi potilaan kunnon ennen anestesiaa. Terveillä potilailla (ASA I–II) riski on erittäin matala. Sairailla potilailla (ASA III tai enemmän) riski on selvästi suurempi kuin terveillä. Muita riskitekijöitä ovat päivystysleikkaus, pitkä anestesia, brakykefaaliset rodut (lyhytkuonoiset) ja korkea tai hyvin nuori ikä. Brakykefaalisilla koirilla anestesian jälkeisten komplikaatioiden riski on kohonnut ahtaiden hengitysteiden vuoksi.',
    sv: 'Den enskilt största riskfaktorn är patientens hälsotillstånd. Inom veterinärmedicin används ASA-klassificeringen (I–V), som bedömer patientens tillstånd före anestesi. Hos friska patienter (ASA I–II) är risken mycket låg. Hos sjuka patienter (ASA III eller högre) är risken klart högre än hos friska. Andra riskfaktorer är akutkirurgi, lång anestesi, brachycefala raser (trubbnosiga) och hög eller mycket ung ålder. Hos brachycefala hundar är risken för postanestesikomplikationer förhöjd på grund av trånga luftvägar.',
    en: 'The single largest risk factor is the patient\'s health status. In veterinary medicine, the ASA classification (I–V) is used to assess patient condition before anesthesia. In healthy patients (ASA I–II), the risk is very low. In sick patients (ASA III or higher), the risk is clearly higher than in healthy ones. Other risk factors include emergency surgery, prolonged anesthesia, brachycephalic breeds (short-nosed), and very old or very young age. Brachycephalic dogs have an elevated risk of post-anesthetic complications due to their narrow airways.'
  },
  'article.anesthesia.monitoring.title': {
    fi: 'Moderni valvonta pelastaa henkiä',
    sv: 'Modern övervakning räddar liv',
    en: 'Modern Monitoring Saves Lives'
  },
  'article.anesthesia.monitoring.text': {
    fi: 'Valvomme jokaista anestesiapotilasta tarkasti. Käytössämme on EKG sydämen rytmin seurantaan, pulssioksimetri happikyllästeisyyden mittaamiseen, kapnografi hiilidioksidin seuraamiseen, lämpötilaseuranta sekä ventilaattorit hengityksen tukemiseen. Auskultoinnissa kuuntelemme sydämen huolellisesti ennen toimenpidettä ja sen aikana. Tärkeintä on kuitenkin koulutettu henkilö, joka tulkitsee monitoreja ja reagoi muutoksiin — automaattiset laitteet eivät korvaa valpasta ammattilaista.',
    sv: 'Vi övervakar varje anestesipatient noggrant. Vi har tillgång till EKG för hjärtrytmövervakning, pulsoximeter för syremättnad, kapnograf för koldioxidövervakning, temperaturövervakning samt ventilatorer för andningsstöd. Vi auskulterar hjärtat noggrant före och under ingreppet. Det viktigaste är dock en utbildad person som tolkar monitorerna och reagerar på förändringar — automatiska apparater ersätter inte en vaksam yrkesperson.',
    en: 'We closely monitor every patient under anesthesia. We have ECG for heart rhythm monitoring, pulse oximetry for oxygen saturation, capnography for carbon dioxide monitoring, temperature monitoring, and ventilators for respiratory support. We carefully auscultate the heart before and during the procedure. Most importantly, however, is a trained person who interprets the monitors and responds to changes — automated devices do not replace a vigilant professional.'
  },
  'article.anesthesia.balanced.title': {
    fi: 'Balansoitu anestesia ja kivunhallinta',
    sv: 'Balanserad anestesi och smärthantering',
    en: 'Balanced Anesthesia and Pain Management'
  },
  'article.anesthesia.balanced.text': {
    fi: 'Nykyaikainen anestesia perustuu monimuotoiseen lähestymistapaan: yhdistämällä useita lääkeaineita pienillä annoksilla saadaan turvallisempi kokonaisuus kuin yhdellä lääkkeellä suurella annoksella. Käytämme induktiossa laskimonsisäistä anestesiaa (propofoli tai alfaksaloni), ylläpidossa inhalaatioanestesiaa (isofluraani tai sevofluraani) ja kivunhallinnassa opioideja, ketamiinia ja paikallispuudutuksia. Tämä balansoitu protokolla vähentää jokaisen yksittäisen lääkkeen annosta ja sen sivuvaikutuksia — erityisesti sydän- ja verenkiertolamaa. Klinikallamme on käytössä kaksi ventilaattoria turvallisen anestesian varmistamiseksi.',
    sv: 'Modern anestesi bygger på ett multimodalt tillvägagångssätt: genom att kombinera flera läkemedel i låga doser uppnås en säkrare helhet än med ett enda läkemedel i hög dos. Vi använder intravenös anestesi vid induktion (propofol eller alfaxalon), inhalationsanestesi vid underhåll (isofluran eller sevofluran) och opioider, ketamin och lokalbedövning för smärthantering. Detta balanserade protokoll minskar dosen av varje enskilt läkemedel och dess biverkningar — särskilt kardiovaskulär depression. På vår klinik har vi två ventilatorer för att säkerställa säker anestesi.',
    en: 'Modern anesthesia is based on a multimodal approach: by combining multiple drugs at low doses, a safer outcome is achieved than with a single drug at a high dose. We use intravenous anesthesia for induction (propofol or alfaxalone), inhalation anesthesia for maintenance (isoflurane or sevoflurane), and opioids, ketamine, and local anesthetics for pain management. This balanced protocol reduces the dose of each individual drug and its side effects — especially cardiovascular depression. Our clinic has two ventilators to ensure safe anesthesia.'
  },
  'article.anesthesia.vatinoxan.title': {
    fi: 'Suomalainen innovaatio — vatinoksaani',
    sv: 'Finsk innovation — vatinoxan',
    en: 'Finnish Innovation — Vatinoxan'
  },
  'article.anesthesia.vatinoxan.text': {
    fi: 'Eläinanestesiologi Vilhelmiina Huuskonen korostaa Helsingin yliopiston artikkelissa (2024), että eläinten kuolleisuus anestesian aikana on yleisempää kuin ihmisillä ja että monimutkaisissa leikkauksissa tulisi olla paikalla eläinanestesiologian erikoislääkäri. Huuskonen väitteli tohtoriksi juuri tästä aiheesta: hänen tutkimuksensa osoitti, että vatinoksaani (Zenalpha) tekee sedaatiosta merkittävästi turvallisempaa. Helsingin yliopistossa professori Outi Vainion johtama tutkimusryhmä kehitti vatinoksaanin — lääkeaineen, joka estää alfa-2-agonistien (medetomidiini, deksmedetomidiini) haitalliset sydänvaikutukset (bradykardia, kohonnut verenpaine) ylittämättä veri-aivoestettä. Sedaatio ja kivunlievitys säilyvät, mutta sydämeen kohdistuvat haitat vähenevät merkittävästi. EMA hyväksyi lääkkeen 2021 ja FDA 2022.',
    sv: 'Veterinäranestesiologen Vilhelmiina Huuskonen betonar i en artikel från Helsingfors universitet (2024) att djurens dödlighet under anestesi är vanligare än hos människor och att en specialist i djuranestesiologi bör vara närvarande vid komplicerade operationer. Huuskonen disputerade på just detta ämne: hennes forskning visade att vatinoxan (Zenalpha) gör sederingen betydligt säkrare. Vid Helsingfors universitet utvecklade forskargruppen ledd av professor Outi Vainio vatinoxan — ett läkemedel som blockerar de skadliga kardiovaskulära effekterna av alfa-2-agonister (medetomidin, dexmedetomidin) — bradykardi och förhöjt blodtryck — utan att passera blod-hjärnbarriären. Sederingen och smärtlindringen bevaras, men de kardiovaskulära biverkningarna minskar avsevärt. EMA godkände läkemedlet 2021 och FDA 2022.',
    en: 'Veterinary anesthesiologist Vilhelmiina Huuskonen emphasizes in a University of Helsinki article (2024) that animal mortality during anesthesia is more common than in humans, and that a specialist in veterinary anesthesiology should be present during complex surgeries. Huuskonen defended her PhD on this very topic: her research demonstrated that vatinoxan (Zenalpha) makes sedation significantly safer. At the University of Helsinki, the research group led by Professor Outi Vainio developed vatinoxan — a drug that blocks the harmful cardiovascular effects of alpha-2 agonists (medetomidine, dexmedetomidine) — bradycardia and elevated blood pressure — without crossing the blood-brain barrier. Sedation and pain relief are preserved, while cardiovascular side effects are significantly reduced. EMA approved the drug in 2021 and FDA in 2022.'
  },
  'article.anesthesia.preop.title': {
    fi: 'Ennen anestesiaa',
    sv: 'Före anestesi',
    en: 'Before Anesthesia'
  },
  'article.anesthesia.preop.text': {
    fi: 'Jokainen potilas arvioidaan yksilöllisesti ennen anestesiaa. Esitutkimus sisältää kliinisen tutkimuksen, sydämen ja keuhkojen auskultaation sekä verikokeet (täydellinen verenkuva ja biokemia). Verikokeet voivat paljastaa piilevää munuais- tai maksasairautta, anemiaa tai elektrolyyttihäiriöitä, jotka vaikuttavat lääkeaineiden valintaan ja annosteluun. Jos löydökset ovat merkittäviä, toimenpide voidaan siirtää potilaan turvallisuuden vuoksi.',
    sv: 'Varje patient bedöms individuellt före anestesi. Förundersökningen inkluderar klinisk undersökning, auskultation av hjärta och lungor samt blodprover (fullständig blodräkning och biokemi). Blodprover kan avslöja dold njur- eller leversjukdom, anemi eller elektrolytrubbningar som påverkar val och dosering av läkemedel. Om fynden är betydande kan ingreppet skjutas upp för patientens säkerhet.',
    en: 'Every patient is individually assessed before anesthesia. The pre-anesthetic evaluation includes a clinical examination, auscultation of the heart and lungs, and blood tests (complete blood count and biochemistry). Blood tests can reveal hidden kidney or liver disease, anemia, or electrolyte imbalances that affect drug selection and dosing. If findings are significant, the procedure may be postponed for the patient\'s safety.'
  },

  // Article 25: Veterinary Nurse
  'article.vetnurse.title': {
    fi: 'Klinikkaeläinhoitaja — potilasturvallisuuden kulmakivi',
    sv: 'Klinikdjurskötare — hörnstenen i patientsäkerhet',
    en: 'Veterinary Nurse — The Cornerstone of Patient Safety'
  },
  'article.vetnurse.intro': {
    fi: 'Eläinlääkäri ei voi samanaikaisesti leikata ja valvoa potilaan elintoimintoja. Koulutettu klinikkaeläinhoitaja on se henkilö, joka seuraa monitoreja, reagoi muutoksiin ja huolehtii potilaasta leikkausta ennen, sen aikana ja sen jälkeen. Tutkimusten mukaan koulutetun hoitajan läsnäolo anestesian aikana on tärkein yksittäinen muutettavissa oleva tekijä kuolleisuuden vähentämisessä.',
    sv: 'En veterinär kan inte samtidigt operera och övervaka patientens vitalfunktioner. En utbildad klinikdjurskötare är den person som övervakar monitorerna, reagerar på förändringar och tar hand om patienten före, under och efter operationen. Forskning visar att en utbildad skötares närvaro under anestesi är den enskilt viktigaste påverkbara faktorn för att minska dödligheten.',
    en: 'A veterinarian cannot simultaneously perform surgery and monitor the patient\'s vital functions. A trained veterinary nurse is the person who watches the monitors, responds to changes, and cares for the patient before, during, and after surgery. Research shows that the presence of a trained nurse during anesthesia is the single most important modifiable factor in reducing mortality.'
  },
  'article.vetnurse.role.title': {
    fi: 'Hoitajan rooli klinikalla',
    sv: 'Skötarens roll på kliniken',
    en: 'The Nurse\'s Role at the Clinic'
  },
  'article.vetnurse.role.text': {
    fi: 'Klinikkaeläinhoitaja valmistelee potilaan leikkaukseen: asettaa suonikanyylin, antaa esilääkityksen ja valmistelee leikkausalueen. Leikkauksen aikana hoitaja valvoo anestesiaa — seuraa sydämen rytmiä, veren happisaturaatiota, kapnografiaa ja lämpötilaa. Steriilissä avustamisessa hoitaja ojentaa instrumentit, ylläpitää steriiliä aluetta ja huomaa mahdolliset kontaminaatiot. Toimenpiteen jälkeen hoitaja valvoo toipumista, joka on kriittisin vaihe: yli puolet anestesiakomplikaatioista tapahtuu heräämövaiheessa.',
    sv: 'Klinikdjurskötaren förbereder patienten för operation: lägger in venkateter, administrerar premedicinering och förbereder operationsområdet. Under operationen övervakar skötaren anestesin — följer hjärtrytm, syremättnad, kapnografi och temperatur. Vid steril assistans räcker skötaren instrument, upprätthåller det sterila fältet och uppmärksammar eventuella kontaminationer. Efter ingreppet övervakar skötaren återhämtningen, som är den mest kritiska fasen: över hälften av anestesikomplikationerna inträffar under uppvaknandet.',
    en: 'The veterinary nurse prepares the patient for surgery: placing an IV catheter, administering premedication, and preparing the surgical site. During surgery, the nurse monitors anesthesia — tracking heart rhythm, oxygen saturation, capnography, and temperature. In sterile assistance, the nurse passes instruments, maintains the sterile field, and identifies potential contamination. After the procedure, the nurse monitors recovery, which is the most critical phase: over half of anesthesia complications occur during the wake-up period.'
  },
  'article.vetnurse.evidence.title': {
    fi: 'Mitä tutkimus sanoo',
    sv: 'Vad forskningen säger',
    en: 'What Research Shows'
  },
  'article.vetnurse.evidence.text': {
    fi: 'CEPSAF-tutkimus (Brodbelt ym., 117 klinikkaa, ~185 000 eläintä) osoitti, että koulutetun hoitajan puuttuminen anestesian valvonnasta oli riskitekijä kuolemalle. Yli 50 % anestesiakuolemista tapahtui kolmen tunnin sisällä toimenpiteen päättymisestä — heräämövaiheessa. Banfield-tutkimus (2022) osoitti, että laatustandardien käyttöönotto, mukaan lukien koulutettu henkilökunta, vähensi anestesiakuolleisuutta 16 % kuudessa kuukaudessa. Redondo ym. (2024) vahvistivat, että 81 % anestesiakuolemista tapahtui postoperatiivisesti.',
    sv: 'CEPSAF-studien (Brodbelt m.fl., 117 kliniker, ~185 000 djur) visade att avsaknaden av en utbildad skötare vid anestesiövervakning var en riskfaktor för dödsfall. Över 50 % av anestesidödsfallen inträffade inom tre timmar efter ingreppets slut — under uppvakningsfasen. Banfield-studien (2022) visade att införandet av kvalitetsstandarder, inklusive utbildad personal, minskade anestesidödligheten med 16 % på sex månader. Redondo m.fl. (2024) bekräftade att 81 % av anestesidödsfallen inträffade postoperativt.',
    en: 'The CEPSAF study (Brodbelt et al., 117 clinics, ~185,000 animals) demonstrated that the absence of a trained nurse monitoring anesthesia was a risk factor for death. Over 50% of anesthesia deaths occurred within three hours of the procedure ending — during the recovery phase. The Banfield study (2022) showed that implementing quality standards, including trained personnel, reduced anesthesia mortality by 16% within six months. Redondo et al. (2024) confirmed that 81% of anesthesia deaths occurred postoperatively.'
  },
  'article.vetnurse.education.title': {
    fi: 'Koulutus Suomessa',
    sv: 'Utbildning i Finland',
    en: 'Education in Finland'
  },
  'article.vetnurse.education.text': {
    fi: 'Suomessa klinikkaeläinhoitajan koulutus on kolmiportainen. Perustutkinto (eläintenhoitaja, 2–3 vuotta) antaa perustiedot eläinten hoidosta. Ammattitutkinto (klinikkaeläinhoitaja, ~1,5 vuotta) keskittyy klinikkatyöhön: anestesian valvontaan, leikkausavustamiseen, laboratoriotyöhön ja röntgenkuvaukseen. Korkein taso on erikoisammattitutkinto (EAT), jossa voi syventää osaamistaan esimerkiksi anestesiassa, akuutti- ja tehohoidossa, sisätautien hoitotyössä tai diagnostisessa kuvantamisessa. EAT edellyttää vuosien kliinistä kokemusta.',
    sv: 'I Finland är utbildningen för klinikdjurskötare trestegsbaserad. Grundexamen (djurskötare, 2–3 år) ger grundläggande kunskaper i djurvård. Yrkesexamen (klinikdjurskötare, ~1,5 år) fokuserar på klinikarbete: anestesiövervakning, operationsassistans, laboratoriearbete och röntgen. Den högsta nivån är specialyrkesexamen (EAT), där man kan fördjupa sin kompetens inom till exempel anestesi, akut- och intensivvård, internmedicinsk omvårdnad eller bilddiagnostik. EAT kräver flera års klinisk erfarenhet.',
    en: 'In Finland, veterinary nurse education has three tiers. The basic qualification (animal care worker, 2–3 years) provides foundational knowledge in animal care. The vocational qualification (clinical veterinary nurse, ~1.5 years) focuses on clinic work: anesthesia monitoring, surgical assistance, laboratory work, and radiography. The highest level is the advanced vocational qualification (EAT), where one can deepen skills in anesthesia, acute and intensive care, internal medicine nursing, or diagnostic imaging. The EAT requires years of clinical experience.'
  },
  'article.vetnurse.jenni.title': {
    fi: 'Jenni Ruotsala — johtava klinikkaeläinhoitajamme',
    sv: 'Jenni Ruotsala — vår ledande klinikdjurskötare',
    en: 'Jenni Ruotsala — Our Head Veterinary Nurse'
  },
  'article.vetnurse.jenni.text': {
    fi: 'Johtava klinikkaeläinhoitajamme Jenni Ruotsala on työskennellyt klinikallamme vuodesta 2014. Hänellä on klinikkaeläinhoitajan koulutuksen kaikki kolme tasoa: perustutkinto (2010), ammattitutkinto (2018) ja erikoisammattitutkinto anestesiapainotteisena (2025) — korkein Suomessa saatavilla oleva ammatillinen pätevyys. Lisäksi Jenni on suorittanut hammashoitokoulutuksen Ruotsissa Accesia Academyssa.',
    sv: 'Vår ledande klinikdjurskötare Jenni Ruotsala har arbetat på vår klinik sedan 2014. Hon har alla tre nivåerna av klinikdjurskötarutbildning: grundexamen (2010), yrkesexamen (2018) och specialyrkesexamen med inriktning på anestesi (2025) — den högsta tillgängliga yrkeskvalifikationen i Finland. Dessutom har Jenni genomgått tandvårdsutbildning i Sverige vid Accesia Academy.',
    en: 'Our head veterinary nurse Jenni Ruotsala has worked at our clinic since 2014. She holds all three levels of Finnish veterinary nurse qualifications: basic qualification (2010), vocational qualification (2018), and advanced vocational qualification with anesthesia focus (2025) — the highest professional qualification available in Finland. Additionally, Jenni has completed dental training in Sweden at Accesia Academy.'
  },

  // --- FAQ (GEO/AEO phase 2) — homepage FAQ; drives both visible text and FAQPage JSON-LD ---
  'faq.title': { fi: 'Usein kysytyt kysymykset', sv: 'Vanliga frågor', en: 'Frequently asked questions' },
  'faq.home.q1': {
    fi: 'Missä Eläinklinikka Saari sijaitsee?',
    sv: 'Var ligger Djurklinik Saari?',
    en: 'Where is Eläinklinikka Saari located?'
  },
  'faq.home.a1': {
    fi: 'Sijaitsemme osoitteessa Gerbyntie 18, 65230 Vaasa, Gerbyn kaupunginosassa. Meille on hyvät kulkuyhteydet myös lähikunnista.',
    sv: 'Djurklinik Saari ligger på Gerbyvägen 18, 65230 Vasa, i stadsdelen Gerby. Det är lätt att nå oss även från grannkommunerna.',
    en: 'We are at Gerbyntie 18, 65230 Vaasa, in the Gerby district. We are easy to reach from the surrounding municipalities too.'
  },
  'faq.home.q2': {
    fi: 'Mitkä ovat Eläinklinikka Saaren aukioloajat?',
    sv: 'Vilka öppettider har Djurklinik Saari?',
    en: "What are Eläinklinikka Saari's opening hours?"
  },
  'faq.home.a2': {
    fi: 'Klinikka on avoinna maanantaista perjantaihin klo 7:45–17. Viikonloppuisin klinikka on suljettu. Varaamme päivittäin akuuttiaikoja kiireellisiä tapauksia varten.',
    sv: 'Kliniken är öppen måndag–fredag kl. 7:45–17 och stängd på veckoslut. Vi reserverar dagligen akuttider för brådskande fall.',
    en: 'The clinic is open Monday to Friday 7:45–17 and closed at weekends. We reserve acute slots every day for urgent cases.'
  },
  'faq.home.q3': {
    fi: 'Onko teillä päivystystä iltaisin ja viikonloppuisin?',
    sv: 'Har ni jour på kvällar och veckoslut?',
    en: 'Do you have emergency service in the evenings and at weekends?'
  },
  'faq.home.a3': {
    fi: 'Iltaisin ja viikonloppuisin ota yhteyttä Pohjoisen päivystysalueen numeroon 0600 399 299. Arkisin klo 7:45–17 meillä on päivittäin akuuttiaikoja.',
    sv: 'På kvällar och veckoslut ringer du Norra jourområdet på 0600 399 299. Vardagar kl. 7:45–17 har vi dagligen akuttider.',
    en: 'In the evenings and at weekends, call the Northern emergency-area number 0600 399 299. On weekdays 7:45–17 we have acute slots available daily.'
  },
  'faq.home.q4': {
    fi: 'Mitä eläimiä hoidatte?',
    sv: 'Vilka djur behandlar ni?',
    en: 'Which animals do you treat?'
  },
  'faq.home.a4': {
    fi: 'Hoidamme koiria, kissoja sekä muita pieneläimiä, kuten kaneja ja jyrsijöitä. Olemme virallisesti Cat Friendly -sertifioitu klinikka.',
    sv: 'Vi behandlar hundar, katter och smådjur som kaniner och gnagare. Vi är en officiellt Cat Friendly-certifierad klinik.',
    en: 'We treat dogs, cats and other small pets such as rabbits and rodents. We are an officially Cat Friendly certified clinic.'
  },
  'faq.home.q5': {
    fi: 'Miten varaan ajan eläinlääkärille?',
    sv: 'Hur bokar jag tid hos veterinären?',
    en: 'How do I book an appointment with the vet?'
  },
  'faq.home.a5': {
    fi: 'Voit varata ajan verkossa tai soittamalla numeroon 06 321 7300. Lähetettä ei tarvita.',
    sv: 'Du kan boka tid via vår webbtidsbokning eller genom att ringa oss på 06 321 7300. Ingen remiss behövs.',
    en: 'You can book online or by calling 06 321 7300. No referral is needed.'
  },
  'faq.home.q6': {
    fi: 'Millä kielillä palvelette?',
    sv: 'På vilka språk betjänar ni?',
    en: 'What languages do you serve in?'
  },
  'faq.home.a6': {
    fi: 'Palvelemme sujuvasti suomeksi, ruotsiksi ja englanniksi.',
    sv: 'Vi betjänar på finska, svenska och engelska.',
    en: 'We serve in Finnish, Swedish and English.'
  }

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
// Lang is determined by URL path / <html lang>, NOT localStorage. Each lang has its own URL,
// so visiting /sv/ should always render SV regardless of a stale localStorage value from /en/.
// Order: explicit ?lang= override > URL path prefix > <html lang> > localStorage > 'fi'.
function detectLangFromPath() {
  const p = window.location.pathname;
  if (p === '/sv' || p.startsWith('/sv/')) return 'sv';
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  return 'fi';
}
let currentLang = new URLSearchParams(window.location.search).get('lang')
  || detectLangFromPath()
  || (document.documentElement.lang || '').toLowerCase().slice(0, 2)
  || localStorage.getItem('preferredLanguage')
  || 'fi';

function setLanguage(lang) {
  currentLang = lang;
  try { localStorage.setItem('preferredLanguage', lang); } catch(e) {}

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

  // Update placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key] && translations[key][lang]) {
      el.placeholder = translations[key][lang];
    }
  });

  // Update language toggle buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update service card links for current language
  document.querySelectorAll('[data-href-fi]').forEach(el => {
    const href = el.getAttribute('data-href-' + lang);
    if (href) el.setAttribute('href', href);
  });

  // Rewrite article links to language-specific paths so clicking an article preserves language
  const articleBaseMap = { fi: '/articles/', en: '/en/articles/', sv: '/sv/artiklar/' };
  // Map from FI slug to localized slug. Keeps SPA-rewritten links on localized URLs.
  const articleSlugMap = {
    'tta-leikkaus': { sv: 'tta-operation', en: 'tta-surgery' },
    'video-otoskopia': { sv: 'video-otoskopi', en: 'video-otoscopy' },
    'koiran-korvatulehdus': { sv: 'oroninflammation-hund', en: 'dog-ear-infection' },
    'kipulääkeinfuusio': { sv: 'smartlindringsinfusion', en: 'pain-relief-infusion' },
    'ripuli': { sv: 'diarre', en: 'diarrhoea' },
    'avoin-valtimotiehyt-pda': { sv: 'oppen-ductus-arteriosus-pda', en: 'patent-ductus-arteriosus-pda' },
    'hampaiden-harjaus': { sv: 'tandborstning', en: 'tooth-brushing' },
    'viljaton-ruoka': { sv: 'spannmalsfri-mat', en: 'grain-free-food' },
    'yksityinen-klinikka': { sv: 'privat-klinik', en: 'independent-clinic' },
    'ruoka-allergiat': { sv: 'foderallergier', en: 'food-allergies' },
    'kilpirauhasen-liikatoiminta': { sv: 'hypertyreos-katt', en: 'hyperthyroidism' },
    'munuaisten-vajaatoiminta': { sv: 'njursvikt', en: 'kidney-disease' },
    'kyynpurema': { sv: 'huggormsbett', en: 'snake-bite' },
    'kohtutulehdus': { sv: 'livmoderinflammation', en: 'pyometra' },
    'siili': { sv: 'igelkott', en: 'hedgehog' },
    'kissaystävällinen-klinikka': { sv: 'kattvanlig-klinik', en: 'cat-friendly-clinic' },
    'puhkeamattomat-hampaat': { sv: 'icke-framvaxta-tander', en: 'unerupted-teeth' },
    'gastroskopia': { sv: 'gastroskopi', en: 'gastroscopy' },
    'hammasresorptio': { sv: 'tandresorption', en: 'tooth-resorption' },
    'rokotukset': { sv: 'vaccinationsguide', en: 'vaccinations-guide' },
    'ibd-lymfooma': { sv: 'ibd-lymfom', en: 'ibd-lymphoma' },
    'hypotermia': { sv: 'hypotermi', en: 'hypothermia' },
    'anestesiaturvallisuus': { sv: 'anestesisakerhet', en: 'anaesthesia-safety' },
    'klinikkaeläinhoitaja': { sv: 'klinikdjurskotare', en: 'veterinary-nurse' },
  };
  // Reverse lookup: any localized slug → FI slug
  const slugToFi = {};
  Object.keys(articleSlugMap).forEach(fi => {
    slugToFi[fi] = fi;
    Object.values(articleSlugMap[fi]).forEach(s => { slugToFi[s] = fi; });
  });
  document.querySelectorAll('a[href]').forEach(a => {
    // Skip the language toggle bar — those links must keep their fixed targets
    if (a.closest('.lang-toggle')) return;
    let url;
    try { url = new URL(a.href); } catch(e) { return; }
    if (url.origin !== window.location.origin) return;
    const m = url.pathname.match(/^\/(?:articles|en\/articles|sv\/artiklar)\/([^\/]+)\.html$/);
    if (m) {
      const currentSlug = m[1];
      const fiSlug = slugToFi[currentSlug] || currentSlug;
      let targetSlug = fiSlug;
      if (lang !== 'fi' && articleSlugMap[fiSlug] && articleSlugMap[fiSlug][lang]) {
        targetSlug = articleSlugMap[fiSlug][lang];
      }
      a.setAttribute('href', articleBaseMap[lang] + targetSlug + '.html' + url.search + url.hash);
    }
  });

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
      // All groups are open by default (prices visible + indexable); click toggles just this one
      header.parentElement.classList.toggle('open');
    });
  });

  // Deep link: /hinnasto/#category-id opens and scrolls to that category
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target && target.classList.contains('price-category')) {
      target.classList.add('open');
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }
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
  const mainSections = document.querySelectorAll('#main-content > .notice-banner, #main-content > section:not(#articles), #main-content > .hero');
  if (articlesSection) articlesSection.style.display = 'none';
  mainSections.forEach(el => el.style.display = '');
}

function toggleArticles() {
  const articlesSection = document.getElementById('articles');
  if (!articlesSection) return;
  // On the standalone /artikkelit/ index page, the articles section IS the page (no hero/other sections).
  // Toggling it would hide the whole page — bail.
  if (!document.querySelector('#main-content > .hero')) return;
  const mainSections = document.querySelectorAll('#main-content > .notice-banner, #main-content > section:not(#articles), #main-content > .hero');
  const isShowing = articlesSection.style.display !== 'none';

  if (isShowing) {
    articlesSection.style.display = 'none';
    mainSections.forEach(el => el.style.display = '');
    history.pushState({ page: 'main' }, '', window.location.pathname);
  } else {
    mainSections.forEach(el => el.style.display = 'none');
    articlesSection.style.display = '';
    filterArticles('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLanguage(currentLang);
    history.pushState({ page: 'articles' }, '', window.location.pathname + '#articles');
  }
}

// --- Article Category Filters & Search ---
let currentArticleFilter = 'all';

function filterArticles(category) {
  currentArticleFilter = category;
  const searchInput = document.getElementById('article-search-input');
  if (searchInput) searchInput.value = '';
  applyArticleFilters();
}

function searchArticles(query) {
  applyArticleFilters(query);
}

function applyArticleFilters(searchQuery) {
  const articles = document.querySelectorAll('#articles .article-card[data-category]');
  const buttons = document.querySelectorAll('.filter-btn');
  const query = (searchQuery || '').toLowerCase().trim();

  buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === currentArticleFilter));

  let visibleCount = 0;
  articles.forEach(article => {
    const matchesCategory = currentArticleFilter === 'all' || article.dataset.category === currentArticleFilter;
    let matchesSearch = true;
    if (query) {
      const title = article.querySelector('h3');
      const content = article.querySelector('.article-content');
      const text = ((title ? title.textContent : '') + ' ' + (content ? content.textContent : '')).toLowerCase();
      matchesSearch = text.includes(query);
    }
    if (matchesCategory && matchesSearch) {
      article.classList.remove('filter-hidden');
      visibleCount++;
    } else {
      article.classList.add('filter-hidden');
    }
  });

  // Show/hide no results message
  let noResults = document.getElementById('article-no-results');
  if (visibleCount === 0 && query) {
    if (!noResults) {
      noResults = document.createElement('p');
      noResults.id = 'article-no-results';
      noResults.className = 'article-no-results';
      const filtersDiv = document.querySelector('.article-filters');
      filtersDiv.parentNode.insertBefore(noResults, filtersDiv.nextSibling);
    }
    const t = translations['articles.search.noresults'];
    noResults.textContent = t ? (t[currentLang] || t.fi) : 'No results found';
    noResults.style.display = '';
  } else if (noResults) {
    noResults.style.display = 'none';
  }
}

// Add the clinic logo to the top of the article for the printout (hidden on
// screen via CSS, shown only in @media print).
function ensurePrintLogo(article) {
  if (!article || article.querySelector('.print-logo')) return;
  const logo = document.createElement('img');
  logo.className = 'print-logo';
  logo.src = '/images/logo-horizontal.png';
  logo.alt = 'Eläinklinikka Saari';
  article.insertBefore(logo, article.firstChild);
}

function printArticle(article) {
  if (!article) return;
  ensurePrintLogo(article);
  article.classList.add('printing');
  window.print();
  article.classList.remove('printing');
}

// Print the full article from a listing/teaser card (whose inline content is only
// an excerpt) WITHOUT navigating away. The site's CSP is `frame-ancestors 'none'`
// so an iframe won't render; instead we fetch the full article HTML (allowed by
// connect-src 'self'), inject its .article-card into the current page, and print.
//
// Key constraint: window.print() must be called SYNCHRONOUSLY inside the click
// handler — Chrome ignores print() invoked from an async callback / setTimeout /
// load handler. So we PREFETCH the article HTML ahead of time and, on click, do
// the inject + print with no async gap.
const _articleHtmlCache = {};

function prefetchArticleHtml(href) {
  if (!href || _articleHtmlCache[href] !== undefined) return;
  _articleHtmlCache[href] = null; // in-flight marker
  fetch(href, { credentials: 'same-origin' })
    .then(res => res.text())
    .then(html => { _articleHtmlCache[href] = html; })
    .catch(() => { delete _articleHtmlCache[href]; });
}

// Build the hidden print holder from article HTML and return it (synchronous).
function buildPrintHolder(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const card = doc.querySelector('#main-content .articles-section .article-card') ||
               doc.querySelector('.article-card');
  if (!card) return null;
  const old = document.getElementById('print-injected');
  if (old) old.remove();
  const holder = document.createElement('div');
  holder.id = 'print-injected';
  const imported = document.importNode(card, true);
  imported.querySelectorAll('.article-print-btn, .related-services').forEach(el => el.remove());
  holder.appendChild(imported);
  document.body.appendChild(holder);
  ensurePrintLogo(imported);
  return holder;
}

// Print an already-built holder. Called synchronously within the click.
function printHolder() {
  document.body.classList.add('print-full-article');
  const cleanup = () => {
    document.body.classList.remove('print-full-article');
    const h = document.getElementById('print-injected');
    if (h) h.remove();
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  window.print();          // synchronous — must stay in the click's call stack
  setTimeout(cleanup, 1000);
}

function printFullArticle(href) {
  if (!href) return;
  const cached = _articleHtmlCache[href];
  if (cached) {
    // Synchronous path — preserves the click's user activation.
    const holder = buildPrintHolder(cached);
    if (holder) { printHolder(); return; }
  }
  // Not prefetched yet: fetch, then navigate to the article which prints itself.
  // (A fresh async print() call would be ignored by Chrome, so we hand off.)
  fetch(href, { credentials: 'same-origin' })
    .then(res => res.text())
    .then(html => { _articleHtmlCache[href] = html; })
    .catch(() => {});
  window.location.href = href + (href.indexOf('?') === -1 ? '?' : '&') + 'print=1';
}

function makePrintButton() {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'article-print-btn';
  const label = (translations['articles.print'] && translations['articles.print'][currentLang]) || 'Tulosta';
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg><span data-i18n="articles.print">' + label + '</span>';
  return btn;
}

function initPrintButtons() {
  // Preload the print logo so it's decoded before a synchronous print.
  try { const li = new Image(); li.src = '/images/logo-horizontal.png'; } catch (e) {}

  // 1) Listing cards (homepage #articles section, /artikkelit index): the title
  //    links to the full article. The card may only hold an excerpt, so we fetch
  //    the full article and print it in place. We PREFETCH the HTML (on load and
  //    on hover/press) so the click can inject + print synchronously.
  document.querySelectorAll('#articles .article-card[data-category] .article-header').forEach((header, i) => {
    if (header.querySelector('.article-print-btn')) return;
    const card = header.closest('.article-card');
    const link = card && card.querySelector('h3 a[href], h2 a[href]');
    const btn = makePrintButton();
    if (link) {
      const href = link.getAttribute('href');
      const warm = () => prefetchArticleHtml(href);
      btn.addEventListener('pointerenter', warm);
      btn.addEventListener('pointerdown', warm);
      btn.addEventListener('focus', warm);
      btn.addEventListener('touchstart', warm, { passive: true });
      btn.addEventListener('click', () => printFullArticle(href));
      // Warm the cache after load (staggered) so the very first click is instant.
      setTimeout(warm, 250 + i * 150);
    } else {
      btn.addEventListener('click', () => printArticle(card));
    }
    header.appendChild(btn);
  });

  // 2) Standalone article page: the open article itself (h1 title, no link, not in
  //    the #articles listing). Add a button that prints the whole open article.
  document.querySelectorAll('#main-content .articles-section .article-card .article-header').forEach(header => {
    if (header.closest('#articles')) return;      // handled as a listing card above
    if (header.querySelector('.article-print-btn')) return;
    const card = header.closest('.article-card');
    if (!card || !card.querySelector('h1')) return; // only the main open article, not related cards
    ensurePrintLogo(card);
    const btn = makePrintButton();
    btn.addEventListener('click', () => printArticle(card));
    header.appendChild(btn);
  });

  // 3) Auto-print when arriving from a teaser's print button (?print=1).
  const wantsPrint = new URLSearchParams(window.location.search).get('print') === '1';
  if (wantsPrint) {
    const card = document.querySelector('#main-content .articles-section .article-card') ||
                 document.querySelector('.article-card');
    if (card) {
      // Strip ?print=1 so a manual refresh doesn't re-open the print dialog.
      try { history.replaceState(null, '', window.location.pathname + window.location.hash); } catch (e) {}
      const fire = () => setTimeout(() => printArticle(card), 300);
      if (document.readyState === 'complete') fire();
      else window.addEventListener('load', fire);
    }
  }
}

// ===== Services category tabs =====
// null = nothing selected yet: no cards shown until a category is tapped.
let currentServiceFilter = null;

function applyServiceFilter(animate) {
  const cards = document.querySelectorAll('#services .service-card[data-scat]');
  const buttons = document.querySelectorAll('.service-filter-btn');
  if (!cards.length) return;

  buttons.forEach(btn => {
    const on = btn.dataset.scatFilter === currentServiceFilter;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  // Pass 1: set visibility and clear any prior animation.
  cards.forEach(card => {
    card.classList.toggle('filter-hidden', card.dataset.scat !== currentServiceFilter);
    card.classList.remove('sf-enter');
    card.style.animationDelay = '';
  });
  // Pass 2: staggered fade-in on the now-visible cards, so the change is
  // clearly visible (avoids "dead" taps on mobile where results are below fold).
  if (animate) {
    void cards[0].offsetWidth; // force reflow so the animation restarts
    let i = 0;
    cards.forEach(card => {
      if (card.dataset.scat === currentServiceFilter) {
        card.style.animationDelay = (i * 40) + 'ms';
        card.classList.add('sf-enter');
        i++;
      }
    });
  }
}

function initServiceFilters() {
  const buttons = document.querySelectorAll('.service-filter-btn');
  if (!buttons.length) return;
  const grid = document.querySelector('#services .services-grid');
  const header = document.querySelector('.header') || document.querySelector('header');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentServiceFilter = btn.dataset.scatFilter;
      applyServiceFilter(true);
      // On mobile the big tiles push the results below the fold, so scroll
      // down to bring the results grid just under the header — clear tap feedback.
      if (window.innerWidth <= 700 && grid) {
        const headerH = header ? header.offsetHeight : 64;
        const y = Math.max(0, window.scrollY + grid.getBoundingClientRect().top - headerH - 12);
        if (Math.abs(y - window.scrollY) > 8) {
          const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
          window.scrollTo({ top: y, left: 0, behavior: behavior });
          // Fallback: force the jump if smooth scroll gets no-op'd.
          setTimeout(function () {
            if (Math.abs(window.scrollY - y) > 40) window.scrollTo(0, y);
          }, 450);
        }
      }
    });
  });
  applyServiceFilter(false);
}

function initArticleFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentArticleFilter = btn.dataset.filter;
      const searchInput = document.getElementById('article-search-input');
      if (searchInput) searchInput.value = '';
      applyArticleFilters();
    });
  });

  const searchInput = document.getElementById('article-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      applyArticleFilters(e.target.value);
    });
  }

  // Inject print buttons (listing cards + standalone article pages)
  initPrintButtons();
}


// --- Vet Profiles ---
const vetProfiles = {
  leena: {
    name: 'Leena Sandström',
    image: '/images/leena.webp',
    bio: {
      fi: 'Valmistuin eläinlääkäriksi vuonna 1997 ja olen työskennellyt pieneläinlääkärinä lähes koko ammattiurani ajan.\n\nOlen perehtynyt sydänsairauksiin ja suorittanut eurooppalaisen ESAVS:n Certificate in Small Animal Veterinary Practice / Cardiology \u2013 tutkinnon. Minulla on oikeudet suorittaa Suomen Kennelliiton virallisia sydäntutkimuksia (auskultaatio-, ultraääni- ja EKG-tutkimukset). Vatsaontelon ultraäänitutkimusten suorittamista olen opetellut suomalaisilla kursseilla (Fennovet) ja Euroopassa (ESAVS).\n\nAmmatilliset kiinnostuksen kohteeni painottuu koirien ja kissojen sydänsairauksiin ja sisätauteihin.\n\nHuolellisen tutkimuksen ja ajan tasalla olevan tiedon avulla pyrin varmistamaan, että lemmikkisi saa asianmukaisen hoidon.',
      sv: 'Jag blev veterinär 1997 och har arbetat som smådjursveterinär nästan hela min yrkeskarriär.\n\nJag har inriktat mig på hjärtsjukdomar och har genomfört det europeiska ESAVS Certificate in Small Animal Veterinary Practice / Cardiology. Jag har rätt att utföra Finska Kennelklubbens officiella hjärtundersökningar (auskultation, ultraljud och EKG-undersökningar). Jag har lärt mig att utföra ultraljudsundersökningar av bukhålan på finska kurser (Fennovet) och i Europa (ESAVS).\n\nMina professionella intresseområden fokuserar på hjärtsjukdomar och inre sjukdomar hos hundar och katter.\n\nGenom noggrann undersökning och uppdaterad kunskap strävar jag efter att säkerställa att ditt husdjur får saklig behandling.',
      en: 'I graduated as a veterinarian in 1997 and have worked as a small animal veterinarian for almost my entire professional career.\n\nI have orientated in heart diseases and completed the European ESAVS Certificate in Small Animal Veterinary Practice / Cardiology. I am authorized to perform official heart examinations for the Finnish Kennel Club (auscultation, ultrasound, and ECG examinations). I have learned to perform abdominal ultrasound examinations through Finnish courses (Fennovet) and in Europe (ESAVS).\n\nMy professional interests focus on heart diseases and internal medicine in dogs and cats.\n\nThrough careful examination and up-to-date knowledge, I strive to ensure that your pet receives appropriate care.'
    },
    experience: {
      fi: 'Eläinlääkärinä vuodesta 1997. Lähes koko ura pieneläinlääketieteessä.',
      sv: 'Veterinär sedan 1997. Nästan hela karriären inom smådjursmedicin.',
      en: 'Veterinarian since 1997. Almost entire career in small animal medicine.'
    },
    training: {
      fi: 'ESAVS Certificate in Cardiology. Kennelliiton valtuutettu sydäntutkija. Fennovet ja ESAVS ultraäänikoulutus.',
      sv: 'ESAVS Certificate in Cardiology. Auktoriserad hjärtundersökare för Kennelklubben. Fennovet och ESAVS ultraljudsutbildning.',
      en: 'ESAVS Certificate in Cardiology. Authorized heart examiner for the Finnish Kennel Club. Fennovet and ESAVS ultrasound training.'
    },
    focus: {
      fi: 'Sydänsairaudet, sisätaudit, sydän- ja vatsaontelon ultraäänitutkimukset',
      sv: 'Hjärtsjukdomar, internmedicin, hjärt- och bukultraljudsundersökningar',
      en: 'Heart diseases, internal medicine, cardiac and abdominal ultrasound examinations'
    }
  },
  pamela: {
    name: 'Pamela Kvarngård',
    image: '/images/pamela.webp',
    bio: {
      fi: 'Olen työskennellyt pieneläinlääkärinä vuodesta 2013 lähtien, ja nykyään työni painottuu erityisesti ortopedisten potilaiden hoitoon. Olen jatkokouluttautunut muun muassa ortopedisessa kirurgiassa (AOVET, ESAVS etc.) sekä hammassairauksissa (Accesia Academy).\n\nMinulle on tärkeää pysyä ajan tasalla uusista tutkimuksista, hoitomenetelmistä ja tekniikoista \u2013 jatkuva kouluttautuminen on olennainen osa parhaan mahdollisen hoidon tarjoamista.\n\nKeskeisiä ammatillisia kiinnostuksen kohteitani ovat ortopedia, pehmytosakirurgia ja hammashoidot. Koen erityisen palkitsevaksi auttaa eläimiä palauttamaan mukavuutensa, liikkuvuutensa ja hyvän elämänlaadun, ja tämä motivoi minua työssäni joka päivä.',
      sv: 'Jag har arbetat som smådjursveterinär sedan 2013, och idag ligger mitt fokus framför allt på att behandla ortopediska patienter. Jag har vidareutbildning inom bland annat ortopedisk kirurgi (AOVET, ESAVS etc.) samt tandvård (Accesia Academy).\n\nDet är viktigt för mig att hålla mig uppdaterad kring nya forskningsrön, tekniker och behandlingsmetoder \u2013 kontinuerlig fortbildning är en central del av att kunna erbjuda bästa möjliga vård.\n\nMina främsta professionella intressen är ortopedi, mjukdelskirurgi och tandvård. Jag upplever det som särskilt givande att hjälpa djur att återfå komfort, rörlighet och livskvalitet, och det motiverar mig varje dag i mitt arbete.',
      en: 'I have been working as a small animal veterinarian since 2013, and today my work focuses largely on treating orthopedic patients. I have completed further education in orthopedic surgery (AOVET, ESAVS etc) as well as in dentistry (Accesia Academy).\n\nI prioritise staying up to date with new research, techniques, and treatment options\u2014continuously educating myself is an important part of offering the best possible care.\n\nMy main professional interests lie in orthopedics, soft tissue surgery, and dentistry. I find it especially rewarding to help animals regain comfort, mobility, and quality of life, and this motivates me every day in my work.'
    },
    experience: {
      fi: 'Pieneläinlääkärinä vuodesta 2013.',
      sv: 'Smådjursveterinär sedan 2013.',
      en: 'Small animal veterinarian since 2013.'
    },
    training: {
      fi: 'AOVET ja ESAVS ortopedinen kirurgia. Accesia Academy hammashoito.',
      sv: 'AOVET och ESAVS ortopedisk kirurgi. Accesia Academy tandvård.',
      en: 'AOVET and ESAVS orthopedic surgery. Accesia Academy dentistry.'
    },
    focus: {
      fi: 'Ortopedia, pehmytkudoskirurgia, hammashoito',
      sv: 'Ortopedi, mjukdelskirurgi, tandvård',
      en: 'Orthopedics, soft tissue surgery, dentistry'
    }
  },
  assaf: {
    name: 'Assaf Wydra',
    image: '/images/assaf.webp',
    bio: {
      fi: 'Olen työskennellyt pieneläinlääkärinä vuodesta 2011 lähtien, ja nykyisin työni painottuu pääasiassa hammashoitoihin, tähystystutkimuksiin sekä luonnonvaraisten eläinten hoitoon. Olen suorittanut lisäkoulutusta eläinlääketieteellisessä hammashoidossa (Accesia Academy) sekä tähystystutkimuksissa ja villieläinten hoidossa.\n\nUuden teknologian seuraaminen ja hyödyntäminen on olennainen osa ammatillista kehittymistäni ja auttaa minua tarjoamaan potilailleni mahdollisimman korkeatasoista hoitoa.\n\nAmmatillisia mielenkiinnon kohteitani ovat erityisesti hammashoito, endoskopia sekä uusien teknologisten innovaatioiden käytännön soveltaminen kliinisessä työssä. Klinikkatyön lisäksi teen aktiivisesti vapaaehtoista pro bono -työtä luonnonvaraisten eläinten parissa, minkä koen erittäin merkitykselliseksi ja tärkeäksi osaksi eläinlääkärin rooliani.',
      sv: 'Jag har arbetat som smådjursveterinär sedan 2011, och idag fokuserar mitt arbete främst på tandvård, endoskopiska undersökningar samt vård av vilda djur. Jag har genomgått vidareutbildning inom veterinär tandvård (Accesia Academy) samt inom endoskopiska undersökningar och vård av vilda djur.\n\nAtt följa och ta i bruk ny teknologi är en viktig del av min professionella utveckling och hjälper mig att erbjuda vård av högsta möjliga kvalitet till mina patienter.\n\nMina huvudsakliga professionella intresseområden är tandvård, endoskopi samt den praktiska tillämpningen av nya teknologiska innovationer i kliniskt arbete. Utöver mitt arbete på kliniken är jag aktivt engagerad i frivilligt pro bono-arbete med vård av vilda djur, vilket jag upplever som mycket meningsfullt och som en viktig del av min roll som veterinär.',
      en: 'I have been working as a small animal veterinarian since 2011, and today my work focuses mainly on dentistry and endoscopic examinations as well as treating wildlife. I have completed further education in veterinary dentistry (Accesia Academy) as well as in endoscopic examinations and wildlife care.\n\nExploring and adopting new technology is an essential part of my professional development and helps me provide the highest standard of care for my patients.\n\nMy main professional interests include dentistry, endoscopy, and the practical application of new technological innovations in clinical work. In addition to my work at the clinic, I am actively involved in voluntary pro bono work treating wildlife, which I find deeply meaningful and an important part of my role as a veterinarian.'
    },
    experience: {
      fi: 'Pieneläinlääkärinä vuodesta 2011.',
      sv: 'Smådjursveterinär sedan 2011.',
      en: 'Small animal veterinarian since 2011.'
    },
    training: {
      fi: 'Accesia Academy hammashoito. Tähystys- ja luonnonvaraisten eläinten koulutus.',
      sv: 'Accesia Academy tandvård. Endoskopi- och viltdjursutbildning.',
      en: 'Accesia Academy dentistry. Endoscopy and wildlife training.'
    },
    focus: {
      fi: 'Hammashoito, tähystystutkimukset, luonnonvaraisten eläinten hoito, teknologiset innovaatiot',
      sv: 'Tandvård, endoskopi, vård av vilda djur, teknologiska innovationer',
      en: 'Dentistry, endoscopy, wildlife care, technological innovations'
    }
  },
  nina: {
    name: 'Nina Haglund',
    image: '/images/nina.webp',
    bio: {
      fi: 'Olen työskennellyt eläinlääkärinä vuodesta 2016/2017 ja vuodesta 2020 alkaen ollut osa Eläinklinikka Saaren tiimiä. Minulle on tärkeää yhdistää rauhallinen ja empaattinen kohtaaminen potilasturvallisuutta korostavaan työskentelytapaan ja vahvaan kliiniseen osaamiseen \u2013 haluan, että sekä eläimet että omistajat tuntevat olonsa turvalliseksi vastaanotollani.\n\nEnnen eläinlääkäriuraa valmistuin farmaseutiksi, mikä antaa vahvan pohjan farmakologian ja lääkehoitojen ymmärtämiselle. Olen täydentänyt osaamistani hammassairauksien jatkokoulutuksella (Accesia Academy) sekä pehmytosakirurgian opinnoilla (ESAVS).\n\nAmmatilliset kiinnostuksenkohteeni painottuvat erityisesti kirurgiaan, hammashoitoihin ja dermatologiaan. Työssäni minua motivoi jatkuva kehittyminen \u2013 ja ennen kaikkea se, että voin olla tukena eläinten hyvinvoinnille joka päivä.',
      sv: 'Jag har arbetat som veterinär sedan 2016/2017 och sedan år 2020 har jag varit en del av Djurklinik Saaris team. För mig är det viktigt att kombinera ett lugnt och empatiskt bemötande med ett arbetssätt som betonar patientsäkerhet och stark klinisk kompetens \u2013 jag vill att både djuren och deras ägare ska känna sig trygga hos mig.\n\nFöre min veterinärkarriär tog jag examen som farmaceut, vilket ger mig en bra grund inom farmakologi och läkemedelsbehandlingar. Jag har även vidareutbildat mig inom tandsjukdomar (Accesia Academy) och mjukvävnadskirurgi (ESAVS).\n\nMina professionella intresseområden ligger särskilt inom kirurgi, tandvård och dermatologi. Det som motiverar mig i arbetet är möjligheten att ständigt utvecklas \u2013 och framför allt att kunna bidra till djurens välmående varje dag.',
      en: 'I have worked as a veterinarian since 2016/2017, and since 2020 I have been part of the Eläinklinikka Saari team. It is important to me to combine a calm, empathetic approach with a working style that prioritises patient safety and strong clinical competence \u2013 I want both animals and their owners to feel safe and comfortable during their visit.\n\nBefore becoming a veterinarian, I graduated as a pharmacist, which provides me with a solid foundation in pharmacology and medical treatments. I have also completed further training in dental diseases (Accesia Academy) and soft tissue surgery (ESAVS).\n\nMy professional interests focus particularly on surgery, dentistry, and dermatology. What motivates me most in my work is the opportunity to continuously develop \u2013 and above all, to contribute to animal well-being every day.'
    },
    experience: {
      fi: 'Eläinlääkärinä vuodesta 2016/2017, Saaren klinikalla vuodesta 2020. Farmaseutin tutkinto.',
      sv: 'Veterinär sedan 2016/2017, på Saari kliniken sedan 2020. Farmaceutexamen.',
      en: 'Veterinarian since 2016/2017, at Saari Clinic since 2020. Pharmacist degree.'
    },
    training: {
      fi: 'Accesia Academy hammashoito. ESAVS pehmytkudoskirurgia. Farmaseutin tutkinto.',
      sv: 'Accesia Academy tandvård. ESAVS mjukvävnadskirurgi. Farmaceutexamen.',
      en: 'Accesia Academy dentistry. ESAVS soft tissue surgery. Pharmacist degree.'
    },
    focus: {
      fi: 'Kirurgia, hammashoito, dermatologia',
      sv: 'Kirurgi, tandvård, dermatologi',
      en: 'Surgery, dentistry, dermatology'
    }
  },
  merja: {
    name: 'Merja Autio',
    image: '/images/merja.webp',
    bio: {
      fi: 'Valmistuin kesällä 2025 Eesti Maaülikoolista Tartosta ja olen työskennellyt eläinlääkärinä vuodesta 2024. Olen ollut osana Eläinklinikka Saaren tiimiä huhtikuusta 2025 lähtien. Erityisiä mielenkiinnon kohteitani ovat pehmytkudoskirurgia sekä eksoottiset eläimet, ja tavoitteenani on kouluttautua näillä osa-alueilla lisää tulevaisuudessa.\n\nMinulle on tärkeää rauhallinen ja yksilöllinen kohtaaminen sekä eläimen luotettava ja näyttöön perustuva hoito. Koen työni merkitykselliseksi ja arvostan sen vaihtelevuutta ja ammatillista haastavuutta.',
      sv: 'Jag tog veterinärexamen sommaren 2025 vid Eesti Maaülikool i Tartu och har arbetat som veterinär sedan 2024. Jag har varit en del av Eläinklinikka Saaris team sedan april 2025. Mina särskilda intresseområden är mjukdelskirurgi och exotiska djur, och mitt mål är att vidareutbilda mig inom dessa områden även i framtiden.\n\nFör mig är ett lugnt och individuellt bemötande samt tillförlitlig och evidensbaserad vård av djuret mycket viktigt. Jag upplever mitt arbete som meningsfullt och uppskattar dess variation och professionella utmaningar.',
      en: 'I graduated in the summer of 2025 from Eesti Maaülikool in Tartu and have been working as a veterinarian since 2024. I have been part of the Eläinklinikka Saari team since April 2025. My particular areas of interest are soft tissue surgery and exotic animals, and I aim to pursue further training in these areas in the future.\n\nI value calm and individual interactions, as well as reliable, evidence-based care for each animal. I find my work meaningful and appreciate its variety and professional challenges.'
    },
    experience: {
      fi: 'Eläinlääkärinä vuodesta 2024. Valmistunut Eesti Maaülikoolista 2025. Saaren klinikalla huhtikuusta 2025.',
      sv: 'Veterinär sedan 2024. Examen från Eesti Maaülikool 2025. På Saari kliniken sedan april 2025.',
      en: 'Veterinarian since 2024. Graduated from Eesti Maaülikool 2025. At Saari Clinic since April 2025.'
    },
    training: {
      fi: 'Eläinlääketieteen tutkinto, Eesti Maaülikool, Tartu.',
      sv: 'Veterinärmedicin examen, Eesti Maaülikool, Tartu.',
      en: 'Veterinary Medicine degree, Eesti Maaülikool, Tartu.'
    },
    focus: {
      fi: 'Pehmytkudoskirurgia, eksoottiset eläimet',
      sv: 'Mjukdelskirurgi, exotiska djur',
      en: 'Soft tissue surgery, exotic animals'
    }
  },
  hanna: {
    name: 'Hanna Takkinen',
    image: '/images/hanna.webp',
    bio: {
      fi: 'Eläinlääkäriurani alkoi vuonna 2024, ja valmistuin eläinlääkäriksi Eesti Maaülikoolista kesällä 2025. Olen työskennellyt eläinlääkärin sijaisena pieneläinklinikalla Oulussa sekä kunnaneläinlääkärin sijaisena Pohjois-Pohjanmaalla, ja sen jälkeen lähes vuoden päivystävänä eläinlääkärinä Seinäjoen eläinsairaalassa. Eläinklinikka Saaren tiimiin liityin elokuussa 2026.\n\nAmmatillisia kiinnostuksen kohteitani ovat erityisesti sisätaudit, dermatologia, pehmytkudoskirurgia sekä eksoottiset nisäkkäät. Minulle on tärkeää suunnitella hoito yhdessä omistajan kanssa niin, että se sopii mahdollisimman hyvin lemmikin ja perheen arkeen.\n\nPidän erityisesti myös arkojen ja pelokkaiden lemmikkien kohtaamisesta, ja minulle on palkitsevaa löytää yhdessä omistajan kanssa keinoja tehdä vastaanottokäynnistä lemmikille mahdollisimman turvallinen ja rauhallinen.',
      sv: 'Veterinärkarriären inledde jag 2024, och jag utexaminerades till veterinär från Eesti Maaülikool sommaren 2025. Jag har arbetat som vikarierande veterinär på en smådjursklinik i Uleåborg och som vikarierande kommunalveterinär i Norra Österbotten, och därefter i nästan ett år som jourveterinär på djursjukhuset i Seinäjoki. Till Djurklinik Saaris team kom jag i augusti 2026.\n\nMina yrkesmässiga intresseområden är särskilt invärtesmedicin, dermatologi, mjukdelskirurgi samt exotiska däggdjur. För mig är det viktigt att planera vården tillsammans med djurägaren så att den passar husdjurets och familjens vardag så bra som möjligt.\n\nJag tycker särskilt mycket om att möta skygga och rädda djur, och det är givande att tillsammans med ägaren hitta sätt att göra mottagningsbesöket så tryggt och lugnt som möjligt för husdjuret.',
      en: 'My veterinary career began in 2024, and I graduated as a veterinarian from Eesti Maaülikool in the summer of 2025. I have worked as a locum veterinarian at a small-animal clinic in Oulu and as a locum municipal veterinarian in North Ostrobothnia, and after that for almost a year as an emergency veterinarian at the Seinäjoki animal hospital. I joined the Eläinklinikka Saari team in August 2026.\n\nMy professional interests are especially internal medicine, dermatology, soft-tissue surgery and exotic mammals. It is important to me to plan treatment together with the owner so that it fits the everyday life of the pet and the family as well as possible.\n\nI also particularly enjoy meeting shy and fearful pets, and I find it rewarding to work together with the owner to find ways of making the visit as safe and calm as possible for the animal.'
    },
    experience: {
      fi: 'Eläinlääkärinä vuodesta 2024. Sijaisuuksia pieneläinklinikalla Oulussa ja kunnaneläinlääkärinä Pohjois-Pohjanmaalla sekä lähes vuosi päivystävänä eläinlääkärinä Seinäjoen eläinsairaalassa. Saaren klinikalla elokuusta 2026.',
      sv: 'Veterinär sedan 2024. Vikariat på smådjursklinik i Uleåborg och som kommunalveterinär i Norra Österbotten samt nästan ett år som jourveterinär på djursjukhuset i Seinäjoki. På Saari kliniken sedan augusti 2026.',
      en: 'Veterinarian since 2024. Locum work at a small-animal clinic in Oulu and as a municipal veterinarian in North Ostrobothnia, plus almost a year as an emergency veterinarian at the Seinäjoki animal hospital. At Saari Clinic since August 2026.'
    },
    training: {
      fi: 'Eläinlääketieteen tutkinto, Eesti Maaülikool, 2025.',
      sv: 'Veterinärmedicin examen, Eesti Maaülikool, 2025.',
      en: 'Veterinary Medicine degree, Eesti Maaülikool, 2025.'
    },
    focus: {
      fi: 'Pelkopotilaiden kohtaaminen, eksoottiset nisäkkäät, pehmytkudoskirurgia, akuutit kirurgiset ja tähystystoimenpiteet',
      sv: 'Bemötande av rädda patienter, exotiska däggdjur, mjukdelskirurgi, akuta kirurgiska och endoskopiska ingrepp',
      en: 'Handling fearful patients, exotic mammals, soft-tissue surgery, acute surgical and endoscopic procedures'
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
    image: '/images/sanna.webp',
    role: 'role.manager',
    bio: {
      fi: 'Olen valmistunut eläintenhoitajaksi Ylä-Savon ammattiopistosta vuonna 2009 ja työskennellyt Eläinklinikka Saarella siitä lähtien. Olen täydentänyt osaamistani useilla lisäkoulutuksilla, erityisesti ravitsemuksen ja anestesiavalvonnan parissa. Työssäni pidän eniten sen monipuolisuudesta.\n\nEläinten hoidon ja asiakaspalvelun lisäksi vastaan tilauksista sekä työvuorosuunnittelusta.',
      sv: 'Jag utbildade mig till djursjukskötare vid Ylä-Savo yrkesinstitut år 2009 och har arbetat på Djurklinik Saari sedan dess. Jag har breddat min kompetens genom flera vidareutbildningar, särskilt inom nutrition och anestesiövervakning. Det jag uppskattar mest i mitt arbete är dess mångsidighet.\n\nFörutom djurvård och kundservice ansvarar jag även för beställningar och arbetsscheman.',
      en: 'I qualified as a veterinary nurse at Ylä-Savo Vocational College in 2009 and have been working at Animal Clinic Saari ever since. Over the years, I have completed several advanced training courses covering areas from nutrition to anesthesia monitoring. What I value most about working in an animal clinic is the versatility of the work.\n\nIn addition to animal care and customer service, my responsibilities include managing orders and coordinating work schedules.'
    },
    background: {
      fi: 'Eläintenhoitaja 2009, Ylä-Savon ammattiopisto. Lisäkoulutuksia ravitsemuksessa ja anestesiavalvonnassa.',
      sv: 'Djursjukskötare 2009, Ylä-Savo yrkesinstitut. Vidareutbildning inom nutrition och anestesiövervakning.',
      en: 'Veterinary nurse 2009, Ylä-Savo Vocational College. Further training in nutrition and anesthesia monitoring.'
    },
    interests: {
      fi: 'Ravitsemus, anestesiavalvonta, tilaukset ja työvuorosuunnittelu',
      sv: 'Nutrition, anestesiövervakning, beställningar och schemaplanering',
      en: 'Nutrition, anesthesia monitoring, orders and scheduling'
    }
  },
  jenni: {
    name: 'Jenni Ruotsala',
    image: '/images/jenni.webp',
    role: 'role.headtech',
    bio: {
      fi: 'Olen valmistunut eläintenhoitajaksi vuonna 2010 ja aloittanut työni klinikalla vuonna 2014. Vuonna 2018 valmistuin klinikkaeläinhoitajaksi ja suoritin hammashoidon lisäkoulutuksen ulkomailla (Accesia Academy). Vuosina 2024\u20132025 syvensin osaamistani anestesiologiassa, josta minulla on erikoisammattitutkinto.\n\nAmmatillisia mielenkiinnon kohteitani ovat erityisesti anestesia sekä laboratoriotyö. Työssäni parasta on sen vaihtelevuus \u2013 yksikään päivä ei ole samanlainen.',
      sv: 'Jag tog examen som djurskötare år 2010 och började jobba här på kliniken 2014. År 2018 fick jag examen som klinikdjurskötare och i samband med det gick jag en skolning i tandvård utomlands. Senare har jag fördjupat mina kunskaper inom anestesiologi åren 2024\u20132025, vilket jag har en specialyrkesexamen inom.\n\nMina professionella intresseområden är främst anestesi, jag tycker också om laboratoriearbeten. Det bästa med det här jobbet är att ingen dag är den andra lik.',
      en: 'I graduated as an animal caretaker in 2010 and began working at the clinic in 2014. In 2018, I qualified as a veterinary nurse and also completed further education in dentistry abroad. More recently, I deepened my knowledge in anesthesiology during 2024\u20132025, earning a special professional qualification in this field.\n\nMy main professional interests lie in anesthesia, and I also enjoy laboratory work. What I value most about this profession is the variety \u2014 no two days are ever the same.'
    },
    background: {
      fi: 'Johtava klinikkaeläinhoitaja. Klinikkaeläinhoitaja EAT, anestesia 2025. Accesia Academy hammashoito.',
      sv: 'Ledande klinikdjurskötare. Klinikdjurskötare EAT, anestesi 2025. Accesia Academy tandvård.',
      en: 'Head veterinary technician. Veterinary technician EAT, anesthesia 2025. Accesia Academy dentistry.'
    },
    interests: {
      fi: 'Anestesia ja laboratoriotyö',
      sv: 'Anestesi och laboratoriearbete',
      en: 'Anesthesia and laboratory work'
    }
  },
  meri: {
    name: 'Meri Vilén',
    image: '/images/meri.webp',
    role: 'role.tech',
    bio: {
      fi: 'Valmistuin klinikkaeläinhoitajaksi vuonna 2023, ja lisäksi minulla on hevostenhoitajan tutkinto. Eläimet ovat olleet tärkeä osa elämääni lapsuudesta asti, ja erityisesti kissat ovat minulle lähellä sydäntä.',
      sv: 'Jag utexaminerades som klinikdjurskötare år 2023 och har även en utbildning som hästskötare. Djur har varit en viktig del av mitt liv sedan barndomen, och katter ligger mig särskilt varmt om hjärtat.',
      en: 'I graduated as a veterinary nurse in 2023 and also hold a qualification as a horse caretaker. Animals have been an important part of my life since childhood, and cats in particular are very close to my heart.'
    },
    background: {
      fi: 'Klinikkaeläinhoitaja 2023. Myös hevostenhoitajan tutkinto.',
      sv: 'Klinikdjurskötare 2023. Även utbildad hästskötare.',
      en: 'Veterinary nurse 2023. Also qualified horse caretaker.'
    },
    interests: {
      fi: 'Kissojen hoito',
      sv: 'Kattvård',
      en: 'Cat care'
    }
  },
  susanna: {
    name: 'Susanna Seljas',
    image: '/images/susanna.webp',
    role: 'role.tech',
    bio: {
      fi: 'Eläimet ovat aina olleet lähellä sydäntäni, minkä vuoksi päätin tehdä niistä itselleni ammatin. Valmistuin klinikkaeläinhoitajaksi vuonna 2023, ja minulla on myös eläintenhoitajan ammattitutkinto. Klinikkatyössä parasta on sen vaihtelevuus sekä jatkuvat mahdollisuudet oppia ja kehittyä.',
      sv: 'Djur har alltid legat mig varmt om hjärtat, vilket är anledningen till att jag valde att arbeta med dem. Jag utexaminerades som klinikdjurskötare år 2023 och har även en yrkesexamen som djurvårdare. Det bästa med klinikarbetet är variationen samt de ständiga möjligheterna att utvecklas och lära sig nytt.',
      en: 'Animals have always been close to my heart, which is why I chose to make them my profession. I graduated as a veterinary nurse in 2023 and also hold a qualification as an animal caretaker. What I enjoy most about clinical work is the variety, along with the continuous opportunities to learn and develop.'
    },
    background: {
      fi: 'Klinikkaeläinhoitaja 2023. Eläintenhoitajan ammattitutkinto.',
      sv: 'Klinikdjurskötare 2023. Yrkesexamen som djurvårdare.',
      en: 'Veterinary nurse 2023. Animal caretaker qualification.'
    },
    interests: {
      fi: 'Monipuolinen klinikkatyö ja jatkuva kehittyminen',
      sv: 'Varierande klinikarbete och ständig utveckling',
      en: 'Diverse clinical work and continuous development'
    }
  },
  emilia: {
    name: 'Emilia Svahn',
    image: '/images/emilia.webp',
    role: 'role.tech',
    bio: {
      fi: 'Olen useiden vuosien ajan opiskellut ja työskennellyt eläinten parissa, mikä on ollut intohimoni jo pitkään. Vuonna 2023 valmistuin eläintenhoitajaksi, mikä antoi minulle vahvan perustan eläinten hyvinvoinnista ja hoidosta. Tiesin jo silloin, että haluan syventää osaamistani, ja vuonna 2024 kouluttauduin klinikkaeläintenhoitajaksi.\n\nTyöni aikana olen löytänyt erityisen kiinnostuksen anestesiaan. Pidän siitä, että voin seurata koko anestesiaprosessia \u2013 valmisteluista ja monitoroinnista aina heräämiseen saakka. Nautin myös siitä, että saan olla mukana kirurgisissa toimenpiteissä, joissa tiimityö ja tarkkuus ovat ratkaisevia.\n\nPidän erittäin paljon myös hammashoitoon liittyvistä tehtävistä. On palkitsevaa voida edistää eläinten pitkäaikaista terveyttä ja elämänlaatua hyvän suunhoidon kautta.\n\nEläinten kanssa työskentely ja niiden hoidossa mukana oleminen tuovat minulle suurta iloa ja ylpeyttä. Jokainen päivä antaa minulle mahdollisuuden kehittyä, oppia lisää ja jatkaa arvokkaan työn tekemistä eläinten ja niiden omistajien hyväksi.',
      sv: 'Jag har under flera år valt att studera och arbeta med djur, något som länge varit mitt intresse. År 2023 tog jag examen som djurskötare, vilket gav mig en stabil grund inom djurskötsel. Redan då visste jag att jag ville fördjupa mina kunskaper, 2024 utbildade jag mig till klinikdjurskötare.\n\nUnder min tid i yrket har jag upptäckt ett särskilt intresse för anestesi. Jag tycker om att följa hela processen kring narkos \u2013 från förberedelser och övervakning till uppvakning. Jag uppskattar också att få vara delaktig vid kirurgiska ingrepp, där samarbetet i teamet och precisionen i arbetet är avgörande.\n\nDessutom trivs jag väldigt bra med att arbeta med tandingrepp. Jag tycker om att kunna bidra till djurens långsiktiga hälsa och livskvalitet genom god munvård.\n\nAtt få arbeta nära djur och vara en del av deras vård är något jag känner stor glädje och stolthet över. Varje dag ger mig möjlighet att utvecklas, lära mig mer och fortsätta göra skillnad för både djuren och deras ägare.',
      en: 'I have spent several years studying and working with animals, something that has long been a strong passion of mine. In 2023, I graduated as an animal caretaker, which gave me a solid foundation in animal husbandry. Already then, I knew I wanted to deepen my knowledge, and in 2024 I trained to become a veterinary nurse.\n\nDuring my time in the profession, I have discovered a particular interest in anesthesia. I enjoy following the entire process of anesthesia \u2013 from preparation and monitoring to recovery. I also appreciate being involved in surgical procedures, where teamwork and precision are essential.\n\nIn addition, I really enjoy working with dental procedures. I like being able to contribute to animals\u2019 long-term health and quality of life through good dental care.\n\nBeing able to work closely with animals and take part in their care is something I feel great joy and pride in. Every day gives me the opportunity to grow, learn more, and continue making a difference for both the animals and their owners.'
    },
    background: {
      fi: 'Eläintenhoitaja 2023, klinikkaeläinhoitaja 2024.',
      sv: 'Djurskötare 2023, klinikdjurskötare 2024.',
      en: 'Animal caretaker 2023, veterinary nurse 2024.'
    },
    interests: {
      fi: 'Anestesia, kirurgiset toimenpiteet ja hammashoito',
      sv: 'Anestesi, kirurgiska ingrepp och tandvård',
      en: 'Anesthesia, surgical procedures and dental care'
    }
  },
  jennifer: {
    name: 'Jennifer Couloigner',
    image: '/images/jennifer.webp',
    role: 'role.tech',
    bio: {
      fi: 'Olen valmistunut kesällä 2026 klinikkaeläinhoitajaksi, sitä ennen olen kouluttautunut eläintenhoitajaksi. Erityisiä mielenkiinnon kohteitani ovat anestesiavalvonta, leikkaukset sekä eksoottiset potilaat.\n\nPidän alassani erityisesti jatkuvan oppimisen mahdollisuuksista sekä siitä, että saan kohdata niin eläimiä kuin heidän omistajiaan. Tavoitteenani on kehittää osaamistani kokonaisvaltaisesti ja tarjota eläinlähtöistä hoitoa jokaiselle potilaalle.',
      sv: 'Jag tog examen som klinikdjurskötare sommaren 2026, innan dess utbildade jag mig till djurskötare. Mina främsta intresseområden är anestesiövervakning, kirurgiska ingrepp och arbete med exotiska djurpatienter.\n\nDet jag uppskattar mest inom detta område är möjligheten till kontinuerligt lärande samt att få möta både djur och deras ägare. Mitt mål är att utveckla mina färdigheter på ett heltäckande sätt och ge högkvalitativ, djurcentrerad vård till varje patient.',
      en: 'I graduated as a veterinary technician in summer 2026; before that I trained as an animal caretaker. My key areas of interest include anesthesia monitoring, surgical procedures, and exotic patients.\n\nWhat I appreciate most in this field is the opportunity for continuous learning, as well as meeting both animals and their owners. My aim is to develop my skills comprehensively and provide animal-centered care for every patient.'
    },
    background: {
      fi: 'Eläintenhoitaja 2024, klinikkaeläinhoitaja 2026.',
      sv: 'Djurskötare 2024, klinikdjurskötare 2026.',
      en: 'Animal caretaker 2024, veterinary technician 2026.'
    },
    interests: {
      fi: 'Anestesiavalvonta, leikkaukset ja eksoottiset potilaat',
      sv: 'Anestesiövervakning, kirurgiska ingrepp och exotiska patienter',
      en: 'Anesthesia monitoring, surgical procedures and exotic patients'
    }
  },
  josefiina: {
    name: 'Josefiina Saarimäki',
    image: '/images/josefiina.webp',
    role: 'role.practical',
    bio: {
      fi: 'Olen koulutukseltani lähihoitaja, joka on aina haaveillut työskentelystä eläinten parissa. Erityisesti klinikalla, jossa on monipuolinen ja vaihteleva työympäristö. Pidän laboratoriossa ja leikkaussalissa työskentelystä. Tavoitteenani on jatkossa kouluttautua klinikkaeläinhoitajaksi ja laajentaa osaamistani, jotta voin tulevaisuudessa olla paremmin mukana edistämässä eläinten hyvinvointia.',
      sv: 'Jag är närvårdare till utbildningen och har alltid drömt om att arbeta med djur. Särskilt på en klinik, där arbetsmiljön är mångsidig och omväxlande. Jag tycker om att arbeta i laboratoriet och i operationssalen. Mitt mål är att i framtiden utbilda mig till klinikdjurskötare och bredda min kompetens, så att jag bättre kan bidra till att främja djurens välbefinnande.',
      en: 'I am a practical nurse by training, and I have always dreamed of working with animals \u2014 especially in a clinic environment, where the work is diverse and varies from day to day. I enjoy working in the laboratory and in the operating room. My goal is to continue my studies to become a veterinary nurse and to expand my skills so that I can better contribute to promoting animal welfare in the future.'
    },
    background: {
      fi: 'Lähihoitaja. Tavoitteena klinikkaeläinhoitajan tutkinto.',
      sv: 'Närvårdare. Mål att utbilda sig till klinikdjurskötare.',
      en: 'Practical nurse. Aiming to qualify as veterinary nurse.'
    },
    interests: {
      fi: 'Laboratorio- ja leikkaussalityö',
      sv: 'Laboratorie- och operationssalsarbete',
      en: 'Laboratory and operating room work'
    }
  },
  tiina: {
    name: 'Tiina McBreen',
    image: '/images/tiina.webp',
    role: 'role.practical',
    bio: {
      fi: 'Olen koulutukseltani lähihoitaja, ja lähitulevaisuudessa suunnitelmissani on opiskella klinikkaeläinhoitajaksi. Eläimet ovat aina olleet minulle suuri osa elämää, ja niiden kanssa työskentely on ollut haaveena pienestä pitäen. Olen tehnyt vapaaehtoistyötä pitkään kodittomien eläinten parissa.\n\nKlinikalla työskentely on monipuolista ja vaihtelevaa mikä tekee työstä erityisen mielenkiintoista. Erilaiset leikkaukset, ortopedia ja traumaperäiset vaivat kiinnostavat minua erityisen paljon.',
      sv: 'Jag är legitimerad närvårdare till utbildningen och planerar inom en snar framtid att studera till klinikdjurskötare. Djur har alltid varit en stor del av mitt liv, och att arbeta med dem har varit en dröm sedan jag var liten. Jag har länge arbetat volontärt med hemlösa djur.\n\nAtt arbeta på en klinik är mångsidigt och varierat, vilket gör jobbet särskilt intressant. Jag är särskilt intresserad av olika operationer, ortopedi och traumarelaterade tillstånd.',
      en: 'I am a registered nurse by education and plan to study to become a veterinary nurse in the near future. Animals have always been a big part of my life, and working with them has been a dream of mine since childhood. I have long worked voluntarily with homeless animals.\n\nWorking in a clinic is diverse and varied, which makes the job particularly interesting. I am especially interested in various surgical procedures, orthopedics, and trauma-related conditions.'
    },
    background: {
      fi: 'Lähihoitaja. Pitkä kokemus eläinten vapaaehtoistyöstä. Suunnittelee klinikkaeläinhoitajan opintoja.',
      sv: 'Närvårdare. Lång erfarenhet av frivilligarbete med djur. Planerar att studera till klinikdjurskötare.',
      en: 'Practical nurse. Long experience in animal volunteer work. Planning to study as veterinary nurse.'
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
      const anyOverlay = articlesSection && articlesSection.style.display !== 'none';
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
      if (!articlesSection) { showMainPage(); return; }
      const mainSections = document.querySelectorAll('#main-content > .notice-banner, #main-content > section:not(#articles), #main-content > .hero');
      mainSections.forEach(el => el.style.display = 'none');
      articlesSection.style.display = '';
      filterArticles('all');
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
  }

  // Initialize all features
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initPriceAccordion();
  initActiveNav();
  initScrollAnimations();
  initArticleFilters();
  initServiceFilters();
  initPawTrail();
});

// --- Paw cursor trail ---
function initPawTrail() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Skip only if no fine pointer is available (true touch-only devices).
  // Hybrid laptops with touchscreens still report (any-pointer: fine) from the trackpad.
  if (window.matchMedia('(any-pointer: fine)').matches === false) return;

  const style = document.createElement('style');
  style.textContent =
    '@keyframes pawFade { from { opacity: 0.7; transform: var(--paw-rot) scale(0.5); }' +
    ' to { opacity: 0; transform: var(--paw-rot) scale(1.1); } }' +
    '.paw-print { position: absolute; color: var(--color-primary, #E58DB4);' +
    ' animation: pawFade 1.1s ease-out forwards; will-change: opacity, transform; pointer-events: none; }';
  document.head.appendChild(style);

  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden';
  document.body.appendChild(layer);

  const PAW_SVG = '<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><circle cx="11" cy="4" r="2"/><circle cx="4" cy="9" r="2"/><circle cx="18" cy="9" r="2"/><ellipse cx="11" cy="16" rx="5" ry="4"/></svg>';
  let last = null;

  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (last && now - last.t < 70) return;
    const dx = last ? e.clientX - last.x : 999;
    const dy = last ? e.clientY - last.y : 999;
    if (Math.hypot(dx, dy) < 22) return;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    last = { x: e.clientX, y: e.clientY, t: now };

    const wobble = (Math.random() - 0.5) * 24;
    const paw = document.createElement('div');
    paw.className = 'paw-print';
    paw.innerHTML = PAW_SVG;
    paw.style.left = (e.clientX - 20) + 'px';
    paw.style.top = (e.clientY - 20) + 'px';
    paw.style.setProperty('--paw-rot', 'rotate(' + (angle + 90 + wobble) + 'deg)');
    layer.appendChild(paw);
    setTimeout(() => paw.remove(), 1200);
  }, { passive: true });
}

/* ============================================
   Google Ads: online booking conversion
   Fires "Online booking (Provet)" (AW-816483191/ypOwCNyBpOwcEPeWqoUD)
   on any click through to the Provet booking system.
   Delegated so every booking link on every page is covered.
   Phone links keep their own click-to-call conversion.
   ============================================ */
(function () {
  const BOOKING_SEND_TO = 'AW-816483191/ypOwCNyBpOwcEPeWqoUD';

  document.addEventListener('click', function (e) {
    const link = e.target && e.target.closest
      ? e.target.closest('a[href*="my.provet.com"]')
      : null;
    if (!link || typeof gtag !== 'function') return;

    // Let the browser handle modified clicks and new-tab links itself.
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link.target && link.target !== '' && link.target !== '_self') {
      gtag('event', 'conversion', { send_to: BOOKING_SEND_TO });
      return;
    }

    // Same-tab navigation: delay it just long enough for the hit to leave,
    // with a timeout so the user is never blocked if the callback misfires.
    const url = link.href;
    let navigated = false;
    const go = function () {
      if (navigated) return;
      navigated = true;
      window.location = url;
    };

    e.preventDefault();
    setTimeout(go, 800);
    gtag('event', 'conversion', { send_to: BOOKING_SEND_TO, event_callback: go });
  });
})();
