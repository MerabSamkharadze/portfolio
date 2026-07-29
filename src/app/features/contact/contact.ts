import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '@shared/directives';
import { SectionHeading } from '@shared/ui';

import { ContactChannels } from './contact-channels/contact-channels';
import { ContactForm } from './contact-form/contact-form';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactChannels, ContactForm, Reveal, SectionHeading],
  templateUrl: './contact.html',
  host: { class: 'block' },
})
export class Contact {}
