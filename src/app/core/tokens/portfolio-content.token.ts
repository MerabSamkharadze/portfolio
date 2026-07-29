import { InjectionToken } from '@angular/core';

import type { PortfolioContent } from '@core/models';

/** Every word on the page. Provided in `app.config.ts`, overridable in tests. */
export const PORTFOLIO_CONTENT = new InjectionToken<PortfolioContent>('PORTFOLIO_CONTENT');
