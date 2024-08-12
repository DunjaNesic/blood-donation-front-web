import { Component, Input } from '@angular/core';
import { Official } from '../../types';

@Component({
  selector: 'app-official-card',
  standalone: true,
  template: `
    <div class="card">
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
}
