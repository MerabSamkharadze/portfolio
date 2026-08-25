import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Splits `**lead**` off the front of a bullet. */
const LEAD_PATTERN = /^\*\*(.+?)\*\*/s;

/**
 * One bullet, with its opening clause pulled forward.
 *
 * Every bullet on this page carries a number or a decision worth stopping on,
 * but a wall of evenly-weighted grey gives the eye nowhere to land. The lead
 * clause is marked in the content itself — `**like this**` — so the emphasis
 * travels with the sentence instead of being counted out in the template.
 * The rendered text is identical either way; only the weight changes.
 */
@Component({
  selector: 'app-lead-bullet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <p class="flex gap-3 text-body text-muted-foreground">
      <span
        class="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-muted-foreground"
        aria-hidden="true"
      ></span>
      <!--
        Both halves sit in their own element on purpose. An interpolation left
        bare here would pick up the template's own indentation as a leading
        space once Angular collapses whitespace, and the sentence would render
        with a gap the source string does not have.
      -->
      <span class="text-pretty">
        @if (lead(); as leadText) {
          <strong class="font-semibold text-foreground">{{ leadText }}</strong>
        }
        <span>{{ rest() }}</span>
      </span>
    </p>
  `,
})
export class LeadBullet {
  readonly text = input.required<string>();

  private readonly match = computed(() => LEAD_PATTERN.exec(this.text()));

  protected readonly lead = computed(() => this.match()?.[1] ?? null);

  protected readonly rest = computed(() => {
    const match = this.match();
    return match ? this.text().slice(match[0].length) : this.text();
  });
}
