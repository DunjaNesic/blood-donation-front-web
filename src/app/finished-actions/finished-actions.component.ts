import { Component } from '@angular/core';
import { HeaderComponent } from './../header/header.component';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-finished-actions',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  template: `
 <app-header [title]="'Završene akcije'"></app-header>

<div class="actions-container">
  <div class="actions-table">
    <div class="table-header">
      <span>Naziv akcije</span>
      <span>Grad</span>
      <span>Lokacija</span>
      <span>Vreme</span>
      <span></span>
    </div>
    <div class="table-row" *ngFor="let action of actions">
      <div class="table-cell">{{ action.name }}</div>
      <div class="table-cell">{{ action.city }}</div>
      <div class="table-cell">{{ action.location }}</div>
      <div class="table-cell">{{ action.time }}</div>
      <div class="table-cell">
        <button class="stats-button">Stats</button>
      </div>
    </div>
  </div>
</div>

  `,
  styleUrl: './finished-actions.component.css'
})

export class FinishedActionsComponent {
  actions = [
    {
      name: 'Akcija u Smederevu',
      city: 'Smederevo',
      location: 'Cernisevskog',
      time: '10:00-13:00',
      status: 'In Process'
    },
    {
      name: 'Akcija studenata',
      city: 'Beograd',
      location: 'Vojvode Stepe',
      time: '12:00-14:00',
      status: 'Rejected'
    },
    {
      name: 'Ujedinjenje za zivot',
      city: 'Nis',
      location: 'Kajmakcalanska',
      time: '12:00-15:00',
      status: 'Paid'
    },
    {
      name: 'Budi i ti neciji heroj',
      city: 'Beograd',
      location: 'Petrovacka',
      time: '08:00-10:00',
      status: 'Pending'
    },
    {
      name: 'Pomoc za decu',
      city: 'Novi Sad',
      location: 'Bulevar Oslobodjenja',
      time: '09:00-11:00',
      status: 'Paid'
    },
    {
      name: 'Zeleni park',
      city: 'Subotica',
      location: 'Park Palic',
      time: '10:00-12:00',
      status: 'In Process'
    },
    {
      name: 'Izgradnja skolske biblioteke',
      city: 'Kragujevac',
      location: 'Petrovac na Mlavi',
      time: '13:00-15:00',
      status: 'Pending'
    },
    {
      name: 'Humanitarni koncert',
      city: 'Niš',
      location: 'Dom kulture',
      time: '17:00-19:00',
      status: 'Paid'
    },
    {
      name: 'Pomoć ugroženima',
      city: 'Valjevo',
      location: 'Karađorđeva',
      time: '14:00-16:00',
      status: 'Rejected'
    }
  ];
}