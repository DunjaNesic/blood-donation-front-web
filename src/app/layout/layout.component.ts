import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, SidebarComponent],
template: `
   <div class="layout">
  <app-sidebar></app-sidebar>
  <div class="content-wrapper">
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  </div>

  `,
  styleUrl: './layout.component.css'
})
export class AppLayoutComponent { }
