import test from 'ava';
import express from 'express';
import request from 'supertest';
import '../src/config';
import { InvoiceController } from '../src/features/invoices/InvoiceController';
import { makeRouter } from '../src/helpers/make-router';

const app = express();
const router = makeRouter([
    InvoiceController
]);
app.use(express.json())
app.use(router);

test('Can get total sales', async (t) => {
    const response = await request(app)
        .get(`/invoices/total-sales`)
        .expect(200);
    const totals = response.body.data;
    t.assert(totals[0].currency, 'millisat');
    t.is(typeof totals[0].total, 'number');
});
