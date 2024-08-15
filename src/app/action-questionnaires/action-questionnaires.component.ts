import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { DonorsService } from '../services/donor/donors.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireComponent } from "../questionnaire/questionnaire.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-action-questionnaires',
  standalone: true,
  imports: [HeaderComponent, QuestionnaireComponent, CommonModule],
  template: `
    <app-header [title]="'Davaoci koji su popunili upitnik'"></app-header>
    <div class="quest-content">
      <app-questionnaire 
        *ngFor="let donor of presentDonors" 
        [donor]="donor">
      </app-questionnaire>
    </div>
  `,
  styleUrl: './action-questionnaires.component.css'
})
export class ActionQuestionnairesComponent {
presentDonors: any[] = [];

constructor(private donorService: DonorsService, private route: ActivatedRoute){}

ngOnInit() {
  const actionID = Number(this.route.snapshot.paramMap.get('actionID'));

  this.donorService.getPresentActionDonors(actionID)
  .subscribe({
    next: (res) => {
      console.log(res);
      this.presentDonors = res;
    },
    error: (err) => console.log(err)
  });

}
}
