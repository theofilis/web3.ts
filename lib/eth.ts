import Method = require("./method");
import Types = require("./types")
import Protocol = require('./protocol');
import Provider = require('./provider');
import Settings = require('./settings');

export class Eth {
	constructor(private settings: Settings.Settings) {}
	
	private send(method: string, params: [any], format: (result: string) => any, callback?:(error: string, result: any) => void): any {
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
}
