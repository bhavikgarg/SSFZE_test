import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl : './signup.component.html'
})
export class SignupComponent {

  registerForm: FormGroup;
 
  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ){
    // this.checkUserInfo();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(){
    return this.registerForm.get('email')
  }
  get password(){
    return this.registerForm.get('password')
  }

  checkUserInfo() {
    // if (this.authService.isUserLoggedIn) {
      // this.router.navigate(['/user'])
    // }
  }
    
  onSignUp(): void {
    // this.clearErrorMessage();
    // this.errorMessage = this.valdator.validateForm(this.email, this.password);
    // if (this.errorMessage === '') {
		  // this.authService.userRegisterWithEmail(this.email, this.password)
		  //   .then(() => {
			 //    this.router.navigateByUrl('auth/login');  	
		  //   }).catch(_error => {
		  //     this.error = _error
		  //     // this.router.navigate(['/'])
		  //   })
	   //  }
	}

  navigateLogin(){
    this.router.navigateByUrl('auth/login');  	
  }
}
