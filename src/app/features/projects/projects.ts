import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '../../core/services/portfolio-store';
import { Reveal } from '../../shared/directives/reveal';
import { Chip } from '../../shared/ui/chip/chip';
import { Icon } from '../../shared/ui/icon/icon';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip, Icon, Reveal, SectionHeading],
  templateUrl: './projects.html',
  host: { class: 'block' },
})
export class Projects {
  private readonly store = inject(PortfolioStore);

  protected readonly featured = this.store.featuredProjects;
  protected readonly additional = this.store.additionalProjects;
}
