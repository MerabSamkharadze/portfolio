import { type BootstrapContext, bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { config } from './app/app.config.server';

/**
 * Entry point for the build-time pre-render step.
 *
 * The context must be forwarded: on the server there is no implicit platform,
 * so `bootstrapApplication` needs it to know which render it belongs to.
 */
export default (context: BootstrapContext) => bootstrapApplication(App, config, context);
