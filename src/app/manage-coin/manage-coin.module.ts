import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore';
import { ManageCoinRoutingModule } from './manage-coin-routing.module'
import { ManageCoinComponent } from './manage-coin.component'
import { ManageCoinService } from './manage-coin.service'

import { AuthService } from '../auth/services/auth.service'

@NgModule({
    declarations : [ManageCoinComponent],
    imports : [
    	CommonModule,
    	FormsModule,
        ReactiveFormsModule,
        ManageCoinRoutingModule
    ],
    providers : [
        AngularFirestore,
        ManageCoinService,
        // AuthService
    ],
    bootstrap : []
})
export class ManageCoinModule {}