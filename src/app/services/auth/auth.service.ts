import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { ApiService } from './../api.service';
import { Official, User } from '../../../types';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentlySignedInUser = signal<Official | undefined | null>(undefined);

  constructor(
    private ApiService: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.ApiService.post<User>('/login', credentials, {});
  }

  logout(): void{
    localStorage.removeItem('user');
    this.currentlySignedInUser.set(null);
    this.router.navigate(['/login']);
  }

  setUserFromStorage(): Promise<void> {
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        const userString = localStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          const userID = user.userID;

          this.ApiService.get<Official>(`/itk/officials/${userID}`).subscribe((res) => {
            this.currentlySignedInUser.set(res);
            resolve(); 
          });
        } else {
          this.currentlySignedInUser.set(null);
          resolve();
        }
      } else {
        resolve(); 
      }
    });
  }
}
