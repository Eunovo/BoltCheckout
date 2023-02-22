import { inject, service } from "@eunovo/superbackend";
import { Invoice, PaymentChannel } from "../invoices/InvoiceModel";
import { InvoiceService } from "../invoices/InvoiceService";
import { ILndClient, ILndInvoiceWatcher, LndRestClient, LndWsInvoiceWatcher } from "../lnd";
import { ProductService } from "../products/ProductService";

@service()
export class PaymentService {
    private lnd: ILndClient;

    constructor(
        @inject(ProductService) private products: ProductService,
        @inject(InvoiceService) private invoices: InvoiceService
    ) {
        const connConfig = {
            host: process.env.LND_HOST!,
            macaroonPath: process.env.LND_MACAROON_PATH!,
            certPath: process.env.LND_CERT_PATH!
        };
        this.lnd = new LndRestClient(connConfig);
        const lndInvoiceWatcher: ILndInvoiceWatcher = new LndWsInvoiceWatcher(connConfig);

        lndInvoiceWatcher.on('settled', async (data) => {
            try {
                const reference = data.r_hash;
                await this.invoices.updateInvoiceStatus(reference, 'FULFILLED');
            } catch (error) {
                console.log(`ERROR: Failed to update invoice status for settled lightning payment with hash ${data.r_hash}`);
            }
        });
    }

    async createPayment(channel: PaymentChannel, invoice: Invoice): Promise<Invoice['payments'][number]> {
        // Get total amount payable
        const value = await invoice.items.reduce(async (accumulated, item) => {
            const value = await accumulated;
            // find product by id and with a price for the invoice currency
            const product = await this.products.findOne({
                _id: item.productId,
                'prices.currency': invoice.currency
            });
            const price = product.prices
                .find((value) => value.currency === invoice.currency);

            if (!price)
                throw new Error(`Could not get price information for product id ${item.productId.toString()} and currency ${invoice.currency}`);

            return value + (item.quantity * price.value);
        }, Promise.resolve(0));

        if (channel != PaymentChannel.ligthning)
            throw new Error(`Only ligthning payment channels are supported at the moment`);

        if (invoice.currency != 'millisat')
            throw new Error(`Currency must be in millisat for lightning payments`);

        const { r_hash, payment_request, payment_addr } = await this.lnd.addInvoice({
            memo: '',
            value_msat: value.toString(),
            description_hash: '',
            expiry: (60 * 60 * 1000).toString(),
            cltv_expiry: '18',
            fallback_addr: '',
            route_hints: [],
            private: false
        });

        return {
            reference: r_hash,
            value,
            channel,
            paymentRequest: payment_request,
            paymentAddr: payment_addr
        };
    }

}
