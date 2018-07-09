import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, SignupComponent } from './index';

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
        AngularFirestore
    ],
    bootstrap : []
})
export class AuthModule {}