import { Component, OnInit } from '@angular/core';
import { TransfusionAction } from '../../types';
import { CommonModule } from '@angular/common';
import { ActionsService } from '../services/transfusion_action/actions.service';
import { AuthService } from '../services/auth/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <app-sidebar></app-sidebar>   
    <button (click)="logoutt()">Logout</button>
    <div *ngIf="actions">
      <p *ngFor="let action of actions">
        {{ action.actionName }}
      </p>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  actions: TransfusionAction[] | undefined;

  constructor(private actionService: ActionsService, private authService: AuthService) { }


  logoutt(): void{
    this.authService.logout();
  }

  ngOnInit(): void {
    this.actionService.getActions('/itk/actions', { pageNumber: 1, pageSize: 10 })
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
}
