import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Project } from '@core/models';
import { CardShell, TechList } from '@shared/ui';

/** The quiet row used for work that does not warrant metrics and bullets. */
@Component({
  selector: 'app-project-brief',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardShell, TechList],
  templateUrl: './project-brief.html',
  host: { class: 'block' },
})
export class ProjectBrief {
  readonly project = input.required<Project>();
}
