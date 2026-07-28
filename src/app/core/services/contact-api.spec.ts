import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import type { ContactMessage } from '../models/portfolio.model';
import { ContactApi, buildMailtoUrl } from './contact-api';

const MESSAGE: ContactMessage = {
  name: 'Nino Beridze',
  email: 'nino@bankofgeorgia.ge',
  subject: 'Angular Developer role',
  message: 'We would like to invite you to a technical interview next week.',
};

describe('buildMailtoUrl', () => {
  it('addresses the message to the portfolio owner', () => {
    expect(buildMailtoUrl(MESSAGE).startsWith('mailto:samkharadzemerab@gmail.com?')).toBe(true);
  });

  it('encodes spaces as %20 rather than +, so mail clients render them correctly', () => {
    const url = buildMailtoUrl(MESSAGE);

    expect(url).toContain('subject=Angular%20Developer%20role');
    expect(url).not.toContain('+');
  });

  it('carries the sender name and reply address in the body', () => {
    const body = decodeURIComponent(new URL(buildMailtoUrl(MESSAGE)).search);

    expect(body).toContain('Nino Beridze');
    expect(body).toContain('nino@bankofgeorgia.ge');
    expect(body).toContain('technical interview');
  });

  it('survives characters that would otherwise break the URL', () => {
    const url = buildMailtoUrl({
      ...MESSAGE,
      subject: 'Re: role & salary?',
    });

    expect(url).toContain('Re%3A%20role%20%26%20salary%3F');
  });
});

describe('ContactApi', () => {
  let api: ContactApi;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    api = TestBed.inject(ContactApi);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('falls back to a mailto URL when no backend endpoint is configured', async () => {
    const pending = firstValueFrom(api.send(MESSAGE));

    await vi.advanceTimersByTimeAsync(1000);
    const result = await pending;

    expect(result.delivered).toBe(false);
    expect(result.mailtoUrl).toContain('mailto:');
  });

  it('never resolves before the minimum pending window, so the spinner is readable', async () => {
    let settled = false;
    firstValueFrom(api.send(MESSAGE)).then(() => (settled = true));

    await vi.advanceTimersByTimeAsync(300);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(500);
    expect(settled).toBe(true);
  });
});
