import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  template: `
    <div class="input-field">
      <label>{{label}}</label>
      <input [placeholder]="placeholder" />
      <small [innerHTML]="helperText"></small>
    </div>
  `,
   styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() helperText: string = '';
}
