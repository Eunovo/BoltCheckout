import fs from "fs";
import WebSocket from "ws";
import { EventEmitter } from "events";
import { ILndRestClientConfig } from "./ILndRestClientConfig";
import { ILndInvoiceWatcher } from "../ILndInvoiceWatcher";
import { ILndInvoice } from "../types";

export class LndWsInvoiceWatcher extends EventEmitter implements ILndInvoiceWatcher {

    constructor(config: ILndRestClientConfig) {
        super();

        const host = config.host.split("://")[1];
        if (!host) throw new Error(`Could not extract host from url ${config.host}`);

        const macaroon = fs.readFileSync(config.macaroonPath);

        const ws = new WebSocket(`wss://${host}/v1/invoices/subscribe?method=GET`, {
            rejectUnauthorized: false,
            headers: {
                'Grpc-Metadata-Macaroon': macaroon.toString('hex')
            }
        });

        ws.on('error', function(err) {
            console.log(`Error: ${err}`);
        });
        ws.on('message', (body) => {
            const parsed: { result: ILndInvoice } = JSON.parse(body.toString());
            if (parsed.result.state === 'SETTLED')
                this.emit('settled', parsed.result);
        });

    }

}
