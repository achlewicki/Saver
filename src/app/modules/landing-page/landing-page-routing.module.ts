import { LandingPageCoreComponent } from './_landing-page-core/landing-page-core.component';
import { RegisterWindowComponent } from '#modules/landing-page/register/register-window/register-window.component';
import { ContentComponent } from '#modules/landing-page/content/content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: LandingPageCoreComponent,
        children: [
            {
                path: '',
                component: ContentComponent
            },
            {
                path: 'register',
                component: RegisterWindowComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingPageRoutingModule { }
