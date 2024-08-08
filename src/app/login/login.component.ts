import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
  template: `
    <div class="container">
      <div class="login-container">
        <div class="card-login">
          <h1 class="welcome">Dobrodošli nazad</h1>
          <form (ngSubmit)="onSubmit()" [formGroup]="loginForm" class="login-form">
            <div class="input-container">
              <label for="email">Email</label>
              <input id="email" formControlName="email" type="email">
              <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="error">
                Email is required and must be a valid email.
              </div>
            </div>
            
            <div class="input-container">
              <label for="password">Lozinka</label>
              <input id="password" formControlName="password" type="password">
              <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error">
                Password is required.
              </div>
            </div>      

            <button type="submit" [disabled]="loginForm.invalid" class="submit-button">Prijavi se</button>
          </form>
        </div>
      </div>
      <div class="logo-container">
        <img src="logo2.gif" alt="ITK FON logo" class="logo">
        <h2>ITK FON</h2>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    public authService: AuthService, 
    private router: Router, 
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log("drugo");

    this.authService.setUserFromStorage().then(() => {
      if (this.authService.currentlySignedInUser()) {
        this.router.navigateByUrl('home');
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (user) => {
          console.log('Login successful', user);
          localStorage.setItem("user", JSON.stringify(user));
          this.router.navigateByUrl('home');
        },
        error: (err) => {
          if (err.status === 401) {
            this.showErrorDialog("Pogresni kredencijali, pokusajte ponovo");
          } else {
            this.showErrorDialog("Doslo je do greske, molimo pokusajte kasnije");
          }        
        }
      });
    }
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: message },
      width: '25rem',
    });
  }
}
