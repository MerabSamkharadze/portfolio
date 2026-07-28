import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';

import { ICONS, type IconName } from './icon-set';

/**
 * Renders a glyph from the built-in icon set.
 *
 * ```html
 * <app-icon name="mail" [size]="18" />
 * ```
 *
 * Icons inherit `currentColor`, so colour is controlled entirely by the parent's
 * text colour — no inputs, no variants, no icon-library dependency.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0' },
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (path of paths(); track $index) {
        <path [attr.d]="path" />
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20, { transform: numberAttribute });
  readonly strokeWidth = input(1.7, { transform: numberAttribute });

  protected readonly paths = computed<readonly string[]>(() => ICONS[this.name()]);
}
