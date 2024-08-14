import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        console.log('NavigationEnd event detected'); 
        this.scrollToTop()
      }
    );
  }

  scrollToTop(): void {
    console.log("Skrolovano do gore");
    window.scrollTo(0, 0);
  }
}