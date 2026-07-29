import { InjectionToken } from '@angular/core';

export interface PortfolioConfig {
  /**
   * Backend endpoint for the contact form. An empty string keeps the form on
   * its `mailto:` path, which is the correct behaviour for a static host.
   */
  readonly contactEndpoint: string;
}

export const PORTFOLIO_CONFIG = new InjectionToken<PortfolioConfig>('PORTFOLIO_CONFIG');
