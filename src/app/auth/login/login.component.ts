import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl : './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
 
  constructor(
    public auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ){
    // this.checkUserInfo();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  checkUserInfo() {
    // if (this.auth.isUserLoggedIn) {
      // this.router.navigate(['/user'])
    // }
  }

  // get email(){
  //   return this.loginForm.get('email')
  // }
  // get password(){
  //   return this.loginForm.get('password')
  // }

  onSubmit(): void {
  	if (this.loginForm.valid) {
      this.auth.loginWithEmail(this.loginForm.value)
        .then((user) =>{
        	alert('successfully LoggedIn');
          console.log(user);
        	this.router.navigate(['/manage-coin'])
        })
        .catch(_error => {
          console.log("ERROR", _error)
          alert(_error.message);
        })
    }
  }

  // sendResetEmail() {
  //   this.clearErrorMessage()
  //   this.auth.resetPassword(this.email)
  //     .then(() => 
  //     	console.log('successFully send'))
  //     .catch(_error => {
  //       this.error = _error
  //     })
  // }

  navigateSignup(){
    this.router.navigateByUrl('auth/signup');
  }
}
