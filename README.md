# Yoru Bakes — Baker editorial redesign

HTML5, Tailwind CDN, Vanilla JavaScript, GSAP 3.12.5 / ScrollTrigger, Lenis 1.1.13, Lucide, Google Fonts. Run `npm run dev` and open http://127.0.0.1:4173. `npm run build` prepares `dist/` for static hosting.

`index.html` contains semantic sections and inline brand SVGs. `style.css` contains responsive styling that also works without Tailwind. `app.js` handles the carousel, smooth scroll, reveals, signature animation, cat interactions, mobile menu, product details, shopping bag, and newsletter validation.

The original brand sheet viewBox is `0 0 363.93 714.36`; the brief's proposed coordinates extend outside it. Original paths are embedded with corrected crops: horizontal `40 0 255 160`, stacked `80 240 170 255`, minimal cat `0 595 70 65`, whiskered cat `125 595 95 65`, sitting cat `252 555 112 160`. White cutout paths are preserved. The animated tail is an additional decorative layer.

This is a frontend template. Newsletter validates locally without saving email or subscribing visitors. Bag quantities and copying are functional; payments/order submission are not connected. Menu, prices, copy, testimonials, and customer personas are marked illustrative. Add verified address, opening hours, social URL, customer reviews, and backend integrations before commercial launch.

Reduced motion disables scroll animations and defaults the carousel to paused. Autoplay pauses on hover, keyboard focus, and tab visibility changes. Dialogs support Escape and keyboard focus. CDN failure retains layout, ordinary scrolling, and the loader timeout.

Local Unsplash photos: Zeinab Bt (Ld-5d4x18wQ), Jeff Siepman (MssPSnkV1yM), personalgraphic.com (VzUE5RtCuBA), Stacy (yhajzIMUp-g), Vicky Nguyen (XDS-YmjUUvY). Original bakery/bread photos retained. Credits are linked from the footer. Photos are illustrative, not actual Yoru products.
