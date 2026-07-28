import { DOCUMENT, DestroyRef, Injectable, inject } from '@angular/core';

/**
 * One IntersectionObserver shared by every `appReveal` element on the page.
 *
 * A per-directive observer would mean dozens of observers competing for the
 * same main-thread budget; a single instance with a WeakMap of callbacks costs
 * one. Elements unobserve themselves after their first entrance — the animation
 * plays once, then stops paying for itself.
 */
@Injectable({ providedIn: 'root' })
export class RevealObserver {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly callbacks = new WeakMap<Element, () => void>();

  private observer: IntersectionObserver | null = null;
  /** True when the browser cannot observe — everything is then revealed eagerly. */
  private readonly unsupported: boolean;

  constructor() {
    const view = this.document.defaultView;
    this.unsupported = !view || typeof view.IntersectionObserver === 'undefined';

    if (!this.unsupported) {
      this.observer = new view!.IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }
            this.callbacks.get(entry.target)?.();
            this.unobserve(entry.target);
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );
    }

    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
      this.observer = null;
    });
  }

  observe(element: Element, onEnter: () => void): void {
    if (this.unsupported || !this.observer) {
      onEnter();
      return;
    }
    this.callbacks.set(element, onEnter);
    this.observer.observe(element);
  }

  unobserve(element: Element): void {
    this.callbacks.delete(element);
    this.observer?.unobserve(element);
  }
}
