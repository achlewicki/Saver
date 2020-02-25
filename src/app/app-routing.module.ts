import { AuthGuard } from './guards/auth/auth.guard';
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
    loadChildren: () => import('#modules/main-page/main-page.module').then(module => module.MainPageModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard]
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
