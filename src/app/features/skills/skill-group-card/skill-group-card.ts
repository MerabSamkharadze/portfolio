import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { Skill, SkillGroup, SkillLevel } from '@core/models';
import { CardShell, Chip, Icon } from '@shared/ui';

/** The one level that means "shipped, and still running". */
const PRODUCTION: SkillLevel = 'production';

@Component({
  selector: 'app-skill-group-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardShell, Chip, Icon],
  templateUrl: './skill-group-card.html',
  host: { class: 'block h-full' },
})
export class SkillGroupCard {
  readonly group = input.required<SkillGroup>();

  /**
   * Four levels rendered as four chip fills never worked: the two darkest
   * surfaces are 1.15:1 apart, so the top two steps read as one tone. The
   * split is now said in words instead — two headed groups, which a reader
   * can act on without decoding a legend, and which survives a touch screen
   * where the old `title` tooltip had nothing to hover.
   */
  protected readonly inProduction = computed<readonly Skill[]>(() =>
    this.group().skills.filter((skill) => skill.level === PRODUCTION),
  );

  protected readonly alsoWorkedWith = computed<readonly Skill[]>(() =>
    this.group().skills.filter((skill) => skill.level !== PRODUCTION),
  );
}
