import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Make sure the path is correct and the file exists; if your routes are defined in 'app.routes.ts', update as follows:
import { routes } from './app.routes';
// Or, if you intended to use 'app-routing.module.ts', ensure that file exists and exports 'routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
