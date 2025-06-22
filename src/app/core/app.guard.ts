import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service'; // adjust the path as needed

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    return true;
  } else {
    // 👇 Correct: return a UrlTree for redirect
    return router.createUrlTree(['/login']);
  }
};
