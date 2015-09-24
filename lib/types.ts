import BigNumber = require("bignumber.js");

export class Basic {
	constructor(protected value: string) {}
	toString() {
		return this.value;
	}
}

export class Hex extends Basic {
	constructor(hex: string) {
		if (hex.substr(0, 2) == "0x") {
			hex = hex.substr(2);
		}
		super(hex);
		let matches = this.value.match(/[0-9a-f]*/gi)[0];
		if (matches.length < 1 || matches[0].length != this.value.length) {
			throw new Error("Invalid hex");
		}
	}
}

export class Address extends Hex {
	constructor(address: string) {
		super(address);
		if (this.value.length != 40) {
			throw new Error("Invalid length");
		}
	}	
}	

export class BlockHash extends Hex {
	constructor(hash: string);
	constructor(hash: number);
	constructor(hash: any) {
		if (typeof hash === "string") {
			super(hash);
		} else if (typeof hash === "number") {
			super(hash.toString(16));
		}
		
		if (this.value.length != 64) {
			throw new Error("Invalid length");
		}
	}
}

export class BlockNumber extends Hex {
	constructor(block: string);
	constructor(block: number);
	constructor(block: any) {
		if (typeof block === "string") {
			super(block);
		}
		else if (typeof block === "number") {
			super(block.toString(16));
		} 
	}
}

export class Ether extends Basic {
	private factor(base: string): number {
		var f: number = 0;
		switch (base) {
			case "wei": f = 0; break;
			case "kwei":
			case "ada":
			case "femtoether": f = 3; break;
			case "mwei":
			case "babbage":
			case "picoether": f = 6; break;
			case "gwei":
			case "shannon":
			case "nanoether":
			case "nano": f = 9; break;
			case "szabo":
			case "microether":
			case "micro": f = 12; break;
			case "finney":
			case "milliether":
			case "milli": f = 15; break;
			case "ether": f = 18; break;
			case "kether":
			case "grand":
			case "einstein": f = 21; break;
			case "mether": f = 24; break;
			case "gether": f = 27; break;
			case "tether": f = 30; break;
			default: throw new Error("Invalid base!");
		}
		
		return Math.pow(10, f);
	}
	
	constructor(amount: string, base: string);
	constructor(amount: number, base: string);
	constructor(amount: any, base: string) {
		super(amount);
	}
}

