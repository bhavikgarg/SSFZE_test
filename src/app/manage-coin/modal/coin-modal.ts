export class Coin{
	public constructor(
		public id: string,
		public name: string,
		public ticker: string,
		public buyAmount: number,
		public sellAmount: number,
		public availableCryptos: number
		) {
	}
}