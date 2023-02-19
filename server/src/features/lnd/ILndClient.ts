import { AddInvoiceBody, AddInvoiceResponse, GetStateResponse } from "./types";

export interface ILndClient {
    
    getState(): Promise<GetStateResponse>;

    addInvoice(body: AddInvoiceBody): Promise<AddInvoiceResponse>;

}
