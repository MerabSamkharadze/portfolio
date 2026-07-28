/**
 * Portfolio content — the single source of truth for everything on the page.
 *
 * Copy rule: show, never tell. No adjective claims a trait the reader could
 * instead work out from a number, a mechanism or a decision. Every figure here
 * traces back to a line on the CV.
 */

import type {
  ContactChannel,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  NavItem,
  Profile,
  Project,
  SkillGroup,
  Stat,
} from '../models/portfolio.model';

/* -------------------------------------------------------------------------- */

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/* -------------------------------------------------------------------------- */

export const PROFILE: Profile = {
  name: 'Merab Samkharadze',
  firstName: 'Merab',
  lastName: 'Samkharadze',
  headline: 'Angular Developer',
  pitch:
    'I build Angular front ends. Right now that means a promotions platform used by more than ' +
    '100,000 people, and a cross-border health marketplace where five weeks of work left 45% of ' +
    'the source mine. Two years in front-end development, the last year of it entirely in Angular.',
  location: 'Tbilisi, Georgia',
  email: 'samkharadzemerab@gmail.com',
  phone: '+995 598 487 787',
  phoneHref: 'tel:+995598487787',
  linkedIn: 'https://www.linkedin.com/in/merab-samkharadze-15301b131',
  gitHub: null,
  cvUrl: 'Merab_Samkharadze_CV.pdf',
  photoUrl: 'profile.jpg',
  availability: 'Tbilisi, Georgia · Open to new opportunities',
};

export const HERO_STATS: readonly Stat[] = [
  { value: '2+', label: 'Years in production' },
  { value: '100k+', label: 'Active users' },
  { value: '50+', label: 'Components shipped' },
  { value: '20+', label: 'On-schedule launches' },
];

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

export const ABOUT_PARAGRAPHS: readonly string[] = [
  'My day job is the front end of a promotions and campaigns platform with more than 100,000 ' +
    'active users — leaderboards, prize wheels, quests, raffles. The launch date comes from ' +
    'marketing, not from engineering, and it does not move. Twenty-plus campaigns so far, ' +
    'delivered on the dates we committed to.',
  'Most of that work is detail. Fifty-odd components that have to hold up in every supported ' +
    'browser, sit close enough to the design hand-off that nobody sends them back, and stay quick ' +
    'on a mid-range phone. I go looking for the change-detection hot spots and the duplicate HTTP ' +
    'calls, because that is usually where the experience quietly leaks away.',
  'In parallel I work remotely on MedSocial, a cross-border HealthTech marketplace. I joined a ' +
    'codebase another developer had been building for three and a half months. Five weeks later ' +
    '45% of the source is mine: the entire real-time chat over WebSockets, a responsive migration ' +
    'of a site that had exactly one @media rule in it, and a listings page that went from a ' +
    'nine-second blank screen to none. Reading somebody else’s code carefully is most of that job.',
  'Before Angular I spent eight months in Next.js, leading the front end of a hotel and restaurant ' +
    'management platform from an empty repository to something three businesses now run their day ' +
    'on. That is where I learned how many bugs are really process problems: I made review ' +
    'mandatory before every merge to main, and post-release bugs fell 15%.',
  'I came to this from economics — a BSc and an MSc from Tbilisi State University — by way of two ' +
    'IT programmes and a lot of evenings. Those evenings still go somewhere: dasaqmdi.com is a ' +
    'bilingual job board I built and shipped on my own, 291 commits, from the PostgreSQL schema ' +
    'and its row-level security policies through to the SEO layer. The front end is where I work, ' +
    'but I would rather understand the whole path than guess at half of it. Next on the list is ' +
    'going deeper into testing and architecture, because the codebases I want to be trusted with ' +
    'are bigger than the ones I have now.',
];

export const ABOUT_HIGHLIGHTS: readonly string[] = [
  'Treats the launch date as fixed and plans backwards from it',
  'Audits an unfamiliar codebase in writing before changing a line of it',
  'Would rather review a pull request twice than debug it in production',
  'Proves where a bug lives before handing it to anyone else',
  'Picks up whatever the work needs next — Node.js, SQL and WebSockets arrived that way',
];

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'angular',
    title: 'Angular',
    icon: 'layers',
    emphasis: 'primary',
    caption: 'My main stack — v14 through v21, in production every working day.',
    skills: [
      { name: 'Angular v14 – v21', level: 'production' },
      { name: 'RxJS', level: 'production' },
      { name: 'NgRx', level: 'production' },
      { name: 'Reactive Forms', level: 'production' },
      { name: 'Router & Lazy Loading', level: 'production' },
      { name: 'OnPush Change Detection', level: 'production' },
      { name: 'Dependency Injection', level: 'production' },
      { name: 'HttpClient & Interceptors', level: 'production' },
      { name: 'SPA architecture', level: 'production' },
      { name: 'Angular CLI', level: 'production' },
      { name: 'Standalone Components', level: 'production' },
      { name: 'Signals', level: 'production' },
      { name: 'PrimeNG', level: 'strong' },
      { name: 'Zoneless', level: 'working' },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript & TypeScript',
    icon: 'code',
    emphasis: 'primary',
    caption: 'The language layer underneath everything else on this page.',
    skills: [
      { name: 'TypeScript', level: 'production' },
      { name: 'JavaScript ES2015+', level: 'production' },
      { name: 'Promises & async / await', level: 'production' },
      { name: 'Classes & Modules', level: 'production' },
      { name: 'Optional chaining / nullish', level: 'production' },
      { name: 'Closures & Prototypes', level: 'strong' },
      { name: 'Generics & Utility Types', level: 'strong' },
      { name: 'Immutable data patterns', level: 'strong' },
    ],
  },
  {
    id: 'markup',
    title: 'HTML & CSS',
    icon: 'palette',
    emphasis: 'primary',
    caption: '50+ components that had to survive every browser the product supports.',
    skills: [
      { name: 'Semantic HTML5', level: 'production' },
      { name: 'CSS3', level: 'production' },
      { name: 'SCSS', level: 'production' },
      { name: 'BEM', level: 'production' },
      { name: 'Flexbox', level: 'production' },
      { name: 'CSS Grid', level: 'production' },
      { name: 'Mobile-first / Responsive', level: 'production' },
      { name: 'Cross-browser support', level: 'production' },
      { name: 'Tailwind CSS', level: 'production' },
      { name: 'SEO & structured data', level: 'strong' },
      { name: 'Accessibility (WCAG)', level: 'working' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: 'terminal',
    emphasis: 'primary',
    caption: 'A supporting skill, not my title — enough to stop waiting on an endpoint.',
    skills: [
      { name: 'API integration', level: 'production' },
      { name: 'Postman', level: 'production' },
      { name: 'WebSockets', level: 'strong' },
      { name: 'Node.js', level: 'strong' },
      { name: 'NestJS', level: 'strong' },
      { name: 'REST API design', level: 'strong' },
      { name: 'JWT & role-based auth', level: 'strong' },
      { name: 'DTO validation', level: 'strong' },
    ],
  },
  {
    id: 'data',
    title: 'Databases',
    icon: 'database',
    emphasis: 'secondary',
    caption: 'Schemas I design, policies I write, queries I then tune.',
    skills: [
      { name: 'PostgreSQL', level: 'production' },
      { name: 'SQL', level: 'strong' },
      { name: 'Relational schema design', level: 'strong' },
      { name: 'Row-level security', level: 'strong' },
      { name: 'Migrations', level: 'strong' },
      { name: 'Joins & Indexing', level: 'strong' },
      { name: 'Full-text search', level: 'strong' },
      { name: 'MySQL', level: 'strong' },
      { name: 'Query optimisation', level: 'working' },
      { name: 'MS SQL / T-SQL', level: 'familiar' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture & Testing',
    icon: 'shield',
    emphasis: 'secondary',
    caption: 'What keeps a codebase readable past its first month.',
    skills: [
      { name: 'Code review', level: 'production' },
      { name: 'OOP principles', level: 'strong' },
      { name: 'SOLID', level: 'strong' },
      { name: 'Modular structure', level: 'strong' },
      { name: 'Unit testing', level: 'strong' },
      { name: 'Vitest', level: 'strong' },
      { name: 'Design patterns', level: 'working' },
      { name: 'Angular TestBed', level: 'working' },
    ],
  },
  {
    id: 'also',
    title: 'Beyond Angular',
    icon: 'sparkles',
    emphasis: 'secondary',
    caption: 'Two products shipped in Next.js — one for a client, one entirely my own.',
    skills: [
      { name: 'React', level: 'production' },
      { name: 'Next.js', level: 'production' },
      { name: 'SSR / SSG / ISR', level: 'production' },
      { name: 'Supabase', level: 'strong' },
      { name: 'Zod', level: 'strong' },
      { name: 'Android Studio', level: 'familiar' },
      { name: 'Xcode', level: 'familiar' },
    ],
  },
  {
    id: 'workflow',
    title: 'Tools & Workflow',
    icon: 'users',
    emphasis: 'secondary',
    caption: 'How the work actually reaches production.',
    skills: [
      { name: 'Git feature-branch flow', level: 'production' },
      { name: 'Pull-request review', level: 'production' },
      { name: 'Agile teamwork', level: 'production' },
      { name: 'Figma / Zeplin hand-off', level: 'production' },
      { name: 'Internationalisation (i18n)', level: 'production' },
      { name: 'npm / yarn', level: 'production' },
      { name: 'WebStorm / VS Code', level: 'production' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export const PROJECTS: readonly Project[] = [
  {
    id: 'medsocial',
    title: 'MedSocial — Cross-Border HealthTech Marketplace',
    context: 'Remote · Live MVP · Backend: Django REST Framework + Channels',
    period: '06/2026 – Present',
    summary:
      'A marketplace connecting patients with doctors across borders: doctors publish procedures ' +
      'with prices and discounts, patients search by country, city, category and price, book, ' +
      'message and review. I joined three and a half months after the first commit, on a codebase ' +
      'written entirely by someone else, and rewrote a large part of it.',
    highlights: [
      'Built the whole real-time chat: a WebSocket transport with subprotocol auth, backoff with jitter, a distinct “never connected” state, and a discriminated-union frame model — over an application layer doing optimistic send, clientId reconciliation, presence, typing, an offline outbox and gap healing over REST.',
      'Proved a 1006 handshake failure was a backend bug by reproducing it with curl and a Node ws client: the server returned 101 without echoing the negotiated subprotocol, which the specification requires the client to reject.',
      'Cut the /procedures blank screen from 7.9–9.4s to 0ms and requests before first paint from 6 to 1 — the last step was deleting two requests entirely rather than optimising them a fourth time, which removed ~90 lines and ~7s of backend work per load.',
      'Took the site from one @media rule to a four-tier responsive system with a shared breakpoints.scss and a matchMedia ResponsiveService, no Angular CDK, and desktop-down overrides so the working desktop layout was never put at risk.',
      'Audited the codebase into a 551-line prioritised backlog and closed 48 items, including HttpParams misuse that silently dropped pagination, a filter the API never accepted, and a suite that went from 33 failing spec files to fully green.',
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
    links: [{ label: 'Visit medsocial.online', href: 'https://medsocial.online/home', icon: 'arrowUpRight' }],
    featured: true,
  },
  {
    id: 'promotions-platform',
    title: 'Promotions & Campaigns Platform',
    context: 'Crocobet · Production · 100k+ active users',
    period: '07/2025 – Present',
    summary:
      'Everything a customer sees while a promotion is running — leaderboards, prize wheels, ' +
      'quests, raffles, progress campaigns. Real-time state, heavy traffic, and a marketing ' +
      'calendar that treats the launch date as a fact rather than a target.',
    highlights: [
      'Build the Angular (v14+) front end and the shared component library behind 20+ campaign UIs, each taken from design hand-off to production.',
      'Hold real-time campaign state together with NgRx and RxJS, so leaderboard, balance and progress data stay consistent across every view without redundant HTTP traffic.',
      'Write and integrate production REST APIs in Node.js, wiring campaign features to the services and data behind them.',
      'Cut initial page load across 5 core modules by introducing lazy-loaded feature modules and OnPush change detection.',
      'Keep a 5-person team release-ready through review on every pull request and a disciplined feature-branch workflow.',
    ],
    stack: ['Angular v14+', 'TypeScript', 'RxJS', 'NgRx', 'SCSS (BEM)', 'Node.js', 'REST APIs', 'Git'],
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
    id: 'hospitality-platform',
    title: 'Hotel & Restaurant Management Platform',
    context: 'Adaptcore · Production · 3+ business clients · Next.js',
    period: '09/2024 – 04/2025',
    summary:
      'Bookings, menus, orders and role-based admin dashboards, built in Next.js. I took the front ' +
      'end from an empty repository to something three hospitality businesses now run their day on.',
    highlights: [
      'Led front-end development across bookings, menus, orders and admin dashboards in Next.js, React, TypeScript and SCSS.',
      'Specified and integrated 10+ REST endpoints with the backend team, enabling real-time booking updates and role-based admin controls.',
      'Reduced page load times by 25% by tracking down unnecessary re-renders and refactoring deep component trees.',
      'Cut post-release bugs by 15% by introducing structured debugging practice and making review mandatory before every merge to main.',
      'Ran bi-weekly knowledge-sharing sessions for 4 developers, shortening average feature delivery time.',
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
      'Search built for how this market actually types. Georgians write Georgian words in Latin letters and English words in Georgian letters, so a query expands through a bidirectional transliteration layer, then a curated alias table for what phonetics cannot reach (ვიუ transliterates to viu, which will never match vue), then a trigram category fallback that tells the user what it did.',
      'Replaced an unindexed five-column ILIKE chain with a weighted tsvector and a GIN index, using the simple text-search configuration because Postgres ships no Georgian one, and a trigger rather than a generated column because to_tsvector is only STABLE.',
      'Put authorisation in the database: 53 row-level security policies across 14 tables, three roles, and cached queries that may only read an id sourced from the cookie-authenticated user earlier in the same request.',
      'Tracked down a static-generation regression where a leaf component in the shared header silently turned 190 static pages dynamic — three interacting causes, invisible locally because the dev server is permissive about the exact rule being broken.',
      '271 pages pre-rendered at build, 190 of them SEO landing pages (18 with hand-written copy), with a hand-written RS256 JWT client that notifies the Google Indexing API on publish — no SDK, so no bundle cost.',
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
      'Structured the NestJS API around OOP fundamentals — encapsulated services, interface-driven providers and constructor injection throughout.',
      'Enforced request contracts with DTO classes and decorator-based validation, so malformed data never reaches the domain layer.',
      'Designed a normalised relational schema and wrote the queries against it: multi-table joins, indexes and aggregate reporting.',
      'Implemented JWT authentication with role-based authorization guards on every protected route.',
    ],
    stack: ['Angular', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'MySQL', 'SQL', 'JWT', 'OOP'],
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
      'Built 3 full-stack projects with component-based architecture, SSR and SSG rendering modes.',
      'Improved page performance by 30% through state-management and data-fetching optimisation.',
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

/* -------------------------------------------------------------------------- */
/* Experience                                                                  */
/* -------------------------------------------------------------------------- */

export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    id: 'medsocial',
    role: 'Angular Developer',
    company: 'MedSocial',
    location: 'Remote',
    period: '06/2026 – Present',
    current: true,
    summary:
      'Front end of a cross-border HealthTech marketplace MVP. I joined a codebase another ' +
      'developer had been building for three and a half months; five weeks later 13,740 of its ' +
      '30,200 source lines are mine.',
    achievements: [
      'Delivered 81 commits in 5 weeks on an unfamiliar codebase — 207 files touched, 42 created from scratch, +15,783 / −3,347 lines — merged to main through reviewed pull requests.',
      'Built the entire 1:1 doctor–patient chat over WebSockets: a ~290-line rxjs/webSocket transport with subprotocol authentication, exponential backoff with jitter and reconnect on visibilitychange, over a ~780-line application layer with optimistic send, clientId reconciliation, an offline outbox and REST gap healing.',
      'Diagnosed a WebSocket handshake failing with close code 1006 by reproducing it outside the browser with curl and a Node ws client, proving the server accepted without echoing the negotiated subprotocol, and handed the backend developer the evidence.',
      'Cut the /procedures blank screen from 7.9–9.4s to 0ms and requests before first paint from 6 to 1, after a console measurement script showed two requests costing 3397ms and 3728ms existed only to set the scale of a price slider.',
      'Migrated a codebase containing exactly one @media rule to a four-tier responsive system, using desktop-down overrides so the working desktop layout was never at risk; an adversarial review after each tier found and fixed 27 defects.',
      'Built a chain of functional HTTP interceptors that runs exactly one token refresh on a 401 and queues every other failed request behind a BehaviorSubject gate, plus proactive refresh scheduled from the JWT exp claim.',
      'Took the test suite from 33 failing spec files to fully green — now 78 files and 104 tests — and closed 48 items from a prioritised 551-line bug backlog I wrote after auditing the code.',
    ],
    stack: [
      'Angular 21',
      'TypeScript 5.9 (strict)',
      'RxJS',
      'WebSockets',
      'PrimeNG',
      'SCSS',
      'Vitest',
    ],
  },
  {
    id: 'crocobet',
    role: 'Angular Developer',
    company: 'Crocobet',
    location: 'Tbilisi, Georgia',
    period: '07/2025 – Present',
    current: true,
    summary:
      'Front end of a promotions and campaigns platform with 100k+ active users, inside a ' +
      'dedicated promotions team where the launch date is set before the ticket is written.',
    achievements: [
      'Build the Angular (v14+) front end for a promotions and campaigns platform with 100k+ active users, using TypeScript, RxJS and NgRx to keep real-time campaign state consistent across every view.',
      'Ship 20+ promotional campaign UIs end-to-end — from design hand-off to production — on the dates marketing commits to.',
      'Maintain a shared library of 50+ responsive UI components (SCSS BEM, Flexbox, CSS Grid) with full cross-browser compatibility, built directly from design mock-ups.',
      'Write and integrate production REST APIs in Node.js to power campaign workflows, connecting front-end features to back-end services and data.',
      'Cut initial page load time across 5 key modules by applying lazy loading and OnPush change detection.',
      'Keep a 5-person team’s codebase release-ready through consistent review on every pull request.',
    ],
    stack: ['Angular v14+', 'TypeScript', 'RxJS', 'NgRx', 'SCSS / BEM', 'Node.js', 'REST APIs'],
  },
  {
    id: 'adaptcore',
    role: 'React / Next.js Developer',
    company: 'Adaptcore',
    location: 'Tbilisi, Georgia',
    period: '09/2024 – 04/2025',
    current: false,
    summary:
      'Led the front end of a hotel and restaurant management platform — from an empty repository ' +
      'to a live product for 3+ hospitality businesses.',
    achievements: [
      'Led front-end development of a hotel and restaurant management platform (bookings, menus, orders, admin dashboards) used by 3+ hospitality businesses — built with Next.js, React, TypeScript and SCSS.',
      'Built and integrated 10+ RESTful API endpoints together with the backend, enabling core workflows including real-time booking updates and role-based admin controls.',
      'Reduced page load times by 25% by removing unnecessary re-renders and refactoring inefficient component trees.',
      'Cut post-release bug count by 15% by introducing structured debugging practices and making code review mandatory before every merge to main.',
      'Ran bi-weekly knowledge-sharing sessions for a team of 4 developers, shortening average feature delivery time.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'SCSS', 'REST APIs', 'RBAC'],
  },
  {
    id: 'dasaqmdi',
    role: 'Solo Developer',
    company: 'dasaqmdi.com',
    location: 'Personal product · Live',
    period: '03/2026 – 07/2026',
    current: false,
    summary:
      'A bilingual Georgian/English job board serving seekers, employers and admins from one ' +
      'codebase. Sole author of all 291 commits — the PostgreSQL schema and its policies, the ' +
      'application, the SEO layer and the deployment.',
    achievements: [
      'Designed and shipped the whole product alone on Next.js 15, React 19 and TypeScript in strict mode: 45 pages, 143 React components and 42 Server Actions, across 44,879 lines currently in the repository.',
      'Authored the complete PostgreSQL schema on Supabase — 37 migrations, 53 row-level security policies across 14 tables, 8 triggers and 34 indexes — so authorisation lives in the database rather than in a route I might forget to guard.',
      'Built a three-layer search resolver for a market where users mix scripts: bidirectional Georgian↔Latin transliteration with longest-match digraphs, a curated skill-alias table for what phonetics cannot reach, and trigram category fallback.',
      'Replaced an unindexed five-column ILIKE chain with a weighted Postgres tsvector and a GIN index, maintained by a trigger rather than a generated column because to_tsvector is only STABLE.',
      'Engineered the SEO layer: 271 pages pre-rendered at build, of which 190 are landing pages (18 with hand-written copy), plus transliterated canonical job URLs with 308 redirects, JobPosting and FAQPage structured data, and a hand-written RS256 JWT client for the Google Indexing API with no SDK dependency.',
      'Held shared First Load JS to 102 kB across all routes by lazy-loading the authenticated header island behind a client-side cookie hint, route-scoping drag-and-drop, and using framer-motion strictly through LazyMotion.',
      'Shipped 796 translation keys per locale with zero mismatches between Georgian and English, plus a Telegram notification bot, Gemini-backed bilingual job drafting, transactional email with per-company templates, and an admin audit log.',
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
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Education                                                                   */
/* -------------------------------------------------------------------------- */

export const EDUCATION: readonly EducationItem[] = [
  {
    id: 'tbc-react',
    title: 'React with Next.js Framework',
    institution: 'TBC IT Academy, Tbilisi',
    period: '09/2024 – 01/2025',
    kind: 'training',
    detail:
      'Three full-stack projects covering component architecture, server-side rendering and ' +
      'static site generation, with a 30% page-performance gain from data-fetching work. Taken ' +
      'in parallel with a full-time developer job.',
  },
  {
    id: 'adi-js',
    title: 'JavaScript & Node.js (Advanced)',
    institution: 'Academy of Digital Industries, Tbilisi',
    period: '05/2024 – 08/2024',
    kind: 'training',
    detail:
      '80+ hours on the parts of JavaScript that decide whether the rest makes sense: closures, ' +
      'prototypes, Promises, async/await and OOP. Still the foundation under both my Angular and ' +
      'my Node.js work.',
  },
  {
    id: 'msc',
    title: "Master's Degree — International Economics",
    institution: 'Tbilisi State University',
    period: '09/2021 – 06/2023',
    kind: 'degree',
    detail: 'Econometrics, statistical modelling and applied mathematics.',
  },
  {
    id: 'bsc',
    title: "Bachelor's Degree — Economics",
    institution: 'Tbilisi State University',
    period: '09/2016 – 06/2021',
    kind: 'degree',
    detail: null,
  },
];

export const LANGUAGES: readonly LanguageItem[] = [
  { name: 'Georgian', level: 'Native' },
  { name: 'English', level: 'Professional working proficiency' },
];

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: 'mail',
    external: false,
  },
  { label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref, icon: 'phone', external: false },
  { label: 'LinkedIn', value: 'merab-samkharadze', href: PROFILE.linkedIn, icon: 'linkedin', external: true },
  { label: 'Location', value: PROFILE.location, href: null, icon: 'mapPin', external: false },
];

/**
 * Optional backend for the contact form. Leave empty and the form falls back to
 * composing a pre-filled message in the visitor's own mail client — which is
 * both honest about there being no server and, for the sender, faster.
 */
export const CONTACT_ENDPOINT = '';
