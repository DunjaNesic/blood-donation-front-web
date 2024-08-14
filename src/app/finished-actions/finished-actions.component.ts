import { Component } from '@angular/core';
import { HeaderComponent } from './../header/header.component';
import { CommonModule} from '@angular/common';
import { TransfusionAction } from '../../types';
import { ActionsService } from '../services/transfusion_action/actions.service';
import { Router } from '@angular/router';
import { ScrollService } from '../services/scroll/scroll.service';

@Component({
  selector: 'app-finished-actions',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  template: `
 <app-header [title]="'Završene akcije'"></app-header>

<div class="actions-container">
  <div class="actions-table">
    <div class="table-header">
      <span>Naziv akcije</span>
      <span>Grad</span>
      <span>Lokacija</span>
      <span>Vreme</span>
      <span></span>
    </div>
    <div class="table-row" *ngFor="let action of actions">
      <div class="table-cell">{{ action.actionName }}</div>
      <div class="table-cell">{{ action.placeName }}</div>
      <div class="table-cell">{{ action.exactLocation }}</div>
      <div class="table-cell">{{ action.actionTimeFromTo }}</div>
      <div class="table-cell">
      <button class="stats-button" (click)="viewStats(action.actionID)">Stats</button>
      </div>
    </div>
  </div>
</div>

  `,
  styleUrl: './finished-actions.component.css'
})

export class FinishedActionsComponent {
  actions: TransfusionAction[] | undefined;

  constructor(private actionService: ActionsService, private router: Router, private scrollService: ScrollService) { }

  ngOnInit(): void {

    this.scrollService.scrollToTop();

    const today = new Date().toISOString().split('T')[0];

    this.actionService.getActions('/itk/actions', { pageNumber: 1, pageSize: 42, minDate: '2000-06-08', maxDate: today})
      .subscribe({
        next: (actions) => {
          this.actions = actions;
          console.log(actions);
        },
        error: (error) => {
          console.error('Error fetching actions:', error);
        }
      });
  }
  
  viewStats(actionID: number): void {
    this.router.navigate(['/finished', actionID]); 
  }
}