import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { SkillEmphasis, SkillGroup, SkillLevel } from '@core/models';
import { Chip, type ChipTone, Icon } from '@shared/ui';

/**
 * How confident a level is, expressed in the shared chip vocabulary.
 *
 * Stepped by weight, not by hue: `production` is the most common level on
 * this page (most of the Angular group alone), so it is the boldest neutral,
 * not the accent colour — orange stays reserved for CTAs, hover/active state
 * and metric figures rather than being the default tone of a few dozen chips.
 */
const LEVEL_TONE: Readonly<Record<SkillLevel, ChipTone>> = {
  production: 'bold',
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

/** Levels in the order they are shown in the legend. */
export const SKILL_LEVELS: readonly SkillLevel[] = ['production', 'strong', 'working', 'familiar'];

export function skillLevelTone(level: SkillLevel): ChipTone {
  return LEVEL_TONE[level];
}

export function skillLevelLabel(level: SkillLevel): string {
  return LEVEL_LABEL[level];
}

@Component({
  selector: 'app-skill-group-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip, Icon],
  templateUrl: './skill-group-card.html',
  host: { class: 'block h-full' },
})
export class SkillGroupCard {
  readonly group = input.required<SkillGroup>();
  readonly variant = input<SkillEmphasis>('primary');

  protected readonly isPrimary = computed(() => this.variant() === 'primary');
  protected readonly toneFor = skillLevelTone;
  protected readonly labelFor = skillLevelLabel;
}
