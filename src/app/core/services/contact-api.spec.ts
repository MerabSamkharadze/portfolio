import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { portfolioContent } from '@core/content';
import type { ContactMessage } from '@core/models';
import { PORTFOLIO_CONFIG, PORTFOLIO_CONTENT } from '@core/tokens';

import { ContactApi, buildMailtoUrl } from './contact-api';

const RECIPIENT = 'merab@example.com';

const MESSAGE: ContactMessage = {
  name: 'Nino Beridze',
  email: 'nino@example.com',
  subject: 'Angular Developer role',
  message: 'We would like to invite you to a technical interview next week.',
};

describe('buildMailtoUrl', () => {
  it('addresses the message to the given recipient', () => {
    expect(buildMailtoUrl(RECIPIENT, MESSAGE).startsWith(`mailto:${RECIPIENT}?`)).toBe(true);
  });

  it('encodes spaces as %20 rather than +, so mail clients render them correctly', () => {
    const url = buildMailtoUrl(RECIPIENT, MESSAGE);

    expect(url).toContain('subject=Angular%20Developer%20role');
    expect(url).not.toContain('+');
  });

  it('carries the sender name and reply address in the body', () => {
    const body = decodeURIComponent(new URL(buildMailtoUrl(RECIPIENT, MESSAGE)).search);

    expect(body).toContain('Nino Beridze');
    expect(body).toContain('nino@example.com');
    expect(body).toContain('technical interview');
  });

  it('survives characters that would otherwise break the URL', () => {
    const url = buildMailtoUrl(RECIPIENT, { ...MESSAGE, subject: 'Re: role & salary?' });

    expect(url).toContain('Re%3A%20role%20%26%20salary%3F');
  });

  it('escapes a literal plus sign instead of turning it into a space', () => {
    const url = buildMailtoUrl(RECIPIENT, { ...MESSAGE, subject: 'C++ role' });

    expect(url).toContain('C%2B%2B%20role');
  });
});

describe('ContactApi', () => {
  function configure(contactEndpoint: string) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: PORTFOLIO_CONTENT, useValue: portfolioContent },
        { provide: PORTFOLIO_CONFIG, useValue: { contactEndpoint } },
      ],
    });
    return TestBed.inject(ContactApi);
  }

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('falls back to a mailto URL when no backend endpoint is configured', async () => {
    const pending = firstValueFrom(configure('').send(MESSAGE));

    await vi.advanceTimersByTimeAsync(1000);
    const result = await pending;

    expect(result.delivered).toBe(false);
    expect(result.mailtoUrl).toContain(`mailto:${portfolioContent.profile.email}`);
  });

  it('never resolves before the minimum pending window, so the spinner is readable', async () => {
    let settled = false;
    firstValueFrom(configure('').send(MESSAGE)).then(() => (settled = true));

    await vi.advanceTimersByTimeAsync(300);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(500);
    expect(settled).toBe(true);
  });
});
