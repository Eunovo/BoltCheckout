import express from "express";
import '../src/config';
import { CheckoutController } from "./features/checkout/CheckoutController";
import { InvoiceController } from "./features/invoices/InvoiceController";
import { LndRestClient } from "./features/lnd";
import { ProductController } from "./features/products/ProductController";
import { makeRouter } from "./helpers/make-router";

const app = express();
const router = makeRouter([
    ProductController,
    CheckoutController,
    InvoiceController
]);
app.use(express.json())
app.use(router);

app.get('/', async (_req, res) => {
    const app_state = { lnd: 'UNREACHABLE' };
    try {
        const lnd = new LndRestClient({
            host: process.env.LND_HOST!,
            macaroonPath: process.env.LND_MACAROON_PATH!,
            certPath: process.env.LND_CERT_PATH!
        });
        const lndState = await lnd.getState();
        app_state.lnd = lndState.state;
    } catch (error) {
        console.log('ERROR', error);    
    }
    res.json({ message: 'OK', data: app_state });
});

const APP_PORT = process.env.APP_PORT || 9090;

app.listen(APP_PORT, () => {
    console.log("Server Started on port", APP_PORT);
});
