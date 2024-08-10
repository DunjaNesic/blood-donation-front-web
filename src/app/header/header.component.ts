import { Component, Input } from '@angular/core';
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
export class HeaderComponent {

  constructor(private authService: AuthService){}

  @Input() title: string = 'Naslov';
  officialName: string = '';

  logout(): void{
    this.authService.logout();
  }

  ngOnInit(): void {
    const user = this.authService.currentlySignedInUser();
    console.log(user);
    if (user) {
      this.officialName = user.officialFullName || ''; 
    }
  }
}