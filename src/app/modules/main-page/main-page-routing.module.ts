import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccountsComponent } from './accounts/accounts.component';
import { OperationsComponent } from './operations/operations.component';
import { MainPageCoreComponent } from './_main-page-core/main-page-core.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: MainPageCoreComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { viewname: 'dashboard' }
      },
      {
        path: 'operations',
        component: OperationsComponent,
        data: { viewname: 'operations' }
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        data: { viewname: 'accounts' }
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: { viewname: 'profile' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
