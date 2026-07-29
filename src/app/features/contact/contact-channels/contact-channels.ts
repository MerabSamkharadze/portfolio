import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, DOCUMENT, inject, signal } from '@angular/core';

import { PortfolioStore } from '@core/services';
import { Icon } from '@shared/ui';

/** How long the "copied" confirmation stays on the button. */
const COPIED_FEEDBACK_MS = 2000;

/** The direct routes — email, phone, LinkedIn, location — plus the CV download. */
@Component({
  selector: 'app-contact-channels',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, NgTemplateOutlet],
  templateUrl: './contact-channels.html',
  host: { class: 'block' },
})
export class ContactChannels {
  private readonly store = inject(PortfolioStore);
  private readonly document = inject(DOCUMENT);

  protected readonly profile = this.store.profile;
  protected readonly channels = this.store.contactChannels;
  protected readonly copied = signal(false);

  protected async copyEmail(): Promise<void> {
    const clipboard = this.document.defaultView?.navigator.clipboard;
    if (!clipboard) {
      return;
    }

    try {
      await clipboard.writeText(this.profile().email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), COPIED_FEEDBACK_MS);
    } catch {
      // Clipboard permission denied — the address stays visible and selectable.
    }
  }
}
