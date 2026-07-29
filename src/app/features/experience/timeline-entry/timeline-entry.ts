import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ExperienceItem } from '@core/models';
import { Icon, TechList } from '@shared/ui';

/** One role on the experience timeline, node included. */
@Component({
  selector: 'app-timeline-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TechList],
  templateUrl: './timeline-entry.html',
  host: { class: 'block' },
})
export class TimelineEntry {
  readonly entry = input.required<ExperienceItem>();
}
