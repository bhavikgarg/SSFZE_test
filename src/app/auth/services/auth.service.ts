import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from './modals/user.modal'

import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

	user: BehaviorSubject<User> = new BehaviorSubject(null);

	// loggedIn = false;
	// isAdmin = false;

	// authState: any = null;

	constructor(
		public afAuth:AngularFireAuth,
		public db: AngularFireDatabase
		){
		this.afAuth.authState
			.pipe(switchMap(auth => {
					if(auth){
						return this.db.object('users/' + auth.uid);
					} else{
						return new Observable(null);
					}
				})
			)
        .subscribe(user => {
          this.user.next(user)
        })




	    // this.afAuth.authState.subscribe((auth) => {
	    //   this.authState = auth
	    // });
	}
	 
	googleLogin() {
	  const provider = new firebase.auth.GoogleAuthProvider()
	  return this.afAuth.auth.signInWithPopup(provider)
	    .then(credential =>  {
	        this.updateUser(credential.user)
	    })
	}

	signOut() {
	  this.afAuth.auth.signOut()
	}

	private updateUser(authData) {
	    const userData = new User(authData)
	    const ref = this.db.object('users/' + authData.uid)
	    ref.take(1)
	        .subscribe(user => {
	    	    if (!user.role) {
	            ref.update(userData)
	        }
	    })



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


 //    userRegisterWithEmail(email: string, password: string){
 //    	return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
	//   	.then((data)=> {
	//   		console.log(this.afAuth.auth.currentUser.photoURL);
	//   		console.log(this.afAuth.auth.currentUser.displayName);
	// 		this.authState = data;
	//   	})
	//   	.catch((err)=> {
	//   		console.log('Error', err.message);
	//   		throw err;  		
	//   	})
 //  	}

 
 //  	loginWithEmail(email: string, password: string) {
 //    	return this.afAuth.auth.signInWithEmailAndPassword(email, password)
 //  		.then((user) => {
 //    		this.authState = user
 //  		})
 //  		.catch(error => {
 //    		console.log(error)
 //    	throw error
 //  		});
	// } 

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
