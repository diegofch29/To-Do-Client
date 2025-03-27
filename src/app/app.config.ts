import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';

export const environment = {
  apiUrl: 'https://to-do-api-fjb5f4e4apcqf3dd.canadacentral-01.azurewebsites.net'
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),provideAnimations(),provideNativeDateAdapter() ]
};
