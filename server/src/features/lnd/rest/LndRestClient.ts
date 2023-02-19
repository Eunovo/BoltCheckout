import https from 'https';
import fs from 'fs';
import { ILndClient } from "../ILndClient";
import { ILndRestClientConfig } from "./ILndRestClientConfig";
import { AddInvoiceBody, AddInvoiceResponse, GetStateResponse } from '../types';

export class LndRestClient implements ILndClient {
    private macaroon: Buffer;
    private cert: Buffer;

    constructor(private config: ILndRestClientConfig) {
        this.macaroon = fs.readFileSync(config.macaroonPath);
        this.cert = fs.readFileSync(config.certPath);
    }

    async getState() {
        return this.get<GetStateResponse>('/v1/state');
    }

    async addInvoice(body: AddInvoiceBody): Promise<AddInvoiceResponse> {
        return this.post<AddInvoiceResponse>("/v1/invoices", body);
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

    /**
     * Helper function for making HTTP POST requests to the LND node's
     * REST API. This method includes the the macaroon provided at
     * instance construction and connects using the node's TLS certificate.
     * @param path API path, ex: /api/graph
     * @param body Request body
     * @returns
     */
    private async post<T>(path: string, body: unknown): Promise<T> {
        return new Promise((resolve, reject) => {
            const url = `${this.config.host}${path}`;
            const data = JSON.stringify(body);

            const options = {
                headers: {
                    "grpc-metadata-macaroon": this.macaroon.toString("hex"),
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(data)

                },
                ca: this.cert,
                method: 'POST'
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
            
            req.write(data);
            req.end();
        });
    }

}
