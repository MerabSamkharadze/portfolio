import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ExperienceItem } from '@core/models';
import { CardShell, DisclosureList, TechList } from '@shared/ui';

/** One role on the experience timeline, marker included. */
@Component({
  selector: 'app-timeline-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardShell, DisclosureList, TechList],
  templateUrl: './timeline-entry.html',
  host: { class: 'block' },
})
export class TimelineEntry {
  readonly entry = input.required<ExperienceItem>();
}
