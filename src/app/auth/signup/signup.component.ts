import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      displayName: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(){
    return this.registerForm.get('email')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get displayName(){
    return this.registerForm.get('displayName')
  }

  checkUserInfo() {
  }
    
  onSubmit(): void {
    if (this.registerForm.valid) {
		  this.authService.userRegisterWithEmail(this.registerForm.value)
		    .then((response) => {
          let userData = {
            ...response.user,
            displayName: this.registerForm.get('displayName').value,
            role: {
              user: true
            }
          };
          if(response) {
            this.authService.updateUserData(userData);
            this.authService.createTransactionCollectionForUser(userData);
          }
          alert("User registered successfully");
			    this.router.navigateByUrl('auth/login');  	          
		    }).catch(_error => {
          console.log("ERROR", _error)
          alert(_error.message);
		    })
	    }
	}

  navigateLogin(){
    this.router.navigateByUrl('auth/login');  	
  }
}
