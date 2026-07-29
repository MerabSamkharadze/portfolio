import type { Provider } from '@angular/core';

import { portfolioContent } from '@core/content';
import type { PortfolioContent } from '@core/models';
import { PORTFOLIO_CONFIG, PORTFOLIO_CONTENT, type PortfolioConfig } from '@core/tokens';

interface PortfolioTestingOptions {
  readonly content?: Partial<PortfolioContent>;
  readonly config?: Partial<PortfolioConfig>;
}

/**
 * The providers a spec needs to stand up anything that reads portfolio content.
 *
 * Keeps the token wiring in one place, so adding a token later does not mean
 * editing every spec that happens to render a section.
 */
export function providePortfolioTesting(options: PortfolioTestingOptions = {}): Provider[] {
  return [
    { provide: PORTFOLIO_CONTENT, useValue: { ...portfolioContent, ...options.content } },
    { provide: PORTFOLIO_CONFIG, useValue: { contactEndpoint: '', ...options.config } },
  ];
}
