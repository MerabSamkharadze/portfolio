import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import type { EducationKind } from '../../core/models/portfolio.model';
import { PortfolioStore } from '../../core/services/portfolio-store';
import { Reveal } from '../../shared/directives/reveal';
import { Icon } from '../../shared/ui/icon/icon';
import type { IconName } from '../../shared/ui/icon/icon-set';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

const KIND_ICON: Readonly<Record<EducationKind, IconName>> = {
  degree: 'graduationCap',
  training: 'code',
};

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal, SectionHeading],
  templateUrl: './education.html',
  host: { class: 'block' },
})
export class Education {
  private readonly store = inject(PortfolioStore);

  protected readonly items = this.store.education;

  protected iconFor(kind: EducationKind): IconName {
    return KIND_ICON[kind];
  }
}
