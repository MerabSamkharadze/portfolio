import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Project } from '@core/models';
import { CardShell, DisclosureList, Icon, MetricRow, TechList } from '@shared/ui';

/** A project, in the six slots every card on this page uses. */
@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardShell, DisclosureList, Icon, MetricRow, TechList],
  templateUrl: './project-card.html',
  host: { class: 'block h-full' },
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
