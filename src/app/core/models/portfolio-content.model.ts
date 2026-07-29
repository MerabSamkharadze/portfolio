import type { ContactChannel } from './contact.model';
import type { EducationItem } from './education.model';
import type { ExperienceItem } from './experience.model';
import type { NavItem } from './navigation.model';
import type { LanguageItem, Profile } from './profile.model';
import type { Project } from './project.model';
import type { SkillGroup } from './skill.model';
import type { Stat } from './stat.model';

/**
 * The whole of the portfolio's content in one shape.
 *
 * Injected rather than imported (see `PORTFOLIO_CONTENT`), so the store never
 * depends on where the words come from — a constant today, an HTTP resource or
 * a CMS tomorrow, a fixture in a test.
 */
export interface PortfolioContent {
  readonly navItems: readonly NavItem[];
  readonly profile: Profile;
  readonly heroStats: readonly Stat[];
  readonly aboutParagraphs: readonly string[];
  readonly aboutHighlights: readonly string[];
  readonly skillGroups: readonly SkillGroup[];
  readonly projects: readonly Project[];
  readonly experience: readonly ExperienceItem[];
  readonly education: readonly EducationItem[];
  readonly languages: readonly LanguageItem[];
  readonly contactChannels: readonly ContactChannel[];
}
