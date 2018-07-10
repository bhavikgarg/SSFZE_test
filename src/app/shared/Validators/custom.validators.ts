import { AbstractControl, FormControl, Validators} from '@angular/forms';

export class CustomValidators{
	static digitsAfterDeimal = (maxdigitsAllowed: number): Validators | null => {
		return (control: FormControl) => {
			let numAfterDecimal = String(control.value).split('.')[1];
			if(numAfterDecimal && numAfterDecimal.length > 2){
				return {
					decimalError: true,
					errorMessage: 'Only 2 digits are allowed after decimal'
				}
			}
			return null
		}
	}
}


