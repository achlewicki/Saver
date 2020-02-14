import { PageNotFoundComponent } from '#shared/page-not-found/page-not-found.component';
import { RegisterWindowComponent } from '#modules/landing-page/register/register-window/register-window.component';
import { ContentComponent } from '#modules/landing-page/content/content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterWindowComponent
  },
  {
    path: 'main',
    loadChildren: () => import('#modules/main-page/main-page.module').then(m => m.MainPageModule)
  },
  {
    path: '',
    component: ContentComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
