import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * `quiet`  — transparent, edge only. Education, Skills.
 * `base`   — filled. Projects, Experience.
 * `raised` — filled, and the edge lights up on hover. Featured projects.
 */
export type CardSurface = 'quiet' | 'base' | 'raised';

const SURFACE_CLASSES: Readonly<Record<CardSurface, string>> = {
  quiet: 'surface-quiet',
  base: 'surface-base',
  raised: 'surface-raised card-hover',
};

/**
 * The one card on this page.
 *
 * Callers project six slots — meta, title, claim, metrics, detail, stack —
 * and the shell decides where each one sits and how much air goes above it.
 * The order is fixed in CSS rather than by document order, so a card cannot
 * accidentally put its figures above its title; and a slot a card has nothing
 * for is simply left out, costing no space.
 *
 * ```html
 * <app-card-shell surface="base">
 *   <p data-slot="meta">Crocobet · Production</p>
 *   <h3 data-slot="title">Promotions Platform</h3>
 *   …
 * </app-card-shell>
 * ```
 */
@Component({
  selector: 'app-card-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
  template: `
    <article class="card-shell group h-full" [class]="surfaceClass()">
      <ng-content />
    </article>
  `,
})
export class CardShell {
  readonly surface = input<CardSurface>('base');

  protected readonly surfaceClass = computed(() => SURFACE_CLASSES[this.surface()]);
}
