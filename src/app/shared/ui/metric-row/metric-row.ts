import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { Stat } from '@core/models';

/** How many tiles a card may show before the row stops being scannable. */
const MAX_TILES = 4;

/** A figure that reads as a change: "33 → 0", "6 → 1". */
interface Tile {
  readonly label: string;
  readonly from: string | null;
  readonly value: string;
}

/**
 * The row of headline figures. One tile shape, used by every card on the page.
 *
 * A figure written as "old → new" is split rather than printed whole: the
 * starting number is the thing being left behind, so it stays muted and only
 * the number that survived carries the accent.
 */
@Component({
  selector: 'app-metric-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <dl class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      @for (tile of tiles(); track tile.label) {
        <div class="rounded-xl border border-border bg-background/40 px-3 py-3">
          <dt class="sr-only">{{ tile.label }}</dt>
          <dd>
            <span class="block font-mono text-2xl font-bold leading-none">
              @if (tile.from) {
                <span class="text-muted-foreground">{{ tile.from }}</span>
                <span class="text-muted-foreground" aria-hidden="true">&nbsp;→&nbsp;</span>
              }
              <span class="text-primary">{{ tile.value }}</span>
            </span>
            <span class="mt-2 block text-caption leading-tight text-muted-foreground">
              {{ tile.label }}
            </span>
          </dd>
        </div>
      }
    </dl>
  `,
})
export class MetricRow {
  readonly stats = input.required<readonly Stat[]>();

  protected readonly tiles = computed<readonly Tile[]>(() =>
    this.stats()
      .slice(0, MAX_TILES)
      .map((stat) => {
        const [from, to] = stat.value.split('→').map((part) => part.trim());
        return to === undefined
          ? { label: stat.label, from: null, value: stat.value }
          : { label: stat.label, from, value: to };
      }),
  );
}
