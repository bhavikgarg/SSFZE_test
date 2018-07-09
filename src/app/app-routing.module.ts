import { NgModule } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/authGuard.service';


const appRoutes: Route [] = [
  { path: '', redirectTo : 'auth', pathMatch : 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'manage-coin', loadChildren: './manage-coin/manage-coin.module#ManageCoinModule', canActivate: [AuthGuard] },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}