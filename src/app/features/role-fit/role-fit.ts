import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';

import type { MatchStatus } from '../../core/models/portfolio.model';
import { PortfolioStore } from '../../core/services/portfolio-store';
import { RevealObserver } from '../../shared/directives/reveal-observer';
import { Reveal } from '../../shared/directives/reveal';
import { Chip, type ChipTone } from '../../shared/ui/chip/chip';
import type { IconName } from '../../shared/ui/icon/icon-set';
import { Icon } from '../../shared/ui/icon/icon';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

interface StatusMeta {
  readonly label: string;
  readonly tone: ChipTone;
  readonly icon: IconName;
  readonly cardClass: string;
}

const STATUS_META: Readonly<Record<MatchStatus, StatusMeta>> = {
  direct: {
    label: 'Direct experience',
    tone: 'solid',
    icon: 'check',
    cardClass: 'border-primary/25 bg-card',
  },
  strong: {
    label: 'Strong',
    tone: 'accent',
    icon: 'check',
    cardClass: 'border-primary/15 bg-card',
  },
  transferable: {
    label: 'Transferable',
    tone: 'neutral',
    icon: 'gitBranch',
    cardClass: 'border-border bg-card',
  },
  growing: {
    label: 'Building now',
    tone: 'outline',
    icon: 'sparkles',
    cardClass: 'border-border/70 bg-card/60',
  },
};

const RING_RADIUS = 54;

/**
 * Maps the job posting, line by line, onto verifiable evidence.
 *
 * This is the section the page exists for: a reviewer can confirm the fit
 * without reading the CV, and the two honest gaps are labelled rather than
 * hidden — which is what makes the other eleven rows believable.
 */
@Component({
  selector: 'app-role-fit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip, Icon, Reveal, SectionHeading],
  templateUrl: './role-fit.html',
  host: { class: 'block' },
})
export class RoleFit {
  private readonly store = inject(PortfolioStore);
  private readonly revealObserver = inject(RevealObserver);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly profile = this.store.profile;
  protected readonly required = this.store.requiredRequirements;
  protected readonly preferred = this.store.preferredRequirements;
  protected readonly matchScore = this.store.matchScore;
  protected readonly fullyMetCount = this.store.fullyMetCount;
  protected readonly requirementCount = this.store.requirementCount;

  protected readonly ringRadius = RING_RADIUS;
  protected readonly ringCircumference = 2 * Math.PI * RING_RADIUS;

  /** Flipped once the gauge scrolls into view, so the ring animates on arrival. */
  private readonly ringArmed = signal(false);

  protected readonly ringOffset = computed(() =>
    this.ringArmed()
      ? this.ringCircumference * (1 - this.matchScore() / 100)
      : this.ringCircumference,
  );

  protected readonly legend = Object.entries(STATUS_META).map(([status, meta]) => ({
    status: status as MatchStatus,
    ...meta,
  }));

  constructor() {
    afterNextRender(() => {
      this.revealObserver.observe(this.elementRef.nativeElement, () => this.ringArmed.set(true));
    });
  }

  protected metaFor(status: MatchStatus): StatusMeta {
    return STATUS_META[status];
  }
}
