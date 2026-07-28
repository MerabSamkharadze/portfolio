/**
 * Portfolio content — the single source of truth for everything on the page.
 *
 * The copy here is deliberately written against one specific posting
 * (Angular Developer, Bank of Georgia). Wording mirrors the vacancy's own
 * vocabulary so a reviewer can match requirement to evidence at a glance,
 * while every claim traces back to a line in the CV.
 */

import type {
  ContactChannel,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  NavItem,
  Profile,
  Project,
  RequirementMatch,
  SkillGroup,
  Stat,
} from '../models/portfolio.model';

/* -------------------------------------------------------------------------- */

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'role-fit', label: 'Role Fit' },
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
  targetRole: 'Angular Developer',
  targetCompany: 'Bank of Georgia',
  pitch:
    'I build the Angular front ends that put products in front of customers — high-traffic, ' +
    'fast, and shipped on the date the business asked for. Two years in production, one platform ' +
    'serving 100k+ users, 20+ launches delivered.',
  location: 'Tbilisi, Georgia',
  email: 'samkharadzemerab@gmail.com',
  phone: '+995 598 487 787',
  phoneHref: 'tel:+995598487787',
  linkedIn: 'https://www.linkedin.com/in/merab-samkharadze-15301b131',
  gitHub: null,
  cvUrl: 'Merab_Samkharadze_CV.pdf',
  photoUrl: 'profile.jpg',
  availability: 'Open to Angular roles in Tbilisi · Available to start immediately',
};

export const HERO_STATS: readonly Stat[] = [
  { value: '2+', label: 'Years in production' },
  { value: '100k+', label: 'Users served' },
  { value: '50+', label: 'UI components built' },
  { value: '20+', label: 'Launches delivered' },
];

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

export const ABOUT_PARAGRAPHS: readonly string[] = [
  'I am an Angular developer in Tbilisi with two years spent on customer-facing web products. ' +
    'My day job is the front end of a promotions and campaigns platform used by more than 100,000 people — ' +
    'high traffic, real money in play, and a release calendar set by the business rather than by engineering.',
  'That environment trains exactly what this role asks for: hold several projects in the air at once, ' +
    'sit with business units until the scope, goals and desired features are actually pinned down, ' +
    'and still land every launch on the agreed date with a clean, reviewable codebase behind it.',
  'Two things make me a useful fit for a bank in particular. I work across the stack — Angular and ' +
    'TypeScript at the front, Node.js / NestJS REST APIs and relational SQL behind them — so when a ' +
    'contract between client and service is wrong I can see it and fix it on the correct side of the wire. ' +
    'And my degrees are in Economics (BSc and MSc, Tbilisi State University): quantitative, model-heavy ' +
    'training that means product, pricing and risk conversations start on familiar ground for me.',
];

export const ABOUT_HIGHLIGHTS: readonly string[] = [
  'Ships to a fixed business calendar, not an engineering one',
  'Comfortable owning a feature from design hand-off to production',
  'Reads and writes the back end when the front end is not the problem',
  'Analytical background — economics degrees, quantitative by training',
];

/* -------------------------------------------------------------------------- */
/* Role fit — every line of the posting, answered                              */
/* -------------------------------------------------------------------------- */

export const REQUIREMENT_MATCHES: readonly RequirementMatch[] = [
  {
    id: 'experience',
    requirement: 'Minimum 2–3 years of experience developing with web technologies',
    weight: 'required',
    status: 'direct',
    evidence:
      'Two continuous years in production roles — Crocobet (07/2025 – present) and Adaptcore ' +
      '(09/2024 – 04/2025) — both delivering live, customer-facing web applications.',
  },
  {
    id: 'angular',
    requirement: 'Excellent knowledge of Angular',
    weight: 'required',
    status: 'direct',
    evidence:
      'Angular v14+ every working day: NgRx store, RxJS streams, lazy-loaded feature modules, ' +
      'OnPush change detection, reactive forms and a 50-component shared library on a 100k-user platform. ' +
      'This site itself is Angular 21 — standalone, signal-based and zoneless.',
  },
  {
    id: 'javascript',
    requirement: 'Excellent knowledge of JavaScript and the latest ECMAScript specs',
    weight: 'required',
    status: 'direct',
    evidence:
      'TypeScript and modern JavaScript daily, on top of 80+ hours of advanced ES6+ study at the ' +
      'Academy of Digital Industries — closures, prototypes, Promises, async/await, modules and classes.',
  },
  {
    id: 'html-css',
    requirement: 'Good experience with HTML and CSS',
    weight: 'required',
    status: 'direct',
    evidence:
      '50+ responsive, cross-browser components authored from design hand-off using semantic HTML5, ' +
      'SCSS with BEM, Flexbox and CSS Grid — the mobile-first layout you are reading included.',
  },
  {
    id: 'web-concepts',
    requirement: 'Strong understanding of web development concepts and methodologies',
    weight: 'required',
    status: 'direct',
    evidence:
      'SPA architecture, REST integration, HTTP caching and interceptors, accessibility, ' +
      'Git feature-branch flow, mandatory pull-request review and Agile delivery in a 5-person team.',
  },
  {
    id: 'oop',
    requirement: 'Strong understanding of OOP principles',
    weight: 'required',
    status: 'strong',
    evidence:
      'Encapsulation, inheritance, polymorphism and dependency injection applied rather than recited: ' +
      'Angular services and DI tokens on the front end, NestJS modules, providers and DTO classes on the back.',
  },
  {
    id: 'multi-project',
    requirement: 'Handle multiple projects simultaneously and deliver high-quality work on time',
    weight: 'required',
    status: 'direct',
    evidence:
      '20+ promotional campaign UIs delivered end-to-end in parallel streams, each tied to a fixed ' +
      'marketing launch date — consistently met inside a dedicated promotions team.',
  },
  {
    id: 'analytical',
    requirement: 'Strong analytical, problem-solving and organisational skills; quick learner',
    weight: 'required',
    status: 'direct',
    evidence:
      'Cut post-release bugs 15% by introducing structured debugging and mandatory review; ' +
      'ran bi-weekly knowledge sessions for 4 developers. Went from first Angular commit to production ' +
      'owner inside months, then added Node.js, NestJS and SQL.',
  },
  {
    id: 'degree',
    requirement: 'Bachelor or Master degree in IT, Computer Science or Applied Mathematics',
    weight: 'required',
    status: 'transferable',
    evidence:
      'BSc and MSc from Tbilisi State University in Economics — a quantitative, mathematics-heavy ' +
      'programme — plus two specialist IT programmes: Advanced JavaScript & Node.js (Academy of Digital ' +
      'Industries) and React with Next.js (TBC IT Academy).',
  },
  {
    id: 'sql',
    requirement: 'Experience with SQL databases (MS SQL, Oracle)',
    weight: 'preferred',
    status: 'transferable',
    evidence:
      'Relational schema design and optimised queries — multi-table joins, indexing and aggregate ' +
      'reporting — on PostgreSQL and MySQL. ANSI SQL and relational modelling carry straight over to ' +
      'MS SQL / T-SQL, which I am actively working through.',
  },
  {
    id: 'jest',
    requirement: 'Knowledge of Jest testing',
    weight: 'preferred',
    status: 'strong',
    evidence:
      'This repository ships a 42-case unit-test suite written against the Jest API — the same ' +
      'describe / it / expect / spy surface — covering services, directives and contact-form ' +
      "validation. It runs on the Angular CLI's Vitest runner, which is Jest-API compatible.",
  },
  {
    id: 'storybook',
    requirement: 'Knowledge of Storybook',
    weight: 'preferred',
    status: 'growing',
    evidence:
      'I already build the way Storybook rewards — 50+ isolated, input-driven components with no ' +
      'hidden coupling to their host. Cataloguing that library in Storybook is what I am learning now.',
  },
  {
    id: 'nx',
    requirement: 'Knowledge of Nrwl Nx workspace',
    weight: 'preferred',
    status: 'growing',
    evidence:
      'Monorepo-shaped by habit: this codebase is split into core / shared / features boundaries that ' +
      'map one-to-one onto Nx libraries. Nx tooling itself — generators, affected graph, caching — is ' +
      'in progress.',
  },
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
    caption: 'The core of the role — v14 through v21, in production every day.',
    skills: [
      { name: 'Angular v14 – v21', level: 'production' },
      { name: 'RxJS', level: 'production' },
      { name: 'NgRx', level: 'production' },
      { name: 'Reactive Forms', level: 'production' },
      { name: 'Router & Lazy Loading', level: 'production' },
      { name: 'OnPush Change Detection', level: 'production' },
      { name: 'Dependency Injection', level: 'production' },
      { name: 'HttpClient & Interceptors', level: 'production' },
      { name: 'Standalone Components', level: 'strong' },
      { name: 'Signals', level: 'strong' },
      { name: 'Zoneless', level: 'working' },
      { name: 'Angular CLI', level: 'production' },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript & TypeScript',
    icon: 'code',
    emphasis: 'primary',
    caption: 'ES6+ and everything the spec has added since.',
    skills: [
      { name: 'TypeScript', level: 'production' },
      { name: 'JavaScript ES2015+', level: 'production' },
      { name: 'Promises & async / await', level: 'production' },
      { name: 'Closures & Prototypes', level: 'strong' },
      { name: 'Classes & Modules', level: 'production' },
      { name: 'Generics & Utility Types', level: 'strong' },
      { name: 'Optional chaining / nullish', level: 'production' },
      { name: 'Immutable data patterns', level: 'strong' },
    ],
  },
  {
    id: 'markup',
    title: 'HTML & CSS',
    icon: 'palette',
    emphasis: 'primary',
    caption: '50+ cross-browser components straight from design hand-off.',
    skills: [
      { name: 'Semantic HTML5', level: 'production' },
      { name: 'CSS3', level: 'production' },
      { name: 'SCSS', level: 'production' },
      { name: 'BEM', level: 'production' },
      { name: 'Flexbox', level: 'production' },
      { name: 'CSS Grid', level: 'production' },
      { name: 'Mobile-first / Responsive', level: 'production' },
      { name: 'Cross-browser support', level: 'production' },
      { name: 'Tailwind CSS', level: 'strong' },
      { name: 'Accessibility (WCAG)', level: 'working' },
    ],
  },
  {
    id: 'oop',
    title: 'OOP & Architecture',
    icon: 'shield',
    emphasis: 'primary',
    caption: 'Encapsulation, inheritance, polymorphism, DI — applied, not recited.',
    skills: [
      { name: 'OOP principles', level: 'strong' },
      { name: 'SOLID', level: 'strong' },
      { name: 'Design patterns', level: 'working' },
      { name: 'SPA architecture', level: 'production' },
      { name: 'Modular / monorepo structure', level: 'strong' },
      { name: 'DTO validation', level: 'strong' },
      { name: 'Code review', level: 'production' },
    ],
  },
  {
    id: 'data',
    title: 'Databases & SQL',
    icon: 'database',
    emphasis: 'secondary',
    caption: 'Relational fundamentals that carry straight into MS SQL.',
    skills: [
      { name: 'SQL', level: 'strong' },
      { name: 'Relational schema design', level: 'strong' },
      { name: 'Joins & Indexing', level: 'strong' },
      { name: 'Query optimisation', level: 'working' },
      { name: 'PostgreSQL', level: 'strong' },
      { name: 'MySQL', level: 'strong' },
      { name: 'MS SQL / T-SQL', level: 'learning' },
      { name: 'Oracle', level: 'learning' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing & Tooling',
    icon: 'gauge',
    emphasis: 'secondary',
    caption: "The posting's preferred list — where I am on each of them.",
    skills: [
      { name: 'Unit testing (Jest API)', level: 'strong' },
      { name: 'Angular TestBed', level: 'working' },
      { name: 'Karma / Jasmine', level: 'working' },
      { name: 'Storybook', level: 'learning' },
      { name: 'Nx workspaces', level: 'learning' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: 'terminal',
    emphasis: 'secondary',
    caption: 'Enough back end to close the loop without waiting on anyone.',
    skills: [
      { name: 'REST API design', level: 'strong' },
      { name: 'Node.js', level: 'strong' },
      { name: 'NestJS', level: 'strong' },
      { name: 'JWT & role-based auth', level: 'strong' },
      { name: 'API integration', level: 'production' },
      { name: 'Postman', level: 'production' },
    ],
  },
  {
    id: 'ways-of-working',
    title: 'Ways of Working',
    icon: 'users',
    emphasis: 'secondary',
    caption: 'How the work actually gets delivered.',
    skills: [
      { name: 'Git feature-branch flow', level: 'production' },
      { name: 'Pull-request review', level: 'production' },
      { name: 'Agile teamwork', level: 'production' },
      { name: 'Design hand-off (Figma / Zeplin)', level: 'production' },
      { name: 'Parallel project delivery', level: 'production' },
      { name: 'Deadline ownership', level: 'production' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export const PROJECTS: readonly Project[] = [
  {
    id: 'promotions-platform',
    title: 'Promotions & Campaigns Platform',
    context: 'Crocobet · Production · 100k+ active users',
    period: '07/2025 – Present',
    summary:
      'The customer-facing surface for every promotion the company runs — leaderboards, prize wheels, ' +
      'quests, raffles and progress campaigns — driven by real-time state and a marketing calendar that ' +
      'does not move.',
    highlights: [
      'Built the Angular (v14+) front end and the shared component library behind 20+ campaign UIs, each delivered end-to-end from design hand-off to production.',
      'Modelled real-time campaign state with NgRx and RxJS so leaderboard, balance and progress data stay consistent across every view without redundant HTTP traffic.',
      'Developed and integrated production REST APIs in Node.js, wiring front-end features to campaign services and data.',
      'Reduced initial page load by introducing lazy-loaded feature modules and OnPush change detection across 5 core modules.',
      'Kept a 5-person team release-ready through mandatory pull-request review and a disciplined feature-branch workflow.',
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
    context: 'Adaptcore · Production · 3+ business clients',
    period: '09/2024 – 04/2025',
    summary:
      'Bookings, menus, orders and role-based admin dashboards for hospitality businesses. I led the ' +
      'front end from an empty repository through to a product paying customers use daily.',
    highlights: [
      'Led front-end development across bookings, menus, orders and admin dashboards in Angular, TypeScript, RxJS and SCSS.',
      'Specified and integrated 10+ REST endpoints with the backend team, enabling real-time booking updates and role-based admin controls.',
      'Reduced page load times by 25% by fixing change-detection hot spots and refactoring deep component trees.',
      'Cut post-release bug count by 15% by introducing structured debugging practice and mandatory review before every merge to main.',
      'Ran bi-weekly knowledge-sharing sessions for 4 developers, shortening average feature delivery time.',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'REST APIs', 'RBAC'],
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
    id: 'fullstack-nestjs',
    title: 'Full-Stack Application — Angular + NestJS + SQL',
    context: 'Personal project · OOP and relational data',
    period: 'Ongoing',
    summary:
      'Written specifically to exercise the parts of the stack this role names: class-based OOP ' +
      'architecture, dependency injection, validated contracts and a properly normalised relational database.',
    highlights: [
      'Structured the NestJS API around OOP fundamentals — encapsulated services, interface-driven providers and constructor injection throughout.',
      'Enforced request contracts with DTO classes and decorator-based validation, so malformed data never reaches the domain layer.',
      'Designed a normalised relational schema and wrote optimised SQL: multi-table joins, indexes and aggregate reporting queries.',
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
    id: 'this-portfolio',
    title: 'This Portfolio',
    context: 'Built for this application · Angular 21',
    period: '2026',
    summary:
      'The page you are reading. Written from scratch in the newest Angular so the architecture ' +
      'can be inspected rather than described.',
    highlights: [
      'Angular 21 with standalone components, signal-based state and zoneless change detection — no NgModules, no zone.js.',
      'Strict TypeScript, OnPush on every component, and a core / shared / features boundary that maps one-to-one onto Nx libraries.',
      'Unit tests written against the Jest API covering services, the scroll-reveal directive and contact-form validation.',
      'Tailwind CSS v4 design tokens, mobile-first layout, IntersectionObserver choreography and full reduced-motion support.',
    ],
    stack: [
      'Angular 21',
      'Signals',
      'Zoneless',
      'Standalone APIs',
      'TypeScript (strict)',
      'Tailwind CSS v4',
      'Reactive Forms',
      'Vitest',
    ],
    metrics: [
      { value: '0', label: 'NgModules' },
      { value: '100%', label: 'Standalone' },
      { value: 'A11y', label: 'Reduced-motion aware' },
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
      'generation — useful context for how Angular solves the same problems differently.',
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
    id: 'crocobet',
    role: 'Front-End / Full-Stack Developer',
    company: 'Crocobet',
    location: 'Tbilisi, Georgia',
    period: '07/2025 – Present',
    current: true,
    summary:
      'Front end of a promotions and campaigns platform with 100k+ active users, inside a dedicated ' +
      'promotions team delivering against marketing launch dates.',
    achievements: [
      'Built the Angular (v14+) front end for a promotions and campaigns platform with 100k+ active users, using TypeScript, RxJS and NgRx to manage real-time campaign state across multiple views.',
      'Developed and integrated production REST APIs with Node.js to power campaign workflows, connecting front-end features to back-end services and data.',
      'Delivered 20+ promotional campaign UIs end-to-end — from design hand-off to production — consistently meeting marketing launch deadlines.',
      'Created 50+ responsive UI components (SCSS BEM, Flexbox, CSS Grid) with full cross-browser compatibility, translating design mock-ups into production-ready code.',
      'Improved performance by applying lazy loading and OnPush change detection across 5 key modules, reducing initial page load time.',
      'Maintained a clean, release-ready codebase in a 5-person team through consistent code review.',
    ],
    stack: ['Angular v14+', 'TypeScript', 'RxJS', 'NgRx', 'SCSS / BEM', 'Node.js', 'REST APIs'],
  },
  {
    id: 'adaptcore',
    role: 'Front-End / Full-Stack Developer',
    company: 'Adaptcore',
    location: 'Tbilisi, Georgia',
    period: '09/2024 – 04/2025',
    current: false,
    summary:
      'Led the front end of a hotel and restaurant management platform used by 3+ hospitality businesses.',
    achievements: [
      'Led front-end development of a hotel and restaurant management platform (bookings, menus, orders, admin dashboards) used by 3+ hospitality businesses — built with Angular, TypeScript, RxJS and SCSS.',
      'Built and integrated 10+ RESTful API endpoints together with the backend, enabling core workflows including real-time booking updates and role-based admin controls.',
      'Reduced page load times by 25% by optimising Angular change detection and refactoring inefficient component trees.',
      'Cut post-release bug count by 15% by introducing structured debugging practices and mandatory code reviews before every merge to main.',
      'Ran bi-weekly knowledge-sharing sessions for a team of 4 developers, shortening average feature delivery time.',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'REST APIs', 'RBAC'],
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
      'Three full-stack projects covering component architecture, server-side rendering and static ' +
      'site generation; 30% page-performance improvement through data-fetching optimisation.',
  },
  {
    id: 'adi-js',
    title: 'JavaScript & Node.js (Advanced)',
    institution: 'Academy of Digital Industries, Tbilisi',
    period: '05/2024 – 08/2024',
    kind: 'training',
    detail:
      '80+ hours of advanced JavaScript (ES6+): closures, async/await, Promises, prototypes and OOP — ' +
      'the foundation under both my Angular and my Node.js work.',
  },
  {
    id: 'msc',
    title: "Master's Degree — International Economics",
    institution: 'Tbilisi State University',
    period: '09/2021 – 06/2023',
    kind: 'degree',
    detail:
      'Quantitative programme: econometrics, statistical modelling and applied mathematics — the ' +
      'analytical half of what this role asks for.',
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
 * both honest about there being no server and, for a recruiter, faster.
 */
export const CONTACT_ENDPOINT = '';
