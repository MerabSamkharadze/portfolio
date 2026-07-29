import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { PortfolioStore, ScrollSpy } from '@core/services';
import type { SectionId } from '@core/models';
import { Icon } from '@shared/ui';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './navbar.html',
  host: { class: 'contents' },
})
export class Navbar {
  private readonly store = inject(PortfolioStore);
  private readonly scrollSpy = inject(ScrollSpy);

  protected readonly navItems = this.store.navItems;
  protected readonly profile = this.store.profile;
  protected readonly activeSection = this.scrollSpy.activeSection;
  protected readonly hasScrolled = this.scrollSpy.hasScrolled;
  protected readonly progress = this.scrollSpy.progress;

  protected readonly mobileOpen = signal(false);

  protected readonly shellClass = computed(() =>
    this.hasScrolled()
      ? 'border-b border-border bg-background/80 shadow-lg shadow-background/60 backdrop-blur-xl'
      : 'border-b border-transparent bg-transparent',
  );

  protected toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  protected navigate(sectionId: SectionId): void {
    this.mobileOpen.set(false);
    this.scrollSpy.scrollTo(sectionId);
  }
}
