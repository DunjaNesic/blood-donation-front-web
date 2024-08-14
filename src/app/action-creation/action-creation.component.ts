import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { VolunteersService } from '../services/volunteer/volunteers.service';
import { DonorsService } from '../services/donor/donors.service';
import { OfficialsService } from '../services/official/officials.service';
import { PlacesService } from '../services/place/places.service';
import { ActionsService } from '../services/transfusion_action/actions.service';
import { ScrollService } from '../services/scroll/scroll.service';
import { Volunteer, Donor, Official, Place } from '../../types';
import { HeaderComponent } from './../header/header.component';
import { InputFieldComponent } from './../input-field/input-field.component';
import { CardComponent } from './../card/card.component';
import { DonorCardComponent } from "../donor-card/donor-card.component";
import { OfficialCardComponent } from "../official-card/official-card.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

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
      <form [formGroup]="form" (ngSubmit)="onCreateAction()">
        <div class="input-container">
          <app-input-field
            label="Naziv akcije"
            placeholder="Naziv..."
            helperText="Unesite naziv koji ce pomoci davaocima <br> i volonterima u diferenciranju akcija"
            formControlName="actionName">
          </app-input-field>
          <div *ngIf="form.get('actionName')?.invalid && form.get('actionName')?.touched" class="error">
            Morate dati naziv akciji
          </div>
        </div>

        <div class="pair">
          <div class="input-container">
            <select id="placeID" formControlName="placeID">
              <option [ngValue]="null" disabled>Grad</option>
              <option *ngFor="let place of places" [value]="place.placeID">{{ place.placeName }}</option>
            </select>
            <div *ngIf="form.get('placeID')?.invalid && form.get('placeID')?.touched" class="error">
              Morate izabrati grad
            </div>
          </div>

          <app-input-field 
            label="Tačna adresa" 
            placeholder="Adresa..." 
            helperText="Unesite ulicu i broj lokacije na kojoj će se akcija održati"
            formControlName="exactLocation">
          </app-input-field>
          <div *ngIf="form.get('exactLocation')?.invalid && form.get('exactLocation')?.touched" class="error">
            Tačna adresa je obavezna
          </div>
        </div>

        <div class="pair">
          <div class="datum">
          <mat-form-field>
            <mat-label>Datum akcije</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="actionDate">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <div *ngIf="form.get('actionDate')?.invalid && form.get('actionDate')?.touched" class="error">
            Datum akcije ne moze biti u proslosti
          </div>
          </div>
          

        <app-input-field 
          label="Satnica akcije" 
          placeholder="Satnica..." 
          helperText="Unesite tačan vremenski okvir održavanja akcije"
          formControlName="actionTimeFromTo">
        </app-input-field>
        <div *ngIf="form.get('actionTimeFromTo')?.invalid && form.get('actionTimeFromTo')?.touched" class="error">
          Morate uneti satnicu
        </div>
        </div>
      </form>
    </div>

    <div class="officials" *ngIf="officials.length > 0">
      <div class="officials-card">
        <h2>Postavite zadužene za akciju</h2>
        <div class="card-container">
          <app-official-card 
            *ngFor="let official of officials"
            [official]="official"
            [isSelected]="listOfActionOfficialIDs.includes(official.officialID)"
            (selectOfficial)="onAddActionOfficial($event)">
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
    <button class="create-button" (click)="onCreateAction()" [disabled]="form.invalid">Kreiraj</button>
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
    private actionsService: ActionsService,
    private dialog: MatDialog,
    private router: Router,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.scrollService.scrollToTop();

    this.form = this.fb.group({
      actionName: ['', [Validators.required]],
      actionDate: [null, [Validators.required, this.dateValidator]],
      actionTimeFromTo: ['', [Validators.required]],
      exactLocation: ['', [Validators.required]],
      placeID: [null, [Validators.required]]
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

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    if (selectedDate < today) {
      return { dateInvalid: true };
    }
    return null;
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
    const index = this.listOfActionOfficialIDs.indexOf(officialID);
    if (index > -1) {
      this.listOfActionOfficialIDs.splice(index, 1);
    } else {
      this.listOfActionOfficialIDs.push(officialID);
    }
  }

  onCreateAction(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.dialog.open(ErrorDialogComponent, {
        data: {
          message: 'Došlo je do greške pri kreiranju akcije'
        }
      });
    }

    const formData = this.form.value;
    formData.actionDate = this.datePipe.transform(formData.actionDate, 'dd MMM yyyy') || '';

    const actionData = {
      ...formData,
      listOfVolunteerIDs: this.listOfVolunteerIDs,
      listOfDonorIDs: this.listOfDonorIDs,
      listOfActionOfficialIDs: this.listOfActionOfficialIDs,
      officialID: this.signedID
    };

    this.actionsService.createAction(actionData).subscribe({
      next: (response) => {
        console.log(actionData);
        this.dialog.open(SuccessDialogComponent, {
          data: {
            title: 'Uspesno',
            message: 'Akcija je uspešno kreirana'
          }
        }).afterClosed().subscribe(() => {
          this.router.navigateByUrl('home'); 
        });
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message: 'Došlo je do greške pri kreiranju akcije',
          },
          width: '25rem'
        });
        console.error('Error creating action:', error);
      }
    });
  }
}
