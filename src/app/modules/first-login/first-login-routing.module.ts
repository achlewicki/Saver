import { FirstLoginCoreComponent } from './first-login-core/first-login-core.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: FirstLoginCoreComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FirstLoginRoutingModule { }
