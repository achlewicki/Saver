import { AuthGuard } from './services/_helpers/guards/auth/auth.guard';
import { PageNotFoundComponent } from '#shared/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'main',
    redirectTo: 'app'
  },
  {
    path: 'app',
    loadChildren: () => import('#modules/main-page/main-page.module').then(module => module.MainPageModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'first-login',
    loadChildren: () => import('#modules/first-login/first-login.module').then(module => module.FirstLoginModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('#modules/landing-page/landing-page.module').then(module => module.LandingPageModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
