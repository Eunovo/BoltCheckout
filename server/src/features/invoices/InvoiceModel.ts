import { accessControl, createdAt, field, lastUpdatedAt, model, required } from "@eunovo/superbackend"
import { Currency } from "../../core/Currency";

@accessControl('invoice')
@model('Invoice')
export class Invoice {

    _id?: string;

    /**
     * All the items in the invoice must use the same currency
     */
    @required()
    @field('currency', 'String')
    currency!: Currency;

    @required()
    @field('items', '[Mixed]')
    items!: { productId: string, quantity: number }[];

    @required()
    @field('payments', '[Mixed]')
    payments!: Payment[];

    /**
     * Buyer contact details
     */
    @required()
    @field('buyer', 'Mixed')
    buyer!: {
        firstName: string;
        lastName: string;
        email: string;
    };

    @required()
    @field('history', '[Mixed]')
    history!: InvoiceStatus[];

    @required()
    @field('status', 'Mixed')
    status!: InvoiceStatus;

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date;

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date;
}

export enum PaymentChannel {
    ligthning = 'ligthning'
}

export type Payment = {
    reference: string;
    /**
     * the amount of the payment in the invoice currency
     */
    value: number;
} & (
    | {
        channel: PaymentChannel.ligthning;
        paymentRequest: string;
        paymentAddr: string;
    }
)

export interface InvoiceStatus {
    status: 'CREATED' | 'PAYMENT_CREATED' | 'FULFILLED' | 'CANCELED' | 'EXPIRED';
    message?: string;
    date: Date
}
