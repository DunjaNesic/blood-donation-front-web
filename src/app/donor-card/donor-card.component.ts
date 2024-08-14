import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donor-card',
  standalone: true,
  template: `
    <div class="card" [ngStyle]="{ 'background-color': isSelected ? '#a9e5ec' : '#f1f5fc' }">
      <div class="card-header">
        <span>{{ donorFullName }}</span>
      </div>
      <div class="card-body">
        <div class="drop-area"
        [ngStyle]="{ 'border': isSelected ? '0.125rem dashed #70c0c9' : '0.125rem dashed #E91E63',
          'background-color': isSelected ? '#f9f9f9' : 'rgba(233, 30, 99, 0.1); '
         }">
          <p><strong>JMBG:</strong> {{ jmbg }}</p>
          <p><strong>Krvna grupa:</strong> {{ bloodType }}</p>
          <p><strong>Lokacija:</strong> {{ placeName }}</p>
          <p><strong>Aktivan:</strong> {{ isActive ? 'Da' : 'Ne' }}</p>
          <p><strong>Poslednja akcija:</strong> {{ lastDonationDate | date }}</p>
        </div>
        <button 
          class="add-button" 
          [ngStyle]="{ 'background-color': isSelected ? '#70c0c9' : '#f06292' }"
          (click)="toggleSelection()">
          {{ isSelected ? 'Opozovi' : 'Pozovi' }}
        </button>
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

  isSelected: boolean = false;

  toggleSelection(): void {
    this.isSelected = !this.isSelected;
  }
}
