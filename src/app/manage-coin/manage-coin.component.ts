import { Component } from '@angular/core';
import { ManageCoinService } from './manage-coin.service'
import { Coin } from './modal/coin-modal'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'manage-coin',
  templateUrl: './manage-coin.component.html'
})
export class ManageCoinComponent {

	arr: Coin[] = [];
	coinForm: FormGroup;
	coinToEdit: Coin;

	constructor(
		private coinService: ManageCoinService,
		private formBuilder: FormBuilder
		){
	}

	ngOnInit(){
		this.initializeForm();
		this.coinService.coins.subscribe(
			(coin: Coin[]) => {
			this.arr = coin;
			}
		);
	}

	initializeForm() {
	  this.coinForm = this.formBuilder.group({
	  	name: ['', Validators.required],
	  	ticker: ['', Validators.required],
	  	buyAmount: ['', Validators.required],
	  	sellAmount: ['', Validators.required],
	  	availableCryptos: ['', Validators.required]
	  });
	}

	get name(){ return this.coinForm.get('name') };
	get ticker(){ return this.coinForm.get('ticker') };
	get buyAmount(){ return this.coinForm.get('buyAmount') };
	get sellAmount(){ return this.coinForm.get('sellAmount') };
	get availableCryptos(){ return this.coinForm.get('availableCryptos') };

	onSubmit(){
		if(this.coinForm.valid){
			if(this.coinToEdit){
				let coinData = {
					...this.coinForm.value,
					'id' : this.coinToEdit.id
				}
				this.coinService.updateCoin(coinData);
			}else{
				this.coinService.addCoin(this.coinForm.value)
			}
			this.resetForm();
		}
	}

	onDelete(coin: Coin){
		console.log(coin);
		this.coinService.deleteCoin(coin);
	}

	onEdit(coin: Coin){
		this.coinToEdit = coin;
		this.coinForm.patchValue(coin);	
	}

	resetForm(){
		this.coinToEdit = undefined;
		this.coinForm.reset();
	}

}