import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  template: `
    <div class="input-field">
      <label>{{ label }}</label>
      <input 
        [placeholder]="placeholder" 
        (input)="onInput($event)" 
        [value]="value"/>
      <small [innerHTML]="helperText"></small>
    </div>
  `,
  styleUrls: ['./input-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label: string = ''; 
  @Input() placeholder: string = ''; 
  @Input() helperText: string = ''; 

  value: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    console.log('writeValue called with:', value);
    this.value = value || '';
  }
  
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
    console.log('onInput called with:', this.value);
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle disabled state
  }
}
