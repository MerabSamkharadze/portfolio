import type { Profile, Stat } from '@core/models';

export const PROFILE: Profile = {
  name: 'Merab Samkharadze',
  firstName: 'Merab',
  lastName: 'Samkharadze',
  headline: 'Angular Developer',
  pitch:
    'I build Angular front ends for products that are already live: a promotions platform used by ' +
    'more than 100,000 people, and a cross-border health marketplace where I joined a codebase ' +
    'somebody else had started and have since written nearly half of it. On my own time I built ' +
    'and shipped a bilingual job board — 291 commits, database schema through to SEO.',
  location: 'Tbilisi, Georgia',
  email: 'samkharadzemerab@gmail.com',
  phone: '+995 598 487 787',
  phoneHref: 'tel:+995598487787',
  linkedIn: 'https://www.linkedin.com/in/merab-samkharadze-15301b131',
  gitHub: null,
  cvUrl: 'Merab_Samkharadze_CV.pdf',
  cvHtmlUrl: 'cv.html',
  photoUrl: 'profile.jpg',
  availability: 'Tbilisi, Georgia · Open to new opportunities',
};
/** The four figures under the hero call-to-action. */
export const HERO_STATS: readonly Stat[] = [
  { value: '2+', label: 'Years in production' },
  { value: '100k+', label: 'Platform users' },
  { value: '50+', label: 'Components shipped' },
  { value: '20+', label: 'On-schedule launches' },
];
