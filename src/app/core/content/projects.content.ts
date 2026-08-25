import type { Project } from '@core/models';

/**
 * Same ordering as the experience timeline, so a reader moving between the two
 * sections meets the work in the same sequence. `featured: false` drops an entry
 * into the compact list at the bottom regardless of its position here.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: 'promotions-platform',
    title: 'Promotions & Campaigns Platform',
    context: 'Crocobet · Production',
    period: '07/2025 – Present',
    summary:
      'Everything a customer sees while a promotion is running — leaderboards, prize wheels, ' +
      'quests, raffles, progress campaigns. Real-time state, heavy traffic, and a marketing ' +
      'calendar that treats the launch date as a fact rather than a target.',
    highlights: [
      '**Real-time campaign state** held together with NgRx and RxJS, so leaderboard, balance and progress data stay consistent across every view without redundant HTTP traffic.',
      '**A shared component library** in SCSS BEM, Flexbox and CSS Grid, so a campaign can be assembled from tested parts instead of rebuilt each time.',
      '**Lazy-loaded feature modules** and OnPush change detection across the five heaviest modules, cutting what the browser has to do before the first paint.',
      '**Production REST APIs** written in Node.js alongside the front-end feature, so the contract between client and service was designed once rather than negotiated twice.',
    ],
    stack: [
      'Angular v14+',
      'TypeScript',
      'RxJS',
      'NgRx',
      'SCSS (BEM)',
      'Node.js',
      'REST APIs',
      'Git',
    ],
    metrics: [
      { value: '100k+', label: 'Active users' },
      { value: '20+', label: 'Campaign UIs' },
      { value: '50+', label: 'Components' },
      { value: '5', label: 'Modules optimised' },
    ],
    links: [],
    featured: true,
  },
  {
    id: 'medsocial',
    title: 'MedSocial — Cross-Border HealthTech Marketplace',
    context: 'Remote · Live MVP · Backend: Django REST Framework + Channels',
    period: '06/2026 – Present',
    summary:
      'A marketplace connecting patients with doctors across borders: doctors publish procedures ' +
      'with prices and discounts, patients search by country, city, category and price, book, ' +
      'message and review. I joined three and a half months after the first commit, on a codebase ' +
      'written entirely by someone else.',
    highlights: [
      '**Built the whole real-time chat**: a WebSocket transport with subprotocol auth, backoff with jitter, a distinct “never connected” state, and a discriminated-union frame model — over an application layer doing optimistic send, clientId reconciliation, presence, typing, an offline outbox and gap healing over REST.',
      '**Proved a 1006 handshake failure was a backend bug** by reproducing it with curl and a Node ws client: the server returned 101 without echoing the negotiated subprotocol, which the specification requires the client to reject. Browser DevTools alone could not have shown that.',
      '**Wrote a console measurement script** rather than guessing at the /procedures load time. It showed two requests, costing 3397ms and 3728ms, that existed only to set the scale of a price slider. I had already made them cheaper three times before asking whether they were needed at all — they were not, so I deleted them and about 90 lines with them.',
      '**Took the site from one @media rule** to a four-tier responsive system with a shared breakpoints.scss and a matchMedia ResponsiveService, no Angular CDK, and desktop-down overrides so the working desktop layout was never put at risk.',
      '**Found bugs nobody had questioned in three months**: HttpParams misuse that silently dropped pagination, a filter the API had never accepted, and an endpoint missing the trailing slash its own specification requires.',
    ],
    stack: [
      'Angular 21.2',
      'TypeScript 5.9 (strict)',
      'Signals',
      'RxJS 7.8',
      'WebSockets',
      'PrimeNG 21.1',
      'SCSS',
      'Vitest 4',
      'date-fns',
    ],
    metrics: [
      { value: '45%', label: 'Of the source is mine' },
      { value: '81', label: 'Commits in 5 weeks' },
      { value: '6 → 1', label: 'Requests before paint' },
      { value: '33 → 0', label: 'Failing spec files' },
    ],
    links: [
      {
        label: 'Visit medsocial.online',
        href: 'https://medsocial.online/home',
        icon: 'arrowUpRight',
      },
    ],
    featured: true,
  },
  {
    id: 'hospitality-platform',
    title: 'Hotel & Restaurant Management Platform',
    context: 'Adaptcore · Production · 3+ business clients · Next.js',
    period: '09/2024 – 04/2025',
    summary:
      'Bookings, menus, orders and role-based admin dashboards, built in Next.js. I took the front ' +
      'end from an empty repository to something three hospitality businesses now run their day on.',
    highlights: [
      '**Four surfaces out of one Next.js codebase**: public booking, menu management, order handling and a role-gated admin dashboard.',
      '**Specified 10+ REST endpoints** with the backend team rather than consuming whatever arrived, which is what made real-time booking updates and role-based controls possible at all.',
      '**Traced a 25% load-time improvement** to unnecessary re-renders and component trees that had grown too deep — the cost was in the render path, not in the bundle.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'SCSS', 'REST APIs', 'RBAC'],
    metrics: [
      { value: '25%', label: 'Faster loads' },
      { value: '15%', label: 'Fewer bugs' },
      { value: '10+', label: 'API endpoints' },
      { value: '3+', label: 'Business clients' },
    ],
    links: [],
    featured: true,
  },
  {
    id: 'dasaqmdi',
    title: 'dasaqmdi.com — Bilingual Job Board',
    context: 'Personal product · Live · Sole author of 291 commits',
    period: '03/2026 – 07/2026',
    summary:
      'A Georgian/English job board serving three roles from one codebase: seekers browse and ' +
      'apply, employers run a five-stage applicant pipeline, admins moderate with a full audit ' +
      'log. I built all of it — the PostgreSQL schema and its policies, the application, and the ' +
      'SEO layer.',
    highlights: [
      '**Search built for how this market actually types.** Georgians write Georgian words in Latin letters and English words in Georgian letters, so a query expands through a bidirectional transliteration layer, then a curated alias table for what phonetics cannot reach (ვიუ transliterates to viu, which will never match vue), then a trigram category fallback that tells the user what it did.',
      '**Replaced an unindexed five-column ILIKE chain** with a weighted tsvector and a GIN index, using the simple text-search configuration because Postgres ships no Georgian one, and a trigger rather than a generated column because to_tsvector is only STABLE.',
      '**Put authorisation in the database** rather than in route guards, so a page I forget to protect still cannot leak data. Cached queries may only read an id sourced from the cookie-authenticated user earlier in the same request.',
      '**Tracked down a static-generation regression** where a leaf component in the shared header silently turned 190 static pages dynamic — three interacting causes, invisible locally because the dev server is permissive about the exact rule being broken.',
      '**Notified search engines the moment a job is published**: a hand-written RS256 JWT client for the Google Indexing API that signs, exchanges and caches its own token, plus IndexNow for Bing and Yandex. No SDK, so no bundle cost.',
    ],
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript (strict)',
      'Supabase',
      'PostgreSQL',
      'Zod',
      'Tailwind CSS',
      'next-intl',
      'Grammy',
    ],
    metrics: [
      { value: '291', label: 'Commits, sole author' },
      { value: '271', label: 'Pages pre-rendered' },
      { value: '53', label: 'RLS policies' },
      { value: '102 kB', label: 'Shared First Load JS' },
    ],
    links: [
      { label: 'Visit dasaqmdi.com', href: 'https://www.dasaqmdi.com', icon: 'arrowUpRight' },
    ],
    featured: true,
  },
  {
    id: 'fullstack-nestjs',
    title: 'Full-Stack Application — Angular + NestJS + SQL',
    context: 'Personal project',
    period: 'Ongoing',
    summary:
      'An Angular client against a NestJS REST API and a relational database. Where I take an ' +
      'architecture apart properly, on my own time, before it turns up in work code.',
    highlights: [
      '**Structured the NestJS API around OOP fundamentals** — encapsulated services, interface-driven providers and constructor injection throughout.',
      '**Enforced request contracts** with DTO classes and decorator-based validation, so malformed data never reaches the domain layer.',
      '**Designed a normalised relational schema** and wrote the queries against it: multi-table joins, indexes and aggregate reporting.',
      '**Implemented JWT authentication** with role-based authorization guards on every protected route.',
    ],
    stack: [
      'Angular',
      'NestJS',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'MySQL',
      'SQL',
      'JWT',
      'OOP',
    ],
    metrics: [
      { value: '3-tier', label: 'Architecture' },
      { value: 'JWT', label: 'Auth + RBAC' },
      { value: 'DTO', label: 'Validated contracts' },
    ],
    links: [],
    featured: true,
  },
  {
    id: 'react-next',
    title: 'Full-Stack Projects — React & Next.js',
    context: 'TBC IT Academy · 3 projects',
    period: '09/2024 – 01/2025',
    summary:
      'Three full-stack builds covering component architecture, server-side rendering and static ' +
      'generation — taken alongside a full-time developer job.',
    highlights: [
      '**Built 3 full-stack projects** with component-based architecture, SSR and SSG rendering modes.',
      '**Improved page performance by 30%** through state-management and data-fetching optimisation.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'SSR', 'SSG'],
    metrics: [
      { value: '30%', label: 'Faster pages' },
      { value: '3', label: 'Projects shipped' },
    ],
    links: [],
    featured: false,
  },
];
