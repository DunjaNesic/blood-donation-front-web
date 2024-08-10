import { Component } from '@angular/core';
import { HeaderComponent } from './../header/header.component';


@Component({
  selector: 'app-action-creation',
  standalone: true,
  imports: [HeaderComponent],
  template: `
<app-header [title]="'Kreiranje akcije'"></app-header>
    <p>
      action-creation works!
    </p>
  `,
  styleUrl: './action-creation.component.css'
})
export class ActionCreationComponent {

}
