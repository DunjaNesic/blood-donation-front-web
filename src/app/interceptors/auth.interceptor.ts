import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const platformId = inject(PLATFORM_ID);
  const userString = isPlatformBrowser(platformId) ? localStorage.getItem('user') : null;

  if (userString) {
    const user = JSON.parse(userString);
    const token = user.accessToken ?? '';
    
    req = req.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      }
    });
  }

  console.log('Request URL:', req.url);
  console.log('Request Headers:', req.headers.keys().reduce((acc, key) => {
    acc[key] = req.headers.get(key);
    return acc;
  }, {} as { [key: string]: string | null }));

  return next(req); 
};
