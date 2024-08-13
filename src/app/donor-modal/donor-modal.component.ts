import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Donor } from '../../types';
import { DonorsService } from '../services/donor/donors.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-donor-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="modal-content">
      <h2>Registrovani davaoci</h2>
      <div class="donor-list">
        <div *ngFor="let donor of donors" 
             class="donor-item" 
             [ngClass]="{'selected': selectedJmbgs.includes(donor.jmbg)}">
          <div class="donor-info">
            <img src="user.png" alt="avatar" class="avatar">
            <div class="donor-details">
              <p>{{ donor.jmbg }}</p>
              <p>{{ donor.donorFullName }}</p>
            </div>
          </div>
          <p class="blood-type">{{ donor.bloodType }}</p>
          <button (click)="toggleSelection(donor.jmbg)" class="add-button">
            {{ selectedJmbgs.includes(donor.jmbg) ? '-' : '+' }}
          </button>
        </div>
      </div>
      <button (click)="onFinish()" class="finish-button">Pozovi</button>
    </div>
  `,
  styleUrls: ['./donor-modal.component.css']
})
export class DonorModalComponent implements OnInit {
  donors: Donor[] = [];
  selectedJmbgs: string[] = [];

  constructor(
    private donorService: DonorsService,
    private dialogRef: MatDialogRef<DonorModalComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { actionID: number }
  ) {}

  ngOnInit() {
    this.donorService.getDonors('/itk/donors')
      .subscribe({
        next: (donors) => this.donors = donors,
        error: (error) => console.error('Error fetching donors:', error)
      });
  }

  toggleSelection(jmbg: string): void {
    const index = this.selectedJmbgs.indexOf(jmbg);
    if (index > -1) {
      this.selectedJmbgs.splice(index, 1);
    } else {
      this.selectedJmbgs.push(jmbg);
    }
  }

  onFinish(): void {
    const postData = { jmbGs: this.selectedJmbgs, actionID: this.data.actionID };

    console.log(postData);

    this.http.post('https://localhost:7062/itk/donors', postData)
      .subscribe({
        next: (response) => {
          console.log('POST request successful:', response);
          this.dialogRef.close();
        },
        error: (error) => console.error('Error during POST request:', error)
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
