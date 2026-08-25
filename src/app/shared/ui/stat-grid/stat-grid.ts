import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { Stat } from '@core/models';

/**
 * `hero`    — the large figures under the hero call-to-action.
 * `compact` — the outcome strip inside a project card.
 */
export type StatGridVariant = 'hero' | 'compact';

const VARIANTS: Readonly<
  Record<StatGridVariant, { readonly cell: string; readonly value: string; readonly label: string }>
> = {
  hero: {
    cell: 'card-hover surface-quiet rounded-xl border px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-5',
    value: 'block font-mono text-2xl font-bold text-gradient sm:text-3xl',
    label: 'mt-1.5 block text-[11px] leading-tight text-muted-foreground',
  },
  compact: {
    cell: 'rounded-lg border border-border/70 bg-background/40 px-3 py-2.5',
    value: 'block font-mono text-base font-bold text-primary',
    label: 'mt-0.5 block text-[10px] leading-tight text-muted-foreground',
  },
};

/**
 * A description list of headline figures.
 *
 * The label is the `<dt>` and is visually hidden, so a screen reader hears
 * "Platform users: 100k+" rather than two disconnected fragments.
 */
@Component({
  selector: 'app-stat-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <dl class="grid gap-3" [class]="columnsClass()">
      @for (stat of stats(); track stat.label) {
        <div [class]="style().cell">
          <dt class="sr-only">{{ stat.label }}</dt>
          <dd>
            <span [class]="style().value">{{ stat.value }}</span>
            <span [class]="style().label">{{ stat.label }}</span>
          </dd>
        </div>
      }
    </dl>
  `,
})
export class StatGrid {
  readonly stats = input.required<readonly Stat[]>();
  readonly variant = input<StatGridVariant>('compact');
  /** Tailwind grid-template classes, so the caller controls the breakpoints. */
  readonly columnsClass = input('grid-cols-2 sm:grid-cols-4');

  protected readonly style = computed(() => VARIANTS[this.variant()]);
}
