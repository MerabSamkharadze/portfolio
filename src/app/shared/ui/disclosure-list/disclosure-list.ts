import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { LeadBullet } from '../lead-bullet/lead-bullet';

/** How many bullets a card shows before the rest go behind the toggle. */
const VISIBLE = 3;

/**
 * The DETAIL slot: the first few bullets, then everything else behind a count.
 *
 * The hidden bullets stay in the DOM and are collapsed with a grid-row
 * transition rather than being removed. Two reasons: the page is pre-rendered,
 * so a crawler reading the HTML still gets the whole record, and an expand
 * that has to build DOM first cannot animate cleanly.
 */
@Component({
  selector: 'app-disclosure-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeadBullet],
  host: { class: 'block' },
  template: `
    <ul class="space-y-3">
      @for (item of visible(); track $index) {
        <li><app-lead-bullet [text]="item" /></li>
      }
    </ul>

    @if (hidden().length) {
      <div
        class="grid transition-[grid-template-rows] ease-out"
        [class]="expanded() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        [style.transition-duration]="'var(--duration-disclosure)'"
      >
        <ul class="space-y-3 overflow-hidden" [attr.inert]="expanded() ? null : ''">
          @for (item of hidden(); track $index) {
            <li class="first:pt-3"><app-lead-bullet [text]="item" /></li>
          }
        </ul>
      </div>

      <button
        type="button"
        class="mt-3 inline-flex min-h-11 items-center font-mono text-mono-label text-muted-foreground transition-colors hover:text-primary"
        [style.transition-duration]="'var(--duration-micro)'"
        [attr.aria-expanded]="expanded()"
        (click)="toggle()"
      >
        {{ expanded() ? 'Show less' : '+' + hidden().length + ' more' }}
      </button>
    }
  `,
})
export class DisclosureList {
  readonly items = input.required<readonly string[]>();

  protected readonly expanded = signal(false);

  protected readonly visible = computed(() => this.items().slice(0, VISIBLE));
  protected readonly hidden = computed(() => this.items().slice(VISIBLE));

  protected toggle(): void {
    this.expanded.update((open) => !open);
  }
}
