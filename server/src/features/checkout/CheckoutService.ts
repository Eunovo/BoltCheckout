import { inject, service } from "@eunovo/superbackend";
import { InvoiceStatus } from "../invoices/InvoiceModel";
import { InvoiceService } from "../invoices/InvoiceService";
import { ProductService } from "../products/ProductService";
import { PaymentService } from "./Payment";
import { StartCheckoutDto } from "./StartCheckoutDto";

@service()
export class CheckoutService {
    constructor(
        @inject(InvoiceService) private invoices: InvoiceService,
        @inject(PaymentService) private payments: PaymentService
    ) {}

    async start(data: StartCheckoutDto) {
        let status: InvoiceStatus = { status: 'CREATED', date: new Date() };
        const invoiceId = await this.invoices.create({
            currency: data.currency,
            items: data.items,
            buyer: data.buyer,
            payments: [],
            history: [status],
            status,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        });
        let invoice = await this.invoices.findOne({ _id: invoiceId });

        try {
            const payment = await this.payments.createPayment(data.channel, invoice);
            await this.invoices.addPayment(invoiceId, payment);   
        } catch (error) {
            console.log(`ERROR: Failed to create payment for ${invoiceId} on channel ${data.channel}:`, error);
        }        

        return invoiceId;
    }

}
