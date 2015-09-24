import Method = require("./method");
import Types = require("./types")
import Protocol = require('./protocol');
import Provider = require('./provider');
import Settings = require('./settings');

export class Face {
	constructor(protected settings: Settings.Settings) {}
	
	protected send(
		method: string, 
		params: any[], 
		format: (result: any) => any, 
		callback?: (error: string, result: any) => void
	): any {
		let payload = this.settings.getProtocol().toPayload(method, params);
		let async = !!callback;
		if (async) {
			this.settings.getProvider().send(payload, (error: string, response: string) => {
				if (error) {
					callback(error, null);
				} else {
					var result = this.settings.getProtocol().getResult(response);
					callback(null, format(result));	
				}
			});
		} else {
			let response = this.settings.getProvider().send(payload);
			var result = this.settings.getProtocol().getResult(response);
			return format(result);
		}
	}
	
	protected getParams(params: any[]): any[] {
		return params.filter(function (p: any) {
			return typeof p !== "function" && typeof p !== "undefined";
		}).map(function (p: any) {
			return p instanceof Types.Basic ? p.toString() : p;
		})
	}
	
	protected getCallback(params: any[]): any {
		return params.filter(function (p: any) {
			return typeof p === "function";
		})[0];
	}
}

export class Eth extends Face {
	
	getBalance(
		address: Types.Address,
		block?: Types.BlockNumber
	): Types.Wei;
	getBalance(
		address: Types.Address,
		block: Types.BlockNumber,
		callback: (error: string, result: Types.Wei) => void
	): void;
	getBalance(
		address: Types.Address,
		callback: (error: string, result: Types.Wei) => void
	): void;
	getBalance(address: Types.Address, block?: any, callback?: any): any {
		var params = this.getParams([address, block]);
		var cb = this.getCallback([block, callback]);
		return this.send('eth_getBalance', params, function (result: string) {
			return new Types.Wei(result, 'wei');
		}, cb);
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
	
	getStorageAt(
		address: Types.Address,
		position: Types.Hex,
		block?: Types.BlockNumber
	): Types.Hex;
	getStorageAt(
		address: Types.Address,
		position: Types.Hex,
		block: Types.BlockNumber,
		callback: (error: string, result: Types.Hex) => void
	): void;
	getStorageAt(
		address: Types.Address,
		position: Types.Hex,
		callback: (error: string, result: Types.Hex) => void
	): void;
	getStorageAt(
		address: Types.Address,
		position: Types.Hex,
		block?: any,
		callback?: any
	): any {
		var params = this.getParams([address, position, block]);
		var cb = this.getCallback([block, callback]);
		return this.send('eth_getStorageAt', params, function (result: string) {
			return new Types.Hex(result);
		}, cb);
	}
	
	getTransactionCount(
		address: Types.Address,
		block?: Types.BlockNumber
	): Types.Hex;
	getTransactionCount(
		address: Types.Address,
		block: Types.BlockNumber,
		callback: (error: string, result: Types.Hex) => void
	): void;
	getTransactionCount(
		address: Types.Address,
		callback: (error: string, result: Types.Hex) => void
	): void;
	getTransactionCount(
		address: Types.Address,
		block?: any,
		callback?: any
	): any {
		var params = this.getParams([address, block]);
		var cb = this.getCallback([block, callback]);
		return this.send('eth_getTransactionCount', params, function (result: string) {
			return new Types.Hex(result);
		}, cb);
	}
	
	
}
