import {Router} from '@angular/router';
import { Component } from '@angular/core';
import { ManageCoinService } from './manage-coin.service'
import { Coin } from './modal/coin-modal'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth/services/auth.service'


@Component({
  selector: 'manage-coin',
  templateUrl: './manage-coin.component.html'
})
export class ManageCoinComponent {

	arr: Coin[] = [];
	coinForm: FormGroup;
	coinToEdit: Coin;
	coinToBuy: Coin;

	//for modal
	display='none';

	currentUserRoles: any = localStorage.getItem('currentUserRole');
	currentCoinStatus = [];
	bal;
	buyAmmount;

	constructor(
		private coinService: ManageCoinService,
    	private router: Router,
		private formBuilder: FormBuilder,
		private authSerive: AuthService
		){
	}

	ngOnInit(){
		this.initializeForm();
		this.getCurrentUserRole()
		this.coinService.coins.subscribe(
			(coin: Coin[]) => {
			this.arr = coin;
			console.log(this.arr);
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

	getCurrentUserRole(){
		this.authSerive.user$
		.subscribe(
			res => {
				console.log(res);
				if(res){
					localStorage.setItem('currentUser', JSON.stringify(res));
					this.currentUserRoles = res.role['admin'] === true ? 'admin' : 'user';
					localStorage.setItem('currentUserRole', this.currentUserRoles);
					this.getCurrentCoinStatus();
				}
			});
	}

	onBuy(coin){
		this.coinToBuy = coin;
		this.openModal();
	}

	openModal(){
	    this.display='block'; 
	}

	onCloseHandled(){
	    this.display='none'; 
	    this.coinToBuy = null;
	    this.buyAmmount = undefined;
	}

	buyCoin(buyAmmount){
		let currentCoinStatus = JSON.parse(localStorage.getItem('currentUser'));
		if(!currentCoinStatus.coinBalance){
			currentCoinStatus.coinBalance = {};
		}
		let currentBal = currentCoinStatus.coinBalance[this.coinToBuy.ticker];
		if(currentBal){
			currentCoinStatus.coinBalance[this.coinToBuy.ticker] = currentBal + buyAmmount;			
		} else{
			currentCoinStatus.coinBalance[this.coinToBuy.ticker] = buyAmmount;
		}

		this.authSerive.updateUserData(currentCoinStatus);

		this.coinToBuy.availableCryptos = this.coinToBuy.availableCryptos - buyAmmount;
		this.coinService.updateCoin(this.coinToBuy);
		localStorage.setItem('currentUser', JSON.stringify(currentCoinStatus));
		this.getCurrentCoinStatus();
		this.onCloseHandled();
	}

	getCurrentCoinStatus(){
		this.bal = JSON.parse(localStorage.getItem('currentUser')).coinBalance;
		this.currentCoinStatus = [];
		for(let coin of Object.keys(this.bal)){
			this.currentCoinStatus.push({
				ticker: coin,
				bal: this.bal[coin]
			})
		}
	}

	logout(){
		localStorage.clear();
    	this.router.navigateByUrl('auth/login');
	}
}