import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '@core/services';
import { Reveal } from '@shared/directives';
import { SectionHeading } from '@shared/ui';

import { EducationCard } from './education-card/education-card';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EducationCard, Reveal, SectionHeading],
  templateUrl: './education.html',
  host: { class: 'block' },
})
export class Education {
  private readonly store = inject(PortfolioStore);

  protected readonly items = this.store.education;
}
