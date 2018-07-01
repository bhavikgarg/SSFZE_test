import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, SignupComponent } from './index';
import { AuthService } from './services'

const components = [
    LoginComponent,
    SignupComponent
];

@NgModule({
    declarations : [...components],
    imports : [
    	AuthRoutingModule,
    	CommonModule,
    	FormsModule,
        ReactiveFormsModule
    ],
    providers : [
        AuthService
    ],
    bootstrap : []
})
export class AuthModule {}