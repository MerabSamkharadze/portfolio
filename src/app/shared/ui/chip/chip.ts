import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

/**
 * Visual weight of a chip. Kept intentionally abstract — callers map their own
 * domain (skill level, requirement status) onto a tone, so the primitive never
 * learns about the domain.
 *
 * Steps down by weight, not by hue — every tone is neutral. The accent colour
 * is reserved for CTAs, hover/active state and metric figures, never for a
 * chip, so this vocabulary has no tone that reaches for it.
 */
export type ChipTone = 'bold' | 'neutral' | 'quiet' | 'outline';

const TONE_CLASSES: Readonly<Record<ChipTone, string>> = {
  bold: 'bg-secondary text-foreground border-transparent font-medium',
  neutral: 'bg-secondary text-secondary-foreground border-border',
  quiet: 'bg-transparent text-muted-foreground border-border',
  outline: 'bg-transparent text-muted-foreground border-dashed border-border',
};

const BASE_CLASSES =
  'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border font-mono ' +
  'leading-none transition-colors duration-200';

/**
 * Small mono-spaced label used for technologies, skill levels and statuses.
 */
@Component({
  selector: 'app-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex' },
  template: `
    <span [class]="chipClass()">
      <ng-content />
    </span>
  `,
})
export class Chip {
  readonly tone = input<ChipTone>('neutral');
  /** Accepts a bare `compact` attribute as well as `[compact]="true"`. */
  readonly compact = input(false, { transform: booleanAttribute });

  protected readonly chipClass = computed(() => {
    const size = this.compact() ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1.5 text-xs';
    return `${BASE_CLASSES} ${size} ${TONE_CLASSES[this.tone()]}`;
  });
}
