import type { EducationItem, LanguageItem } from '@core/models';

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
