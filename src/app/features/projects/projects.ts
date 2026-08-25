import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { PortfolioStore } from '@core/services';
import { Reveal } from '@shared/directives';
import { SectionHeading } from '@shared/ui';

import { ProjectBrief } from './project-brief/project-brief';
import { ProjectCard } from './project-card/project-card';

/**
 * Projects whose write-up is long enough that a half-width card leaves the
 * card next to it stretched over dead space (measured: MedSocial 1053px vs a
 * 715px neighbour). These render full-width instead of paired.
 */
const WIDE_PROJECT_IDS = new Set(['medsocial', 'dasaqmdi', 'fullstack-nestjs']);

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectBrief, ProjectCard, Reveal, SectionHeading],
  templateUrl: './projects.html',
  host: { class: 'block' },
})
export class Projects {
  private readonly store = inject(PortfolioStore);

  /** Shorter write-ups — paired two-up in a row. */
  protected readonly pairedProjects = computed(() =>
    this.store.featuredProjects().filter((project) => !WIDE_PROJECT_IDS.has(project.id)),
  );

  /** Longer write-ups — each gets the full row rather than a half it would overflow. */
  protected readonly wideProjects = computed(() =>
    this.store.featuredProjects().filter((project) => WIDE_PROJECT_IDS.has(project.id)),
  );

  protected readonly additional = this.store.additionalProjects;
}
