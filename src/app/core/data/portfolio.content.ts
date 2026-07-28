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
    'Two years ago I shipped my first Angular feature. Today I build the front end of a ' +
    'promotions platform used by more than 100,000 people — twenty-plus campaigns delivered, on ' +
    'the dates the business committed to. Angular and TypeScript on the client; Node.js and SQL ' +
    'when the answer sits behind the API.',
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
  'Before this I led the front end of a hotel and restaurant management platform, from an empty ' +
    'repository to something three businesses now run their day on. That is where I learned how ' +
    'many bugs are really process problems: I made review mandatory before every merge to main, ' +
    'and post-release bugs fell 15%.',
  'I came to this from economics — a BSc and an MSc from Tbilisi State University — by way of two ' +
    'IT programmes and a lot of evenings. The back end followed for a practical reason: I got ' +
    'tired of waiting on an endpoint I could have written myself. Next on the list is going ' +
    'deeper into testing and architecture, because the codebases I want to be trusted with are ' +
    'bigger than the ones I have now.',
];

export const ABOUT_HIGHLIGHTS: readonly string[] = [
  'Treats the launch date as fixed and plans backwards from it',
  'Would rather review a pull request twice than debug it in production',
  'Reaches into the back end when the front end is not the problem',
  'Picks up whatever the work needs next — Node.js and SQL arrived that way',
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
      { name: 'Standalone Components', level: 'strong' },
      { name: 'Signals', level: 'strong' },
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
      { name: 'Tailwind CSS', level: 'strong' },
      { name: 'Accessibility (WCAG)', level: 'working' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: 'terminal',
    emphasis: 'primary',
    caption: 'Enough back end to finish the job without waiting on anyone.',
    skills: [
      { name: 'API integration', level: 'production' },
      { name: 'Postman', level: 'production' },
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
    caption: 'Schemas I design, queries I write and then tune.',
    skills: [
      { name: 'SQL', level: 'strong' },
      { name: 'Relational schema design', level: 'strong' },
      { name: 'Joins & Indexing', level: 'strong' },
      { name: 'PostgreSQL', level: 'strong' },
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
      { name: 'Design patterns', level: 'working' },
      { name: 'Angular TestBed', level: 'working' },
    ],
  },
  {
    id: 'also',
    title: 'Also work with',
    icon: 'sparkles',
    emphasis: 'secondary',
    caption: 'Enough to be useful on, not enough to claim expert in.',
    skills: [
      { name: 'React', level: 'strong' },
      { name: 'Next.js (SSR / SSG)', level: 'strong' },
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
    context: 'Adaptcore · Production · 3+ business clients',
    period: '09/2024 – 04/2025',
    summary:
      'Bookings, menus, orders and role-based admin dashboards. I took the front end from an ' +
      'empty repository to something three hospitality businesses now run their day on.',
    highlights: [
      'Led front-end development across bookings, menus, orders and admin dashboards in Angular, TypeScript, RxJS and SCSS.',
      'Specified and integrated 10+ REST endpoints with the backend team, enabling real-time booking updates and role-based admin controls.',
      'Reduced page load times by 25% by tracking down change-detection hot spots and refactoring deep component trees.',
      'Cut post-release bugs by 15% by introducing structured debugging practice and making review mandatory before every merge to main.',
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
    id: 'this-portfolio',
    title: 'This Portfolio',
    context: 'Personal · Angular 21',
    period: '2026',
    summary:
      'The page you are reading. Built from scratch in the newest Angular, because I wanted to ' +
      'use signals and zoneless change detection on something real rather than in a tutorial.',
    highlights: [
      'Angular 21 with standalone components, signal-based state and zoneless change detection — no NgModules, no zone.js.',
      'Strict TypeScript, OnPush on every component, and a core / shared / features boundary that has held while the content changed underneath it.',
      'Unit tests covering the content store, the scroll-reveal directive and contact-form validation.',
      'Tailwind CSS v4 design tokens, mobile-first layout, one shared IntersectionObserver for the scroll choreography, and full reduced-motion support.',
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
    id: 'crocobet',
    role: 'Front-End / Full-Stack Developer',
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
    role: 'Front-End / Full-Stack Developer',
    company: 'Adaptcore',
    location: 'Tbilisi, Georgia',
    period: '09/2024 – 04/2025',
    current: false,
    summary:
      'Led the front end of a hotel and restaurant management platform — from an empty repository ' +
      'to a live product for 3+ hospitality businesses.',
    achievements: [
      'Led front-end development of a hotel and restaurant management platform (bookings, menus, orders, admin dashboards) used by 3+ hospitality businesses — built with Angular, TypeScript, RxJS and SCSS.',
      'Built and integrated 10+ RESTful API endpoints together with the backend, enabling core workflows including real-time booking updates and role-based admin controls.',
      'Reduced page load times by 25% by optimising Angular change detection and refactoring inefficient component trees.',
      'Cut post-release bug count by 15% by introducing structured debugging practices and making code review mandatory before every merge to main.',
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
