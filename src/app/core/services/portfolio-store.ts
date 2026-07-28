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
  SKILL_GROUPS,
} from '../data/portfolio.content';

/**
 * Read-only façade over the portfolio content.
 *
 * Content is exposed as signals rather than plain constants so the UI is already
 * wired for a future where it arrives from a CMS or an HTTP resource — swapping
 * the source would not touch a single template.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly skillSource = signal(SKILL_GROUPS);
  private readonly projectSource = signal(PROJECTS);

  readonly profile = signal(PROFILE).asReadonly();
  readonly navItems = signal(NAV_ITEMS).asReadonly();
  readonly heroStats = signal(HERO_STATS).asReadonly();
  readonly aboutParagraphs = signal(ABOUT_PARAGRAPHS).asReadonly();
  readonly aboutHighlights = signal(ABOUT_HIGHLIGHTS).asReadonly();
  readonly experience = signal(EXPERIENCE).asReadonly();
  readonly education = signal(EDUCATION).asReadonly();
  readonly languages = signal(LANGUAGES).asReadonly();
  readonly contactChannels = signal(CONTACT_CHANNELS).asReadonly();
  readonly skillGroups = this.skillSource.asReadonly();
  readonly projects = this.projectSource.asReadonly();

  /* ---------------------------------------------------------------------- */
  /* Derived views                                                           */
  /* ---------------------------------------------------------------------- */

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
