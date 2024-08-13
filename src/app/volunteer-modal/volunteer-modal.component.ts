import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Volunteer } from '../../types';
import { VolunteersService } from '../services/volunteer/volunteers.service'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-volunteer-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="modal-content">
      <h2>Registrovani volonteri</h2>
      <div class="volunteer-list">
        <div *ngFor="let volunteer of volunteers" 
             class="volunteer-item" 
             [ngClass]="{'selected': selectedVolunteerIDs.includes(volunteer.volunteerID)}">
          <div class="volunteer-info">
            <img src="user.png" alt="avatar" class="avatar">
            <div class="volunteer-details">
            <p class="red-cross">{{ volunteer.redCross }}</p>
            <p>{{ volunteer.volunteerFullName }}</p>
            </div>
          </div>
          <button (click)="toggleSelection(volunteer.volunteerID)" class="add-button">
            {{ selectedVolunteerIDs.includes(volunteer.volunteerID) ? '-' : '+' }}
          </button>
        </div>
      </div>
      <button (click)="onFinish()" class="finish-button">Pozovi</button>
    </div>
  `,
  styleUrls: ['./volunteer-modal.component.css']
})
export class VolunteerModalComponent implements OnInit {
  volunteers: Volunteer[] = [];
  selectedVolunteerIDs: number[] = [];

  constructor(
    private volunteerService: VolunteersService,
    private dialogRef: MatDialogRef<VolunteerModalComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { actionID: number }
  ) {}

  ngOnInit() {
    this.volunteerService.getVolunteers('/itk/volunteers')
      .subscribe({
        next: (volunteers) => this.volunteers = volunteers,
        error: (error) => console.error('Error fetching volunteers:', error)
      });
  }

  toggleSelection(volunteerID: number): void {
    const index = this.selectedVolunteerIDs.indexOf(volunteerID);
    if (index > -1) {
      this.selectedVolunteerIDs.splice(index, 1);
    } else {
      this.selectedVolunteerIDs.push(volunteerID);
    }
  }

  onFinish(): void {
    const postData = { volunteerIDs: this.selectedVolunteerIDs, actionID: this.data.actionID };

    console.log(postData);

    this.http.post('https://localhost:7062/itk/volunteers', postData)
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
