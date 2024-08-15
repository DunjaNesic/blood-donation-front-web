import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { AppLayoutComponent } from './layout/layout.component';
import { ActionCreationComponent } from './action-creation/action-creation.component';
import { FinishedActionsComponent } from './finished-actions/finished-actions.component';
import { ActionStatisticsComponent } from './action-statistics/action-statistics.component';
import { ActionDetailsComponent } from './action-details/action-details.component';
import { ActionQuestionnairesComponent } from './action-questionnaires/action-questionnaires.component'; // Import the new component
import { QuestionnaireUpdateComponent } from './questionnaire-update/questionnaire-update.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',  
    component: AppLayoutComponent,
    canActivate: [authGuard],  
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'creating',
        component: ActionCreationComponent
      },
      {
        path: 'finished',
        component: FinishedActionsComponent
      },
      {
        path: 'finished/:actionID',
        component: ActionStatisticsComponent
      },
      {
        path: 'details/:actionID',
        component: ActionDetailsComponent,     
      },
      {
        path: 'details/:actionID/questionnaires', 
        component: ActionQuestionnairesComponent
      },
      {
        path: 'details/:actionID/questionnaires/:jmbg', 
        component: QuestionnaireUpdateComponent
      }
    ]
  }
];
