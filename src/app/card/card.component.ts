import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card" [ngStyle]="{ 'background-color': isSelected ? '#a9e5ec' : '#f1f5fc' }">
      <div class="card-header">
        <span>{{volunteerFullName}}</span>
      </div>
      <div 
        class="card-body" 
        [ngStyle]="{ 'border-color': isSelected ? '#70c0c9' : '#785CBA' }">
        <div class="drop-area" 
             [ngStyle]="{ 'border': isSelected ? '0.125rem dashed #70c0c9' : '0.125rem dashed #785CBA',
              'background-color': isSelected ? '#f0f0f0' : 'rgba(236, 113, 141, 0.3);'
              }">
          <p><strong>Slobodan od:</strong> {{dateFreeFrom | date}}</p>
          <p><strong>Slobodan do:</strong> {{dateFreeTo | date}}</p>
          <p><strong>Crveni krst:</strong> {{redCross}}</p>
        </div>
        <button 
          class="add-button" 
          [ngStyle]="{ 'background-color': isSelected ? '#70c0c9' : '#F13662' }"
          (click)="toggleSelection()">
          {{ isSelected ? 'Opozovi' : 'Dodaj' }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.css'],
  imports: [CommonModule],
  providers: [DatePipe]  
})
export class CardComponent {
  @Input() volunteerFullName: string = '';
  @Input() dateFreeFrom: Date | null = null;
  @Input() dateFreeTo: Date | null = null;
  @Input() redCross: string = '';

  isSelected: boolean = false;

  toggleSelection(): void {
    this.isSelected = !this.isSelected;
  }
}
