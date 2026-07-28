import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { ContactMessage, ContactResult } from '../../core/models/portfolio.model';
import { ContactApi } from '../../core/services/contact-api';
import { PortfolioStore } from '../../core/services/portfolio-store';
import { Reveal } from '../../shared/directives/reveal';
import { Icon } from '../../shared/ui/icon/icon';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

type SubmitStatus = 'idle' | 'pending' | 'done';

const MESSAGE_MIN_LENGTH = 20;

/** One-tap subject presets — removes the blank-page pause before writing. */
const SUBJECT_PRESETS: readonly string[] = [
  'Interview invitation',
  'Angular Developer role',
  'Technical questions',
];

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, ReactiveFormsModule, Reveal, SectionHeading],
  templateUrl: './contact.html',
  host: { class: 'block' },
})
export class Contact {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactApi = inject(ContactApi);
  private readonly store = inject(PortfolioStore);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly profile = this.store.profile;
  protected readonly channels = this.store.contactChannels;
  protected readonly subjectPresets = SUBJECT_PRESETS;
  protected readonly messageMinLength = MESSAGE_MIN_LENGTH;

  protected readonly status = signal<SubmitStatus>('idle');
  protected readonly result = signal<ContactResult | null>(null);
  protected readonly copied = signal(false);

  protected readonly submitting = computed(() => this.status() === 'pending');

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(MESSAGE_MIN_LENGTH)]],
  });

  protected submit(): void {
    if (this.submitting()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('pending');
    this.form.disable({ emitEvent: false });

    const message: ContactMessage = this.form.getRawValue();

    this.contactApi
      .send(message)
      // Explicit DestroyRef: this runs outside an injection context.
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.result.set(result);
        this.status.set('done');
      });
  }

  protected reset(): void {
    this.form.enable({ emitEvent: false });
    this.form.reset();
    this.result.set(null);
    this.status.set('idle');
  }

  protected applyPreset(subject: string): void {
    this.form.controls.subject.setValue(subject);
    this.form.controls.subject.markAsTouched();
  }

  /** True once a field has been interacted with and is still invalid. */
  protected invalid(field: 'name' | 'email' | 'subject' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  protected async copyEmail(): Promise<void> {
    const clipboard = this.document.defaultView?.navigator.clipboard;
    if (!clipboard) {
      return;
    }

    try {
      await clipboard.writeText(this.profile().email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Clipboard permission denied — the address stays visible and selectable.
    }
  }
}
