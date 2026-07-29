import { TestBed, type ComponentFixture } from '@angular/core/testing';
import type { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import type { ContactMessage, ContactResult } from '@core/models';
import { ContactApi } from '@core/services';
import { ContactForm } from './contact-form';

const VALID_MESSAGE: ContactMessage = {
  name: 'Nino Beridze',
  email: 'nino@bankofgeorgia.ge',
  subject: 'Angular Developer role',
  message: 'We would like to invite you to a technical interview next week.',
};

const STUB_MAILTO = 'mailto:stub@example.com?subject=test';

/** The component keeps `form` protected; tests reach it through this shape. */
interface ContactInternals {
  form: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    subject: FormControl<string>;
    message: FormControl<string>;
  }>;
}

describe('ContactForm', () => {
  let fixture: ComponentFixture<ContactForm>;
  let sent: ContactMessage[];

  beforeEach(async () => {
    sent = [];

    const contactApiStub: Pick<ContactApi, 'send'> = {
      send: (message) => {
        sent.push(message);
        const result: ContactResult = { delivered: false, mailtoUrl: STUB_MAILTO };
        return of(result);
      },
    };

    TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [{ provide: ContactApi, useValue: contactApiStub }],
    });

    fixture = TestBed.createComponent(ContactForm);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function form(): ContactInternals['form'] {
    return (fixture.componentInstance as unknown as ContactInternals).form;
  }

  function fill(overrides: Partial<ContactMessage> = {}): void {
    form().setValue({ ...VALID_MESSAGE, ...overrides });
  }

  function submit(): void {
    const element: HTMLFormElement | null = fixture.nativeElement.querySelector('form');
    element?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  }

  it('starts invalid, so an empty form cannot be sent', () => {
    expect(form().invalid).toBe(true);
  });

  it('renders every required field', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('#contact-name')).toBeTruthy();
    expect(element.querySelector('#contact-email')).toBeTruthy();
    expect(element.querySelector('#contact-subject')).toBeTruthy();
    expect(element.querySelector('#contact-message')).toBeTruthy();
  });

  describe('validation', () => {
    it('accepts a complete, well-formed message', () => {
      fill();
      expect(form().valid).toBe(true);
    });

    it('rejects a malformed email address', () => {
      fill({ email: 'not-an-email' });
      expect(form().controls.email.valid).toBe(false);
    });

    it('rejects a message shorter than the minimum length', () => {
      fill({ message: 'too short' });
      expect(form().controls.message.valid).toBe(false);
    });

    it('rejects a single-character name', () => {
      fill({ name: 'N' });
      expect(form().controls.name.valid).toBe(false);
    });
  });

  describe('submission', () => {
    it('does not call the API while the form is invalid', () => {
      submit();
      expect(sent).toHaveLength(0);
    });

    it('marks fields as touched on an invalid submit so errors become visible', () => {
      submit();
      expect(form().controls.email.touched).toBe(true);
    });

    it('sends the message once the form is valid', () => {
      fill();
      submit();

      expect(sent).toHaveLength(1);
      expect(sent[0]).toEqual(VALID_MESSAGE);
    });

    it('swaps the form for a confirmation panel after a successful send', () => {
      fill();
      submit();

      const element: HTMLElement = fixture.nativeElement;
      expect(element.querySelector('form')).toBeNull();
      expect(element.textContent).toContain('Message ready to send');
    });

    it('offers the composed mailto fallback when there is no backend to deliver to', () => {
      fill();
      submit();

      const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector(
        `a[href="${STUB_MAILTO}"]`,
      );
      expect(link).toBeTruthy();
    });
  });
});
