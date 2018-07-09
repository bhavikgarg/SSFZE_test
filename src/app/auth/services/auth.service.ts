import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { User } from './modals/user.modal';

import { BehaviorSubject, Observable, of, empty } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AuthService {

	isLoggedIn : BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  	user$: Observable<User>;
  	transactions$: Observable<any>;
  	currentUser: any;

	authState: any = null;

	constructor(
		public afAuth: AngularFireAuth,
      	private afs: AngularFirestore,
      	private router: Router) {

		this.user$ = this.afAuth.authState.pipe(switchMap(user => {
				if (user) {
			    	return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
			  	} else {
			    	return empty();
			  	}
			})
		)

		this.transactions$ = this.afAuth.authState.pipe(switchMap(user => {
				if (user) {
			    	return this.afs.doc<User>(`transaction/${user.uid}`).valueChanges()
			  	} else {
			    	return new Observable(null)
			  	}
			})
		)
	}
	signOut() {
		localStorage.clear();
	  	this.afAuth.auth.signOut().then(() => {
	    	this.router.navigate(['/']);
	  	});
	}

	updateUserData(user: User) {
	    // Sets user data to firestore
	    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
	    const data: User = {
		    uid: user.uid,
	    	email: user.email,
	      	role : {
	      		user: true
	      	},
	      	displayName:user.displayName 
	    }
	    return userRef.set(data, { merge: true })
	}

	createTransactionCollectionForUser(user: User, coinData={}) {
	    const transactionRef: AngularFirestoreDocument<any> = this.afs.doc(`transaction/${user.uid}`);
	    return transactionRef.set(coinData, { merge: true })
	}

    userRegisterWithEmail(data) {
    	return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
  	}

 
  	loginWithEmail(data) {
    	return this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
			.then((user) => {
				this.authState = user;
				return user;
			})
			.catch(error => {
				console.log(error)
				throw error
			});
	} 

	// 	resetPassword(email: string) {
	//     return this.afAuth.auth.sendPasswordResetEmail(email)
	//       .then(() => console.log('sent Password Reset Email!'))
	//       .catch((error) => console.log(error))
	// }
}
