import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Icon } from '../icon/icon';

/**
 * The validation message under a form field.
 *
 * It exists so the error is carried on three channels rather than one: an
 * icon, a tinted panel and the danger colour. The accent and the danger hue
 * are close relatives on the wheel, so colour on its own is a weak way to say
 * "this is wrong" — a glance has to be enough.
 */
@Component({
  selector: 'app-field-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: { class: 'block' },
  template: `
    <p
      class="mt-2 flex items-start gap-2 rounded-md border border-danger/60 bg-danger/15 px-2.5 py-1.5 text-caption leading-snug text-danger"
    >
      <app-icon name="alertCircle" [size]="13" class="mt-px" />
      <span><ng-content /></span>
    </p>
  `,
})
export class FieldError {}
