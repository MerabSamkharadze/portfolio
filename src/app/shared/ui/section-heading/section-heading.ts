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
        class="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary"
        [class.justify-center]="centered()"
      >
        <span class="h-px w-6 bg-primary/50" [class.hidden]="centered()"></span>
        {{ eyebrow() }}
      </p>

      <h2
        appReveal="70"
        class="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {{ heading() }}
      </h2>

      @if (lead(); as leadText) {
        <p
          appReveal="140"
          class="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground"
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
