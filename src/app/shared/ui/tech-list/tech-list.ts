import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

import { Chip } from '../chip/chip';

/**
 * The row of technology chips that closes a project card or an experience entry.
 *
 * It exists because the same list appeared in three templates with three
 * slightly different sets of utility classes — which is how a design drifts.
 */
@Component({
  selector: 'app-tech-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip],
  host: { class: 'block' },
  template: `
    <ul class="flex flex-wrap gap-1.5" [class]="ruleClass()">
      @for (item of items(); track item) {
        <li>
          <app-chip tone="quiet" compact>{{ item }}</app-chip>
        </li>
      }
    </ul>
  `,
})
export class TechList {
  readonly items = input.required<readonly string[]>();
  /** Adds the hairline rule that separates the stack from the copy above it. */
  readonly divided = input(false, { transform: booleanAttribute });

  protected readonly ruleClass = computed(() =>
    this.divided() ? 'border-t border-border/60 pt-5' : '',
  );
}
