import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Question, Questionnaire } from '../../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private apiService: ApiService) { }


  getAllQuestions = (): Observable<Question[]> => {
    return this.apiService.get<Question[]>('/itk/questions', 
      {
        responseType: 'json'
      }
    );       
  }

  getDonorsAnswers(jmbg: string, actionID: number): Observable<Questionnaire> {
    return this.apiService.get<Questionnaire>(`/itk/donors/${jmbg}/questionnaires/${actionID}`, 
      {
        responseType: 'json'
      }
    );
  }

  updateQuestionnaire(jmbg: string, actionID: number, body: any): Observable<any> {
    return this.apiService.put<any>(`/itk/donors/${jmbg}/questionnaires/${actionID}`, body);
  }

}  
