// Cloudflare Worker — saarivet.fi → elainklinikkasaari.fi blanket 301
// Worker route: saarivet.fi/* (replaces the saarivet-redirects Worker at cutover —
// its slug/lang logic lives on in elainklinikkasaari-worker.js on the new domain).
// Email is NOT touched — Cloudflare Email Routing on saarivet.fi runs at the MX layer,
// independent of HTTP routing.

const NEW_HOST = "https://elainklinikkasaari.fi";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const dest = new URL(url.pathname + url.search, NEW_HOST);
    return Response.redirect(dest.toString(), 301);
  },
};
