import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import type { SectionId } from '@core/models';
import { PortfolioStore, ScrollSpy } from '@core/services';
import { Icon, StatGrid } from '@shared/ui';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, StatGrid],
  templateUrl: './hero.html',
  host: { class: 'block' },
})
export class Hero {
  private readonly store = inject(PortfolioStore);
  private readonly scrollSpy = inject(ScrollSpy);

  protected readonly profile = this.store.profile;
  protected readonly stats = this.store.heroStats;

  /**
   * The list is emitted twice back to back: the CSS animation translates by
   * exactly -50%, so the second copy lands where the first began and the loop
   * has no visible seam.
   */
  protected readonly marqueeLoop = computed(() => {
    const items = this.store.technologyMarquee();
    return [...items, ...items];
  });

  protected goTo(sectionId: SectionId): void {
    this.scrollSpy.scrollTo(sectionId);
  }
}
