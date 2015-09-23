import Eth = require('./lib/eth');
import Method = require('./lib/method');
import Types = require('./lib/types');
import Protocol = require('./lib/protocol');
import Provider = require('./lib/provider');
import Settings = require('./lib/settings');
var c = new Method.Method("hello");
var hash = new Types.BlockNumber("2");
var provider = new Provider.Http("http://helloworld.com");
provider.send("");

// export var eth = Eth;
// export var types = Types;

export class Web3 {
	public types = Types;
	public settings = new Settings.Settings();
}
