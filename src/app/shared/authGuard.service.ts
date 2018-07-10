import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../auth/services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afauth: AngularFireAuth, private _auth: AuthService) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.afauth.authState.pipe(
        take(1),
        map(user => { return !!user}),
        tap(loggedIn => {
          if (!loggedIn) {
            this._auth.signOut();
            // this.router.navigate(['/']);
          }
      })
    )}
}