import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donor-card',
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header">
        <span>{{ donorFullName }}</span>
      </div>
      <div class="card-body">
      <div class="drop-area">
        <p><strong>JMBG:</strong> {{ jmbg }}</p>
        <p><strong>Krvna grupa:</strong> {{ bloodType }}</p>
        <p><strong>Lokacija:</strong> {{ placeName }}</p>
        <p><strong>Aktivan:</strong> {{ isActive ? 'Da' : 'Ne' }}</p>
        <p><strong>Poslednja akcija:</strong> {{ lastDonationDate | date }}</p>
        </div>
        <button class="add-button">Dodaj</button>
      </div>
    </div>
  `,
  styleUrls: ['./donor-card.component.css'],
  imports: [CommonModule]
})
export class DonorCardComponent {
  @Input() jmbg: string = '';
  @Input() donorFullName: string = '';
  @Input() donorEmailAddress: string = '';
  @Input() bloodType: number | null = null;
  @Input() placeName: string = '';
  @Input() isActive: boolean = false;
  @Input() lastDonationDate: Date | null = null;
}
