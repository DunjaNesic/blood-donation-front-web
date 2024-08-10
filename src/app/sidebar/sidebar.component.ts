import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="sidebar">
    <div class="sidebar-logo">
        <img src="logo2.gif" alt="ITK FON Logo" class="logo">
        <p>ITK FON</p>
      </div>
      <div class="nav-links">
        <button class="nav-button" [ngClass]="{'active': isActive('/home')}" (click)="navigateTo('/home')">
          <mat-icon>event</mat-icon> Predstojeće akcije
        </button>
        <button class="nav-button" [ngClass]="{'active': isActive('/creating')}" (click)="navigateTo('/creating')">
          <mat-icon>add_circle</mat-icon> Kreiranje akcije
        </button>
        <button class="nav-button" [ngClass]="{'active': isActive('/finished')}" (click)="navigateTo('/finished')">
          <mat-icon>check_circle</mat-icon> Završene akcije
        </button>
      </div>
    </div>
  `,

  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  currentRoute: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  navigateTo(route: string): void {
      this.router.navigateByUrl(route);
  }
}
