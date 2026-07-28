import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '../../core/services/portfolio-store';
import { Reveal } from '../../shared/directives/reveal';
import { Chip } from '../../shared/ui/chip/chip';
import { Icon } from '../../shared/ui/icon/icon';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip, Icon, Reveal, SectionHeading],
  templateUrl: './experience.html',
  host: { class: 'block' },
})
export class Experience {
  private readonly store = inject(PortfolioStore);

  protected readonly roles = this.store.experience;
}
