import { Component } from '@angular/core';
import { HeaderComponent } from './../header/header.component';

@Component({
  selector: 'app-finished-actions',
  standalone: true,
  imports: [HeaderComponent],
  template: `
  <app-header [title]="'Završene akcije'"></app-header>
    <p>
      finished-actions works!
    </p>
  `,
  styleUrl: './finished-actions.component.css'
})
export class FinishedActionsComponent {

}
