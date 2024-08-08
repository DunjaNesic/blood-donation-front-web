import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const user = isPlatformBrowser(platformId) ? localStorage.getItem('user') : null;
  if (user != null || user != undefined) return true;
  else {router.navigateByUrl("login");
    return false; }
};
