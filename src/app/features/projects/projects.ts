import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '@core/services';
import { Reveal } from '@shared/directives';
import { SectionHeading } from '@shared/ui';

import { ProjectBrief } from './project-brief/project-brief';
import { ProjectCard } from './project-card/project-card';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectBrief, ProjectCard, Reveal, SectionHeading],
  templateUrl: './projects.html',
  host: { class: 'block' },
})
export class Projects {
  private readonly store = inject(PortfolioStore);

  protected readonly featured = this.store.featuredProjects;
  protected readonly additional = this.store.additionalProjects;
}
