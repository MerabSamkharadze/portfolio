import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';

import { PortfolioStore, ScrollSpy } from '@core/services';
import type { SectionId } from '@core/models';
import { Icon } from '@shared/ui';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './navbar.html',
  host: {
    class: 'contents',
    '(document:keydown.escape)': 'closeMobile()',
  },
})
export class Navbar {
  private readonly store = inject(PortfolioStore);
  private readonly scrollSpy = inject(ScrollSpy);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly navItems = this.store.navItems;
  protected readonly profile = this.store.profile;
  protected readonly activeSection = this.scrollSpy.activeSection;
  protected readonly hasScrolled = this.scrollSpy.hasScrolled;
  protected readonly progress = this.scrollSpy.progress;

  protected readonly mobileOpen = signal(false);

  /** Where the page stood when the menu opened; restored when it closes. */
  private lockedScrollY = 0;

  protected readonly shellClass = computed(() =>
    this.hasScrolled()
      ? 'border-b border-border bg-background/80 shadow-lg shadow-background/60 backdrop-blur-xl'
      : 'border-b border-transparent bg-transparent',
  );

  constructor() {
    afterNextRender(() => this.closeWhenViewportLeavesMobile());
  }

  protected toggleMobile(): void {
    if (this.mobileOpen()) {
      this.closeMobile();
      return;
    }

    this.mobileOpen.set(true);
    this.lockScroll();
  }

  /** Also the Escape handler — a no-op while the menu is already closed. */
  protected closeMobile(): void {
    if (!this.mobileOpen()) {
      return;
    }

    this.mobileOpen.set(false);
    this.unlockScroll();
  }

  protected navigate(sectionId: SectionId): void {
    // Unlock before scrolling, not after: the unlock restores the offset the
    // menu was opened at, which would otherwise land on top of this jump.
    this.closeMobile();
    this.scrollSpy.scrollTo(sectionId);
  }

  /* ---------------------------------------------------------------------- */

  private lockScroll(): void {
    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    this.lockedScrollY = view.scrollY;

    // Measured before the lock, never after: hiding the overflow is what takes
    // the scrollbar away, so afterwards this gap always reads 0 and the page
    // silently widens by the scrollbar's width. Mobile's overlay scrollbars
    // measure 0 anyway, so this only does anything on a narrow desktop window.
    const scrollbarWidth = view.innerWidth - this.document.documentElement.clientWidth;

    this.document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      this.document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  private unlockScroll(): void {
    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    this.document.body.style.overflow = '';
    this.document.body.style.paddingRight = '';
    view.scrollTo({ top: this.lockedScrollY, behavior: 'instant' });
  }

  /**
   * The panel and its toggle are both `md:hidden`, so a viewport crossing that
   * breakpoint while the menu is open — a phone turned to landscape — would
   * leave the page scroll-locked with no control left on screen to unlock it.
   */
  private closeWhenViewportLeavesMobile(): void {
    const desktop = this.document.defaultView?.matchMedia('(min-width: 768px)');
    if (!desktop) {
      return;
    }

    const onChange = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        this.closeMobile();
      }
    };

    desktop.addEventListener('change', onChange);
    this.destroyRef.onDestroy(() => desktop.removeEventListener('change', onChange));
  }
}
