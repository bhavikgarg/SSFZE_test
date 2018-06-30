import { NgModule } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';

const appRoutes: Route [] = [
    { path: '',  }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}