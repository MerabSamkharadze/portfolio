import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import type { SkillLevel } from '../../core/models/portfolio.model';
import { PortfolioStore } from '../../core/services/portfolio-store';
import { Reveal } from '../../shared/directives/reveal';
import { Chip, type ChipTone } from '../../shared/ui/chip/chip';
import { Icon } from '../../shared/ui/icon/icon';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

const LEVEL_TONE: Readonly<Record<SkillLevel, ChipTone>> = {
  production: 'accent',
  strong: 'neutral',
  working: 'quiet',
  familiar: 'outline',
};

const LEVEL_LABEL: Readonly<Record<SkillLevel, string>> = {
  production: 'In production',
  strong: 'Strong',
  working: 'Working knowledge',
  familiar: 'Familiar',
};

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip, Icon, Reveal, SectionHeading],
  templateUrl: './skills.html',
  host: { class: 'block' },
})
export class Skills {
  private readonly store = inject(PortfolioStore);

  protected readonly primaryGroups = this.store.primarySkillGroups;
  protected readonly secondaryGroups = this.store.secondarySkillGroups;

  protected readonly levels: readonly SkillLevel[] = ['production', 'strong', 'working', 'familiar'];

  protected toneFor(level: SkillLevel): ChipTone {
    return LEVEL_TONE[level];
  }

  protected labelFor(level: SkillLevel): string {
    return LEVEL_LABEL[level];
  }
}
