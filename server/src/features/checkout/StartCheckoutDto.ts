import { Currency } from "../../core/Currency";
import { Invoice, PaymentChannel } from "../invoices/InvoiceModel";

export interface StartCheckoutDto {
    buyer: Invoice['buyer'];
    items: Invoice['items'];
    currency: Currency;
    channel: PaymentChannel;
}
