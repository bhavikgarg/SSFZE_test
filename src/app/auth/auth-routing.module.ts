import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, SignupComponent } from './index';

const routes: Routes = [
    { path: '', redirectTo : 'login', pathMatch : 'full' },
    { path: 'login', component : LoginComponent },
    { path: 'signup', component : SignupComponent },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class AuthRoutingModule {}
