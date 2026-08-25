import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { EducationItem, EducationKind } from '@core/models';
import { CardShell, Icon, type IconName } from '@shared/ui';

const KIND_ICON: Readonly<Record<EducationKind, IconName>> = {
  degree: 'graduationCap',
  training: 'code',
};

@Component({
  selector: 'app-education-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardShell, Icon],
  templateUrl: './education-card.html',
  host: { class: 'block h-full' },
})
export class EducationCard {
  readonly item = input.required<EducationItem>();

  protected readonly icon = computed<IconName>(() => KIND_ICON[this.item().kind]);
}
