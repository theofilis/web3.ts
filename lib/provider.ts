export interface Provider {
	send(payload: string, callback?: (error: string, result: string) => void): any;
}

export class Http implements Provider {
	constructor(public host: string) {}
	
	send(payload: string, callback?: (error: string, result: string) => void): any {
		let async: boolean = !!callback;
		let request = new XMLHttpRequest();
		request.open('POST', this.host, async);		
		request.setRequestHeader('Content-Type', 'application/json');
		
		if (async) {
			request.onreadystatechange = function () {
				if (request.readyState === 4) {
					var result = request.responseText;
					callback(null, result);
				}
			}
			// try check for connection error
			request.send(payload);
		} else {
			// try check for connection error
			request.send(payload);
			var result = request.responseText;
			return result;	
		}
				
	}
}