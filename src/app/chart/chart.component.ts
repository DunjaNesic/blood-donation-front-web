import { Component } from '@angular/core';
import { ChartOptions, ChartDataset, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective], 
  template: `
    <div style="display: block;">
      <canvas baseChart
              [datasets]="lineChartData"
              [labels]="lineChartLabels"
              [options]="lineChartOptions"
              [legend]="lineChartLegend"
              >
      </canvas>
    </div>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  public lineChartData: ChartDataset[] = [
    {
      data: [20, 25, 22, 27, 25, 30],
      label: 'Ciljani broj jedinica',
      fill: false,
      borderColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 8,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4,
    },
    {
      data: [15, 30, 20, 40, 20, 35],
      label: 'Ostvareni broj jedinica',
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 8,
      backgroundColor: 'rgba(255, 99, 132, 1)',
      tension: 0.4,
    }
  ];

  public lineChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun'];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(0, 0, 0, 0.5)',
        }
      }
    }
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
}
