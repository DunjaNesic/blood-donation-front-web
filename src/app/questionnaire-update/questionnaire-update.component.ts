import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { QuestionnaireService } from '../services/questionnaire/questionnaire.service';
import { Question, Questionnaire } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-questionnaire-update',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  template: `
   <app-header [title]="'Upitnik izabranog davaoca'"></app-header>
<div class="update-content">
  <div class="questionnaire-container" *ngIf="questions.length > 0 && donorAnswers">
    <div *ngFor="let question of questions; let i = index" class="question-container">
      <div class="question-header">
        <p class="question-number">Pitanje {{ i + 1 }}/{{ questions.length }}</p>
        <p class="question-title">{{ question.questionText }}</p>
      </div>
      <div class="question-body">
        <label 
          class="option" 
          *ngFor="let option of [true, false]"
          [class.selected]="isAnswerSelected(question.questionID, option)"
        >
          <input
            type="radio" 
            [name]="'question' + question.questionID" 
            [value]="option"
            [disabled]="isDonorAnswer(question.questionID)"
            [(ngModel)]="questionAnswers[question.questionID]"
            (change)="updateAnswer(question.questionID, option)"/>
          <span 
            class="option-text" 
            [style.background-color]="getOptionColor(question.questionID, option)"
          >
            {{ option ? 'Da' : 'Ne' }}
          </span>
        </label>
      </div>
    </div>
  </div>
  <div class="remark-container">
    <p>Vaše mišljenje o opštem zdravstvenom stanju davaoca: </p>
    <input type="text" [(ngModel)]="allAnswers.remark" />
  </div>
  <div class="approved-container">
    <p>Da li je davalac u stanju da donira krv?</p>
    <div class="question-body">
      <label 
        class="option" 
        *ngFor="let option of [true, false]"
        [class.selected]="isAnswerSelected('approved', option)"
      >
        <input 
          type="radio" 
          name="approved"
          [value]="option"
          [(ngModel)]="allAnswers.approved" 
        /> 
        <span class="option-text">
          {{ option ? 'Da' : 'Ne' }}
        </span>
      </label>
    </div>
  </div>
</div>
<button class="submit-button" (click)="submitAnswers()">Završi</button>

  `,
  styleUrls: ['./questionnaire-update.component.css']
})
export class QuestionnaireUpdateComponent implements OnInit {

  questions: Question[] = [];
  donorAnswers: Questionnaire | undefined;
  allAnswers: Questionnaire = { 
    answeredQuestions: [], 
    remark: '', 
    approved: false,
    questionnaireTitle: 'Upitnik' 
  };
  questionAnswers: { [key: number]: boolean } = {};
  jmbg: string = '';
  actionID: number = 0;

  constructor(private questionnaireService: QuestionnaireService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}

  submitAnswers(): void {
    if (this.allAnswers) {
      const updateBody = {
        remark: this.allAnswers.remark,
        answers: this.allAnswers.answeredQuestions.map(answer => answer.answer),
        approved: this.allAnswers.approved,
        rowVersion: "AAAAAAAAFG0="
      };

      this.questionnaireService.updateQuestionnaire(this.jmbg, this.actionID, updateBody).subscribe({
        next: (response) => {
          console.log('Update successful', response);
          this.dialog.open(SuccessDialogComponent, {
            data: {
              title: 'Uspesno',
              message: `Upitnik je uspesno popunjen i generisan je QR kod. QR kod mozete downloadovati na sledecem linku: https://localhost:7062/qrcodes/${this.jmbg}_${this.actionID}.pdf`
            }
          }).afterClosed().subscribe(() => {
            this.router.navigate(['/details', this.actionID, 'questionnaires']);
          });

        },
        error: (error) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message: 'Došlo je do greške pri popunjavanju upitnika',
            },
            width: '25rem'
          });
          console.error('Error creating action:', error);
        }
      });

    } else {
      console.error('Missing answers or approval status');
    }
  }

  updateAnswer(questionID: number, option: boolean): void {
    const existingAnswer = this.allAnswers.answeredQuestions.find(q => q.questionID === questionID);
    if (existingAnswer) {
      existingAnswer.answer = option;
    } else {
      this.allAnswers.answeredQuestions.push({
        questionID,
        answer: option
      });
    }
  }

  isDonorAnswer(questionID: number): boolean {
    return !!this.donorAnswers?.answeredQuestions.find(q => q.questionID === questionID);
  }

  isAnswerSelected(questionID: number | string, option: boolean): boolean {
    if (questionID === 'approved') {
      return this.allAnswers.approved === option;
    }
  
    const answer = this.allAnswers.answeredQuestions.find(q => q.questionID === questionID);
    return answer ? answer.answer === option : false;
  }  

  getOptionColor(questionID: number, option: boolean): string {

    const donorAnswer = this.donorAnswers?.answeredQuestions.find(q => q.questionID === questionID);
    if (!donorAnswer) return 'inherit';  
  
    if (option === true && donorAnswer.answer) return '#ECA9B4';  
    if (option === false && !donorAnswer.answer) return '#a9e5ec';  
    return 'inherit';  
  }
  

  ngOnInit(): void {
  this.actionID = Number(this.route.snapshot.paramMap.get('actionID'));
  this.jmbg = String(this.route.snapshot.paramMap.get('jmbg'));

    this.loadQuestions();
    this.loadDonorAnswers(this.jmbg, this.actionID); 
  }

  loadQuestions(): void {
    this.questionnaireService.getAllQuestions().subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (err) => console.error('Error fetching questions:', err)
    });
  }

  loadDonorAnswers(jmbg: string, actionID: number): void {
    this.questionnaireService.getDonorsAnswers(jmbg, actionID).subscribe({
      next: (data) => {
        this.donorAnswers = data;

        const approvedAsBoolean = typeof data.approved === 'string' 
            ? (data.approved as string).toLowerCase() === 'da'
            : !!data.approved;

        this.allAnswers = {
          answeredQuestions: [...(data.answeredQuestions || [])],
          remark: data.remark || '',
          approved: approvedAsBoolean,
          questionnaireTitle: data.questionnaireTitle || '' 
        };

        this.questionAnswers = data.answeredQuestions.reduce((acc, curr) => {
          acc[curr.questionID] = curr.answer;
          return acc;
        }, {} as { [key: number]: boolean });

        console.log(data);
      },
      error: (err) => console.error('Error fetching donor answers:', err)
    });
  }
}
