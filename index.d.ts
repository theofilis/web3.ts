/// <reference path='typings/bignumber.d.ts' />
/// <reference path='typings/xmlhttprequest.d.ts' />

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
	public eth = new Eth.Eth(this.settings);
}

var eth = new Eth.Eth(new Settings.Settings());
var balance = eth.getBalance(new Types.Address("0xa1a111bc074c9cfa781f0c38e63bd51c91b8af00"));
var balance2 = eth.getBalance(new Types.Address("0xa1a111bc074c9cfa781f0c38e63bd51c91b8af00"), new Types.BlockNumber(68000));
eth.getBalance(new Types.Address("0xa1a111bc074c9cfa781f0c38e63bd51c91b8af00"), function (err: string, balance: Types.Wei) {
	var balance3 = balance;
});
console.log(balance.toString(10));
console.log(balance2.toString(10));

var accounts = eth.accounts();
console.log(accounts);
