# MERAB SAMKHARADZE

**Angular Developer**
Angular · TypeScript · JavaScript (ES2015+) · RxJS / NgRx · HTML5 / CSS3 · SQL

+995 598 487 787 · samkharadzemerab@gmail.com · linkedin.com/in/merab-samkharadze-15301b131 · Tbilisi, Georgia

---

## PROFESSIONAL SUMMARY

Angular developer with **2+ years of professional web development**, currently shipping Angular in **two live products at the same time** — a promotions platform with **100k+ active users** and a cross-border Health Tech marketplace — while maintaining a third product of my own in production. Daily work is enterprise-shaped: Angular v14–v21 with RxJS, NgRx and Signals, standalone components, lazy loading and OnPush change detection, on modern JavaScript (ES2015+) and TypeScript in strict mode, with semantic HTML5 and SCSS/BEM front ends that hold up in every supported browser.

I own a **50+ component shared library** and work in **modular, monorepo-style architectures with enforced import boundaries**, so a growing codebase stays navigable. I apply **OOP and SOLID** beyond the client layer — production REST APIs in Node.js, a NestJS service layer, and **SQL** schemas I design, index and tune myself. I keep unit-test suites green (**104 tests**, Jest-compatible runner) and review every pull request before it reaches main.

Analytical by habit: I measure before I optimise. That habit is how I found and removed **7 seconds** of pointless work from a page load, and how I proved a WebSocket failure was a server-side specification violation rather than a client bug.

---

## TECHNICAL SKILLS

**Angular**
Angular v14–v21 · RxJS · NgRx · Signals · Standalone Components · Reactive Forms · Router & Lazy Loading · OnPush Change Detection · Dependency Injection · HttpClient & Functional Interceptors · Angular CLI · PrimeNG · SPA architecture · SSR / SSG pre-rendering

**JavaScript & TypeScript**
JavaScript ES2015+ and latest ECMAScript specifications · TypeScript (strict mode) · Promises & async/await · Classes, Modules & Prototypes · Closures · Generics & Utility Types · optional chaining / nullish coalescing · immutable data patterns

**Architecture & Tooling**
OOP principles (encapsulation, abstraction, inheritance, polymorphism) · SOLID · design patterns · **modular / monorepo architecture with enforced import boundaries** · component-driven development · DTO validation · code review · **Nx workspace (monorepo)** · **Storybook** _(working knowledge — see note)_

**Testing**
**Jest** · **Vitest** · Angular TestBed · unit testing · test-suite recovery and maintenance · Jest-compatible assertion & spy API

**Databases & SQL**
SQL · relational schema design · joins, indexing & query optimisation · migrations · row-level security · full-text search (tsvector / GIN)
· **PostgreSQL** · **MySQL** · **MS SQL / T-SQL** _(working knowledge)_

**Backend & APIs**
REST API design & integration · Node.js · NestJS · WebSockets · JWT & role-based authorisation · Postman

**HTML & CSS**
Semantic HTML5 · CSS3 · SCSS · BEM · Flexbox · CSS Grid · mobile-first responsive design · cross-browser compatibility · Tailwind CSS · Figma / Zeplin hand-off · accessibility (WCAG)

**Methodologies & Tools**
Agile teamwork · Git feature-branch flow · pull-request review · internationalisation (i18n) · WebStorm / VS Code · npm / yarn

---

## WORK EXPERIENCE

### Angular Developer — Crocobet

_Tbilisi, Georgia · Promotions & campaigns platform · 100k+ active users_
**07/2025 – Present**

- **Own the Angular (v14+) front end** of a platform with **100k+ active users**, built with TypeScript, RxJS and NgRx for real-time campaign state shared consistently across every view.
- Shipped **20+ campaign UIs** end-to-end from design hand-off to production — several running **simultaneously**, each on a launch date fixed before the work started.
- Built and maintain a **shared library of 50+ responsive components** in SCSS BEM, Flexbox and CSS Grid with full cross-browser compatibility — a component-driven library where each component is developed and reviewed in isolation before it enters a campaign.
- **Cut initial load time across the 5 heaviest modules** with lazy-loaded feature modules and **OnPush change detection**.
- Wrote the production REST APIs in Node.js behind campaign workflows where that was faster than waiting for them, applying **OOP and SOLID** so the client–service contract was designed once rather than negotiated twice.
- Keep a 5-person team's codebase release-ready through **code review on every pull request** before merge.

### Angular Developer — MedSocial

_Remote · Cross-border Health Tech marketplace, run in parallel with the Crocobet role · medsocial.online_
**06/2026 – Present**

- Joined an **Angular 21 / TypeScript-strict** codebase another developer had been building for 3.5 months and **wrote 45% of the source in 5 weeks** — 81 commits, 207 files touched, 42 created, all merged to main through **reviewed pull requests**.
- Built the entire 1:1 doctor–patient chat over **WebSockets**: transport with subprotocol authentication and reconnect backoff, optimistic send, presence, typing indicators, an offline outbox and gap healing over REST.
- **Cut the listings page from a 7.9–9.4s blank screen to 0ms**, and requests before first paint from 6 to 1, by measuring the load first and then deleting two calls that cost 7 seconds and served no purpose.
- Migrated a site containing a single `@media` rule to a four-tier responsive system with shared breakpoints and a matchMedia service, reviewing each tier and fixing **27 defects** before release.
- Rebuilt the auth chain with **functional HTTP interceptors** — one token refresh per 401 with the other failed requests queued behind it, plus proactive refresh scheduled from the JWT `exp` claim.
- **Took the unit-test suite from 33 failing spec files to fully green — 78 files, 104 tests** (Vitest, Jest-compatible API), then audited the codebase into a prioritised 551-line backlog and closed 48 items from it.

### React / Next.js Developer — Adaptcore

_Tbilisi, Georgia · Hotel & restaurant management platform_
**09/2024 – 04/2025**

- Took the front end from an empty repository to a live product for **3+ business clients** — bookings, menus, orders and role-based admin dashboards in Next.js, React, TypeScript and SCSS.
- **Reduced page load times by 25%** by removing unnecessary re-renders and refactoring component trees that had grown too deep.
- **Cut post-release bugs by 15%** by introducing structured debugging practices and making **code review mandatory** before every merge to main.
- Specified and integrated **10+ REST endpoints** with the backend team, enabling real-time booking updates and role-based access control; ran bi-weekly knowledge-sharing sessions for 4 developers.

---

## PROJECTS

### dasaqmdi.com — Bilingual Job Board

_Live product · sole author of all 291 commits_

- Authored the complete **PostgreSQL** schema alone: **37 migrations, 53 row-level security policies across 14 tables**, 8 triggers and 34 indexes, serving seeker, employer and administrator roles.
- Replaced an unindexed five-column `ILIKE` chain with a weighted `tsvector` and a **GIN index**, turning full-text search into an indexed lookup.
- Designed, built and shipped the whole product **alongside full-time work**: 45 pages, 143 components, 271 pages pre-rendered, shared First Load JS held at 102 kB.

### Full-Stack Application — Angular + NestJS + SQL

_Personal project_

- Structured the NestJS API around **OOP fundamentals** — encapsulated services, interface-driven providers and constructor injection throughout — with **DTO classes** and decorator-based validation guarding every request contract.
- Designed a normalised relational schema and wrote the queries against it: multi-table joins, indexes and aggregate reporting; **JWT authentication with role-based guards** on every protected route.

### Portfolio — Angular 21

_Open source_

- Standalone components, signal-based state, zoneless change detection, strict TypeScript; **47 unit tests**; ESLint rules that **enforce architectural import boundaries** at build time; pre-rendered to static HTML.

---

## EDUCATION & TRAINING

- **React with Next.js Framework** — TBC IT Academy, Tbilisi · 09/2024 – 01/2025
  3 full-stack projects; component architecture, SSR / SSG; +30% page performance. Taken while working full time as a developer.
- **JavaScript & Node.js (Advanced)** — Academy of Digital Industries, Tbilisi · 05/2024 – 08/2024
  80+ hours: closures, prototypes, Promises, async/await, OOP.
- **Master's Degree, International Economics** — Tbilisi State University · 09/2021 – 06/2023
  Econometrics, statistical modelling, applied mathematics.
- **Bachelor's Degree, Economics** — Tbilisi State University · 09/2016 – 06/2021

---

## LANGUAGES

Georgian (Native) · English (Professional working proficiency)

---

## KEY COMPETENCIES & SOFT SKILLS

- **Handling multiple projects simultaneously** — two live Angular products in parallel (Crocobet and MedSocial) plus a product of my own built and shipped to production. Nothing slipped in either.
- **Prioritisation & organisation** — 20+ campaigns delivered on dates fixed before the work started. At MedSocial I audited an unfamiliar codebase into a prioritised 551-line backlog and closed 48 items from it in five weeks.
- **Analytical & problem-solving** — proved a WebSocket 1006 failure was a server-side specification violation by reproducing it with `curl` and a Node client when browser DevTools could not show it; wrote a measurement script instead of guessing, which is how 7 seconds of pointless page load were found and removed.
- **Independent initiative** — wrote the Node.js REST APIs behind campaign workflows myself where waiting would have been slower; introduced mandatory code review at Adaptcore, which cut post-release bugs 15%.
- **Agile teamwork & communication** — review every pull request in a 5-person team, work directly from design hand-off with business stakeholders, and ran bi-weekly knowledge-sharing sessions for 4 developers.
- **Quick learner** — moved from economics degrees into production development through two specialist IT programmes, and reached 45% authorship of an unfamiliar Angular 21 codebase within five weeks of joining it.
