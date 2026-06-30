# Time Square Media — Website

A modern OOH + Digital Marketing agency site for **Time Square Media Pvt. Ltd.**, built with
**Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

The design takes its structural rhythm and animation feel from the Big Tree Outdoor reference
(bold hero → impact stats → solutions → client wall → contact) but has its own identity built
around the brand name: a **Times Square marquee ticker** and **chase-light bulbs**, with an
amber-on-ink "billboard at night" palette.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

To build for production:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx        Fonts (Anton / Space Grotesk / Space Mono) + metadata
  page.tsx          Assembles all sections
  globals.css       Design tokens, marquee bulb strip, reduced-motion
components/          One file per section + animation primitives
lib/data.ts         All content (services, cities, work, clients, offices)
```

## Customising

- **Content**: everything lives in `lib/data.ts` — edit services, cities, portfolio,
  clients, phone/email and social links there.
- **Phone & email**: placeholders are marked with `// TODO` in `lib/data.ts`.
- **Colours / fonts**: `tailwind.config.ts` (tokens) and `app/layout.tsx` (fonts).
- **Project images**: the work cards use gradient panels as stand-ins. Drop real campaign
  photos into `public/` and render them inside `components/Work.tsx` to replace the gradients.

## Notes

- Animations respect `prefers-reduced-motion`.
- Fully responsive down to mobile; keyboard-focusable navigation.
- No project images are bundled — all visuals are CSS so the site runs offline out of the box.
