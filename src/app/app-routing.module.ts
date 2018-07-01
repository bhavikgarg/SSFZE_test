import { NgModule } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';

const appRoutes: Route [] = [
  { path: '', redirectTo : 'auth', pathMatch : 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  // { path: 'dashboard', component: ,  canActivate: [AuthGuard]  },
  // { path: 'update', component: ,  canActivate: [AuthGuard]  },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}