import Protocol = require('./protocol');
import Provider = require('./provider');

export class Settings {
	private protocol: Protocol.Protocol = new Protocol.JSONRPC();
	private provider: Provider.Provider = new Provider.Http("http://localhost:8545");
	
	getProtocol() {
		return this.protocol;
	}
	
	setProtocol(protocol: Protocol.Protocol) {
		this.protocol = protocol;
	}
	
	getProvider() {
		return this.provider;
	}
	
	setProvider(provider: Provider.Provider) {
		this.provider = provider;
	}
}