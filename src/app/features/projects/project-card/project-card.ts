import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

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

  /**
   * Set when the card spans the full grid row. The card itself is then
   * genuinely full-width (no intermediate max-width) — only the prose inside
   * it is capped, so a paragraph does not stretch to a 1152px line length.
   */
  readonly wide = input(false, { transform: booleanAttribute });
}
