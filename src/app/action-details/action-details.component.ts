import { Component, OnInit } from '@angular/core';
import { CalledDonorCardComponent } from '../called-donor-card/called-donor-card.component';
import { Donor, Volunteer } from '../../types';
import { CommonModule } from '@angular/common';
import { CalledVolunteerCardComponent } from "../called-volunteer-card/called-volunteer-card.component";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DonorModalComponent } from '../donor-modal/donor-modal.component';
import { VolunteerModalComponent } from '../volunteer-modal/volunteer-modal.component';
import { DonorsService } from '../services/donor/donors.service';
import { VolunteersService } from '../services/volunteer/volunteers.service';

@Component({
  selector: 'app-action-details',
  standalone: true,
  imports: [CalledDonorCardComponent, CommonModule, CalledVolunteerCardComponent, HeaderComponent],
  template: `
    <app-header [title]="'Detalji izabrane akcije'"></app-header>
    <div class="action-details-container">
      <div class="section">
        <h3>Pozvani davaoci:</h3>
        <div class="cards-container">
          <app-called-donor-card 
            *ngFor="let donor of donors" 
            [donor]="donor">
          </app-called-donor-card>
          <button class="add-button donor" (click)="addDonor()">+</button>
        </div>
      </div>
      <div class="section">
        <h3>Pozvani volonteri:</h3>
        <div class="cards-container">
          <app-called-volunteer-card 
            *ngFor="let volunteer of volunteers" 
            [volunteer]="volunteer">
          </app-called-volunteer-card>    
          <button class="add-button" (click)="addVolunteer()">+</button> 
        </div>
      </div>
      <div class="section">
        <button class="update-button" (click)="update()">Popunjavanje upitnika</button>
      </div>
    </div>
  `,
  styleUrls: ['./action-details.component.css']
})
export class ActionDetailsComponent implements OnInit {
  donors: Donor[] = [];
  volunteers: Volunteer[] = [];

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private donorService: DonorsService, private volunteerService: VolunteersService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const actionID = Number(this.route.snapshot.paramMap.get('actionID'));

    this.donorService.getCalledDonors(actionID)
    .subscribe({
      next: (response) => {
        this.donors = response;
      },
      error: (error) => {
        console.error('Error fetching called donors:', error);
      }
    });

  this.volunteerService.getCalledVolunteers(actionID)
    .subscribe({
      next: (response) => {
        this.volunteers = response;
      },
      error: (error) => {
        console.error('Error fetching called volunteers:', error);
      }
    });
  }

  openDonorModal(): void {
    const actionID = Number(this.route.snapshot.paramMap.get('actionID'));
    const dialogRef = this.dialog.open(DonorModalComponent, {
      width: '60%',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-backdrop',
      data: { actionID }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchData(); 
    });
  }

  openVolunteerModal(): void {
    const actionID = Number(this.route.snapshot.paramMap.get('actionID'));
    const dialogRef = this.dialog.open(VolunteerModalComponent, {
      width: '60%',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-backdrop',
      data: { actionID }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchData(); 
    });
  }

  update(): void {
    console.log('Update button clicked');
  }

  addDonor(): void {
    this.openDonorModal();
  }

  addVolunteer(): void {
    this.openVolunteerModal();
  }
}
