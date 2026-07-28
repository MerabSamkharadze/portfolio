# Merab Samkharadze — Angular Developer Portfolio

A single-page portfolio built in **Angular 21**, written against one specific job posting:
**Angular Developer, Bank of Georgia**.

Its job is not to look like a portfolio. It is to let a reviewer confirm the fit in under a
minute — and then, if they care how the candidate builds things, to be worth reading as source.

---

## The strategy

The vacancy names a short, concrete list of requirements. Every one of them is answered on the
page in the posting's own vocabulary, with evidence traceable to a line in the CV.

| Vacancy asks for                       | Weight    | Status       | Evidence in the CV                                                  |
| -------------------------------------- | --------- | ------------ | ------------------------------------------------------------------- |
| 2–3 years with web technologies        | required  | direct       | Crocobet 07/2025→now, Adaptcore 09/2024–04/2025                     |
| Excellent Angular                      | required  | direct       | Angular v14+, NgRx, RxJS, lazy loading, OnPush, 100k-user platform  |
| Excellent JavaScript / latest ES specs | required  | direct       | TypeScript daily + 80h advanced ES6+ (Academy of Digital Industries)|
| Good HTML and CSS                      | required  | direct       | 50+ responsive components, SCSS/BEM, Flexbox, CSS Grid              |
| Web dev concepts & methodologies       | required  | direct       | SPA architecture, REST, Git flow, code review, Agile                |
| Strong OOP                             | required  | strong       | Angular DI + NestJS modules, providers, DTO classes                 |
| Multiple projects, delivered on time   | required  | direct       | 20+ campaign UIs against fixed marketing launch dates               |
| Analytical / problem-solving / learner | required  | direct       | −15% post-release bugs, bi-weekly sessions for 4 devs               |
| IT / CS / Applied Maths degree         | required  | transferable | BSc + MSc Economics (TSU, quantitative) + 2 specialist IT programmes|
| SQL databases (MS SQL, Oracle)         | preferred | transferable | PostgreSQL/MySQL schema design, joins, indexing → ANSI SQL          |
| Jest testing                           | preferred | strong       | The 42-case suite in this repository, written against the Jest API  |
| Storybook                              | preferred | **growing**  | 50+ isolated input-driven components; Storybook itself in progress  |
| Nrwl Nx workspace                      | preferred | **growing**  | core / shared / features boundaries that map onto Nx libraries      |

The two `growing` rows are labelled honestly on the page rather than hidden. That is deliberate:
a weighted **90%** with two visible gaps is more persuasive than an unweighted 100% that a
technical interviewer will puncture in the first five minutes.

The score is computed, not typed in — see `STATUS_WEIGHT` in
[`portfolio-store.ts`](src/app/core/services/portfolio-store.ts). Change a status in the content
file and the gauge, the counter and the copy all follow.

**Angle worth keeping:** the Economics BSc/MSc is framed as an asset *for a bank* — quantitative
training plus fluency in the language business units actually speak — rather than as a missing
CS degree.

---

## Tech stack

| Concern          | Choice                                                              |
| ---------------- | ------------------------------------------------------------------- |
| Framework        | Angular 21.2 — standalone components, **zero NgModules**             |
| Change detection | **Zoneless** (`provideZonelessChangeDetection`), OnPush everywhere   |
| State            | Signals (`signal` / `computed`), no external store needed            |
| Styling          | Tailwind CSS v4, CSS-first `@theme` tokens                           |
| Forms            | Reactive Forms, strictly typed via `nonNullable.group`               |
| Testing          | Vitest (Jest-compatible API) — 42 cases                              |
| Types            | TypeScript strict + `strictTemplates`                                |
| Bundle           | ~80 kB transferred, ~320 kB raw                                      |

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
│       ├── portfolio-store.ts        # signal façade + derived views (match score)
│       ├── scroll-spy.ts             # active section, progress, smooth navigation
│       └── contact-api.ts            # POST when configured, mailto fallback otherwise
├── shared/                       # reusable, domain-agnostic
│   ├── directives/
│   │   ├── reveal-observer.ts        # ONE IntersectionObserver for the whole page
│   │   └── reveal.ts                 # [appReveal] scroll choreography
│   └── ui/  icon · chip · section-heading
├── layout/   navbar · footer
└── features/ hero · about · role-fit · skills · projects · experience · education · contact
```

Three rules hold the structure together:

1. **`features` may import `shared` and `core`. Never the reverse, never sideways.** Those are
   exactly Nx library boundaries — the folders can become libs without moving a line of logic.
2. **Content is data, not markup.** Editing the CV means editing `portfolio.content.ts`; no
   template changes, and the compiler catches anything you break.
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

- **Retargeting to a different vacancy** — change `PROFILE.targetRole` / `targetCompany`, then
  rewrite `REQUIREMENT_MATCHES` against the new posting. The hero badge, the section lead copy and
  the match gauge all update from those values.
- **Adjusting a claim** — each `RequirementMatch` has a `status` of `direct` / `strong` /
  `transferable` / `growing`. It drives the badge, the card border and the weighted score.
- **Skills** — each entry carries a `level`; the chip styling follows from it.
- **New CV** — replace `public/Merab_Samkharadze_CV.pdf` (keep the filename, or update
  `PROFILE.cvUrl` and the `download` attributes).
- **Photo** — replace `public/profile.jpg`.

### Contact form

`CONTACT_ENDPOINT` is empty by default, so the form composes a fully pre-filled `mailto:` and
hands it to the visitor's mail client — a real, working path with no server. Point that constant
at a Formspree / Netlify Forms / custom endpoint and it POSTs there instead; the mailto stays as
the fallback if the request fails.

---

## Deployment

The output is fully static:

```bash
npm run build
# deploy dist/portfolio/browser/** to Netlify, Vercel, GitHub Pages, Cloudflare Pages…
```

Configure the host to rewrite unknown paths to `index.html`. `index.html` already carries the
title, description, Open Graph / Twitter cards and JSON-LD `Person` structured data.

---

## Accessibility & performance

- Skip link, one `<h1>`, semantic landmarks, `aria-current` on the active nav item,
  `aria-expanded` + `inert` on the mobile menu.
- Full `prefers-reduced-motion` support — every reveal, marquee and float is disabled at the CSS
  layer, so nothing depends on a JavaScript branch.
- A print stylesheet turns the page into a readable one-pager (`.no-print` hides the chrome).
- Fonts preconnected and `display=swap`; the hero portrait is `fetchpriority="high"`.
