import type { Routes } from '@angular/router';

import { Home } from '@features/home/home';

/**
 * One route. It exists so the build can enumerate what to pre-render —
 * `outputMode: static` walks this table and writes finished HTML for each entry.
 * Navigation within the page is by anchor, not by router.
 */
export const routes: Routes = [{ path: '', component: Home }];
