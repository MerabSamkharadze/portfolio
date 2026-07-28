import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Reveal } from './reveal';

/** Minimal IntersectionObserver stand-in — jsdom does not ship one. */
class StubIntersectionObserver implements IntersectionObserver {
  static instances: StubIntersectionObserver[] = [];

  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];

  readonly observed = new Set<Element>();

  constructor(private readonly callback: IntersectionObserverCallback) {
    StubIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.observed.add(target);
  }

  unobserve(target: Element): void {
    this.observed.delete(target);
  }

  disconnect(): void {
    this.observed.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Test helper: pretend `target` has scrolled into view. */
  enter(target: Element): void {
    this.callback(
      [{ target, isIntersecting: true } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

@Component({
  imports: [Reveal],
  template: `
    <p id="plain" appReveal>Plain</p>
    <p id="delayed" appReveal="180">Delayed</p>
  `,
})
class HostComponent {}

describe('Reveal directive', () => {
  const originalObserver = window.IntersectionObserver;

  afterEach(() => {
    window.IntersectionObserver = originalObserver;
    StubIntersectionObserver.instances = [];
  });

  async function render() {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  describe('with IntersectionObserver available', () => {
    beforeEach(() => {
      window.IntersectionObserver = StubIntersectionObserver as unknown as typeof IntersectionObserver;
    });

    it('applies the reveal class but stays hidden until the element is in view', async () => {
      const fixture = await render();
      const element: HTMLElement = fixture.nativeElement.querySelector('#plain');

      expect(element.classList.contains('reveal')).toBe(true);
      expect(element.classList.contains('is-visible')).toBe(false);
    });

    it('becomes visible once the observer reports an intersection', async () => {
      const fixture = await render();
      const element: HTMLElement = fixture.nativeElement.querySelector('#plain');
      const [observer] = StubIntersectionObserver.instances;

      observer.enter(element);
      fixture.detectChanges();

      expect(element.classList.contains('is-visible')).toBe(true);
    });

    it('stops observing an element after it has revealed, so it never animates twice', async () => {
      const fixture = await render();
      const element: HTMLElement = fixture.nativeElement.querySelector('#plain');
      const [observer] = StubIntersectionObserver.instances;

      expect(observer.observed.has(element)).toBe(true);
      observer.enter(element);

      expect(observer.observed.has(element)).toBe(false);
    });

    it('shares one observer across every reveal element on the page', async () => {
      await render();

      expect(StubIntersectionObserver.instances.length).toBe(1);
      expect(StubIntersectionObserver.instances[0].observed.size).toBe(2);
    });

    it('writes an explicit delay as a CSS custom property', async () => {
      const fixture = await render();
      const plain: HTMLElement = fixture.nativeElement.querySelector('#plain');
      const delayed: HTMLElement = fixture.nativeElement.querySelector('#delayed');

      expect(delayed.style.getPropertyValue('--reveal-delay')).toBe('180ms');
      // No inline delay, so a parent `.stagger` rule can still supply one.
      expect(plain.style.getPropertyValue('--reveal-delay')).toBe('');
    });
  });

  describe('without IntersectionObserver support', () => {
    beforeEach(() => {
      // @ts-expect-error deliberately removing the API to test the fallback
      delete window.IntersectionObserver;
    });

    it('reveals content immediately rather than leaving the page blank', async () => {
      const fixture = await render();
      const element: HTMLElement = fixture.nativeElement.querySelector('#plain');

      expect(element.classList.contains('is-visible')).toBe(true);
    });
  });
});
