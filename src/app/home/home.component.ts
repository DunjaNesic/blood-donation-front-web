import { Component, OnInit } from '@angular/core';
import { Place, TransfusionAction } from '../../types';
import { CommonModule } from '@angular/common';
import { ActionsService } from '../services/transfusion_action/actions.service';
import { AuthService } from '../services/auth/auth.service';
import { HeaderComponent } from './../header/header.component';
import { ChartComponent } from "../chart/chart.component";
import { PlacesService } from '../services/place/places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ChartComponent],
  template: `
    <app-header [title]="'Pregled akcija'"></app-header>
    <div class="filters">
    <select>
      <option value="" disabled selected>Grad</option>
      <option *ngFor="let place of places" [value]="place.placeName">{{ place.placeName }}</option>
    </select>
      <input type="text" placeholder="Pretraži...">
    </div>
    <div *ngIf="actions">
      <div *ngFor="let action of actions" class="action-item">
      <button class="details-btn" (click)="goToDetails(action.actionID)">Detalji</button>
      <span class="action-name">{{ action.actionName }}</span>
        <span class="action-date">{{ action.actionDate }}</span>
        <span class="action-time">{{ action.actionTimeFromTo }}</span>
        <span class="action-location">{{ action.placeName }}</span>
        <span class="action-address">{{ action.exactLocation }}</span>
      </div>
    </div>

    <div class="stats-container">
      <div class="graph">
        <app-chart></app-chart>
      </div>
      <div class="stats">
        <div class="stat-item">     
          <div class="item">
          <h2>Broj aktivnih davalaca krvi</h2>
          <span class="stat-number">142 113</span>
          <span class="stat-year">Stanje 2024. <br> godine</span>
          </div>
          <div class="item">
          <h2>Broj aktivnih volontera crvenog krsta</h2>
          <span class="stat-number">1337</span>
          <span class="stat-year">Stanje 2024. <br> godine</span>
        </div>
        </div>

       
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  actions: TransfusionAction[] | undefined;
  places: Place[] = []; 

  constructor(private router: Router, private actionService: ActionsService, private authService: AuthService, private placeService: PlacesService) { }

  goToDetails(actionID: number): void {
    this.router.navigate([`/details/${actionID}`]);
  }

  ngOnInit(): void {

    this.placeService.getAll('/itk/places')
    .subscribe({
      next: (place) => {
        this.places = place;
        console.log(place);
      },
      error: (error) => {
        console.error('Error fetching places:', error);
      }
    });

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
