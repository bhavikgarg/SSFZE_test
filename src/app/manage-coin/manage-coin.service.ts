import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Coin } from './modal/coin-modal'
import { map } from 'rxjs/operators';

@Injectable()
export class ManageCoinService{

  	coinsCollection: AngularFirestoreCollection<Coin>;
	coins: Observable<any[]>
	coinDoc: AngularFirestoreDocument<Coin>;

	constructor(private afs: AngularFirestore){

		this.coinsCollection = this.afs.collection('coinbase', x => x.orderBy('name', 'asc'));
		this.coins = this.coinsCollection.snapshotChanges().pipe(map(
			changes => {
				return changes.map(
					a => {
						const data = a.payload.doc.data() as Coin;
						data.id = a.payload.doc.id;
						return data;
				});
			})
		);
	}

	getCoins(){
		return this.coins;
	}

	addCoin(coin: Coin){
		this.coinsCollection.add(coin);
	}

	updateCoin(coin: Coin){
		this.coinDoc = this.afs.doc(`coinbase/${coin.id}`);
		console.log(coin)
		this.coinDoc.update(coin);
	}

	deleteCoin(coin: Coin){
		this.coinDoc = this.afs.doc(`coinbase/${coin.id}`);
		this.coinDoc.delete();
	}

	// makeConnectin(){
	// 	console.log('here from manage coin service: ', this.afs)
	// 	this.coins = this.afs.collection('coinbase').valueChanges();
	// 	console.log(this.coins);
	// }
	
}
