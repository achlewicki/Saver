import { AccountResolverService } from './../../services/resolvers/account-resolver/account-resolver.service';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { AccountsComponent } from './accounts/accounts/accounts.component';
import { OperationsViewComponent } from './operations/operations-view/operations-view.component';
import { MainPageCoreComponent } from './_main-page-core/main-page-core.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from '#modules/main-page/categories/categories/categories.component';
import {EditCategoryComponent} from '#modules/main-page/categories/categories/edit-category/edit-category.component';
import {UserSettingsComponent} from '#modules/main-page/user-settings/user-settings/user-settings.component';
import {AchievementsViewComponent} from '#modules/main-page/achievements/achievements-view/achievements-view.component';
import {EditCategoryComponent} from '#modules/main-page/categories/edit-category/edit-category.component';
import {RaportViewComponent} from '#modules/main-page/raport/raport-view/raport-view.component';


const routes: Routes = [
  {
    path: '',
    component: MainPageCoreComponent,
    resolve: {
      account: AccountResolverService
    },
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { viewname: 'dashboard' }
      },
      {
        path: 'operations',
        component: OperationsViewComponent,
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
      },
      {
        path: 'categories/edit-category/:id',
        component: EditCategoryComponent,
        data: { viewname: 'edit-category'}
      },
      {
        path: 'achievements',
        component: AchievementsViewComponent,
        data: { viewname: 'achievements'}
      },
      {
        path: 'raports',
        component: RaportViewComponent,
        data: { viewname: 'raports'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
