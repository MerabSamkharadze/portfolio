import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Project } from '@core/models';
import { Icon, StatGrid, TechList } from '@shared/ui';

/** A featured project: context, outcomes, how it was solved, and the stack. */
@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, StatGrid, TechList],
  templateUrl: './project-card.html',
  host: { class: 'block h-full' },
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
