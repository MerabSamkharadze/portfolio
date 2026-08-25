import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Chip } from '../chip/chip';

/**
 * The STACK slot: the technologies a piece of work was built with.
 *
 * It exists because the same list appeared in three templates with three
 * slightly different sets of utility classes — which is how a design drifts.
 * The rule and the spacing above it belong to the card shell now, so this
 * renders the chips and nothing else.
 */
@Component({
  selector: 'app-tech-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip],
  host: { class: 'block' },
  template: `
    <ul class="flex flex-wrap gap-2">
      @for (item of items(); track item) {
        <li>
          <app-chip tone="quiet">{{ item }}</app-chip>
        </li>
      }
    </ul>
  `,
})
export class TechList {
  readonly items = input.required<readonly string[]>();
}
