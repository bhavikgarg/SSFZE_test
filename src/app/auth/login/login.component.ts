import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

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

  navigateSignup(){
    this.router.navigateByUrl('auth/signup');
  }
}
