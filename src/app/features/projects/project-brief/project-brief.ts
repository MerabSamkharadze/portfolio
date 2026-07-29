import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Project } from '@core/models';
import { TechList } from '@shared/ui';

/** The compact row used for work that does not warrant a full card. */
@Component({
  selector: 'app-project-brief',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TechList],
  templateUrl: './project-brief.html',
  host: { class: 'block' },
})
export class ProjectBrief {
  readonly project = input.required<Project>();
}
