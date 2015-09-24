export interface Protocol {
	toPayload(method: string, params: any[]): string;
	getResult(response: string): any;
}

export class JSONRPC implements Protocol {
	private static id: number = 0;

	toPayload(method: string, params: any[]): string {
		var payload = {
			jsonrpc: "2.0",
			method: method,
			params: params,
			id: (JSONRPC.id++).toString()
		};
		return JSON.stringify(payload, null, 2);
	}
	
	getResult(response: string): any {
		var o = JSON.parse(response);
		return o.result;
	}
	
}
