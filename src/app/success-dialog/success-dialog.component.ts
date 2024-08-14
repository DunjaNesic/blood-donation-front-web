import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div class="dialog-container">
      <h1 mat-dialog-title class="dialog-title">{{ data.title }}</h1>
      <div mat-dialog-content class="dialog-content">
        {{ data.message }}
      </div>
      <div mat-dialog-actions class="dialog-actions">
        <button mat-button mat-dialog-close class="dialog-button">Ok</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #F1F5FC;
      padding: 1.5rem;
      border: 1px solid;
    }

    .dialog-title {
      font-size: 1.5em;
      color: #2e7d32;
      margin-bottom: 1rem;
    }

    .dialog-content {
      font-size: 1em;
      color: #333;
      margin-bottom: 1.2rem;
    }

    .dialog-actions {
      display: flex;
      justify-content: center;
    }

    .dialog-button {
      background-color: #388e3c;
      color: white;
      border-radius: 2rem;
      padding: 0.8rem 2rem;
      font-size: 1em;
      border: none;
    }

    .dialog-button:hover {
      background-color: #2e7d32;
    }
  `],
})
export class SuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {}
}
