import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { AppLayoutComponent } from './layout/layout.component';
import { ActionCreationComponent } from './action-creation/action-creation.component';
import { FinishedActionsComponent } from './finished-actions/finished-actions.component';

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
        }
      ]
    }
  ];
