import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Official } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-official-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="card" 
      [ngClass]="{ 'selected': isSelected }" 
      (click)="toggleSelection()">
      <div class="icon-container">
        <img src="user-icon.png" alt="User Icon" class="user-icon">
      </div>
      <div class="official-name">
        {{ official?.officialFullName }}
      </div>
    </div>
  `,
  styleUrls: ['./official-card.component.css']
})
export class OfficialCardComponent {
  @Input() official: Official | null = null;
  @Input() isSelected: boolean = false; 
  @Output() selectOfficial = new EventEmitter<number>();

  toggleSelection(): void {
    this.isSelected = !this.isSelected;
    if (this.official) {
      this.selectOfficial.emit(this.official.officialID);
    }
  }
}
