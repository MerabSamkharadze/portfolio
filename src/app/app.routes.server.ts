import { RenderMode, type ServerRoute } from '@angular/ssr';

/**
 * Every route is written to disk at build time. There is no runtime server —
 * the output is plain static files that any CDN can serve.
 */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
