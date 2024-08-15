import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-questionnaire-update',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header [title]="'Upitnik izabranog davaoca'"></app-header>
    <div class="update-content">
      <div class="questionnaire-container">
        <div class="question-header">
          <p class="question-number">Pitanje 1/20</p>
          <p class="question-title">Lorem ipsum dolor sit amet?</p>
        </div>
        <div class="question-body">
          <label class="option">
            <input type="radio" name="question1" value="Da">
            <span class="option-text">Da</span>
          </label>
          <label class="option">
            <input type="radio" name="question1" value="Ne">
            <span class="option-text">Ne</span>
          </label>
        </div>
      </div>
      <div class="questionnaire-container">
        <div class="question-header">
          <p class="question-number">Pitanje 1/20</p>
          <p class="question-title">Lorem ipsum dolor sit amet?</p>
        </div>
        <div class="question-body">
          <label class="option">
            <input type="radio" name="question1" value="Da">
            <span class="option-text">Da</span>
          </label>
          <label class="option">
            <input type="radio" name="question1" value="Ne">
            <span class="option-text">Ne</span>
          </label>
        </div>
      </div>
      <div class="questionnaire-container">
        <div class="question-header">
          <p class="question-number">Pitanje 1/20</p>
          <p class="question-title">Lorem ipsum dolor sit amet?</p>
        </div>
        <div class="question-body">
          <label class="option">
            <input type="radio" name="question1" value="Da">
            <span class="option-text">Da</span>
          </label>
          <label class="option">
            <input type="radio" name="question1" value="Ne">
            <span class="option-text">Ne</span>
          </label>
        </div>
      </div>
      <div class="questionnaire-container">
        <div class="question-header">
          <p class="question-number">Pitanje 1/20</p>
          <p class="question-title">Lorem ipsum dolor sit amet?</p>
        </div>
        <div class="question-body">
          <label class="option">
            <input type="radio" name="question1" value="Da">
            <span class="option-text">Da</span>
          </label>
          <label class="option">
            <input type="radio" name="question1" value="Ne">
            <span class="option-text">Ne</span>
          </label>
        </div>
      </div>
      <div class="questionnaire-container">
        <div class="question-header">
          <p class="question-number">Pitanje 1/20</p>
          <p class="question-title">Lorem ipsum dolor sit amet?</p>
        </div>
        <div class="question-body">
          <label class="option">
            <input type="radio" name="question1" value="Da">
            <span class="option-text">Da</span>
          </label>
          <label class="option">
            <input type="radio" name="question1" value="Ne">
            <span class="option-text">Ne</span>
          </label>
        </div>
      </div>
      <div class="questionnaire-container">
        <div class="question-header">
          <p class="question-number">Pitanje 1/20</p>
          <p class="question-title">Lorem ipsum dolor sit amet?</p>
        </div>
        <div class="question-body">
          <label class="option">
            <input type="radio" name="question1" value="Da">
            <span class="option-text">Da</span>
          </label>
          <label class="option">
            <input type="radio" name="question1" value="Ne">
            <span class="option-text">Ne</span>
          </label>
        </div>
      </div>
    </div>
    <button class="submit-button">Završi</button>
  `,
  styleUrls: ['./questionnaire-update.component.css']
})
export class QuestionnaireUpdateComponent {}
