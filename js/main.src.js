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
    fi: 'Ammattitaitoinen hoitotiimimme tarjoaa sinulle kokenutta ja asiantuntevaa palvelua aina eläimesi parhaaksi. Aukioloaikoina otamme vastaan myös kiireelliset tapaukset – <a href="/palvelut/paivystys/">lue päivystysohjeet</a>.',
    sv: 'Vårt professionella vårdteam erbjuder dig erfaren och kunnig service – alltid för ditt djurs bästa. Under öppettiderna tar vi även emot brådskande fall – <a href="/sv/tjanster/jour/">se jouranvisningarna</a>.',
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
    fi: 'Hammassairaudet ovat erittäin yleisiä – jo kolmen vuoden iässä valtaosalla koirista ja kissoista on jonkinasteinen hammastulehdus. Palvelut: hammaskiven poisto ultraäänilaitteella, hammasröntgen, hampaiden kirurgiset poistot, maitohampaiden poistot sekä puhkeamattomien hampaiden ja kystojen poisto. Kaikki toimenpiteet yleisanestesiassa inhalaatioanestesialla, suonensisäisellä nesteytyksellä ja kattavalla kivunlievennyksellä.',
    sv: 'Tandsjukdomar är mycket vanliga – vid 3 års ålder har de flesta hundar och katter inflammation i munnen. Tjänster: tandstensavlägsnande med ultraljud, tandröntgen, kirurgiska tandutdragningar, mjölktandsborttagning samt borttagning av icke-erupterade tänder och cystor. Alla ingrepp under generell anestesi med inhalationsanestesi, intravenöst dropp och omfattande smärthantering.',
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
    fi: 'Ortopedia, pehmytkudoskirurgia ja hammashoito. Jatkokoulutus AOVET, ESAVS ja Accesia Academy. Klinikan kissavastaava (Cat Advocate).',
    sv: 'Ortopedi, mjukdelskirurgi och tandvård. Vidareutbildning AOVET, ESAVS och Accesia Academy. Klinikens kattansvariga (Cat Advocate).',
    en: 'Orthopedics, soft tissue surgery and dentistry. Further training AOVET, ESAVS and Accesia Academy. The clinic\'s Cat Advocate.'
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
    fi: 'Anestesiavalvonta, kirurgia ja eksoottiset potilaat. Valmistunut klinikkaeläinhoitajaksi kesällä 2026.',
    sv: 'Anestesiövervakning, kirurgi och exotiska patienter. Utexaminerad klinikdjurskötare sommaren 2026.',
    en: 'Anesthesia monitoring, surgery and exotic patients. Qualified as a veterinary technician in summer 2026.'
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
    fi: 'Voit maksaa myös laskulla tai osamaksulla – ota yhteyttä, niin kerromme lisää!',
    sv: 'Du kan även betala med faktura eller på avbetalning – kontakta oss för mer info!',
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
    fi: 'Vaasan ainoa perheomisteinen pieneläinklinikka. Korkeatasoista eläinlääkäripalvelua vuodesta 1989 – viisi eläinlääkäriä ja kahdeksan hoitajaa palveluksessasi.',
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
  'nav.shop': { fi: 'Verkkokauppa', sv: 'Webbutik', en: 'Online shop' },
  'shop.eyebrow': { fi: 'Verkkokauppa', sv: 'Webbutik', en: 'Online shop' },
  'shop.title': { fi: 'Lemmikkiruokaa verkosta, nouto klinikalta', sv: 'Husdjursfoder från nätet, avhämtning på kliniken', en: 'Pet food online, collected at the clinic' },
  'shop.lead': { fi: 'Tilaa Royal Canin -ruokia kissallesi tai koirallesi verkosta ja nouda ne vastaanotostamme. Eläinlääkäreidemme valitsema valikoima, ei trendiruokia.', sv: 'Beställ Royal Canin-foder för din katt eller hund på nätet och hämta det på vår reception. Ett sortiment utvalt av våra veterinärer, inget trendfoder.', en: 'Order Royal Canin food for your cat or dog online and collect it at our reception. A range chosen by our vets, no fad diets.' },
  'shop.b1': { fi: 'Varastotuotteet noudettavissa 1–2 arkipäivässä', sv: 'Lagervaror kan hämtas inom 1–2 vardagar', en: 'In-stock items ready in 1–2 working days' },
  'shop.b2': { fi: 'Tekstiviesti, kun tilauksesi on valmis', sv: 'Sms när din beställning är klar', en: 'Text message when your order is ready' },
  'shop.b3': { fi: 'Maksu verkossa: kortti, MobilePay, Apple Pay, Google Pay', sv: 'Betalning på nätet: kort, MobilePay, Apple Pay, Google Pay', en: 'Online payment: card, MobilePay, Apple Pay, Google Pay' },
  'shop.cta': { fi: 'Siirry verkkokauppaan', sv: 'Till webbutiken', en: 'Go to the online shop' },

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
    fi: 'Jos koirasi ontuu takajalkaansa, välttelee rasitusta tai on jäykän oloinen levon jälkeen, ristisidevaurio on yleinen syy. Varhainen diagnoosi ja hoito parantavat ennustetta merkittävästi. Varaa aika ortopediseen tutkimukseen – arvioimme tilanteen ja tarvittaessa suosittelemme koirallesi parhaiten sopivan leikkausmenetelmän.',
    sv: 'Om din hund haltar på bakbenet, undviker ansträngning eller är stel efter vila kan en korsbandsskada vara orsaken. Tidig diagnos och behandling förbättrar prognosen avsevärt. Boka tid för en ortopedisk undersökning – vi bedömer situationen och rekommenderar den bäst lämpade operationsmetoden för din hund.',
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
    fi: 'Korvatulehdukset ovat yksi yleisimmistä syistä eläinlääkäri käynneille. Tavallisella otoskoopilla näkeminen rajoittuu korvakäytävän ulko-osiin, mutta video-otoskopia tuo aivan uuden tason diagnostiikkaan ja hoitoon. Menetelmässä korvakäytävään viedään ohut, kiinteä tähystin, jonka kärjessä on teräväpiirtokamera ja kirkas valo – kuva heijastetaan suurennettuna monitorille reaaliajassa.',
    sv: 'Öroninflammationer är en av de vanligaste orsakerna till veterinärbesök. Med ett vanligt otoskop begränsas sikten till hörselgångens yttre delar, men video-otoskopi ger en helt ny nivå av diagnostik och behandling. Metoden innebär att ett tunt, styvt endoskop med en högupplöst kamera och starkt ljus förs in i hörselgången – bilden förstoras och framställs på en monitor i realtid.',
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
    fi: 'Video-otoskopia tehdään yleisanestesiassa, koska korvakäytävä on herkkä ja potilaan on pysyttävä täysin liikkumatta. Eläinlääkäri vie tähystimen varovasti korvakäytävään ja tutkii sen koko pituudelta monitorin avulla. Korvakäytävä huuhdellaan perusteellisesti – lika, erite ja biofilmi poistetaan. Tarvittaessa otetaan näytteitä bakteeriviljelyä varten, poistetaan vierasesineitä tai polyypeja, tai tehdään myringotomia (tärykalvon avaus) välikorvan tutkimiseksi ja hoitamiseksi.',
    sv: 'Video-otoskopi utförs under generell anestesi eftersom hörselgången är känslig och patienten måste ligga helt stilla. Veterinären för försiktigt in endoskopet i hörselgången och undersöker hela dess längd på monitorn. Hörselgången spolas noggrant – smuts, sekret och biofilm avlägsnas. Vid behov tas prover för bakterieodling, främmande föremål eller polyper avlägsnas, eller en myringotomi (öppning av trumhinnan) utförs för att undersöka och behandla mellanörat.',
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
    fi: 'Jos lemmikkisi raapii korviaan toistuvasti, korvista tulee pahaa hajua tai eritettä, lemmikki pitää päätä kallellaan, tai korvatulehdus palaa aina uudelleen hoidosta huolimatta – video-otoskopia voi olla avain ongelman ratkaisemiseen. Varaa aika tutkimukseen, niin selvitämme tilanteen ja suunnittelemme tehokkaan hoitostrategian.',
    sv: 'Om ditt husdjur kliar sig i öronen upprepat, det luktar illa från öronen eller det kommer sekret, huvudet är snett, eller öroninflammationen återkommer gång på gång trots behandling – kan video-otoskopi vara nyckeln till att lösa problemet. Boka tid för undersökning, så utreder vi situationen och planerar en effektiv behandlingsstrategi.',
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
    fi: 'Jatkuva kipulääkeinfuusio (CRI) – tasainen kivunhallinta leikkausten aikana',
    sv: 'Kontinuerlig smärtinfusion (CRI) – jämn smärtlindring under kirurgi',
    en: 'Continuous Rate Infusion (CRI) — Steady Pain Management During Surgery'
  },
  'article.mlk.intro': {
    fi: 'Kivunhallinta on yksi jokaisen leikkauksen tärkeimmistä osa-alueista. Klinikallamme kipulääkeinfuusio kuuluu rutiinisti suurempiin leikkauksiin, kuten koirien sterilisaatioihin ja ortopedisiin toimenpiteisiin. Menetelmästä käytetään nimitystä jatkuva infuusio eli CRI (engl. constant rate infusion, myös continuous rate infusion). Sen sijaan että kipulääkettä annettaisiin vain erillisinä pistoksina, jatkuvassa infuusiossa sitä annetaan laskimoon tasaisella, tarkasti säädetyllä nopeudella, yleensä aloitusannoksen jälkeen. Aloitamme infuusion ennen ensimmäistä viiltoa ja jatkamme sitä koko leikkauksen ajan.',
    sv: 'Smärthantering är en av de viktigaste delarna av varje operation. På vår klinik ingår en smärtlindringsinfusion rutinmässigt i större operationer, till exempel sterilisering av tikar och ortopedisk kirurgi. Metoden kallas kontinuerlig infusion eller CRI, efter engelskans constant rate infusion (även continuous rate infusion). Vid CRI ges smärtstillande läkemedel i en ven med jämn, noggrant reglerad hastighet, vanligen efter en startdos, i stället för enbart som separata injektioner. Vi startar infusionen före det första snittet och fortsätter den under hela operationen.',
    en: 'Pain management is one of the most important parts of any surgery. At our clinic, a pain-relief infusion is a routine part of larger operations, such as dog spays and orthopedic surgery. It is known as a constant rate infusion (CRI), also called a continuous rate infusion. Rather than relying only on separate injections, a CRI delivers pain medication into a vein at a steady, precisely controlled rate, usually after a starting dose. We start the infusion before the first incision and continue it throughout the operation.'
  },
  'article.mlk.what.title': {
    fi: 'Miksi jatkuva infuusio?',
    sv: 'Varför kontinuerlig infusion?',
    en: 'Why Continuous Infusion?'
  },
  'article.mlk.what.text': {
    fi: 'Kun kipulääke annetaan erillisinä pistoksina, sen pitoisuus veressä nousee jokaisen annoksen jälkeen ja laskee sitten. Jos pitoisuus ehtii laskea liian matalaksi ennen seuraavaa annosta, kipu voi palata. Korkeat huippupitoisuudet puolestaan voivat lisätä sivuvaikutuksia. Jatkuva infuusio pitää pitoisuuden vakaampana, jolloin kivunlievitys on tasaisempaa. Infuusionopeutta voidaan myös säätää tarpeen mukaan. Joissakin tutkimuksissa, joissa koirille tehtiin suuri leikkaus, hoitoon lisätty ketamiini-infuusio – yksinään tai yhdessä lidokaiinin kanssa – vähensi kipua tai lisäkipulääkityksen tarvetta leikkauksen jälkeen.',
    sv: 'När ett smärtstillande läkemedel ges som separata injektioner stiger halten i blodet efter varje dos och sjunker sedan. Om halten hinner sjunka för lågt före nästa dos kan smärtan återkomma, medan höga toppar kan öka biverkningarna. En kontinuerlig infusion håller halten stabilare, vilket ger en jämnare smärtlindring. Infusionshastigheten kan dessutom justeras efter behov. I några studier på hundar som genomgick större operationer minskade smärtan eller behovet av extra smärtstillande efteråt när man lade till en infusion av ketamin, ensamt eller tillsammans med lidokain.',
    en: 'When a pain medication is given as separate injections, its level in the blood rises after each dose and then falls. If it falls too low before the next dose, pain can break through, while high peaks can increase side effects. A continuous infusion keeps the level steadier, giving more even pain relief. The rate can also be adjusted as needed. In some studies of dogs undergoing major surgery, adding a ketamine infusion, alone or with lidocaine, reduced pain or the need for extra pain medication afterward.'
  },
  'article.mlk.why.title': {
    fi: 'Multimodaalinen lähestymistapa',
    sv: 'Multimodalt angreppssätt',
    en: 'The Multimodal Approach'
  },
  'article.mlk.why.text': {
    fi: 'Kukin kipulääkeryhmä vaikuttaa pääasiassa tietyissä kohdissa kipuradan varrella. Kun yhdistetään lääkkeitä, jotka vaikuttavat eri kohdissa (multimodaalinen kivunlievitys), kipu saadaan paremmin hallintaan. Koska kutakin lääkettä voidaan silloin käyttää pienemmällä annoksella, myös sivuvaikutusten riski pienenee. Kipulääkeinfuusion runkona on tyypillisesti opioidi (morfiinin kaltainen kipulääke), johon yhdistetään usein ketamiinia, lidokaiinia tai deksmedetomidiinia. Infuusion rinnalla annetaan yleensä myös muuta kivunlievitystä, kuten tulehduskipulääkkeitä tai paikallispuudutuksia. Lääkkeet valitaan potilaskohtaisesti ja eläinlajin mukaan.',
    sv: 'Varje typ av smärtstillande läkemedel verkar främst på vissa punkter längs smärtbanan. Genom att kombinera läkemedel som verkar på olika punkter (multimodal smärtlindring) får man bättre smärtkontroll. Eftersom varje läkemedel då kan ges i lägre dos minskar också risken för biverkningar. En CRI för smärtlindring bygger i regel på en opioid (ett morfinliknande smärtstillande läkemedel), ofta i kombination med ketamin, lidokain eller dexmedetomidin. Den ges vanligen tillsammans med annan smärtlindring, till exempel antiinflammatoriska läkemedel (NSAID) eller lokalbedövande blockader. Läkemedlen väljs utifrån den enskilda patienten och djurarten.',
    en: 'Each type of pain medication acts mainly at certain points along the pain pathway. Combining drugs that act at different points (multimodal pain relief) gives better pain control. Because each drug can then be used at a lower dose, the risk of side effects is also reduced. A pain-relief CRI is typically built around an opioid (a morphine-type pain medication), often combined with ketamine, lidocaine or dexmedetomidine. It is usually given alongside other pain relief, such as anti-inflammatory drugs or numbing local anesthetic blocks. The drugs are chosen to suit each patient and species.'
  },
  'article.mlk.inhalant.title': {
    fi: 'Anestesiakaasua tarvitaan vähemmän',
    sv: 'Mindre behov av anestesigas',
    en: 'Less Anesthetic Gas Needed'
  },
  'article.mlk.inhalant.text': {
    fi: 'Kipulääkeinfuusiot voivat myös vähentää tarvittavan anestesiakaasun määrää. Eräässä laboratorio-olosuhteissa tehdyssä tutkimuksessa kuusi koiraa nukutettiin isofluraanilla – samalla kaasulla, jota käytämme klinikallamme. Pieniannoksiset morfiini-, lidokaiini- ja ketamiini-infuusiot yksinään tai yhdistelmänä vähensivät isofluraanin tarvetta noin 25–50 % laskematta verenpainetta. Kivunhoidon suosituksissa todetaan, että tästä lidokaiinin vaikutuksesta voi olla apua koirille, joilla on matala verenpaine ja jotka muuten tarvitsisivat paljon kaasua. Vastaavassa kissoilla tehdyssä tutkimuksessa lidokaiini niin ikään vähensi kaasun tarvetta, mutta kissojen sydän pumppasi vähemmän verta kuin yhtä syvässä, pelkällä kaasulla ylläpidetyssä anestesiassa. Siksi lidokaiini-infuusioita käytetään kissoilla vain varoen.',
    sv: 'Smärtlindringsinfusioner kan också minska mängden anestesigas som behövs. I en laboratoriestudie sövdes sex hundar med isofluran – den gas som vi använder. Infusioner av morfin, lidokain och ketamin i låga doser, var för sig eller i kombination, minskade isofluranbehovet med ungefär 25–50 % utan att sänka blodtrycket. Enligt riktlinjer för smärtbehandling kan denna effekt av lidokain vara till hjälp för hundar med lågt blodtryck som annars skulle behöva mycket gas. I en liknande studie på katter minskade lidokain också gasbehovet, men katternas hjärtan pumpade mindre blod än vid lika djup anestesi med enbart gas. Därför används lidokaininfusioner hos katter endast med försiktighet.',
    en: 'Pain-relief infusions can also reduce the amount of anesthetic gas needed. In a laboratory study, six dogs were anesthetized with isoflurane — the gas we use. Low-dose infusions of morphine, lidocaine and ketamine, alone or combined, reduced the amount of isoflurane needed by about 25–50% without lowering blood pressure. Pain guidelines note that this effect of lidocaine may help dogs with low blood pressure who would otherwise need a lot of gas. In a similar study in cats, lidocaine also reduced the amount of gas needed, but the cats’ hearts pumped less blood than under equally deep anesthesia with gas alone. Lidocaine infusions are therefore used in cats only with caution.'
  },
  'article.mlk.benefits.title': {
    fi: 'Käyttö klinikallamme',
    sv: 'Användning på vår klinik',
    en: 'Use at Our Clinic'
  },
  'article.mlk.benefits.text': {
    fi: 'Käytämme multimodaalista kipulääkeinfuusiota (CRI) rutiinisti koirien sterilisaatioissa, kasvain- ja maitorauhasleikkauksissa, vatsaonteloleikkauksissa sekä ortopedisissä leikkauksissa, kuten ristiside- ja murtumaleikkauksissa. Tarvittaessa infuusiota jatketaan leikkauksen jälkeenkin. Myös kastraatiot ja kissojen sterilisaatiot ovat kivuliaita, mutta niissä huolehdimme kivunlievityksestä muilla tavoin.',
    sv: 'Vi använder rutinmässigt multimodal CRI-smärtlindring vid sterilisering av tikar, tumör- och juveroperationer, bukoperationer och ortopedisk kirurgi, till exempel vid korsbandsskador och frakturer. Vid behov fortsätter infusionen efter operationen. Kastreringar och kattsteriliseringar är också smärtsamma, men vid dessa operationer ger vi smärtlindring på andra sätt.',
    en: 'We routinely use a multimodal pain-relief CRI in dog spays, tumor and mammary surgery, abdominal surgery and orthopedic surgery, such as cruciate ligament and fracture repair. When needed, the infusion continues after surgery. Castrations and cat spays are painful too, but for these operations we provide pain relief in other ways.'
  },
  'article.mlk.use.title': {
    fi: 'Mikä on kivun wind-up-ilmiö?',
    sv: 'Vad är smärtans ”wind-up”?',
    en: 'What Is Pain “Wind-Up”?'
  },
  'article.mlk.use.text': {
    fi: 'Kun kipuviestejä tulee jatkuvasti, selkäytimen hermosolut voivat reagoida niihin yhä voimakkaammin – tätä kutsutaan wind-up-ilmiöksi. Siihen liittyvä, pidempään kestävä muutos on sentraalinen herkistyminen: hermosto voimistaa kipua niin, että kevytkin kosketus voi sattua. Koska jo syntynyttä kipua on vaikeampi hoitaa, kivunhoidon suositukset neuvovat antamaan kivunlievitystä ennen leikkausta, sen aikana ja sen jälkeen. Usein CRI:hin kuuluva ketamiini salpaa hermosolujen NMDA-reseptoreita, joilla on keskeinen merkitys tässä kivun voimistumisessa. Ketamiinin käytöstä leikkausten yhteydessä tarvitaan kuitenkin vielä lisää tutkimusta. Hyvä kivunhallinta pienentää herkistymisen riskiä, mutta ei poista sitä kokonaan.',
    sv: 'När smärtsignaler fortsätter att komma kan nervcellerna i ryggmärgen reagera allt kraftigare – detta kallas wind-up. En besläktad och mer långvarig förändring är central sensitisering: nervsystemet förstärker smärtan så att även lätt beröring kan göra ont. Eftersom smärta som redan hunnit etablera sig är svårare att behandla, rekommenderar riktlinjer för smärtbehandling att smärtlindring ges före, under och efter operationen. Ketamin, som ofta ingår i en CRI, blockerar NMDA-receptorer på nervcellerna. Dessa receptorer spelar en nyckelroll i denna förstärkning. Mer forskning behövs dock om användningen av ketamin i samband med operationer. God smärtkontroll minskar risken för sensitisering men kan inte utesluta den.',
    en: 'When pain signals keep arriving, nerve cells in the spinal cord can respond more and more strongly — this is called wind-up. A related, longer-lasting change is central sensitization: the nervous system amplifies pain so that even light touch can hurt. Because pain that has already set in is harder to treat, pain guidelines recommend giving pain relief before, during and after surgery. Ketamine, often part of a CRI, blocks NMDA receptors — nerve-cell receptors that play a key role in this amplification. However, more research is needed on its use around surgery. Good pain control reduces the risk of sensitization but cannot rule it out.'
  },
  'article.mlk.windup.title': {
    fi: 'Turvallisuus',
    sv: 'Säkerhet',
    en: 'Safety'
  },
  'article.mlk.windup.text': {
    fi: 'Useiden lääkkeiden käyttö pienempinä annoksina auttaa vähentämään sivuvaikutuksia, mutta jokaisella lääkkeellä voi silti olla niitä. Infuusiossa käytettävät lääkkeet voivat esimerkiksi laskea verenpainetta tai sykettä tai aiheuttaa levotonta heräämistä. Jokaista potilasta valvotaan koko anestesian ajan, ja nukutuksesta vastaava säätää infuusionopeutta seurannan perusteella. Kysy meiltä rohkeasti, miten lemmikkisi kipua hoidetaan.',
    sv: 'Att använda flera läkemedel i lägre doser bidrar till att minska biverkningarna, men alla läkemedel kan ändå orsaka sådana. Läkemedlen i en CRI kan till exempel sänka blodtrycket eller hjärtfrekvensen, eller ge ett oroligt uppvaknande. Varje patient övervakas under hela anestesin, och den som ansvarar för anestesin justerar infusionshastigheten utifrån vad övervakningen visar. Fråga oss gärna hur smärtlindringen för ditt husdjur kommer att skötas.',
    en: 'Using several drugs at lower doses helps reduce side effects, but any drug can still cause them. CRI drugs can, for example, lower blood pressure or heart rate, or cause a restless recovery. Every patient is monitored throughout anesthesia, and the anesthetist adjusts the infusion rate according to what the monitoring shows. Feel free to ask us how your pet’s pain will be managed.'
  },
  'article.mlk.safety.title': { fi: '', sv: '', en: '' },
  'article.mlk.safety.text': { fi: '', sv: '', en: '' },

  // Article: Diarrhea
  'article.diarrhea.title': {
    fi: 'Ripuli koirilla ja kissoilla – syyt, kotihoito ja milloin ottaa yhteyttä klinikkaan',
    sv: 'Diarré hos hundar och katter – orsaker, hembehandling och när du ska kontakta kliniken',
    en: 'Diarrhoea in Dogs and Cats — Causes, Home Care and When to Contact the Clinic'
  },
  'article.diarrhea.intro': {
    fi: 'Ripuli on yksi yleisimmistä eläinlääkärikäyntien syistä. Useimmiten se on lievää ja menee ohi muutamassa päivässä – mutta ripuli voi olla myös merkki vakavasta sairaudesta. Kerromme, mistä ripuli johtuu, miten lemmikkiä hoidetaan kotona ja milloin kannattaa ottaa yhteyttä klinikkaan.',
    sv: 'Diarré är en av de vanligaste orsakerna till veterinärbesök. De flesta fall är lindriga och går över inom några dagar – men diarré kan också vara ett tecken på allvarlig sjukdom. Här går vi igenom vad som orsakar diarré, hur du sköter ditt djur hemma och när du ska kontakta kliniken.',
    en: 'Diarrhoea is one of the most common reasons for a veterinary visit. Most cases are mild and settle within a few days — but diarrhoea can also be a sign of serious illness. Here is what causes it, how to care for your pet at home and when to contact the clinic.'
  },
  'article.diarrhea.causes.title': {
    fi: 'Yleisimmät syyt',
    sv: 'De vanligaste orsakerna',
    en: 'Most Common Causes'
  },
  'article.diarrhea.causes.text': {
    fi: 'Koirilla ripuli johtuu useimmiten siitä, että koira on syönyt jotain sopimatonta, kuten roskia tai ruoantähteitä, tai ruoka on vaihdettu liian nopeasti. Kissoilla ripulin laukaisee usein äkillinen ruokavalion muutos. Muita syitä ovat suolistoloiset (esim. giardia, suolinkaiset ja kokkidit), stressi, ruoka-aineallergia tai -intoleranssi, myrkyt sekä nielaistut vierasesineet. Myös bakteeri- ja virusinfektiot ovat mahdollisia – vakavimpina parvovirus rokottamattomilla koiranpennuilla ja kissarutto (panleukopenia eli kissan parvovirus) rokottamattomilla kissanpennuilla. Ripulia, joka kestää noin kolmea viikkoa kauemmin tai uusiutuu toistuvasti, kutsutaan krooniseksi, ja sen syy on aina selvitettävä.',
    sv: 'Hos hundar är den vanligaste orsaken att hunden har ätit något olämpligt, till exempel skräp eller bordsrester, eller att fodret har bytts för snabbt. Hos katter är ett plötsligt foderbyte en vanlig utlösande faktor. Andra orsaker är inälvsparasiter (t.ex. giardia, spolmask och koccidier), stress, foderallergi eller -intolerans, gifter och föremål som djuret har svalt. Även bakterie- och virusinfektioner kan ligga bakom – allvarligast är parvovirus hos ovaccinerade valpar och kattpest (panleukopeni, kattens parvovirus) hos ovaccinerade kattungar. Diarré som pågår längre än ungefär tre veckor eller som återkommer gång på gång kallas kronisk och ska alltid utredas.',
    en: 'In dogs, the most common cause is eating something unsuitable, such as rubbish or table scraps, or changing food too quickly. In cats, a sudden change of diet is a common trigger. Other causes include intestinal parasites (such as Giardia, roundworms and coccidia), stress, food allergy or intolerance, toxins and swallowed foreign objects. Bacterial and viral infections are also possible — the most serious being parvovirus in unvaccinated puppies and panleukopenia (feline parvovirus) in unvaccinated kittens. Diarrhoea that lasts longer than about three weeks or keeps coming back is called chronic and always needs investigating.'
  },
  'article.diarrhea.homecare.title': {
    fi: 'Kotihoito',
    sv: 'Hembehandling',
    en: 'Home Care'
  },
  'article.diarrhea.homecare.text': {
    fi: 'Jos aikuinen lemmikkisi on muuten virkeä, syö ja juo normaalisti eikä ripuli ole veristä, voit kokeilla kotihoitoa 24–48 tunnin ajan. Älä paastota lemmikkiä: paastoa ei enää suositella – jopa vakavaa suolistoinfektiota sairastavat koirat toipuivat nopeammin, kun ne saivat ruokaa varhaisessa vaiheessa. Etenkin kissan on jatkettava syömistä: jo muutaman päivän niukan syömisen tai syömättömyyden jälkeen kissalle – varsinkin ylipainoiselle – voi kehittyä vaarallinen maksan rasvoittuminen (hepaattinen lipidoosi). Tarjoa mietoa, vähärasvaista ja helposti sulavaa ruokaa pieninä annoksina 4–6 kertaa päivässä. Klinikalta saa Royal Canin Gastro Intestinal -ruokia koirille ja kissoille. Muutaman päivän ajan sopii myös keitetty nahaton ja luuton kana keitetyn riisin kanssa (noin yksi osa kanaa ja kaksi osaa riisiä), mutta se ei ole täysipainoinen ruokavalio pitkäaikaiseen käyttöön. Raikasta vettä on oltava aina tarjolla. Kun uloste on taas normaalia, jatka mietoa ruokavaliota vielä muutaman päivän ajan ja palaa sitten tavalliseen ruokaan vähitellen noin viikon aikana. Pese kädet ulosteiden siivoamisen jälkeen: osa ripulin aiheuttajista, kuten kampylo- ja salmonellabakteerit, voi tarttua ihmisiin. Valvo lasten käsienpesua.',
    sv: 'Om ditt vuxna djur i övrigt är piggt, äter och dricker normalt och diarrén inte är blodig, kan du prova hembehandling i 24–48 timmar. Låt inte djuret svälta: fasta rekommenderas inte längre – till och med hundar med svår tarminfektion återhämtade sig snabbare när de fick mat tidigt. Särskilt katter måste fortsätta äta: redan efter några dagar med lite eller ingen mat kan en katt – i synnerhet en överviktig katt – drabbas av farlig leverförfettning (hepatisk lipidos). Ge fettsnål och lättsmält skonkost i små portioner 4–6 gånger om dagen. Kliniken säljer Royal Canin Gastro Intestinal-foder för hundar och katter. Under några dagar går det också bra med kokt kyckling utan skinn och ben tillsammans med kokt ris (ungefär en del kyckling till två delar ris), men det är ingen fullvärdig kost på längre sikt. Se till att färskt vatten alltid finns framme. När avföringen har blivit normal fortsätter du med skonkosten i några dagar och går sedan gradvis över till det vanliga fodret under ungefär en vecka. Tvätta händerna efter att du har städat upp efter djuret – vissa orsaker, till exempel bakterierna Campylobacter och Salmonella, kan smitta till människor. Se till att barnen också tvättar händerna ordentligt.',
    en: 'If your adult pet is otherwise bright, eating and drinking normally, and the diarrhoea is not bloody, you can try home care for 24–48 hours. Do not starve your pet: fasting is no longer recommended — even dogs with severe intestinal infection recovered faster when fed early. Cats especially must keep eating: after just a few days of eating little or nothing, a cat — particularly an overweight one — can develop dangerous fatty liver (hepatic lipidosis). Offer a bland, low-fat, easily digestible diet in small portions 4–6 times a day. The clinic sells Royal Canin Gastro Intestinal diets for dogs and cats; for a few days, boiled skinless, boneless chicken with boiled rice (about one part chicken to two parts rice) also works, but it is not a complete long-term diet. Always provide fresh water. Once the stool is normal, continue the bland diet for a few days, then return gradually to the usual food over about a week. Wash your hands after cleaning up: some causes, such as Campylobacter and Salmonella bacteria, can spread to people. Supervise children’s handwashing.'
  },
  'article.diarrhea.medicines.title': {
    fi: 'Probiootit ja lääkkeet',
    sv: 'Probiotika och läkemedel',
    en: 'Probiotics and Medicines'
  },
  'article.diarrhea.medicines.text': {
    fi: 'Eläimille tarkoitettu probiootti voi auttaa – kissoille myymme klinikalla FortiFloraa – vaikka näyttö sen hyödystä on melko vähäistä. Älä koskaan anna ihmisten lääkkeitä ilman eläinlääkärin ohjetta. Loperamidi (Imodium) voi aiheuttaa vakavia neurologisia myrkytysoireita koirille, joilla on MDR1-geenivirhe. Geenivirhe on yleinen collieilla, australianpaimenkoirilla ja shetlanninlammaskoirilla, ja sitä esiintyy myös muissa roduissa ja sekarotuisilla koirilla. Vismuttisubsalisylaattia sisältävät valmisteet (kuten ulkomailla myytävä Pepto-Bismol) voivat aiheuttaa kissalle myrkytyksen. Kansainväliset hoitosuositukset kehottavat välttämään antibiootteja koiran äkillisessä ripulissa – silloinkin, kun siinä on verta – ellei koira ole vakavasti sairas.',
    sv: 'Probiotika för djur kan hjälpa – för katter säljer kliniken FortiFlora – även om det vetenskapliga stödet är måttligt. Ge aldrig läkemedel avsedda för människor utan att först rådfråga veterinär. Loperamid (Imodium) kan ge allvarlig förgiftning med neurologiska symtom hos hundar som bär på en mutation i MDR1-genen – den är vanlig hos collie, australian shepherd och sheltie och förekommer även hos andra raser och blandraser. Preparat som innehåller vismutsubsalicylat (t.ex. Pepto-Bismol, som säljs utomlands) kan förgifta katter. För hundar med akut diarré avråder internationella riktlinjer från antibiotika – även när diarrén innehåller blod – om inte hunden är svårt sjuk.',
    en: 'A veterinary probiotic may help — for cats, the clinic sells FortiFlora — although the evidence is modest. Never give human medicines without veterinary advice. Loperamide (Imodium) can cause serious neurological poisoning in dogs carrying the MDR1 gene mutation — common in Collies, Australian Shepherds and Shelties, and also found in other breeds and crosses. Products containing bismuth subsalicylate (such as Pepto-Bismol, sold abroad) can poison cats. In dogs, international guidelines advise against antibiotics for acute diarrhoea — even when it contains blood — unless the dog is severely ill.'
  },
  'article.diarrhea.warning.title': {
    fi: 'Milloin ottaa yhteyttä eläinlääkäriin',
    sv: 'När du ska kontakta veterinären',
    en: 'When to Contact the Veterinarian'
  },
  'article.diarrhea.warning.text': {
    fi: 'Ota yhteyttä klinikkaan samana päivänä, jos ripulissa on verta (kirkkaanpunaista verta tai mustaa, tervamaista ulostetta); lemmikki oksentaa toistuvasti tai ei pysty pitämään vettäkään sisällään; se on vaisu tai heikko, tai sen vatsa vaikuttaa kipeältä; huomaat kuivumisen merkkejä (kuivat, tahmeat ikenet, kuoppiinsa painuneet silmät tai iho, joka palautuu hitaasti, kun sitä nostaa varovasti poimulle); lemmikki on voinut syödä jotain myrkyllistä tai vierasesineen; tai kissa ei ole syönyt yli vuorokauteen. Hiekkalaatikolla ponnistelevalla uroskissalla voi olla virtsaputken tukos – se on hätätilanne. Koiran- ja kissanpennut – etenkin rokottamattomat – tarvitsevat pikaisesti eläinlääkärin arvion: ne kuivuvat nopeasti, ja parvovirus voi olla hengenvaarallinen. Myös iäkkäät lemmikit, pienet rodut ja kroonisesti sairaat eläimet kuivuvat nopeammin. Jos ripuli ei ole helpottanut 48 tunnin kotihoidon jälkeen tai se uusiutuu, varaa aika vastaanotolle. Vinkki: valokuva ulosteesta auttaa eläinlääkäriä.',
    sv: 'Kontakta kliniken samma dag om diarrén innehåller blod (klarrött eller svart och tjärliknande); djuret kräks upprepade gånger eller inte kan behålla vatten; djuret är slött eller svagt eller verkar ha ont i magen; du ser tecken på uttorkning (torrt, klibbigt tandkött, insjunkna ögon eller hud som långsamt faller tillbaka när du försiktigt lyfter den); djuret kan ha ätit något giftigt eller svalt ett främmande föremål; eller din katt inte har ätit på mer än ett dygn. En hankatt som krystar i kattlådan kan ha urinvägsstopp – det är ett akutfall. Valpar och kattungar – särskilt ovaccinerade – ska bedömas utan dröjsmål: de torkar snabbt ut, och parvovirus kan vara livshotande. Även äldre djur, små raser och kroniskt sjuka djur torkar ut snabbare. Om det inte blir bättre efter 48 timmars hembehandling, eller om diarrén återkommer, ska du boka tid för undersökning. Tips: ett foto av avföringen hjälper veterinären.',
    en: 'Contact the clinic the same day if: the diarrhoea contains blood (bright red, or black and tarry); your pet vomits repeatedly or cannot keep water down; your pet is lethargic or weak, or its belly seems painful; you see signs of dehydration (dry, tacky gums, sunken eyes, or skin that is slow to fall back when gently lifted); your pet may have eaten something poisonous or a foreign object; or your cat has not eaten for more than a day. A male cat straining in the litter box may have a urinary blockage — an emergency. Puppies and kittens — especially unvaccinated ones — need prompt assessment: they dehydrate quickly, and parvovirus can be life-threatening. Elderly pets, small breeds and chronically ill animals also dehydrate faster. If there is no improvement after 48 hours of home care, or the diarrhoea recurs, book an examination. Tip: a photo of the stool helps the veterinarian.'
  },
  'article.diarrhea.prevention.title': {
    fi: 'Ehkäisy',
    sv: 'Förebyggande',
    en: 'Prevention'
  },
  'article.diarrhea.prevention.text': {
    fi: 'Vaihda ruoka vähitellen 7–10 päivän aikana. Älä anna ruoantähteitä tai luita, äläkä päästä lemmikkiä roskiin. Madota lemmikki sen yksilöllisen riskin mukaan – ulostenäyte auttaa selvittämään, tarvitaanko matolääkitystä. Apteekista saa matolääkkeitä ilman reseptiä, mutta ne eivät tehoa kaikkiin ripulin aiheuttajiin – esimerkiksi giardia ja kokkidit vaativat diagnoosin ja juuri niihin tarkoitetun hoidon. Pidä rokotukset ajan tasalla. Vähennä stressiä muutostilanteissa; feromonivalmisteet (kuten kissoille tarkoitettu Feliway) voivat auttaa joitakin eläimiä, vaikka näyttö on vähäistä.',
    sv: 'Byt foder gradvis under 7–10 dagar. Undvik bordsrester, ben och tillgång till sopor. Avmaska utifrån djurets risk – ett avföringsprov hjälper till att visa om behandling behövs. Apoteken säljer avmaskningsmedel utan recept, men de behandlar inte alla orsaker till diarré – giardia och koccidier kräver till exempel en diagnos och en specifik behandling. Håll vaccinationerna uppdaterade. Minska stressen vid förändringar; feromonpreparat (t.ex. Feliway för katter) kan hjälpa en del djur, även om det vetenskapliga stödet är begränsat.',
    en: 'Change food gradually over 7–10 days. Avoid table scraps, bones and access to rubbish. Deworm according to your pet’s risk — a faecal sample helps show whether treatment is needed. Pharmacies sell dewormers without a prescription, but they do not treat every cause of diarrhoea — Giardia and coccidia, for example, need a diagnosis and a specific treatment. Keep vaccinations up to date. Reduce stress during changes; pheromone products (such as Feliway for cats) may help some animals, though the evidence is limited.'
  },
  'article.diarrhea.contact.title': {
    fi: 'Ota yhteyttä',
    sv: 'Kontakta oss',
    en: 'Contact Us'
  },
  'article.diarrhea.contact.text': {
    fi: 'Jos olet epävarma, soita meille numeroon (06) 321 7300 tai lähetä sähköpostia osoitteeseen info@saarivet.fi – voit liittää mukaan valokuvia. Neuvomme, onko käynti tarpeen.',
    sv: 'Om du är osäker kan du ringa oss på (06) 321 7300 eller skicka e-post till info@saarivet.fi – du kan bifoga foton. Vi ger råd om huruvida ett besök behövs.',
    en: 'If you are unsure, call us on (06) 321 7300 or email info@saarivet.fi — you can attach photos. We will advise whether a visit is needed.'
  },

  // Article: PDA
  'article.pda.title': {
    fi: 'Avoin valtimotiehyt (PDA) koirilla – synnynnäinen sydänvika, joka on parannettavissa',
    sv: 'Öppen ductus arteriosus (PDA) hos hundar – ett medfött hjärtfel som kan botas',
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
    fi: 'Oireet – mitä omistaja voi huomata',
    sv: 'Symtom – vad ägaren kan märka',
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
    fi: 'PDA hoidetaan sulkemalla avoin valtimotiehyt. Tähän on kaksi päämenetelmää. Kirurginen ligatuura tehdään torakotomialla eli rintakehän avauksella, jossa tiehyt suljetaan ompelemalla – menetelmän onnistumisprosentti on yli 90–95 %. Katetritoimenpiteessä (ACDO, Amplatz Canine Duct Occluder) erikoislaite viedään reisivaltimon kautta tiehyeen ja se sulkee verisuonen sisältäpäin – tämä on vähemmän invasiivinen, ja onnistumisprosentti on yli 95–98 %. Lääkehoidolla voidaan vakauttaa potilaan tila ennen toimenpidettä, mutta se ei paranna PDA:ta. Mitä aikaisemmin sulku tehdään – mieluiten ennen 6 kuukauden ikää – sitä parempi ennuste.',
    sv: 'PDA behandlas genom att stänga den öppna ductus arteriosus. Det finns två huvudmetoder. Kirurgisk ligering utförs via torakotomi, där kanalen stängs med suturer – metoden har över 90–95 % framgångsfrekvens. Vid kateterbaserad stängning (ACDO, Amplatz Canine Duct Occluder) förs en speciell anordning via lårbensartären till kanalen och stänger blodkärlet inifrån – detta är mindre invasivt med över 95–98 % framgångsfrekvens. Medicinsk behandling kan stabilisera patienten före ingreppet men botar inte PDA. Ju tidigare stängningen görs – helst före 6 månaders ålder – desto bättre prognos.',
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
    fi: 'Jokaisen pennun sydän tulee kuunnella ensimmäisellä eläinlääkärikäynnillä. Jos sivuääni todetaan, jatkotutkimus sydämen ultraäänellä tulee tehdä viipymättä. PDA on parannettavissa – kunhan se havaitaan ajoissa. Alttiiden rotujen kasvattajien ja omistajien tulisi olla erityisen valppaina.',
    sv: 'Varje valps hjärta bör auskulteras vid det första veterinärbesöket. Om ett blåsljud upptäcks bör vidare undersökning med hjärtultraljud ske utan dröjsmål. PDA kan botas – förutsatt att det upptäcks i tid. Uppfödare och ägare av predisponerade raser bör vara särskilt uppmärksamma.',
    en: 'Every puppy\'s heart should be auscultated at the first veterinary visit. If a murmur is detected, further examination with cardiac ultrasound should be done without delay. PDA is curable — as long as it is detected in time. Breeders and owners of predisposed breeds should be especially vigilant.'
  },

  // Article: Grain-Free Food
  'article.grainfree.title': {
    fi: 'Viljaton ruoka koirille ja kissoille – onko se tarpeellista vai haitallista?',
    sv: 'Spannmålsfri mat för hundar och katter – är det nödvändigt eller skadligt?',
    en: 'Grain-Free Food for Dogs and Cats — Is It Necessary or Harmful?'
  },
  'article.grainfree.intro': {
    fi: 'Viljaton lemmikkien ruokavalio on ollut valtava trendi viime vuosina. Markkinointi lupaa "luonnollisempaa" ruokavaliota, mutta vuonna 2018 Yhdysvaltain elintarvike- ja lääkevirasto FDA alkoi selvittää mahdollista yhteyttä viljattomien ruokavalioiden ja koirien sydänsairauden (DCM) välillä. Tässä artikkelissa käymme läpi, mitä tiede tällä hetkellä sanoo – ja mitä eläinlääkärit suosittelevat.',
    sv: 'Spannmålsfri djurmat har varit en enorm trend de senaste åren. Marknadsföringen lovar en "mer naturlig" kost, men 2018 började amerikanska livsmedels- och läkemedelsmyndigheten FDA utreda ett möjligt samband mellan spannmålsfri kost och hjärtsjukdom (DCM) hos hundar. I denna artikel reder vi ut vad forskningen just nu säger – och vad veterinärer rekommenderar.',
    en: 'Grain-free pet food has been a huge trend in recent years. Marketing promises a "more natural" diet, but in 2018 the U.S. Food and Drug Administration (FDA) began investigating a possible link between grain-free diets and heart disease (DCM) in dogs. In this article we review what the science currently says — and what veterinarians recommend.'
  },
  'article.grainfree.fda.title': {
    fi: 'FDA:n tutkimus ja sydänsairaus',
    sv: 'FDA:s undersökning och hjärtsjukdom',
    en: 'The FDA Investigation and Heart Disease'
  },
  'article.grainfree.fda.text': {
    fi: 'FDA selvitti satoja ilmoituksia dilatoivasta kardiomyopatiasta (DCM) – sydänsairaudesta, jossa sydänlihas heikkenee ja sydän laajenee. Huolta herätti se, että ilmoituksissa oli mukana myös rotuja, joita ei ole perinteisesti pidetty DCM:lle alttiina, kuten kultaisianoutajia, labradorinnoutajia ja sekarotuisia. FDA:n vuonna 2019 julkaisemaan koosteeseen sisältyi 515 koiraa koskevaa ilmoitusta vuosilta 2014–2019: ilmoitetuista ruoista yli 90 % oli viljattomia ja 93 % sisälsi herneitä ja/tai linssejä (FDA). Luvut kuvaavat sitä, millaisia ruokia ilmoituksissa mainittiin, eivät sitä, kuinka yleinen sairaus on – ilmoittaminen on vapaaehtoista, ja FDA on saanut ilmoituksia sekä viljattomista että viljaa sisältävistä ruoista. Kontrolloiduissa ruokintakokeissa yhteyttä ei ole toistaiseksi saatu esiin. Kun 28 siperianhuskya ruokittiin 20 viikon ajan ruoilla, joiden palkokasvipitoisuus oli 0–45 %, sydämen ultraäänilöydöksissä tai sydämen merkkiaineissa ei ollut eroja. 18 kuukautta kestäneessä satunnaistetussa kokeessa 60 koiraa sai neljää eri ruokaa, eikä sydämen merkkiaineissa todettu kliinisesti merkittäviä muutoksia; yhdellekään koiralle ei kehittynyt DCM:ää. Tutkimukset ovat pieniä, eivätkä ne yksin ratkaise kysymystä. FDA ei ole osoittanut syy-yhteyttä, ja sen mukaan palkokasveja on käytetty lemmikkiruoissa pitkään ilman näyttöä siitä, että ne olisivat sellaisenaan haitallisia; uusia päivityksiä aiheesta ei ole julkaistu vuoden 2022 lopun jälkeen. Yhteys viljattoman ruoan ja DCM:n välillä on siis tieteellisesti yhä avoin – ei vahvistettu eikä poissuljettu. Kahdessa laajassa havainnoivassa tutkimuksessa – joissa koiria ei ruokittu tutkimusruoalla, vaan ne tutkittiin tavanomaisen kotiruokansa ääressä – sydämen ultraäänilöydöksissä ei ollut eroja ruokavalioryhmien välillä, mutta kammiolisälyöntejä eli sydämen kammiosta lähteviä ylimääräisiä lyöntejä todettiin molemmissa enemmän viljatonta tai runsaasti palkokasveja sisältävää ruokaa syöneillä. Ensimmäisessä tutkimuksessa, jossa oli 188 tervettä koiraa, lisälyöntejä oli 10 %:lla niistä, joiden ruoan kymmenen ensimmäisen ainesosan joukossa oli herneitä, linssejä tai perunaa, ja 2 %:lla muista; samalla koirajoukolla viljatonta ruokaa syöneillä oli myös korkeampi sydämen troponiini I -pitoisuus – troponiini on verestä mitattava merkkiaine, ja tutkijoiden mukaan löydös voi viitata lievään sydänlihassoluvaurioon. Toisessa tutkimuksessa 97 irlanninsusikoirasta lisälyöntejä todettiin 17 %:lla runsaasti palkokasveja sisältävää ruokaa syöneistä ja 2 %:lla vähän palkokasveja sisältävää ruokaa syöneistä (6 koiraa 35:stä ja 1 koira 62:sta), ja tutkijat arvioivat löydösten voivan olla merkki varhaisista sydänmuutoksista. Kyse on havainnoivista tutkimuksista, joten ne eivät osoita ruokaa eron syyksi, ja koiramäärät ovat pieniä – yksittäisiä lisälyöntejä esiintyy myös terveillä koirilla.',
    sv: 'FDA utredde hundratals rapporter om dilaterad kardiomyopati (DCM) – en hjärtsjukdom där hjärtmuskeln försvagas och hjärtat förstoras. Det som väckte uppmärksamhet var att rapporterna också gällde raser som inte traditionellt har ansetts ha någon benägenhet för DCM, till exempel golden retriever, labrador och blandrashundar. I de 515 rapporter om hundar som FDA gick igenom, inlämnade mellan januari 2014 och april 2019, var över 90 % av produkterna spannmålsfria och 93 % innehöll ärter och/eller linser (FDA). Andelarna beskriver hur de frivilligt inlämnade rapporterna fördelar sig, inte hur vanlig sjukdomen är, och FDA har tagit emot rapporter som gäller både spannmålsfria och spannmålshaltiga foder. I kontrollerade utfodringsstudier har man hittills inte kunnat påvisa något samband. När 28 hundar av rasen siberian husky under 20 veckor fick foder med ett baljväxtinnehåll på 0–45 % sågs ingen skillnad vare sig i hjärtultraljudet eller i hjärtmarkörerna i blodet. I en randomiserad studie under 18 månader fick 60 hundar fyra olika foder, och inga kliniskt betydelsefulla förändringar konstaterades i hjärtmarkörerna; ingen av hundarna utvecklade DCM. Studierna är små och avgör inte frågan på egen hand. FDA har inte kunnat fastställa något orsakssamband, och konstaterar att baljväxter har använts i djurfoder i många år utan att det finns belägg för att de i sig skulle vara farliga; inga nya uppdateringar har publicerats sedan slutet av 2022. Sambandet mellan spannmålsfri mat och DCM är alltså fortfarande vetenskapligt öppet – varken bekräftat eller uteslutet. I två observationsstudier – 188 friska hundar av fyra raser respektive 97 irländska varghundar – såg hjärtat likadant ut på ultraljud oavsett foder: inga skillnader i hjärtats mått eller pumpförmåga. Däremot hade hundarna på spannmålsfritt eller baljväxtrikt foder i båda studierna oftare kammarextraslag, alltså enstaka hjärtslag som utlöses från hjärtats kammare i stället för från hjärtats normala taktgivare: 10 % mot 2 % i den ena och 17 % mot 2 % i den andra. I den förstnämnda studien, där samma 188 hundar delades in både efter spannmålsfritt foder och efter om ärter, linser eller potatis fanns bland de tio första ingredienserna, var dessutom högkänsligt kardiellt troponin I högre – ett protein som läcker ut i blodet när hjärtmuskelceller skadas, och som enligt forskarna själva kan tyda på en låggradig skada på hjärtmuskelcellerna. Båda studierna är observationsstudier: de kan visa att två saker förekommer tillsammans, men inte att fodret orsakar fynden. Enstaka kammarextraslag ses också hos fullt friska hundar, och skillnaderna bygger på få hundar.',
    en: 'The FDA investigated hundreds of reports of dilated cardiomyopathy (DCM) — a heart disease in which the heart muscle weakens and the heart enlarges. What raised concern was that the reports also included breeds not traditionally considered predisposed to DCM, such as Golden Retrievers, Labradors and mixed breeds. The FDA’s 2019 summary covered 515 canine reports submitted between January 2014 and April 2019: of the products reported, over 90% were grain-free and 93% contained peas and/or lentils (FDA). These figures describe which foods were named in voluntary reports, not how common the disease is, and the FDA has received reports of non-hereditary DCM involving both grain-free and grain-containing foods. Controlled feeding trials have so far not shown a link. When 28 Siberian Huskies were fed diets with a pulse content of 0–45% for 20 weeks, there was no difference in cardiac ultrasound findings or cardiac biomarkers. In an 18-month randomised trial, 60 dogs received four different foods, and no clinically significant changes were found in cardiac biomarkers; no dog developed DCM. These studies are small and do not settle the question on their own. The FDA has not established a causal link, and states that legumes have been used in pet foods for many years with no evidence that they are inherently dangerous; no new updates have been published since the end of 2022. The link between grain-free food and DCM therefore remains scientifically open — neither confirmed nor ruled out. In two large observational studies — in which the dogs were not fed a study diet but were examined on their usual home food — there were no differences in heart ultrasound findings between the diet groups, but in both, ventricular premature complexes (extra beats originating in the heart’s ventricle) were more common in dogs eating grain-free or pulse-heavy food. In the first study, of 188 healthy dogs, extra beats occurred in 10% of those whose food had peas, lentils or potato among the first ten ingredients and in 2% of the others; in the same group of dogs, those eating grain-free food also had a higher cardiac troponin I concentration — troponin is a marker measured in blood, and according to the researchers the finding might indicate low-level heart muscle cell injury. In the second study, of 97 Irish Wolfhounds, extra beats were found in 17% of those eating a high-pulse food and in 2% of those eating a low-pulse food (6 dogs out of 35 and 1 out of 62), and the researchers considered the findings could represent early cardiac changes. These are observational studies, so they do not show the food to be the cause of the difference, and the numbers of dogs are small — occasional extra beats also occur in healthy dogs.'
  },
  'article.grainfree.myth.title': {
    fi: 'Tarvitseeko lemmikkini viljatonta ruokaa?',
    sv: 'Behöver mitt husdjur spannmålsfri mat?',
    en: 'Does My Pet Need Grain-Free Food?'
  },
  'article.grainfree.myth.text': {
    fi: 'Markkinointiväite siitä, että viljat ovat pelkkiä "täyteaineita" tai yleinen allergioiden syy, ei perustu tieteeseen. Koirat ovat kehittyneet tuhansia vuosia ihmisen rinnalla, ja niillä on moninkertainen määrä kopioita tärkkelystä pilkkovasta AMY2B-geenistä verrattuna susiin, joilla kopioita on johdonmukaisesti hyvin vähän (Axelsson ym., Nature 2013). Tämän geneettisen sopeutuman ansiosta koira sulattaa kypsennettyä viljaa erittäin tehokkaasti. Vilja-allergia on myös selvästi harvinaisempi kuin eläinproteiiniallergia: yleisimmät ruoka-allergeenit koirilla ovat nauta (34 %), maitotuotteet (17 %) ja kana (15 %), kun taas vehnä aiheuttaa noin 13 %, maissi 4 % ja riisi 2 % tapauksista (Mueller ym., 2016).',
    sv: 'Marknadsföringspåståendet att spannmål bara är "fyllmedel" eller en vanlig orsak till allergier saknar vetenskapligt stöd. Hundar har utvecklats i tusentals år vid människans sida, och ett av de tydligaste spåren av det finns i arvsmassan: hunden bär klart fler kopior av den stärkelsenedbrytande genen AMY2B än vargen gör. Antalet kopior varierar mellan individer och raser, men skillnaden mot vargen är genomgående (Axelsson m.fl., Nature 2013). Tack vare denna genetiska anpassning smälter hunden tillagad spannmål mycket effektivt. Spannmålsallergi är också klart ovanligare än allergi mot animaliskt protein: de vanligaste matallergenerna hos hund är nötkött (34 %), mejeriprodukter (17 %) och kyckling (15 %), medan vete orsakar cirka 13 %, majs 4 % och ris 2 % av fallen (Mueller m.fl., 2016).',
    en: 'Probably not. The marketing claim that grains are merely "fillers" or a common cause of allergies is not supported by science. Dogs have evolved alongside humans for thousands of years and carry many times more copies of the starch-digesting AMY2B gene than wolves, which consistently have very few (Axelsson et al., Nature 2013). Thanks to this genetic adaptation, dogs digest cooked grains very efficiently. Grain allergy is also clearly less common than animal-protein allergy: the most common food allergens in dogs are beef (34%), dairy (17%) and chicken (15%), while wheat causes about 13%, corn 4% and rice 2% of cases (Mueller et al., 2016).'
  },
  'article.grainfree.cats.title': {
    fi: 'Entä kissat?',
    sv: 'Hur är det med katter?',
    en: 'What About Cats?'
  },
  'article.grainfree.cats.text': {
    fi: 'Kissat ovat lihansyöjiä ja tarvitsevat runsaasti eläinproteiinia. Viljattomat kissanruoat korvaavat kuitenkin viljat usein perunalla, herneillä tai tapiokalla – jolloin hiilihydraattipitoisuus on käytännössä sama tai jopa korkeampi. Tutkimukset osoittavat, että kissat sulattavat myös kasvipohjaiset hiilihydraatit tehokkaasti: tärkkelyksen kokonaissulavuus on yli 93 %, ruoka-aineesta riippuen noin 94–99 % (de-Oliveira ym., 2008). Kissojen ruoassa tärkeintä on riittävä eläinproteiinin ja tauriinin määrä – ei se, onko ruoka viljatonta vai ei.',
    sv: 'Katter är köttätare och behöver rikligt med animaliskt protein. Spannmålsfria kattfoder ersätter dock ofta spannmål med potatis, ärtor eller tapioka – varvid kolhydratinnehållet i praktiken är detsamma eller till och med högre. Studier visar att katter smälter även växtbaserade kolhydrater effektivt: stärkelsens totala smältbarhet är över 93 %, beroende på råvara cirka 94–99 % (de-Oliveira m.fl., 2008). Det viktigaste i kattmaten är tillräckligt med animaliskt protein och taurin – inte huruvida maten är spannmålsfri eller inte.',
    en: 'Cats are carnivores and need plenty of animal protein. However, grain-free cat foods often replace grains with potatoes, peas or tapioca — meaning the carbohydrate content is practically the same or even higher. Studies show cats digest plant-based carbohydrates efficiently too: total starch digestibility is over 93%, ranging from about 94% to 99% depending on the ingredient (de-Oliveira et al., 2008). What matters most in cat food is adequate animal protein and taurine — not whether it is grain-free or not.'
  },
  'article.grainfree.advice.title': {
    fi: 'Eläinlääkärin suositus',
    sv: 'Veterinärens rekommendation',
    en: 'Veterinary Recommendation'
  },
  'article.grainfree.advice.text': {
    fi: 'Viljattomasta ruoasta ei ole osoitettu olevan hyötyä terveelle koiralle tai kissalle, joten sitä ei kannata valita ilman lääketieteellistä syytä. Herneiden, linssien tai kikherneiden osuuden ei ole osoitettu olevan haitallinen, joten pelkkä sijainti ainesosaluettelossa ei ole syy vaihtaa ruokaa – jos asia mietityttää, voit ottaa sen puheeksi eläinlääkärin kanssa. WSAVA suosittelee kysymään valmistajalta, onko sillä palveluksessaan eläinravitsemuksen asiantuntijoita ja tekeekö se ruokintakokeita. Jos epäilet ruoka-aineallergiaa, ota yhteyttä eläinlääkäriin – allergia todetaan eliminaatiodieetillä, ei ruokaa satunnaisesti vaihtamalla. Jos lemmikkisi syö nyt viljatonta ruokaa, voit keskustella vaihtoehdoista eläinlääkärisi kanssa. Oireet, jotka voivat viitata sydänsairauteen – väsyminen, yskä tai hengenahdistus – kannattaa aina tutkituttaa ruokavalinnasta riippumatta. Kerromme avoimuuden vuoksi, että Eläinklinikka Saari myy myös lemmikkiruokia.',
    sv: 'Spannmålsfri mat har inte visats ge någon nytta för en frisk hund eller katt, och därför finns det ingen orsak att välja sådan mat utan medicinsk grund. Andelen ärter, linser eller kikärter har inte visats vara skadlig, och enbart deras plats i innehållsförteckningen är därför inget skäl att byta mat – om saken bekymrar dig kan du ta upp den med din veterinär. WSAVA rekommenderar att du frågar tillverkaren om företaget har en expert på djurens näringslära anställd och om det gör utfodringsförsök. Misstänker du foderallergi, kontakta din veterinär – allergin konstateras med eliminationsdiet, inte genom att byta mat på måfå. Om ditt djur i dag äter spannmålsfri mat kan du diskutera alternativen med din veterinär. Symtom som kan tyda på hjärtsjukdom – trötthet, hosta eller andnöd – bör alltid undersökas, oberoende av vilken mat djuret äter. Eläinklinikka Saari säljer djurfoder, och det vill vi nämna för öppenhetens skull.',
    en: 'Grain-free feeding has not been shown to benefit a healthy dog or cat, so there is no reason to choose it without a medical indication. The proportion of peas, lentils or chickpeas has not been shown to be harmful, so their position in the ingredient list is not in itself a reason to change food — if it is on your mind, you can raise it with your vet. WSAVA recommends asking the manufacturer whether it employs animal nutrition experts and whether it conducts feeding trials. If you suspect a food allergy, contact your veterinarian — an allergy is diagnosed with an elimination diet, not by randomly switching foods. If your pet currently eats grain-free food, you can discuss the options with your vet. Signs that may point to heart disease — tiring easily, coughing or difficulty breathing — should always be investigated, whatever the food. Eläinklinikka Saari sells pet food; we mention this for transparency.'
  },
  'article.sources.heading': { fi: 'Lähteet', sv: 'Källor', en: 'Sources' },

  // Article: Dental Brushing
  'article.brushing.title': {
    fi: 'Hampaiden harjaus – paras asia, jonka voit tehdä lemmikkisi hampaiden hyväksi',
    sv: 'Tandborstning – det bästa du kan göra för ditt husdjurs tänder',
    en: 'Tooth Brushing — The Best Thing You Can Do for Your Pet\'s Teeth'
  },
  'article.brushing.intro': {
    fi: 'Jo noin 2–3 vuoden ikään mennessä valtaosalla koirista ja kissoista on jonkinasteinen hammassairaus (arviolta 70–80 %, joidenkin tutkimusten mukaan jopa 90 %). Hammassairaudet aiheuttavat kroonista kipua, infektioita ja voivat vahingoittaa jopa sydäntä, munuaisia ja maksaa. Päivittäinen hampaiden harjaus on tehokkain keino ehkäistä näitä ongelmia – ja se on helpompaa kuin luulet.',
    sv: 'Redan vid cirka 2–3 års ålder har de flesta hundar och katter någon grad av tandsjukdom (uppskattningsvis 70–80 %, enligt vissa studier upp till 90 %). Tandsjukdomar orsakar kronisk smärta, infektioner och kan till och med skada hjärtat, njurarna och levern. Daglig tandborstning är det mest effektiva sättet att förebygga dessa problem – och det är enklare än du tror.',
    en: 'By around 2–3 years of age, most dogs and cats have some degree of dental disease (an estimated 70–80%, and up to 90% in some studies). Dental disease causes chronic pain, infections and can even damage the heart, kidneys and liver. Daily tooth brushing is the most effective way to prevent these problems — and it is easier than you think.'
  },
  'article.brushing.why.title': {
    fi: 'Miksi päivittäin?',
    sv: 'Varför dagligen?',
    en: 'Why Daily?'
  },
  'article.brushing.why.text': {
    fi: 'Plakki – bakteerien muodostama pehmeä kerros – alkaa muodostua hampaiden pinnoille 6–8 tunnin kuluessa puhdistuksen jälkeen. Muutamassa päivässä plakki alkaa kovettua hammaskiveksi, jota ei enää saa harjaamalla pois. Siksi päivittäinen harjaus on ratkaisevan tärkeää: se katkaisee kierteen ennen kuin plakki ehtii kovettua. Päivittäinen harjaus vähentää plakin kertymistä merkittävästi, ja se on tutkimusten mukaan selvästi tehokkaampaa kuin harvemmin tehty harjaus – päivittäinen on tavoite.',
    sv: 'Plack – en mjuk beläggning av bakterier – börjar bildas på tandytorna 6–8 timmar efter rengöring. Inom några dagar börjar plack hårdna till tandsten, som inte längre kan avlägsnas med borstning. Därför är daglig borstning avgörande: den bryter cykeln innan plack hinner hårdna. Daglig borstning minskar plackbildningen betydligt och är enligt studier klart effektivare än mindre frekvent borstning – dagligen är målet.',
    en: 'Plaque — a soft layer of bacteria — begins forming on tooth surfaces within 6–8 hours of cleaning. Within a few days, plaque begins to harden into tartar that can no longer be removed by brushing. This is why daily brushing is critical: it breaks the cycle before plaque hardens. Daily brushing reduces plaque buildup substantially and, studies show, is clearly more effective than less frequent brushing — daily is the goal.'
  },
  'article.brushing.how.title': {
    fi: 'Näin harjaat lemmikkisi hampaat',
    sv: 'Så borstar du ditt husdjurs tänder',
    en: 'How to Brush Your Pet\'s Teeth'
  },
  'article.brushing.how.text': {
    fi: 'Käytä aina eläimille tarkoitettua hammastahnaa – ei koskaan ihmisten tahnaa, joka voi sisältää ksylitolia (erittäin myrkyllistä koirille) ja fluorideja. Eläintahnat ovat turvallisia niellä, ja niitä on saatavana lihan- ja kalan makuisina. Parhaiten sopii pehmeä lasten hammasharja, tai sormiharja. Nosta lemmikin huulta ja harjaa hampaat 45 asteen kulmassa ienrajaa vasten pyörivin liikkein. Opettele ensin harjaamaan ulkopinnat, ja jos lemmikkisi antaa niin voi yrittää harjata myös sisäpintoja. Etenkin poskihampaat on hyvä puhdistaa kunnolla. 1–2 minuuttia kerralla riittää.',
    sv: 'Använd alltid tandkräm avsedd för djur – aldrig mänsklig tandkräm som kan innehålla xylitol (extremt giftigt för hundar) och fluorid. Djurtandkräm är säker att svälja och finns i kött- och fisk smaker. Bäst passar en mjuk barntandborste eller fingerborste. Lyft läppen och borsta i 45 graders vinkel mot tandköttsranden med cirkulära rörelser. Lär dig först borsta yttersidorna, och om ditt husdjur tillåter kan du också försöka borsta insidorna. Särskilt kindtänderna är viktiga att rengöra ordentligt. 1–2 minuter räcker.',
    en: 'Always use toothpaste made for pets — never human toothpaste, which may contain xylitol (extremely toxic to dogs) and fluoride. Pet toothpaste is safe to swallow and comes in meat and fish flavors. A soft children\'s toothbrush or finger brush works best. Lift the lip and brush at a 45-degree angle to the gumline using circular motions. First learn to brush the outer surfaces, and if your pet allows, you can also try brushing the inner surfaces. The molars in particular should be cleaned thoroughly. 1–2 minutes is enough.'
  },
  'article.brushing.start.title': {
    fi: 'Näin totutat lemmikkisi harjaukseen',
    sv: 'Så vänjer du ditt husdjur vid borstning',
    en: 'Getting Your Pet Used to Brushing'
  },
  'article.brushing.start.text': {
    fi: 'Aloita rauhallisesti. Ensimmäisellä viikolla totuta lemmikkisi suun käsittelyyn koskettamalla huulia ja hampaita sormella. Toisella viikolla anna lemmikkisi maistaa hammastahnaa sormeltasi ja hiero sitä etuhampaiden pintaan. Kolmannella viikolla ota harja mukaan ja harjaa muutama hammas. Laajenna vähitellen harjattavaa aluetta. Anna aina palkinto jälkeenpäin. Älä pakota – pidä tuokiot lyhyinä ja positiivisina. Pentuiällä aloittaminen on helpointa, mutta myös aikuinen eläin voi oppia hampaiden harjaukseen.',
    sv: 'Börja lugnt. Under första veckan, vänj husdjuret vid munhantering genom att röra vid läppar och tänder med fingret. Under andra veckan, låt husdjuret smaka på tandkrämen från ditt finger och gnid lite på framtänderna. Under tredje veckan, ta med borsten och borsta några tänder. Utöka gradvis det borstade området. Ge alltid belöning efteråt. Tvinga inte – håll stunderna korta och positiva. Det är lättast att börja som valp, men även vuxna djur kan lära sig.',
    en: 'Start slowly. During the first week, get your pet used to mouth handling by touching the lips and teeth with your finger. In the second week, let your pet taste the toothpaste from your finger and rub some on the front teeth. In the third week, introduce the brush and brush a few teeth. Gradually expand the area. Always reward afterward. Never force — keep sessions short and positive. Starting as a puppy is easiest, but adult animals can learn too.'
  },
  'article.brushing.signs.title': {
    fi: 'Hammassairauden merkit',
    sv: 'Tecken på tandsjukdom',
    en: 'Signs of Dental Disease'
  },
  'article.brushing.signs.text': {
    fi: 'Pahanhajuinen hengitys (ei ole normaalia!), punaiset tai turvonneet ikenet, näkyvä hammaskivi, ruuan putoaminen suusta lemmikin syödessä, toispuoleinen pureskelu, kuolaaminen, kasvojen turvotus, haluttomuus antaa koskea päähän, käyttäytymisen muutokset tai painon lasku. Muista, että eläimet piilottavat kipua – monet vakavasti sairaat lemmikit syövät edelleen normaalisti. Omistajat raportoivat usein dramaattisen muutoksen käytöksessä hammashoidon jälkeen.',
    sv: 'Dålig andedräkt (det är inte normalt!), rött eller svullet tandkött, synlig tandsten, tappar mat vid ätande, tuggar bara på ena sidan, dregling, svullnad i ansiktet, ovilja att bli berörd vid huvudet, beteendeförändringar eller viktnedgång. Kom ihåg att djur döljer smärta – många allvarligt sjuka husdjur fortsätter äta normalt. Ägare rapporterar ofta dramatisk beteendeförbättring efter tandbehandling.',
    en: 'Bad breath (this is not normal!), red or swollen gums, visible tartar, dropping food while eating, chewing on one side only, drooling, facial swelling, reluctance to have the head touched, behavioral changes or weight loss. Remember that animals hide pain — many seriously ill pets continue eating normally. Owners often report dramatic behavioral improvement after dental treatment.'
  },
  'article.brushing.professional.title': {
    fi: 'Ammattimainen hammaspuhdistus',
    sv: 'Professionell tandrengöring',
    en: 'Professional Dental Cleaning'
  },
  'article.brushing.professional.text': {
    fi: 'Vaikka harjaisit lemmikin hampaat päivittäin, ammattimainen hammastarkastus ja puhdistus yleisanestesiassa on tarpeen ajoittain. Silloin pääsemme käsittelemään ienrajan alaiset alueet, otamme hammasröntgenkuvat (jopa 60 % hammassairauksista on piilossa ienrajan alla) ja tarkastamme jokaisen hampaan yksitellen. Yleisanestesia on välttämätön turvalliseen ja perusteelliseen puhdistukseen. Niin sanottu "hampaiden puhdistus ilman anestesiaa" on vain kosmeettista – se ei hoida ienrajan alaista sairautta, eikä korvaa eläinlääkärin tekemää hammastarkastusta- tai hoitoa.',
    sv: 'Även om du borstar dagligen behövs professionell tandrengöring under generell anestesi med jämna mellanrum. Vid professionell rengöring kan vi behandla områden under tandköttsranden, ta tandröntgen (upp till 60 % av tandsjukdomar är dolda under tandköttsranden) och undersöka varje tand. Generell anestesi är nödvändig för en säker och grundlig rengöring. Så kallad "anestesifri tandrengöring" är bara kosmetisk – den behandlar inte sjukdom under tandköttsranden och ger en falsk känsla av trygghet.',
    en: 'Even with daily brushing, professional dental cleaning under general anesthesia is needed periodically. During professional cleaning we can treat areas below the gumline, take dental X-rays (up to 60% of dental disease is hidden below the gumline) and examine every tooth. General anesthesia is essential for safe and thorough cleaning. So-called "anesthesia-free dental cleaning" is purely cosmetic — it does not address disease below the gumline and gives a false sense of security.'
  },
  'article.brushing.challenge.title': {
    fi: '#BrushChamp – harjaatko joka päivä?',
    sv: '#BrushChamp – borstar du varje dag?',
    en: '#BrushChamp — Do You Brush Every Day?'
  },
  'article.brushing.challenge.text': {
    fi: 'Eläinklinikka Saarella arvostamme omistajia, jotka sitoutuvat lemmikkinsä hampaiden päivittäiseen harjaamiseen. Jos harjaat lemmikkisi hampaat joka päivä, kerro siitä meille – olet ansainnut #BrushChamp-mitalin! Ota yhteyttä klinikalla tai sähköpostitse: info@saarivet.fi.',
    sv: 'På Djurklinik Saari uppskattar vi ägare som engagerar sig i daglig tandborstning av sitt husdjur. Om du borstar ditt husdjurs tänder varje dag, berätta för oss – hedersmedlemmar får #BrushChamp-medaljen! Kontakta oss på kliniken eller via e-post: info@saarivet.fi.',
    en: 'At Eläinklinikka Saari we value owners who commit to daily tooth brushing. If you brush your pet\'s teeth every day, let us know — dedicated brushers receive the #BrushChamp medal! Contact us at the clinic or by email: info@saarivet.fi.'
  },

  // Article: PerioVive
  'article.periovive.title': {
    fi: 'PerioVive – hyaluronihappogeeli parodontiittisairauksien hoitoon',
    sv: 'PerioVive – hyaluronsyragel för behandling av parodontal sjukdom',
    en: 'PerioVive — Hyaluronic Acid Gel for Periodontal Disease Treatment'
  },
  'article.periovive.intro': {
    fi: 'Parodontiitti (hampaan kiinnityskudostulehdus) on yleisin sairaus koirilla ja kissoilla – jopa 80 % yli kolmevuotiaista koirista kärsii jonkinasteisesta iensairaudesta. Hoitamattomana se johtaa hampaan kiinnityskudosten tuhoutumiseen, luukatoon ja lopulta hampaiden menetykseen. PerioVive on eläinlääketieteelliseen käyttöön kehitetty hyaluronihappogeeli, joka tuo uuden mahdollisuuden parodontiittisairauksien hoitoon hammastoimenpiteiden yhteydessä.',
    sv: 'Parodontal sjukdom (tandköttsinflammation) är den vanligaste sjukdomen hos hundar och katter – upp till 80 % av hundar över tre år lider av någon grad av tandköttssjukdom. Obehandlad leder den till förstörelse av tandens stödjevävnader, benförlust och slutligen tandförlust. PerioVive är en hyaluronsyragel utvecklad för veterinärmedicinskt bruk som ger nya möjligheter att behandla parodontal sjukdom i samband med tandbehandlingar.',
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
    fi: 'Eläinklinikka Saaressa tarjoamme PerioVive-hoitoa osana laajaa hammashoitopalveluamme. Käytämme PerioViveä hammastoimenpiteiden yhteydessä edistämään ikenien ja luun paranemista. Kysy lisää seuraavalla käynnillä tai ota yhteyttä klinikkaan – arvioimme mielellämme, hyötyisikö lemmikkisi PerioVive-hoidosta.',
    sv: 'På Djurklinik Saari erbjuder vi PerioVive-behandling som en del av vår omfattande tandvård. Vi använder PerioVive i samband med tandbehandlingar för att främja läkning av tandkött och ben. Fråga mer vid nästa besök eller kontakta kliniken – vi bedömer gärna om ditt husdjur skulle dra nytta av PerioVive-behandling.',
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
    fi: 'Suomen eläinlääkärimarkkinat ovat muuttuneet dramaattisesti viimeisen vuosikymmenen aikana. Kilpailu- ja kuluttajaviraston (KKV) selvityksen mukaan kaksi ulkomaalaisomisteista ketjua – Evidensia ja Vireä – keräsi vuonna 2023 yhteensä 50–70 % yksityisten pieneläinlääkäripalvelujen liikevaihdosta Suomessa. Eläinklinikka Saari on Vaasan ainoa perheomisteinen pieneläinklinikka, ja haluamme kertoa, miksi se on merkityksellistä.',
    sv: 'Den finländska veterinärmarknaden har förändrats dramatiskt under det senaste årtiondet. Enligt Konkurrens- och konsumentverkets (KKV) utredning stod två utlandsägda kedjor – Evidensia och Vireä – år 2023 för sammanlagt 50–70 % av omsättningen på marknaden för privata smådjursveterinärtjänster i Finland. Djurklinik Saari är den enda familjeägda smådjurskliniken i Vasa, och vi vill berätta varför det spelar roll.',
    en: 'The Finnish veterinary market has changed dramatically over the past decade. According to the Finnish Competition and Consumer Authority (KKV), two foreign-owned chains — Evidensia and Vireä — together held 50–70% of the revenue in the market for private small-animal veterinary services in 2023. Eläinklinikka Saari is the only family-owned small animal clinic in Vaasa, and we want to explain why that matters.'
  },
  'article.independent.chains.title': {
    fi: 'Ketjut Suomessa',
    sv: 'Kedjorna i Finland',
    en: 'Chains in Finland'
  },
  'article.independent.chains.text': {
    fi: 'Evidensia on osa IVC Evidensia -konsernia, jota hallitsevat ruotsalainen pääomasijoitusyhtiö EQT, yhdysvaltalainen Silver Lake ja muut sijoittajat. Konsernin arvoksi määritettiin vuoden 2021 omistusjärjestelyssä noin 12,3 miljardia euroa; kyse on tuon kaupan yhteydessä käytetystä arvostuksesta, ei konsernin tämänhetkisestä arvosta. KKV:n mukaan Evidensialla on Suomessa 44 pieneläintoimipistettä – kaikkiaan 47 toimipistettä 30 kunnassa – ja 40–50 % osuus yksityisten pieneläinlääkäripalvelujen liikevaihdosta vuonna 2023. Vireä (ent. Univet) kuuluu tanskalaiseen Vetopia-ryhmään, jota omistaa tanskalainen pääomasijoitusyhtiö Axcel; sillä on Suomessa 13 pieneläintoimipistettä ja 10–20 % osuus. Luvut kuvaavat osuutta tämän markkinan liikevaihdosta kyseisenä vuonna, eivät klinikoiden lukumäärää, ja KKV esittää ne tarkoituksella vaihteluväleinä. Manner-Suomen 18 yksityisestä pieneläinsairaalasta 13 on Evidensian omistuksessa, joten ketjun osuus tästä markkinasta on koko maassa yli 70 %.',
    sv: 'Evidensia är en del av IVC Evidensia-koncernen, som kontrolleras av det svenska kapitalplaceringsbolaget EQT, amerikanska Silver Lake och övriga investerare. I samband med ägararrangemanget år 2021 värderades koncernen till cirka 12,3 miljarder euro; det är värderingen vid den affären, inte ett aktuellt värde på koncernen. Enligt KKV har Evidensia 44 verksamhetsställen för smådjur i Fastlandsfinland – sammanlagt 47 verksamhetsställen i 30 kommuner – och en andel på 40–50 % av omsättningen för privata smådjursveterinärtjänster år 2023. Vireä (tidigare Univet) ingår i den danska Vetopia-gruppen, som ägs av det danska kapitalplaceringsbolaget Axcel; kedjan har 13 verksamhetsställen för smådjur i Finland och en andel på 10–20 %. Siffrorna gäller andelen av omsättningen på en avgränsad marknad ett bestämt år – inte andelen av antalet kliniker – och KKV publicerar dem medvetet som intervall. Av de 18 privata smådjurssjukhusen i Fastlandsfinland ägs 13 av Evidensia, vilket ger kedjan över 70 % av den marknaden på riksnivå.',
    en: 'Evidensia is part of the IVC Evidensia group, controlled by Swedish private equity firm EQT, American Silver Lake and other investors. The group was valued at approximately €12.3 billion at the time of a 2021 ownership deal; that is the valuation used in that transaction, not a current one. According to KKV, Evidensia has 44 small-animal locations in Finland — 47 sites in total across 30 municipalities — and a 40–50% share of the revenue in private small-animal veterinary services in 2023. Vireä (formerly Univet) belongs to the Danish Vetopia group, owned by Danish private equity firm Axcel; it has 13 small-animal locations in Finland and a 10–20% share. These figures are shares of revenue in a defined market in a given year — not a count of clinics — and KKV deliberately publishes them as ranges. Of the 18 private small-animal hospitals in mainland Finland, 13 belong to Evidensia, giving the chain over 70% of that market nationally.'
  },
  'article.independent.prices.title': {
    fi: 'Vaikutus hintoihin',
    sv: 'Påverkan på priser',
    en: 'Impact on Prices'
  },
  'article.independent.prices.text': {
    fi: 'Kilpailu- ja kuluttajaviraston (KKV) marraskuussa 2024 julkaiseman selvityksen mukaan hinnat nousivat 28 % niissä Evidensian ja Omaeläinklinikan toimipisteissä, joita yritysten välinen kauppa koski, kun eläinlääkäripalvelujen hintaindeksi nousi samaan aikaan 13 % – eroa kertyi siis 15 prosenttiyksikköä. Luku kertoo hintakehityksestä juuri näissä toimipisteissä kaupan jälkeen, ei Evidensian hinnoittelusta koko maassa. Kotitalouksien menot eläinlääkäri- ja muihin lemmikkipalveluihin ovat kymmenessä vuodessa kaksinkertaistuneet, vajaasta 240 miljoonasta eurosta (2014) noin 480 miljoonaan euroon (2023). Kyse on menojen kokonaissummasta, ei siitä, että hinnat olisivat kaksinkertaistuneet; osa kasvusta selittyy sillä, että koirien määrä on noussut noin 450 000:sta yli 800 000:een. Itsenäiset klinikat ovat KKV:n mukaan johdonmukaisesti edullisempia kuin ketjuuntuneet klinikat.',
    sv: 'I Konkurrens- och konsumentverkets (KKV) utredning från november 2024 granskades prisutvecklingen på de kliniker som omfattades av företagsaffären mellan Evidensia och Omaeläinklinikka. På de klinikerna steg priserna med 28 %, medan prisindexet för veterinärtjänster steg med 13 % under samma tid – en skillnad på 15 procentenheter. Siffran beskriver prisutvecklingen på just de här klinikerna efter affären, inte Evidensias prissättning i hela landet. Hushållens sammanlagda utgifter för veterinärtjänster och andra tjänster för husdjur har fördubblats på tio år, från knappt 240 miljoner euro år 2014 till ungefär 480 miljoner euro år 2023. Det handlar om den totala summan, inte om prisnivån; en del av ökningen förklaras av att antalet hundar har stigit från omkring 450 000 till över 800 000. Enligt KKV är självständiga kliniker konsekvent billigare än kedjekliniker.',
    en: 'The Finnish Competition and Consumer Authority (KKV) examined, in its November 2024 report, the price development at the clinics covered by the Evidensia–Omaeläinklinikka merger. At those clinics prices rose by 28%, while the price index for veterinary services rose by 13% over the same period — a gap of 15 percentage points. The figure describes price development at those particular clinics after the merger, not Evidensia’s pricing nationally. Total household spending on veterinary and other pet services has doubled in ten years, from just under €240 million in 2014 to about €480 million in 2023. That is the total sum spent, not the price level; part of the rise is explained by the number of dogs growing from roughly 450,000 to over 800,000. According to KKV, independent clinics are consistently more affordable than chain clinics.'
  },
  'article.independent.quality.title': {
    fi: 'Miten ketjuuntuminen vaikuttaa lemmikkien hoitoon?',
    sv: 'Vad innebär kedjeetableringen för vården?',
    en: 'What Does Chain Ownership Mean for Care?'
  },
  'article.independent.quality.text': {
    fi: 'Kun sijoitusyhtiöt omistavat klinikat, ensisijainen tavoite on tuotto sijoittajille. Ylen heinäkuussa 2023 julkaisemassa jutussa ketjujen työntekijät kertoivat omista kokemuksistaan: Evidensian entinen eläinlääkäri kertoi, että hinnat nousivat 2–4 kertaa vuodessa. Kyse on haastateltujen työntekijöiden kertomuksista, ei viranomaisen vahvistamasta tiedosta.',
    sv: 'När kapitalplaceringsbolag äger kliniker är det primära målet avkastning till investerarna. I Yles reportage i juli 2023 berättade anställda vid kedjorna om sina egna erfarenheter: en veterinär som tidigare arbetat för Evidensia beskrev att priserna höjdes två till fyra gånger per år. Det här är enskilda anställdas skildringar i en nyhetsartikel, inte en myndighetsutredning.',
    en: 'When investment firms own clinics, the primary goal is return for investors. In an investigation published on 14 July 2023, Yle spoke to employees of the chains: a former Evidensia veterinarian said that prices had risen two to four times a year. These are accounts given by the employees interviewed, not findings confirmed by a regulator.'
  },
  'article.independent.international.title': {
    fi: 'Kansainvälinen esimerkki',
    sv: 'Internationella exempel',
    en: 'International Examples'
  },
  'article.independent.international.text': {
    fi: 'Iso-Britanniassa markkina ketjuuntui aikaisemmin. Suurten ketjujen osuus oli vuonna 2013 noin 10 % ja on nykyään yli 60 %; itsenäisten klinikoiden osuus oli vuonna 2013 vielä 89 %. Tästä erillisenä havaintona hinnat nousivat vuosina 2016–2023 63 %, kun yleinen hintataso nousi samaan aikaan 32 % – luvut koskevat eri ajanjaksoja. Maan kilpailuviranomaisen (CMA) maaliskuussa 2026 julkaistun loppuraportin mukaan suurten ketjujen klinikoilla maksetaan keskimäärin 18,3 % enemmän kuin itsenäisillä klinikoilla. Ruotsia ja Norjaa koskevassa tutkimuksessa hintojen mediaanimuutos vuoden 2023 aikana oli Evidensian klinikoilla 15 %, AniCuran klinikoilla 8 % ja itsenäisillä klinikoilla 6 %; luku koskee yhtä vuotta, ei toistuvaa vuosittaista nousuvauhtia.',
    sv: 'I Storbritannien skedde motsvarande koncentration tidigare. År 2013 var 89 % av klinikerna självständiga och de stora kedjorna stod för ungefär 10 % av marknaden – i dag är kedjornas andel över 60 %. Prisutvecklingen är en skild fråga och gäller en annan period: mellan 2016 och 2023 steg priserna på veterinärtjänster med 63 %, medan den allmänna inflationen under samma tid var 32 %. I sin slutrapport i mars 2026 konstaterade den brittiska konkurrensmyndigheten CMA att kunderna i genomsnitt betalar 18,3 % mer på de stora kedjornas kliniker än på självständiga kliniker. I en publicerad forskningsstudie som granskade veterinärpriser i Sverige och Norge var medianförändringen i priserna under år 2023 15 % på Evidensias kliniker, 8 % på Anicuras och 6 % på självständiga kliniker; siffrorna gäller ett enskilt år, inte en årlig höjning som upprepas.',
    en: 'In the UK the same consolidation happened earlier. In 2013, 89% of clinics were independent and the large chains held about 10% of the market — today the chains’ share is over 60%. Price development is a separate matter covering a different period: between 2016 and 2023, veterinary prices rose 63% while general inflation was 32%. In its final report of March 2026, the UK Competition and Markets Authority found that customers pay on average 18.3% more at the large chains’ clinics than at independent practices. A published research study covering Sweden and Norway found that during 2023 the median price change was 15% at Evidensia clinics, 8% at Anicura clinics and 6% at independent clinics; that figure covers a single year, not a recurring annual rate.'
  },
  'article.independent.choice.title': {
    fi: 'Eläinklinikka Saari – tietoinen valinta',
    sv: 'Djurklinik Saari – ett medvetet val',
    en: 'Eläinklinikka Saari — A Conscious Choice'
  },
  'article.independent.choice.text': {
    fi: 'Olemme saaneet useita yhteydenottoja ketjuilta, jotka haluaisivat ostaa klinikkamme. Olemme päättäneet pysyä itsenäisenä. Meille tämä tarkoittaa, että hoitopäätökset tekee aina eläinlääkäri – ei sijoitusyhtiö. Hintamme perustuvat todellisiin kustannuksiin, emme noudata konsernin tulostavoitteita. Sama eläinlääkäri hoitaa lemmikkisi koko sen elämän ajan. Tulomme jäävät Vaasaan. Kun valitset itsenäisen klinikan, tuet myös suomalaista yrittäjyyttä ja kilpailua markkinoilla, jotka keskittyvät yhä harvempiin käsiin.',
    sv: 'Vi har fått flera förfrågningar från kedjor som vill köpa vår klinik. Vi har beslutat att förbli självständiga. För oss innebär detta att behandlingsbeslut alltid fattas av veterinären – inte av ett investeringsbolag. Våra priser baseras på verkliga kostnader, vi följer inga koncernens resultatmål. Samma veterinär tar hand om ditt husdjur hela dess liv. Våra intäkter stannar i Vasa. När du väljer en självständig klinik stödjer du också finländskt företagande och konkurrens på en marknad som koncentreras i allt färre händer.',
    en: 'We have received multiple offers from chains wanting to buy our clinic. We have chosen to remain independent. For us this means that treatment decisions are always made by the veterinarian — not an investment firm. Our prices are based on actual costs, not corporate revenue targets. The same vet cares for your pet throughout its life. Our revenue stays in Vaasa. When you choose an independent clinic, you also support Finnish entrepreneurship and competition in a market that is concentrating into fewer and fewer hands.'
  },

  // Article 10: Food Allergies
  'article.food.tag': { fi: 'Lemmikkien terveys', sv: 'Husdjurshälsa', en: 'Pet Health' },
  'article.food.title': {
    fi: 'Ruoka-allergiat koirilla ja kissoilla – oireet, diagnoosi ja eliminaatiodieetti',
    sv: 'Födoämnesallergi hos hundar och katter – symtom, diagnos och eliminationsdiet',
    en: 'Food Allergies in Dogs and Cats — Symptoms, Diagnosis and Elimination Diet'
  },
  'article.food.intro': {
    fi: 'Ruoka-aineallergia on yksi kutinaa aiheuttavista sairauksista koirilla ja kissoilla, joskin selvästi harvinaisempi syy kuin ympäristöperäinen allergia (atopia). Monet omistajat ajattelevat viljojen olevan ongelma, mutta tutkimukset osoittavat selvästi: yleisimmät allergeenit ovat eläinproteiineja – nauta (34 %), maito (17 %) ja kana (15 %). Oikea diagnoosi vaatii eliminaatiodieetin, ja me autamme siinä.',
    sv: 'Födoämnesallergi är en av orsakerna till klåda hos hundar och katter, men en klart ovanligare orsak än miljöallergi (atopi). Många ägare tror att spannmål är problemet, men forskning visar tydligt: de vanligaste allergenerna är animaliska proteiner – nötkött (34 %), mjölk (17 %) och kyckling (15 %). En korrekt diagnos kräver en eliminationsdiet, och vi hjälper dig med det.',
    en: 'Food allergy is one of the causes of itching in dogs and cats, though a clearly less common cause than environmental allergy (atopy). Many owners believe grains are the problem, but research clearly shows: the most common allergens are animal proteins — beef (34%), dairy (17%) and chicken (15%). A correct diagnosis requires an elimination diet, and we can help you with that.'
  },
  'article.food.symptoms.title': {
    fi: 'Oireet',
    sv: 'Symtom',
    en: 'Symptoms'
  },
  'article.food.symptoms.text': {
    fi: 'Ruoka-aine allergian tyypillisimpiä oireita ovat kutina, toistuvat korvatulehdukset, tassujen nuoleminen, ihotulehdukset ja vatsaoireet (oksentelu, ripuli). Kissoilla oireet ilmenevät usein pään ja kaulan alueen kutinana. Toisin kuin ympäristöön liittyvät allergiat, ruoka-aine allergia ei ole kausittainen – oireet jatkuvat ympäri vuoden. Jos lemmikkisi ulostaa yli kaksi kertaa päivässä ja iho-oireet alkoivat alle vuoden iässä, ruoka-allergia on erityisen todennäköinen.',
    sv: 'De vanligaste symtomen på födoämnesallergi är klåda, återkommande öroninflammationer, slickande av tassar, hudinfektioner och mag-tarmbesvär (kräkningar, diarré). Hos katter visar sig symtomen ofta som klåda runt huvud och hals. Till skillnad från miljöallergier är födoämnesallergi inte säsongsbetonad – symtomen fortsätter året runt. Om ditt husdjur har mer än 2 avföringar per dag och hudsymtom som började före ett års ålder är födoämnesallergi särskilt sannolik.',
    en: 'The most common symptoms of food allergy are itching, recurring ear infections, paw licking, skin infections and gastrointestinal symptoms (vomiting, diarrhea). In cats, symptoms often appear as itching around the head and neck. Unlike environmental allergies, food allergy is not seasonal — symptoms persist year-round. If your pet has more than 2 bowel movements per day and skin symptoms started before one year of age, food allergy is particularly likely.'
  },
  'article.food.allergens.title': {
    fi: 'Yleisimmät allergeenit',
    sv: 'Vanligaste allergenerna',
    en: 'Most Common Allergens'
  },
  'article.food.allergens.text': {
    fi: 'Tutkimuksissa yleisimmät allergeenit koirilla ovat nauta (34 %), maitotuotteet (17 %), kana (15 %), vehnä (13 %) ja soija (6 %). Kissoilla yleisimpiä ovat nauta (18 %), kala (17 %) ja kana (5 %). Viljat aiheuttavat siis vain pienen osan allergiatapauksista – vehnä 13 % ja maissi 4 %. "Viljaton" ruoka ei ole ratkaisu, koska se sisältää usein edelleen yleisimpiä allergeenejä (nauta, kana).',
    sv: 'I studier är de vanligaste allergenerna hos hundar nötkött (34 %), mejeriprodukter (17 %), kyckling (15 %), vete (13 %) och soja (6 %). Hos katter är de vanligaste nötkött (18 %), fisk (17 %) och kyckling (5 %). Spannmål orsakar alltså bara en liten del av allergifallen – vete 13 % och majs 4 %. "Spannmålsfri" mat är ingen lösning eftersom den ofta fortfarande innehåller de vanligaste allergenerna (nötkött, kyckling).',
    en: 'In studies, the most common allergens in dogs are beef (34%), dairy (17%), chicken (15%), wheat (13%) and soy (6%). In cats, the most common are beef (18%), fish (17%) and chicken (5%). Grains cause only a small portion of allergy cases — wheat 13% and corn 4%. "Grain-free" food is not the solution because it often still contains the most common allergens (beef, chicken).'
  },
  'article.food.trial.title': {
    fi: 'Eliminaatioruokavalio – ainoa luotettava diagnoosimenetelmä',
    sv: 'Eliminationsdiet – den enda tillförlitliga diagnosmetoden',
    en: 'Elimination Diet — The Only Reliable Diagnostic Method'
  },
  'article.food.trial.text': {
    fi: 'Allergiaverikokeet ruoka-aineille eivät ole luotettavia – tutkimuksissa niiden tulokset ovat toistuneet huonosti ja osuvuus on vaihdellut koirilla suuresti, kissoilla se on ollut heikko. Luotettavin menetelmä on eliminaatioruokavalio: lemmikille syötetään 8–12 viikon ajan ainoastaan hydrolysoitua proteiiniruokaa, jossa proteiinit on pilkottu niin pieniksi, ettei immuunijärjestelmä tunnista niitä.',
    sv: 'Allergiblodprov för livsmedel är inte tillförlitliga – samma prov ger ojämna resultat från gång till gång, och träffsäkerheten varierar kraftigt hos hund och är låg hos katt. Den tillförlitligaste metoden är en eliminationsdiet: husdjuret matas under 8–12 veckor uteslutande med hydrolyserad proteinmat där proteinerna har brutits ner till så små delar att immunsystemet inte känner igen dem.',
    en: 'Allergy blood tests for food are not reliable — the same sample gives uneven results from one time to the next, and accuracy varies greatly in dogs and is low in cats. The most reliable method is an elimination diet: the pet is fed for 8–12 weeks exclusively hydrolyzed protein food where proteins have been broken down so small that the immune system cannot recognize them.'
  },
  'article.food.strict.title': {
    fi: 'Eliminaatioruokavalion säännöt',
    sv: 'Regler för eliminationsdiet',
    en: 'Elimination Diet Rules'
  },
  'article.food.strict.text': {
    fi: 'Eliminaatiodieetin on oltava ehdottoman tiukka. Lemmikin suuhun saa mennä VAIN eliminaatidieettiruokaa. Ei makupaloja, ei ihmisruokaa, ei raakaruokia tai puruluita, ei maustettua hammastahnaa, ei maustettuja lääkkeitä (matolääkkeet, punkkitabletit). Lääkkeet vaihdetaan maustamattomiin vaihtoehtoihin. Kaupasta saatavat eläintenruoat eivät täytä eliminaatiodieetin vaatimuksia – tutkimukset osoittavat, että 33–83 % niistä sisältää ilmoittamattomia proteiineja. Siksi käytämme aina eläinlääkärin reseptiruokia.',
    sv: 'Eliminationsdieten måste vara absolut strikt. BARA eliminationsmat får gå i husdjurets mun. Inga godisbitar, ingen människomat, inga råhudsben eller tuggben, ingen smaksatt tandkräm, inga smaksatta mediciner (avmaskningsmedel, fästingtabletter). Mediciner byts till osmakade alternativ. Butikens "begränsad ingrediens"-foder duger inte – studier visar att 33–83 % av dem innehåller odeklarerade proteiner. Därför använder vi alltid veterinärrecept-foder.',
    en: 'The elimination diet must be absolutely strict. ONLY the elimination food may enter your pet\'s mouth. No treats, no human food, no rawhide or chew bones, no flavored toothpaste, no flavored medications (dewormers, flea/tick tablets). Medications are switched to unflavored alternatives. Store-bought "limited ingredient" foods are not suitable — studies show 33–83% of them contain undeclared proteins. That is why we always use veterinary prescription diets.'
  },
  'article.food.challenge.title': {
    fi: 'Haastevaihe ja pitkäaikaishoito',
    sv: 'Provokationsfas och långtidsvård',
    en: 'Challenge Phase and Long-Term Management'
  },
  'article.food.challenge.text': {
    fi: 'Jos oireet paranevat eliminaatiodieetillä, diagnoosi varmistetaan syöttämällä vanhaa ruokaa uudelleen. Noin 50 % koirista reagoi viiden vuorokauden ja noin 90 % kahden viikon kuluessa, kissoista noin puolet neljässä vuorokaudessa ja noin 90 % viikossa – koiralla haastevaihetta on siksi jatkettava täydet kaksi viikkoa ennen kuin ruoka-allergian voi sulkea pois. Tämän jälkeen palataan eliminaatioruokaan ja testataan yksittäisiä proteiineja yksitellen. Näin selviää, mitkä proteiinit ovat turvallisia ja mitä on vältettävä. Ruoka-aineista johtuvaa allergiaa ei voi parantaa, mutta kun allergeenejä välttää, lemmikki voi elää täysin oireetonta elämää ilman lääkitystä. Eläinlääkärin ohjauksessa tehty eliminaatiodieetti on tehokas ja turvallinen prosessi.',
    sv: 'Om symtomen förbättras med eliminationsdieten bekräftas diagnosen genom att ge den gamla maten igen. Ungefär hälften av hundarna reagerar inom fem dagar och cirka 90 % inom två veckor; katterna reagerar oftast snabbare – hälften inom fyra dagar och cirka 90 % inom en vecka. Fortsätt därför provokationen i hela två veckor innan man drar slutsatsen att maten inte är orsaken. Därefter återgår man till eliminationsdieten och testar enskilda proteiner en i taget. Så klargörs vilka proteiner som är säkra och vilka som måste undvikas. Födoämnesallergi kan inte botas, men när allergener undviks kan husdjuret leva helt symtomfritt utan medicinering. Under veterinärens vägledning är eliminationsdieten en effektiv och säker process.',
    en: 'If symptoms improve on the elimination diet, the diagnosis is confirmed by reintroducing the old food. About half of dogs react within five days and about 90% within two weeks; cats usually react faster — half within four days and about 90% within a week. Continue the challenge for a full two weeks before concluding that food is not the cause. After this, the pet returns to the elimination diet and individual proteins are tested one at a time. This reveals which proteins are safe and which must be avoided. Food allergy cannot be cured, but when allergens are avoided, your pet can live completely symptom-free without medication. Under veterinary guidance, the elimination diet is an effective and safe process.'
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
    fi: 'Kilpirauhasen liikatoiminta kissalla – oireet, diagnoosi ja hoito',
    sv: 'Sköldkörtelöverfunktion hos katter – symtom, diagnos och behandling',
    en: 'Hyperthyroidism in Cats — Symptoms, Diagnosis and Treatment'
  },
  'article.hyperthyroid.intro': {
    fi: 'Kilpirauhasen liikatoiminta (hypertyreoosi) on ikääntyneiden kissojen yleisin hormonisairaus. Tutkimuksesta riippuen sitä sairastaa jopa noin joka kymmenes yli 10-vuotias kissa. Liikatoiminnassa kilpirauhanen tuottaa liikaa kilpirauhashormonia (T4), mikä kiihdyttää aineenvaihduntaa ja kuormittaa monia elimiä, erityisesti sydäntä ja munuaisia. Hoitamattomana sairaus johtaa vakaviin komplikaatioihin. Hoidon ja säännöllisten seurantakäyntien avulla ennuste on yleensä hyvä, mutta samanaikaisesti todettu munuaissairaus voi vaikuttaa pitkän aikavälin ennusteeseen.',
    sv: 'Sköldkörtelöverfunktion (hypertyreos) är den vanligaste hormonsjukdomen hos äldre katter. Beroende på studie drabbar den upp till ungefär var tionde katt över 10 år. Den överaktiva sköldkörteln producerar för mycket sköldkörtelhormon (T4), vilket höjer ämnesomsättningen och belastar många organ, särskilt hjärtat och njurarna. Obehandlad leder sjukdomen till allvarliga komplikationer. Med behandling och regelbundna kontroller är utsikterna oftast goda, även om en njursjukdom som upptäcks samtidigt kan påverka prognosen på lång sikt.',
    en: 'Hyperthyroidism is the most common hormonal disease in older cats. Depending on the study, it affects up to about one in ten cats over 10 years of age. The overactive thyroid gland produces too much thyroid hormone (T4), which speeds up the metabolism and strains many organs, especially the heart and kidneys. Left untreated, the disease leads to serious complications. With treatment and regular check-ups, the outlook is usually good, although kidney disease found alongside it can affect the long-term prognosis.'
  },
  'article.hyperthyroid.symptoms.title': {
    fi: 'Oireet',
    sv: 'Symtom',
    en: 'Symptoms'
  },
  'article.hyperthyroid.symptoms.text': {
    fi: 'Yleisimpiä oireita ovat laihtuminen hyvästä tai lisääntyneestä ruokahalusta huolimatta, lisääntynyt juominen ja virtsaaminen, oksentelu, ripuli, ylivilkkaus tai levottomuus, lisääntynyt ääntely, hoitamattoman näköinen turkki ja nopea syke. Monilla kissoilla myös lihasmassa vähenee, ja osalla näkyy käytösmuutoksia, kuten ärtyisyyttä. Pienellä osalla kissoista oireet ovat päinvastaisia: kissa on vaisu ja syö huonosti. Oireet kehittyvät yleensä hitaasti, ja omistaja voi luulla niitä tavallisiksi ikääntymisen merkeiksi.',
    sv: 'De vanligaste tecknen är viktnedgång trots god eller ökad aptit, ökad törst och urinering, kräkningar, diarré, överaktivitet eller rastlöshet, ökat jamande, ovårdad päls och hög hjärtfrekvens. Många katter tappar också muskelmassa, och en del får beteendeförändringar, till exempel lättretlighet. En mindre del av katterna är i stället dämpade och äter dåligt. Tecknen utvecklas oftast långsamt, och ägaren kan tro att det bara handlar om normalt åldrande.',
    en: 'The most common signs are weight loss despite a good or increased appetite, increased drinking and urination, vomiting, diarrhea, hyperactivity or restlessness, increased vocalization, an unkempt coat and a rapid heart rate. Many cats also lose muscle, and some show behavioral changes such as irritability. A minority of cats are instead quiet and eat poorly. Signs usually develop slowly, and owners may mistake them for normal aging.'
  },
  'article.hyperthyroid.diagnosis.title': {
    fi: 'Diagnoosi',
    sv: 'Diagnos',
    en: 'Diagnosis'
  },
  'article.hyperthyroid.diagnosis.text': {
    fi: 'Diagnoosi perustuu verikokeeseen, jossa mitataan kilpirauhashormonin eli tyroksiinin kokonaispitoisuus (kokonais-T4). Kokeen voimme tehdä klinikkamme omassa laboratoriossa. Kohonnut T4-arvo ja tyypilliset oireet yhdessä varmistavat diagnoosin. Sairauden alkuvaiheessa, lievissä tapauksissa tai jos kissalla on samaan aikaan jokin muu sairaus, T4 voi silti olla viitealueella. Silloin koe uusitaan parin viikon kuluttua tai myöhemmin, tai kokonais-T4:n rinnalla mitataan vapaa T4. Vapaata T4:ää ei koskaan tulkita yksinään, koska se voi olla virheellisesti koholla kissoilla, joilla on jokin muu sairaus. Jos asia jää epäselväksi, apua voi saada lisätutkimuksista, kuten T3-suppressiotestistä tai kilpirauhasen gammakuvauksesta (skintigrafia). Kissaa tutkiessaan eläinlääkäri voi tuntea sen kaulassa suurentuneen kilpirauhasen. Samalla mitataan verenpaine ja tarkistetaan sydän, munuaisarvot ja virtsanäyte.',
    sv: 'Diagnosen grundar sig på ett blodprov som mäter sköldkörtelhormonet tyroxin (totalt T4). Provet kan vi analysera i klinikens eget laboratorium. Ett förhöjt T4-värde tillsammans med typiska symtom bekräftar diagnosen. I tidiga eller lindriga fall, eller om katten samtidigt har en annan sjukdom, kan T4 ändå ligga inom normalområdet. Då tas ett nytt prov efter ett par veckor eller senare, eller så mäts fritt T4 tillsammans med totalt T4. Fritt T4 tolkas aldrig ensamt, eftersom det kan vara falskt förhöjt hos katter med andra sjukdomar. Om det fortfarande råder osäkerhet kan ytterligare undersökningar, till exempel ett T3-suppressionstest eller scintigrafi av sköldkörteln, vara till hjälp. Vid undersökningen kan veterinären känna en förstorad sköldkörtel på halsen. Samtidigt kontrolleras blodtrycket, hjärtat och njurvärdena, och ett urinprov undersöks.',
    en: 'Diagnosis is based on a blood test measuring the thyroid hormone thyroxine (total T4), which we can run in our own clinic laboratory. A raised T4 together with typical signs confirms the diagnosis. In early or mild cases, or when the cat has another illness at the same time, T4 can still be within the normal range. In that case, the test is repeated a couple of weeks or more later, or free T4 is measured together with total T4. Free T4 is never interpreted on its own, because it can be falsely high in cats with other illnesses. If doubt remains, further tests such as a T3 suppression test or thyroid scintigraphy can help. During the examination, the vet may feel an enlarged thyroid gland in the neck. Blood pressure, the heart, kidney values and a urine sample are checked at the same time.'
  },
  'article.hyperthyroid.complications.title': {
    fi: 'Komplikaatiot',
    sv: 'Komplikationer',
    en: 'Complications'
  },
  'article.hyperthyroid.complications.text': {
    fi: 'Hoitamaton kilpirauhasen liikatoiminta lisää sydämen työmäärää ja voi paksuntaa sydänlihasta, mikä vaikeissa tapauksissa johtaa sydämen vajaatoimintaan. Nämä muutokset voivat korjaantua, kun kilpirauhasen toiminta saadaan hallintaan, mutta joillakin kissoilla on lisäksi erillinen sydänsairaus, joka ei parane. Jopa noin joka neljännellä liikatoimintaa sairastavalla kissalla on korkea verenpaine. Se voi vaurioittaa silmiä (ja vaikeissa tapauksissa aiheuttaa äkillisen sokeutumisen), munuaisia, sydäntä ja aivoja. Verenpaine voi pysyä koholla kilpirauhasen hoidon jälkeenkin tai jopa kohota vasta hoidon myötä, joten se mitataan ennen hoitoa ja hoidon aikana. Tärkeä on myös yhteys munuaissairauteen: liikatoiminta lisää munuaisten verenvirtausta ja suodatusnopeutta, ja lihaskato laskee veren kreatiniinipitoisuutta, joka on yksi munuaisarvoista. Nämä tekijät voivat yhdessä peittää jo olemassa olevan munuaissairauden, joka tulee esiin vasta, kun kilpirauhasta hoidetaan – eräässä laajassa tutkimuksessa noin joka kuudennella kissalla. Kilpirauhasen jättäminen hoitamatta ei suojaa munuaisia, vaan se vaurioittaa niitä ajan mittaan lisää. Myös liiallinen hoito, jossa kilpirauhashormonin taso laskee liian matalaksi, voi kuormittaa munuaisia. Siksi munuaisarvoja seurataan tarkasti hoidon alettua.',
    sv: 'Obehandlad sköldkörtelöverfunktion får hjärtat att arbeta hårdare och kan leda till att hjärtmuskeln förtjockas, i svåra fall så att katten får hjärtsvikt. Förändringarna kan förbättras när sköldkörteln är under kontroll, men en del katter har dessutom en separat hjärtsjukdom som inte går över. Upp till ungefär var fjärde katt med hypertyreos har högt blodtryck. Det kan skada ögonen (i svåra fall med plötslig blindhet som följd), njurarna, hjärtat och hjärnan. Blodtrycket kan förbli högt efter att sköldkörteln har behandlats, eller till och med bli förhöjt först då, och därför mäts det både före och under behandlingen. Det finns också ett viktigt samband med njursjukdom: hypertyreos ökar blodflödet genom njurarna och deras filtrationshastighet, och muskelförlusten sänker njurvärdet kreatinin. Tillsammans kan detta dölja en befintlig njursjukdom som visar sig först när sköldkörteln behandlas – i en stor studie hos ungefär var sjätte katt. Att lämna sköldkörteln obehandlad skyddar inte njurarna, utan skadar dem ytterligare med tiden. Överbehandling, där halten av sköldkörtelhormon sjunker för lågt, kan också belasta njurarna. Därför följs njurvärdena noga efter att behandlingen har inletts.',
    en: 'Untreated hyperthyroidism makes the heart work harder and can thicken the heart muscle, in severe cases leading to heart failure. These changes can improve once the thyroid is under control, but some cats also have a separate heart disease that does not resolve. Up to about one in four hyperthyroid cats has high blood pressure. It can damage the eyes (in severe cases causing sudden blindness), kidneys, heart and brain. Blood pressure can stay high, or even rise for the first time, after the thyroid is treated, so it is checked before and during treatment. There is also an important link with kidney disease: hyperthyroidism increases blood flow through the kidneys and their filtration rate, and muscle loss lowers creatinine, a kidney value. Together, these can hide existing kidney disease that only shows up once the thyroid is treated — in one large study, this happened in about one in six cats. Leaving the thyroid untreated does not protect the kidneys; over time it damages them further. Over-treatment, where the thyroid hormone level falls too low, can also strain the kidneys. That is why kidney values are monitored closely after treatment begins.'
  },
  'article.hyperthyroid.treatment.title': {
    fi: 'Hoitovaihtoehdot',
    sv: 'Behandlingsalternativ',
    en: 'Treatment Options'
  },
  'article.hyperthyroid.treatment.text': {
    fi: 'Hoitovaihtoehtoja on neljä: päivittäinen lääkitys, leikkaus, radiojodihoito ja vähäjodinen dieettiruoka. Autamme sinua valitsemaan kissasi tilanteeseen parhaiten sopivan hoidon.',
    sv: 'Det finns fyra behandlingsalternativ: daglig medicinering, kirurgi, radiojodbehandling och jodfattigt veterinärfoder. Vi hjälper dig att välja det alternativ som passar bäst för din katts situation.',
    en: 'There are four treatment options: daily medication, surgery, radioactive iodine and an iodine-restricted diet. We will help you choose the best option for your cat’s situation.'
  },
  'article.hyperthyroid.treatment.med.title': {
    fi: 'Päivittäinen lääkitys',
    sv: 'Daglig medicinering',
    en: 'Daily medication'
  },
  'article.hyperthyroid.treatment.med.text': {
    fi: 'Lääkkeenä käytetään tiamatsolia (toiselta nimeltään metimatsoli), jota annetaan päivittäin joko tabletteina (esim. Felimazole) tai oraaliliuoksena (esim. Apelka). Hoito on suhteellisen edullinen, mutta elinikäinen. Useimmat kissat sietävät lääkettä hyvin. Haittavaikutukset ilmaantuvat yleensä ensimmäisten viikkojen aikana ja harvoin enää kahden tai kolmen kuukauden jälkeen: oksentelu, huono ruokahalu, väsymys tai voimakas pään ja kaulan alueen kutina, joka voi johtaa raapimishaavoihin. Harvoin lääke vaikuttaa maksaan tai verisoluihin, joten ota meihin yhteyttä, jos kissasi alkaa voida huonosti tai sille nousee kuume, sen iho tai limakalvot kellastuvat tai se vuotaa herkästi verta. T4, munuaisarvot ja verenkuva tarkistetaan noin 3, 6, 10 ja 20 viikon kuluttua hoidon aloittamisesta, jokaisen annosmuutoksen jälkeen ja siitä eteenpäin muutaman kuukauden välein.',
    sv: 'Läkemedlet tiamazol (även kallat metimazol) ges dagligen som tabletter (t.ex. Felimazole) eller oral lösning (t.ex. Apelka). Behandlingen är relativt förmånlig, men livslång. De flesta katter tål medicinen bra. Biverkningar uppträder oftast under de första veckorna och sällan efter två till tre månader: kräkningar, dålig aptit, slöhet eller kraftig klåda på huvudet och halsen som kan leda till rivsår. I sällsynta fall påverkas levern eller blodkropparna, så kontakta oss om katten verkar sjuk eller får feber, om huden eller slemhinnorna blir gulaktiga eller om katten blöder lätt. T4, njurvärden och blodbild kontrolleras ungefär 3, 6, 10 och 20 veckor efter att behandlingen har inletts, efter varje dosändring och sedan med några månaders mellanrum.',
    en: 'The medicine, thiamazole (also known as methimazole), is given every day as tablets (e.g., Felimazole) or an oral solution (e.g., Apelka). It is relatively inexpensive, but the treatment is lifelong. Most cats tolerate it well. Side effects usually appear in the first weeks and seldom after two to three months. They include vomiting, poor appetite, lethargy or severe itching of the head and neck that can cause scratch wounds. Rarely, the liver or blood cells are affected, so contact us if your cat becomes unwell or feverish, turns yellowish or bleeds easily. T4, kidney values and blood counts are checked about 3, 6, 10 and 20 weeks after starting and after every dose change, then every few months.'
  },
  'article.hyperthyroid.treatment.safety.title': {
    fi: 'Lääkkeen turvallinen käsittely kotona',
    sv: 'Att hantera medicinen säkert hemma',
    en: 'Handling the medicine safely at home'
  },
  'article.hyperthyroid.treatment.safety.text': {
    fi: 'Tiamatsoli voi vaurioittaa sikiötä. Pese kätesi lääkkeen antamisen jälkeen sekä käsiteltyäsi kissanhiekkaa tai kissan oksennusta. Älä puolita äläkä murskaa tabletteja. Hedelmällisessä iässä olevien naisten tulee käyttää kertakäyttökäsineitä antaessaan lääkettä sekä käsitellessään kissanhiekkaa tai oksennusta. Jos olet tai saatat olla raskaana tai suunnittelet raskautta, pyydä jotakuta muuta antamaan lääke ja puhdistamaan hiekkalaatikko.',
    sv: 'Tiamazol kan skada ett ofött barn. Tvätta händerna efter att du har gett medicinen och efter att du har skött kattlådan eller tagit hand om kattens spyor, och dela eller krossa inte tabletterna. Kvinnor som kan bli gravida bör använda engångshandskar när de ger medicinen, sköter kattlådan eller tar hand om spyor. Om du är gravid, kanske är gravid eller planerar en graviditet, låt någon annan ge medicinen och sköta kattlådan.',
    en: 'Thiamazole may harm an unborn child. Wash your hands after giving the medicine and after handling the cat’s litter or vomit, and do not split or crush the tablets. Women who could become pregnant should wear disposable gloves when giving the medicine and handling litter or vomit. If you are pregnant, may be pregnant or are planning a pregnancy, let someone else give the medicine and clean the litter tray.'
  },
  'article.hyperthyroid.treatment.surgery.title': {
    fi: 'Leikkaus',
    sv: 'Kirurgi',
    en: 'Surgery'
  },
  'article.hyperthyroid.treatment.surgery.text': {
    fi: 'Leikkaus (tyreoidektomia) voi parantaa sairauden. Noin 70 %:lla kissoista sairaus koskee molempia kilpirauhaslohkoja, ja molempien poistaminen voi vaurioittaa viereisiä lisäkilpirauhasia ja laskea veren kalsiumpitoisuutta joko ohimenevästi tai pysyvästi. Kissan tila tasapainotetaan ensin lääkityksellä, koska nukutus on hoitamatonta liikatoimintaa sairastavalle kissalle tavallista riskialttiimpi.',
    sv: 'Kirurgi (tyreoidektomi) kan bota sjukdomen. Hos ungefär 70 % av katterna är båda sköldkörtelloberna drabbade, och om båda tas bort kan de närliggande bisköldkörtlarna skadas, vilket kan leda till övergående eller bestående låg kalciumhalt i blodet. Katten stabiliseras först med medicin, eftersom narkos innebär en extra risk för en obehandlad katt med hypertyreos.',
    en: 'Surgery (thyroidectomy) can cure the disease. In about 70 % of cats, both thyroid lobes are affected, and removing both can damage the nearby parathyroid glands and cause low blood calcium, which may be temporary or permanent. The cat is first stabilized with medication, because anesthesia carries extra risk in an untreated hyperthyroid cat.'
  },
  'article.hyperthyroid.treatment.radioiodine.title': {
    fi: 'Radiojodihoito',
    sv: 'Radiojodbehandling',
    en: 'Radioactive iodine'
  },
  'article.hyperthyroid.treatment.radioiodine.text': {
    fi: 'Radiojodihoitoa (I-131) pidetään useimmille kissoille ensisijaisena hoitona: yksi hoitokerta parantaa yli 95 % kissoista. Suomessa sitä tarjoaa vain pari erikoistunutta klinikkaa. Kissa on useita päiviä eristyksessä eläinsairaalassa. Sen jälkeen sitä on pidettävä kotona sisällä noin kahden viikon ajan, eivätkä lapset tai raskaana olevat naiset saa olla kosketuksissa siihen. Hoitava klinikka antaa tarkat ohjeet, myös kissan ulosteiden käsittelystä. Ennen leikkausta tai radiojodihoitoa annettava lääkityskokeilu voi auttaa ennakoimaan, miten munuaiset selviävät, kun kilpirauhasen toiminta on saatu hallintaan.',
    sv: 'Radiojodbehandling (I-131) anses vara förstahandsvalet för de flesta katter: en enda behandling botar över 95 % av katterna. I Finland erbjuds den bara vid ett par specialiserade kliniker. Katten vårdas isolerad på kliniken i flera dagar. Därefter ska den hållas inomhus hemma i ungefär två veckor, och barn och gravida kvinnor får inte ha kontakt med den. Den behandlande kliniken ger detaljerade instruktioner, bland annat om hur kattens avföring ska hanteras. Före kirurgi eller radiojodbehandling kan en provbehandling med medicin hjälpa till att förutsäga hur njurarna klarar sig när sköldkörteln väl är under kontroll.',
    en: 'Radioactive iodine (I-131) is considered the treatment of choice for most cats: a single treatment cures more than 95 %. In Finland, it is offered at only a couple of specialized clinics. The cat stays in isolation in the hospital for several days. For about two weeks after returning home, it must be kept indoors, and children and pregnant women must not be in contact with it. The treating clinic gives detailed instructions, including how to handle the cat’s feces. Before surgery or radioactive iodine, a trial period on medication can help predict how the kidneys will cope once the thyroid is controlled.'
  },
  'article.hyperthyroid.treatment.diet.title': {
    fi: 'Vähäjodinen dieettiruoka',
    sv: 'Jodfattigt veterinärfoder',
    en: 'Iodine-restricted diet'
  },
  'article.hyperthyroid.treatment.diet.text': {
    fi: 'Hill’s y/d -ruoka tehoaa vain, jos kissa ei syö mitään muuta – ei edes herkkuja, muiden lemmikkien ruokaa tai saaliseläimiä – eikä silloinkaan kaikilla kissoilla. Osa kissoista myös kieltäytyy syömästä sitä maun takia. Siksi se sopii lähinnä yhden kissan talouksien sisäkissoille.',
    sv: 'Fodret (Hill’s y/d) fungerar bara om katten inte äter något annat – inte ens godbitar, andra husdjurs mat eller byten – och även då inte hos alla katter. En del katter vägrar dessutom äta fodret eftersom de inte tycker om smaken. Därför passar det främst innekatter i hem med bara en katt.',
    en: 'This prescription diet (Hill’s y/d) works only if the cat eats nothing else — not even treats, other pets’ food or prey — and even then not in every cat. Some cats also refuse it because of the taste. It is therefore suitable mainly for indoor cats in single-cat homes.'
  },

  // Article 12: Kidney Disease
  'article.kidney.tag': { fi: 'Lemmikkien terveys', sv: 'Husdjurshälsa', en: 'Pet Health' },
  "article.kidney.title": {
    fi: "Krooninen munuaissairaus (munuaisten vajaatoiminta) koiralla ja kissalla – oireet, vaiheet, hoito ja elinikä",
    sv: "Kronisk njursjukdom (njursvikt) hos hund och katt – symtom, stadier, behandling och livslängd",
    en: "Chronic kidney disease (kidney failure) in dogs and cats — symptoms, stages, treatment and life expectancy"
  },
  "article.kidney.intro": {
    fi: "Krooninen munuaissairaus (CKD), tutummin munuaisten vajaatoiminta, on yksi ikääntyvien kissojen yleisimmistä sairauksista: yli 10-vuotiaista kissoista sitä voi sairastaa 30–40 % tai enemmänkin, vaikka useimmilla sairaus on vielä varhaisessa, lievässä vaiheessa. Koirilla se on paljon harvinaisempi, ja sitä todetaan pääasiassa iäkkäillä eläimillä – laajassa brittiläisessä tutkimuksessa lähes kaksi kolmasosaa sairastuneista koirista oli diagnoosihetkellä yli 12-vuotiaita. Munuaiset menettävät toimintakykyään hitaasti ja peruuttamattomasti, ja ensimmäiset merkit jäävät helposti huomaamatta. Munuaisten vajaatoiminta ei silti ole välitön kuolemantuomio: kun sairaus todetaan varhain ja ruokavalio sekä hoito ovat oikeat, moni kissa elää vielä vuosia ja moni koira useita kuukausia tai vuosia, ja elämänlaatu pysyy hyvänä. Tässä artikkelissa kerromme, miten oireet tunnistaa, mitä IRIS-vaiheet tarkoittavat, miten hoidamme munuaispotilaita Eläinklinikka Saarella, mitä lemmikille kannattaa syöttää ja mitä on odotettavissa.",
    sv: "Kronisk njursjukdom (CKD), i vardagligt tal njursvikt, är en av de vanligaste sjukdomarna hos äldre katter: den kan drabba 30–40 % eller fler av katterna över 10 år, i de flesta fall ännu i ett tidigt, lindrigt stadium. Hos hund är den betydligt ovanligare och förekommer främst hos äldre djur – i en stor brittisk studie var nästan två tredjedelar av de drabbade hundarna över 12 år när diagnosen ställdes. Njurarna förlorar sin funktion långsamt och oåterkalleligt, och de första tecknen är lätta att missa. Men njursvikt är ingen omedelbar dödsdom – med tidig diagnos, rätt diet och rätt behandling lever många katter i flera år, och hundar i allt från många månader till flera år, med god livskvalitet. I den här artikeln går vi igenom hur du känner igen symtomen, vad IRIS-stadierna betyder, hur vi behandlar njurpatienter på Djurklinik Saari, vad djuret ska äta och vad du kan vänta dig.",
    en: "Chronic kidney disease (CKD), often called kidney failure, is one of the most common diseases of older cats: it may affect 30–40% or more of cats over 10 years old, although in most of them the disease is still at an early, mild stage. In dogs, it is much less common and is found mainly in older animals — in a large UK study, nearly two thirds of affected dogs were over 12 years old at diagnosis. The kidneys lose function slowly and irreversibly, and the first signs are easy to miss. But kidney failure is not an immediate death sentence — with early diagnosis and the right diet and treatment, many cats live for years, and dogs for many months to years, with a good quality of life. This article explains how to recognise the symptoms, what the IRIS stages mean, how we treat kidney patients at Saari Animal Clinic, what to feed, and what to expect."
  },
  "article.kidney.symptoms.title": {
    fi: "Mitkä ovat munuaisten vajaatoiminnan oireet koiralla ja kissalla?",
    sv: "Vilka är symtomen på njursvikt hos hund och katt?",
    en: "What are the symptoms of kidney failure in dogs and cats?"
  },
  "article.kidney.symptoms.text": {
    fi: "Ensimmäiset merkit ovat hienovaraisia: lemmikki juo ja virtsaa aiempaa enemmän (kissan hiekkalaatikko kastuu nopeammin tai koira pyytää ulos useammin), ruokahalu heikkenee hieman ja paino laskee vähitellen. Sairauden edetessä oireet käyvät selvemmiksi: oksentelu, ripuli tai ummetus, kiilloton ja hoitamaton turkki, lihasten surkastuminen, väsymys, ammoniakilta haiseva hengitys, suun haavaumat sekä anemian vuoksi kalpeat ikenet. Kissa usein vain hiljenee, piileskelee tavallista enemmän ja lakkaa pesemästä itseään. Munuaissairauden aiheuttama korkea verenpaine voi vaurioittaa myös silmiä, ja iäkkään lemmikin äkillinen sokeutuminen vaatii eläinlääkärikäynnin samana päivänä. Koska muutokset kehittyvät kuukausien kuluessa, ne jäävät helposti huomaamatta – ja kreatiniini, verikokeen perinteinen munuaisarvo, pysyy yleensä viitearvojen rajoissa, kunnes munuaisten toiminnasta on menetetty noin kolme neljäsosaa. Siksi suosittelemme koirille ja kissoille vuosittaista veri- ja virtsakoetta 7 vuoden iästä alkaen. Yhdysvaltalaisessa 569 kissan tutkimuksessa paino oli alkanut laskea keskimäärin jo kolme vuotta ennen diagnoosia. Laajassa brittiläisessä tutkimuksessa noin joka kolmannen kissan potilastietoihin ei ollut kirjattu sairauden oireita, kun munuaissairaus todettiin.",
    sv: "De tidigaste tecknen är diskreta: djuret dricker mer och kissar mer (kattlådan blir våt snabbare eller hunden ber oftare om att få gå ut), aptiten minskar en aning och vikten sjunker långsamt. När sjukdomen fortskrider blir tecknen tydligare: kräkningar, diarré eller förstoppning, glanslös och ovårdad päls, muskelförtvining, orkeslöshet, dålig andedräkt med en ammoniakliknande lukt, sår i munnen och blekt tandkött på grund av blodbrist. Katter blir ofta bara stillsammare, gömmer sig mer och slutar tvätta sig. Högt blodtryck till följd av njursjukdomen kan också skada ögonen, och om ett äldre djur plötsligt blir blint ska det till veterinär samma dag. Eftersom förändringarna smyger sig på under loppet av månader är de lätta att missa – och kreatinin, det traditionella njurvärdet i blodprovet, håller sig vanligen inom normalgränserna tills ungefär tre fjärdedelar av njurfunktionen har gått förlorad. Därför rekommenderar vi ett årligt blod- och urinprov för hundar och katter från 7 års ålder. I en amerikansk studie av 569 katter hade viktnedgången i genomsnitt kommit i gång redan tre år före diagnosen. I en stor brittisk studie hade ungefär var tredje katt inga sjukdomstecken antecknade i journalen när njursjukdomen diagnostiserades.",
    en: "The earliest signs are subtle: the pet drinks and urinates more (the litter box gets wet faster, or the dog asks to go out more often), its appetite drops a little and its weight creeps down. As the disease progresses, the signs become clearer: vomiting, diarrhoea or constipation, a dull and unkempt coat, muscle wasting, lethargy, bad breath with an ammonia-like smell, mouth ulcers, and pale gums from anaemia. Cats often just become quieter, hide more and stop grooming. High blood pressure caused by kidney disease can also damage the eyes, and an older pet that suddenly goes blind needs to see a vet the same day. Because the changes come on over months, they are easy to miss — and creatinine, the traditional kidney value in a blood test, usually stays within normal limits until roughly three quarters of kidney function has been lost. That is why we recommend a yearly blood and urine test for dogs and cats from the age of 7. In a US study of 569 cats, weight loss was, on average, already under way three years before diagnosis. In a large UK study, about one in three cats had no signs of illness recorded when kidney disease was diagnosed."
  },
  "article.kidney.causes.title": {
    fi: "Mistä munuaisten vajaatoiminta johtuu koiralla ja kissalla?",
    sv: "Vad orsakar njursvikt hos hund och katt?",
    en: "What causes kidney failure in dogs and cats?"
  },
  "article.kidney.causes.text": {
    fi: "Krooninen munuaissairaus johtuu yleensä munuaiskudoksen hitaasta kulumisesta iän myötä, eikä yksittäistä syytä usein löydy. Tunnettuja altistavia tekijöitä ovat korkea verenpaine, munuaistulehdukset ja munuaiskivet, aiemmin sairastettu akuutti munuaisvaurio sekä perinnölliset sairaudet, kuten persialaisilla ja niille sukua olevilla kissaroduilla esiintyvä polykystinen munuaissairaus (PKD); myös jotkin koirarodut ovat muita alttiimpia. Hammassairaudet on yhdistetty munuaissairauteen molemmilla lajeilla, vaikka niiden ei ole osoitettu aiheuttavan sitä. Akuutti munuaisten vajaatoiminta (akuutti munuaisvaurio) on eri asia: se iskee äkillisesti ja missä iässä tahansa myrkytyksen, infektion tai muun vakavan sairauden seurauksena. Syitä ovat esimerkiksi pakkasneste eli jäähdytinneste (etyleeniglykoli), koirilla viinirypäleet ja rusinat, kissoilla liljat, ihmisille tarkoitetut tulehduskipulääkkeet (kuten ibuprofeeni), leptospiroosi sekä vakavat infektiot, kuten kohtutulehdus (pyometra). Akuutti vajaatoiminta on hätätilanne: kun hoito aloitetaan nopeasti, munuaiset voivat usein toipua, mutta eivät aina – tutkimuksissa, joissa seurattiin akuutin munuaisvaurion vuoksi sairaalahoitoon otettuja koiria ja kissoja, noin puolet ei selvinnyt, ja selviytyneille voi jäädä pysyvä munuaisvaurio. Krooninen vajaatoiminta sen sijaan ei korjaannu, vaan sen etenemistä voidaan vain hidastaa.",
    sv: "Kronisk njursjukdom är oftast ett långsamt slitage av njurvävnaden med åldern, och i många fall hittas ingen enskild orsak. Kända bidragande faktorer är högt blodtryck, njurinfektioner och njursten, en tidigare episod av akut njurskada samt ärftliga tillstånd som polycystisk njursjukdom hos perser och besläktade kattraser; också vissa hundraser löper större risk. Tandsjukdom har ett samband med njursjukdom hos båda djurslagen, även om ett orsakssamband inte har bevisats. Akut njursvikt (akut njurskada) är något annat: den slår till plötsligt, i vilken ålder som helst, efter en förgiftning, en infektion eller någon annan svår sjukdom. Bland orsakerna finns frostskyddsvätska (etylenglykol), vindruvor och russin hos hund, liljor hos katt, inflammationshämmande värkmediciner för människor (till exempel ibuprofen), leptospiros samt svåra infektioner som livmoderinflammation (pyometra). Akut njursvikt är ett akutfall: med snabb behandling kan njurarna ofta återhämta sig, men inte alltid – i studier av hundar och katter som lagts in för vård på grund av akut njurskada var det ungefär hälften som inte överlevde, och de som överlever kan få bestående njurskador. Kronisk njursvikt går däremot inte att vända, bara att bromsa.",
    en: "Chronic kidney disease is usually a slow wearing-out of the kidney tissue with age, and often no single cause is found. Known contributors are high blood pressure, kidney infections and stones, an earlier episode of acute kidney injury, and hereditary conditions such as polycystic kidney disease in Persian and related cat breeds; some dog breeds are also more at risk. Dental disease is linked with kidney disease in both species, although it has not been proven to cause it. Acute kidney failure (acute kidney injury) is different: it strikes suddenly, at any age, after poisoning, an infection or another severe illness. Causes include antifreeze (ethylene glycol), grapes and raisins in dogs, lilies in cats, human anti-inflammatory painkillers such as ibuprofen, leptospirosis, and severe infections such as pyometra (womb infection). Acute failure is an emergency: with prompt treatment the kidneys can often recover, but not always — in studies of dogs and cats hospitalised with acute kidney injury, around half did not survive, and survivors can be left with lasting kidney damage. Chronic failure, by contrast, cannot be reversed, only slowed."
  },
  "article.kidney.diagnosis.title": {
    fi: "Miten munuaissairaus todetaan?",
    sv: "Hur diagnostiseras njursjukdom?",
    en: "How is kidney disease diagnosed?"
  },
  "article.kidney.diagnosis.text": {
    fi: "Diagnoosi tehdään veri- ja virtsakokeiden perusteella. Verikokeesta mitataan kreatiniini, urea (BUN), fosfori, kalium ja punasoluarvot sekä meillä myös SDMA – munuaisten toimintaa kuvaava merkkiaine, joka nousee yleensä aiemmin kuin kreatiniini. Kahdessa pienessä tutkimuksessa, joissa seurattiin tutkimuskäytössä olleita kissoja ja koiria, SDMA nousi kissoilla keskimäärin noin 17 kuukautta ja koirilla noin 10 kuukautta ennen kreatiniinia. Virtsakoe kertoo, pystyvätkö munuaiset vielä väkevöimään virtsaa (ominaispaino), vuotaako virtsaan valkuaista (proteiini-kreatiniinisuhde eli UPC) ja onko virtsassa merkkejä tulehduksesta. Mittaamme myös verenpaineen, koska korkea verenpaine on sekä munuaissairauden seuraus että uhka munuaisille, silmille, sydämelle ja aivoille. Vatsan ultraäänitutkimus näyttää munuaisten koon ja rakenteen, ja sillä etsitään kiviä, tukoksia tai kasvaimia. Yksi koholla oleva arvo ei vielä ole diagnoosi, koska kreatiniini ja SDMA voivat toisinaan nousta muistakin syistä. Sairaus varmistetaan ja sen vaihe määritetään vähintään kahdella eri kerralla otettujen näytteiden perusteella, kun potilas on vakaassa tilassa eikä ole kuivunut. Siksi toistamme verikokeen usein muutaman viikon kuluttua, ennen kuin luokittelemme sairauden hoitoa ohjaavaan IRIS-vaiheeseen.",
    sv: "Diagnosen ställs utifrån blod- och urinprov. I blodprovet mäts kreatinin, urea (BUN), fosfor, kalium och röda blodkroppar, hos oss också SDMA – en njurmarkör som vanligen stiger tidigare än kreatinin. I två små studier på försöksdjur steg SDMA i genomsnitt ungefär 17 månader före kreatininet hos katterna och ungefär 10 månader före hos hundarna. Urinprovet visar om njurarna fortfarande kan koncentrera urinen (urinens specifika vikt), om protein läcker ut i urinen (protein/kreatinin-kvoten, UPC) och om det finns tecken på infektion. Vi mäter också blodtrycket, eftersom högt blodtryck både är en följd av njursjukdom och ett hot mot njurarna, ögonen, hjärtat och hjärnan. Ett ultraljud av buken visar njurarnas storlek och struktur och används för att leta efter stenar, stopp i urinvägarna eller tumörer. Ett enstaka förhöjt värde är ingen diagnos, eftersom kreatinin och SDMA ibland kan stiga av andra orsaker. Sjukdomen bekräftas och stadieindelas utifrån prover som tagits vid minst två tillfällen på en stabil patient i god vätskebalans. Därför tar vi ofta om blodprovet efter några veckor innan vi fastställer det IRIS-stadium som styr behandlingen.",
    en: "Diagnosis is based on blood and urine tests. The blood test measures creatinine, urea (BUN), phosphorus, potassium and red blood cells, and at our clinic also SDMA — a kidney marker that usually rises earlier than creatinine. In two small studies of research cats and dogs, SDMA rose, on average, about 17 months before creatinine in cats and about 10 months before it in dogs. The urine test shows whether the kidneys can still concentrate urine (specific gravity), whether protein is leaking into the urine (UPC ratio) and whether there are signs of infection. We also measure blood pressure, because high blood pressure is both a result of kidney disease and a threat to the kidneys, eyes, heart and brain. An abdominal ultrasound shows the size and structure of the kidneys and checks for stones, obstruction or tumours. A single raised value is not a diagnosis, because creatinine and SDMA can occasionally rise for other reasons. The disease is confirmed and staged from tests taken on at least two occasions in a stable, well-hydrated patient. This is why we often repeat the blood test after a few weeks before assigning the IRIS stage, which guides treatment."
  },
  "article.kidney.stages.title": {
    fi: "Mitä munuaissairauden IRIS-vaiheet tarkoittavat?",
    sv: "Vilka är IRIS-stadierna vid njursjukdom?",
    en: "What are the IRIS stages of kidney disease?"
  },
  "article.kidney.stages.text": {
    fi: "Kansainvälinen munuaissairauksien asiantuntijajärjestö IRIS (International Renal Interest Society) luokittelee kroonisen munuaissairauden neljään vaiheeseen veren kreatiniinin ja SDMA:n perusteella. Vaihe 1: kreatiniini on normaali ja SDMA korkeintaan lievästi koholla, mutta munuaissairaudesta on merkkejä – esimerkiksi toistetuissa kokeissa lievästi koholla pysyvä SDMA, laimea virtsa, jolle ei löydy muuta syytä (kissoilla), valkuaista virtsassa, ultraäänitutkimuksessa todetut munuaismuutokset tai ajan myötä nousevat arvot. Vaihe 2: lievä sairaus; kreatiniini normaali tai lievästi koholla, oireet yleensä lieviä tai niitä ei ole lainkaan. Vaihe 3: keskivaikea sairaus; oireet, kuten huono ruokahalu, oksentelu ja laihtuminen, ovat tavallisia, mutta niitä ei aina esiinny. Vaihe 4: vaikea sairaus, jossa ureemisten kriisien – pahoinvoinnin, suun haavaumien ja heikkouden – riski on suuri. Vaihe 2 alkaa koirilla kreatiniiniarvosta 125 µmol/l ja kissoilla arvosta 140 µmol/l, vaihe 3 arvosta 251 µmol/l ja vaihe 4, kun arvo ylittää 440 µmol/l. Jos SDMA pysyy korkeampana kuin kreatiniiniarvon perusteella voisi odottaa, lemmikki luokitellaan yhtä vaihetta ylemmäs ja sitä hoidetaan sen mukaisesti. Verenpaineen ja virtsan valkuaisen mukaiset alaluokat täydentävät kuvaa ja ohjaavat sekä hoitoa että sitä, kuinka usein tilanne tarkistetaan.",
    sv: "International Renal Interest Society (IRIS) delar in kronisk njursjukdom i fyra stadier utifrån halterna av kreatinin och SDMA i blodet. Stadium 1: kreatininet är normalt och SDMA högst lätt förhöjt, men det finns tecken på njursjukdom – till exempel ett SDMA-värde som förblir lätt förhöjt vid upprepade prover, utspädd urin utan någon annan förklaring (hos katt), protein i urinen, avvikande njurar vid ultraljud eller värden som stiger med tiden. Stadium 2: lindrig sjukdom; kreatininet är normalt eller lätt förhöjt, och symtomen är oftast lindriga eller saknas helt. Stadium 3: måttlig sjukdom; symtom som dålig aptit, kräkningar och viktnedgång är vanliga men förekommer inte alltid. Stadium 4: svår sjukdom med hög risk för uremiska kriser – illamående, sår i munnen, svaghet. Stadium 2 börjar vid ett kreatininvärde på 125 µmol/l hos hund och 140 µmol/l hos katt, stadium 3 vid 251 µmol/l och stadium 4 över 440 µmol/l. Om SDMA-värdet förblir högre än kreatininvärdet skulle antyda, placeras djuret i närmast högre stadium och behandlas enligt det stadiet. Understadier för blodtryck och protein i urinen kompletterar bilden och styr både behandlingen och hur ofta vi gör nya kontroller.",
    en: "The International Renal Interest Society (IRIS) classifies chronic kidney disease into four stages based on blood creatinine and SDMA. Stage 1: creatinine normal and SDMA at most slightly raised, but with signs of kidney disease — for example, SDMA that stays slightly raised on repeat tests, dilute urine with no other cause (in cats), protein in the urine, abnormal kidneys on ultrasound, or values rising over time. Stage 2: mild disease; creatinine normal or slightly raised, symptoms usually mild or absent. Stage 3: moderate disease; symptoms such as poor appetite, vomiting and weight loss are common but not always present. Stage 4: severe disease with a high risk of uraemic crises — nausea, mouth ulcers, weakness. Stage 2 starts at a creatinine of 125 µmol/l in dogs and 140 µmol/l in cats, stage 3 at 251 µmol/l and stage 4 above 440 µmol/l. If SDMA stays higher than the creatinine value would suggest, the pet is staged and treated one stage higher. Sub-stages for blood pressure and urine protein complete the picture, guiding treatment and how often we re-check."
  },
  "article.kidney.treatment.title": {
    fi: "Miten munuaisten vajaatoimintaa hoidetaan?",
    sv: "Hur behandlas njursvikt?",
    en: "How is kidney failure treated?"
  },
  "article.kidney.treatment.text": {
    fi: "Munuaissairautta ei voi parantaa, mutta sen etenemistä voidaan usein hidastaa huomattavasti. Hoidon kulmakivet ovat munuaisruokavalio, jossa on rajoitetusti fosforia ja kohtuullisesti hyvälaatuista valkuaista (kliinisissä tutkimuksissa munuaisruokavalion on osoitettu pidentävän elinaikaa), fosfaatinsitojat, jos fosfori pysyy ruokavaliosta huolimatta koholla, sekä aina saatavilla oleva raikas vesi. Tarvittaessa annamme klinikalla nestehoitoa: suoneen, jos lemmikki on kuivunut tai ureemisessa kriisissä, tai ihon alle osalle potilaista, joiden sairaus on pitkälle edennyt. Nesteet annostellaan huolellisesti, koska liika neste voi olla haitallista etenkin sydänsairaille kissoille. Muut hoidot valitaan vaiheen ja tutkimustulosten mukaan: lääkitys korkeaan verenpaineeseen ja virtsaan vuotavaan valkuaiseen (ks. alla), pahoinvointilääkkeet ja ruokahalua lisäävät lääkkeet sekä kaliumlisä, jos veren kaliumpitoisuus on matala (tarve on yleisempi kissoilla). Kun anemia pahenee merkittäväksi, punasolujen tuotantoa kiihdyttävistä pistoksista, kuten darbepoetiinista (ihmisille tarkoitettu lääke), voi olla apua. Munuaisille haitallisia lääkkeitä vältetään tai niiden käyttö lopetetaan mahdollisuuksien mukaan. Virtsasta tutkitaan tulehduksen merkit: munuaisiin asti nouseva virtsatietulehdus voi heikentää munuaisten toimintaa nopeasti, joten se hoidetaan viipymättä. Jos virtsasta löytyy bakteereja, mutta lemmikillä ei ole tulehduksen oireita, antibiootteja ei aina tarvita – eläinlääkäri arvioi tilanteen tapauskohtaisesti. Hammassairaudet pidetään kurissa. Eläinklinikka Saarella laadimme jokaiselle munuaispotilaalle yksilöllisen hoitosuunnitelman ja tarkistamme sitä joka kontrollikäynnillä.",
    sv: "Njursjukdom kan inte botas, men förloppet kan ofta bromsas betydligt. Grundpelarna är en njurdiet med begränsad fosforhalt och en måttlig mängd protein av hög kvalitet (en sådan diet har i kliniska studier visat sig förlänga överlevnaden), fosfatbindare när fosforvärdet förblir högt trots dieten, samt att färskt vatten alltid finns tillgängligt. Vid behov ger vi vätskebehandling på kliniken: som dropp i en ven till ett djur som är uttorkat eller i uremisk kris, eller under huden till vissa djur med långt framskriden sjukdom. Vätskan doseras noggrant, eftersom för mycket vätska kan vara skadligt, särskilt för katter med hjärtsjukdom. Övrig behandling väljs utifrån stadiet och provresultaten: läkemedel mot högt blodtryck och mot proteinläckage i urinen (se nedan), läkemedel mot illamående och aptitstimulerande medel samt kaliumtillskott om kaliumhalten i blodet är låg (behövs oftare hos katter). När blodbristen blir betydande kan injektioner som stimulerar bildningen av röda blodkroppar hjälpa, till exempel darbepoetin, som är ett humanläkemedel. Läkemedel som kan skada njurarna undviks eller sätts ut när det är möjligt. Urinen undersöks för att se om det finns en infektion: en infektion som når njurarna kan snabbt försämra njurfunktionen, och den behandlas därför utan dröjsmål. Bakterier som hittas i urinen hos ett djur utan tecken på infektion kräver inte alltid antibiotika – veterinären avgör från fall till fall. Tandsjukdom hålls under kontroll. På Saari gör vi upp en individuell plan för varje njurpatient och justerar den vid varje kontroll.",
    en: "Kidney disease cannot be cured, but its progression can often be slowed considerably. The cornerstones are a renal diet with restricted phosphorus and moderate amounts of high-quality protein (shown in clinical studies to extend survival), phosphate binders when phosphorus stays high despite the diet, and constant access to fresh water. When needed, we give fluid therapy at the clinic: into a vein for pets that are dehydrated or in a uraemic crisis, or under the skin for some pets with advanced disease. Fluids are dosed carefully, because too much fluid can be harmful, especially in cats with heart disease. Other treatments are chosen according to the stage and test results: medication for high blood pressure and for protein leaking into the urine (see below), anti-nausea drugs and appetite stimulants, and potassium supplements if blood potassium is low (more often needed in cats). When anaemia becomes significant, injections that stimulate red blood cell production, such as darbepoetin (a human medicine), can help. Medicines that can harm the kidneys are avoided or stopped where possible. The urine is checked for infection: an infection that reaches the kidneys can quickly worsen kidney function and is treated promptly. Bacteria found in the urine of a pet with no signs of infection do not always need antibiotics — the vet decides case by case. Dental disease is kept under control. At Saari, we build an individual plan for each kidney patient and adjust it at every check-up."
  },
  'article.kidney.hypertension.title': {
    fi: 'Miten korkeaa verenpainetta ja virtsaan vuotavaa valkuaista hoidetaan?',
    sv: 'Hur behandlas högt blodtryck och protein i urinen?',
    en: 'How are high blood pressure and protein in the urine treated?'
  },
  'article.kidney.hypertension.text': {
    fi: 'Korkea verenpaine on munuaispotilailla yleinen, ja se voi vaurioittaa silmiä, sydäntä, aivoja ja myös munuaisia itseään. Hoito aloitetaan yleensä, kun systolinen verenpaine on toistetuissa mittauksissa pysyvästi 160 mmHg tai enemmän, tai heti, jos korkea paine on jo vaikuttanut silmiin tai muihin elimiin. Kissoille annetaan yleensä amlodipiinia tai telmisartaania (amlodipiinia, jos paine on hyvin korkea tai se on vaikuttanut silmiin tai aivoihin); koirille annetaan yleensä ACE:n estäjää, kuten benatsepriiliä, ja tarvittaessa lisäksi amlodipiinia. Jos virtsan proteiini-kreatiniinisuhde pysyy koiralla yli 0,5:n tai kissalla yli 0,4:n, syy selvitetään. Sen jälkeen munuaisruokavalion rinnalle aloitetaan reniini-angiotensiinijärjestelmää salpaava lääke: kissoille telmisartaani tai benatsepriili ja koirille ensisijaisesti telmisartaani. Kissoille näillä lääkkeillä on myyntilupa tässä kuvattuihin käyttötarkoituksiin, koirille ei. Siksi eläinlääkäri määrää ne koirille myyntiluvan ulkopuoliseen käyttöön, kuten EU:n eläinlääkelainsäädäntö sallii silloin, kun käyttötarkoitukseen ei ole myyntiluvallista lääkettä (niin sanottu kaskadiperiaate). Ellei silmiä tai aivoja uhkaa välitön vaara, kuivuminen korjataan ennen näiden lääkkeiden aloittamista, koska kuivuneella eläimellä ne voivat heikentää munuaisten toimintaa jyrkästi. Verenpaine, virtsan valkuainen ja munuaisarvot tarkistetaan jokaisen annosmuutoksen jälkeen.',
    sv: 'Högt blodtryck är vanligt hos njurpatienter och kan skada ögonen, hjärtat, hjärnan och själva njurarna. Behandling inleds vanligen när det systoliska blodtrycket ligger kvar på 160 mmHg eller högre vid upprepade mätningar, eller genast om ögonen eller andra organ redan har påverkats. Katter får vanligen amlodipin eller telmisartan (amlodipin om trycket är mycket högt eller om ögonen eller hjärnan har påverkats); hundar får vanligen en ACE-hämmare, till exempel benazepril, och vid behov läggs amlodipin till. Om urinens protein/kreatinin-kvot (UPC) förblir över 0,5 hos hund eller 0,4 hos katt utreds orsaken. Därefter ges ett läkemedel som blockerar renin-angiotensinsystemet tillsammans med njurdieten: telmisartan eller benazepril till katter och i första hand telmisartan till hundar. För katter är dessa läkemedel godkända för de användningsområden som beskrivs här. För hundar är de det inte, och därför skriver veterinären ut dem för användning utanför godkännandet (så kallad off label-användning), vilket EU:s lagstiftning om veterinärmedicinska läkemedel tillåter när inget läkemedel är godkänt för ändamålet. Om inte ögonen eller hjärnan är i omedelbar fara, korrigeras en eventuell uttorkning innan de här läkemedlen sätts in, eftersom de hos ett uttorkat djur kan få njurfunktionen att sjunka kraftigt. Blodtryck, protein i urinen och njurvärden kontrolleras på nytt efter varje dosändring.',
    en: 'High blood pressure is common in kidney patients and can damage the eyes, heart and brain, and the kidneys themselves. Treatment is usually started when the systolic blood pressure stays at 160 mmHg or above on repeated measurements, or straight away if the eyes or other organs are already affected. Cats are usually given amlodipine or telmisartan (amlodipine if the pressure is very high or if the eyes or brain are affected); dogs are usually given an ACE inhibitor such as benazepril, with amlodipine added if needed. If the urine protein:creatinine ratio stays above 0.5 in a dog or 0.4 in a cat, the cause is investigated. A drug that blocks the renin–angiotensin system is then given together with the renal diet: telmisartan or benazepril in cats, and telmisartan as the first choice in dogs. In cats, these medicines are licensed for the uses described here. In dogs, they are not, so the vet prescribes them off-label, as EU veterinary law allows when no medicine is licensed for that use. Unless the eyes or brain are in immediate danger, dehydration is corrected before these medicines are started, because in a dehydrated animal they can make kidney function drop sharply. Blood pressure, urine protein and kidney values are re-checked after each change of dose.'
  },
  "article.kidney.diet.title": {
    fi: "Mitä munuaissairaan koiran tai kissan pitäisi syödä?",
    sv: "Vad ska en hund eller katt med njursvikt äta?",
    en: "What should a dog or cat with kidney failure eat?"
  },
  "article.kidney.diet.text": {
    fi: "Munuaisruokavalio eli munuaispotilaille tarkoitettu erityisruoka on hoito, jonka tehosta on vahvin tutkimusnäyttö. Kahdessa satunnaistamattomassa tutkimuksessa munuaisruokaa syöneet kissat elivät yli kaksi kertaa niin kauan kuin ne, jotka eivät sitä syöneet (toisessa niistä elinajan mediaani oli 633 päivää verrattuna 264 päivään). Satunnaistetussa kissatutkimuksessa yksikään munuaisruokaa syönyt kissa ei saanut ureemista kriisiä, kun taas tavallista ruokaa syöneistä sen sai noin neljäsosa. Satunnaistetussa tutkimuksessa, jossa oli mukana lievää tai keskivaikeaa munuaisten vajaatoimintaa sairastavia koiria, munuaisruoka vähensi ureemisia kriisejä ja kuolemia sekä hidasti munuaisten toiminnan heikkenemistä. Munuaisruoissa on vähän fosforia ja kohtuullisesti hyvälaatuista valkuaista. Niihin on lisätty omega-3-rasvahappoja, kaliumia ja B-vitamiineja, ja ne auttavat torjumaan elimistön happamoitumista, jota munuaissairaus voi aiheuttaa. Märkäruoka on parempi vaihtoehto, koska sen mukana lemmikki saa myös vettä – moni munuaispotilas on jatkuvasti lievästi kuivunut. Aloita munuaisruokavalio varhain – mieluiten vaiheessa 2, kun ruokahalu on vielä hyvä – mutta älä koskaan silloin, kun lemmikki on akuutisti sairas, pahoinvoiva tai sairaalahoidossa. Lemmikki voi nimittäin yhdistää pahoinvoinnin aikana syömänsä ruoan huonoon oloon ja kieltäytyä siitä myöhemmin. Samasta syystä anna tabletit erillisen herkun sisällä äläkä piilota niitä munuaisruokaan (poikkeuksena fosfaatinsitojat, jotka sekoitetaan ohjeen mukaan jokaiseen ateriaan). Vaihda ruoka vähitellen usean viikon aikana (kissoilla usein 4–8 viikossa) sekoittamalla vanhaa ruokaa uuteen. Älä koskaan pakota lemmikkiä syömään munuaisruokaa, jos se ei sitä huoli: on tärkeämpää, että lemmikki syö edes jotain, kuin että se syö täydellistä ruokaa. Meillä on kokeiltavaksi useita makuja ja koostumuksia, sekä märkä- että kuivaruokia. Kotitekoinen munuaisruokavalio on mahdollinen, mutta sen on oltava eläinten ravitsemukseen perehtyneen eläinlääkärin laatima – epätasapainoinen kotiruoka voi tehdä enemmän haittaa kuin hyötyä. Kysy meiltä munuaisruoista; myymme niitä myös klinikalla.",
    sv: "En medicinsk njurdiet är den behandling som har starkast vetenskapligt stöd. I två icke-randomiserade studier levde katter som åt njurdiet mer än dubbelt så länge som katter som inte gjorde det (median 633 mot 264 dagar i den ena av dem). I en randomiserad studie på katter fick ingen av katterna som åt njurdiet en uremisk kris, jämfört med ungefär en fjärdedel av dem som åt vanligt foder. I en randomiserad studie på hundar med lindrig till måttlig njursvikt minskade njurdieten antalet uremiska kriser och dödsfall och bromsade försämringen av njurfunktionen. Njurdieter innehåller lite fosfor och en måttlig mängd protein av hög kvalitet. De har tillsatta omega-3-fettsyror, kalium och B-vitaminer och hjälper till att motverka den försurning av kroppen som njursjukdom kan orsaka. Våtfoder är att föredra eftersom djuret då får i sig vatten med maten – många njurpatienter är kroniskt lätt uttorkade. Börja med njurdieten tidigt – helst i stadium 2, när aptiten ännu är god – men aldrig medan djuret är sjukt, illamående eller inlagt för vård. Djuret kan nämligen förknippa ett foder som det har ätit under illamående med att må dåligt och sedan vägra äta det. Av samma skäl ska tabletter ges i en separat godbit och inte gömmas i njurfodret (fosfatbindare är undantaget: de blandas i varje måltid enligt anvisning). Byt foder stegvis under flera veckor (hos katt ofta 4–8 veckor) genom att blanda gammalt och nytt. Tvinga aldrig en njurdiet på ett djur som vägrar äta den: att djuret äter något är viktigare än att det äter det perfekta fodret, och vi har flera smaker och konsistenser att pröva, både våtfoder och torrfoder. Hemlagad njurdiet är möjlig men måste sättas samman av en veterinär med särskild utbildning i nutrition – en obalanserad hemlagad diet kan göra mer skada än nytta. Fråga oss om njurfoder; vi säljer det också på kliniken.",
    en: "A therapeutic renal diet is the treatment with the best evidence behind it. In two non-randomised studies, cats that ate a renal diet lived more than twice as long as cats that did not (a median of 633 versus 264 days in one of them). In a randomised trial in cats, none of the cats on the renal diet had a uraemic crisis, compared with about a quarter of those on ordinary food. In a randomised trial in dogs with mild to moderate kidney failure, a renal diet reduced uraemic crises and deaths, and slowed the decline in kidney function. Renal diets are low in phosphorus and contain moderate amounts of high-quality protein. They have added omega-3 fatty acids, potassium and B vitamins, and help counter the acid build-up that kidney disease can cause. Wet food is preferable because it also provides water — many kidney patients are in a state of mild, chronic dehydration. Start the renal diet early — ideally in stage 2, while appetite is still good — but never while the pet is ill, nauseous or hospitalised. This is because a pet can link a food eaten during nausea with feeling sick, and refuse it afterwards. For the same reason, give tablets in a separate treat rather than hiding them in the renal food (phosphate binders are the exception: they are mixed into each meal as instructed). Switch foods gradually over several weeks (often 4–8 weeks in cats), mixing the old food with the new. Never force a renal diet on a pet that refuses it: eating something is more important than eating the perfect food, and we have several flavours and textures, both wet and dry, to try. Home-cooked renal diets are possible but must be formulated by a veterinary nutritionist — an unbalanced home diet can do more harm than good. Ask us about renal foods; we also sell them at the clinic."
  },
  "article.kidney.prognosis.title": {
    fi: "Kuinka kauan munuaissairas koira tai kissa voi elää?",
    sv: "Hur länge kan en hund eller katt leva med njursvikt?",
    en: "How long can a dog or cat live with kidney failure?"
  },
  "article.kidney.prognosis.text": {
    fi: "Elinaika riippuu ennen kaikkea siitä, missä vaiheessa sairaus todetaan, ja siitä, kuinka hyvin fosfori, verenpaine ja virtsan valkuainen saadaan hallintaan ja ruokahalu pysymään hyvänä. Tunnetussa 211 kissan tutkimuksessa elinajan mediaani oli noin 3 vuotta kissoilla, joiden sairaus todettiin vaiheen 2 yläpäässä (kreatiniini yli noin 200 µmol/l), noin 2 vuotta vaiheessa 3 todetuilla ja noin 3 kuukautta vaiheessa 4 todetuilla. Vaiheen 2 alkupuolella todetut kissat voivat pärjätä vielä paremmin. Julkaistuissa tutkimuksissa koirat ovat yleensä eläneet diagnoosin jälkeen lyhyemmän aikaa kuin kissat. Kahdessa pienemmässä tutkimuksessa (27 ja 116 koiraa) elinajan mediaani oli noin 15 kuukautta vaiheessa 2, 6–11 kuukautta vaiheessa 3 ja kahdesta viikosta kahteen kuukauteen vaiheessa 4. Molemmissa tutkimuksissa käytettiin IRIS-luokituksen vanhempia raja-arvoja, joiden mukaan koirien vaihe 3 alkoi jo arvosta noin 180 µmol/l (nykyään 251 µmol/l). Kaikki nämä luvut ovat mediaaneja tutkimuksista, joissa eläimet olivat eläinlääkärin hoidossa: puolet eläimistä eli tätä pidempään. Ne eivät ole ennusteita juuri sinun lemmikillesi – kun munuaisruoka maistuu, ruokahalu on hyvä ja seuranta on säännöllistä, moni yksittäinen eläin elää näitä lukuja pidempään.",
    sv: "Det beror främst på stadiet vid diagnosen och på hur väl fosfor, blodtryck, protein i urinen och aptit hålls under kontroll. I en välkänd studie av 211 katter levde de som fått diagnosen i den övre delen av stadium 2 (kreatinin över ungefär 200 µmol/l) i median ungefär 3 år, de i stadium 3 ungefär 2 år och de i stadium 4 ungefär 3 månader. Katter som får diagnosen tidigare i stadium 2 kan klara sig ännu bättre. I publicerade studier har hundar i allmänhet levt kortare tid efter diagnosen än katter. I två mindre studier (27 och 116 hundar) var medianöverlevnaden ungefär 15 månader i stadium 2, 6–11 månader i stadium 3 och mellan 2 veckor och 2 månader i stadium 4. Båda studierna använde äldre IRIS-gränser, enligt vilka stadium 3 hos hund började vid ungefär 180 µmol/l i stället för dagens 251. Alla dessa siffror är medianvärden från studier av djur under veterinärvård: hälften av djuren levde längre. De är inga förutsägelser för just ditt djur – med en njurdiet som djuret gärna äter, god aptit och regelbunden uppföljning lever många enskilda djur längre än så.",
    en: "It depends mostly on the stage at diagnosis and on how well phosphorus, blood pressure, urine protein and appetite are managed. In a well-known study of 211 cats, those diagnosed at the upper end of stage 2 (creatinine above about 200 µmol/l) lived a median of about 3 years, those in stage 3 about 2 years, and those in stage 4 about 3 months. Cats diagnosed earlier in stage 2 may do even better. In published studies, dogs have generally lived for a shorter time after diagnosis than cats. In two smaller studies (27 and 116 dogs), median survival was about 15 months in stage 2, 6–11 months in stage 3, and between 2 weeks and 2 months in stage 4. Both studies used older IRIS limits, under which stage 3 in dogs began at about 180 µmol/l instead of today’s 251. All these figures are medians from studies of animals under veterinary care: half of the animals lived longer. They are not predictions for your pet — with a well-accepted renal diet, a good appetite and regular monitoring, many individual animals outlive them."
  },
  "article.kidney.endstage.title": {
    fi: "Miltä munuaisten vajaatoiminnan loppuvaihe näyttää?",
    sv: "Hur ser slutstadiet av njursvikt ut?",
    en: "What does end-stage kidney failure look like?"
  },
  "article.kidney.endstage.text": {
    fi: "Loppuvaiheessa munuaiset eivät enää pysty poistamaan kuona-aineita verestä, ja lemmikille kehittyy uremia eli virtsamyrkytys. Lemmikki lakkaa syömästä (ja usein myös juomasta), oksentelee, laihtuu nopeasti, on heikko ja nukkuu suurimman osan päivästä. Sen suussa voi myös olla haavaumia, hengitys voi haista voimakkaalta, ja joskus esiintyy vapinaa. Nestehoito, pahoinvointilääkkeet ja ruokahalua lisäävät lääkkeet voivat tuoda takaisin hyviä päiviä joksikin aikaa. Autamme sinua arvioimaan elämänlaatua rehellisesti: syökö lemmikki yhä, liikkuuko se, ottaako se kontaktia ja onko se kivuton useimpina päivinä? Kun vastaus muuttuu kieltäväksi, eutanasia on viimeinen palvelus, jonka voimme lemmikille tehdä, ja puhumme siitä kanssasi avoimesti ja hyvissä ajoin.",
    sv: "I slutstadiet kan njurarna inte längre rena blodet från slaggprodukter, och djuret blir uremiskt. Det slutar äta och ofta också dricka, kräks, går snabbt ner i vikt, är svagt och sover större delen av dagen. Det kan också ha sår i munnen, en stark lukt i andedräkten och ibland darrningar. Vätskebehandling, läkemedel mot illamående och aptitstimulerande medel kan ge djuret goda dagar igen under en tid. Vi hjälper dig att ärligt bedöma livskvaliteten: äter djuret ännu, rör det på sig, söker det kontakt och är det fritt från smärta de flesta dagar? När svaret blir nej är avlivning den sista omsorg vi kan visa djuret, och vi talar med dig om den öppet och i god tid.",
    en: "In the final stage, the kidneys can no longer clear waste from the blood, and the pet becomes uraemic. It stops eating (and often drinking), vomits, loses weight rapidly, is weak and sleeps most of the day. It may also have mouth ulcers, strong-smelling breath and, occasionally, tremors. Fluids, anti-nausea drugs and appetite stimulants can bring back good days for a while. We help you judge quality of life honestly: is the pet still eating, moving, interacting and free of pain most days? When the answer becomes no, euthanasia is the last kindness we can offer, and we talk about it with you openly and in good time."
  },
  "article.kidney.monitoring.title": {
    fi: "Kuinka usein munuaispotilasta pitää seurata?",
    sv: "Hur ofta ska en njurpatient kontrolleras?",
    en: "How often should a kidney patient be checked?"
  },
  "article.kidney.monitoring.text": {
    fi: "Diagnoosin jälkeen teemme yleensä kontrollin 2–4 viikon kuluessa nähdäksemme, miten ruokavalio ja hoito toimivat. Sen jälkeen vakaat vaiheen 2 potilaat käyvät kontrollissa 3–6 kuukauden välein, vaiheen 3 potilaat 2–3 kuukauden välein ja vaiheen 4 potilaat 1–2 kuukauden välein. Verenpainelääkitystä saava lemmikki pitäisi tarkastaa vähintään kerran 3 kuukaudessa silloinkin, kun sen tila on vakaa. Jokaiseen kontrolliin kuuluu punnitus, verenpaineen mittaus, verikoe (kreatiniini, SDMA, fosfori, kalium, punasoluarvot) ja virtsakoe. Juuri säännöllinen seuranta antaa meille mahdollisuuden säätää hoitoa, ennen kuin pieni ongelma kasvaa kriisiksi.",
    sv: "Efter diagnosen gör vi vanligen en ny kontroll inom 2–4 veckor för att se hur dieten och behandlingen fungerar. Därefter kontrollerar vi stabila patienter i stadium 2 med 3–6 månaders mellanrum, patienter i stadium 3 med 2–3 månaders mellanrum och patienter i stadium 4 med 1–2 månaders mellanrum. Ett djur som får blodtrycksmedicin bör kontrolleras minst var tredje månad, även när det är stabilt. Varje kontroll omfattar vikt, blodtryck, blodprov (kreatinin, SDMA, fosfor, kalium, röda blodkroppar) och urinprov. Den regelbundna uppföljningen är det som gör att vi kan justera behandlingen innan ett litet problem hinner bli en kris.",
    en: "After diagnosis, we usually re-check within 2–4 weeks to see how the diet and treatment are working. From then on, we re-check every 3–6 months in stable stage 2 patients, every 2–3 months in stage 3, and every 1–2 months in stage 4. A pet on blood-pressure medication should be checked at least every 3 months, even when stable. Each check includes weight, blood pressure, a blood test (creatinine, SDMA, phosphorus, potassium, red blood cells) and a urine test. Regular monitoring is what lets us adjust treatment before a small problem becomes a crisis."
  },
  "article.kidney.prevention.title": {
    fi: "Voiko munuaissairauden ehkäistä tai todeta ajoissa?",
    sv: "Kan njursjukdom förebyggas eller upptäckas tidigt?",
    en: "Can kidney disease be prevented or caught early?"
  },
  "article.kidney.prevention.text": {
    fi: "Kroonista munuaissairautta ei voi täysin ehkäistä, mutta se voidaan löytää ajoissa – ja varhain, mieluiten viimeistään vaiheessa 2 aloitettu hoito antaa parhaat mahdollisuudet hidastaa sairauden etenemistä. Suosittelemme koirille ja kissoille 7 vuoden iästä alkaen vuosittaista senioritarkastusta veri- ja virtsakokeineen; tarkastukseemme sisältyy SDMA-munuaiskoe. Suosittelemme myös huolehtimaan lemmikin hampaista (hammassairaudet on yhdistetty munuaissairauteen), antamaan märkäruokaa kissoille, jotka juovat vähän, sekä pitämään pakkasnesteen, ihmisten kipulääkkeet, viinirypäleet, rusinat ja liljat lemmikkien ulottumattomissa. Jos kissasi juo aiempaa enemmän tai laihtuu, tuo se tutkittavaksi viipymättä – nämä ovat tavallisia varhaisia merkkejä. Vuositarkastus on tärkeä myös silloin, kun oireita ei ole: laajassa brittiläisessä tutkimuksessa noin joka kolmannen kissan potilastietoihin ei ollut kirjattu sairauden oireita, kun sairaus todettiin.",
    sv: "Kronisk njursjukdom kan inte helt förebyggas, men den kan upptäckas tidigt – och behandling som sätts in tidigt, helst senast i stadium 2, ger bäst chans att bromsa förloppet. Vi rekommenderar en årlig seniorkontroll med blod- och urinprov för hundar och katter från 7 års ålder; vår seniorkontroll omfattar ett SDMA-njurtest. Vi rekommenderar också att du sköter om djurets tänder (tandsjukdom har ett samband med njursjukdom), ger våtfoder till katter som dricker lite och förvarar frostskyddsvätska, värkmediciner för människor, vindruvor, russin och liljor utom räckhåll. Om din katt dricker mer eller går ner i vikt, låt en veterinär undersöka den utan dröjsmål – det är vanliga tidiga tecken. Även när inga tecken syns är den årliga kontrollen viktig: i en stor brittisk studie hade ungefär var tredje katt inga sjukdomstecken antecknade i journalen när sjukdomen diagnostiserades.",
    en: "Chronic kidney disease cannot be fully prevented, but it can be caught early — and treatment started early, ideally by stage 2, gives the best chance of slowing it down. We recommend a yearly senior check-up with blood and urine tests for dogs and cats from the age of 7; ours includes an SDMA kidney test. We also recommend looking after your pet’s teeth (dental disease is linked with kidney disease), feeding wet food to cats that drink little, and keeping antifreeze, human painkillers, grapes, raisins and lilies out of reach. If your cat is drinking more or losing weight, have it checked without delay — these are common early signs. Even without signs, the yearly check-up matters: in a large UK study, about one in three cats had no signs of illness recorded when the disease was diagnosed."
  },
  "article.kidney.contact.title": {
    fi: "Milloin lemmikki pitää viedä eläinlääkäriin?",
    sv: "När ska jag ta min hund eller katt till veterinären?",
    en: "When should I bring my pet to the vet?"
  },
  "article.kidney.contact.text": {
    fi: "Jos koirasi tai kissasi juo ja virtsaa aiempaa enemmän, on laihtunut tai menettänyt ruokahalunsa, oksentelee toistuvasti tai sen hengitys haisee pahalta, varaa aika. Äkillisesti sokeutunut lemmikki on vietävä eläinlääkäriin samana päivänä. Käynnillä otettavat veri- ja virtsakokeet kertovat, onko kyse munuaisista; kroonisen munuaissairauden varmistamiseksi ja vaiheen määrittämiseksi toistamme kokeet yleensä, kun lemmikin tila on vakaa. Eläinklinikka Saari Vaasassa seuraa munuaispotilaita yksilöllisen aikataulun mukaan. Soita (06) 321 7300 tai varaa aika verkossa.",
    sv: "Boka en tid om din hund eller katt dricker och kissar mer än förut, har gått ner i vikt eller tappat aptiten, kräks upprepade gånger eller har dålig andedräkt. Ett djur som plötsligt blir blint ska till veterinär samma dag. Blod- och urinprov som tas vid besöket visar om njurarna är påverkade; för att bekräfta kronisk njursjukdom och fastställa stadiet tar vi vanligen om proverna när djuret är stabilt. Djurklinik Saari i Vasa följer upp njurpatienter enligt ett individuellt schema. Ring (06) 321 7300 eller boka tid på nätet.",
    en: "If your dog or cat drinks and urinates more than before, has lost weight or appetite, vomits repeatedly or has bad breath, book an appointment. A pet that suddenly goes blind needs to see a vet the same day. Blood and urine tests taken at the visit show whether the kidneys are involved; to confirm chronic kidney disease and determine its stage, we usually repeat them once the pet is stable. Saari Animal Clinic in Vaasa monitors kidney patients on an individual schedule. Call (06) 321 7300 or book online."
  },

  // Article 13: Snake Bite
  'article.snake.tag': { fi: 'Päivystys', sv: 'Akutvård', en: 'Emergency' },
  'article.snake.title': {
    fi: 'Kyynpurema – Suomen ainoan myrkyllisen käärmeen purema lemmikille',
    sv: 'Huggormsbett – bett av Finlands enda giftiga orm',
    en: 'Adder Bite — Finland\'s Only Venomous Snake Bite in Pets'
  },
  'article.snake.intro': {
    fi: 'Kyy (Vipera berus) on Suomen ainoa myrkyllinen käärme, ja sitä tavataan lähes koko maassa, myös Pohjanmaalla. Puremia sattuu pääasiassa huhti–syyskuussa, jolloin kyyt ovat liikkeellä talvihorroksen jälkeen. Keväällä ja syksyllä ne paistattelevat usein aurinkoisilla, avoimilla rinteillä talvehtimispaikkojensa lähellä. Koirat saavat kyynpureman useimmin, koska ne nuuskivat käärmettä ja tökkivät sitä tassullaan. Siksi puremat osuvat yleensä päähän, kuonoon tai jalkoihin. Myös kissa voi saada kyynpureman. Kyynpurema on aina eläinlääkärin hoitoa vaativa hätätilanne.',
    sv: 'Huggormen (Vipera berus) är Finlands enda giftiga orm och finns i nästan hela landet, också i Österbotten. Bett sker främst från april till september, då huggormarna inte ligger i vinterdvala. På våren och hösten solar de sig ofta på öppna, soliga sluttningar nära sina övervintringsplatser. Det är oftast hundar som blir bitna, eftersom de nosar på ormarna och slår efter dem med tassen, och därför sitter de flesta bett på huvudet, nosen eller benen. Också katter kan bli bitna. Ett huggormsbett är alltid ett akut fall för veterinären.',
    en: 'The European adder (Vipera berus) is Finland’s only venomous snake and lives across almost the whole country, including Ostrobothnia. Bites happen mainly from April to September, while adders are out of hibernation; in spring and autumn they often bask in the open on sunny slopes near their winter dens. Dogs are bitten most often because they sniff and paw at snakes, so most bites are on the head, muzzle or legs. Cats can be bitten too. An adder bite is always a veterinary emergency.'
  },
  'article.snake.symptoms.title': {
    fi: 'Oireet',
    sv: 'Symtom',
    en: 'Symptoms'
  },
  'article.snake.symptoms.text': {
    fi: 'Turvotus alkaa yleensä nopeasti, usein jo minuuteissa. Muut oireet kehittyvät tuntien kuluessa, ja sydämen rytmihäiriöitä voi ilmaantua muutaman tunnin kuluttua tai jopa vasta noin kahden vuorokauden päästä puremasta. Paikalliset oireet: nopeasti leviävä, kivulias turvotus, mustelmat ja joskus yksi tai kaksi pientä pistojälkeä, jotka jäävät usein turkin alle. Yleisoireet: vaisuus, heikkous, kuolaaminen, oksentelu, nopea hengitys ja kiihtynyt syke. Vakavat oireet: lyyhistyminen, kalpeat ikenet, verenvuoto puremakohdasta tai laajat mustelmat sekä epäsäännöllinen syke. Pään ja kaulan turvotus sekä puremat suuhun tai kieleen voivat ahtauttaa hengitysteitä. Vaikka lemmikki vaikuttaisi jo voivan paremmin, sen vointi voi vielä huonontua.',
    sv: 'Svullnaden kommer i regel snabbt, ofta inom några minuter. Andra symtom utvecklas under flera timmar, och rytmrubbningar i hjärtat kan visa sig redan inom några timmar men också så sent som ungefär två dygn efter bettet. Lokala symtom: smärtsam svullnad som sprider sig snabbt, blåmärken och ibland ett eller två små bettmärken som ofta döljs av pälsen. Allmänna symtom: slöhet, svaghet, dregling, kräkningar, snabb andning och hög puls. Allvarliga symtom: kollaps, blekt tandkött, blödning från bettet eller utbredda blåmärken samt oregelbunden hjärtrytm. Svullnad i huvud och hals samt bett i munnen eller på tungan kan göra luftvägarna trängre. Ett djur som verkar må bättre kan ändå bli sämre.',
    en: 'Swelling usually starts quickly, often within minutes. Other signs develop over hours, and heart rhythm problems can appear within hours or up to about two days after the bite. Local signs: fast-spreading, painful swelling, bruising, and sometimes one or two small puncture marks, often hidden by fur. General signs: dullness, weakness, drooling, vomiting, fast breathing and a racing heart. Serious signs: collapse, pale gums, bleeding from the bite or widespread bruising, and an irregular heartbeat. Swelling of the head and neck, and bites to the mouth or tongue, can narrow the airway. A pet that seems better can still get worse.'
  },
  'article.snake.firstaid.title': {
    fi: 'Ensiapu',
    sv: 'Första hjälpen',
    en: 'First Aid'
  },
  'article.snake.firstaid.text': {
    fi: 'Soita eläinlääkärille heti, vaikka lemmikki vaikuttaisi olevan kunnossa: Eläinklinikka Saari (06) 321 7300 tai aukioloaikojen ulkopuolella Vaasan eläinlääkäripäivystys 0600 399 299. Soita myös silloin, jos et ole varma, oliko kyseessä käärme vai ampiainen. Merkitse muistiin pureman kellonaika. Pidä lemmikki rauhallisena ja paikallaan: kanna pieni koira ja anna ison koiran kävellä hitaasti. Irrota kaulapanta, jos pää tai kaula turpoaa. Jos hengitys vaikeutuu, lähde heti lähimmälle eläinlääkärille ja soita matkalla. Älä viillä äläkä ime puremakohtaa, älä laita siihen jäätä äläkä käytä kiristyssidettä. Älä anna ihmisille tarkoitettuja kipulääkkeitä. Älä anna ”kyypakkauksen” kortisonitabletteja, ellei eläinlääkäri kehota. Ne eivät tehoa myrkkyyn, ja niiden vaikutus alkaa vasta tuntien kuluttua. Jätä käärme rauhaan – kyy on Suomessa rauhoitettu.',
    sv: 'Ring genast en veterinär, även om ditt djur verkar må bra. Djurklinik Saari: (06) 321 7300. Utanför öppettiderna: veterinärjouren i Vasanejden (Norra jourområdet), 0600 399 299. Är du osäker på om det var en orm eller en geting, ring ändå. Anteckna klockslaget för bettet. Håll djuret lugnt och stilla: bär en liten hund och låt en stor hund gå långsamt. Ta av halsbandet om huvudet eller halsen svullnar. Om djuret får svårt att andas, åk genast till närmaste veterinär och ring på vägen. Skär inte i bettet, sug inte på det, lägg inte is på det och sätt inte på något stasband. Ge inte djuret smärtstillande läkemedel för människor. Ge inte ”huggormstabletter” (kortison) om inte en veterinär säger till – de behandlar inte giftet och börjar verka först efter flera timmar. Låt ormen vara. Huggormen är fridlyst i Finland.',
    en: 'Call a vet straight away, even if your pet seems fine: Eläinklinikka Saari on (06) 321 7300 or, after hours, the Vaasa vet emergency line on 0600 399 299. If you are not sure whether it was a snake or a wasp, call anyway. Note the time of the bite. Keep your pet calm and still: carry a small dog, and let a large one walk slowly. Take off the collar if the head or neck is swelling. If breathing becomes difficult, go to the nearest vet at once and call on the way. Do not cut or suck the bite, put ice on it or apply a tourniquet. Do not give human painkillers. Do not give “adder tablets” (cortisone) unless a vet tells you to — they do not treat the venom and take hours to work. Leave the snake alone; adders are protected in Finland.'
  },
  'article.snake.treatment.title': {
    fi: 'Eläinlääkärin hoito',
    sv: 'Veterinärbehandling',
    en: 'Veterinary Treatment'
  },
  'article.snake.treatment.text': {
    fi: 'Hoitoon kuuluvat suonensisäinen nesteytys, tehokas kivunlievitys (yleensä opioidi) ja tiivis seuranta vähintään 24 tunnin ajan, usein pidempään. Seurantaan kuuluvat EKG sydämen rytmin tarkkailemiseksi sekä verikokeet, joista tutkitaan verenkuva, veren hyytyminen ja munuais-, maksa- ja lihasarvot. Vastamyrkky (antiseerumi) sitoo elimistössä vielä olevaa myrkkyä; yhdessä laajassa tutkimuksessa vastamyrkkyä saaneiden koirien turvotus laski noin kaksi kertaa nopeammin. Eläinlääkäri käyttää sitä keskivaikeissa ja vaikeissa tapauksissa, mieluiten varhain. Klinikallamme on saatavilla kyyn vastamyrkkyä. Tulehduskipulääkkeitä vältetään, eikä kortisonia anneta rutiininomaisesti, koska koirilla tehdyssä kliinisessä tutkimuksessa siitä ei havaittu hyötyä. Useimmat koirat pääsevät kotiin vuorokauden tai kahden kuluessa ja toipuvat täysin; turvotus laskee muutamassa päivässä. Laajemmissa tutkimuksissa kyynpureman saaneista koirista kuoli noin 3–5 %.',
    sv: 'Behandlingen omfattar dropp, stark smärtlindring (oftast en opioid) och noggrann övervakning i minst 24 timmar, ofta längre. I övervakningen ingår EKG för hjärtrytmen och blodprov för blodbild, koagulation samt njur-, lever- och muskelvärden. Antiserum (motgift) binder det gift som ännu finns kvar i kroppen; i en stor studie gick svullnaden tillbaka ungefär dubbelt så snabbt hos hundar som fick antiserum. Veterinären använder det vid medelsvåra till svåra fall, helst i ett tidigt skede. Vår klinik har antiserum mot huggormsgift. Antiinflammatoriska smärtstillande läkemedel undviks, och kortison ges inte rutinmässigt, eftersom en klinisk prövning på hundar inte visade någon nytta. De flesta hundar får åka hem inom ett par dygn och tillfrisknar helt; svullnaden lägger sig under några dagar. I större studier dog omkring 3–5 % av de bitna hundarna.',
    en: 'Treatment includes intravenous fluids, strong pain relief (usually an opioid) and close monitoring for at least 24 hours, often longer. Monitoring includes an ECG to check heart rhythm and blood tests for blood count, clotting, and kidney, liver and muscle values. Antivenom binds venom that is still in the body; in one large study, swelling went down about twice as fast in dogs given antivenom. The vet uses it in moderate to severe cases, ideally early. Our clinic has adder antivenom available. Anti-inflammatory painkillers are avoided, and cortisone is not given routinely because a trial in dogs showed no benefit. Most dogs go home within a day or two and recover fully; the swelling settles over a few days. In larger studies, about 3–5 % of bitten dogs died.'
  },
  'article.snake.prevention.title': {
    fi: 'Ehkäisy',
    sv: 'Förebyggande',
    en: 'Prevention'
  },
  'article.snake.prevention.text': {
    fi: 'Pidä koira kytkettynä kyyn suosimissa maastoissa: aurinkoisilla kallioilla, metsänreunoilla, metsäaukeilla, niityillä ja soiden reunoilla, etenkin aurinkoisina kevät- ja syyspäivinä. Pysy poluilla äläkä anna koiran tunkea kuonoaan kivikasoihin tai pusikoihin. Kyy on arka ja puree vain, jos se yllätetään tai sitä häiritään. Pidä jokaista puremaa hätätilanteena, vaikka koira olisi saanut kyynpureman aiemminkin.',
    sv: 'Håll hunden kopplad i huggormsterräng: soliga hällmarker och bergknallar, skogsbryn, gläntor, ängar och myrkanter, särskilt när solen skiner på våren och hösten. Gå på stigarna och låt inte hunden sticka in nosen i stenrösen eller täta snår. Huggormar är skygga och biter bara när de blir överraskade eller störda. Behandla varje bett som ett akut fall, även om hunden har blivit biten förut.',
    en: 'Keep your dog on a leash in adder habitat: sunny rocky outcrops, forest edges, clearings, meadows and bog margins, especially in spring and autumn sunshine. Stay on paths and don’t let your dog nose into stone piles or undergrowth. Adders are shy and bite only when surprised or disturbed. Treat every bite as an emergency, even if your dog has been bitten before.'
  },

  // Article: Poisoning (myrkytys) — native-panel final
  'article.poison.tag': { fi: 'Päivystys', sv: 'Akutvård', en: 'Emergency' },
  "article.poison.title": {
    fi: "Myrkytys koiralla ja kissalla – oireet, ensiapu ja milloin on toimittava heti",
    sv: "Förgiftning hos hund och katt — symtom, första hjälpen och när du bör agera genast",
    en: "Poisoning in Dogs and Cats: Symptoms, First Aid and When to Act Straight Away"
  },
  "article.poison.intro": {
    fi: "Myrkytys on yleinen syy päivystyskäyntiin eläinlääkärillä. Usein koira tai kissa myrkyttyy syötyään jotain, mikä on meille harmitonta mutta sille myrkyllistä, kuten suklaata, ksylitolia tai viinirypäleitä – tai päästyään käsiksi ihmisten lääkkeisiin. Myrkytyksen vakavuus riippuu aineesta, nielaistusta määrästä ja eläimen koosta. Myrkytysepäilyssä kannattaa aina soittaa heti eläinlääkärille, vaikka lemmikki vaikuttaisi vielä täysin terveeltä. Monien myrkkyjen kohdalla hoito tehoaa parhaiten – tai ainoastaan – ennen kuin oireita ilmaantuu.",
    sv: "Förgiftningar är en vanlig orsak till akuta veterinärbesök. Ofta blir hunden eller katten förgiftad av något som är ofarligt för oss men giftigt för den, till exempel choklad, xylitol eller vindruvor – eller av människors läkemedel som den har kommit åt. Hur sjukt djuret blir beror på ämnet, mängden det har fått i sig och djurets storlek. Misstänker du förgiftning lönar det sig alltid att genast ringa veterinären, även om djuret ännu verkar helt piggt. Vid många förgiftningar fungerar behandlingen bäst – eller enbart – innan några symtom har visat sig.",
    en: "Poisoning is a common reason for emergency visits to the vet. Often, a dog or cat is poisoned by eating something that is harmless to us but toxic to them, such as chocolate, xylitol or grapes — or by getting into human medicines. How ill the animal becomes depends on the substance, the amount swallowed and the animal’s size. A suspected poisoning is always worth an immediate call to your vet, even if your pet still seems perfectly well. For many poisons, treatment works best — or only works — before any signs appear."
  },
  "article.poison.common.title": {
    fi: "Vaaralliset ruoka-aineet",
    sv: "Farlig mat",
    en: "Dangerous foods"
  },
  "article.poison.common.text": {
    fi: "Useimmin ongelmia aiheuttavat suklaa, ksylitoli, viinirypäleet ja rusinat sekä sipuli ja valkosipuli. Suklaa ja kaakao sisältävät teobromiinia – mitä tummempi suklaa, sitä vaarallisempi se on. Ksylitoli on makeutusaine, jota on purukumeissa, pastilleissa, makeisissa, joissakin leivonnaisissa ja hammastahnassa. Koiralle se aiheuttaa verensokerin äkillisen laskun ja suurempina annoksina maksavaurion. Viinirypäleet ja rusinat voivat aiheuttaa koiralle munuaisten vajaatoiminnan, eikä turvallista määrää tunneta. Sipuli ja valkosipuli ovat vaarallisia kaikissa muodoissa – raakana, kypsennettynä tai jauheena – koska ne vaurioittavat punasoluja; kissat ovat niille vielä koiria herkempiä.",
    sv: "De ämnen som oftast ställer till problem är choklad, xylitol, vindruvor och russin samt lök och vitlök. Choklad och kakao innehåller teobromin – ju mörkare chokladen är, desto farligare är den. Xylitol är ett sötningsmedel som finns i tuggummi, pastiller, godis, vissa bakverk och tandkräm. Hos hund orsakar det ett plötsligt blodsockerfall och i större doser leverskador. Vindruvor och russin kan orsaka njursvikt hos hund, och det finns ingen känd säker mängd. Lök och vitlök i alla former – råa, tillagade eller som pulver – skadar de röda blodkropparna, och katter är ännu känsligare för dem än hundar.",
    en: "The substances that most often cause trouble are chocolate, xylitol, grapes and raisins, and onion and garlic. Chocolate and cocoa contain theobromine — the darker the chocolate, the more dangerous it is. Xylitol is a sweetener found in chewing gum, pastilles, sweets, some baked goods and toothpaste. In dogs it causes a sudden drop in blood sugar and, at larger doses, liver damage. Grapes and raisins can cause kidney failure in dogs, and there is no known safe amount. Onion and garlic in any form — raw, cooked or powdered — damage the red blood cells, and cats are even more sensitive to them than dogs."
  },
  "article.poison.other.title": {
    fi: "Jyrsijämyrkyt, lääkkeet ja muut vaarat",
    sv: "Råttgift, läkemedel och andra faror",
    en: "Rat poisons, medicines and other dangers"
  },
  "article.poison.other.text": {
    fi: "Rotan- ja hiirenmyrkyt vaikuttavat eri tavoin. Veren hyytymistä estävät myrkkysyötit (antikoagulantit), joita Suomessa myydään kuluttajille yhä valmiiksi täytetyissä syöttirasioissa sisäkäyttöön, aiheuttavat sisäisiä verenvuotoja. Alfakloraloosi puolestaan on myrkyttänyt Suomessa monia kissoja, usein myrkkyä syöneiden hiirten kautta. Se aiheuttaa horjumista, kosketusherkkyyttä, nykimistä, kouristuksia ja vaarallista ruumiinlämmön laskua. Sen myynti kuluttajille päättyi elokuussa 2023, mutta tuholaistorjunnan ammattilaiset saavat yhä käyttää sitä ja koteihin voi olla jäänyt vanhoja varastoja, joten ulkoilevat kissat voivat edelleen altistua. Auton jäähdytinnesteessä eli pakkasnesteessä oleva etyleeniglykoli maistuu makealta, ja jo teelusikallinen laimentamatonta nestettä voi tappaa keskikokoisen kissan; myös koirat ovat vaarassa. Ihmisten kipulääkkeet ovat toinen yleinen myrkytysten aiheuttaja: ibuprofeeni voi aiheuttaa mahahaavoja ja munuaisvaurion, ja jo osa yhdestä parasetamolitabletista voi tappaa kissan. Permetriini, jota on joissakin koirille tarkoitetuissa iholle tiputettavissa punkki- ja kirppulääkkeissä sekä joissakin ihmisten syyhyvoiteissa, on kissoille erittäin myrkyllistä. Älä koskaan käytä koiralle tarkoitettua valmistetta kissalle. Kissa voi myrkyttyä jo pelkästä läheisestä kosketuksesta vastikään lääkittyyn koiraan tai nuolemalla voidetta käyttävän ihmisen ihoa, pyyhkeitä tai vuodevaatteita. Liljat, myös päivänliljat, ovat erityisen vaarallisia kissoille: turkista nuoltu siitepöly, pieni puraisu lehdestä tai jopa maljakon vesi voi aiheuttaa kuolemaan johtavan munuaisten vajaatoiminnan. Kesällä järvien ja meren sinileväkukinnat voivat myrkyttää koiria, jotka uivat vedessä tai juovat sitä. Oireet voivat alkaa jo minuuttien kuluessa, mutta osa niistä ilmaantuu vasta tuntien kuluttua.",
    sv: "Rått- och musgift verkar på olika sätt. Antikoagulerande beten, som i Finland fortfarande säljs till konsumenter i färdigt fyllda betesstationer för inomhusbruk, orsakar inre blödningar. Alfakloralos har förgiftat många katter i Finland, ofta genom att katterna har ätit förgiftade möss. Det ger ostadighet, överkänslighet för beröring, ryckningar, kramper och farligt låg kroppstemperatur. Försäljningen till konsumenter upphörde i augusti 2023, men yrkesmässiga skadedjursbekämpare får ännu använda medlet och gamla lager kan finnas kvar i hemmen, så utekatter kan fortfarande utsättas för giftet. Frostskyddsvätska (etylenglykol, som finns i bilens kylarvätska) smakar sött. Redan en tesked outspädd frostskyddsvätska kan döda en medelstor katt, och också hundar är i farozonen. Smärtstillande läkemedel för människor är en annan vanlig orsak: ibuprofen kan ge magsår och njurskador, och redan en del av en enda paracetamoltablett kan döda en katt. Permetrin, som finns i vissa droppreparat (spot on) mot loppor och fästingar för hundar och i vissa skabbkrämer för människor, är mycket giftigt för katter. Använd aldrig ett hundpreparat på katt. En katt kan förgiftas bara genom nära kontakt med en nyss behandlad hund, eller genom att slicka på huden, handdukarna eller sängkläderna hos en person som använder krämen. Liljor, även dagliljor, är särskilt farliga för katter: pollen som katten slickar i sig när den tvättar pälsen, en liten tugga av ett blad eller till och med vattnet i vasen kan orsaka dödlig njursvikt. På sommaren kan algblomning (blågröna alger) i sjöar och i havet förgifta hundar som simmar i vattnet eller dricker av det. Symtomen kan börja inom några minuter, men en del visar sig först flera timmar senare.",
    en: "Rat and mouse poisons work in different ways. Anticoagulant baits, still sold to consumers in Finland in ready-filled bait boxes for indoor use, cause internal bleeding. Alpha-chloralose has poisoned many cats in Finland, often through eating poisoned mice. It causes unsteadiness, oversensitivity to touch, twitching, seizures and a dangerous drop in body temperature. Its sale to consumers ended in August 2023, but pest-control professionals may still use it and old stock may remain in homes, so outdoor cats can still be exposed. Antifreeze (ethylene glycol, found in engine coolant) tastes sweet. As little as a teaspoonful of undiluted antifreeze can kill an average-sized cat, and dogs are at risk too. Human painkillers are another common culprit: ibuprofen can cause stomach ulcers and kidney damage, and even part of a single paracetamol tablet can kill a cat. Permethrin, found in some dog flea and tick spot-ons and in some scabies creams for people, is highly toxic to cats. Never use a dog product on a cat. A cat can be poisoned just by close contact with a freshly treated dog, or by licking the skin, towels or bedding of a person using the cream. Lilies, including day lilies, are especially dangerous to cats: pollen groomed off the fur, a nibble of leaf or even the vase water can cause fatal kidney failure. In summer, blue-green algae blooms in lakes and the sea can poison dogs that swim in or drink the water. Signs can start within minutes, though some appear only hours later."
  },
  "article.poison.symptoms.title": {
    fi: "Oireet",
    sv: "Symtom",
    en: "Symptoms"
  },
  "article.poison.symptoms.text": {
    fi: "Oireet vaihtelevat myrkystä riippuen. Tavallisimpia ovat oksentelu, ripuli, kuolaaminen, vatsakipu, ruokahaluttomuus ja väsymys. Hermosto-oireita voivat olla nykiminen, vapina, kouristukset, tasapainon menetys, levottomuus tai lyyhistyminen. Vakavissa tapauksissa voi esiintyä tiheää hengitystä, kiihtynyttä sykettä, vaaleita, kellertäviä tai ruskehtavia ikeniä, verta oksennuksessa tai ulosteessa, poikkeavan matalaa tai korkeaa ruumiinlämpöä tai tajunnan menetystä. Kaikkien myrkkyjen oireet eivät näy heti: veren hyytymistä estävien jyrsijämyrkkyjen aiheuttama verenvuoto alkaa yleensä vasta 3–7 päivän kuluttua, sipulin tai valkosipulin aiheuttama anemia muutaman päivän kuluttua ja liljojen tai viinirypäleiden aiheuttama munuaisvaurio 1–3 vuorokauden kuluessa. Jäähdytinneste voi tuntien kuluessa aiheuttaa ensin humalan kaltaista horjumista. Sen jälkeen eläin voi näyttää toipuvan, ennen kuin vakava munuaisvaurio kehittyy. Juuri siksi on toimittava heti jo epäilyn perusteella eikä odotettava oireita.",
    sv: "Symtomen varierar från gift till gift. Vanligast är kräkningar, diarré, dregling, magsmärtor, aptitlöshet och slöhet. Neurologiska symtom kan vara ryckningar, darrningar, kramper, balanssvårigheter, rastlöshet eller kollaps. I svåra fall kan du se snabb andning, kraftigt förhöjd puls, blekt, gulaktigt eller brunaktigt tandkött, blod i uppkastningar eller avföring, onormalt låg eller hög kroppstemperatur eller medvetslöshet. Alla gifter ger sig inte till känna med en gång: blödningar av antikoagulerande råttgift börjar oftast först tre till sju dygn senare, blodbrist (anemi) av lök eller vitlök visar sig efter några dagar och njurskador av liljor eller vindruvor inom ett till tre dygn. Frostskyddsvätska kan inom några timmar först göra djuret berusat och ostadigt. Därefter kan djuret tyckas piggna till innan allvarliga njurskador utvecklas. Just därför ska du agera genast vid minsta misstanke i stället för att vänta på symtom.",
    en: "The signs vary from one poison to the next. The most common are vomiting, diarrhoea, drooling, tummy pain, loss of appetite and lethargy. Neurological signs may include twitching, tremors, seizures, loss of balance, restlessness or collapse. In severe cases you may see rapid breathing, a racing heart, pale, yellowish or brownish gums, blood in the vomit or stools, an abnormally low or high body temperature, or loss of consciousness. Not every poison shows itself straight away. Bleeding from anticoagulant rodenticides usually starts three to seven days later, anaemia from onion or garlic appears after a few days, and kidney damage from lilies or grapes within one to three days. Antifreeze can first cause a drunken, unsteady state within hours; your pet may then seem to improve before serious kidney damage sets in. That is exactly why you should act at once on any suspicion, rather than wait for symptoms."
  },
  "article.poison.firstaid.title": {
    fi: "Ensiapu",
    sv: "Första hjälpen",
    en: "First aid"
  },
  "article.poison.firstaid.text": {
    fi: "Soita heti eläinlääkärille ja kerro, mitä lemmikki on nielaissut, kuinka paljon ja milloin sekä paljonko se suunnilleen painaa. Ota pakkaus tai valokuva siitä mukaan klinikalle. Älä yritä oksennuttaa lemmikkiä itse. Suola voi aiheuttaa vaarallisen suolamyrkytyksen, ja vetyperoksidi voi vaurioittaa mahalaukun limakalvoa ja on erityisen vaarallinen kissoille. Oksentaminen on haitallista myös, jos lemmikki on nielaissut syövyttävää tai öljymäistä ainetta tai jos se on unelias tai kouristelee. Älä myöskään anna maitoa tai öljyä – ne eivät neutraloi mitään ja voivat pahentaa tilannetta. Jos myrkkyä on iholla tai turkissa – tai jos lemmikki on uinut vedessä, jossa on sinileväkukinta – pue käsineet ja huuhtele iho ja turkki runsaalla puhtaalla, haalealla vesijohtovedellä (jos aine on öljymäistä, lisää tilkka mietoa astianpesuainetta). Kuivaa lemmikki hyvin ja estä sitä nuolemasta kohtaa. Älä kuitenkaan pese lemmikkiä, joka nykii tai kouristelee. Pidä lemmikki rauhallisena ja levossa matkalla klinikalle: kääri viileältä tuntuva kissa huopaan, pidä nykivä tai kosketusherkkä lemmikki hiljaisessa ja hämärässä paikassa, äläkä vie käsiäsi kouristelevan lemmikin suun lähelle. Vain eläinlääkäri voi arvioida, onko oksennuttamisesta vielä hyötyä: yleensä se auttaa vain ensimmäisen tunnin tai kahden kuluessa nielemisestä, vaikka joidenkin myrkkyjen kohdalla aikaikkuna on pidempi. Huomaa, että Myrkytystietokeskus ei neuvo lemmikinomistajia eläinten myrkytyksissä, joten soita lemmikkisi asioissa aina eläinlääkärille.",
    sv: "Ring veterinären genast och berätta vad djuret har fått i sig, hur mycket, när och ungefär vad djuret väger. Ta med förpackningen, eller ett foto av den, till kliniken. Försök inte själv att få djuret att kräkas. Salt kan orsaka en farlig saltförgiftning, och väteperoxid kan skada magslemhinnan och är särskilt farlig för katter. Kräkning är dessutom skadlig efter frätande eller oljiga produkter, eller om djuret är dåsigt eller har kramper. Ge inte heller mjölk eller olja – de neutraliserar ingenting och kan förvärra läget. Har djuret fått gift på huden eller i pälsen – eller har det badat i vatten med algblomning – ska du ta på dig handskar och skölja huden och pälsen med rikligt med rent, ljummet kranvatten (tillsätt lite milt diskmedel vid oljiga produkter). Torka djuret ordentligt och hindra det från att slicka på stället. Skölj eller bada inte ett djur som har ryckningar eller kramper. Se till att djuret får vara lugnt och stilla under resan till kliniken. Svep en filt om en katt som känns kall, håll ett djur som har ryckningar eller är överkänsligt på ett lugnt och halvmörkt ställe, och håll händerna borta från munnen på ett djur som har kramper. Bara veterinären kan bedöma om det ännu lönar sig att framkalla kräkning. Det hjälper oftast bara inom en till två timmar efter att djuret har fått i sig giftet, även om tidsfönstret är längre för vissa gifter. Observera att Giftinformationscentralen (Myrkytystietokeskus) inte ger djurägare råd om förgiftningar hos djur. Ring alltid en veterinär när det gäller ditt djur.",
    en: "Ring your vet straight away and tell them what your pet has swallowed, how much, when, and roughly what your pet weighs. Bring the packaging, or a photo of it, to the clinic. Do not try to make your pet sick yourself. Salt can cause dangerous salt poisoning, and hydrogen peroxide can injure the stomach lining and is particularly dangerous for cats. Vomiting is also harmful after corrosive or oily products, or if your pet is drowsy or fitting. Do not give milk or oil either: they neutralise nothing and can make matters worse. If there is poison on the skin or coat — or after a swim in water with an algae bloom — wear gloves and rinse the skin and coat with plenty of clean, lukewarm tap water (add a little mild washing-up liquid for oily products). Dry your pet well and stop it licking the area. Do not bathe a pet that is twitching or fitting. Keep your pet calm and quiet on the journey in. Wrap a cat that feels cold in a blanket, keep a twitching or oversensitive pet somewhere quiet and dim, and keep your hands away from the mouth of a pet that is fitting. Only your vet can judge whether making your pet sick is still worthwhile. It usually helps only within the first hour or two after swallowing, although for some poisons the window is longer. Please note that the Poison Information Centre (Myrkytystietokeskus) does not advise pet owners on animal poisonings. For your pet, always call a vet."
  },
  "article.poison.treatment.title": {
    fi: "Eläinlääkärin hoito",
    sv: "Veterinärbehandling",
    en: "Veterinary treatment"
  },
  "article.poison.treatment.text": {
    fi: "Hoito riippuu myrkystä ja siitä, kuinka kauan nielemisestä on kulunut. Varhaisessa vaiheessa eläinlääkäri voi antaa lääkettä, joka saa aikaan hallitun oksennuksen, sekä lääkehiiltä eli aktiivihiiltä, joka sitoo joitakin myrkkyjä suolistossa. Tukihoitoon kuuluvat suonensisäinen nestehoito, pahoinvointi- ja kouristuslääkitys, ruumiinlämmön hallinta ja elintoimintojen tarkka seuranta. Muutamaan myrkkyyn on oma vastalääkkeensä. Veren hyytymistä estävien jyrsijämyrkkyjen vastalääke on K1-vitamiini, jota annetaan yleensä vähintään neljän viikon ajan, kunnes veren hyytymiskokeen tulos on normaali. Jäähdytinnesteen vastalääke on fomepitsoli tai etanoli, jotka tehoavat vain, jos hoito aloitetaan tuntien kuluessa nielemisestä – kissalla mieluiten kolmen tunnin kuluessa – ennen kuin munuaiset vaurioituvat. Monelle myrkylle, kuten alfakloraloosille, permetriinille, liljoille ja sinilevälle, ei ole vastalääkettä, ja siksi varhainen hoito on niin tärkeää. Vakavasti myrkyttynyt eläin tarvitsee sairaalahoitoa, ja sen munuaisten ja maksan toimintaa sekä veren hyytymistä seurataan verikokein. Mitä aikaisemmin hoito alkaa, sitä parempi on ennuste.",
    sv: "Behandlingen beror på giftet och på hur lång tid det har gått sedan djuret fick i sig det. I ett tidigt skede kan veterinären framkalla en kontrollerad kräkning med läkemedel och ge aktivt kol, som binder vissa gifter i tarmen. Den understödjande vården omfattar dropp, läkemedel mot illamående och kramper, reglering av kroppstemperaturen och noggrann övervakning av vitalfunktionerna. Mot några få gifter finns ett specifikt motgift. Vid antikoagulerande råttgift är det K1-vitamin, som oftast ges i fyra veckor eller längre, tills ett blodprov visar att blodet koagulerar normalt. Vid frostskyddsvätska är det fomepizol eller etanol, som bara hjälper om behandlingen inleds inom några timmar efter att djuret fått i sig vätskan – hos katter helst inom tre timmar – innan njurarna har skadats. Många gifter, däribland alfakloralos, permetrin, liljor och blågröna alger, saknar motgift, och därför är tidig behandling så viktig. I svåra fall behöver djuret läggas in för vård, och blodprov tas för att följa njur- och leverfunktionen och blodets koagulation. Ju tidigare behandlingen inleds, desto bättre är prognosen.",
    en: "Treatment depends on the poison and how long ago it was swallowed. Early on, your vet may bring on controlled vomiting with medicine and give activated charcoal, which binds some poisons in the gut. Supportive care includes intravenous fluids, anti-sickness and anti-seizure medication, temperature control and close monitoring of vital signs. A few poisons have a specific antidote. For anticoagulant rodenticides it is vitamin K1, usually given for four weeks or more until a blood clotting test is normal. For antifreeze it is fomepizole or ethanol, which only work if started within hours of swallowing — in cats ideally within three hours — before the kidneys are damaged. Many poisons, including alpha-chloralose, permethrin, lilies and blue-green algae, have no antidote, which is why early treatment matters so much. Severe cases need admission to hospital, with blood tests to keep an eye on kidney and liver function and blood clotting. The sooner treatment starts, the better the outlook."
  },
  "article.poison.prevention.title": {
    fi: "Ehkäisy",
    sv: "Förebyggande",
    en: "Prevention"
  },
  "article.poison.prevention.text": {
    fi: "Säilytä lääkkeet, makeiset, ksylitolituotteet, siivousaineet ja jäähdytinneste hyvin lemmikin ulottumattomissa. Älä koskaan anna lemmikille ihmisten ruokaa tai lääkkeitä kysymättä ensin eläinlääkäriltä, äläkä koskaan käytä koiran kirppulääkettä kissalle. Kun koira on lääkitty permetriinivalmisteella, pidä kissat erossa siitä vähintään kolme päivää. Pidä kissat myös erossa ihmisestä, joka käyttää permetriiniä sisältävää syyhyvoidetta, sekä hänen pyyhkeistään ja vuodevaatteistaan. Pidä koira kytkettynä kaikkialla, missä voi olla jyrsijämyrkkyä tai roskia, äläkä käytä myrkkysyöttejä paikoissa, joissa omat tai naapureiden kissat liikkuvat. Älä pidä liljoja kodissa, jossa on kissa, ja tarkista, ovatko huonekasvisi myrkyllisiä. Älä kesällä päästä koiraa veteen, jossa näkyy sinileväkukintaa. Tallenna Eläinklinikka Saaren numero (06) 321 7300 ja alueen eläinlääkäripäivystyksen numero 0600 399 299 puhelimeesi jo nyt, niin apu on lähellä, jos pahin sattuu.",
    sv: "Förvara läkemedel, godis, xylitolprodukter, rengöringsmedel och frostskyddsvätska utom räckhåll för djuret. Ge aldrig djuret människomat eller mediciner utan att först fråga veterinären, och använd aldrig hundens loppmedel på katt. Håll katter åtskilda från hunden i minst tre dygn efter att den har behandlats med ett permetrinpreparat. Katter ska också hållas borta från den som använder en skabbkräm med permetrin och från personens handdukar och sängkläder. Ha hunden kopplad överallt där det kan ligga råttgift eller skräp, och undvik att använda giftbeten där dina egna eller grannarnas katter rör sig. Ha inga liljor hemma om du har katt, och ta reda på om dina krukväxter är giftiga. På sommaren ska du hålla hunden borta från vatten med synlig algblomning. Spara redan nu Djurklinik Saaris nummer (06) 321 7300 och den regionala veterinärjourens nummer 0600 399 299 i telefonen, så har du hjälpen nära till hands om olyckan skulle vara framme.",
    en: "Keep medicines, sweets, xylitol products, cleaning agents and antifreeze well out of your pet’s reach. Never give human food or medicine without checking with your vet first, and never use a dog’s flea treatment on a cat. Keep cats apart from a dog for at least three days after it has been treated with a permethrin product. Keep cats away from anyone using a permethrin scabies cream, and from that person’s towels and bedding. Keep your dog on the lead anywhere rodenticide or rubbish might be lying about, and avoid poison baits where your own or your neighbours’ cats roam. Do not keep lilies in a home with a cat, and check whether your houseplants are toxic. In summer, keep your dog out of water with a visible algae bloom. Save Saari Animal Clinic’s number, (06) 321 7300, and the regional out-of-hours emergency number, 0600 399 299, in your phone now, so that help is close at hand should the worst happen."
  },

  // Article 14: Pyometra
  'article.pyometra.tag': { fi: 'Päivystys', sv: 'Akutvård', en: 'Emergency' },
  "article.pyometra.title": {
    fi: "Koiran kohtutulehdus (pyometra) – oireet, kuinka nopeasti se etenee, hoito ja toipuminen",
    sv: "Livmoderinflammation (pyometra) hos hund – symtom, förlopp, behandling och återhämtning",
    en: "Pyometra in dogs — symptoms, how fast it progresses, treatment and recovery"
  },
  "article.pyometra.intro": {
    fi: "Kohtutulehdus eli märkäkohtu (pyometra) on hengenvaarallinen infektio, jossa steriloimattoman naaraan kohtu täyttyy märällä. Se on steriloimattomien narttujen yleisimpiä vakavia sairauksia: niistä noin joka viides (19–24 % ruotsalaisessa vakuutusaineistossa) sairastuu siihen 10 ikävuoteen mennessä. Tautia esiintyy myös kissoilla. Kohtutulehdus vaatii yleensä päivystysleikkauksen, ja oireiden varhainen tunnistaminen voi pelastaa lemmikkisi hengen. Tässä artikkelissa kerromme, miltä oireet näyttävät, kuinka nopeasti kohtutulehdus kehittyy, miksi pelkät antibiootit eivät riitä, miten sitä hoidetaan Eläinklinikka Saaressa, mitä toipuminen vaatii ja miten taudin voi ehkäistä.",
    sv: "Livmoderinflammation (pyometra) är en livshotande infektion där livmodern hos en osteriliserad hona fylls med var. Den hör till de vanligaste allvarliga sjukdomarna hos intakta tikar: ungefär var femte osteriliserad tik (19–24 % i svenska försäkringsdata) insjuknar i pyometra innan hon fyllt tio år. Sjukdomen förekommer också hos katt. Tillståndet kräver i regel akut operation, och om du känner igen tecknen tidigt kan du rädda ditt djurs liv. I den här artikeln går vi igenom hur symtomen ser ut, hur snabbt pyometra utvecklas, varför enbart antibiotika inte räcker, hur sjukdomen behandlas på Djurklinik Saari, vad återhämtningen innebär och hur pyometra kan förebyggas.",
    en: "Pyometra is a life-threatening infection in which the uterus of an unspayed female fills with pus. It is one of the most common serious diseases of intact bitches: roughly one in five unspayed female dogs (19–24% in Swedish insurance data) develops it by the age of 10. It also occurs in cats. The condition usually needs emergency surgery, and recognising the signs early can save your pet’s life. This article explains what the symptoms look like, how quickly pyometra develops, why antibiotics alone are not enough, how it is treated at Saari Animal Clinic, what recovery involves and how to prevent it."
  },
  "article.pyometra.symptoms.title": {
    fi: "Mitkä ovat koiran kohtutulehduksen oireet?",
    sv: "Vilka är symtomen på livmoderinflammation hos hund?",
    en: "What are the symptoms of pyometra in dogs?"
  },
  "article.pyometra.symptoms.text": {
    fi: "Selvin merkki on märkäinen vuoto häpystä – kellertävää, ruskehtavaa tai vanhan veren väristä, usein pahanhajuista – sekä se, että koira nuolee takapäätään tavallista enemmän. Silloin kyseessä on ”avoin” kohtutulehdus. ”Suljetussa” kohtutulehduksessa kohdunkaula on kiinni eikä mitään valu ulos, joten tunnusomaista vuotoa ei näy – silti koira on usein vakavammin sairas. Kummankin muodon oireita ovat muun muassa selvästi lisääntynyt juominen ja virtsaaminen, syömättömyys, väsymys ja apaattisuus, oksentelu, turvonnut tai kipeä vatsa sekä kuume tai vakavissa tapauksissa normaalia matalampi ruumiinlämpö. Jos steriloimaton narttu on vetämätön, sille ei maistu ruoka tai se juo paljon viikkoja tai kuukausia juoksuajan jälkeen, vie se eläinlääkäriin samana päivänä.",
    sv: "Det tydligaste tecknet är en varig flytning från vulvan – gulaktig, brunaktig eller i samma färg som gammalt blod, ofta illaluktande – och att tiken slickar sig baktill mer än vanligt. Då talar man om en ”öppen” pyometra. Vid en ”sluten” pyometra är livmoderhalsen stängd och ingenting rinner ut, så den avslöjande flytningen saknas – ändå är tiken ofta allvarligare sjuk. Vid båda formerna ser man bland annat att tiken dricker och kissar betydligt mer än vanligt, vägrar äta, är trött och apatisk, kräks och har en svullen eller öm buk. Hon kan också ha feber eller, i svåra fall, lägre kroppstemperatur än normalt. Om en osteriliserad tik är slö, inte vill äta eller dricker mycket under veckorna eller månaderna efter löpet, ska du ta henne till veterinären samma dag.",
    en: "The clearest sign is a pus-like discharge from the vulva — yellowish, brownish or the colour of old blood, often foul-smelling — and the dog licking her rear end more than usual. This is called an “open” pyometra. In a “closed” pyometra the cervix is shut and nothing drains out, so there is no telltale discharge — yet the dog is often more seriously ill. Signs seen in both forms include drinking and urinating much more, refusing food, tiredness and apathy, vomiting, a swollen or painful belly, and fever or, in severe cases, a below-normal temperature. If an unspayed bitch is listless, off her food or drinking a lot in the weeks or months after her heat, see a vet the same day."
  },
  "article.pyometra.onset.title": {
    fi: "Miten kohtutulehdus alkaa ja kuinka nopeasti se etenee?",
    sv: "Hur börjar livmoderinflammation och hur snabbt utvecklas den?",
    en: "How does pyometra start and how fast does it progress?"
  },
  "article.pyometra.onset.text": {
    fi: "Bakteerit – tavallisimmin koiran omasta suolistosta peräisin oleva E. coli – voivat päästä kohtuun juoksuaikana avoimen kohdunkaulan kautta. Seuraavien viikkojen aikana keltarauhashormoni (progesteroni) paksuntaa kohdun limakalvoa ja heikentää sen puolustuskykyä, ja infektio pääsee pesiytymään. Siksi kohtutulehdus todetaan yleensä neljän kuukauden sisällä juoksuajasta. Avoin kohtutulehdus voi kyteä päivistä viikkoihin niin, että vuoto on pääoire. Suljettu kohtutulehdus voi tehdä koirasta vakavasti sairaan muutamassa päivässä, koska toksiinit ja bakteerit pääsevät kohdusta verenkiertoon. Kummassakaan muodossa ei ole turvallista jäädä odottelemaan, vaikka koira vaikuttaisi vain lievästi sairaalta. Noin 60 %:lla kohtutulehdusta sairastavista koirista on eläinlääkäriin tullessaan jo sepsis eli verenmyrkytys, hengenvaarallinen koko elimistön reaktio infektioon. Eräässä ruotsalaisessa tutkimuksessa sepsis oli kolmella neljästä koirasta, joiden kohdunkaula oli kiinni, ja joka toisella koiralla, jonka kohdunkaula oli auki. Tästä syystä jokainen kohtutulehdusepäily on hätätapaus: mitä aikaisemmin leikkaus tehdään, sitä parempi on lopputulos.",
    sv: "Bakterier – oftast E. coli från hundens egen tarm – kan ta sig in i livmodern genom livmoderhalsen, som är öppen under löpet. Under de följande veckorna förtjockar progesteronet livmoderslemhinnan och försvagar dess försvar, och infektionen får fäste. Därför ställs diagnosen pyometra oftast inom fyra månader efter ett löp. En öppen pyometra kan pyra i dagar eller veckor med flytningen som främsta tecken. En sluten pyometra kan göra hunden allvarligt sjuk inom några dagar, eftersom toxiner och bakterier går från livmodern ut i blodet. Vid båda formerna är det farligt att vänta och se, även om hunden bara verkar lindrigt sjuk. När hundar med pyometra kommer till veterinären har omkring 60 % av dem redan sepsis (blodförgiftning), en livshotande reaktion på infektionen som drabbar hela kroppen. I en svensk studie hade tre av fyra hundar med sluten livmoderhals sepsis, och varannan hund med öppen. Varje misstanke om pyometra är därför ett akutfall: ju tidigare operationen görs, desto bättre blir utgången.",
    en: "Bacteria — usually E. coli from the dog’s own gut — can enter the uterus through the cervix, which is open during a heat. In the weeks that follow, progesterone thickens the uterine lining and weakens its defences, and the infection takes hold. This is why pyometra is usually diagnosed within four months of a heat. An open pyometra may smoulder for days to weeks with discharge as the main sign. A closed pyometra can make a dog seriously ill within days, because toxins and bacteria pass from the uterus into the bloodstream. Neither form is safe to wait out, even if the dog seems only mildly unwell. By the time they reach the vet, around 60% of dogs with pyometra already have sepsis, a life-threatening whole-body reaction to the infection. In one Swedish study, sepsis was present in three in four dogs with a closed cervix and one in two with an open one. Any suspicion of pyometra is therefore an emergency: the sooner surgery is done, the better the outcome."
  },
  "article.pyometra.causes.title": {
    fi: "Mistä kohtutulehdus johtuu ja mitkä koirat sairastuvat siihen?",
    sv: "Vad orsakar livmoderinflammation och vilka hundar drabbas?",
    en: "What causes pyometra and which dogs get it?"
  },
  "article.pyometra.causes.text": {
    fi: "Perimmäinen syy on hormonaalinen: jokaisen juoksuajan jälkeen keltarauhashormoni valmistaa kohtua tiineyteen, ja vuosien mittaan toistuvat kierrot voivat aiheuttaa kohdun limakalvon kystistä liikakasvua, joka altistaa infektiolle. Kohtutulehdus on siksi steriloimattomien naaraiden sairaus, ja se on yleisin keski-ikäisillä ja sitä vanhemmilla. Tyypillinen ikä diagnoosihetkellä on noin 7 vuotta ruotsalaisessa ja 9 vuotta suomalaisessa aineistossa, mutta tauti voi puhjeta jo ensimmäisen juoksuajan jälkeen. Pentujen saaminen pienentää riskiä jonkin verran, mutta ei sulje kohtutulehdusta pois. Estrogeenipistokset, joita annetaan tiineyden estämiseksi vahinkoastutuksen jälkeen, ovat hyvin dokumentoitu riskitekijä. Rodulla on suuri merkitys: ruotsalaisessa vakuutusaineistossa berninpaimenkoirien, tanskandoggien, leonberginkoirien, rottweilereiden ja irlanninsusikoirien steriloimattomista nartuista yli puolet sairastui kohtutulehdukseen 10 ikävuoteen mennessä. Suomenpystykorvanartuilla vastaava osuus oli sen sijaan vain noin 3 %. Mäyräkoirilla ja suomalaisessa aineistossa myös sekarotuisilla koirilla riski on ollut keskimääräistä pienempi.",
    sv: "Grundorsaken är hormonell: efter varje löp förbereder progesteronet livmodern för dräktighet, och med åren kan de upprepade cyklerna ge en cystisk förtjockning av livmoderslemhinnan, vilket ökar risken för infektion. Pyometra är därför en sjukdom hos intakta (osteriliserade) honor, oftast medelålders och äldre. Den typiska åldern vid diagnos är omkring 7 år i svenska data och 9 år i finländska data, men pyometra kan uppstå redan efter första löpet. Att tiken har fått valpar sänker risken något men utesluter inte pyometra. Östrogensprutor som ges för att förhindra dräktighet efter en oönskad parning är en väldokumenterad riskfaktor. Rasen spelar stor roll: i svenska försäkringsdata insjuknade mer än hälften av de intakta tikarna av raserna berner sennenhund, grand danois, leonberger, rottweiler och irländsk varghund i pyometra innan de fyllt tio år. Hos tikar av rasen finsk spets var andelen däremot bara omkring 3 %. Taxar och, i finländska data, blandrashundar har haft lägre risk än genomsnittet.",
    en: "The underlying cause is hormonal: after every heat, progesterone prepares the uterus for pregnancy, and over the years these repeated cycles can cause cystic thickening of the lining, which makes infection more likely. Pyometra is therefore a disease of intact (unspayed) females, most often middle-aged and older. The typical age at diagnosis is about 7 years in Swedish data and 9 in Finnish data, but pyometra can occur after the first heat. Having had puppies lowers the risk somewhat but does not rule it out. Oestrogen injections given to prevent pregnancy after an unwanted mating are a well-documented risk factor. Breed matters a great deal: in Swedish insurance data, more than half of intact Bernese Mountain Dog, Great Dane, Leonberger, Rottweiler and Irish Wolfhound bitches developed pyometra by the age of 10. In Finnish Spitz bitches, by contrast, the figure was only about 3%. Dachshunds and, in Finnish data, mixed-breed dogs have shown a lower-than-average risk."
  },
  "article.pyometra.selfheal.title": {
    fi: "Voiko kohtutulehdus parantua itsestään tai antibiooteilla?",
    sv: "Kan livmoderinflammation läka av sig själv eller med antibiotika?",
    en: "Can pyometra heal on its own or with antibiotics?"
  },
  "article.pyometra.selfheal.text": {
    fi: "Ei. Hoitamaton kohtutulehdus on hengenvaarallinen: kohtu voi revetä, ja infektio voi johtaa sepsikseen, munuaisvaurioon ja vatsakalvontulehdukseen. Pelkät antibiootit voivat hidastaa taudin etenemistä, mutta ne eivät paranna kohtua. Lääkehoito hormonivalmisteilla ja antibiooteilla on vaihtoehto vain valikoiduille potilaille: nuorille, muuten terveille jalostusnartuille, joilla on avoin kohtutulehdus eikä merkkejä sepsiksestä. Silloinkin kohtutulehdus uusiutuu jonkin myöhemmän juoksuajan yhteydessä keskimäärin noin kolmella koiralla kymmenestä (29 %; eri tutkimuksissa raportoitu vaihteluväli 0–85 %). Siksi narttu tulisi astuttaa heti seuraavan juoksuajan aikana. Vain leikkaus estää taudin uusiutumisen luotettavasti. Kaikille muille potilaille leikkaus on ensisijainen hoito. Eläinklinikka Saaressa emme tarjoa hormonihoitoa, vaan suosittelemme leikkausta lähes jokaisessa tapauksessa.",
    sv: "Nej. Obehandlad pyometra är livshotande: livmodern kan brista, och infektionen kan leda till sepsis, njurskador och bukhinneinflammation. Enbart antibiotika kan bromsa sjukdomen men får inte livmodern att läka. Medicinsk behandling med hormonpreparat och antibiotika är ett alternativ endast för utvalda patienter: unga, i övrigt friska avelstikar med öppen pyometra och utan tecken på sepsis. Även då får i genomsnitt ungefär tre av tio tikar pyometra igen vid ett senare löp (29 %; andelen har varierat 0–85 % mellan olika studier). Tiken bör därför paras redan vid nästa löp. Det enda som tillförlitligt förhindrar återfall är en operation. För alla andra patienter är operation förstahandsbehandlingen. Hos oss på Saari erbjuder vi inte hormonbehandling, utan vi rekommenderar operation i nästan alla fall.",
    en: "No. Untreated pyometra is life-threatening: the uterus can rupture, and the infection can lead to sepsis, kidney damage and peritonitis. Antibiotics alone may slow the disease down, but they do not heal the uterus. Medical treatment with hormonal drugs plus antibiotics is an option only for selected patients: young, otherwise healthy breeding bitches with an open pyometra and no signs of sepsis. Even then, pyometra comes back at a later heat in about three in ten dogs on average (29%; the reported range across studies is 0–85%). The bitch should therefore be bred at her very next heat. Only surgery reliably prevents a recurrence. For all other patients, surgery is the treatment of choice. We do not offer hormonal treatment at Saari; we recommend surgery in nearly every case."
  },
  "article.pyometra.diagnosis.title": {
    fi: "Miten kohtutulehdus todetaan?",
    sv: "Hur ställs diagnosen livmoderinflammation?",
    en: "How is pyometra diagnosed?"
  },
  "article.pyometra.diagnosis.text": {
    fi: "Tutkimme koiran, otamme verikokeet (valkosolut sekä munuais- ja maksa-arvot) ja teemme vatsan ultraäänitutkimuksen. Noin kuudella kymmenestä kohtutulehdusta sairastavasta koirasta valkosolujen määrä on koholla, useammin suljetussa kohtutulehduksessa; matala valkosolumäärä on varoitusmerkki vatsakalvontulehduksesta. Ultraäänellä näemme muutamassa minuutissa, onko kohtu laajentunut ja täynnä nestettä, ja yhdessä muiden löydösten kanssa tämä riittää yleensä diagnoosiin. Koska suljettu kohtutulehdus voi muistuttaa monia muita sairauksia, teemme ultraäänitutkimuksen jokaiselle steriloimattomalle nartulle, joka voi huonosti viikkoja tai kuukausia juoksuajan jälkeen, vaikka vuotoa ei olisi.",
    sv: "Vi undersöker hunden, tar blodprov (antalet vita blodkroppar samt njur- och levervärden) och gör ett ultraljud av buken. Ungefär sex av tio hundar med pyometra har ett förhöjt antal vita blodkroppar, oftare vid sluten pyometra; ett lågt antal är en varningssignal för bukhinneinflammation. Ultraljudet visar inom några minuter om livmodern är förstorad och vätskefylld, och tillsammans med de övriga fynden räcker det i regel för att ställa diagnosen. Eftersom en sluten pyometra kan likna många andra sjukdomar, undersöker vi med ultraljud varje osteriliserad tik som mår dåligt under veckorna eller månaderna efter ett löp, även om hon inte har någon flytning.",
    en: "We examine the dog, run blood tests (white blood cell count, kidney and liver values) and do an ultrasound scan of her abdomen. About six in ten dogs with pyometra have a raised white cell count, more often with a closed pyometra; a low count is a warning sign of peritonitis. The ultrasound scan shows within minutes whether the uterus is enlarged and filled with fluid; together with the other findings, this is usually enough to make the diagnosis. Because a closed pyometra can look like many other illnesses, we scan any unspayed bitch who is unwell in the weeks or months after a heat, even if there is no discharge."
  },
  "article.pyometra.treatment.title": {
    fi: "Miten kohtutulehdusta hoidetaan?",
    sv: "Hur behandlas livmoderinflammation hos hund?",
    en: "How is pyometra treated?"
  },
  "article.pyometra.treatment.text": {
    fi: "Hoitona on päivystysleikkaus: munasarjojen ja tulehtuneen kohdun poisto (ovariohysterektomia). Toimenpide muistuttaa sterilointia, mutta potilas on sairas ja sen kohtu laajentunut ja hauras, joten leikkaus tehdään erityisen huolellisesti. Ennen leikkausta koiran tila vakautetaan suonensisäisellä nesteytyksellä ja, jos se on vakavammin sairas, myös antibiooteilla. Inhalaatioanestesian aikana sen elintoimintoja seurataan jatkuvasti. Leikkaushoidon ennuste on hyvä: yli 90 % koirista toipuu. Kun kohtu ja molemmat munasarjat on poistettu, tauti ei käytännössä koskaan palaa. Harvinainen poikkeus on ”tynkäpyometra”, joka kehittyy kohdunkaulan kohdalle jäävään pieneen kohdun tynkään, useimmiten siksi, että leikkauksessa on jäänyt jäljelle hieman munasarjakudosta. Leikkauksen viivyttäminen antaa sepsikselle, vatsakalvontulehdukselle ja kohdun repeämälle aikaa kehittyä – ja juuri nämä komplikaatiot tekevät kohtutulehduksesta niin vaarallisen.",
    sv: "Behandlingen är en akut operation där den infekterade livmodern och äggstockarna tas bort (ovariohysterektomi). Ingreppet liknar en sterilisering, men det görs på en sjuk patient med en förstorad och skör livmoder och därför med extra försiktighet. Före operationen stabiliseras hunden med intravenöst dropp och, om hon är allvarligare sjuk, med antibiotika. Under inhalationsnarkosen övervakas hennes vitala funktioner kontinuerligt. Prognosen med operation är god: över 90 % av hundarna tillfrisknar. När livmodern och båda äggstockarna har tagits bort kommer sjukdomen praktiskt taget aldrig tillbaka. Det sällsynta undantaget, så kallad stumppyometra, uppstår i den lilla livmoderstumpen vid livmoderhalsen, oftast för att en bit äggstocksvävnad har blivit kvar vid operationen. Om operationen skjuts upp får sepsis, bukhinneinflammation och livmoderbristning tid att utvecklas – just de komplikationer som gör pyometra så farlig.",
    en: "The treatment is emergency surgery to remove the infected uterus and the ovaries (ovariohysterectomy). The operation is similar to a spay, but it is done on a sick patient with an enlarged, fragile uterus, so it is carried out with extra care. Before surgery, the dog is stabilised with intravenous fluids and, if she is more seriously ill, antibiotics. While she is under inhalation anaesthesia, her vital functions are monitored continuously. The prognosis with surgery is good: over 90% of dogs recover. Once the uterus and both ovaries have been removed, the disease practically never returns. The rare exception, “stump pyometra”, develops in the small stump of uterus left at the cervix, most often because some ovarian tissue was left behind at surgery. Delaying surgery gives sepsis, peritonitis and uterine rupture time to develop — the complications that make pyometra so dangerous."
  },
  "article.pyometra.cost.title": {
    fi: "Paljonko koiran kohtutulehdusleikkaus maksaa?",
    sv: "Vad kostar det att operera livmoderinflammation hos hund?",
    en: "How much does pyometra surgery cost?"
  },
  "article.pyometra.cost.text": {
    fi: "Kohtutulehdusleikkaus hinnoitellaan tapauskohtaisesti, koska leikkaus, nesteytys ja antibiootit, anestesian kesto ja mahdollinen sairaalahoito riippuvat koiran koosta ja siitä, kuinka sairas se on hoitoon tullessaan. Saat kustannusarvion ennen leikkausta. Vertailun vuoksi: terveen nartun suunniteltu sterilointi maksaa painosta riippuen 483–753 €. Päivystyksenä tehtävä kohtutulehdusleikkaus maksaa tätä enemmän, ja mitä aikaisemmin koira tuodaan hoitoon, sitä vähemmän tehohoitoa se tarvitsee. Lemmikkivakuutuksen suorakorvaus onnistuu LähiTapiolan, Agrian ja Pohjolan asiakkaille.",
    sv: "En pyometraoperation prissätts från fall till fall, eftersom själva ingreppet, dropp och antibiotika, narkostiden och en eventuell vårdtid på kliniken beror på hundens storlek och på hur sjuk hon är när hon kommer in. Du får en kostnadsuppskattning före operationen. Som jämförelse kostar en planerad sterilisering av en frisk tik 483–753 € beroende på vikt. En akut pyometraoperation kostar mer än så – och ju tidigare hunden kommer in, desto mindre intensivvård behöver hon. Direktersättning finns för kunder hos LokalTapiola, Agria och Pohjola.",
    en: "Pyometra surgery is priced case by case, because the operation, the fluids and antibiotics, the anaesthesia time and any hospitalisation depend on the size of the dog and on how ill she is when she arrives. You will receive a cost estimate before surgery. For comparison, a planned spay of a healthy bitch costs 483–753 € depending on her weight. An emergency pyometra operation costs more than that — and the earlier the dog is brought in, the less intensive care she needs. Direct insurance billing is available for LähiTapiola, Agria and Pohjola customers."
  },
  "article.pyometra.recovery.title": {
    fi: "Kuinka kauan toipuminen kohtutulehdusleikkauksesta kestää?",
    sv: "Hur lång är återhämtningen efter en operation för livmoderinflammation?",
    en: "How long is recovery after pyometra surgery?"
  },
  "article.pyometra.recovery.text": {
    fi: "Useimmat koirat ovat selvästi pirteämpiä jo päivän tai kahden kuluttua leikkauksesta, kun infektion lähde on poistettu. Kotiin koira saa kipulääkettä ja eläinlääkärin harkinnan mukaan lyhyen antibioottikuurin. Koira käyttää 10–14 päivän ajan leikkaushaalaria tai kauluria ja ulkoilee vain lyhyillä hihnalenkeillä, kunnes haava on parantunut ja mahdolliset ihon ompeleet on poistettu. Leikkauksen jälkeen tarkistamme haavan ja koiran yleisvoinnin, ja verikokeet uusimme tarpeen mukaan voinnin ja aiempien tulosten perusteella. Ota meihin heti yhteyttä, jos koira lakkaa syömästä, oksentaa tai muuttuu taas vetämättömäksi – tai jos haava turpoaa, punoittaa tai erittää. Täysi toipuminen kestää yleensä noin kaksi viikkoa.",
    sv: "De flesta hundar är märkbart piggare inom en eller två dagar efter operationen, när infektionskällan är borta. De åker hem med smärtlindring och, när veterinären bedömer att det behövs, en kort antibiotikakur. I 10–14 dagar, tills såret har läkt och eventuella hudstygn har tagits bort, bär hunden skyddsdräkt eller krage och går bara korta promenader i koppel. Vi kontrollerar såret och hennes allmäntillstånd efter operationen och tar om blodprov vid behov, beroende på hur hon mår och på de tidigare resultaten. Kontakta oss genast om hon slutar äta, kräks eller blir slö igen, eller om såret svullnar, blir rött eller vätskar. Full återhämtning tar normalt ungefär två veckor.",
    en: "Most dogs are noticeably brighter within a day or two of surgery, once the source of the infection is gone. They go home with pain relief and, when the vet judges it necessary, a short course of antibiotics. For 10–14 days, until the wound has healed and any skin stitches have been removed, the dog wears a recovery suit or cone and is kept to short walks on the lead. We re-check the wound and her general condition after surgery and repeat blood tests as needed, based on how she is doing and on her earlier results. Contact us straight away if she stops eating, vomits or becomes listless again, or if the wound swells, turns red or oozes. Full recovery normally takes about two weeks."
  },
  "article.pyometra.cat.title": {
    fi: "Saako kissa kohtutulehduksen?",
    sv: "Kan katter få livmoderinflammation?",
    en: "Do cats get pyometra?"
  },
  "article.pyometra.cat.text": {
    fi: "Kyllä, joskin harvemmin kuin koira. Kissalla oireet ovat samankaltaisia – vaisuus, huono ruokahalu, lisääntynyt juominen ja turvonnut vatsa. Jopa 40 %:lla kohtutulehdusta sairastavista naaraskissoista ei kuitenkaan havaita vuotoa: sitä ei ole tai kissa nuolee sen pois ennen kuin kukaan ehtii huomata. Kissat myös peittävät sairautensa hyvin, joten tauti voi jäädä pidempään huomaamatta. Kohtutulehdus voi kehittyä minkä ikäiselle kissalle tahansa, mutta riski kasvaa iän myötä, erityisesti noin seitsemän vuoden iän jälkeen. Hoitona on sama päivystysleikkaus, jonka jälkeen ennuste on hyvä. Sterilointi ehkäisee taudin, lukuun ottamatta edellä kuvattua harvinaista tynkäpyometraa.",
    sv: "Ja, men mer sällan än hundar. Hos katter är tecknen likartade – slöhet, dålig aptit, ökad törst och svullen buk. Hos upp till 40 % av honkatterna med pyometra saknas dock flytning, eller så slickar katten bort den innan någon hinner märka något. Katter är dessutom skickliga på att dölja sjukdom, så pyometran kan förbli oupptäckt längre. Sjukdomen kan drabba katter i alla åldrar, men risken ökar med åldern, särskilt när katten har fyllt ungefär sju år. Behandlingen är samma akuta operation, och prognosen med operation är god. Sterilisering förebygger sjukdomen, bortsett från den sällsynta stumppyometra som beskrivs ovan.",
    en: "Yes, though less often than dogs. The signs in cats are similar — lethargy, poor appetite, increased drinking, a swollen belly. In up to 40% of queens with pyometra, however, there is no discharge, or it is licked away before anyone notices. Cats also hide illness well, so the disease can go unnoticed for longer. Cats of any age can be affected, but the risk rises with age, especially after the age of about seven. The treatment is the same emergency surgery, and the prognosis with surgery is good. Spaying prevents the disease, apart from the rare stump pyometra described above."
  },
  "article.pyometra.prevention.title": {
    fi: "Miten kohtutulehduksen voi ehkäistä?",
    sv: "Hur kan livmoderinflammation förebyggas?",
    en: "How can pyometra be prevented?"
  },
  "article.pyometra.prevention.text": {
    fi: "Steriloinnin jälkeen riski on lähes olematon, koska munasarjat – taudin taustalla vaikuttavan keltarauhashormonin (progesteronin) lähde – on poistettu. Mahdolliseksi jää vain harvinainen tynkäpyometra. Emme kuitenkaan suosittele jokaisen terveen naaraan sterilointia rutiinina: toimenpiteellä on sekä hyötyjä että haittoja, ja niiden keskinäinen painoarvo vaihtelee eläimestä toiseen. Käymme ne läpi kanssasi ja teemme päätöksen yhdessä – lue lisää sterilointisivultamme. Jos pidät narttusi steriloimattomana, opettele tunnistamaan oireet ja seuraa sitä tarkasti neljän kuukauden ajan jokaisen juoksuajan jälkeen. Vältä vahinkoastutuksen jälkeen annettavia estrogeenipohjaisia pistoksia, sillä ne lisäävät riskiä selvästi, etenkin nuorilla nartuilla. Myös hormonaaliset juoksunestohoidot (progestiinit) on yhdistetty kohtutulehdukseen, vaikka laajassa suomalaisessa tutkimuksessa riskin ei havaittu kasvavan merkittävästi. Kysy meiltä vaihtoehdoista.",
    sv: "Sterilisering tar nästan helt bort risken, eftersom äggstockarna – källan till det progesteron som ligger bakom sjukdomen – avlägsnas; bara den sällsynta stumppyometran kan fortfarande uppstå. Vi rekommenderar ändå inte att varje frisk hona steriliseras rutinmässigt: ingreppet har både fördelar och nackdelar, och vilken sida som väger tyngst varierar från djur till djur. Vi går igenom dem tillsammans med dig och fattar beslutet gemensamt – läs mer på vår sida om sterilisering. Om du väljer att inte sterilisera din tik, lär dig känna igen tecknen och håll noga uppsikt över henne under de fyra månaderna efter varje löp. Undvik östrogenbaserade ”tjuvparningssprutor”, som klart ökar risken, särskilt hos unga tikar. Hormonella löphämmande behandlingar (gestagener) har också kopplats till pyometra, även om en stor finländsk studie inte fann någon signifikant ökning av risken. Fråga oss om alternativen.",
    en: "Spaying all but eliminates the risk, because the ovaries — the source of the progesterone behind the disease — are removed; only the rare stump pyometra remains possible. We do not, however, recommend spaying every healthy female as a matter of routine: the procedure has both benefits and drawbacks, and how they balance out differs from one animal to the next. We go through them with you and make the decision together — read more on our spaying page. If you keep your bitch intact, learn the signs and watch her closely in the four months after every heat. Avoid oestrogen-based “mismating” injections, which clearly increase the risk, especially in young bitches. Hormonal heat-suppression treatments (progestogens) are also linked to pyometra, although a large Finnish study found no significant increase in risk. Ask us about the alternatives."
  },
  "article.pyometra.contact.title": {
    fi: "Milloin pitää ottaa yhteyttä eläinlääkäriin?",
    sv: "När ska jag kontakta veterinären vid misstänkt livmoderinflammation?",
    en: "When should I contact the vet?"
  },
  "article.pyometra.contact.text": {
    fi: "Heti – samana päivänä – jos steriloimattomalla nartulla tai naaraskissalla on vuotoa tai se on vaisu, juo paljon tai kieltäytyy syömästä viikkoja tai kuukausia juoksuajan tai kiiman jälkeen. Arkisin klo 7.45–17.00 soita Eläinklinikka Saareen Vaasaan, p. (06) 321 7300; varaamme joka arkipäivälle akuuttiaikoja kiireellisiä tapauksia varten. Iltaisin, öisin ja viikonloppuisin soita alueen eläinlääkäripäivystykseen, p. 0600 399 299. Kohtutulehdus ei odota maanantaihin.",
    sv: "Genast – samma dag – om en osteriliserad tik eller honkatt har flytning, är slö, dricker mycket eller vägrar äta under veckorna eller månaderna efter ett löp. Vardagar kl. 7.45–17.00 ringer du Djurklinik Saari i Vasa på (06) 321 7300; vi håller akuttider lediga varje vardag. Kvällar, nätter och veckoslut ringer du regionens jourhavande veterinär på 0600 399 299. Pyometra väntar inte till måndag.",
    en: "Immediately — the same day — if an unspayed female shows discharge, is listless, drinks a lot or refuses food in the weeks or months after a heat. On weekdays from 7:45 to 17:00, call Saari Animal Clinic in Vaasa on (06) 321 7300; we keep urgent appointment slots free every weekday. In the evenings, at night and at weekends, call the regional on-call vet on 0600 399 299. Pyometra does not wait until Monday."
  },

  // Article 15: CCL / Lateral Suture
  'article.ccl.title': {
    fi: 'Lateral suture – eturistisiteen korjaus synteettisellä tukimateriaalilla',
    sv: 'Lateral sutur – korsbandsskadereparation med syntetiskt stödmaterial',
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
    fi: 'Leikkauksessa polvinivel avataan ja tarkastetaan: repeytyneen ristisiteen jäänteet poistetaan ja nivelkierukat (meniskit) tutkitaan vaurioiden varalta. Tämän jälkeen nivelen ulkopuolelle asennetaan vahva monofilamenttinen nylonlanka, joka kierretään reisiluun takaosan (fabella) ympäri ja kiinnitetään sääriluun etuosaan poratun tunnelin kautta. Lanka kiristetään ja lukitaan metallisilla puristusholkeilla (crimp clamp). Tämä stabiloi polvinivelen ja estää sääriluun liukumisen eteenpäin – aivan kuten terve ristiside tekisi. Lanka toimii väliaikaisena tukirakenteena, kunnes kehon oma sidekudos (periartikulaarinen fibroosi) muodostuu nivelen ympärille ja tarjoaa pysyvän vakauden.',
    sv: 'Under operationen öppnas knäleden och undersöks: resterna av det skadade korsbandet avlägsnas och meniskerna kontrolleras för skador. Därefter placeras en stark monofilament nylontråd utanför leden – tråden leds runt den bakre delen av lårbenet (fabella) och fästs genom en borrad tunnel i skenbenet. Tråden spänns och låses med metallklämmor (crimp clamp). Detta stabiliserar knäleden och förhindrar skenbenet från att glida framåt – precis som ett friskt korsband. Tråden fungerar som en tillfällig stödstruktur tills kroppens egen bindväv (periartikulär fibros) bildas runt leden och ger permanent stabilitet.',
    en: 'During surgery, the knee joint is opened and examined: remnants of the torn cruciate ligament are removed and the menisci are checked for damage. A strong monofilament nylon suture is then placed outside the joint — it is routed around the back of the femur (fabella) and secured through a drilled tunnel in the tibia. The suture is tightened and locked with metal crimp clamps. This stabilizes the knee joint and prevents the tibia from sliding forward — just as a healthy cruciate ligament would. The suture acts as a temporary support structure until the body\'s own connective tissue (periarticular fibrosis) forms around the joint and provides permanent stability.'
  },
  'article.ccl.who.title': {
    fi: 'Kenelle lateral suture sopii?',
    sv: 'Vilka patienter passar lateral sutur för?',
    en: 'Who Is Lateral Suture Suitable For?'
  },
  'article.ccl.who.text': {
    fi: 'Lateral suture on erinomainen valinta pienille koirille (alle 15 kg) ja kissoille – näillä potilailla onnistumisprosentti on yli 90 %. Menetelmä sopii hyvin myös keskikokoisille koirille (15–25 kg) sekä iäkkäämmille, rauhallisemmille suurille koirille. Kissoilla lateral suture on eturistisiteen korjauksen standardimenetelmä, sillä kissojen kevyt ruumiinrakenne sopii tekniikkaan erinomaisesti. Aktiivisille ja suurille koirille (yli 25 kg) suosittelemme TTA-leikkausta, joka muuttaa polven biomekaniikkaa pysyvästi.',
    sv: 'Lateral sutur är ett utmärkt val för små hundar (under 15 kg) och katter – hos dessa patienter överstiger framgångsgraden 90 %. Metoden passar också bra för medelstora hundar (15–25 kg) samt äldre, lugnare stora hundar. Hos katter är lateral sutur standardmetoden för korsbandsskadereparation, då katternas lätta kroppsbyggnad passar tekniken utmärkt. För aktiva och stora hundar (över 25 kg) rekommenderar vi TTA-kirurgi, som permanent förändrar knäets biomekanik.',
    en: 'Lateral suture is an excellent choice for small dogs (under 15 kg) and cats — with a success rate exceeding 90% in these patients. The technique also works well for medium-sized dogs (15–25 kg) and for older, calmer large dogs. In cats, the lateral suture is the standard method for cruciate ligament repair, as cats\' light body frame is perfectly suited to the technique. For active and large dogs (over 25 kg), we recommend TTA surgery, which permanently alters knee biomechanics.'
  },
  'article.ccl.recovery.title': {
    fi: 'Toipuminen',
    sv: 'Återhämtning',
    en: 'Recovery'
  },
  'article.ccl.recovery.text': {
    fi: 'Leikkauksen jälkeen ensimmäiset 6 viikkoa ovat kriittisiä: liikkumista rajoitetaan tiukasti, jotta sidekudos ehtii muodostua nivelen ympärille. Koira ulkoilutetaan lyhyillä talutushihnakävelyillä (5–15 minuuttia) ja hyppiminen, juokseminen ja portaat ovat kiellettyjä. Tikit poistetaan noin 2 viikon kohdalla. 6–8 viikon kontrollikäynnillä arvioidaan paraneminen ja kävelylenkkejä pidennetään asteittain. Noin 12–16 viikon kohdalla useimmat potilaat palaavat normaaliin aktiivisuuteen. Kuntoutus – esimerkiksi vesijuoksumatto – nopeuttaa toipumista merkittävästi.',
    sv: 'De första 6 veckorna efter operationen är kritiska: rörelsen begränsas strikt så att bindväv hinner bildas runt leden. Hunden rastas med korta koppelpromenader (5–15 minuter) och hoppande, springande och trappor är förbjudna. Stygnen tas bort efter cirka 2 veckor. Vid kontrollbesöket efter 6–8 veckor bedöms läkningen och promenaderna förlängs stegvis. Efter cirka 12–16 veckor har de flesta patienter återgått till normal aktivitet. Rehabilitering – till exempel undervattenslöpband – påskyndar återhämtningen avsevärt.',
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
    fi: 'Klinikallamme käytämme kahta menetelmää eturistisiteen korjaukseen. Lateral suture stabiloi nivelen synteettisellä langalla ilman luun sahaamista – se on lyhyempi toimenpide, edullisempi ja erinomainen vaihtoehto pienille ja keskikokoisille potilaille. TTA muuttaa polven biomekaniikkaa pysyvästi siirtämällä sääriluun kyhmyä ja on parempi valinta aktiivisille ja suuremmille koirille. Arvioimme aina yksilöllisesti, kumpi menetelmä sopii parhaiten juuri sinun lemmikillesi.',
    sv: 'På vår klinik använder vi två metoder för korsbandsskadereparation. Lateral sutur stabiliserar leden med en syntetisk tråd utan att behöva såga i benet – det är ett kortare ingrepp, mer ekonomiskt och ett utmärkt alternativ för små och medelstora patienter. TTA förändrar knäets biomekanik permanent genom att flytta skenbenets utskott framåt och är ett bättre val för aktiva och större hundar. Vi bedömer alltid individuellt vilken metod som passar bäst för just ditt husdjur.',
    en: 'At our clinic we use two methods for cruciate ligament repair. The lateral suture stabilizes the joint with a synthetic suture without cutting bone — it is a shorter procedure, more affordable, and an excellent option for small and medium-sized patients. TTA permanently alters knee biomechanics by advancing the tibial tuberosity and is a better choice for active and larger dogs. We always assess individually which method is best suited for your pet.'
  },
  'article.ccl.signs.title': {
    fi: 'Milloin kannattaa ottaa yhteyttä?',
    sv: 'När bör du kontakta oss?',
    en: 'When Should You Contact Us?'
  },
  'article.ccl.signs.text': {
    fi: 'Ristisidevauriota kannattaa epäillä, jos koira tai kissa ontuu takajalkaansa, ei halua hypätä tai nousta portaita, jäykistelee levon jälkeen tai liikunnan aikana jalka "pettää". Oireet voivat alkaa äkillisesti tai kehittyä hitaasti viikkojen kuluessa. Varhainen diagnoosi parantaa ennustetta merkittävästi – varaa aika ortopediseen tutkimukseen, niin arvioimme tilanteen ja suosittelemme parhaiten sopivan hoitovaihtoehdon.',
    sv: 'En korsbandsskada bör misstänkas om hunden eller katten haltar på bakbenet, inte vill hoppa eller gå i trappor, är stel efter vila eller om benet "viker sig" under aktivitet. Symtomen kan börja plötsligt eller utvecklas långsamt under veckor. Tidig diagnos förbättrar prognosen avsevärt – boka tid för en ortopedisk undersökning, så bedömer vi situationen och rekommenderar det bäst lämpade behandlingsalternativet.',
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
    fi: 'Siili Euroopassa ja Suomessa – taantuva puutarhan ystävä, joka tarvitsee apuamme',
    sv: 'Igelkotten i Europa och Finland – en trädgårdsvän på tillbakagång som behöver vår hjälp',
    en: 'The Hedgehog in Europe and Finland — A Declining Garden Friend That Needs Our Help'
  },
  'article.hedgehog.intro': {
    fi: 'Siili eli euroopansiili (Erinaceus europaeus) on yksi rakastetuimmista villieläimistämme – ja sen määrä vähenee suuressa osassa Eurooppaa. Lokakuussa 2024 IUCN siirsi siilin maailmanlaajuisella punaisella listallaan elinvoimaisesta silmälläpidettäväksi. Siilikantojen arvellaan pienentyneen yli puolessa niistä maista, joissa laji elää. Monin paikoin lajin levinneisyysalueella kannan väheneminen näyttää olevan kymmenessä vuodessa lähes 30 % tai jopa enemmän – ja 30 % on raja, josta alkaen laji luokitellaan uhanalaiseksi. Suomessa siili elää levinneisyytensä pohjoisrajalla, jossa pitkät talvet tekevät selviytymisestä erityisen vaikeaa. Tässä artikkelissa kerromme siilin tilanteesta, sitä uhkaavista vaaroista ja siitä, miten jokainen voi auttaa.',
    sv: 'Den europeiska igelkotten (Erinaceus europaeus) är ett av våra mest älskade vilda djur – och i stora delar av Europa blir igelkottarna allt färre. I oktober 2024 flyttade IUCN igelkotten från kategorin livskraftig (LC) till nära hotad (NT) på sin globala rödlista. Bestånden tros ha krympt i mer än hälften av de länder där arten förekommer. I många delar av utbredningsområdet verkar minskningen närma sig – eller till och med överstiga – 30 % på tio år, vilket är gränsen för en hotkategori. I Finland lever igelkotten vid den norra gränsen för sitt utbredningsområde, där de långa vintrarna gör det särskilt svårt att överleva. I den här artikeln går vi igenom igelkottens situation, de hot den står inför och hur var och en kan hjälpa till.',
    en: 'The European hedgehog (Erinaceus europaeus) is one of our most beloved wild animals — and its numbers are falling across much of Europe. In October 2024, the IUCN moved the hedgehog from Least Concern to Near Threatened on its global Red List. Populations are thought to have shrunk in more than half of the countries where it lives. In many parts of its range, the decline appears to be approaching — or even exceeding — 30% over ten years, the threshold for a threatened category. In Finland, the hedgehog lives at the northern edge of its range, where long winters make survival especially hard. In this article, we look at the hedgehog’s situation, the threats it faces and how everyone can help.'
  },
  'article.hedgehog.photo.caption': {
    fi: 'Vasemmalla 420 g:n siili, oikealla 750 g:n siili – puhelin kokovertailuna. Syyskuun lopusta alkaen selvästi alle 600 g painava siili tuskin selviää talvihorroksesta ilman apua, mutta loppukesällä pienet siilit ovat usein terveitä nuoria yksilöitä. Kuva: Eläinklinikka Saari.',
    sv: 'Till vänster: en igelkott på 420 g; till höger: en igelkott på 750 g (telefonen som storleksjämförelse). Från slutet av september klarar en igelkott som väger klart under 600 g sannolikt inte vinterdvalan utan hjälp, men på sensommaren är små igelkottar ofta friska ungdjur. Foto: Djurklinik Saari.',
    en: 'Left: a 420 g hedgehog; right: a 750 g hedgehog (phone for scale). From late September onward, a hedgehog well under 600 g is unlikely to survive hibernation without help, but in late summer small hedgehogs are often healthy juveniles. Photo: Eläinklinikka Saari.'
  },
  'article.hedgehog.decline.title': {
    fi: 'Siilit vähenevät eri puolilla Eurooppaa',
    sv: 'Minskande bestånd runt om i Europa',
    en: 'Declining Across Europe'
  },
  'article.hedgehog.decline.text': {
    fi: 'IUCN:n mukaan siilikannat ovat maakohtaisten arvioiden perusteella pienentyneet viimeisten kymmenen vuoden aikana 16–33 %, ja paikallisissa tutkimuksissa on raportoitu jopa 50 %:n vähenemistä Baijerissa (Saksa) ja Flanderissa (Belgia). State of Britain’s Hedgehogs 2022 -raportin mukaan Ison-Britannian maaseudun siilikannat pienenivät kahdessa vuosikymmenessä vähintään kolmanneksella ja enimmillään kolmella neljänneksellä, ja Britannian nisäkkäiden vuoden 2020 punaisella listalla siili on luokiteltu vaarantuneeksi. Alankomaissa siilien määrä väheni 25–50 % vuosina 1994–2018. Ruotsin vuoden 2025 punaisella listalla siili siirrettiin silmälläpidettävästä vaarantuneeksi, kun kannan arvioitiin pienentyneen 48 % kahdessatoista vuodessa, ja Norjassa siili on luokiteltu silmälläpidettäväksi vuodesta 2021 lähtien. Vuonna 2025 Biological Conservation -lehdessä julkaistussa katsauksessa todettiin, että Euroopan siililajit ovat vähenemässä tai niiden seuranta on liian puutteellista luotettavan arvion tekemiseen – tai molempia. Maaliskuussa 2025 Oxfordin yliopisto kertoi, että yksi katsauksen kirjoittajista teki Euroopan parlamentin kanssa työtä EU:n laajuisen siilien suojelustrategian parissa.',
    sv: 'Enligt IUCN uppskattas de nationella minskningarna till 16–33 % under de senaste tio åren, och lokala studier rapporterar förluster på upp till 50 % i Bayern (Tyskland) och Flandern (Belgien). I Storbritannien minskade bestånden på landsbygden med mellan en tredjedel och tre fjärdedelar under två decennier enligt rapporten State of Britain’s Hedgehogs 2022, och i den brittiska rödlistan över däggdjur från 2020 klassas igelkotten som sårbar. I Nederländerna minskade antalet med 25–50 % mellan 1994 och 2018. I Sveriges rödlista 2025 flyttades igelkotten från nära hotad till sårbar efter en uppskattad minskning på 48 % under 12 år, och i Norge har den varit rödlistad som nära hotad sedan 2021. En översiktsartikel som publicerades i tidskriften Biological Conservation 2025 konstaterade att Europas igelkottsarter minskar, är för dåligt övervakade för att kunna bedömas tillförlitligt – eller både och. I mars 2025 meddelade Oxfords universitet att en av översiktsartikelns författare samarbetade med Europaparlamentet kring en EU-omfattande strategi för att bevara igelkottar.',
    en: 'According to the IUCN, national declines are estimated at 16–33% over the past ten years, and local studies report losses of up to 50% in Bavaria (Germany) and Flanders (Belgium). According to the State of Britain’s Hedgehogs 2022 report, rural populations in Great Britain fell by between a third and three-quarters over two decades, and the 2020 Red List for Britain’s Mammals classifies the hedgehog as Vulnerable. In the Netherlands, numbers fell by 25–50% between 1994 and 2018. Sweden’s 2025 Red List moved the hedgehog from Near Threatened to Vulnerable after an estimated 48% decline over 12 years, and Norway has listed it as Near Threatened since 2021. A 2025 review in Biological Conservation found Europe’s hedgehog species to be declining, too poorly monitored to assess reliably, or both. In March 2025, the University of Oxford reported that one of the review’s authors was working with the European Parliament on an EU-wide hedgehog conservation strategy.'
  },
  'article.hedgehog.finland.title': {
    fi: 'Siili Suomessa',
    sv: 'Igelkotten i Finland',
    en: 'The Hedgehog in Finland'
  },
  'article.hedgehog.finland.text': {
    fi: 'Suomessa kulkee siilin levinneisyyden pohjoisraja: lajin yhtenäinen esiintymisalue ulottuu suunnilleen Tornio–Kuhmo-linjalle, ja pohjoisempana siilejä nähdään vain satunnaisesti. Siili on luonnonsuojelulain (9/2023) 69 §:n nojalla rauhoitettu laji. Suomen lajien vuoden 2019 uhanalaisuusarvioinnissa (Punainen kirja) siili luokiteltiin elinvoimaiseksi (LC). Siilien määrästä Suomessa ei kuitenkaan ole tarkkaa tietoa, ja suomalaisen siilitutkijan mukaan ilmoitetut liikennekuolemat ja havainnot viittaavat siihen, että siilit vähenevät myös meillä. Lyhyt pohjoinen kesä jättää vähän aikaa paritteluun, poikasten kasvattamiseen ja rasvavarastojen keräämiseen ennen pitkää talvihorrosta. Itä-Suomessa radiolähettimin seuratut siilit horrostivat noin 223 päivää – yli seitsemän kuukautta, mikä on pisin lajilta raportoitu talvihorros. Meillä siilit elävät pääasiassa ihmisten lähellä – pihoilla, puistoissa ja puutarhoissa.',
    sv: 'I Finland når igelkotten nordgränsen för sitt utbredningsområde: den sammanhängande utbredningen sträcker sig ungefär till linjen Torneå–Kuhmo, och längre norrut görs bara enstaka observationer. Igelkotten är en fridlyst art enligt naturvårdslagen (9/2023, 69 §). I rödlistningen av Finlands arter 2019 klassades den som livskraftig (LC). Det saknas dock exakta uppgifter om antalet igelkottar i Finland, och enligt en finländsk igelkottsforskare tyder rapporterade trafikdödade djur och observationer på att arten minskar också hos oss. Under den korta sommaren i norr har igelkotten ont om tid att para sig, föda upp ungar och samla fettreserver inför en lång vinterdvala. I östra Finland låg radiopejlade igelkottar i dvala i cirka 223 dagar – över sju månader, den längsta vinterdvala som har rapporterats för arten. I Finland lever igelkottarna främst nära människor – på gårdar, i parker och trädgårdar.',
    en: 'In Finland, the hedgehog reaches the northern edge of its range: its continuous distribution extends roughly to the Tornio–Kuhmo line, with only occasional sightings farther north. The hedgehog is a protected species under the Nature Conservation Act (9/2023, § 69). In the 2019 Finnish Red List assessment, it was classified as Least Concern (LC). However, there are no accurate data on hedgehog numbers in Finland, and according to a Finnish hedgehog researcher, reported road deaths and sightings suggest a decline here too. The short northern summer leaves little time to mate, raise young and build up fat before a long hibernation. In eastern Finland, radio-tracked hedgehogs hibernated for about 223 days — more than seven months, the longest hibernation reported for the species. In Finland, hedgehogs live mainly near people — in yards, parks and gardens.'
  },
  'article.hedgehog.threats.title': {
    fi: 'Miksi siilit vähenevät?',
    sv: 'Varför minskar igelkottarna?',
    en: 'Why Are Hedgehogs Declining?'
  },
  'article.hedgehog.threats.text': {
    fi: 'Suurin osa merkittävimmistä uhista on ihmisen aiheuttamia. Liikenne tappaa Euroopassa vuosittain satoja tuhansia siilejä: 1990-luvun lopun tutkimuksissa arvioitiin, että liikenteessä kuolee vuodessa 113 000–340 000 siiliä Alankomaissa ja 230 000–350 000 Belgiassa. Umpinaiset aidat ja muurit pirstovat elinympäristöjä ja estävät siilejä kulkemasta pihalta toiselle. Maatalouden tehostuminen, torjunta-aineet ja hyönteiskato vähentävät siilien ravintoa. Vuonna 2024 julkaistussa tanskalaisessa tutkimuksessa 115 kuolleesta siilistä 84 %:lla todettiin jyrsijämyrkkyjen, 43 %:lla hyönteismyrkkyjen ja 50 %:lla rikkakasvimyrkkyjen jäämiä – vielä ei kuitenkaan tiedetä, ovatko nämä pitoisuudet siileille haitallisia. Myös leudot ja epävakaat talvet voivat olla ongelma: lämpiminä jaksoina horrostavat siilit kuluttavat rasvaa nopeammin ja saattavat heräillä useammin, ja jokainen herääminen syö varastoja, joita ne tarvitsevat selvitäkseen kevääseen.',
    sv: 'De flesta av de största hoten orsakas av människan. Trafiken dödar hundratusentals igelkottar i Europa varje år: enligt studier från slutet av 1990-talet dog uppskattningsvis 113 000–340 000 igelkottar per år på vägarna i Nederländerna och 230 000–350 000 i Belgien. Täta staket och murar splittrar livsmiljöerna och hindrar igelkottarna från att ta sig mellan trädgårdarna. Intensifierat jordbruk, bekämpningsmedel och insekternas tillbakagång minskar tillgången på föda. I en dansk studie som publicerades 2024 hittades rester av gnagargift i 84 % av 115 döda igelkottar, insektsmedel i 43 % och ogräsmedel i 50 % – men man vet ännu inte om de här halterna skadar igelkottarna. Milda och ostadiga vintrar kan också vara ett problem: vid blidväder förbränner igelkottar i vinterdvala fett snabbare och kan vakna oftare, och varje uppvaknande förbrukar reserver som de behöver för att klara sig till våren.',
    en: 'Most of the main threats are human-caused. Traffic kills hundreds of thousands of hedgehogs in Europe every year: studies from the late 1990s estimated 113,000–340,000 road deaths a year in the Netherlands and 230,000–350,000 in Belgium. Solid fences and walls fragment habitat and stop hedgehogs from moving between gardens. Agricultural intensification, pesticides and insect decline reduce their food supply. In a Danish study published in 2024, rodenticide residues were found in 84% of 115 dead hedgehogs, insecticides in 43% and herbicides in 50% — though it is not yet known whether these levels harm hedgehogs. Mild, unstable winters can also be a problem: in warm spells, hibernating hedgehogs burn fat faster and may wake more often, and every awakening uses up reserves they need to last until spring.'
  },
  'article.hedgehog.robots.title': {
    fi: 'Robottiruohonleikkurit – kasvava uhka',
    sv: 'Robotgräsklippare – ett växande hot',
    en: 'Robot Lawn Mowers — A Growing Threat'
  },
  'article.hedgehog.robots.text': {
    fi: 'Robottiruohonleikkurit ovat siileille kasvava – ja ehkäistävissä oleva – uhka. Vuoden 2024 tutkimuksessa Oxfordin yliopiston, tanskalaisten yliopistojen ja saksalaisen eläintarha- ja villieläintutkimuslaitoksen Leibniz-IZW:n tutkijat testasivat 19 robottileikkurimallia kuolleilla siileillä. Osa malleista aiheutti vammoja, osa ei lainkaan, ja kaikissa tapauksissa yhtä lukuun ottamatta leikkuri havaitsi siilin vasta osuttuaan siihen. Saksassa 71 siilien hoitokeskusta raportoi 16 kuukauden aikana vuosina 2022–2023 kaikkiaan 370 siilistä, joilla oli puutarhakoneiden aiheuttamia viiltovammoja; niistä vähintään 47 % kuoli tai jouduttiin lopettamaan. Tutkimuksen mukaan monet näistä vammoista saattoivat olla robottileikkureiden aiheuttamia – ja monia loukkaantuneita siilejä ei koskaan löydetä. Siilit liikkuvat öisin, eikä kerälle käpertyminen suojaa niitä teriltä. Tärkein viesti: käytä robottiruohonleikkuria vain päivänvalossa – ei koskaan hämärässä eikä yöllä.',
    sv: 'Robotgräsklippare är ett växande hot mot igelkottar – och ett hot som går att förebygga. I en studie från 2024 testade forskare från Oxfords universitet, danska universitet och det tyska Leibniz-institutet för zoo- och viltforskning 19 modeller av robotgräsklippare på döda igelkottar. Vissa modeller orsakade skador och andra inte; i alla fall utom ett måste klipparen fysiskt vidröra igelkotten innan den upptäckte djuret. I Tyskland rapporterade 71 vårdcenter för igelkottar under 16 månader 2022–2023 om 370 igelkottar med skärskador från trädgårdsredskap; minst 47 % dog eller fick avlivas. Enligt studien kan många av skadorna ha orsakats av robotgräsklippare – och många skadade igelkottar hittas aldrig. Igelkottar är aktiva nattetid, och att rulla ihop sig till en boll skyddar dem inte mot knivarna. Det viktigaste budskapet: kör robotgräsklipparen bara i dagsljus – aldrig i skymningen eller på natten.',
    en: 'Robot lawn mowers are a growing — and preventable — threat to hedgehogs. In a 2024 study, researchers from the University of Oxford, Danish universities and Germany’s Leibniz Institute for Zoo and Wildlife Research tested 19 robot mower models on dead hedgehogs. Some models caused injuries and others did not; in all but one case, the mower had to physically touch the hedgehog before detecting it. In Germany, 71 hedgehog care centers reported 370 hedgehogs with cut injuries from garden equipment over 16 months in 2022–2023; at least 47% died or had to be euthanized. According to the study, many of these injuries may have been caused by robot mowers — and many injured hedgehogs are never found. Hedgehogs are active at night, and curling into a ball does not protect them from the blades. The most important message: run robot mowers only in daylight — never at dusk or at night.'
  },
  'article.hedgehog.help.title': {
    fi: 'Miten voit auttaa siilejä?',
    sv: 'Hur kan du hjälpa igelkottarna?',
    en: 'How Can You Help Hedgehogs?'
  },
  'article.hedgehog.help.text': {
    fi: 'Tee aitaan siilin kulkuaukko – 13 × 13 cm:n aukko aidan alareunassa päästää siilit kulkemaan pihalta toiselle, ja pihojen yhdistäminen toisiinsa on yksi tehokkaimmista keinoista, joilla voit auttaa. Älä koskaan käytä robottiruohonleikkuria hämärän laskeuduttua. Jätä pihaan luonnontilaisia nurkkauksia – lehtikasat, pölkkykasat ja risukasat tarjoavat ravintoa, suojaa ja pesäpaikkoja. Tarjoa raikasta vettä matalassa astiassa. Lisäruoaksi sopii – etenkin syksyllä – lihapohjainen kissanruoka (ei kalapohjainen) tai liotettu kissan kuivaruoka. Älä koskaan anna maitoa: siilit eivät siedä laktoosia, ja maito aiheuttaa niille ripulia. Jätä myös leipä pois, sillä sen ravintoarvo on siileille lähes olematon. Vältä torjunta-aineita ja etanamyrkkyrakeita, jotka voivat myrkyttää siilejä ja tappaa selkärangattomia, joita siilit syövät. Tarkista aina kokkokasat, lehtikasat ja pitkä heinikko ennen polttamista, siivoamista tai niittämistä. Tee lammikkoon loiva reuna tai nousuramppi: siilit ovat hyviä uimareita, mutta ne voivat hukkua, jos ne eivät pääse kiipeämään pois vedestä.',
    sv: 'Gör en igelkottspassage – ett hål på 13 × 13 cm nertill i staketet gör att igelkottarna kan ta sig mellan trädgårdarna, och att binda ihop trädgårdar är något av det mest effektiva du kan göra. Kör aldrig robotgräsklipparen i skymningen eller på natten. Lämna vilda hörn i trädgården – lövhögar, vedhögar och rishögar ger föda, skydd och boplatser. Ställ fram friskt vatten i en grund skål. Som tilläggsfoder – särskilt på hösten – kan du ge köttbaserad kattmat (inte fisk) eller uppblött torrfoder för katt. Ge aldrig mjölk – igelkottar är laktosintoleranta och får diarré av den. Hoppa också över bröd: det har nästan inget näringsvärde för dem. Undvik bekämpningsmedel och snigelgift, som kan förgifta igelkottar och döda de ryggradslösa djur som de äter. Kontrollera alltid risbrasor, lövhögar och högt gräs innan du eldar, röjer undan eller klipper. Ge dammen en sluttande kant eller en ramp: igelkottar simmar bra men kan drunkna om de inte kan klättra upp.',
    en: 'Make a hedgehog highway: a 13 × 13 cm hole at the bottom of your fence lets hedgehogs move between gardens, and connecting gardens is one of the most effective things you can do. Never run robot mowers after dusk. Leave wild corners in your garden — leaf piles, log piles and brush heaps provide food, shelter and nesting sites. Provide fresh water in a shallow dish. As supplementary food, especially in autumn, offer meat-based cat food (not fish) or soaked dry cat food. Never give milk — hedgehogs are lactose intolerant, and it gives them diarrhea. Skip bread, too: it has almost no nutritional value for them. Avoid pesticides and slug pellets, which can poison hedgehogs and kill the invertebrates they eat. Always check bonfire piles, leaf heaps and long grass before burning, clearing or mowing. Give your pond a sloping edge or a ramp: hedgehogs swim well but can drown if they can’t climb out.'
  },
  'article.hedgehog.nest.title': {
    fi: 'Rakenna siilille talvipesä',
    sv: 'Bygg ett vinterbo åt igelkotten',
    en: 'Build a Winter Nest for Hedgehogs'
  },
  'article.hedgehog.nest.text': {
    fi: 'Yksi parhaista tavoista auttaa siilejä on rakentaa talvipesä eli siilitalo. Suomessa talvihorros saattaa kestää yli seitsemän kuukautta, ja kuiva, hyvin eristetty pesä voi ratkaista, selviääkö siili talvesta. Pesän rakentaminen on yksinkertaista. Nämä ohjeet perustuvat Suomen luonnonsuojeluliiton (SLL), WWF Suomen ja oman SiiliSaari-pesäohjeemme neuvoihin:',
    sv: 'Ett av de bästa sätten att hjälpa igelkottar är att bygga ett vinterbo, ett igelkottshus. I Finland kan vinterdvalan pågå i mer än sju månader, och ett torrt, välisolerat bo kan avgöra om en igelkott överlever vintern. Det är enkelt att bygga ett. Anvisningarna nedan grundar sig på råd från Finlands naturskyddsförbund (SLL), WWF Finland och vår egen SiiliSaari-guide för bobygge:',
    en: 'One of the best ways to help hedgehogs is to build a winter nest — a hedgehog house. In Finland, hibernation can last more than seven months, and a dry, well-insulated nest can decide whether a hedgehog survives the winter. Building one is straightforward. These instructions are based on guidance from the Finnish Association for Nature Conservation (SLL), WWF Finland and our own SiiliSaari nest-building guide:'
  },
  'article.hedgehog.nest.instructions': {
    fi: 'Rakenna käsittelemättömistä laudoista laatikko ILMAN pohjaa; sen tulee olla vähintään 40 cm leveä ja 40 cm korkea. ÄLÄ käytä vaneria: se ei hengitä, joten kosteus tiivistyy pesän sisään ja pesä homehtuu. Avoimen pohjan ansiosta virtsa valuu maahan ja pesä pysyy kuivana. Sahaa yhden seinän alaosaan noin 10 × 15 cm:n sisäänkäynti ja kiinnitä siihen kolmesta laudasta tehty, noin 20 cm pitkä tunneli – tunneli estää kettuja ja kissoja ylettymästä pesän sisälle. Poraa kumpaankin yläkulmaan pienet tuuletusreiät homeen estämiseksi. Tee kannesta vedenpitävä ja irrotettava – kattohuopa toimii hyvin. Levitä laatikon sisälle ensin kerros soraa vedenpoistoa varten, sen päälle kerros multaa ja täytä sitten laatikko lähes kanteen asti kuivilla lehdillä ja oljilla. Sijoita pesä rauhalliseen, varjoisaan ja kuivaan paikkaan etäälle teistä ja suojaan vallitsevalta tuulelta – ei kohtaan, josta kevätaurinko sulattaa lumet ensimmäisenä, eikä kosteaan notkoon, johon sulamisvedet kerääntyvät. Kasaa laatikon päälle ja ympärille lehtiä, risuja tai multaa (mutta ei sisäänkäynnin eteen) lisäeristeeksi. Pesän tulee olla paikallaan elo–syyskuussa, viimeistään syyskuun lopussa. Älä avaa pesää äläkä häiritse sitä lokakuusta kevääseen. Anna lumen kasautua pesän päälle – lumi eristää pesää. Puhdista pesä huhtikuun lopulla tai toukokuussa, kun olet varma, että siili on lähtenyt, mutta ennen lisääntymiskautta. Käytä käsineitä ja hengityssuojainta (mieluiten FFP3): vanha pesämateriaali pölyää, ja pesässä on voinut käydä metsämyyriä, joiden jätöksissä voi olla myyräkuumetta aiheuttavaa Puumala-virusta. Huuhtele laatikko kuumalla vedellä ilman pesuainetta, anna sen kuivua ja täytä se uusilla lehdillä. Vaihda täyte seuraavaa talvea varten heinä- ja elokuun vaihteessa – mutta vain, jos olet varma, että pesä on tyhjä, sillä poikasineen häiritty emo voi hylätä poikasensa tai jopa tappaa ne. Jos pesässä asuu siiliperhe, jätä pesä rauhaan ja puhdista se alkusyksystä, kun perhe on lähtenyt.',
    sv: 'Bygg en låda UTAN botten, minst 40 cm bred och 40 cm hög, av obehandlade brädor. Använd INTE plywood: den andas inte, så fukt kondenserar på insidan och boet möglar. Tack vare den öppna botten rinner urinen ner i marken och boet hålls torrt. Såga upp en ingång på cirka 10 × 15 cm nertill i en av väggarna och fäst en cirka 20 cm lång tunnel av tre brädor vid ingången; tunneln hindrar rävar och katter från att nå in i boet. Borra små ventilationshål i båda övre hörnen för att förhindra mögel. Gör locket vattentätt och avtagbart – takpapp fungerar bra. Lägg först ett lager grus i lådan för dränering och sedan ett lager jord, och fyll den därefter nästan ända upp till locket med torra löv och halm. Placera boet på en lugn, skuggig och torr plats, på avstånd från vägar och skyddad från den förhärskande vinden – inte där vårsolen först smälter snön på boet och inte i en fuktig sänka där smältvatten samlas. Lägg upp löv, ris eller jord över och runt lådan (men inte framför ingången) som extra isolering. Ha boet på plats i augusti–september, senast i slutet av september. Öppna eller stör inte boet från oktober fram till våren. Låt snön samlas ovanpå – den isolerar boet. Rengör boet i slutet av april eller i maj, när du är säker på att igelkotten har lämnat det men före fortplantningssäsongen. Använd handskar och andningsskydd mot damm (helst FFP3): gammalt bomaterial är dammigt, och skogssorkar, vars spillning kan innehålla sorkfeberviruset (puumalavirus), kan ha använt boet. Skölj lådan med hett vatten utan rengöringsmedel, låt den torka och fyll den med nya löv. Kring månadsskiftet juli–augusti förnyar du fyllningen inför nästa vinter – men bara om du är säker på att boet är tomt, eftersom en hona som störs när hon har ungar kan överge eller till och med döda dem. Om en familj bor i boet, låt det vara i fred och rengör det tidigt på hösten när de har gett sig av.',
    en: 'Build a box WITHOUT a bottom, at least 40 cm wide and 40 cm high, from untreated boards. Do NOT use plywood: it doesn’t breathe, so moisture condenses inside and the nest turns moldy. The open bottom lets urine drain into the soil and keeps the nest dry. Cut an entrance of about 10 × 15 cm low in one wall and attach a tunnel about 20 cm long, made from three boards; the tunnel keeps foxes and cats from reaching inside. Drill small ventilation holes in both upper corners to prevent mold. Make the lid waterproof and removable — roofing felt works well. Inside, spread a layer of gravel for drainage, then a layer of soil, then fill the box almost to the lid with dry leaves and straw. Place the nest in a quiet, shaded, dry spot away from roads and sheltered from the prevailing wind — not where the spring sun melts the snow first, and not in a damp hollow where meltwater collects. Heap leaves, brushwood or soil over and around the box (but not in front of the entrance) for extra insulation. Have the nest in place in August–September, and by the end of September at the latest. From October until spring, do not open or disturb it. Let snow pile up on top — it insulates the nest. Clean the nest in late April–May, once you are sure the hedgehog has left but before the breeding season. Wear gloves and a dust mask (ideally FFP3): old nest material is dusty, and bank voles, whose droppings can carry Puumala virus, may have used the nest. Rinse the box with hot water (no detergent), let it dry and refill it with fresh leaves. Around late July or early August, refresh the filling for the next winter — but only if you are sure the nest is empty, because if a mother with young is disturbed, she may abandon or even kill them. If a family is living in the nest, leave it alone and clean it in early autumn, once they have left.'
  },
  'article.hedgehog.nest.links': {
    fi: 'Yksityiskohtaiset rakennusohjeet löydät omasta SiiliSaari-ohjeestamme (<a href="https://siilisaari.fi/siilin-pesa.html" target="_blank" rel="noopener">siilisaari.fi</a>) sekä Suomen luonnonsuojeluliiton (<a href="https://www.sll.fi/ajankohtaista/nikkaroi-siilille-pesa/" target="_blank" rel="noopener">sll.fi</a>) ja WWF Suomen (<a href="https://wwf.fi/ala-villiksi/tee-siilille-pesa/" target="_blank" rel="noopener">wwf.fi</a>) sivuilta.',
    sv: 'Detaljerade bygganvisningar hittar du här: vår egen SiiliSaari-guide (<a href="https://siilisaari.fi/siilin-pesa.html" target="_blank" rel="noopener">siilisaari.fi</a>), Finlands naturskyddsförbund (<a href="https://www.sll.fi/ajankohtaista/nikkaroi-siilille-pesa/" target="_blank" rel="noopener">sll.fi</a>) och WWF Finland (<a href="https://wwf.fi/ala-villiksi/tee-siilille-pesa/" target="_blank" rel="noopener">wwf.fi</a>).',
    en: 'For detailed building instructions, see our own SiiliSaari guide (<a href="https://siilisaari.fi/siilin-pesa.html" target="_blank" rel="noopener">siilisaari.fi</a>), the Finnish Association for Nature Conservation (<a href="https://www.sll.fi/ajankohtaista/nikkaroi-siilille-pesa/" target="_blank" rel="noopener">sll.fi</a>) and WWF Finland (<a href="https://wwf.fi/ala-villiksi/tee-siilille-pesa/" target="_blank" rel="noopener">wwf.fi</a>).'
  },
  'article.hedgehog.nest.photo.caption': {
    fi: 'Siili kurkistaa puisesta suojastaan. Yksinkertainenkin siilitalo voi pelastaa siilin hengen talvella. Kuva: Alexas Fotos / Pexels.',
    sv: 'En igelkott kikar ut ur sitt skydd av trä. Även ett enkelt igelkottshus kan rädda en igelkotts liv på vintern. Foto: Alexas Fotos / Pexels.',
    en: 'A hedgehog peeks out from its wooden shelter. Even a simple house can save a hedgehog’s life in winter. Photo: Alexas Fotos / Pexels.'
  },
  'article.hedgehog.nest.cta': {
    fi: '<strong>Osaatko rakentaa siilitalon ja olisitko valmis rakentamaan niitä myös muille?</strong> Ota meihin yhteyttä, niin saatamme sinut yhteen apua tarvitsevien kanssa. Yhdessä voimme auttaa Vaasan seudun siilejä selviytymään talvesta.',
    sv: '<strong>Kan du bygga igelkottshus och skulle du kunna tänka dig att bygga åt andra?</strong> Hör av dig till oss – vi sätter dig i kontakt med dem som behöver hjälp. Tillsammans kan vi hjälpa igelkottarna i Vasaregionen att klara vintern.',
    en: '<strong>Do you know how to build a hedgehog house, and would you be willing to build them for others?</strong> Contact us — we will connect you with people who need help. Together, we can help the hedgehogs of the Vaasa region survive the winter.'
  },
  'article.hedgehog.injured.title': {
    fi: 'Löysitkö loukkaantuneen siilin?',
    sv: 'Hittade du en skadad igelkott?',
    en: 'Found an Injured Hedgehog?'
  },
  'article.hedgehog.injured.text': {
    fi: 'Siili tarvitsee apua, jos se horjuu, makaa liikkumatta avoimella paikalla, on liikkeellä talvella tai sillä on näkyviä vammoja. Myös päivänvalossa liikkuminen on varoitusmerkki, sillä terveet siilit ovat yöeläimiä – kesällä imettävä emo voi tosin käydä päivälläkin hetken ruokaa etsimässä. Kärpäsenmunat (ne näyttävät pieniltä riisinjyviltä) tai toukat siilissä ovat hätätilanne. Syyskuun lopusta alkaen selvästi alle noin 600 g painava siili tuskin selviää Suomen pitkästä talvihorroksesta ilman apua. Loppukesällä pienet siilit ovat kuitenkin usein terveitä nuoria yksilöitä: keskikesällä syntyneet poikaset painavat vieroitusvaiheessa, yleensä elokuun alussa, vain noin 120–350 g. Anna terveiden siilien olla rauhassa, äläkä ota siiliä kiinni vain punnitaksesi sen. Lain mukaan siilin saa ottaa haltuun vain, jos se on sairas, loukkaantunut tai muuten avuton, ja silloinkin vain lyhytaikaisesti – ensiavun antamiseksi tai hoitoon toimittamiseksi. Jos olet epävarma, soita meille aukioloaikanamme ennen kuin nostat siilin. Jos siili todella tarvitsee apua, toimi näin. Laita ensin käteesi paksut käsineet ja nosta siili korkeareunaiseen pahvilaatikkoon, jonka pohjalla on pyyhe. Lämmitä siiliä seuraavaksi pyyhkeeseen käärityllä kuumavesipullolla ja jätä laatikkoon tilaa, jotta se pääsee siirtymään kauemmas pullosta; jäähtymään jätetty pullo tekee enemmän haittaa kuin hyötyä. Jos siili vuotaa verta tai siinä on kärpäsenmunia tai toukkia, älä lämmitä sitä – se tarvitsee heti eläinlääkärin hoitoa (ks. alla). Älä lämmitä siiliä myöskään kuumalla säällä. Kun siili on lämmennyt, tarjoa sille vettä matalassa astiassa ja vähän lihapohjaista kissanruokaa – ei koskaan maitoa. Soita sitten meille numeroon (06) 321 7300 ja tuo siili Eläinklinikka Saareen (Gerbyntie 18, Vaasa). Annamme sille ensiavun, ja klinikkamme ylläpitämä siilien kuntoutuskeskus SiiliSaari Care Center ottaa siilin jatkohoitoonsa. Olemme avoinna ma–pe 7.45–17.00. Illalla tai viikonloppuna pidä siili laatikossaan rauhallisessa paikassa ja tuo se meille, kun olemme taas avoinna – mutta jos se vuotaa verta, siinä on kärpäsenmunia tai toukkia tai se on lyyhistynyt, soita eläinlääkäripäivystykseen numeroon 0600 399 299.',
    sv: 'En igelkott behöver hjälp om den går ostadigt, ligger stilla på en öppen plats, är i rörelse på vintern eller har synliga skador. Att den är ute i dagsljus är också ett varningstecken, eftersom friska igelkottar är nattaktiva – men på sommaren kan en digivande hona söka föda en kort stund på dagen. Flugägg (som ser ut som små riskorn) eller fluglarver på en igelkott är ett akutfall. Från slutet av september klarar en igelkott som väger klart under cirka 600 g sannolikt inte den långa vinterdvalan i Finland utan hjälp. På sensommaren är små igelkottar däremot ofta friska ungdjur: ungar som föds mitt i sommaren väger bara cirka 120–350 g när de avvänjs, vanligen i början av augusti. Låt friska igelkottar vara i fred, och fånga inte in en igelkott bara för att väga den. Enligt lagen får du ta hand om en igelkott bara om den är sjuk, skadad eller på annat sätt hjälplös, och bara för en kort tid – för att ge första hjälp eller föra den till vård. Om du är osäker, ring oss under våra öppettider innan du lyfter upp den. Om igelkotten verkligen behöver hjälp gör du så här. Ta först på dig tjocka handskar och lägg igelkotten i en kartong med höga kanter och en handduk i botten. Värm den sedan med en varmvattenflaska inlindad i en handduk, och lämna plats i lådan så att igelkotten kan flytta sig bort från flaskan; en flaska som får kallna gör mer skada än nytta. Om igelkotten blöder eller har flugägg eller fluglarver ska du inte värma den – den behöver komma till veterinär genast (se nedan). Värm den inte heller om det är varmt väder. När igelkotten har blivit varm kan du ge den vatten i en grund skål och lite köttbaserad kattmat – aldrig mjölk. Ring oss därefter på (06) 321 7300 och ta med igelkotten till Djurklinik Saari (Gerbyvägen 18, Vasa). Vi ger första hjälp, och SiiliSaari Care Center, det rehabiliteringscenter för igelkottar som vår klinik driver, tar över den fortsatta vården. Vi har öppet mån–fre 7.45–17.00. På kvällen eller under veckoslutet håller du igelkotten i lådan på en lugn plats och kommer in med den när vi öppnar – men om den blöder, har flugägg eller fluglarver eller har kollapsat ska du ringa jourhavande veterinär på 0600 399 299.',
    en: 'A hedgehog needs help if it is staggering, lying still in the open, active in winter or visibly injured. Being out in daylight is also a warning sign, as healthy hedgehogs are nocturnal — though in summer a nursing mother may briefly forage by day. Fly eggs (which look like tiny grains of rice) or maggots on a hedgehog are an emergency. From late September onward, a hedgehog well under about 600 g is unlikely to survive Finland’s long hibernation without help. In late summer, however, small hedgehogs are often healthy juveniles: young born in midsummer weigh only about 120–350 g when they are weaned, usually in early August. Leave healthy hedgehogs alone, and don’t catch one just to weigh it. The law allows you to take in a hedgehog only if it is sick, injured or otherwise helpless, and only briefly — to give it first aid or to bring it in for treatment. If you are unsure, call us during our opening hours before picking it up. If the hedgehog does need help, here is what to do. First, put on thick gloves and place the hedgehog in a high-sided cardboard box lined with a towel. Next, provide warmth with a hot water bottle wrapped in a towel, leaving room in the box for the hedgehog to move away from it; a bottle left to go cold does more harm than good. If the hedgehog is bleeding or has fly eggs or maggots, don’t add heat — it needs a vet right away (see below). Don’t add heat in hot weather either. Once the hedgehog has warmed up, offer it water in a shallow dish and a little meaty cat food — never milk. Then call us at (06) 321 7300 and bring the hedgehog to Eläinklinikka Saari (Gerbyntie 18, Vaasa). We give it first aid, and SiiliSaari Care Center, the hedgehog rehabilitation center run by our clinic, takes over its ongoing care. We are open Monday–Friday 7:45–17:00. In the evening or on the weekend, keep the hedgehog in its box in a quiet place and bring it in when we open — but if it is bleeding, has fly eggs or maggots, or has collapsed, call the after-hours vet at 0600 399 299.'
  },
  'article.hedgehog.ecology.title': {
    fi: 'Siilin elämää lyhyesti',
    sv: 'Igelkottens liv i korthet',
    en: 'Hedgehog Life in Brief'
  },
  'article.hedgehog.ecology.text': {
    fi: 'Siili on yöeläin, joka kulkee ravintoa etsiessään noin 1–2 km yössä. Sen selkää ja kylkiä peittää noin 5 000–7 000 piikkiä. Se syö pääasiassa maassa eläviä selkärangattomia – kovakuoriaisia, perhostoukkia, kastematoja, etanoita ja kotiloita – minkä ansiosta se on tervetullut vieras jokaisessa puutarhassa. Suomessa talvihorros kestää yleensä noin lokakuusta huhti- tai toukokuuhun. Horroksen aikana siilin syke hidastuu noin 190:stä noin 20 lyöntiin minuutissa, ruumiinlämpö laskee noin 35 °C:sta vain muutamaan asteeseen, ja siili elää rasvavarastojensa varassa ja menettää huomattavan osan painostaan. Suomen siilit parittelevat toukokuusta alkaen, ja keskikesällä syntyvässä poikueessa on yleensä kolmesta seitsemään poikasta. Luonnossa siilit elävät tavallisesti kahdesta kolmeen vuotta. Suositukset siilin vähimmäispainosta ennen talvihorrosta vaihtelevat. British Hedgehog Preservation Societyn mukaan ehdoton vähimmäispaino on noin 450 g, SEY Suomen eläinsuojelu suosittelee vähintään noin 600 g:n painoa ja Suomen luonnonsuojeluliitto (SLL) 800 g:n painoa.',
    sv: 'Igelkotten är nattaktiv och rör sig cirka 1–2 km per natt i jakt på föda. Ryggen och sidorna är täckta av omkring 5 000–7 000 taggar. Den lever främst på marklevande ryggradslösa djur – skalbaggar, fjärilslarver, daggmaskar, sniglar och snäckor – vilket gör den till en välkommen gäst i varje trädgård. I Finland varar vinterdvalan vanligen från ungefär oktober till april eller maj. Under dvalan sjunker hjärtfrekvensen från cirka 190 till omkring 20 slag per minut, kroppstemperaturen faller från cirka 35 °C till bara några grader, och igelkotten lever på sina fettreserver och förlorar en betydande del av sin kroppsvikt. Igelkottarna i Finland parar sig från maj och framåt, och ungarna föds mitt i sommaren; en kull består vanligen av tre till sju ungar. I naturen blir igelkottar oftast två till tre år gamla. Råden om minimivikt inför vinterdvalan varierar. British Hedgehog Preservation Society anger cirka 450 g som absolut minimum, SEY Djurskyddet Finland rekommenderar minst cirka 600 g och Finlands naturskyddsförbund (SLL) 800 g.',
    en: 'The hedgehog is nocturnal and travels about 1–2 km a night in search of food. Its back and sides are covered with some 5,000–7,000 spines. It feeds mainly on ground-dwelling invertebrates — beetles, caterpillars, earthworms, slugs and snails — which makes it a welcome guest in any garden. In Finland, hibernation usually lasts from about October to April or May. During hibernation, the hedgehog’s heart rate falls from about 190 to around 20 beats per minute, its body temperature drops from about 35°C to just a few degrees, and it lives on its fat reserves, losing a considerable part of its body weight. Finnish hedgehogs mate from May onward, and the young are born in midsummer, usually in litters of three to seven. In the wild, hedgehogs usually live two to three years. Advice on the minimum weight before hibernation varies. The British Hedgehog Preservation Society gives about 450 g as the absolute minimum, the Finnish animal welfare association SEY recommends at least about 600 g, and the Finnish Association for Nature Conservation (SLL) 800 g.'
  },
  'article.hedgehog.register.title': {
    fi: 'Pesärekisteri – onko pihallasi vapaa pesä?',
    sv: 'Boregister – har du ett ledigt bo hemma?',
    en: 'Nesting Register — Do You Have a Free Nest at Home?'
  },
  'article.hedgehog.register.text': {
    fi: 'Tänä syksynä odotamme klinikalle tavallista enemmän siilejä. Kun siili on vapautuskunnossa niin ajoissa, että se ehtii löytää tai rakentaa oman talvipesän, vapautamme sen löytöpaikalleen, jos paikka on turvallinen. Osa siileistä on kuitenkin vapautuskunnossa vasta myöhään syksyllä – liian myöhään, jotta ne ehtisivät tehdä itselleen pesän ennen pakkasia. Ne vapautetaan sen sijaan valmiiseen pesään, jossa ne voivat horrostaa turvallisesti. Siksi perustamme pesärekisterin: listan ihmisistä, joiden pihalla on valmis, vapaa pesä.',
    sv: 'I höst väntar vi oss fler igelkottar på kliniken än vanligt. När en igelkott är redo att släppas ut i så god tid att den hinner hitta eller bygga ett eget vinterbo, släpper vi tillbaka den där den hittades, om platsen är trygg. En del är dock inte redo förrän sent på säsongen – för sent för att hinna ordna ett eget bo innan frosten kommer. De släpps i stället ut i ett färdigt bo, där de kan övervintra tryggt. Därför startar vi ett boregister: en lista över personer som har ett färdigt, ledigt bo på sin gård.',
    en: 'This autumn, we’re expecting more hedgehogs than usual at the clinic. When a hedgehog is ready for release early enough to find or build its own winter nest, we return it to where it was found, if that spot is safe. Some, however, won’t be ready until late in the season — too late to prepare a nest of their own before the frost. These hedgehogs are released into a ready-made nest instead, where they can hibernate safely. That’s why we’re starting a nesting register: a list of people who have a free, ready-to-use nest in their garden.'
  },
  'article.hedgehog.register.text2': {
    fi: 'Jos olet jo rakentanut pesän yllä olevien ohjeiden mukaan – tai pihallasi on muu sopiva, rauhallinen ja suojaisa paikka – ilmoittaudu alla olevalla lomakkeella. Pesän ei tarvitse olla vapaa juuri nyt; riittää, että se on valmis jossain vaiheessa tänä syksynä.',
    sv: 'Om du redan har byggt ett bo enligt anvisningarna ovan – eller har en annan lämplig, lugn och skyddad plats på din gård – anmäl dig gärna med formuläret nedan. Boet behöver inte vara ledigt just nu; det räcker att det är klart någon gång i höst.',
    en: 'If you’ve already built a nest using the instructions above — or you have another suitable, quiet, sheltered spot in your garden — please register using the form below. The nest doesn’t need to be free right now; it just needs to be ready at some point this autumn.'
  },

  // Cat Stress & Cat Friendly Clinic Article
  'article.catstress.tag': { fi: 'Kissojen terveys', sv: 'Katthälsa', en: 'Cat Health' },
  'article.catstress.title': {
    fi: 'Stressitön eläinlääkärikäynti kissalle – näin autamme ja näin voit valmistautua',
    sv: 'Stressfritt veterinärbesök för katten – så hjälper vi och så kan du förbereda dig',
    en: 'A Stress-Free Vet Visit for Your Cat — How We Help and How You Can Prepare'
  },
  'article.catstress.intro': {
    fi: 'Eläinlääkärikäynti on monelle kissalle stressaava kokemus. Vieras ympäristö, oudot hajut, koirien läsnäolo ja vieraiden ihmisten käsittely voivat laukaista voimakkaan stressireaktion. Stressi ei ole vain epämukavaa – se vaikuttaa myös tutkimustuloksiin: stressaantuneen kissan verensokeri voi nousta useita millimooleja litrassa ja kohota selvästi poikkeaviin lukemiin – akuutisti stressaantuneilla kissoilla on mitattu jopa 16–30 mmol/l:n arvoja (ns. stressihyperglykemia), joten yksittäistä korkeaa arvoa ei voi tulkita suoraan diabetekseksi. Myös verenpaine voi nousta vastaanotolla: tutkimuksessa systolinen paine nousi keskimäärin noin 18 mmHg, mutta yksittäisillä kissoilla nousu oli jopa noin 75 mmHg, ja osalla paine myös laski. Eläinklinikka Saarella olemme panostaneet kissojen hyvinvointiin ja saaneet kansainvälisen ISFM-järjestön Cat Friendly Clinic Silver -sertifikaatin.',
    sv: 'Ett veterinärbesök är en stressande upplevelse för många katter. En främmande miljö, okända lukter, närvaro av hundar och hantering av främlingar kan utlösa en stark stressreaktion. Stress är inte bara obehagligt – det påverkar också undersökningsresultaten: hos en akut stressad katt kan blodsockret stiga med flera mmol/l och nå klart avvikande nivåer – värden på 16–30 mmol/l har rapporterats (s.k. stresshyperglykemi), så ett enskilt förhöjt värde kan inte ensamt tolkas som diabetes. Också blodtrycket påverkas: i en undersökning steg det systoliska trycket i medeltal med ungefär 18 mmHg, men hos enskilda katter steg det med upp till cirka 75 mmHg, och hos andra sjönk det i stället. På Djurklinik Saari har vi satsat på kattens välbefinnande och erhållit den internationella ISFM-organisationens Cat Friendly Clinic Silver-certifiering.',
    en: 'A vet visit is a stressful experience for many cats. An unfamiliar environment, strange smells, the presence of dogs, and handling by strangers can trigger a strong stress response. Stress is not just uncomfortable — it also affects test results: a stressed cat’s blood glucose can rise by several mmol/L and reach clearly abnormal levels — readings of 16–30 mmol/L have been reported in acutely stressed cats (stress hyperglycaemia), so a single high value cannot be read as diabetes on its own. Blood pressure is also affected: in one study systolic pressure rose by about 18 mmHg on average, but in individual cats it rose by as much as about 75 mmHg, and in others it fell instead. At Eläinklinikka Saari, we have invested in feline wellbeing and earned the international ISFM Cat Friendly Clinic Silver certification.'
  },
  'article.catstress.signs.title': {
    fi: 'Stressin merkit kissalla',
    sv: 'Tecken på stress hos katten',
    en: 'Signs of Stress in Cats'
  },
  'article.catstress.signs.text': {
    fi: 'Stressaantunut kissa osoittaa merkkejä kehonkielellään: pupillit laajenevat, korvat painuvat litteiksi tai sivuille, keho jäykistyy ja häntä painuu kiinni vartaloon. Kissa voi sihistä, murista, yrittää paeta tai jähmettyä paikoilleen. Stressioireita ovat myös liiallinen nuoleminen, haukottelu, huulten lipominen sekä pahimmillaan virtsan tai ulosteen hallitsematon karkaaminen. Nämä reaktiot ovat tyypillisiä stressiperäisiä oireita— ne kertovat, että kissa kokee tilanteen uhkaavaksi.',
    sv: 'En stressad katt visar tecken genom sitt kroppsspråk: pupillerna vidgas, öronen plattas till eller vänds åt sidorna, kroppen styvnar och svansen pressas mot kroppen. Katten kan fräsa, morra, försöka fly eller stelna till. Andra stresstecken är överdriven slickning, gäspning, läpp slickningar och i värsta fall okontrollerad urinering eller avföring. Dessa reaktioner är normala – de berättar att katten upplever situationen som hotfull.',
    en: 'A stressed cat shows signs through body language: pupils dilate, ears flatten or turn sideways, the body stiffens and the tail presses against the body. The cat may hiss, growl, try to escape, or freeze in place. Other stress signs include excessive licking, yawning, lip licking, and in the worst case, loss of bladder or bowel control. These reactions are normal — they indicate that the cat perceives the situation as threatening.'
  },
  'article.catstress.feliway.title': {
    fi: 'Feliway – kissan oma rauhoittava viesti',
    sv: 'Feliway – kattens eget lugnande budskap',
    en: 'Feliway — The Cat\'s Own Calming Signal'
  },
  'article.catstress.feliway.text': {
    fi: 'Kun kissa tuntee olonsa turvalliseksi, se hieroo päätään ja poskiaan kalusteisiin ja jättää niihin kasvojensa feromoneja (F3-fraktio). Feliway on synteettinen vastine tälle feromonille. Sen ajatellaan vaikuttavan niiden aistiratojen kautta, joilla kissa havaitsee feromoneja; tarkkaa vaikutusreittiä ei tiedetä varmuudella. Feromonivalmisteiden näyttö on ristiriitaista: riippumattomassa katsauksessa ei seitsemän kissatutkimuksen perusteella löytynyt vakuuttavaa näyttöä hyödystä, kun taas vuonna 2023 julkaistussa katsauksessa todettiin kohtalaista näyttöä siitä, että valmiste vähentää joitakin stressin merkkejä. Samassa katsauksessa todettiin, ettei feromonivalmistetta pidä käyttää ainoana keinona, ja myönteisimmät tulokset ovat useimmiten valmistajan rahoittamista tutkimuksista. Käytämme Feliwayta klinikallamme yhtenä tukitoimena muiden joukossa – se ei korvaa rauhallista käsittelyä eikä kissaa varten suunniteltuja tiloja. Käytämme Feliway-haihdutinta vastaanotto- ja odotustiloissa sekä Feliway-suihketta tutkimuspöydillä ja pyyhkeillä.',
    sv: 'När en katt känner sig trygg gnider den huvud och kinder mot möbler och avsätter samtidigt ansiktsferomon (F3-fraktionen). Feliway är en syntetisk motsvarighet till den signalen. Den antas verka via kattens system för att känna igen feromoner, men exakt hur signalen förmedlas är inte klarlagt. Forskningsläget kring feromonprodukter är splittrat: en oberoende systematisk översikt gick igenom sju studier på katt och fann inga övertygande belägg för nytta, medan en nyare översikt från 2023 såg måttliga belägg för att produkten kan lindra en del stressymtom. Samma översikt konstaterade att feromonprodukter inte ska användas som enda åtgärd, och många av de studier som visar tydlig nytta är finansierade av tillverkaren. Vi använder Feliway på kliniken som en stödåtgärd bland flera – den ersätter inte lugn hantering, tillräckligt med tid och lokaler som är planerade med katten i tankarna. Vi använder Feliway-diffusorer i mottagnings- och väntrummet samt Feliway-spray på undersökningsbord och handdukar.',
    en: 'When a cat feels safe, it rubs its head and cheeks against furniture, depositing facial pheromones (the F3 fraction). Feliway is a synthetic analogue of that signal. It is thought to act through the cat’s pheromone-detection pathways, though the exact route is not fully settled. The evidence on pheromone products is mixed: an independent systematic review found no convincing evidence of benefit across seven cat studies, while a 2023 review found moderate evidence of benefit on some stress indicators. That same review concluded pheromone products should not be relied on as the sole measure, and many of the more favourable studies were funded by the manufacturer. We use Feliway as one supporting measure among several — it does not replace calm handling and a well-designed clinic environment. We use Feliway diffusers in reception and waiting areas and Feliway spray on examination tables and towels.'
  },
  'article.catstress.clinic.title': {
    fi: 'Cat Friendly Clinic Silver – mitä se tarkoittaa?',
    sv: 'Cat Friendly Clinic Silver – vad innebär det?',
    en: 'Cat Friendly Clinic Silver — What Does It Mean?'
  },
  'article.catstress.clinic.text': {
    fi: 'ISFM:n (International Society of Feline Medicine) Cat Friendly Clinic -ohjelma on kansainvälinen sertifiointijärjestelmä, joka asettaa standardit kissojen hoidolle eläinklinikoilla. Ohjelma edellyttää jokaiselta sertifioidulta klinikalta muun muassa nimettyä kissavastaavaa (Cat Advocate), kissaystävällisiä käsittelytapoja – emme koskaan nosta kissaa niskasta – sekä henkilökunnan koulutusta stressin merkkien tunnistamiseen. Silver-taso edellyttää näiden lisäksi kissoille erillistä odotustilaa erillään koirista. Sertifikaatti uusitaan kolmen vuoden välein. Vaatimusten lisäksi olemme omasta aloitteestamme järjestäneet hoitotilat niin, että kissa voi piiloutua ja olla näkösuojassa. Ohjelma pitää feromonivalmisteita hyödyllisenä lisänä, mutta ei edellytä niitä millään tasolla.',
    sv: 'ISFM:s (International Society of Feline Medicine) Cat Friendly Clinic-program ställer krav på hur kliniker tar hand om katter. En del av kraven gäller varje certifierad klinik oberoende av nivå: en utsedd kattansvarig (Cat Advocate) bland personalen, hantering utan nackgrepp – vi lyfter aldrig en katt i nackskinnet – och personal som är utbildad i att känna igen tecken på stress. Ett eget väntrum för katter, skilt från hundarna, hör till kraven på den Silvernivå som vår klinik är certifierad på. Certifikatet förnyas vart tredje år. Utöver kraven har vi själva ordnat vårdutrymmena så att katten kan gömma sig och vara i skydd för insyn. Feromondiffusorer krävs inte på någon nivå; programmet beskriver dem som ett möjligt komplement.',
    en: 'The ISFM (International Society of Feline Medicine) Cat Friendly Clinic programme sets standards for how clinics care for cats. Some requirements apply to every certified clinic at every level: a designated Cat Advocate on staff, scruff-free handling — we never lift a cat by the scruff — and staff trained in recognising signs of stress. A separate waiting area for cats, away from dogs, is a Silver-level requirement, and our clinic meets it. The certificate is renewed every three years. Beyond the requirements, we have arranged the hospitalisation areas ourselves so that a cat can hide and stay out of sight. Pheromone diffusers are not required at any level; the programme describes them as a useful addition.'
  },
  'article.catstress.tips.title': {
    fi: 'Näin valmistaudut kissasi eläinlääkärikäyntiin',
    sv: 'Så förbereder du din katt för veterinärbesöket',
    en: 'How to Prepare Your Cat for the Vet Visit'
  },
  'article.catstress.tips.text': {
    fi: 'Jätä kuljetuslaatikko kotona pysyvästi esille avoimena – laita sisälle pehmeä peitto ja herkkuja, jotta kissa oppii yhdistämään laatikon turvalliseen paikkaan. Voit halutessasi suihkuttaa Feliway-suihketta kuljetuslaatikon sisälle (8–10 suihkausta) vähintään 15 minuuttia ennen kissaa – alkoholin tulee haihtua ensin. Peitä kuljetuslaatikko pyyhkeellä autossa ja odotustilassa. Jos on mahdollista että kissalta otetaan verinäytteitä, pidä kissa ravinnotta 8–12 tuntia ennen käyntiä. Aseta kuljetuslaatikko klinikalla korotettuun paikkaan – ei lattialle. Klinikalla voitte ilmoittautumisen jälkeen odottaa vuoroanne kissojen omassa erillisessä odotustilassa. Tutkimushuoneessa anna kissan tulla ulos kantokopastaan vapaaehtoisesti tai pyydä meitä avaamaan laatikon yläosa – emme koskaan vedä kissaa ulos väkisin.',
    sv: 'Låt transportburen stå framme hemma permanent med öppen dörr – lägg i en mjuk filt och godsaker så att katten lär sig associera buren med en trygg plats. Om du vill kan du spraya Feliway-spray inuti buren (8–10 sprayningar) minst 15 minuter innan katten placeras i – alkoholen måste avdunsta först. Täck buren med en handduk i bilen och i väntrummet. Om blodprov kan bli aktuellt, låt katten fasta 8–12 timmar före besöket. Ställ buren på en upphöjd yta på kliniken – inte på golvet. På vår klinik kan du be om att vänta i katternas egna väntrum. I undersökningsrummet, låt katten komma ut ur buren frivilligt eller be oss att öppna burens ovandel – vi drar aldrig ut katten med tvång.',
    en: 'Leave the carrier out at home permanently with the door open — place a soft blanket and treats inside so the cat learns to associate the carrier with a safe place. If you wish, you can spray Feliway inside the carrier (8–10 sprays) at least 15 minutes before placing the cat in — the alcohol must evaporate first. Cover the carrier with a towel in the car and in the waiting room. If blood tests may be needed, fast the cat for 8–12 hours before the visit. Place the carrier on a raised surface at the clinic — not on the floor. At our clinic, you can ask to wait in the cats\' own waiting area. In the examination room, let the cat come out of the carrier voluntarily or ask us to open the top of the carrier — we never pull a cat out by force.'
  },

  // Unerupted Teeth & Dentigerous Cyst Article
  'article.unerupted.tag': { fi: 'Hammashoito', sv: 'Tandvård', en: 'Dental' },
  'article.unerupted.title': {
    fi: 'Puhkeamattomat hampaat ja hammasaihekysta – piilevä vaara leukaluussa',
    sv: 'Icke-erupterade tänder och dentigena cystor – en dold fara i käkbenet',
    en: 'Unerupted Teeth and Dentigerous Cysts — A Hidden Danger in the Jawbone'
  },
  'article.unerupted.intro': {
    fi: 'Puhkeamaton hammas on hammas, joka ei ole noussut normaalisti suuonteloon vaan jäänyt leukaluun sisään. Tila on koirilla melko harvinainen – kliinisissä röntgentutkimuksissa noin 1–2 % koirista – mutta lyhytkuonoisilla (brakykefaalisilla) roduilla selvästi yleisempi. Puhkeamattoman hampaan ympärille voi kehittyä kysta, nestettä täynnä oleva rakenne, joka kasvaa hitaasti ja tuhoaa leukaluuta. Ilman hammasröntgenkuvausta tilanne jää havaitsematta, kunnes vahinko on jo merkittävä. Klinikallamme suoritamme hammasröntgenkuvaukset ja puhkeamattomien hampaiden kirurgiset poistot.',
    sv: 'En icke-erupterad tand är en tand som inte har kommit upp normalt i munhålan utan stannat kvar inuti käkbenet. Tillståndet är relativt ovanligt hos hundar – cirka 1–2 % i kliniska röntgenundersökningar – men klart vanligare hos brachycefala (trubbnosiga) raser. Runt en icke-erupterad tand kan en dentigena cysta utvecklas – en vätskefylld struktur som växer långsamt och förstör käkbenet. Utan tandröntgen förblir tillståndet oupptäckt tills skadan redan är betydande. På vår klinik utför vi tandröntgenundersökningar och kirurgiska extraktioner av icke-erupterade tänder.',
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
    fi: 'Oireet – usein oireeton',
    sv: 'Symtom – ofta symtomfritt',
    en: 'Symptoms — Often Asymptomatic'
  },
  'article.unerupted.symptoms.text': {
    fi: 'Hammasaihekysta on usein täysin oireeton alkuvaiheessa – tämä tekee siitä erityisen salakavalan. Yleisin löydös on "puuttuva hammas" suun tarkastuksessa: hammas, jonka pitäisi olla paikallaan, mutta ei näy päällepäin. Muita merkkejä voivat olla leuan turvotus, viereisten hampaiden siirtyminen tai kallistuminen, ja pitkälle edenneissä tapauksissa fisteli eli märkäkäytävä. Pahimmassa tapauksessa kysta heikentää leukaluuta niin paljon, että syntyy patologinen murtuma – leuka murtuu normaalista kuormituksesta.',
    sv: 'En dentigen cysta är ofta helt symtomfri i början – detta gör den särskilt lömsk. Det vanligaste fyndet är en "saknad tand" vid munundersökningen: en tand som borde finnas på plats syns inte. Andra tecken kan vara svullnad i käken, förskjutning eller lutning av intilliggande tänder, och i avancerade fall en fistel (varutgång). I värsta fall försvagar cystan käkbenet så mycket att en patologisk fraktur uppstår – käken bryts av normal belastning.',
    en: 'A dentigerous cyst is often completely asymptomatic in the early stages — this makes it particularly insidious. The most common finding is a "missing tooth" on oral examination: a tooth that should be present is not visible. Other signs may include jaw swelling, displacement or tilting of adjacent teeth, and in advanced cases a fistula (draining tract). In the worst case, the cyst weakens the jawbone so much that a pathological fracture occurs — the jaw breaks under normal load.'
  },
  'article.unerupted.breeds.title': {
    fi: 'Riskirodut',
    sv: 'Riskraser',
    en: 'At-Risk Breeds'
  },
  'article.unerupted.breeds.text': {
    fi: 'Lyhytkuonoiset rodut (brakykefaaliset) ovat suurimmassa vaarassa, koska niiden lyhentynyt leuka ei tarjoa riittävästi tilaa kaikille hampaille. Erityisesti bokserit, englanninbulldogit, ranskanbulldogit, bostoninterrierit, mopsit ja shih tzut ovat suurentuneen riskin omaavia rotuja. Myös pienet rodut kuten maltankoira, yorkshirenterrieri, chihuahua, kääpiövillakoira ja mäyräkoira ovat riskissä. Kissoilla puhkeamattomat hampaat ja hammasaihekystat ovat harvinaisia, mutta mahdollisia – samat periaatteet pätevät.',
    sv: 'Brachycefala (trubbnosiga) raser löper störst risk eftersom deras förkortade käke inte erbjuder tillräckligt med utrymme för alla tänder. Särskilt boxer, engelsk bulldogg, fransk bulldogg, bostonterrier, mops och shih tzu är överrepresenterade. Även små raser som malteser, yorkshireterrier, chihuahua, dvärg- och toypudel samt tax löper risk. Hos katter är icke-erupterade tänder och dentigena cystor sällsynta men möjliga – samma principer gäller.',
    en: 'Brachycephalic (short-nosed) breeds are at greatest risk because their shortened jaw does not provide enough space for all teeth. Boxers, English Bulldogs, French Bulldogs, Boston Terriers, Pugs, and Shih Tzus are particularly overrepresented. Small breeds such as Maltese, Yorkshire Terriers, Chihuahuas, Miniature Poodles, and Dachshunds are also at risk. In cats, unerupted teeth and dentigerous cysts are rare but possible — the same principles apply.'
  },
  'article.unerupted.diagnosis.title': {
    fi: 'Diagnoosi – hammasröntgen on välttämätön',
    sv: 'Diagnos – tandröntgen är nödvändig',
    en: 'Diagnosis — Dental X-Rays Are Essential'
  },
  'article.unerupted.diagnosis.text': {
    fi: 'Puhkeamatonta hammasta ja hammasaihekystaa ei voi havaita paljaalla silmällä – ainoa tapa on hammasröntgen. Röntgenkuvassa näkyy selkeärajainen, pyöreä tai soikea alue (nestettä sisältävä onkalo) puhkeamattoman hampaan kruunun ympärillä. Röntgenkuva paljastaa myös luukadon laajuuden ja vaikutuksen viereisiin hampaisiin. Siksi suosittelemme täyden suun röntgenkuvausta jokaisen hammashoidon yhteydessä – tutkimukset osoittavat, että hammasröntgen paljastaa kliinisesti merkittäviä, silmämääräisesti näkymättömiä löydöksiä huomattavalla osalla potilaista (Verstraete ym. 1998).',
    sv: 'En icke-erupterad tand och dentigen cysta kan inte upptäckas med blotta ögat – det enda sättet är tandröntgen. På röntgenbilden syns ett välavgränsat, runt eller ovalt genomskinligt område (en vätskefylld hålighet) runt kronan på den icke-erupterade tanden. Röntgenbilden avslöjar också omfattningen av benförlust och påverkan på intilliggande tänder. Därför rekommenderar vi tandröntgen av hela munnen vid varje tandbehandling – studier visar att tandröntgen avslöjar kliniskt betydelsefulla fynd som inte syns med blotta ögat hos en betydande andel patienter (Verstraete m.fl. 1998).',
    en: 'An unerupted tooth and dentigerous cyst cannot be detected with the naked eye — the only way is dental X-rays. On the radiograph, a well-defined, round or oval radiolucent area (a fluid-filled cavity) appears around the crown of the unerupted tooth. The X-ray also reveals the extent of bone loss and the effect on adjacent teeth. This is why we recommend full-mouth radiographs with every dental procedure — studies show that dental X-rays reveal clinically important findings not visible on examination in a significant proportion of patients (Verstraete et al. 1998).'
  },
  'article.unerupted.treatment.title': {
    fi: 'Hoito – kirurginen poisto',
    sv: 'Behandling – kirurgisk extraktion',
    en: 'Treatment — Surgical Extraction'
  },
  'article.unerupted.treatment.text': {
    fi: 'Hoitona on puhkeamattoman hampaan ja kystaonkalon perusteellinen kirurginen poisto, jotta kaikki epiteelisolut saadaan poistettua. Toimenpiteessä nostetaan limakalvoläppä, avataan luussa ikkuna, poistetaan hammas ja kysta kokonaisuudessaan, ja suljetaan haava. Luuontelo täyttyy uudella luulla 2–6 kuukauden kuluessa. Hoitamattomana kysta jatkaa kasvuaan, tuhoaa luuta ja voi johtaa patologiseen murtumaan – kysta ei koskaan parane itsestään. Eläinklinikka Saarella suoritamme puhkeamattomien hampaiden kirurgiset poistot ja kystakaavinta on osa hammashoidon palvelujamme – varaa aika hammastutkimukseen, niin arvioimme tilanteen.',
    sv: 'Behandlingen är kirurgisk extraktion av den icke-erupterade tanden och noggrann utskrapning (kyrettage) av cystahålan för att avlägsna alla epitelceller. Vid ingreppet lyfts en mukoperiosteal lambå, ett fönster öppnas i benet, tanden och cystans hela vägg avlägsnas, och såret sluts. Benhålan fylls med nytt ben inom 2–6 månader. Obehandlad fortsätter cystan att växa, förstöra ben och kan leda till patologisk fraktur – en cysta läker aldrig av sig själv. På Djurklinik Saari utför vi kirurgiska extraktioner av icke-erupterade tänder och cystakirurgi är en del av våra tandvårdstjänster – boka tid för en tandundersökning så bedömer vi situationen.',
    en: 'Treatment involves surgical extraction of the unerupted tooth and thorough curettage of the cyst cavity to remove all epithelial cells. The procedure involves raising a mucoperiosteal flap, opening a window in the bone, removing the tooth and the entire cyst wall, and closing the wound. The bone cavity fills with new bone within 2–6 months. Left untreated, the cyst continues to grow, destroys bone, and can lead to pathological fracture — a cyst never resolves on its own. At Eläinklinikka Saari, we perform surgical extractions of unerupted teeth and cyst surgery is part of our dental services — book an appointment for a dental examination and we will assess the situation.'
  },
  'article.unerupted.prognosis.title': {
    fi: 'Ennuste',
    sv: 'Prognos',
    en: 'Prognosis'
  },
  'article.unerupted.prognosis.text': {
    fi: 'Varhain havaitun ja täydellisesti poistetun hammasaihekystan ennuste on erinomainen. Uusiutumisriski on pieni, kun kystan seinämä on poistettu kokonaan. Ennuste on heikompi, jos kysta on kasvanut suureksi, luuta on tuhoutunut laajasti tai leuka on jo murtunut. Siksi varhainen diagnoosi on ratkaiseva – hammasröntgen on paras keino löytää puhkeamattomat hampaat ennen kuin kysta ehtii muodostua.',
    sv: 'Prognosen för en tidigt upptäckt och fullständigt avlägsnad dentigen cysta är utmärkt. Risken för återfall är liten när cystans vägg har avlägsnats helt. Prognosen är sämre om cystan har vuxit sig stor, betydande benförlust har skett eller käken redan har frakturerats. Därför är tidig diagnos avgörande – tandröntgen är det bästa sättet att hitta icke-erupterade tänder innan en cysta hinner bildas.',
    en: 'The prognosis for an early-detected and completely removed dentigerous cyst is excellent. The risk of recurrence is low when the cyst wall has been entirely removed. The prognosis is worse if the cyst has grown large, extensive bone has been destroyed, or the jaw has already fractured. This is why early diagnosis is crucial — dental X-rays are the best way to find unerupted teeth before a cyst has time to form.'
  },

  // Article 19: Gastroscopy
  'article.gastroscopy.tag': {
    fi: 'Tähystys',
    sv: 'Endoskopi',
    en: 'Endoscopy'
  },
  'article.gastroscopy.title': {
    fi: 'Gastroskopia – vatsalaukun tähystys ja vierasesineiden poisto ilman leikkausta',
    sv: 'Gastroskopi – magsäcksundersökning och avlägsnande av främmande föremål utan kirurgi',
    en: 'Gastroscopy — Stomach Examination and Foreign Body Removal Without Surgery'
  },
  'article.gastroscopy.intro': {
    fi: 'Gastroskopia on tähystystutkimus, jossa taipuisa kameraendoskooppi viedään suun kautta ruokatorveen, vatsalaukkuun ja pohjukaissuoleen. Tutkimus mahdollistaa limakalvojen tarkastelun reaaliajassa monitorilta, koepalojen oton ja vierasesineiden poiston – kaikki ilman kirurgista viiltoa. Gastroskopia on yksi yleisimmistä tähystystoimenpiteistä eläinlääketieteessä, ja se on erityisen arvokas työkalu kroonisten vatsaoireiden selvittämisessä ja vierasesineiden poistossa.',
    sv: 'Gastroskopi är en endoskopisk undersökning där ett flexibelt kameraendoskop förs genom munnen till matstrupen, magsäcken och tolvfingertarmen. Undersökningen möjliggör granskning av slemhinnorna i realtid på en monitor, provtagning av vävnadsprover och avlägsnande av främmande föremål – allt utan kirurgiskt snitt. Gastroskopi är en av de vanligaste endoskopiska procedurerna inom veterinärmedicin och är ett särskilt värdefullt verktyg för att utreda kroniska magsymtom och avlägsna främmande föremål.',
    en: 'Gastroscopy is an endoscopic procedure in which a flexible camera endoscope is passed through the mouth into the esophagus, stomach, and duodenum. The examination allows real-time viewing of the mucosal lining on a monitor, tissue biopsy collection, and foreign body removal — all without a surgical incision. Gastroscopy is one of the most common endoscopic procedures in veterinary medicine and is an especially valuable tool for investigating chronic gastrointestinal symptoms and removing foreign bodies.'
  },
  'article.gastroscopy.foreign.title': {
    fi: 'Vierasesineiden poisto – leikkauksen vaihtoehto',
    sv: 'Avlägsnande av främmande föremål – ett alternativ till kirurgi',
    en: 'Foreign Body Removal — An Alternative to Surgery'
  },
  'article.gastroscopy.foreign.text': {
    fi: 'Vierasesineen poisto on gastroskopian yleisimpiä käyttöaiheita. Tutkimusten mukaan endoskooppinen poisto onnistuu 83–88 % tapauksista. Koirilla yleisimmät vierasesineet ovat sukat, muovinpalat, kankaat, luut ja lelut. Kissoilla tyypillisimpiä ovat neulat, langat, kengännauhat ja kumilenkit. Endoskooppinen poisto on huomattavasti vähemmän invasiivinen kuin leikkaus: komplikaatioriski on merkittävästi pienempi, toipuminen nopeampaa, ja lemmikki pääsee kotiin samana päivänä. Vierasesineen nielemisen jälkeen nopea hoitoon hakeutuminen on tärkeää – yli 24 tuntia vierasesineen syömisen jälkeen hoito on haastavampaa ja ennuste heikkenee.',
    sv: 'Avlägsnande av främmande föremål är en av de vanligaste indikationerna för gastroskopi. Studier visar att endoskopiskt avlägsnande lyckas i 83–88 % av fallen. Hos hundar är de vanligaste främmande föremålen strumpor, plastbitar, tyg, ben och leksaker. Hos katter är nålar, trådar, skosnören och gummiband vanligast. Endoskopisk avlägsnande är betydligt mindre invasivt än kirurgi: komplikationsrisken är markant lägre, återhämtningen snabbare, och husdjuret kan ofta gå hem samma dag. Efter att ett främmande föremål svalts är det viktigt att snabbt söka vård – kräkningar i mer än 24 timmar försämrar prognosen avsevärt.',
    en: 'Foreign body removal is one of the most common indications for gastroscopy. Studies show that endoscopic removal succeeds in 83–88% of cases. In dogs, the most common foreign bodies are socks, plastic fragments, cloth, bones, and toys. In cats, needles, threads, shoelaces, and rubber bands are most typical. Endoscopic removal is significantly less invasive than surgery: the complication risk is markedly lower, recovery is faster, and the pet can often go home the same day. After swallowing a foreign body, seeking prompt veterinary care is important — vomiting for more than 24 hours significantly worsens the prognosis.'
  },
  'article.gastroscopy.diagnosis.title': {
    fi: 'Kroonisten vatsaoireiden selvittäminen',
    sv: 'Utredning av kroniska magsymtom',
    en: 'Investigating Chronic Gastrointestinal Symptoms'
  },
  'article.gastroscopy.diagnosis.text': {
    fi: 'Gastroskopia on välttämätön työkalu kroonisen oksentelun, ripulin, laihtumisen ja ruokahaluttomuuden syyn selvittämisessä. Tähystyksen aikana otetaan koepaloja limakalvoista. Koepalat otetaan aina, vaikka limakalvo näyttäisi normaalilta – monissa merkittävissä sairauksissa limakalvo voi näyttää silmämääräisesti terveeltä. Gastroskopia paljastaa myös vatsalaukun kasvaimet, polyypit, haavaumat ja tulehdusmuutokset.',
    sv: 'Gastroskopi är ett nödvändigt verktyg för att utreda orsaken till kroniska kräkningar, diarré, viktminskning och aptitlöshet. Under undersökningen tas vävnadsprover (biopsier) från slemhinnan. Biopsier tas alltid, även om slemhinnan ser normal ut – vid många betydande sjukdomar kan slemhinnan se visuellt frisk ut. Gastroskopi avslöjar också tumörer i magsäcken, polyper, sår och inflammatoriska förändringar.',
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
    fi: 'Gastroskopia on minimaalisesti invasiivinen – ei viiltoa, ei tikkejä vatsalaukkuun tai suoleen. Lemmikki toipuu nopeammin, kipua on vähemmän ja infektioriski on pienempi. Useimmat potilaat pääsevät kotiin samana päivänä ja voivat syödä jo muutaman tunnin kuluttua. Komplikaatioriski on erittäin matala: vatsalaukun perforaatioriski on vain 0,1 % koirilla ja 1,6 % kissoilla. Gastroskopia on sekä diagnostinen että hoidollinen – samassa toimenpiteessä voidaan tutkia, ottaa koepaloja ja poistaa vierasesine.',
    sv: 'Gastroskopi är minimalt invasivt – inget snitt, inga suturer i magsäck eller tarm. Husdjuret återhämtar sig snabbare, smärtan är mindre och infektionsrisken lägre. De flesta patienter kan gå hem samma dag och kan äta redan efter några timmar. Komplikationsrisken är mycket låg: risken för magperforation är bara 0,1 % hos hundar och 1,6 % hos katter. Gastroskopi är både diagnostiskt och terapeutiskt – i samma ingrepp kan man undersöka, ta vävnadsprover och avlägsna främmande föremål.',
    en: 'Gastroscopy is minimally invasive — no incision, no sutures to the stomach or intestine. The pet recovers faster, there is less pain, and the infection risk is lower. Most patients go home the same day and can eat within a few hours. The complication risk is very low: the perforation rate is only 0.1% in dogs and 1.6% in cats. Gastroscopy is both diagnostic and therapeutic — in the same procedure, the doctor can examine, take biopsies, and remove foreign bodies.'
  },
  'article.gastroscopy.contact.title': {
    fi: 'Milloin hakeutua tutkimukseen?',
    sv: 'När ska man söka undersökning?',
    en: 'When to Seek Examination?'
  },
  'article.gastroscopy.contact.text': {
    fi: 'Ota yhteyttä, jos lemmikkisi oksentelee toistuvasti, laihtuu selittämättömästi, välttelee ruokaa, ulosteessa on verta tai limaa, tai epäilet vierasesineen nielemistä. Eläinklinikka Saarella suoritamme gastroskopiatutkimukset ja vierasesineiden endoskooppiset poistot – varaa aika tutkimukseen.',
    sv: 'Kontakta oss om ditt husdjur kräks upprepade gånger, har gått ner i vikt utan förklaring, undviker mat, har blod eller slem i avföringen, eller om du misstänker att det har svalt ett främmande föremål. På Djurklinik Saari utför vi gastroskopiundersökningar och endoskopiska avlägsnanden av främmande föremål – boka tid för undersökning.',
    en: 'Contact us if your pet vomits repeatedly, has lost weight unexpectedly, avoids food, has blood or mucus in the stool, or if you suspect it has swallowed a foreign object. At Eläinklinikka Saari, we perform gastroscopy examinations and endoscopic foreign body removals — book an appointment for examination.'
  },

  // Article 20: Tooth Resorption
  'article.resorption.tag': {
    fi: 'Hammashoito',
    sv: 'Tandvård',
    en: 'Dental'
  },
  'article.resorption.title': {
    fi: 'Hammasresorptio – piilevä ja kivulias hammassairaus',
    sv: 'Tandresorption – en dold och smärtsam tandsjukdom',
    en: 'Tooth Resorption — a Hidden and Painful Dental Disease'
  },
  'article.resorption.intro': {
    fi: 'Hammasresorptio on sairaus, jossa erikoistuneet solut (odontolastit) tuhoavat hampaan kovakudosta – kiillettä, dentiiniä ja hammassementtiä. Sairaus koskettaa sekä kissoja että koiria ja on paljon yleisempi kuin moni omistaja uskoo. Kissoilla esiintyvyys on 20–67 %, ja yli 5-vuotiailla jopa 75 %. Suomalaisessa 8 115 kissan tutkimuksessa hammasresorptiota todettiin noin 21 %:lla hammastutkituista kissoista, ja tietyillä roduilla – kuten eurooppalaisella lyhytkarvalla, ragdollilla ja cornish rexillä – riski oli kohonnut. Koirilla esiintyvyys on vastaavasti merkittävä: täyden suun röntgenkuvauksessa jopa 54 % koirista kärsi hammasresorptiosta, ja riski kasvaa erityisesti 9–11 vuoden iässä. Molemmilla lajeilla yleisimmin vaurioituvat hampaat ovat välihampaat (premolaarit). Sairaus on erityisen salakavala, koska sekä kissat että koirat peittävät suukipua – moni lemmikki syö ja käyttäytyy "normaalisti" vaikka kärsii merkittävästä kroonisesta kivusta.',
    sv: 'Tandresorption är en sjukdom där specialiserade celler (odontoklaster) bryter ner tandens hårda vävnader – emalj, dentin och tandcement. Sjukdomen drabbar både katter och hundar och är mycket vanligare än många ägare tror. Hos katter är prevalensen 20–67 %, och bland katter över 5 år upp till 75 %. I en finländsk studie med 8 115 katter konstaterades tandresorption hos cirka 21 % av de tandundersökta katterna, och vissa raser – såsom europeisk korthår, ragdoll och cornish rex – hade förhöjd risk. Hos hundar är prevalensen likaså betydande: vid fullständig tandröntgen hade upp till 54 % av hundarna tandresorption, och risken ökar särskilt vid 9–11 års ålder. Hos båda arterna är premolarerna (kindtänderna) de mest drabbade tänderna. Sjukdomen är särskilt lömsk eftersom både katter och hundar döljer munsmärta – många husdjur äter och beter sig "normalt" trots betydande kronisk smärta.',
    en: 'Tooth resorption is a disease in which specialized cells (odontoclasts) destroy the hard tissues of the tooth — enamel, dentin, and cementum. The disease affects both cats and dogs and is far more common than many owners realize. In cats, the prevalence is 20–67%, rising to as high as 75% in cats over 5 years old. In a Finnish study of 8,115 cats, tooth resorption was found in about 21% of the dentally examined cats, with certain breeds — such as the European Shorthair, Ragdoll and Cornish Rex — at increased risk. In dogs, the prevalence is similarly significant: full-mouth radiographs revealed tooth resorption in up to 54% of dogs, with the risk increasing particularly at 9–11 years of age. In both species, the premolars are the most commonly affected teeth. The disease is particularly insidious because both cats and dogs hide oral pain — many pets eat and behave "normally" despite significant chronic pain.'
  },
  'article.resorption.types.title': {
    fi: 'Tyypit – miksi röntgen ratkaisee hoidon',
    sv: 'Typer – varför röntgen avgör behandlingen',
    en: 'Types — Why Radiographs Determine Treatment'
  },
  'article.resorption.types.text': {
    fi: 'Hammasresorptio jaetaan kolmeen tyyppiin, ja erottelu vaatii aina hammasröntgenkuvan. Tyypissä 1 hammas tuhoutuu paikallisesti ja tulehduskudos korvaa menetetyn hampaan – röntgenkuvassa näkyy tummia alueita, mutta hampaan juuret ja parodontaaliligamentti ovat edelleen tunnistettavissa. Tyypissä 2 hampaan juuri korvautuu luulla ja sulautuu leukaluuhun – röntgenkuvassa juuret näkyvät epäselvästi tai katoavat kokonaan ympäröivään luuhun. Tyypissä 3 samassa hampaassa esiintyy molemmat edellämainituista. Tyyppi 2 on yleisempi, ja syytä pidetään tuntemattomana. Tyyppi 1 liittyy usein paikalliseen tulehdukseen.',
    sv: 'Tandresorption delas in i tre typer, och skillnaden kräver alltid tandröntgen. Vid typ 1 förstörs tanden lokalt och inflammatorisk granulationsvävnad ersätter den förlorade tanden – på röntgen syns mörka områden, men tandens rötter och parodontalligament är fortfarande identifierbara. Vid typ 2 ersätts tandroten med ben och smälter samman med käkbenet (ankylos) – på röntgen syns rötterna som "spöken" eller försvinner helt in i omgivande ben. Vid typ 3 förekommer båda typerna i samma tand. Typ 2 är vanligare och orsaken anses okänd. Typ 1 är ofta kopplad till lokal inflammation.',
    en: 'Tooth resorption is divided into three types, and distinguishing between them always requires dental radiographs. In Type 1, the tooth is destroyed locally and inflammatory granulation tissue replaces the lost tooth — radiographs show dark areas, but the roots and periodontal ligament are still identifiable. In Type 2, the root is replaced by bone and fuses with the jawbone (ankylosis) — on radiographs, the roots appear as "ghosts" or disappear entirely into the surrounding bone. Type 3 shows features of both in the same tooth. Type 2 is more common and its cause is considered unknown. Type 1 is often associated with local inflammation.'
  },
  'article.resorption.symptoms.title': {
    fi: 'Oireet – piilevä kipu',
    sv: 'Symtom – dold smärta',
    en: 'Symptoms — Hidden Pain'
  },
  'article.resorption.symptoms.text': {
    fi: 'Hammasresorptio on usein huomaamaton sairaus – eläimet ovat evoluution myötä oppineet peittämään suukipua, koska luonnossa kivun näyttäminen tekee eläimestä saaliin. Omistaja voi huomata hienovaraisia merkkejä: ruoan putoilu suusta, pään kallistaminen syödessä, pureskelu vain toisella puolella, pureskelematta nieleminen, lisääntynyt kuolaaminen, leuan vapina tai naksuminen, kovien lelujen tai luiden välttely, ärtyisyys, vetäytyminen tai huonontunut turkki. Moni lemmikki jatkaa syömistä kivusta huolimatta. Kliinisessä tutkimuksessa voidaan nähdä vaaleanpunaisia pisteitä ikenessä (tulehduskudos kasvaa hampaan vaurioon), puuttuvia hampaita tai paikallista ientulehdusta yksittäisen hampaan ympärillä.',
    sv: 'Tandresorption är ofta en "tyst sjukdom" – djur har genom evolutionen lärt sig att dölja munsmärta, eftersom det i naturen gör djuret till ett byte. Ägaren kan märka subtila tecken: mat som faller ur munnen, huvudlutning vid ätande, tuggande bara på ena sidan, sväljning utan att tugga, ökad dregling, käkskakningar eller knäppanden (muskelkramper när lesionen berörs), undvikande av hårda leksaker eller ben, irritabilitet, tillbakadragenhet eller försämrad päls. Många husdjur fortsätter att äta trots smärta. Vid klinisk undersökning kan man se rosa fläckar i tandköttet (inflammatorisk vävnad som växer in i tandskadan), saknade tänder eller lokal tandköttsinflammation runt enskilda tänder.',
    en: 'Tooth resorption is often a "silent disease" — animals have evolved to hide oral pain, because in nature showing pain makes an animal prey. Owners may notice subtle signs: dropping food from the mouth, tilting the head while eating, chewing on only one side, swallowing without chewing, increased drooling, jaw trembling or chattering (muscle spasms when the lesion is touched), avoiding hard toys or bones, irritability, withdrawal, or a deteriorating coat. Many pets continue eating despite pain. During clinical examination, pink spots on the gums may be seen (inflammatory tissue growing into the tooth defect), missing teeth, or localized gingivitis around individual teeth.'
  },
  'article.resorption.diagnosis.title': {
    fi: 'Diagnoosi – hammasröntgen löytää 2,4-kertaisesti',
    sv: 'Diagnos – tandröntgen hittar 2,4 gånger fler',
    en: 'Diagnosis — Dental Radiographs Find 2.4 Times More'
  },
  'article.resorption.diagnosis.text': {
    fi: 'Hammasröntgen on ainoa tapa todeta hammasresorptio luotettavasti. Tutkimusten mukaan röntgen löytää 2,4 kertaa enemmän vaurioituneita hampaita kuin pelkkä kliininen tutkimus. Noin 60 % hampaan rakenteesta on ikenen alla näkymättömissä. Röntgenkuva paljastaa myös vaurion tyypin (1, 2 vai 3), mikä suoraan määrittää hoidon. Suosittelemme täyden suun hammasröntgenkuvausta yleisanestesiassa kaikille potilaille – erityisesti iäkkäämmille lemmikeille. "Puuttuva hammas" suun tarkastuksessa ei aina tarkoita että kyseistä hammasta ei olisi ollenkaan – hammas on voinut resorboitua ikenen alle.',
    sv: 'Tandröntgen är det enda sättet att tillförlitligt diagnostisera tandresorption. Studier visar att röntgen hittar 2,4 gånger fler skadade tänder än enbart klinisk undersökning. Cirka 60 % av tandens struktur ligger under tandköttet och är osynlig. Röntgenbilden avslöjar också skadans typ (1, 2 eller 3), vilket direkt bestämmer behandlingen. Vi rekommenderar fullständig tandröntgen under generell anestesi för alla patienter – särskilt äldre djur. En "saknad tand" vid munundersökningen betyder inte alltid att den tappats – tanden kan ha resorberats under tandköttet.',
    en: 'Dental radiographs are the only way to reliably diagnose tooth resorption. Studies show that radiographs detect 2.4 times more affected teeth than clinical examination alone. About 60% of tooth structure lies below the gum line and is invisible. Radiographs also reveal the lesion type (1, 2, or 3), which directly determines treatment. We recommend full-mouth dental radiographs under general anesthesia for all patients — especially older animals. A "missing tooth" during oral examination does not always mean it was lost — the tooth may have resorbed beneath the gum.'
  },
  'article.resorption.treatment.title': {
    fi: 'Hoito – tyyppi määrittää menetelmän',
    sv: 'Behandling – typen avgör metoden',
    en: 'Treatment — Type Determines the Method'
  },
  'article.resorption.treatment.text': {
    fi: 'Tyypin 1 hoito on kirurginen poisto – sekä kruunu että kaikki juuret poistetaan kokonaan, koska parodontaaliligamentti on ehjä ja juurissa voi olla tulehduskudosta. Tyypin 2 hoito on kruunun amputaatio – koska juuret ovat korvautumassa luulla, niitä ei tarvitse eikä tule yrittää poistaa (ankyloituneen juuren poistoyritys voi johtaa leukaluun murtumaan). Tyypin 3 hoito on sama kuin tyypin 1 – täydellinen poisto. Paikkausta tai fluorihoitoa ei suositella – tutkimuksissa 72 % paikatuista hampaista vaurioitui hoidosta huolimatta. Hammasresorptio ei koskaan parane itsestään. Eläinklinikka Saarella suoritamme hammasröntgenkuvaukset ja hampaiden kirurgiset poistot – varaa aika hammastutkimukseen.',
    sv: 'Behandlingen för typ 1 är kirurgisk extraktion – både kronan och alla rötter avlägsnas helt, eftersom parodontalligamentet är intakt och rötterna kan innehålla inflammatorisk vävnad. Behandlingen för typ 2 är kronamputering – eftersom rötterna håller på att ersättas av ben behöver de inte och ska inte försöka avlägsnas (försök att extrahera en ankyloserad rot kan leda till käkfraktur). Typ 3 behandlas som typ 1 – fullständig extraktion. Lagning eller fluorbehandling rekommenderas inte – i studier fortskred 72 % av lagade tänder. Tandresorption läker aldrig av sig själv. På Djurklinik Saari utför vi tandröntgen och kirurgiska tandextraktioner – boka tid för en tandundersökning.',
    en: 'Type 1 treatment is surgical extraction — both the crown and all roots are completely removed, because the periodontal ligament is intact and the roots may contain inflammatory tissue. Type 2 treatment is crown amputation — since the roots are being replaced by bone, they do not need to be and should not be attempted to be removed (attempting to extract an ankylosed root can lead to jaw fracture). Type 3 is treated the same as Type 1 — complete extraction. Fillings or fluoride treatment are not recommended — in studies, 72% of filled teeth progressed. Tooth resorption never heals on its own. At Eläinklinikka Saari, we perform dental radiographs and surgical tooth extractions — book an appointment for a dental examination.'
  },
  'article.resorption.after.title': {
    fi: 'Hoidon jälkeen – dramaattinen muutos',
    sv: 'Efter behandling – en dramatisk förändring',
    en: 'After Treatment — a Dramatic Change'
  },
  'article.resorption.after.text': {
    fi: 'Omistajat raportoivat usein hämmästyttävästä muutoksesta 24–48 tunnin kuluessa poistosta: lemmikki on energisempi, syö paremmin, on sosiaalisempi ja iloisempi. Tämä muutos itsessään todistaa, kuinka paljon kipua eläimellä on ollut vaikka ei sitä ehkä silloin näyttänytkään. Ennaltaehkäisyä ei tunneta, koska sairauden syy on edelleen tuntematon – paras suoja on säännöllinen hammastutkimus yleisanestesiassa, jotta vauriot löydetään varhain ja hoito voidaan aloittaa ajoissa.',
    sv: 'Ägare rapporterar ofta en häpnadsväckande förändring inom 24–48 timmar efter extraktion: husdjuret är mer energiskt, äter bättre, är mer socialt och "som ett annat djur". Denna förändring i sig bevisar hur mycket smärta djuret dolde. Det finns ingen känd förebyggande åtgärd eftersom sjukdomens orsak fortfarande är okänd – det bästa skyddet är regelbunden tandundersökning under generell anestesi så att skador upptäcks tidigt.',
    en: 'Owners often report an astonishing change within 24–48 hours after extraction: the pet is more energetic, eats better, is more social, and is "like a different animal." This transformation itself proves how much pain the animal was hiding. There is no known prevention because the cause of the disease remains unknown — the best protection is regular dental examination under general anesthesia so that lesions are detected early.'
  },

  // --- Article 21: Vaccination ---
  'article.vaccination.tag': {
    fi: 'Terveys',
    sv: 'Hälsa',
    en: 'Health'
  },
  'article.vaccination.title': {
    fi: 'Rokotukset Suomessa – koirien ja kissojen rokotusohjelma',
    sv: 'Vaccinationer i Finland – vaccinationsprogram för hundar och katter',
    en: 'Vaccinations in Finland — Vaccination Program for Dogs and Cats'
  },
  'article.vaccination.intro': {
    fi: 'Rokotukset ovat tehokkain tapa suojata lemmikkiä vakavilta tartuntataudeilta. Suomessa rokotussuositukset antaa Ruokavirasto. Muutamaa lakisääteistä vaatimusta lukuun ottamatta (ks. alempana kohdat Rabies Suomessa ja Matkustaminen lemmikin kanssa) ne eivät ole sitovia – eläinlääkäri tekee aina yksilöllisen arvion. Suositukset perustuvat kansainvälisiin WSAVA:n ohjeisiin (2024); kissojen osalta suomalainen kissalääketieteen yhdistys Catus on sovittanut ne Suomen oloihin.',
    sv: 'Vaccinationer är det mest effektiva sättet att skydda husdjur mot allvarliga smittsamma sjukdomar. I Finland ger Livsmedelsverket (Ruokavirasto) ut vaccinationsrekommendationer. Bortsett från några lagstadgade krav (se avsnitten om rabies och resor nedan) är de inte bindande – veterinären gör alltid en individuell bedömning. Rekommendationerna bygger på de internationella WSAVA-riktlinjerna (2024); för katter har den finländska kattmedicinska föreningen Catus anpassat dem till finländska förhållanden.',
    en: 'Vaccinations are the most effective way to protect pets from serious infectious diseases. In Finland, the Finnish Food Authority (Ruokavirasto) publishes vaccination recommendations. Apart from a few legal requirements (see Rabies and Travel below), they are not binding — the veterinarian always makes an individual assessment. The recommendations draw on the international WSAVA guidelines (2024); for cats, the Finnish feline medicine society Catus has adapted them to Finnish conditions.'
  },
  'article.vaccination.dogs.title': {
    fi: 'Koirien perusrokotteet',
    sv: 'Basvacciner för hundar',
    en: 'Core Vaccines for Dogs'
  },
  'article.vaccination.dogs.text': {
    fi: 'Koiran perusrokotus suojaa <strong>penikkataudilta</strong> (D), <strong>tarttuvalta maksatulehdukselta</strong> (H) ja <strong>parvovirukselta</strong> (P). Se annetaan yleensä <strong>DHPPi-yhdistelmärokotteena</strong>, joka suojaa lisäksi <strong>parainfluenssalta</strong> (Pi), yhdeltä kennelyskän aiheuttajista. Ruokavirasto suosittelee rokotusta <strong>rabiesta</strong> (raivotautia) vastaan kaikille lemmikkikoirille, ja lain mukaan se on pakollinen metsästykseen käytettäville koirille ja viranomaisten palveluskoirille. Koska suoja parainfluenssaa vastaan on lyhytkestoinen, suosittelemme kaikille koirille vuosittaista <strong>kennelyskärokotusta</strong> (parainfluenssa + Bordetella). Rokotusta <strong>leptospiroosia</strong> vastaan suositellaan koirille, jotka matkustavat alueille, joilla tauti on yleinen (Etelä-Eurooppa, Aasia, Pohjois-Afrikka). Leptospiroosi voi tarttua myös ihmiseen. Suomessa on viime vuosina todettu koirilla vuosittain muutamia kliinisiä tapauksia, vuonna 2024 muun muassa useilla koirilla Etelä-Suomessa, joten kysy meiltä, tarvitseeko koirasi rokotusta elämäntapansa vuoksi. Ensimmäiseen rokotussarjaan kuuluu kaksi annosta 3–4 viikon välein, ja suoja muodostuu noin 3–4 viikon kuluttua toisesta annoksesta, joten aloita rokotukset vähintään kaksi kuukautta ennen matkaa. Sen jälkeen tarvitaan tehosterokotus joka vuosi.',
    sv: 'Basvaccinationen för hundar skyddar mot <strong>valpsjuka</strong> (D), <strong>smittsam leverinflammation</strong> (H) och <strong>parvovirus</strong> (P). Den ges oftast som det kombinerade <strong>DHPPi-vaccinet</strong>, som också omfattar <strong>parainfluensa</strong> (Pi), en av orsakerna till kennelhosta. Livsmedelsverket rekommenderar vaccination mot <strong>rabies</strong> för alla sällskapshundar, och enligt lag är den obligatorisk för hundar som används för jakt och för myndigheters tjänstehundar. Eftersom skyddet mot parainfluensa är kortvarigt rekommenderar vi en årlig <strong>vaccination mot kennelhosta</strong> (parainfluensa + Bordetella) för alla hundar. Vaccination mot <strong>leptospiros</strong> rekommenderas för hundar som reser till områden där sjukdomen är vanlig (Sydeuropa, Asien, Nordafrika). Leptospiros kan också smitta människor. Under de senaste åren har några kliniska fall hos hundar konstaterats i Finland varje år, bland annat hos flera hundar i södra Finland 2024, så fråga oss om din hunds livsstil talar för vaccination. Den första vaccinationsomgången består av två doser med 3–4 veckors mellanrum, och skyddet utvecklas cirka 3–4 veckor efter den andra dosen, så börja minst två månader före en resa. Därefter ska vaccinationen förnyas varje år.',
    en: 'The core vaccination for dogs protects against <strong>canine distemper</strong> (D), <strong>infectious hepatitis</strong> (H) and <strong>parvovirus</strong> (P). It is usually given as the combined <strong>DHPPi vaccine</strong>, which also covers <strong>parainfluenza</strong> (Pi), one of the causes of kennel cough. Ruokavirasto recommends <strong>rabies</strong> vaccination for all pet dogs, and by law it is compulsory for dogs used for hunting and for official service dogs. Because protection against parainfluenza is short-lived, we recommend a yearly <strong>kennel cough vaccination</strong> (parainfluenza + Bordetella) for all dogs. <strong>Leptospirosis</strong> vaccination is recommended for dogs travelling to areas where the disease is common (southern Europe, Asia, North Africa). Leptospirosis can also spread to people. In recent years, a few clinical cases have been diagnosed in dogs in Finland each year, including several dogs in southern Finland in 2024, so ask us whether your dog’s lifestyle calls for it. The first course is two doses 3–4 weeks apart, and protection develops about 3–4 weeks after the second dose, so start at least two months before a trip. After that, a booster is needed every year.'
  },
  'article.vaccination.cats.title': {
    fi: 'Kissojen perusrokotteet',
    sv: 'Basvacciner för katter',
    en: 'Core Vaccines for Cats'
  },
  'article.vaccination.cats.text': {
    fi: 'Kaikille kissoille suositellaan kolmoisrokotusta (RCP) <strong>kissaruttoa</strong> (panleukopenia, FPV), <strong>kalikivirusta</strong> (FCV) ja <strong>herpesvirusta</strong> (FHV-1) vastaan. Kissanuhaa vastaan suojaavat rokotteen osat eivät estä tartuntaa, mutta ne lieventävät taudinkuvaa. Rokotus <strong>rabiesta</strong> vastaan on Suomessa kissoille vapaaehtoinen, mutta pakollinen, jos kissa matkustaa ulkomaille. Suosittelemme sitä erityisesti ulkoileville kissoille ja kissoille, jotka voivat joutua kosketuksiin lepakoiden kanssa. <strong>Kissan leukemia</strong> (FeLV) ei kuulu Suomessa rutiinirokotuksiin, koska FeLV:tä ei täällä juuri esiinny. Rokotuksen tarve arvioidaan tapauskohtaisesti, esimerkiksi jos kissa asuu FeLV-positiivisen kissan kanssa tai matkustaa ulkomaille; kissa testataan FeLV:n varalta ennen rokotusta.',
    sv: 'Alla katter rekommenderas trippelvaccination (RCP) mot <strong>kattpest</strong> (panleukopeni, FPV), <strong>calicivirus</strong> (FCV) och <strong>herpesvirus</strong> (FHV-1). Kattsnuvekomponenterna förhindrar inte smitta, men de gör sjukdomen lindrigare. Vaccination mot <strong>rabies</strong> är frivillig för katter i Finland, men obligatorisk om katten reser utomlands. Vi rekommenderar den särskilt för utekatter och katter som kan komma i kontakt med fladdermöss. <strong>Kattleukemi</strong> (FeLV) ingår inte i rutinvaccinationerna i Finland, eftersom FeLV nästan inte alls förekommer här. Behovet bedöms från fall till fall, till exempel för katter som bor tillsammans med en FeLV-positiv katt eller som reser utomlands; katten testas för FeLV före vaccinationen.',
    en: 'The triple vaccination (RCP) against <strong>feline panleukopenia</strong> (FPV), <strong>calicivirus</strong> (FCV) and <strong>herpesvirus</strong> (FHV-1) is recommended for all cats. The cat flu components do not prevent infection, but they make the illness less severe. <strong>Rabies</strong> vaccination is optional for cats in Finland, but mandatory if they travel abroad. We especially recommend it for outdoor cats and cats that may come into contact with bats. <strong>Feline leukaemia</strong> (FeLV) is not part of routine vaccination in Finland, as FeLV is almost non-existent here. The need is assessed case by case, for example for cats living with a FeLV-positive cat or travelling abroad; the cat is tested for FeLV before vaccination.'
  },
  'article.vaccination.schedule.title': {
    fi: 'Koiranpentujen ja kissanpentujen rokotusohjelma',
    sv: 'Vaccinationsprogram för valpar och kattungar',
    en: 'Vaccination Schedule for Puppies and Kittens'
  },
  'article.vaccination.schedule.text': {
    fi: '<strong>Koiranpennut:</strong> DHPPi-rokotukset aloitetaan 8 tai 12 viikon iässä ja toistetaan 4 viikon välein 16 viikon ikään asti – 8 viikon iässä aloitettuun sarjaan kuuluvat myös annokset 12 ja 16 viikon iässä. 16 viikon iässä: DHPPi ja rabies. Tehosterokotus 1 vuoden iässä (DHPPi ja rabies). Aikuiset koirat: DHP ja rabies 3 vuoden välein, parainfluenssa joka vuosi kennelyskärokotteen yhteydessä.<br><br><strong>Kissanpennut:</strong> RCP-rokotukset aloitetaan 8 tai 12 viikon iässä ja toistetaan 4 viikon välein 16 viikon ikään asti – 8 viikon iässä aloitettuun sarjaan kuuluvat myös annokset 12 ja 16 viikon iässä. 16 viikon iässä: RCP sekä halutessa rabies. Tehosterokotus 1 vuoden iässä (RCP sekä rabies, jos pentu on rokotettu sitä vastaan). Aikuiset kissat: RCP ja rabies 3 vuoden välein.',
    sv: '<strong>Valpar:</strong> DHPPi-vaccinationen inleds vid 8 eller 12 veckors ålder och upprepas var fjärde vecka tills valpen är 16 veckor gammal – en serie som inleds vid 8 veckor omfattar även doser vid 12 och 16 veckor. Vid 16 veckor: DHPPi och rabies. Förnyad vaccination vid 1 års ålder (DHPPi och rabies). Vuxna hundar: DHP och rabies vart tredje år, parainfluensa varje år tillsammans med vaccinet mot kennelhosta.<br><br><strong>Kattungar:</strong> RCP-vaccinationen inleds vid 8 eller 12 veckors ålder och upprepas var fjärde vecka tills kattungen är 16 veckor gammal – en serie som inleds vid 8 veckor omfattar även doser vid 12 och 16 veckor. Vid 16 veckor: RCP samt rabies om så önskas. Förnyad vaccination vid 1 års ålder (RCP samt rabies om kattungen har rabiesvaccinerats). Vuxna katter: RCP och rabies vart tredje år.',
    en: '<strong>Puppies:</strong> DHPPi vaccination starts at 8 or 12 weeks and is repeated every 4 weeks until 16 weeks of age — a series started at 8 weeks also includes doses at 12 and 16 weeks. At 16 weeks: DHPPi and rabies. Booster at 1 year of age (DHPPi and rabies). Adult dogs: DHP and rabies every 3 years, parainfluenza every year together with the kennel cough vaccine.<br><br><strong>Kittens:</strong> RCP vaccination starts at 8 or 12 weeks and is repeated every 4 weeks until 16 weeks of age — a series started at 8 weeks also includes doses at 12 and 16 weeks. At 16 weeks: RCP, plus rabies if desired. Booster at 1 year of age (RCP, and rabies if the kitten was vaccinated). Adult cats: RCP and rabies every 3 years.'
  },
  'article.vaccination.rabies.title': {
    fi: 'Rabies Suomessa',
    sv: 'Rabies i Finland',
    en: 'Rabies in Finland'
  },
  'article.vaccination.rabies.text': {
    fi: 'Suomi on ollut virallisesti rabiesvapaa vuodesta 1991; viimeinen kotimainen tapaus eläimillä todettiin vuonna 1989. Sen jälkeen rabiesta on todettu vain kahdella maahan tuodulla eläimellä (2003 ja 2007), ja lepakoista on löydetty rabiekselle sukua olevia lepakkolyssaviruksia (2009, 2016 ja 2017). Lain mukaan metsästykseen käytettävillä koirilla ja viranomaisten palveluskoirilla on oltava voimassa oleva rabiesrokotus, ja ensimmäinen annos on annettava vähintään 21 päivää ennen kuin koiraa käytetään metsästykseen tai palvelustehtäviin. Rabiesrokotus vaaditaan myös, kun koiria, kissoja ja frettejä tuodaan Suomeen ulkomailta, myös matkalta palattaessa. Muille lemmikeille rabiesrokotus ei ole pakollinen, mutta Ruokavirasto suosittelee sitä kaikille koirille ja kissoille. Suomen Kennelliitto edellyttää, että kaikilla näyttelyissä, kokeissa, kilpailuissa ja muissa koiratapahtumissa mukana olevilla koirilla on voimassa olevat rokotukset rabiesta sekä penikkatautia, parvovirusta ja tarttuvaa maksatulehdusta vastaan. Jos rokotus on vanhentunut, koira on rokotettava uudelleen, ja se voi osallistua vasta rokotteen odotusajan (yleensä 21–30 päivää) jälkeen. Ensimmäinen rabiesrokotus annetaan noin 4 kuukauden iässä, tehosterokotus vuoden iässä ja sen jälkeen rokotus 3 vuoden välein (rokotteen käyttöohjeen mukaisesti).',
    sv: 'Finland har officiellt varit fritt från rabies sedan 1991; det senaste inhemska fallet hos djur konstaterades 1989. Sedan dess har rabies påträffats endast hos två importerade djur (2003 och 2007), och besläktade lyssavirus har påträffats hos fladdermöss (2009, 2016 och 2017). Enligt lag ska hundar som används för jakt och myndigheters tjänstehundar ha en giltig rabiesvaccination, och den första dosen ska ges minst 21 dagar innan hunden används för jakt eller tjänsteuppdrag. Rabiesvaccination krävs också när hundar, katter och illrar förs in i Finland från utlandet, även när de återvänder från en resa. För andra husdjur är den inte obligatorisk, men Livsmedelsverket rekommenderar den för alla hundar och katter. Finska Kennelklubben kräver att alla hundar som finns på plats vid utställningar, prov, tävlingar och andra hundevenemang har giltiga vaccinationer mot rabies och mot valpsjuka, parvovirus och smittsam leverinflammation. Om en vaccination har gått ut måste hunden vaccineras på nytt och får delta först efter vaccinets karenstid (vanligen 21–30 dagar). Den första rabiesdosen ges vid cirka 4 månaders ålder, en förnyad dos vid ett års ålder och därefter vart tredje år (enligt vaccinets anvisningar).',
    en: 'Finland has been officially rabies-free since 1991; the last domestic case in animals was in 1989. Since then, rabies has been found in only two imported animals (2003 and 2007), and related bat lyssaviruses have been found in bats (2009, 2016 and 2017). By law, dogs used for hunting and official service dogs must have a valid rabies vaccination, and the first dose must be given at least 21 days before the dog is used for hunting or service work. Rabies vaccination is also required when dogs, cats and ferrets enter Finland from abroad, including when they return from a trip. For other pets, it is not mandatory, but the Finnish Food Authority recommends it for all dogs and cats. The Finnish Kennel Club requires every dog present at shows, trials, competitions and other dog events to have valid rabies and distemper–parvovirus–hepatitis vaccinations. If a vaccination has lapsed, the dog must be revaccinated and may attend only after the vaccine’s waiting period (usually 21–30 days). The first rabies dose is given at about 4 months of age, a booster at one year, and then every 3 years (following the vaccine’s instructions).'
  },
  'article.vaccination.travel.title': {
    fi: 'Matkustaminen lemmikin kanssa',
    sv: 'Resa med husdjur',
    en: 'Travelling with Your Pet'
  },
  'article.vaccination.travel.text': {
    fi: '<strong>Perusvaatimukset (EU ja Norja):</strong> EU:n sisäisillä matkoilla tarvitaan <strong>mikrosiru</strong> (asennettava ennen rabiesrokotusta), voimassa oleva <strong>rabiesrokotus</strong> ja <strong>EU-lemmikkipassi</strong>. Ensimmäisen rabiesrokotuksen voi antaa 12 viikon iästä alkaen, ja se tulee voimaan aikaisintaan 21 päivän kuluttua rokotuksesta (myöhemmin, jos rokotteen käyttöohje niin edellyttää); ennen edellisen rokotuksen voimassaolon päättymistä annetut tehosterokotukset ovat voimassa heti.<br><br><strong>Koirat: heisimatolääkitys Suomeen palattaessa.</strong> Koirat tarvitsevat lisäksi <strong>ekinokokkilääkityksen</strong>, jonka eläinlääkärin on annettava ulkomailla 1–5 päivää (24–120 tuntia) ennen Suomeen saapumista ja merkittävä passiin. Tämä koskee myös Ruotsista palaamista, mutta ei saapumista suoraan Norjasta, Irlannista tai Maltalta.<br><br><strong>Toistuvat tai lyhyet matkat (28 päivän sääntö):</strong> Jos matkustat säännöllisesti tai teet alle 24 tunnin matkoja (kuten päiväretken Ruotsiin), eläinlääkäri – yleensä Suomessa – antaa koiralle ennen matkaa kaksi lääkitystä, joiden väli on vähintään 24 tuntia ja enintään 28 päivää. Hän merkitsee passiin, että käytössä on 28 päivän sääntö. Toisen lääkityksen jälkeen koira voi matkustaa EU:ssa ja Norjassa 28 päivän ajan; jos matkustaminen jatkuu, eläinlääkäri uusii lääkityksen enintään 28 päivän välein. Kotiinpaluun jälkeen eläinlääkäri antaa Suomessa viimeisen lääkityksen 28 päivän kuluessa edellisestä. Jos lääkityskierto katkeaa, se on aloitettava alusta.<br><br><strong>EU:n ulkopuolelta:</strong> Jos lemmikki tulee maasta, joka ei ole EU:n hyväksymien maiden luettelossa (esim. Turkista), tai syyskuusta 2024 alkaen Venäjältä tai Valko-Venäjältä, se tarvitsee <strong>rabiesvasta-ainetestin</strong> EU:n hyväksymässä laboratoriossa (verinäyte vähintään 30 päivää rokotuksen jälkeen). Lisäksi sen on odotettava vähintään 3 kuukautta verinäytteen ottamisesta ennen saapumista EU:hun. Suomessa asuvien lemmikkien ei tarvitse odottaa, jos testi on tehty hyväksytyin tuloksin ja merkitty passiin ennen EU:sta lähtöä ja rabiesrokotus pidetään voimassa katkeamatta. Jos rokotus vanhenee, sekä rokotus että testi on uusittava. Näistä maista tulevien lemmikkien on saavuttava Suomeen nimetyn matkustajien saapumispaikan kautta (esim. Helsinki-Vantaan lentoasema; Vaasa ei ole tällainen), ja ne on ilmoitettava Tullille.<br><br>Varaa aika rokotuksia ja matkustusasiakirjoja varten – myönnämme EU-lemmikkipasseja klinikallamme.<br><br>Säännöt tarkistettu syyskuussa 2026 – tarkista aina ajantasaiset vaatimukset Ruokavirastolta ennen matkaa.',
    sv: '<strong>Grunderna (EU och Norge):</strong> För resor inom EU behöver djuret ett <strong>mikrochip</strong> (som ska sättas in före rabiesvaccinationen), en giltig <strong>rabiesvaccination</strong> och ett <strong>EU-pass för sällskapsdjur</strong>. Den första rabiesvaccinationen kan ges från 12 veckors ålder och blir giltig tidigast 21 dagar efter vaccinationen (senare om vaccinets anvisningar anger det); förnyade vaccinationer som ges innan den föregående har gått ut är giltiga omedelbart.<br><br><strong>Hundar: bandmaskbehandling vid återkomst till Finland.</strong> Hundar behöver dessutom en <strong>ekinokockbehandling</strong> som ges av en veterinär utomlands 1–5 dygn (24–120 timmar) före ankomsten till Finland och som ska antecknas i passet. Detta gäller även vid återkomst från Sverige, men inte när hunden kommer direkt från Norge, Irland eller Malta.<br><br><strong>Täta eller korta resor (28-dagarsregeln):</strong> Vid regelbundna resor eller resor som är kortare än 24 timmar (till exempel en dagstur till Sverige) ger en veterinär, oftast i Finland, två behandlingar före resan med minst 24 timmars och högst 28 dagars mellanrum. Veterinären antecknar i passet att 28-dagarsregeln tillämpas. Efter den andra behandlingen kan hunden resa inom EU och i Norge i 28 dagar; om resandet fortsätter upprepar en veterinär behandlingen med högst 28 dagars mellanrum. När du är hemma igen ger en veterinär i Finland en avslutande behandling inom 28 dagar efter den föregående. Om cykeln bryts måste man börja om från början.<br><br><strong>Utanför EU:</strong> Djur som kommer från länder som inte finns på EU:s lista över godkända länder (t.ex. Turkiet), och sedan september 2024 även från Ryssland och Belarus, behöver ett <strong>rabiesantikroppstest</strong> vid ett EU-godkänt laboratorium (blodprovet tas minst 30 dagar efter vaccinationen). Djuren får föras in i EU tidigast 3 månader efter blodprovet. För djur som bor i Finland gäller väntetiden inte, förutsatt att ett test med godkänt resultat har gjorts och antecknats i passet innan djuret lämnade EU och att rabiesvaccinationen har hållits giltig utan avbrott. Om vaccinationen går ut måste både vaccinationen och testet göras om. Djur från dessa länder ska föras in i Finland via ett införselställe för resenärer (t.ex. Helsingfors-Vanda flygplats; Vasa är inte ett sådant) och anmälas till Tullen.<br><br>Boka tid för vaccinationer och resedokument – vi utfärdar EU-pass för sällskapsdjur på vår klinik.<br><br>Reglerna har granskats i september 2026 – kontrollera alltid de aktuella kraven hos Livsmedelsverket före resan.',
    en: '<strong>Basics (EU and Norway):</strong> For travel within the EU, you need a <strong>microchip</strong> (before the rabies vaccination), a valid <strong>rabies vaccination</strong> and an <strong>EU pet passport</strong>. The first rabies vaccination can be given from 12 weeks of age and becomes valid 21 days after vaccination at the earliest (longer if the vaccine’s instructions say so); boosters given before the previous one expires are valid immediately.<br><br><strong>Dogs: tapeworm treatment when returning to Finland.</strong> Dogs also need <strong>echinococcus treatment</strong> given by a vet abroad 1–5 days (24–120 hours) before arriving in Finland, and it must be recorded in the passport. This also applies when returning from Sweden, but not when coming directly from Norway, Ireland or Malta.<br><br><strong>Frequent or short trips (the 28-day rule):</strong> For regular trips, or trips shorter than 24 hours (such as a day trip to Sweden), a vet, usually in Finland, gives two treatments before the trip, 24 hours to 28 days apart, and notes in the passport that the 28-day rule is used. After the second treatment the dog can travel in the EU and Norway for 28 days; if travel continues, a vet repeats the treatment at least every 28 days. Once you are back, a vet in Finland gives a final treatment within 28 days of the previous one. If the cycle is broken, it must be started again.<br><br><strong>Outside the EU:</strong> Pets coming from countries outside the EU’s approved list (e.g. Turkey), and since September 2024 from Russia and Belarus, need a <strong>rabies antibody test</strong> at an EU-approved laboratory (blood sample at least 30 days after vaccination) and must wait at least 3 months after the blood sample before entering the EU. For pets living in Finland, the wait does not apply if a passing test was done and recorded in the passport before leaving the EU, and the rabies vaccination is kept valid without a gap. If the vaccination lapses, both the vaccination and the test must be redone. Pets from these countries must enter Finland through a designated point of entry (e.g. Helsinki-Vantaa airport; Vaasa is not one) and be declared to Customs.<br><br>Book an appointment for vaccinations and travel documents — we issue EU pet passports at our clinic.<br><br>Rules checked in September 2026 — always check the current requirements with Ruokavirasto before travelling.'
  },

  // --- Article 27: Deworming (madotus) — added 28-07-2026, FI/SV native-panel wording ---
  "article.deworming.title": {
    fi: "Koiran ja kissan madotus – kuinka usein pennut, aikuiset ja matkustavat lemmikit madotetaan?",
    sv: "Avmaskning av hund och katt – hur ofta? Valpar, kattungar, vuxna och resor",
    en: "How often should a dog or cat be dewormed? Puppies, kittens, adults and travel"
  },
  "article.deworming.intro": {
    fi: "Suomessa ei enää suositella, että jokainen lemmikki madotetaan ”varmuuden vuoksi” useita kertoja vuodessa. Sisäloisten torjunta perustuu nykyään riskinarvioon: koiran- ja kissanpennut sekä metsästävät, vapaana liikkuvat tai matkustavat eläimet madotetaan ohjelman mukaan, kun taas terve, vähäriskinen aikuinen voidaan tutkia ulostenäytteellä ja lääkitä vain tarvittaessa. Ajatus on yksinkertainen – lääkitään oikeaan aikaan ja oikeasta syystä, ei kalenterin mukaan. Alta löydät eurooppalaiseen ESCCAP-ohjeistukseen ja suomalaiseen käytäntöön perustuvat nykyiset suositukset kaikenikäisille kissoille ja koirille. Kerromme myös matotartunnan oireista, valmisteen valinnasta sekä matkustavien koirien lakisääteisestä heisimatolääkityksestä.",
    sv: "I Finland rekommenderar man i dag inte längre att alla husdjur avmaskas ”för säkerhets skull” flera gånger om året. Parasitkontrollen utgår numera från risken: valpar, kattungar och djur som jagar, strövar fritt eller reser avmaskas enligt schema, medan en frisk vuxen hund eller katt med låg risk i stället kan kontrolleras med avföringsprov och behandlas bara vid behov. Tanken är enkel – behandla vid rätt tidpunkt och av rätt orsak, inte efter kalendern. Här nedan går vi igenom de aktuella rekommendationerna för katter och hundar i alla åldrar. Rekommendationerna bygger på de europeiska ESCCAP-riktlinjerna och finländsk praxis. Vi tar också upp tecknen på maskinfektion, vilket maskmedel du ska välja och den lagstadgade bandmaskbehandlingen för hundar som reser.",
    en: "Modern advice in Finland is no longer to deworm every pet “just in case” several times a year. Parasite control is now risk-based: puppies, kittens and animals that hunt, roam or travel are dewormed on a schedule, while a healthy, low-risk adult can instead be checked with a faecal sample and treated only when needed. The idea is simple — treat at the right time and for the right reason, not by the calendar. Below are the current recommendations for cats and dogs of every age, based on the European ESCCAP guideline and Finnish practice. We also cover the signs of a worm infection, which product to choose, and the legal tapeworm treatment for travelling dogs."
  },
  "article.deworming.catoften.title": {
    fi: "Kuinka usein kissa pitää madottaa?",
    sv: "Hur ofta ska en katt avmaskas?",
    en: "How often should a cat be dewormed?"
  },
  "article.deworming.catoften.text": {
    fi: "Aikuiselle sisäkissalle riittää yleensä madotus 1–2 kertaa vuodessa – tai yhtä usein tutkittava ulostenäyte, jolloin kissa lääkitään vain, jos näytteestä löytyy loisia. Ulkoileva kissa madotetaan 4–12 kertaa vuodessa: noin 4 kertaa, jos se metsästää harvoin, ja jopa kuukausittain, jos se pyydystää aktiivisesti hiiriä ja muita jyrsijöitä, koska jyrsijät levittävät heisimatoja. Kuukausittaista madotusta (tai kuukausittaista ulostenäytettä) voidaan suositella myös, jos kissan kanssa samassa kodissa asuu alle noin kuusivuotiaita lapsia tai iäkkäitä tai vastustuskyvyltään heikentyneitä ihmisiä. Mitä enemmän kissasi metsästää, sitä useammin se tarvitsee lääkitystä; pelkästään sisällä elävä kissa, jonka ulostenäytteet ovat puhtaita, ei välttämättä tarvitse sitä lainkaan.",
    sv: "För en vuxen innekatt räcker det oftast med avmaskning 1–2 gånger om året – eller ett avföringsprov lika ofta, och behandling bara om provet visar parasiter. En katt som går ute avmaskas 4–12 gånger om året: ungefär 4 gånger om den sällan jagar, och upp till en gång i månaden om den aktivt jagar möss och andra gnagare, eftersom gnagare sprider bandmask. Avmaskning varje månad (eller ett avföringsprov varje månad) kan också rekommenderas om katten bor i samma hem som barn under ungefär sex år, eller som äldre personer eller personer med nedsatt immunförsvar. Ju mer din katt jagar, desto oftare behöver den behandlas; en katt som enbart lever inomhus och har rena avföringsprov behöver kanske ingen avmaskning alls.",
    en: "For an adult indoor cat, deworming 1–2 times a year is usually enough — or a faecal sample at the same frequency, with treatment only if it shows parasites. A cat that goes outdoors is dewormed 4–12 times a year: about 4 times if it rarely hunts, and up to monthly if it actively hunts mice and other rodents, because rodents transmit tapeworms. Monthly deworming (or a monthly faecal sample) may also be advised if the cat shares a home with children under about six, or with elderly or immunocompromised people. The more your cat hunts, the more often it needs treatment; a strictly indoor cat with clean faecal samples may not need any."
  },
  "article.deworming.kitten.title": {
    fi: "Milloin kissanpentu madotetaan ensimmäisen kerran?",
    sv: "När avmaskas en kattunge första gången?",
    en: "When is a kitten dewormed for the first time?"
  },
  "article.deworming.kitten.text": {
    fi: "Kissanpentu madotetaan ensimmäisen kerran 3 viikon iässä. Madotus toistetaan 2 viikon välein, kunnes vieroituksesta on kulunut 2 viikkoa. Sen jälkeen pennut, joilla riski jatkuu – esimerkiksi ulkona liikkuvat – madotetaan kuukausittain 6 kuukauden ikään asti; muut siirtyvät aikuisten ohjelmaan. Emo madotetaan pentujen ensimmäisen madotuksen yhteydessä. Kissanpennut madotetaan näin varhain ja näin usein, koska suolinkaisen toukat siirtyvät niihin maidon kautta, ja runsas matomäärä hidastaa pennun kasvua – tyypillisiä merkkejä ovat pömppömaha, himmeä turkki, ripuli ja huono painonnousu. Jos olet juuri ottanut kotiin kissanpennun, jonka taustaa ei tiedetä, madota se saman ohjelman mukaan.",
    sv: "Kattungar avmaskas första gången vid 3 veckors ålder. Behandlingen upprepas varannan vecka tills det gått 2 veckor efter avvänjningen. Därefter avmaskas kattungar med fortsatt risk, till exempel sådana som får gå ute, varje månad fram till 6 månaders ålder; de övriga går över till schemat för vuxna katter. Kattmamman behandlas samtidigt som kattungarna får sin första behandling. Att kattungar behandlas så tidigt och så ofta beror på att spolmasklarver överförs till dem via mjölken, och en kraftig maskbörda hämmar kattungens tillväxt – typiska tecken är en uppsvälld mage, glanslös päls, diarré och dålig viktökning. Om du just har tagit hem en kattunge och inte känner till dess bakgrund, avmaska den enligt samma schema.",
    en: "Kittens get their first deworming at 3 weeks of age. It is repeated every 2 weeks until 2 weeks after weaning. After that, kittens with ongoing risk, such as outdoor access, are dewormed monthly until 6 months of age; the others move on to the adult schedule. The mother is treated at the kittens’ first treatment. Kittens are treated so early and so often because roundworm larvae pass to them through the milk, and a heavy worm burden stunts a kitten’s growth — a pot belly, dull coat, diarrhoea and poor weight gain are typical. If you have just adopted a kitten and its history is unknown, deworm it on the same schedule."
  },
  "article.deworming.indoor.title": {
    fi: "Tarvitseeko sisäkissa madotusta?",
    sv: "Behöver en innekatt avmaskas?",
    en: "Does an indoor cat need deworming?"
  },
  "article.deworming.indoor.text": {
    fi: "Harvemmin kuin ulkokissa – mutta asiaa ei kannata ohittaa kokonaan. Sisäkissa voi saada suolinkaisen munia kenkien mukana sisälle kulkeutuneesta liasta tai ruukkukasvien mullasta, loisia raa’asta lihasta ja heisimatoja satunnaisesta sisältä pyydystetystä hiirestä. Järkevä käytäntö sisäkissalle on ulostenäyte kerran tai kahdesti vuodessa ja madotus vain, jos loisia löytyy – tai rutiinimadotus 1–2 kertaa vuodessa, jos et halua tutkituttaa näytettä. Kissanpennut madotetaan pentuohjelman mukaan elintavoista riippumatta.",
    sv: "Mer sällan än en utekatt, men inte aldrig. En innekatt kan få i sig spolmaskägg som följer med in på skorna eller finns i krukväxtjord, parasiter från rått kött och bandmask från en mus som den då och då fångar inomhus. Det förnuftiga för en innekatt är ett avföringsprov en eller två gånger om året och avmaskning bara om parasiter hittas – eller en rutinmässig behandling 1–2 gånger om året om du hellre låter bli att testa. Kattungar avmaskas enligt kattungeschemat oavsett livsstil.",
    en: "Less often than an outdoor cat, but not never. Indoor cats can pick up roundworm eggs carried in on shoes or from potting soil, parasites from raw meat, and tapeworms from an occasional mouse caught in the house. The sensible approach for an indoor cat is a faecal sample once or twice a year and deworming only if parasites are found — or a routine treatment 1–2 times a year if you prefer not to test. Kittens are dewormed on the kitten schedule regardless of lifestyle."
  },
  "article.deworming.catsigns.title": {
    fi: "Mistä tiedän, onko kissalla tai koiralla matoja?",
    sv: "Hur vet jag om min katt eller hund har mask?",
    en: "How do I know if my cat or dog has worms?"
  },
  "article.deworming.catsigns.text": {
    fi: "Usein et tiedäkään – moni tartunnan saanut aikuinen eläin ei oireile lainkaan, ja juuri siksi ulostenäyte on tärkeä. Tarkkaile turvonnutta mahaa (etenkin kissan- ja koiranpennuilla), laihtumista hyvästä ruokahalusta huolimatta, ripulia tai oksentelua, himmeää turkkia, takapuolen hankaamista lattiaan sekä riisinjyvän näköisiä heisimadon jaokkeita peräaukon ympärillä tai makuupaikassa. Suolinkaisia näkee joskus oksennuksessa tai ulosteessa vaaleina, spagettimaisina säikeinä. Jos huomaat jotakin näistä, tuo ulostenäyte klinikalle, niin järjestämme sen laboratoriotutkimuksen.",
    sv: "Ofta märker du ingenting – många infekterade vuxna djur visar inga tecken alls, och det är just därför avföringsprovet är viktigt. Tecken att hålla ögonen på är en uppsvälld mage (särskilt hos kattungar och valpar), viktminskning trots god aptit, diarré eller kräkningar, glanslös päls, att djuret åker kana på baken längs golvet, och riskornsliknande bandmasksegment kring analöppningen eller i bädden. Spolmask syns ibland i kräkningar eller avföring som ljusa, spagettiliknande trådar. Ser du något av detta, ta med ett avföringsprov till kliniken, så ordnar vi laboratorieundersökningen.",
    en: "Often you don’t — many infected adults show nothing, which is why the faecal sample matters. Signs to watch for are a swollen belly (especially in kittens and puppies), weight loss despite a good appetite, diarrhoea or vomiting, a dull coat, dragging the bottom along the floor, and rice-grain-like tapeworm segments around the anus or in the bedding. Roundworms are sometimes seen in vomit or faeces as pale spaghetti-like strands. If you see any of these, bring a faecal sample to the clinic and we will arrange the laboratory examination."
  },
  "article.deworming.dogoften.title": {
    fi: "Kuinka usein koira pitää madottaa?",
    sv: "Hur ofta ska en hund avmaskas?",
    en: "How often should a dog be dewormed?"
  },
  "article.deworming.dogoften.text": {
    fi: "Madotusväli riippuu koiran elintavoista. Pääosin sisällä oleva koira, joka tapaa muita koiria vain vähän, madotetaan 1–2 kertaa vuodessa – tai sen ulostenäyte tutkitaan yhtä usein ja koira lääkitään vain tarvittaessa. Tavallinen perhekoira, joka tapaa muita koiria puistoissa ja lenkeillä, kannattaa madottaa tai sen ulostenäyte tutkia noin 4 kertaa vuodessa. Metsästyskoirat, vapaana liikkuvat koirat sekä saalista, raatoja tai sisäelimiä syövät koirat madotetaan 4–12 kertaa vuodessa. Ruokavirasto suosittelee metsästyskoirille – etenkin hirvikoirille – säännöllistä ekinokokkiin tehoavaa heisimatolääkitystä, kuten pratsikvantelia, esimerkiksi metsästyskauden jälkeen ja mieluiten myös hirvikauden alussa. Koiralle, jolle syötetään raakaa lihaa tai sisäelimiä, joita ei ole pakastettu (viikon ajan −17…−20 °C:ssa) tai kypsennetty läpikotaisin (65 °C:n sisälämpötilassa 10 minuutin ajan), tulee antaa heisimatolääkitys 4 viikon välein. Koirat, jotka matkustavat maihin, joissa myyräekinokokkia esiintyy, tarvitsevat lisälääkityksiä matkan aikana ja sen jälkeen – katso matkustamista käsittelevä osio alempana. Kuukausittaista madotusta tai kuukausittaista ulostenäytettä voidaan suositella myös koirille, joiden kanssa samassa kodissa asuu alle noin kuusivuotiaita lapsia tai iäkkäitä tai vastustuskyvyltään heikentyneitä ihmisiä.",
    sv: "Hur ofta beror på hundens livsstil. En hund som mest är inomhus och har lite kontakt med andra hundar avmaskas 1–2 gånger om året – eller kontrolleras med avföringsprov lika ofta och behandlas bara vid behov. En vanlig familjehund som träffar andra hundar i parker och på promenader bör behandlas, eller få ett avföringsprov undersökt, ungefär 4 gånger om året. Jakthundar, hundar som strövar fritt och hundar som äter bytesdjur, kadaver eller slaktavfall behandlas 4–12 gånger om året. Livsmedelsverket rekommenderar att jakthundar – särskilt älghundar – regelbundet behandlas mot bandmask med ett preparat som är effektivt mot Echinococcus, såsom prazikvantel – till exempel efter jaktsäsongen och helst också i början av älgjakten. Hundar som får rått kött eller råa inälvor som inte har frysts (en vecka vid −17 till −20 °C) eller genomtillagats (65 °C i kärnan i 10 minuter) bör få en bandmaskbehandling var fjärde vecka. Hundar som reser till länder där rävens dvärgbandmask förekommer behöver extra behandlingar under och efter resan – se avsnittet om resor nedan. Avmaskning varje månad, eller ett avföringsprov varje månad, kan också rekommenderas för hundar som bor i samma hem som barn under ungefär sex år, eller som äldre personer eller personer med nedsatt immunförsvar.",
    en: "How often depends on the dog’s lifestyle. A dog that is mostly indoors and has little contact with other dogs is dewormed 1–2 times a year — or checked with a faecal sample at the same frequency and treated only if needed. A typical family dog that meets other dogs in parks and on walks should be treated, or have a faecal sample examined, about 4 times a year. Hunting dogs, dogs that roam freely and dogs that eat prey, carcasses or offal are treated 4–12 times a year. The Finnish Food Authority advises that hunting dogs — especially moose dogs — receive regular tapeworm treatment effective against Echinococcus, such as praziquantel, for example after the hunting season and ideally also early in the moose season. Dogs fed raw meat or offal that has not been frozen (one week at −17 to −20 °C) or cooked through (65 °C at the core for 10 minutes) should get a tapeworm treatment every 4 weeks. Dogs travelling to countries where the fox tapeworm occurs need extra treatments during and after the trip — see the travel section below. Monthly deworming, or a monthly faecal sample, may also be advised for dogs that share a home with children under about six, or with elderly or immunocompromised people."
  },
  "article.deworming.puppy.title": {
    fi: "Milloin koiranpentu madotetaan ensimmäisen kerran?",
    sv: "När avmaskas en valp första gången?",
    en: "When is a puppy dewormed for the first time?"
  },
  "article.deworming.puppy.text": {
    fi: "Koiranpennut madotetaan ensimmäisen kerran 2 viikon iässä, koska suolinkaisen toukat siirtyvät niihin jo kohdussa ja maidon kautta. Madotus toistetaan 2 viikon välein, kunnes vieroituksesta on kulunut 2 viikkoa. Sen jälkeen pennut, joilla riski jatkuu – esimerkiksi pentukoulussa ja koirapuistoissa käyvät – madotetaan kuukausittain 6 kuukauden ikään asti. Emo madotetaan pentujen ensimmäisen madotuksen yhteydessä. Pyydä kasvattajalta pennun madotustiedot, kun haet sen kotiin, niin autamme sinua jatkamaan ohjelmaa.",
    sv: "Valpar avmaskas första gången vid 2 veckors ålder, eftersom spolmasklarver överförs till dem redan i livmodern och via mjölken. Behandlingen upprepas varannan vecka tills det gått 2 veckor efter avvänjningen, och därefter – för valpar med fortsatt risk, till exempel valpar som går på valpkurs eller i hundparker – varje månad fram till 6 månaders ålder. Tiken behandlas samtidigt som valparna får sin första behandling. Be uppfödaren om valpens avmaskningsuppgifter när du hämtar den, så hjälper vi dig att fortsätta enligt schemat.",
    en: "Puppies are dewormed for the first time at 2 weeks of age, because roundworm larvae pass to them while still in the womb as well as through the milk. Treatment is repeated every 2 weeks until 2 weeks after weaning and then — for puppies with ongoing risk, such as those going to puppy classes and dog parks — monthly until 6 months of age. The dam is treated at the puppies’ first treatment. Ask the breeder for the puppy’s deworming record when you collect it, and we will help you continue the schedule."
  },
  "article.deworming.fecal.title": {
    fi: "Milloin ulostenäyte riittää madotuksen sijaan?",
    sv: "När räcker det med avföringsprov i stället för avmaskning?",
    en: "When is a faecal sample enough instead of deworming?"
  },
  "article.deworming.fecal.text": {
    fi: "Terveelle, vähäriskiseen ryhmään kuuluvalle aikuiselle – sisäkissalle tai koiralle, joka on enimmäkseen sisällä ja tapaa vain vähän muita koiria – riittää ulostenäyte kerran tai kahdesti vuodessa: jos näyte on puhdas, lääkettä ei tarvita. Koirilta ja kissoilta, joilla on enemmän altistusta (puistolenkit ja koirakontaktit, ulkoilu), voidaan tutkia ulostenäyte suolinkaisten varalta yhtä usein kuin ne muuten madotettaisiin, eli noin 4 kertaa vuodessa. Ulostenäyte ei kuitenkaan paljasta monia heisimatotartuntoja, joten metsästävät tai raakaa lihaa syövät eläimet tarvitsevat silti säännöllisen heisimatolääkityksen. Kerää pieni määrä tuoretta ulostetta kolmena peräkkäisenä päivänä samaan purkkiin ja tuo se klinikalle; järjestämme näytteen laboratoriotutkimuksen. Kun lääkitään vain silloin, kun loisia löytyy, vältetään turha lääkitys, mikä saattaa myös auttaa hidastamaan lääkeresistenssin kehittymistä. Euroopassa koirien ja kissojen suolinkaisilla ja hakamadoilla ei ole vielä käytännössä yhtään todettua resistenssitapausta, mutta Yhdysvalloissa ja Australiassa on todettu resistenttejä koiran hakamatoja.",
    sv: "För ett friskt vuxet djur i lågriskgruppen – en innekatt, eller en hund som mest är inomhus och har lite kontakt med andra hundar – räcker ett avföringsprov en eller två gånger om året: är provet rent behövs ingen medicinering. Hundar och katter som är mer utsatta (parkpromenader och hundkontakter, utevistelse) kan testas för spolmask lika ofta som de annars skulle behandlas, ungefär 4 gånger om året. Avföringsprov missar dock många bandmaskinfektioner, så djur som jagar eller äter rått kött bör ändå få regelbunden bandmaskbehandling. Samla en liten mängd färsk avföring tre dagar i följd i samma burk och ta med den till kliniken; vi ordnar laboratorieundersökningen. Genom att behandla bara när parasiter hittas undviker man onödig medicinering och kan bidra till att bromsa utvecklingen av läkemedelsresistens. I Europa finns det fortfarande i stort sett inga belagda fall av resistens hos hundens och kattens spolmask och hakmask, men resistent hakmask hos hund har påvisats i USA och Australien.",
    en: "For a healthy adult in the low-risk group — an indoor cat, or a dog that is mostly indoors and has little contact with other dogs — a faecal sample once or twice a year is enough: if it is clean, no medication is needed. Dogs and cats with more exposure (park walks and dog contact, outdoor access) can be tested for roundworms at the same frequency at which they would otherwise be treated, about 4 times a year. Faecal tests miss many tapeworm infections, though, so animals that hunt or eat raw meat should still get regular tapeworm treatment. Collect a small amount of fresh faeces on three consecutive days into one container and bring it to the clinic; we will arrange the laboratory examination. Treating only when parasites are found avoids needless medication and may help slow the development of drug resistance. In Europe there are still virtually no proven cases of resistance in the roundworms and hookworms of dogs and cats, but resistant dog hookworms have been documented in the USA and Australia."
  },
  "article.deworming.parasites.title": {
    fi: "Mitkä suolistomadot ovat yleisiä Suomessa?",
    sv: "Vilka inälvsmaskar är vanliga i Finland?",
    en: "Which intestinal worms are common in Finland?"
  },
  "article.deworming.parasites.text": {
    fi: "Suolistoloiset ovat suomalaisilla lemmikkikoirilla ja -kissoilla harvinaisia – vuoden 2024 tutkimuksessa niitä löytyi noin 3,5 %:lta yli puolivuotiaista lemmikkikoirista ja -kissoista (mutta 41 %:lta löytöeläinkotien kissoista) – ja siksikin näytteen tutkiminen ennen lääkitsemistä on järkevää. Suolinkaiset (Toxocara) ovat sekä koirien että kissojen yleisin haitallinen mato, ja niitä kantavat todennäköisimmin nuoret eläimet. Ne ovat zoonoottisia loisia – ne voivat tarttua ihmiseen, erityisesti pieniin lapsiin – mikä on hyvä syy madottaa nuoret eläimet huolellisesti ja kerätä lemmikin ulosteet pois viipymättä. Heisimatoja esiintyy lähinnä eläimillä, jotka syövät jyrsijöitä tai raakaa lihaa tai joilla on kirppuja (tai koirilla täitä). Giardia on ripulia aiheuttava alkueläin, joka leviää saastuneen veden ja ympäristön kautta. Hakamatoja löytyy suomalaisilta koirilta vain satunnaisesti, ja piiskamadot ovat harvinaisia. Vaarallista myyräekinokokkia (Echinococcus multilocularis) ei ole todettu Suomessa – matkustavien koirien tuontisäännöt ovat olemassa juuri siksi, että näin pysyisi jatkossakin. Sen sukulaislaji hirviekinokokki (E. canadensis) kiertää susien sekä hirvien, porojen ja metsäpeurojen välillä pääasiassa Itä- ja Koillis-Suomessa, mutta vuodesta 2017 lähtien sitä on löydetty hirvistä ja susista myös lännempänä. Se voi tarttua koiraan, joka syö raakoja hirven tai poron sisäelimiä, etenkin keuhkoja, ja tämäkin on yksi syy siihen, että metsästyskoirat saavat säännöllisen heisimatolääkityksen pratsikvantelilla.",
    sv: "Inälvsparasiter är ovanliga hos finländska sällskapshundar och -katter – i en studie från 2024 hittades de hos ungefär 3,5 % av sällskapshundarna och -katterna som var äldre än sex månader (men hos 41 % av katterna på katthem) – vilket är ett av skälen till att det är vettigt att testa före behandling. Spolmask (Toxocara) är den vanligaste skadliga masken hos både hundar och katter, och unga djur är de som oftast bär på den. Spolmask är zoonotisk – den kan smitta människor, särskilt små barn – vilket är ett gott skäl att avmaska unga djur ordentligt och att genast plocka upp efter sitt djur. Bandmask förekommer främst hos djur som äter gnagare eller rått kött, eller som har loppor (eller, hos hundar, löss). Giardia är en encellig parasit som orsakar diarré och sprids via förorenat vatten och förorenad miljö. Hakmask hittas bara då och då hos finländska hundar, och piskmask är sällsynt. Rävens farliga dvärgbandmask, Echinococcus multilocularis, har inte påträffats i Finland – införselreglerna för hundar som reser finns just för att det ska förbli så. En besläktad art, älgechinokocken (E. canadensis), cirkulerar mellan varg och älg, ren och skogsvildren, främst i östra och nordöstra Finland, men sedan 2017 har den också påträffats hos älg och varg längre västerut. Den kan smitta hundar som äter råa inälvor av älg eller ren, särskilt lungor, vilket är ytterligare ett skäl till att jakthundar får regelbunden bandmaskbehandling med prazikvantel.",
    en: "Intestinal parasites are uncommon in Finnish pet dogs and cats — a 2024 study found them in about 3.5% of pet dogs and cats over six months old (but in 41% of shelter cats) — which is one reason why testing before treating makes sense. Roundworms (Toxocara) are the most common harmful worm in both dogs and cats, and young animals are the most likely to carry them. They are zoonotic — they can infect people, particularly small children — which is a good reason to deworm young animals properly and to pick up your pet’s faeces promptly. Tapeworms occur mainly in animals that eat rodents or raw meat, or that have fleas (or, in dogs, lice). Giardia is a protozoan that causes diarrhoea and spreads through contaminated water and surroundings. Hookworms are found in Finnish dogs only occasionally, and whipworms are rare. The dangerous fox tapeworm Echinococcus multilocularis has not been found in Finland — the import rules for travelling dogs exist precisely to keep it that way. A related species, the moose tapeworm (E. canadensis), circulates between wolves and moose, reindeer and wild forest reindeer, mainly in eastern and north-eastern Finland, but since 2017 it has also been found in moose and wolves further west. It can infect dogs that eat raw moose or reindeer offal, especially lungs, which is one more reason hunting dogs get regular tapeworm treatment with praziquantel."
  },
  "article.deworming.product.title": {
    fi: "Mikä matolääke kannattaa valita – tabletti, pasta vai spot-on?",
    sv: "Vilket maskmedel ska jag välja – tablett, pasta eller spot-on?",
    en: "Which dewormer should I use — tablet, paste or spot-on?"
  },
  "article.deworming.product.text": {
    fi: "Oikea valmiste riippuu siitä, mitä loisia halutaan häätää. Suolinkaisiin tehoavat fenbendatsoli, flubendatsoli, febanteeli, pyranteeli, milbemysiini ja emodepsidi. Pratsikvanteli tehoaa kaikkiin yleisiin heisimatoihin, myös ekinokokkeihin, kun taas fenbendatsoli ja flubendatsoli tehoavat vain osaan heisimadoista (Taenia-heisimatoihin, kun lääkettä annetaan kolmena päivänä). Yhdistelmävalmisteet tehoavat molempiin. Niskan iholle annosteltavat spot-on-valmisteet eli paikallisvaleluliuokset ovat käteviä kissoille, jotka eivät suostu ottamaan tabletteja, ja pastat on helppo annostella koiran- ja kissanpennuille. Suomessa useita matolääkkeitä saa apteekista ilman reseptiä – esimerkiksi fenbendatsoli- ja flubendatsolivalmisteita, koirille tarkoitettua pyranteelipastaa, kissoille Drontal vet -tabletteja (pyranteeli ja pratsikvanteli), koirille Drontal Comp -tabletteja tai Dronbits-valmistetta (febanteeli, pyranteeli ja pratsikvanteli) sekä kissoille Dronspot-paikallisvaleluliuosta (emodepsidi ja pratsikvanteli). Muut, kuten Milbemax, Profender sekä yhdistelmävalmisteet, jotka torjuvat myös kirppuja tai punkkeja, vaativat eläinlääkärin reseptin. Annos määräytyy eläimen painon mukaan ja valmiste häädettävän loisen mukaan – kysy siis meiltä, mikä valmiste sopii lemmikillesi, etenkin jos kyseessä on kissan- tai koiranpentu, tiine eläin tai eläin, jolla on muu lääkitys.",
    sv: "Rätt preparat beror på vilka parasiter du vill komma åt. Spolmask svarar på fenbendazol, flubendazol, febantel, pyrantel, milbemycin eller emodepsid. Prazikvantel verkar mot alla vanliga bandmaskar, även Echinococcus, medan fenbendazol och flubendazol bara verkar mot en del bandmaskar (Taenia, när medlet ges i tre dagar). Kombinationspreparat täcker båda. Spot-on-preparat som droppas i nacken är praktiska för katter som inte tar tabletter, och pasta är lätt att dosera till valpar och kattungar. I Finland säljs flera maskmedel receptfritt på apotek – till exempel fenbendazol- och flubendazolpreparat, en pyrantelpasta för hundar, Drontal vet-tabletter för katter (pyrantel och prazikvantel), Drontal Comp eller Dronbits för hundar (febantel, pyrantel och prazikvantel) och spot-on-preparatet Dronspot för katter (emodepsid och prazikvantel). Andra, till exempel Milbemax, Profender och kombinationspreparat som också verkar mot loppor eller fästingar, kräver recept från veterinären. Dosen bestäms av kroppsvikten och preparatet väljs efter parasit – så fråga oss vilket preparat som passar ditt djur, i synnerhet när det gäller kattungar, valpar, dräktiga djur och djur som får annan medicin.",
    en: "The right product depends on which parasites you are targeting. Roundworms respond to fenbendazole, flubendazole, febantel, pyrantel, milbemycin or emodepside. Praziquantel covers all common tapeworms, including Echinococcus, whereas fenbendazole and flubendazole act only on some tapeworms (Taenia, when given for three days). Combination products cover both. Spot-on products applied to the neck are convenient for cats that will not take tablets, and pastes are easy to dose for puppies and kittens. In Finland, several dewormers are sold at pharmacies without prescription — for example fenbendazole and flubendazole products, a pyrantel paste for dogs, Drontal vet tablets for cats (pyrantel and praziquantel), Drontal Comp or Dronbits for dogs (febantel, pyrantel and praziquantel) and the Dronspot spot-on for cats (emodepside and praziquantel). Others, such as Milbemax, Profender and combination products that also treat fleas or ticks, require a veterinary prescription. The dose depends on body weight and the choice of product on the parasite — so ask us which product fits your pet, especially for kittens, puppies, pregnant animals and animals on other medication."
  },
  "article.deworming.vaccine.title": {
    fi: "Pitääkö madottaa ennen rokotusta?",
    sv: "Ska jag avmaska före vaccinationen?",
    en: "Should I deworm before vaccination?"
  },
  "article.deworming.vaccine.text": {
    fi: "Koiran- ja kissanpennuilla madotusohjelma osuu luontevasti rokotuskäyntien tienoille, ja siinä pysyminen on hyvä käytäntö. Oireeton loistartunta ei kuitenkaan ole syy siirtää rokotusta: vuoden 2024 tutkimuksessa kissanpennut, joilla oli oireeton suolistoloistartunta (enimmäkseen suolinkaisia), saivat kissaruttorokotteesta (panleukopenia) yhtä hyvän vasteen kuin loisettomat pennut. Tervettä aikuista ei tarvitse madottaa vain siksi, että rokotus on ajankohtainen – tuo sen sijaan ulostenäyte, niin järjestämme sen laboratoriotutkimuksen.",
    sv: "För valpar och kattungar infaller avmaskningsschemat naturligt runt vaccinationsbesöken, och det är god praxis att hålla sig till det. En symtomfri parasitinfektion är ändå inget skäl att skjuta upp vaccinationen: i en studie från 2024 svarade kattungar med symtomfria inälvsparasiter (främst spolmask) lika bra på vaccinet mot kattpest (panleukopeni) som parasitfria kattungar. För friska vuxna djur behöver man inte avmaska bara för att en vaccination står på tur – ta med ett avföringsprov i stället, så ordnar vi laboratorieundersökningen.",
    en: "For puppies and kittens, the deworming schedule naturally falls around the vaccination visits, and keeping to it is good practice. A symptom-free parasite infection is not, however, a reason to postpone vaccination: in a 2024 study, kittens with symptom-free intestinal parasites (mostly roundworms) responded to the panleukopenia vaccine as well as parasite-free kittens. For healthy adults it is not necessary to deworm just because a vaccination is due — bring a faecal sample instead and we will arrange the laboratory examination."
  },
  "article.deworming.travel.title": {
    fi: "Mikä on matkustavan koiran lakisääteinen heisimatolääkitys?",
    sv: "Vilken bandmaskbehandling krävs enligt lag för hundar som reser?",
    en: "What is the legal tapeworm treatment for dogs that travel?"
  },
  "article.deworming.travel.text": {
    fi: "Jokainen ulkomailta Suomeen tuleva koira – myös pennut – on lain mukaan lääkittävä myyräekinokokkia (Echinococcus multilocularis) vastaan pratsikvantelilla tai yhtä tehokkaalla valmisteella. Tähän on kaksi tapaa. Kertalääkitys: eläinlääkäri Suomen ulkopuolella antaa lääkkeen 1–5 vuorokautta (24–120 tuntia) ennen koiran saapumista Suomeen ja merkitsee sen lemmikkieläinpassiin. Tämä koskee myös Ruotsista tulevia koiria, Vaasa–Uumaja-lautalla saapuvat mukaan lukien. 28 vuorokauden sääntö: se on tarkoitettu koirille, jotka matkustavat usein EU-maissa, Norjassa tai Sveitsissä (sääntöä ei voi aloittaa Sveitsissä). Ennen matkaa eläinlääkäri – yleensä täällä Suomessa – antaa kaksi lääkitystä, joiden väli on 1–28 vuorokautta, ja merkitsee passiin, että käytetään 28 vuorokauden sääntöä. Niin kauan kuin matkustaminen jatkuu, koira lääkitään enintään 28 vuorokauden välein. Kun matkustaminen päättyy, eläinlääkäri Suomessa antaa viimeisen lääkityksen enintään 28 vuorokauden kuluttua edellisestä. Jokaisen lääkityksen antaa eläinlääkäri, ja se merkitään passiin. Jos lääkitysten väli venyy yli 28 vuorokauden, sääntö on aloitettava alusta. Poikkeukset: lääkitystä ei tarvita koiralle, joka tulee Suomeen suoraan Norjasta, Irlannista tai Maltalta – mutta Norjasta Ruotsin kautta Suomeen palaava koira tarvitsee sen. Lähtö Suomesta: suoraan Suomesta Norjaan, Irlantiin, Maltalle tai Isoon-Britanniaan matkustava koira ei myöskään tarvitse heisimatolääkitystä sinne saapuessaan. Jos reitti kulkee Ruotsin tai muun sellaisen maan kautta, jossa myyräekinokokkia esiintyy, Norja hyväksyy 28 vuorokauden säännön, mutta Irlanti, Malta ja Iso-Britannia edellyttävät kertalääkitystä 1–5 vuorokautta ennen saapumista. Kissat ja fretit eivät tarvitse tätä lääkitystä. Säännöt tarkistettu syyskuussa 2026. Kaikki matkustusvaatimukset löytyvät EU-lemmikkipassia käsittelevältä sivultamme.",
    sv: "Alla hundar – också valpar – som kommer till Finland från utlandet måste enligt lag behandlas mot rävens dvärgbandmask (Echinococcus multilocularis) med prazikvantel eller ett lika effektivt preparat. Det finns två sätt att göra det. Engångsbehandling: en veterinär utanför Finland ger dosen 1–5 dygn (24–120 timmar) innan hunden anländer och antecknar den i sällskapsdjurspasset. Det gäller också hundar som kommer från Sverige, även med färjan Vasa–Umeå. 28-dygnsregeln: den är avsedd för hundar som reser ofta inom EU, i Norge eller i Schweiz (den kan inte påbörjas i Schweiz). Före resan ger en veterinär – vanligen här i Finland – två doser med 1–28 dygns mellanrum och antecknar i passet att 28-dygnsregeln följs. Så länge resandet pågår behandlas hunden med högst 28 dygns mellanrum. När resandet tar slut ger en veterinär i Finland en sista dos högst 28 dygn efter den föregående. Varje dos ges av en veterinär och antecknas i passet, och blir mellanrummet längre måste man börja om från början. Undantag: ingen behandling behövs för en hund som kommer direkt till Finland från Norge, Irland eller Malta – men en hund som reser hem från Norge via Sverige behöver den. Resor från Finland: en hund som reser direkt från Finland till Norge, Irland, Malta eller Storbritannien behöver inte heller någon bandmaskbehandling för inresan dit. Går resan via Sverige eller något annat land där rävens dvärgbandmask förekommer, godkänner Norge 28-dygnsregeln, men Irland, Malta och Storbritannien kräver en engångsdos 1–5 dygn före ankomsten. Katter och illrar behöver inte behandlas. Reglerna kontrollerades i september 2026. Alla resekrav hittar du på vår sida om EU:s sällskapsdjurspass.",
    en: "By law, every dog coming to Finland from abroad — puppies included — must be treated against the fox tapeworm (Echinococcus multilocularis) with praziquantel or an equally effective product. There are two ways to do this. Single treatment: a vet outside Finland gives the dose 1–5 days (24–120 hours) before the dog arrives and records it in the pet passport. This also applies to Sweden, including the Vaasa–Umeå ferry. 28-day scheme: this is for dogs that travel often in EU countries, Norway or Switzerland (the scheme cannot be started in Switzerland). Before the trip, a vet — usually here in Finland — gives two doses 1–28 days apart and notes in the passport that the 28-day rule is being used. For as long as the travelling continues, the dog is treated at intervals of no more than 28 days. When it ends, a vet in Finland gives a final dose no more than 28 days after the previous one. Every dose is given by a vet and entered in the passport, and a longer gap means starting the scheme again. Exemptions: no treatment is needed for a dog coming directly from Norway, Ireland or Malta — but a dog travelling home from Norway via Sweden does need it. Leaving Finland: a dog travelling directly from Finland to Norway, Ireland, Malta or Great Britain needs no tapeworm treatment there either. If the route passes through Sweden or another country where the fox tapeworm occurs, Norway accepts the 28-day scheme, but Ireland, Malta and Great Britain require a single dose 1–5 days before arrival. Cats and ferrets do not need the treatment. Rules checked in September 2026. The full travel requirements are on our EU pet passport page."
  },
  "article.deworming.cta": {
    fi: "Arvioimme mielellämme lemmikkisi todellisen madotustarpeen ilman turhaa lääkitystä. Varaa aika ulostenäytteen tutkimukseen tai madotukseen Eläinklinikka Saarelta – yhdessä varmistamme, että lemmikkisi lääkitään oikeaan aikaan.",
    sv: "Vi bedömer gärna ditt djurs verkliga behov av avmaskning – utan onödig medicinering. Boka en kontroll med avföringsprov eller en avmaskning hos Djurklinik Saari, så ser vi tillsammans till att ditt djur behandlas vid rätt tidpunkt.",
    en: "We are happy to assess how much deworming your pet really needs, without unnecessary medication. Book a faecal-sample check or a deworming at Saari Animal Clinic — together we will make sure your pet is treated at the right time."
  },

  // --- Article 22: IBD vs Lymphoma ---
  'article.ibdlymphoma.tag': {
    fi: 'Terveys',
    sv: 'Hälsa',
    en: 'Health'
  },
  'article.ibdlymphoma.title': {
    fi: 'IBD vai lymfooma? – eläinlääketieteen vaikein erotusdiagnoosi',
    sv: 'IBD eller lymfom? – veterinärmedicinens svåraste differentialdiagnos',
    en: 'IBD or Lymphoma? — The Most Difficult Differential Diagnosis in Veterinary Medicine'
  },
  'article.ibdlymphoma.intro': {
    fi: 'Tulehduksellinen suolistosairaus (IBD) ja matala-asteinen suoliston lymfooma ovat eläinlääketieteen vaikeimpia erotusdiagnooseja – erityisesti kissoilla. Molemmat aiheuttavat kroonista oksentelua, ripulia, laihtumista ja ruokahaluttomuutta, ja ne esiintyvät tyypillisesti keski-ikäisillä ja iäkkäillä eläimillä. Oikea diagnoosi on ratkaiseva, sillä hoidot eroavat merkittävästi: IBD:tä hoidetaan immunosuppressiolla, lymfoomaa kemoterapialla.',
    sv: 'Inflammatorisk tarmsjukdom (IBD) och låggradig intestinal lymfom är bland de svåraste differentialdiagnoserna inom veterinärmedicin – särskilt hos katter. Båda orsakar kroniska kräkningar, diarré, viktminskning och aptitlöshet, och drabbar typiskt medelålders och äldre djur. Korrekt diagnos är avgörande, eftersom behandlingarna skiljer sig markant: IBD behandlas med immunsuppression, lymfom med kemoterapi.',
    en: 'Inflammatory bowel disease (IBD) and low-grade intestinal lymphoma are among the most difficult differential diagnoses in veterinary medicine — especially in cats. Both cause chronic vomiting, diarrhea, weight loss, and loss of appetite, and typically occur in middle-aged and older animals. Accurate diagnosis is critical, as treatments differ significantly: IBD is treated with immunosuppression, lymphoma with chemotherapy.'
  },
  'article.ibdlymphoma.challenge.title': {
    fi: 'Miksi erottaminen on niin vaikeaa',
    sv: 'Varför det är så svårt att skilja dem åt',
    en: 'Why Differentiation Is So Difficult'
  },
  'article.ibdlymphoma.challenge.text': {
    fi: 'Vakava IBD ja matala-asteinen lymfooma näyttävät mikroskoopissa lähes identtisiltä – molemmat ilmenevät pienten lymfosyyttien tunkeutumisena suoliston limakalvoon. Tutkimuksissa patologit ovat erimielisiä diagnoosista merkittävässä osassa tapauksista pelkän perinteisen värjäyksen perusteella. Lisäksi krooninen tulehdus (IBD) ja lymfooma esiintyvät usein rinnakkain, ja on esitetty, että IBD saattaa joissakin tapauksissa edetä lymfoomaksi – suoraa näyttöä tästä muutoksesta ei kuitenkaan vielä ole. Kyseessä ei ehkä ole kaksi täysin erillistä sairautta vaan mahdollinen jatkumo.',
    sv: 'Allvarlig lymfocytär-plasmacytär IBD och låggradig lymfom ser nästan identiska ut i mikroskop – båda visar infiltration av små lymfocyter i tarmslemhinnan. Studier visar att patologer är oeniga om diagnosen i en betydande andel fall baserat enbart på konventionell färgning. Dessutom förekommer kronisk inflammation (IBD) och lymfom ofta samtidigt, och det har föreslagits att IBD i vissa fall kan utvecklas till lymfom – men det finns ännu inga direkta bevis för en sådan omvandling. Det handlar kanske inte om två helt separata sjukdomar utan om ett möjligt kontinuum.',
    en: 'Severe lymphocytic-plasmacytic IBD and low-grade lymphoma look nearly identical under the microscope — both appear as infiltration of small lymphocytes into the intestinal mucosa. Studies show that pathologists disagree on the diagnosis in a significant proportion of cases based on conventional staining alone. Furthermore, chronic inflammation (IBD) and lymphoma often occur together, and it has been proposed that IBD may in some cases progress to lymphoma — though there is not yet direct evidence of such transformation. These may not be two entirely separate diseases but rather a possible continuum.'
  },
  'article.ibdlymphoma.diagnosis.title': {
    fi: 'Diagnoosi vaatii kehittyneitä menetelmiä',
    sv: 'Diagnosen kräver avancerade metoder',
    en: 'Diagnosis Requires Advanced Methods'
  },
  'article.ibdlymphoma.diagnosis.text': {
    fi: 'Ultraäänitutkimus ohjaa koepalanottoa, mutta ei yksinään erota IBD:tä lymfoomasta. Kudosnäyte tähystyksellä tai kirurgisella koepalanotolla on välttämätön. Pelkkä histopatologia (H&E-värjäys) tunnistaa lymfooman vain 60–75 %:n herkkyydellä. <strong>Immunohistokemia</strong> (CD3/CD20) tunnistaa, onko solukko T- vai B-soluperäistä – matala-asteinen lymfooma on 80–95 % tapauksista T-soluperäistä. <strong>PARR-testi</strong> (PCR-klonaalisuustesti) on hyödyllinen lisätutkimus, joka tunnistaa, onko solukko monoklonaalista (viittaa lymfoomaan) vai polyklonaalista (tulehdus). Sitä ei kuitenkaan käytetä yksinään, sillä sen erottelukyky etenkin kissoilla on rajallinen. Diagnoosin kulmakivi on histopatologian ja immunohistokemian yhdistelmä, jota PARR täydentää epäselvissä tapauksissa. Yhdistelmällä päästään noin 80–85 %:n diagnostiseen tarkkuuteen.',
    sv: 'Ultraljud vägleder provtagningen, men kan inte ensamt skilja IBD från lymfom. Vävnadsprov via endoskopi eller kirurgisk biopsi är nödvändigt. Enbart histopatologi (H&E-färgning) identifierar lymfom med bara 60–75 % sensitivitet. <strong>Immunhistokemi</strong> (CD3/CD20) identifierar om cellpopulationen är T- eller B-cellsursprung – låggradig lymfom är T-cellsursprung i 80–95 % av fallen. <strong>PARR-klonalitetstest</strong> (PCR) är ett användbart tilläggsprov som identifierar om cellpopulationen är monoklonal (tyder på lymfom) eller polyklonal (inflammation). Det används dock inte ensamt, eftersom dess förmåga att skilja inflammation från lymfom är begränsad, särskilt hos katter. Diagnosens hörnsten är kombinationen av histopatologi och immunhistokemi, som PARR kompletterar i oklara fall. Kombinationen når en diagnostisk noggrannhet på cirka 80–85 %.',
    en: 'Ultrasound guides biopsy site selection but cannot alone differentiate IBD from lymphoma. Tissue sampling via endoscopy or surgical biopsy is essential. Histopathology alone (H&E staining) identifies lymphoma with only 60–75% sensitivity. <strong>Immunohistochemistry</strong> (CD3/CD20) identifies whether the cell population is T-cell or B-cell in origin — low-grade lymphoma is T-cell in origin in 80–95% of cases. <strong>PARR clonality testing</strong> (PCR) is a useful ancillary test that identifies whether the population is monoclonal (suggesting lymphoma) or polyclonal (inflammation). However, it is not used on its own, as its ability to distinguish inflammation from lymphoma is limited — especially in cats. The cornerstone of diagnosis is the combination of histopathology and immunohistochemistry, which PARR complements in ambiguous cases. Together they reach about 80–85% diagnostic accuracy.'
  },
  'article.ibdlymphoma.treatment.title': {
    fi: 'Hoito ja ennuste',
    sv: 'Behandling och prognos',
    en: 'Treatment and Prognosis'
  },
  'article.ibdlymphoma.treatment.text': {
    fi: '<strong>IBD</strong>:n hoito perustuu ruokavaliomuutokseen (hydrolysoitu proteiini) ja lääkitykseen (prednisoloni, budesonidi). Ennuste on yleensä hyvä – useimmat eläimet elävät vuosia oikealla hoidolla. <strong>Matala-asteisen lymfooman</strong> ennuste on huomattavasti parempi kuin korkea-asteisen: hoitovaste on 85–96 %, ja mediaanielinaika on 1,5–2,5 vuotta, parhaimmillaan yli 5 vuotta. <strong>Korkea-asteisen lymfooman</strong> ennuste on varovaisempi (mediaanielinaika 1,5–6 kuukautta).',
    sv: '<strong>IBD</strong> behandlas med kostförändring (hydrolyserat protein) och immunsuppression (prednisolon, budesonid). Prognosen är vanligtvis god – de flesta djur lever i flera år med rätt behandling. <strong>Låggradig lymfom</strong> har en betydligt bättre prognos än höggradig: behandlingssvaret är 85–96 %, och medianöverlevnaden är 1,5–2,5 år, i bästa fall över 5 år. <strong>Höggradig lymfom</strong> har en mer försiktig prognos (medianöverlevnad 1,5–6 månader).',
    en: '<strong>IBD</strong> is treated with dietary change (hydrolyzed protein) and immunosuppression (prednisolone, budesonide). The prognosis is generally good — most animals live for years with proper treatment. <strong>Low-grade lymphoma</strong> has a significantly better prognosis than high-grade: the response rate is 85–96%, and median survival is 1.5–2.5 years, with some animals surviving over 5 years. <strong>High-grade lymphoma</strong> has a more guarded prognosis (median survival 1.5–6 months).'
  },
  'article.ibdlymphoma.why.title': {
    fi: 'Miksi oikea diagnoosi on tärkeä',
    sv: 'Varför korrekt diagnos är viktig',
    en: 'Why Accurate Diagnosis Matters'
  },
  'article.ibdlymphoma.why.text': {
    fi: 'Jos lymfoomaa hoidetaan IBD:nä, kortikosteroidit voivat aluksi lievittää oireita ja antaa väärän turvallisuudentunteen. Immunosuppression lisääminen (esim. siklosporiini) voi heikentää kasvaimen vastaista immuniteettia ja nopeuttaa lymfooman etenemistä. Toisaalta IBD:n virheellinen hoito kemoterapialla altistaa eläimen tarpeettomille sivuvaikutuksille. Suosittelemme kehittyneitä diagnostisia tutkimuksia kaikissa epäselvissä tapauksissa – ota yhteyttä klinikkaamme.',
    sv: 'Om lymfom behandlas som IBD kan kortikosteroider initialt lindra symtomen och ge en falsk trygghetskänsla. Tillägg av immunsuppression (t.ex. ciklosporin) kan försvaga immunförsvaret mot tumören och påskynda lymfomets progression. Å andra sidan utsätter felaktig kemoterapibehandling av IBD djuret för onödiga biverkningar. Vi rekommenderar avancerade diagnostiska undersökningar i alla oklara fall – kontakta vår klinik.',
    en: 'If lymphoma is treated as IBD, corticosteroids may initially relieve symptoms and create a false sense of security. Adding immunosuppression (e.g., cyclosporine) can weaken anti-tumor immunity and accelerate lymphoma progression. Conversely, incorrectly treating IBD with chemotherapy exposes the animal to unnecessary side effects. We recommend advanced diagnostic testing in all equivocal cases — contact our clinic.'
  },

  // --- Article 23: Hypothermia Prevention ---
  'article.hypothermia.tag': {
    fi: 'Anestesia',
    sv: 'Anestesi',
    en: 'Anesthesia'
  },
  'article.hypothermia.title': {
    fi: 'Hypotermian ehkäisy – miksi aktiivinen lämmitys on tärkeää',
    sv: 'Förebyggande av hypotermi – varför aktiv uppvärmning är viktig',
    en: 'Hypothermia Prevention — Why Active Warming Matters'
  },
  'article.hypothermia.intro': {
    fi: 'Hypotermia eli alilämpöisyys on yksi anestesian yleisimmistä komplikaatioista. Kahdessa espanjalaisessa tutkimuksessa 84 %:lla koirista ja 97 %:lla kissoista ruumiinlämpö oli anestesian lopussa alle 38,5 °C (tutkimuksissa käytetty normaalin ruumiinlämmön alaraja). Koirista 32 %:lla ja kissoista 71 %:lla lämpö oli alle 36,5 °C. Anestesia-aineet heikentävät elimistön lämmönsäätelyä, verisuonet laajenevat ja pienet potilaat menettävät lämpöä nopeasti. Alilämpöisyys hidastaa lääkeaineiden aineenvaihduntaa ja pitkittää anestesiasta heräämistä, ja se voi heikentää veren hyytymistä ja sydämen toimintaa. Ihmisillä se lisää myös haavainfektioiden riskiä.',
    sv: 'Hypotermi, alltså nedkylning, är en av de vanligaste komplikationerna vid anestesi. I två spanska studier var kroppstemperaturen vid anestesins slut under 38,5 °C (studiernas nedre gräns för normal temperatur) hos 84 % av hundarna och 97 % av katterna, och under 36,5 °C hos 32 % av hundarna och 71 % av katterna. Anestesimedel försämrar kroppens temperaturreglering, blodkärlen vidgas och små patienter förlorar snabbt värme. Nedkylning bromsar kroppens nedbrytning av läkemedel, förlänger uppvaknandet och kan försämra blodets levringsförmåga och hjärtats funktion. Hos människor ökar den dessutom risken för sårinfektion.',
    en: 'Hypothermia is one of the most common complications of anesthesia. In two Spanish studies, body temperature at the end of anesthesia was below 38.5 °C (the studies’ lower limit of normal) in 84% of dogs and 97% of cats, and below 36.5 °C in 32% of dogs and 71% of cats. Anesthetic agents impair the body’s temperature regulation, blood vessels dilate, and small patients lose heat rapidly. Hypothermia slows drug metabolism, prolongs recovery, and can impair blood clotting and heart function; in people, it also increases the risk of wound infection.'
  },
  'article.hypothermia.risks.title': {
    fi: 'Hypotermian seuraukset',
    sv: 'Konsekvenser av hypotermi',
    en: 'Consequences of Hypothermia'
  },
  'article.hypothermia.risks.text': {
    fi: 'Jäähtyminen hidastaa anestesia-aineiden poistumista elimistöstä, ja koirilla matalamman ruumiinlämmön on havaittu liittyvän hitaampaan heräämiseen. Kylmä elimistö tarvitsee myös vähemmän anestesia-ainetta: kun koiran ruumiinlämpö on 34,5 °C, anestesiakaasuna käytettävää isofluraania tarvitaan noin neljänneksen vähemmän. Siksi tavanomaisella annoksella anestesiasta voi tulla liian syvä. Kylmyys heikentää veren hyytymistä: ihmisten leikkauksissa jo alle 1 °C:n jäähtyminen lisäsi verenvuotoa noin 16 %. Ihmisillä noin 2 °C matalampi kehon ydinlämpötila kolminkertaisti haavainfektioiden yleisyyden suolistoleikkausten jälkeen (19 % vs. 6 %). Koirilla ja kissoilla tutkimusten tulokset ovat vaihdelleet. Syvä jäähtyminen – ihmisillä alle noin 30–32 °C – voi johtaa sydänpysähdykseen.',
    sv: 'Nedkylning gör att kroppen eliminerar anestesimedlen långsammare, och hos hundar har en lägre kroppstemperatur kopplats till ett långsammare uppvaknande. En nedkyld kropp behöver också mindre anestesimedel – vid en kroppstemperatur på 34,5 °C behöver hundar cirka en fjärdedel mindre av anestesigasen isofluran – och därför kan den vanliga dosen göra anestesin för djup. Kyla försämrar blodets levringsförmåga: vid operationer på människor ökade redan en temperatursänkning på mindre än 1 °C blodförlusten med cirka 16 %. Hos människor tredubblades andelen sårinfektioner efter tarmkirurgi när kärntemperaturen var cirka 2 °C lägre (19 % mot 6 %); hos hundar och katter går resultaten isär. Djup nedkylning – hos människor under cirka 30–32 °C – kan leda till hjärtstillestånd.',
    en: 'Cooling slows how quickly the body clears anesthetic drugs, and in dogs, a lower body temperature has been linked to slower recovery. A cold body also needs less anesthetic — at 34.5 °C, dogs require about a quarter less of the anesthetic gas isoflurane — so the usual dose can make anesthesia too deep. Cold impairs blood clotting: in human surgery, even a temperature drop of less than 1 °C increased blood loss by about 16%. In people, a core temperature about 2 °C lower tripled the rate of wound infection after bowel surgery (19% vs. 6%); in dogs and cats, results are mixed. Deep cooling — in people, below about 30–32 °C — can lead to cardiac arrest.'
  },
  'article.hypothermia.warming.title': {
    fi: 'Aktiivinen lämmitys – lämpöpuhaltimet',
    sv: 'Aktiv uppvärmning – varmluftsvärmare',
    en: 'Active Warming — Forced-Air Warmers'
  },
  'article.hypothermia.warming.text': {
    fi: 'Klinikallamme on kolme lämpöpuhallinta, jotka puhaltavat lämmintä ilmaa potilaan ympärille kertakäyttöisen lämpöpeiton kautta. Yhdysvaltalaisen eläinsairaalajärjestön AAHA:n (American Animal Hospital Association) suosituksissa tehokkaimmiksi lämmitysmenetelmiksi mainitaan lämminilmajärjestelmät ja vesikiertoiset lämpöpeitot. Kahdeksalla koiralla tehdyssä tutkimuksessa koiran päälle asetettu lämpöpuhallinpeitto rajoitti lämmönhukkaa paremmin kuin alle asetettu pyyhe tai lämminvesipatja. Pienissä tutkimuksissa pelkät lämmitetyt suonensisäiset nesteet eivät estäneet alilämpöisyyttä kissoilla eivätkä koirilla, ja eristäminen (peitot, sukat) hidastaa jäähtymistä mutta ei pysäytä sitä. Siksi yhdistämme lämpöpuhaltimen, lämmitetyt nesteet ja eristämisen.',
    sv: 'På vår klinik har vi tre varmluftsvärmare, som blåser varm luft runt patienten genom en engångsfilt. I riktlinjerna från American Animal Hospital Association (AAHA) nämns varmluftssystem och filtar med cirkulerande varmt vatten som de mest effektiva uppvärmningsmetoderna. I en studie med åtta hundar begränsade en varmluftsfilt ovanpå hunden värmeförlusten bättre än en handduk eller en varmvattenmatta under hunden. I små studier förhindrade uppvärmda intravenösa vätskor ensamma inte hypotermi hos katter eller hundar, och isolering (filtar, strumpor) bromsar nedkylningen men stoppar den inte. Därför kombinerar vi varmluftsuppvärmning med uppvärmda vätskor och isolering.',
    en: 'Our clinic has three forced-air warmers, which blow warm air around the patient through a single-use blanket. Guidelines from the American Animal Hospital Association (AAHA) name warm-air systems and circulating warm-water blankets as the most effective heating methods. In a study of eight dogs, a forced-air blanket over the dog limited heat loss better than a towel or a warm-water pad underneath. In small studies, warmed IV fluids alone did not prevent hypothermia in cats or dogs, and insulation (blankets, socks) slows cooling but does not stop it. That is why we combine forced-air warming with warmed fluids and insulation.'
  },
  'article.hypothermia.recovery.title': {
    fi: 'Valvonta heräämisvaiheessa',
    sv: 'Övervakning under uppvaknandet',
    en: 'Monitoring During Recovery'
  },
  'article.hypothermia.recovery.text': {
    fi: 'Anestesiaan liittyvät kuolemat ovat harvinaisia: suurissa brittiläisissä ja maailmanlaajuisissa tutkimuksissa kuolleisuus oli alle 1 %. Silti koirilla 47–81 % ja kissoilla 61–75 % näistä kuolemista tapahtui toimenpiteen jälkeen – brittiläisessä tutkimuksessa useimmiten kolmen ensimmäisen tunnin aikana. AAHA suosittelee valvomaan heräämisvaiheessa olevia potilaita yhtä tarkasti kuin anestesian aikana ja lämmittämään niitä koko heräämisen ajan. Jatkamme potilaan lämmittämistä ja seuraamme sen lämpötilaa, happisaturaatiota ja verenpainetta, kunnes se on täysin hereillä ja sen ruumiinlämpö on palautunut normaaliksi.',
    sv: 'Anestesirelaterade dödsfall är sällsynta: i stora studier från Storbritannien och runt om i världen drabbade de färre än 1 % av patienterna. Ändå inträffade 47–81 % av dessa dödsfall hos hundar och 61–75 % hos katter efter ingreppet – i den brittiska studien oftast under de tre första timmarna. AAHA rekommenderar att patienter under uppvaknandet övervakas lika noggrant som under själva anestesin och värms hela tiden. Vi fortsätter uppvärmningen och övervakar temperatur, syremättnad och blodtryck tills patienten är helt vaken och har normal kroppstemperatur igen.',
    en: 'Anesthesia-related deaths are rare: in large studies from the UK and around the world, they affected fewer than 1% of patients. Yet 47–81% of these deaths in dogs and 61–75% in cats occurred after the procedure — in the UK study, most often within the first three hours. AAHA recommends monitoring recovering patients as closely as during anesthesia and warming them throughout recovery. We continue warming the patient and monitor its temperature, oxygen saturation, and blood pressure until it is fully awake and its body temperature is back to normal.'
  },
  'article.hypothermia.safety.title': {
    fi: 'Turvallinen lämmitys',
    sv: 'Säker uppvärmning',
    en: 'Safe Warming'
  },
  'article.hypothermia.safety.text': {
    fi: 'Ihmisille tarkoitetut sähköiset lämpötyynyt ja kuumavesipullot ovat vaarallisia anestesiassa oleville eläimille – potilas ei pysty siirtymään pois liian kuumalta pinnalta eikä ilmaisemaan kipua. Palovammoja on dokumentoitu: neljä koiraa sai niitä anestesian aikana lämpimällä vedellä täytetyistä leikkauskäsineistä. AAHA varoittaa: ”Älä käytä lisälämmönlähteitä, joita ei ole suunniteltu nimenomaan anestesiassa oleville potilaille, sillä ne voivat aiheuttaa vakavia palovammoja.” Lämpöpuhaltimet ja muut anestesiapotilaille suunnitellut laitteet ovat oikea valinta, kun niitä käytetään ohjeiden mukaisesti.',
    sv: 'Elektriska värmedynor och värmeflaskor avsedda för människor är farliga för sövda djur – djuren kan varken flytta sig bort från en överhettad yta eller visa smärta. Brännskador har dokumenterats: fyra sövda hundar skadades av operationshandskar fyllda med varmt vatten. AAHA varnar: ”Använd inte extra värmekällor som inte är särskilt utformade för sövda patienter, eftersom de kan orsaka allvarliga brännskador.” Varmluftsvärmare och andra apparater som är utformade för sövda patienter är rätt val när de används enligt anvisningarna.',
    en: 'Electric heating pads and hot-water bottles designed for people are dangerous for anesthetized animals — they cannot move away from an overheated surface or express pain. Burns have been documented: four anesthetized dogs were burned by surgical gloves filled with warm water. AAHA warns: “Do not use supplemental heat sources that are not designed specifically for anesthetized patients as they can cause severe thermal injury.” Forced-air warmers and other devices designed for anesthetized patients are the right choice when used as instructed.'
  },

  // --- Article 24: Anesthesia Safety ---
  'article.anesthesia.tag': {
    fi: 'Anestesia',
    sv: 'Anestesi',
    en: 'Anesthesia'
  },
  'article.anesthesia.title': {
    fi: 'Anestesiaturvallisuus – tilastot, riskit ja miten minimoimme ne',
    sv: 'Anestesisäkerhet – statistik, risker och hur vi minimerar dem',
    en: 'Anesthesia Safety — Statistics, Risks, and How We Minimize Them'
  },
  'article.anesthesia.intro': {
    fi: 'Anestesia on välttämätön osa kirurgiaa, hammashoitoa ja monia diagnostisia toimenpiteitä. Moni omistaja on siitä huolissaan, ja se on ymmärrettävää. Terveellä koiralla tai kissalla riski on kuitenkin pieni. Laaja brittiläinen CEPSAF-tutkimus (Brodbelt ym. 2008) kattoi vuosina 2002–2004 koirilla 98 036 ja kissoilla 79 178 anestesiaa ja sedaatiota. Tutkimuksessa kuoli 48 tunnin kuluessa anestesiaan tai sedaatioon liittyvistä syistä noin yksi koira 600:sta (0,17 %) ja yksi kissa 400:sta (0,24 %). Terveillä potilailla riski oli paljon pienempi: koirilla 0,05 % (1/1 849) ja kissoilla 0,11 % (1/895). Uudempi tutkimus (Redondo ym. 2024) kattoi 55 022 koirille tehtyä anestesiaa 405 klinikalla ja sairaalassa 21 maassa (yleisklinikat, lähetepotilaita hoitavat klinikat ja yliopistosairaalat), ja siinä luku oli 0,69 %. Lukuja ei voi verrata suoraan, koska potilaat ja määritelmät erosivat toisistaan.',
    sv: 'Anestesi är en nödvändig del av kirurgi, tandvård och många diagnostiska ingrepp. Många djurägare oroar sig inför den, och det är förståeligt. För en frisk hund eller katt är risken ändå låg. Den stora brittiska CEPSAF-studien (Brodbelt m.fl. 2008) omfattade 98 036 anestesier och sederingar hos hundar och 79 178 hos katter under åren 2002–2004. Ungefär 1 av 600 hundar (0,17 %) och 1 av 400 katter (0,24 %) dog inom 48 timmar av orsaker relaterade till anestesin eller sederingen. För friska patienter var risken betydligt lägre: 0,05 % (1 av 1 849) hos hundar och 0,11 % (1 av 895) hos katter. En nyare studie (Redondo m.fl. 2024) av 55 022 anestesier hos hundar vid 405 kliniker och djursjukhus i 21 länder (allmänpraktiserande kliniker, remisskliniker och universitetsdjursjukhus) rapporterade en siffra på 0,69 %. De två siffrorna kan inte jämföras direkt, eftersom patienterna och definitionerna skilde sig åt.',
    en: 'Anesthesia is an essential part of surgery, dentistry, and many diagnostic procedures. Many owners worry about it, and that is understandable. For a healthy dog or cat, however, the risk is low. In the large UK CEPSAF study (Brodbelt et al. 2008; 98,036 anesthetics and sedations in dogs and 79,178 in cats, 2002–2004), about 1 in 600 dogs (0.17%) and 1 in 400 cats (0.24%) died of causes related to anesthesia or sedation within 48 hours. For healthy patients, the risk was much lower: 0.05% (1 in 1,849) in dogs and 0.11% (1 in 895) in cats. A newer study (Redondo et al. 2024) of 55,022 anesthetics in dogs at 405 clinics and hospitals in 21 countries (general practices, referral practices, and university hospitals) reported a figure of 0.69%. The two figures cannot be compared directly, because the patients and the definitions differed.'
  },
  'article.anesthesia.risk.title': {
    fi: 'Riskitekijät ja ASA-luokitus',
    sv: 'Riskfaktorer och ASA-klassificering',
    en: 'Risk Factors and ASA Classification'
  },
  'article.anesthesia.risk.text': {
    fi: 'Potilaan terveydentila on yksi tärkeimmistä riskitekijöistä. Ennen anestesiaa potilaan kunto arvioidaan ASA-asteikolla (I–V). Terveillä potilailla (ASA I–II) riski on pieni, mutta sairailla (ASA III–V) se on moninkertainen: CEPSAF-tutkimuksessa koirilla 1,33 % ja kissoilla 1,40 %. Muita riskitekijöitä ovat päivystykselliset tai suunnittelemattomat toimenpiteet, vaativammat tai laajemmat toimenpiteet, korkea ikä, hyvin pieni kehonkoko (kissoilla myös erittäin suuri paino) sekä koirilla lihavuus. Brakykefaalisilla (lyhytkuonoisilla) koirilla komplikaatioiden riski anestesian aikana ja sen jälkeen on suurempi ahtaiden hengitysteiden vuoksi.',
    sv: 'Patientens hälsotillstånd är en av de viktigaste riskfaktorerna. Före anestesin graderas patientens tillstånd enligt ASA-skalan (I–V). Hos friska patienter (ASA I–II) är risken låg; hos sjuka patienter (ASA III–V) är den många gånger högre: i CEPSAF-studien 1,33 % hos hundar och 1,40 % hos katter. Andra riskfaktorer är akuta eller oplanerade ingrepp, mer komplicerade eller omfattande ingrepp, högre ålder, mycket liten kroppsstorlek (hos katter även mycket hög kroppsvikt) samt fetma hos hundar. Brakycefala (trubbnosiga) hundar har högre risk för komplikationer under och efter anestesin på grund av sina trånga luftvägar.',
    en: 'The patient’s health status is one of the most important risk factors. Before anesthesia, the patient’s condition is graded on the ASA scale (I–V). In healthy patients (ASA I–II) the risk is low; in sick patients (ASA III–V) it is many times higher: in the CEPSAF study, 1.33% in dogs and 1.40% in cats. Other risk factors include emergency or unscheduled procedures, more complex or major procedures, older age, very small body size (in cats, also very high body weight), and, in dogs, obesity. Brachycephalic (short-nosed) dogs have a higher risk of complications during and after anesthesia because of their narrow airways.'
  },
  'article.anesthesia.monitoring.title': {
    fi: 'Moderni valvonta pelastaa henkiä',
    sv: 'Modern övervakning räddar liv',
    en: 'Modern Monitoring Saves Lives'
  },
  'article.anesthesia.monitoring.text': {
    fi: 'Valvomme tarkasti jokaista anestesiassa olevaa potilasta. Monitorimme seuraavat sydämen rytmiä (EKG), veren happikyllästeisyyttä (pulssioksimetria), uloshengitysilman hiilidioksidia (kapnografia), verenpainetta (ei-invasiivinen mittaus) ja ruumiinlämpöä. Lisäksi meillä on kaksi hengityskonetta hengityksen tukemiseen, ja kuuntelemme sydäntä ennen toimenpidettä ja sen aikana. Tärkeintä on, että koulutettu henkilö tulkitsee monitorien tietoja ja reagoi muutoksiin – laitteet eivät korvaa valppasta ammattilaista. Valvonta jatkuu myös heräämisvaiheessa: CEPSAF-tutkimuksessa anestesiaan ja sedaatioon liittyvistä kuolemista koirilla 47 % ja kissoilla 61 % tapahtui toimenpiteen jälkeen, monet niistä kolmen ensimmäisen tunnin kuluessa anestesian päättymisestä.',
    sv: 'Vi övervakar varje patient noggrant under anestesin. Våra monitorer registrerar EKG (hjärtrytm), pulsoximetri (syremättnad), kapnografi (koldioxid i utandningsluften), icke-invasivt blodtryck och kroppstemperatur. Vi har också två respiratorer som stöder andningen, och vi lyssnar på hjärtat före och under ingreppet. Viktigast av allt är att en utbildad person tolkar monitorerna och reagerar på förändringar; apparaterna ersätter inte en vaksam yrkesperson. Övervakningen fortsätter under uppvaknandet: i CEPSAF-studien inträffade 47 % av de anestesi- och sederingsrelaterade dödsfallen hos hundar och 61 % hos katter efter ingreppet, många av dem inom de tre första timmarna efter att anestesin hade avslutats.',
    en: 'We closely monitor every patient under anesthesia. Our monitors track ECG (heart rhythm), pulse oximetry (oxygen saturation), capnography (exhaled carbon dioxide), non-invasive blood pressure, and body temperature. We also have two ventilators to support breathing, and we listen to the heart before and during the procedure. Most importantly, a trained person interprets the monitors and responds to changes; devices do not replace a vigilant professional. Monitoring continues into recovery: in the CEPSAF study, 47% of anesthetic- and sedation-related deaths in dogs and 61% in cats occurred after the procedure, many of them within the first three hours after anesthesia ended.'
  },
  'article.anesthesia.balanced.title': {
    fi: 'Balansoitu anestesia ja kivunhallinta',
    sv: 'Balanserad anestesi och smärthantering',
    en: 'Balanced Anesthesia and Pain Management'
  },
  'article.anesthesia.balanced.text': {
    fi: 'Nykyaikainen anestesia perustuu multimodaaliseen (”balansoituun”) lähestymistapaan: useiden lääkeaineiden yhdistäminen pienempinä annoksina on kokonaisuutena turvallisempaa kuin yksi lääke suurena annoksena. Anestesian induktioon käytämme laskimoon annettavia anesteetteja (propofolia tai alfaksalonia), ylläpitoon inhalaatioanesteetti isofluraania ja kivunhallintaan opioideja, ketamiinia ja paikallispuudutteita. Tämä balansoitu protokolla pienentää kunkin lääkkeen annosta ja samalla haittavaikutuksia, erityisesti sydämen toiminnan ja verenkierron lamaantumista.',
    sv: 'Modern anestesi bygger på ett multimodalt (”balanserat”) tillvägagångssätt: genom att kombinera flera läkemedel i lägre doser får man ett säkrare helhetsresultat än med ett enda läkemedel i hög dos. Vi använder intravenösa anestetika (propofol eller alfaxalon) för induktion, inhalationsanestetikumet isofluran för underhåll samt opioider, ketamin och lokalanestetika för smärthantering. Detta balanserade protokoll sänker dosen av varje läkemedel och därmed biverkningarna, särskilt den dämpande effekten på hjärta och cirkulation.',
    en: 'Modern anesthesia uses a multimodal (“balanced”) approach: combining several drugs at lower doses gives a safer overall result than one drug at a high dose. We use intravenous anesthetics (propofol or alfaxalone) for induction, the inhalant anesthetic isoflurane for maintenance, and opioids, ketamine, and local anesthetics for pain management. This balanced protocol lowers the dose of each drug and, with it, the side effects, especially depression of the heart and circulation.'
  },
  'article.anesthesia.vatinoxan.title': {
    fi: 'Suomalainen eläinlääketieteen innovaatio – vatinoksaani',
    sv: 'En finländsk veterinärmedicinsk innovation – vatinoxan',
    en: 'A Finnish Veterinary Innovation — Vatinoxan'
  },
  'article.anesthesia.vatinoxan.text': {
    fi: 'Helsingin yliopiston Yliopisto-lehden haastattelussa vuonna 2024 eläinanestesiologi Vilhelmiina Huuskonen, tuolloin apulaisprofessori University College Dublinissa, totesi, että kuolema anestesian aikana on eläimillä yleisempää kuin ihmisillä. Hänen väitöskirjansa Helsingin yliopistossa (marraskuu 2024) käsitteli vatinoksaania, kun sitä annettiin koirille ja lampaille yhdessä rauhoittavien lääkkeiden medetomidiinin ja deksmedetomidiinin kanssa. Vatinoksaani vaikuttaa pääasiassa aivojen ulkopuolella, joten se vähentää näiden rauhoittavien lääkkeiden ei-toivottuja sydän- ja verenkiertovaikutuksia (sykkeen hidastuminen, verisuonten supistuminen ja verenpaineen nousu sekä sydämen minuuttitilavuuden pieneneminen). Sedaatio ja kivunlievitys säilyvät pääosin, vaikka ne loppuvatkin hieman aikaisemmin. Huuskosen tutkimuksessa verenpaine saattoi laskea, kun deksmedetomidiinia ja vatinoksaania saaneita koiria pidettiin sen jälkeen isofluraanianestesiassa. Väitöskirja osoitti, että tällaista laskua voidaan hoitaa tehokkaasti tavanomaisilla verenpainetta nostavilla lääkkeillä ja että verenpainetta on seurattava tarkasti. Molekyyliä oli aiemmin tutkittu ihmisillä diabeteksen hoidossa. Sen yhdistämisen eläinten rauhoittaviin lääkkeisiin suunnitteli Helsingin yliopistossa Outi Vainion (nykyään emeritaprofessori) johtama tutkimusryhmä. Tuloksena syntynyt koirille tarkoitettu valmiste Zenalpha (medetomidiini + vatinoksaani) kehitettiin yhteistyössä suomalaisen Vetcare-yrityksen kanssa. Se sai myyntiluvan EU:ssa joulukuussa 2021 ja Yhdysvalloissa maaliskuussa 2022 sedaatioon tutkimusten ja pienten toimenpiteiden ajaksi.',
    sv: 'I en intervju 2024 i Helsingfors universitets tidning Yliopisto konstaterade veterinäranestesiologen Vilhelmiina Huuskonen, då biträdande professor vid University College Dublin, att dödsfall under anestesi är vanligare hos djur än hos människor. Hennes doktorsavhandling vid Helsingfors universitet (november 2024) undersökte vatinoxan i kombination med sederingsmedlen medetomidin och dexmedetomidin hos hundar och får. Vatinoxan verkar huvudsakligen utanför hjärnan och motverkar därför dessa sederingsmedels oönskade effekter på hjärta och kärl (långsam hjärtfrekvens, sammandragna blodkärl med förhöjt blodtryck och minskad hjärtminutvolym). Sederingen och smärtlindringen bevaras till stor del, även om de klingar av något tidigare. I forskningen kunde blodtrycket sjunka när hundar som fått dexmedetomidin och vatinoxan därefter hölls sövda med isofluran. Avhandlingen visade att ett sådant blodtrycksfall kan behandlas effektivt med sedvanliga blodtryckshöjande läkemedel och att det måste övervakas noggrant. Molekylen hade tidigare studerats hos människor för behandling av diabetes; kombinationen med sederingsmedel för djur utformades av en forskargrupp vid Helsingfors universitet under ledning av Outi Vainio, numera professor emerita. Resultatet blev hundpreparatet Zenalpha (medetomidin + vatinoxan), som utvecklades i samarbete med det finländska företaget Vetcare. Preparatet godkändes i EU i december 2021 och i USA i mars 2022 för sedering vid undersökningar och mindre ingrepp.',
    en: 'In a 2024 interview in the University of Helsinki’s Yliopisto magazine, veterinary anesthesiologist Vilhelmiina Huuskonen, at the time an associate professor at University College Dublin, noted that death under anesthesia is more common in animals than in humans. Her doctoral thesis at the University of Helsinki (November 2024) studied vatinoxan given together with the sedatives medetomidine and dexmedetomidine in dogs and sheep. Vatinoxan acts mainly outside the brain, so it counteracts these sedatives’ unwanted cardiovascular effects (slow heart rate, constricted blood vessels with raised blood pressure, and reduced cardiac output). Sedation and pain relief are largely preserved, although they wear off somewhat sooner. In her research, blood pressure could fall when dogs given dexmedetomidine and vatinoxan were then kept under isoflurane anesthesia. Her thesis showed that such a drop can be treated effectively with standard medicines that raise blood pressure, and that it must be monitored closely. The molecule had earlier been studied in humans for diabetes; the combination with animal sedatives was designed by a research group led by Outi Vainio (now Professor Emerita) at the University of Helsinki. The resulting product for dogs, Zenalpha (medetomidine + vatinoxan), was developed in cooperation with the Finnish company Vetcare. It was authorized in the EU in December 2021 and in the US in March 2022 for sedation during examinations and minor procedures.'
  },
  'article.anesthesia.preop.title': {
    fi: 'Ennen anestesiaa',
    sv: 'Före anestesi',
    en: 'Before Anesthesia'
  },
  'article.anesthesia.preop.text': {
    fi: 'Jokainen potilas arvioidaan yksilöllisesti ennen anestesiaa. Arviointiin kuuluvat kliininen tutkimus sekä sydämen ja keuhkojen kuuntelu (auskultaatio). Verikokeita (täydellinen verenkuva ja biokemia) suositellaan, kun potilaan ikä, esitiedot tai tutkimuslöydökset antavat siihen aihetta, esimerkiksi iäkkäillä tai sairailla eläimillä. Myös AAHA:n vuoden 2020 suosituksissa anestesiaa edeltävät tutkimukset valitaan potilaskohtaisesti. Verikokeet voivat paljastaa piilevän munuais- tai maksasairauden, anemian tai elektrolyyttihäiriöitä, jotka vaikuttavat lääkkeiden valintaan ja annosteluun. Jos löydökset ovat merkittäviä, toimenpidettä voidaan siirtää, jotta potilaan tila saadaan ensin vakautettua.',
    sv: 'Varje patient bedöms individuellt före anestesin. Den preanestetiska bedömningen omfattar en klinisk undersökning och auskultation av hjärta och lungor. Blodprov (blodstatus och biokemi) rekommenderas när patientens ålder, sjukdomshistoria eller undersökningsfynd ger anledning till det, till exempel hos äldre eller sjuka djur; även AAHA:s riktlinjer från 2020 anpassar de preanestetiska undersökningarna efter den enskilda patienten. Blodprov kan avslöja dold njur- eller leversjukdom, anemi eller elektrolytrubbningar som påverkar val och dosering av läkemedel. Om fynden är betydande kan ingreppet skjutas upp så att patienten först kan stabiliseras.',
    en: 'Every patient is assessed individually before anesthesia. The pre-anesthetic evaluation includes a clinical examination and auscultation of the heart and lungs. Blood tests (complete blood count and biochemistry) are recommended when the patient’s age, history, or examination calls for them, for example in older or sick animals; the 2020 AAHA guidelines likewise tailor pre-anesthetic diagnostics to the individual patient. Blood tests can reveal hidden kidney or liver disease, anemia, or electrolyte imbalances that affect drug selection and dosing. If the findings are significant, the procedure may be postponed so the patient can be stabilized first.'
  },

  // Article 25: Veterinary Nurse
  'article.vetnurse.title': {
    fi: 'Klinikkaeläinhoitaja – potilasturvallisuuden kulmakivi',
    sv: 'Klinikdjurskötare – hörnstenen i patientsäkerhet',
    en: 'Veterinary Nurse — The Cornerstone of Patient Safety'
  },
  'article.vetnurse.intro': {
    fi: 'Eläinlääkäri ei voi samanaikaisesti leikata ja valvoa potilaan elintoimintoja. Koulutettu klinikkaeläinhoitaja on se henkilö, joka seuraa monitoreja, reagoi muutoksiin ja huolehtii potilaasta leikkausta ennen, sen aikana ja sen jälkeen. Anestesiakuoleman riskiä ennustavat tutkimuksissa johdonmukaisimmin potilaaseen ja toimenpiteeseen liittyvät tekijät: potilaan ASA-luokka eli yleistilan arvio, ikä, paino sekä toimenpiteen laatu ja kiireellisyys. Niihin ei vastaanotolla juuri voi vaikuttaa. Sen sijaan jatkuva valvonta – erityisesti pulssin seuranta ja pulssioksimetria – on tutkimuksissa yhdistetty pienempään kuolleisuuteen, ja juuri siihen klinikka voi vaikuttaa. Siksi merkitystä on sillä, että valvonta on nimetyn ja koulutetun ihmisen tehtävä eikä jää muun työn ohessa hoidettavaksi.',
    sv: 'En veterinär kan inte samtidigt operera och övervaka patientens vitalfunktioner. En utbildad klinikdjurskötare är den person som övervakar monitorerna, reagerar på förändringar och tar hand om patienten före, under och efter operationen. De starkaste riskfaktorerna vid anestesi hänger ihop med patienten och ingreppet: djurets allmäntillstånd (ASA-klass), ålder och vikt samt hur omfattande och hur brådskande ingreppet är. Dem går det inte att välja bort. Det som däremot går att påverka är övervakningen – i forskningen hör kontinuerlig uppföljning av pulsen och användning av pulsoximeter till de faktorer som är kopplade till lägre dödlighet. Någon måste sköta den uppföljningen, och hos oss är det en utbildad klinikdjurskötare som under ingreppet koncentrerar sig på patienten.',
    en: 'A veterinarian cannot simultaneously perform surgery and monitor the patient’s vital functions. A trained veterinary nurse is the person who watches the monitors, responds to changes, and cares for the patient before, during, and after surgery. Research consistently shows that the strongest predictors of anaesthetic death are the patient’s health status before anaesthesia (ASA classification), age, the type and urgency of the procedure, and body weight. Among the factors that can be changed, continuous monitoring — specifically pulse monitoring and pulse oximetry — is linked to lower mortality. Having one trained person dedicated to that monitoring, rather than dividing attention between surgery and monitoring, supports this.'
  },
  'article.vetnurse.role.title': {
    fi: 'Hoitajan rooli klinikalla',
    sv: 'Skötarens roll på kliniken',
    en: 'The Nurse\'s Role at the Clinic'
  },
  'article.vetnurse.role.text': {
    fi: 'Klinikkaeläinhoitaja valmistelee potilaan leikkaukseen: asettaa suonikanyylin, antaa esilääkityksen ja valmistelee leikkausalueen. Leikkauksen aikana hoitaja valvoo anestesiaa – seuraa sydämen rytmiä, veren happisaturaatiota, kapnografiaa ja lämpötilaa. Steriilissä avustamisessa hoitaja ojentaa instrumentit, ylläpitää steriiliä aluetta ja huomaa mahdolliset kontaminaatiot. Toimenpiteen jälkeen hoitaja valvoo toipumista, joka on kriittisin vaihe: yli puolet anestesiakuolemista tapahtuu vasta toimenpiteen jälkeen, heräämövaiheessa.',
    sv: 'Klinikdjurskötaren förbereder patienten för operation: lägger in venkateter, administrerar premedicinering och förbereder operationsområdet. Under operationen övervakar skötaren anestesin – följer hjärtrytm, syremättnad, kapnografi och temperatur. Vid steril assistans räcker skötaren instrument, upprätthåller det sterila fältet och uppmärksammar eventuella kontaminationer. Efter ingreppet övervakar skötaren återhämtningen, som är den mest kritiska fasen: över hälften av dödsfallen i samband med anestesi inträffar efter ingreppet, inte under det.',
    en: 'The veterinary nurse prepares the patient for surgery: placing an IV catheter, administering premedication, and preparing the surgical site. During surgery, the nurse monitors anesthesia — tracking heart rhythm, oxygen saturation, capnography, and temperature. In sterile assistance, the nurse passes instruments, maintains the sterile field, and identifies potential contamination. After the procedure, the nurse monitors recovery, which is the most critical phase: more than half of anaesthetic deaths happen during the recovery period.'
  },
  'article.vetnurse.evidence.title': {
    fi: 'Mitä tutkimus sanoo',
    sv: 'Vad forskningen säger',
    en: 'What Research Shows'
  },
  'article.vetnurse.evidence.text': {
    fi: 'Laajassa brittiläisessä CEPSAF-aineistossa (117 klinikkaa, 185 423 eläintä) pienempään anestesiakuoleman riskiin yhdistyivät pulssin seuranta ja pulssioksimetrian käyttö. Tutkimuksessa ei arvioitu valvojan koulutustasoa sinänsä, vaan sitä, valvottiinko potilasta näillä menetelmillä. Suurin osa anestesiakuolemista tapahtuu vasta toimenpiteen jälkeen: noin 57 % kaikista anestesiakuolemista ajoittuu toimenpiteen jälkeiseen vaiheeseen. Näistä toimenpiteen jälkeisistä kuolemista noin puolet sattuu kolmen tunnin kuluessa toimenpiteen päättymisestä – eli kaikista anestesiakuolemista noin 29 % osuu tähän kolmen tunnin ikkunaan. Banfield-tutkimus (2022) osoitti, että laatustandardien käyttöönotto, mukaan lukien koulutettu henkilökunta, vähensi anestesiakuolleisuutta 16 % kuudessa kuukaudessa. Vuonna 2024 julkaistussa laajassa kansainvälisessä aineistossa koirien anestesiakuolemista 81 % ja kissojen anestesiakuolemista 74,5 % tapahtui toimenpiteen jälkeisessä vaiheessa.',
    sv: 'CEPSAF-undersökningen (Brodbelt m.fl., 117 kliniker och 185 423 djur) är fortfarande den största kartläggningen i sitt slag. Av de faktorer som gick att påverka var det uppföljning av pulsen och användning av pulsoximeter som hade samband med en lägre risk att dö. Undersökningen prövade däremot inte skötarens utbildningsnivå som en egen riskfaktor. Tidpunkten för dödsfallen är värd att förstå rätt, för de två talen blandas ofta ihop: ungefär 57 % av alla dödsfall i samband med anestesi inträffar efter ingreppet, och av just dessa sker ungefär hälften inom tre timmar från att ingreppet avslutats. Räknat på samtliga anestesidödsfall är andelen som inträffar under de tre första timmarna därmed cirka 29 % – inte över hälften. Banfield-studien (2022) visade att införandet av kvalitetsstandarder, inklusive utbildad personal, minskade anestesidödligheten med 16 % på sex månader. Redondo m.fl. (2024) kom fram till samma sak i ett stort internationellt material: 81 % av anestesidödsfallen hos hundar och 74,5 % hos katter inträffade efter ingreppet.',
    en: 'The CEPSAF study (Brodbelt et al., 117 practices, 185,423 animals) identified pulse monitoring and pulse oximetry during anaesthesia as protective factors linked to lower mortality — not the qualification of the person doing the monitoring. The timing of deaths is easy to misread: about 57% of all anaesthetic deaths happen during the postoperative period, and roughly half of those postoperative deaths occur within three hours of the procedure ending. Counted across all anaesthetic deaths, about 29% fall in that three-hour window — not over half. The Banfield study (2022) showed that implementing quality standards, including trained personnel, reduced anaesthesia mortality by 16% within six months. Redondo et al. (2024) found that 81% of anaesthetic deaths in dogs happened postoperatively; a companion study in cats put the figure at 74.5%.'
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
    fi: 'Jenni Ruotsala – johtava klinikkaeläinhoitajamme',
    sv: 'Jenni Ruotsala – vår ledande klinikdjurskötare',
    en: 'Jenni Ruotsala — Our Head Veterinary Nurse'
  },
  'article.vetnurse.jenni.text': {
    fi: 'Johtava klinikkaeläinhoitajamme Jenni Ruotsala on työskennellyt klinikallamme vuodesta 2014. Hänellä on klinikkaeläinhoitajan koulutuksen kaikki kolme tasoa: perustutkinto (2010), ammattitutkinto (2018) ja erikoisammattitutkinto anestesiapainotteisena (2025) – korkein Suomessa saatavilla oleva ammatillinen pätevyys. Lisäksi Jenni on suorittanut hammashoitokoulutuksen Ruotsissa Accesia Academyssa.',
    sv: 'Vår ledande klinikdjurskötare Jenni Ruotsala har arbetat på vår klinik sedan 2014. Hon har alla tre nivåerna av klinikdjurskötarutbildning: grundexamen (2010), yrkesexamen (2018) och specialyrkesexamen med inriktning på anestesi (2025) – den högsta tillgängliga yrkeskvalifikationen i Finland. Dessutom har Jenni genomgått tandvårdsutbildning i Sverige vid Accesia Academy.',
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
    fi: 'Sijaitsemme osoitteessa Gerbyntie 18, 65230 Vaasa, Vetokannaksen kaupunginosassa Bockis-kurvissa. Meille on hyvät kulkuyhteydet myös lähikunnista.',
    sv: 'Djurklinik Saari ligger på Gerbyvägen 18, 65230 Vasa, i stadsdelen Dragnäsbäck vid Bockiskurvan. Det är lätt att nå oss även från grannkommunerna.',
    en: 'We are at Gerbyntie 18, 65230 Vaasa, in the Dragnäsbäck district at the Bockis bend. We are easy to reach from the surrounding municipalities too.'
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
      fi: 'Olen työskennellyt pieneläinlääkärinä vuodesta 2013 lähtien, ja nykyään työni painottuu erityisesti ortopedisten potilaiden hoitoon. Olen jatkokouluttautunut muun muassa ortopedisessa kirurgiassa (AOVET, ESAVS etc.) sekä hammassairauksissa (Accesia Academy).\n\nMinulle on tärkeää pysyä ajan tasalla uusista tutkimuksista, hoitomenetelmistä ja tekniikoista \u2013 jatkuva kouluttautuminen on olennainen osa parhaan mahdollisen hoidon tarjoamista.\n\nKeskeisiä ammatillisia kiinnostuksen kohteitani ovat ortopedia, pehmytosakirurgia ja hammashoidot. Koen erityisen palkitsevaksi auttaa eläimiä palauttamaan mukavuutensa, liikkuvuutensa ja hyvän elämänlaadun, ja tämä motivoi minua työssäni joka päivä.\n\nToimin klinikkamme kissavastaavana (Cat Advocate) osana Cat Friendly Clinic -ohjelmaa. Huolehdin siitä, että kissapotilaidemme käynnit ovat mahdollisimman rauhallisia ja stressittömiä.',
      sv: 'Jag har arbetat som smådjursveterinär sedan 2013, och idag ligger mitt fokus framför allt på att behandla ortopediska patienter. Jag har vidareutbildning inom bland annat ortopedisk kirurgi (AOVET, ESAVS etc.) samt tandvård (Accesia Academy).\n\nDet är viktigt för mig att hålla mig uppdaterad kring nya forskningsrön, tekniker och behandlingsmetoder \u2013 kontinuerlig fortbildning är en central del av att kunna erbjuda bästa möjliga vård.\n\nMina främsta professionella intressen är ortopedi, mjukdelskirurgi och tandvård. Jag upplever det som särskilt givande att hjälpa djur att återfå komfort, rörlighet och livskvalitet, och det motiverar mig varje dag i mitt arbete.\n\nJag är klinikens kattansvariga (Cat Advocate) inom Cat Friendly Clinic-programmet. Jag ser till att våra kattpatienters besök blir så lugna och stressfria som möjligt.',
      en: 'I have been working as a small animal veterinarian since 2013, and today my work focuses largely on treating orthopedic patients. I have completed further education in orthopedic surgery (AOVET, ESAVS etc) as well as in dentistry (Accesia Academy).\n\nI prioritise staying up to date with new research, techniques, and treatment options\u2014continuously educating myself is an important part of offering the best possible care.\n\nMy main professional interests lie in orthopedics, soft tissue surgery, and dentistry. I find it especially rewarding to help animals regain comfort, mobility, and quality of life, and this motivates me every day in my work.\n\nI am the clinic\'s Cat Advocate within the Cat Friendly Clinic program, making sure our feline patients\' visits are as calm and stress-free as possible.'
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
      fi: 'Ortopedia, pehmytkudoskirurgia, hammashoito, kissaystävällinen hoito',
      sv: 'Ortopedi, mjukdelskirurgi, tandvård, kattvänlig vård',
      en: 'Orthopedics, soft tissue surgery, dentistry, cat-friendly care'
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
