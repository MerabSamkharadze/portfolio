import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '@core/services';
import { Reveal } from '@shared/directives';
import { Chip, SectionHeading } from '@shared/ui';

import {
  SKILL_LEVELS,
  SkillGroupCard,
  skillLevelLabel,
  skillLevelTone,
} from './skill-group-card/skill-group-card';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip, Reveal, SectionHeading, SkillGroupCard],
  templateUrl: './skills.html',
  host: { class: 'block' },
})
export class Skills {
  private readonly store = inject(PortfolioStore);

  protected readonly primaryGroups = this.store.primarySkillGroups;
  protected readonly secondaryGroups = this.store.secondarySkillGroups;

  protected readonly levels = SKILL_LEVELS;
  protected readonly toneFor = skillLevelTone;
  protected readonly labelFor = skillLevelLabel;
}
