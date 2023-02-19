import { ILndInvoice } from "./types";

export interface ILndInvoiceWatcher {

    on(eventName: "settled", listener: (data: ILndInvoice) => void): void;

}
