import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Reveal } from '@shared/directives';

/**
 * The shared section header: a mono eyebrow, the heading, and an optional lead
 * paragraph. Centralising it keeps vertical rhythm identical across all seven
 * sections — the thing that most often drifts in a hand-rolled page.
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  host: { class: 'block' },
  template: `
    <div [class.text-center]="centered()" [class.mx-auto]="centered()">
      <p
        appReveal
        class="mb-4 flex items-center gap-3 font-mono text-mono-label uppercase tracking-[0.08em] text-muted-foreground"
        [class.justify-center]="centered()"
      >
        <span class="h-px w-6 bg-border" [class.hidden]="centered()"></span>
        {{ eyebrow() }}
      </p>

      <h2 appReveal="50" class="text-balance text-h2 font-bold">
        {{ heading() }}
      </h2>

      @if (lead(); as leadText) {
        <p
          appReveal="100"
          class="mt-4 max-w-[68ch] text-pretty text-body-lg text-muted-foreground"
          [class.mx-auto]="centered()"
        >
          {{ leadText }}
        </p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly heading = input.required<string>();
  readonly lead = input<string | null>(null);
  readonly centered = input(false);
}
