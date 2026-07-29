import { Injectable, computed, inject, signal } from '@angular/core';

import { PORTFOLIO_CONTENT } from '@core/tokens';

/** Levels considered established enough to appear in the hero marquee. */
const MARQUEE_LEVELS = new Set(['production', 'strong']);

/**
 * Read-only façade over the portfolio content.
 *
 * The content arrives through DI rather than an import, so this store has no
 * opinion about where the words live. Everything is exposed as a signal, which
 * means a future move to an HTTP resource would not touch a single template.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly content = inject(PORTFOLIO_CONTENT);

  readonly profile = signal(this.content.profile).asReadonly();
  readonly navItems = signal(this.content.navItems).asReadonly();
  readonly heroStats = signal(this.content.heroStats).asReadonly();
  readonly aboutParagraphs = signal(this.content.aboutParagraphs).asReadonly();
  readonly aboutHighlights = signal(this.content.aboutHighlights).asReadonly();
  readonly skillGroups = signal(this.content.skillGroups).asReadonly();
  readonly projects = signal(this.content.projects).asReadonly();
  readonly experience = signal(this.content.experience).asReadonly();
  readonly education = signal(this.content.education).asReadonly();
  readonly languages = signal(this.content.languages).asReadonly();
  readonly contactChannels = signal(this.content.contactChannels).asReadonly();

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
    const names = new Set<string>();

    for (const group of this.skillGroups()) {
      for (const skill of group.skills) {
        if (MARQUEE_LEVELS.has(skill.level)) {
          names.add(skill.name);
        }
      }
    }

    return [...names];
  });
}
