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
        <p><strong>Slobodan od:</strong> {{dateFreeFrom | date}}</p>
        <p><strong>Slobodan do:</strong> {{dateFreeTo | date}}</p>
        <p><strong>Crveni krst:</strong> {{redCross}}</p>
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
