import {
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

import { RevealObserver } from './reveal-observer';

/**
 * Fades, lifts and un-blurs the host element the first time it scrolls into view.
 *
 * ```html
 * <div appReveal>…</div>
 * <div appReveal="180">…</div>   <!-- 180 ms delay -->
 * ```
 *
 * The transition itself lives in `styles.css` (`.reveal` / `.is-visible`) so it
 * is honoured by `prefers-reduced-motion` without any JavaScript branching. When
 * no explicit delay is given, a parent `.stagger` can supply one via CSS.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.is-visible]': 'visible()',
  },
})
export class Reveal {
  /** Delay in milliseconds before this element animates in. */
  readonly delay = input(0, { alias: 'appReveal', transform: numberAttribute });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly revealObserver = inject(RevealObserver);

  protected readonly visible = signal(false);

  constructor() {
    afterNextRender(() => {
      const element = this.elementRef.nativeElement;
      const delay = this.delay();

      if (delay > 0) {
        element.style.setProperty('--reveal-delay', `${delay}ms`);
      }

      this.revealObserver.observe(element, () => this.visible.set(true));
    });
  }
}
