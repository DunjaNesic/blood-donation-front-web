import { Component, Input } from '@angular/core';
import { Donor } from '../../types';

@Component({
  selector: 'app-called-donor-card',
  standalone: true,
  imports: [],
  template: `
  <div class="donor-card">
  <p>{{ donor.jmbg }}</p>
      <div class="card-header">
        <h3>{{ donor.donorFullName }}</h3>
        <img src="drop.png" alt="User Icon" class="drop-icon">
      </div>
      <p>Krvna grupa: {{ donor.bloodType }}</p>
      <p class="status"><span class="status-icon">&#x21A9;</span> Ne dolazi</p>
    </div>
  `,
  styleUrls: ['./called-donor-card.component.css']
})
export class CalledDonorCardComponent {
  @Input() donor!: Donor;
}
