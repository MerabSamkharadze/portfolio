import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

import { portfolioContent } from '@core/content';
import { PORTFOLIO_CONFIG, PORTFOLIO_CONTENT } from '@core/tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // No zone.js — change detection is driven entirely by signals and events.
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),

    { provide: PORTFOLIO_CONTENT, useValue: portfolioContent },
    // An empty endpoint keeps the contact form on its mailto: path.
    { provide: PORTFOLIO_CONFIG, useValue: { contactEndpoint: '' } },
  ],
};
