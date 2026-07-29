import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { type Observable, catchError, map, of, timer } from 'rxjs';

import type { ContactMessage, ContactResult } from '@core/models';
import { PORTFOLIO_CONFIG, PORTFOLIO_CONTENT } from '@core/tokens';

/** Perceived-latency floor, so the pending state is readable rather than a flash. */
const MIN_PENDING_MS = 700;

/**
 * Delivers a contact-form message.
 *
 * With an endpoint configured the message is POSTed to that backend. Without
 * one — the default for a statically hosted site — the service still succeeds
 * and returns a fully pre-filled `mailto:` URL, so the visitor can finish the
 * send from their own client in one click. No message is silently dropped in
 * either path.
 */
@Injectable({ providedIn: 'root' })
export class ContactApi {
  private readonly http = inject(HttpClient);
  private readonly endpoint = inject(PORTFOLIO_CONFIG).contactEndpoint;
  private readonly recipient = inject(PORTFOLIO_CONTENT).profile.email;

  send(message: ContactMessage): Observable<ContactResult> {
    const mailtoUrl = buildMailtoUrl(this.recipient, message);

    if (!this.endpoint) {
      return timer(MIN_PENDING_MS).pipe(map(() => ({ delivered: false, mailtoUrl })));
    }

    return this.http.post<unknown>(this.endpoint, message).pipe(
      map(() => ({ delivered: true, mailtoUrl })),
      catchError(() => of({ delivered: false, mailtoUrl })),
    );
  }
}

/** Composes an RFC 6068 `mailto:` URL with the subject and body pre-filled. */
export function buildMailtoUrl(recipient: string, message: ContactMessage): string {
  const body = [
    message.message,
    '',
    '—',
    `From: ${message.name}`,
    `Reply to: ${message.email}`,
  ].join('\n');

  const params = new URLSearchParams({ subject: message.subject, body });

  // URLSearchParams encodes spaces as "+", which mail clients render literally.
  // A literal "+" in the input is already escaped to %2B, so this is safe.
  return `mailto:${recipient}?${params.toString().replace(/\+/g, '%20')}`;
}
