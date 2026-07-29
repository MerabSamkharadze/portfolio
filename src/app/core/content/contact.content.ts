import type { ContactChannel } from '@core/models';

import { PROFILE } from './profile.content';

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: 'mail',
    external: false,
  },
  { label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref, icon: 'phone', external: false },
  {
    label: 'LinkedIn',
    value: 'merab-samkharadze',
    href: PROFILE.linkedIn,
    icon: 'linkedin',
    external: true,
  },
  { label: 'Location', value: PROFILE.location, href: null, icon: 'mapPin', external: false },
];
