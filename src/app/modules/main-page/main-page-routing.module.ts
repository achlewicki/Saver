import { AccountResolverService } from './../../services/resolvers/account-resolver/account-resolver.service';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { AccountsViewComponent } from '#modules/main-page/accounts/accounts-view/accounts-view.component';
import { OperationsViewComponent } from './operations/operations-view/operations-view.component';
import { MainPageCoreComponent } from './_main-page-core/main-page-core.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from '#modules/main-page/categories/categories/categories.component';
import { UserSettingsComponent } from '#modules/main-page/user-settings/user-settings/user-settings.component';
import { AchievementsViewComponent } from '#modules/main-page/achievements/achievements-view/achievements-view.component';
import { EditCategoryComponent } from '#modules/main-page/_dialogs/edit-category/edit-category.component';
import { ReportViewComponent } from '#modules/main-page/report/report-view/report-view.component';


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
        component: DashboardComponent
      },
      {
        path: 'operations',
        component: OperationsViewComponent
      },
      {
        path: 'accounts',
        component: AccountsViewComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'user-settings',
        component: UserSettingsComponent
      },
      {
        path: 'achievements',
        component: AchievementsViewComponent
      },
      {
        path: 'raports',
        component: ReportViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
