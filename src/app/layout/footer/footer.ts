import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore, ScrollSpy } from '@core/services';
import { Icon } from '@shared/ui';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './footer.html',
  host: { class: 'block' },
})
export class Footer {
  private readonly store = inject(PortfolioStore);
  private readonly scrollSpy = inject(ScrollSpy);

  protected readonly profile = this.store.profile;
  protected readonly year = new Date().getFullYear();

  protected backToTop(): void {
    this.scrollSpy.scrollTo('top');
  }
}
