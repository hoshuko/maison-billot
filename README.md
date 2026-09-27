<div align="center">

<a href="https://hoshuko.github.io/maison-billot/en.html"><img src="https://hoshuko.github.io/assets/readme/billot-banner-en.jpg" alt="Maison Billot on desktop and mobile" width="100%"></a>

# Maison Billot

**A scroll-animated website for an artisan butcher: beef explained cut by cut.**

**English** · [Français](README.fr.md) · [Español](README.es.md)

[![Live demo](https://img.shields.io/badge/Live_demo-hoshuko.github.io-B01F2E?style=for-the-badge)](https://hoshuko.github.io/maison-billot/en.html) [![Promo video](https://img.shields.io/badge/Promo_video-60_s_%C2%B7_3_formats-0F2922?style=for-the-badge)](https://hoshuko.github.io/en.html#billot) [![Languages](https://img.shields.io/badge/Languages-FR_%C2%B7_EN_%C2%B7_ES-555555?style=for-the-badge)](#languages) [![License](https://img.shields.io/badge/License-PolyForm_Noncommercial-555555?style=for-the-badge)](LICENSE)

</div>

## Preview

<a href="https://hoshuko.github.io/en.html#billot"><img src="https://hoshuko.github.io/assets/readme/billot-preview-en.webp" alt="Animated preview of Maison Billot" width="100%"></a>

The site’s signature animation, taken from its 60-second promo video. [Watch the full promo video →](https://hoshuko.github.io/en.html#billot)

## Highlights

- **Anatomy on scroll.** The Salers cow splits into 23 photographed cuts, each linked to its exact area on the animal.
- **Cut guide.** Pick a dish (barbecue, pot-au-feu, tartare…) to see the cuts that suit it and where they sit, with instant search.
- **Cut cards.** Tenderness, marbling, flavour, cooking methods, dishes, the butcher’s tip and the price per kilo.
- **House-made, exploded.** The merguez shown ingredient by ingredient, plus pot-au-feu, bourguignon and barbecue kits.
- **Ageing room.** Slide from day 0 to day 60 and watch the rib, the tenderness and the price change.
- **Click & collect.** Build an order, pick a collection slot and get a summary to phone or text in. No payment on the site, and nothing is sent automatically.

## Screenshots

| Desktop | Mobile |
| :---: | :---: |
| <img src="https://hoshuko.github.io/assets/shots/billot-desktop-en.webp" alt="Maison Billot on desktop" width="560"> | <img src="https://hoshuko.github.io/assets/shots/billot-mobile-en.webp" alt="Maison Billot on mobile" width="200"> |

## Promo videos

Three formats, 60 seconds each, with music and sound effects created from scratch (no copyrighted audio). Click a poster to play the video.

| Landscape · 16:9 | Feed · 4:5 | Vertical · 9:16 |
| :---: | :---: | :---: |
| <a href="https://hoshuko.github.io/assets/video/billot-169-en.mp4"><img src="https://hoshuko.github.io/assets/video/billot-169-en.jpg" alt="Maison Billot promo video, Landscape · 16:9" width="360"></a> | <a href="https://hoshuko.github.io/assets/video/billot-45-en.mp4"><img src="https://hoshuko.github.io/assets/video/billot-45-en.jpg" alt="Maison Billot promo video, Feed · 4:5" width="180"></a> | <a href="https://hoshuko.github.io/assets/video/billot-916-en.mp4"><img src="https://hoshuko.github.io/assets/video/billot-916-en.jpg" alt="Maison Billot promo video, Vertical · 9:16" width="152"></a> |
| <sub>YouTube, websites</sub> | <sub>Facebook & Instagram feeds</sub> | <sub>Reels, Stories, WhatsApp</sub> |

## Languages

The site ships in French (`index.html`, default), English (`en.html`) and Spanish (`es.html`). Each language is a static page, so search engines and link previews see the right text, and the language switcher sits in the navigation.

## Under the hood

- The 23 areas are SVG polygons traced over the photo and clipped to the animal’s silhouette with a CSS mask; the scroll-driven scenes run on `requestAnimationFrame` with eased progress.
- Plain HTML, CSS and JavaScript: no framework, no dependency, no build step needed to run it.
- Content and interface text live in one file per language (`assets/js/data.fr.js · data.en.js · data.es.js`).
- WebP images, self-hosted fonts, `prefers-reduced-motion` support, keyboard navigation and layouts checked from 360 px wide.
- Privacy by design: no cookies, no analytics, no third-party requests, and a strict Content Security Policy.

## Run it locally

Any static web server works. With Python:

```bash
git clone https://github.com/hoshuko/maison-billot.git
cd maison-billot
python3 -m http.server 8000
```

Then open <http://localhost:8000>. To publish it, upload the folder to any static host (GitHub Pages, Netlify, Apache, Nginx…).

## Make it yours

Everything the shop updates lives in `assets/js/data.fr.js`, `data.en.js` and `data.es.js`: cuts and prices, house-made products, the counter, opening hours, phone number and interface text. Page copy is in `index.html`, `en.html` and `es.html`, and the colours are CSS variables at the top of `assets/css/style.css`.

## Credits

Photos come from Unsplash, Pexels and Wikimedia Commons; full attributions are listed in [CREDITS.md](CREDITS.md). Images adapted from CC BY-SA originals remain under that licence. Fonts are under the SIL Open Font License 1.1 ([`assets/fonts/OFL.txt`](assets/fonts/OFL.txt)). All names, addresses, phone numbers, prices and reviews are fictional.

## License

The code is released under the [PolyForm Noncommercial License 1.0.0](LICENSE). You may use, study and modify it for any non-commercial purpose: personal projects, learning, teaching, charities. Commercial use, such as delivering this template to a paying client, requires a separate licence: open an issue on this repository to ask. Photos and fonts keep their own licences (see above).

## Security

Found a vulnerability? Please report it privately from the repository’s **Security** tab (“Report a vulnerability”) rather than in a public issue. See [SECURITY.md](SECURITY.md).

## More templates

Part of **Storefronts in motion**, a series of three scroll-animated website templates:

- **[Tafat](https://github.com/hoshuko/tafat/blob/main/README.md)**: A website for a women-run home cleaning team on the Kabylian coast: a squeegee wipes the window clean as you scroll.
- **[Atelier Nacre](https://github.com/hoshuko/atelier-nacre/blob/main/README.md)**: A website for a nail studio in Bordeaux: a gel set taken apart layer by layer, a colour try-on and online booking.

Portfolio: <https://hoshuko.github.io/en.html> · YouTube: <https://www.youtube.com/@Hosh-uko>
