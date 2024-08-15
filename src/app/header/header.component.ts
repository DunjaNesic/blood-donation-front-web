import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <div class="header">
      <h1>{{ title }}</h1>
      <div class="user-profile">
        <span>{{ officialName }}</span>
        <button (click)="logout()">Odjavi se</button>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = 'Naslov';
  officialName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private async loadUser(): Promise<void> {
    try {
      await this.authService.setUserFromStorage(); 
      const user = this.authService.currentlySignedInUser();
      if (user) {
        this.officialName = user.officialFullName || ''; 
      } else {
        console.error('No user is currently signed in.');
        this.officialName = '';
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
