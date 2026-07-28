# Merab Samkharadze — Portfolio

A single-page personal portfolio built in **Angular 21**: who I am, what I work with, what I have
shipped, where I worked and where I studied.

It is also a working sample of how I structure an Angular application — standalone components,
signal-based state, zoneless change detection, strict TypeScript and a tested core.

---

## Tech stack

| Concern          | Choice                                                            |
| ---------------- | ----------------------------------------------------------------- |
| Framework        | Angular 21.2 — standalone components, **zero NgModules**           |
| Change detection | **Zoneless** (`provideZonelessChangeDetection`), OnPush everywhere |
| State            | Signals (`signal` / `computed`), no external store needed          |
| Styling          | Tailwind CSS v4, CSS-first `@theme` tokens                         |
| Forms            | Reactive Forms, strictly typed via `nonNullable.group`             |
| Testing          | Vitest — 42 cases                                                  |
| Types            | TypeScript strict + `strictTemplates`                              |
| Bundle           | ~76 kB transferred, ~306 kB raw                                    |

> **Node note:** Angular 22 needs Node ≥ 22.22.3; this machine runs 22.17.0, so the project targets
> Angular 21.2 — the latest release that runs here. `ng update` handles the jump once Node is upgraded.

---

## Architecture

```
src/app/
├── core/                         # singletons + data, imported by features only
│   ├── models/portfolio.model.ts     # every entity on the page, typed
│   ├── data/portfolio.content.ts     # ← ALL COPY LIVES HERE
│   └── services/
│       ├── portfolio-store.ts        # signal façade + derived views
│       ├── scroll-spy.ts             # active section, progress, smooth navigation
│       └── contact-api.ts            # POST when configured, mailto fallback otherwise
├── shared/                       # reusable, domain-agnostic
│   ├── directives/
│   │   ├── reveal-observer.ts        # ONE IntersectionObserver for the whole page
│   │   └── reveal.ts                 # [appReveal] scroll choreography
│   └── ui/  icon · chip · section-heading
├── layout/   navbar · footer
└── features/ hero · about · skills · projects · experience · education · contact
```

Three rules hold the structure together:

1. **`features` may import `shared` and `core`. Never the reverse, never sideways.**
2. **Content is data, not markup.** Updating the CV means editing `portfolio.content.ts`; no template
   changes, and the compiler catches anything you break.
3. **One observer, not sixty.** `RevealObserver` is a root singleton shared by every `[appReveal]`
   element; each element unobserves itself after it has animated in once.

---

## Commands

```bash
npm install

npm start          # dev server → http://localhost:4200
npm test           # 42 unit tests
npm run build      # production bundle → dist/portfolio/browser
```

---

## Editing the content

Everything is in [`src/app/core/data/portfolio.content.ts`](src/app/core/data/portfolio.content.ts).

- **Skills** — each entry carries a `level` (`production` / `strong` / `working` / `familiar`) which
  drives the chip styling and the level legend. Only `production` and `strong` entries appear in the
  hero marquee.
- **Projects** — set `featured: false` to drop a project into the compact list at the bottom.
- **New CV** — replace `public/Merab_Samkharadze_CV.pdf` (keep the filename, or update
  `PROFILE.cvUrl` and the `download` attributes).
- **Photo** — replace `public/profile.jpg`.

### Theme

The whole identity comes off three numbers at the top of
[`src/styles.css`](src/styles.css):

```css
:root {
  --accent-h: 14;
  --accent-s: 100%;
  --accent-l: 58%; /* #ff5d2a */
}
```

An 11-step ramp (`--color-primary-50` … `--color-primary-950`) is declared in `@theme`, so
`bg-primary-300`, `text-primary-700` and friends are available as utilities.

### Contact form

`CONTACT_ENDPOINT` is empty by default, so the form composes a fully pre-filled `mailto:` and hands
it to the visitor's mail client — a real, working path with no server. Point that constant at a
Formspree / Netlify Forms / custom endpoint and it POSTs there instead; the mailto stays as the
fallback if the request fails.

---

## Deployment

The output is fully static:

```bash
npm run build
# deploy dist/portfolio/browser/** to Netlify, Vercel, GitHub Pages, Cloudflare Pages…
```

Configure the host to rewrite unknown paths to `index.html`. `index.html` already carries the title,
description, Open Graph / Twitter cards and JSON-LD `Person` structured data.

---

## Accessibility & performance

- Skip link, one `<h1>`, semantic landmarks, `aria-current` on the active nav item,
  `aria-expanded` + `inert` on the mobile menu.
- Full `prefers-reduced-motion` support — every reveal, marquee and float is disabled at the CSS
  layer, so nothing depends on a JavaScript branch.
- A print stylesheet turns the page into a readable one-pager (`.no-print` hides the chrome).
- Fonts preconnected and `display=swap`; the hero portrait is `fetchpriority="high"`.
