# Brief for FI / SV native writers (privacy + consumer texts, 09-11-2026)

Source of truth: `EN_master.md` in this folder (approved by Assaf 09-11-2026, with: instalments = Walley,
transcripts kept 12 months). Translate MEANING, not word order. Plain, warm, short sentences a pet
owner understands. No legalese where plain words do; legal references stay exact.

Existing Finnish privacy page for terminology reference (old, being replaced): `tietosuoja/index.html`.

## Language rules
- Finnish: standard written Finnish, en dash – (never em dash —), Finnish quotes ”…”, dates 9.11.2026,
  "Eläinklinikka Saari Oy", "rekisterinpitäjä", "tietosuojaseloste", "henkilötietojen käsittelijä",
  "Tietosuojavaltuutetun toimisto", "Ruokavirasto", "eläinlääkäri", "laillistettu".
- Swedish: FINLAND-Swedish (not Sweden-Swedish): tankstreck –, ”…”, "Djurklinik Saari" is the clinic's
  Swedish name in running text but the company is "Eläinklinikka Saari Oy"; "dataskyddsombudsmannen"
  (Dataombudsmannens byrå), "Livsmedelsverket" (Finnish Food Authority), "FO-nummer" for business ID,
  "personuppgiftsbiträde", "personuppgiftsansvarig", "veterinär", "legitimerad".
- Keep product/company names as is: Google Analytics, Google Ads, Meta, Facebook, Instagram,
  Microsoft Clarity, Google Maps, WhatsApp, ProvetCloud, Nordhealth Finland Oy, Hetzner Online GmbH,
  Twilio Inc., Retell AI Inc., Anthropic PBC, Resend Inc., GitHub Inc., Cloudflare Inc., Stripe, Walley,
  IDEXX, Movet, Laboklin, Patovet.
- Numbers/facts must match the master exactly: 3 years, 5 years, 6 / 10 years, 12 months, 14 months,
  13 months, 29/2000 15 §, EU 2019/6, VAT FI07086679, (06) 321 7300, info@saarivet.fi, Gerbyntie 18,
  65230 Vaasa (SV: Vasa), business ID 0708667-9, 14 days.
- Bold in the master (Calls are not recorded / Nothing is recorded…) stays bold (<strong>).

## Output — ONE JSON file, exactly these keys (strings; HTML allowed only where noted)
```
{
  "banner_text": "", "accept": "", "reject": "", "privacy_link": "", "settings": "",
  "map_text": "", "map_button": "",
  "privacy_title": "",                      // page <h1>
  "privacy_updated": "",                    // "Updated 9 November 2026"
  "privacy_body_html": "",                  // full policy body after the h1: <h2>, <p>, <ul><li>, <table> with <thead>; same sections and order as the master incl. Company information
  "privacy_meta_description": "",           // ≤155 chars
  "reviews_note": "",
  "footer_privacy_link": "",                // "Privacy policy and company information"
  "deslorelin_implant": "",                 // the phrase replacing "Suprelorin implant"
  "shop_cancel_link": "", "shop_cancel_title": "", "shop_cancel_intro": "",
  "shop_cancel_order_label": "", "shop_cancel_contact_label": "", "shop_continue": "",
  "shop_confirm_question": "",              // keep placeholders {order} and {items}
  "shop_confirm_yes": "",
  "shop_done": "",                          // keep {date} and {time}
  "shop_email_subject": "",                 // keep {order}
  "shop_email_body": "",                    // plain text; keep {order} {items} {date} {time}; signed Eläinklinikka Saari
  "shop_not_found": "",                     // "We couldn't find an order with those details. Check the order number, or call us on (06) 321 7300."
  "shop_expired": "",                       // "The 14-day cancellation period for this order has ended. If something is wrong with the products, call us on (06) 321 7300."
  "shop_accessibility_title": "", "shop_accessibility_html": "",   // keep {checked_date} and {result_html}
  "shop_privacy_add": ""                    // one sentence: email is also sent via Resend Inc. (USA) and the pick-up notice goes first by WhatsApp (Meta Platforms Ireland Ltd)
}
```
EN for the shop strings not in the master: cancel link "Cancel an order"; title "Cancel an order";
intro "You can cancel your order within 14 days of picking it up. Enter your order number and the email
address or phone number you used when ordering."; labels "Order number", "Email or phone number";
continue "Continue"; question "Do you want to cancel order {order} ({items})?"; yes "Yes, cancel the
order"; done "We received your cancellation on {date} at {time}. We will refund the payment within 14
days to the card or account you paid with. A confirmation is on its way to your email."; email subject
"Cancellation received – order {order}"; email body: confirms receipt of the cancellation of order
{order} ({items}) on {date} at {time}, refund within 14 days to the same payment method, unopened
products can be brought back to the clinic, questions (06) 321 7300.
