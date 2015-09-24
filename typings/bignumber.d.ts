declare module "bignumber.js" {
	class BigNumber {
		constructor(value: number, base?: number);
		constructor(value: string, base?: number);
		constructor(value: BigNumber, base?: number);
		toString(base?: number): string;
		
		dividedBy(n: number, base?: number): BigNumber;
		dividedBy(n: string, base?: number): BigNumber;
		dividedBy(n: BigNumber, base?: number): BigNumber;
		div(n: number, base?: number): BigNumber;
		div(n: string, base?: number): BigNumber;
		div(n: BigNumber, base?: number): BigNumber;
		
		minus(n: number, base?: number): BigNumber;
		minus(n: string, base?: number): BigNumber;
		minus(n: BigNumber, base?: number): BigNumber;
		
		modulo(n: number, base?: number): BigNumber;
		modulo(n: string, base?: number): BigNumber;
		modulo(n: BigNumber, base?: number): BigNumber;
		mod(n: number, base?: number): BigNumber;
		mod(n: string, base?: number): BigNumber;
		mod(n: BigNumber, base?: number): BigNumber;
		
		plus(n: number, base?: number): BigNumber;
		plus(n: string, base?: number): BigNumber;
		plus(n: BigNumber, base?: number): BigNumber;
		
		times(n: number, base?: number): BigNumber;
		times(n: string, base?: number): BigNumber;
		times(n: BigNumber, base?: number): BigNumber;
		
		toPower(exp: number): BigNumber;
		pow(exp: number): BigNumber;
	}
	
	module BigNumber {
		export interface ISettings {
			DECIMAL_PLACES?: number;
			ROUNDING_MODE?: number;
			EXPONENTIAL_AT?: any;
			RANGE?: any;
			ERRORS?: any;
			CRYPTO?: any;
			MODULE_MODE?: number;
			POW_PRECISION?: number;
			FORMAT?: any;
		}
	}
	
	export = BigNumber;
}