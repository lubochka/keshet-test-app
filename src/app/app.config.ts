import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/auth.interceptor';
import { routes } from './app.routes';
import { LOCALE_ID } from '@angular/core';

export const appConfig:ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
     provideNativeDateAdapter(),
      { provide: LOCALE_ID, useValue: 'he' },
    ]
};
