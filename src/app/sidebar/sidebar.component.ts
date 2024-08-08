import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar">
      <div class="nav-links">
      <button class="nav-button" [ngClass]="{'active': isActive('/predstojece-akcije')}" (click)="navigateTo('/predstojece-akcije')">Predstojeće akcije</button>
        <button class="nav-button" [ngClass]="{'active': isActive('/pregled-akcija')}" (click)="navigateTo('/pregled-akcija')">Pregled akcija</button>
        <button class="nav-button" [ngClass]="{'active': isActive('/zavrsene-akcije')}" (click)="navigateTo('/zavrsene-akcije')">Završene akcije</button>
      </div>
      <div class="sidebar-logo">
        <img src="logo2.gif" alt="ITK FON Logo" class="logo">
        <p>ITK FON</p>
      </div>
</div>

  `,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  isActive(route: string): boolean {
    return window.location.pathname === route;
  }

  navigateTo(route: string): void {
    // window.location.href = route; 
  }
}
