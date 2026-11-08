#!/usr/bin/env python3
"""Move every page onto /js/consent.js (08-11-2026). Idempotent: running it twice changes nothing.

Usage: python3 tools/consent/migrate.py [--check] [files...]   (default: all tracked *.html + generators)
--check: exit 1 if any file would change (use after a rebuild to catch an old template coming back).

What it does to a page that has Google/Meta tags:
  - removes every loader of gtag.js / fbevents.js / Clarity and the <noscript> pixel image;
  - removes the old cookie banner (div + script); consent.js draws its own;
  - adds <script src="/js/consent.js?v=…"> just before the first inline gtag block;
  - Google Maps <iframe src> → data-consent-src (consent.js shows a "Show map" button);
  - the Meta Conversions API beacon in trackBooking() is sent only with consent.
"""
import re, subprocess, sys, os

VERSION = '20261109b'
TAG = f'<script src="/js/consent.js?v={VERSION}"></script>'
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

R = [
    # gtag.js <script async src>
    (re.compile(r'[ \t]*<script async src="https://www\.googletagmanager\.com/gtag/js\?id=G-[A-Z0-9]+"></script>[ \t]*\n?'), ''),
    # standard Meta pixel loader IIFE (fbq('init') etc. after it stay: they queue in consent.js's stub)
    (re.compile(r"!function\(f,b,e,v,n,t,s\)\{if\(f\.fbq\)return;[\s\S]*?\}\(window,\s*document,\s*'script',\s*'https://connect\.facebook\.net/en_US/fbevents\.js'\);[ \t]*\n?"), ''),
    # fbq stub-only variants (consent.js defines fbq first, these are dead code)
    (re.compile(r"[ \t]*!function\(f\)\{if\(f\.fbq\)return;var n=f\.fbq=function\(\)\{[\s\S]*?\}\(window\);[ \t]*\n?"), ''),
    (re.compile(r"[ \t]*if\(!window\.fbq\)\{\(function\(f\)\{var n=f\.fbq=function\(\)\{[\s\S]*?\}\)\(window\);?\}[ \t]*\n?"), ''),
    # delayed tag loaders ("loadTags"), with the comment lines right above them
    (re.compile(r"(?:[ \t]*//[^\n]*\n)*[ \t]*\(function\(\)\{\s*var done=false;\s*function loadTags\(\)\{[\s\S]*?setTimeout\(loadTags,1200\);\}\);\}\s*\}\)\(\);[ \t]*\n?"), ''),
    # <noscript> Meta pixel image
    (re.compile(r'[ \t]*<noscript><img[^>]*facebook\.com/tr\?[^>]*>\s*</noscript>[ \t]*\n?'), ''),
    # old banner markup
    (re.compile(r'[ \t]*(?:<!-- Cookie Consent Banner -->\s*)?<div id="cookie-consent"[\s\S]*?</button>\s*</div>\s*</div>\s*</div>[ \t]*\n?'), ''),
    # old banner script (contains cookie_consent + declineCookies)
    (re.compile(r'[ \t]*<script>(?:(?!</script>)[\s\S])*?cookie_consent(?:(?!</script>)[\s\S])*?declineCookies(?:(?!</script>)[\s\S])*?</script>[ \t]*\n?'), ''),
    # wildlife pages: their own Clarity loader + "if accepted" block (consent.js does both now)
    (re.compile(r"[ \t]*function loadClarity\(\) \{\n[\s\S]*?\}\)\(window, document, \"clarity\", \"script\", \"[a-z0-9]+\"\);\n[ \t]*\}\n"), ''),
    (re.compile(r"[ \t]*if \(localStorage\.getItem\('cookie_consent'\) === 'accepted'\) \{\n[\s\S]*?loadClarity\(\);\n[ \t]*\}\n"), ''),
    # Google Maps embeds wait for consent
    (re.compile(r'<iframe src="(https://www\.google\.com/maps[^"]*)"'), r'<iframe data-consent-src="\1"'),
]
CAPI = re.compile(r'(function trackBooking\(\) \{\n)(?![ \t]*if \(!\(window\.saariConsent)')
CAPI_GUARD = r'\1    if (!(window.saariConsent && saariConsent.granted())) return;\n'
FIRST_GTAG = re.compile(r'([ \t]*)<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];')
OLD_TAG = re.compile(r'[ \t]*<script src="/js/consent\.js\?v=[^"]*"></script>[ \t]*\n?')


def transform(s, every=False):
    if 'gtag(' not in s and 'fbq(' not in s and 'cookie-consent' not in s:
        return s
    for rx, rep in R:
        s = rx.sub(rep, s)
    s = CAPI.sub(CAPI_GUARD, s)
    s = OLD_TAG.sub('', s)
    if every:  # generators hold one page template per gtag block
        s = FIRST_GTAG.sub(lambda m: m.group(1) + TAG + '\n' + m.group(0), s)
    else:
        m = FIRST_GTAG.search(s)
        if m:
            s = s[:m.start()] + m.group(1) + TAG + '\n' + s[m.start():]
    return s


def files():
    out = subprocess.check_output(['git', 'ls-files', '-z', '*.html'], cwd=ROOT).decode().split('\0')
    gens = ['build-articles.js', 'build-homepages.js', 'tools/sydosterbotten/build.js']
    return [f for f in out if f] + gens


def main():
    args = [a for a in sys.argv[1:] if a != '--check']
    check = '--check' in sys.argv
    changed = []
    for f in (args or files()):
        p = os.path.join(ROOT, f)
        s = open(p, encoding='utf-8').read()
        t = transform(s, every=f.endswith('.js'))
        if t != s:
            changed.append(f)
            if not check:
                open(p, 'w', encoding='utf-8').write(t)
    print(('would change' if check else 'changed'), len(changed), 'files')
    for f in changed[:20]:
        print('  ', f)
    sys.exit(1 if (check and changed) else 0)


if __name__ == '__main__':
    main()
