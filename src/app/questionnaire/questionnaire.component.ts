import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [],
  providers: [DatePipe],
  template: `
<div class="questionnaire">
  <div class="question-item">
    <span class="checkbox-icon"></span>
    <p>JMBG: <span class="bold-text">{{donor.jmbg}}</span></p>
  </div>
  <div class="question-item">
    <span class="checkbox-icon"></span>
    <p>Ime i prezime: <span class="bold-text">{{donor.donorFullName}}</span></p>
  </div>
  <div class="question-item">
    <span class="checkbox-icon"></span>
    <p>Krvna grupa: <span class="bold-text">{{donor.bloodType}}</span></p>
  </div>
  <div class="question-item">
    <span class="checkbox-icon"></span>
    <p>Aktivan donor? <span class="bold-text">{{donor.isActive ? 'Da' : 'Ne'}}</span></p>
  </div>
  <div class="question-item">
    <span class="checkbox-icon"></span>
    <p>Datum poslednje akcije: <span class="bold-text">{{ formattedDate }}</span></p>
  </div>
  <button class="popuni-button" (click)="onButtonClick()">Popuni</button>
</div>
  `,
  styleUrl: './questionnaire.component.css'
})

export class QuestionnaireComponent {
  @Input() donor: any;

constructor(private router: Router, private route: ActivatedRoute){}

  get formattedDate(): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(this.donor.lastDonationDate, 'dd.MM.yyyy') || '';
  }

  onButtonClick() {
    const actionID = Number(this.route.snapshot.paramMap.get('actionID'));
    this.router.navigateByUrl(`/details/${actionID}/questionnaires/${this.donor.jmbg}`); 
  }
}
