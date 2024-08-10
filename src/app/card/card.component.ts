import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header">
        <span>{{volunteerFullName}}</span>
      </div>
      <div class="card-body"> 
        <div class="drop-area">
        <p><strong>Date Free From:</strong> {{dateFreeFrom | date}}</p>
        <p><strong>Date Free To:</strong> {{dateFreeTo | date}}</p>
        <p><strong>Red Cross:</strong> {{redCross}}</p>
        </div>
        <button class="add-button">Dodaj</button>
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
}
