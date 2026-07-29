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
 * The hidden state is applied by this directive at runtime, never by static
 * markup. That matters because the page is pre-rendered: the HTML that arrives
 * from the server must be readable before any JavaScript executes, so nothing
 * may ship with `opacity: 0` baked in.
 *
 * Elements already on screen when the directive wakes up are marked visible
 * without ever being hidden — otherwise hydration would blink the hero out and
 * back in. Only elements below the fold get the animation.
 *
 * The transition itself lives in `styles.css` (`.reveal` / `.is-visible`), so
 * `prefers-reduced-motion` is honoured without any JavaScript branching.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal]': 'armed()',
    '[class.is-visible]': 'visible()',
  },
})
export class Reveal {
  /** Delay in milliseconds before this element animates in. */
  readonly delay = input(0, { alias: 'appReveal', transform: numberAttribute });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly revealObserver = inject(RevealObserver);

  /** True once the element is allowed to be hidden pending its entrance. */
  protected readonly armed = signal(false);
  protected readonly visible = signal(false);

  constructor() {
    afterNextRender(() => {
      const element = this.elementRef.nativeElement;

      if (isWithinViewport(element)) {
        // Already readable. Leave it alone.
        this.visible.set(true);
        return;
      }

      const delay = this.delay();
      if (delay > 0) {
        element.style.setProperty('--reveal-delay', `${delay}ms`);
      }

      this.armed.set(true);
      this.revealObserver.observe(element, () => this.visible.set(true));
    });
  }
}

/** True when any part of the element is inside the current viewport. */
function isWithinViewport(element: HTMLElement): boolean {
  const view = element.ownerDocument.defaultView;
  if (!view) {
    return true;
  }

  const rect = element.getBoundingClientRect();
  return rect.top < view.innerHeight && rect.bottom > 0;
}
