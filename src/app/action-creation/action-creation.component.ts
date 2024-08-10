import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from './../header/header.component';
import { InputFieldComponent } from './../input-field/input-field.component';
import { CardComponent } from './../card/card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-action-creation',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HeaderComponent,
    InputFieldComponent,
    CardComponent,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <app-header [title]="'Kreiranje akcije'"></app-header>
    <div class="form-container">
      <app-input-field label="Naziv akcije" placeholder="Naziv..." helperText="Unesite naziv koji ce pomoci davaocima <br> i volonterima u diferenciranju akcija"></app-input-field>
      <div class="pair">
        <app-input-field label="Grad" placeholder="Grad..." helperText=""></app-input-field>
        <app-input-field label="Tačna adresa" placeholder="Adresa..." helperText="Unesite ulicu i broj lokacije na kojoj će se akcija održati"></app-input-field> 
      </div>
      <div class="pair">
        <mat-form-field>
          <mat-label>Datum akcije</mat-label>
          <input matInput [matDatepicker]="picker">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <app-input-field label="Satnica akcije" placeholder="Satnica..." helperText="Unesite tačan vremenski okvir održavanja akcije"></app-input-field>
      </div> 
    </div>

    <div class="officials">
    <h2>Postavite zadužene za akciju</h2>

    </div>

    <div class="volunteers-card">
      <h2>Pozovite volontere koji će pomoći u organizovanju akcije</h2>
    <div class="card-container">
      <app-card 
        [volunteerFullName]="volunteers[0].fullName"
        [dateFreeFrom]="volunteers[0].dateFreeFrom"
        [dateFreeTo]="volunteers[0].dateFreeTo"
        [redCross]="volunteers[0].redCross">
      </app-card>
      <app-card 
        [volunteerFullName]="volunteers[1].fullName"
        [dateFreeFrom]="volunteers[1].dateFreeFrom"
        [dateFreeTo]="volunteers[1].dateFreeTo"
        [redCross]="volunteers[1].redCross">
      </app-card>
      <app-card 
        [volunteerFullName]="volunteers[2].fullName"
        [dateFreeFrom]="volunteers[2].dateFreeFrom"
        [dateFreeTo]="volunteers[2].dateFreeTo"
        [redCross]="volunteers[2].redCross">
      </app-card>
    </div>
    </div>

    <div class="donors-card">
      <h2>Pozovite davaoce krvi koji će učestvovati u akciji</h2>
    <div class="card-container">
      <app-card 
        [volunteerFullName]="volunteers[0].fullName"
        [dateFreeFrom]="volunteers[0].dateFreeFrom"
        [dateFreeTo]="volunteers[0].dateFreeTo"
        [redCross]="volunteers[0].redCross">
      </app-card>
      <app-card 
        [volunteerFullName]="volunteers[1].fullName"
        [dateFreeFrom]="volunteers[1].dateFreeFrom"
        [dateFreeTo]="volunteers[1].dateFreeTo"
        [redCross]="volunteers[1].redCross">
      </app-card>
      <app-card 
        [volunteerFullName]="volunteers[2].fullName"
        [dateFreeFrom]="volunteers[2].dateFreeFrom"
        [dateFreeTo]="volunteers[2].dateFreeTo"
        [redCross]="volunteers[2].redCross">
      </app-card>
    </div>
    </div>

    <button class="create-button">Kreiraj</button>

  `,
  styleUrl: './action-creation.component.css'
})
export class ActionCreationComponent {
  volunteers = [
    {
      fullName: 'Iva Đoković',
      dateFreeFrom: new Date('2024-03-05T00:00:00'),
      dateFreeTo: new Date('2024-06-08T00:00:00'),
      redCross: 'CKSmederevo'
    },
    {
      fullName: 'Sandra Kovačević',
      dateFreeFrom: new Date('2024-04-01T00:00:00'),
      dateFreeTo: new Date('2024-07-01T00:00:00'),
      redCross: 'CKSmederevo'
    },
    {
      fullName: 'Sara Dokić',
      dateFreeFrom: new Date('2024-05-01T00:00:00'),
      dateFreeTo: new Date('2024-08-01T00:00:00'),
      redCross: 'CKSmederevo'
    }
  ];
}
