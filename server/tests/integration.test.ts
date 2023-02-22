import test from 'ava';
import express from 'express';
import request from 'supertest';
import '../src/config';
import { CheckoutController } from '../src/features/checkout/CheckoutController';
import { StartCheckoutDto } from '../src/features/checkout/StartCheckoutDto';
import { InvoiceController } from '../src/features/invoices/InvoiceController';
import { Invoice, PaymentChannel } from '../src/features/invoices/InvoiceModel';
import { ProductController } from '../src/features/products/ProductController';
import { makeRouter } from '../src/helpers/make-router';

const app = express();
const router = makeRouter([
    ProductController,
    CheckoutController,
    InvoiceController
]);
app.use(express.json())
app.use(router);

let productId = '';
let invoiceId = '';
let invoice: Invoice;

test.serial('Can create product', async (t) => {
    t.timeout(30000);

    const response = await request(app)
        .post('/products')
        .send({
            name: 'SatoshiDice',
            prices: [{ currency: 'millisat', value: 5000 }]
        })
        .expect(200);
    productId = response.body.data;
    t.assert(productId);
});

test.serial('Can create invoice', async (t) => {
    const response = await request(app)
        .post('/checkout/start')
        .send({
            buyer: { firstName: 'Novo', lastName: 'Novo', email: 'novo@test.com' },
            channel: PaymentChannel.ligthning,
            items: [
                { productId, quantity: 1 }
            ],
            currency: 'millisat'
        } satisfies StartCheckoutDto)
        .expect(200);
    invoiceId = response.body.data.invoiceId;
    t.assert(invoiceId);
});

test.serial('Can get invoice', async (t) => {
    const response = await request(app)
        .get(`/invoices?_id=${invoiceId}`)
        .expect(200);
    invoice = response.body.data.results[0];
    t.assert(invoice);
});

test.serial('Can fulfill invoices', (t) => {
    t.timeout(60 * 60 * 1000);

    console.log(`Pay this invoice to the finish this test, payment request: ${invoice.payments[0].paymentRequest}`);
    return new Promise((resolve) => {
        const timer = setInterval(async () => {
            console.log('Checking if invoice is fulfilled');
    
            const response = await request(app)
                .get('/invoices')
                .query({ _id: invoiceId, 'status.status': 'FULFILLED' })
                .expect(200);

            if (response.body.data.results.length === 0) return;

            t.assert(invoiceId, response.body.data.results[0]._id);
            t.assert('FULFILLED', response.body.data.results[0].status.status);

            resolve();
            clearInterval(timer);
        }, 10000);
    })
});
