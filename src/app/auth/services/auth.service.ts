import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { User } from './modals/user.modal';

import { BehaviorSubject, Observable, of } from 'rxjs';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/switchMap';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AuthService {

	// user: BehaviorSubject<User> = new BehaviorSubject(null);
	isLoggedIn : BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  	user$: Observable<User>;
  	currentUser: any;
  	// user: User;

  	// ngOnInit() {
  	//   this.auth.user$.subscribe(user => this.user = user)
  	// }
	// loggedIn = false;
	// isAdmin = false;

	authState: any = null;

	constructor(
		public afAuth: AngularFireAuth,
		// public db: AngularFireDatabase,
      	private afs: AngularFirestore,
      	private router: Router) {

		this.user$ = this.afAuth.authState.pipe(switchMap(user => {
				if (user) {
			    	return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
			  	} else {
			    	return new Observable(null)
			  	}
			})
		)
		// this.afAuth.authState
		// 	.pipe(switchMap(auth => {
		// 			if(auth){
		// 				return this.db.object('users/' + auth.uid);
		// 			} else{
		// 				return new Observable(null);
		// 			}
		// 		})
		// 	)
  //       .subscribe(user => {
  //         this.user.next(user)
  //       })

	    // this.afAuth.authState.subscribe((auth) => {
	    //   this.authState = auth
	    // });
	}

	  ///// Login/Signup //////

	googleLogin() {
	  const provider = new firebase.auth.GoogleAuthProvider()
	  return this.oAuthLogin(provider);
	}

	private oAuthLogin(provider) {
	  return this.afAuth.auth.signInWithPopup(provider)
	    .then((credential) => {
	    	console.log("credential : ", credential)
	      this.updateUserData(credential.user)
	    })
	}

	signOut() {
	  this.afAuth.auth.signOut().then(() => {
	      this.router.navigate(['/']);
	  });
	}

	updateUserData(user) {
	    // Sets user data to firestore on login
	    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
	    const data: User = {
		    uid: user.uid,
	    	email: user.email,
	      	role : {
	      		user: true
	      	},
	      	coinBalance : {
	      		...user.coinBalance
	      	}
	    }
	    return userRef.set(data, { merge: true })
	}


	///// Role-based Authorization //////

	canPurchase(user: User): boolean {
	  const allowed = ['admin', 'user']
	  return this.checkAuthorization(user, allowed)
	}

	canUpdate(user: User): boolean {
	  const allowed = ['admin']
	  return this.checkAuthorization(user, allowed)
	}

	// canDelete(user: User): boolean {
	//   const allowed = ['admin']
	//   return this.checkAuthorization(user, allowed)
	// }

	// determines if user has matching role
	private checkAuthorization(user: User, allowedRoles: string[]): boolean {
	  if (!user) return false
	  for (const role of allowedRoles) {
	    if ( user.role[role] ) {
	      return true
	    }
	  }
	  return false
	}



	// get currentUserId(): string {
	//     return (this.authState !== null) ? this.authState.uid : ''
	// }
	 
	// get currentUserName(): string {
	//     return this.authState['email']
	// }
	 
	// get currentUser(): any {
	//     return (this.authState !== null) ? this.authState : null;
	// }
	
	// get isUserLoggedIn(): boolean {
	//     return (this.authState !== null) ? true : false;
	// }


    userRegisterWithEmail(data) {
    	return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
  	}

 
  	loginWithEmail(data) {
    	return this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
			.then((user) => {
				this.authState = user;
				// save user id in cookie 

				// this.setCurrentUser(user.user);
				this.updateUserData(user.user);
				return user;
			})
			.catch(error => {
				console.log(error)
				throw error
			});
	} 

	// setCurrentUser(user){
	// 	console.log(user.uid)
	// 	let collection = this.afs.collection('users');
	// 	this.currentUser = collection.snapshotChanges().pipe(map(
	// 		changes => {
	// 			return changes.map(
	// 				a => {
	// 					if(a.payload.doc.id == user.uid){
	// 						const data = a.payload.doc.data();
	// 						data['id'] = a.payload.doc.id;
	// 						return data;
	// 					}
	// 			}).filter(
	// 				user => {
	// 					return user !== undefined;
	// 				})
	// 		})
	// 	)
	// }


	deleteCurrentUser(){
		this.currentUser.subscribe(res => console.log("res,", res))
		// let userDoc = this.afs.doc(	`users/${this.currentUser.user.uid}`);
		// userDoc.delete();
	}

 //  	signOut(): void {
 //    	this.afAuth.auth.signOut();
 //  	} 	

 //  	resetPassword(email: string) {
	//     return this.afAuth.auth.sendPasswordResetEmail(email)
	//       .then(() => console.log('sent Password Reset Email!'))
	//       .catch((error) => console.log(error))
	// }




//   currentUser: User = new User();

//   constructor(private userService: UserService,
//               private router: Router,
//               private jwtHelper: JwtHelperService) {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedUser = this.decodeUserFromToken(token);
//       this.setCurrentUser(decodedUser);
//     }
//   }

//   login(emailAndPassword) {
//     return this.userService.login(emailAndPassword).map(
//       res => {
//         localStorage.setItem('token', res.token);
//         const decodedUser = this.decodeUserFromToken(res.token);
//         this.setCurrentUser(decodedUser);
//         return this.loggedIn;
//       }
//     );
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.loggedIn = false;
//     this.isAdmin = false;
//     this.currentUser = new User();
//     this.router.navigate(['/']);
//   }

//   decodeUserFromToken(token) {
//     return this.jwtHelper.decodeToken(token).user;
//   }

//   setCurrentUser(decodedUser) {
//     this.loggedIn = true;
//     this.currentUser._id = decodedUser._id;
//     this.currentUser.username = decodedUser.username;
//     this.currentUser.role = decodedUser.role;
//     decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
//     delete decodedUser.role;
//   }

}
