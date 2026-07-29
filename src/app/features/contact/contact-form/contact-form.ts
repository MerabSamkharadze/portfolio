import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { ContactMessage, ContactResult } from '@core/models';
import { ContactApi } from '@core/services';
import { Icon } from '@shared/ui';

type SubmitStatus = 'idle' | 'pending' | 'done';

/** Field name union, so `invalid('emial')` is a compile error. */
export type ContactField = 'name' | 'email' | 'subject' | 'message';

const MESSAGE_MIN_LENGTH = 20;
const NAME_MIN_LENGTH = 2;
const SUBJECT_MIN_LENGTH = 3;

/** One-tap subject presets — they remove the blank-page pause before writing. */
const SUBJECT_PRESETS: readonly string[] = [
  'Job opportunity',
  'Freelance project',
  'Something else',
];

@Component({
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  host: { class: 'block' },
})
export class ContactForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactApi = inject(ContactApi);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly subjectPresets = SUBJECT_PRESETS;
  protected readonly messageMinLength = MESSAGE_MIN_LENGTH;

  protected readonly status = signal<SubmitStatus>('idle');
  protected readonly result = signal<ContactResult | null>(null);
  protected readonly submitting = computed(() => this.status() === 'pending');

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(NAME_MIN_LENGTH)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(SUBJECT_MIN_LENGTH)]],
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

    // getRawValue() rather than value: the form is disabled by the line above.
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
  protected invalid(field: ContactField): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }
}
