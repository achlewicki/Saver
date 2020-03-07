import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { AccountsComponent } from './accounts/accounts/accounts.component';
import { OperationsComponent } from './operations/operations/operations.component';
import { MainPageCoreComponent } from './_main-page-core/main-page-core.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from '#modules/main-page/categories/categories/categories.component';
import {EditCategoryComponent} from '#modules/main-page/categories/edit-category/edit-category.component';


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
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        data: { viewname: 'categories' },
        children: [
          {
            path: 'edit-category',
            component: EditCategoryComponent,
            data: { viewname: 'edit-category' }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
