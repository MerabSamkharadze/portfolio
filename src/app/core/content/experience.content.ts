import type { ExperienceItem } from '@core/models';

/**
 * Ordered by relevance, not by date: the main role leads, the remaining
 * engagements follow. Every entry carries its own period, so the chronology is
 * on the card rather than implied by the position.
 */
export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    id: 'crocobet',
    role: 'Angular Developer',
    company: 'Crocobet',
    location: 'Tbilisi, Georgia',
    period: '07/2025 – Present',
    current: true,
    summary:
      'Front end of a promotions and campaigns platform, inside a dedicated promotions team where ' +
      'the launch date is set before the ticket is written.',
    achievements: [
      'Owned the Angular (v14+) front end of a platform with 100k+ active users, built with TypeScript, RxJS and NgRx.',
      'Shipped 20+ promotional campaign UIs end-to-end, from design hand-off to production, on the dates marketing committed to.',
      'Built and maintained a shared library of 50+ responsive UI components with full cross-browser compatibility, working directly from design mock-ups.',
      'Cut initial page load time across 5 key modules with lazy loading and OnPush change detection.',
      'Extended into the back end where that was faster than waiting: production REST APIs in Node.js powering campaign workflows.',
      'Kept a 5-person team’s codebase release-ready through review on every pull request.',
    ],
    stack: ['Angular v14+', 'TypeScript', 'RxJS', 'NgRx', 'SCSS / BEM', 'Node.js', 'REST APIs'],
  },
  {
    id: 'medsocial',
    role: 'Angular Developer',
    company: 'MedSocial',
    location: 'Remote',
    period: '06/2026 – Present',
    current: true,
    summary:
      'Front end of a cross-border HealthTech marketplace MVP. I joined a codebase another ' +
      'developer had been building for three and a half months, and have since written 45% of it.',
    achievements: [
      'Delivered 81 commits in 5 weeks on a codebase I had not written — 207 files touched, 42 created from scratch, +15,783 / −3,347 lines — merged to main through reviewed pull requests.',
      'Built the entire 1:1 doctor–patient chat over WebSockets, from the transport layer through to the scroll manager, inside those same five weeks.',
      'Cut the /procedures blank screen from 7.9–9.4s to 0ms and requests before first paint from 6 to 1, removing roughly 7 seconds of backend work per page load.',
      'Migrated a codebase containing exactly one @media rule to a four-tier responsive system; an adversarial review after each of six tiers found and fixed 27 defects.',
      'Rebuilt the auth chain — functional HTTP interceptors, one refresh per 401 with the other failed requests queued behind it, and proactive refresh scheduled from the JWT exp claim.',
      'Took the test suite from 33 failing spec files to fully green: 78 files, 104 tests.',
      'Audited the code into a prioritised 551-line backlog and closed 48 items from it.',
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
      'Took the front end from an empty repository to a live product for 3+ hospitality businesses — bookings, menus, orders and role-based admin dashboards, built with Next.js, React, TypeScript and SCSS.',
      'Reduced page load times by 25% by removing unnecessary re-renders and refactoring inefficient component trees.',
      'Cut post-release bug count by 15% by introducing structured debugging practices and making code review mandatory before every merge to main.',
      'Built and integrated 10+ RESTful API endpoints with the backend team, enabling real-time booking updates and role-based admin controls.',
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
      'Authored the complete PostgreSQL schema on Supabase — 37 migrations, 53 row-level security policies across 14 tables, 8 triggers and 34 indexes — covering three roles: seeker, employer and administrator.',
      'Pre-rendered 271 pages at build, 190 of them SEO landing pages (18 with hand-written copy), with transliterated canonical job URLs and 308 redirects that carried every previously indexed URL across for free.',
      'Held shared First Load JS to 102 kB across all routes, and kept it there deliberately while the feature set grew.',
      'Shipped 796 translation keys per locale with zero mismatches between Georgian and English.',
      'Added a Telegram notification bot, Gemini-backed bilingual job drafting, transactional email with per-company templates, and an admin audit log.',
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
