import Method = require("./method");
import Types = require("./types")
import Protocol = require('./protocol');
import Provider = require('./provider');
import Settings = require('./settings');

export class Eth {
	constructor(private settings: Settings.Settings) {}
	
	getBalance(address: Types.Address, callback?: (error: string, result: string) => void): any {
		let payload = this.settings.getProtocol().toPayload("eth_getBalance", [address.toString()]);
		let async = !!callback;
		if (async) {
			this.settings.getProvider().send(payload, (error: string, result: string) => {
				
			});
		}
	}	
}