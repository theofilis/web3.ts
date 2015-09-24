declare module "bignumber" {
	class BigNumber {
		constructor(value: number, base?: number);
		toString(base?: number): string;
	}
	
	module BigNumber {
		
	}
	
	export = BigNumber;
}