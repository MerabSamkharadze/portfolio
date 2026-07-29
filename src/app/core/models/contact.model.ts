import type { IconName } from '@shared/ui/icon/icon-set';

export interface ContactChannel {
  readonly label: string;
  readonly value: string;
  /** `null` renders the channel as plain text rather than a link. */
  readonly href: string | null;
  readonly icon: IconName;
  readonly external: boolean;
}

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactResult {
  /** True when the message reached a configured backend endpoint. */
  readonly delivered: boolean;
  /** Always present — lets the visitor finish the send from their mail client. */
  readonly mailtoUrl: string;
}
