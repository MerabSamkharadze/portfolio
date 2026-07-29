import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { portfolioContent } from '@core/content';
import { PORTFOLIO_CONFIG, PORTFOLIO_CONTENT } from '@core/tokens';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // No zone.js — change detection is driven entirely by signals and events.
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideHttpClient(withFetch()),
    // The page arrives pre-rendered; hydrate it instead of re-creating the DOM.
    provideClientHydration(withEventReplay()),

    { provide: PORTFOLIO_CONTENT, useValue: portfolioContent },
    // An empty endpoint keeps the contact form on its mailto: path.
    { provide: PORTFOLIO_CONFIG, useValue: { contactEndpoint: '' } },
  ],
};
