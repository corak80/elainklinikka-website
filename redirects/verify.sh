#!/bin/bash
# Cutover-day verifier for the elainklinikkasaari.fi migration.
# Curls every legacy URL in slug_map.json against the live domain and asserts
# a 301 to the expected target, then spot-checks carried-over worker logic and
# pass-throughs. Run AFTER Task 6 (Workers deployed + routes attached).
#
# Usage: ./verify.sh [host]   (default https://elainklinikkasaari.fi)
set -u
HOST="${1:-https://elainklinikkasaari.fi}"
DIR="$(cd "$(dirname "$0")" && pwd)"
PASS=0; FAIL=0

check_redirect() { # old-path expected-location-path
  local old="$1" want="$HOST$2" got
  got=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' --max-time 15 "$HOST$old")
  if [ "$got" = "301 $want" ]; then
    PASS=$((PASS+1))
  else
    FAIL=$((FAIL+1)); echo "FAIL $old -> $got (wanted 301 $want)"
  fi
}

check_status() { # path expected-status
  local code
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$HOST$1")
  if [ "$code" = "$2" ]; then
    PASS=$((PASS+1))
  else
    FAIL=$((FAIL+1)); echo "FAIL $1 -> $code (wanted $2)"
  fi
}

# 1. Every rule in slug_map.json
while IFS=$'\t' read -r old new; do
  check_redirect "$old" "$new"
done < <(python3 -c "
import json, sys, urllib.parse, os
d = json.load(open(os.path.join('$DIR', 'slug_map.json')))
for g, rules in d.items():
    if g == '_comment': continue
    for old, new in rules.items():
        print(old + '\t' + urllib.parse.quote(new, safe='/.-'))
")

# 2. Carried-over saarivet-redirects logic
check_redirect '/?lang=en' '/en/'
check_redirect '/?lang=sv' '/sv/'
check_redirect '/sv/veterinar-vasa/tjanster/tandvard/' '/sv/tjanster/tandvard/'
check_redirect '/en/articles/ripuli.html' '/en/articles/diarrhoea.html'
check_redirect '/sv/artiklar/ripuli.html' '/sv/artiklar/diarre.html'

# 3. Pass-throughs must serve the new site directly (200, no redirect)
check_status '/' 200
check_status '/palvelut/akupunktio/' 200
check_status '/artikkelit/' 200
check_status '/sitemap.xml' 200

# 4. Blanket saarivet.fi -> elainklinikkasaari.fi
got=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' --max-time 15 'https://saarivet.fi/palvelut/?x=1')
if [ "$got" = "301 https://elainklinikkasaari.fi/palvelut/?x=1" ]; then
  PASS=$((PASS+1))
else
  FAIL=$((FAIL+1)); echo "FAIL saarivet.fi blanket -> $got"
fi

echo "----"
echo "$PASS passed, $FAIL failed"
exit $((FAIL > 0))
