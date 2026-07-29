import type { PortfolioContent } from '@core/models';

import { ABOUT_HIGHLIGHTS, ABOUT_PARAGRAPHS } from './about.content';
import { CONTACT_CHANNELS } from './contact.content';
import { EDUCATION, LANGUAGES } from './education.content';
import { EXPERIENCE } from './experience.content';
import { NAV_ITEMS } from './navigation.content';
import { HERO_STATS, PROFILE } from './profile.content';
import { PROJECTS } from './projects.content';
import { SKILL_GROUPS } from './skills.content';

/**
 * The default content set, assembled from the per-section files beside this one.
 * Provided through `PORTFOLIO_CONTENT` in `app.config.ts`.
 */
export const portfolioContent: PortfolioContent = {
  navItems: NAV_ITEMS,
  profile: PROFILE,
  heroStats: HERO_STATS,
  aboutParagraphs: ABOUT_PARAGRAPHS,
  aboutHighlights: ABOUT_HIGHLIGHTS,
  skillGroups: SKILL_GROUPS,
  projects: PROJECTS,
  experience: EXPERIENCE,
  education: EDUCATION,
  languages: LANGUAGES,
  contactChannels: CONTACT_CHANNELS,
};

export { NAV_ITEMS, PROFILE };
