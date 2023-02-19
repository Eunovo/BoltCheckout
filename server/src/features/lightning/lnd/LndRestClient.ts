import https from 'https';
import fs from 'fs';
import { ILightningClient } from "../ILightningClient";
import { ILndRestClientConfig } from "./ILndRestClientConfig";
import { GetStateResponse } from '../type';

export class LndRestClient implements ILightningClient {
    private macaroon: Buffer;
    private cert: Buffer;

    constructor(private config: ILndRestClientConfig) {
        this.macaroon = fs.readFileSync(config.readonlyMacaroonPath);
        this.cert = fs.readFileSync(config.certPath);
    }

    async getState() {
        return this.get<GetStateResponse>('/v1/state');
    }

    /**
     * Helper function for making HTTP GET requests to the LND node's
     * REST API. This method includes the the macaroon provided at
     * instance construction and connects using the node's TLS certificate.
     * @param path API path, ex: /api/graph
     * @returns
     */
    private async get<T>(path: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const url = `${this.config.host}${path}`;
            const options = {
                headers: {
                    "grpc-metadata-macaroon": this.macaroon.toString("hex"),
                },
                ca: this.cert,
            };
            const req = https.request(url, options, res => {
                const bufs: Buffer[] = [];
                res.on("data", buf => {
                    bufs.push(buf);
                });
                res.on("end", () => {
                    const result = Buffer.concat(bufs);
                    resolve(JSON.parse(result.toString("utf-8")));
                });
            });
            req.on("error", reject);
            req.end();
        });
    }

}
