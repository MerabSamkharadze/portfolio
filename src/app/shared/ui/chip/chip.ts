import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Two weights, and no third.
 *
 * `secondary` against `card` measures 1.15:1, so a ramp of four chip fills was
 * never going to separate four levels — the top two read as one. What the
 * chip carries now is only "filled or not"; which group a chip belongs to is
 * said in words, by the heading above it. A label is more legible than a tone.
 */
export type ChipTone = 'solid' | 'quiet';

const TONE_CLASSES: Readonly<Record<ChipTone, string>> = {
  solid: 'border-border bg-secondary text-foreground',
  quiet: 'border-border bg-transparent text-muted-foreground',
};

/*
  Ordered the way the box is built up rather than alphabetically:
  layout → box → typography, with the tone's colours appended last. A chip is
  a label and never a control, so there is no state group — and so nothing
  here to transition either.

  The template binds this through `[attr.class]` rather than `[class]`.
  Angular's class binding normalises the string into a map and writes the
  classes back out alphabetically, which is what made the rendered attribute
  unreadable; setting the attribute directly keeps this order all the way into
  the DOM. Safe here only because nothing else writes a class to that span.
*/
const BASE_CLASSES =
  'inline-flex items-center ' + // layout
  'whitespace-nowrap rounded-md border ' + // box
  'font-mono leading-none'; // typography

/**
 * Small mono-spaced label used for technologies, skill levels and statuses.
 */
@Component({
  selector: 'app-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex' },
  template: `
    <span [attr.class]="chipClass()">
      <ng-content />
    </span>
  `,
})
export class Chip {
  readonly tone = input<ChipTone>('quiet');

  protected readonly chipClass = computed(
    () => `${BASE_CLASSES} px-2.5 py-1.5 text-mono-label ${TONE_CLASSES[this.tone()]}`,
  );
}
