#!/usr/bin/env python3
"""build-share-cards.py — 1200×630 share images (og:image / twitter:image) for every page
that references one, so link previews on WhatsApp, Facebook, LinkedIn and Google Discover
get a full-size card even though the article photos themselves are 500–1000 px wide.

Usage:
  python3 build-share-cards.py             # render every card the HTML references into images/og/
  python3 build-share-cards.py --sample images/cat-tooth-resorption-xray.webp /tmp/card.jpg

How it works: pages reference `/images/og/<name>.jpg`; `<name>` is the source photo's path
under images/ without extension, with "/" written as "__" (wildlife/joutsen-poliisi.jpg →
og/wildlife__joutsen-poliisi.jpg). build-articles.js emits those URLs for articles and
service pages that carry a clinic photo; the hand-built pages were pointed at them by hand.
The card = the photo fitted on a soft, blurred version of itself (never upscaled more than
1.6×, so X-rays and phone photos stay sharp) with the clinic's horizontal logo bottom-left.
Deterministic output: a card is rewritten only when its bytes change, so rebuilds are no-ops.
Run it after `node build-articles.js` whenever a figure is added or changed.
Requires Pillow (python3 -c "import PIL").
"""
import glob, io, os, re, sys
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)
W, H = 1200, 630
PAD = 40
MAX_UPSCALE = 1.6
LOGO = 'images/logo-horizontal.png'
OUT_DIR = 'images/og'
BASE = 'https://elainklinikkasaari.fi'

def source_for(name):
    rel = name.replace('__', '/')
    for ext in ('webp', 'jpg', 'jpeg', 'png'):
        p = f'images/{rel}.{ext}'
        if os.path.exists(p):
            return p
    return None

def render(src_path):
    src = Image.open(src_path).convert('RGB')
    sw, sh = src.size
    # background: the photo scaled to cover the canvas, blurred, lifted towards white
    scale_bg = max(W / sw, H / sh)
    bg = src.resize((max(W, round(sw * scale_bg)), max(H, round(sh * scale_bg))), Image.LANCZOS)
    bx, by = (bg.width - W) // 2, (bg.height - H) // 2
    bg = bg.crop((bx, by, bx + W, by + H)).filter(ImageFilter.GaussianBlur(28))
    bg = Image.blend(bg, Image.new('RGB', (W, H), (255, 255, 255)), 0.58)
    # foreground: the photo fitted into the safe area, upscaled at most MAX_UPSCALE
    box_w, box_h = W - 2 * PAD, H - 2 * PAD
    scale = min(box_w / sw, box_h / sh, MAX_UPSCALE)
    fw, fh = round(sw * scale), round(sh * scale)
    fg = src.resize((fw, fh), Image.LANCZOS)
    fx, fy = (W - fw) // 2, (H - fh) // 2
    # soft shadow behind the photo
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((fx + 6, fy + 10, fx + fw + 6, fy + fh + 10), radius=18, fill=(26, 26, 46, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    card = bg.convert('RGBA')
    card.alpha_composite(shadow)
    mask = Image.new('L', (fw, fh), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, fw - 1, fh - 1), radius=16, fill=255)
    card.paste(fg, (fx, fy), mask)
    # logo pill, bottom-left
    logo = Image.open(LOGO).convert('RGBA')
    lh = 54
    logo = logo.resize((round(logo.width * lh / logo.height), lh), Image.LANCZOS)
    pill_w, pill_h = logo.width + 40, lh + 24
    px, py = PAD - 8, H - PAD + 8 - pill_h
    pill = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(pill).rounded_rectangle((px, py, px + pill_w, py + pill_h), radius=pill_h // 2, fill=(255, 255, 255, 235))
    card.alpha_composite(pill)
    card.alpha_composite(logo, (px + 20, py + 12))
    out = io.BytesIO()
    card.convert('RGB').save(out, 'JPEG', quality=84, optimize=True, progressive=True)
    return out.getvalue()

def main():
    if len(sys.argv) >= 3 and sys.argv[1] == '--sample':
        data = render(sys.argv[2]); open(sys.argv[3], 'wb').write(data)
        print(f'sample written: {sys.argv[3]} ({len(data) // 1024} KB)'); return
    needed = set()
    for f in glob.glob('**/*.html', recursive=True):
        if f.startswith('.') or '/.' in f:
            continue
        for m in re.finditer(re.escape(BASE) + r'/images/og/([A-Za-z0-9._-]+)\.jpg', open(f, encoding='utf-8').read()):
            needed.add(m.group(1))
    os.makedirs(OUT_DIR, exist_ok=True)
    written = unchanged = 0
    for name in sorted(needed):
        src = source_for(name)
        if not src:
            print(f'  WARN: no source photo for og/{name}.jpg'); continue
        data = render(src)
        out = f'{OUT_DIR}/{name}.jpg'
        if os.path.exists(out) and open(out, 'rb').read() == data:
            unchanged += 1; continue
        open(out, 'wb').write(data); written += 1
    stale = sorted(set(os.path.basename(p)[:-4] for p in glob.glob(f'{OUT_DIR}/*.jpg')) - needed)
    for name in stale:
        os.remove(f'{OUT_DIR}/{name}.jpg')
    print(f'share cards: {len(needed)} referenced, {written} written, {unchanged} unchanged, {len(stale)} stale removed')

if __name__ == '__main__':
    main()
