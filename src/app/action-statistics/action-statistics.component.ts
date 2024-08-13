import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-action-statistics',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
<app-header [title]="'Statistike za izabranu akciju'"></app-header>

<div class="statistics-container">
  <div class="summary-cards">
    <div class="card">
      <div class="wrapper">
        <h3>Broj zaposlenih:</h3>
        <img class="icon" src="official.svg" alt="officials-icon">
      </div>
      <p>{{ stats?.numberOfAssignedOfficials }}</p>
    </div>
    <div class="card">
      <div class="wrapper">
        <h3>Broj volontera:</h3>
        <img class="icon" src="vol-icon.png" alt="officials-icon">
      </div>
      <p>{{ stats?.numberOfVolunteers }}</p>
    </div>
    <div class="card">
      <div class="wrapper">
        <h3>Prikupljenih jedinica:</h3>
        <img class="icon" src="donor-icon.png" alt="officials-icon">
      </div>
      <p>{{ stats?.numberOfDonors}}</p>
    </div>
  </div>

  <div class="charts">
    <div class="chart">
      <h3>Pol davaoca</h3>
      <canvas id="genderChart"></canvas>
    </div>
    <div class="chart">
      <h3>Ponovljena davanja</h3>
      <canvas id="repeatDonationsChart"></canvas>
    </div>
  </div>

  <div class="time-intervals">
    <h3>Broj davaoca po vremenskim intervalima</h3>
    <canvas id="timeIntervalsChart"></canvas>
  </div>
</div>
  `,
  styleUrls: ['./action-statistics.component.css'],
})

export class ActionStatisticsComponent implements OnInit {
  stats: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const actionID = params.get('actionID');
      if (actionID) {
        this.fetchActionStats(actionID);
      }
    });
  }

processTimeIntervals(timeIntervals: string[]): { labels: string[], data: number[] } {
  const hoursCount = new Array(24).fill(0); 

  timeIntervals.forEach(dateString => {
    const date = new Date(dateString);
    const hour = date.getHours();
    hoursCount[hour]++;
  });

  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  return { labels, data: hoursCount };
}


  fetchActionStats(actionID: string): void {
    this.http.get(`https://localhost:7062/itk/actions/stats/${actionID}`)
      .subscribe((data: any) => {
        this.stats = data;
        console.log('Fetched stats:', this.stats); 
        this.initializeCharts();
      }, (error) => {
        console.error('Error fetching stats:', error); 
      });
  }

  initializeCharts(): void {
    console.log('Time Intervals Data:', this.stats?.timeIntervals);
  
    const { labels, data } = this.processTimeIntervals(this.stats?.timeIntervals || []);
  
    new Chart("genderChart", {
      type: 'doughnut',
      data: {
        labels: ['Žene', 'Muškarci'],
        datasets: [{
          data: [this.stats?.femaleDonors, this.stats?.maleDonors],
          backgroundColor: ['#FF6384', '#FF6A64'],
          borderColor: '#FFFFFF',
          borderWidth: 2,
          borderRadius: 5,
          hoverOffset: 10,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14,  
                family: 'Lexend, sans-serif', 
              }
            }
          },
          tooltip: {
            backgroundColor: '#f5f5f5',
            titleColor: '#333',
            bodyColor: '#666',
            borderWidth: 1,
            borderColor: '#ccc',
          },
        }
      }
    });
  
    new Chart("repeatDonationsChart", {
      type: 'doughnut', 
      data: {
        labels: ['Novi', 'Stari'],
        datasets: [{
          data: [this.stats?.newDonors, this.stats?.oldDonors],
          backgroundColor: ['#FF6A64', '#909090'],  
          borderColor: '#FFFFFF',
          borderWidth: 2,
          hoverOffset: 15,  
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',  
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true, 
              font: {
                size: 14,  
                family: 'Lexend, sans-serif', 
              }
            }
          },
          tooltip: {
            backgroundColor: '#f5f5f5',
            titleColor: '#333',
            bodyColor: '#666',
            borderWidth: 1,
            borderColor: '#ccc',
          },
        },
        animation: {
          animateRotate: true,  
          animateScale: true   
        }
      }
    });
    
  
    new Chart("timeIntervalsChart", {
      type: 'bar',
      data: {
        labels: labels, 
        datasets: [{
          label: 'Broj davaoca',
          data: data, 
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          borderWidth: 1,
          borderRadius: 10,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Vremenski intervali'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Broj davaoca'
            }
          }
        }
      }
    });
  }
  
}
