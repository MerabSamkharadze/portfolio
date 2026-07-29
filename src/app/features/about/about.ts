import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '@core/services';
import { Reveal } from '@shared/directives';
import { Icon, SectionHeading } from '@shared/ui';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal, SectionHeading],
  templateUrl: './about.html',
  host: { class: 'block' },
})
export class About {
  private readonly store = inject(PortfolioStore);

  protected readonly paragraphs = this.store.aboutParagraphs;
  protected readonly highlights = this.store.aboutHighlights;
  protected readonly languages = this.store.languages;
  protected readonly profile = this.store.profile;
}
