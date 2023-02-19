import { service, CRUDService, inject, Observable } from "@eunovo/superbackend";
import { Invoice, InvoiceStatus } from "./InvoiceModel";
import { InvoiceRepo } from "./InvoiceRepo";

@service()
export class InvoiceService extends CRUDService<Invoice> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(InvoiceRepo) repo: InvoiceRepo
    ) {
        super(observable.getObservableFor('invoices'), repo);
    }

    addPayment(invoiceId: string, payment: Invoice['payments'][number]) {
        const status: InvoiceStatus = { status: 'PAYMENT_CREATED', date: new Date() };
        return this.repo.updateOne(
            { _id: invoiceId },
            {
                $push: { payments: payment, history: status },
                status
            } as any
        );
    }

    updateInvoiceStatus(paymentRef: string, status: 'FULFILLED' | 'CANCELED' | 'EXPIRED') {
        const invoiceStatus: InvoiceStatus = { status, date: new Date() };
        return this.repo.updateMany(
            { 'payments.reference': paymentRef },
            {
                $push: { history: status },
                status: invoiceStatus
            } as any
        );
    }

}
