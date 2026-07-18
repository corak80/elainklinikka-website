// Cloudflare Worker — elainklinikkasaari.fi legacy redirects
// Combines:
//   1. Old WordPress slug map (source of truth: redirects/slug_map.json — regenerate this file after editing it)
//   2. Logic carried over from the saarivet-redirects Worker (~/saarivet-cf-worker), which the
//      blanket saarivet.fi->elainklinikkasaari.fi redirect will retire at cutover:
//      /?lang=xx canonicalisation, /sv/veterinar-vasa/tjanster/* fixup, FI-slug article URLs.
// Worker route: elainklinikkasaari.fi/*

const ORIGIN = "https://elainklinikkasaari.fi";

const SLUG_MAP = {
  "/ruokatilaus/": "/palvelut/rehumyynti/",
  "/palvelut/pentutarkastukset/": "/palvelut/pentutarkastus/",
  "/palvelut/terveystarkastukset/": "/palvelut/",
  "/palvelut/tiineystutkimukset/": "/palvelut/tiineystutkimus/",
  "/palvelut/ultraaanitutkimuset/": "/palvelut/ultraaani/",
  "/palvelut/verinaytteet/": "/palvelut/verikokeet/",
  "/palvelut/viimeiset-hyvastit-eutanasia/": "/palvelut/eutanasia/",
  "/palvelut/laboratoriotutkimukset/": "/palvelut/laboratorio/",
  "/palvelut/hammashoidot/": "/palvelut/hammashoito/",
  "/palvelut/ihotaudit-ja-allergiat/": "/palvelut/ihotaudit/",
  "/palvelut/sydansairaudet/": "/palvelut/sydantutkimukset/",
  "/palvelut/rontgentutkimukset/": "/palvelut/rontgen/",
  "/palvelut/endoskopia-tahystys/": "/palvelut/tahystykset/",
  "/palvelut/ruokamyynti/": "/palvelut/rehumyynti/",
  "/palvelut/kuntoutus-ja-hyvinvointi/": "/palvelut/kuntoutus/",
  "/klinikka/": "/meista/",
  "/henkilokunta/": "/meista/",
  "/ajankohtaista/": "/artikkelit/",
  "/wildlife/": "/yhteystiedot/",
  "/sv/ruokatilaus-sv-translation/": "/sv/tjanster/foderforsaljning/",
  "/sv/dataskyddsregister/": "/tietosuoja/",
  "/sv/tietosuoja/": "/tietosuoja/",
  "/sv/tjanster/valpgranskning/": "/sv/tjanster/valpundersokning/",
  "/sv/tjanster/halsogranskning/": "/sv/tjanster/",
  "/sv/tjanster/draktighetsdiagnos/": "/sv/tjanster/draktighetsundersokning/",
  "/sv/tjanster/sista-farval-eutanasi/": "/sv/tjanster/eutanasi/",
  "/sv/tjanster/dermatologi-och-allergier/": "/sv/tjanster/hudsjukdomar/",
  "/sv/tjanster/hjartsjukdomar/": "/sv/tjanster/hjartundersokningar/",
  "/sv/tjanster/friskvard-och-rehabilitering/": "/sv/tjanster/rehabilitering/",
  "/sv/klinik/": "/sv/",
  "/sv/personal/": "/sv/",
  "/sv/aktuellt/": "/sv/artiklar/",
  "/sv/wildlife-sv/": "/sv/",
  "/sv/framsida/": "/sv/",
  "/en/ruokatilaus-en/": "/en/services/prescription-diets/",
  "/en/privacy-policy/": "/tietosuoja/",
  "/en/tietosuoja/": "/tietosuoja/",
  "/en/services/puppy-kitten-exams/": "/en/services/puppy-check-up/",
  "/en/services/health-checks/": "/en/services/",
  "/en/services/pregnancy-examinations/": "/en/services/pregnancy-examination/",
  "/en/services/ultrasound-examinations/": "/en/services/ultrasound/",
  "/en/services/laboratory-tests/": "/en/services/laboratory/",
  "/en/services/dental-treatments/": "/en/services/dental-care/",
  "/en/services/skin-diseases-and-allergies/": "/en/services/dermatology/",
  "/en/services/cardiovascular-diseases/": "/en/services/cardiac-examinations/",
  "/en/services/x-ray-examinations/": "/en/services/x-ray/",
  "/en/services/edoscopy/": "/en/services/endoscopy/",
  "/en/services/food-sales/": "/en/services/prescription-diets/",
  "/en/services/wellness-and-rehabilitation/": "/en/services/rehabilitation/",
  "/en/services/sterilization/": "/en/services/spay-and-neuter/",
  "/en/clinic/": "/en/",
  "/en/our-team/": "/en/",
  "/en/news/": "/en/articles/",
  "/en/ajanvaraus-en/": "/en/",
  "/en/wildlife-en/": "/en/",
  "/en/home/": "/en/",
  "/en/contact/": "/en/",
  "/sample-page/": "/",
  "/uudet-pienelainten-madotussuositukset/": "/artikkelit/",
  "/sv/nytt-pa-kliniken-fysioterapi/": "/sv/artiklar/",
  "/en/new-in-the-clinic-physiotherapy/": "/en/articles/",
  "/koira/": "/",
  "/kissa/": "/",
  "/elainklinikka-saarelle-on-myonnetty-kissaystavallinen-klinikka-sertifikaatti/": "/articles/kissaystävällinen-klinikka.html",
  "/sv/djurklinik-saari-har-tilldelats-certifikat-for-kattvanlig-klinik/": "/sv/artiklar/kattvanlig-klinik.html",
  "/en/elainklinikka-saari-is-awarded-internationally-recognised-cat-friendly-clinic-status/": "/en/articles/cat-friendly-clinic.html",
  "/klinikallamme-nyt-myos-koirien-viralliset-sydamen-ultraaanitutkimukset/": "/palvelut/sydantutkimukset/",
  "/en/now-also-available-official-heart-ultrasound-examinations-for-dogs/": "/en/services/cardiac-examinations/",
  "/sv/nu-kan-ni-aven-boka-officiella-hjartultraljud-at-hundar/": "/sv/tjanster/hjartundersokningar/"
};

const ARTICLES = {
  "anestesiaturvallisuus":     { sv: "anestesisakerhet",         en: "anaesthesia-safety" },
  "avoin-valtimotiehyt-pda":   { sv: "oppen-ductus-arteriosus-pda", en: "patent-ductus-arteriosus-pda" },
  "gastroskopia":              { sv: "gastroskopi",               en: "gastroscopy" },
  "hammasresorptio":           { sv: "tandresorption",            en: "tooth-resorption" },
  "hampaiden-harjaus":         { sv: "tandborstning",             en: "tooth-brushing" },
  "hypotermia":                { sv: "hypotermi",                 en: "hypothermia" },
  "ibd-lymfooma":              { sv: "ibd-lymfom",                en: "ibd-lymphoma" },
  "kilpirauhasen-liikatoiminta": { sv: "hypertyreos-katt",        en: "hyperthyroidism" },
  "kipulääkeinfuusio":         { sv: "smartlindringsinfusion",    en: "pain-relief-infusion" },
  "kissaystävällinen-klinikka": { sv: "kattvanlig-klinik",        en: "cat-friendly-clinic" },
  "klinikkaeläinhoitaja":      { sv: "klinikdjurskotare",         en: "veterinary-nurse" },
  "kohtutulehdus":             { sv: "livmoderinflammation",      en: "pyometra" },
  "kyynpurema":                { sv: "huggormsbett",              en: "snake-bite" },
  "munuaisten-vajaatoiminta":  { sv: "njursvikt",                 en: "kidney-disease" },
  "puhkeamattomat-hampaat":    { sv: "icke-framvaxta-tander",     en: "unerupted-teeth" },
  "ripuli":                    { sv: "diarre",                    en: "diarrhoea" },
  "rokotukset":                { sv: "vaccinationsguide",         en: "vaccinations-guide" },
  "ruoka-allergiat":           { sv: "foderallergier",            en: "food-allergies" },
  "siili":                     { sv: "igelkott",                  en: "hedgehog" },
  "tta-leikkaus":              { sv: "tta-operation",             en: "tta-surgery" },
  "video-otoskopia":           { sv: "video-otoskopi",            en: "video-otoscopy" },
  "viljaton-ruoka":            { sv: "spannmalsfri-mat",          en: "grain-free-food" },
  "yksityinen-klinikka":       { sv: "privat-klinik",             en: "independent-clinic" },
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);

    // Root /?lang=xx is a client-side language override; without a redirect
    // Google indexes it as a duplicate of /.
    if (path === "/" || path === "") {
      const lang = url.searchParams.get("lang");
      if (lang === "en") return Response.redirect(ORIGIN + "/en/", 301);
      if (lang === "sv") return Response.redirect(ORIGIN + "/sv/", 301);
      if (lang === "fi") return Response.redirect(ORIGIN + "/", 301);
    }

    // Google crawled /sv/veterinar-vasa/tjanster/* from a brief relative-link bug.
    const svTjansterMatch = path.match(/^\/sv\/veterinar-vasa\/(tjanster\/.*)$/);
    if (svTjansterMatch) {
      return Response.redirect(ORIGIN + "/sv/" + svTjansterMatch[1], 301);
    }

    // FI-slug article URLs under the EN/SV trees -> translated slugs.
    const enMatch = path.match(/^\/en\/articles\/(.+)\.html$/);
    if (enMatch && ARTICLES[enMatch[1]]) {
      return Response.redirect(ORIGIN + "/en/articles/" + ARTICLES[enMatch[1]].en + ".html", 301);
    }
    const svMatch = path.match(/^\/sv\/artiklar\/(.+)\.html$/);
    if (svMatch && ARTICLES[svMatch[1]]) {
      return Response.redirect(ORIGIN + "/sv/artiklar/" + ARTICLES[svMatch[1]].sv + ".html", 301);
    }

    // Old WordPress slugs. Normalise to trailing-slash form for lookup.
    const lookup = path.endsWith("/") ? path : path + "/";
    const target = SLUG_MAP[lookup] ?? SLUG_MAP[path];
    if (target) {
      const dest = new URL(encodeURI(target), ORIGIN);
      dest.search = url.search;
      return Response.redirect(dest.toString(), 301);
    }

    // Everything else passes through to origin (GitHub Pages serves the new site).
    return fetch(request);
  },
};
