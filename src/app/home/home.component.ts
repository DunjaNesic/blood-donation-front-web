import { Component, OnInit } from '@angular/core';
import { Place, TransfusionAction } from '../../types';
import { CommonModule } from '@angular/common';
import { ActionsService } from '../services/transfusion_action/actions.service';
import { AuthService } from '../services/auth/auth.service';
import { HeaderComponent } from './../header/header.component';
import { ChartComponent } from "../chart/chart.component";
import { PlacesService } from '../services/place/places.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ScrollService } from '../services/scroll/scroll.service';
import { DonorsService } from '../services/donor/donors.service';
import { VolunteersService } from '../services/volunteer/volunteers.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ChartComponent, ReactiveFormsModule],
  template: `
    <app-header [title]="'Pregled akcija'"></app-header>
    <div class="filters">
    <select [formControl]="placeControl">
        <option value="0" selected>Svi gradovi</option> 
        <option *ngFor="let place of places" [value]="place.placeID">{{ place.placeName }}</option>
      </select>
    <input [formControl]="searchControl" type="text" placeholder="Pretraži...">
    </div>
    <div class="smth" *ngIf="actions">
      <div *ngFor="let action of actions" class="action-item">
      <button class="details-btn" (click)="goToDetails(action.actionID)">Detalji</button>
        <span class="action-name">{{ action.actionName }}</span>
        <span class="action-date">{{ action.actionDate | date: 'dd. MM. yyyy.' }}</span>
        <span class="action-time">{{ action.actionTimeFromTo }}</span>
        <span class="action-location">{{ action.placeName }}</span>
        <span class="action-address">{{ action.exactLocation }}</span>
      </div>
    </div>

    <div class="stats-container">
      <!-- <div class="graph">
        <app-chart></app-chart>
      </div> -->
      <div class="stats">
        <div class="stat-item">     
          <div class="item">
          <h2>Broj aktivnih davalaca krvi</h2>
          <span class="stat-number">{{donorCount}}</span>
          <span class="stat-year">Stanje 2024. <br> godine</span>
          </div>
          <div class="item">
          <h2>Broj aktivnih volontera crvenog krsta</h2>
          <span class="stat-number">{{volunteerCount}}</span>
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
  searchControl = new FormControl('');
  placeControl = new FormControl('0');
  donorCount: number = 0;
  volunteerCount: number = 0;

  constructor(private router: Router, private actionService: ActionsService, private authService: AuthService, private placeService: PlacesService, private scrollService: ScrollService, private donorService: DonorsService, private volunteerService: VolunteersService) { }

  goToDetails(actionID: number): void {
    this.router.navigate([`/details/${actionID}`]);
  }

  ngOnInit(): void {
    
    this.scrollService.scrollToTop();

    this.placeService.getAll('/itk/places')
      .subscribe({
        next: (places) => {
          this.places = places;
        },
        error: (error) => {
          console.error('Error fetching places:', error);
        }
      });

      this.searchControl.valueChanges.subscribe((searchTerm) => {
        this.getActions(searchTerm ?? '', 0);
      });

      this.placeControl.valueChanges.subscribe(() => {
        const placeValue = this.placeControl.value;
        const placeID = placeValue !== null ? +placeValue : 0; 
        this.getActions(this.searchControl.value || '', placeID);
      });
      

    this.getActions('', 0);
    this.getDonorCount();
    this.getVolunteerCount();
  }

  private getActions(searchTerm: string, placeID: number): void {
    this.actionService.getActions('/itk/actions', { pageNumber: 1, pageSize: 10, search: searchTerm, placeID: placeID})
      .subscribe({
        next: (actions) => {
          this.actions = actions;
        },
        error: (error) => {
          console.error('Error fetching actions:', error);
        }
      });
  }

  private getDonorCount(): void {
    this.donorService.getDonors('/itk/donors')
      .subscribe({
        next: (donors) => {
          this.donorCount = donors.length;
        },
        error: (error) => {
          console.error('Error fetching donors:', error);
        }
      });
  }

  private getVolunteerCount(): void {
    this.volunteerService.getVolunteers('/itk/volunteers')
      .subscribe({
        next: (volunteers) => {
          this.volunteerCount = volunteers.length;
        },
        error: (error) => {
          console.error('Error fetching volunteers:', error);
        }
      });

 }
}