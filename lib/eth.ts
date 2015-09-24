import Method = require("./method");
import Types = require("./types")
import Protocol = require('./protocol');
import Provider = require('./provider');
import Settings = require('./settings');

export class Eth {
	constructor(private settings: Settings.Settings) {}
	
	private send(method: string, params: [any], format: (result: any) => any, callback?: (error: string, result: any) => void): any {
		let payload = this.settings.getProtocol().toPayload(method, params);
		let async = !!callback;
		if (async) {
			this.settings.getProvider().send(payload, (error: string, result: string) => {
				if (error) {
					callback(error, null);
				} else {
					callback(null, format(result));	
				}
			});
		} else {
			let response = this.settings.getProvider().send(payload);
			var result = this.settings.getProtocol().getResult(response);
			return format(result);
		}
	}
	
	getBalance(address: Types.Address): Types.Wei;
	getBalance(address: Types.Address, callback: (error: string, result: Types.Wei) => void): void;
	getBalance(address: Types.Address, callback?: any): any {
		return this.send('eth_getBalance', [address.toString()], function (result: string) {
			return new Types.Wei(result, 'wei');
		}, callback);
	}
	
	accounts(): [Types.Address];
	accounts(callback: (error: string, result: [Types.Address]) => void): void;
	accounts(callback?: any): any {
		return this.send('eth_accounts', null, function (result: [string]) {
			return result.map(function (r: string) {
				return new Types.Address(r);
			});
		}, callback);
	}
	
	coinbase(): Types.Address;
	coinbase(callback: (error: string, result: Types.Address) => void): void;
	coinbase(callback?: any): any {
		return this.send('eth_coinbase', null, function (result: string) {
			return new Types.Address(result);
		}, callback);
	}
	
	mining(): boolean
	mining(callback: (error: string, result: boolean) => void): void;
	mining(callback?: any): any {
		return this.send('eth_mining', null, function (result: string) {
			return result;
		}, callback);
	}
	
	hashrate(): Types.Hex
	hashrate(callback: (error: string, result: Types.Hex) => void): void;
	hashrate(callback?: any): any {
		return this.send('eth_hashrate', null, function (result: string) {
			return new Types.Hex(result);
		}, callback);
	}
	
	gasPrice(): Types.Wei
	gasPrice(callback: (error: string, result: Types.Wei) => void): void;
	gasPrice(callback?: any): any {
		return this.send('eth_gasPrice', null, function (result: string) {
			return new Types.Wei(result, 'wei');
		}, callback);
	}
	
	blockNumber(): Types.BlockNumber
	blockNumber(callback: (error: string, result: Types.BlockNumber) => void): void;
	blockNumber(callback?: any): any {
		return this.send('eth_blockNumber', null, function (result: string) {
			return new Types.BlockNumber(result);
		}, callback);
	}
}
