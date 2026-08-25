import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '@core/services';
import { Reveal } from '@shared/directives';
import { SectionHeading } from '@shared/ui';

import { SkillGroupCard } from './skill-group-card/skill-group-card';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SectionHeading, SkillGroupCard],
  templateUrl: './skills.html',
  host: { class: 'block' },
})
export class Skills {
  private readonly store = inject(PortfolioStore);

  /** One flat list now: emphasis is carried by the grid, not by two card types. */
  protected readonly skillGroups = this.store.skillGroups;
}
