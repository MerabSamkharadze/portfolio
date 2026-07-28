import { Injectable, computed, signal } from '@angular/core';

import {
  ABOUT_HIGHLIGHTS,
  ABOUT_PARAGRAPHS,
  CONTACT_CHANNELS,
  EDUCATION,
  EXPERIENCE,
  HERO_STATS,
  LANGUAGES,
  NAV_ITEMS,
  PROFILE,
  PROJECTS,
  REQUIREMENT_MATCHES,
  SKILL_GROUPS,
} from '../data/portfolio.content';
import type { MatchStatus } from '../models/portfolio.model';

/**
 * How much of a requirement each match status is worth when scoring the fit.
 * Deliberately conservative: an honest 90% reads far better to a reviewer than
 * a suspicious 100%.
 */
const STATUS_WEIGHT: Readonly<Record<MatchStatus, number>> = {
  direct: 1,
  strong: 1,
  transferable: 0.85,
  growing: 0.5,
};

/**
 * Read-only façade over the portfolio content.
 *
 * Content is exposed as signals rather than plain constants so the UI is already
 * wired for a future where it arrives from a CMS or an HTTP resource — swapping
 * the source would not touch a single template.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly profileSource = signal(PROFILE);
  private readonly requirementSource = signal(REQUIREMENT_MATCHES);
  private readonly skillSource = signal(SKILL_GROUPS);
  private readonly projectSource = signal(PROJECTS);

  readonly profile = this.profileSource.asReadonly();
  readonly navItems = signal(NAV_ITEMS).asReadonly();
  readonly heroStats = signal(HERO_STATS).asReadonly();
  readonly aboutParagraphs = signal(ABOUT_PARAGRAPHS).asReadonly();
  readonly aboutHighlights = signal(ABOUT_HIGHLIGHTS).asReadonly();
  readonly experience = signal(EXPERIENCE).asReadonly();
  readonly education = signal(EDUCATION).asReadonly();
  readonly languages = signal(LANGUAGES).asReadonly();
  readonly contactChannels = signal(CONTACT_CHANNELS).asReadonly();
  readonly requirements = this.requirementSource.asReadonly();
  readonly skillGroups = this.skillSource.asReadonly();
  readonly projects = this.projectSource.asReadonly();

  /* ---------------------------------------------------------------------- */
  /* Derived views                                                           */
  /* ---------------------------------------------------------------------- */

  readonly requiredRequirements = computed(() =>
    this.requirements().filter((item) => item.weight === 'required'),
  );

  readonly preferredRequirements = computed(() =>
    this.requirements().filter((item) => item.weight === 'preferred'),
  );

  /** Requirements answered by direct or strong hands-on experience. */
  readonly fullyMetCount = computed(
    () =>
      this.requirements().filter((item) => item.status === 'direct' || item.status === 'strong')
        .length,
  );

  readonly requirementCount = computed(() => this.requirements().length);

  /** Weighted coverage of the posting, 0–100. */
  readonly matchScore = computed(() => {
    const items = this.requirements();
    if (items.length === 0) {
      return 0;
    }
    const total = items.reduce((sum, item) => sum + STATUS_WEIGHT[item.status], 0);
    return Math.round((total / items.length) * 100);
  });

  readonly primarySkillGroups = computed(() =>
    this.skillGroups().filter((group) => group.emphasis === 'primary'),
  );

  readonly secondarySkillGroups = computed(() =>
    this.skillGroups().filter((group) => group.emphasis === 'secondary'),
  );

  readonly featuredProjects = computed(() => this.projects().filter((project) => project.featured));

  readonly additionalProjects = computed(() =>
    this.projects().filter((project) => !project.featured),
  );

  /** Flat, de-duplicated technology list — feeds the hero marquee. */
  readonly technologyMarquee = computed(() => {
    const seen = new Set<string>();
    for (const group of this.skillGroups()) {
      for (const skill of group.skills) {
        if (skill.level === 'production' || skill.level === 'strong') {
          seen.add(skill.name);
        }
      }
    }
    return [...seen];
  });
}
