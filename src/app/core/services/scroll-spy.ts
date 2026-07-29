import { DOCUMENT, DestroyRef, Injectable, inject, signal } from '@angular/core';

import type { SectionId } from '@core/models';

/** How long after a nav click we ignore the observer, so the highlight does not flicker. */
const CLICK_SETTLE_MS = 800;

/**
 * Tracks which section is currently in view, how far the page has been scrolled,
 * and owns programmatic navigation between sections.
 *
 * Uses a single IntersectionObserver for every section plus one rAF-throttled
 * scroll listener — cheap enough to run on a zoneless application without any
 * change-detection pressure, since every update lands on a signal.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpy {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private observer: IntersectionObserver | null = null;
  private settleTimer: ReturnType<typeof setTimeout> | null = null;
  private ignoreObserverUntil = 0;
  private rafId = 0;

  /** Id of the section closest to the top of the viewport. */
  readonly activeSection = signal<SectionId>('top');
  /** True once the page has scrolled past the hero's top edge. */
  readonly hasScrolled = signal(false);
  /** Reading progress through the document, 0–100. */
  readonly progress = signal(0);

  constructor() {
    this.destroyRef.onDestroy(() => this.teardown());
  }

  /**
   * Begins observing the given section ids. Safe to call once the sections have
   * been rendered; ids that do not resolve are skipped.
   */
  watch(sectionIds: readonly SectionId[]): void {
    const view = this.document.defaultView;
    if (!view || typeof view.IntersectionObserver === 'undefined') {
      return;
    }

    this.teardown();

    this.observer = new view.IntersectionObserver(
      (entries) => this.onIntersect(entries),
      // Bias towards the upper third of the viewport: a heading is "active"
      // once it has settled near the top, not the moment it appears.
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );

    for (const id of sectionIds) {
      const element = this.document.getElementById(id);
      if (element) {
        this.observer.observe(element);
      }
    }

    view.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  /** Smoothly scrolls a section into view and pins the nav highlight to it. */
  scrollTo(sectionId: SectionId): void {
    const target =
      sectionId === 'top' ? this.document.documentElement : this.document.getElementById(sectionId);

    if (!target) {
      return;
    }

    this.activeSection.set(sectionId);
    this.ignoreObserverUntil = this.now() + CLICK_SETTLE_MS;

    if (sectionId === 'top') {
      this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (this.settleTimer) {
      clearTimeout(this.settleTimer);
    }
    this.settleTimer = setTimeout(() => {
      this.ignoreObserverUntil = 0;
      this.settleTimer = null;
    }, CLICK_SETTLE_MS);
  }

  /* ---------------------------------------------------------------------- */

  private onIntersect(entries: readonly IntersectionObserverEntry[]): void {
    if (this.now() < this.ignoreObserverUntil) {
      return;
    }

    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    const first = visible[0];
    if (first) {
      this.activeSection.set(first.target.id as SectionId);
    }
  }

  private readonly onScroll = (): void => {
    const view = this.document.defaultView;
    if (!view || this.rafId) {
      return;
    }

    this.rafId = view.requestAnimationFrame(() => {
      this.rafId = 0;
      const offset = view.scrollY;
      const scrollable = this.document.documentElement.scrollHeight - view.innerHeight;

      this.hasScrolled.set(offset > 40);
      this.progress.set(scrollable > 0 ? Math.min(100, (offset / scrollable) * 100) : 0);

      if (offset < 80 && this.now() >= this.ignoreObserverUntil) {
        this.activeSection.set('top');
      }
    });
  };

  private now(): number {
    return this.document.defaultView?.performance.now() ?? 0;
  }

  private teardown(): void {
    this.observer?.disconnect();
    this.observer = null;

    const view = this.document.defaultView;
    view?.removeEventListener('scroll', this.onScroll);
    if (this.rafId && view) {
      view.cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

    if (this.settleTimer) {
      clearTimeout(this.settleTimer);
      this.settleTimer = null;
    }
  }
}
