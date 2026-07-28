import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // No zone.js — change detection is driven entirely by signals and events.
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
  ],
};
