import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './../header/header.component';
import { InputFieldComponent } from './../input-field/input-field.component';
import { CardComponent } from './../card/card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolunteersService } from '../services/volunteer/volunteers.service';
import { Donor, Official, Place, Volunteer } from '../../types';
import { DonorsService } from '../services/donor/donors.service';
import { DonorCardComponent } from "../donor-card/donor-card.component";
import { OfficialsService } from '../services/official/officials.service';
import { OfficialCardComponent } from "../official-card/official-card.component";
import { PlacesService } from '../services/place/places.service';
import { AuthService } from '../services/auth/auth.service';
import { ActionsService } from '../services/transfusion_action/actions.service';

@Component({
  selector: 'app-action-creation',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
  imports: [
  CommonModule,
    HeaderComponent,
    InputFieldComponent,
    CardComponent,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    DonorCardComponent,
    OfficialCardComponent
],
  template: `
    <app-header [title]="'Kreiranje akcije'"></app-header>
    <div class="form-container">
    <form [formGroup]="form">
    <app-input-field label="Naziv akcije" placeholder="Naziv..." helperText="Unesite naziv koji ce pomoci davaocima <br> i volonterima u diferenciranju akcija"  formControlName="actionName">>
</app-input-field>


<div class="pair">
<select formControlName="placeID">
  <option [ngValue]="null" disabled>Grad</option>
  <option *ngFor="let place of places" [value]="place.placeID">{{ place.placeName }}</option>
</select>
  <app-input-field 
    label="Tačna adresa" 
    placeholder="Adresa..." 
    helperText="Unesite ulicu i broj lokacije na kojoj će se akcija održati"
    formControlName="exactLocation">
    </app-input-field>
</div>

<div class="pair">
  <mat-form-field>
    <mat-label>Datum akcije</mat-label>
    <input matInput [matDatepicker]="picker" formControlName="actionDate" [value]="parseDate2(form.get('actionDate')?.value)">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>
  <app-input-field label="Satnica akcije" placeholder="Satnica..." helperText="Unesite tačan vremenski okvir održavanja akcije" formControlName="actionTimeFromTo">
  </app-input-field>
</div>


</form>
    </div>

    <div class="officials">
  <div class="officials-card" *ngIf="officials.length > 0">
    <h2>Postavite zadužene za akciju</h2>
    <div class="card-container">
      <app-official-card 
        *ngFor="let official of officials"
        [official]="official"
        (click)="onAddActionOfficial(official.officialID)">
      </app-official-card>
    </div>
  </div>
</div>

<div class="volunteers-card" *ngIf="volunteers.length > 0">
  <h2>Pozovite volontere koji će pomoći u organizovanju akcije</h2>
  <div class="card-container">
    <app-card 
      *ngFor="let volunteer of volunteers"
      [volunteerFullName]="volunteer.volunteerFullName"
      [dateFreeFrom]="parseDate(volunteer.dateFreeFrom)"
      [dateFreeTo]="parseDate(volunteer.dateFreeTo)"
      [redCross]="volunteer.redCross"
      (click)="onAddVolunteer(volunteer.volunteerID)">
    </app-card>
  </div>
</div>

<div class="donors-card" *ngIf="donors.length > 0">
  <h2>Pozovite davaoce krvi koji će učestvovati u akciji</h2>
  <div class="card-container">
    <app-donor-card 
      *ngFor="let donor of donors"
      [jmbg]="donor.jmbg"
      [donorFullName]="donor.donorFullName"
      [bloodType]="donor.bloodType"
      [placeName]="donor.placeName"
      [isActive]="donor.isActive"
      [lastDonationDate]="parseDate(donor.lastDonationDate)"
      (click)="onAddDonor(donor.jmbg)">
    </app-donor-card>
  </div>
</div>

<button class="create-button" (click)="onCreateAction()">Kreiraj</button>
  `,
  styleUrls: ['./action-creation.component.css']
})
export class ActionCreationComponent implements OnInit {
  form!: FormGroup;
  volunteers: Volunteer[] = [];
  donors: Donor[] = [];
  officials: Official[] = [];
  places: Place[] = [];

  placeID: number | null = null;  
  listOfVolunteerIDs: number[] = []; 
  listOfDonorIDs: string[] = []; 
  listOfActionOfficialIDs: number[] = [];
  signedID: number | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private authService: AuthService,
    private volunteerService: VolunteersService,
    private donorService: DonorsService,
    private officialService: OfficialsService,
    private placeService: PlacesService,
    private actionsService: ActionsService 
  ) {}

  parseDate2(dateString: string): string {
    return this.datePipe.transform(dateString, 'dd. MMM yyyy') || '';
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      actionName: [''],
      actionDate: [null],
      actionTimeFromTo: [''],
      exactLocation: [''],
      placeID: [null]
    });

    const signedOfficial = this.authService.currentlySignedInUser();
    this.signedID = signedOfficial?.officialID;

    this.officialService.getAll('/itk/officials', this.signedID)
      .subscribe({
        next: (off) => this.officials = off,
        error: (error) => console.error('Error fetching officials:', error)
      });

    this.placeService.getAll('/itk/places')
      .subscribe({
        next: (place) => this.places = place,
        error: (error) => console.error('Error fetching places:', error)
      });

    this.volunteerService.getVolunteers('/itk/volunteers')
      .subscribe({
        next: (vol) => this.volunteers = vol,
        error: (error) => console.error('Error fetching volunteers:', error)
      });

    this.donorService.getDonors('/itk/donors')
      .subscribe({
        next: (donor) => this.donors = donor,
        error: (error) => console.error('Error fetching donors:', error)
      });
  }

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  onSelectPlace(placeID: number): void {
    this.placeID = placeID;
  }

  onAddVolunteer(volunteerID: number): void {
    if (!this.listOfVolunteerIDs.includes(volunteerID)) {
      this.listOfVolunteerIDs.push(volunteerID);
    }
  }

  onAddDonor(donorID: string): void {
    if (!this.listOfDonorIDs.includes(donorID)) {
      this.listOfDonorIDs.push(donorID);
    }
  }

  onAddActionOfficial(officialID: number): void {
    if (!this.listOfActionOfficialIDs.includes(officialID)) {
      this.listOfActionOfficialIDs.push(officialID);
    }
  }

  onCreateAction(): void {
   const formData = this.form.value;
   formData.actionDate = this.datePipe.transform(formData.actionDate, 'dd MMM yyyy') || '';
   
   const actionData = {
    ...formData,
    listOfVolunteerIDs: this.listOfVolunteerIDs,
    listOfDonorIDs: this.listOfDonorIDs,
    listOfActionOfficialIDs: this.listOfActionOfficialIDs,
    officialID: this.signedID
  };
  console.log(actionData);

    this.actionsService.createAction(actionData).subscribe({
      next: (response) => {
        console.log('Action created successfully:');
      },
      error: (error) => {
        console.error('Error creating action:', error);
      }
    });
  }
}