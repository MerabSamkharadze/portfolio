import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '@core/services';
import { Reveal } from '@shared/directives';
import { SectionHeading } from '@shared/ui';

import { TimelineEntry } from './timeline-entry/timeline-entry';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SectionHeading, TimelineEntry],
  templateUrl: './experience.html',
  host: { class: 'block' },
})
export class Experience {
  private readonly store = inject(PortfolioStore);

  protected readonly roles = this.store.experience;
}
