import { Component, Input } from '@angular/core';
import { Volunteer } from '../../types';

@Component({
  selector: 'app-called-volunteer-card',
  standalone: true,
  imports: [],
  template: `
    <div class="volunteer-card">
      <div class="card-header">
        <h3>{{ volunteer.volunteerFullName }}</h3>
        <img src="red-cross.svg" alt="User Icon" class="cross-icon">
      </div>
      <p>Crveni krst: {{ volunteer.redCross }}</p>
      <p class="status"><span class="status-icon">&#x21A9;</span> Dolazi</p>
    </div>
  `,
  styleUrl: './called-volunteer-card.component.css'
})
export class CalledVolunteerCardComponent {
  @Input() volunteer!: Volunteer;
  
}
