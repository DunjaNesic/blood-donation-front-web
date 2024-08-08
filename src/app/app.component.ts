import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blood_donation';

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}

  ngOnInit(): void {
    console.log("prvo");
    if (isPlatformBrowser(this.platformId)) {
      this.authService.setUserFromStorage().then(() => {
        console.log('User data has been set in AppComponent');
      });
    }
  }
}
