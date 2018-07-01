import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl : './login.component.html'
})
export class LoginComponent {

  // loginForm: FormGroup;
 
  constructor(
    public auth: AuthService,
    private router: Router,
    // private formBuilder: FormBuilder
    ){
    // this.checkUserInfo();
  }

  // ngOnInit() {
  //   this.loginForm = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]]
  //   });
  // }

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

  // onSubmit(): void {
  //   // this.errorMessage = this.valdator.validateForm(this.email, this.password);
  // 	if (this.loginForm.valid) {
  //     console.log(this.loginForm.value)
  //     this.auth.googleLogin();
  //     // this.auth.updateUserData(this.loginForm.value)
  //   	// this.auth.loginWithEmail(this.email, this.password)
  //    //    .then(() =>{
  //    //    	alert('successfully LoggedIn');
  //   	// 	  this.clearErrorMessage();
  //    //    	// this.router.navigate(['/user'])
  //    //    })
  //    //    .catch(_error => {
  //    //      this.error = _error
  //    //      console.log("ERROR", Error)
  //    //      // this.router.navigate(['/'])
  //    //    })
  //   }
  // }

  // sendResetEmail() {
  //   this.clearErrorMessage()
  //   this.auth.resetPassword(this.email)
  //     .then(() => 
  //     	console.log('successFully send'))
  //     .catch(_error => {
  //       this.error = _error
  //     })
  // }

  // navigateSignup(){
  //   this.router.navigateByUrl('auth/signup');
  // }
}
